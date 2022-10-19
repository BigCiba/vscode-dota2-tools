"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportWearable = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const kvUtils_1 = require("../utils/kvUtils");
const addonInfo_1 = require("../module/addonInfo");
/**
 * 导出所有饰品的信息到指定文件夹
 * @export
 */
function exportWearable(context) {
    let gameDir = (0, addonInfo_1.getGameDir)();
    let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));
    const inputBox = vscode.window.createInputBox();
    inputBox.placeholder = '请输入输出文件路径';
    if (gameDir) {
        inputBox.value = path.join(gameDir, "\\scripts\\npc\\items_game.kv");
    }
    inputBox.show();
    inputBox.onDidAccept(async (t) => {
        fs.writeFileSync(inputBox.value, (0, kvUtils_1.writeKeyValue)({ Items: itemsGame }));
        inputBox.dispose();
    });
}
exports.exportWearable = exportWearable;
//# sourceMappingURL=cmdExportWearable.js.map