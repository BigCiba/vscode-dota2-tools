import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { writeKeyValue } from '../utils/kvUtils';
import { getGameDir } from '../module/addonInfo';
import { dirExists } from '../utils/pathUtils';

/**
 * 导出所有饰品的信息到指定文件夹，按英雄拆分
 * @export
 */
export function exportWearableWithHero(context: vscode.ExtensionContext) {
	let gameDir = getGameDir();
	let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '请输入输出文件路径';
	if (gameDir) {
		inputBox.value = path.join(gameDir, "\\scripts\\npc\\items_game");
	}
	let result:any = {}
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.used_by_heroes) {
			const heroList = Object.keys(itemData.used_by_heroes)
			delete itemData.used_by_heroes
			for (const heroName of heroList) {
				if (heroName.indexOf("npc_dota_hero") != -1 && result[heroName] == undefined) {
					result[heroName] = {}
				}
				if (result[heroName]) {
					result[heroName][index] = itemData
				}
			}
		}
	}
	inputBox.show();
	dirExists(inputBox.value)
	inputBox.onDidAccept(async (t) => {
		for (const heroName in result) {
			const heroItems = result[heroName];
			fs.writeFileSync(inputBox.value+"\\"+heroName+".kv", writeKeyValue({ Items: heroItems }));
		}
		inputBox.dispose();
	});
}