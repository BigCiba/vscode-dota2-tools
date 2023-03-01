import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getWebviewContent } from '../utils/getWebViewContent';
import { showStatusBarMessage } from '../module/statusBar';
export class LocalizationViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'dota2tools.views.Localization';

	private _view?: vscode.WebviewView;

	constructor(private context: vscode.ExtensionContext) { }

	public async resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this.context.extensionUri
			]
		};

		webviewView.webview.html = await getWebviewContent(webviewView.webview, this.context.extensionUri, 'LocalizationViewer');
	}
}