import * as vscode from 'vscode';
import * as path from 'path';
import { getContentDir, getGameDir } from "../module/addonInfo";

/** Get the setting with the game and content path formats replaced */
export function getPathConfiguration(name: string) {
	const gameDir = getGameDir();
	const contentDir = getContentDir();
	let workspaceDir: string | undefined = undefined;
	const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	if (folders !== undefined) {
		workspaceDir = folders[0].uri.fsPath;
	}
	let keyword: { [key: string]: string | undefined; } = {
		game: gameDir,
		content: contentDir,
		workspace: workspaceDir
	};
	let setting: string | undefined = vscode.workspace.getConfiguration().get(name);
	if (setting) {
		for (const key in keyword) {
			if (setting.indexOf("${" + key + "}") != -1) {
				setting = path.join(keyword[key] || "", setting.replace("${" + key + "}", ""));
			}
		}
	}

	return setting;
}