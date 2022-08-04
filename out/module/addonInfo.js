"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidFolder = exports.getContentDir = exports.getGameDir = exports.addonInfoInit = void 0;
const vscode = require("vscode");
const path = require("path");
const findFile_1 = require("../utils/findFile");
const pathUtils_1 = require("../utils/pathUtils");
let gameDir;
let contentDir;
/** 项目目录功能模块 */
async function addonInfoInit(context) {
    const folders = vscode.workspace.workspaceFolders;
    if (folders !== undefined) {
        if (folders.length > 0) {
            const folder = folders[0];
            if (folder) {
                let addonPathConfig = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
                if (addonPathConfig !== undefined) {
                    if (addonPathConfig.game !== undefined && addonPathConfig.game !== '') {
                        gameDir = path.normalize(addonPathConfig.game);
                    }
                    if (addonPathConfig.content !== undefined && addonPathConfig.content !== '') {
                        contentDir = path.normalize(addonPathConfig.content);
                    }
                }
                if (gameDir === undefined) {
                    // 读取目录
                    let pathList = await (0, findFile_1.findFile)(folder.uri.fsPath, 'addoninfo.txt', 50, ["game"], ["content"], true);
                    if (pathList !== false) {
                        [gameDir] = pathList;
                        if (gameDir) {
                            gameDir = path.normalize(gameDir);
                        }
                        let validContent = await (0, pathUtils_1.getPathInfo)(gameDir.replace("game", "content"));
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
exports.addonInfoInit = addonInfoInit;
/** 获取game目录 */
function getGameDir() {
    return gameDir;
}
exports.getGameDir = getGameDir;
/** 获取content目录 */
function getContentDir() {
    return contentDir;
}
exports.getContentDir = getContentDir;
/** 是否有game目录，没有进行提示 */
function isValidFolder() {
    if (gameDir === undefined) {
        return false;
    }
    return true;
}
exports.isValidFolder = isValidFolder;
//# sourceMappingURL=addonInfo.js.map