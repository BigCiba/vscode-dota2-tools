"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathConfiguration = void 0;
const vscode = require("vscode");
const path = require("path");
const addonInfo_1 = require("../module/addonInfo");
// 获取路径格式的设置
function getPathConfiguration(name) {
    const gameDir = (0, addonInfo_1.getGameDir)();
    const contentDir = (0, addonInfo_1.getContentDir)();
    let workspaceDir = undefined;
    const folders = vscode.workspace.workspaceFolders;
    if (folders !== undefined) {
        workspaceDir = folders[0].uri.fsPath;
    }
    let keyword = {
        game: gameDir,
        content: contentDir,
        workspace: workspaceDir
    };
    let setting = vscode.workspace.getConfiguration().get(name);
    if (setting) {
        for (const key in keyword) {
            if (setting.indexOf("${" + key + "}") != -1) {
                setting = path.join(keyword[key] || "", setting.replace("${" + key + "}", ""));
            }
        }
    }
    return setting;
}
exports.getPathConfiguration = getPathConfiguration;
//# sourceMappingURL=getPathConfiguration.js.map