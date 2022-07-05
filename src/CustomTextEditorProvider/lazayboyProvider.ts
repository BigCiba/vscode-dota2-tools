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
		// 直接关闭面板
		exec(document.uri.fsPath, (error, stdout, stderr) => {
			console.log(error, stdout, stderr);
			webviewPanel.dispose();
		});
		webviewPanel.webview.html = `
		<html>
			<body>使用外部软件打开文件中</body>
		</html>`;
	}
}

class NoUseDocument implements CustomDocument {
	constructor(readonly uri: Uri) {
		this.uri = uri;
	}

	dispose() { }
}