import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface JsFunction {
	Function?: string;
	Signature?: string;
	Description?: string;
	Value?: string;
	Enumerator?: string;
}
export class JsCompletionItemProvider implements vscode.CompletionItemProvider {
	selector: vscode.DocumentSelector;
	document: {
		[key: string]: JsFunction[];
	};
	snippets: vscode.CompletionItem[];
	constructor(context: vscode.ExtensionContext) {
		this.selector = { scheme: 'file', language: 'js' };
		this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		this.snippets = [];
		for (const className in this.document.class_list) {
			for (const funName in this.document[className]) {
				let funInfo = this.document[className][funName];
				if (funInfo.Function) {
					let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Function);
					item.detail = funInfo.Description;
					item.documentation = this.getDocumentation(funInfo);
					item.insertText = funInfo.Signature;
					this.snippets.push(item);
				}
				else {
					let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Enum);
					item.detail = funInfo.Value;
					item.documentation = this.getDocumentation(funInfo);
					item.insertText = funInfo.Enumerator;
					this.snippets.push(item);
				}
			}
		}
	}
	getDocumentation(funInfo: JsFunction) {
		let detail = '```js\n' + funInfo.Signature + '\n```';
		return new vscode.MarkdownString(detail);
	}
	getInsertText(funInfo: JsFunction) {
		return new vscode.SnippetString(funInfo.Signature);
	}
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		return this.snippets;
	}
}