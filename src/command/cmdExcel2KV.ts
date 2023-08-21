import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { writeKeyValue } from '../utils/kvUtils';
import { abilityCSV2KV, unitCSV2KV } from '../utils/csvUtils';
import { getRootPath } from '../utils/getRootPath';
import * as ExcelJS from 'exceljs';
import { changeStatusBarState, refreshStatusBarMessage, showStatusBarMessage, StatusBarState } from '../module/statusBar';
import { localize } from '../utils/localize';
import { dirExists, getPathInfo } from '../utils/pathUtils';

export function cmdExcel2KV(context: vscode.ExtensionContext) {
	let abilityExcelConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.A4.AbilityExcel');
	if (abilityExcelConfig) {
		eachExcelConfig(abilityExcelConfig, (kvDir, excelDir) => {
			excel2kv(kvDir, excelDir, abilityCSV2KV);
		});
	}
	let unitExcelConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.A4.UnitExcel');
	if (unitExcelConfig) {
		eachExcelConfig(unitExcelConfig, (kvDir, excelDir) => {
			excel2kv(kvDir, excelDir, unitCSV2KV);
		});
	}
}

/** 遍历excel配置表 */
export async function eachExcelConfig(config: Table, callback: (kvDir: string, excelDir: string) => Promise<void> | boolean | void) {
	for (const kvDir in config) {
		const excelDir: string = config[kvDir];
		if (path.isAbsolute(excelDir)) {
			// 绝对路径
			if (callback(path.normalize(kvDir), path.normalize(excelDir)) !== undefined) {
				break;
			}
			// excel2kv(kvDir, excelDir, method);
		} else {
			// 相对路径
			let realKvDir = kvDir;
			let realExcelDir = excelDir;
			if (kvDir.indexOf("${game}") !== -1) {
				const gameDire = getGameDir();
				if (gameDire) {
					realKvDir = kvDir.replace("${game}", gameDire);
				} else {
					showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + kvDir + localize("game_folder_no_found"));
				}
			}
			if (excelDir.indexOf("${game}") !== -1) {
				const gameDire = getGameDir();
				if (gameDire) {
					realExcelDir = excelDir.replace("${game}", gameDire);
				} else {
					showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + excelDir + localize("game_folder_no_found"));
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
			if (excelDir.indexOf("${content}") !== -1) {
				const contentDire = getContentDir();
				if (contentDire) {
					realExcelDir = excelDir.replace("${content}", contentDire);
				} else {
					showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + excelDir + localize("content_folder_no_found"));
				}
			}
			const rootPath = getRootPath();
			if (rootPath) {
				if (path.isAbsolute(realKvDir) === false) {
					realKvDir = path.join(rootPath, kvDir);
				}
				if (path.isAbsolute(realExcelDir) === false) {
					realExcelDir = path.join(rootPath, excelDir);
				}
			}
			if (callback(path.normalize(realKvDir), path.normalize(realExcelDir)) !== undefined) {
				break;
			}
			// excel2kv(realKvDir, realExcelDir, method);
		}
	}
}

export async function excel2kv(kvDir: string, excelDir: string, method: typeof abilityCSV2KV | typeof unitCSV2KV) {
	if (await getPathInfo(kvDir) === false) {
		showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + localize("path_no_found") + kvDir);
		vscode.window.showErrorMessage(`[${localize("cmdExcel2KV")}]：` + localize("path_no_found") + `(${kvDir})` + localize("sure create folder"), localize("confirm"), localize("cancel")).then((value) => {
			if (value == localize("confirm")) {
				dirExists(kvDir);
			}
		});
		return;
	}
	if (await getPathInfo(excelDir) === false) {
		showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + localize("path_no_found") + excelDir);
		return;
	}
	changeStatusBarState(StatusBarState.LOADING);
	let messageIndex = showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + excelDir);
	let fileType: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(excelDir))).type;
	if (fileType === vscode.FileType.Directory) {
		let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(excelDir));
		for (let i: number = 0; i < files.length; i++) {
			let [fileName, isFile] = files[i];
			// 排除临时文件
			if (fileName === undefined || fileName.search(/~\$/) !== -1) {
				continue;
			}
			if (isFile === vscode.FileType.File) {
				let filePath: string = path.join(excelDir, fileName);
				let csvPath: string = path.join(path.dirname(filePath), 'csv', path.basename(filePath).replace(path.extname(filePath), '.csv'));
				if (await getPathInfo(csvPath) === false) {
					showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + localize("path_no_found") + csvPath);
					return;
				}
				await dirExists(path.join(kvDir, path.dirname(fileName.replace(path.extname(fileName), getExtname(fileName)))));
				let csv = fs.readFileSync(csvPath, 'utf-8');
				fs.writeFileSync(path.join(kvDir, fileName.replace(path.extname(fileName), getExtname(fileName))), writeKeyValue({ KeyValue: method(csv) }));
				refreshStatusBarMessage(messageIndex, `[${localize("cmdExcel2KV")}]：` + fileName);
			}
		}
	} else if (fileType === vscode.FileType.File) {
		let csvPath: string = path.join(path.dirname(excelDir), 'csv', path.basename(excelDir).replace(path.extname(excelDir), '.csv'));
		if (await getPathInfo(csvPath) === false) {
			showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + localize("path_no_found") + csvPath);
			return;
		}
		await dirExists(kvDir);
		let csv = fs.readFileSync(csvPath, 'utf-8');
		fs.writeFileSync(kvDir, writeKeyValue({ KeyValue: method(csv) }));
		refreshStatusBarMessage(messageIndex, `[${localize("cmdExcel2KV")}]：` + path.basename(excelDir));
	}
	changeStatusBarState(StatusBarState.ALL_DONE);
}


/** 获取后缀 */
function getExtname(fileName: string) {
	let extNameConfig: string | undefined = vscode.workspace.getConfiguration().get("dota2-tools.A4.extnameList");
	if (extNameConfig) {
		let fileNameList = extNameConfig.split(",");
		for (const _fileName of fileNameList) {
			if (fileName.indexOf(_fileName) != -1) {
				return ".txt";
			}
		}
	}
	return ".kv";
}