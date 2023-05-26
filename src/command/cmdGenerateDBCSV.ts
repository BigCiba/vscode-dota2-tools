import * as fs from 'fs';
import * as vscode from 'vscode';
import { array2csv, csv2obj } from "../utils/csvUtils";
import { getKeyValueObjectByIndex, readKeyValue2 } from "../utils/kvUtils";
import path = require("path");

/**
 * 将csv的部分数据导出为新的csv（格式用于数据库软件导入）
 */
export function GenerateDBCSV(context: vscode.ExtensionContext) {
	const folders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	if (folders == undefined) {
		return;
	}
	const Folder = folders[0];
	if (Folder == undefined) {
		return;
	}

	let sConfigPath = path.resolve(Folder.uri.fsPath, "eom/server_db_config.kv");
	if (!fs.existsSync(sConfigPath)) {
		return;
	}
	let config = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sConfigPath, 'utf-8')));
	Object.entries(config.list ?? {}).forEach(([input, sKeys]) => {
		let InputPath = path.resolve(Folder.uri.fsPath, input);
		if (!fs.existsSync(InputPath)) {
			return;
		}
		let csv = csv2obj(fs.readFileSync(InputPath, "utf-8"));
		let result: any = {};
		let keys = (sKeys as string).split("|");
		for (const [id, data] of Object.entries(csv)) {
			let temp: Table = {};
			keys.forEach(sKey => {
				temp[sKey] = (data as Table)[sKey];
			});
			result[id] = temp;
		}
		let outFile = path.resolve(Folder.uri.fsPath, config.OutputPath, path.basename(InputPath));
		fs.writeFileSync(outFile, Obj2CSVWithKey(result, keys));
	});
}

function Obj2CSVWithKey(obj: any, keys: string[]) {
	let arrCSV: any[] = [];
	arrCSV.push(keys);
	for (let lineID in obj) {
		if (lineID === "__key_sc") {
			continue;
		}

		let temp: any[] = [];
		let oLineInfo = obj[lineID];
		for (const columnKey of keys) {
			temp.push(oLineInfo[columnKey] ?? '');
		}
		arrCSV.push(temp);
	}
	return array2csv(arrCSV);
}