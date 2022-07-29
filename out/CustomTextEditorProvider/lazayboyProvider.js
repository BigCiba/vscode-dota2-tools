"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazayboyProvider = void 0;
const child_process_1 = require("child_process");
const vscode_1 = require("vscode");
class lazayboyProvider {
    static register() {
        return vscode_1.window.registerCustomEditorProvider(this.viewType, new lazayboyProvider());
    }
    openCustomDocument(uri) {
        return new NoUseDocument(uri);
    }
    async resolveCustomEditor(document, webviewPanel) {
        // 直接关闭面板
        (0, child_process_1.exec)(`"${document.uri.fsPath}"`, (error, stdout, stderr) => {
            webviewPanel.dispose();
        });
        webviewPanel.webview.html = `
		<html>
			<body>使用外部软件打开文件中</body>
		</html>`;
    }
}
exports.lazayboyProvider = lazayboyProvider;
lazayboyProvider.viewType = "dota2tools.Lazyboy";
class NoUseDocument {
    constructor(uri) {
        this.uri = uri;
        this.uri = uri;
    }
    dispose() { }
}
//# sourceMappingURL=lazayboyProvider.js.map