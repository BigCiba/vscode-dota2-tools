"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSteamAPPIntallDirByID = exports.GetAPPInstalledLibrary = exports.findSteam = void 0;
const child_process_1 = require("child_process");
const pathUtils_1 = require("./pathUtils");
const path = require("path");
const fs_1 = require("fs");
const kvUtils_1 = require("./kvUtils");
const REG_TREE_PATH = `HKCU\Software\Valve\Steam`;
const REG_KEY_NOT_FOUND = 'The system was unable to find the specified registry key or value';
/**
 * 获得steam的安装目录
 */
async function findSteam() {
    async function windows() {
        let programFiles = process.env['ProgramFiles(x86)'];
        if (programFiles == null)
            programFiles = process.env.ProgramFiles;
        if (programFiles != null && (await (0, pathUtils_1.getPathInfo)(`${programFiles}/Steam/Steam.exe`))) {
            return `${programFiles}/Steam`;
        }
        try {
            const output = (0, child_process_1.execSync)(["reg", "QUERY", REG_TREE_PATH, '/v', 'SteamPath'].join(" ")).toString("utf-8");
            const matches = output.match(/SteamPath\s+[A-Z_]+\s+(.+)/);
            if (!matches || matches[1] === '')
                throw new Error(`Unexpected output:\n${output.trim()}`);
            return matches[1];
        }
        catch (err) {
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
exports.findSteam = findSteam;
/**
 * 获得steamAPP安装的库文件夹路径
 * @param sSteamPath steam路径
 * @param sAPPID steamAPPID
 * @returns
 */
async function GetAPPInstalledLibrary(sSteamPath, sAPPID) {
    const mainSteamApps = path.join(sSteamPath, "steamapps");
    const libraryFoldersPath = path.join(mainSteamApps, 'libraryfolders.vdf');
    const libraryFoldersData = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)((0, fs_1.readFileSync)(libraryFoldersPath, 'utf8')));
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
exports.GetAPPInstalledLibrary = GetAPPInstalledLibrary;
/**
 * 根据steamAPPID寻找这个软件在电脑上的安装路径
 * @param sAPPID
 */
async function GetSteamAPPIntallDirByID(sAPPID) {
    const sSteamPath = await findSteam();
    if (sSteamPath == null) {
        return;
    }
    const sLibraryPath = await GetAPPInstalledLibrary(sSteamPath, sAPPID);
    if (sLibraryPath) {
        const sACFPath = path.join(sLibraryPath, "steamapps", `appmanifest_${sAPPID}.acf`);
        const sACFData = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)((0, fs_1.readFileSync)(sACFPath, 'utf8')));
        return path.join(sLibraryPath, "steamapps", "common", sACFData.installdir);
    }
}
exports.GetSteamAPPIntallDirByID = GetSteamAPPIntallDirByID;
//# sourceMappingURL=steamUtils.js.map