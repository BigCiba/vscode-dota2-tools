import * as vscode from 'vscode';
import { getWebviewContent } from '../utils/getWebViewContent';

export async function quickStart(context: vscode.ExtensionContext, tag?: string) {
	console.log(tag);

	const panel = vscode.window.createWebviewPanel(
		'Welcome', // viewType
		"Welcome", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'welcome', (html) => {
		if (tag == "5") {
			html = html.replace(`activeid="tab-1"`, `activeid="tab-5"`);
		}
		return html;
	});
}