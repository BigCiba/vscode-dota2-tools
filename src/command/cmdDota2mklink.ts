import { exec } from "child_process";
import { chmodSync, symlinkSync } from "fs";
import { moveSync, pathExistsSync } from "fs-extra";
import { ExtensionContext, workspace } from "vscode";
import { StopAllListener, TryStartWatch } from "../listener/common";
import { getContentDir, getGameDir } from "../module/addonInfo";
import { changeStatusBarState, showStatusBarMessage, StatusBarState } from "../module/statusBar";
import { getRootPath } from "../utils/getRootPath";
import path = require("path");

export async function mklinkForDota2Addon(context: ExtensionContext) {
	// const sDotaDir = await GetSteamAPPIntallDirByID("570");
	const sDotaDir = workspace.getConfiguration().get<string>("dota2-tools.dota2_install_path");
	if (sDotaDir) {
		if (!pathExistsSync(sDotaDir)) {
			showStatusBarMessage("请先配置正确的Dota2安装目录");
			return;
		}

		changeStatusBarState(StatusBarState.LOADING);
		const contentDir = getContentDir();
		const gameDir = getGameDir();
		const rootPath = getRootPath() as string;
		const a = contentDir.split("\\");
		const sGameName = a[a.length - 1];
		const sDotaContentAddon = path.join(sDotaDir, "content", "dota_addons");
		const sDotaGameAddon = path.join(sDotaDir, "game", "dota_addons");
		const sDotaContentDir = path.join(sDotaContentAddon, sGameName);
		const sDotaGameDir = path.join(sDotaGameAddon, sGameName);

		if (!pathExistsSync(sDotaContentAddon)) {
			changeStatusBarState(StatusBarState.ALL_DONE);
			showStatusBarMessage("Dota2 content 目录不存在");
			return;
		}

		if (!pathExistsSync(sDotaGameAddon)) {
			changeStatusBarState(StatusBarState.ALL_DONE);
			showStatusBarMessage("Dota2 game 目录不存在");
			return;
		}

		let bContentNotExist = !pathExistsSync(sDotaContentDir);
		let bGameNotExist = !pathExistsSync(sDotaGameDir);
		if (!(bContentNotExist || bGameNotExist)) {
			changeStatusBarState(StatusBarState.ALL_DONE);
			return;
		}

		StopAllListener();

		if (bContentNotExist) {
			chmodSync(sDotaGameAddon, "0777");
			moveSync(gameDir, sDotaGameDir);
			symlinkSync(sDotaGameDir, gameDir, "junction");
		}

		if (bGameNotExist) {
			chmodSync(sDotaContentAddon, "0755");
			moveSync(contentDir, sDotaContentDir);
			symlinkSync(sDotaContentDir, contentDir, "junction");
		}

		if (bContentNotExist) {
			exec(`explorer.exe /select,"${sDotaContentDir}"`);
		}
		if (bGameNotExist) {
			exec(`explorer.exe /select,"${sDotaGameDir}"`);
		}

		TryStartWatch();
		changeStatusBarState(StatusBarState.ALL_DONE);
	}
}