import * as fs from 'fs';
import * as path from 'path';
import { setInterval } from 'timers';
import * as vscode from 'vscode';
import { FeiShu } from '../Class/FeiShu';
import { abilityCSV2KV, unitCSV2KV } from '../utils/csvUtils';
import { getRootPath } from '../utils/getRootPath';
import { writeKeyValue } from '../utils/kvUtils';
import { localize } from '../utils/localize';
import { dirExists } from '../utils/pathUtils';
import { getContentDir, getGameDir } from './addonInfo';
import { showStatusBarMessage } from './statusBar';

let sheetCloud: FeiShu;
let statusBarItem: vscode.StatusBarItem;
let branchStatusBarItem: vscode.StatusBarItem;
/** 双行文件列表 */
let compositeFileList: { [kvDir: string]: DocumentFile[]; } = {};
/** 单行文件列表 */
let singleFileList: { [kvDir: string]: DocumentFile[]; } = {};
/** 云表格到csv */
let sheetToCsvList: { [kvDir: string]: DocumentFile[]; } = {};
/** 本地存云文档的ID，省去每次请求 */
let sheetIDMap: { [spreadsheetToken: string]: string; } = {};
/** 计时器 */
let timerID: NodeJS.Timer;
/** 本地分支缓存，省去每次请求 */
let branchList: { [name: string]: string; } = {};
/** 导出任务列表，用来轮询 */
let exportTaskList: Record<string, { ticket: string, kvDir: string, fileName: string; }> = {};
/** 轮询计时器 */
let exportTaskTimerID: NodeJS.Timer;


/** 检测到更新的列表 */
let syncList: {
	composite: { fileData: DocumentFile, kvDir: string; }[],
	single: { fileData: DocumentFile, kvDir: string; }[],
	csv: { fileData: DocumentFile, kvDir: string; }[],
} = {
	composite: [],
	single: [],
	csv: [],
};

