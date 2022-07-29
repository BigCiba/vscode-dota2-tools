"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatKv = void 0;
const vscode = require("vscode");
const fs = require("fs");
const kvUtils_1 = require("../utils/kvUtils");
/**
 * 格式化kv
 * @export
 */
function formatKv(context) {
    const inputBox = vscode.window.createInputBox();
    inputBox.placeholder = '输入制表深度（默认12）';
    inputBox.show();
    inputBox.onDidAccept(async (t) => {
        if (vscode.window.activeTextEditor?.document) {
            let depth = Number(inputBox.value) || 12;
            let result = (0, kvUtils_1.writeKeyValue)(await (0, kvUtils_1.readKeyValueWithBase)(vscode.window.activeTextEditor.document.uri.fsPath), undefined, depth);
            fs.writeFileSync(vscode.window.activeTextEditor.document.uri.fsPath, result);
        }
        inputBox.dispose();
    });
}
exports.formatKv = formatKv;
//# sourceMappingURL=cmdFormatKv.js.map