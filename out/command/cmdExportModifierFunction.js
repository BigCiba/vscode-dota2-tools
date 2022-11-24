"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportModifierFunction = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const addonInfo_1 = require("../module/addonInfo");
const apiNote_1 = require("../module/apiNote");
/**
 * 音效选择
 * @param context
 */
async function exportModifierFunction(context) {
    let gameDir = (0, addonInfo_1.getGameDir)();
    const dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
    const enumList = dotaApiNote.getEnumList();
    let result = "_ModifierFuncs = {";
    for (const enumType in enumList) {
        if (enumType == "modifierfunction") {
            for (const enumInfo of enumList[enumType]) {
                result += `\n\t${enumInfo.name} = "${enumInfo.function}",`;
            }
        }
    }
    result += "\n}\nreturn _ModifierFuncs";
    const inputBox = vscode.window.createInputBox();
    inputBox.placeholder = '请输入输出文件路径';
    if (gameDir) {
        inputBox.value = path.join(gameDir, "\\scripts\\vscripts\\modifiers\\eom_modifier\\modifierfunction.lua");
    }
    inputBox.show();
    inputBox.onDidAccept(async (t) => {
        fs.writeFileSync(inputBox.value, result);
        inputBox.dispose();
    });
}
exports.exportModifierFunction = exportModifierFunction;
//# sourceMappingURL=cmdExportModifierFunction.js.map