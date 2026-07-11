import { exec } from 'child_process';
import { CustomReadonlyEditorProvider, CustomDocument, Uri, WebviewPanel, window } from 'vscode';

export class lazayboyProvider implements CustomReadonlyEditorProvider {
	private static readonly viewType = "dota2tools.Lazyboy";
	static register() {
		return window.registerCustomEditorProvider(this.viewType, new lazayboyProvider());
	}

	openCustomDocument(uri: Uri) {
		return new NoUseDocument(uri);
	}
	async resolveCustomEditor(document: NoUseDocument, webviewPanel: WebviewPanel) {
		// Close the panel directly
		exec(`"${document.uri.fsPath}"`, (error, stdout, stderr) => {
			webviewPanel.dispose();
		});
		webviewPanel.webview.html = `
		<html>
			<body>Opening file with external software</body>
		</html>`;
	}
}

class NoUseDocument implements CustomDocument {
	constructor(readonly uri: Uri) {
		this.uri = uri;
	}

	dispose() { }
}