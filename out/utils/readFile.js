"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const util_1 = require("util");
const vscode_1 = require("vscode");
/**
 * 读取插件内的文件
 */
async function readFile(uri) {
    let array = await vscode_1.workspace.fs.readFile(uri);
    return new util_1.TextDecoder().decode(array);
}
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map