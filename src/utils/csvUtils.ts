import * as fs from 'fs';
import * as os from 'os';
import { Float } from "./number";

export function csv2obj(csv: any, bVertical = false): any {
	let arrCSV: any[][] = csv;
	if (typeof (csv) === "string") {
		arrCSV = csvParse(csv);
	}

	let csvConfigs: any = {};
	if (bVertical) {
		for (let i = 0; i < arrCSV.length; i++) {
			let arrLine = arrCSV[i];
			csvConfigs[arrLine[1]] = arrLine[2];
		}
	} else {
		// 横向的至少要有三行，第一行中文，第二行key， 第三行内容
		if (arrCSV.length < 3) {
			return csvConfigs;
		}
		let keys: any[] = arrCSV[1];// 第二行 key

		for (let i = 2; i < arrCSV.length; i++) {
			let arrLine = arrCSV[i];
			let lineID: any = arrLine[0];
			if (!lineID) {
				continue;
			}
			csvConfigs[lineID] = {};
			for (let j = 0; j < arrLine.length; j++) {
				if (!keys[j] || keys[j] === "") {
					continue;
				}
				let value = arrLine[j] || "";
				// if (value===undefined || value==="") {
				// 	continue;
				// }
				// 因为多个key都叫AttachWearables，处理成AttachWearables1234
				let columnKey = keys[j];
				if (keys[j] === "AttachWearables") {
					for (let index = 1; index < 30; index++) {
						if (!csvConfigs[lineID]["AttachWearables" + index]) {
							columnKey = "AttachWearables" + index;
							break;
						}
					}
				}
				csvConfigs[lineID][columnKey] = value;
			}
		}
		// 中文行处理
		csvConfigs["__key_sc"] = {};
		for (let j = 0; j < keys.length; j++) {
			let sc = arrCSV[0][j] || "";
			let columnKey = keys[j];
			if (keys[j] === "AttachWearables") {
				for (let index = 1; index < 30; index++) {
					if (!csvConfigs["__key_sc"]["AttachWearables" + index]) {
						columnKey = "AttachWearables" + index;
						sc = "AttachWearables" + index;
						break;
					}
				}
			}
			csvConfigs["__key_sc"][columnKey] = sc;
		}
	}
	return csvConfigs;
}

