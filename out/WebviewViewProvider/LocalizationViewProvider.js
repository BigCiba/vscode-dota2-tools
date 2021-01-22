"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationViewProvider = void 0;
const vscode = require("vscode");
const util_1 = require("../util");
class LocalizationViewProvider {
    // private localization: {[key:string]:string};
    constructor(context) {
        this.context = context;
        vscode.window.onDidChangeActiveTextEditor(data => {
            var _a, _b;
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua" && this._view) {
                this._view.webview.postMessage({
                    data: (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.getText()
                });
            }
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        var _a, _b;
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = util_1.GetWebViewContent(this.context, 'webview/LocalizationView/LocalizationView.html');
        webviewView.webview.onDidReceiveMessage(data => {
        });
        if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua") {
            webviewView.webview.postMessage({
                data: (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.getText()
            });
        }
    }
}
exports.LocalizationViewProvider = LocalizationViewProvider;
LocalizationViewProvider.viewType = 'LocalizationViewProvider';
//# sourceMappingURL=LocalizationViewProvider.js.map