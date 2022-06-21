import * as vscode from 'vscode';
import { getGameDir } from '../module/addonInfo';
import { eachLine } from '../utils/eachLine';
import * as os from 'os';
import * as fs from 'fs';
import { writeKeyValue } from '../utils/kvUtils';

/**
 * 解析vmap的实体信息
 * @param context
 */
export async function parseMapEntities(context: vscode.ExtensionContext) {
	const gameDir = getGameDir();
	const mapPath: string = gameDir.replace("game\\dota_rogue", "design\\工具\\Decompiler-windows\\maps\\chapter");
	let jsonObj: any = {};
	await readFolder(mapPath);
	async function readFolder(folderName: string) {
		let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folderName));
		for (let i: number = 0; i < folders.length; i++) {
			const [name, isDirectory] = folders[i];
			if (name === undefined) {
				continue;
			}
			if (Number(isDirectory) === vscode.FileType.Directory) {
				await readFolder(folderName + '/' + name);
			} else if (Number(isDirectory) === vscode.FileType.File) {
				// console.log(folder_name, ",", name);
				let data = parseVents(fs.readFileSync(folderName + '/' + name, 'utf-8'));
				let key = "chapter" + folderName.split(mapPath)[1].split("/entities")[0];
				jsonObj[key] = data;
			}
		}
	}
	function parseVents(text: string) {
		let row = text.split(os.EOL);
		let exitData: any = {};
		eachLine(row, (line: number, lineText: string) => {
			if (lineText.indexOf("info_exit_") !== -1) {
				let direction = lineText.split("info_exit_")[1];
				let originLine = "";
				for (let index = 1; index < 10; index++) {
					if (row[line + index].indexOf("origin                         string     ") !== -1) {
						originLine = row[line + index];
						break;
					}
				}
				let aaa = originLine.split("origin                         string     ");
				let bbb = aaa[1].split(" ");
				exitData[direction] = {
					x: bbb[0],
					y: bbb[1],
					z: bbb[2],
				};
			}
		});
		return exitData;
	}
	// eslint-disable-next-line @typescript-eslint/naming-convention
	fs.writeFileSync(gameDir + "/scripts/npc/kv/rooms/room_exit_info.kv", writeKeyValue({ KeyValue: jsonObj }));
}