"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const event_1 = require("./Class/event");
const cmdKvExport_1 = require("./command/cmdKvExport");
const cmdCombineLocalization_1 = require("./command/cmdCombineLocalization");
const cmdCopyWearable_1 = require("./command/cmdCopyWearable");
const cmdCreateWearableItems_1 = require("./command/cmdCreateWearableItems");
const cmdDota2IconPanel_1 = require("./command/cmdDota2IconPanel");
const cmdDota2ItemsGame_1 = require("./command/cmdDota2ItemsGame");
const cmdDropVPCf_1 = require("./command/cmdDropVPCf");
const cmdExcel2KV_1 = require("./command/cmdExcel2KV");
const cmdFormatKv_1 = require("./command/cmdFormatKv");
const cmdGenerateLuaApiDocument_1 = require("./command/cmdGenerateLuaApiDocument");
const cmdGetItemRemoveList_1 = require("./command/cmdGetItemRemoveList");
const cmdInheritCSV_1 = require("./command/cmdInheritCSV");
const cmdInheritTable_1 = require("./command/cmdInheritTable");
const cmdKvToJs_1 = require("./command/cmdKvToJs");
const cmdLuaApiChangelog_1 = require("./command/cmdLuaApiChangelog");
const cmdOpenKV_1 = require("./command/cmdOpenKV");
const cmdParseMapEntities_1 = require("./command/cmdParseMapEntities");
const cmdTranslateSelection_1 = require("./command/cmdTranslateSelection");
const cmdVsndPicker_1 = require("./command/cmdVsndPicker");
const init_1 = require("./init");
const localize_1 = require("./utils/localize");
const statusBar_1 = require("./module/statusBar");
const cmdPreProcessing_1 = require("./command/cmdPreProcessing");
const cmdQuickStart_1 = require("./command/cmdQuickStart");
const vmdlEditorProvider_1 = require("./CustomTextEditorProvider/vmdlEditorProvider");
const lazayboyProvider_1 = require("./CustomTextEditorProvider/lazayboyProvider");
const cmdGenerateVPDI_1 = require("./command/cmdGenerateVPDI");
const cmdDota2mklink_1 = require("./command/cmdDota2mklink");
const cmdExportWearable_1 = require("./command/cmdExportWearable");
const cmdExportModifierFunction_1 = require("./command/cmdExportModifierFunction");
const cmdExportWearableWithHero_1 = require("./command/cmdExportWearableWithHero");
const cmdExportWearablePortraits_1 = require("./command/cmdExportWearablePortraits");
async function activate(context) {
    // 基础模块单独载入
    await (0, localize_1.localizeInit)(context);
    await (0, statusBar_1.statusBarItemInit)(context);
    // 进行其他初始化
    await (0, init_1.init)(context);
    vscode.workspace.onDidChangeWorkspaceFolders(async (event) => {
        await (0, init_1.init)(context);
    }, null, context.subscriptions);
    /** 分发配置变更 */
    vscode.workspace.onDidChangeConfiguration((event) => {
        event_1.EventManager.fireEvent(event_1.EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, event);
    }, null, context.subscriptions);
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.vsnd_picker', () => (0, cmdVsndPicker_1.vsndPicker)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.ability_icon', () => (0, cmdDota2IconPanel_1.dota2IconPanel)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.items_game', () => (0, cmdDota2ItemsGame_1.dota2ItemsGame)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.translate_selection', () => (0, cmdTranslateSelection_1.translateSelection)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.lua_api_changelog', () => (0, cmdLuaApiChangelog_1.luaApiChangelog)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.kv_to_js_config', () => (0, cmdKvToJs_1.kvToJs)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.default_item_remove_list', () => (0, cmdGetItemRemoveList_1.getItemRemoveList)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.inherit_table', () => (0, cmdInheritTable_1.inheritTable)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.localization_csv', () => (0, cmdInheritTable_1.inheritTable)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.localization_text', () => (0, cmdInheritTable_1.inheritTable)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.samsara_hero_drop', () => (0, cmdDropVPCf_1.dropVPCf)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_lua_api_document', () => (0, cmdGenerateLuaApiDocument_1.generateLuaApiDocument)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.create_wearable_items', () => (0, cmdCreateWearableItems_1.createWearableItems)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.format kv', () => (0, cmdFormatKv_1.formatKv)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.copy_hero_wearable_bundle_info', () => (0, cmdCopyWearable_1.copyWearable)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable', () => (0, cmdExportWearable_1.exportWearable)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable_with_hero', () => (0, cmdExportWearableWithHero_1.exportWearableWithHero)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable_portraits', () => (0, cmdExportWearablePortraits_1.exportWearablePortraits)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.parse entities', () => (0, cmdParseMapEntities_1.parseMapEntities)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.OpenKV', () => (0, cmdOpenKV_1.openKV)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.Localization', () => (0, cmdCombineLocalization_1.combineLocalization)()));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.excel2kv', () => (0, cmdExcel2KV_1.cmdExcel2KV)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.inheritCSV', () => (0, cmdInheritCSV_1.inheritCSV)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.ability_export', (uri) => (0, cmdKvExport_1.abilityExport)(context, uri)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.unit_export', (uri) => (0, cmdKvExport_1.unitExport)(context, uri)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.preProcessing', () => (0, cmdPreProcessing_1.preProcessing)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.welcomePage', (tag) => (0, cmdQuickStart_1.quickStart)(context, tag)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_vpdi', () => (0, cmdGenerateVPDI_1.generateVPDI)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.mklink', () => (0, cmdDota2mklink_1.mklinkForDota2Addon)(context)));
    context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_modifier_function', () => (0, cmdExportModifierFunction_1.exportModifierFunction)(context)));
    context.subscriptions.push(vmdlEditorProvider_1.vmdlEditorProvider.register(context));
    context.subscriptions.push(lazayboyProvider_1.lazayboyProvider.register());
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map