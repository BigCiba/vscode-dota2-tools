// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from './util';

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
		vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
			if (document.uri.fsPath.search('localization') !== -1) {
				vscode.commands.executeCommand('extension.Localization');
			}
		});
	}
	WatchLocalization();

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
		const content = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
		const rows = content.split(os.EOL);
		let script = '# **Dota2 API**\n';
		let class_list: {[k: string]: any} = {};
		for(let i = 0; i < rows.length; i++) {
			// 函数
			let option = rows[i].match(/---\[\[.*\]\]/g);
			if (option !== null && option.length > 0) {
				let [fun_info, new_line] = ReadFunction(i);
				if (class_list[fun_info.class] === undefined) {
					class_list[fun_info.class] = [];
				}
				class_list[fun_info.class].push(fun_info);
				i = new_line;
			}
			// 常数
			if (rows[i].search('--- Enum ') !== -1) {
				
			}
		}
		for (const class_name in class_list) {
			const fun_list = class_list[class_name];
			script += '## **' + class_name + '**\n---\n';
			for (let i = 0; i < fun_list.length; i++) {
				const fun_info = fun_list[i];
				script += '### `' + fun_info.return + ' ';
				if (fun_info.class !== 'Globals') {
					script += fun_info.class + ':';
				}
				script += fun_info.function + '(';
				let count = 0;
				for (let params_name in fun_info.params) {
					if (count === 0) {
						count ++;
						script += params_name;
					} else {
						script += ', ' + params_name;
					}
				}
				script += ' )`\n';
				script += '#### Function Description\n' + fun_info.description + '\n';
				if (Object.keys(fun_info.params).length > 0) {
					script += '#### Parameters\nType|Name|Description\n--|--|--\n';
					for (let params_name in fun_info.params) {
						const params_type = fun_info.params[params_name];
						script += params_type + '|' + params_name + '|No Description Set\n';
					}
				}
				script += '---\n';
			}
		}
		fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/script_help2.md',script);
		vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/dota_script_help2.lua'));
		function ReadFunction(line: number):any {
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
					param_list[arr[2]] = arr[3];
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
			return [fun_info,end_line];
		}
	});

	// 注册指令
	context.subscriptions.push(Localization);
	context.subscriptions.push(AddHero);
	context.subscriptions.push(OpenLang);
	context.subscriptions.push(OpenKV);
	context.subscriptions.push(OpenAPI);
}

// this method is called when your extension is deactivated
export function deactivate() {}
