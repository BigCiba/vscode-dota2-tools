import * as vscode from 'vscode';
import { translate } from '../Class/BaiduFanYi';

/** 翻译选中词条 */
export async function translateSelection(context: vscode.ExtensionContext) {
	if (vscode.window.activeTextEditor) {
		let range = new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end);
		let textSelection = vscode.window.activeTextEditor?.document.getText(range);
		if (textSelection !== undefined && textSelection !== "") {
			translate(textSelection, res => {
				vscode.window.activeTextEditor?.edit(editBuilder => {
					if (vscode.window.activeTextEditor?.selection.start !== undefined) {
						editBuilder.replace(range, res);
					}
				});
			});
		}
	}
}