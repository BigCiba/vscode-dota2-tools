import * as vscode from 'vscode';
import { kvEditorProvider } from '../CustomTextEditorProvider/kvEditorProvider';

let controller: KvEditorController | undefined;
let customEditorRegistered = false;

/** KV editor module: registers the custom KV table editor and the "open with KV editor" command. */
export async function kvEditorInit(context: vscode.ExtensionContext) {
	if (!customEditorRegistered) {
		context.subscriptions.push(kvEditorProvider.register(context));
		customEditorRegistered = true;
	}
	if (!controller) {
		controller = new KvEditorController(context);
		context.subscriptions.push(controller);
	}
}

class KvEditorController implements vscode.Disposable {
	constructor(private readonly context: vscode.ExtensionContext) {
		this.context.subscriptions.push(
			vscode.commands.registerCommand('dota2tools.kvEditor.openFile', (uri: vscode.Uri) => this.openFile(uri))
		);
	}

	dispose(): void {}

	private async openFile(uri?: vscode.Uri) {
		if (!uri) {
			uri = vscode.window.activeTextEditor?.document.uri;
		}
		if (!uri) {
			return;
		}
		await vscode.commands.executeCommand('vscode.openWith', uri, 'dota2tools.kv');
	}
}
