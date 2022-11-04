import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import watch from "node-watch";
import { EventManager, EventType } from "../class/event";
import { getRootPath } from "../utils/getRootPath";
import { eachExcelConfig } from "../command/cmdExcel2KV";
import { abilityCSV2KV } from "../utils/csvUtils";
import { showStatusBarMessage } from "../module/statusBar";
import { writeKeyValue } from "../utils/kvUtils";

let eventID: number;
let fileWatcher: fs.FSWatcher | undefined;
const configName = "dota2-tools.A3.listener";
let config: boolean | undefined;

/** 监听技能excel变更 */
export function listenerAbilityExcelInit(context: vscode.ExtensionContext) {
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
				stopWatch();
				startWatch(context);
			} else {
				stopWatch();
			}
		});
	}
}
/** 开始监听 */
function startWatch(context: vscode.ExtensionContext) {
	if (fileWatcher === undefined) {
		const rootPath = getRootPath();
		if (rootPath) {
			showStatusBarMessage("[监听目录]：技能excel");
			let abilityExcelConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.A4.AbilityExcel');
			fileWatcher = watch(rootPath, { recursive: true, filter: /\.csv$/ }, function (evt, name) {
				if (abilityExcelConfig) {
					eachExcelConfig(abilityExcelConfig, (kvDir, excelDir) => {
						if (path.normalize(excelDir) == path.normalize(path.dirname(name)).replace("\\csv", "")) {
							const kvName = path.join(kvDir, path.basename(name).replace(path.extname(name), '.kv'));
							fs.writeFileSync(kvName, writeKeyValue({ KeyValue: abilityCSV2KV(name) }));
							showStatusBarMessage("[excel导出kv]：" + path.basename(name).replace(path.extname(name), '.kv'));
							// excel2kv(kvDir, path.join(excelDir, path.basename(name).replace(path.extname(name), ".xlsm")), abilityCSV2KV);
							return false;
						}
					});
				}
			});
		} else {
			// vscode.window.showErrorMessage(`[${localize("listenerLocalizationInit")}]${localize("game_folder_no_found")}`);
		}
	}
}
/** 停止监听 */
export function stopWatch() {
	if (fileWatcher) {
		showStatusBarMessage("[停止监听目录]：技能excel");
		fileWatcher.close();
		fileWatcher = undefined;
	}
}
/** 是否开启监听 */
function getConfiguration() {
	let listenerConfig: ListenerConfig | undefined = vscode.workspace.getConfiguration().get(configName);
	if (listenerConfig) {
		return listenerConfig.ability_excel || false;
	}
}