import * as vscode from 'vscode';
import { ApiTreeProvider } from '../treeDataProvider/luaAPITree';
import { JsApiTreeProvider } from '../treeDataProvider/jsAPITree';
import { CssApiTreeProvider } from '../treeDataProvider/cssAPITree';
import { PanelTreeProvider } from '../treeDataProvider/panelTree';
import { getDotaApiNoteClass } from './apiNote';

let luaApiTree: ApiTreeProvider;
let jsApiTree: JsApiTreeProvider;
let cssApiTree: CssApiTreeProvider;
let panelTree: PanelTreeProvider;

/** 树状图模块 */
export async function luaApiInit(context: vscode.ExtensionContext) {
	if (luaApiTree === undefined) {
		let dotaApiNote = getDotaApiNoteClass();
		luaApiTree = new ApiTreeProvider(context, dotaApiNote);
		vscode.window.registerTreeDataProvider('dota2apiExplorer', luaApiTree);
	}
}
export async function jsApiInit(context: vscode.ExtensionContext) {
	if (jsApiTree === undefined) {
		jsApiTree = new JsApiTreeProvider(context);
		vscode.window.registerTreeDataProvider('dota2JSApiExplorer', jsApiTree);
	}
}
export async function cssApiInit(context: vscode.ExtensionContext) {
	if (cssApiTree === undefined) {
		let dotaApiNote = getDotaApiNoteClass();
		cssApiTree = new CssApiTreeProvider(context, dotaApiNote);
		vscode.window.registerTreeDataProvider('dota2CssApiExplorer', cssApiTree);
	}
}
export async function panelDocumentInit(context: vscode.ExtensionContext) {
	if (panelTree === undefined) {
		panelTree = new PanelTreeProvider(context);
		vscode.window.registerTreeDataProvider('dota2PanelExplorer', panelTree);
	}
}

export function getLuaApiTree() {
	return luaApiTree;
}