import * as vscode from 'vscode';
export function getRootPath() {
	const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	if (folders !== undefined) {
		return folders[0].uri.fsPath;
	} else {
		return;
	}
}