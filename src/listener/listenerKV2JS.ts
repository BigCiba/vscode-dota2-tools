import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import watch from "node-watch";
import { EventManager, EventType } from "../Class/event";
import { combineLocalization } from "../command/cmdCombineLocalization";
import { getContentDir, getGameDir, isValidFolder } from "../module/addonInfo";
import { localize } from "../utils/localize";
import { getPathInfo } from "../utils/pathUtils";
import { getBaseInfo, getKeyValueObjectByIndex, readKeyValue2 } from "../utils/kvUtils";
import { generateJS } from "../command/cmdKvToJs";
import { log } from "console";

let eventID: number;
let fileWatcher: fs.FSWatcher | undefined;
let baseInfo: Table = [];
const configName = "dota2-tools.A3.listener";
let config: boolean | undefined;

/** 监听kv变更自动转js */
export function listenerKV2JSInit(context: vscode.ExtensionContext) {
	config = getConfiguration();
	if (getConfiguration()) {
		startWatch(context);
	}
	if (eventID === undefined) {
		eventID = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
			if (!event.affectsConfiguration(configName) || getConfiguration() === config) {
				return;
			}
			config = getConfiguration();
			if (getConfiguration()) {
				startWatch(context);
			} else {
				stopWatch();
			}
		});
	}
}
/** 开始监听 */
async function startWatch(context: vscode.ExtensionContext) {
	if (fileWatcher === undefined) {
		if (isValidFolder()) {
			const contentDir = getContentDir();
			if (contentDir) {
				const gameDir = getGameDir();
				const config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
				let sKvPath = path.join(gameDir + config);
				if (await getPathInfo(sKvPath) === false) {
					// vscode.window.showErrorMessage(localize("dota2-tools.KV to Js Config.no_found"));
					return;
				}
				console.log("[监听目录]: kv转js");
				let kvJsConfig = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));

				// 初始化#base信息
				for (const sKVName in kvJsConfig.kvfiles) {
					let sPath = kvJsConfig.kvfiles[sKVName];
					let sTotalPath = gameDir + '/scripts/' + sPath;
					let baseList = await getBaseInfo(sTotalPath);
					if (baseList.length > 0) {
						for (const basePath of baseList) {
							if (baseInfo[basePath] == undefined) {
								baseInfo[basePath] = [];
							}
							baseInfo[basePath].push(sKVName);
						}
					}
				}
				fileWatcher = watch(gameDir + '/scripts', { recursive: true, filter: /\.txt$|\.kv$/ }, function (evt, name) {
					for (const sKVName in kvJsConfig.kvfiles) {
						if (path.normalize(name).indexOf(path.normalize(kvJsConfig.kvfiles[sKVName])) !== -1) {
							generateJS(context, kvJsConfig, sKVName);
						}
					}
					for (const kvPath in baseInfo) {
						if (path.normalize(name).indexOf(path.normalize(kvPath)) !== -1) {
							const parentList = baseInfo[kvPath];
							for (const sKVName of parentList) {
								generateJS(context, kvJsConfig, sKVName);
							}
						}
					}
				});
			} else {
				// vscode.window.showErrorMessage(`[${localize("listenerKV2JSInit")}]${localize("content_folder_no_found")}`);
			}
		} else {
			// vscode.window.showErrorMessage(`[${localize("listenerKV2JSInit")}]${localize("game_folder_no_found")}`);
		}
	}
}
/** 停止监听 */
export function stopWatch() {
	if (fileWatcher) {
		console.log("[停止监听目录]: kv转js");
		fileWatcher.close();
		fileWatcher = undefined;
	}
}
/** 是否开启监听 */
function getConfiguration() {
	let listenerConfig: ListenerConfig | undefined = vscode.workspace.getConfiguration().get(configName);
	if (listenerConfig) {
		return listenerConfig.kv2js || false;
	}
}