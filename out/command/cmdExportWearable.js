"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportWearable = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const kvUtils_1 = require("../utils/kvUtils");
const addonInfo_1 = require("../module/addonInfo");
const pathUtils_1 = require("../utils/pathUtils");
/**
 * 导出所有饰品的信息到指定文件夹
 * @export
 */
function exportWearable(context) {
    let gameDir = (0, addonInfo_1.getGameDir)();
    let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));
    const quickPick = vscode.window.createQuickPick();
    quickPick.canSelectMany = false;
    quickPick.ignoreFocusOut = true;
    quickPick.placeholder = '选择输出版本';
    quickPick.items = [
        {
            label: "只输出英雄相关的版本"
        },
        {
            label: "输出完整版本"
        }
    ];
    quickPick.show();
    quickPick.onDidChangeSelection((t) => {
        quickPick.value = t[0].label;
        if (quickPick.value == "只输出英雄相关的版本") {
            const inputBox = vscode.window.createInputBox();
            inputBox.placeholder = '请输入输出文件路径';
            if (gameDir) {
                inputBox.value = path.join(gameDir, "\\scripts\\npc\\items_game.kv");
            }
            let result = {};
            for (const index in itemsGame) {
                const itemData = itemsGame[index];
                if (itemData.used_by_heroes) {
                    const heroList = Object.keys(itemData.used_by_heroes);
                    delete itemData.used_by_heroes;
                    for (const heroName of heroList) {
                        if (heroName.indexOf("npc_dota_hero") != -1) {
                            result[index] = itemData;
                        }
                    }
                }
            }
            inputBox.show();
            (0, pathUtils_1.dirExists)(inputBox.value);
            inputBox.onDidAccept(async (t) => {
                fs.writeFileSync(inputBox.value, (0, kvUtils_1.writeKeyValue)({ Items: result }));
                inputBox.dispose();
            });
        }
        else {
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
        quickPick.dispose();
    });
}
exports.exportWearable = exportWearable;
//# sourceMappingURL=cmdExportWearable.js.map