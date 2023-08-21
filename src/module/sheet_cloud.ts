import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { FeiShu } from '../Class/FeiShu';
import { eachExcelConfig } from '../command/cmdExcel2KV';
import { getContentDir, getGameDir } from './addonInfo';
import { showStatusBarMessage } from './statusBar';
import { localize } from '../utils/localize';
import { writeKeyValue } from '../utils/kvUtils';
import { abilityCSV2KV } from '../utils/csvUtils';
import { dirExists } from '../utils/pathUtils';

let sheetCloud: FeiShu;

/** 云表格初始化 */
export function sheetCloudInit(context: vscode.ExtensionContext) {
	if (sheetCloud === undefined) {
		sheetCloud = new FeiShu();
	}
	// 获取所有表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_all_sheet", async (data) => {
		const abilityConfig = getAbilityConfig();
		for (const kvDir in abilityConfig) {
			const folderToken = abilityConfig[kvDir];
			sheetCloud.getDocumentList(folderToken).then((files) => {
				for (const fileData of files) {
					sheetCloud.getDocumentInfo(fileData.shortcut_info.target_token).then((sheetInfo) => {
						if (sheetInfo) {
							sheetCloud.getSheetData(fileData.shortcut_info.target_token, sheetInfo.sheet_id).then(async (sheetData) => {
								if (sheetData) {
									const csv = convertToCSV(sheetData.data.valueRange.values);
									if (path.isAbsolute(kvDir)) {
										fs.writeFileSync(kvDir, writeKeyValue({ KeyValue: abilityCSV2KV(csv) }));
									} else {
										let realKvDir = kvDir;
										if (kvDir.indexOf("${game}") !== -1) {
											const gameDire = getGameDir();
											if (gameDire) {
												realKvDir = kvDir.replace("${game}", gameDire);
											} else {
												showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + kvDir + localize("game_folder_no_found"));
											}
										}
										if (kvDir.indexOf("${content}") !== -1) {
											const contentDire = getContentDir();
											if (contentDire) {
												realKvDir = kvDir.replace("${content}", contentDire);
											} else {
												showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + kvDir + localize("content_folder_no_found"));
											}
										}
										await dirExists(realKvDir);
										const data = writeKeyValue({ KeyValue: abilityCSV2KV(csv) });
										fs.writeFileSync(path.join(realKvDir, getExtname(fileData.name)), data);
									}
								}
							});
						}
					});
				}
			});
		}
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

function getAbilityConfig(): Record<string, string> {
	return vscode.workspace.getConfiguration().get('dota2-tools.A8.FeiShuAbilityExcel', {});
}

function convertToCSV(data: string[][]): string {
	const maxColumns = Math.max(...data.map(row => row.length));
	const csvRows = data.map(row => {
		const filledRow = row.map(cell => {
			if (typeof cell === 'string' && cell.includes('\n')) {
				return `"${cell}"`;
			}
			return cell;
		});
		const remainingCells = Array(maxColumns - filledRow.length).fill('');
		const rowWithEmptyCells = filledRow.concat(remainingCells);
		return rowWithEmptyCells.join(',');
	});
	return csvRows.join('\n');
}

/** 获取后缀 */
function getExtname(fileName: string) {
	let extNameConfig: string | undefined = vscode.workspace.getConfiguration().get("dota2-tools.A4.extnameList");
	if (extNameConfig) {
		let fileNameList = extNameConfig.split(",");
		for (const _fileName of fileNameList) {
			if (fileName.indexOf(_fileName) != -1) {
				return fileName + ".txt";
			}
		}
	}
	return fileName + ".kv";
}