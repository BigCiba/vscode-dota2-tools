import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { GameDir } from '../init';
import { EachLine, GetWebViewContent, ReadKeyValueWithBase, ReadKeyValueWithBaseIncludePath } from '../util';

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
interface AbilityNameToScriptFile {
	[abilityName: string]: string;
}
interface ScriptFileToAbilityName {
	[scriptFile: string]: string[];
}
export class LocalizationViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'LocalizationViewProvider';
	private _view?: vscode.WebviewView;

	private localization: any = {};
	// private luaText: string = '';
	private kvToLua: AbilityNameToScriptFile = {};	// 关联kv与lua脚本
	private luaToKv: ScriptFileToAbilityName = {};	// 关联lua脚本与kv

	constructor(
		private readonly context: vscode.ExtensionContext,
	) {
		vscode.window.onDidChangeActiveTextEditor(data => {
			if (vscode.window.activeTextEditor?.document.languageId == "lua" && this._view) {
				// this.luaText = vscode.window.activeTextEditor.document.getText();
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
		// 解析文本
		this.localization = await this.parseText();
		if (vscode.window.activeTextEditor?.document.languageId == "lua") {
			webviewView.webview.postMessage({
				type: "LuaText",
				data: this.parseLua()
			});
		}
		// 解析kv与lua关联
		let npc_abilities_custom_base: any = await ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_abilities_custom.txt');
		let npc_items_custom_base: any = await ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_items_custom.txt');
		let npc_abilities_custom_base_kv = npc_abilities_custom_base[Object.keys(npc_abilities_custom_base)[0]];
		let npc_items_custom_base_kv = npc_items_custom_base[Object.keys(npc_items_custom_base)[0]];
		for (const key in npc_abilities_custom_base_kv) {
			let value = npc_abilities_custom_base_kv[key];
			let ScriptFile = path.normalize(`${GameDir}/scripts/vscripts/${value.ScriptFile}.lua`);
			this.kvToLua[key] = ScriptFile;
			if (this.luaToKv[ScriptFile] == undefined) {
				this.luaToKv[ScriptFile] = [];
			}
			this.luaToKv[ScriptFile].push(key);
		}
		for (const key in npc_items_custom_base_kv) {
			let value = npc_items_custom_base_kv[key];
			let ScriptFile = path.normalize(`${GameDir}/scripts/vscripts/${value.ScriptFile}.lua`);
			this.kvToLua[key] = ScriptFile;
			if (this.luaToKv[ScriptFile] == undefined) {
				this.luaToKv[ScriptFile] = [];
			}
			this.luaToKv[ScriptFile].push(key);
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
		});
	}
	/**
	 * 解析打开的lua文件
	 * @memberof LocalizationViewProvider
	 */
	parseLua() {
		if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua" && this.luaToKv[path.normalize(vscode.window.activeTextEditor.document.uri.fsPath)]) {
			let result: { [key: string]: LocalizationAbility | LocalizationModifier; } = {};
			// 先添加技能名
			let abilityNames: string[] = this.luaToKv[path.normalize(vscode.window.activeTextEditor.document.uri.fsPath)];
			for (const abilityName of abilityNames) {
				result[abilityName] = this.searchLocalization('DOTA_Tooltip_ability_' + abilityName);;
			}
			// 添加解析的modifier
			let luaText = vscode.window.activeTextEditor.document.getText();
			EachLine(luaText, (_lineNumber, lineText) => {
				if (lineText.search(/\s*(modifier\S*).*=.*class\(.*/) != -1) {
					let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*/, '$1');
					let textData = this.searchLocalization('DOTA_Tooltip_' + key);
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
		const localizationPath: string = GameDir + '/localization';
		let langFolders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localizationPath));
		for (let i: number = 0; i < langFolders.length; i++) {
			const [folderName, folderType] = langFolders[i];
			if (Number(folderType) === vscode.FileType.Directory) {
				const language_path: string = localizationPath + '/' + folderName;
				let promise: { [key: string]: string; } = await ReadLanguage(language_path);
				result[folderName] = promise;
			}
		}
		return result;

		async function ReadLanguage(folderPath: string): Promise<{ [key: string]: string; }> {
			let lang: { [key: string]: any; } = {};
			let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folderPath));
			for (let i = 0; i < files.length; i++) {
				const [fileName, fileType] = files[i];
				let fullPath: string = path.normalize(folderPath + '/' + fileName);
				if (Number(fileType) === vscode.FileType.File) {
					let document: vscode.TextDocument = await vscode.workspace.openTextDocument(fullPath);
					for (let line: number = 0; line < document.lineCount; line++) {
						let lineText: string = document.lineAt(line).text;
						if (lineText) {
							let lineSplit = lineText.split('"');
							if (lineSplit.length >= 4) {
								// 用拆分的文本路径索引
								if (lang[fullPath] == undefined) {
									lang[fullPath] = {};
								}
								lang[fullPath][lineSplit[1]] = lineSplit[3];
							}
						}
					}
				} else if (Number(fileType) === vscode.FileType.Directory) {
					let promise: { [key: string]: string; } = await ReadLanguage(fullPath);
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
						result[language][textPath][_key] = element[_key];
					}
				}
			}
		}
		return result;
	}
}