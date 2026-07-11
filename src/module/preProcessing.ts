import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { eachLine } from '../utils/eachLine';
import { getLiteItemsGame } from '../utils/getLiteItemsGame';
import { readKeyValue2, readKeyValue3 } from '../utils/kvUtils';
import { objectHasKey } from '../utils/objectHasKey';
import { readEnum } from '../utils/readEnum';
import { readFunction } from '../utils/readFunction';
import { getDotaApiNoteClass } from './apiNote';

/**
 * Update steps:
 * 1. Extract items_game.txt into the resource folder
 * 2. Copy the console output cl_panorama_script_help_2 into the resource file of the same name
 * 3. Copy the console output dump_panorama_css_properties into the resource file of the same name
 * 4. Copy the console output dump_panorama_events into the resource file of the same name
 * 5. PanelList.md is a hand-written document
 * 6. Extract soundevents and adjust the path parsing manually
 * 7. Copy the latest api to generate the changelog
 */

/** Parse the item set information out of items_game.txt */
export function itemsGameParse(context: vscode.ExtensionContext) {
	let sFilePath: string = path.join(context.extensionPath, "resource/items_game.txt");
	let tItemsData = readKeyValue2(fs.readFileSync(sFilePath, 'utf-8'), true, false).items_game.items;

	for (const index in tItemsData) {
		const element = tItemsData[index];
		delete element.portraits;
	}
	fs.writeFileSync(path.join(context.extensionPath, "resource/items_game.json"), JSON.stringify(tItemsData));
}

/** Convert the official API output into md format and an object */
export function parsePanoramaAPI(context: vscode.ExtensionContext) {
	let cl_panorama_script_help_2: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.txt'), 'utf-8');
	// Convert to md format
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/=== (.*) ===/g, (m, $1) => {
		return '# ' + $1;
	});
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
		return `${$1}|${$2}|${$3}`;
	});
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\{\| class="standard-table" style="width: 100%;"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => {
		return `${$1}|${$2}|${$3}${os.EOL}--|--|--`;
	});
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\|\}\r\n/g, '');
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.md'), cl_panorama_script_help_2);
	// Below: convert to an object
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/<code>(.*)<\/code>/g, (m, $1) => { return $1; });
	interface ApiInfo {
		[key: string]: string;
	}
	let row = cl_panorama_script_help_2.split(os.EOL);
	let api: { [key: string]: { [key: string]: ApiInfo; }; } = {};
	eachLine(row, (line: number, lineText: string) => {
		if (lineText.search(/# .*/) !== -1) {
			let name: string = lineText.split('# ')[1];
			api[name] = {};
			let titles: string[] = row[line + 1].split('|');
			for (let index = line + 3; index < row.length; index++) {
				if (row[index] === '') {
					return index;
				}
				let data: string[] = row[index].split('|');
				api[name][data[0]] = {};
				api[name][data[0]][titles[0]] = data[0];
				api[name][data[0]][titles[1]] = data[1];
				api[name][data[0]][titles[2]] = data[2];
			}
		}
	});
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), JSON.stringify(api));
}

