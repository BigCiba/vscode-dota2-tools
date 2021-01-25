import * as vscode from 'vscode';
import * as os from 'os';
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
	}
	/**
	 * 解析打开的lua文件
	 * @memberof LocalizationViewProvider
	 */
	parseLua() {
		if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == "lua") {
			let luaText = vscode.window.activeTextEditor.document.getText();
			let result: { [key: string]: LocalizationAbility|LocalizationModifier;} = {};
			EachLine(luaText, (_lineNumber, lineText) => {
				if (lineText.search(/\s*(modifier\S*).*=.*class\(.*\)/) != -1) {
					let key = lineText.replace(/\s*(modifier\S*).*=.*class\(.*\)/, '$1');
					result[key] = {
						Title: this.localization.schinese[('DOTA_Tooltip_' + key).toLowerCase()],
						Description: this.localization.schinese[('DOTA_Tooltip_' + key + '_Description').toLowerCase()]
					};
				} else if (lineText.search(/\s*([^ \f\n\r\v]*).*=.*class\(.*\)/) != -1) {
					let key = lineText.replace(/\s*([^ \f\n\r\v]*).*=.*class\(.*\)/, '$1');
					result[key] = {
						Title: this.localization.schinese[('DOTA_Tooltip_ability_' + key).toLowerCase()],
						Description: this.localization.schinese[('DOTA_Tooltip_ability_' + key + '_Description').toLowerCase()]
					};
				}
			});
			return result
		}
	}
	async parseText() {
		let result:any = {};
		const localization_path: string = GameDir + '/localization';
		let lang_folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		for (let i: number = 0; i < lang_folders.length; i++) {
			const [folder_name, is_directory] = lang_folders[i];
			if (Number(is_directory) === vscode.FileType.Directory) {
				const language_path: string = localization_path + '/' + folder_name;
				let promise: { [key: string]: string; } = await ReadLanguage(language_path);
				result[folder_name] = promise
			}
		}
		return result;

		async function ReadLanguage(path: string): Promise<{[key:string]:string}> {
			let lang: {[key:string]:string} = {};
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
								lang[lineSplit[1].toLowerCase()] = lineSplit[3];
							}
						}
					}
				} else if (Number(file_type) === vscode.FileType.Directory) {
					let promise: {[key:string]:string} = await ReadLanguage(path + '/' + file_name);
					lang = Object.assign(lang, promise);
				}
			}
			return Promise.resolve(lang);
		}
	}
}