import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { FeiShu } from '../Class/FeiShu';
import { getContentDir, getGameDir } from './addonInfo';
import { showStatusBarMessage } from './statusBar';
import { localize } from '../utils/localize';
import { writeKeyValue } from '../utils/kvUtils';
import { abilityCSV2KV } from '../utils/csvUtils';
import { dirExists } from '../utils/pathUtils';

let sheetCloud: FeiShu;
let statusBarItem: vscode.StatusBarItem;
let compositeFileList: { [kvDir: string]: DocumentFile[]; } = {};
let singleFileList: { [kvDir: string]: DocumentFile[]; } = {};
let sheetIDMap: { [spreadsheetToken: string]: string; } = {};

/** 云表格初始化 */
export async function sheetCloudInit(context: vscode.ExtensionContext) {
	context.subscriptions.push(statusBarItem);
	if (sheetCloud === undefined) {
		sheetCloud = new FeiShu();
		const success = await sheetCloud.getTenantAccessToken();
		if (success) {
			await syncCloudFiles();
			statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -2);
			statusBarItem.text = '$(sync)';
			statusBarItem.tooltip = '云配置表: 获取所有表格到本地KV';
			statusBarItem.show();
			statusBarItem.command = "dota2tools.fetch_all_sheet";
		}
	}

	//云配置表: 更新文件列表
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_files", async (data) => {
		await syncCloudFiles();
	}));

	// 获取所有表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_all_sheet", async (data) => {
		await syncAction(async () => {
			for (const kvDir in compositeFileList) {
				const files = compositeFileList[kvDir];
				for (const fileData of files) {
					await processFileData(fileData, kvDir);
				}
			}
		});
	}));

	// 获取指定表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.show_fetch_sheet_list", async (data) => {
		const vsndPick = vscode.window.createQuickPick();
		vsndPick.canSelectMany = false;
		vsndPick.ignoreFocusOut = true;
		vsndPick.placeholder = '选择一个配置表';
		vsndPick.matchOnDescription = true;
		vsndPick.items = getFilesQuickPick();

		vsndPick.show();
		vsndPick.onDidChangeSelection((t) => {
			if (t[0].description) {
				const data = getDocumentFileByToken(t[0].description);
				if (data) {
					processFileData(data.fileData, data.kvDir);
				}
			}
			vsndPick.dispose();
		});
	}));


}

async function processFileData(fileData: DocumentFile, kvDir: string): Promise<void> {
	const spreadsheetToken = fileData.shortcut_info.target_token;
	let sheetID = getSheetID(spreadsheetToken);
	// 第一次获取就存下来，减少接口请求次数
	if (sheetID == undefined) {
		const sheetInfo = await sheetCloud.getDocumentInfo(spreadsheetToken);
		if (sheetInfo) {
			sheetID = sheetInfo.sheet_id;
			sheetIDMap[spreadsheetToken] = sheetID;
		}
	}
	if (sheetID) {
		const sheetData = await sheetCloud.getSheetData(spreadsheetToken, sheetID);
		if (sheetData) {
			const csv = convertToCSV(sheetData.data.valueRange.values);
			await saveCSVToKVDir(csv, kvDir, fileData);
			console.log("write kv");
		}
	}
}

async function saveCSVToKVDir(csv: string, kvDir: string, fileData: DocumentFile): Promise<void> {
	const realKvDir = getRealKvDir(kvDir);
	if (realKvDir) {
		await dirExists(realKvDir);

		const data = writeKeyValue({ KeyValue: abilityCSV2KV(csv) });
		const filePath = path.join(realKvDir, getExtname(fileData.name));
		fs.writeFileSync(filePath, data);
		fileData.modified_time;
		// fs.utimesSync(filePath, fileData.created_time, fileData.modified_time);
	}
}

function getRealKvDir(kvDir: string): string | undefined {
	let realKvDir = kvDir;
	if (kvDir.indexOf("${game}") !== -1) {
		const gameDire = getGameDir();
		if (gameDire) {
			realKvDir = kvDir.replace("${game}", gameDire);
		} else {
			showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + kvDir + localize("game_folder_no_found"));
			return undefined;
		}
	}
	if (kvDir.indexOf("${content}") !== -1) {
		const contentDire = getContentDir();
		if (contentDire) {
			realKvDir = kvDir.replace("${content}", contentDire);
		} else {
			showStatusBarMessage(`[${localize("cmdExcel2KV")}]：` + kvDir + localize("content_folder_no_found"));
			return undefined;
		}
	}
	return realKvDir;
}

/** 同步云文件列表 */
async function syncCloudFiles() {
	await syncAction(async () => {
		const compositeConfig = getCompositeConfig();
		// 遍历配置的技能表
		for (const kvDir in compositeConfig) {
			if (compositeFileList[kvDir] == undefined) {
				compositeFileList[kvDir] = [];
			}
			const files = await sheetCloud.getDocumentList(compositeConfig[kvDir]);
			for (const fileData of files) {
				compositeFileList[kvDir].push(fileData);
			}
		}
		const singleConfig = getSingleConfig();
		// 遍历配置的技能表
		for (const kvDir in singleConfig) {
			if (compositeFileList[kvDir] == undefined) {
				compositeFileList[kvDir] = [];
			}
			const files = await sheetCloud.getDocumentList(singleConfig[kvDir]);
			for (const fileData of files) {
				singleFileList[kvDir].push(fileData);
			}
		}
	});
}

function getCompositeConfig(): Record<string, string> {
	return vscode.workspace.getConfiguration().get('dota2-tools.A8.CloudSheetComposite', {});
}
function getSingleConfig(): Record<string, string> {
	return vscode.workspace.getConfiguration().get('dota2-tools.A8.CloudSheetSingle', {});
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

function getSheetID(spreadsheetToken: string) {
	return sheetIDMap[spreadsheetToken];
}

async function syncAction(action: Function) {
	if (statusBarItem) {
		statusBarItem.text = '$(sync~spin)';
		await action();
		statusBarItem.text = '$(sync)';
	} else {
		await action();
	}
}

function getFilesQuickPick() {
	const quickPickItemList: vscode.QuickPickItem[] = [];
	for (const kvDir in compositeFileList) {
		const files = compositeFileList[kvDir];
		for (const fileData of files) {
			quickPickItemList.push({
				label: "$(run-all) " + fileData.name,
				description: fileData.shortcut_info.target_token
			});
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			quickPickItemList.push({
				label: "$(run) " + fileData.name,
				description: fileData.shortcut_info.target_token
			});
		}
	}
	return quickPickItemList;
}

// 通过target_token获得fileData和kvDir
function getDocumentFileByToken(target_token: string) {
	for (const kvDir in compositeFileList) {
		const files = compositeFileList[kvDir];
		for (const fileData of files) {
			if (fileData.shortcut_info.target_token == target_token) {
				return { fileData, kvDir };
			}
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			if (fileData.shortcut_info.target_token == target_token) {
				return { fileData, kvDir };
			}
		}
	}
}