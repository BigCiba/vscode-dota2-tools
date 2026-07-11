import * as vscode from 'vscode';
import * as path from 'path';
import { findFile } from '../utils/findFile';
import { getPathInfo } from '../utils/pathUtils';

let gameDir: string;
let contentDir: string;

/** Project directory feature module */
export async function addonInfoInit(context: vscode.ExtensionContext) {
	const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	if (folders !== undefined) {
		if (folders.length > 0) {
			const folder = folders[0];
			if (folder) {
				let addonPathConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
				if (addonPathConfig !== undefined) {
					if (addonPathConfig.game !== undefined && addonPathConfig.game !== '') {
						gameDir = path.normalize(addonPathConfig.game);
					}
					if (addonPathConfig.content !== undefined && addonPathConfig.content !== '') {
						contentDir = path.normalize(addonPathConfig.content);
					}
				}
				if (gameDir === undefined) {
					// Read directory
					let pathList: string[] | false = await findFile(folder.uri.fsPath, 'addoninfo.txt', 50, ["game"], ["content"], true);
					if (pathList !== false) {
						[gameDir] = pathList;
						if (gameDir) {
							gameDir = path.normalize(gameDir);
						}
						let validContent = await getPathInfo(gameDir.replace("game", "content"));
						if (validContent !== false) {
							contentDir = gameDir.replace("game", "content");
						}
						console.log("GameDir", gameDir);
						console.log("contentDir", contentDir);
					}
				}
			}
		}
	}
}

/** Get the game directory */
export function getGameDir() {
	return gameDir;
}

/** Get the content directory */
export function getContentDir() {
	return contentDir;
}

/** Whether a game directory exists; prompt if it does not */
export function isValidFolder() {
	if (gameDir === undefined) {
		return false;
	}
	return true;
}