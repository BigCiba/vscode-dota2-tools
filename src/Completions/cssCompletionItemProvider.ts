import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DotaApiNote } from '../class/DotaApiNote';

interface CssProperty {
	description: string;
	example?: string;
}
export class CssCompletionItemProvider implements vscode.CompletionItemProvider {
	selector: vscode.DocumentSelector;
	document: {
		[key: string]: CssProperty,
	};
	snippets: vscode.CompletionItem[];
	constructor(context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.selector = [{ scheme: 'file', language: 'css' }, { scheme: 'file', language: 'less' }, { scheme: 'file', language: 'sass' }, { scheme: 'file', language: 'scss' }];
		// this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
		this.document = dotaApiNote.getCssApiNote();
		this.snippets = [];
		this.refreshDocument();
	}
	refreshDocument() {
		this.document = this.dotaApiNote.getCssApiNote();
		for (const cssName in this.document) {
			let item = new vscode.CompletionItem(cssName, vscode.CompletionItemKind.Property);
			// item.detail = funInfo.description;
			item.documentation = new vscode.MarkdownString(this.document[cssName].description);
			item.insertText = this.getInsertText(cssName);
			this.snippets.push(item);
		}
	}
	getInsertText(cssName: string) {
		let insertText = cssName + ': $1;';
		return new vscode.SnippetString(insertText);
	}
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		return this.snippets;
	}
}