import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';
import { isObject, log } from 'util';
let KV2LUA:any = {};	// kv与lua文件关联数据
let VSND = new Array;
let GameDir:string = '';	// game目录
let ContentDir:string = '';	// content目录
// tslint:disable-next-line: no-unused-expression
export {KV2LUA, VSND, GameDir, ContentDir};

export async function Init(context: vscode.ExtensionContext) {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	
	// 读取目录
	let path_arr: string[]|false = await FindFile(root_path, 'maps');
	if (path_arr !== false) {
		[ContentDir, GameDir] = path_arr;
		console.log(GameDir);
		
	}
	async function FindFile(path:string, file_name:string):Promise<string[]|false> {
		let path_arr: string[] = [];
		var lang_folders:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
		for (let i: number = 0; i < lang_folders.length; i++) {
			const [folder_name, is_directory] = lang_folders[i];
			if (folder_name === '.git') {
				continue;
			}
			if (folder_name === file_name) {
				path_arr.push(path);
			}
			if (Number(is_directory) === vscode.FileType.Directory || Number(is_directory) === vscode.FileType.SymbolicLink + vscode.FileType.Directory){
				let bFind: string[]|false = await FindFile(path + '\\' + folder_name, file_name);
				if (bFind !== false) {
					path_arr = path_arr.concat(bFind);
				}
			}
		}
		if (path_arr.length === 0) {
			return false;
		} else {
			return path_arr;
		}
	}
	// vsnd
	let obj_data:any = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/soundevents.json', 'utf-8'));
	// 添加选项
	for (const key in obj_data) {
		const element = obj_data[key];
		for (let i = 0; i < element.length; i++) {
			const sound = element[i];
			VSND.push({
				label:sound,
				description:key,
			});
		}
	}

	// 关联kv与lua
	let ability_kv = util.ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_abilities_custom.txt');
	for (const key in ability_kv.DOTAAbilities) {
		const value = ability_kv.DOTAAbilities[key];
		if (isObject(value) === true) {
			KV2LUA[key] = GameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
		}
	}

	function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		const fileName	= document.fileName;
		const workDir	 = path.dirname(fileName);
		const word		= document.getText(document.getWordRangeAtPosition(position));
		const line:vscode.TextLine = document.lineAt(position);
	
		// console.log('====== 进入 provideDefinition 方法 ======');
		// console.log('fileName: ' + fileName); // 当前文件完整路径
		// console.log('workDir: ' + workDir); // 当前文件所在目录
		// console.log('word: ' + word); // 当前光标所在单词
		// console.log('line: ' + line.text); // 当前光标所在行
		// console.log();
		
		// 只处理package.json文件
		if (/.*\.kv/.test(fileName) || /.*\.txt/.test(fileName)) {
			const json = document.getText();
			console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
			
			if (new RegExp(`"ScriptFile"`).test(json)) {
				let path = line.text.split('"')[3];
				let destPath = `${GameDir}/scripts/vscripts/${path}.lua`;
				console.log(destPath);
				
				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				}
			}
		}
	}
	let def_jump = vscode.languages.registerDefinitionProvider([{pattern: '**/*.txt'},{pattern: '**/*.kv'}], {provideDefinition});
	context.subscriptions.push(def_jump);
}