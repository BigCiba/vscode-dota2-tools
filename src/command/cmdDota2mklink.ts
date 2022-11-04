import { chmodSync, symlinkSync } from "fs";
import { moveSync } from "fs-extra";
import path = require("path");
import { ExtensionContext } from "vscode";
import { getContentDir, getGameDir } from "../module/addonInfo";
import { getRootPath } from "../utils/getRootPath";
import { GetSteamAPPIntallDirByID } from "../utils/steamUtils";

export async function mklinkForDota2Addon(context: ExtensionContext) {
	const sDotaDir = await GetSteamAPPIntallDirByID("570");
	if (sDotaDir) {
		const contentDir = getContentDir();
		const gameDir = getGameDir();
		const rootPath = getRootPath() as string;
		const a = contentDir.split("\\");
		const sGameName = a[a.length - 1];
		const sDotaContentAddon = path.join(sDotaDir, "content", "dota_addons");
		const sDotaGameAddon = path.join(sDotaDir, "game", "dota_addons");
		const sDotaContentDir = path.join(sDotaContentAddon, sGameName);
		const sDotaGameDir = path.join(sDotaGameAddon, sGameName);

		chmodSync(rootPath, "0777");

		chmodSync(sDotaGameAddon, "0777");
		moveSync(gameDir, sDotaGameDir);
		symlinkSync(sDotaGameDir, gameDir, "junction");

		chmodSync(rootPath, "0777");

		chmodSync(sDotaContentAddon, "0777");
		moveSync(contentDir, sDotaContentDir);
		symlinkSync(sDotaContentDir, contentDir, "junction");

	}
}