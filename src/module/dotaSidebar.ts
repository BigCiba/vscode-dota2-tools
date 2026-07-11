import * as vscode from 'vscode';
import { DotaSidebarViewProvider } from '../WebviewViewProvider/dotaSidebarView';

let provider: DotaSidebarViewProvider | undefined;
let registered = false;

/** Register the unified sidebar WebviewView (API / Icons / items_game / Music). */
export async function dotaSidebarInit(context: vscode.ExtensionContext) {
	if (registered) {
		return;
	}
	provider = new DotaSidebarViewProvider(context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(DotaSidebarViewProvider.viewType, provider, {
			webviewOptions: { retainContextWhenHidden: true },
		}),
	);
	registered = true;
}