/** 云表格初始化 */
export async function sheetCloudInit(context: vscode.ExtensionContext) {
	context.subscriptions.push(statusBarItem);
	context.subscriptions.push(branchStatusBarItem);
	if (sheetCloud === undefined) {
		sheetCloud = new FeiShu();
		const success = await sheetCloud.getTenantAccessToken();
		if (success) {
			await syncCloudFiles();
			await syncBranchList();
			statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -3);
			refreshStatusBar();
			statusBarItem.show();
			statusBarItem.command = "dota2tools.fetch_all_sheet";
			branchStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -2);
			branchStatusBarItem.text = '$(git-branch) ' + getBranch();
			branchStatusBarItem.command = "dota2tools.sheet_cloud_show_branch";
			branchStatusBarItem.show();
		}
	}
	if (timerID == undefined) {
		timerID = setInterval(() => {
			checkCloundChange();
		}, 5000);
	}
	if (exportTaskTimerID == undefined) {
		exportTaskTimerID = setInterval(() => {
			checkExportTask();
		}, 3000);
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
			// 遍历csv表
			for (const kvDir in sheetToCsvList) {
				const files = sheetToCsvList[kvDir];
				for (const fileData of files) {
					promises.push(exportSheetToCsv(fileData, kvDir));
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

	// 显示分支选项
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.sheet_cloud_show_branch", async (data) => {
		const getBranchOptionItems = () => {
			const result: vscode.QuickPickItem[] = [
				{
					label: "$(add) 创建新分支...",
					alwaysShow: true,
				},
				{
					label: "",
					kind: vscode.QuickPickItemKind.Separator,
				},
				{
					label: "$(git-branch) main",
					description: "主分支"
				}
			];
			for (const branchName in branchList) {
				result.push({
					label: "$(git-branch) " + branchName + "(暂时没用)",
					description: branchList[branchName]
				});
			}
			return result;
		};
		const getBranchFiles = () => {
			return getFilesQuickPick().map((item) => {
				item.alwaysShow = true;
				return item;
			});
		};
		vscode.window.showQuickPick(getBranchOptionItems(), { placeHolder: '选择要签出的云配置表分支' }).then(async (t) => {
			if (t && t.alwaysShow) {
				vscode.window.showInputBox({ placeHolder: `分支名称（按"Enter"以确认或按"Esc"以取消）` }).then((t) => {
					if (t && t != "") {
						const branchName = t;
						vscode.window.showQuickPick(getBranchFiles(), { placeHolder: '选择要复制到分支的配置表', canPickMany: true }).then(async (t) => {
							if (t && t.length > 0) {
								// 切换分支
								await switchBranch(branchName);
								// 创建需要的文件夹并复制文件到分支文件夹中
								const folderList: Record<string, {
									name: string,
									token: string,
									kvDir: string,
									composite: boolean;
								}[]> = {};
								for (const item of t) {
									if (item.description) {
										const data = getDocumentFileByToken(item.description);
										if (data) {
											const match = data.kvDir.match(/([^\/]+)$/);
											if (match) {
												const folderName = match[1];
												if (folderList[folderName] == undefined) {
													folderList[folderName] = [];
												}
												folderList[folderName].push({
													name: data.fileData.name,
													token: item.description,
													kvDir: data.kvDir,
													composite: item.label.indexOf("$(run-all)") != -1
												});
											}
										}
									}
								}
								const branchFolderRes = await sheetCloud.createFolder(branchName, sheetCloud.branchFolder);
								let compositeBranchConfig: Record<string, string> = {};
								let singleBranchConfig: Record<string, string> = {};
								if (branchFolderRes && branchFolderRes.code == 0) {
									// 直接存入本地分支列表
									branchList[branchName] = branchFolderRes.data.token;
									// 复制文件
									for (let folderName in folderList) {
										const data = folderList[folderName];
										const folderRes = await sheetCloud.createFolder(folderName, branchFolderRes.data.token);
										const folderToken = folderRes?.data.token;
										if (folderToken) {
											for (const iterator of data) {
												if (iterator.composite) {
													if (compositeBranchConfig[iterator.kvDir] == undefined) {
														compositeBranchConfig[iterator.kvDir] = folderToken;
													}
												} else {
													if (singleBranchConfig[iterator.kvDir] == undefined) {
														singleBranchConfig[iterator.kvDir] = folderToken;
													}
												}
												await sheetCloud.copyFile(iterator.token, iterator.name, folderToken);
											}
										}
									}
								}
								// 修改设置
								await vscode.workspace.getConfiguration().update("dota2-tools.A8.Branch Composite", compositeBranchConfig, vscode.ConfigurationTarget.Global);
								await vscode.workspace.getConfiguration().update("dota2-tools.A8.Branch Single", singleBranchConfig, vscode.ConfigurationTarget.Global);
								await resyncCloudFiles();
							}
						});
					} else {
						vscode.window.showErrorMessage("分支名称不能为空");
					}
				});
			} else {
				if (t?.description) {
					if (t.description == "主分支") {
						await switchBranch("main");
						await resyncCloudFiles("main");
					} else {
						// const branchName = t.label.replace("$(git-branch) ", "");
						// await switchBranch(branchName);
						// await resyncCloudFiles(t.description);
					}
				}
			}
		});
	}));
	// 下载多维表格文本
	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.export_record", async (data) => {
		vscode.window.showQuickPick([{ label: "Schinese" }, { label: "English" }, { label: "Russian" }], { placeHolder: '选择语言' }).then(async (t) => {
			if (t) {
				const language = t.label;
				const result = await sheetCloud.exportRecords(language);
				let insert = "";
				for (const key in result) {
					const element = result[key];
					if (element != undefined) {
						insert += `\t\t"${key}"	"${element}"\n`;
					}
				}
				const exportText = `"lang"
{
	"Language"		"${language}"
	"Tokens"
	{
${insert}
	}
}`;
				fs.writeFileSync(path.join(getGameDir(), `resource/addon_${language.toLowerCase()}.txt`), exportText);

			}
		});

	}));
}

