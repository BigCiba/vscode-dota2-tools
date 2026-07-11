import * as vscode from 'vscode';
import { DotaApiNote } from '../Class/DotaApiNote';
import { getCssCompletion, getLuaCompletion } from './completion';

let dotaApiNote: DotaApiNote;

/** Instantiate the dota2 notes feature module */
export async function apiNoteInit(context: vscode.ExtensionContext) {
	dotaApiNote = new DotaApiNote(context);
	dotaApiNote.init(() => {
		console.log("[apiNoteInit]: Update lua code completion");
		let luaCompletion = getLuaCompletion();
		if (luaCompletion) {
			luaCompletion.refreshDocument();
		}
		console.log("[apiNoteInit]: Update css code completion");
		let cssCompletion = getCssCompletion();
		if (cssCompletion) {
			cssCompletion.refreshDocument();
		}
	});
}

export function getDotaApiNoteClass() {
	return dotaApiNote;
}