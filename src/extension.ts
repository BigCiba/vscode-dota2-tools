// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from './util';
import * as watch from 'watch';
// import { DepNodeProvider, Dependency } from './nodeDependencies';
import { ApiTreeProvider, Dependency } from './api-tree';
import { on } from 'cluster';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// passport: zut3ehvut7muv26u5axcbmnv6wlgkdxcsabxvjl4i6rbvwkgpmrq
	console.log('Congratulations, your extension "dota2-tools" is now active!');
	// 获取根目录
	function GetRootPath():string|undefined {
		const folders: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		if (folders !== undefined) {
			return folders[0].uri.fsPath;
		} else {
			return;
		}
	}
	// 读取kv文件
	async function ReadKeyValue(uri:vscode.Uri) {
		function NewTable(start_line:number,document:vscode.TextDocument):any {
			var obj: {[k: string]: any} = {};
			var left_brackets:number = 0;	// 记录{数量
			var right_brackets:number = 0;	// 记录}数量
			for (let line = start_line; line < document.lineCount; line++) {
				var text_line: vscode.TextLine = document.lineAt(line);
				var lineText = text_line.text;
				// var lineText = document.getText(new vscode.Range(new vscode.Position(line,0),new vscode.Position(line,100)));
				var left_brackets_arr = lineText.match('{');
				if (left_brackets_arr !== null) {
					left_brackets += left_brackets_arr.length;
				}
				var right_brackets_arr = lineText.match('}');
				if (right_brackets_arr !== null) {
					right_brackets += right_brackets_arr.length;
				}
				if (left_brackets !== 0 && left_brackets === right_brackets) {
					return [obj,line];
				}
				if (lineText.search('//') !== -1) {
					if (text_line.firstNonWhitespaceCharacterIndex === lineText.indexOf('//')) {
						continue;

					}
				}
				var arr = lineText.match(/"/g);
				if (arr !== null) {
					if (arr.length === 2) {
						var [new_obj, next_line] = NewTable(line + 1,document);
						obj[lineText.split('"')[1]] = new_obj;
						line = next_line;
					}
					if (arr.length === 4) {
						obj[lineText.split('"')[1]] = lineText.split('"')[3];
						continue;
					}
				}
			}
		}
		let document:vscode.TextDocument = await vscode.workspace.openTextDocument(uri);
		var obj: {[k: string]: any} = {};
		for (let line = 0; line < document.lineCount; line++) {
			var lineText = document.lineAt(line).text;
			var arr = lineText.match(/"/g);
			if (arr !== null) {
				if (arr.length === 2) {
					var [new_obj, next_line] = NewTable(line + 1,document);
					obj[lineText.split('"')[1]] = new_obj;
					line = next_line;
					continue;
				}
			}
		}
		return obj;
	}
	function WriteKeyValue(obj:any,depth:number) {
		var str:string = '';
		// 添加制表符
		function AddDepthTab(depth:number,add_string:string):string {
			var tab:string = '';
			for (let d = 0; d < depth; d++) {
				tab += '\t';
			}
			tab += add_string;
			return tab;
		}
		// 添加key与value之间制表符
		function AddIntervalTab(depth:number,key:string):string {
			var tab:string = '';
			for (let d = 0; d < 12 - Math.floor((depth * 4 + key.length + 2)/4); d++) {
				tab += '\t';
			}
			return tab;
		}
		for (const key in obj) {
			const value = obj[key];
			if (typeof(value) === 'string') {
				str += AddDepthTab(depth, '"' + key + '"');
				str += AddIntervalTab(depth, key);
				str += '"' + value + '"\n';
			} else {
				str += AddDepthTab(depth, '"' + key + '"\n');
				str += AddDepthTab(depth, '{\n');
				str += WriteKeyValue(value,depth + 1);
				str += AddDepthTab(depth, '}\n');
			}
		}
		return str;
	}
	// 解析技能kv
	function WriteAbilitiesKV(obj:any,depth:number,hero_name:string) {
		var str:string = '';
		// 添加制表符
		function AddDepthTab(depth:number,add_string:string):string {
			var tab:string = '';
			for (let d = 0; d < depth; d++) {
				tab += '\t';
			}
			tab += add_string;
			return tab;
		}
		// 添加key与value之间制表符
		function AddIntervalTab(depth:number,key:string):string {
			var tab:string = '';
			for (let d = 0; d < 12 - Math.floor((depth * 4 + key.length + 2)/4); d++) {
				tab += '\t';
			}
			return tab;
		}
		for (const key in obj) {
			if (key === 'ID') {
				continue;
			}
			const value = obj[key];
			if (typeof(value) === 'string') {
				str += AddDepthTab(depth, '"' + key + '"');
				str += AddIntervalTab(depth, key);
				str += '"' + value + '"\n';
			} else {
				str += AddDepthTab(depth, '"' + key + '"\n');
				str += AddDepthTab(depth, '{\n');
				if (depth === 1) {
					// str += AddDepthTab(depth, '// General\n//-------------------------------------------------------------------------------------------------------------\n');
					str += AddDepthTab(depth + 1, '"BaseClass"' + AddIntervalTab(depth + 1, 'BaseClass') + '"ability_lua"\n');
					str += AddDepthTab(depth + 1, '"ScriptFile"' + AddIntervalTab(depth + 1, 'ScriptFile') + '"abilities/' + hero_name + '/' + key +'"\n');
					str += AddDepthTab(depth + 1, '"AbilityTextureName"' + AddIntervalTab(depth + 1, 'AbilityTextureName') + '"' + key.split('_imba')[0] + '"\n');
					if (value.AbilityType !== undefined && value.AbilityType === 'DOTA_ABILITY_TYPE_ULTIMATE') {
						str += AddDepthTab(depth + 1, '"MaxLevel"' + AddIntervalTab(depth + 1, 'MaxLevel') + '"3"\n');
						str += AddDepthTab(depth + 1, '"RequiredLevel"' + AddIntervalTab(depth + 1, 'RequiredLevel') + '"6"\n');
						str += AddDepthTab(depth + 1, '"LevelsBetweenUpgrades"' + AddIntervalTab(depth + 1, 'LevelsBetweenUpgrades') + '"6"\n');
					} else {
						str += AddDepthTab(depth + 1, '"MaxLevel"' + AddIntervalTab(depth + 1, 'MaxLevel') + '"4"\n');
						str += AddDepthTab(depth + 1, '"RequiredLevel"' + AddIntervalTab(depth + 1, 'RequiredLevel') + '"1"\n');
						str += AddDepthTab(depth + 1, '"LevelsBetweenUpgrades"' + AddIntervalTab(depth + 1, 'LevelsBetweenUpgrades') + '"2"\n');
					}
				}
				str += WriteAbilitiesKV(value,depth + 1,hero_name);
				str += AddDepthTab(depth, '}\n');
			}
		}
		return str;
	}
	async function LoadKeyValue(uri: vscode.Uri) {
		const document: vscode.TextDocument = await vscode.workspace.openTextDocument(uri);
		var state: string = 'NONE';
		var state_save: string = 'NONE';
		var key_value = {
			key: '',
			value: '',
			AddKey(char: string){this.key += char;},
			AddValue(char: string){this.value += char;},
			Clear(){this.key = ''; this.value = '';},
		};
		var obj: {[k: string]: any} = {};
		var text_data = document.getText();
		var Next = (index: number) => text_data[index + 1];
		var NewTable = (index: number):any => {
			let state: string = 'NONE';
			let state_save: string = 'NONE';
			let key_value = {
				key: '',
				value: '',
				AddKey(char: string){this.key += char;},
				AddValue(char: string){this.value += char;},
				Clear(){this.key = ''; this.value = '';},
			};
			let obj: {[k: string]: any} = {};
			for (let i = index; i < text_data.length; i++) {
				const char = text_data[i];
				if (state === 'NOTE') {
					if (char === '\n') {
						state = state_save;
						continue;
					} else {
						continue;
					}
				}
				if (char === '"') {
					if (state === 'NONE' || state === 'VALUE_END' || state === 'TABLE_END') {
						state = 'KEY';
						continue;
					} else if (state === 'KEY') {
						state = 'KEY_END';
						continue;
					} else if (state === 'KEY_END') {
						state = 'VALUE';
						continue;
					} else if (state === 'VALUE') {
						state = 'VALUE_END';
						obj[key_value.key] = key_value.value;
						key_value.Clear();
						continue;
					}
				} else if (char === '{') {
					if (state === 'KEY_END') {
						state = 'TABLE';
						let [new_obj, index] = NewTable(i + 1);
						obj[key_value.key] = new_obj;
						i = index;
						key_value.Clear();
						state = 'TABLE_END';
						continue;
					}
				} else if (char === '}') {
					return [obj,i];
				} else if (char === '/' && state !== 'NOTE') {
					if (Next(i) === '/') {
						i += 1;
						state_save = state;
						state = 'NOTE';
						// newtable
						continue;
					}
				}
				if (state === 'KEY') {
					key_value.AddKey(char);
				} else if (state === 'VALUE') {
					key_value.AddValue(char);
				}
			}
		};
		for (let i = 0; i < text_data.length; i++) {
			const char = text_data[i];
			if (state === 'NOTE') {
				if (char === '\n') {
					state = state_save;
					continue;
				} else {
					continue;
				}
			}
			if (char === '"') {
				if (state === 'NONE' || state === 'VALUE_END' || state === 'TABLE_END') {
					state = 'KEY';
					continue;
				} else if (state === 'KEY') {
					state = 'KEY_END';
					continue;
				} else if (state === 'KEY_END') {
					state = 'VALUE';
					continue;
				} else if (state === 'VALUE') {
					state = 'VALUE_END';
					obj[key_value.key] = key_value.value;
					key_value.Clear();
					continue;
				}
			} else if (char === '{') {
				if (state === 'KEY_END') {
					state = 'TABLE';
					let [new_obj, index] = NewTable(i + 1);
					obj[key_value.key] = new_obj;
					key_value.Clear();
					i = index;
					state = 'TABLE_END';
					continue;
					// newtable
				}
			} else if (char === '/' && state !== 'NOTE') {
				if (Next(i) === '/') {
					i += 1;
					state_save = state;
					state = 'NOTE';
					// newtable
					continue;
				}
			}
			if (state === 'KEY') {
				key_value.AddKey(char);
			} else if (state === 'VALUE') {
				key_value.AddValue(char);
			}
		}
		return obj;
	}

	// 合并文本
	let Localization = vscode.commands.registerCommand('extension.Localization', async () => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const localization_path: string = root_path + '/game/dota_addons/dota_imba/localization';
		var lang_folders:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		for (let i: number = 0; i < lang_folders.length; i++) {
			const [folder_name, is_directory] = lang_folders[i];
			if (Number(is_directory) === vscode.FileType.Directory){
				const language_path: string = localization_path + '/' + folder_name;
				var language: string = '"lang"\n{\n\t"Language"\t\t"' + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + '"\n\t"Tokens"\n\t{\n';
				var promise: string = await ReadLanguage(language_path);
				language += promise;
				language += '\t}\n}';
				fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt',language);
				// var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
				// text_editor.edit(function (edit_builder) {
				// 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
				// 	edit_builder.insert(new vscode.Position(0,0),language);
				// });
			}
		}
		async function ReadLanguage(path:string):Promise<string> {
			var lang:string = '';
			var files:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
			for (let i = 0; i < files.length; i++) {
				const [file_name,file_type] = files[i];
				if (Number(file_type) === vscode.FileType.File) {
					var document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + file_name);
					for (let line: number = 0; line < document.lineCount; line++) {
						const lineText: string = document.lineAt(line).text;
						lang += '\t\t' + lineText + '\n';
					}
					lang += '\n';
				} else if (Number(file_type) === vscode.FileType.Directory) {
					var promise: string = await ReadLanguage(path + '/' + file_name);
					lang += promise;
				}
			}
			return Promise.resolve(lang);
		}
	});

	// 监听文本变更
	async function WatchLocalization() {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		// const nodeDependenciesProvider = new ApiTreeProvider(root_path);
		// vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
		// const view = vscode.window.createTreeView('nodeDependencies', { treeDataProvider: nodeDependenciesProvider, showCollapseAll: true });
		// https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/
		watch.watchTree(root_path + '/game/dota_addons/dota_imba/localization', function (f, curr, prev) {
			if (typeof f === "object" && prev === null && curr === null) {
				// Finished walking the tree
			} else if (prev === null) {
				// f is a new file
				// console.log('f is a new file');
				vscode.commands.executeCommand('extension.Localization');
			} else if (curr.nlink === 0) {
				// f was removed
				// console.log('f was removed');
				vscode.commands.executeCommand('extension.Localization');
			} else {
				// f was changed
				// console.log('f was changed');
				vscode.commands.executeCommand('extension.Localization');
			}
		});
		// vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		// 	if (document.uri.fsPath.search('localization') !== -1) {
		// 		vscode.commands.executeCommand('extension.Localization');
		// 	}
		// });
	}
	WatchLocalization();

	// 版本控制
	function WatchVersion() {
		// sGameVersion
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const setting: string = fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/settings.lua', 'utf-8');
		const rows: string[] = setting.split(os.EOL);
		let version: string = 'v0.01';
		for(let i = 0; i < rows.length; i++) {
			const line_text: string = rows[i];
			if (line_text.search('sGameVersion') !== -1) {
				version = line_text.split('\'')[1];
			}
		}
		const version_data = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', 'utf-8'));
		if (version_data[version] === undefined) {
			version_data[version] = {
				AddFile: {
					lua: [],
					kv: [],
				},
				DeleteFile: {
					lua: [],
					kv: [],
				},
				ChangeFile: {
					lua: [],
					kv: [],
				},
			};
		}

		watch.watchTree(root_path + '/game/dota_addons/dota_imba', function (f, curr, prev) {
			if (typeof f === "object" && prev === null && curr === null) {
				// Finished walking the tree
			} else if (prev === null) {
				// f is a new file
				// console.log('f is a new file');
				if (typeof f === "string") {
					let [file_name, ext] = util.GetFileInfo(f);
					if (ext === 'lua') {
						version_data[version].AddFile.lua.push(file_name);
						console.log(version_data[version].AddFile.lua);
						fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', JSON.stringify(version_data));
					}
				}
			} else if (curr.nlink === 0) {
				// f was removed
				// console.log('f was removed');
				console.log(f);
			} else {
				// f was changed 
				// console.log('f was changed');
				console.log(f);
				console.log(curr);
				console.log(prev);
			}
		});
	}
	WatchVersion();

	// 添加英雄基本文件
	let AddHero = vscode.commands.registerCommand('extension.AddHero', async () => {
		let root_path: string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let addon_path: string|undefined = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
		if (addon_path === undefined || addon_path === '') {
			vscode.window.showErrorMessage('请设置dota2项目路径','设置').then(function () {
				vscode.window.showInputBox({
					password:false,
					ignoreFocusOut:true,
					value: 'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
					prompt:'示例：C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
				}).then(async function(msg){
					if (msg !== undefined) {
						await vscode.workspace.fs.readDirectory(vscode.Uri.file(msg));
						vscode.workspace.getConfiguration().update('dota2-tools.addon_path',msg,true);
					}
				});
			});
			return;
		}
		// 读取英雄资料
		const npc_heroes_uri:vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_heroes.txt');
		const npc_abilities_uri:vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_abilities.txt');
		let heroes_data:{[k: string]: any} = await LoadKeyValue(npc_heroes_uri);
		let abilities_data:{[k: string]: any} = await LoadKeyValue(npc_abilities_uri);
		// 选择英雄
		const quick_pick:vscode.QuickPick<vscode.QuickPickItem> = vscode.window.createQuickPick();
		quick_pick.canSelectMany = false;
		quick_pick.ignoreFocusOut = true;
		quick_pick.placeholder = '英雄名字';
		quick_pick.title = '选择创建的英雄';

		// 添加选项
		var items:vscode.QuickPickItem[] = new Array;
		for (const key in heroes_data.DOTAHeroes) {
			if (heroes_data.DOTAHeroes.hasOwnProperty(key) && key !== 'Version' && key !== 'npc_dota_hero_base') {
				items.push({
					label:key,
				});
			}
		}
		quick_pick.items = items;
		quick_pick.show();

		quick_pick.onDidChangeSelection(async (t)=>{
			quick_pick.hide();
			quick_pick.value = t[0].label;
			const hero_name = quick_pick.value;
			const hero_name_lite = hero_name.substr(14,hero_name.length);
			// 原版数据
			const scripts_path: string = root_path + '/game/dota_addons/dota_imba/scripts';
			// 添加npc_heroes_custom
			var ability_override: any[] = new Array;
			var text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_heroes_custom.txt'));
			text_editor.edit(function (edit_builder) {
				let abilities:string = 
				'\t\t"Ability1"\t\t"hidden_1"\n' +
				'\t\t"Ability2"\t\t"hidden_2"\n' +
				'\t\t"Ability3"\t\t"hidden_3"\n' +
				'\t\t"Ability4"\t\t"hidden_4"\n' +
				'\t\t"Ability5"\t\t"hidden_5"\n' +
				'\t\t"Ability6"\t\t"hidden_ultimate"\n' +
				'\t\t"NormalAbilities"\n' +
				'\t\t{\n';
				for (const key in heroes_data.DOTAHeroes[hero_name]) {
					if (key.search('Ability[1-9]') !== -1) {
						let ability_name = heroes_data.DOTAHeroes[hero_name][key];
						if (ability_name.search('special_bonus') !== -1) {
							continue;
						}
						if (ability_name.search('generic_hidden') === -1) {
							ability_override.push(ability_name);
							ability_name += '_imba';
						}
						let ability_index = key.substr(7,8);
						if (ability_index !== '6') {
							abilities += '\t\t\t"' + key.substr(7,8) + '"\t\t\t"' +  ability_name + '"\n';
						} else {
							abilities += '\t\t\t"ultimate"\t"' +  ability_name + '"\n';
						}
					}
				}
				abilities += 
				'\t\t}\n' +
				'\t\t"CustomAbilityDraftAbilities"\n' +
				'\t\t{\n';
				for (const key in heroes_data.DOTAHeroes[hero_name]) {
					if (key.search('Ability[1-9]') !== -1) {
						let ability_name = heroes_data.DOTAHeroes[hero_name][key];
						if (ability_name.search('generic_hidden') === -1 && ability_name.search('special_bonus') === -1) {
							ability_name += '_imba';
							let ability_index = key.substr(7,8);
							if (ability_index === '6') {
								abilities += '\t\t\t"ultimate"\t"' +  ability_name + '"\n';
							} else if (Number(ability_index) < 4) {
								abilities += '\t\t\t"' + key.substr(7,8) + '"\t\t\t"' +  ability_name + '"\n';
							}
						}
					}
				}
				abilities += '\t\t}\n';
				edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1,0), '\t"' + quick_pick.value + '"\n\t{\n' + abilities + '\t}\n');
			});
			// 添加herolist
			text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/herolist.txt'));
			text_editor.edit(function (edit_builder) {
				var AddTab = function (length:number):string {
					var tab:string = '';
					for (let d = 0; d < 10 - Math.floor((4 + length + 2)/4); d++) {
						tab += '\t';
					}
					return tab;
				};
				edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1,0), '\t"' + hero_name + '"' + AddTab(hero_name.length) + '"1"\n');
			});
			// 添加npc_abilities_custom
			text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_abilities_custom.txt'));
			text_editor.edit(function (edit_builder) {
				edit_builder.insert(new vscode.Position(0,0), '#base "abilities/heroes/' + hero_name_lite + '.kv"\n');
			});
			// 添加技能KV
			const ability_kv_uri = vscode.Uri.file(scripts_path + '/npc/abilities/heroes/' + hero_name_lite + '.kv');
			await vscode.workspace.fs.writeFile(ability_kv_uri,new Uint8Array);
			text_editor = await vscode.window.showTextDocument(ability_kv_uri);
			text_editor.edit(function (edit_builder) {
				var ability_data:{[k: string]: any} = {};
				var ability:object = {
					[hero_name_lite]:ability_data,
				};
				ability_override.forEach(ability_name => {
					ability_data[ability_name + '_imba'] = abilities_data.DOTAAbilities[ability_name];
				});
				edit_builder.insert(new vscode.Position(0,0), WriteAbilitiesKV(ability,0,hero_name_lite));
			});
			// 初始化技能lua
			for (let i = 0; i < ability_override.length; i++) {
				const ability = ability_override[i] + '_imba';
				const ability_lua_uri = vscode.Uri.file(scripts_path + '/vscripts/abilities/' + hero_name_lite + '/' + ability + '.lua');
				await vscode.workspace.fs.writeFile(ability_lua_uri,new Uint8Array);
				text_editor = await vscode.window.showTextDocument(ability_lua_uri);
				await text_editor.edit(async function (edit_builder) {
					var lua_data:string = '';
					lua_data += 'LinkLuaModifier("modifier_' + ability + '", "abilities/' + hero_name_lite + '/' + ability + '.lua", LUA_MODIFIER_MOTION_NONE)\n';
					lua_data += '--Abilities\n';
					lua_data += 'if ' + ability + ' == nil then\n';
					lua_data += '\t' + ability + ' = class({})\n';
					lua_data += 'end\n';
					lua_data += '---------------------------------------------------------------------\n';
					lua_data += '-- Modifiers\n';
					lua_data += 'if modifier_' + ability + ' == nil then\n';
					lua_data += '\tmodifier_' + ability + ' = class({})\n';
					lua_data += 'end\n';
					edit_builder.insert(new vscode.Position(0, 0), lua_data);
				});
			}
			// 写入技能描述
			const abilities_schinese_uri:vscode.Uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_schinese.txt');
			const abilities_english_uri:vscode.Uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_english.txt');
			// 中文
			let document_schinese:vscode.TextDocument = await vscode.workspace.openTextDocument(abilities_schinese_uri);
			let sub_text:string = '';
			for (let line = 0; line < document_schinese.lineCount; line++) {
				let lineText = document_schinese.lineAt(line).text;
				if (lineText.search(hero_name_lite) !== -1) {
					sub_text += lineText.substr(2,lineText.length) + '\n';
				}
			}
			const localization_schinese_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + hero_name_lite + '.txt');
			await vscode.workspace.fs.writeFile(localization_schinese_uri,new Uint8Array);
			text_editor = await vscode.window.showTextDocument(localization_schinese_uri);
			await text_editor.edit(function (edit_builder) {
				edit_builder.insert(new vscode.Position(0, 0), sub_text);
			});
			// english
			let document_english:vscode.TextDocument = await vscode.workspace.openTextDocument(abilities_english_uri);
			sub_text = '';
			for (let line = 0; line < document_english.lineCount; line++) {
				let lineText = document_english.lineAt(line).text;
				if (String(lineText.split('"')[1]).search(hero_name_lite) !== -1) {
					sub_text += lineText.substr(2,lineText.length) + '\n';
				}
			}
			const localization_english_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/english/abilities/' + hero_name_lite + '.txt');
			await vscode.workspace.fs.writeFile(localization_english_uri,new Uint8Array);
			text_editor = await vscode.window.showTextDocument(localization_english_uri);
			await text_editor.edit(async function (edit_builder) {
				edit_builder.insert(new vscode.Position(0, 0), sub_text);
			});
		});
	});

	// 转到文本
	let OpenLang = vscode.commands.registerCommand('extension.OpenLang', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let path_array: string[] = uri.fsPath.split('\\');
		let full_file_name: string = path_array[path_array.length - 1];
		let file_name: string = full_file_name.split('.')[0];
		let ext_name: string = full_file_name.split('.')[1];
		if (ext_name === 'kv') {
			vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + file_name + '.txt'));
		} else if (ext_name === 'lua') {
			vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + path_array[path_array.length - 2] + '.txt'));
		}
	});

	// 转到kv
	let OpenKV = vscode.commands.registerCommand('extension.OpenKV', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let path_array: string[] = uri.fsPath.split('\\');
		let full_file_name: string = path_array[path_array.length - 1];
		let file_name: string = full_file_name.split('.')[0];
		let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/npc/abilities/heroes/' + path_array[path_array.length - 2] + '.kv'));
		for (let line = 0; line < document.lineCount; line++) {
			const line_text: vscode.TextLine = document.lineAt(line);
			if (line_text.text.search(file_name) !== -1) {
				const options = {
					selection: line_text.range,
					preview: false,
					viewColumn: vscode.ViewColumn.Two
				};
				vscode.window.showTextDocument(document,options);
				break;
			}
		}
	});

	// 打开API
	let OpenAPI = vscode.commands.registerCommand('extension.OpenAPI', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/dota_script_help2.lua'));
		
	});

	// 生成API
	let GenerateAPI = vscode.commands.registerCommand('extension.GenerateAPI', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
		const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
		const rows = dota_script_help2.split(os.EOL);
		let script = '# **Dota2 API**\n';
		// 读取服务器API
		let class_list: {[k: string]: any} = {};
		let enum_list: {[k: string]: any} = {};
		for(let i = 0; i < rows.length; i++) {
			// 函数
			let option = rows[i].match(/---\[\[.*\]\]/g);
			if (option !== null && option.length > 0) {
				let [fun_info, new_line] = util.ReadFunction(i, rows);
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
		// 读取客户端API
		const dota_cl_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_cl_script_help2.lua', 'utf-8');
		const rows_cl = dota_cl_script_help2.split(os.EOL);
		let class_list_cl: {[k: string]: any} = {};
		let enum_list_cl: {[k: string]: any} = {};
		for(let i = 0; i < rows_cl.length; i++) {
			// 函数
			let option = rows_cl[i].match(/---\[\[.*\]\]/g);
			if (option !== null && option.length > 0) {
				let [fun_info, new_line] = util.ReadFunction(i, rows_cl);
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
				let [enum_info, new_line] = util.ReadEnum(i, rows_cl);
				enum_list_cl[enum_name] = enum_info;
				i = new_line;
			}
		}
		console.log('读取客户端API');
		// 合并API
		for (const class_name in class_list) {
			const fun_list = class_list[class_name];
			// console.log('fun_list', fun_list);
			for (let i = 0; i < fun_list.length; i++) {
				const fun_info = fun_list[i];
				let class_info_cl = class_list_cl[class_name];
				if (class_info_cl === undefined) {
					class_info_cl = class_list_cl[class_name.replace('C','C_')];
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
		console.log('合并API');
		// 生成API文档
		let _sidebar_root: string = '';
		let _sidebar: string = '';
		for (const class_name in class_list) {
			_sidebar_root += '* [**' + class_name + '**](' + class_name + '/_sidebar)\n';
			_sidebar = '* [**' + class_name + '**](/)\n';
			// 添加每个类的描述
			// fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/' + class_name + '.md', '# ' + class_name);
			// fs.mkdirSync(context.extensionPath + '/resource/' + class_name);
			const fun_list = class_list[class_name];
			for (let i = 0; i < fun_list.length; i++) {
				const fun_info = fun_list[i];
				let fun_md: string = '# ' + fun_info.function + '\n';
				fun_md += '```js\n';
				fun_md += fun_info.return + ' ';
				// if (fun_info.class !== 'Globals') {
				// 	fun_md += fun_info.class + ':';
				// }
				fun_md += fun_info.function + '(';
				let count = 0;
				for (let params_name in fun_info.params) {
					let params_name_note = fun_info.params[params_name].params_name || params_name;
					if (count === 0) {
						count ++;
						fun_md += params_name_note;
					} else {
						fun_md += ', ' + params_name_note;
					}
				}
				fun_md += ')\n';
				fun_md += '```\n';
				fun_md += '# Class\n';
				fun_md += '✔ `Server: ' + fun_info.class + '`  \n';
				fun_md += (fun_info.client === true ? '✔':'✖') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
				// fun_md += '# Support\n';
				// fun_md += '> __✔ Server__  \n';
				// fun_md += '> __' + (fun_info.client === true ? '✔':'✖') + ' Client__  \n';
				fun_md += '# Function Description\n' + fun_info.description + '\n';
				if (Object.keys(fun_info.params).length > 0) {
					fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
					for (let params_name in fun_info.params) {
						const params_info = fun_info.params[params_name];
						let params_name_note = params_info.params_name || params_name;
						fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description +'\n';
					}
				}
				// 是否有Example
				if (fun_info.example !== undefined) {
					fun_md += '\n# Example\n```lua\n';
					fun_md += fun_info.example + '\n```';
				}
				fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/' + fun_info.function + '.md', fun_md);
				// _sidebar_root += '\t* [' + fun_info.function + '](' + class_name + '/' + fun_info.function + ')\n';
				_sidebar += '\t* [' + fun_info.function + '](' + class_name + '/' + fun_info.function + ')\n';
				fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/_sidebar.md', _sidebar);
			}
		}
		// 遍历常数
		_sidebar_root += '* [**Constants**](Constants/_sidebar.md)\n';
		_sidebar = '* [**Constants**](/)\n';
		for (const enum_name in enum_list) {
			const enum_arr = enum_list[enum_name];
			// 添加每个类的描述
			// fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/Constants.md', '# ' + enum_name);
			// fs.mkdirSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name);
			_sidebar +=  '\t* [' + enum_name + '](Constants/' + enum_name + '/' + enum_name + ')\n';
			let enum_sidebar = '* [**' + enum_name + '**](/Constants/_sidebar)\n';
			let enum_md = '# ' + enum_name + '\n';
			enum_md += '?> No Description Set\n\n';
			enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description':'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--':'') + '|:--:\n';
			for (let i = 0; i < enum_arr.length; i++) {
				const enum_info = enum_arr[i];
				// 判断客户端是否存在
				let client = '✖';
				let enum_arr_cl = enum_list_cl[enum_name];
				if (enum_arr_cl !== undefined) {
					for (let j = 0; j < enum_arr_cl.length; j++) {
						const enum_info_cl = enum_arr_cl[j];
						if (enum_info_cl.name === enum_info.name) {
							client = '✔';
						}
					}
				}
				enum_md += '['+enum_info.name+'](Constants/' + enum_name + '/' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|':'' + enum_info.description_lite + '|') + client + '\n';
				enum_sidebar += '\t* ['+enum_info.name+'](Constants/'+enum_name+'/'+enum_info.name+')\n';
				// 生成常数详细页面
				if (enum_info.description === undefined) {
					enum_info.description = enum_info.description_lite;
				}
				if (enum_info.example === undefined) {
					enum_info.example = 'No Example Set';
				}
				let enum_detail_md = 
				'# ' + enum_info.name + '\n' + 
				'# Description\n' +
				enum_info.description + '\n' + 
				'# Example\n```' +
				enum_info.example + 
				'```';
				fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/' + enum_info.name + '.md', enum_detail_md);
				
			}
			// 生成常数详细页面侧边栏
			fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/_sidebar.md', enum_sidebar);
			// 生成常数列表页面
			fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/' + enum_name + '.md', enum_md);
		}
		// 生成常数侧边栏
		fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/_sidebar.md', _sidebar);
		// 生成侧边栏
		fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/_sidebar.md', _sidebar_root);
		console.log('finish');
	});

	// 注释API
	let NoteAPI = vscode.commands.registerCommand('extension.NoteAPI', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		
		let active_text_editor = vscode.window.activeTextEditor;
		if (active_text_editor !== undefined) {
			let range_start = active_text_editor.selection.start;
			let range_end = active_text_editor.selection.end;
			const select_text = vscode.window.activeTextEditor?.document.getText(new vscode.Range(range_start,range_end));
			if (select_text === undefined) {
				return;
			}
			// 读取服务器API
			const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
			const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
			const rows = dota_script_help2.split(os.EOL);
			let class_list: {[k: string]: any} = {};
			let enum_list: {[k: string]: any} = {};
			for(let i = 0; i < rows.length; i++) {
				// 函数
				let option = rows[i].match(/---\[\[.*\]\]/g);
				if (option !== null && option.length > 0) {
					let [fun_info, new_line] = util.ReadFunction(i, rows);
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
			// 遍历函数名
			for (const class_name in class_list) {
				const fun_list = class_list[class_name];
				for (let i = 0; i < fun_list.length; i++) {
					const fun_info = fun_list[i];
					if (fun_info.function === select_text) {
						let params :{[k: string]: any} = {};
						let note = {
							description: '',
							// params: Object.assign(fun_info.params),
							params: params,
							example: ''
						};
						// 创建webview
						const panel = vscode.window.createWebviewPanel(
							'dota2api', // viewType
							"Dota2 API", // 视图标题
							vscode.ViewColumn.One, // 显示在编辑器的哪个部位
							{
								enableScripts: true, // 启用JS，默认禁用
								retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
							}
						);
						panel.webview.html = util.GetNoteAPIContent(fun_info, context);
						panel.webview.onDidReceiveMessage(message => {
							console.log(message);
							let output_obj : {[k: string]: any} = {};
							output_obj[select_text] = message;
							let read_obj =  JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
							read_obj[select_text] = message;
							fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', JSON.stringify(read_obj));
							panel.dispose();
						}, undefined, context.subscriptions);
					}
				}
			}
			for (const enum_name in enum_list) {
				const enum_arr = enum_list[enum_name];
				for (let i = 0; i < enum_arr.length; i++) {
					const enum_info = enum_arr[i];
					if (enum_info.name === select_text) {
						let note = {
							description: ''
						};
						// 创建webview
						const panel = vscode.window.createWebviewPanel(
							'dota2api', // viewType
							"Dota2 API", // 视图标题
							vscode.ViewColumn.One, // 显示在编辑器的哪个部位
							{
								enableScripts: true, // 启用JS，默认禁用
								retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
							}
						);
						panel.webview.html = util.GetConstantNoteContent(enum_info, context);
						panel.webview.onDidReceiveMessage(message => {
							let output_obj : {[k: string]: any} = {};
							output_obj[select_text] = message;
							let read_obj =  JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
							read_obj[select_text] = message;
							fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', JSON.stringify(read_obj));
							panel.dispose();
						}, undefined, context.subscriptions);
					}
				}
			}
		}
	});

	// 生成API文档
	let GenerateDocument = vscode.commands.registerCommand('extension.GenerateDocument', async (uri) => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const dota_script_help2: string = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
		const dota_cl_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_cl_script_help2.lua', 'utf-8');
		let [class_list, enum_list] = util.ReadAPI(dota_script_help2, dota_cl_script_help2);

		let config = 
		`module.exports = {\n` +
		`\ttitle: 'Dota2 API',\n` +
		`\tdescription: 'Dota2 API文档',\n` +
		`\tthemeConfig: {\n` +
		`\t\tnextLinks: false,\n` +
		`\t\prevLinks: false,\n` +
		`\t\tsidebarDepth: 1,\n` +
		`\t\tsidebar: [\n`;
		for (const class_name in class_list) {
			// 添加每个类的描述
			const fun_list = class_list[class_name];
			config += `\t\t\t['/`+class_name+`/','`+class_name+`'],\n`;
			let readme = '# ' + class_name + '\n' +
			'Function|Description|Client\n' + 
			'--|--|:--:\n';
			for (let i = 0; i < fun_list.length; i++) {
				const fun_info = fun_list[i];
				let fun_md: string = '# ' + fun_info.function + '\n';
				fun_md += '```\n';
				let signature = fun_info.return + ' ' + fun_info.function + '(';
				let count = 0;
				for (let params_name in fun_info.params) {
					let params_name_note = fun_info.params[params_name].params_name || params_name;
					if (count === 0) {
						count ++;
						signature += params_name_note;
					} else {
						signature += ', ' + params_name_note;
					}
				}
				signature += ')';
				readme += '['+signature + ']('+fun_info.function+')|'+fun_info.description+'|'+(fun_info.client === true ? '✔':'✖')+'\n';
				fun_md += signature + '\n';
				fun_md += '```\n';
				fun_md += '# Class\n';
				fun_md += '✔ `Server: ' + fun_info.class + '`  \n';
				fun_md += (fun_info.client === true ? '✔':'✖') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
				fun_md += '# Function Description\n' + fun_info.description + '\n';
				if (Object.keys(fun_info.params).length > 0) {
					fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
					for (let params_name in fun_info.params) {
						const params_info = fun_info.params[params_name];
						let params_name_note = params_info.params_name || params_name;
						fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description +'\n';
					}
				}
				// 是否有Example
				if (fun_info.example !== undefined) {
					fun_md += '\n# Example\n```lua\n';
					fun_md += fun_info.example + '\n```';
				}
				fs.writeFileSync('C:/Users/lsj58/Documents/docsify/dota2-api-vuepress/docs/' + class_name + '/' + fun_info.function + '.md', fun_md);
			}
			fs.writeFileSync('C:/Users/lsj58/Documents/docsify/dota2-api-vuepress/docs/' + class_name + '/README.md', readme);
		}
		config += `\t\t\t{\n` +
		`\t\t\t\ttitle: 'Constants',\n` + 
		`\t\t\t\tcollapsable: true,\n` +
		`\t\t\t\tchildren: [\n`;
		for (const enum_name in enum_list) {
			const enum_arr = enum_list[enum_name];
			let enum_md = '# ' + enum_name + '\n';
			enum_md += '?> No Description Set\n\n';
			enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description':'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--':'') + '|:--:\n';
			// 添加每个类的描述
			config += `\t\t\t\t\t['/Constants/`+enum_name+`/`+enum_name+`','`+enum_name+`'],\n`;
			for (let i = 0; i < enum_arr.length; i++) {
				const enum_info = enum_arr[i];

				enum_md += '['+enum_info.name+'](Constants/' + enum_name + '/' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|':'' + enum_info.description_lite + '|') + enum_info.client + '\n';
				// 生成常数详细页面
				if (enum_info.description === undefined) {
					enum_info.description = enum_info.description_lite;
				}
				if (enum_info.example === undefined) {
					enum_info.example = 'No Example Set';
				}
				let enum_detail_md = 
				'# ' + enum_info.name + '\n' + 
				'# Description\n' +
				enum_info.description + '\n' + 
				'# Example\n```' +
				enum_info.example + 
				'```';
				fs.writeFileSync('C:/Users/lsj58/Documents/docsify/dota2-api-vuepress/docs/Constants/' + enum_name + '/' + enum_info.name + '.md', enum_detail_md);
			}
			// 生成常数列表页面
			fs.writeFileSync('C:/Users/lsj58/Documents/docsify/dota2-api-vuepress/docs/Constants/' + enum_name + '/' + enum_name + '.md', enum_md);
		}
		config += '\t\t\t\t]\n\t\t\t},\n\t\t]\n\t}\n}';
		
		fs.writeFileSync('C:/Users/lsj58/Documents/docsify/dota2-api-vuepress/docs/.vuepress/config.js', config);
	});

	// 注册指令
	context.subscriptions.push(Localization);
	context.subscriptions.push(AddHero);
	context.subscriptions.push(OpenLang);
	context.subscriptions.push(OpenKV);
	context.subscriptions.push(OpenAPI);
	context.subscriptions.push(GenerateAPI);
	context.subscriptions.push(NoteAPI);
	context.subscriptions.push(GenerateDocument);
}

// this method is called when your extension is deactivated
export function deactivate() {}
