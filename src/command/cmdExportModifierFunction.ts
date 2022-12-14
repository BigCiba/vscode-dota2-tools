import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getGameDir } from '../module/addonInfo';
import { getDotaApiNoteClass } from '../module/apiNote';

/**
 * 音效选择
 * @param context 
 */
export async function exportModifierFunction(context: vscode.ExtensionContext) {
	let gameDir = getGameDir();
	const dotaApiNote = getDotaApiNoteClass();
	const enumList = dotaApiNote.getEnumList();
	let result = "_ModifierFuncs = {";

	for (const enumType in enumList) {
		if (enumType == "modifierfunction") {
			for (const enumInfo of enumList[enumType]) {
				result += `\n\t${enumInfo.name} = "${enumInfo.function}",`;

			}
		}
	}
	result += "\n}\nreturn _ModifierFuncs";

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '请输入输出文件路径';
	if (gameDir) {
		inputBox.value = path.join(gameDir, "\\scripts\\vscripts\\modifiers\\eom_modifier\\modifierfunction.lua");
	}
	inputBox.show();
	inputBox.onDidAccept(async (t) => {
		fs.writeFileSync(inputBox.value, result);
		inputBox.dispose();
	});
}