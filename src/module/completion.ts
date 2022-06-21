import * as vscode from 'vscode';
import { CssCompletionItemProvider } from '../completions/cssCompletionItemProvider';
import { JsCompletionItemProvider } from '../completions/jsCompletionItemProvider';
import { LuaCompletionItemProvider } from '../completions/luaCompletionItemProvider';
import { getDotaApiNoteClass } from './apiNote';
/** 代码补全模块 */

let luaCompletionItemProvider: LuaCompletionItemProvider;
let cssCompletionItemProvider: CssCompletionItemProvider;
let jsCompletionItemProvider: JsCompletionItemProvider;

export async function luaCompletionInit(context: vscode.ExtensionContext) {
	if (luaCompletionItemProvider === undefined) {
		let dotaApiNote = getDotaApiNoteClass();
		luaCompletionItemProvider = new LuaCompletionItemProvider(context, dotaApiNote);
		context.subscriptions.push(vscode.languages.registerCompletionItemProvider(luaCompletionItemProvider.selector, luaCompletionItemProvider));
	}
}
export async function jsCompletionInit(context: vscode.ExtensionContext) {
	if (jsCompletionItemProvider === undefined) {
		let dotaApiNote = getDotaApiNoteClass();
		jsCompletionItemProvider = new JsCompletionItemProvider(context, dotaApiNote);
		context.subscriptions.push(vscode.languages.registerCompletionItemProvider(jsCompletionItemProvider.selector, jsCompletionItemProvider));
	}
}
export async function cssCompletionInit(context: vscode.ExtensionContext) {
	if (cssCompletionItemProvider === undefined) {
		let dotaApiNote = getDotaApiNoteClass();
		cssCompletionItemProvider = new CssCompletionItemProvider(context, dotaApiNote);
		context.subscriptions.push(vscode.languages.registerCompletionItemProvider(cssCompletionItemProvider.selector, cssCompletionItemProvider));
	}
}

export function getLuaCompletion() {
	return luaCompletionItemProvider;
}
export function getCssCompletion() {
	return cssCompletionItemProvider;
}