/** Convert the official CSS document output into md and an object */
export function parseCssDocument(context: vscode.ExtensionContext) {
	let dump_panorama_css_properties: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.txt'), 'utf-8');
	// Convert to md format
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/=== (.*) ===/g, (m, $1) => { return `# ${$1}`; });
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<br>/g, os.EOL);
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<b>(.*)<\/b>/g, (m, $1) => {
		return `## ${$1}${os.EOL}`;
	});
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<pre>/g, '```' + os.EOL);
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<\/pre>/g, os.EOL + '```');
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.md'), dump_panorama_css_properties);
	// Below: convert to an object
	// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&lt;/g, '<');
	// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&gt;/g, '>');
	let row = dump_panorama_css_properties.split(os.EOL);
	interface CSSInfo {
		description?: string;
		example?: string;
	}
	let CSS: { [key: string]: CSSInfo; } = {};
	eachLine(row, (line: number, lineText: string) => {
		if (lineText.search(/# .*/) !== -1) {
			let name: string = lineText.split('# ')[1];
			CSS[name] = {};
			for (let index = line + 1; index < row.length; index++) {
				if (row[index].search('## Example') !== -1) {
					for (let j = index + 2; j < row.length; j++) {
						if (row[j].search('```') !== -1) {
							return j;
						}
						if (CSS[name].example == undefined) {
							CSS[name].example = '';
						}
						CSS[name].example += `${row[j]}${os.EOL}`;
					}
				}
				if (row[index].search('#') !== -1) {
					return index - 1;
				}
				if (CSS[name].description == undefined) {
					CSS[name].description = '';
				}
				CSS[name].description += `${row[index]}${os.EOL}`;
			}
		}
	});
	// Remove leading/trailing and extra line breaks
	for (const key in CSS) {
		const element = CSS[key];
		if (element.description !== undefined) {
			element.description = element.description.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
		}
		if (element.example !== undefined) {
			element.example = element.example.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
		}
	}
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), JSON.stringify(CSS));
}

/** Convert the official event document output into md */
export function parseEventDocument(context: vscode.ExtensionContext) {
	let dump_panorama_events: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.txt'), 'utf-8');
	// Convert to md format
	dump_panorama_events = dump_panorama_events.replace(/\{\| class="wikitable"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => { return `${$1}|${$2}|${$2}${os.EOL}--|--|--`; });
	dump_panorama_events = dump_panorama_events.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
		return `${$1}|${$2}|${$3}`;
	});
	dump_panorama_events = dump_panorama_events.replace(/\|\}/g, '');
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md'), dump_panorama_events);
}

/** Read PanelList */
export function parsePanelList(context: vscode.ExtensionContext) {
	let PanelList: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8');
	let Panel: any = {};
	let row = PanelList.split(os.EOL);
	eachLine(row, (line, lineText) => {
		if (lineText.search(/^# .*/) !== -1) {
			Panel[lineText.split('# ')[1]] = {
				start: line,
				end: row.length
			};
			for (let index = line + 1; index < row.length; index++) {
				const element = row[index];
				if (element.search(/^# .*/) !== -1) {
					Panel[lineText.split('# ')[1]].end = index - 1;
					break;
				}
			}
		}
	});
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), JSON.stringify(Panel));
}

