"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUri = void 0;
const vscode_1 = require("vscode");
/**
 * 获取Webview使用的Uri
 * @param webview
 * @param extensionUri
 * @param pathList
 */
function getUri(webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode_1.Uri.joinPath(extensionUri, ...pathList));
}
exports.getUri = getUri;
//# sourceMappingURL=getUri.js.map