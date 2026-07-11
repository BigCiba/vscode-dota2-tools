import * as vscode from 'vscode';
import { readFile } from '../utils/readFile';
import { showStatusBarMessage } from '../module/statusBar';
import { localize } from '../utils/localize';

let vsnd: vscode.QuickPickItem[];

/** Return the sound list (used by the unified sidebar's Music tab). Each entry: label=sound file, description=soundevent name */
export async function getSoundList(context: vscode.ExtensionContext): Promise<{ label: string; description?: string; }[]> {
	if (vsnd === undefined) {
		await vsndPickerInit(context);
	}
	return vsnd.map((item) => ({ label: item.label, description: item.description }));
}

/** Insert the soundevent name into the current editor (or copy it to the clipboard), matching the QuickPick version's behavior */
function insertSoundEvent(text: string) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		editor.edit((editBuilder) => {
			const selection = editor.selection;
			if (selection.start.isEqual(selection.end)) {
				editBuilder.insert(selection.start, text);
			} else {
				editBuilder.replace(new vscode.Range(selection.start, selection.end), text);
			}
		});
	} else {
		vscode.env.clipboard.writeText(text);
		showStatusBarMessage(localize('msg_copied_clipboard') || text);
	}
}

/** Bind the Music tab's message handling to the unified sidebar webview and return a list of Disposables */
export function attachMusic(webview: vscode.Webview, context: vscode.ExtensionContext): vscode.Disposable[] {
	getSoundList(context).then((list) => webview.postMessage({ type: 'sound_list', data: list }));
	return [
		webview.onDidReceiveMessage((message: { type: string; text: string; }) => {
			if (message.type === 'insert_sound' && message.text) {
				insertSoundEvent(message.text);
			}
		}),
	];
}

export async function vsndPickerInit(context: vscode.ExtensionContext) {
	vsnd = [];
	let soundevents = JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/soundevents.json")));
	// Add options
	for (const key in soundevents) {
		const element = soundevents[key];
		for (let i = 0; i < element.length; i++) {
			const sound = element[i];
			vsnd.push({
				label: sound,
				description: key,
			});
		}
	}
}
/**
 * Sound picker
 * @param context 
 */
export async function vsndPicker(context: vscode.ExtensionContext) {
	// Avoid the case where there is no data
	if (vsnd === undefined) {
		await vsndPickerInit(context);
	}
	const vsndPick = vscode.window.createQuickPick();
	vsndPick.canSelectMany = false;
	vsndPick.ignoreFocusOut = true;
	vsndPick.placeholder = '*.vsnd';
	vsndPick.matchOnDescription = true;
	vsndPick.items = vsnd;

	vsndPick.show();
	vsndPick.onDidChangeSelection((t) => {
		vsndPick.value = t[0].label;
		vscode.window.activeTextEditor?.edit(editBuilder => {
			if (vscode.window.activeTextEditor?.selection.start !== undefined && t[0].description !== undefined) {
				if (vscode.window.activeTextEditor.selection.start.character === vscode.window.activeTextEditor.selection.end.character) {
					editBuilder.insert(vscode.window.activeTextEditor?.selection.start, t[0].description);
				} else {
					editBuilder.replace(new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end), t[0].description);
				}
				vsndPick.dispose();
			}
		});
	});
}