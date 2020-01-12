"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const child_process_1 = require("child_process");
// 获取根目录
function GetRootPath() {
    const folders = vscode.workspace.workspaceFolders;
    if (folders !== undefined) {
        return folders[0].uri.fsPath;
    }
    else {
        return;
    }
}
exports.GetRootPath = GetRootPath;
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
        enum_info.description_lite = 'No Description Set';
        enum_info.description = 'No Description Set';
        enum_info.example = 'No Example Set';
        enum_list.push(enum_info);
    }
    return [enum_list, end_line];
}
exports.ReadEnum = ReadEnum;
function GetNoteAPIContent(fun_info, context) {
    let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Dota2 API</title>
			<link rel="stylesheet" href="` + vscode.Uri.file(path.join(context.extensionPath, 'lib', 'Skeleton-2.0.4', 'css', 'skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
		</head>
		<body>
			<h4>` + fun_info.function + `</h4>
			<h5>Function Description</h5>
			<textarea id="description" class="u-full-width" onkeydown="tab(this)">` + fun_info.description + `</textarea>` +
        AddParams() + `
			<h5>Example</h5>
			<textarea id="example" class="u-full-width" style="height:300px;" onkeydown="tab(this)">` + fun_info.example + `</textarea>
			<button class="button-primary" onclick="Confirm()">确认</button>
			<script src="` + vscode.Uri.file(path.join(context.extensionPath, 'resource', 'view', 'dota2api.js')).with({ scheme: 'vscode-resource' }).toString() + `"></script>
			<script src="../../src/view/test-webview.js"></script>
		</body>
		</html>
	`;
    return content;
    function AddParams() {
        let s = '';
        if (Object.keys(fun_info.params).length > 0) {
            s = `<h5>Parameters</h5>
				<table id="parameters">
					<thead>
						<tr>
						<th align="left">Type</td>
						<th align="left">Name</td>
						<th align="left">Description</td>
						</tr>
					</thead>
					<tbody>
						` + AddParameter(fun_info.params) + `
					</tbody>
				</table>`;
        }
        return s;
    }
    function AddParameter(params) {
        let s = '';
        for (const params_name in params) {
            let params_info = params[params_name];
            s +=
                '<tr>\n' +
                    '<td>' + params_name + '</td>\n' +
                    '<td><input type="text" value="' + params_info.params_name + '" /></td>\n' +
                    '<td><input type="text" value="' + params_info.description + '" /></td>\n' +
                    '</tr>\n';
        }
        return s;
    }
}
exports.GetNoteAPIContent = GetNoteAPIContent;
function GetConstantNoteContent(enum_info, context) {
    let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Dota2 API</title>
			<link rel="stylesheet" href="` + vscode.Uri.file(path.join(context.extensionPath, 'lib', 'Skeleton-2.0.4', 'css', 'skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
		</head>
		<body>
			<h4>` + enum_info.name + `</h4>
			<h5>Description Lite</h5>
			<textarea id="description_lite" class="u-full-width" onkeydown="tab(this)">` + enum_info.description_lite + `</textarea>
			<h5>Description</h5>
			<textarea id="description" class="u-full-width" >` + (enum_info.description || '') + `</textarea>
			<h5>Example</h5>
			<textarea id="example" class="u-full-width" style="height:300px;" onkeydown="tab(this)">` + (enum_info.example || '') + `</textarea>
			<button class="button-primary" onclick="ConfirmConstant()">确认</button>
			<script src="` + vscode.Uri.file(path.join(context.extensionPath, 'resource', 'view', 'dota2api.js')).with({ scheme: 'vscode-resource' }).toString() + `"></script>
			<script src="../../src/view/test-webview.js"></script>
		</body>
		</html>
	`;
    return content;
}
exports.GetConstantNoteContent = GetConstantNoteContent;
function ReadAPI(api, api_cl) {
    let root_path = GetRootPath();
    if (root_path === undefined) {
        return;
    }
    const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
    // 读取服务器API
    const rows = api.split(os.EOL);
    let class_list = {};
    let enum_list = {};
    for (let i = 0; i < rows.length; i++) {
        // 函数
        let option = rows[i].match(/---\[\[.*\]\]/g);
        if (option !== null && option.length > 0) {
            let [fun_info, new_line] = ReadFunction(i, rows);
            if (api_note[fun_info.function] !== undefined) {
                fun_info.description = api_note[fun_info.function].description;
                for (const params_name in fun_info.params) {
                    const params_info = fun_info.params[params_name];
                    params_info.params_name = api_note[fun_info.function].params[params_name].params_name;
                    params_info.description = api_note[fun_info.function].params[params_name].description;
                }
                fun_info.example = api_note[fun_info.function].example;
            }
            if (class_list[fun_info.class] === undefined) {
                class_list[fun_info.class] = [];
            }
            class_list[fun_info.class].push(fun_info);
            i = new_line;
        }
        // 常数
        if (rows[i].search('--- Enum ') !== -1) {
            let enum_name = rows[i].substr(9, rows[i].length);
            if (enum_list[enum_name] === undefined) {
                enum_list[enum_name] = [];
            }
            let [enum_info, new_line] = ReadEnum(i, rows);
            for (let j = 0; j < enum_info.length; j++) {
                const enum_arr = enum_info[j];
                if (api_note[enum_arr.name] !== undefined) {
                    enum_arr.description_lite = api_note[enum_arr.name].description_lite;
                    enum_arr.description = api_note[enum_arr.name].description;
                    enum_arr.example = api_note[enum_arr.name].example;
                }
            }
            enum_list[enum_name] = enum_info;
            i = new_line;
        }
    }
    // 读取客户端API
    const rows_cl = api_cl.split(os.EOL);
    let class_list_cl = {};
    let enum_list_cl = {};
    for (let i = 0; i < rows_cl.length; i++) {
        // 函数
        let option = rows_cl[i].match(/---\[\[.*\]\]/g);
        if (option !== null && option.length > 0) {
            let [fun_info, new_line] = ReadFunction(i, rows_cl);
            if (class_list_cl[fun_info.class] === undefined) {
                class_list_cl[fun_info.class] = [];
            }
            class_list_cl[fun_info.class].push(fun_info);
            i = new_line;
        }
        // 常数
        if (rows_cl[i].search('--- Enum ') !== -1) {
            let enum_name = rows_cl[i].substr(9, rows_cl[i].length);
            if (enum_list_cl[enum_name] === undefined) {
                enum_list_cl[enum_name] = [];
            }
            let [enum_info, new_line] = ReadEnum(i, rows_cl);
            enum_list_cl[enum_name] = enum_info;
            i = new_line;
        }
    }
    // 合并API
    for (const class_name in class_list) {
        const fun_list = class_list[class_name];
        // console.log('fun_list', fun_list);
        for (let i = 0; i < fun_list.length; i++) {
            const fun_info = fun_list[i];
            let class_info_cl = class_list_cl[class_name];
            if (class_info_cl === undefined) {
                class_info_cl = class_list_cl[class_name.replace('C', 'C_')];
            }
            if (class_info_cl !== undefined) {
                for (let j = 0; j < class_info_cl.length; j++) {
                    if (class_info_cl[j].function === fun_info.function) {
                        fun_info.client = true;
                        fun_info.class_cl = class_info_cl[j].class;
                        break;
                    }
                }
            }
        }
    }
    return [class_list, enum_list];
}
exports.ReadAPI = ReadAPI;
//# sourceMappingURL=util.js.map