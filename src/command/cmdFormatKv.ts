import * as vscode from 'vscode';
import * as fs from 'fs';
import { readKeyValueWithBase, writeKeyValue } from '../utils/kvUtils';

/**
 * 格式化kv
 * @export
 */
export function formatKv(context: vscode.ExtensionContext) {
	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '输入制表深度（默认12）';
	inputBox.show();
	inputBox.onDidAccept(async (t) => {
		if (vscode.window.activeTextEditor?.document) {
			let depth = Number(inputBox.value) || 12;
			let result = writeKeyValue(await readKeyValueWithBase(vscode.window.activeTextEditor.document.uri.fsPath), undefined, depth);
			fs.writeFileSync(vscode.window.activeTextEditor.document.uri.fsPath, result);
		}
		inputBox.dispose();
	});
}