// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import { start } from 'repl';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dota2-tools" is now active!');
	
	let localization = vscode.commands.registerCommand('extension.localization', async () => {
		const localization_path = 'C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/localization';
		var langs = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		for (let i = 0; i < langs.length; i++) {
			const lang = langs[i];
			if (lang[1] === vscode.FileType.Directory){
				const language_path = localization_path + '/' + lang[0];
				var schinese_lang = '"lang"\n{\n\t"Language"\t\t"Schinese"\n\t"Tokens"\n\t{\n';
				schinese_lang += ReadLanguage(language_path);
				schinese_lang += '\t}\n}';
				var textEditor = vscode.window.showTextDocument(vscode.Uri.file('C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/resource/addon_' + lang[0] + '.txt'));
				(await textEditor).edit(function (editBuilder) {
					editBuilder.delete(new vscode.Range(new vscode.Position(0,0),new vscode.Position(100000000,100000)));
					editBuilder.insert(new vscode.Position(0,0),schinese_lang);
				});
			}
		}
		async function ReadLanguage(path:string) {
			var s = '';
			var files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
			for (let i = 0; i < files.length; i++) {
				const element = files[i];
				if (element[1] === vscode.FileType.File) {
					var document = vscode.workspace.openTextDocument(path + '/' + element[0]);
					for (let line = 0; line < (await document).lineCount; line++) {
						const lineText = (await document).lineAt(line).text;
						s += '\t\t' + lineText + '\n';
					}
				} else if (element[1] === vscode.FileType.Directory) {
					s += ReadLanguage(path + '/' + element[0]);
				}
			}
			return s;
		}
		
		// fs.writeFileSync('C:/Users/bigciba/Documents/Dota Addons/IMBA/game/dota_addons/dota_imba/resource/addon_schinese.txt',schinese_lang);
	});

	context.subscriptions.push(localization);
}

// this method is called when your extension is deactivated
export function deactivate() {}
