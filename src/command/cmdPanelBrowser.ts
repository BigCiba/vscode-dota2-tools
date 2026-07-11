import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface PanelRange { start: number; end: number; }

let panelData: { name: string; md: string }[] | undefined;

/** Build the panel list from resource/PanelList.json (line ranges) + PanelList.md (docs). */
function loadPanelData(context: vscode.ExtensionContext): { name: string; md: string }[] {
	const list: Record<string, PanelRange> = JSON.parse(
		fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), 'utf-8'),
	);
	const lines = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8').split(/\r?\n/);
	return Object.keys(list).map((name) => ({
		name,
		md: lines.slice(list[name].start, list[name].end).join('\n').trim(),
	}));
}

/** Bind the Panels tab: post the panorama panel element docs to the webview. */
export function attachPanels(webview: vscode.Webview, context: vscode.ExtensionContext): vscode.Disposable[] {
	if (!panelData) {
		panelData = loadPanelData(context);
	}
	webview.postMessage({ type: 'panel_list', data: panelData });
	return [];
}
