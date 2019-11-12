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
    let localization = vscode.commands.registerCommand('extension.localization', () => __awaiter(this, void 0, void 0, function* () {
        const localization_path = 'C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/localization';
        var langs = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
        for (let i = 0; i < langs.length; i++) {
            const lang = langs[i];
            if (lang[1] === vscode.FileType.Directory) {
                const language_path = localization_path + '/' + lang[0];
                var schinese_lang = '"lang"\n{\n\t"Language"\t\t"Schinese"\n\t"Tokens"\n\t{\n';
                schinese_lang += ReadLanguage(language_path);
                schinese_lang += '\t}\n}';
                var textEditor = vscode.window.showTextDocument(vscode.Uri.file('C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/resource/addon_' + lang[0] + '.txt'));
                (yield textEditor).edit(function (editBuilder) {
                    editBuilder.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(100000000, 100000)));
                    editBuilder.insert(new vscode.Position(0, 0), schinese_lang);
                });
            }
        }
        function ReadLanguage(path) {
            return __awaiter(this, void 0, void 0, function* () {
                var s = '';
                var files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                for (let i = 0; i < files.length; i++) {
                    const element = files[i];
                    if (element[1] === vscode.FileType.File) {
                        var document = vscode.workspace.openTextDocument(path + '/' + element[0]);
                        for (let line = 0; line < (yield document).lineCount; line++) {
                            const lineText = (yield document).lineAt(line).text;
                            s += '\t\t' + lineText + '\n';
                        }
                    }
                    else if (element[1] === vscode.FileType.Directory) {
                        s += ReadLanguage(path + '/' + element[0]);
                    }
                }
                return s;
            });
        }
        // fs.writeFileSync('C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/resource/addon_schinese.txt',schinese_lang);
    }));
    context.subscriptions.push(localization);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map