"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateSelection = void 0;
const vscode = require("vscode");
const BaiduFanYi_1 = require("../Class/BaiduFanYi");
/** 翻译选中词条 */
async function translateSelection(context) {
    if (vscode.window.activeTextEditor) {
        let range = new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end);
        let textSelection = vscode.window.activeTextEditor?.document.getText(range);
        if (textSelection !== undefined && textSelection !== "") {
            (0, BaiduFanYi_1.translate)(textSelection, res => {
                vscode.window.activeTextEditor?.edit(editBuilder => {
                    if (vscode.window.activeTextEditor?.selection.start !== undefined) {
                        editBuilder.replace(range, res);
                    }
                });
            });
        }
    }
}
exports.translateSelection = translateSelection;
//# sourceMappingURL=cmdTranslateSelection.js.map