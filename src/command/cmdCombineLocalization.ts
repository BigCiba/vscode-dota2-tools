import * as fs from 'fs';
import * as os from 'os';
import * as vscode from 'vscode';
import { getGameDir, isValidFolder } from '../module/addonInfo';
import { StatusBarState, changeStatusBarState, refreshStatusBarMessage, showStatusBarMessage } from '../module/statusBar';
import { getPathConfiguration } from '../utils/getPathConfiguration';

export async function combineLocalization(languageType: string = "") {
	if (isValidFolder() === false) {
		return;
	}
	// 消息
	changeStatusBarState(StatusBarState.LOADING);
	let messageIndex = showStatusBarMessage("[合并文本]：" + languageType == "" ? "ALL" : languageType);
	const gameDir = getGameDir();
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath) {
		if (languageType !== "") {
			let language = await getLanguageContent(localizationPath, languageType);
			if (language != undefined) {
				fs.writeFileSync(gameDir + '/resource/addon_' + languageType + '.txt', language);
				refreshStatusBarMessage(messageIndex, "[合并文本]：" + localizationPath + '/' + languageType);
			}
		} else {
			let langFolders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localizationPath));
			for (let i: number = 0; i < langFolders.length; i++) {
				const [folderName, isDirectory] = langFolders[i];
				if (Number(isDirectory) === vscode.FileType.Directory) {
					let language = await getLanguageContent(localizationPath, folderName);
					if (language != undefined) {
						fs.writeFileSync(gameDir + '/resource/addon_' + folderName + '.txt', language);
						refreshStatusBarMessage(messageIndex, "[合并文本]：" + localizationPath + '/' + folderName);
					}
					// let text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
					// text_editor.edit(function (edit_builder) {
					// 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
					// 	edit_builder.insert(new vscode.Position(0,0),language);
					// });
				}
			}
			refreshStatusBarMessage(messageIndex, "[合并文本]：全部完成");
		}
		changeStatusBarState(StatusBarState.ALL_DONE);
	}
}
async function getLanguageContent(localizationPath: string, languageType: string) {
	if (languageType == "history") {
		return;
	}
	const languagePath: string = localizationPath + '/' + languageType;
	let language: string = `"lang"
{
	"Language"		"` + languageType.charAt(0).toUpperCase() + languageType.slice(1) + `"
	"Tokens"
	{
`;
	let promise: string = await readLanguage(languagePath);
	language += promise;
	language += `
	}
}`;
	return language;
}

async function readLanguage(path: string): Promise<string> {
	let lang: string = '';
	let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
	for (let i = 0; i < files.length; i++) {
		const [fileName, fileType] = files[i];
		if (Number(fileType) === vscode.FileType.File) {
			let document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + fileName);
			lang += "\t\t//" + path.split("localization/")[1] + '/' + fileName + os.EOL;
			for (let line: number = 0; line < document.lineCount; line++) {
				const textLine: vscode.TextLine = document.lineAt(line);
				const charStart: number = textLine.firstNonWhitespaceCharacterIndex;
				let lineText: string = document.lineAt(line).text;
				lineText = lineText.substr(charStart, lineText.length);

				lang += '\t\t' + lineText + os.EOL;
			}
			lang += os.EOL;
		} else if (Number(fileType) === vscode.FileType.Directory) {
			let promise: string = await readLanguage(path + '/' + fileName);
			lang += promise;
		}
	}
	return Promise.resolve(lang);
}