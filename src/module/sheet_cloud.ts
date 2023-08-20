import * as vscode from 'vscode';
import { FeiShu } from '../Class/FeiShu';

let sheetCloud: FeiShu;

/** 云表格初始化 */
export function sheetCloudInit(context: vscode.ExtensionContext) {
	if (sheetCloud === undefined) {
		sheetCloud = new FeiShu();
	}
	// 获取所有表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_all_sheet", async (data) => {

	}));

	// 获取指定表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.show_fetch_sheet_list", async (data) => {
		// 显示quickpick
		const quickPick = vscode.window.createQuickPick();
		quickPick.canSelectMany = false;
		quickPick.ignoreFocusOut = false;
		quickPick.matchOnDescription = true;
		quickPick.placeholder = '选择一个表格';
		quickPick.items = [
			{
				label: "只输出英雄相关的版本"
			},
			{
				label: "输出完整版本"
			}
		];
		quickPick.show();
		quickPick.onDidChangeSelection((t) => {

			quickPick.dispose();
		});
	}));
}