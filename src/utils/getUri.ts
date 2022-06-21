import { Uri, Webview } from "vscode";

/**
 * 获取Webview使用的Uri
 * @param webview 
 * @param extensionUri 
 * @param pathList 
 */
export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
	return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}