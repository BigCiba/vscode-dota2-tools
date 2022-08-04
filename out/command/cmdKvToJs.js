"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJS = exports.kvToJs = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const addonInfo_1 = require("../module/addonInfo");
const kvUtils_1 = require("../utils/kvUtils");
const isNumber_1 = require("../utils/isNumber");
const statusBar_1 = require("../module/statusBar");
const pathUtils_1 = require("../utils/pathUtils");
const localize_1 = require("../utils/localize");
/** kv转js */
async function kvToJs(context) {
    const gameDir = (0, addonInfo_1.getGameDir)();
    const contentDir = (0, addonInfo_1.getContentDir)();
    if (contentDir === undefined) {
        // vscode.window.showErrorMessage(localize("content_folder_no_found"));
        return;
    }
    // 消息
    (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.LOADING);
    const config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
    let sKvPath = path.join(gameDir + config);
    if (await (0, pathUtils_1.getPathInfo)(sKvPath) === false) {
        vscode.window.showWarningMessage((0, localize_1.localize)("dota2-tools.KV to Js Config.no_found"), (0, localize_1.localize)("confirm"), (0, localize_1.localize)("cancel")).then(value => {
            if (value === (0, localize_1.localize)("confirm")) {
                vscode.window.showInputBox({ prompt: (0, localize_1.localize)("are you sure to generate to this path"), value: path.join(gameDir + config) }).then((msg) => {
                    if (msg !== undefined) {
                        fs.writeFileSync(msg, fs.readFileSync(path.join(context.extensionPath, "resource", "kv_js_config.txt"), 'utf-8'));
                    }
                });
            }
        });
        return;
    }
    let kvJsConfig = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sKvPath, 'utf-8')));
    let kvFiles = kvJsConfig.kvfiles;
    for (const sKVName in kvFiles) {
        await generateJS(context, kvJsConfig, sKVName);
    }
    // 生成KV文件名列表
    let sKVListPath = kvJsConfig.configs?.KvListPath;
    if (sKVListPath) {
        let sFileData = "module.exports = [\n";
        for (const sKVName in kvFiles) {
            sFileData += `\t"${sKVName}",\n`;
        }
        sFileData += "];";
        let jsPath = (contentDir + "/" + sKVListPath).replace(/\\/g, "/");
        fs.writeFileSync(jsPath, sFileData);
    }
    (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.ALL_DONE);
    (0, statusBar_1.showStatusBarMessage)("JS文件生成完毕");
}
exports.kvToJs = kvToJs;
/** 生成js文件 */
async function generateJS(context, kvJsConfig, sKVName) {
    const gameDir = (0, addonInfo_1.getGameDir)();
    const contentDir = (0, addonInfo_1.getContentDir)();
    let configs = kvJsConfig.configs;
    let kvFiles = kvJsConfig.kvfiles;
    let sPath = kvFiles[sKVName];
    let sOutputPath = configs.OutputPath || "panorama/scripts/kv";
    let sTotalPath = gameDir + '/scripts/' + sPath;
    let sObjectName = "GameUI";
    if (typeof (stringToAny(configs.ObjectName)) === "string") {
        sObjectName = stringToAny(configs.ObjectName);
    }
    let kv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)(sTotalPath.replace(/\\/g, "/")));
    // 特殊处理
    if (stringToAny(configs.OverrideAbilities) === true && sPath.search("npc_abilities_custom") !== -1) { // 技能合并
        let npcAbilitiesKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((context.extensionPath + '/resource/npc/npc_abilities.txt').replace(/\\/g, "/")));
        let npcAbilitiesOverrideKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((gameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
        kv = (0, kvUtils_1.overrideKeyValue)((0, kvUtils_1.replaceKeyValue)(npcAbilitiesKv, npcAbilitiesOverrideKv), kv);
    }
    else if (stringToAny(configs.OverrideUnits) === true && sPath.search("npc_units_custom") !== -1) { // 单位合并
        let npcUnitsKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((context.extensionPath + '/resource/npc/npc_units.txt').replace(/\\/g, "/")));
        kv = (0, kvUtils_1.overrideKeyValue)(npcUnitsKv, kv);
    }
    else if (stringToAny(configs.OverrideHeroes) === true && sPath.search("npc_heroes_custom") !== -1) { // 英雄合并
        let npcHeroesKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((context.extensionPath + '/resource/npc/npc_heroes.txt').replace(/\\/g, "/")));
        kv = (0, kvUtils_1.overrideKeyValue)(npcHeroesKv, kv);
    }
    else if (stringToAny(configs.OverrideItems) === true && sPath.search("npc_items_custom") !== -1) { // 物品合并
        let itemsKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((context.extensionPath + '/resource/npc/items.txt').replace(/\\/g, "/")));
        let npcAbilitiesOverrideKv = (0, kvUtils_1.getKeyValueObjectByIndex)(await (0, kvUtils_1.readKeyValueWithBase)((gameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
        kv = (0, kvUtils_1.overrideKeyValue)((0, kvUtils_1.replaceKeyValue)(itemsKv, npcAbilitiesOverrideKv), kv);
    }
    let js = obj2Str(kv);
    let fileData = sObjectName + "." + sKVName + " = " + js + ";";
    let jsPath = (contentDir + "/" + sOutputPath + "/" + sKVName + ".js").replace(/\\/g, "/");
    fs.writeFileSync(jsPath, fileData);
    (0, statusBar_1.showStatusBarMessage)("[生成js]：" + sKVName);
    // 生成定义文件
    if (configs.DeclarePath) {
        let sPath = `${contentDir}/${configs.DeclarePath}/${sKVName}.d.ts`.replace(/\\/g, "/");
        let sDeslareData = `interface CustomUIConfig {\n\t${sKVName}: ${obj2Str(kv, 2)}\n}`;
        fs.writeFileSync(sPath, sDeslareData);
    }
}
exports.generateJS = generateJS;
function stringToAny(str) {
    if (str === "true") {
        return true;
    }
    else if (str === "false") {
        return false;
    }
    else if (!isNaN(Number(str))) {
        return Number(str);
    }
    return str;
}
// 把js的obj转成字符串
// obj:要转的数据对象 
function obj2Str(obj, depth = 1, bracketLeft = "{", bracketRight = "}", sSeparator = ": ") {
    let ret = bracketLeft + "\n";
    for (const key in obj) {
        const element = obj[key];
        for (let index = 0; index < depth; index++) {
            ret += "\t";
        }
        if (typeof (element) === "object") {
            ret += '"' + key + '"' + sSeparator + obj2Str(element, depth + 1, bracketLeft, bracketRight, sSeparator) + ",";
        }
        else {
            if ((0, isNumber_1.isNumber)(element)) {
                ret += '"' + key + '"' + sSeparator + "" + element + ",";
            }
            else {
                ret += '"' + key + '"' + sSeparator + '"' + element + "\",";
            }
        }
        ret += "\n";
    }
    if (ret[ret.length - 1] === ",") {
        ret = ret.slice(0, -1); // 去掉最后一个逗号
    }
    for (let index = 0; index < depth - 1; index++) {
        ret += "\t";
    }
    ret += bracketRight;
    return ret;
}
//# sourceMappingURL=cmdKvToJs.js.map