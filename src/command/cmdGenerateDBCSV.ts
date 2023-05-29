import * as fs from 'fs';
import * as vscode from 'vscode';
import * as mysql from 'mysql2';
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
	let config = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sConfigPath, "utf-8")));
	let connection = mysql.createConnection(config.DB);
	connection.connect();

	(Object.values(config.list ?? {}) as { db_table: string, input: string, keys: string; }[]).forEach((info) => {
		let InputPath = path.resolve(Folder.uri.fsPath, info.input);
		if (!fs.existsSync(InputPath)) {
			return;
		}
		let csv = MyCsvParse(fs.readFileSync(InputPath, "utf-8"));
		let keys = (info.keys as string).split("|");
		let sql = InsertIntoTableWithCSV(info.db_table, keys, csv);
		connection.query("delete from " + info.db_table);
		connection.query(sql);
	});

	connection.end();
}

// csv转array
function MyCsvParse(csv: string) {
	csv = csv.replace(/\r\n/g, '\n');
	let arr: any = [];
	let col = 0;
	let row = 0;
	for (let i = 0; i < csv.length; i++) {
		i = readValue(i);
	}
	return arr;
	function readValue(index: number): any {
		let value = "";
		let state = "normal";
		for (let i = index; i < csv.length; i++) {
			let substr = csv[i];
			let bLast = (i === csv.length - 1);
			if (substr === "\"" && state === "normal") {
				state = "string";
				continue;
			}
			if (substr === "\"" && state === "string") {
				if (csv[i + 1] == '"') {
					value += '"';
					i++;
				} else {
					state = "normal";
				}
				continue;
			}
			if (substr === "\n" && state === "string") {
				value += substr;
				continue;
			}
			if (substr === "\n" && state === "normal") {
				if (arr[row] === undefined) {
					arr[row] = [];
				}
				arr[row][col] = value;
				row++;
				col = 0;
				return i;
			}
			if (substr === "," && state !== "string") {
				if (arr[row] === undefined) {
					arr[row] = [];
				}
				arr[row][col] = value;
				col++;
				return i;
			}
			if (bLast && state === "normal") {
				if (arr[row] === undefined) {
					arr[row] = [];
				}
				value += substr;
				arr[row][col] = value;
				row++;
				col = 0;
				return i;
			}
			value += substr;
		}
	}
}

function InsertIntoTableWithCSV(table: string, keys: string[], csv: string[][]) {
	let first_row = csv[1].map((s) => {
		if (s[0] == "】") {
			return s.slice(1);
		}
		return s;
	});
	let filter = first_row.map(k => keys.indexOf(k) != -1);

	let sql = "insert into " + table;

	// 参数
	sql += "(" + first_row.filter((_k, i) => filter[i]).join(",") + ")";

	let value_list = " values ";
	for (let i = 2; i < csv.length; i++) {
		const line = csv[i];
		if (line[0] == undefined || line[0].length <= 0) {
			continue;
		}
		value_list += "(" + line.filter((_k, j) => filter[j]).map(v => `'${v}'`).join(",") + "),";
	}
	// 去掉最后一个逗号
	value_list = value_list.slice(0, -1);

	sql += value_list;

	return sql;
}