// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
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
				var lineText = document.lineAt(line).text;
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
					continue;
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
					str += AddDepthTab(depth + 1, '"MaxLevel"' + AddIntervalTab(depth + 1, 'MaxLevel') + '"4"\n');
					str += AddDepthTab(depth + 1, '"RequiredLevel"' + AddIntervalTab(depth + 1, 'RequiredLevel') + '"1"\n');
					str += AddDepthTab(depth + 1, '"LevelsBetweenUpgrades"' + AddIntervalTab(depth + 1, 'LevelsBetweenUpgrades') + '"2"\n');
				}
				str += WriteAbilitiesKV(value,depth + 1,hero_name);
				str += AddDepthTab(depth, '}\n');
			}
		}
		return str;
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
				var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
				text_editor.edit(function (edit_builder) {
					edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
					edit_builder.insert(new vscode.Position(0,0),language);
				});
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
	// 监听文本
	async function WatchLocalization() {
		// let root_path:string|undefined = GetRootPath();
		// if (root_path === undefined) {
		// 	return;
		// }
		// const localization_path: string = root_path + '/game/dota_addons/dota_imba/localization';
		// var lang_folders:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		// for (let i: number = 0; i < lang_folders.length; i++) {
		// 	const [folder_name, is_directory] = lang_folders[i];
		// 	if (Number(is_directory) === vscode.FileType.Directory){
		// 		const language_path: string = localization_path + '/' + folder_name;
		// 		var language: string = '"lang"\n{\n\t"Language"\t\t"' + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + '"\n\t"Tokens"\n\t{\n';
		// 		var promise: string = await ReadLanguage(language_path);
		// 		language += promise;
		// 		language += '\t}\n}';
		// 		var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
		// 		text_editor.edit(function (edit_builder) {
		// 			edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
		// 			edit_builder.insert(new vscode.Position(0,0),language);
		// 		});
		// 	}
		// }
		// var file_system_watcher = vscode.workspace.createFileSystemWatcher('**/design/4.kv配置表/npc_heroes_tower_skin.xlsx',true,false,true);
		// file_system_watcher.onDidChange(function (uri) {
		// 	GenerateSkinKV();
		// });
	}

	// 添加英雄基本文件
	let AddHero = vscode.commands.registerCommand('extension.AddHero', async () => {
		let root_path:string|undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let addon_path:string|undefined = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
		if (addon_path === undefined || addon_path === '') {
			vscode.window.showErrorMessage('请设置dota2项目路径','设置').then(function () {
				vscode.window.showInputBox({
					password:false,
					ignoreFocusOut:true,
					prompt:'示例：C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
				}).then(function(msg){
					vscode.workspace.getConfiguration().update('dota2-tools.addon_path',msg,true)
				});
			});
			return;
		}
		// 读取英雄资料
		const npc_heroes_uri:vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_heroes.txt');
		const npc_abilities_uri:vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_abilities.txt');
		let heroes_data:{[k: string]: any} = await ReadKeyValue(npc_heroes_uri);
		let abilities_data:{[k: string]: any} = await ReadKeyValue(npc_abilities_uri);
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
				let abilities:string = '';
				for (const key in heroes_data.DOTAHeroes[hero_name]) {
					if (key.search('Ability[1-9]') !== -1) {
						var ability_name = heroes_data.DOTAHeroes[hero_name][key];
						if (ability_name.search('generic_hidden') === -1 && ability_name.search('special_bonus') === -1) {
							ability_override.push(ability_name);
							ability_name += '_imba';
						}
						abilities += '\t\t"' + key + '"\t\t"' +  ability_name + '"\n';
					}
				}
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
				ability_override.forEach(ability => {
					ability_data[ability + '_imba'] = abilities_data.DOTAAbilities[ability];
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

	// 注册指令
	context.subscriptions.push(Localization);
	context.subscriptions.push(AddHero);
}

// this method is called when your extension is deactivated
export function deactivate() {}
