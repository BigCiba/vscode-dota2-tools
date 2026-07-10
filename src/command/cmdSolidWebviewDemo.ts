import * as vscode from 'vscode';
import type { SolidDemoWebviewMessage } from '../types/solidWebviewMessages';
import { getBundledWebviewContent } from '../utils/getBundledWebviewContent';

export async function openSolidWebviewDemo(context: vscode.ExtensionContext): Promise<void> {
	const webviewRoot = vscode.Uri.joinPath(context.extensionUri, 'dist', 'webview');
	const panel = vscode.window.createWebviewPanel(
		'dota2tools.solidWebviewDemo',
		'Solid Webview Demo',
		vscode.ViewColumn.One,
		{
			enableScripts: true,
			localResourceRoots: [webviewRoot],
		},
	);

	panel.webview.html = await getBundledWebviewContent(
		panel.webview,
		context.extensionUri,
		'solid-demo',
	);

	const messageSubscription = panel.webview.onDidReceiveMessage((message: SolidDemoWebviewMessage) => {
		if (!message || typeof message.type !== 'string') {
			return;
		}

		if (message.type === 'ready') {
			panel.webview.postMessage({
				type: 'hostReady',
				payload: {
					extensionVersion: String(context.extension.packageJSON.version),
					language: vscode.env.language,
				},
			});
			return;
		}

		if (message.type === 'ping' && message.payload && typeof message.payload.requestId === 'string') {
			panel.webview.postMessage({
				type: 'pong',
				payload: {
					requestId: message.payload.requestId,
					receivedAt: new Date().toLocaleTimeString(),
				},
			});
		}
	});

	panel.onDidDispose(() => messageSubscription.dispose());
}
