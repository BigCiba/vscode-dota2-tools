"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EachLine = exports.locale = exports.isEmptyCSVValue = exports.Obj2CSV = exports.CSV2Obj = exports.StringToAny = exports.Obj2Str = exports.FormatPath = exports.GetLuaScriptSnippet = exports.GetVscodeResourceUri = exports.getNonce = exports.UnitCSV2KV = exports.AbilityCSV2KV = exports.MultilayerCSV2KV = exports.WriteKeyValue = exports.Array2CSV = exports.CSV2Array = exports.CSVParse = exports.RemoveComment = exports.ReplaceKeyValue = exports.OverrideKeyValue = exports.GetKeyValueObjectByIndex = exports.ReadKeyValueWithBaseIncludePath = exports.ReadKeyValueWithBase = exports.ReadKeyValue3 = exports.ReadKeyValue2 = exports.ReadKV3 = exports.IsNumber = exports.ObjectHasKey = exports.DirExists = exports.MakeDir = exports.GetStat = exports.GetFileInfo = exports.ReadAPI = exports.GetAbilityTextureContent = exports.GetConstantNoteContent = exports.GetNoteAPIContent = exports.ReadEnum = exports.ReadFunction = exports.GetParenthesesStr = exports.GetBracketStr = exports.GetWebViewContent = exports.OpenUrlInBrowser = exports.OpenFileInVscode = exports.OpenInFinder = exports.GetExtensionFileAbsolutePath = exports.GetStrRangeInFile = exports.FindStrInFile = exports.ShowInfo = exports.ShowError = exports.GetRootPath = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const child_process_1 = require("child_process");
const util_1 = require("util");
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
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        if ($2.search('https') === -1) {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        }
        return $1 + $2 + '"';
    });
    html = html.replace(/<html lang="(.*)">/, `<html lang="${locale()}"`);
    return html;
}
exports.GetWebViewContent = GetWebViewContent;
// 取出中括号内的内容
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
// 取出小括号内的内容
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
            if (fun_info.return === '<unknown>') {
                fun_info.return = 'unknown';
            }
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
                fun_info.class = 'Global';
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
        enum_info.client = '❌';
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
			<h5>Class</h5>
			<p id="Class">${fun_info.class}</p>
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
function GetAbilityTextureContent(webview, texture_info, context) {
    const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'resource', 'view', 'textureSelector.css')));
    const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'resource', 'view', 'select_texture.js')));
    let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Texture Selector</title>
			<link href="${styleUri}" rel="stylesheet" />
		</head>
		<body>
			<div class="search">
				<div class="search-content">
					<div class="dropdown">
						<img class="hero-filter" src="` + vscode.Uri.file(path.join(context.extensionPath, 'images', 'heroes_icon', 'npc_dota_hero_default_png.png')).with({ scheme: 'vscode-resource' }).toString() + `"/>
						<div class="dropdown-content"/>
						</div>
					</div>
					<input id="filter" type="text" placeholder="Search" oninput="OnInput(event)">
				</div>
			</div>
			<div class="texture-content">
			</div>
			<script src="${scriptUri}"></script>
		</body>
		</html>
	`;
    return content;
}
exports.GetAbilityTextureContent = GetAbilityTextureContent;
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
    for (const enum_name in enum_list) {
        const enum_arr = enum_list[enum_name];
        for (let i = 0; i < enum_arr.length; i++) {
            const enum_info = enum_arr[i];
            // 判断客户端是否存在
            let enum_arr_cl = enum_list_cl[enum_name];
            if (enum_arr_cl !== undefined) {
                for (let j = 0; j < enum_arr_cl.length; j++) {
                    const enum_info_cl = enum_arr_cl[j];
                    if (enum_info_cl.name === enum_info.name) {
                        enum_info.client = '✔️';
                    }
                }
            }
        }
    }
    return [class_list, enum_list];
}
exports.ReadAPI = ReadAPI;
function GetFileInfo(root_path, path) {
    if (root_path !== undefined) {
        path = path.split(root_path)[1];
    }
    let arr = path.split('\\');
    let file = arr[arr.length - 1];
    let info = {
        full_name: path,
        name: file.split('.')[0],
        ext: file.split('.')[1],
    };
    return info;
}
exports.GetFileInfo = GetFileInfo;
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function GetStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(stats);
            }
        });
    });
}
exports.GetStat = GetStat;
/**
 * 创建路径
 * @param {string} dir 路径
 */
function MakeDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.mkdir(dir, err => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    });
}
exports.MakeDir = MakeDir;
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
function DirExists(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExists = yield GetStat(dir);
        //如果该路径且不是文件，返回true
        if (isExists && isExists !== true && isExists.isDirectory()) {
            return true;
        }
        else if (isExists) { //如果该路径存在但是文件，返回false
            return false;
        }
        //如果该路径不存在
        let tempDir = path.parse(dir).dir; //拿到上级路径
        //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
        let status = yield DirExists(tempDir);
        let mkdirStatus;
        if (status) {
            mkdirStatus = yield MakeDir(dir);
        }
        return mkdirStatus;
    });
}
exports.DirExists = DirExists;
// 判断object里是否有某个属性
function ObjectHasKey(obj, _key) {
    let bHas = false;
    for (const key in obj) {
        const value = obj[key];
        if (key === _key) {
            return true;
        }
        else if (util_1.isObject(value)) {
            bHas = ObjectHasKey(value, _key);
            if (bHas === true) {
                return true;
            }
        }
    }
    return bHas;
}
exports.ObjectHasKey = ObjectHasKey;
// 判断字符串是否是数字
function IsNumber(s) {
    var reg = /^(-?\d+)(\.\d+)?$/;
    if (reg.test(s)) {
        return true;
    }
    return false;
}
exports.IsNumber = IsNumber;
// 弃用
function ReadKV3(path) {
    let kv3_data = fs.readFileSync(path, 'utf-8');
    const rows = kv3_data.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i] + '\n';
    }
    let [obj, line] = ReadTable();
    function ReadTable(start_line = 0) {
        let table = {};
        for (let i = start_line; i < rows.length; i++) {
            if (rows[i].search(/\}/) !== -1) {
                return [table, i];
            }
            // 字符类型的值
            if (rows[i].search(/.* = ".*"/) !== -1) {
                let kv = rows[i].replace(/\t/g, '').split(' = ');
                let key = kv[0];
                let value = kv[1].replace(/"/g, '').replace(/\n/, '');
                table[key] = value;
            }
            // 数字类型的值
            if (rows[i].search(/.* = -?\d+\.\d+/) !== -1) {
                let kv = rows[i].replace(/\t/g, '').split(' = ');
                let key = kv[0];
                let value = kv[1].replace(/\n/, '');
                table[key] = value;
            }
            // object或array类型的值
            if (rows[i].search(/\t*.* = \n/) !== -1) {
                let key = rows[i].replace(/\t/g, '').split(' = ')[0];
                // array
                if (rows[i + 1].search(/\[/) !== -1) {
                    let [value, new_line] = ReadArray(i + 1);
                    i = new_line;
                    table[key] = value;
                }
                // object
                if (rows[i + 1].search(/\{/) !== -1) {
                    let [value, new_line] = ReadTable(i + 1);
                    i = new_line;
                    table[key] = value;
                }
            }
        }
    }
    function ReadArray(start_line) {
        let arr = [];
        for (let i = start_line; i < rows.length; i++) {
            if (rows[i].search(/\[/) !== -1) {
            }
            if (rows[i].search(/\]/) !== -1) {
                return [arr, i];
            }
            // float
            if (rows[i].search(/-?\d+\.\d+/) !== -1) {
                let value = rows[i].match(/-?\d+\.\d+/);
                arr.push(value[0]);
            }
            // string
            if (rows[i].search(/".*",/) !== -1) {
                let value = rows[i].split('"');
                arr.push(value[1]);
            }
        }
    }
    return obj;
}
exports.ReadKV3 = ReadKV3;
// 读取kv2格式为object(兼容kv3)
function ReadKeyValue2(kvdata, bRemoveComment = true) {
    if (bRemoveComment === true) {
        kvdata = RemoveComment(kvdata);
    }
    // kvdata = kvdata.replace(/\t/g,'').replace(' ','').replace(/\r\n/g,'');
    kvdata = kvdata.replace(/\t/g, '').replace(/\r\n/g, '');
    let kv_obj = {};
    for (let i = 0; i < kvdata.length; i++) {
        let substr = kvdata[i];
        if (substr === '"') {
            let key;
            let value;
            [key, value, i] = ReadKeyValue(i);
            kv_obj[key] = value;
            continue;
        }
        if (substr === '#' && kvdata.substr(i, 5) === '#base') {
            i = GetBase(i);
            continue;
        }
    }
    return kv_obj;
    // 读取一对键对
    function ReadKeyValue(start_index) {
        let key = '';
        let value;
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            // 读取key
            if (substr === '"' && state === 'NONE') {
                [key, i] = GetContent(i);
                state = 'VALUE';
                continue;
            }
            // 读取value
            if (substr === '"' && state === 'VALUE') {
                [value, i] = GetContent(i);
                return [key, value, i];
            }
            // 读取table
            if (substr === '{' && state === 'VALUE') {
                [value, i] = GetTable(i);
                return [key, value, i];
            }
        }
    }
    function GetTable(start_index) {
        let kv = {};
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '{' && state === 'NONE') {
                state = 'READ';
                continue;
            }
            // 插入kv3
            if (substr === '<' && kvdata.substr(i, 8) === '<!-- kv3' && state === 'READ') {
                let [block, new_index] = GetKv3Block(i);
                kv = ReadKeyValue3(block);
                i = new_index;
                continue;
            }
            if (substr === '"' && state === 'READ') {
                let key;
                let value;
                [key, value, i] = ReadKeyValue(i);
                kv[key] = value;
                continue;
            }
            if (substr === '}' && state === 'READ') {
                return [kv, i];
            }
        }
    }
    // 获取引号里的内容
    function GetContent(start_index) {
        let content = '';
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            // 跳过转义符
            if (substr === '\\' && kvdata[i + 1] === '"') {
                content += substr;
                i++;
                continue;
            }
            if (substr === '"' && state === 'NONE') {
                state = 'READ';
                continue;
            }
            if (state === 'READ') {
                if (substr === '"') {
                    return [content, i];
                }
                else {
                    content += substr;
                }
            }
        }
    }
    // 获得kv3块
    function GetKv3Block(start_index) {
        let block = '';
        let left = 0;
        let right = 0;
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (state === 'NONE' && substr === '<') {
                state = 'HEAD';
                continue;
            }
            if (state === 'HEAD') {
                if (substr === '>') {
                    state = 'NONE';
                }
                continue;
            }
            block += substr;
            if (substr === '{') {
                left++;
            }
            if (substr === '}') {
                right++;
                if (left === right) {
                    return [block, i];
                }
            }
        }
    }
    // #base
    function GetBase(start_index) {
        let path = '';
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '#') {
                state = 'START';
                continue;
            }
            if (substr === '"' && state === 'START') {
                state = 'READ';
                continue;
            }
            if (state === 'READ') {
                if (substr === '"') {
                    return i;
                }
                else {
                    path += substr;
                    continue;
                }
            }
        }
    }
}
exports.ReadKeyValue2 = ReadKeyValue2;
// 读取kv3格式为object
function ReadKeyValue3(kvdata) {
    kvdata = kvdata.replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
    // kvdata = kvdata.replace(/\t/g,'').replace(/\r\n/g,'');
    let kv_obj = [];
    for (let i = 0; i < kvdata.length; i++) {
        let substr = kvdata[i];
        if (substr === '{') {
            let [obj, new_line] = ReadTable(i);
            kv_obj.push(obj);
            i = new_line;
            continue;
        }
    }
    return kv_obj;
    // 读取一对中括号里面的内容
    function ReadTable(start_index) {
        let kv = {};
        let key = '';
        let value = '';
        let state = 'NONE';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '{' && state === 'NONE') {
                state = 'KEY';
                continue;
            }
            if (substr === '}') {
                return [kv, i];
            }
            if (state === 'KEY') {
                if (substr === '=') {
                    state = 'VALUE';
                    continue;
                }
                else {
                    key += substr;
                    continue;
                }
            }
            if (state === 'VALUE') {
                if (substr === '"') {
                    state = 'STRING';
                    continue;
                }
                else if (substr === '{') {
                    // 读表
                    let [obj, new_line] = ReadTable(i);
                    kv[key] = obj;
                    key = '';
                    value = '';
                    i = new_line;
                    state = 'KEY';
                    continue;
                }
                else if (substr === '[') {
                    // 读数组
                    let [obj, new_line] = ReadArray(i);
                    kv[key] = obj;
                    key = '';
                    value = '';
                    i = new_line;
                    state = 'KEY';
                    continue;
                }
                else if (IsNumber(substr) === true || substr === '-') {
                    state = 'NUMBER';
                }
            }
            if (state === 'STRING') {
                if (substr === '"') {
                    kv[key] = value;
                    key = '';
                    value = '';
                    state = 'KEY';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
            if (state === 'NUMBER') {
                if (IsNumber(substr) === true || substr === '.') {
                    value += substr;
                    continue;
                }
                else {
                    kv[key] = value;
                    key = '';
                    value = '';
                    i--;
                    state = 'KEY';
                    continue;
                }
            }
        }
    }
    // 读数组
    function ReadArray(start_index) {
        let arr = [];
        let state = 'NONE';
        let value = '';
        for (let i = start_index; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '[' && state === 'NONE') {
                state = 'VALUE';
                continue;
            }
            if (substr === ']') {
                return [arr, i];
            }
            if (state === 'VALUE') {
                if (substr === '"') {
                    state = 'STRING';
                    continue;
                }
                else {
                    state = 'NUMBER';
                }
            }
            if (state === 'STRING') {
                if (substr === '"') {
                    arr.push(value);
                    value = '';
                    i++;
                    state = 'VALUE';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
            if (state === 'NUMBER') {
                if (substr === ',') {
                    arr.push(value);
                    value = '';
                    state = 'VALUE';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
        }
    }
}
exports.ReadKeyValue3 = ReadKeyValue3;
// 读取kv2格式为object（#base）
function ReadKeyValueWithBase(full_path) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取名字
        let file_name = full_path.split('/').pop() || '';
        let path = full_path.split(file_name)[0];
        let kvdata = ReadKeyValue2(fs.readFileSync(full_path, 'utf-8'));
        let kvtable = kvdata[Object.keys(kvdata)[0]];
        let kv_string = fs.readFileSync(full_path, 'utf-8');
        kv_string = RemoveComment(kv_string);
        const rows = kv_string.split(os.EOL);
        for (let i = 0; i < rows.length; i++) {
            const line_text = rows[i];
            if (line_text.search(/#base ".*"/) !== -1) {
                let base_path = line_text.split('"')[1];
                // 找不到文件则跳过
                if ((yield GetStat(path + base_path)) === false) {
                    ShowError("文件缺失：" + path + base_path);
                    continue;
                }
                let kv = ReadKeyValue2(fs.readFileSync(path + base_path, 'utf-8'));
                let table = kv[Object.keys(kv)[0]];
                for (const key in table) {
                    const value = table[key];
                    kvtable[key] = value;
                }
            }
            else {
                continue;
            }
        }
        return kvdata;
    });
}
exports.ReadKeyValueWithBase = ReadKeyValueWithBase;
// 读取kv2格式为object（#base）包含路径信息
function ReadKeyValueWithBaseIncludePath(full_path) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = {};
        // 获取名字
        let file_name = full_path.split('/').pop() || '';
        let path = full_path.split(file_name)[0];
        let kvdata = ReadKeyValue2(fs.readFileSync(full_path, 'utf-8'));
        // 用路径索引
        result[full_path] = kvdata;
        // let kvtable = kvdata[Object.keys(kvdata)[0]];
        let kv_string = fs.readFileSync(full_path, 'utf-8');
        kv_string = RemoveComment(kv_string);
        const rows = kv_string.split(os.EOL);
        for (let i = 0; i < rows.length; i++) {
            const line_text = rows[i];
            if (line_text.search(/#base ".*"/) !== -1) {
                let base_path = line_text.split('"')[1];
                // 找不到文件则跳过
                if ((yield GetStat(path + base_path)) === false) {
                    ShowError("文件缺失：" + path + base_path);
                    continue;
                }
                let kv = ReadKeyValue2(fs.readFileSync(path + base_path, 'utf-8'));
                // 用路径索引
                result[path + base_path] = kv;
                let table = kv[Object.keys(kv)[0]];
                for (const key in table) {
                    const value = table[key];
                    // kvtable[key] = value;
                }
            }
            else {
                continue;
            }
        }
        return result;
    });
}
exports.ReadKeyValueWithBaseIncludePath = ReadKeyValueWithBaseIncludePath;
// 获取从ReadKeyValue2、ReadKeyValue3、ReadKeyValueWithBase得到的对象里的第index个对象，用于去掉外层，使其与DOTA2读取的KV结构一致
function GetKeyValueObjectByIndex(Obj, index = 0) {
    if (typeof (Obj) !== "object") {
        return;
    }
    return Obj[Object.keys(Obj)[index]];
}
exports.GetKeyValueObjectByIndex = GetKeyValueObjectByIndex;
// 对象覆盖
function OverrideKeyValue(mainObj, Obj) {
    if (typeof (mainObj) !== "object") {
        return Obj;
    }
    if (typeof (Obj) !== "object") {
        return mainObj;
    }
    for (const k in Obj) {
        const v = Obj[k];
        if (typeof (v) === "object") {
            mainObj[k] = OverrideKeyValue(mainObj[k], v);
        }
        else {
            mainObj[k] = v;
        }
    }
    return mainObj;
}
exports.OverrideKeyValue = OverrideKeyValue;
// 对象替换
function ReplaceKeyValue(mainObj, Obj) {
    if (typeof (mainObj) !== "object") {
        return Obj;
    }
    if (typeof (Obj) !== "object") {
        return mainObj;
    }
    for (const k in Obj) {
        const v = Obj[k];
        if (mainObj[k] !== undefined && mainObj[k] !== null) {
            if (typeof (v) === "object") {
                mainObj[k] = OverrideKeyValue(mainObj[k], v);
            }
            else {
                mainObj[k] = v;
            }
        }
    }
    return mainObj;
}
exports.ReplaceKeyValue = ReplaceKeyValue;
// 去除注释
function RemoveComment(data) {
    let new_data = '';
    const rows = data.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        const line_text = rows[i];
        let state = 0; // 用于处理引号内的//注释
        for (let char = 0; char < line_text.length; char++) {
            const substr = line_text[char];
            if (substr === '"') {
                state = (state == 0) ? 1 : 0;
            }
            //引号里的// 不处理
            if (state != 1 && substr === '/' && line_text[char + 1] === '/') {
                break;
            }
            else {
                new_data += substr;
            }
        }
        new_data += os.EOL;
    }
    return new_data;
}
exports.RemoveComment = RemoveComment;
// csv转array
function CSVParse(csv) {
    csv = csv.replace(/\r\n/g, '\n');
    let arr = [];
    let col = 0;
    let row = 0;
    for (let i = 0; i < csv.length; i++) {
        i = ReadValue(i);
    }
    return arr;
    function ReadValue(index) {
        let value = "";
        let state = "normal";
        for (let i = index; i < csv.length; i++) {
            let substr = csv[i];
            let bLast = (i == csv.length - 1);
            if (substr === "\"" && state === "normal") {
                state = "string";
                continue;
            }
            if (substr === "\"" && state === "string") {
                state = "normal";
                continue;
            }
            if (substr === "\n" && state === "string") {
                value += substr;
                continue;
            }
            if (substr === "\n" && state === "normal") {
                if (arr[row] === undefined) {
                    arr[row] = [];
                }
                arr[row][col] = value;
                row++;
                col = 0;
                return i;
            }
            if (substr === "," && state !== "string") {
                if (arr[row] === undefined) {
                    arr[row] = [];
                }
                arr[row][col] = value;
                col++;
                return i;
            }
            if (bLast && state === "normal") {
                if (arr[row] === undefined) {
                    arr[row] = [];
                }
                value += substr;
                arr[row][col] = value;
                row++;
                col = 0;
                return i;
            }
            value += substr;
        }
    }
}
exports.CSVParse = CSVParse;
// csv转array(无法处理单元格换行问题)
function CSV2Array(csv) {
    const rows = csv.split(os.EOL);
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
        arr[i] = [];
        const line_text = rows[i];
        let values = line_text.split(',');
        if (values.length === 1) {
            continue;
        }
        for (let j = 0; j < values.length; j++) {
            const value = values[j];
            arr[i].push(value);
        }
    }
    return arr;
}
exports.CSV2Array = CSV2Array;
// array转csv
function Array2CSV(arr) {
    let csv = '';
    let title_count = arr[1].length;
    for (let i = 0; i < arr.length; i++) {
        const rows = arr[i];
        for (let j = 0; j < rows.length; j++) {
            if (rows[0] === undefined && rows.length === 0) {
                break;
            }
            let col = rows[j] === undefined ? '' : rows[j];
            if (col.indexOf(",") != -1) {
                col = '"' + col + '"';
            }
            csv += col + (j + 1 === rows.length ? '' : ',');
        }
        if (rows[0] !== undefined || rows.length > 0) {
            for (let q = 0; q < title_count - rows.length; q++) {
                csv += ',';
            }
            csv += os.EOL;
        }
        if (rows.length === 0) {
            for (let i = 0; i < title_count - 1; i++) {
                csv += ',';
            }
            csv += os.EOL;
        }
    }
    return csv;
}
exports.Array2CSV = Array2CSV;
// 写入kv
function WriteKeyValue(obj, depth = 0) {
    var str = '';
    if (obj == null || obj == undefined) {
        return str;
    }
    // 添加制表符
    function AddDepthTab(depth, add_string) {
        var tab = '';
        for (let d = 0; d < depth; d++) {
            tab += '\t';
        }
        tab += add_string;
        return tab;
    }
    // 添加key与value之间制表符
    function AddIntervalTab(depth, key) {
        var tab = '';
        for (let d = 0; d < 12 - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
            tab += '\t';
        }
        return tab;
    }
    let keys = Object.keys(obj).sort(function (a, b) { return Number(a) - Number(b); });
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = obj[key];
        if (value == undefined || value == null || (typeof (value) == "object" && Object.keys(value).length === 0)) {
        }
        else if (typeof (value) === 'string') {
            str += AddDepthTab(depth, '"' + key + '"');
            str += AddIntervalTab(depth, key);
            str += '"' + value + '"' + os.EOL;
        }
        else {
            str += AddDepthTab(depth, '"' + key + '"' + os.EOL);
            str += AddDepthTab(depth, '{' + os.EOL);
            str += WriteKeyValue(value, depth + 1);
            str += AddDepthTab(depth, '}' + os.EOL);
        }
    }
    return str;
}
exports.WriteKeyValue = WriteKeyValue;
function MultilayerCSV2KV(listen_path) {
    try {
        let csv = fs.readFileSync(listen_path, 'utf-8');
        let csv_arr = CSVParse(csv);
        // 处理多层key
        let csv_key = csv_arr[1];
        for (let index = 0; index < csv_key.length; index++) {
            let key = csv_key[index];
            let key_split = key.split("-");
            if (key_split.length > 1) {
                csv_key[index] = key_split;
            }
        }
        let arr_default = csv_arr[2];
        if (arr_default.length === 0 || arr_default[0] == undefined) {
            return {};
        }
        let arrKeyDepth = {}; // 用这个对象记录上一次unique_key变化后的多层结构
        let csv_data = {}; // 函数返回值
        for (let y = 2; y < csv_arr.length; y++) {
            const row = csv_arr[y];
            if (row.length === 0) {
                continue;
            }
            let line_obj;
            if (row[0] == "") {
                line_obj = csv_data[arr_default[0]];
            }
            else {
                // 新的一个，初始化
                line_obj = {};
                arr_default = [row[0]];
                arrKeyDepth = {};
            }
            for (let x = 1; x < row.length; x++) {
                let col = row[x];
                if (col != "") {
                    arr_default[x] = col;
                }
                else {
                    col = arr_default[x];
                }
                let key = csv_key[x];
                if (key instanceof Array) {
                    let temp_obj;
                    if (key[0] != "root") {
                        if (line_obj[key[0]] == undefined) {
                            line_obj[key[0]] = {};
                        }
                        temp_obj = line_obj[key[0]];
                    }
                    else {
                        temp_obj = line_obj;
                    }
                    if (arrKeyDepth[key[0]] == undefined) {
                        arrKeyDepth[key[0]] = {};
                    }
                    // 去头去尾来读取arrKeyDepth,使temp_obj[这个指针]指向col应该填入的位置 NOTE:中间的只能为value 尾部可以为key或者value
                    let index = 1;
                    let depth = index - 1;
                    for (; index <= key.length - 2; index++) {
                        depth = index - 1;
                        let sKeyDepth = arrKeyDepth[key[0]][depth];
                        if (sKeyDepth == undefined || sKeyDepth == "") {
                            continue;
                        }
                        if (temp_obj[sKeyDepth] == undefined) {
                            continue;
                        }
                        temp_obj = temp_obj[sKeyDepth];
                    }
                    depth = index - 1;
                    if (key[key.length - 1] == "value") {
                        let sKeyDepth = arrKeyDepth[key[0]][depth];
                        if (sKeyDepth == undefined || sKeyDepth == "") {
                            continue;
                        }
                        temp_obj[sKeyDepth] = col;
                    }
                    else {
                        let sKeyDepth = (col == "" || col == undefined) ? arrKeyDepth[key[0]][depth] : col;
                        if (sKeyDepth == undefined || sKeyDepth == "") {
                            continue;
                        }
                        arrKeyDepth[key[0]][depth] = sKeyDepth;
                        if (temp_obj[sKeyDepth] == undefined) {
                            temp_obj[sKeyDepth] = {};
                        }
                    }
                }
                else if (key == "") {
                    continue;
                }
                else {
                    if (col == undefined || col == "") {
                        continue;
                    }
                    line_obj[key] = col;
                }
            }
            if (row[0] != undefined && row[0] != "") {
                csv_data[row[0]] = line_obj;
            }
        }
        return csv_data;
    }
    catch (error) {
        console.log(error);
    }
}
exports.MultilayerCSV2KV = MultilayerCSV2KV;
function AbilityCSV2KV(listen_path) {
    let csv = fs.readFileSync(listen_path, 'utf-8');
    // 生成kv
    let csv_data = {};
    let csv_arr = CSVParse(csv);
    // let csv_arr:any = CSV2Array(csv);
    const csv_key = csv_arr[1];
    for (let i = 2; i < csv_arr.length; i++) {
        const row = csv_arr[i];
        if (row.length === 0) {
            continue;
        }
        let special_count = 1;
        let AbilitySpecial = {};
        let precache = {};
        let values_obj = {};
        for (let j = 1; j < row.length; j++) {
            const col = row[j];
            // 跳过空值
            if (col === '') {
                continue;
            }
            let key = csv_key[j];
            // special值特殊处理
            if (key === 'AbilitySpecial') {
                key = ("0" + special_count).substr(-2);
                let value = csv_arr[i + 1][j];
                // 拆分key
                let key_arr = col.split("\n");
                // 拆分value
                let value_arr = value.split("\n");
                AbilitySpecial[key] = {
                    var_type: value_arr[0].search(/\./g) !== -1 ? 'FIELD_FLOAT' : 'FIELD_INTEGER',
                };
                for (let i = 0; i < key_arr.length; i++) {
                    const _key = key_arr[i];
                    AbilitySpecial[key][_key] = value_arr[i];
                }
                special_count++;
            }
            else if (key === '') {
                continue;
            }
            else if (key === 'precache') {
                let value = csv_arr[i + 1][j];
                precache[col] = value;
            }
            else {
                values_obj[key] = col;
            }
        }
        if (Object.keys(AbilitySpecial).length > 0) {
            values_obj.AbilitySpecial = AbilitySpecial;
        }
        if (Object.keys(precache).length > 0) {
            values_obj.precache = precache;
        }
        i++;
        csv_data[row[0]] = values_obj;
    }
    return csv_data;
}
exports.AbilityCSV2KV = AbilityCSV2KV;
function UnitCSV2KV(listen_path) {
    let csv = fs.readFileSync(listen_path, 'utf-8');
    // 生成kv
    let csv_data = {};
    let csv_arr = CSVParse(csv);
    const csv_key = csv_arr[1];
    for (let i = 2; i < csv_arr.length; i++) {
        const row = csv_arr[i];
        if (row.length === 0 || row[0] === '' || row[0] === undefined) {
            continue;
        }
        let wearable_count = 1;
        let AttachWearables = {};
        let values_obj = {};
        // 读取多层结构
        let ReadBlock = function (index) {
            let block = {};
            for (let i = index + 1; i < row.length; i++) {
                const col = row[i];
                const key = csv_key[i];
                if (col === '') {
                    if (key.search('[{]') !== -1) {
                        let [_block, j] = ReadBlock(i);
                        i = j;
                        if (Object.keys(_block).length > 0) {
                            block[key.split('[{]')[0]] = _block;
                        }
                    }
                    else if (key.search('[}]') !== -1) {
                        return [block, i];
                    }
                    continue;
                }
                if (key === '') {
                    continue;
                }
                else {
                    block[key] = col;
                }
            }
        };
        for (let j = 1; j < row.length; j++) {
            const col = row[j];
            let key = csv_key[j];
            // 跳过空值
            if (col === '') {
                // 处理多层结构
                if (key.search('[{]') !== -1) {
                    let [block, i] = ReadBlock(j);
                    j = i;
                    if (Object.keys(block).length > 0) {
                        values_obj[key.split('[{]')[0]] = block;
                    }
                }
                continue;
            }
            // special值特殊处理
            if (key === 'AttachWearables') {
                key = wearable_count.toString();
                let value = col;
                AttachWearables[key] = {
                    ItemDef: value
                };
                wearable_count++;
                // 一些Creature特殊键值
            }
            else if (key === 'CanRespawn' || key === 'DisableClumpingBehavior' || key === 'UsesGestureBasedAttackAnimation' || key === 'ShouldDoFlyHeightVisual' || key === 'IsHybridFlyer') {
                if (values_obj.Creature == undefined) {
                    values_obj.Creature = {};
                }
                values_obj.Creature[key] = col;
                continue;
                // 跳过没有key的值
            }
            else if (key === '') {
                continue;
            }
            else {
                values_obj[key] = col;
            }
        }
        if (Object.keys(AttachWearables).length > 0) {
            if (values_obj.Creature == undefined) {
                values_obj.Creature = {};
            }
            values_obj.Creature.AttachWearables = AttachWearables;
        }
        csv_data[row[0]] = values_obj;
    }
    return csv_data;
}
exports.UnitCSV2KV = UnitCSV2KV;
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.getNonce = getNonce;
function GetVscodeResourceUri(path) {
    return vscode.Uri.file(path).with({ scheme: 'vscode-webview-resource' }).toString();
}
exports.GetVscodeResourceUri = GetVscodeResourceUri;
function GetLuaScriptSnippet(filename, luaPath, context) {
    try {
        const templateConfig = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles');
        let SnippetPath = (filename.indexOf("item_") == -1) ? ((GetRootPath() + templateConfig.ability).replace(/\\/g, "/")) : ((GetRootPath() + templateConfig.item).replace(/\\/g, "/"));
        let snippet = fs.readFileSync(SnippetPath, "utf-8");
        snippet = snippet.replace(/\[filename\]/g, filename);
        snippet = snippet.replace(/\[path\]/g, luaPath);
        return snippet;
    }
    catch (error) {
        console.log("[warning]:No snippet file");
    }
    if (context) {
        let snippet = fs.readFileSync(path.join(context.extensionPath, 'resource', 'lua_template.lua'), "utf-8");
        snippet = snippet.replace(/filename/g, filename);
        snippet = snippet.replace(/path/g, luaPath);
        return snippet;
    }
    return '';
    // 	return `LinkLuaModifier( "modifier_${filename}", "${luaPath}.lua", LUA_MODIFIER_MOTION_NONE )
    // --Abilities
    // if ${filename} == nil then
    // 	${filename} = class({})
    // end
    // function ${filename}:GetIntrinsicModifierName()
    // 	return "modifier_${filename}"
    // end
    // ---------------------------------------------------------------------
    // --Modifiers
    // if modifier_${filename} == nil then
    // 	modifier_${filename} = class({})
    // end
    // function modifier_${filename}:OnCreated(params)
    // 	if IsServer() then
    // 	end
    // end
    // function modifier_${filename}:OnRefresh(params)
    // 	if IsServer() then
    // 	end
    // end
    // function modifier_${filename}:OnDestroy()
    // 	if IsServer() then
    // 	end
    // end
    // function modifier_${filename}:DeclareFunctions()
    // 	return {
    // 	}
    // end`;
}
exports.GetLuaScriptSnippet = GetLuaScriptSnippet;
function FormatPath(path) {
    path = path.replace(/\\/g, '/');
    path = path.charAt(0).toUpperCase() + path.slice(1);
    return path;
}
exports.FormatPath = FormatPath;
// 把js的obj转成字符串
// obj:要转的数据对象 
function Obj2Str(obj, bracket_left = "{", bracket_right = "}", sSeparator = ":", depth = 1) {
    let ret = bracket_left + "\n";
    for (const key in obj) {
        const element = obj[key];
        for (let index = 0; index < depth; index++) {
            ret += "\t";
        }
        if (typeof (element) === "object") {
            ret += '"' + key + '"' + sSeparator + "" + Obj2Str(element, bracket_left, bracket_right, sSeparator, depth + 1) + ",";
        }
        else {
            if (IsNumber(element)) {
                ret += '"' + key + '"' + sSeparator + "" + element + ",";
            }
            else {
                ret += '"' + key + '"' + sSeparator + '"' + element + "\",";
            }
        }
        ret += "\n";
    }
    if (ret[ret.length - 1] === ",") {
        ret = ret.slice(0, -1); // 去掉最后一个逗号
    }
    for (let index = 0; index < depth - 1; index++) {
        ret += "\t";
    }
    ret += bracket_right;
    return ret;
}
exports.Obj2Str = Obj2Str;
function StringToAny(str) {
    if (str === "true") {
        return true;
    }
    else if (str === "false") {
        return false;
    }
    else if (!isNaN(Number(str))) {
        return Number(str);
    }
    return str;
}
exports.StringToAny = StringToAny;
/**
 * 将CSV的字符串或者数组转成Object
 * @param {any} CSV csv string 或者 any[][]
 * @param {boolean} bVertical 是否为纵向配置，每一行像这样：中文解释,key,value
 */
