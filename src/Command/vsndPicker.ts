import * as vscode from 'vscode';
import { VSND } from '../init';
/**
 * 选择音效
 * @export
 */
export function VsndPicker() {
	const quick_pick = vscode.window.createQuickPick();
	quick_pick.canSelectMany = false;
	quick_pick.ignoreFocusOut = true;
	quick_pick.placeholder = '*.vsnd';
	quick_pick.items = VSND;

	quick_pick.show();
	quick_pick.onDidChangeSelection((t) => {
		quick_pick.value = t[0].label;
		vscode.window.activeTextEditor?.edit(editBuilder => {
			if (vscode.window.activeTextEditor?.selection.start !== undefined && t[0].description !== undefined) {
				if (vscode.window.activeTextEditor.selection.start.character === vscode.window.activeTextEditor.selection.end.character) {
					editBuilder.insert(vscode.window.activeTextEditor?.selection.start, t[0].description);
				} else {
					editBuilder.replace(new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end), t[0].description);
				}
				quick_pick.dispose();
			}
		});
	});
}