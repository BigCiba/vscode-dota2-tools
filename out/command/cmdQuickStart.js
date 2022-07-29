"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickStart = void 0;
const vscode = require("vscode");
const getWebViewContent_1 = require("../utils/getWebViewContent");
async function quickStart(context, tag) {
    console.log(tag);
    const panel = vscode.window.createWebviewPanel('Welcome', // viewType
    "Welcome", // 视图标题
    vscode.ViewColumn.One, // 显示在编辑器的哪个部位
    {
        enableScripts: true,
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
    });
    panel.webview.html = await (0, getWebViewContent_1.getWebviewContent)(panel.webview, context.extensionUri, 'welcome', (html) => {
        if (tag == "5") {
            html = html.replace(`activeid="tab-1"`, `activeid="tab-5"`);
        }
        return html;
    });
}
exports.quickStart = quickStart;
//# sourceMappingURL=cmdQuickStart.js.map