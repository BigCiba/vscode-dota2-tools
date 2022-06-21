import * as vscode from 'vscode';

/**
 * 查看lua api的变更日志
 * @param context 
 */
export async function luaApiChangelog(context: vscode.ExtensionContext) {
	vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.joinPath(context.extensionUri, "resource", "lua_api_changelog.md"));
}