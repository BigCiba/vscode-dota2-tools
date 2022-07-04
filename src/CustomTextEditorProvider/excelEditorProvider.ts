import { exec } from 'child_process';
import * as vscode from 'vscode';

export class excelEditorProvider implements vscode.CustomReadonlyEditorProvider {
	openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken) {
		exec(uri.fsPath);
		return new NoUseDocument(uri);
	}
	async resolveCustomEditor(document: vscode.CustomDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken) {
		// 直接关闭面板
		webviewPanel.dispose();
	}
}

class NoUseDocument implements vscode.CustomDocument {
	constructor(readonly uri: vscode.Uri) {
	}
	dispose(): void { }
}