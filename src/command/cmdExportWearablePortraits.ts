/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { writeKeyValue } from '../utils/kvUtils';
import { getGameDir } from '../module/addonInfo';

/**
 * 导出所有饰品的肖像配置信息
 * @export
 */
export function exportWearablePortraits(context: vscode.ExtensionContext) {
	let gameDir = getGameDir();
	let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));
	let portraits: Table = {};
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.portraits != undefined) {
			for (const model in itemData.portraits) {
				portraits[model] = itemData.portraits[model];
			}
		}
	}

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '请输入输出文件路径';
	if (gameDir) {
		inputBox.value = path.join(gameDir, "\\scripts\\npc\\portraits_custom.txt");
	}
	inputBox.show();
	inputBox.onDidAccept(async (t) => {
		fs.writeFileSync(inputBox.value, writeKeyValue({ Portraits: portraits }));
		inputBox.dispose();
	});
}