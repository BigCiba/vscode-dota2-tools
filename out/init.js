"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const cmdDota2IconPanel_1 = require("./command/cmdDota2IconPanel");
const cmdDota2ItemsGame_1 = require("./command/cmdDota2ItemsGame");
const cmdVsndPicker_1 = require("./command/cmdVsndPicker");
const kv2lua_1 = require("./definitionProvider/kv2lua");
const listenerAbilityExcel_1 = require("./listener/listenerAbilityExcel");
const listenerKV2JS_1 = require("./listener/listenerKV2JS");
const listenerLocalization_1 = require("./listener/listenerLocalization");
const listenerUnitExcel_1 = require("./listener/listenerUnitExcel");
const addonInfo_1 = require("./module/addonInfo");
const apiNote_1 = require("./module/apiNote");
const completion_1 = require("./module/completion");
const statusBar_1 = require("./module/statusBar");
const treeApi_1 = require("./module/treeApi");
const localize_1 = require("./utils/localize");
const event_1 = require("./class/event");
/** 模块列表 */
const moduleList = {
    // "localizeInit": localizeInit,
    // "statusBarItemInit": statusBarItemInit,
    "addonInfoInit": addonInfo_1.addonInfoInit,
    "dota2IconPanelInit": cmdDota2IconPanel_1.dota2IconPanelInit,
    "dota2ItemsGameInit": cmdDota2ItemsGame_1.dota2ItemsGameInit,
    "vsndPickerInit": cmdVsndPicker_1.vsndPickerInit,
    "apiNoteInit": apiNote_1.apiNoteInit,
    "luaApiInit": treeApi_1.luaApiInit,
    "jsApiInit": treeApi_1.jsApiInit,
    "cssApiInit": treeApi_1.cssApiInit,
    "panelDocumentInit": treeApi_1.panelDocumentInit,
    "luaCompletionInit": completion_1.luaCompletionInit,
    "jsCompletionInit": completion_1.jsCompletionInit,
    "cssCompletionInit": completion_1.cssCompletionInit,
    "kv2luaInit": kv2lua_1.kv2luaInit,
    "listenerLocalizationInit": listenerLocalization_1.listenerLocalizationInit,
    "listenerKV2JSInit": listenerKV2JS_1.listenerKV2JSInit,
    "listenerAbilityExcelInit": listenerAbilityExcel_1.listenerAbilityExcelInit,
    "listenerUnitExcelInit": listenerUnitExcel_1.listenerUnitExcelInit,
};
/** 跳过的模块对应的用户设置 */
const skipModuleList = {
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
};
let eventID;
const configName = "dota2-tools.A1.module_list";
/** 用户设置 */
let moduleListConfig = vscode.workspace.getConfiguration().get(configName);
/**
 * 进行初始化操作
 * @param context
 */
async function init(context) {
    // 监听配置变更
    if (eventID === undefined) {
        eventID = event_1.EventManager.listenToEvent(event_1.EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, async (event) => {
            if (!event.affectsConfiguration(configName)) {
                return;
            }
            let timeRecord = (new Date()).valueOf();
            let newModuleListConfig = vscode.workspace.getConfiguration().get(configName);
            const keys = Object.keys(moduleList);
            for (let i = 0; i < keys.length; i++) {
                const moduleName = keys[i];
                if (newModuleListConfig) {
                    if (isSkipModule(moduleName) && newModuleListConfig[skipModuleList[moduleName]] !== false) {
                        let messageIndex = (0, statusBar_1.showStatusBarMessage)(`[${i + 1}/${keys.length}]${(0, localize_1.localize)("loading")}：${(0, localize_1.localize)(moduleName)}`, 20);
                        await moduleList[moduleName](context);
                        (0, statusBar_1.refreshStatusBarMessage)(messageIndex, `[${i + 1}/${keys.length}]${(0, localize_1.localize)("load_complete")}：${(0, localize_1.localize)(moduleName)}，${(0, localize_1.localize)("time_consuming")}：${(new Date()).valueOf() - timeRecord}${(0, localize_1.localize)("millisecond")}`, 20);
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
        const moduleName = keys[i];
        if (moduleListConfig) {
            if (isSkipModule(moduleName)) {
                (0, statusBar_1.showStatusBarMessage)(`[${i + 1}/${keys.length}]${(0, localize_1.localize)("skip_disabled_modules")}：${(0, localize_1.localize)(moduleName)}`);
                continue;
            }
        }
        let messageIndex = (0, statusBar_1.showStatusBarMessage)(`[${i + 1}/${keys.length}]${(0, localize_1.localize)("loading")}：${(0, localize_1.localize)(moduleName)}`, 20);
        await moduleList[moduleName](context);
        (0, statusBar_1.refreshStatusBarMessage)(messageIndex, `[${i + 1}/${keys.length}]${(0, localize_1.localize)("load_complete")}：${(0, localize_1.localize)(moduleName)}，${(0, localize_1.localize)("time_consuming")}：${(new Date()).valueOf() - timeRecord}${(0, localize_1.localize)("millisecond")}`, 20);
        timeRecord = (new Date()).valueOf();
    }
    (0, statusBar_1.showStatusBarMessage)((0, localize_1.localize)("allLoaded"), 20);
    (0, statusBar_1.getStatusBarItem)().text = "$(check-all) " + (0, localize_1.localize)("pluginNameLite");
}
exports.init = init;
/** 禁用模块判断 */
function isSkipModule(moduleName) {
    if (skipModuleList[moduleName] !== undefined && moduleListConfig != undefined && moduleListConfig[skipModuleList[moduleName]] === false) {
        return true;
    }
    return false;
}
//# sourceMappingURL=init.js.map