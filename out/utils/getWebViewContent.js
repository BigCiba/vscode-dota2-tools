"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = void 0;
const vscode_1 = require("vscode");
const getUri_1 = require("./getUri");
const path = require("path");
const readFile_1 = require("./readFile");
/**
 * 获取webview的html，自动将格式替换成对应
 * @param webview
 * @param extensionUri
 * @param webviewName
 * @param preProcess
 * @returns
 */
async function getWebviewContent(webview, extensionUri, webviewName, preProcess) {
    const toolkitUri = (0, getUri_1.getUri)(webview, extensionUri, [
        "node_modules",
        "@vscode",
        "webview-ui-toolkit",
        "dist",
        "toolkit.js",
    ]);
    const codiconsUri = (0, getUri_1.getUri)(webview, extensionUri, ['node_modules', '@vscode/codicons', 'dist', 'codicon.css']);
    const uri = vscode_1.Uri.joinPath(extensionUri, "webview", webviewName, webviewName + ".html");
    const dirPath = path.join("webview", webviewName);
    // 读取html内容
    let html = await (0, readFile_1.readFile)(uri);
    // 前处理
    if (preProcess) {
        html = preProcess(html);
    }
    // 替换路径为vscode格式路径
    html = html.replace(/(<link.+?href="|<script.+?src="|<video.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        if ($2.search('https') === -1) {
            return $1 + (0, getUri_1.getUri)(webview, extensionUri, [path.relative(path.resolve(), path.resolve(dirPath, $2))]) + '"';
        }
        return $1 + $2 + '"';
    });
    // 本地化
    const config = JSON.parse(String(process.env.VSCODE_NLS_CONFIG));
    html = html.replace(/<html lang="(.*)">/, `<html lang="${config['locale'] || 'en'}">`);
    // 接入工具包与codicon
    html = html.replace("</head>", `\t<script type="module" src="${toolkitUri}"></script>\n\t<link href="${codiconsUri}" rel="stylesheet" />\n</head>`);
    return html;
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=getWebViewContent.js.map