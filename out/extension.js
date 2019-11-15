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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "dota2-tools" is now active!');
    // 合并文本
    let Localization = vscode.commands.registerCommand('extension.Localization', () => __awaiter(this, void 0, void 0, function* () {
        const folders = vscode.workspace.workspaceFolders;
        let root_path;
        if (folders !== undefined) {
            root_path = folders[0].uri.fsPath;
        }
        else {
            return;
        }
        const localization_path = root_path + '/game/dota_addons/dota_imba/localization';
        var lang_folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
        for (let i = 0; i < lang_folders.length; i++) {
            const [folder_name, is_directory] = lang_folders[i];
            if (Number(is_directory) === vscode.FileType.Directory) {
                const language_path = localization_path + '/' + folder_name;
                var language = '"lang"\n{\n\t"Language"\t\t"' + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + '"\n\t"Tokens"\n\t{\n';
                var promise = yield ReadLanguage(language_path);
                language += promise;
                language += '\t}\n}';
                var text_editor = yield vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
                text_editor.edit(function (edit_builder) {
                    edit_builder.delete(new vscode.Range(new vscode.Position(0, 0), text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
                    edit_builder.insert(new vscode.Position(0, 0), language);
                });
            }
        }
        function ReadLanguage(path) {
            return __awaiter(this, void 0, void 0, function* () {
                var lang = '';
                var files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                for (let i = 0; i < files.length; i++) {
                    const [file_name, file_type] = files[i];
                    if (Number(file_type) === vscode.FileType.File) {
                        var document = yield vscode.workspace.openTextDocument(path + '/' + file_name);
                        for (let line = 0; line < document.lineCount; line++) {
                            const lineText = document.lineAt(line).text;
                            lang += '\t\t' + lineText + '\n';
                        }
                        lang += '\n';
                    }
                    else if (Number(file_type) === vscode.FileType.Directory) {
                        var promise = yield ReadLanguage(path + '/' + file_name);
                        lang += promise;
                    }
                }
                return Promise.resolve(lang);
            });
        }
    }));
    // 添加英雄基本文件
    let AddHero = vscode.commands.registerCommand('extension.AddHero', () => __awaiter(this, void 0, void 0, function* () {
        const folders = vscode.workspace.workspaceFolders;
        let root_path;
        if (folders !== undefined) {
            root_path = folders[0].uri.fsPath;
        }
        else {
            return;
        }
        // 原版数据
        const scripts_path = root_path + '/game/dota_addons/dota_imba/scripts';
        var text_editor = yield vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_heroes_custom.txt'));
        text_editor.edit(function (edit_builder) {
            edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1, 0), '"npc_dota_hero_enigma"\n');
        });
    }));
    context.subscriptions.push(Localization);
    context.subscriptions.push(AddHero);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map