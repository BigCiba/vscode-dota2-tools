"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.luaApiChangelog = void 0;
const vscode = require("vscode");
/**
 * 查看lua api的变更日志
 * @param context
 */
async function luaApiChangelog(context) {
    vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.joinPath(context.extensionUri, "resource", "lua_api_changelog.md"));
}
exports.luaApiChangelog = luaApiChangelog;
//# sourceMappingURL=cmdLuaApiChangelog.js.map