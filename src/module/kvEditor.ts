import * as vscode from 'vscode';
import * as path from 'path';
import { KvEditorTreeProvider } from '../TreeDataProvider/kvTree';
import { getGameDir } from './addonInfo';
import { window } from 'vscode';

let abilitiesKvEditorTree: KvEditorTreeProvider;
let unitsKvEditorTree: KvEditorTreeProvider;
let itemsKvEditorTree: KvEditorTreeProvider;
let configsKvEditorTree: KvEditorTreeProvider;

/** 树状图模块 */
export async function kvEditorInit(context: vscode.ExtensionContext) {
	const gameDir = getGameDir();
	if (abilitiesKvEditorTree === undefined) {
		abilitiesKvEditorTree = new KvEditorTreeProvider(context, path.join(gameDir, "scripts/npc/kv/abilities"));
		vscode.window.registerTreeDataProvider('ability_kv', abilitiesKvEditorTree);
	}
	if (unitsKvEditorTree === undefined) {
		unitsKvEditorTree = new KvEditorTreeProvider(context, path.join(gameDir, "scripts/npc/kv/units"));
		vscode.window.registerTreeDataProvider('unit_kv', unitsKvEditorTree);
	}
	if (itemsKvEditorTree === undefined) {
		itemsKvEditorTree = new KvEditorTreeProvider(context, path.join(gameDir, "scripts/npc/kv/items"));
		vscode.window.registerTreeDataProvider('item_kv', itemsKvEditorTree);
	}
	if (configsKvEditorTree === undefined) {
		configsKvEditorTree = new KvEditorTreeProvider(context, path.join(gameDir, "scripts/npc/kv/gameplay"));
		vscode.window.registerTreeDataProvider('kv_config', configsKvEditorTree);
	}
}