import * as vscode from 'vscode';
import { EventManager, EventType } from './class/event';
import { abilityExport, unitExport } from './command/cmdKvExport';
import { combineLocalization } from './command/cmdCombineLocalization';
import { copyWearable } from './command/cmdCopyWearable';
import { createWearableItems } from './command/cmdCreateWearableItems';
import { dota2IconPanel } from './command/cmdDota2IconPanel';
import { dota2ItemsGame } from './command/cmdDota2ItemsGame';
import { dropVPCf } from './command/cmdDropVPCf';
import { cmdExcel2KV } from './command/cmdExcel2KV';
import { formatKv } from './command/cmdFormatKv';
import { generateLuaApiDocument } from './command/cmdGenerateLuaApiDocument';
import { getItemRemoveList } from './command/cmdGetItemRemoveList';
import { inheritCSV } from './command/cmdInheritCSV';
import { inheritTable } from './command/cmdInheritTable';
import { kvToJs } from './command/cmdKvToJs';
import { luaApiChangelog } from './command/cmdLuaApiChangelog';
import { openKV } from './command/cmdOpenKV';
import { parseMapEntities } from './command/cmdParseMapEntities';
import { translateSelection } from './command/cmdTranslateSelection';
import { vsndPicker } from './command/cmdVsndPicker';
import { init } from './init';
import { localizeInit } from './utils/localize';
import { statusBarItemInit } from './module/statusBar';
import { preProcessing } from './command/cmdPreProcessing';
import { quickStart } from './command/cmdQuickStart';
import { vmdlEditorProvider } from './CustomTextEditorProvider/vmdlEditorProvider';
import { lazayboyProvider } from './CustomTextEditorProvider/lazayboyProvider';
import { generateVPDI } from './command/cmdGenerateVPDI';
import { mklinkForDota2Addon } from './command/cmdDota2mklink';
import { exportWearable } from './command/cmdExportWearable';
import { exportModifierFunction } from './command/cmdExportModifierFunction';
import { exportWearableWithHero } from './command/cmdExportWearableWithHero';
import { exportWearablePortraits } from './command/cmdExportWearablePortraits';

export async function activate(context: vscode.ExtensionContext) {
	// 基础模块单独载入
	await localizeInit(context);
	await statusBarItemInit(context);
	// 进行其他初始化
	await init(context);

	vscode.workspace.onDidChangeWorkspaceFolders(async (event) => {
		await init(context);
	}, null, context.subscriptions);

	/** 分发配置变更 */
	vscode.workspace.onDidChangeConfiguration((event) => {
		EventManager.fireEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, event);
	}, null, context.subscriptions);

	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.vsnd_picker', () => vsndPicker(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.ability_icon', () => dota2IconPanel(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.items_game', () => dota2ItemsGame(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.translate_selection', () => translateSelection(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.lua_api_changelog', () => luaApiChangelog(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.kv_to_js_config', () => kvToJs(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.default_item_remove_list', () => getItemRemoveList(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.inherit_table', () => inheritTable(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.localization_csv', () => inheritTable(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.localization_text', () => inheritTable(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.samsara_hero_drop', () => dropVPCf(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_lua_api_document', () => generateLuaApiDocument(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.create_wearable_items', () => createWearableItems(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.format kv', () => formatKv(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.copy_hero_wearable_bundle_info', () => copyWearable(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable', () => exportWearable(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable_with_hero', () => exportWearableWithHero(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_wearable_portraits', () => exportWearablePortraits(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.parse entities', () => parseMapEntities(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.OpenKV', () => openKV(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.Localization', () => combineLocalization()));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.excel2kv', () => cmdExcel2KV(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.inheritCSV', () => inheritCSV(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.ability_export', (uri) => abilityExport(context, uri)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.unit_export', (uri) => unitExport(context, uri)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.preProcessing', () => preProcessing(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.welcomePage', (tag) => quickStart(context, tag)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_vpdi', () => generateVPDI(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.mklink', () => mklinkForDota2Addon(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_modifier_function', () => exportModifierFunction(context)));
	context.subscriptions.push(vmdlEditorProvider.register(context));
	context.subscriptions.push(lazayboyProvider.register());
}

export function deactivate() { }