import * as vscode from 'vscode';
import translate = require('google-translate-api');

export async function TranslateSelection(context: vscode.ExtensionContext) {
	if (vscode.window.activeTextEditor) {
		let range = new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end);
		let textSelection = vscode.window.activeTextEditor?.document.getText(range);
		if (textSelection != undefined && textSelection != "") {
			translate(textSelection, { to: 'en' }).then(res => {
				console.log(res.text);
				vscode.window.activeTextEditor?.edit(editBuilder => {
					if (vscode.window.activeTextEditor?.selection.start !== undefined) {
						editBuilder.replace(range, res.text);
					}
				});
			}).catch(err => {
				console.error(err);
			});
		}
	}
}