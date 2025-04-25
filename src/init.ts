/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { EventManager, EventType } from "./Class/event";
import { dota2IconPanelInit } from './command/cmdDota2IconPanel';
import { dota2ItemsGameInit } from './command/cmdDota2ItemsGame';
import { vsndPickerInit } from './command/cmdVsndPicker';
import { kv2luaInit } from './definitionProvider/kv2lua';
import { listenerAbilityExcelInit } from './listener/listenerAbilityExcel';
import { listenerKV2JSInit } from './listener/listenerKV2JS';
import { listenerLocalizationInit } from './listener/listenerLocalization';
import { listenerUnitExcelInit } from './listener/listenerUnitExcel';
import { addonInfoInit } from './module/addonInfo';
import { apiNoteInit } from './module/apiNote';
import { cssCompletionInit, jsCompletionInit, luaCompletionInit } from './module/completion';
import { sheetCloudInit } from './module/sheet_cloud';
import { getStatusBarItem, refreshStatusBarMessage, showStatusBarMessage } from './module/statusBar';
import { translateInit } from './module/translate';
import { cssApiInit, jsApiInit, luaApiInit, panelDocumentInit } from './module/treeApi';
import { localize } from './utils/localize';

/** 模块列表 */
const moduleList = {
	// "localizeInit": localizeInit,
	// "statusBarItemInit": statusBarItemInit,
	"addonInfoInit": addonInfoInit,
	"dota2IconPanelInit": dota2IconPanelInit,
	"dota2ItemsGameInit": dota2ItemsGameInit,
	"vsndPickerInit": vsndPickerInit,
	"apiNoteInit": apiNoteInit,
	"luaApiInit": luaApiInit,
	"jsApiInit": jsApiInit,
	"cssApiInit": cssApiInit,
	"panelDocumentInit": panelDocumentInit,
	"luaCompletionInit": luaCompletionInit,
	"jsCompletionInit": jsCompletionInit,
	"cssCompletionInit": cssCompletionInit,
	"kv2luaInit": kv2luaInit,
	"listenerLocalizationInit": listenerLocalizationInit,
	"listenerKV2JSInit": listenerKV2JSInit,
	"listenerAbilityExcelInit": listenerAbilityExcelInit,
	"listenerUnitExcelInit": listenerUnitExcelInit,
	"translateInit": translateInit,
	"sheetCloudInit": sheetCloudInit,
	// "kvEditorInit": kvEditorInit,
	// "localizationViewrInit": localizationViewrInit,
};

/** 需要同步加载的模块 */
const syncModuleList = [
	// "addonInfoInit",
];

/** 跳过的模块对应的用户设置 */
const skipModuleList: { [key: string]: keyof ModuleListConfig; } = {
	"dota2IconPanelInit": "ability_icon",
	"dota2ItemsGameInit": "items_game",
	"vsndPickerInit": "vsnd_picker",
	"addonInfoInit": "addon_info",
	"luaApiInit": "lua_api_tree",
	"jsApiInit": "js_api_tree",
	"cssApiInit": "css_api_tree",
	"panelDocumentInit": "panel_tree",
	"luaCompletionInit": "lua_completion",
	"jsCompletionInit": "js_completion",
	"cssCompletionInit": "css_completion",
	"kv2luaInit": "kv_lua_associated",
	"translateInit": "translate",
	"sheetCloudInit": "sheet_cloud",
	"kvEditorInit": "dota2kv",
};

let eventID: number;
const configName = "dota2-tools.A1.module_list";
/** 用户设置 */
let moduleListConfig: ModuleListConfig | undefined = vscode.workspace.getConfiguration().get(configName);

/**
 * 进行初始化操作
 * @param context 
 */
export async function init(context: vscode.ExtensionContext) {
	// 监听配置变更
	if (eventID === undefined) {
		eventID = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, async (event) => {
			if (!event.affectsConfiguration(configName)) {
				return;
			}
			let timeRecord = (new Date()).valueOf();
			let newModuleListConfig: ModuleListConfig | undefined = vscode.workspace.getConfiguration().get(configName);
			const keys = Object.keys(moduleList);
			for (let i = 0; i < keys.length; i++) {
				const moduleName = keys[i] as keyof typeof moduleList;
				if (newModuleListConfig) {
					if (isSkipModule(moduleName) && newModuleListConfig[skipModuleList[moduleName]] !== false) {
						let messageIndex = showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("loading")}：${localize(moduleName)}`, 20);
						await moduleList[moduleName](context);
						refreshStatusBarMessage(messageIndex, `[${i + 1}/${keys.length}]${localize("load_complete")}：${localize(moduleName)}，${localize("time_consuming")}：${(new Date()).valueOf() - timeRecord}${localize("millisecond")}`, 20);
						timeRecord = (new Date()).valueOf();
					}
				}
			}
			moduleListConfig = newModuleListConfig;
		});
	}

	let timeRecord = (new Date()).valueOf();

	const keys = Object.keys(moduleList);
	for (let i = 0; i < keys.length; i++) {
		const moduleName = keys[i] as keyof typeof moduleList;
		if (moduleListConfig) {
			if (isSkipModule(moduleName)) {
				showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("skip_disabled_modules")}：${localize(moduleName)}`);
				continue;
			}
		}
		let messageIndex = showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("loading")}：${localize(moduleName)}`, 20);

		await moduleList[moduleName](context);

		refreshStatusBarMessage(messageIndex, `[${i + 1}/${keys.length}]${localize("load_complete")}：${localize(moduleName)}，${localize("time_consuming")}：${(new Date()).valueOf() - timeRecord}${localize("millisecond")}`, 20);
		timeRecord = (new Date()).valueOf();
	}
	showStatusBarMessage(localize("allLoaded"), 20);
	getStatusBarItem().text = "$(check-all) " + localize("pluginNameLite");
}

/** 禁用模块判断 */
function isSkipModule(moduleName: string) {
	if (skipModuleList[moduleName] !== undefined && moduleListConfig != undefined && moduleListConfig[skipModuleList[moduleName]] === false) {
		return true;
	}
	return false;
}