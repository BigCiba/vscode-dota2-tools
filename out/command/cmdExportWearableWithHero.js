"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportWearableWithHero = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const kvUtils_1 = require("../utils/kvUtils");
const addonInfo_1 = require("../module/addonInfo");
const pathUtils_1 = require("../utils/pathUtils");
/**
 * 导出所有饰品的信息到指定文件夹，按英雄拆分
 * @export
 */
function exportWearableWithHero(context) {
    let gameDir = (0, addonInfo_1.getGameDir)();
    let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));
    const inputBox = vscode.window.createInputBox();
    inputBox.placeholder = '请输入输出文件路径';
    if (gameDir) {
        inputBox.value = path.join(gameDir, "\\scripts\\npc\\items_game");
    }
    let result = {};
    for (const index in itemsGame) {
        const itemData = itemsGame[index];
        if (itemData.used_by_heroes) {
            const heroList = Object.keys(itemData.used_by_heroes);
            delete itemData.used_by_heroes;
            for (const heroName of heroList) {
                if (heroName.indexOf("npc_dota_hero") != -1 && result[heroName] == undefined) {
                    result[heroName] = {};
                }
                if (result[heroName]) {
                    result[heroName][index] = itemData;
                }
            }
        }
    }
    inputBox.show();
    (0, pathUtils_1.dirExists)(inputBox.value);
    inputBox.onDidAccept(async (t) => {
        for (const heroName in result) {
            const heroItems = result[heroName];
            fs.writeFileSync(inputBox.value + "\\" + heroName + ".kv", (0, kvUtils_1.writeKeyValue)({ Items: heroItems }));
        }
        inputBox.dispose();
    });
}
exports.exportWearableWithHero = exportWearableWithHero;
//# sourceMappingURL=cmdExportWearableWithHero.js.map