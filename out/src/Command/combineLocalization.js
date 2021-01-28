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
exports.CombineLocalization = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const init_1 = require("../init");
const util_1 = require("../util");
function CombineLocalization() {
    return __awaiter(this, void 0, void 0, function* () {
        let root_path = util_1.GetRootPath();
        if (root_path === undefined) {
            return;
        }
        const localization_path = init_1.GameDir + '/localization';
        var lang_folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
        for (let i = 0; i < lang_folders.length; i++) {
            const [folder_name, is_directory] = lang_folders[i];
            if (Number(is_directory) === vscode.FileType.Directory) {
                const language_path = localization_path + '/' + folder_name;
                var language = `"lang"
{
	"Language"		"` + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + `"
	"Tokens"
	{
`;
                var promise = yield ReadLanguage(language_path);
                language += promise;
                language += `
	}
}`;
                fs.writeFileSync(init_1.GameDir + '/resource/addon_' + folder_name + '.txt', language);
                // var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
                // text_editor.edit(function (edit_builder) {
                // 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
                // 	edit_builder.insert(new vscode.Position(0,0),language);
                // });
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
                            const text_line = document.lineAt(line);
                            const char_start = text_line.firstNonWhitespaceCharacterIndex;
                            let lineText = document.lineAt(line).text;
                            lineText = lineText.substr(char_start, lineText.length);
                            lang += '\t\t' + lineText + os.EOL;
                        }
                        lang += os.EOL;
                    }
                    else if (Number(file_type) === vscode.FileType.Directory) {
                        var promise = yield ReadLanguage(path + '/' + file_name);
                        lang += promise;
                    }
                }
                return Promise.resolve(lang);
            });
        }
    });
}
exports.CombineLocalization = CombineLocalization;
//# sourceMappingURL=combineLocalization.js.map