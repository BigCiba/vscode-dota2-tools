// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from './util';
import { Init, KV2LUA, VSND, GameDir, ContentDir } from './init';
import { Listener } from './listener';
import * as watch from 'watch';
import { log, print } from 'util';
import { ActiveListEditorProvider } from './activelistEditor';
import { KVServer } from './kv_server/KVServer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	KVServer.Install(context);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// passport: zut3ehvut7muv26u5axcbmnv6wlgkdxcsabxvjl4i6rbvwkgpmrq
	console.log('Congratulations, your extension "dota2-tools" is now active!');
	// 获取根目录（弃用）
	function GetRootPath(): string | undefined {
		const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		if (folders !== undefined) {
			return folders[0].uri.fsPath;
		} else {
			return;
		}
	}
	// 读取kv文件（弃用）
	async function ReadKeyValue(uri: vscode.Uri) {
		function NewTable(start_line: number, document: vscode.TextDocument): any {
			var obj: { [k: string]: any } = {};
			var left_brackets: number = 0;	// 记录{数量
			var right_brackets: number = 0;	// 记录}数量
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
					return [obj, line];
				}
				if (lineText.search('//') !== -1) {
					if (text_line.firstNonWhitespaceCharacterIndex === lineText.indexOf('//')) {
						continue;

					}
				}
				var arr = lineText.match(/"/g);
				if (arr !== null) {
					if (arr.length === 2) {
						var [new_obj, next_line] = NewTable(line + 1, document);
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
		let document: vscode.TextDocument = await vscode.workspace.openTextDocument(uri);
		var obj: { [k: string]: any } = {};
		for (let line = 0; line < document.lineCount; line++) {
			var lineText = document.lineAt(line).text;
			var arr = lineText.match(/"/g);
			if (arr !== null) {
				if (arr.length === 2) {
					var [new_obj, next_line] = NewTable(line + 1, document);
					obj[lineText.split('"')[1]] = new_obj;
					line = next_line;
					continue;
				}
			}
		}
		return obj;
	}
	//（弃用）
	function WriteKeyValue(obj: any, depth: number) {
		var str: string = '';
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
		for (const key in obj) {
			const value = obj[key];
			if (typeof (value) === 'string') {
				str += AddDepthTab(depth, '"' + key + '"');
				str += AddIntervalTab(depth, key);
				str += '"' + value + '"\n';
			} else {
				str += AddDepthTab(depth, '"' + key + '"\n');
				str += AddDepthTab(depth, '{\n');
				str += WriteKeyValue(value, depth + 1);
				str += AddDepthTab(depth, '}\n');
			}
		}
		return str;
	}
	// 解析技能kv
	function WriteAbilitiesKV(obj: any, depth: number, hero_name: string) {
		var str: string = '';
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
		for (const key in obj) {
			if (key === 'ID') {
				continue;
			}
			const value = obj[key];
			if (typeof (value) === 'string') {
				str += AddDepthTab(depth, '"' + key + '"');
				str += AddIntervalTab(depth, key);
				str += '"' + value + '"\n';
			} else {
				str += AddDepthTab(depth, '"' + key + '"\n');
				str += AddDepthTab(depth, '{\n');
				if (depth === 1) {
					// str += AddDepthTab(depth, '// General\n//-------------------------------------------------------------------------------------------------------------\n');
					str += AddDepthTab(depth + 1, '"BaseClass"' + AddIntervalTab(depth + 1, 'BaseClass') + '"ability_lua"\n');
					str += AddDepthTab(depth + 1, '"ScriptFile"' + AddIntervalTab(depth + 1, 'ScriptFile') + '"abilities/' + hero_name + '/' + key + '"\n');
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
				str += WriteAbilitiesKV(value, depth + 1, hero_name);
				str += AddDepthTab(depth, '}\n');
			}
		}
		return str;
	}
	//（弃用）
	async function LoadKeyValue(uri: vscode.Uri) {
		const document: vscode.TextDocument = await vscode.workspace.openTextDocument(uri);
		var state: string = 'NONE';
		var state_save: string = 'NONE';
		var key_value = {
			key: '',
			value: '',
			AddKey(char: string) { this.key += char; },
			AddValue(char: string) { this.value += char; },
			Clear() { this.key = ''; this.value = ''; },
		};
		var obj: { [k: string]: any } = {};
		var text_data = document.getText();
		var Next = (index: number) => text_data[index + 1];
		var NewTable = (index: number): any => {
			let state: string = 'NONE';
			let state_save: string = 'NONE';
			let key_value = {
				key: '',
				value: '',
				AddKey(char: string) { this.key += char; },
				AddValue(char: string) { this.value += char; },
				Clear() { this.key = ''; this.value = ''; },
			};
			let obj: { [k: string]: any } = {};
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
					return [obj, i];
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
	let Localization = vscode.commands.registerCommand('dota2tools.Localization', async () => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const localization_path: string = GameDir + '/localization';
		var lang_folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
		for (let i: number = 0; i < lang_folders.length; i++) {
			const [folder_name, is_directory] = lang_folders[i];
			if (Number(is_directory) === vscode.FileType.Directory) {
				const language_path: string = localization_path + '/' + folder_name;
				var language: string =
					`"lang"
{
	"Language"		"` + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + `"
	"Tokens"
	{
`;
				var promise: string = await ReadLanguage(language_path);
				language += promise;
				language +=
					`
	}
}`;
				fs.writeFileSync(GameDir + '/resource/addon_' + folder_name + '.txt', language);
				// var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
				// text_editor.edit(function (edit_builder) {
				// 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
				// 	edit_builder.insert(new vscode.Position(0,0),language);
				// });
			}
		}
		async function ReadLanguage(path: string): Promise<string> {
			var lang: string = '';
			var files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
			for (let i = 0; i < files.length; i++) {
				const [file_name, file_type] = files[i];
				if (Number(file_type) === vscode.FileType.File) {
					var document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + file_name);
					for (let line: number = 0; line < document.lineCount; line++) {
						const text_line: vscode.TextLine = document.lineAt(line);
						const char_start: number = text_line.firstNonWhitespaceCharacterIndex;
						let lineText: string = document.lineAt(line).text;
						lineText = lineText.substr(char_start, lineText.length);

						lang += '\t\t' + lineText + os.EOL;
					}
					lang += os.EOL;
				} else if (Number(file_type) === vscode.FileType.Directory) {
					var promise: string = await ReadLanguage(path + '/' + file_name);
					lang += promise;
				}
			}
			return Promise.resolve(lang);
		}
	});

	// 版本控制
	function WatchVersion() {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		// 获取版本
		const setting: string = fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/settings.lua', 'utf-8');
		const rows: string[] = setting.split(os.EOL);
		let version: string = 'v0.01';
		for (let i = 0; i < rows.length; i++) {
			const line_text: string = rows[i];
			if (line_text.search('sGameVersion') !== -1) {
				version = line_text.split('\'')[1];
			}
		}
		// 获取版本变更信息
		const version_data = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', 'utf-8'));
		if (version_data[version] === undefined) {
			let lua: { [k: string]: any } = {};
			let kv: { [k: string]: any } = {};
			let txt: { [k: string]: any } = {};
			let info: object = {
				lua: lua,
				kv: kv,
				txt: txt
			};
			version_data[version] = info;
		}

		watch.watchTree(root_path + '/game/dota_addons/dota_imba', function (f, curr, prev) {
			if (typeof f === "object" && prev === null && curr === null) {
				// Finished walking the tree
			} else if (prev === null) {
				// f is a new file
				// console.log('f is a new file');
				if (typeof f === "string") {
					let info: any = util.GetFileInfo(root_path, f);
					if (version_data[version][info.ext][info.full_name] === undefined) {
						let file_info: { [k: string]: any } = {};
						version_data[version][info.ext][info.full_name] = file_info;
					}
					version_data[version][info.ext][info.full_name].created = true;
					fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', version_data);
				}
			} else if (curr.nlink === 0) {
				// f was removed
				// console.log('f was removed');
				if (typeof f === "string") {
					let info: any = util.GetFileInfo(root_path, f);
					if (version_data[version][info.ext][info.full_name] === undefined) {
						let file_info: { [k: string]: any } = {};
						version_data[version][info.ext][info.full_name] = file_info;
					}
					version_data[version][info.ext][info.full_name].removed = true;
					fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', version_data);
				}
			} else {
				// f was changed
				// console.log('f was changed');
				if (typeof f === 'string') {
					let info: any = util.GetFileInfo(root_path, f);
					if (info.name !== 'version' && info.full_name.search('.git') === -1) {
						console.log(version_data);
						console.log(version_data[version]);
						console.log(version_data[version][info.ext]);
						if (version_data[version][info.ext][info.full_name] === undefined) {
							let file_info: { [k: string]: any } = {};
							version_data[version][info.ext][info.full_name] = file_info;
						}
						version_data[version][info.ext][info.full_name].change = true;
						fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/version.json', JSON.stringify(version_data));
					}
				}
			}
		});
	}
	// WatchVersion();

	await Init(context);
	// 监听
	let listener = new Listener(context);
	// 配置变更
	vscode.workspace.onDidChangeConfiguration((event) => {
		if (event.affectsConfiguration('dota2-tools.abilities_excel_path') === true || event.affectsConfiguration('dota2-tools.abilities_kv_path') === true) {
			listener.WatchAbilityExcel();
		}
		if (event.affectsConfiguration('dota2-tools.Listen Localization') === true) {
			if (vscode.workspace.getConfiguration().get('dota2-tools.Listen Localization') === true) {
				listener.WatchLocalization();
			} else {
				listener.UnWatchLocalization();
			}
		}
	});

	// 添加英雄基本文件（IMBA功能）
	let AddHero = vscode.commands.registerCommand('extension.AddHero', async () => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let addon_path: string | undefined = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
		if (addon_path === undefined || addon_path === '') {
			vscode.window.showErrorMessage('请设置dota2项目路径', '设置').then(function () {
				vscode.window.showInputBox({
					password: false,
					ignoreFocusOut: true,
					value: 'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
					prompt: '示例：C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
				}).then(async function (msg) {
					if (msg !== undefined) {
						await vscode.workspace.fs.readDirectory(vscode.Uri.file(msg));
						vscode.workspace.getConfiguration().update('dota2-tools.addon_path', msg, true);
					}
				});
			});
			return;
		}
		// 读取英雄资料
		const npc_heroes_uri: vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_heroes.txt');
		const npc_abilities_uri: vscode.Uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_abilities.txt');
		let heroes_data: { [k: string]: any } = await LoadKeyValue(npc_heroes_uri);
		let abilities_data: { [k: string]: any } = await LoadKeyValue(npc_abilities_uri);
		// 选择英雄
		const quick_pick: vscode.QuickPick<vscode.QuickPickItem> = vscode.window.createQuickPick();
		quick_pick.canSelectMany = false;
		quick_pick.ignoreFocusOut = true;
		quick_pick.placeholder = '英雄名字';
		quick_pick.title = '选择创建的英雄';

		// 添加选项
		var items: vscode.QuickPickItem[] = new Array;
		for (const key in heroes_data.DOTAHeroes) {
			if (heroes_data.DOTAHeroes.hasOwnProperty(key) && key !== 'Version' && key !== 'npc_dota_hero_base') {
				items.push({
					label: key,
				});
			}
		}
		quick_pick.items = items;
		quick_pick.show();

		quick_pick.onDidChangeSelection(async (t) => {
			quick_pick.hide();
			quick_pick.value = t[0].label;
			const hero_name = quick_pick.value;
			const hero_name_lite = hero_name.substr(14, hero_name.length);
			// 原版数据
			const scripts_path: string = root_path + '/game/dota_addons/dota_imba/scripts';
			// 添加npc_heroes_custom
			var ability_override: any[] = new Array;
			var text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_heroes_custom.txt'));
			text_editor.edit(function (edit_builder) {
				let abilities: string =
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
						let ability_index = key.substr(7, 8);
						if (ability_index !== '6') {
							abilities += '\t\t\t"' + key.substr(7, 8) + '"\t\t\t"' + ability_name + '"\n';
						} else {
							abilities += '\t\t\t"ultimate"\t"' + ability_name + '"\n';
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
							let ability_index = key.substr(7, 8);
							if (ability_index === '6') {
								abilities += '\t\t\t"ultimate"\t"' + ability_name + '"\n';
							} else if (Number(ability_index) < 4) {
								abilities += '\t\t\t"' + key.substr(7, 8) + '"\t\t\t"' + ability_name + '"\n';
							}
						}
					}
				}
				abilities += '\t\t}\n';
				edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1, 0), '\t"' + quick_pick.value + '"\n\t{\n' + abilities + '\t}\n');
			});
			// 添加herolist
			text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/herolist.txt'));
			text_editor.edit(function (edit_builder) {
				var AddTab = function (length: number): string {
					var tab: string = '';
					for (let d = 0; d < 10 - Math.floor((4 + length + 2) / 4); d++) {
						tab += '\t';
					}
					return tab;
				};
				edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1, 0), '\t"' + hero_name + '"' + AddTab(hero_name.length) + '"1"\n');
			});
			// 添加npc_abilities_custom
			text_editor = await vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_abilities_custom.txt'));
			text_editor.edit(function (edit_builder) {
				edit_builder.insert(new vscode.Position(0, 0), '#base "abilities/heroes/' + hero_name_lite + '.kv"\n');
			});
			// 添加技能KV
			const ability_kv_uri = vscode.Uri.file(scripts_path + '/npc/abilities/heroes/' + hero_name_lite + '.kv');
			await vscode.workspace.fs.writeFile(ability_kv_uri, new Uint8Array);
			text_editor = await vscode.window.showTextDocument(ability_kv_uri);
			text_editor.edit(function (edit_builder) {
				var ability_data: { [k: string]: any } = {};
				var ability: object = {
					[hero_name_lite]: ability_data,
				};
				ability_override.forEach(ability_name => {
					ability_data[ability_name + '_imba'] = abilities_data.DOTAAbilities[ability_name];
				});
				edit_builder.insert(new vscode.Position(0, 0), WriteAbilitiesKV(ability, 0, hero_name_lite));
			});
			// 初始化技能lua
			for (let i = 0; i < ability_override.length; i++) {
				const ability = ability_override[i] + '_imba';
				const ability_lua_uri = vscode.Uri.file(scripts_path + '/vscripts/abilities/' + hero_name_lite + '/' + ability + '.lua');
				await vscode.workspace.fs.writeFile(ability_lua_uri, new Uint8Array);
				text_editor = await vscode.window.showTextDocument(ability_lua_uri);
				await text_editor.edit(async function (edit_builder) {
					var lua_data: string = '';
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
			const abilities_schinese_uri: vscode.Uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_schinese.txt');
			const abilities_english_uri: vscode.Uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_english.txt');
			// 中文
			let document_schinese: vscode.TextDocument = await vscode.workspace.openTextDocument(abilities_schinese_uri);
			let sub_text: string = '';
			for (let line = 0; line < document_schinese.lineCount; line++) {
				let lineText = document_schinese.lineAt(line).text;
				if (lineText.search(hero_name_lite) !== -1) {
					sub_text += lineText.substr(2, lineText.length) + '\n';
				}
			}
			const localization_schinese_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + hero_name_lite + '.txt');
			await vscode.workspace.fs.writeFile(localization_schinese_uri, new Uint8Array);
			text_editor = await vscode.window.showTextDocument(localization_schinese_uri);
			await text_editor.edit(function (edit_builder) {
				edit_builder.insert(new vscode.Position(0, 0), sub_text);
			});
			// english
			let document_english: vscode.TextDocument = await vscode.workspace.openTextDocument(abilities_english_uri);
			sub_text = '';
			for (let line = 0; line < document_english.lineCount; line++) {
				let lineText = document_english.lineAt(line).text;
				if (String(lineText.split('"')[1]).search(hero_name_lite) !== -1) {
					sub_text += lineText.substr(2, lineText.length) + '\n';
				}
			}
			const localization_english_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/english/abilities/' + hero_name_lite + '.txt');
			await vscode.workspace.fs.writeFile(localization_english_uri, new Uint8Array);
			text_editor = await vscode.window.showTextDocument(localization_english_uri);
			await text_editor.edit(async function (edit_builder) {
				edit_builder.insert(new vscode.Position(0, 0), sub_text);
			});
		});
	});

	// 转到文本
	let OpenLang = vscode.commands.registerCommand('extension.OpenLang', async (uri) => {
		let root_path: string | undefined = GetRootPath();
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
	let OpenKV = vscode.commands.registerCommand('dota2tools.OpenKV', async (uri) => {
		const text_editor = vscode.window.activeTextEditor;
		if (text_editor !== undefined) {
			let document = text_editor.document;
			const fileName = document.fileName;
			const position = text_editor.selection.start;
			let word = document.getText(document.getWordRangeAtPosition(position));
			// 如果是modifier则搜寻技能名（必须同一文件）
			if (KV2LUA[word] === undefined) {
				let kv_string = fs.readFileSync(fileName, 'utf-8');
				const rows: string[] = kv_string.split(os.EOL);
				for (let i = 0; i < rows.length; i++) {
					const line_text: string = rows[i];
					if (/.* = class/.test(line_text) === true && /modifier_.* = class/.test(line_text) === false) {
						word = line_text.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
					}
				}
			}
			if (KV2LUA[word] !== undefined) {
				let kv_string = fs.readFileSync(GameDir + '/scripts/npc/npc_abilities_custom.txt', 'utf-8');
				kv_string = util.RemoveComment(kv_string);
				const rows: string[] = kv_string.split(os.EOL);
				for (let i = 0; i < rows.length; i++) {
					const line_text: string = rows[i];
					if (line_text.search(/#base ".*"/) !== -1) {
						let base_path = line_text.split('"')[1];
						let bFind: number | boolean = GetKVInfo(GameDir + '/scripts/npc/' + base_path, word);

						if (bFind !== false && typeof (bFind) === 'number') {
							let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(GameDir + '/scripts/npc/' + base_path));
							const options = {
								selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
								preview: false,
								viewColumn: vscode.ViewColumn.Two
							};
							vscode.window.showTextDocument(document, options);
							break;
						}
						continue;
					} else {
						if (line_text.search(word) !== -1) {
							let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(GameDir + '/scripts/npc/npc_abilities_custom.txt'));
							const options = {
								selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
								preview: false,
								viewColumn: vscode.ViewColumn.Two
							};
							vscode.window.showTextDocument(document, options);
							break;
						}
					}
				}
			}
		}
		function GetKVInfo(full_path: string, word: string): number | boolean {
			let kv_string = fs.readFileSync(full_path, 'utf-8');
			const rows: string[] = kv_string.split(os.EOL);
			for (let i = 0; i < rows.length; i++) {
				const line_text: string = rows[i];
				if (line_text.search(word) !== -1) {
					return i;
				}
			}
			return false;
		}

		// let path_array: string[] = uri.fsPath.split('\\');
		// let full_file_name: string = path_array[path_array.length - 1];
		// let file_name: string = full_file_name.split('.')[0];
		// let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/npc/abilities/heroes/' + path_array[path_array.length - 2] + '.kv'));
		// for (let line = 0; line < document.lineCount; line++) {
		// 	const line_text: vscode.TextLine = document.lineAt(line);
		// 	if (line_text.text.search(file_name) !== -1) {
		// 		const options = {
		// 			selection: line_text.range,
		// 			preview: false,
		// 			viewColumn: vscode.ViewColumn.Two
		// 		};
		// 		vscode.window.showTextDocument(document,options);
		// 		break;
		// 	}
		// }
	});

	// 打开API
	let OpenAPI = vscode.commands.registerCommand('extension.OpenAPI', async (uri) => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/dota_script_help2.lua'));

	});

	// 生成API
	let GenerateAPI = vscode.commands.registerCommand('extension.GenerateAPI', async (uri) => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
		const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
		const rows = dota_script_help2.split(os.EOL);
		let script = '# **Dota2 API**\n';
		// 读取服务器API
		let class_list: { [k: string]: any } = {};
		let enum_list: { [k: string]: any } = {};
		for (let i = 0; i < rows.length; i++) {
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
		let class_list_cl: { [k: string]: any } = {};
		let enum_list_cl: { [k: string]: any } = {};
		for (let i = 0; i < rows_cl.length; i++) {
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
						count++;
						fun_md += params_name_note;
					} else {
						fun_md += ', ' + params_name_note;
					}
				}
				fun_md += ')\n';
				fun_md += '```\n';
				fun_md += '# Class\n';
				fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
				fun_md += (fun_info.client === true ? '✔️' : '❌') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
				// fun_md += '# Support\n';
				// fun_md += '> __✔️ Server__  \n';
				// fun_md += '> __' + (fun_info.client === true ? '✔️':'❌') + ' Client__  \n';
				fun_md += '# Function Description\n' + fun_info.description + '\n';
				if (Object.keys(fun_info.params).length > 0) {
					fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
					for (let params_name in fun_info.params) {
						const params_info = fun_info.params[params_name];
						let params_name_note = params_info.params_name || params_name;
						fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
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
			_sidebar += '\t* [' + enum_name + '](Constants/' + enum_name + '/' + enum_name + ')\n';
			let enum_sidebar = '* [**' + enum_name + '**](/Constants/_sidebar)\n';
			let enum_md = '# ' + enum_name + '\n';
			enum_md += '> No Description Set\n\n';
			enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description' : 'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--' : '') + '|:--:\n';
			for (let i = 0; i < enum_arr.length; i++) {
				const enum_info = enum_arr[i];
				// 判断客户端是否存在
				let client = '❌';
				let enum_arr_cl = enum_list_cl[enum_name];
				if (enum_arr_cl !== undefined) {
					for (let j = 0; j < enum_arr_cl.length; j++) {
						const enum_info_cl = enum_arr_cl[j];
						if (enum_info_cl.name === enum_info.name) {
							client = '✔️';
						}
					}
				}
				enum_md += '[' + enum_info.name + '](Constants/' + enum_name + '/' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|' : '' + enum_info.description_lite + '|') + client + '\n';
				enum_sidebar += '\t* [' + enum_info.name + '](Constants/' + enum_name + '/' + enum_info.name + ')\n';
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
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}

		let active_text_editor = vscode.window.activeTextEditor;
		if (active_text_editor !== undefined) {
			let range_start = active_text_editor.selection.start;
			let range_end = active_text_editor.selection.end;
			const select_text = vscode.window.activeTextEditor?.document.getText(new vscode.Range(range_start, range_end));
			if (select_text === undefined) {
				return;
			}
			// 读取服务器API
			const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
			const api_note = JSON.parse(fs.readFileSync(GameDir + '/scripts/vscripts/libraries/api_note.json', 'utf-8'));
			const rows = dota_script_help2.split(os.EOL);
			let class_list: { [k: string]: any } = {};
			let enum_list: { [k: string]: any } = {};
			for (let i = 0; i < rows.length; i++) {
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
						let params: { [k: string]: any } = {};
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
							let output_obj: { [k: string]: any } = {};
							output_obj[select_text] = message;
							let read_obj = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
							read_obj[select_text] = message;
							fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', JSON.stringify(read_obj));
							panel.dispose();
						}, undefined, context.subscriptions);
					}
				}
			}
			// 遍历常数
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
							let output_obj: { [k: string]: any } = {};
							output_obj[select_text] = message;
							let read_obj = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
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
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		const dota_script_help2: string = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
		const dota_cl_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_cl_script_help2.lua', 'utf-8');
		const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
		let [class_list, enum_list] = util.ReadAPI(dota_script_help2, dota_cl_script_help2);

		// 侧边栏与一些配置
		let config =
			`module.exports = {\n` +
			`\ttitle: 'Dota2 文档',\n` +
			`\tdescription: 'Dota2 API文档',\n` +
			`\tthemeConfig: {\n` +
			`\t\tnextLinks: false,\n` +
			`\t\tprevLinks: false,\n` +
			`\t\tnav: [\n` +
			`\t\t\t{\n` +
			`\t\t\t\ttext: 'Overview',\n` +
			`\t\t\t\tariaLabel: '常用',\n` +
			`\t\t\t\titems: [\n` +
			`\t\t\t\t{ text: 'BaseAbility', link: '/dota2-lua-api/CDOTABaseAbility/' },\n` +
			`\t\t\t\t{ text: 'Ability_Lua', link: '/dota2-lua-api/CDOTA_Ability_Lua/' },\n` +
			`\t\t\t\t{ text: 'BaseNPC', link: '/dota2-lua-api/CDOTA_BaseNPC/' },\n` +
			`\t\t\t\t{ text: 'BaseNPC_Hero', link: '/dota2-lua-api/CDOTA_BaseNPC_Hero/' },\n` +
			`\t\t\t\t{ text: 'Buff', link: '/dota2-lua-api/CDOTA_Buff/' },\n` +
			`\t\t\t\t{ text: 'Item', link: '/dota2-lua-api/CDOTA_Item/' },\n` +
			`\t\t\t\t{ text: 'Item_Lua', link: '/dota2-lua-api/CDOTA_Item_Lua/' },\n` +
			`\t\t\t\t{ text: 'Modifier_Lua', link: '/dota2-lua-api/CDOTA_Modifier_Lua/' },\n` +
			`\t\t\t\t{ text: 'ParticleManager', link: '/dota2-lua-api/CScriptParticleManager/' },\n` +
			`\t\t\t\t{ text: 'modifierfunction', link: '/dota2-lua-api/Constants/modifierfunction/modifierfunction' },\n` +
			`\t\t\t\t{ text: 'modifierstate', link: '/dota2-lua-api/Constants/modifierstate/modifierstate' },\n` +
			`\t\t\t\t]\n` +
			`\t\t\t},\n` +
			`\t\t],\n` +
			`\t\tsearchMaxSuggestions: 20,\n` +
			`\t\tsidebarDepth: 1,\n` +
			`\t\tsidebar: [\n` +
			`\t\t\t{\n` +
			`\t\t\t\ttitle: 'Dota2 Lua API',\n` +
			`\t\t\t\tcollapsable: false,\n` +
			`\t\t\t\tchildren: [\n`;
		for (const class_name in class_list) {
			// 添加每个类的描述
			const fun_list = class_list[class_name];
			config += `\t\t\t\t\t['/dota2-lua-api/` + class_name + `/','` + class_name + `'],\n`;
			let readme = '# ' + class_name + '\n';
			readme += (api_note[class_name] === undefined ? '> No Description Set' : api_note[class_name]) + '\n\n' +
				'Function|Description|Client\n' +
				'--|--|:--:\n';
			for (let i = 0; i < fun_list.length; i++) {
				const fun_info = fun_list[i];
				let fun_md: string = '# ' + fun_info.function + '\n';
				fun_md += '```lua\n';
				let signature = fun_info.return + ' ' + fun_info.function + '(';
				let count = 0;
				for (let params_name in fun_info.params) {
					let params_name_note = fun_info.params[params_name].params_name || params_name;
					if (count === 0) {
						count++;
						signature += params_name_note;
					} else {
						signature += ', ' + params_name_note;
					}
				}
				signature += ')';
				readme += '[' + signature + '](' + fun_info.function + ')|' + fun_info.description + '|' + (fun_info.client === true ? '✔️' : '❌') + '\n';
				fun_md += signature + '\n';
				fun_md += '```\n';
				fun_md += '# Class\n';
				fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
				fun_md += (fun_info.client === true ? '✔️' : '❌') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
				fun_md += '# Function Description\n' + fun_info.description + '\n';
				if (Object.keys(fun_info.params).length > 0) {
					fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
					for (let params_name in fun_info.params) {
						const params_info = fun_info.params[params_name];
						let params_name_note = params_info.params_name || params_name;
						fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
					}
				}
				// 是否有Example
				if (fun_info.example !== undefined) {
					fun_md += '\n# Example\n```lua\n';
					fun_md += fun_info.example + '\n```';
				}
				await util.DirExists('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name);
				fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name + '/' + fun_info.function + '.md', fun_md);
			}
			fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name + '/README.md', readme);
		}
		config += `\t\t\t\t\t{\n` +
			`\t\t\t\t\t\ttitle: 'Constants',\n` +
			`\t\t\t\t\t\tcollapsable: true,\n` +
			`\t\t\t\t\t\tchildren: [\n`;
		for (const enum_name in enum_list) {
			const enum_arr = enum_list[enum_name];
			let enum_md = '# ' + enum_name + '\n';
			enum_md += (api_note[enum_name] === undefined ? '> No Description Set' : api_note[enum_name]) + '\n\n';
			enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description' : 'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--' : '') + '|:--:\n';
			// 添加每个类的描述
			config += `\t\t\t\t\t\t\t['/dota2-lua-api/Constants/` + enum_name + `/` + enum_name + `','` + enum_name + `'],\n`;
			for (let i = 0; i < enum_arr.length; i++) {
				const enum_info = enum_arr[i];

				enum_md += '[' + enum_info.name + '](' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|' : '' + enum_info.description_lite + '|') + enum_info.client + '\n';
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
				await util.DirExists('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name);
				fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name + '/' + enum_info.name + '.md', enum_detail_md);
			}
			// 生成常数列表页面
			fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name + '/' + enum_name + '.md', enum_md);
		}
		config += '\t\t\t\t\t\t]\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t},\n\t\t]\n\t}\n}';

		// fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/.vuepress/config.js', config);
	});

	// 选择音效
	let VsndSelector = vscode.commands.registerCommand('dota2tools.vsnd_selector', async (uri) => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}
		let obj_data: any = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/soundevents.json', 'utf-8'));
		const quick_pick = vscode.window.createQuickPick();
		quick_pick.canSelectMany = false;
		quick_pick.ignoreFocusOut = true;
		quick_pick.placeholder = '*.vsnd';
		quick_pick.items = VSND;

		quick_pick.show();
		quick_pick.onDidChangeSelection((t) => {
			quick_pick.value = t[0].label;
			vscode.window.activeTextEditor?.edit(editBuilder => {
				if (vscode.window.activeTextEditor?.selection.start !== undefined && t[0].description !== undefined) {
					if (vscode.window.activeTextEditor.selection.start.character === vscode.window.activeTextEditor.selection.end.character) {
						editBuilder.insert(vscode.window.activeTextEditor?.selection.start, t[0].description);
					} else {
						editBuilder.replace(new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end), t[0].description);
					}
					quick_pick.dispose();
				}
			});
		});
	});
	// 生成音效json
	let VsndGenerator = vscode.commands.registerCommand('dota2tools.vsnd_generator', async (uri) => {
		// let kv = util.ReadKeyValue2(fs.readFileSync('C:/Users/bigciba/Documents/Dota Addons/dota2 tracking/root/soundevents/music/dsadowski_01/soundevents_stingers.vsndevts', 'utf-8'));
		// console.log(kv);
		// return;
		const sound_path: string = 'C:/Users/wan/Desktop/作图工具/soundevents';

		let json_obj: any = {};
		await ReadFolder(sound_path);
		fs.writeFileSync('C:/Users/wan/Desktop/作图工具/soundevents.json', JSON.stringify(json_obj));

		async function ReadFolder(folder_name: string) {
			let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folder_name));
			for (let i: number = 0; i < folders.length; i++) {
				const [name, is_directory] = folders[i];
				if (name === undefined) {
					continue;
				}
				if (Number(is_directory) === vscode.FileType.Directory) {
					await ReadFolder(folder_name + '/' + name);
				} else if (Number(is_directory) === vscode.FileType.File) {
					console.log(folder_name + '/' + name);
					let kvdata = fs.readFileSync(folder_name + '/' + name, 'utf-8');
					if (kvdata[0] === '"') {
						let kv = util.ReadKeyValue2(kvdata);
						for (const key in kv) {
							const value = kv[key];
							if (value['0'] === undefined) {
								if (util.ObjectHasKey(value, 'vsnd_files') === true) {
									let sound = value.operator_stacks.update_stack.reference_operator.operator_variables.vsnd_files.value;
									if (sound !== undefined) {
										if (typeof (sound) === 'string') {
											json_obj[key] = [sound.replace(/\\\\/g, '/').replace(/\\/g, '/')];
										} else {
											let sound_arr = [];
											for (const k in sound) {
												sound_arr.push(sound[k].replace(/\\\\/g, '/').replace(/\\/g, '/'));
											}
											json_obj[key] = sound_arr;
										}
									}
								}
							} else {
								if (value['0'].vsnd_files !== undefined) {
									if (typeof (value['0'].vsnd_files) === 'string') {
										json_obj[key] = [value['0'].vsnd_files.replace(/\\\\/g, '/').replace(/\\/g, '/')];
									} else {
										json_obj[key] = value['0'].vsnd_files;
										for (const k in json_obj[key]) {
											json_obj[key][k] = json_obj[key][k].replace(/\\\\/g, '/').replace(/\\/g, '/');
										}
									}
								}
							}
						}
					} else if (kvdata[0] === '{') {
						let kv = util.ReadKeyValue3(kvdata);
						for (const key in kv[0]) {
							const value = kv[0][key];
							if (value.vsnd_files !== undefined) {
								if (typeof (value.vsnd_files) === 'string') {
									json_obj[key] = [value.vsnd_files.replace(/\\\\/g, '/').replace(/\\/g, '/')];
								} else {
									json_obj[key] = value.vsnd_files;
									for (const k in json_obj[key]) {
										json_obj[key][k] = json_obj[key][k].replace(/\\\\/g, '/').replace(/\\/g, '/');
									}
								}
							}
						}
					}
				}
			}
		}
	});
	// kv2csv
	let KV2CSV = vscode.commands.registerCommand('dota2tools.kv_to_csv', async (uri) => {
		const excel_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
		const kv_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		for (const index in kv_object) {
			const kv_path = kv_object[index].replace(/\\\\/g, '/');
			let file_type: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
			if (file_type === vscode.FileType.Directory) {
				let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(kv_path));
				for (let i: number = 0; i < files.length; i++) {
					let [file_name, is_file] = files[i];
					if (file_name === undefined) {
						continue;
					}
					if (is_file === vscode.FileType.File) {
						let file_path: string = kv_path + '/' + file_name;
						let csv_path: string = path.join(excel_object[index], 'csv', file_name.replace(path.extname(file_name), '.csv'));

						KeyValue2CSV(file_path, csv_path);
						// fs.writeFileSync(unit_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({KeyValue:util.UnitCSV2KV(csv_path)}));
					}
				}
			} else if (file_type === vscode.FileType.File) {
				let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
				KeyValue2CSV(kv_path, csv_path);
			}

		}
		function KeyValue2CSV(kv_path: string, csv_path: string) {
			// let csv_path = path.dirname(excel_object[index]);
			if (fs.existsSync(csv_path) === false) {
				return;
			}
			let csv: any = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
			let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
			let csv_title = csv[0];
			let csv_key = csv[1];
			let final_csv = [csv_title, csv_key];
			for (const ability_name in kv[Object.keys(kv)[0]]) {
				const ability_data = kv[Object.keys(kv)[0]][ability_name];
				let normal_data: any = [];//第一行
				normal_data[0] = ability_name;
				let special_data: any = [];//第二行
				for (const ability_key in ability_data) {
					const ability_value = ability_data[ability_key];
					if (ability_key === 'AbilitySpecial') {//特殊处理AbilitySpecial
						let special_count: number = 1;//记录第几个special值
						for (const special_index in ability_value) {//遍历special
							const special_info = ability_value[special_index];
							let special_name = Object.keys(special_info)[1];
							let special_avlue = special_info[Object.keys(special_info)[1]];

							let counter: number = 0;
							let has_find: boolean = false;
							for (let i = 0; i < csv_key.length; i++) {// 寻找csv里的AbilitySpecial
								const key_name = csv_key[i];
								if (key_name === 'AbilitySpecial') {
									counter++;
									if (counter === special_count) {
										normal_data[i] = special_name;
										special_data[i] = special_avlue;
										has_find = true;
									}
								}
							}
							if (has_find === false) {//如果csv中的AbilitySpecial值不够则往后加
								csv_key.push('AbilitySpecial');
								normal_data[csv_key.length - 1] = special_name;
								special_data[csv_key.length - 1] = special_avlue;
							}
							special_count++;
						}
					} else {
						let has_find: boolean = false;
						for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
							const key_name = csv_key[i];
							if (key_name === ability_key) {
								normal_data[i] = ability_value;
								has_find = true;
								break;
							}
						}
						if (has_find === false) {
							csv_key.push(ability_key);
							normal_data[csv_key.length - 1] = ability_value;
						}
					}
				}
				// 合并已有的csv数据
				for (let i = 2; i < csv.length; i++) {
					const csv_data = csv[i];
					if (csv_data[0] === normal_data[0]) {//技能名字已有
						for (let j = 0; j < csv_data.length; j++) {
							const value = csv_data[j];
							if (normal_data[j] === undefined) {
								normal_data[j] = value;
							}
						}
					}
				}
				final_csv.push(normal_data);
				final_csv.push(special_data);
			}
			fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
		}
	});
	// 导出技能csv
	let AbilityExport = vscode.commands.registerCommand('dota2tools.ability_export', async (uri) => {
		const excel_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
		const kv_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		// 当前文件路径
		let file_path: string = util.FormatPath(uri.fsPath);
		for (const index in kv_object) {
			const kv_path = util.FormatPath(kv_object[index].replace(/\\\\/g, '/'));
			let file_type: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
			if (file_type === vscode.FileType.Directory) {
				if (file_path.search(kv_path) !== -1) {
					let csv_path = path.join(excel_object[index], 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
					KeyValue2CSV(file_path, csv_path);
					break;
				}
			} else if (file_type === vscode.FileType.File) {
				if (file_path === kv_path) {
					let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
					KeyValue2CSV(file_path, csv_path);
					break;
				}
			}


		}
		// KeyValue2CSV(uri.fsPath, 'C:/Users/wan/Documents/Dota Addons/Guarding Athena/design/3.kv配置表/abilities/csv/ability_enemy.csv');
		function KeyValue2CSV(kv_path: string, csv_path: string) {
			// let csv_path = path.dirname(excel_object[index]);
			if (fs.existsSync(csv_path) === false) {
				util.ShowError("不存在csv文件");
				return;
			}
			let csv: any = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
			let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
			let csv_title = csv[0];
			let csv_key = csv[1];
			let final_csv = [csv_title, csv_key];
			for (const ability_name in kv[Object.keys(kv)[0]]) {
				const ability_data = kv[Object.keys(kv)[0]][ability_name];
				let normal_data: any = [];//第一行
				normal_data[0] = ability_name;
				let special_data: any = [];//第二行
				for (const ability_key in ability_data) {
					const ability_value = ability_data[ability_key];
					if (ability_key === 'AbilitySpecial') {//特殊处理AbilitySpecial
						let special_count: number = 1;//记录第几个special值
						for (const special_index in ability_value) {//遍历special
							const special_info = ability_value[special_index];
							// 遍历special里面的额外键值
							let special_name: string = '';
							let special_value: string = '';
							for (const _special_name in special_info) {
								const _special_value = special_info[_special_name];
								if (_special_name !== 'var_type') {
									special_name += (special_name === '') ? _special_name : ('\n' + _special_name);
									special_value += (special_value === '') ? _special_value : ('\n' + _special_value);
								}
							}
							if (Object.keys(special_info).length > 2) {
								special_name = '"' + special_name + '"';
								special_value = '"' + special_value + '"';
							}
							// let special_name = Object.keys(special_info)[1];
							// let special_avlue = special_info[Object.keys(special_info)[1]];

							let counter: number = 0;
							let has_find: boolean = false;
							for (let i = 0; i < csv_key.length; i++) {// 寻找csv里的AbilitySpecial
								const key_name = csv_key[i];
								if (key_name === 'AbilitySpecial') {
									counter++;
									if (counter === special_count) {
										normal_data[i] = special_name;
										special_data[i] = special_value;
										has_find = true;
									}
								}
							}
							if (has_find === false) {//如果csv中的AbilitySpecial值不够则往后加
								csv_key.push('AbilitySpecial');
								normal_data[csv_key.length - 1] = special_name;
								special_data[csv_key.length - 1] = special_value;
							}
							special_count++;
						}
					} else {
						let has_find: boolean = false;
						for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
							const key_name = csv_key[i];
							if (key_name === ability_key) {
								normal_data[i] = ability_value;
								has_find = true;
								break;
							}
						}
						if (has_find === false) {
							csv_key.push(ability_key);
							normal_data[csv_key.length - 1] = ability_value;
						}
					}
				}
				// 合并已有的csv数据
				for (let i = 2; i < csv.length; i++) {
					const csv_data = csv[i];
					if (csv_data[0] === normal_data[0]) {//技能名字已有
						for (let j = 0; j < csv_data.length; j++) {
							const value = csv_data[j];
							if (normal_data[j] === undefined) {
								normal_data[j] = value;
							}
						}
					}
				}
				final_csv.push(normal_data);
				final_csv.push(special_data);
			}
			fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
		}
	});
	// 导出单位csv
	let UnitExport = vscode.commands.registerCommand('dota2tools.unit_export', async (uri) => {
		const excel_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
		const kv_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		// 当前文件路径

		let file_path: string = util.FormatPath(uri.fsPath);
		for (const index in kv_object) {
			const kv_path = util.FormatPath(kv_object[index].replace(/\\\\/g, '/'));

			let file_type: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
			if (file_type === vscode.FileType.Directory) {
				if (file_path.search(kv_path) !== -1) {
					let csv_path = path.join(excel_object[index], 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
					KeyValue2CSV(file_path, csv_path);
					break;
				}
			} else if (file_type === vscode.FileType.File) {
				console.log(file_path);
				console.log(kv_path);

				if (file_path === kv_path) {
					let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
					KeyValue2CSV(file_path, csv_path);
					break;
				}
			}

		}
		function KeyValue2CSV(kv_path: string, csv_path: string) {
			if (fs.existsSync(csv_path) === false) {
				util.ShowError("不存在csv文件");
				return;
			}
			let csv: any = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
			let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
			let csv_title = csv[0];
			let csv_key = csv[1];
			let final_csv = [csv_title, csv_key];
			for (const unit_name in kv[Object.keys(kv)[0]]) {
				const unit_data = kv[Object.keys(kv)[0]][unit_name];
				let csv_data: any = [];//第一行
				csv_data[0] = unit_name;
				for (const unit_key in unit_data) {
					const unit_value = unit_data[unit_key];
					if (unit_key === 'Creature') {//特殊处理AttachWearables
						let wearable_count: number = 1;//记录第几个AttachWearables值
						for (const wearable_index in unit_value.AttachWearables) {//遍历AttachWearables
							const ItemDef = unit_value.AttachWearables[wearable_index].ItemDef;

							let counter: number = 0;
							let has_find: boolean = false;
							for (let i = 0; i < csv_key.length; i++) {// 寻找csv里的AttachWearables
								const key_name = csv_key[i];
								if (key_name === 'AttachWearables') {
									counter++;
									if (counter === wearable_count) {
										csv_data[i] = ItemDef;
										has_find = true;
									}
								}
							}
							if (has_find === false) {//如果csv中的AbilitySpecial值不够则往后加
								csv_key.push('AttachWearables');
								csv_data[csv_key.length - 1] = ItemDef;
							}
							wearable_count++;
						}
					} else if (typeof (unit_value) === 'string') {
						let has_find: boolean = false;
						for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
							const key_name = csv_key[i];
							if (key_name === unit_key) {
								csv_data[i] = unit_value;
								has_find = true;
								break;
							}
						}
						if (has_find === false) {
							csv_key.push(unit_key);
							csv_data[csv_key.length - 1] = unit_value;
						}
					} else {
						// 多层结构先寻找csv是否存在此key，存在则导入数据，不存在则往后加
						// let has_find:boolean = false;
						// for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
						// 	const key_name = csv_key[i];
						// 	if (key_name === unit_key + '[{]') {

						// 		has_find = true;
						// 		break;
						// 	}
						// }
						// if (has_find === false) {
						// 	csv_key.push(unit_key + '[{]');
						// }
						// if (unit_key) {

						// }
					}
				}
				// 合并已有的csv数据
				for (let i = 2; i < csv.length; i++) {
					const csv_data = csv[i];
					if (csv_data[0] === csv_data[0]) {//单位名字已有
						for (let j = 0; j < csv_data.length; j++) {
							const value = csv_data[j];
							if (csv_data[j] === undefined) {
								csv_data[j] = value;
							}
						}
					}
				}
				final_csv.push(csv_data);
			}
			fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
		}
		function ReadBlock() {

		}
	});
	// 选择图标
	let SelectAbilityTexture = vscode.commands.registerCommand('dota2tools.select_ability_texture', async (uri) => {
		const panel = vscode.window.createWebviewPanel(
			'SelectAbilityTexture', // viewType
			"Select Ability Texture", // 视图标题
			vscode.ViewColumn.One, // 显示在编辑器的哪个部位
			{
				enableScripts: true, // 启用JS，默认禁用
				retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
			}
		);
		// 读取技能图标数据
		const path_list: any = {
			spellicons: context.extensionPath + '/images/spellicons',
			items: context.extensionPath + '/images/items',
			heroes: context.extensionPath + '/images/heroes_icon',
			custom_spellicons: vscode.workspace.getConfiguration().get('dota2-tools.Custom Spellicons Path'),
			custom_items: vscode.workspace.getConfiguration().get('dota2-tools.Custom Items Path'),
		};
		interface IconsData {
			[key: string]: {
				path: string | string[] | undefined | vscode.Uri,
				data: {} | []
			} | IconsData[];
		}
		let custom_spellicons: any = [{}];
		let custom_items: any = [];
		for (const key in path_list.custom_spellicons) {
			const icon_path: string = (key === 'content' ? ContentDir : GameDir) + path_list.custom_spellicons[key];
			if (await util.GetStat(icon_path) !== false) {
				custom_spellicons.push({
					path: util.GetVscodeResourceUri(icon_path),
					data: await ReadIconFolder(icon_path, icon_path)
				});
			}
			// util.DirExists(icon_path);
			// custom_spellicons.push({
			// 	path: util.GetVscodeResourceUri(icon_path),
			// 	data: await ReadIconFolder(icon_path, icon_path)
			// });
		}
		for (const key in path_list.custom_items) {
			const icon_path: string = (key === 'content' ? ContentDir : GameDir) + path_list.custom_items[key];
			if (await util.GetStat(icon_path) !== false) {
				// util.DirExists(icon_path);
				custom_items.push({
					path: util.GetVscodeResourceUri(icon_path),
					data: await ReadIconFolder(icon_path, icon_path)
				});
			}
		}
		let icons_data: IconsData = {
			spellicons: {
				// path: util.GetVscodeResourceUri(path_list.spellicons),
				path: panel.webview.asWebviewUri(path_list.spellicons).toString(),
				data: await ReadIconFolder(path_list.spellicons, path_list.spellicons)
			},
			items: {
				path: util.GetVscodeResourceUri(path_list.items),
				data: await ReadIconFolder(path_list.items, path_list.items)
			},
			heroes: {
				path: util.GetVscodeResourceUri(path_list.heroes),
				data: await ReadHeroesIcon(path_list.heroes)
			},
			custom_spellicons: custom_spellicons,
			custom_items: custom_items,
		};
		// 读取英雄头像数据
		async function ReadHeroesIcon(heroes_path: string) {
			let heroes_data: any = {};
			let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(heroes_path));
			for (let i: number = 0; i < folders.length; i++) {
				const [name, is_directory] = folders[i];
				if (name === undefined) {
					continue;
				}
				if (Number(is_directory) === vscode.FileType.File) {
					let wb = panel.webview.asWebviewUri(vscode.Uri.file(heroes_path + '/' + name));
					heroes_data[name.replace('_png.png', '').replace('npc_dota_hero_', '')] = vscode.Uri.file(wb.path).with({ scheme: wb.scheme, authority: wb.authority }).toString();
				}
			}
			return heroes_data;
		}
		async function ReadIconFolder(path: string | [], root_path: string | []) {
			let icons_data: any = {};
			async function ReadFolder(path: string, root_path: string) {
				let icons_data: any = {};
				let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
				for (let i: number = 0; i < folders.length; i++) {
					const [name, is_directory] = folders[i];
					if (name === undefined) {
						continue;
					}
					if (Number(is_directory) === vscode.FileType.Directory) {
						let data = await ReadFolder(path + '/' + name, root_path);
						icons_data = Object.assign(icons_data, data);
					} else if (Number(is_directory) === vscode.FileType.File) {
						// icons_data[name.replace('_png.png','')] = name;
						let texture_name = (path + '/' + name).split(root_path)[1];
						texture_name = texture_name.replace('/', '');
						let wb = panel.webview.asWebviewUri(vscode.Uri.file(path + '/' + name));
						icons_data[texture_name.replace('_png.png', '').replace('.png', '')] = vscode.Uri.file(wb.path).with({ scheme: wb.scheme, authority: wb.authority }).toString();
					}
				}
				return icons_data;
			}
			if (typeof (path) === 'string' && typeof (root_path) === 'string') {
				let data = await ReadFolder(path, root_path);
				icons_data = Object.assign(icons_data, data);
			} else {
				for (let i = 0; i < path.length; i++) {
					const _path = path[i];
					let data = await ReadFolder(_path, root_path[i]);
					icons_data = Object.assign(icons_data, data);
				}
			}
			return icons_data;
		}

		panel.webview.html = util.GetWebViewContent(context, 'webview/TextureBrowser/TextureBrowser.html');

		panel.webview.postMessage({
			type: "update",
			icons_data: icons_data,
		});
		panel.webview.onDidReceiveMessage(message => {
			console.log(message);

			let texture: string = message.replace(/_png\.png/, '');
			vscode.env.clipboard.writeText(texture);
			util.ShowInfo('已将图标路径复制到剪切板');
			// panel.dispose();
		}, undefined, context.subscriptions);
	});

	let CSV2PHPArray = vscode.commands.registerCommand("dota2tools.CSVToPHPArray", async () => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}

		let Config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
		let sKvPath = (GameDir + Config).replace("\\", "/");

		let KVJSConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
		let ServiceConfig = KVJSConfig.ServiceConfig;
		let sTotalCSVPath = (root_path + ServiceConfig.csvPath).replace("\\", "/");

		let sPHPStr = "<?PHP\n";
		let fFiles = fs.readdirSync(sTotalCSVPath);
		fFiles.forEach(fileName => {
			if (fileName.indexOf(".csv") != -1) {
				let filePath = sTotalCSVPath + fileName;
				let sfNameSimple = fileName.substr(0, fileName.length - 4);
				let sCSV = fs.readFileSync(filePath, "utf-8");
				if (!sCSV) {
					return;
				}
				// 跳过不编译的
				if (ServiceConfig.NoCompile[sfNameSimple] == 1) {
					return;
				}
				let arrCSV: any[][] = util.CSVParse(sCSV);
				let csvConfigs: any = {};
				let bVertical = ServiceConfig.VerticalSettingCSV[sfNameSimple] == 1;
				if (bVertical) {
					for (let i = 0; i < arrCSV.length; i++) {
						let arrLine = arrCSV[i];
						csvConfigs[arrLine[1]] = arrLine[2];
					}
				} else {
					if (arrCSV.length < 3) {
						return;
					}
					let keys: any[] = arrCSV[1];
					for (let i = 2; i < arrCSV.length; i++) {
						let arrLine = arrCSV[i];
						let id: any = arrLine[0];
						if (id) {
							csvConfigs[id] = {};
							for (let j = 1; j < arrLine.length; j++) {
								if (keys[j]) {
									let value = arrLine[j];
									if (value == undefined || value == "") {
									} else {
										csvConfigs[id][keys[j]] = arrLine[j];
									}
								}
							}
						}
					}
				}
				let result = "$" + sfNameSimple + " = " + util.Obj2Str(csvConfigs, "[", "]", " => ") + ";\n";
				sPHPStr += result;
			}
		});
		const phpPath = sTotalCSVPath + 'game_config.php';
		fs.writeFileSync(phpPath, sPHPStr);
		const options = {
			// 显示在第二个编辑器
			viewColumn: vscode.ViewColumn.Two
		};
		vscode.window.showTextDocument(vscode.Uri.file(phpPath), options);
	})

	// kv转js
	let KVToJs = vscode.commands.registerCommand('dota2tools.kv_to_js_config', async () => {
		let root_path: string | undefined = GetRootPath();
		if (root_path === undefined) {
			return;
		}

		let Config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');

		let sKvPath = (GameDir + Config).replace("\\", "/");
		let KVJSConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
		let Configs = KVJSConfig.configs;
		let KVFiles = KVJSConfig.kvfiles;

		for (const sKVName in KVFiles) {
			let sPath = KVFiles[sKVName];
			let sTotalPath = GameDir + '/scripts/' + sPath;
			let kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase(sTotalPath.replace("\\", "/")));
			// 特殊处理
			if (util.StringToAny(Configs.OverrideAbilities) === true && sPath.search("npc_abilities_custom") !== -1) { // 技能合并
				let npc_abilities_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_abilities.txt').replace("\\", "/")));
				let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((GameDir + '/scripts/npc/npc_abilities_override.txt').replace("\\", "/")));
				kv = util.OverrideKeyValue(util.OverrideKeyValue(npc_abilities_kv, npc_abilities_override_kv), kv);
			} else if (util.StringToAny(Configs.OverrideUnits) === true && sPath.search("npc_units_custom") !== -1) { // 单位合并
				let npc_units_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_units.txt').replace("\\", "/")));
				kv = util.OverrideKeyValue(npc_units_kv, kv);
			} else if (util.StringToAny(Configs.OverrideHeroes) === true && sPath.search("npc_heroes_custom") !== -1) { // 英雄合并
				let npc_heroes_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_heroes.txt').replace("\\", "/")));
				kv = util.OverrideKeyValue(npc_heroes_kv, kv);
			} else if (util.StringToAny(Configs.OverrideItems) === true && sPath.search("npc_items_custom") !== -1) { // 物品合并
				let items_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/items.txt').replace("\\", "/")));
				let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(await util.ReadKeyValueWithBase((GameDir + '/scripts/npc/npc_abilities_override.txt').replace("\\", "/")));
				kv = util.OverrideKeyValue(util.OverrideKeyValue(items_kv, npc_abilities_override_kv), kv);
			}
			let sObjectName = "GameUI";
			if (typeof (util.StringToAny(Configs.ObjectName)) === "string") {
				sObjectName = util.StringToAny(Configs.ObjectName);
			}
			let js = util.Obj2Str(kv);
			let fileData = sObjectName + "." + sKVName + " = " + js + ";";
			let jsPath = (ContentDir + "/panorama/scripts/kv/" + sKVName + ".js").replace("\\", "/");
			fs.writeFileSync(jsPath, fileData);
		}
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
	context.subscriptions.push(VsndGenerator);
	context.subscriptions.push(VsndSelector);
	context.subscriptions.push(KV2CSV);
	context.subscriptions.push(AbilityExport);
	context.subscriptions.push(UnitExport);
	context.subscriptions.push(SelectAbilityTexture);
	context.subscriptions.push(KVToJs);
	context.subscriptions.push(CSV2PHPArray);
	// context.subscriptions.push(ActiveListEditorProvider.register(context));
}

// this method is called when your extension is deactivated
export function deactivate() { }
