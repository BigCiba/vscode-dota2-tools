import * as vscode from 'vscode';
import { KvEditorTreeProvider } from '../TreeDataProvider/kvTree';

let kvEditorTree: KvEditorTreeProvider;

/** 树状图模块 */
export async function kvEditorInit(context: vscode.ExtensionContext) {
	if (kvEditorTree === undefined) {
		kvEditorTree = new KvEditorTreeProvider(context);
		vscode.window.registerTreeDataProvider('kv_explorer', kvEditorTree);
	}
}