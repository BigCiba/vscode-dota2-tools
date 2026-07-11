import * as vscode from 'vscode';
import { EventManager, EventType } from './Class/event';
import { BehaviorTreeProvider } from './CustomTextEditorProvider/behaviorTreeProvider';
import { lazayboyProvider } from './CustomTextEditorProvider/lazayboyProvider';
import { combineLocalization } from './command/cmdCombineLocalization';
import { copyWearable } from './command/cmdCopyWearable';
import { createWearableItems } from './command/cmdCreateWearableItems';
import { mklinkForDota2Addon } from './command/cmdDota2mklink';
import { CopyDotaResourcePath } from "./command/cmdDotaResourcePath";
import { dropVPCf } from './command/cmdDropVPCf';
import { exportModifierFunction } from './command/cmdExportModifierFunction';
import { exportWearable } from './command/cmdExportWearable';
import { exportWearablePortraits } from './command/cmdExportWearablePortraits';
import { exportWearableWithHero } from './command/cmdExportWearableWithHero';
import { formatKv } from './command/cmdFormatKv';
import { generateLuaApiDocument } from './command/cmdGenerateLuaApiDocument';
import { generateRecentVPDI, generateVPDI } from './command/cmdGenerateVPDI';
import { getItemRemoveList } from './command/cmdGetItemRemoveList';
import { kvToJs } from './command/cmdKvToJs';
import { openKV } from './command/cmdOpenKV';
import { parseMapEntities } from './command/cmdParseMapEntities';
import { pasteCssImageSnippet } from './command/cmdPasteCssImage';
import { preProcessing } from './command/cmdPreProcessing';
import { recompileResource } from './command/cmdRecompileResource';
import { quickStart } from './command/cmdQuickStart';
import { init } from './init';
import { statusBarItemInit } from './module/statusBar';
import { localizeInit } from './utils/localize';

export async function activate(context: vscode.ExtensionContext) {
	// Load base modules separately
	await localizeInit(context);
	await statusBarItemInit(context);
	// Perform other initialization
	await init(context);
	vscode.workspace.onDidChangeWorkspaceFolders(async (event) => {
		await init(context);
	}, null, context.subscriptions);

	/** Dispatch configuration changes */
	vscode.workspace.onDidChangeConfiguration((event) => {
		EventManager.fireEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, event);
	}, null, context.subscriptions);

	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.kv_to_js_config', () => kvToJs(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.default_item_remove_list', () => getItemRemoveList(context)));
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
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.preProcessing', () => preProcessing(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.welcomePage', (tag) => quickStart(context, tag)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_vpdi', () => generateVPDI(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.generate_recent_vpdi', () => generateRecentVPDI(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.mklink', () => mklinkForDota2Addon(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.export_modifier_function', () => exportModifierFunction(context)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.CopyDotaResourcePath', (uri) => CopyDotaResourcePath(context, uri)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.recompile_resource', (uri, uris) => recompileResource(context, uri, uris)));
	context.subscriptions.push(vscode.commands.registerCommand('dota2tools.paste_css_image_snippet', () => pasteCssImageSnippet()));
	context.subscriptions.push(lazayboyProvider.register());
	context.subscriptions.push(BehaviorTreeProvider.register(context));
}

export function deactivate() { }