import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { FeiShu } from '../Class/FeiShu';
import { getContentDir, getGameDir } from './addonInfo';
import { showStatusBarMessage } from './statusBar';
import { localize } from '../utils/localize';
import { writeKeyValue } from '../utils/kvUtils';
import { abilityCSV2KV, unitCSV2KV } from '../utils/csvUtils';
import { dirExists } from '../utils/pathUtils';
import { setInterval } from 'timers';

let sheetCloud: FeiShu;
let statusBarItem: vscode.StatusBarItem;
/** 双行文件列表 */
let compositeFileList: { [kvDir: string]: DocumentFile[]; } = {};
/** 单行文件列表 */
let singleFileList: { [kvDir: string]: DocumentFile[]; } = {};
/** 本地存云文档的ID，省去每次请求 */
let sheetIDMap: { [spreadsheetToken: string]: string; } = {};
/** 计时器 */
let timerID: NodeJS.Timer;


/** 检测到更新的列表 */
let syncList: {
	composite: { fileData: DocumentFile, kvDir: string; }[],
	single: { fileData: DocumentFile, kvDir: string; }[],
} = {
	composite: [],
	single: [],
};

/** 云表格初始化 */
export async function sheetCloudInit(context: vscode.ExtensionContext) {
	context.subscriptions.push(statusBarItem);
	if (sheetCloud === undefined) {
		sheetCloud = new FeiShu();
		const success = await sheetCloud.getTenantAccessToken();
		if (success) {
			await syncCloudFiles();
			statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -2);
			refreshStatusBar();
			statusBarItem.show();
			statusBarItem.command = "dota2tools.fetch_all_sheet";
		}
	}
	if (timerID == undefined) {
		timerID = setInterval(() => {
			checkCloundChange();
		}, 5000);
	}
	checkCloundChange();

	//云配置表: 更新文件列表
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_files", async (data) => {
		await syncCloudFiles();
	}));

	// 获取所有表格到本地
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.fetch_all_sheet", async (data) => {
		if (statusBarItem) {
			statusBarItem.text = '$(sync~spin)';
		}
		if (syncList.composite.length == 0 && syncList.single.length == 0) {
			// 创建一个空数组，用于存储所有异步任务的 Promise
			const promises: Promise<void>[] = [];
			// 遍历技能表
			for (const kvDir in compositeFileList) {
				const files = compositeFileList[kvDir];
				for (const fileData of files) {
					promises.push(processFileData(fileData, kvDir, abilityCSV2KV));
				}
			}
			// 遍历单位表
			for (const kvDir in singleFileList) {
				const files = singleFileList[kvDir];
				for (const fileData of files) {
					promises.push(processFileData(fileData, kvDir, unitCSV2KV));
				}
			}
			// 使用 Promise.all 等待所有异步任务完成
			Promise.all(promises).then(() => {
				// 在所有异步任务完成后执行某些操作
				if (statusBarItem) {
					statusBarItem.text = '$(sync)';
				}
			});
		} else {
			const promises: Promise<void>[] = [];
			for (const data of syncList.composite) {
				promises.push(processFileData(data.fileData, data.kvDir, abilityCSV2KV));
			}
			for (const data of syncList.single) {
				promises.push(processFileData(data.fileData, data.kvDir, unitCSV2KV));
			}
			// 使用 Promise.all 等待所有异步任务完成
			Promise.all(promises).then(() => {
				// 在所有异步任务完成后执行某些操作
				clearSyncList();
				if (statusBarItem) {
					statusBarItem.text = '$(sync)';
				}
			});
		}
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
					if (t[0].label.indexOf("$(run-all)") != -1) {
						processFileData(data.fileData, data.kvDir, abilityCSV2KV);
					} else {
						processFileData(data.fileData, data.kvDir, unitCSV2KV);
					}
				}
			}
			vsndPick.dispose();
		});
	}));


}

async function processFileData(fileData: DocumentFile, kvDir: string, method: typeof abilityCSV2KV | typeof unitCSV2KV): Promise<void> {
	const spreadsheetToken = fileData.token;
	let sheetID = getSheetID(spreadsheetToken);
	// 第一次获取就存下来，减少接口请求次数
	if (sheetID == undefined) {
		const sheetInfo = await sheetCloud.getSheetMetaInfo(spreadsheetToken);
		if (sheetInfo) {
			sheetID = sheetInfo.sheetId;
			sheetIDMap[spreadsheetToken] = sheetID;
		}
	}
	if (sheetID) {
		const sheetData = await sheetCloud.getSheetData(spreadsheetToken, sheetID);
		if (sheetData) {
			const csv = convertToCSV(sheetData.data.valueRange.values);
			await saveCSVToKVDir(csv, kvDir, fileData, method);
		}
	}
}

