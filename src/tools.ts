import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { EachLine } from './util';
// 主要用来写一些预处理功能
// www.tianfengyouxi.com次元天风
// 将官方打印的api替换成md格式和obj
export function ParsePanoramaAPI(context: vscode.ExtensionContext) {
	let cl_panorama_script_help_2: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.txt'), 'utf-8');
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
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.md'), cl_panorama_script_help_2);
	// 以下处理成object
	cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/<code>(.*)<\/code>/g, (m, $1) => { return $1 });
	interface ApiInfo {
		[key:string]: string;
	}
	let row = cl_panorama_script_help_2.split(os.EOL);
	let Api: { [key: string]: { [key: string]: ApiInfo } } = {};
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
	})
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), JSON.stringify(Api));
}
// 将官方打印的css文档处理成md和obj
export function ParseCssDocument(context: vscode.ExtensionContext) {
	let dump_panorama_css_properties: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.txt'), 'utf-8');
	// 处理成md格式
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/=== (.*) ===/g, (m, $1) => { return `# ${$1}`; });
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<br>/g, os.EOL);
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<b>(.*)<\/b>/g, (m, $1) => { 
		return `## ${$1}${os.EOL}`;
	});
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<pre>/g, '```' + os.EOL);
	dump_panorama_css_properties = dump_panorama_css_properties.replace(/<\/pre>/g, os.EOL + '```');
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.md'), dump_panorama_css_properties);
	// 以下处理成object
	// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&lt;/g, '<');
	// dump_panorama_css_properties = dump_panorama_css_properties.replace(/&gt;/g, '>');
	let row = dump_panorama_css_properties.split(os.EOL);
	interface CSSInfo {
		description?: string;
		example?: string;
	}
	let CSS: {[key:string]: CSSInfo} = {};
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
			element.description = element.description.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g,'');
		}
		if (element.example !== undefined) {
			element.example = element.example.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g,'');
		}
	}
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), JSON.stringify(CSS));
}
// 将官方打印的event文档处理成md
export function ParseEventDocument(context: vscode.ExtensionContext) {
	let dump_panorama_events: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.txt'), 'utf-8');
	// 处理成md格式
	dump_panorama_events = dump_panorama_events.replace(/\{\| class="wikitable"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => { return `${$1}|${$2}|${$2}${os.EOL}--|--|--`; });
	dump_panorama_events = dump_panorama_events.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
		return `${$1}|${$2}|${$3}`;
	});
	dump_panorama_events = dump_panorama_events.replace(/\|\}/g, '');
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md'), dump_panorama_events);
}
// 读取PanelList
export function ParsePanelList(context: vscode.ExtensionContext) {
	let PanelList: string = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8');
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
	})
	fs.writeFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), JSON.stringify(Panel));
}