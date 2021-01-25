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
const init_1 = require("../init");
const util_1 = require("../util");
class LocalizationViewProvider {
    constructor(context) {
        this.context = context;
        this.localization = {};
        this.luaText = '';
        // this.parseText().then((result) => {
        // 	this.localization = result;
        // 	if (this._view) {
        // 		this._view.webview.postMessage({
        // 			type: "LuaText",
        // 			data: this.parseLua()
        // 		});
        // 	}
        // });
        // if (vscode.window.activeTextEditor != undefined) {
        // 	this.luaText = vscode.window.activeTextEditor.document.getText();
        // }
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
            this.localization = yield this.parseText();
            if (((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.languageId) == "lua") {
                webviewView.webview.postMessage({
                    type: "LuaText",
                    data: this.parseLua()
                });
            }
        });
    }
    /**
     * 解析打开的lua文件
     * @memberof LocalizationViewProvider
     */
    parseLua() {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua") {
            let luaText = vscode.window.activeTextEditor.document.getText();
            let result = {};
            util_1.EachLine(luaText, (_lineNumber, lineText) => {
                if (lineText.search(/\s*(modifier\S*).*=.*class\(.*\)/) != -1) {
                    let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*\)/, '$1');
                    result[key] = {
                        Title: this.localization.schinese[('DOTA_Tooltip_' + key).toLowerCase()],
                        Description: this.localization.schinese[('DOTA_Tooltip_' + key + '_Description').toLowerCase()]
                    };
                }
                else if (lineText.search(/\s*([^ \f\n\r\v]*).*=.*class\(.*\)/) != -1) {
                    let key = lineText.replace(/\s*([^ \f\n\r\v]*).*=.*class\(.*\)/, '$1');
                    result[key] = {
                        Title: this.localization.schinese[('DOTA_Tooltip_ability_' + key).toLowerCase()],
                        Description: this.localization.schinese[('DOTA_Tooltip_ability_' + key + '_Description').toLowerCase()]
                    };
                }
            });
            return result;
        }
    }
    parseText() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
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
                                        lang[lineSplit[1].toLowerCase()] = lineSplit[3];
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
}
exports.LocalizationViewProvider = LocalizationViewProvider;
LocalizationViewProvider.viewType = 'LocalizationViewProvider';
//# sourceMappingURL=LocalizationViewProvider.js.map