"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vsndPicker = exports.vsndPickerInit = void 0;
const vscode = require("vscode");
const readFile_1 = require("../utils/readFile");
let vsnd;
async function vsndPickerInit(context) {
    vsnd = [];
    let soundevents = JSON.parse(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "resource/soundevents.json")));
    // 添加选项
    for (const key in soundevents) {
        const element = soundevents[key];
        for (let i = 0; i < element.length; i++) {
            const sound = element[i];
            vsnd.push({
                label: sound,
                description: key,
            });
        }
    }
}
exports.vsndPickerInit = vsndPickerInit;
/**
 * 音效选择
 * @param context
 */
async function vsndPicker(context) {
    // 避免没有数据
    if (vsnd === undefined) {
        await vsndPickerInit(context);
    }
    const vsndPick = vscode.window.createQuickPick();
    vsndPick.canSelectMany = false;
    vsndPick.ignoreFocusOut = true;
    vsndPick.placeholder = '*.vsnd';
    vsndPick.items = vsnd;
    vsndPick.show();
    vsndPick.onDidChangeSelection((t) => {
        vsndPick.value = t[0].label;
        vscode.window.activeTextEditor?.edit(editBuilder => {
            if (vscode.window.activeTextEditor?.selection.start !== undefined && t[0].description !== undefined) {
                if (vscode.window.activeTextEditor.selection.start.character === vscode.window.activeTextEditor.selection.end.character) {
                    editBuilder.insert(vscode.window.activeTextEditor?.selection.start, t[0].description);
                }
                else {
                    editBuilder.replace(new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end), t[0].description);
                }
                vsndPick.dispose();
            }
        });
    });
}
exports.vsndPicker = vsndPicker;
//# sourceMappingURL=cmdVsndPicker%20copy.js.map