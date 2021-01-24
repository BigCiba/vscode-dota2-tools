import * as vscode from 'vscode';
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

	private localization: LocalizationAbility = {};
	private luaText: string = '';

	constructor(
		private readonly context: vscode.ExtensionContext,
	) {
		if (vscode.window.activeTextEditor != undefined) {
			this.luaText = vscode.window.activeTextEditor.document.getText();
		}
		vscode.window.onDidChangeActiveTextEditor(data => {
			if (vscode.window.activeTextEditor?.document.languageId == "lua" && this._view) {
				this.luaText = vscode.window.activeTextEditor.document.getText();
				this._view.webview.postMessage(this.parseLua());
			}
		});
	}

	public resolveWebviewView(
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

		if (vscode.window.activeTextEditor?.document.languageId == "lua") {
			webviewView.webview.postMessage(this.parseLua());
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
			EachLine(luaText, (lineNumber, lineText) => {
				if (lineText.search(/(modifier\S*).*=.*class\(.*\{.*\}.*\)/) != -1) {
					let key = lineText.replace(/(modifier\S*).*=.*class\(.*\{.*\}.*\)/, '$1');
					result[key] = {
						Title: "123",
						Description: "456"
					};
				} else if (lineText.search(/([^ \f\n\r\v]*).*=.*class\(.*\{.*\}.*\)/) != -1) {
					let key = lineText.replace(/([^ \f\n\r\v]*).*=.*class\(.*\{.*\}.*\)/, '$1');
					result[key] = {
						Title: "123",
						Description: "456"
					};
				}
			});
			return result
		}
	}
}