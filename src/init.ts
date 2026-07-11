/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { EventManager, EventType } from "./Class/event";
import { dota2IconPanelInit } from './command/cmdDota2IconPanel';
import { dota2ItemsGameInit } from './command/cmdDota2ItemsGame';
import { vsndPickerInit } from './command/cmdVsndPicker';
import { kv2luaInit } from './definitionProvider/kv2lua';
import { listenerLocalizationInit } from './listener/listenerLocalization';
import { addonInfoInit } from './module/addonInfo';
import { apiNoteInit } from './module/apiNote';
import { cssCompletionInit, jsCompletionInit, luaCompletionInit } from './module/completion';
import { kvEditorInit } from './module/kvEditor';
import { getStatusBarItem, refreshStatusBarMessage, showStatusBarMessage } from './module/statusBar';
import { dotaSidebarInit } from './module/dotaSidebar';
import { localize } from './utils/localize';

/** Module list */
const moduleList = {
	"addonInfoInit": addonInfoInit,
	"dotaSidebarInit": dotaSidebarInit,
	"dota2IconPanelInit": dota2IconPanelInit,
	"dota2ItemsGameInit": dota2ItemsGameInit,
	"vsndPickerInit": vsndPickerInit,
	"apiNoteInit": apiNoteInit,
	"luaCompletionInit": luaCompletionInit,
	"jsCompletionInit": jsCompletionInit,
	"cssCompletionInit": cssCompletionInit,
	"kv2luaInit": kv2luaInit,
	"listenerLocalizationInit": listenerLocalizationInit,
	"kvEditorInit": kvEditorInit,
};

/** Modules that need to be loaded synchronously */
const syncModuleList = [
	// "addonInfoInit",
];

/** User settings corresponding to skipped modules */
const skipModuleList: { [key: string]: keyof ModuleListConfig; } = {
	"dota2IconPanelInit": "ability_icon",
	"dota2ItemsGameInit": "items_game",
	"vsndPickerInit": "vsnd_picker",
	"addonInfoInit": "addon_info",
	"luaCompletionInit": "lua_completion",
	"jsCompletionInit": "js_completion",
	"cssCompletionInit": "css_completion",
	"kv2luaInit": "kv_lua_associated",
	"kvEditorInit": "dota2kv",
};

let eventID: number;
const configName = "dota2-tools.A1.module_list";
/** User settings */
let moduleListConfig: ModuleListConfig | undefined = vscode.workspace.getConfiguration().get(configName);

/**
 * Perform initialization
 * @param context
 */
export async function init(context: vscode.ExtensionContext) {
	// Listen for configuration changes
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
						let messageIndex = showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("loading")}:${localize(moduleName)}`, 20);
						await moduleList[moduleName](context);
						refreshStatusBarMessage(messageIndex, `[${i + 1}/${keys.length}]${localize("load_complete")}:${localize(moduleName)},${localize("time_consuming")}:${(new Date()).valueOf() - timeRecord}${localize("millisecond")}`, 20);
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
				showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("skip_disabled_modules")}:${localize(moduleName)}`);
				continue;
			}
		}
		let messageIndex = showStatusBarMessage(`[${i + 1}/${keys.length}]${localize("loading")}:${localize(moduleName)}`, 20);

		await moduleList[moduleName](context);

		refreshStatusBarMessage(messageIndex, `[${i + 1}/${keys.length}]${localize("load_complete")}:${localize(moduleName)},${localize("time_consuming")}:${(new Date()).valueOf() - timeRecord}${localize("millisecond")}`, 20);
		timeRecord = (new Date()).valueOf();
	}
	showStatusBarMessage(localize("allLoaded"), 20);
	getStatusBarItem().text = "$(check-all) " + localize("pluginNameLite");
}

/** Determine whether a module is disabled */
function isSkipModule(moduleName: string) {
	if (skipModuleList[moduleName] !== undefined && moduleListConfig != undefined && moduleListConfig[skipModuleList[moduleName]] === false) {
		return true;
	}
	return false;
}