"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssCompletion = exports.getLuaCompletion = exports.cssCompletionInit = exports.jsCompletionInit = exports.luaCompletionInit = void 0;
const vscode = require("vscode");
const cssCompletionItemProvider_1 = require("../completions/cssCompletionItemProvider");
const jsCompletionItemProvider_1 = require("../completions/jsCompletionItemProvider");
const luaCompletionItemProvider_1 = require("../completions/luaCompletionItemProvider");
const apiNote_1 = require("./apiNote");
/** 代码补全模块 */
let luaCompletionItemProvider;
let cssCompletionItemProvider;
let jsCompletionItemProvider;
async function luaCompletionInit(context) {
    if (luaCompletionItemProvider === undefined) {
        let dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
        luaCompletionItemProvider = new luaCompletionItemProvider_1.LuaCompletionItemProvider(context, dotaApiNote);
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(luaCompletionItemProvider.selector, luaCompletionItemProvider));
    }
}
exports.luaCompletionInit = luaCompletionInit;
async function jsCompletionInit(context) {
    if (jsCompletionItemProvider === undefined) {
        let dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
        jsCompletionItemProvider = new jsCompletionItemProvider_1.JsCompletionItemProvider(context, dotaApiNote);
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(jsCompletionItemProvider.selector, jsCompletionItemProvider));
    }
}
exports.jsCompletionInit = jsCompletionInit;
async function cssCompletionInit(context) {
    if (cssCompletionItemProvider === undefined) {
        let dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
        cssCompletionItemProvider = new cssCompletionItemProvider_1.CssCompletionItemProvider(context, dotaApiNote);
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(cssCompletionItemProvider.selector, cssCompletionItemProvider));
    }
}
exports.cssCompletionInit = cssCompletionInit;
function getLuaCompletion() {
    return luaCompletionItemProvider;
}
exports.getLuaCompletion = getLuaCompletion;
function getCssCompletion() {
    return cssCompletionItemProvider;
}
exports.getCssCompletion = getCssCompletion;
//# sourceMappingURL=completion.js.map