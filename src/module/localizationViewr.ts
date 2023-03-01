import * as vscode from 'vscode';
import { LocalizationViewProvider } from '../WebviewViewProvider/localizationView';
/** 代码补全模块 */

let localizationViewProvider: LocalizationViewProvider;

export async function localizationViewrInit(context: vscode.ExtensionContext) {
	if (localizationViewProvider === undefined) {
		localizationViewProvider = new LocalizationViewProvider(context);
		context.subscriptions.push(vscode.window.registerWebviewViewProvider(LocalizationViewProvider.viewType, localizationViewProvider));
	}
}