/** 把文件直接导出为kv */
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
			sheetData.data.valueRange.values.forEach((row) => {
				row.forEach((cell, i) => {
					if (cell === undefined || cell === null) {
						row[i] = "";
					} else if (typeof cell == "number") {
						row[i] = String(cell);
					}
				});
			});
			await saveCSVToKVDir(sheetData.data.valueRange.values, kvDir, fileData, method);
		}
	}
}
/** 把文件直接导出为csv */
async function exportSheetToCsv(fileData: DocumentFile, kvDir: string): Promise<void> {
	console.log("exportSheetToCsv");

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
		const fileName = fileData.name;
		console.log("sheetID", sheetID);
		sheetCloud.client.drive.exportTask.create({
			data: {
				file_extension: 'csv',
				token: spreadsheetToken,
				type: 'sheet',
				sub_id: sheetID,
			},
		}).then(res => {
			console.log("exportTask res", res);
			if (res?.code == 0 && res?.data?.ticket) {
				console.log("exportTaskList", exportTaskList);
				exportTaskList[spreadsheetToken] = {
					ticket: res.data.ticket,
					kvDir: kvDir,
					fileName
				};
			}
		});

	}
}

async function saveCSVToKVDir(csv: string[][], kvDir: string, fileData: DocumentFile, method: typeof abilityCSV2KV | typeof unitCSV2KV): Promise<void> {
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
	const rootPath = getRootPath();
	if (rootPath) {
		if (path.isAbsolute(realKvDir) === false) {
			realKvDir = path.join(rootPath, kvDir);
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
				if (fileData.type == "sheet") {
					compositeFileList[kvDir].push(fileData);
				}
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
				if (fileData.type == "sheet") {
					singleFileList[kvDir].push(fileData);
				}
			}
		}
		const sheetToCsvConfig = getSheetToCsvConfig();
		// 遍历配置的单位表
		for (const token in sheetToCsvConfig) {
			const kvDir = sheetToCsvConfig[token];
			if (sheetToCsvList[kvDir] == undefined) {
				sheetToCsvList[kvDir] = [];
			}
			const files = await sheetCloud.getDocumentList(token);
			for (const fileData of files) {
				if (fileData.type == "sheet") {
					sheetToCsvList[kvDir].push(fileData);
				}
			}
		}
	});
}
async function syncBranchList() {
	await syncAction(async () => {
		if (sheetCloud) {
			const folderList = await sheetCloud.getDocumentList(sheetCloud.branchFolder);
			if (folderList) {
				for (const folderInfo of folderList) {
					if (folderInfo.type == "folder") {
						branchList[folderInfo.name] = folderInfo.token;
					}
				}
			}
		}
	});
}

