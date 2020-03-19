import * as util from './util';
import * as watch from 'watch';
import xlsx from 'node-xlsx';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

export function CreateListener() {
	WatchXlsm();
}
// 监听kv导出csv
function WatchCSV() {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	watch.watchTree('C:\Users\bigciba\Documents\Dota Addons\Tui3\game\dota_addons\tui3\scripts\npc\abilities', function (f, curr, prev) {
		if (typeof f === "object" && prev === null && curr === null) {
			// Finished walking the tree
		} else if (prev === null) {
			console.log('new file');
		} else if (curr.nlink === 0) {
			console.log('removed');
		} else {
			console.log(String(f));
		}
	});
}
// 监听excel
function WatchXlsm() {
	const excel_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
	const kv_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
	if (excel_object !== undefined && kv_object !== undefined) {
		for (const index in excel_object) {
			const listen_path = excel_object[index].replace(/\\\\/g,'/');
			fs.watchFile(listen_path, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					console.log('changed');
					let sheet_list: any = xlsx.parse(listen_path);
					let csv: string = util.Array2CSV(sheet_list[0].data);
					let dir_name: string = path.dirname(listen_path);
					let file_name: string = listen_path.split(dir_name)[1].replace('/','').split('\.')[0];
					util.DirExists(dir_name + '/csv');
					fs.writeFileSync(dir_name + '/csv/' + file_name + '.csv', '\uFEFF' + csv);
					// 生成kv
					let csv_data:any = {};
					let csv_arr:any = util.CSV2Array(csv);
					const csv_key:[] = csv_arr[1];
					for (let i = 2; i < csv_arr.length; i++) {
						const row:any = csv_arr[i];
						if (row.length === 0) {
							continue;
						}

						let AbilitySpecial:number = 1;
						let values_obj: any = {
							AbilitySpecial:{}
						};
						for (let j = 1; j < row.length; j++) {
							const col = row[j];
							// 跳过空值
							if (col === '') {
								continue;
							}
							let key:string = csv_key[j];
							// special值特殊处理
							if (key === 'AbilitySpecial') {
								key = ("0" + AbilitySpecial).substr(-2);
								let value = csv_arr[i+1][j];
								values_obj.AbilitySpecial[key] = {
									var_type: value.search(/\./g) !== -1 ? 'FIELD_FLOAT':'FIELD_INTEGER',
									[col]: csv_arr[i+1][j]
								};
								AbilitySpecial++;
							} else if (key === '') {
								continue;
							} else {
								values_obj[key] = col;
							}
						}
						i++;
						csv_data[row[0]] = values_obj;
					}
					fs.writeFileSync(kv_object[index], util.WriteKeyValue({abilities:csv_data}));
				}
			});
		}
	}
}