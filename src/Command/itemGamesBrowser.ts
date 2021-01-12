import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { GetWebViewContent, ReadKeyValue2 } from '../util';

/**
 * item_game.txt里的饰品查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function ItemGamesBrowser(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'ItemsBrowser', // viewType
		"Items Browser", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);
	panel.webview.postMessage({
		type: "init",
		data: JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/items_game.json"), 'utf-8')),
		localize_data: {
			"zh-cn": ReadKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_schinese.txt"), 'utf-8'), false).lang.Tokens,
			"en": ReadKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_english.txt"), 'utf-8'), false).lang.Tokens,
		}
	});
	panel.webview.html = GetWebViewContent(context, 'webview/ItemsBrowser/ItemsBrowser.html');
}