"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationViewProvider = void 0;
const vscode = require("vscode");
const util_1 = require("../util");
class LocalizationViewProvider {
    constructor(context) {
        this.context = context;
        this.localization = {};
        this.luaText = '';
        if (vscode.window.activeTextEditor != undefined) {
            this.luaText = vscode.window.activeTextEditor.document.getText();
        }
        vscode.window.onDidChangeActiveTextEditor(data => {
            var _a;
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua" && this._view) {
                this.luaText = vscode.window.activeTextEditor.document.getText();
                this._view.webview.postMessage(this.parseLua());
            }
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        var _a;
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = util_1.GetWebViewContent(this.context, 'webview/LocalizationView/LocalizationView.html');
        webviewView.webview.onDidReceiveMessage(data => {
        });
        if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua") {
            webviewView.webview.postMessage(this.parseLua());
        }
    }
    /**
     * 解析打开的lua文件
     * @memberof LocalizationViewProvider
     */
    parseLua() {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua") {
            let luaText = vscode.window.activeTextEditor.document.getText();
            let result = {};
            util_1.EachLine(luaText, (lineNumber, lineText) => {
                if (lineText.search(/(modifier\S*).*=.*class\(.*\{.*\}.*\)/) != -1) {
                    let key = lineText.replace(/(modifier\S*).*=.*class\(.*\{.*\}.*\)/, '$1');
                    result[key] = {
                        Title: "123",
                        Description: "456"
                    };
                }
                else if (lineText.search(/([^ \f\n\r\v]*).*=.*class\(.*\{.*\}.*\)/) != -1) {
                    let key = lineText.replace(/([^ \f\n\r\v]*).*=.*class\(.*\{.*\}.*\)/, '$1');
                    result[key] = {
                        Title: "123",
                        Description: "456"
                    };
                }
            });
            return result;
        }
    }
}
exports.LocalizationViewProvider = LocalizationViewProvider;
LocalizationViewProvider.viewType = 'LocalizationViewProvider';
//# sourceMappingURL=LocalizationViewProvider.js.map