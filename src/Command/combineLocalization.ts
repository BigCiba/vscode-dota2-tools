import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import { GameDir } from "../init";
import { GetRootPath } from "../util";

export async function CombineLocalization() {
	let root_path: string | undefined = GetRootPath();
	if (root_path === undefined) {
		return;
	}
	const localization_path: string = GameDir + '/localization';
	var lang_folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
	for (let i: number = 0; i < lang_folders.length; i++) {
		const [folder_name, is_directory] = lang_folders[i];
		if (Number(is_directory) === vscode.FileType.Directory) {
			const language_path: string = localization_path + '/' + folder_name;
			var language: string = `"lang"
{
	"Language"		"` + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + `"
	"Tokens"
	{
`;
			var promise: string = await ReadLanguage(language_path);
			language += promise;
			language += `
	}
}`;
			fs.writeFileSync(GameDir + '/resource/addon_' + folder_name + '.txt', language);
			// var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
			// text_editor.edit(function (edit_builder) {
			// 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
			// 	edit_builder.insert(new vscode.Position(0,0),language);
			// });
		}
	}
	async function ReadLanguage(path: string): Promise<string> {
		var lang: string = '';
		var files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
		for (let i = 0; i < files.length; i++) {
			const [file_name, file_type] = files[i];
			if (Number(file_type) === vscode.FileType.File) {
				var document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + file_name);
				lang += "\t\t// txt_split(\"" + path.split("localization/")[1] + '/' + file_name + "\")" + os.EOL;
				for (let line: number = 0; line < document.lineCount; line++) {
					const text_line: vscode.TextLine = document.lineAt(line);
					const char_start: number = text_line.firstNonWhitespaceCharacterIndex;
					let lineText: string = document.lineAt(line).text;
					lineText = lineText.substr(char_start, lineText.length);

					lang += '\t\t' + lineText + os.EOL;
				}
				lang += os.EOL;
			} else if (Number(file_type) === vscode.FileType.Directory) {
				var promise: string = await ReadLanguage(path + '/' + file_name);
				lang += promise;
			}
		}
		return Promise.resolve(lang);
	}
}