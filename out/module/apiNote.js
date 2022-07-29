"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDotaApiNoteClass = exports.apiNoteInit = void 0;
const DotaApiNote_1 = require("../class/DotaApiNote");
const completion_1 = require("./completion");
const treeApi_1 = require("./treeApi");
let dotaApiNote;
/** 实例化dota2笔记功能模块 */
async function apiNoteInit(context) {
    dotaApiNote = new DotaApiNote_1.DotaApiNote(context);
    dotaApiNote.init(() => {
        console.log("[apiNoteInit]: 更新lua树状图");
        let luaAPITree = (0, treeApi_1.getLuaApiTree)();
        if (luaAPITree) {
            luaAPITree.refreshRawData();
        }
        console.log("[apiNoteInit]: 更新lua代码补全");
        let luaCompletion = (0, completion_1.getLuaCompletion)();
        if (luaCompletion) {
            luaCompletion.refreshDocument();
        }
        console.log("[apiNoteInit]: 更新css代码补全");
        let cssCompletion = (0, completion_1.getCssCompletion)();
        if (cssCompletion) {
            cssCompletion.refreshDocument();
        }
    });
}
exports.apiNoteInit = apiNoteInit;
function getDotaApiNoteClass() {
    return dotaApiNote;
}
exports.getDotaApiNoteClass = getDotaApiNoteClass;
//# sourceMappingURL=apiNote.js.map