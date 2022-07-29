"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootPath = void 0;
const vscode = require("vscode");
function getRootPath() {
    const folders = vscode.workspace.workspaceFolders;
    if (folders !== undefined) {
        return folders[0].uri.fsPath;
    }
    else {
        return;
    }
}
exports.getRootPath = getRootPath;
//# sourceMappingURL=getRootPath.js.map