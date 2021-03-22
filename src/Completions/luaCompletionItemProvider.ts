import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface LuaFunction {
	function: string;
	class: string;
	class_cl: string;
	return: string;
	description: string;
	params: { [key: string]: LuaParam; };
	server: boolean;
	client: boolean;
	example: string;
	type?: string;
}
export interface LuaEnum {
	name: string;
	value: string;
	function?: string;
	description_lite?: string;
	description?: string;
	example?: string;
	client?: string;
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
	constructor(context: vscode.ExtensionContext) {
		this.selector = { scheme: 'file', language: 'lua' };
		this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dota_script_help2.json'), 'utf-8'));
		this.snippets = [];
		for (const className in this.document.class_list) {
			// 补全class
			let item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Class);
			item.detail = className;
			item.documentation = className;
			item.insertText = className;
			this.snippets.push(item);
			// 补全函数
			for (const funInfo of this.document.class_list[className]) {
				let item = new vscode.CompletionItem(funInfo.function, vscode.CompletionItemKind.Function);
				item.detail = funInfo.description;
				item.documentation = this.getDocumentation(funInfo);
				item.insertText = this.getInsertText(funInfo);
				this.snippets.push(item);
			}
		}
		// 补全常数
		for (const enumType in this.document.enum_list) {
			for (const enumInfo of this.document.enum_list[enumType]) {
				let item = new vscode.CompletionItem(enumInfo.name, vscode.CompletionItemKind.Enum);
				item.detail = (enumInfo.function ? (enumInfo.function) : 'Value: ' + enumInfo.value);
				item.documentation = new vscode.MarkdownString(enumInfo.description || enumInfo.description_lite);
				// item.insertText = enumInfo.name + (enumInfo.function ? ('\n-- ' + enumInfo.function) : '');
				item.insertText = enumInfo.name;
				this.snippets.push(item);
				// 将modifierfunction的function也加入
				if (enumInfo.function) {
					let item = new vscode.CompletionItem(enumInfo.function, vscode.CompletionItemKind.Function);
					item.detail = enumInfo.function;
					item.documentation = new vscode.MarkdownString(enumInfo.description || enumInfo.description_lite);
					item.insertText = enumInfo.function;
					this.snippets.push(item);
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
	getInsertText(funInfo: LuaFunction) {
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
		return this.snippets;
	}
}