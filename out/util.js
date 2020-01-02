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
function GetExtensionFileAbsolutePath(context, relativePath) {
    return path.join(context.extensionPath, relativePath);
}
exports.GetExtensionFileAbsolutePath = GetExtensionFileAbsolutePath;
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
function GetWebViewContent(context, templatePath) {
    const resourcePath = GetExtensionFileAbsolutePath(context, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}
exports.GetWebViewContent = GetWebViewContent;
/**
 * 取出中括号内的内容
 * @param text
 * @returns {string}
 */
function GetBracketStr(text) {
    let result = '';
    if (text === '') {
        return result;
    }
    let regex = /\[(.+?)\]/g;
    let options = text.match(regex);
    if (options !== null && options.length > 0) {
        let option = options[0];
        result = option.substring(1, option.length - 1);
    }
    return result;
}
exports.GetBracketStr = GetBracketStr;
/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
function GetParenthesesStr(text) {
    let result = '';
    if (text === '') {
        return result;
    }
    let regex = /\((.+?)\)/g;
    let options = text.match(regex);
    if (options !== null && options.length > 0) {
        let option = options[0];
        result = option.substring(1, option.length - 1);
    }
    return result;
}
exports.GetParenthesesStr = GetParenthesesStr;
function ReadFunction(line, rows) {
    let fun_info = {};
    let param_list = {};
    let end_line = 0;
    for (let index = line; index < rows.length; index++) {
        const text = rows[index];
        let option = rows[index].match(/---\[\[.*\]\]/g);
        if (option !== null && option.length > 0) {
            fun_info.description = text.substr(6, text.length - 9);
        }
        else if (text.search('-- @return') !== -1) {
            fun_info.return = text.substr(11, text.length);
        }
        else if (text.search('-- @param') !== -1) {
            let arr = text.split(' ');
            param_list[arr[2]] = {
                type: arr[3],
                params_name: arr[2],
                description: 'No Description Set'
            };
        }
        else if (text.search('function') !== -1) {
            fun_info.function = text.split('(')[0].split('function ')[1];
            fun_info.description = fun_info.description.split(fun_info.function + '  ')[1];
            if (fun_info.function.search(':') === -1) {
                fun_info.class = 'Globals';
            }
            else {
                fun_info.class = fun_info.function.split(':')[0];
                fun_info.function = fun_info.function.split(':')[1];
            }
            end_line = index;
            break;
        }
    }
    fun_info.params = param_list;
    fun_info.server = true;
    fun_info.client = false;
    return [fun_info, end_line];
}
exports.ReadFunction = ReadFunction;
function ReadEnum(line, rows) {
    let enum_list = [];
    let end_line = 0;
    for (let index = line + 1; index < rows.length; index++) {
        let enum_info = {};
        const text = rows[index];
        if (text === '') {
            end_line = index;
            break;
        }
        const info = text.split(' = ');
        enum_info.name = info[0];
        if (info[1].search('--') !== -1) {
            enum_info.value = info[1].split(' -- ')[0];
            enum_info.function = info[1].split(' -- ')[1];
        }
        else {
            enum_info.value = info[1];
        }
        enum_info.description = 'No Description Set';
        enum_list.push(enum_info);
    }
    return [enum_list, end_line];
}
exports.ReadEnum = ReadEnum;
//# sourceMappingURL=util.js.map