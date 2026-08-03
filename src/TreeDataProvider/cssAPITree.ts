import * as path from 'path';
import * as vscode from 'vscode';
import { DotaApiNote } from '../Class/DotaApiNote';
import { showStatusBarMessage } from '../module/statusBar';
import { createEntryId, createGroupId, getApiBrowserPanel } from '../webview/ApiBrowserPanel';

export class CssApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiTreeData: Table;
	filteredApiTreeData: Table | undefined;
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.apiTreeData = dotaApiNote.getCssApiNote();
		const apiBrowser = getApiBrowserPanel(context, dotaApiNote);
		const register = (command: string, callback: (...args: any[]) => unknown) => {
			context.subscriptions.push(vscode.commands.registerCommand(command, callback));
		};

		register('dota2tools.css_api_browser.copy', async (data) => {
			await vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage(`复制到剪切板：${data.label}`);
		});
		register('dota2tools.css_property.edit', async (nodeItem: NodeItem) => {
			await this.openProperty(nodeItem.label, true);
		});
		register('dota2tools.dota2cssapi.filter', async () => {
			const query = await vscode.window.showInputBox({ prompt: '输入过滤词搜索 API' });
			if (query !== undefined) apiBrowser.runCatalogAction('css', 'setQuery', query);
		});
		register('dota2tools.dota2cssapi.clearfilter', () => {
			apiBrowser.runCatalogAction('css', 'setQuery', '');
		});
		register('dota2tools.css_api_browser', async (propertyName: string) => {
			await this.openProperty(propertyName, false);
		});
	}

	private async openProperty(propertyName: string, edit: boolean): Promise<void> {
		const category = categorizeCssProperty(propertyName);
		await getApiBrowserPanel(this.context, this.dotaApiNote).open({
			source: 'css',
			groupId: createGroupId('css', 'css', category),
			entryId: createEntryId('css', 'property', category, propertyName),
			edit,
		});
	}

	private applyFilter(query: string): void {
		const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
		this.filteredApiTreeData = Object.fromEntries(Object.entries(this.apiTreeData).filter(([name, rawInfo]) => {
			const info = rawInfo as CssProperty;
			const searchable = `${name} ${info.description ?? ''} ${info.example ?? ''}`.toLocaleLowerCase();
			return words.every((word) => searchable.includes(word));
		}));
		this._onDidChangeTreeData.fire(undefined);
	}

	refresh(): void {
		this.apiTreeData = this.dotaApiNote.getCssApiNote();
		this._onDidChangeTreeData.fire(undefined);
		getApiBrowserPanel(this.context, this.dotaApiNote).refreshCatalog();
	}

	rebuild(): void { this._onDidChangeTreeData.fire(undefined); }
	getTreeItem(element: NodeItem): vscode.TreeItem { return element; }

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		if (element) return Promise.resolve([]);
		const data = this.filteredApiTreeData ?? this.apiTreeData;
		return Promise.resolve(Object.keys(data).map((name) => new NodeItem(
			name,
			vscode.TreeItemCollapsibleState.None,
			ItemType.property,
			undefined,
			(data[name] as CssProperty).description,
			{ command: 'dota2tools.css_api_browser', title: '', arguments: [name] },
		)));
	}
}

enum ItemType { property }

export class NodeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly itemType: ItemType,
		public readonly description?: string,
		public readonly tooltip?: string,
		public readonly command?: vscode.Command,
	) {
		super(label, collapsibleState);
		this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
		this.contextValue = 'Class';
	}
}

function categorizeCssProperty(name: string): string {
	if (/^(background|wash|opacity-mask)/.test(name)) return 'Background';
	if (/^border/.test(name)) return 'Border';
	if (/^(font|text|letter|line-height|color|white-space)/.test(name)) return 'Typography';
	if (/^(margin|padding)/.test(name)) return 'Spacing';
	if (/^(width|height|min-|max-)/.test(name)) return 'Sizing';
	if (/^(position|x$|y$|z$|z-index|align|flow|layout|overflow|visibility|ignore-parent-flow)/.test(name)) return 'Layout';
	if (/^(transform|pre-transform|perspective|ui-scale)/.test(name)) return 'Transform';
	if (/^(animation|transition)/.test(name)) return 'Animation';
	if (/^(blur|brightness|contrast|hue|saturation|shadow|img-shadow|texture|world-blur|clip)/.test(name)) return 'Effects';
	if (/^(sound|tooltip|context-menu)/.test(name)) return 'Interaction';
	return 'Other';
}
