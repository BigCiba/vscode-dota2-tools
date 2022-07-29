"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFile = void 0;
const vscode = require("vscode");
async function findFile(currentPath, fileName, fordersLimit, interest, exclude, stopAfterFind) {
    let pathList = [];
    let folders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(currentPath));
    // 过滤掉大文件夹
    if (fordersLimit && folders.length > fordersLimit) {
        return false;
    }
    // 感兴趣的文件夹
    if (interest) {
        for (const interestName of interest) {
            for (let i = 0; i < folders.length; i++) {
                const [folderName, isDirectory] = folders[i];
                if (folderName === interestName) {
                    if (i != 0) {
                        folders.unshift(folders.splice(i, 1)[0]);
                    }
                }
            }
        }
    }
    for (let i = 0; i < folders.length; i++) {
        const [folderName, isDirectory] = folders[i];
        if (folderName === '.git' || folderName === 'node_modules') {
            continue;
        }
        // 排除文件夹
        if (exclude) {
            for (const excludeName of exclude) {
                if (folderName === excludeName) {
                    continue;
                }
            }
        }
        if (folderName === fileName) {
            pathList.push(currentPath);
            if (stopAfterFind) {
                return pathList;
            }
        }
        if (Number(isDirectory) === vscode.FileType.Directory || Number(isDirectory) === vscode.FileType.SymbolicLink + vscode.FileType.Directory) {
            let bFind = await findFile(currentPath + '\\' + folderName, fileName, fordersLimit, interest, exclude, stopAfterFind);
            if (bFind !== false) {
                pathList = pathList.concat(bFind);
            }
        }
    }
    if (pathList.length === 0) {
        return false;
    }
    else {
        return pathList;
    }
}
exports.findFile = findFile;
//# sourceMappingURL=findFile.js.map