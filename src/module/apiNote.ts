import * as vscode from 'vscode';
import { DotaApiNote } from '../class/DotaApiNote';
import { getCssCompletion, getLuaCompletion } from './completion';
import { getLuaApiTree } from './treeApi';

let dotaApiNote: DotaApiNote;

/** 实例化dota2笔记功能模块 */
export async function apiNoteInit(context: vscode.ExtensionContext) {
	dotaApiNote = new DotaApiNote(context);
	dotaApiNote.init(() => {
		console.log("[apiNoteInit]: 更新lua树状图");
		let luaAPITree = getLuaApiTree();
		if (luaAPITree) {
			luaAPITree.refreshRawData();
		}
		console.log("[apiNoteInit]: 更新lua代码补全");
		let luaCompletion = getLuaCompletion();
		if (luaCompletion) {
			luaCompletion.refreshDocument();
		}
		console.log("[apiNoteInit]: 更新css代码补全");
		let cssCompletion = getCssCompletion();
		if (cssCompletion) {
			cssCompletion.refreshDocument();
		}
	});
}

export function getDotaApiNoteClass() {
	return dotaApiNote;
}