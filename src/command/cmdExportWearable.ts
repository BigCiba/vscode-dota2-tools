/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';
import { getGameDir } from '../module/addonInfo';
import { dirExists, getPathInfo } from '../utils/pathUtils';
import { showStatusBarMessage } from '../module/statusBar';
import { localize } from '../utils/localize';

/**
 * 导出所有饰品的信息到指定文件夹
 * @export
 */
export function exportWearable(context: vscode.ExtensionContext) {
	let gameDir = getGameDir();
	let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '请输入输出文件路径';
	if (gameDir) {
		inputBox.value = path.join(gameDir, "\\scripts\\npc\\items_game.kv");
	}
	inputBox.show();
	inputBox.onDidAccept(async (t) => {
		fs.writeFileSync(inputBox.value, writeKeyValue({ Items: itemsGame }));
		inputBox.dispose();
	});
}