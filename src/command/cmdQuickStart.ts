import * as vscode from 'vscode';
import { getWebviewContent } from '../utils/getWebViewContent';
import { localize } from '../utils/localize';

export async function quickStart(context: vscode.ExtensionContext, tag?: string) {
	console.log(tag);

	const panel = vscode.window.createWebviewPanel(
		'Welcome', // viewType
		localize('msg_welcome'), // view title
		vscode.ViewColumn.One, // which editor column to show in
		{
			enableScripts: true, // enable JS, disabled by default
			retainContextWhenHidden: true, // keep state when the webview is hidden, to avoid being reset
		}
	);
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'welcome', (html) => {
		if (tag == "5") {
			html = html.replace(`activeid="tab-1"`, `activeid="tab-5"`);
		}
		return html;
	});
}