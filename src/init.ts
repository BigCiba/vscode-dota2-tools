import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';
import { isObject, log, print } from 'util';
import * as os from 'os';
import * as ftp from 'ftp';
import {Listener} from './listener';
import { APIType, ApiTreeProvider } from './api-tree';
import { Func } from 'mocha';
let KV2LUA:any = {};	// kv与lua文件关联数据
let VSND = new Array;
let GameDir:string = '';	// game目录
let ContentDir:string = '';	// content目录
let ApiNote:string = '';	// api_note.json
let ApiTree: ApiTreeProvider;	// ApiTreeProvider
let class_list: any;
let enum_list: any;
let func_api_parse:any;
// tslint:disable-next-line: no-unused-expression
export {KV2LUA, VSND, GameDir, ContentDir, ApiTree};
export function UpDataApiNote(note: string) {
	ApiNote = note;
	[class_list, enum_list] = func_api_parse();
	ApiTree.reopen();
}
export function GetApiNote() {
	return ApiNote;
}
export function GetClassList() {
	return class_list;
}
export function GetEnumList() {
	return enum_list;
}
export function PullAPINote(infoType: any, funInfo: any, callback: (info:any)=>void) {
	let noteServerConfig: vscode.WorkspaceConfiguration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
	if (noteServerConfig !== undefined) {
		let ftpClient = new ftp();
		ftpClient.connect({
			host: noteServerConfig.host,
			port: noteServerConfig.port,
			user: noteServerConfig.user,
			password: noteServerConfig.password,
		});
		ftpClient.on('ready', function() {
			ftpClient.get(noteServerConfig !== undefined ? noteServerConfig.filename:'api_note.json', async function(err, stream) {
				if (err) {
					vscode.window.setStatusBarMessage('API Note下载超时');
					throw err
				};
				vscode.window.setStatusBarMessage('API Note下载成功');
				let result: string = '';
				for await (const chunk of stream) {
					result += chunk;
				}
				ApiNote = result;
				// console.log(JSON.parse(ApiNote).Global);
				[class_list, enum_list] = func_api_parse();
				
				if (infoType == APIType.Function) {
					for (let index = 0; index < class_list[funInfo.class].length; index++) {
						const element = class_list[funInfo.class][index];
						if (element.function == funInfo.function) {
							callback(element);
						}
					}
				} else if (infoType == APIType.Enum) {
					for (const enum_name in enum_list) {
						const enum_arr = enum_list[enum_name];
						for (let i = 0; i < enum_arr.length; i++) {
							const enum_info = enum_arr[i];
							if (enum_info.name === funInfo.name) {
								callback(enum_info);
							}
						}
					}
				}
				ftpClient.end();
			});
		});
	}
}
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
	// 读取ApiNote
	ApiNote = fs.readFileSync(context.extensionPath + '/resource/api_note.json', 'utf-8');
	// 从服务器读取API Note， 读取配置信息
	let noteServerConfig: vscode.WorkspaceConfiguration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
	if (noteServerConfig !== undefined) {
		let ftpClient = new ftp();
		ftpClient.connect({
			host: noteServerConfig.host,
			port: noteServerConfig.port,
			user: noteServerConfig.user,
			password: noteServerConfig.password,
		});
		ftpClient.on('ready', function() {
			ftpClient.get(noteServerConfig !== undefined ? noteServerConfig.filename:'api_note.json', async function(err, stream) {
				if (err) {
					vscode.window.setStatusBarMessage('API Note下载超时');
					throw err
				};
				vscode.window.setStatusBarMessage('API Note下载成功');
				let result: string = '';
				for await (const chunk of stream) {
					result += chunk;
				}
				ApiNote = result;
				// console.log(JSON.parse(ApiNote).Global);
				[class_list, enum_list] = APIParse();
				ApiTree.reopen();
				ftpClient.end();
			});
		});
	}
	[class_list, enum_list] = APIParse();
	ApiTree = new ApiTreeProvider(context, class_list, enum_list);
	vscode.window.registerTreeDataProvider('dota2apiExplorer', ApiTree);
	function APIParse() {
		let api_note = JSON.parse(ApiNote);
		let PraseFile = function (sDotaScriptHelp:string): any[] {
			const rows = sDotaScriptHelp.split(os.EOL);
			let class_list: { [k: string]: any } = {};
			let enum_list: { [k: string]: any } = {};
			for (let i = 0; i < rows.length; i++) {
				// 函数
				let option = rows[i].match(/---\[\[.*\]\]/g);
				if (option !== null && option.length > 0) {
					let [fun_info, new_line] = util.ReadFunction(i, rows);
					if ((api_note[fun_info.class] !== undefined && api_note[fun_info.class][fun_info.function] !== undefined) || api_note[fun_info.function] !== undefined) {
						let note = (api_note[fun_info.class] !== undefined && api_note[fun_info.class][fun_info.function] !== undefined) ? api_note[fun_info.class][fun_info.function] : api_note[fun_info.function];
						
						fun_info.description = note.description;
						for (const params_name in fun_info.params) {
							const params_info = fun_info.params[params_name];
							params_info.params_name = note.params[params_name].params_name;
							params_info.description = note.params[params_name].description;
						}
						fun_info.example = note.example;
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
					let [enum_info, new_line] = util.ReadEnum(i, rows);
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
			return [class_list, enum_list];
		}
		let Combine = function (class_list: any, class_list_cl: any) {
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
			// 补充client api
			for (const class_name in class_list_cl) {
				const fun_list = class_list_cl[class_name];
				for (let i = 0; i < fun_list.length; i++) {
					const fun_info = fun_list[i];
					let bHasServer = false;
					for (let i = 0; i < class_list[class_name.replace('C_', 'C')].length; i++) {
						const server_fun_info = class_list[class_name.replace('C_', 'C')][i];
						if (fun_info.function == server_fun_info.function) {
							bHasServer = true;
							break;
						}
					}
					if (bHasServer == false) {
						fun_info.server = false;
						fun_info.client = true;
						fun_info.class = undefined;
						fun_info.class_cl = class_name.replace('C_', 'C');
						class_list[class_name.replace('C_', 'C')].push(fun_info);
					}
				}
			}
			//重新排序
			for (const class_name in class_list) {
				let fun_list = class_list[class_name];
				let sort_func_list:any[] = [];
				let funcName = [];
				for (let i = 0; i < fun_list.length; i++) {
					const fun_info = fun_list[i];
					funcName.push(fun_info.function);
				}
				funcName.sort();
				for (let i = 0; i < funcName.length; i++) {
					for (let j = 0; j < fun_list.length; j++) {
						if (funcName[i] == fun_list[j].function) {
							sort_func_list.push(fun_list[j]);
							break;
						}
					}
				}
				class_list[class_name] = sort_func_list;
			}
		}
		let sHelp: string = path.join(context.extensionPath, "resource/dota_script_help2.lua");
		let sHelpClient: string = path.join(context.extensionPath, "resource/dota_cl_script_help2.lua");
		let [class_list, enum_list] = PraseFile(fs.readFileSync(sHelp, 'utf-8'));
		let [class_list_cl, enum_list_cl] = PraseFile(fs.readFileSync(sHelpClient, 'utf-8'));
		Combine(class_list, class_list_cl);

		// modifier function 对应
		let modifierfunctionPath:string|undefined = vscode.workspace.getConfiguration().get('dota2-tools.modifierfunction path');
		if (modifierfunctionPath !== undefined && modifierfunctionPath !== '') {
			let modifierfunction = 'return {\n';
			for (const property in enum_list.modifierfunction) {
				const element = enum_list.modifierfunction[property];
				modifierfunction += `	${element.name} = "${element.function||''}",
`;
			}
			modifierfunction += '}';
			
			fs.writeFileSync(path.join(GameDir , modifierfunctionPath), modifierfunction);
		}
		return [class_list, enum_list];
	}
	func_api_parse = APIParse;

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
	if (await util.GetStat(GameDir + '/scripts/npc/npc_abilities_custom.txt') === false) {
		return;
	}
	let ability_kv: any = await util.ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_abilities_custom.txt');
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
			// console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
			// console.log(new RegExp(`"ScriptFile"`).test(line.text));
			
			if (new RegExp(`"ScriptFile"`).test(line.text)) {
				let lua_path = line.text.split('"')[3];
				let destPath = `${GameDir}/scripts/vscripts/${lua_path}.lua`;
				// console.log(destPath);
				
				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				} else {
					util.DirExists(path.dirname(destPath));
					fs.writeFileSync(destPath, util.GetLuaScriptSnippet(path.basename(lua_path).replace('.lua',''), lua_path));
				}
			}
		}
	}
	let def_jump = vscode.languages.registerDefinitionProvider([{pattern: '**/*.txt'},{pattern: '**/*.kv'}], {provideDefinition});
	context.subscriptions.push(def_jump);

	// 强行运行一遍csv转kv
	const ability_excel_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
	const ability_kv_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
	if (ability_excel_object === undefined || ability_kv_object === undefined) {
		return;
	}
	for (const index in ability_excel_object) {
		let listen_path = ability_excel_object[index].replace(/\\\\/g,'/');
		let file_type:vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
		if (file_type === vscode.FileType.Directory) {
			let files:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
			for (let i: number = 0; i < files.length; i++) {
				let [file_name, is_file] = files[i];
				if (file_name === undefined || file_name.search(/~\$/) !== -1) {
					continue;
				}
				if (is_file === vscode.FileType.File){
					let file_path: string = listen_path + '/' + file_name;
					let csv_path: string = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
					if (fs.existsSync(csv_path)) {
						fs.writeFileSync(ability_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({KeyValue:util.AbilityCSV2KV(csv_path)}));
					}
				}
			}
		} else if (file_type === vscode.FileType.File) {
			listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
			if (fs.existsSync(listen_path)) {
				fs.writeFileSync(ability_kv_object[index], util.WriteKeyValue({KeyValue:util.AbilityCSV2KV(listen_path)}));
			}
		}
	}
	const unit_excel_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
	const unit_kv_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
	if (unit_excel_object === undefined || unit_kv_object === undefined) {
		return;
	}
	for (const index in unit_excel_object) {
		let listen_path = unit_excel_object[index].replace(/\\\\/g,'/');
		let file_type:vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
		if (file_type === vscode.FileType.Directory) {
			let files:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
			for (let i: number = 0; i < files.length; i++) {
				let [file_name, is_file] = files[i];
				if (file_name === undefined || file_name.search(/~\$/) !== -1) {
					continue;
				}
				if (is_file === vscode.FileType.File){
					let file_path: string = listen_path + '/' + file_name;
					let csv_path: string = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
					fs.writeFileSync(unit_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({KeyValue:util.UnitCSV2KV(csv_path)}));
				}
			}
		} else if (file_type === vscode.FileType.File) {
			
			listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
			console.log(listen_path);
			fs.writeFileSync(unit_kv_object[index], util.WriteKeyValue({KeyValue:util.UnitCSV2KV(listen_path)}));
		}
	}
}