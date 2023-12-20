import * as fs from 'fs';
import * as mysql from 'mysql2';
import * as vscode from 'vscode';
import { showStatusBarMessage } from "../module/statusBar";
import { csvParse } from "../utils/csvUtils";
import { localize } from "../utils/localize";
import path = require("path");

type DBConfigList = Record<string, mysql.ConnectionOptions>;

export function CSV_ExportDB(context: vscode.ExtensionContext, uri: vscode.Uri) {
	let filePath: string = path.normalize(uri.fsPath);
	let csv = csvParse(fs.readFileSync(filePath, "utf-8")) as string[][];
	if (csv.length <= 0) {
		showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}]: ${localize("dota2tools.csv_invalid")} 1`);
		return;
	}
	let infoString = csv[0][0];
	if (infoString == undefined || infoString.length <= 0) {
		showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}]: ${localize("dota2tools.csv_invalid")} 2`);
		return;
	}
	// [DB:config_name:table_name][S]xxx
	let matchResult = infoString.match(/\[DB:(\w+:)?(\w+)\]/);
	if (matchResult == null) {
		showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}]: ${localize("dota2tools.csv_invalid")} 3`);
		return;
	}
	let [, config_name, table_name] = matchResult;
	config_name = config_name == undefined ? "default" : config_name.replace(":", "");

	let dbConfig = vscode.workspace.getConfiguration().get<DBConfigList>(`dota2-tools.csv_db_config`);
	if (dbConfig == undefined || dbConfig[config_name] == undefined) {
		showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}]: no config`);
		return;
	}

	let connection = mysql.createConnection(dbConfig[config_name]);
	connection.connect();
	let sql = GenerateInsertSQL(table_name, csv);
	connection.query("delete from " + table_name);
	connection.execute(sql, (error, result, fields) => {
		if (error == null) {
			showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}]: ${localize("generateFinish")}`);
		} else {
			showStatusBarMessage(`[${localize("dota2tools.csv_to_db")}][Error]: ${error.message}`);
			console.log(error);
		}
	});
	connection.end();

}

function GenerateInsertSQL(table: string, csv: string[][]) {
	let declareRow = csv[0];
	let filter = declareRow.map(k => k.indexOf("[S]") != -1);
	let keyRow = csv[1];

	let valueList = [];
	for (let i = 2; i < csv.length; i++) {
		const line = csv[i];
		if (line[0] == undefined || line[0].length <= 0) {
			continue;
		}
		valueList.push(`(${line.filter((_k, j) => filter[j]).map(v => `'${v}'`).join(",")})`);
	}

	return `insert into ${table} (${keyRow.filter((_k, i) => filter[i]).join(",")}) values ${valueList.join(",")}`;
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
			// 处理"""转义？
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