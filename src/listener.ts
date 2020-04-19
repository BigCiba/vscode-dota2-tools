import * as util from './util';
import * as watch from 'watch';
import xlsx from 'node-xlsx';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { Init,KV2LUA, VSND, GameDir } from './init';
import { print, log } from 'util';

export class Listener {
	constructor() {
		this.WatchAbilityExcel();	//监听技能excel
		this.WatchUnitExcel();		//监听单位excel
		if (vscode.workspace.getConfiguration().get('dota2-tools.Listen Localization') === true) {
			this.WatchLocalization();//监听文本合并
		}
	}
	WatchAbilityExcel() {
		const excel_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
		const kv_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
		if (excel_object !== undefined && kv_object !== undefined) {
			for (const index in excel_object) {
				let listen_path = excel_object[index].replace(/\\\\/g,'/');
				listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
				fs.watchFile(listen_path, (curr, prev) => {
					if (curr.nlink === 0) {
						console.log('removed');
					} else {
						console.log('changed');
						// let excel_stat: fs.Stats = fs.statSync(listen_path);
						// let kv_stat: fs.Stats = fs.statSync(kv_object[index]);
						// console.log(excel_stat);
						// console.log(kv_stat);
						// console.log(excel_stat.mtimeMs < kv_stat.mtimeMs);
						// if (excel_stat.mtimeMs < kv_stat.mtimeMs) {
						// 	util.ShowError('Excel版本过旧，不生成kv');
						// 	return;
						// }
						// let sheet_list: any = xlsx.parse(listen_path);
						// let csv: string = util.Array2CSV(sheet_list[0].data);
						// let dir_name: string = path.dirname(listen_path);
						// let file_name: string = listen_path.split(dir_name)[1].replace('/','').split('\.')[0];
						// util.DirExists(dir_name + '/csv');
						// fs.writeFileSync(dir_name + '/csv/' + file_name + '.csv', '\uFEFF' + csv);
						let csv = fs.readFileSync(listen_path, 'utf-8');
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
						
						fs.writeFileSync(kv_object[index], util.WriteKeyValue({KeyValue:util.AbilityCSV2KV(listen_path)}));
					}
				});
			}
		}
	}
	async WatchUnitExcel() {
		const excel_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
		const kv_object: util.Configuration|undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		for (const index in excel_object) {
			let listen_path: string = excel_object[index].replace(/\\\\/g,'/');
			let file_type:vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
			if (file_type === vscode.FileType.Directory) {
				let files:[string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
				for (let i: number = 0; i < files.length; i++) {
					let [file_name, is_file] = files[i];
					if (file_name === undefined) {
						continue;
					}
					if (is_file === vscode.FileType.File){
						let file_path: string = listen_path + '/' + file_name;
						let csv_path: string = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
						WatchFile(csv_path, kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv');
					}
				}
			} else if (file_type === vscode.FileType.File) {
				listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
				WatchFile(listen_path, kv_object[index]);
			}
		}
		function WatchFile(csv_path: string, kv_path: string) {
			console.log(csv_path);
			console.log(kv_path);
			fs.watchFile(csv_path, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					console.log(csv_path + 'changed');
					fs.writeFileSync(kv_path, util.WriteKeyValue({KeyValue:util.UnitCSV2KV(csv_path)}));
				}
			});
		}
	}
	
	WatchLocalization() {
		watch.watchTree(GameDir + '/localization', function (f, curr, prev) {
			if (typeof f === "object" && prev === null && curr === null) {
				// Finished walking the tree
			} else if (prev === null) {
				// f is a new file
				console.log('f is a new file');
				vscode.commands.executeCommand('dota2tools.Localization');
			} else if (curr.nlink === 0) {
				// f was removed
				console.log('f was removed');
				vscode.commands.executeCommand('dota2tools.Localization');
			} else {
				// f was changed
				console.log('f was changed');
				vscode.commands.executeCommand('dota2tools.Localization');
			}
		});
	}
	UnWatchLocalization() {
		watch.unwatchTree(GameDir + '/localization');
	}
}