"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationViewProvider = void 0;
const vscode = require("vscode");
const os = require("os");
const fs = require("fs");
const path = require("path");
const init_1 = require("../init");
const util_1 = require("../util");
class LocalizationViewProvider {
    constructor(context) {
        this.context = context;
        this.localization = {};
        // private luaText: string = '';
        this.kvToLua = {}; // 关联kv与lua脚本
        this.luaToKv = {}; // 关联lua脚本与kv
        this.pathForder = {
        // schinese: [
        // 	{
        // 		"abilities": [
        // 			"boss.txt",
        // 		]
        // 	},
        // 	"modifiers",
        // 	"panorama",
        // 	"artifact.txt",
        // 	"common.txt",
        // 	"items.txt",
        // 	"spell.txt",
        // ]
        };
        vscode.window.onDidChangeActiveTextEditor(data => {
            if (this._view) {
                if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua" && this.luaToKv[path.normalize(vscode.window.activeTextEditor.document.uri.fsPath)]) {
                    // this.luaText = vscode.window.activeTextEditor.document.getText();
                    this._view.webview.postMessage({
                        type: "LuaText",
                        data: this.parseLua()
                    });
                }
            }
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this._view = webviewView;
            webviewView.webview.options = {
                enableScripts: true,
            };
            webviewView.webview.html = util_1.GetWebViewContent(this.context, 'webview/LocalizationView/LocalizationView.html');
            webviewView.webview.onDidReceiveMessage(data => {
            });
            // 解析文本
            this.localization = yield this.parseText();
            webviewView.webview.postMessage({
                type: "pathFolder",
                data: this.pathForder
            });
            webviewView.webview.postMessage({
                type: "rootPathFolder",
                data: init_1.GameDir + '/localization'
            });
            // 解析kv与lua关联
            let npc_abilities_custom_base = yield util_1.ReadKeyValueWithBase(init_1.GameDir + '/scripts/npc/npc_abilities_custom.txt');
            let npc_items_custom_base = yield util_1.ReadKeyValueWithBase(init_1.GameDir + '/scripts/npc/npc_items_custom.txt');
            let npc_abilities_custom_base_kv = npc_abilities_custom_base[Object.keys(npc_abilities_custom_base)[0]];
            let npc_items_custom_base_kv = npc_items_custom_base[Object.keys(npc_items_custom_base)[0]];
            for (const key in npc_abilities_custom_base_kv) {
                let value = npc_abilities_custom_base_kv[key];
                let ScriptFile = path.normalize(`${init_1.GameDir}/scripts/vscripts/${value.ScriptFile}.lua`);
                this.kvToLua[key] = ScriptFile;
                if (this.luaToKv[ScriptFile] == undefined) {
                    this.luaToKv[ScriptFile] = [];
                }
                this.luaToKv[ScriptFile].push(key);
            }
            for (const key in npc_items_custom_base_kv) {
                let value = npc_items_custom_base_kv[key];
                let ScriptFile = path.normalize(`${init_1.GameDir}/scripts/vscripts/${value.ScriptFile}.lua`);
                this.kvToLua[key] = ScriptFile;
                if (this.luaToKv[ScriptFile] == undefined) {
                    this.luaToKv[ScriptFile] = [];
                }
                this.luaToKv[ScriptFile].push(key);
            }
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua") {
                webviewView.webview.postMessage({
                    type: "LuaText",
                    data: this.parseLua()
                });
            }
            webviewView.webview.onDidReceiveMessage((data) => __awaiter(this, void 0, void 0, function* () {
                switch (data.type) {
                    case 'new':
                        {
                            let key = '';
                            // Modifier
                            if (data.data.name.search('modifier') != -1) {
                                // Modifier
                                if (data.data.key == 'title') {
                                    key = 'DOTA_Tooltip_' + data.data.name;
                                }
                                else {
                                    key = 'DOTA_Tooltip_' + data.data.name + '_' + data.data.key;
                                }
                            }
                            else {
                                // 技能
                                if (data.data.key == 'title') {
                                    key = 'DOTA_Tooltip_ability_' + data.data.name;
                                }
                                else {
                                    key = 'DOTA_Tooltip_ability_' + data.data.name + '_' + data.data.key;
                                }
                            }
                            // 搜索已有的词条并修改
                            let result = '';
                            let bSearch = false;
                            let document = yield vscode.workspace.openTextDocument(data.data.path);
                            for (let line = 0; line < document.lineCount; line++) {
                                let lineText = document.lineAt(line).text;
                                result += lineText + (line == document.lineCount - 1 ? '' : os.EOL);
                                if (lineText) {
                                    let lineSplit = lineText.split('"');
                                    if (lineSplit.length >= 4) {
                                        if (('DOTA_Tooltip_ability_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase() || ('DOTA_Tooltip_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase()) {
                                            result += `"${key}"			"${data.data.value}"` + os.EOL;
                                            bSearch = true;
                                        }
                                    }
                                }
                            }
                            // 新增词条
                            if (bSearch == false) {
                                result += `${os.EOL}"${key}"			"${data.data.value}"`;
                            }
                            fs.writeFileSync(data.data.path, result);
                            // 更新localization
                            this.localization[data.data.language][path.normalize(data.data.path)][key] = data.data.value;
                            webviewView.webview.postMessage({
                                type: "LuaText",
                                data: this.parseLua()
                            });
                            break;
                        }
                    case 'edit':
                        {
                            let key = '';
                            // Modifier
                            if (data.data.name.search('modifier') != -1) {
                                // Modifier
                                if (data.data.key == 'title') {
                                    key = 'DOTA_Tooltip_' + data.data.name;
                                }
                                else {
                                    key = 'DOTA_Tooltip_' + data.data.name + '_' + data.data.key;
                                }
                            }
                            else {
                                // 技能
                                if (data.data.key == 'title') {
                                    key = 'DOTA_Tooltip_ability_' + data.data.name;
                                }
                                else {
                                    key = 'DOTA_Tooltip_ability_' + data.data.name + '_' + data.data.key;
                                }
                            }
                            let result = '';
                            let document = yield vscode.workspace.openTextDocument(data.data.path);
                            for (let line = 0; line < document.lineCount; line++) {
                                let lineText = document.lineAt(line).text;
                                if (lineText) {
                                    let lineSplit = lineText.split('"');
                                    if (lineSplit.length >= 4) {
                                        if (key.toLowerCase() == lineSplit[1].toLowerCase()) {
                                            lineText = lineText.replace(lineSplit[1], key);
                                            lineText = lineText.replace(lineSplit[3], data.data.value);
                                        }
                                    }
                                }
                                result += lineText + (document.lineCount == (document.lineAt(line).lineNumber + 1) ? '' : os.EOL);
                            }
                            fs.writeFileSync(data.data.path, result);
                            // 更新localization
                            this.localization[data.data.language][path.normalize(data.data.path)][key] = data.data.value;
                            webviewView.webview.postMessage({
                                type: "LuaText",
                                data: this.parseLua()
                            });
                            break;
                        }
                    case 'open':
                        {
                            let document = yield vscode.workspace.openTextDocument(vscode.Uri.file(data.data.path));
                            const options = {
                                preview: false,
                                viewColumn: vscode.ViewColumn.Two
                            };
                            vscode.window.showTextDocument(document, options);
                        }
                }
            }));
        });
    }
    /**
     * 解析打开的lua文件
     * @memberof LocalizationViewProvider
     */
    parseLua() {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua" && this.luaToKv[path.normalize(vscode.window.activeTextEditor.document.uri.fsPath)]) {
            let result = {};
            // 先添加技能名
            let abilityNames = this.luaToKv[path.normalize(vscode.window.activeTextEditor.document.uri.fsPath)];
            for (const abilityName of abilityNames) {
                result[abilityName] = this.searchLocalization('DOTA_Tooltip_ability_' + abilityName);
                ;
            }
            // 添加解析的modifier
            let luaText = vscode.window.activeTextEditor.document.getText();
            util_1.EachLine(luaText, (_lineNumber, lineText) => {
                if (lineText.search(/\s*(modifier\S*).*=.*class\(.*/) != -1) {
                    let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*/, '$1');
                    let textData = this.searchLocalization('DOTA_Tooltip_' + key);
                    result[key] = textData;
                }
                else if (lineText.search(/\s*(modifier\S*).*=.*eom_modifier\(.*/) != -1) {
                    let key = lineText.replace(/\s*(modifier\S*).*=.*eom_modifier\(.*/, '$1');
                    let textData = this.searchLocalization('DOTA_Tooltip_' + key);
                    result[key] = textData;
                }
            });
            return result;
        }
        return {};
    }
    // 解析本地化数据
    parseText() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
            // english: {
            // 	"fasf/as.txt": {
            // 		"DOTA_Tooltip_ability_art_death_seal": "死亡圣印"
            // 	}
            // }
            };
            const localizationPath = init_1.GameDir + '/localization';
            let langFolders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localizationPath));
            for (let i = 0; i < langFolders.length; i++) {
                const [folderName, folderType] = langFolders[i];
                if (Number(folderType) === vscode.FileType.Directory) {
                    // 记录
                    const language_path = localizationPath + '/' + folderName;
                    let promise = yield ReadLanguage(language_path);
                    result[folderName] = promise[0];
                    this.pathForder[folderName] = promise[1];
                }
            }
            return result;
            function ReadLanguage(folderPath) {
                return __awaiter(this, void 0, void 0, function* () {
                    let lang = {};
                    let pathData = {};
                    let files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(folderPath));
                    for (let i = 0; i < files.length; i++) {
                        const [fileName, fileType] = files[i];
                        let fullPath = path.normalize(folderPath + '/' + fileName);
                        if (Number(fileType) === vscode.FileType.File) {
                            pathData[fileName] = vscode.FileType.File;
                            let document = yield vscode.workspace.openTextDocument(fullPath);
                            for (let line = 0; line < document.lineCount; line++) {
                                let lineText = document.lineAt(line).text;
                                if (lineText) {
                                    let lineSplit = lineText.split('"');
                                    if (lineSplit.length >= 4) {
                                        // 用拆分的文本路径索引
                                        if (lang[fullPath] == undefined) {
                                            lang[fullPath] = {};
                                        }
                                        lang[fullPath][lineSplit[1]] = lineSplit[3];
                                    }
                                }
                            }
                        }
                        else if (Number(fileType) === vscode.FileType.Directory) {
                            let promise = yield ReadLanguage(fullPath);
                            pathData[fileName] = promise[1];
                            lang = Object.assign(lang, promise[0]);
                        }
                    }
                    return Promise.resolve([lang, pathData]);
                });
            }
        });
    }
    // 搜寻本地化
    searchLocalization(key) {
        key = key.toLowerCase();
        let result = {
        // english: {
        // 	"asfa/asdfas.txt": {
        // 		"DOTA_Tooltip_ability_art_death_seal": "412412",
        // 		"DOTA_Tooltip_ability_art_death_seal_Description": "死亡圣印",
        // 		"DOTA_Tooltip_ability_art_death_seal_Lore": "死亡圣印"
        // 	}
        // }
        };
        for (const language in this.localization) {
            result[language] = {};
            let localization = this.localization[language];
            for (const textPath in localization) {
                let element = localization[textPath];
                for (const _key in element) {
                    if (_key.toLowerCase().search(RegExp(key + '.*')) != -1) {
                        if (result[language][textPath] == undefined) {
                            result[language][textPath] = {};
                        }
                        result[language][textPath][_key] = element[_key];
                    }
                }
            }
        }
        return result;
    }
}
exports.LocalizationViewProvider = LocalizationViewProvider;
LocalizationViewProvider.viewType = 'LocalizationViewProvider';
//# sourceMappingURL=LocalizationViewProvider.js.map