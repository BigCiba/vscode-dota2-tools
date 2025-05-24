/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getDotaApiNoteClass } from '../module/apiNote';
import { DotaApiNote } from '../Class/DotaApiNote';

export interface LuaFunction {
	function?: string;
	class?: string;
	class_cl?: string;
	return?: string;
	description?: string;
	params?: { [key: string]: LuaParam; };
	server?: boolean;
	client?: boolean;
	example?: string;
	type?: string;
}
export interface LuaEnum {
	name?: string;
	class?: string;
	value?: string;
	function?: string;
	description_lite?: string;
	description?: string;
	example?: string;
	client?: string;
	type?: string;
}
interface LuaParam {
	type: string,
	params_name: string,
	description: string;
}
export class LuaCompletionItemProvider implements vscode.CompletionItemProvider {
	selector: vscode.DocumentSelector;
	document: {
		class_list: { [key: string]: LuaFunction[]; },
		enum_list: { [key: string]: LuaEnum[]; };
	};

	snippets: vscode.CompletionItem[];
	snippetsNoParams: vscode.CompletionItem[];
	constructor(context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.selector = { scheme: 'file', language: 'lua' };
		this.document = {
			class_list: this.dotaApiNote.getClassList(),
			enum_list: this.dotaApiNote.getEnumList()
		};
		this.snippets = [];
		this.snippetsNoParams = [];
		this.refreshDocument();
	}

	refreshDocument() {
		this.snippets = [];
		this.snippetsNoParams = [];

		this.document.class_list = this.dotaApiNote.getClassList();
		this.document.enum_list = this.dotaApiNote.getEnumList();
		let apiNote = getDotaApiNoteClass().getApiNote();
		for (const className in this.document.class_list) {
			// 补全class
			let item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Class);
			item.detail = className;
			item.documentation = className;
			item.insertText = className;
			this.snippets.push(item);
			this.snippetsNoParams.push(item);
			// 补全class全局访问变量
			let variable = apiNote[className]?.variable;
			if (variable && variable !== undefined) {
				let item = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Class);
				item.detail = variable;
				item.documentation = variable;
				item.insertText = variable;
				this.snippets.push(item);
				this.snippetsNoParams.push(item);
			}
			// 补全函数
			for (const funInfo of this.document.class_list[className]) {
				let item = new vscode.CompletionItem(funInfo.function || "", vscode.CompletionItemKind.Function);
				item.detail = funInfo.description;
				item.documentation = this.getDocumentation(funInfo);
				item.insertText = this.getInsertText(funInfo);
				this.snippets.push(item);
				let itemNoParams = new vscode.CompletionItem(funInfo.function || "", vscode.CompletionItemKind.Function);
				itemNoParams.detail = funInfo.description;
				itemNoParams.documentation = this.getDocumentation(funInfo);
				itemNoParams.insertText = funInfo.function;
				this.snippetsNoParams.push(itemNoParams);
			}
		}
		// 补全常数
		for (const enumType in this.document.enum_list) {
			for (const enumInfo of this.document.enum_list[enumType]) {
				let item = new vscode.CompletionItem(enumInfo.name || "", vscode.CompletionItemKind.Enum);
				item.detail = (enumInfo.function ? (enumInfo.function) : 'Value: ' + enumInfo.value);
				item.documentation = new vscode.MarkdownString(enumInfo.description || enumInfo.description_lite);
				// item.insertText = enumInfo.name + (enumInfo.function ? ('\n-- ' + enumInfo.function) : '');
				item.insertText = enumInfo.name;
				this.snippets.push(item);
				this.snippetsNoParams.push(item);
				// 将modifierfunction的function也加入
				if (enumInfo.function) {
					let item = new vscode.CompletionItem(enumInfo.function, vscode.CompletionItemKind.Function);
					item.detail = enumInfo.function;
					item.documentation = new vscode.MarkdownString(enumInfo.description || enumInfo.description_lite);
					item.insertText = enumInfo.function;
					this.snippets.push(item);
					this.snippetsNoParams.push(item);
				}
			}
		}
	}

	getDocumentation(funInfo: LuaFunction) {
		let detail = '```lua\n' + funInfo.return + ' ' + funInfo.function + '(';
		let count = 1;
		for (let paramsName in funInfo.params) {
			let paramsNoteName = funInfo.params[paramsName].params_name || paramsName;
			if (count === 1) {
				detail += paramsNoteName;
			} else {
				detail += ', ' + paramsNoteName;
			}
			count++;
		}
		detail += ')\n```\n';

		detail += (funInfo.server === true ? '✔️' : '❌') + ' `Server: ' + funInfo.class + '`  \n';
		detail += (funInfo.client === true ? '✔️' : '❌') + ' `Client: ' + funInfo.class_cl + '`  \n\n';

		detail += 'Type|Name|Description\n:-|:-|:-\n';
		for (let params_name in funInfo.params) {
			const params_info = funInfo.params[params_name];
			let params_name_note = params_info.params_name || params_name;
			detail += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
		}
		return new vscode.MarkdownString(detail);
	}
	/**
	 * 获取补全
	 * @param {LuaFunction} funInfo
	 * @return {*} 
	 * @memberof LuaCompletionItemProvider
	 */
	getInsertText(funInfo: LuaFunction): vscode.SnippetString {
		let insertText = funInfo.function + '(';
		let count = 1;
		for (let paramsName in funInfo.params) {
			let paramsNoteName = funInfo.params[paramsName].params_name || paramsName;
			if (count === 1) {
				insertText += ('${' + count + ':' + paramsNoteName + '}');
			} else {
				insertText += ', ' + ('${' + count + ':' + paramsNoteName + '}');
			}
			count++;
		}
		insertText += ')';
		return new vscode.SnippetString(insertText);
	}
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		if (document.getText(new vscode.Range(position, new vscode.Position(position.line, position.character + 1))) === "(") {
			return this.snippetsNoParams;
		}
		return this.snippets;
	}
}