function getCompositeConfig(): Record<string, string> {
	if (getBranch() == "main") {
		return vscode.workspace.getConfiguration().get('dota2-tools.A8.CloudSheetComposite', {});
	} else {
		return vscode.workspace.getConfiguration().get('dota2-tools.A8.Branch Composite', {});
	}
}
function getSingleConfig(): Record<string, string> {
	if (getBranch() == "main") {
		return vscode.workspace.getConfiguration().get('dota2-tools.A8.CloudSheetSingle', {});
	} else {
		return vscode.workspace.getConfiguration().get('dota2-tools.A8.Branch Single', {});
	}
}
function getSheetToCsvConfig(): Record<string, string> {
	return vscode.workspace.getConfiguration().get('dota2-tools.A8.CloudSheetToCsv', {});
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
	for (const kvDir in sheetToCsvList) {
		const files = sheetToCsvList[kvDir];
		for (const fileData of files) {
			if (fileData.token == target_token) {
				return { fileData, kvDir };
			}
		}
	}
}
// 轮询exportTaskList
function checkExportTask() {
	if (Object.keys(exportTaskList).length > 0) {
		const tempExportTaskList = { ...exportTaskList };
		for (const token in tempExportTaskList) {
			const task = tempExportTaskList[token];

			sheetCloud.client.drive.exportTask.get({
				path: {
					ticket: task.ticket,
				},
				params: {
					token: token,
				},
			}).then(res => {
				if (res.code == 0 && res.data?.result?.file_token) {
					delete exportTaskList[token];
					sheetCloud.client.drive.exportTask.download({
						path: {
							file_token: res.data.result.file_token,
						},
					}).then(async res => {
						const kvDir = task.kvDir;
						const fileName = task.fileName;
						const realKvDir = getRealKvDir(kvDir);
						if (realKvDir) {
							await dirExists(realKvDir);
							const filePath = path.join(realKvDir, fileName + ".csv");
							console.log("filePath", filePath);
							res.writeFile(filePath);
						}
					});

				}
			});
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
	for (const kvDir in sheetToCsvList) {
		const files = sheetToCsvList[kvDir];
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
	for (const kvDir in sheetToCsvList) {
		for (let index = 0; index < sheetToCsvList[kvDir].length; index++) {
			const fileData = sheetToCsvList[kvDir][index];
			if (fileData.name == fileData.name && cloudDocInfo[fileData.name]) {
				sheetToCsvList[kvDir][index].modified_time = String(cloudDocInfo[fileData.name]);
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
	for (const kvDir in sheetToCsvList) {
		const files = sheetToCsvList[kvDir];
		for (const fileData of files) {
			const realKvDir = getRealKvDir(kvDir);
			if (realKvDir) {
				const filePath = path.join(realKvDir, getExtname(fileData.name));
				const stats = fs.statSync(filePath);
				const modificationTime = Math.floor(stats.mtimeMs / 1000);
				const cloudTime = cloudDocInfo[fileData.name];
				if (cloudTime != undefined && cloudTime != modificationTime) {
					syncNameList.push(fileData.name);
					syncList.csv.push({
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
		if (statusBarItem) {
			statusBarItem.tooltip = new vscode.MarkdownString(`云配置表: 获取所有表格到本地KV`);
			statusBarItem.text = '$(sync)';
		}
	}
}

function clearSyncList() {
	syncList = { composite: [], single: [], csv: [] };
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

/** 切换分支 */
async function switchBranch(branchName: string) {
	await vscode.workspace.getConfiguration().update("dota2-tools.A8.current_branch", branchName, vscode.ConfigurationTarget.Global);
	branchStatusBarItem.text = '$(git-branch) ' + branchName;
	if (branchName == "main") {
		await vscode.workspace.getConfiguration().update("dota2-tools.A8.Branch Composite", {}, vscode.ConfigurationTarget.Global);
		await vscode.workspace.getConfiguration().update("dota2-tools.A8.Branch Single", {}, vscode.ConfigurationTarget.Global);
	}
}

/** 重新同步云文件 */
async function resyncCloudFiles(branchFolderToken?: string) {
	compositeFileList = {};
	singleFileList = {};
	if (branchFolderToken != undefined) {
		const folderList = await sheetCloud.getDocumentList(branchFolderToken);

	}
	await syncCloudFiles();
}

function getBranch() {
	return vscode.workspace.getConfiguration().get("dota2-tools.A8.current_branch", "main");
}
// addGitIgnore();
// /** 自动把dota2-tools.json加入gitignore */
// async function addGitIgnore() {
// 	const rootPath = getRootPath();
// 	if (rootPath) {
// 		const stat = await vscode.workspace.fs.stat(vscode.Uri.file(path.join(rootPath, ".gitignore")));
// 		const stat2 = await vscode.workspace.fs.stat(vscode.Uri.file(path.join(rootPath, ".gitignore2")));
// 	}
// }