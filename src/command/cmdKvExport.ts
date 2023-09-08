import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { getGameDir, isValidFolder } from '../module/addonInfo';
import { showStatusBarMessage } from '../module/statusBar';
import { getPathInfo } from '../utils/pathUtils';
import { array2csv, csv2array } from '../utils/csvUtils';
import { readKeyValue2 } from '../utils/kvUtils';
import { eachExcelConfig } from './cmdExcel2KV';

export async function abilityExport(context: vscode.ExtensionContext, uri: vscode.Uri) {
	// 当前文件路径
	let filePath: string = path.normalize(uri.fsPath);
	let abilityExcelConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.A4.AbilityExcel');
	if (abilityExcelConfig) {
		eachExcelConfig(abilityExcelConfig, async (kvDir, excelDir) => {
			let fileType: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(kvDir))).type;
			if (fileType === vscode.FileType.Directory) {
				if (filePath.indexOf(kvDir) !== -1) {
					let csvPath = path.join(excelDir, 'csv', path.basename(filePath).replace(path.extname(filePath), '.csv'));
					keyValue2CSV(filePath, csvPath);
				}
			} else if (fileType === vscode.FileType.File) {
				if (filePath === kvDir) {
					let csvPath = path.join(path.dirname(excelDir), 'csv', path.basename(excelDir).replace(path.extname(excelDir), '.csv'));
					keyValue2CSV(filePath, csvPath);
				}
			}
		});
	}

	// KeyValue2CSV(uri.fsPath, 'C:/Users/wan/Documents/Dota Addons/Guarding Athena/design/3.kv配置表/abilities/csv/ability_enemy.csv');
	async function keyValue2CSV(kvPath: string, csvPath: string) {
		// let csv_path = path.dirname(excel_object[index]);
		if (await getPathInfo(csvPath) === false) {
			// util.ShowError("不存在csv文件");
			return;
		}
		let csv: any = csv2array(fs.readFileSync(csvPath, 'utf-8'));
		let kv = readKeyValue2(fs.readFileSync(kvPath, 'utf-8'));
		let csvTitle = csv[0];
		let csvKey = csv[1];
		let finalCsv = [csvTitle, csvKey];
		for (const abilityName in kv[Object.keys(kv)[0]]) {
			const abilityData = kv[Object.keys(kv)[0]][abilityName];
			let normalData: any = [];//第一行
			normalData[0] = abilityName;
			let specialData: any = [];//第二行
			for (const abilityKey in abilityData) {
				const abilityValue = abilityData[abilityKey];
				if (abilityKey === 'AbilitySpecial') {//特殊处理AbilitySpecial
					let specialCount: number = 1;//记录第几个special值
					let keys = Object.keys(abilityValue).sort(function (a, b) { return Number(a) - Number(b); });
					for (let index = 0; index < keys.length; index++) {
						// for (const special_index in ability_value) {//遍历special
						const specialInfo = abilityValue[keys[index]];
						// 遍历special里面的额外键值
						let specialName: string = '';
						let specialValue: string = '';
						for (const _specialName in specialInfo) {
							const _specialValue = specialInfo[_specialName];
							if (_specialName !== 'var_type') {
								specialName += (specialName === '') ? _specialName : ('\n' + _specialName);
								specialValue += (specialValue === '') ? _specialValue : ('\n' + _specialValue);
							}
						}
						if (Object.keys(specialInfo).length > 2) {
							specialName = '"' + specialName + '"';
							specialValue = '"' + specialValue + '"';
						}
						// let special_name = Object.keys(special_info)[1];
						// let special_avlue = special_info[Object.keys(special_info)[1]];

						let counter: number = 0;
						let hasFind: boolean = false;
						for (let i = 0; i < csvKey.length; i++) {// 寻找csv里的AbilitySpecial
							const keyName = csvKey[i];
							if (keyName === 'AbilitySpecial') {
								counter++;
								if (counter === specialCount) {
									normalData[i] = specialName;
									specialData[i] = specialValue;
									hasFind = true;
								}
							}
						}
						if (hasFind === false) {//如果csv中的AbilitySpecial值不够则往后加
							csvKey.push('AbilitySpecial');
							normalData[csvKey.length - 1] = specialName;
							specialData[csvKey.length - 1] = specialValue;
						}
						specialCount++;
					}
				} else if (abilityKey.indexOf("AbilityValues") != -1) {//特殊处理AbilityValues
					let specialCount: number = 1;//记录第几个special值
					let keys = Object.keys(abilityValue).sort(function (a, b) { return Number(a) - Number(b); });
					for (let index = 0; index < keys.length; index++) {
						const specialInfo = abilityValue[keys[index]];
						let specialName = '';
						let specialValue = '';

						if (typeof specialInfo == "string") {
							specialName = keys[index];
							specialValue = specialInfo;
						} else if (typeof specialInfo == "object") {
							specialName = keys[index];
							specialValue = specialInfo;
							specialValue = specialInfo.value ?? specialInfo.value2 ?? "0";	// v社经常写value2适配一下
							for (const _specialName in specialInfo) {
								const _specialValue = specialInfo[_specialName];
								if (_specialName != "value" && _specialName != "value2") {
									specialName += '\n' + _specialName;
									specialValue += '\n' + _specialValue;
								}
							}
							specialName = '"' + specialName + '"';
							specialValue = '"' + specialValue + '"';
						}

						let counter: number = 0;
						let hasFind: boolean = false;
						for (let i = 0; i < csvKey.length; i++) {// 寻找csv里的AbilityValues
							const keyName = csvKey[i];
							if (keyName == abilityKey) {
								counter++;
								if (counter === specialCount) {
									normalData[i] = specialName;
									specialData[i] = specialValue;
									hasFind = true;
								}
							}
						}
						if (hasFind === false) {//如果csv中的AbilitySpecial值不够则往后加
							csvKey.push(abilityKey);
							normalData[csvKey.length - 1] = specialName;
							specialData[csvKey.length - 1] = specialValue;
						}
						specialCount++;
					}
				} else {
					let hasFind: boolean = false;
					for (let i = 0; i < csvKey.length; i++) {//csv中是否有此key
						const keyName = csvKey[i];
						if (keyName === abilityKey) {
							normalData[i] = abilityValue;
							hasFind = true;
							break;
						}
					}
					if (hasFind === false) {
						csvKey.push(abilityKey);
						normalData[csvKey.length - 1] = abilityValue;
					}
				}
			}
			// 合并已有的csv数据
			for (let i = 2; i < csv.length; i++) {
				const csvData = csv[i];
				if (csvData[0] === normalData[0]) {//技能名字已有
					for (let j = 0; j < csvData.length; j++) {
						const value = csvData[j];
						if (normalData[j] === undefined) {
							normalData[j] = value;
						}
					}
				}
			}
			finalCsv.push(normalData);
			finalCsv.push(specialData);
		}
		fs.writeFileSync(csvPath, array2csv(finalCsv));
	}
}
export async function unitExport(context: vscode.ExtensionContext, uri: vscode.Uri) {
	// 当前文件路径
	let filePath: string = path.normalize(uri.fsPath);
	let unitExcelConfig: Table | undefined = vscode.workspace.getConfiguration().get('dota2-tools.A4.UnitExcel');
	if (unitExcelConfig) {
		eachExcelConfig(unitExcelConfig, async (kvDir, excelDir) => {
			let fileType: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(kvDir))).type;
			if (fileType === vscode.FileType.Directory) {
				if (filePath.indexOf(kvDir) !== -1) {
					let csvPath = path.join(excelDir, 'csv', path.basename(filePath).replace(path.extname(filePath), '.csv'));
					keyValue2CSV(filePath, csvPath);
				}
			} else if (fileType === vscode.FileType.File) {
				if (filePath === kvDir) {
					let csvPath = path.join(path.dirname(excelDir), 'csv', path.basename(excelDir).replace(path.extname(excelDir), '.csv'));
					keyValue2CSV(filePath, csvPath);
				}
			}
		});
	}
	async function keyValue2CSV(kvPath: string, csvPath: string) {
		if (await getPathInfo(csvPath) === false) {
			return;
		}
		let csv: any = csv2array(fs.readFileSync(csvPath, 'utf-8'));
		let kv = readKeyValue2(fs.readFileSync(kvPath, 'utf-8'));
		let csvTitle = csv[0];
		let csvKey = csv[1];
		let finalCsv = [csvTitle, csvKey];
		for (const unitName in kv[Object.keys(kv)[0]]) {
			const unitData = kv[Object.keys(kv)[0]][unitName];
			let csvData: any = [];//第一行
			csvData[0] = unitName;
			for (const unitKey in unitData) {
				const unitValue = unitData[unitKey];
				if (unitKey === 'Creature') {//特殊处理AttachWearables
					let wearableCount: number = 1;//记录第几个AttachWearables值
					for (const wearableIndex in unitValue.AttachWearables) {//遍历AttachWearables
						const itemDef = unitValue.AttachWearables[wearableIndex].ItemDef;

						let counter: number = 0;
						let hasFind: boolean = false;
						for (let i = 0; i < csvKey.length; i++) {// 寻找csv里的AttachWearables
							const keyName = csvKey[i];
							if (keyName === 'AttachWearables') {
								counter++;
								if (counter === wearableCount) {
									csvData[i] = itemDef;
									hasFind = true;
								}
							}
						}
						if (hasFind === false) {//如果csv中的AbilitySpecial值不够则往后加
							csvKey.push('AttachWearables');
							csvData[csvKey.length - 1] = itemDef;
						}
						wearableCount++;
					}
				} else if (typeof (unitValue) === 'string') {
					let hasFind: boolean = false;
					for (let i = 0; i < csvKey.length; i++) {//csv中是否有此key
						const keyName = csvKey[i];
						if (keyName === unitKey) {
							csvData[i] = unitValue;
							hasFind = true;
							break;
						}
					}
					if (hasFind === false) {
						csvKey.push(unitKey);
						csvData[csvKey.length - 1] = unitValue;
					}
				} else {
					// 多层结构先寻找csv是否存在此key，存在则导入数据，不存在则往后加
					// let has_find:boolean = false;
					// for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
					// 	const key_name = csv_key[i];
					// 	if (key_name === unit_key + '[{]') {

					// 		has_find = true;
					// 		break;
					// 	}
					// }
					// if (has_find === false) {
					// 	csv_key.push(unit_key + '[{]');
					// }
					// if (unit_key) {

					// }
				}
			}
			// 合并已有的csv数据
			for (let i = 2; i < csv.length; i++) {
				const csvData = csv[i];
				if (csvData[0] === csvData[0]) {//单位名字已有
					for (let j = 0; j < csvData.length; j++) {
						const value = csvData[j];
						if (csvData[j] === undefined) {
							csvData[j] = value;
						}
					}
				}
			}
			finalCsv.push(csvData);
		}
		fs.writeFileSync(csvPath, array2csv(finalCsv));
	}
}