async function saveCSVToKVDir(csv: string, kvDir: string, fileData: DocumentFile, method: typeof abilityCSV2KV | typeof unitCSV2KV): Promise<void> {
	const realKvDir = getRealKvDir(kvDir);
	if (realKvDir) {
		await dirExists(realKvDir);

		const data = writeKeyValue({ KeyValue: method(csv) });
		const filePath = path.join(realKvDir, getExtname(fileData.name));
		fs.writeFileSync(filePath, data);
		// TODO:会触发监听的文件变更导致生成两次js
		fs.utimesSync(filePath, fileData.created_time, fileData.modified_time);
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
		// 遍历配置的单位表
		for (const kvDir in singleConfig) {
			if (singleFileList[kvDir] == undefined) {
				singleFileList[kvDir] = [];
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
				description: fileData.token
			});
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			quickPickItemList.push({
				label: "$(run) " + fileData.name,
				description: fileData.token
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
			if (fileData.token == target_token) {
				return { fileData, kvDir };
			}
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			if (fileData.token == target_token) {
				return { fileData, kvDir };
			}
		}
	}
}
async function checkCloundChange() {
	const cloudDocInfo: Record<string, number> = {};
	const tokenList = [];
	// 收集token
	for (const kvDir in compositeFileList) {
		const files = compositeFileList[kvDir];
		for (const fileData of files) {
			tokenList.push(fileData.token);
			// cloudDocInfo[fileData.name] = Number(fileData.modified_time);
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			tokenList.push(fileData.token);
			// cloudDocInfo[fileData.name] = Number(fileData.modified_time);
		}
	}
	// 更新元数据
	const metas = await sheetCloud.getMetaData(tokenList);
	if (metas) {
		for (const fileData of metas.data.docs_metas) {
			cloudDocInfo[fileData.title] = Number(fileData.latest_modify_time);
		}
	}
	// 更新本地储存
	for (const kvDir in compositeFileList) {
		for (let index = 0; index < compositeFileList[kvDir].length; index++) {
			const fileData = compositeFileList[kvDir][index];
			if (fileData.name == fileData.name && cloudDocInfo[fileData.name]) {
				compositeFileList[kvDir][index].modified_time = String(cloudDocInfo[fileData.name]);
			}
		}
	}
	for (const kvDir in singleFileList) {
		for (let index = 0; index < singleFileList[kvDir].length; index++) {
			const fileData = singleFileList[kvDir][index];
			if (fileData.name == fileData.name && cloudDocInfo[fileData.name]) {
				singleFileList[kvDir][index].modified_time = String(cloudDocInfo[fileData.name]);
			}
		}
	}

	let syncNameList = [];
	clearSyncList();
	for (const kvDir in compositeFileList) {
		const files = compositeFileList[kvDir];
		for (const fileData of files) {
			const realKvDir = getRealKvDir(kvDir);
			if (realKvDir) {
				const filePath = path.join(realKvDir, getExtname(fileData.name));
				const stats = fs.statSync(filePath);
				const modificationTime = Math.floor(stats.mtimeMs / 1000);
				const cloudTime = cloudDocInfo[fileData.name];
				if (cloudTime != undefined && cloudTime != modificationTime) {
					syncNameList.push(fileData.name);
					syncList.composite.push({
						fileData: fileData, kvDir: kvDir
					});
				}
			}
		}
	}
	for (const kvDir in singleFileList) {
		const files = singleFileList[kvDir];
		for (const fileData of files) {
			const realKvDir = getRealKvDir(kvDir);
			if (realKvDir) {
				const filePath = path.join(realKvDir, getExtname(fileData.name));
				const stats = fs.statSync(filePath);
				const modificationTime = Math.floor(stats.mtimeMs / 1000);
				const cloudTime = cloudDocInfo[fileData.name];
				if (cloudTime != undefined && cloudTime != modificationTime) {
					syncNameList.push(fileData.name);
					syncList.single.push({
						fileData: fileData, kvDir: kvDir
					});
				}
			}
		}
	}
	refreshStatusBar(syncNameList);
}

function refreshStatusBar(syncNameList?: string[]) {
	if (syncNameList && syncNameList.length > 0) {
		const count = syncNameList.length;
		statusBarItem.text = `$(sync) ${count}↓`;
		statusBarItem.tooltip = new vscode.MarkdownString(`云配置表: 获取以下kv` + syncNameList.map((name) => { return "\n- " + name; }).join(""));
		if (getConfiguration()) {
			syncCloundSheet();
		}
	} else {
		statusBarItem.tooltip = new vscode.MarkdownString(`云配置表: 获取所有表格到本地KV`);
		statusBarItem.text = '$(sync)';
	}
}

function clearSyncList() {
	syncList = { composite: [], single: [] };
}

function getConfiguration() {
	let listenerConfig: ListenerConfig | undefined = vscode.workspace.getConfiguration().get("dota2-tools.A3.listener");
	if (listenerConfig) {
		return listenerConfig.cloud_sheet || false;
	}
}
//
function syncCloundSheet() {
	if (statusBarItem) {
		statusBarItem.text = '$(sync~spin)';
	}
	const promises: Promise<void>[] = [];
	for (const data of syncList.composite) {
		promises.push(processFileData(data.fileData, data.kvDir, abilityCSV2KV));
	}
	for (const data of syncList.single) {
		promises.push(processFileData(data.fileData, data.kvDir, unitCSV2KV));
	}
	// 使用 Promise.all 等待所有异步任务完成
	Promise.all(promises).then(() => {
		// 在所有异步任务完成后执行某些操作
		clearSyncList();
		if (statusBarItem) {
			statusBarItem.text = '$(sync)';
		}
	});
}