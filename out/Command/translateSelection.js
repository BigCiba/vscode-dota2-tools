"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateSelection = void 0;
const vscode = require("vscode");
const translate = require("google-translate-api");
function TranslateSelection(context) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (vscode.window.activeTextEditor) {
            let range = new vscode.Range((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.start, (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.selection.end);
            let textSelection = (_c = vscode.window.activeTextEditor) === null || _c === void 0 ? void 0 : _c.document.getText(range);
            if (textSelection != undefined && textSelection != "") {
                translate(textSelection, { to: 'en' }).then(res => {
                    var _a;
                    console.log(res.text);
                    (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.edit(editBuilder => {
                        var _a;
                        if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.start) !== undefined) {
                            editBuilder.replace(range, res.text);
                        }
                    });
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    });
}
exports.TranslateSelection = TranslateSelection;
//# sourceMappingURL=translateSelection.js.map