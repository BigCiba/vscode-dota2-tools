"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemRemoveList = void 0;
const vscode = require("vscode");
const kvUtils_1 = require("../utils/kvUtils");
/** 复制dota2官方物品删除列表到剪切板 */
async function getItemRemoveList(context) {
    let kv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)(context.extensionPath + '\\resource\\npc\\items.txt'));
    let str = "";
    for (const name in kv) {
        if (typeof (kv[name]) !== "object") {
            continue;
        }
        str += `\t"${name}"\t"REMOVE"\n`;
    }
    vscode.env.clipboard.writeText(str);
    vscode.window.showInformationMessage('官方物品删除列表生成完毕，已复制到剪切板');
}
exports.getItemRemoveList = getItemRemoveList;
//# sourceMappingURL=cmdGetItemRemoveList.js.map