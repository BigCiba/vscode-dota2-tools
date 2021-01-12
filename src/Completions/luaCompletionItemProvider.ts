import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface LuaFunction {
	function: string;
	class: string;
	return: string;
	description: string;
	params: { [key: string]: LuaParam; };
	server: boolean;
	client: boolean;
	example: string;
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
		enum_list: { [key: string]: LuaFunction[]; };
	};
	snippets: vscode.CompletionItem[];
	constructor(context: vscode.ExtensionContext) {
		this.selector = { scheme: 'file', language: 'lua' };
		this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dota_script_help2.json'), 'utf-8'));
		this.snippets = [];
		for (const className in this.document.class_list) {
			for (const funInfo of this.document.class_list[className]) {
				let item = new vscode.CompletionItem(funInfo.function, vscode.CompletionItemKind.Function);
				item.detail = funInfo.description;
				item.documentation = this.getDocumentation(funInfo);
				item.insertText = this.getInsertText(funInfo);
				this.snippets.push(item);
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
		detail += ')\n```';
		return new vscode.MarkdownString(detail);
	}
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