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