function CSV2Obj(CSV, bVertical = false) {
    let arrCSV = CSV;
    if (typeof (CSV) == "string") {
        arrCSV = CSVParse(CSV);
    }
    let csvConfigs = {};
    if (bVertical) {
        for (let i = 0; i < arrCSV.length; i++) {
            let arrLine = arrCSV[i];
            csvConfigs[arrLine[1]] = arrLine[2];
        }
    }
    else {
        // 横向的至少要有三行，第一行中文，第二行key， 第三行内容
        if (arrCSV.length < 3) {
            return csvConfigs;
        }
        let keys = arrCSV[1]; // 第二行 key
        for (let i = 2; i < arrCSV.length; i++) {
            let arrLine = arrCSV[i];
            let lineID = arrLine[0];
            if (!lineID) {
                continue;
            }
            csvConfigs[lineID] = {};
            for (let j = 0; j < arrLine.length; j++) {
                if (!keys[j] || keys[j] == "") {
                    continue;
                }
                let value = arrLine[j] || "";
                // if (value == undefined || value == "") {
                // 	continue;
                // }
                // 因为多个key都叫AttachWearables，处理成AttachWearables1234
                let columnKey = keys[j];
                if (keys[j] == "AttachWearables") {
                    for (let index = 1; index < 30; index++) {
                        if (!csvConfigs[lineID]["AttachWearables" + index]) {
                            columnKey = "AttachWearables" + index;
                            break;
                        }
                    }
                }
                csvConfigs[lineID][columnKey] = value;
            }
        }
        // 中文行处理
        csvConfigs["__key_sc"] = {};
        for (let j = 0; j < keys.length; j++) {
            let sc = arrCSV[0][j] || "";
            let columnKey = keys[j];
            if (keys[j] == "AttachWearables") {
                for (let index = 1; index < 30; index++) {
                    if (!csvConfigs["__key_sc"]["AttachWearables" + index]) {
                        columnKey = "AttachWearables" + index;
                        sc = "AttachWearables" + index;
                        break;
                    }
                }
            }
            csvConfigs["__key_sc"][columnKey] = sc;
        }
    }
    return csvConfigs;
}
exports.CSV2Obj = CSV2Obj;
// Obj转csv
function Obj2CSV(Obj) {
    let __key_sc = Obj.__key_sc;
    if (!__key_sc) {
        // 默认中英文key一样
        __key_sc = {};
        for (let lineID in Obj) {
            let lineInfo = Obj[lineID];
            for (let columnKey in lineInfo) {
                __key_sc[columnKey] = columnKey;
            }
        }
    }
    // 前两行
    let arrCSV = [];
    arrCSV[0] = [];
    arrCSV[1] = [];
    for (let key in __key_sc) {
        let sChineseKey = __key_sc[key];
        arrCSV[0].push(sChineseKey);
        if (key.indexOf("AttachWearables") != -1) {
            arrCSV[1].push("AttachWearables");
        }
        else {
            arrCSV[1].push(key);
        }
    }
    let y = 2;
    for (let lineID in Obj) {
        if (lineID == "__key_sc") {
            continue;
        }
        arrCSV[y] = [];
        let oLineInfo = Obj[lineID];
        for (let columnKey in __key_sc) {
            let value = oLineInfo[columnKey] || '';
            arrCSV[y].push(value);
        }
        y++;
    }
    return Array2CSV(arrCSV);
}
exports.Obj2CSV = Obj2CSV;
// 是否是CSV空值
function isEmptyCSVValue(anything) {
    if (anything == undefined || anything == null || anything == "") {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmptyCSVValue = isEmptyCSVValue;
function locale() {
    const config = JSON.parse(String(process.env.VSCODE_NLS_CONFIG));
    return config['locale'] || 'en';
}
exports.locale = locale;
function EachLine(data, callback, start = 0) {
    const rows = Array.isArray(data) ? data : data.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        let result = callback(i, rows[i]);
        if (result === true) {
            break;
        }
        else if (typeof (result) == "number") {
            i = result;
        }
    }
}
exports.EachLine = EachLine;
//# sourceMappingURL=util.js.map