/** Generate the sound effects json */
export async function vsndGenerator(context: vscode.ExtensionContext) {
	const sound_path: string = 'D:/Dota Addons/dota2 tracking/root/soundevents';

	let json_obj: any = {};
	await readFolder(sound_path);
	fs.writeFileSync(path.join(context.extensionPath, "resource", "soundevents.json"), JSON.stringify(json_obj));

	async function readFolder(folder_name: string) {
		let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folder_name));
		for (let i: number = 0; i < folders.length; i++) {
			const [name, is_directory] = folders[i];
			if (name === undefined) {
				continue;
			}
			if (Number(is_directory) === vscode.FileType.Directory) {
				await readFolder(folder_name + '/' + name);
			} else if (Number(is_directory) === vscode.FileType.File) {
				console.log(folder_name + '/' + name);
				let kvdata = fs.readFileSync(folder_name + '/' + name, 'utf-8');
				if (kvdata[0] === '"') {
					let kv = readKeyValue2(kvdata);
					for (const key in kv) {
						const value = kv[key];
						if (value['0'] === undefined) {
							if (objectHasKey(value, 'vsnd_files') === true) {
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
				} else if (kvdata[0] === '{' || kvdata[0] === "<") {
					let kv = readKeyValue3(kvdata);
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
}

/** Convert the official API output into md format and an object */
export function parseLuaAPI(context: vscode.ExtensionContext) {
	const dotaApiNote = getDotaApiNoteClass();
	const classList = dotaApiNote.getClassList();
	const enumList = dotaApiNote.getEnumList();
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dota_script_help2.json'), JSON.stringify({
		class_list: classList,
		enum_list: enumList,
	}));
}

/** Generate the lua api change history */
export async function parseLuaAPIChangelog(context: vscode.ExtensionContext) {
	let serverChangelogPath = path.join(context.extensionPath, 'resource', 'lua_server_api_changelog');
	let serverFolders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(serverChangelogPath));
	let serverChangelogs: any = {};
	let clientChangelogPath = path.join(context.extensionPath, 'resource', 'lua_client_api_changelog');
	let clientFolders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(clientChangelogPath));
	let clientChangelogs: any = {};
	// Read the server api
	for (let i: number = 0; i < serverFolders.length; i++) {
		const [name, is_directory] = serverFolders[i];
		if (name === undefined) {
			continue;
		}
		if (Number(is_directory) === vscode.FileType.File) {
			const dota_script_help2 = fs.readFileSync(path.join(serverChangelogPath, name), 'utf-8');
			const rows = dota_script_help2.split(os.EOL);
			// Read the server API
			let class_list: { [k: string]: any; } = {};
			let enum_list: { [k: string]: any; } = {};
			for (let i = 0; i < rows.length; i++) {
				// Function
				let option = rows[i].match(/---\[\[.*\]\]/g);
				if (option !== null && option.length > 0) {
					let [fun_info, new_line] = readFunction(i, rows);
					if (class_list[fun_info.class] === undefined) {
						class_list[fun_info.class] = [];
					}
					class_list[fun_info.class].push(fun_info);
					i = new_line;
				}
				// Constants
				if (rows[i].search('--- Enum ') !== -1) {
					let enum_name = rows[i].substr(9, rows[i].length);
					if (enum_list[enum_name] === undefined) {
						enum_list[enum_name] = [];
					}
					let [enum_info, new_line] = readEnum(i, rows);
					for (let j = 0; j < enum_info.length; j++) {
						const enum_arr = enum_info[j];
					}
					enum_list[enum_name] = enum_info;
					i = new_line;
				}
			}
			serverChangelogs[name.split(".")[0]] = {
				class_list: class_list,
				enum_list: enum_list
			};
		}
	}
	// client api
	for (let i: number = 0; i < clientFolders.length; i++) {
		const [name, is_directory] = clientFolders[i];
		if (name === undefined) {
			continue;
		}
		if (Number(is_directory) === vscode.FileType.File) {
			const dota_script_help2 = fs.readFileSync(path.join(clientChangelogPath, name), 'utf-8');
			const rows = dota_script_help2.split(os.EOL);
			// Read the client API
			let class_list: { [k: string]: any; } = {};
			let enum_list: { [k: string]: any; } = {};
			for (let i = 0; i < rows.length; i++) {
				// Function
				let option = rows[i].match(/---\[\[.*\]\]/g);
				if (option !== null && option.length > 0) {
					let [fun_info, new_line] = readFunction(i, rows);
					if (class_list[fun_info.class] === undefined) {
						class_list[fun_info.class] = [];
					}
					class_list[fun_info.class].push(fun_info);
					i = new_line;
				}
				// Constants
				if (rows[i].search('--- Enum ') !== -1) {
					let enum_name = rows[i].substr(9, rows[i].length);
					if (enum_list[enum_name] === undefined) {
						enum_list[enum_name] = [];
					}
					let [enum_info, new_line] = readEnum(i, rows);
					for (let j = 0; j < enum_info.length; j++) {
						const enum_arr = enum_info[j];
					}
					enum_list[enum_name] = enum_info;
					i = new_line;
				}
			}
			clientChangelogs[name.split(".")[0]] = {
				class_list: class_list,
				enum_list: enum_list
			};
		}
	}
	// Compare
	let markdown = "# DOTA2 API Changelog\nThe dates below are the times of the plugin's changelog entries.\n";
	let serverKeys = Object.keys(serverChangelogs);
	for (let index = serverKeys.length - 1; index >= 0; index--) {
		if (index > 0) {
			markdown += `# ${serverKeys[index].replace(/_/g, ".")}\n## Lua Server\n`;
			const changelog_old = serverChangelogs[serverKeys[index - 1]];
			const changelog_new = serverChangelogs[serverKeys[index]];
			const classList = Array.from(new Set(Object.keys(changelog_new.class_list ?? {}).concat(Object.keys(changelog_old.class_list ?? {}))));
			// Compare functions
			for (const className of classList) {
				const funcList_old = changelog_old.class_list[className];
				const funcList_new = changelog_new.class_list[className];
				if (funcList_new) {
					for (let j = 0; j < funcList_new.length; j++) {
						const funInfo_new = funcList_new[j];
						let find = false;
						if (funcList_old) {
							for (const funInfo_old of funcList_old) {
								if (funInfo_old.function == funInfo_new.function) {
									find = true;
									// Return value
									if (funInfo_old.return != funInfo_new.return) {
										markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
									} else {
										for (const paramName in funInfo_new.params) {
											if (funInfo_old.params[paramName] == undefined || funInfo_old.params[paramName].params_name != funInfo_new.params[paramName].params_name) {
												markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
											}
										}
									}
								}
							}
						}
						// Added
						if (find == false) {
							markdown += `- ✨ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ${funInfo_new.description}\n`;
						}
					}
				}
				if (funcList_old) {
					for (let j = 0; j < funcList_old.length; j++) {
						const funInfo_old = funcList_old[j];
						let find = false;
						if (funcList_new) {
							for (const funInfo_new of funcList_new) {
								if (funInfo_old.function == funInfo_new.function) {
									find = true;
								}
							}
						}
						// Removed
						if (find == false) {
							markdown += `- ❌ API: <font color='#00D6AA'>${funInfo_old.class == "Global" ? "" : funInfo_old.class}</font> ${formatLuaFunction(funInfo_old)}\n`;
						}
					}
				}
			}
			// Compare constants
			for (const enumType in changelog_new.enum_list) {
				const enumList_old = changelog_old.enum_list[enumType];
				const enumList_new = changelog_new.enum_list[enumType];
				for (let j = 0; j < enumList_new.length; j++) {
					const enumInfo_new = enumList_new[j];
					let find = false;
					if (enumList_old) {
						for (const enumInfo_old of enumList_old) {
							if (enumInfo_old.name == enumInfo_new.name) {
								find = true;
							}
						}
					}
					// Added
					if (find == false) {
						markdown += `- ✨ Enum: <font color='#00D6AA'>${enumType}</font> <font color='#9cdcfe'>${enumInfo_new.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_new.function : ""}</font>\n`;
					}
				}
				if (enumList_old) {
					for (let j = 0; j < enumList_old.length; j++) {
						const enumInfo_old = enumList_old[j];
						let find = false;
						if (enumList_new) {
							for (const enumInfo_new of enumList_new) {
								if (enumInfo_old.name == enumInfo_new.name) {
									find = true;
								}
							}
						}
						// Removed
						if (find == false) {
							markdown += `- ❌ Enum: <font color='#00D6AA'>${enumType}</font> ~~<font color='#9cdcfe'>${enumInfo_old.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_old.function : ""}</font>~~\n`;
						}
					}
				}
			}
			// Add a marker at the end
			markdown += `${serverKeys[index]}_Lua_Client\n`;
		}
	}
	let clientKeys = Object.keys(clientChangelogs);
	for (let index = clientKeys.length - 1; index >= 0; index--) {
		if (index > 0) {
			let client_markdown = `## Lua Client\n`;
			const changelog_old = clientChangelogs[clientKeys[index - 1]];
			const changelog_new = clientChangelogs[clientKeys[index]];
			const classList = Array.from(new Set(Object.keys(changelog_new.class_list ?? {}).concat(Object.keys(changelog_old.class_list ?? {}))));
			// Compare functions
			for (const className of classList) {
				const funcList_old = changelog_old.class_list[className];
				const funcList_new = changelog_new.class_list[className];
				if (funcList_new) {
					for (let j = 0; j < funcList_new.length; j++) {
						const funInfo_new = funcList_new[j];
						let find = false;
						if (funcList_old) {
							for (const funInfo_old of funcList_old) {
								if (funInfo_old.function == funInfo_new.function) {
									find = true;
									// Return value
									if (funInfo_old.return != funInfo_new.return) {
										client_markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
									} else {
										for (const paramName in funInfo_new.params) {
											if (funInfo_old.params[paramName] == undefined || funInfo_old.params[paramName].params_name != funInfo_new.params[paramName].params_name) {
												client_markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
											}
										}
									}
								}
							}
						}
						// Added
						if (find == false) {
							client_markdown += `- ✨ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ${funInfo_new.description}\n`;
						}
					}
				}
				if (funcList_old) {
					for (let j = 0; j < funcList_old.length; j++) {
						const funInfo_old = funcList_old[j];
						let find = false;
						if (funcList_new) {
							for (const funInfo_new of funcList_new) {
								if (funInfo_old.function == funInfo_new.function) {
									find = true;
								}
							}
						}
						// Removed
						if (find == false) {
							client_markdown += `- ❌ API: <font color='#00D6AA'>${funInfo_old.class == "Global" ? "" : funInfo_old.class}</font> ${formatLuaFunction(funInfo_old)}\n`;
						}
					}
				}
			}
			// Compare constants
			for (const enumType in changelog_new.enum_list) {
				const enumList_old = changelog_old.enum_list[enumType];
				const enumList_new = changelog_new.enum_list[enumType];
				for (let j = 0; j < enumList_new.length; j++) {
					const enumInfo_new = enumList_new[j];
					let find = false;
					if (enumList_old) {
						for (const enumInfo_old of enumList_old) {
							if (enumInfo_old.name == enumInfo_new.name) {
								find = true;
							}
						}
					}
					// Added
					if (find == false) {
						client_markdown += `- ✨ Enum: <font color='#00D6AA'>${enumType}</font> <font color='#9cdcfe'>${enumInfo_new.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_new.function : ""}</font>\n`;
					}
				}
				if (enumList_old) {
					for (let j = 0; j < enumList_old.length; j++) {
						const enumInfo_old = enumList_old[j];
						let find = false;
						if (enumList_new) {
							for (const enumInfo_new of enumList_new) {
								if (enumInfo_old.name == enumInfo_new.name) {
									find = true;
								}
							}
						}
						// Removed
						if (find == false) {
							client_markdown += `- ❌ Enum: <font color='#00D6AA'>${enumType}</font> ~~<font color='#9cdcfe'>${enumInfo_old.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_old.function : ""}</font>~~\n`;
						}
					}
				}
			}
			let a = clientKeys[index] + "_Lua_Client";
			markdown = markdown.replace(clientKeys[index] + "_Lua_Client", client_markdown);
		}
	}
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'lua_api_changelog.md'), markdown);
	function formatLuaFunction(funInfo: any) {
		let fun_md = `<font color='#dcdcaa'>${funInfo.function}</font>` + '(';
		let count = 0;
		for (let params_name in funInfo.params) {
			let params_name_note = funInfo.params[params_name].params_name || params_name;
			if (count === 0) {
				count++;
				fun_md += `<font color='#569cd6'>${params_name_note}</font>: <font color='#c586c0'>${funInfo.params[params_name].type}</font>`;
			} else {
				fun_md += `, <font color='#569cd6'>${params_name_note}</font>: <font color='#c586c0'>${funInfo.params[params_name].type}</font>`;
			}
		}
		fun_md += ')';
		fun_md += `: <font color='#c586c0'>${funInfo.return}</font>`;
		return fun_md;
	}
}

/** Parse the item set information out of items_game.txt */
export function liteItemsGameParse(context: vscode.ExtensionContext) {
	fs.writeFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), JSON.stringify(getLiteItemsGame(context)));
}