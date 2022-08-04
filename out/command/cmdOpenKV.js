"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openKV = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const kv2lua_1 = require("../definitionProvider/kv2lua");
const addonInfo_1 = require("../module/addonInfo");
const kvUtils_1 = require("../utils/kvUtils");
async function openKV(context) {
    const textEditor = vscode.window.activeTextEditor;
    const gameDir = (0, addonInfo_1.getGameDir)();
    if (textEditor !== undefined) {
        let document = textEditor.document;
        const fileName = document.fileName;
        const position = textEditor.selection.start;
        let scriptFiles = (0, kv2lua_1.getScriptFiles)();
        let word = document.getText(document.getWordRangeAtPosition(position));
        // 如果是modifier则搜寻技能名（必须同一文件）
        if (scriptFiles[word] === undefined) {
            let kvString = fs.readFileSync(fileName, 'utf-8');
            const rows = kvString.split(os.EOL);
            for (let i = 0; i < rows.length; i++) {
                const lineText = rows[i];
                let configConditions = vscode.workspace.getConfiguration().get("dota2-tools.ability class constructor");
                if (configConditions) {
                    for (const keyword of configConditions) {
                        let reg = new RegExp(".* = " + keyword);
                        if (reg.test(lineText) === true) {
                            word = lineText.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
                        }
                    }
                }
                if (/.* = class/.test(lineText) === true && /modifier_.* = class/.test(lineText) === false) {
                    word = lineText.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
                }
            }
        }
        // 还是空尝试更新关系表
        if (scriptFiles[word] === undefined) {
            await (0, kv2lua_1.refreshScriptFiles)();
        }
        if (scriptFiles[word] !== undefined) {
            let kvString = fs.readFileSync(gameDir + '/scripts/npc/npc_abilities_custom.txt', 'utf-8');
            kvString = (0, kvUtils_1.removeComment)(kvString);
            let rows = kvString.split(os.EOL);
            for (let i = 0; i < rows.length; i++) {
                const lineText = rows[i];
                if (lineText.search(/#base ".*"/) !== -1) {
                    let basePath = lineText.split('"')[1];
                    let bFind = getKVInfo(gameDir + '/scripts/npc/' + basePath, word);
                    if (bFind !== false && typeof (bFind) === 'number') {
                        let document = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/' + basePath));
                        const options = {
                            selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
                            preview: false,
                            viewColumn: vscode.ViewColumn.Two
                        };
                        vscode.window.showTextDocument(document, options);
                        break;
                    }
                    continue;
                }
                else {
                    if (lineText.search(word) !== -1) {
                        let document = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/npc_abilities_custom.txt'));
                        const options = {
                            selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
                            preview: false,
                            viewColumn: vscode.ViewColumn.Two
                        };
                        vscode.window.showTextDocument(document, options);
                        break;
                    }
                }
            }
            kvString = fs.readFileSync(gameDir + '/scripts/npc/npc_items_custom.txt', 'utf-8');
            kvString = (0, kvUtils_1.removeComment)(kvString);
            rows = kvString.split(os.EOL);
            for (let i = 0; i < rows.length; i++) {
                const lineText = rows[i];
                if (lineText.search(/#base ".*"/) !== -1) {
                    let basePath = lineText.split('"')[1];
                    let bFind = getKVInfo(gameDir + '/scripts/npc/' + basePath, word);
                    if (bFind !== false && typeof (bFind) === 'number') {
                        let document = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/' + basePath));
                        const options = {
                            selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
                            preview: false,
                            viewColumn: vscode.ViewColumn.Two
                        };
                        vscode.window.showTextDocument(document, options);
                        break;
                    }
                    continue;
                }
                else {
                    if (lineText.search(word) !== -1) {
                        let document = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/npc_abilities_custom.txt'));
                        const options = {
                            selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
                            preview: false,
                            viewColumn: vscode.ViewColumn.Two
                        };
                        vscode.window.showTextDocument(document, options);
                        break;
                    }
                }
            }
        }
    }
    function getKVInfo(fullPath, word) {
        let kvString = fs.readFileSync(fullPath, 'utf-8');
        const rows = kvString.split(os.EOL);
        for (let i = 0; i < rows.length; i++) {
            const lineText = rows[i];
            if (lineText.search(word) !== -1) {
                return i;
            }
        }
        return false;
    }
}
exports.openKV = openKV;
//# sourceMappingURL=cmdOpenKV.js.map