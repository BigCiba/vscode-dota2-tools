import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import { GameDir } from '../init';
import { EachLine, GetWebViewContent } from '../util';

interface LocalizationModifier {
	Title?: string;
	Description?: string;
}
interface LocalizationAbility extends LocalizationModifier {
	Lore?: string;
	Note0?: string;
	Note1?: string;
	Note2?: string;
	scepter_description?: string;
	[key: string]: any;
}
export class LocalizationViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'LocalizationViewProvider';
	private _view?: vscode.WebviewView;

	private localization: any = {};
	private luaText: string = '';

	constructor(
		private readonly context: vscode.ExtensionContext,
	) {
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
			if (vscode.window.activeTextEditor?.document.languageId == "lua" && this._view) {
				this.luaText = vscode.window.activeTextEditor.document.getText();
				this._view.webview.postMessage({
					type: "LuaText",
					data: this.parseLua()
				});
			}
		});
	}

	public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = GetWebViewContent(this.context, 'webview/LocalizationView/LocalizationView.html');
		webviewView.webview.onDidReceiveMessage(data => {
		});

		this.localization = await this.parseText();
		if (vscode.window.activeTextEditor?.document.languageId == "lua") {
			webviewView.webview.postMessage({
				type: "LuaText",
				data: this.parseLua()
			});
		}

		webviewView.webview.onDidReceiveMessage(async data => {
			switch (data.type) {
				case 'new':
					{
						let key = '';
						// Modifier
						if (data.data.name.search('modifier') != -1) {
							// Modifier
							if (data.data.key == 'title') {
								key = 'DOTA_Tooltip_' + data.data.name;
							} else {
								key = 'DOTA_Tooltip_' + data.data.name + '_' + data.data.key;
							}
						} else {
							// 技能
							if (data.data.key == 'title') {
								key = 'DOTA_Tooltip_ability_' + data.data.name;
							} else {
								key = 'DOTA_Tooltip_ability_' + data.data.name + '_' + data.data.key;
							}
						}
						let result = '';
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(data.data.path);
						for (let line: number = 0; line < document.lineCount; line++) {
							let lineText: string = document.lineAt(line).text;
							result += lineText+ os.EOL;
							if (lineText) {
								let lineSplit = lineText.split('"');
								if (lineSplit.length >= 4) {
									if (('DOTA_Tooltip_ability_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase() || ('DOTA_Tooltip_' + data.data.name).toLowerCase() == lineSplit[1].toLowerCase()) {
										result += `"${key}"			"${data.data.value}"` + os.EOL;
									}
								}
							}
						}
						
						fs.writeFileSync(data.data.path, result)
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
							} else {
								key = 'DOTA_Tooltip_' + data.data.name + '_' + data.data.key;
							}
						} else {
							// 技能
							if (data.data.key == 'title') {
								key = 'DOTA_Tooltip_ability_' + data.data.name;
							} else {
								key = 'DOTA_Tooltip_ability_' + data.data.name + '_' + data.data.key;
							}
						}
						let result = '';
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(data.data.path);
						for (let line: number = 0; line < document.lineCount; line++) {
							let lineText: string = document.lineAt(line).text;
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
							
							result += lineText + (document.lineCount == (document.lineAt(line).lineNumber + 1) ? '':os.EOL);
						}
						
						fs.writeFileSync(data.data.path, result)
						// 更新localization
						this.localization[data.data.language][data.data.path][key] = data.data.value;
						webviewView.webview.postMessage({
							type: "LuaText",
							data: this.parseLua()
						});
						break;
					}
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
			let result: { [key: string]: LocalizationAbility | LocalizationModifier; } = {};
			EachLine(luaText, (_lineNumber, lineText) => {
				if (lineText.search(/\s*(modifier\S*).*=.*class\(.*/) != -1) {
					let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*/, '$1');
					let textData = this.searchLocalization('DOTA_Tooltip_' + key);
					result[key] = textData;
				} else if (lineText.search(/\s*([^ \f\n\r\v]*).*=.*class\(.*/) != -1) {
					let key = lineText.replace(/\s*([^ \f\n\r\v]*).*=.*class\(.*/, '$1');
					let textData = this.searchLocalization('DOTA_Tooltip_ability_' + key);
					result[key] = textData;
				}
			});
			return result;
		}
	}
	// 解析本地化数据
	async parseText() {
		let result: any = {
			// english: {
			// 	"fasf/as.txt": {
			// 		"DOTA_Tooltip_ability_art_death_seal": "死亡圣印"
			// 	}
			// }
		};
		const localization_path: string = GameDir + '/localization';
		let lang_folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		for (let i: number = 0; i < lang_folders.length; i++) {
			const [folder_name, is_directory] = lang_folders[i];
			if (Number(is_directory) === vscode.FileType.Directory) {
				const language_path: string = localization_path + '/' + folder_name;
				let promise: { [key: string]: string; } = await ReadLanguage(language_path);
				result[folder_name] = promise;
			}
		}
		return result;

		async function ReadLanguage(path: string): Promise<{ [key: string]: string; }> {
			let lang: { [key: string]: any; } = {};
			let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
			for (let i = 0; i < files.length; i++) {
				const [file_name, file_type] = files[i];
				if (Number(file_type) === vscode.FileType.File) {
					let document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + file_name);
					for (let line: number = 0; line < document.lineCount; line++) {
						let lineText: string = document.lineAt(line).text;
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
				} else if (Number(file_type) === vscode.FileType.Directory) {
					let promise: { [key: string]: string; } = await ReadLanguage(path + '/' + file_name);
					lang = Object.assign(lang, promise);
				}
			}
			return Promise.resolve(lang);
		}
	}
	// 搜寻本地化
	searchLocalization(key: string) {
		key = key.toLowerCase();
		let result: any = {
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
						result[language][textPath][_key] = element[_key]
					}
				}
			}
		}
		return result;
	}
}