import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {exec} from 'child_process';

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
	if (content.search(reg) < 0) 
	{
		return {row: 0, col: 0};
	}
	const rows = content.split(os.EOL);
	// 分行查找只为了拿到行
	for(let i = 0; i < rows.length; i++) {
		let col = rows[i].search(reg);
		if(col >= 0) {
			return {row: i, col};
		}
	}
	return {row: 0, col: 0};
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
    const resourcePath = GetExtensionFileAbsolutePath(context, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}
/**
 * 取出中括号内的内容
 * @param text
 * @returns {string}
 */
export function GetBracketStr(text: string): string {
    let result = '';
    if (text === ''){
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

/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
export function GetParenthesesStr(text: string): string {
	let result = '';
    if (text === ''){
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
export function ReadFunction(line: number, rows: any):any {
	let fun_info: {[k: string]: any} = {};
	let param_list: {[k: string]: any} = {};
	let end_line: number = 0;
	for (let index = line; index < rows.length; index++) {
		const text = rows[index];
		let option = rows[index].match(/---\[\[.*\]\]/g);
		if (option !== null && option.length > 0) {
			fun_info.description = text.substr(6, text.length - 9);
		} else if (text.search('-- @return') !== -1) {
			fun_info.return = text.substr(11, text.length);
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
				fun_info.class = 'Globals';
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
	return [fun_info,end_line];
}
export function ReadEnum(line: number, rows: any):any {
	let enum_list: any[] = [];
	let end_line: number = 0;
	for (let index = line + 1; index < rows.length; index++) {
		let enum_info: {[k: string]: any} = {};
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
		enum_list.push(enum_info);
	}
	return [enum_list, end_line];
}
export function GetNoteAPIContent(fun_info: any, context: vscode.ExtensionContext):string {
	let content = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Dota2 API</title>
			<link rel="stylesheet" href="`+ vscode.Uri.file(path.join(context.extensionPath,'lib','Skeleton-2.0.4','css','skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
		</head>
		<body>
			<h4>` + fun_info.function + `</h4>
			<h5>Function Description</h5>
			<textarea id="description" class="u-full-width" onkeydown="tab(this)">` + fun_info.description + `</textarea>` + 
			AddParams() + `
			<h5>Example</h5>
			<textarea id="example" class="u-full-width" style="height:300px;" onkeydown="tab(this)">` + fun_info.example + `</textarea>
			<button class="button-primary" onclick="Confirm()">确认</button>
			<script src="` + vscode.Uri.file(path.join(context.extensionPath,'resource','view','dota2api.js')).with({ scheme: 'vscode-resource' }).toString() + `"></script>
			<script src="../../src/view/test-webview.js"></script>
		</body>
		</html>
	`;
	return content;
	function AddParams():string {
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
						`+ AddParameter(fun_info.params) +`
					</tbody>
				</table>`;
		}
		
		return s;
	}
	function AddParameter(params:any):string {
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
			<link rel="stylesheet" href="`+ vscode.Uri.file(path.join(context.extensionPath,'lib','Skeleton-2.0.4','css','skeleton.css')).with({ scheme: 'vscode-resource' }).toString() + `">
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
			<script src="` + vscode.Uri.file(path.join(context.extensionPath,'resource','view','dota2api.js')).with({ scheme: 'vscode-resource' }).toString() + `"></script>
			<script src="../../src/view/test-webview.js"></script>
		</body>
		</html>
	`;
	return content;
}