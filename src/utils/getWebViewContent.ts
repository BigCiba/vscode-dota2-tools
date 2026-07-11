import { Uri, Webview } from "vscode";
import { getUri } from "./getUri";
import * as path from 'path';
import { readFile } from "./readFile";
import { log } from "console";
import { getExtensionLang } from "./getExtensionLang";

/** The unified sidebar's icon tabs. Icon-only (codicons), switched via postMessage. */
export type SidebarTab = "api" | "panels" | "icons" | "items_game" | "music";

const SIDEBAR_TABS: { tab: SidebarTab; codicon: string; title: string }[] = [
	{ tab: "api", codicon: "book", title: "API" },
	{ tab: "panels", codicon: "layout", title: "Panels" },
	{ tab: "icons", codicon: "symbol-color", title: "Icons" },
	{ tab: "items_game", codicon: "package", title: "items_game" },
	{ tab: "music", codicon: "unmute", title: "Music" },
];

/**
 * Get the webview html, automatically replacing the format accordingly
 * @param webview
 * @param extensionUri
 * @param webviewName
 * @param preProcess
 * @param chrome When provided, injects the unified sidebar's vscode API singleton + bottom icon tab bar
 * @returns
 */
export async function getWebviewContent(
	webview: Webview,
	extensionUri: Uri,
	webviewName: string,
	preProcess?: (html: string) => string,
	chrome?: { activeTab: SidebarTab },
) {
	const toolkitUri = getUri(webview, extensionUri, [
		"node_modules",
		"@vscode",
		"webview-ui-toolkit",
		"dist",
		"toolkit.js",
	]);
	const codiconsUri = getUri(webview, extensionUri, ['node_modules', '@vscode/codicons', 'dist', 'codicon.css']);
	const uri = Uri.joinPath(extensionUri, "webview", webviewName, webviewName + ".html");
	const dirPath = path.join("webview", webviewName);

	// Read html content
	let html = await readFile(uri);

	// Pre-processing
	if (preProcess) {
		html = preProcess(html);
	}

	// Replace paths with vscode-format paths
	html = html.replace(/(<link.+?href="|<script.+?src="|<video.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
		if ($2.search('https') === -1) {
			return $1 + getUri(webview, extensionUri, [path.relative(path.resolve(), path.resolve(dirPath, $2))]) + '"';
		}
		return $1 + $2 + '"';
	});
	// Localization
	const extensionLang = getExtensionLang();
	html = html.replace(/<html lang="(.*)">/, `<html lang="${extensionLang}">`);

	// Unified sidebar shell: inject the vscode API singleton before all page scripts (so the unchanged items_game/icons
	// can still call acquireVsCodeApi and reuse the same instance), and inject the icon tab bar at the bottom.
	if (chrome) {
		html = html.replace("<head>", `<head>\n${vscodeApiSingletonScript()}`);
		html = html.replace("</body>", `${sidebarFooter(chrome.activeTab)}\n</body>`);
	}

	// Hook up the toolkit and codicon
	html = html.replace("</head>", `\t<script type="module" src="${toolkitUri}"></script>\n\t<link href="${codiconsUri}" rel="stylesheet" />\n</head>`);

	return html;
}

/** Classic (non-deferred) script: cache one vscode API instance and make every later
 *  acquireVsCodeApi() return it, so both the page and the injected footer can post messages. */
function vscodeApiSingletonScript() {
	return `\t<script>
		(function () {
			try {
				if (typeof acquireVsCodeApi === 'function' && !window.__vscode) {
					window.__vscode = acquireVsCodeApi();
					window.acquireVsCodeApi = function () { return window.__vscode; };
				}
			} catch (e) { /* already acquired */ }
		})();
	</script>`;
}

/** The shared icon-only tab bar, fixed to the top of every sidebar page. */
function sidebarFooter(activeTab: SidebarTab) {
	const buttons = SIDEBAR_TABS.map(
		(t) =>
			`<button class="dt-tab${t.tab === activeTab ? " dt-tab-active" : ""}" data-tab="${t.tab}" title="${t.title}" aria-label="${t.title}"><span class="codicon codicon-${t.codicon}"></span></button>`,
	).join("");

	return `\t<style>
		body { padding-top: 46px !important; box-sizing: border-box; }
		.dt-tabbar {
			position: fixed; left: 0; right: 0; top: 0; height: 46px;
			display: flex; align-items: stretch;
			background: var(--vscode-sideBar-background, var(--color-sidebar, #202020));
			border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border, rgba(128,128,128,0.35));
			z-index: 2147483000;
		}
		.dt-tab {
			flex: 1; display: flex; align-items: center; justify-content: center;
			background: none; border: none; cursor: pointer; padding: 0;
			color: var(--vscode-icon-foreground, var(--color-text-dim, #888));
			border-bottom: 2px solid transparent;
		}
		.dt-tab .codicon { font-size: 18px; }
		.dt-tab:hover { color: var(--vscode-foreground, var(--color-text, #ddd)); background: rgba(128,128,128,0.12); }
		.dt-tab-active {
			color: var(--color-highlight, #89a62e);
			border-bottom: 2px solid var(--color-highlight, #89a62e);
		}
	</style>
	<div class="dt-tabbar" role="tablist">${buttons}</div>
	<script>
		(function () {
			var api = window.__vscode;
			document.querySelectorAll('.dt-tab').forEach(function (btn) {
				btn.addEventListener('click', function () {
					var tab = btn.getAttribute('data-tab');
					if (tab === '${activeTab}') return;
					if (api) api.postMessage({ type: 'switchTab', tab: tab });
				});
			});
		})();
	</script>`;
}
