import { execSync } from "child_process";
import { getPathInfo } from "./pathUtils";
import path = require("path");
import { readFileSync } from "fs";
import { getKeyValueObjectByIndex, readKeyValue2 } from "./kvUtils";

const REG_TREE_PATH = `HKCU\Software\Valve\Steam`;
const REG_KEY_NOT_FOUND = 'The system was unable to find the specified registry key or value';

/**
 * 获得steam的安装目录
 */
export async function findSteam() {
	async function windows() {
		let programFiles = process.env['ProgramFiles(x86)'];
		if (programFiles == null)
			programFiles = process.env.ProgramFiles;
		if (programFiles != null && (await getPathInfo(`${programFiles}/Steam/Steam.exe`))) {
			return `${programFiles}/Steam`;
		}
		try {

			const output = execSync(["reg", "QUERY", REG_TREE_PATH, '/v', 'SteamPath'].join(" ")).toString("utf-8");
			const matches = output.match(/SteamPath\s+[A-Z_]+\s+(.+)/);
			if (!matches || matches[1] === '')
				throw new Error(`Unexpected output:\n${output.trim()}`);
			return matches[1];
		} catch (err: any) {
			if (!err.message.includes(REG_KEY_NOT_FOUND)) {
				throw err;
			}
		}
	}

	switch (process.platform) {
		case 'win32':
			return windows();
		// case 'linux':
		// 	return pathIfExists(`${process.env.HOME}/.local/share/Steam`);
		// case 'darwin':
		// 	return pathIfExists(`${process.env.HOME}/Library/Application Support/Steam`);
		default:
			throw new Error(`Steam finding isn't implemented for ${process.platform}`);
	}
}
/**
 * 获得steamAPP安装的库文件夹路径
 * @param sSteamPath steam路径
 * @param sAPPID steamAPPID
 * @returns 
 */
export async function GetAPPInstalledLibrary(sSteamPath: string, sAPPID: string) {
	const mainSteamApps = path.join(sSteamPath, "steamapps");
	const libraryFoldersPath = path.join(mainSteamApps, 'libraryfolders.vdf');
	const libraryFoldersData = getKeyValueObjectByIndex(readKeyValue2(readFileSync(libraryFoldersPath, 'utf8')));
	return (() => {
		for (const index in libraryFoldersData) {
			const libraryDetail = libraryFoldersData[index];
			for (const app in libraryDetail.apps) {
				if (app == sAPPID) {
					return libraryDetail.path;
				}
			}
		}
	})();
}

/**
 * 根据steamAPPID寻找这个软件在电脑上的安装路径
 * @param sAPPID 
 */
export async function GetSteamAPPIntallDirByID(sAPPID: string) {
	const sSteamPath = await findSteam();
	if (sSteamPath == null) {
		return;
	}
	const sLibraryPath = await GetAPPInstalledLibrary(sSteamPath, sAPPID);
	if (sLibraryPath) {
		const sACFPath = path.join(sLibraryPath, "steamapps", `appmanifest_${sAPPID}.acf`);
		const sACFData = getKeyValueObjectByIndex(readKeyValue2(readFileSync(sACFPath, 'utf8')));
		return path.join(sLibraryPath, "steamapps", "common", sACFData.installdir);
	}
}