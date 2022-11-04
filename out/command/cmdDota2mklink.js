"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mklinkForDota2Addon = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path = require("path");
const addonInfo_1 = require("../module/addonInfo");
const getRootPath_1 = require("../utils/getRootPath");
const steamUtils_1 = require("../utils/steamUtils");
async function mklinkForDota2Addon(context) {
    const sDotaDir = await (0, steamUtils_1.GetSteamAPPIntallDirByID)("570");
    if (sDotaDir) {
        const contentDir = (0, addonInfo_1.getContentDir)();
        const gameDir = (0, addonInfo_1.getGameDir)();
        const rootPath = (0, getRootPath_1.getRootPath)();
        const a = contentDir.split("\\");
        const sGameName = a[a.length - 1];
        const sDotaContentAddon = path.join(sDotaDir, "content", "dota_addons");
        const sDotaGameAddon = path.join(sDotaDir, "game", "dota_addons");
        const sDotaContentDir = path.join(sDotaContentAddon, sGameName);
        const sDotaGameDir = path.join(sDotaGameAddon, sGameName);
        (0, fs_1.chmodSync)(rootPath, "0777");
        (0, fs_1.chmodSync)(sDotaGameAddon, "0777");
        (0, fs_extra_1.moveSync)(gameDir, sDotaGameDir);
        (0, fs_1.symlinkSync)(sDotaGameDir, gameDir, "junction");
        (0, fs_1.chmodSync)(rootPath, "0777");
        (0, fs_1.chmodSync)(sDotaContentAddon, "0777");
        (0, fs_extra_1.moveSync)(contentDir, sDotaContentDir);
        (0, fs_1.symlinkSync)(sDotaContentDir, contentDir, "junction");
    }
}
exports.mklinkForDota2Addon = mklinkForDota2Addon;
//# sourceMappingURL=cmdDota2mklink.js.map