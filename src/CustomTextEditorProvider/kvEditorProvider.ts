import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { getContentDir } from '../module/addonInfo';
import { getWebviewContent } from '../utils/getWebViewContent';

export class kvEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider(kvEditorProvider.viewType, new kvEditorProvider(context));
	}

	private static readonly viewType = 'dota2tools.kv';

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = await getWebviewContent(webviewPanel.webview, this.context.extensionUri, 'KvEditor');

		function updateWebview() {
			webviewPanel.webview.postMessage({
				type: 'update',
				data: parseKeyValueFile(document.getText()),
			});
		}
		function parseKeyValueFile(fileContent: string) {
			const stack: any = [{}]; // stack to keep track of current object
			let key: string = "";

			const lines = fileContent.split('\n');
			for (let line of lines) {
				line = line.trim();
				if (line.startsWith('{')) {
					const newObj = {};
					stack[stack.length - 1][key] = newObj;
					stack.push(newObj);
				} else if (line.startsWith('}')) {
					stack.pop();
				} else {
					const parts = line.split(/\s+/); // split on whitespace or tabs
					key = parts[0].replace(/"/g, '');
					const value = parts[1] ? parts[1].replace(/"/g, '') : null;
					if (value) {
						stack[stack.length - 1][key] = value;
					}
				}
			}

			return stack[0];
		}

		/** 获取路径 */
		// function getWebviewPath(_path: string) {
		// 	return webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(getContentDir(), _path))).toString();
		// }

		// const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
		// 	if (e.document.uri.toString() === document.uri.toString()) {
		// 		updateWebview();
		// 	}
		// });

		// // Make sure we get rid of the listener when our editor is closed.
		// webviewPanel.onDidDispose(() => {
		// 	changeDocumentSubscription.dispose();
		// });

		// // Receive message from the webview.
		// webviewPanel.webview.onDidReceiveMessage(e => {
		// });

		updateWebview();
	}


}