import * as vscode from 'vscode';
import { getWebviewContent, SidebarTab } from '../utils/getWebViewContent';
import { attachItemsGame } from '../command/cmdDota2ItemsGame';
import { attachIcons, buildIconsPreProcess, ensureIconData } from '../command/cmdDota2IconPanel';
import { attachMusic } from '../command/cmdVsndPicker';
import { attachPanels } from '../command/cmdPanelBrowser';

const ACTIVE_TAB_KEY = 'dota2tools.sidebar.activeTab';

/**
 * Unified sidebar: a single WebviewView whose top icon tab bar switches between five tabs:
 *  - api        : global API search bundled with React (reuses the ModDota site component)
 *  - panels     : panorama panel element documentation (PanelList)
 *  - icons      : ability/item icon lookup (reuses the existing webview)
 *  - items_game : cosmetic item lookup (kept as-is, only injecting the tab bar)
 *  - music      : sound effect (soundevents) lookup, replacing the original QuickPick
 * Switching tabs is done by resetting webview.html and rebinding that tab's message handlers.
 */
export class DotaSidebarViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'dota2tools.sidebar';

	private view?: vscode.WebviewView;
	/** Disposables related to the current tab (released when switching) */
	private tabDisposables: vscode.Disposable[] = [];
	/** Disposables registered in this resolve (released on re-resolve) */
	private resolveDisposables: vscode.Disposable[] = [];
	/** Cached rendered HTML per tab (valid for the current webview) so switching back skips
	 *  the file read + chrome injection. Icons are excluded — their data can change at runtime. */
	private htmlCache = new Map<SidebarTab, string>();

	/** Active tab kept in memory for instant reads; persisted to globalState in the background. */
	private _activeTab: SidebarTab;

	constructor(private readonly context: vscode.ExtensionContext) {
		this._activeTab = context.globalState.get<SidebarTab>(ACTIVE_TAB_KEY, 'api');
	}

	private get activeTab(): SidebarTab {
		return this._activeTab;
	}

	public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this.view = webviewView;

		// Clean up listeners from the previous resolve
		this.resolveDisposables.forEach((d) => d.dispose());
		this.resolveDisposables = [];
		// A new webview means new resource URIs, so cached HTML is no longer valid.
		this.htmlCache.clear();

		webviewView.webview.options = {
			enableScripts: true,
			// Extension directory (icons/bundled files) + workspace directories (custom ability/item icons live under the addon's game/content)
			localResourceRoots: [
				this.context.extensionUri,
				...(vscode.workspace.workspaceFolders?.map((f) => f.uri) ?? []),
			],
		};

		// Persistent bottom tab switch listener (spans all tabs)
		this.resolveDisposables.push(
			webviewView.webview.onDidReceiveMessage((message: { type?: string; tab?: SidebarTab }) => {
				if (message?.type === 'switchTab' && message.tab) {
					this.switchTo(message.tab);
				}
			}),
		);

		webviewView.onDidDispose(() => {
			this.tabDisposables.forEach((d) => d.dispose());
			this.tabDisposables = [];
		});

		await this.renderActiveTab();
	}

	/** Switch tab: render immediately, rebind handlers, persist in the background. */
	private async switchTo(tab: SidebarTab) {
		if (tab === this._activeTab) {
			return;
		}
		this._activeTab = tab;
		// Persist for restore-on-reopen, but do not block the switch on the storage write.
		void this.context.globalState.update(ACTIVE_TAB_KEY, tab);
		await this.renderActiveTab();
	}

	private async renderActiveTab() {
		const view = this.view;
		if (!view) {
			return;
		}
		const tab = this.activeTab;
		const webview = view.webview;

		// Release the previous tab's handlers
		this.tabDisposables.forEach((d) => d.dispose());
		this.tabDisposables = [];

		webview.html = await this.getTabHtml(tab, webview);

		// Bind the active tab's message handlers / push its data.
		switch (tab) {
			case 'icons':
				this.tabDisposables.push(...attachIcons(webview, this.context));
				break;
			case 'items_game':
				this.tabDisposables.push(...(await attachItemsGame(webview, this.context)));
				break;
			case 'music':
				this.tabDisposables.push(...attachMusic(webview, this.context));
				break;
			case 'panels':
				this.tabDisposables.push(...attachPanels(webview, this.context));
				break;
			case 'api':
				break;
		}
	}

	/** Render (or reuse cached) HTML for a tab. Icons are never cached — their data can change. */
	private async getTabHtml(tab: SidebarTab, webview: vscode.Webview): Promise<string> {
		const cached = this.htmlCache.get(tab);
		if (cached) {
			return cached;
		}

		let html: string;
		switch (tab) {
			case 'api': {
				const assetBase = webview.asWebviewUri(this.context.extensionUri).toString().replace(/\/?$/, '/');
				html = await getWebviewContent(
					webview,
					this.context.extensionUri,
					'ApiSidebar',
					(h) => h.replace('{{ASSET_BASE}}', assetBase),
					{ activeTab: 'api' },
				);
				break;
			}
			case 'icons': {
				await ensureIconData(this.context);
				// Not cached: icon data (incl. custom icons) can change at runtime.
				return getWebviewContent(webview, this.context.extensionUri, 'dota2Icon', buildIconsPreProcess(webview), { activeTab: 'icons' });
			}
			case 'items_game':
				html = await getWebviewContent(webview, this.context.extensionUri, 'dota2ItemsGame', undefined, { activeTab: 'items_game' });
				break;
			case 'music':
				html = await getWebviewContent(webview, this.context.extensionUri, 'dota2Sound', undefined, { activeTab: 'music' });
				break;
			case 'panels':
				html = await getWebviewContent(webview, this.context.extensionUri, 'panelBrowser', undefined, { activeTab: 'panels' });
				break;
		}
		this.htmlCache.set(tab, html!);
		return html!;
	}
}
