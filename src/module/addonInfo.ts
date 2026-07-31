import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import { findFile } from '../utils/findFile';
import { getPathInfo } from '../utils/pathUtils';

let gameDir: string;
let contentDir: string;

/** 项目目录功能模块 */
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
					const fastGameDir = findGameDirFast(folder.uri.fsPath);
					if (fastGameDir) {
						gameDir = path.normalize(fastGameDir);
						const candidateContentDir = contentDirForGameDir(gameDir);
						if (candidateContentDir && fs.existsSync(candidateContentDir)) {
							contentDir = path.normalize(candidateContentDir);
						}
					}
				}
				if (gameDir === undefined) {
					// Fall back to the legacy deep search for non-standard workspace layouts.
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

function findGameDirFast(workspaceRoot: string): string | undefined {
	const normalizedRoot = path.normalize(workspaceRoot);
	const candidates = [normalizedRoot, path.join(normalizedRoot, 'game', path.basename(normalizedRoot))];
	const gameRoot = path.join(normalizedRoot, 'game');
	try {
		for (const entry of fs.readdirSync(gameRoot, { withFileTypes: true })) {
			if (entry.isDirectory()) {
				candidates.push(path.join(gameRoot, entry.name));
			}
		}
	} catch {
		// A workspace can also point directly at the addon game directory.
	}
	return candidates.find((candidate) => fs.existsSync(path.join(candidate, 'addoninfo.txt')));
}

function contentDirForGameDir(resolvedGameDir: string): string | undefined {
	const gameRoot = path.dirname(resolvedGameDir);
	if (path.basename(gameRoot).toLowerCase() !== 'game') {
		return undefined;
	}
	return path.join(path.dirname(gameRoot), 'content', path.basename(resolvedGameDir));
}
/** 获取game目录 */
export function getGameDir() {
	return gameDir;
}

/** 获取content目录 */
export function getContentDir() {
	return contentDir;
}

/** 是否有game目录，没有进行提示 */
export function isValidFolder() {
	if (gameDir === undefined) {
		return false;
	}
	return true;
}