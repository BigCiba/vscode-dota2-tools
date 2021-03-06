import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { exec } from 'child_process';
import { isObject, log, print } from 'util';

// 获取根目录
export function GetRootPath(): string | undefined {
	const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	if (folders !== undefined) {
		return folders[0].uri.fsPath;
	} else {
		return;
	}
}
export function ShowError(info: any) {
	vscode.window.showErrorMessage(info);
}
export function ShowInfo(info: any) {
	vscode.window.showInformationMessage(info);
}
export function FindStrInFile(filePath: string, reg: string | RegExp) {
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
export function GetStrRangeInFile(filePath: string, str: string) {
	var pos = FindStrInFile(filePath, str);
	return new vscode.Range(new vscode.Position(pos.row, pos.col), new vscode.Position(pos.row, pos.col + str.length));
}
export function GetExtensionFileAbsolutePath(context: any, relativePath: string) {
	return path.join(context.extensionPath, relativePath);
}
export function OpenInFinder(filePath: string) {
	if (!fs.existsSync(filePath)) {
		ShowError('文件不存在：' + filePath);
	}
	// 如果是目录，直接打开就好
	if (fs.statSync(filePath).isDirectory()) {
		exec(`open ${filePath}`);
	} else {
		// 如果是文件，要分开处理
		const fileName = path.basename(filePath);
		filePath = path.dirname(filePath);
		// 这里有待完善，还不知道如何finder中如何选中文件
		exec(`open ${filePath}`);
	}
}
export function OpenFileInVscode(path: string, str?: string) {
	let options = undefined;
	if (str) {
		const selection = GetStrRangeInFile(path, str);
		options = { selection };
	}
	vscode.window.showTextDocument(vscode.Uri.file(path), options);
}
export function OpenUrlInBrowser(url: string) {
	exec(`open '${url}'`);
}
export function GetWebViewContent(context: any, templatePath: any) {
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
// 取出中括号内的内容
export function GetBracketStr(text: string): string {
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

// 取出小括号内的内容
export function GetParenthesesStr(text: string): string {
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
export function ReadFunction(line: number, rows: any): any {
	let fun_info: { [k: string]: any } = {};
	let param_list: { [k: string]: any } = {};
	let end_line: number = 0;
	for (let index = line; index < rows.length; index++) {
		const text = rows[index];
		let option = rows[index].match(/---\[\[.*\]\]/g);
		if (option !== null && option.length > 0) {
			fun_info.description = text.substr(6, text.length - 9);
		} else if (text.search('-- @return') !== -1) {
			fun_info.return = text.substr(11, text.length);
			if (fun_info.return === '<unknown>') {
				fun_info.return = 'unknown';
			}
		} else if (text.search('-- @param') !== -1) {
			let arr = text.split(' ');
			param_list[arr[2]] = {
				type: arr[3],
				params_name: arr[2],
				description: 'No Description Set'
			};
		} else if (text.search('function') !== -1) {
			fun_info.function = text.split('(')[0].split('function ')[1];
			fun_info.description = fun_info.description.split(fun_info.function + '  ')[1];
			if (fun_info.function.search(':') === -1) {
				fun_info.class = 'Global';
			} else {
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
export function ReadEnum(line: number, rows: any): any {
	let enum_list: any[] = [];
	let end_line: number = 0;
	for (let index = line + 1; index < rows.length; index++) {
		let enum_info: { [k: string]: any } = {};
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
		} else {
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
export function GetNoteAPIContent(fun_info: any, context: vscode.ExtensionContext): string {
	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Dota2 API</title>
			<link rel="stylesheet" href="`+ vscode.Uri.file(path.join(context.extensionPath, 'lib', 'Skeleton-2.0.4', 'css', 'skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
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
	function AddParams(): string {
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
						`+ AddParameter(fun_info.params) + `
					</tbody>
				</table>`;
		}

		return s;
	}
	function AddParameter(params: any): string {
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
export function GetConstantNoteContent(enum_info: any, context: vscode.ExtensionContext) {
	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Dota2 API</title>
			<link rel="stylesheet" href="`+ vscode.Uri.file(path.join(context.extensionPath, 'lib', 'Skeleton-2.0.4', 'css', 'skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
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
export function GetAbilityTextureContent(webview: vscode.Webview, texture_info: any, context: vscode.ExtensionContext) {
	const styleUri = webview.asWebviewUri(vscode.Uri.file(
		path.join(context.extensionPath, 'resource', 'view', 'textureSelector.css')
	));
	const scriptUri = webview.asWebviewUri(vscode.Uri.file(
		path.join(context.extensionPath, 'resource', 'view', 'select_texture.js')
	));
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
						<img class="hero-filter" src="`+ vscode.Uri.file(path.join(context.extensionPath, 'images', 'heroes_icon', 'npc_dota_hero_default_png.png')).with({ scheme: 'vscode-resource' }).toString() + `"/>
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
export function ReadAPI(api: string, api_cl: string): any {
	let root_path: string | undefined = GetRootPath();
	if (root_path === undefined) {
		return;
	}
	const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
	// 读取服务器API
	const rows = api.split(os.EOL);
	let class_list: { [k: string]: any } = {};
	let enum_list: { [k: string]: any } = {};
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
	let class_list_cl: { [k: string]: any } = {};
	let enum_list_cl: { [k: string]: any } = {};
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
export function GetFileInfo(root_path: string | undefined, path: string): object {
	if (root_path !== undefined) {
		path = path.split(root_path)[1];
	}
	let arr = path.split('\\');
	let file = arr[arr.length - 1];
	let info: object = {
		full_name: path,
		name: file.split('.')[0],
		ext: file.split('.')[1],
	};

	return info;
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
export function GetStat(path: string): Promise<boolean | fs.Stats> {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				resolve(false);
			} else {
				resolve(stats);
			}
		});
	});
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
export async function MakeDir(dir: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		fs.mkdir(dir, err => {
			if (err) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
export async function DirExists(dir: string) {
	let isExists = await GetStat(dir);
	//如果该路径且不是文件，返回true
	if (isExists && isExists !== true && isExists.isDirectory()) {
		return true;
	} else if (isExists) {	 //如果该路径存在但是文件，返回false
		return false;
	}
	//如果该路径不存在
	let tempDir = path.parse(dir).dir;	  //拿到上级路径
	//递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
	let status = await DirExists(tempDir);
	let mkdirStatus;
	if (status) {
		mkdirStatus = await MakeDir(dir);
	}
	return mkdirStatus;
}
// 判断object里是否有某个属性
export function ObjectHasKey(obj: any, _key: string): boolean {
	let bHas = false;
	for (const key in obj) {
		const value = obj[key];
		if (key === _key) {
			return true;
		} else if (isObject(value)) {
			bHas = ObjectHasKey(value, _key);
			if (bHas === true) {
				return true;
			}
		}
	}
	return bHas;
}
// 判断字符串是否是数字
export function IsNumber(s: string): boolean {
	var reg = /^(-?\d+)(\.\d+)?$/;
	if (reg.test(s)) {
		return true;
	}
	return false;
}
// 弃用
export function ReadKV3(path: string): any {
	let kv3_data = fs.readFileSync(path, 'utf-8');
	const rows = kv3_data.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		rows[i] = rows[i] + '\n';
	}
	let [obj, line] = ReadTable();
	function ReadTable(start_line: number = 0): any {
		let table: any = {};
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
	function ReadArray(start_line: number): any {
		let arr = [];
		for (let i = start_line; i < rows.length; i++) {
			if (rows[i].search(/\[/) !== -1) {
			}
			if (rows[i].search(/\]/) !== -1) {
				return [arr, i];
			}
			// float
			if (rows[i].search(/-?\d+\.\d+/) !== -1) {
				let value: any = rows[i].match(/-?\d+\.\d+/);
				arr.push(value[0]);
			}
			// string
			if (rows[i].search(/".*",/) !== -1) {
				let value: any = rows[i].split('"');
				arr.push(value[1]);
			}
		}
	}
	return obj;
}
// 读取kv2格式为object(兼容kv3)
export function ReadKeyValue2(kvdata: string, bRemoveComment: boolean = true): any {
	if (bRemoveComment === true) {
		kvdata = RemoveComment(kvdata);
	}
	// kvdata = kvdata.replace(/\t/g,'').replace(' ','').replace(/\r\n/g,'');
	kvdata = kvdata.replace(/\t/g, '').replace(/\r\n/g, '');
	let kv_obj: any = {};
	for (let i = 0; i < kvdata.length; i++) {
		let substr = kvdata[i];
		if (substr === '"') {
			let key: any;
			let value: any;
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
	function ReadKeyValue(start_index: number): any {
		let key: string = '';
		let value: any;
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
	function GetTable(start_index: number): any {
		let kv: any = {};
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
				let key: any;
				let value: any;
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
	function GetContent(start_index: number): any {
		let content: string = '';
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
				} else {
					content += substr;
				}
			}
		}
	}
	// 获得kv3块
	function GetKv3Block(start_index: number): any {
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
	function GetBase(start_index: number): any {
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
				} else {
					path += substr;
					continue;
				}
			}
		}
	}
}
// 读取kv3格式为object
export function ReadKeyValue3(kvdata: string): any {
	kvdata = kvdata.replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
	// kvdata = kvdata.replace(/\t/g,'').replace(/\r\n/g,'');
	let kv_obj: any = [];
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
	function ReadTable(start_index: number): any {
		let kv: any = {};
		let key: string = '';
		let value: string = '';
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
				} else {
					key += substr;
					continue;
				}
			}
			if (state === 'VALUE') {
				if (substr === '"') {
					state = 'STRING';
					continue;
				} else if (substr === '{') {
					// 读表
					let [obj, new_line] = ReadTable(i);
					kv[key] = obj;
					key = '';
					value = '';
					i = new_line;
					state = 'KEY';
					continue;
				} else if (substr === '[') {
					// 读数组
					let [obj, new_line] = ReadArray(i);
					kv[key] = obj;
					key = '';
					value = '';
					i = new_line;
					state = 'KEY';
					continue;
				} else if (IsNumber(substr) === true || substr === '-') {
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
				} else {
					value += substr;
					continue;
				}
			}
			if (state === 'NUMBER') {
				if (IsNumber(substr) === true || substr === '.') {
					value += substr;
					continue;
				} else {
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
	function ReadArray(start_index: number): any {
		let arr: any = [];
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
				} else {
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
				} else {
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
				} else {
					value += substr;
					continue;
				}
			}
		}
	}
}
// 读取kv2格式为object（#base）
export async function ReadKeyValueWithBase(full_path: string) {
	// 获取名字
	let file_name: string = full_path.split('/').pop() || '';
	let path = full_path.split(file_name)[0];

	let kvdata = ReadKeyValue2(fs.readFileSync(full_path, 'utf-8'));
	let kvtable = kvdata[Object.keys(kvdata)[0]];
	let kv_string = fs.readFileSync(full_path, 'utf-8');
	kv_string = RemoveComment(kv_string);
	const rows: string[] = kv_string.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const line_text: string = rows[i];
		if (line_text.search(/#base ".*"/) !== -1) {
			let base_path = line_text.split('"')[1];
			// 找不到文件则跳过
			if (await GetStat(path + base_path) === false) {
				ShowError("文件缺失：" + path + base_path);
				continue;
			}
			let kv = ReadKeyValue2(fs.readFileSync(path + base_path, 'utf-8'));
			let table = kv[Object.keys(kv)[0]];
			for (const key in table) {
				const value = table[key];
				kvtable[key] = value;
			}
		} else {
			continue;
		}
	}
	return kvdata;
}
// 读取kv2格式为object（#base）包含路径信息
export async function ReadKeyValueWithBaseIncludePath(full_path: string) {
	let result:any = {};
	// 获取名字
	let file_name: string = full_path.split('/').pop() || '';
	let path = full_path.split(file_name)[0];

	let kvdata = ReadKeyValue2(fs.readFileSync(full_path, 'utf-8'));
	// 用路径索引
	result[full_path] = kvdata;
	// let kvtable = kvdata[Object.keys(kvdata)[0]];
	let kv_string = fs.readFileSync(full_path, 'utf-8');
	kv_string = RemoveComment(kv_string);
	const rows: string[] = kv_string.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const line_text: string = rows[i];
		if (line_text.search(/#base ".*"/) !== -1) {
			let base_path = line_text.split('"')[1];
			// 找不到文件则跳过
			if (await GetStat(path + base_path) === false) {
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
		} else {
			continue;
		}
	}
	return result;
}

// 获取从ReadKeyValue2、ReadKeyValue3、ReadKeyValueWithBase得到的对象里的第index个对象，用于去掉外层，使其与DOTA2读取的KV结构一致
export function GetKeyValueObjectByIndex(Obj: any, index: number = 0) {
	if (typeof (Obj) !== "object") {
		return;
	}
	return Obj[Object.keys(Obj)[index]];
}

// 对象覆盖
export function OverrideKeyValue(mainObj: any, Obj: any): object {
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
		} else {
			mainObj[k] = v;
		}
	}

	return mainObj;
}

// 对象替换
export function ReplaceKeyValue(mainObj: any, Obj: any): object {
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
			} else {
				mainObj[k] = v;
			}
		}
	}

	return mainObj;
}

// 去除注释
export function RemoveComment(data: string): string {
	let new_data = '';
	const rows: string[] = data.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const line_text: string = rows[i];
		let state = 0;// 用于处理引号内的//注释
		for (let char = 0; char < line_text.length; char++) {
			const substr = line_text[char];
			if (substr === '"') {
				state = (state == 0) ? 1 : 0;
			}
			//引号里的// 不处理
			if (state != 1 && substr === '/' && line_text[char + 1] === '/') {
				break;
			} else {
				new_data += substr;
			}
		}
		new_data += os.EOL;
	}
	return new_data;
}
// csv转array
export function CSVParse(csv: string) {
	csv = csv.replace(/\r\n/g, '\n');
	let arr: any = [];
	let col = 0;
	let row = 0;
	for (let i = 0; i < csv.length; i++) {
		i = ReadValue(i);
	}
	return arr;
	function ReadValue(index: number): any {
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
// csv转array(无法处理单元格换行问题)
export function CSV2Array(csv: string): [] {
	const rows: string[] = csv.split(os.EOL);
	let arr: any = [];
	for (let i = 0; i < rows.length; i++) {
		arr[i] = [];
		const line_text: string = rows[i];
		let values: string[] = line_text.split(',');
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
// array转csv
export function Array2CSV(arr: any[]): string {
	let csv: string = '';
	let title_count: number = arr[1].length;
	for (let i = 0; i < arr.length; i++) {
		const rows: any = arr[i];
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
// 写入kv
export function WriteKeyValue(obj: any, depth: number = 0) {
	var str: string = '';
	if (obj == null || obj == undefined) {
		return str;
	}
	// 添加制表符
	function AddDepthTab(depth: number, add_string: string): string {
		var tab: string = '';
		for (let d = 0; d < depth; d++) {
			tab += '\t';
		}
		tab += add_string;
		return tab;
	}
	// 添加key与value之间制表符
	function AddIntervalTab(depth: number, key: string): string {
		var tab: string = '';
		for (let d = 0; d < 12 - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
			tab += '\t';
		}
		return tab;
	}
	let keys = Object.keys(obj).sort(function (a, b) { return Number(a) - Number(b) });
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index]
		const value = obj[key];
		if (value == undefined || value == null || (typeof (value) == "object" && Object.keys(value).length === 0)) {
		} else if (typeof (value) === 'string') {
			str += AddDepthTab(depth, '"' + key + '"');
			str += AddIntervalTab(depth, key);
			str += '"' + value + '"' + os.EOL;
		} else {
			str += AddDepthTab(depth, '"' + key + '"' + os.EOL);
			str += AddDepthTab(depth, '{' + os.EOL);
			str += WriteKeyValue(value, depth + 1);
			str += AddDepthTab(depth, '}' + os.EOL);
		}
	}
	return str;
}

export interface Configuration {
	[key: string]: string;
}

export function MultilayerCSV2KV(listen_path: string): any {
	try {
		let csv = fs.readFileSync(listen_path, 'utf-8');
		let csv_arr: any = CSVParse(csv);
		// 处理多层key
		let csv_key: any[] = csv_arr[1];
		for (let index = 0; index < csv_key.length; index++) {
			let key: string = csv_key[index];
			let key_split = key.split("-");
			if (key_split.length > 1) {
				csv_key[index] = key_split;
			}
		}

		let arr_default: string[] = csv_arr[2];
		if (arr_default.length === 0 || arr_default[0] == undefined) {
			return {};
		}

		let arrKeyDepth: any = {};// 用这个对象记录上一次unique_key变化后的多层结构

		let csv_data: any = {}; // 函数返回值
		for (let y = 2; y < csv_arr.length; y++) {
			const row: any = csv_arr[y];
			if (row.length === 0) {
				continue;
			}
			let line_obj: any;
			if (row[0] == "") {
				line_obj = csv_data[arr_default[0]];
			} else {
				// 新的一个，初始化
				line_obj = {};
				arr_default = [row[0]];
				arrKeyDepth = {};
			}
			for (let x = 1; x < row.length; x++) {
				let col: string = row[x];
				if (col != "") {
					arr_default[x] = col;
				} else {
					col = arr_default[x];
				}

				let key: string | string[] = csv_key[x];
				if (key instanceof Array) {
					let temp_obj: any;
					if (key[0] != "root") {
						if (line_obj[key[0]] == undefined) {
							line_obj[key[0]] = {};
						}
						temp_obj = line_obj[key[0]];
					} else {
						temp_obj = line_obj;
					}

					if (arrKeyDepth[key[0]] == undefined) {
						arrKeyDepth[key[0]] = {};
					}

					// 去头去尾来读取arrKeyDepth,使temp_obj[这个指针]指向col应该填入的位置 NOTE:中间的只能为value 尾部可以为key或者value
					let index = 1;
					let depth: number = index - 1;
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
					} else {
						let sKeyDepth = (col == "" || col == undefined) ? arrKeyDepth[key[0]][depth] : col;
						if (sKeyDepth == undefined || sKeyDepth == "") {
							continue;
						}
						arrKeyDepth[key[0]][depth] = sKeyDepth;
						if (temp_obj[sKeyDepth] == undefined) {
							temp_obj[sKeyDepth] = {};
						}
					}
				} else if (key == "") {
					continue;
				} else {
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
	} catch (error) {
		console.log(error);
	}
}
export function AbilityCSV2KV(listen_path: string): any {
	let csv = fs.readFileSync(listen_path, 'utf-8');
	// 生成kv
	let csv_data: any = {};
	let csv_arr: any = CSVParse(csv);
	// let csv_arr:any = CSV2Array(csv);
	const csv_key: [] = csv_arr[1];
	for (let i = 2; i < csv_arr.length; i++) {
		const row: any = csv_arr[i];
		if (row.length === 0) {
			continue;
		}

		let special_count: number = 1;
		let AbilitySpecial: any = {};
		let precache: any = {};
		let values_obj: any = {};
		for (let j = 1; j < row.length; j++) {
			const col = row[j];
			// 跳过空值
			if (col === '') {
				continue;
			}
			let key: string = csv_key[j];
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
					// [col]: csv_arr[i+1][j]
				};
				for (let i = 0; i < key_arr.length; i++) {
					const _key = key_arr[i];
					AbilitySpecial[key][_key] = value_arr[i];
				}
				special_count++;
			} else if (key === '') {
				continue;
			} else if (key === 'precache') {
				let value = csv_arr[i + 1][j];
				precache[col] = value;
			} else {
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
export function UnitCSV2KV(listen_path: string): any {
	let csv = fs.readFileSync(listen_path, 'utf-8');
	// 生成kv
	let csv_data: any = {};
	let csv_arr: any = CSVParse(csv);
	const csv_key: [] = csv_arr[1];
	for (let i = 2; i < csv_arr.length; i++) {
		const row: any = csv_arr[i];
		if (row.length === 0 || row[0] === '' || row[0] === undefined) {
			continue;
		}

		let wearable_count: number = 1;
		let AttachWearables: any = {};
		let values_obj: any = {};
		// 读取多层结构
		let ReadBlock = function (index: number): any {
			let block: any = {};
			for (let i = index + 1; i < row.length; i++) {
				const col: any = row[i];
				const key: string = csv_key[i];
				if (col === '') {
					if (key.search('[{]') !== -1) {
						let [_block, j] = ReadBlock(i);
						i = j;
						if (Object.keys(_block).length > 0) {
							block[key.split('[{]')[0]] = _block;
						}
					} else if (key.search('[}]') !== -1) {
						return [block, i];
					}
					continue;
				}
				if (key === '') {
					continue;
				} else {
					block[key] = col;
				}
			}
		};
		for (let j = 1; j < row.length; j++) {
			const col = row[j];
			let key: string = csv_key[j];
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
			} else if (key === 'CanRespawn' || key === 'DisableClumpingBehavior' || key === 'UsesGestureBasedAttackAnimation' || key === 'ShouldDoFlyHeightVisual' || key === 'IsHybridFlyer') {
				if (values_obj.Creature == undefined) {
					values_obj.Creature = {};
				}
				values_obj.Creature[key] = col;
				continue;
				// 跳过没有key的值
			} else if (key === '') {
				continue;
			} else {
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
export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
export function GetVscodeResourceUri(path: string) {
	return vscode.Uri.file(path).with({ scheme: 'vscode-webview-resource' }).toString();
}
export function GetLuaScriptSnippet(filename: string, luaPath: string, context?:vscode.ExtensionContext): string {
	try {
		const templateConfig: Configuration = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles') as Configuration;
		let SnippetPath = (filename.indexOf("item_") == -1) ? ((GetRootPath() + templateConfig.ability).replace(/\\/g, "/")) : ((GetRootPath() + templateConfig.item).replace(/\\/g, "/"));
		let snippet = fs.readFileSync(SnippetPath, "utf-8");
		snippet = snippet.replace(/\[filename\]/g, filename);
		snippet = snippet.replace(/\[path\]/g, luaPath);
		return snippet;
	} catch (error) {
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
export function FormatPath(path: string): string {
	path = path.replace(/\\/g, '/');
	path = path.charAt(0).toUpperCase() + path.slice(1);
	return path;
}

// 把js的obj转成字符串
// obj:要转的数据对象 
export function Obj2Str(obj: { [k: string]: any }, bracket_left: string = "{", bracket_right: string = "}", sSeparator: string = ":", depth: number = 1): string {
	let ret = bracket_left + "\n";

	for (const key in obj) {
		const element: { [k: string]: object } = obj[key];
		for (let index = 0; index < depth; index++) {
			ret += "\t";
		}
		if (typeof (element) === "object") {
			ret += '"' + key + '"' + sSeparator + "" + Obj2Str(element, bracket_left, bracket_right, sSeparator, depth + 1) + ",";
		} else {
			if (IsNumber(element)) {
				ret += '"' + key + '"' + sSeparator + "" + element + ",";
			} else {
				ret += '"' + key + '"' + sSeparator + '"' + element + "\",";
			}
		}
		ret += "\n";
	}
	if (ret[ret.length - 1] === ",") {
		ret = ret.slice(0, -1);// 去掉最后一个逗号
	}
	for (let index = 0; index < depth - 1; index++) {
		ret += "\t";
	}
	ret += bracket_right;
	return ret;
}

export function StringToAny(str: string): any {
	if (str === "true") {
		return true;
	} else if (str === "false") {
		return false;
	} else if (!isNaN(Number(str))) {
		return Number(str);
	}
	return str;
}

/**
 * 将CSV的字符串或者数组转成Object
 * @param {any} CSV csv string 或者 any[][]
 * @param {boolean} bVertical 是否为纵向配置，每一行像这样：中文解释,key,value
 */
export function CSV2Obj(CSV: any, bVertical = false): any {
	let arrCSV: any[][] = CSV;
	if (typeof (CSV) == "string") {
		arrCSV = CSVParse(CSV);
	}

	let csvConfigs: any = {};
	if (bVertical) {
		for (let i = 0; i < arrCSV.length; i++) {
			let arrLine = arrCSV[i];
			csvConfigs[arrLine[1]] = arrLine[2];
		}
	} else {
		// 横向的至少要有三行，第一行中文，第二行key， 第三行内容
		if (arrCSV.length < 3) {
			return csvConfigs;
		}
		let keys: any[] = arrCSV[1];// 第二行 key

		for (let i = 2; i < arrCSV.length; i++) {
			let arrLine = arrCSV[i];
			let lineID: any = arrLine[0];
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

// Obj转csv
export function Obj2CSV(Obj: any) {
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
	let arrCSV: any[] = [];
	arrCSV[0] = [];
	arrCSV[1] = [];
	for (let key in __key_sc) {
		let sChineseKey = __key_sc[key];
		arrCSV[0].push(sChineseKey);
		if (key.indexOf("AttachWearables") != -1) {
			arrCSV[1].push("AttachWearables");
		} else {
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

// 是否是CSV空值
export function isEmptyCSVValue(anything: any) {
	if (anything == undefined || anything == null || anything == "") {
		return true;
	} else {
		return false;
	}
}
export function locale(): string {
	const config = JSON.parse(String(process.env.VSCODE_NLS_CONFIG));
	return config['locale'] || 'en';
}
export function EachLine(data: string | string[], callback: (index: number, line: string) => void | boolean | number, start: number = 0) {
	const rows = Array.isArray(data) ? data : data.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		let result = callback(i, rows[i]);
		if (result === true) {
			break;
		} else if (typeof(result) == "number") {
			i = result;
		}
	}
}