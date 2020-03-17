import * as util from './util';
import * as watch from 'watch';
import xlsx from 'node-xlsx';
import * as fs from 'fs';
import * as os from 'os';
import { GameDir } from './init';

export function CreateListener() {
	// WatchKeyValue();
	// WatchCSV();
	WatchXlsm();
	WatchAbilityCSV();
	// WatchLocalization();
}
// 监听kv导出csv
function WatchCSV() {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	// 暂停监听
	watch.unwatchTree(root_path + '/design/3.KV配置表/csv');
	watch.watchTree(GameDir + '/scripts/npc/abilities', function (f, curr, prev) {
		if (typeof f === "object" && prev === null && curr === null) {
			// Finished walking the tree
		} else if (prev === null) {
			console.log('new file');
		} else if (curr.nlink === 0) {
			console.log('removed');
		} else {
			console.log(String(f));
			if (String(f) !== GameDir + '\\scripts\\npc\\abilities\\abilities.kv') {
				return;
			}
			let arr:any = util.CSV2Array(fs.readFileSync(root_path + '/design/3.KV配置表/csv/abilities.csv', 'utf-8'));
			let kv = util.ReadKeyValue2(fs.readFileSync(String(f), 'utf-8'));
			// console.log(kv);
			
			for (const key in kv.abilities) {
				const value = kv.abilities[key];
				for (let i = 2; i < arr.length; i++) {
					const element = arr[i];	// 遍历csv数组
					// 如果csv存在该技能则更新数据
					if (key === element[0]) {
						for (const _key in value) {
							const _value = value[_key];
							if (_key !== 'AbilitySpecial') {
								// 寻找匹配键值
								for (let j = 0; j < arr[2].length; j++) {
									const name = arr[2][j];
									if (name === _key) {
										arr[i][j] = _value;
										break;
									}
								}
							} else {
								// 遍历AbilitySpecial
								let start = 0;
								for (let j = 0; j < arr[1].length; j++) {
									const name = arr[1][j];
									if (name === 'AbilitySpecial') {
										start = j;
										break;
									}
								}
								for (const index in _value) {
									const special_name = Object.keys(_value[index])[1];
									const special_value = _value[index][Object.keys(_value[index])[1]];
									for (let start_index = start; start_index < arr[1].length; start_index++) {
										arr[i][start_index] = special_name;
										arr[i + 1][start_index] = special_value;
										break;
									}
									start++;
								}
							}
						}
					}
				}
			}
			fs.writeFileSync(root_path + '/design/3.KV配置表/csv/abilities.csv', util.Array2CSV(arr));
		}
		WatchAbilityCSV();
	});
}
// 监听excel
function WatchXlsm() {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}

	watch.watchTree(root_path + '/design/3.KV配置表', function (f, curr, prev) {
		if (typeof f === "object" && prev === null && curr === null) {
			// Finished walking the tree
		} else if (prev === null) {
			console.log('new file');
		} else if (curr.nlink === 0) {
			console.log('removed');
		} else {
			console.log(String(f));
			if (String(f) !== root_path + '\\design\\3.KV配置表\\abilities.xlsm') {
				return;
			}
			let sheet_list:any = xlsx.parse(String(f));
			let csv = util.Array2CSV(sheet_list[0].data);
			fs.writeFileSync(root_path + '/design/3.KV配置表/csv/abilities.csv', '\uFEFF' + csv);
		}
	});
}
// 监听技能csv变化
function WatchAbilityCSV() {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	watch.watchTree(root_path + '/design/3.KV配置表/csv', function (f, curr, prev) {
		if (typeof f === "object" && prev === null && curr === null) {
			// Finished walking the tree
		} else if (prev === null) {
			console.log('new file');
		} else if (curr.nlink === 0) {
			console.log('removed');
		} else {
			console.log('changed');
			if (String(f) !== root_path + '\\design\\3.KV配置表\\csv\\abilities.csv') {
				return;
			}
			// 读取ability类型的csv
			const csv_uri:string = root_path + '/design/3.KV配置表/csv/abilities.csv';
			let csv_data:any = {};
			const csv:string = fs.readFileSync(csv_uri, 'utf-8');
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
					} else {
						values_obj[key] = col;
					}
				}
				i++;
				csv_data[row[0]] = values_obj;
			}
			fs.writeFileSync(GameDir + '/scripts/npc/abilities/abilities.kv', util.WriteKeyValue({abilities:csv_data}));
		}
	});
}