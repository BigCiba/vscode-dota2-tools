"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsndPicker = void 0;
const vscode = require("vscode");
const init_1 = require("../init");
/**
 * 选择音效
 * @export
 */
function VsndPicker() {
    const quick_pick = vscode.window.createQuickPick();
    quick_pick.canSelectMany = false;
    quick_pick.ignoreFocusOut = true;
    quick_pick.placeholder = '*.vsnd';
    quick_pick.items = init_1.VSND;
    quick_pick.show();
    quick_pick.onDidChangeSelection((t) => {
        var _a;
        quick_pick.value = t[0].label;
        (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.edit(editBuilder => {
            var _a, _b, _c, _d;
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.start) !== undefined && t[0].description !== undefined) {
                if (vscode.window.activeTextEditor.selection.start.character === vscode.window.activeTextEditor.selection.end.character) {
                    editBuilder.insert((_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.selection.start, t[0].description);
                }
                else {
                    editBuilder.replace(new vscode.Range((_c = vscode.window.activeTextEditor) === null || _c === void 0 ? void 0 : _c.selection.start, (_d = vscode.window.activeTextEditor) === null || _d === void 0 ? void 0 : _d.selection.end), t[0].description);
                }
                quick_pick.dispose();
            }
        });
    });
}
exports.VsndPicker = VsndPicker;
//# sourceMappingURL=vsndPicker.js.map