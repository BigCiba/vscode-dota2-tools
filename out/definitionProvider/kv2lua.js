"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScriptFiles = exports.refreshScriptFiles = exports.kv2luaInit = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const addonInfo_1 = require("../module/addonInfo");
const kvUtils_1 = require("../utils/kvUtils");
const getRootPath_1 = require("../utils/getRootPath");
const event_1 = require("../Class/event");
const pathUtils_1 = require("../utils/pathUtils");
/** 关联kv的脚本路径 */
let scriptFiles = {};
let defJump;
let eventID;
const configName = "dota2-tools.A6.Kv to lua generate script";
let config;
async function kv2luaInit(context) {
    config = getConfiguration();
    if (eventID === undefined) {
        eventID = event_1.EventManager.listenToEvent(event_1.EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
            if (!event.affectsConfiguration(configName) || getConfiguration() === config) {
                return;
            }
            config = getConfiguration();
        });
    }
    refreshScriptFiles();
    const gameDir = (0, addonInfo_1.getGameDir)();
    function provideDefinition(document, position, token) {
        const fileName = document.fileName;
        // const workDir = path.dirname(fileName);
        // const word = document.getText(document.getWordRangeAtPosition(position));
        const line = document.lineAt(position);
        // console.log('====== 进入 provideDefinition 方法 ======');
        // console.log('fileName: ' + fileName); // 当前文件完整路径
        // console.log('workDir: ' + workDir); // 当前文件所在目录
        // console.log('word: ' + word); // 当前光标所在单词
        // console.log('line: ' + line.text); // 当前光标所在行
        // console.log();
        // 只处理package.json文件
        if (/.*\.kv/.test(fileName) || /.*\.txt/.test(fileName)) {
            const json = document.getText();
            // console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
            // console.log(new RegExp(`"ScriptFile"`).test(line.text));
            if (new RegExp(`"ScriptFile"`).test(line.text)) {
                let luaPath = line.text.split('"')[3];
                let destPath = `${gameDir}/scripts/vscripts/${luaPath}.lua`;
                // console.log(destPath);
                if (fs.existsSync(destPath)) {
                    return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
                }
                else {
                    if (config) {
                        mkdirp(path.dirname(destPath));
                        fs.writeFileSync(destPath, getLuaScriptSnippet(path.basename(luaPath).replace('.lua', ''), luaPath, context));
                    }
                }
            }
        }
    }
    if (defJump !== undefined) {
        defJump.dispose();
    }
    defJump = vscode.languages.registerDefinitionProvider([{ pattern: '**/*.txt' }, { pattern: '**/*.kv' }], { provideDefinition });
    context.subscriptions.push(defJump);
}
exports.kv2luaInit = kv2luaInit;
/** 更新关联表 */
async function refreshScriptFiles() {
    const gameDir = (0, addonInfo_1.getGameDir)();
    if (await (0, pathUtils_1.getPathInfo)(gameDir + '/scripts/npc/npc_abilities_custom.txt') === false) {
        return;
    }
    let abilityKv = await (0, kvUtils_1.readKeyValueWithBase)(gameDir + '/scripts/npc/npc_abilities_custom.txt');
    for (const key in abilityKv.DOTAAbilities) {
        const value = abilityKv.DOTAAbilities[key];
        if (typeof (value) === 'object') {
            scriptFiles[key] = gameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
        }
    }
    let itemKv = await (0, kvUtils_1.readKeyValueWithBase)(gameDir + '/scripts/npc/npc_items_custom.txt');
    for (const key in itemKv.DOTAAbilities) {
        const value = itemKv.DOTAAbilities[key];
        if (typeof (value) === 'object') {
            scriptFiles[key] = gameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
        }
    }
}
exports.refreshScriptFiles = refreshScriptFiles;
function getScriptFiles() {
    return scriptFiles;
}
exports.getScriptFiles = getScriptFiles;
/** 自动生成的技能物品lua文件模板 */
function getLuaScriptSnippet(filename, luaPath, context) {
    try {
        const templateConfig = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles');
        let snippetPath = (filename.indexOf("item_") === -1) ? (((0, getRootPath_1.getRootPath)() + templateConfig.ability).replace(/\\/g, "/")) : (((0, getRootPath_1.getRootPath)() + templateConfig.item).replace(/\\/g, "/"));
        let snippet = fs.readFileSync(snippetPath, "utf-8");
        snippet = snippet.replace(/\[filename\]/g, filename);
        snippet = snippet.replace(/\[path\]/g, luaPath);
        return snippet;
    }
    catch (error) {
        console.log("[warning]:No snippet file");
    }
    if (context) {
        let snippet = fs.readFileSync(path.join(context.extensionPath, 'resource', 'lua_template.lua'), "utf-8");
        snippet = snippet.replace(/filename/g, filename);
        snippet = snippet.replace(/path/g, luaPath);
        return snippet;
    }
    return '';
}
/** 是否开启设置 */
function getConfiguration() {
    let config = vscode.workspace.getConfiguration().get(configName);
    return config;
}
//# sourceMappingURL=kv2lua.js.map