import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { EachLine, ObjectHasKey, ReadAPI, ReadKeyValue2, ReadKeyValue3 } from './util';
import { func_api_parse } from './init';
/**
 * 主要用来写一些预处理功能
 * @class Tools
 */
export class Tools {
	constructor(private context: vscode.ExtensionContext) {

	}
	/**
	 * 将items_game.txt的套装信息解析出来
	 * @memberof Tools
	 */
	ItemsGameParse() {
		let sFilePath: string = path.join(this.context.extensionPath, "resource/items_game.txt");
		let tItemsData = ReadKeyValue2(fs.readFileSync(sFilePath, 'utf-8')).items_game.items;

		for (const index in tItemsData) {
			const element = tItemsData[index];
			delete element.portraits;
		}
		fs.writeFileSync(path.join(this.context.extensionPath, "resource/items_game.json"), JSON.stringify(tItemsData));
	}

	/**
	 * 将官方打印的api替换成md格式和obj
	 * @memberof Tools
	 */
	ParsePanoramaAPI() {
		let cl_panorama_script_help_2: string = fs.readFileSync(path.join(this.context.extensionPath, 'resource', 'cl_panorama_script_help_2.txt'), 'utf-8');
		// 处理成md格式
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
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'cl_panorama_script_help_2.md'), cl_panorama_script_help_2);
		// 以下处理成object
		cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/<code>(.*)<\/code>/g, (m, $1) => { return $1; });
		interface ApiInfo {
			[key: string]: string;
		}
		let row = cl_panorama_script_help_2.split(os.EOL);
		let Api: { [key: string]: { [key: string]: ApiInfo; }; } = {};
		EachLine(row, (line: number, lineText: string) => {
			if (lineText.search(/# .*/) !== -1) {
				let name: string = lineText.split('# ')[1];
				Api[name] = {};
				let titles: string[] = row[line + 1].split('|');
				for (let index = line + 3; index < row.length; index++) {
					if (row[index] === '') {
						return index;
					}
					let data: string[] = row[index].split('|');
					Api[name][data[0]] = {};
					Api[name][data[0]][titles[0]] = data[0];
					Api[name][data[0]][titles[1]] = data[1];
					Api[name][data[0]][titles[2]] = data[2];
				}
			}
		});
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), JSON.stringify(Api));
	}

	/**
	 * 将官方打印的css文档处理成md和obj
	 * @memberof Tools
	 */
	ParseCssDocument() {
		let dump_panorama_css_properties: string = fs.readFileSync(path.join(this.context.extensionPath, 'resource', 'dump_panorama_css_properties.txt'), 'utf-8');
		// 处理成md格式
		dump_panorama_css_properties = dump_panorama_css_properties.replace(/=== (.*) ===/g, (m, $1) => { return `# ${$1}`; });
		dump_panorama_css_properties = dump_panorama_css_properties.replace(/<br>/g, os.EOL);
		dump_panorama_css_properties = dump_panorama_css_properties.replace(/<b>(.*)<\/b>/g, (m, $1) => {
			return `## ${$1}${os.EOL}`;
		});
		dump_panorama_css_properties = dump_panorama_css_properties.replace(/<pre>/g, '```' + os.EOL);
		dump_panorama_css_properties = dump_panorama_css_properties.replace(/<\/pre>/g, os.EOL + '```');
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'dump_panorama_css_properties.md'), dump_panorama_css_properties);
		// 以下处理成object
		// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&lt;/g, '<');
		// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&gt;/g, '>');
		let row = dump_panorama_css_properties.split(os.EOL);
		interface CSSInfo {
			description?: string;
			example?: string;
		}
		let CSS: { [key: string]: CSSInfo; } = {};
		EachLine(row, (line: number, lineText: string) => {
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
		// 去除首尾以及多余换行
		for (const key in CSS) {
			const element = CSS[key];
			if (element.description !== undefined) {
				element.description = element.description.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
			}
			if (element.example !== undefined) {
				element.example = element.example.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
			}
		}
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), JSON.stringify(CSS));
	}

	/**
	 * 将官方打印的event文档处理成md
	 * @memberof Tools
	 */
	ParseEventDocument() {
		let dump_panorama_events: string = fs.readFileSync(path.join(this.context.extensionPath, 'resource', 'dump_panorama_events.txt'), 'utf-8');
		// 处理成md格式
		dump_panorama_events = dump_panorama_events.replace(/\{\| class="wikitable"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => { return `${$1}|${$2}|${$2}${os.EOL}--|--|--`; });
		dump_panorama_events = dump_panorama_events.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
			return `${$1}|${$2}|${$3}`;
		});
		dump_panorama_events = dump_panorama_events.replace(/\|\}/g, '');
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'dump_panorama_events.md'), dump_panorama_events);
	}

	/**
	 * 读取PanelList
	 * @memberof Tools
	 */
	ParsePanelList() {
		let PanelList: string = fs.readFileSync(path.join(this.context.extensionPath, 'resource', 'PanelList.md'), 'utf-8');
		let Panel: any = {};
		let row = PanelList.split(os.EOL);
		EachLine(row, (line, lineText) => {
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
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'PanelList.json'), JSON.stringify(Panel));
	}

	/**
	 * 生成音效json
	 * @memberof Tools
	 */
	async VsndGenerator() {
		const sound_path: string = 'C:/Users/bigciba/Documents/Dota Addons/dota2 tracking/root/soundevents';

		let json_obj: any = {};
		await ReadFolder(sound_path);
		fs.writeFileSync(path.join(this.context.extensionPath, "resource", "soundevents.json"), JSON.stringify(json_obj));

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
						let kv = ReadKeyValue2(kvdata);
						for (const key in kv) {
							const value = kv[key];
							if (value['0'] === undefined) {
								if (ObjectHasKey(value, 'vsnd_files') === true) {
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
						let kv = ReadKeyValue3(kvdata);
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

	/**
	 * 将官方打印的api替换成md格式和obj
	 * @memberof Tools
	 */
	ParseLuaAPI() {
		let [class_list, enum_list] = func_api_parse();
		let helpJson = {
			class_list: class_list,
			enum_list: enum_list,
		};
		fs.writeFileSync(path.join(this.context.extensionPath, 'resource', 'dota_script_help2.json'), JSON.stringify(helpJson));
	}
}