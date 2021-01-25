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
        this.luaText = '';
        vscode.window.onDidChangeActiveTextEditor(data => {
            var _a;
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua" && this._view) {
                this.luaText = vscode.window.activeTextEditor.document.getText();
                this._view.webview.postMessage({
                    type: "LuaText",
                    data: this.parseLua()
                });
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
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua") {
                webviewView.webview.postMessage({
                    type: "LuaText",
                    data: this.parseLua()
                });
            }
            // 解析kv与lua关联
            let ability_kv = yield util_1.ReadKeyValueWithBaseIncludePath(init_1.GameDir + '/scripts/npc/npc_abilities_custom.txt');
            for (const kvPath in ability_kv) {
                console.log(kvPath);
                const DOTAAbilities = ability_kv[kvPath];
            }
            // for (const key in ability_kv.DOTAAbilities) {
            // 	const value = ability_kv.DOTAAbilities[key];
            // 	if (typeof (value) === 'object') {
            // 		KV2LUA[key] = GameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
            // 	}
            // }
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
                            let result = '';
                            let document = yield vscode.workspace.openTextDocument(data.data.path);
                            for (let line = 0; line < document.lineCount; line++) {
                                let lineText = document.lineAt(line).text;
                                result += lineText + os.EOL;
                                if (lineText) {
                                    let lineSplit = lineText.split('"');
                                    if (lineSplit.length >= 4) {
                                        if (('DOTA_Tooltip_ability_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase() || ('DOTA_Tooltip_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase()) {
                                            result += `"${key}"			"${data.data.value}"` + os.EOL;
                                        }
                                    }
                                }
                            }
                            fs.writeFileSync(data.data.path, result);
                            // 更新localization
                            this.localization[data.data.language][data.data.path][key] = data.data.value;
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
                                console.log(document.lineCount, document.lineAt(line).lineNumber);
                                result += lineText + (document.lineCount == (document.lineAt(line).lineNumber + 1) ? '' : os.EOL);
                            }
                            fs.writeFileSync(data.data.path, result);
                            // 更新localization
                            this.localization[data.data.language][data.data.path][key] = data.data.value;
                            webviewView.webview.postMessage({
                                type: "LuaText",
                                data: this.parseLua()
                            });
                            break;
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
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua") {
            for (const key in init_1.KV2LUA) {
                if (path.normalize(vscode.window.activeTextEditor.document.uri.fsPath) == path.normalize(init_1.KV2LUA[key])) {
                    let result = {};
                    let luaText = vscode.window.activeTextEditor.document.getText();
                    util_1.EachLine(luaText, (_lineNumber, lineText) => {
                        if (lineText.search(/\s*(modifier\S*).*=.*class\(.*/) != -1) {
                            let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*/, '$1');
                            let textData = this.searchLocalization('DOTA_Tooltip_' + key);
                            result[key] = textData;
                        }
                        else if (lineText.search(/\s*([^ \f\n\r\v]*).*=.*class\(.*/) != -1) {
                            let key = lineText.replace(/\s*([^ \f\n\r\v]*).*=.*class\(.*/, '$1');
                            let textData = this.searchLocalization('DOTA_Tooltip_ability_' + key);
                            result[key] = textData;
                        }
                    });
                    return result;
                }
            }
        }
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
            const localization_path = init_1.GameDir + '/localization';
            let lang_folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
            for (let i = 0; i < lang_folders.length; i++) {
                const [folder_name, is_directory] = lang_folders[i];
                if (Number(is_directory) === vscode.FileType.Directory) {
                    const language_path = localization_path + '/' + folder_name;
                    let promise = yield ReadLanguage(language_path);
                    result[folder_name] = promise;
                }
            }
            return result;
            function ReadLanguage(path) {
                return __awaiter(this, void 0, void 0, function* () {
                    let lang = {};
                    let files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                    for (let i = 0; i < files.length; i++) {
                        const [file_name, file_type] = files[i];
                        if (Number(file_type) === vscode.FileType.File) {
                            let document = yield vscode.workspace.openTextDocument(path + '/' + file_name);
                            for (let line = 0; line < document.lineCount; line++) {
                                let lineText = document.lineAt(line).text;
                                if (lineText) {
                                    let lineSplit = lineText.split('"');
                                    if (lineSplit.length >= 4) {
                                        // 用拆分的文本路径索引
                                        if (lang[path + '/' + file_name] == undefined) {
                                            lang[path + '/' + file_name] = {};
                                        }
                                        lang[path + '/' + file_name][lineSplit[1]] = lineSplit[3];
                                    }
                                }
                            }
                        }
                        else if (Number(file_type) === vscode.FileType.Directory) {
                            let promise = yield ReadLanguage(path + '/' + file_name);
                            lang = Object.assign(lang, promise);
                        }
                    }
                    return Promise.resolve(lang);
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