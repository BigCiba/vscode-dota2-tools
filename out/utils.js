"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const child_process_1 = require("child_process");
function ShowError(info) {
    vscode.window.showErrorMessage(info);
}
exports.ShowError = ShowError;
function ShowInfo(info) {
    vscode.window.showInformationMessage(info);
}
exports.ShowInfo = ShowInfo;
function FindStrInFile(filePath, reg) {
    const content = fs.readFileSync(filePath, 'utf-8');
    reg = typeof reg === 'string' ? new RegExp(reg, 'm') : reg;
    // 没找到直接返回
    if (content.search(reg) < 0) {
        return { row: 0, col: 0 };
    }
    const rows = content.split(os.EOL);
    // 分行查找只为了拿到行
    for (let i = 0; i < rows.length; i++) {
        let col = rows[i].search(reg);
        if (col >= 0) {
            return { row: i, col };
        }
    }
    return { row: 0, col: 0 };
}
exports.FindStrInFile = FindStrInFile;
function GetStrRangeInFile(filePath, str) {
    var pos = FindStrInFile(filePath, str);
    return new vscode.Range(new vscode.Position(pos.row, pos.col), new vscode.Position(pos.row, pos.col + str.length));
}
exports.GetStrRangeInFile = GetStrRangeInFile;
function OpenInFinder(filePath) {
    if (!fs.existsSync(filePath)) {
        ShowError('文件不存在：' + filePath);
    }
    // 如果是目录，直接打开就好
    if (fs.statSync(filePath).isDirectory()) {
        child_process_1.exec(`open ${filePath}`);
    }
    else {
        // 如果是文件，要分开处理
        const fileName = path.basename(filePath);
        filePath = path.dirname(filePath);
        // 这里有待完善，还不知道如何finder中如何选中文件
        child_process_1.exec(`open ${filePath}`);
    }
}
exports.OpenInFinder = OpenInFinder;
function OpenFileInVscode(path, str) {
    let options = undefined;
    if (str) {
        const selection = GetStrRangeInFile(path, str);
        options = { selection };
    }
    vscode.window.showTextDocument(vscode.Uri.file(path), options);
}
exports.OpenFileInVscode = OpenFileInVscode;
function OpenUrlInBrowser(url) {
    child_process_1.exec(`open '${url}'`);
}
exports.OpenUrlInBrowser = OpenUrlInBrowser;
//# sourceMappingURL=utils.js.map