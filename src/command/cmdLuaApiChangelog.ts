import * as vscode from 'vscode';
import type { ApiChangelogWebviewMessage } from '../types/apiChangelogWebviewMessages';
import { getBundledWebviewContent } from '../utils/getBundledWebviewContent';
import { readFile } from '../utils/readFile';

let changelogPanel: vscode.WebviewPanel | undefined;
let changelogReady = false;

/** 使用扩展自己的导航式页面查看 Lua API 更新日志。 */
export async function luaApiChangelog(context: vscode.ExtensionContext): Promise<void> {
	const markdownUri = vscode.Uri.joinPath(context.extensionUri, 'resource', 'lua_api_changelog.md');
	const [markdown, stat] = await Promise.all([
		readFile(markdownUri),
		vscode.workspace.fs.stat(markdownUri),
	]);

	if (!changelogPanel) {
		changelogPanel = vscode.window.createWebviewPanel(
			'dota2tools.apiChangelog',
			'Dota 2 API 更新日志',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				enableFindWidget: true,
			},
		);
		changelogPanel.onDidDispose(() => {
			changelogPanel = undefined;
			changelogReady = false;
		});
		changelogPanel.webview.onDidReceiveMessage((message: ApiChangelogWebviewMessage) => {
			if (message.type !== 'ready' || !changelogPanel) return;
			changelogReady = true;
			void changelogPanel.webview.postMessage({ type: 'initialize', markdown, updatedAt: stat.mtime });
		});
		changelogPanel.webview.html = await getBundledWebviewContent(
			changelogPanel.webview,
			context.extensionUri,
			'api-changelog',
		);
		return;
	}

	changelogPanel.reveal(vscode.ViewColumn.One);
	if (changelogReady) {
		await changelogPanel.webview.postMessage({ type: 'initialize', markdown, updatedAt: stat.mtime });
	}
}
