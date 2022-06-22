import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import watch from "node-watch";
import { EventManager, EventType } from "../class/event";
import { combineLocalization } from "../command/cmdCombineLocalization";
import { getGameDir, isValidFolder } from "../module/addonInfo";
import { localize } from "../utils/localize";
import { showStatusBarMessage } from "../module/statusBar";
import { getPathInfo } from "../utils/pathUtils";
import { getPathConfiguration } from "../utils/getPathConfiguration";

let eventID: number;
let fileWatcher: fs.FSWatcher | undefined;
const configName = "dota2-tools.A3.listener";
let config: boolean | undefined;

/** 监听文本变更自动合并 */
export function listenerLocalizationInit(context: vscode.ExtensionContext) {
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
			console.log("[监听目录]: 合并文本");
			let setting = getPathConfiguration("dota2-tools.A5.localization_path");
			if (setting && await getPathInfo(setting) !== false) {
				fileWatcher = watch(setting, { recursive: true, filter: /\.txt$/ }, function (evt, name) {
					if (setting) {
						let language = path.dirname(name).replace(setting, "").split("\\")[1];
						combineLocalization(language);
					}
				});
			}

			// fileWatcher = fs.watch(gameDir + '/localization', { recursive: true, persistent: false }, (event, filename) => {
			// 	console.log(event, filename);

			// });
			// fileWatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file(path.join(gameDir + '/schinese/localization')), '**/*.txt'), false, false, false);
			// fileWatcher.onDidChange((uri) => {
			// 	console.log(uri);
			// }, null, context.subscriptions);
		} else {
			showStatusBarMessage(`[${localize("listenerLocalizationInit")}]${localize("game_folder_no_found")}`);
		}
	}
}
/** 停止监听 */
function stopWatch() {
	if (fileWatcher) {
		console.log("[停止监听目录]: 合并文本");
		fileWatcher.close();
		fileWatcher = undefined;
	}
}
/** 是否开启监听 */
function getConfiguration() {
	let listenerConfig: ListenerConfig | undefined = vscode.workspace.getConfiguration().get(configName);
	if (listenerConfig) {
		return listenerConfig.localization || false;
	}
}