import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DotaApiNote } from '../Class/DotaApiNote';

interface JsFunction {
	function?: string;
	signature?: string;
	description?: string;
	value?: string;
	enumerator?: string;
}
export class JsCompletionItemProvider implements vscode.CompletionItemProvider {
	selector: vscode.DocumentSelector;
	document: {
		[key: string]: JsFunction[];
	};
	snippets: vscode.CompletionItem[];
	constructor(context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.selector = { scheme: 'file', language: 'js' };
		this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		this.snippets = [];
		for (const className in this.document.class_list) {
			for (const funName in this.document[className]) {
				let funInfo = this.document[className][funName];
				if (funInfo.function) {
					let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Function);
					item.detail = funInfo.description;
					item.documentation = this.getDocumentation(funInfo);
					item.insertText = funInfo.signature;
					this.snippets.push(item);
				}
				else {
					let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Enum);
					item.detail = funInfo.value;
					item.documentation = this.getDocumentation(funInfo);
					item.insertText = funInfo.enumerator;
					this.snippets.push(item);
				}
			}
		}
	}
	getDocumentation(funInfo: JsFunction) {
		let detail = '```js\n' + funInfo.signature + '\n```';
		return new vscode.MarkdownString(detail);
	}
	getInsertText(funInfo: JsFunction) {
		return new vscode.SnippetString(funInfo.signature);
	}
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		return this.snippets;
	}
}