// Obj转csv
export function obj2csv(obj: any) {
	let keySc = obj.__key_sc;
	if (!keySc) {
		// 默认中英文key一样
		keySc = {};
		for (let lineID in obj) {
			let lineInfo = obj[lineID];
			for (let columnKey in lineInfo) {
				keySc[columnKey] = columnKey;
			}
		}
	}
	// 前两行
	let arrCSV: any[] = [];
	arrCSV[0] = [];
	arrCSV[1] = [];
	for (let key in keySc) {
		let sChineseKey = keySc[key];
		arrCSV[0].push(sChineseKey);
		if (key.indexOf("AttachWearables") !== -1) {
			arrCSV[1].push("AttachWearables");
		} else {
			arrCSV[1].push(key);
		}
	}

	let y = 2;
	for (let lineID in obj) {
		if (lineID === "__key_sc") {
			continue;
		}
		arrCSV[y] = [];
		let oLineInfo = obj[lineID];
		for (let columnKey in keySc) {
			let value = oLineInfo[columnKey] || '';
			arrCSV[y].push(value);
		}
		y++;
	}
	return array2csv(arrCSV);
}
// csv转array
export function csvParse(csv: string) {
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
				state = "normal";
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
// csv转array(无法处理单元格换行问题)
export function csv2array(csv: string): [] {
	const rows: string[] = csv.split(os.EOL);
	let arr: any = [];
	for (let i = 0; i < rows.length; i++) {
		arr[i] = [];
		const lineText: string = rows[i];
		let values: string[] = lineText.split(',');
		if (values.length === 1) {
			continue;
		}
		for (let j = 0; j < values.length; j++) {
			const value = values[j];
			arr[i].push(value);
		}
	}
	return arr;
}
// array转csv
export function array2csv(arr: any[]): string {
	let csv: string = '';
	let titleCount: number = arr[1].length;
	for (let i = 0; i < arr.length; i++) {
		const rows: any = arr[i];
		for (let j = 0; j < rows.length; j++) {
			if (rows[0] === undefined && rows.length === 0) {
				break;
			}
			let col = rows[j] === undefined ? '' : rows[j];
			if (col.indexOf(",") !== -1) {
				col = '"' + col + '"';
			}
			csv += col + (j + 1 === rows.length ? '' : ',');
		}
		if (rows[0] !== undefined || rows.length > 0) {
			for (let q = 0; q < titleCount - rows.length; q++) {
				csv += ',';
			}
			csv += os.EOL;
		}
		if (rows.length === 0) {
			for (let i = 0; i < titleCount - 1; i++) {
				csv += ',';
			}
			csv += os.EOL;
		}
	}
	return csv;
}
export function isEmptyCSVValue(anything: any) {
	if (anything === undefined || anything === null || anything === "") {
		return true;
	} else {
		return false;
	}
}
export function multilayerCSV2KV(listenPath: string): any {
	try {
		let csv = fs.readFileSync(listenPath, 'utf-8');
		let csvArr: any = csvParse(csv);
		// 处理多层key
		let csvKey: any[] = csvArr[1];
		for (let index = 0; index < csvKey.length; index++) {
			let key: string = csvKey[index];
			let keySplit = key.split("-");
			if (keySplit.length > 1) {
				csvKey[index] = keySplit;
			}
		}

		let arrDefault: string[] = csvArr[2];
		if (arrDefault.length === 0 || arrDefault[0] === undefined) {
			return {};
		}

		let arrKeyDepth: any = {};// 用这个对象记录上一次unique_key变化后的多层结构

		let csvData: any = {}; // 函数返回值
		for (let y = 2; y < csvArr.length; y++) {
			const row: any = csvArr[y];
			if (row.length === 0) {
				continue;
			}
			let lineObj: any;
			if (row[0] === "") {
				lineObj = csvData[arrDefault[0]];
			} else {
				// 新的一个，初始化
				lineObj = {};
				arrDefault = [row[0]];
				arrKeyDepth = {};
			}
			for (let x = 1; x < row.length; x++) {
				let col: string = row[x];
				if (col !== "") {
					arrDefault[x] = col;
				} else {
					col = arrDefault[x];
				}

				let key: string | string[] = csvKey[x];
				if (key instanceof Array) {
					let tempObj: any;
					if (key[0] !== "root") {
						if (lineObj[key[0]] === undefined) {
							lineObj[key[0]] = {};
						}
						tempObj = lineObj[key[0]];
					} else {
						tempObj = lineObj;
					}

					if (arrKeyDepth[key[0]] === undefined) {
						arrKeyDepth[key[0]] = {};
					}

					// 去头去尾来读取arrKeyDepth,使temp_obj[这个指针]指向col应该填入的位置 NOTE:中间的只能为value 尾部可以为key或者value
					let index = 1;
					let depth: number = index - 1;
					for (; index <= key.length - 2; index++) {
						depth = index - 1;
						let sKeyDepth = arrKeyDepth[key[0]][depth];
						if (sKeyDepth === undefined || sKeyDepth === "") {
							continue;
						}
						if (tempObj[sKeyDepth] === undefined) {
							continue;
						}
						tempObj = tempObj[sKeyDepth];
					}

					depth = index - 1;
					if (key[key.length - 1] === "value") {
						let sKeyDepth = arrKeyDepth[key[0]][depth];
						if (sKeyDepth === undefined || sKeyDepth === "") {
							continue;
						}
						tempObj[sKeyDepth] = col;
					} else {
						let sKeyDepth = (col === "" || col === undefined) ? arrKeyDepth[key[0]][depth] : col;
						if (sKeyDepth === undefined || sKeyDepth === "") {
							continue;
						}
						arrKeyDepth[key[0]][depth] = sKeyDepth;
						if (tempObj[sKeyDepth] === undefined) {
							tempObj[sKeyDepth] = {};
						}
					}
				} else if (key === "") {
					continue;
				} else {
					if (col === undefined || col === "") {
						continue;
					}
					lineObj[key] = col;
				}
			}
			if (row[0] !== undefined && row[0] !== "") {
				csvData[row[0]] = lineObj;
			}
		}
		return csvData;
	} catch (error) {
		console.log(error);
	}
}
export function abilityCSV2KV(csv: string): any {
	// 生成kv
	let csvData: any = {};
	let csvArr: any = csvParse(csv);
	// let csv_arr:any = CSV2Array(csv);
	const csvKey: [] = csvArr[1];
	for (let i = 2; i < csvArr.length; i++) {
		const row: any = csvArr[i];
		// 空行、空值则跳过
		if (row.length === 0 || row[0] === undefined || row[0] === "") {
			continue;
		}

		let specialCount: number = 1;
		let precacheCount: number = 1;
		let abilitySpecial: any = {};
		let abilityValues: any = {};	/** 新版kv键值 */
		let precacheResource: any = {};
		let precache: any = {};
		let valuesObj: any = {};
		for (let j = 1; j < row.length; j++) {
			const col = row[j];
			// 跳过空值
			if (col === '') {
				continue;
			}
			let key: string = csvKey[j];
			// special值特殊处理
			if (key === 'AbilitySpecial') {
				key = ("0" + specialCount).substr(-2);
				if (csvArr[i + 1] !== undefined && csvArr[i + 1] !== "") {
					let value = csvArr[i + 1][j];
					// 拆分key
					let keyArr = col.split("\n");
					// 拆分value
					let valueArr = value.split("\n");
					abilitySpecial[key] = {
						var_type: valueArr[0].search(/\./g) !== -1 ? 'FIELD_FLOAT' : 'FIELD_INTEGER',
						// [col]: csv_arr[i+1][j]
					};
					for (let i = 0; i < keyArr.length; i++) {
						const _key = keyArr[i];
						abilitySpecial[key][_key] = valueArr[i];
					}
					specialCount++;
				}
			} else if (key === 'AbilityValues') {
				if (csvArr[i + 1] !== undefined && csvArr[i + 1] !== "") {
					let value = csvArr[i + 1][j];
					// 拆分key
					let keyArr = col.split("\n");
					// 拆分value
					let valueArr = value.split("\n");
					if (keyArr.length <= 1) {
						abilityValues[keyArr[0]] = valueArr[0];
					} else {
						abilityValues[keyArr[0]] = {};
						for (let i = 0; i < keyArr.length; i++) {
							const _key = keyArr[i];
							const _value = valueArr[i];
							if (i == 0) {
								abilityValues[keyArr[0]]["value"] = _value;
							} else {
								abilityValues[keyArr[0]][_key] = _value;
							}
						}
					}
				}
			} else if (key === '' || key[0] == "】") {
				continue;
			} else if (key === 'precache') {
				if (csvArr[i + 1] !== undefined && csvArr[i + 1] !== "") {
					let value = csvArr[i + 1][j];
					if (precache[col] === undefined) {
						precache[col] = [];
					}
					precache[col].push(value);
				}
			} else if (key === 'PrecacheResource') {
				// 自定义的预载入
				if (csvArr[i + 1] !== undefined && csvArr[i + 1] !== "") {
					// 拆分key
					let keyArr = col.split("\n");
					for (let i = 0; i < keyArr.length; i++) {
						const _key = keyArr[i];
						precacheResource[String(precacheCount)] = _key;
						precacheCount++;
					}
				}
			} else {
				valuesObj[key] = col;
			}
		}
		if (Object.keys(abilitySpecial).length > 0) {
			valuesObj.AbilitySpecial = abilitySpecial;
		}
		if (Object.keys(abilityValues).length > 0) {
			valuesObj.AbilityValues = abilityValues;
		}
		if (Object.keys(precache).length > 0) {
			valuesObj.precache = precache;
		}
		if (Object.keys(precacheResource).length > 0) {
			valuesObj.PrecacheResource = precacheResource;
		}
		i++;
		csvData[row[0]] = valuesObj;
	}
	KVArrayProc(csvData);
	return csvData;
}
export function KVArrayProc(obj: Record<string, any>) {
	for (const [k, v] of Object.entries(obj)) {
		switch (typeof v) {
			case "object":
				KVArrayProc(v);
				break;
			case "string":
				// "^-1-5*10";
				if (v[0] == "^") {
					let result = v.match(/\^(-?\d+\.?\d*)(\+|-)(\d+\.?\d*)\*(\d+)/);
					if (result) {
						let [_total, first, sign, step_add, count] = result;
						let f = Float(first);
						let s = Float(step_add) * (sign == "-" ? -1 : 1);
						let arr: number[] = [];
						for (let i = 0; i < Math.round(Number(count)); i++) {
							arr.push(f);
							f = Float(f + s);
						}
						obj[k] = arr.join(" ");
					}
				}
			default:
				break;
		}
	}
}
export function unitCSV2KV(csv: string): any {
	// 生成kv
	let csvData: any = {};
	let csvArr: any = csvParse(csv);
	const csvKey: [] = csvArr[1];
	for (let i = 2; i < csvArr.length; i++) {
		const row: any = csvArr[i];
		if (row.length === 0 || row[0] === '' || row[0] === undefined) {
			continue;
		}

		let wearableCount: number = 1;
		let attachWearables: any = {};
		let valuesObj: any = {};
		// 读取多层结构
		let readBlock = function (index: number): any {
			let block: any = {};
			for (let i = index + 1; i < row.length; i++) {
				const col: any = row[i];
				const key: string = csvKey[i];
				if (col === '') {
					if (key.search('[{]') !== -1) {
						let [_block, j] = readBlock(i);
						i = j;
						if (Object.keys(_block).length > 0) {
							block[key.split('[{]')[0]] = _block;
						}
					} else if (key.search('[}]') !== -1) {
						return [block, i];
					}
					continue;
				}
				if (key === '' || key[0] == "】") {
					continue;
				} else {
					block[key] = col;
				}
			}
		};
		for (let j = 1; j < row.length; j++) {
			const col = row[j];
			let key: string = csvKey[j];
			// 跳过空值
			if (col === '') {
				// 处理多层结构
				if (key.search('[{]') !== -1) {
					let [block, i] = readBlock(j);
					j = i;
					if (Object.keys(block).length > 0) {
						valuesObj[key.split('[{]')[0]] = block;
					}
				}
				continue;
			}
			// special值特殊处理
			if (key === 'AttachWearables') {
				key = wearableCount.toString();
				let value = col;
				attachWearables[key] = {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ItemDef: value
				};
				wearableCount++;
				// 一些Creature特殊键值
			} else if (key === 'CanRespawn' || key === 'DisableClumpingBehavior' || key === 'UsesGestureBasedAttackAnimation' || key === 'ShouldDoFlyHeightVisual' || key === 'IsHybridFlyer') {
				if (valuesObj.Creature === undefined) {
					valuesObj.Creature = {};
				}
				valuesObj.Creature[key] = col;
				continue;
				// 跳过没有key的值
			} else if (key === '' || key[0] == "】") {
				continue;
			} else {
				valuesObj[key] = col;
			}
		}
		if (Object.keys(attachWearables).length > 0) {
			if (valuesObj.Creature === undefined) {
				valuesObj.Creature = {};
			}
			valuesObj.Creature.AttachWearables = attachWearables;
		}
		csvData[row[0]] = valuesObj;
	}
	return csvData;
}