"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLuaApiTree = exports.panelDocumentInit = exports.cssApiInit = exports.jsApiInit = exports.luaApiInit = void 0;
const vscode = require("vscode");
const luaAPITree_1 = require("../treeDataProvider/luaAPITree");
const jsAPITree_1 = require("../treeDataProvider/jsAPITree");
const cssAPITree_1 = require("../treeDataProvider/cssAPITree");
const panelTree_1 = require("../treeDataProvider/panelTree");
const apiNote_1 = require("./apiNote");
let luaApiTree;
let jsApiTree;
let cssApiTree;
let panelTree;
/** 树状图模块 */
async function luaApiInit(context) {
    if (luaApiTree === undefined) {
        let dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
        luaApiTree = new luaAPITree_1.ApiTreeProvider(context, dotaApiNote);
        vscode.window.registerTreeDataProvider('dota2apiExplorer', luaApiTree);
    }
}
exports.luaApiInit = luaApiInit;
async function jsApiInit(context) {
    if (jsApiTree === undefined) {
        jsApiTree = new jsAPITree_1.JsApiTreeProvider(context);
        vscode.window.registerTreeDataProvider('dota2JSApiExplorer', jsApiTree);
    }
}
exports.jsApiInit = jsApiInit;
async function cssApiInit(context) {
    if (cssApiTree === undefined) {
        let dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
        cssApiTree = new cssAPITree_1.CssApiTreeProvider(context, dotaApiNote);
        vscode.window.registerTreeDataProvider('dota2CssApiExplorer', cssApiTree);
    }
}
exports.cssApiInit = cssApiInit;
async function panelDocumentInit(context) {
    if (panelTree === undefined) {
        panelTree = new panelTree_1.PanelTreeProvider(context);
        vscode.window.registerTreeDataProvider('dota2PanelExplorer', panelTree);
    }
}
exports.panelDocumentInit = panelDocumentInit;
function getLuaApiTree() {
    return luaApiTree;
}
exports.getLuaApiTree = getLuaApiTree;
//# sourceMappingURL=treeApi.js.map