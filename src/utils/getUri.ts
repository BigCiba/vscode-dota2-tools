import { Uri, Webview } from "vscode";

/**
 * Get the Uri used by the Webview
 * @param webview 
 * @param extensionUri 
 * @param pathList 
 */
export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
	return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}