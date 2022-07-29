"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLocalization = void 0;
const vscode = require("vscode");
const os = require("os");
const fs = require("fs");
const addonInfo_1 = require("../module/addonInfo");
const statusBar_1 = require("../module/statusBar");
const getPathConfiguration_1 = require("../utils/getPathConfiguration");
async function combineLocalization(languageType = "") {
    if ((0, addonInfo_1.isValidFolder)() === false) {
        return;
    }
    // 消息
    (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.LOADING);
    let messageIndex = (0, statusBar_1.showStatusBarMessage)("[合并文本]：" + languageType == "" ? "ALL" : languageType);
    const gameDir = (0, addonInfo_1.getGameDir)();
    const localizationPath = (0, getPathConfiguration_1.getPathConfiguration)("dota2-tools.A5.localization_path");
    if (localizationPath) {
        if (languageType !== "") {
            let language = await getLanguageContent(localizationPath, languageType);
            fs.writeFileSync(gameDir + '/resource/addon_' + languageType + '.txt', language);
            (0, statusBar_1.refreshStatusBarMessage)(messageIndex, "[合并文本]：" + localizationPath + '/' + languageType);
        }
        else {
            let langFolders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localizationPath));
            for (let i = 0; i < langFolders.length; i++) {
                const [folderName, isDirectory] = langFolders[i];
                if (Number(isDirectory) === vscode.FileType.Directory) {
                    let language = await getLanguageContent(localizationPath, folderName);
                    fs.writeFileSync(gameDir + '/resource/addon_' + folderName + '.txt', language);
                    (0, statusBar_1.refreshStatusBarMessage)(messageIndex, "[合并文本]：" + localizationPath + '/' + folderName);
                    // let text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
                    // text_editor.edit(function (edit_builder) {
                    // 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
                    // 	edit_builder.insert(new vscode.Position(0,0),language);
                    // });
                }
            }
            (0, statusBar_1.refreshStatusBarMessage)(messageIndex, "[合并文本]：全部完成");
        }
        (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.ALL_DONE);
    }
}
exports.combineLocalization = combineLocalization;
async function getLanguageContent(localizationPath, languageType) {
    const languagePath = localizationPath + '/' + languageType;
    let language = `"lang"
{
	"Language"		"` + languageType.charAt(0).toUpperCase() + languageType.slice(1) + `"
	"Tokens"
	{
`;
    let promise = await readLanguage(languagePath);
    language += promise;
    language += `
	}
}`;
    return language;
}
async function readLanguage(path) {
    let lang = '';
    let files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
    for (let i = 0; i < files.length; i++) {
        const [fileName, fileType] = files[i];
        if (Number(fileType) === vscode.FileType.File) {
            let document = await vscode.workspace.openTextDocument(path + '/' + fileName);
            lang += "\t\t//" + path.split("localization/")[1] + '/' + fileName + os.EOL;
            for (let line = 0; line < document.lineCount; line++) {
                const textLine = document.lineAt(line);
                const charStart = textLine.firstNonWhitespaceCharacterIndex;
                let lineText = document.lineAt(line).text;
                lineText = lineText.substr(charStart, lineText.length);
                lang += '\t\t' + lineText + os.EOL;
            }
            lang += os.EOL;
        }
        else if (Number(fileType) === vscode.FileType.Directory) {
            let promise = await readLanguage(path + '/' + fileName);
            lang += promise;
        }
    }
    return Promise.resolve(lang);
}
//# sourceMappingURL=cmdCombineLocalization.js.map