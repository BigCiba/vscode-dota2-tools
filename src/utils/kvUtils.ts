import * as fs from 'fs';
import * as os from 'os';
import { isNumber } from "./isNumber";
import { getPathInfo } from "./pathUtils";

// Read kv2 format into object (compatible with kv3)
export function readKeyValue2(kvdata: string, bRemoveComment: boolean = true, bOverride: boolean = true): any {
	if (bRemoveComment === true) {
		kvdata = removeComment(kvdata);
	}
	// kvdata = kvdata.replace(/\t/g,'').replace(' ','').replace(/\r\n/g,'');
	kvdata = kvdata.replace(/\t/g, '').replace(/\r\n/g, '');
	let kvObj: any = {};
	let overrideIndex: number = 1;
	for (let i = 0; i < kvdata.length; i++) {
		let substr = kvdata[i];
		if (substr === '"') {
			let key: any;
			let value: any;
			const result = readKeyValue(i);
			if (!result) { continue; }
			[key, value, i] = result;
			// If there is a duplicate value
			if (kvObj[key] === undefined || bOverride === true) {
				kvObj[key] = value;
			} else {
				kvObj[key + "_Repeat" + overrideIndex] = value;
				overrideIndex++;
			}
			continue;
		}
		if (substr === '#' && kvdata.substr(i, 5) === '#base') {
			i = getBase(i);
			continue;
		}
	}
	return kvObj;
	// Read a key-value pair
	function readKeyValue(startIndex: number): any {
		let key: string = '';
		let value: any;
		let state = 'NONE';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			// Read key
			if (substr === '"' && state === 'NONE') {
				[key, i] = getContent(i);
				state = 'VALUE';
				continue;
			}
			// Read value
			if (substr === '"' && state === 'VALUE') {
				[value, i] = getContent(i);
				return [key, value, i];
			}
			// Read table
			if (substr === '{' && state === 'VALUE') {
				[value, i] = getTable(i);
				return [key, value, i];
			}
		}
	}
	function getTable(startIndex: number): any {
		let kv: any = {};
		let state = 'NONE';
		let overrideIndex: number = 1;
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			if (substr === '{' && state === 'NONE') {
				state = 'READ';
				continue;
			}
			// Insert kv3
			if (substr === '<' && kvdata.substr(i, 8) === '<!-- kv3' && state === 'READ') {
				let [block, newIndex] = getKv3Block(i);
				kv = readKeyValue3(block);
				i = newIndex;
				continue;
			}
			if (substr === '"' && state === 'READ') {
				let key: any;
				let value: any;
				const result = readKeyValue(i);
				if (!result) { continue; }
				[key, value, i] = result;
				if (kv[key] === undefined || bOverride === true) {
					kv[key] = value;
				} else {
					kv[key + "_Repeat" + overrideIndex] = value;
					overrideIndex++;
				}
				continue;
			}
			if (substr === '}' && state === 'READ') {
				return [kv, i];
			}
		}
	}
	// Get the content inside the quotes
	function getContent(startIndex: number): any {
		let content: string = '';
		let state = 'NONE';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			// Skip escape characters
			if (substr === '\\' && kvdata[i + 1] === '"') {
				content += '"';
				i++;
				continue;
			}
			if (substr === '"' && state === 'NONE') {
				state = 'READ';
				continue;
			}
			if (state === 'READ') {
				if (substr === '"') {
					return [content, i];
				} else {
					content += substr;
				}
			}
		}
	}
	// Get kv3 block
	function getKv3Block(startIndex: number): any {
		let block = '';
		let left = 0;
		let right = 0;
		let state = 'NONE';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			if (state === 'NONE' && substr === '<') {
				state = 'HEAD';
				continue;
			}
			if (state === 'HEAD') {
				if (substr === '>') {
					state = 'NONE';
				}
				continue;
			}
			block += substr;
			if (substr === '{') {
				left++;
			}
			if (substr === '}') {
				right++;
				if (left === right) {
					return [block, i];
				}
			}
		}
	}
	// #base
	function getBase(startIndex: number): any {
		let path = '';
		let state = 'NONE';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			if (substr === '#') {
				state = 'START';
				continue;
			}
			if (substr === '"' && state === 'START') {
				state = 'READ';
				continue;
			}
			if (state === 'READ') {
				if (substr === '"') {
					return i;
				} else {
					path += substr;
					continue;
				}
			}
		}
	}
}
// Read kv3 format into object
export function readKeyValue3(kvdata: string): Table {
	kvdata = kvdata.replace(/<!-- kv3.*-->/, '').replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
	// kvdata = kvdata.replace(/\t/g,'').replace(/\r\n/g,'');
	let kvObj: any = [];
	for (let i = 0; i < kvdata.length; i++) {
		let substr = kvdata[i];
		if (substr === '{') {
			let [obj, newLine] = readTable(i);
			kvObj.push(obj);
			i = newLine;
			continue;
		}
	}
	return kvObj;
	// Read the content inside a pair of brackets
	function readTable(startIndex: number): any {
		let kv: any = {};
		let key: string = '';
		let value: string = '';
		let state = 'NONE';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			if (substr === '{' && state === 'NONE') {
				state = 'KEY';
				continue;
			}
			if (substr === '}') {
				return [kv, i];
			}
			if (state === 'KEY') {
				if (substr === '=') {
					state = 'VALUE';
					continue;
				} else {
					key += substr;
					continue;
				}
			}
			if (state === 'VALUE') {
				if (kvdata.substr(i, 5) === "false") {
					kv[key] = "false";
					key = '';
					value = '';
					state = 'KEY';
					i = i + 4;
					continue;
				}
				if (kvdata.substr(i, 4) === "true") {
					kv[key] = "true";
					key = '';
					value = '';
					state = 'KEY';
					i = i + 3;
					continue;
				}
				if (substr === '"') {
					state = 'STRING';
					continue;
				} else if (substr === '{') {
					// Read table
					let [obj, newLine] = readTable(i);
					kv[key] = obj;
					key = '';
					value = '';
					i = newLine;
					state = 'KEY';
					continue;
				} else if (substr === '[') {
					// Read array
					let [obj, newLine] = readArray(i);
					kv[key] = obj;
					key = '';
					value = '';
					i = newLine;
					state = 'KEY';
					continue;
				} else if (isNumber(substr) === true || substr === '.' || substr === '-') {
					state = 'NUMBER';
				}
			}
			if (state === 'STRING') {
				if (substr === '"') {
					kv[key] = value;
					key = '';
					value = '';
					state = 'KEY';
					continue;
				} else {
					value += substr;
					continue;
				}
			}
			if (state === 'NUMBER') {
				if (isNumber(substr) === true || substr === '.' || substr === '-') {
					value += substr;
					continue;
				} else {
					kv[key] = value;
					key = '';
					value = '';
					i--;
					state = 'KEY';
					continue;
				}
			}
		}
	}
	// Read array
	function readArray(startIndex: number): any {
		let arr: any = [];
		let state = 'NONE';
		let value = '';
		for (let i = startIndex; i < kvdata.length; i++) {
			let substr = kvdata[i];
			if ((substr === '[' || substr === ',') && state === 'NONE') {
				state = 'VALUE';
				continue;
			}
			if (substr === ']') {
				return [arr, i];
			}
			if (state === 'VALUE') {
				if (substr === '"') {
					state = 'STRING';
					continue;
				} else if (substr === '{') {
					let [obj, newLine] = readTable(i);
					arr.push(obj);
					i = newLine;
					state = 'NONE';
					continue;
				} else {
					state = 'NUMBER';
				}
			}
			if (state === 'STRING') {
				if (substr === '"') {
					arr.push(value);
					value = '';
					i++;
					state = 'VALUE';
					continue;
				} else {
					value += substr;
					continue;
				}
			}
			if (state === 'NUMBER') {
				if (substr === ',') {
					arr.push(value);
					value = '';
					state = 'VALUE';
					continue;
				} else {
					value += substr;
					continue;
				}
			}
		}
	}
}
// Read kv2 format into object (#base)
export async function readKeyValueWithBase(fullPath: string) {
	// Get the name
	let fileName: string = fullPath.split('/').pop() || '';
	let path = fullPath.split(fileName)[0];

	let kvdata = readKeyValue2(fs.readFileSync(fullPath, 'utf-8'));
	let kvtable = kvdata[Object.keys(kvdata)[0]];
	let kvString = fs.readFileSync(fullPath, 'utf-8');
	kvString = removeComment(kvString);
	const rows: string[] = kvString.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const lineText: string = rows[i];
		if (lineText.search(/#base ".*"/) !== -1) {
			let basePath = lineText.split('"')[1];
			// Skip if the file is not found
			if (await getPathInfo(path + basePath) === false) {
				// vscode.window.showErrorMessage("File missing: " + path + basePath);
				continue;
			}
			let kv = readKeyValue2(fs.readFileSync(path + basePath, 'utf-8'));
			let table = kv[Object.keys(kv)[0]];
			for (const key in table) {
				const value = table[key];
				kvtable[key] = value;
			}
		} else {
			continue;
		}
	}
	return kvdata;
}
// Read kv2 format into object (#base), including path info
export async function readKeyValueWithBaseIncludePath(fullPath: string) {
	let result: any = {};
	// Get the name
	let fileName: string = fullPath.split('/').pop() || '';
	let path = fullPath.split(fileName)[0];

	let kvdata = readKeyValue2(fs.readFileSync(fullPath, 'utf-8'));
	// Index by path
	result[fullPath] = kvdata;
	// let kvtable = kvdata[Object.keys(kvdata)[0]];
	let kvString = fs.readFileSync(fullPath, 'utf-8');
	kvString = removeComment(kvString);
	const rows: string[] = kvString.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const lineText: string = rows[i];
		if (lineText.search(/#base ".*"/) !== -1) {
			let basePath = lineText.split('"')[1];
			// Skip if the file is not found
			if (await getPathInfo(path + basePath) === false) {
				// vscode.window.showErrorMessage("File missing: " + path + basePath);
				continue;
			}
			let kv = readKeyValue2(fs.readFileSync(path + basePath, 'utf-8'));
			// Index by path
			result[path + basePath] = kv;
			let table = kv[Object.keys(kv)[0]];
			for (const key in table) {
				const value = table[key];
				// kvtable[key] = value;
			}
		} else {
			continue;
		}
	}
	return result;
}
export function removeComment(data: string): string {
	let newData = '';
	const rows: string[] = data.split(/\r?\n/);
	for (let i = 0; i < rows.length; i++) {
		const lineText: string = rows[i];
		let state = 0;// Used to handle // comments inside quotes
		for (let char = 0; char < lineText.length; char++) {
			const substr = lineText[char];
			if (substr === '"') {
				state = (state === 0) ? 1 : 0;
			}
			//Do not process // inside quotes
			if (state !== 1 && substr === '/' && lineText[char + 1] === '/') {
				break;
			} else {
				newData += substr;
			}
		}
		newData += os.EOL;
	}
	return newData;
}
// Get the index-th object inside the object obtained from ReadKeyValue2, ReadKeyValue3, or ReadKeyValueWithBase; used to strip the outer layer so it matches the KV structure read by DOTA2
export function getKeyValueObjectByIndex(obj: Table, index: number = 0) {
	if (typeof (obj) !== "object") {
		return;
	}
	return obj[Object.keys(obj)[index]];
}
// Object override
export function overrideKeyValue(mainObj: Table, obj: Table): object {
	if (typeof (mainObj) !== "object") {
		return obj;
	}
	if (typeof (obj) !== "object") {
		return mainObj;
	}

	for (const k in obj) {
		const v = obj[k];
		if (typeof (v) === "object") {
			mainObj[k] = overrideKeyValue(mainObj[k], v);
		} else {
			mainObj[k] = v;
		}
	}

	return mainObj;
}

// Object replace
export function replaceKeyValue(mainObj: Table, obj: Table): object {
	if (typeof (mainObj) !== "object") {
		return obj;
	}
	if (typeof (obj) !== "object") {
		return mainObj;
	}

	for (const k in obj) {
		const v = obj[k];
		if (mainObj[k] !== undefined && mainObj[k] !== null) {
			if (typeof (v) === "object") {
				mainObj[k] = overrideKeyValue(mainObj[k], v);
			} else {
				mainObj[k] = v;
			}
		}
	}

	return mainObj;
}

// Write kv
export function writeKeyValue(obj: any, depth: number = 0, tab: number = 12) {
	var str: string = '';
	if (obj === null || obj === undefined) {
		return str;
	}
	// Add tab characters
	function addDepthTab(depth: number, addString: string): string {
		var tab: string = '';
		for (let d = 0; d < depth; d++) {
			tab += '\t';
		}
		tab += addString;
		return tab;
	}
	// Add tab characters between key and value
	function addIntervalTab(depth: number, key: string, nTab: number = 12): string {
		var tab: string = '';
		for (let d = 0; d < nTab - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
			tab += '\t';
		}
		return tab;
	}
	let keys = Object.keys(obj).sort(function (a, b) { return Number(a) - Number(b); });
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		const value = obj[key];
		if (value === undefined || value === null || (typeof (value) === "object" && Object.keys(value).length === 0)) {
		} else if (typeof (value) === 'string') {
			str += addDepthTab(depth, '"' + key + '"');
			str += addIntervalTab(depth, key, tab);
			str += '"' + value + '"' + os.EOL;
		} else if (key === "precache" && typeof (value) === 'object') {
			// Special handling for the precache table
			str += addDepthTab(depth, '"' + key + '"' + os.EOL);
			str += addDepthTab(depth, '{' + os.EOL);
			for (const precacheType in value) {
				const typeList = value[precacheType];
				for (const precache of typeList) {
					str += addDepthTab(depth + 1, '"' + precacheType + '"');
					str += addIntervalTab(depth + 1, precacheType, tab);
					str += '"' + precache + '"' + os.EOL;
				}
			}
			str += addDepthTab(depth, '}' + os.EOL);
		} else {
			// Write _comment as // comment line before the block
			if (typeof value === 'object' && value !== null && '_comment' in value && typeof value['_comment'] === 'string' && value['_comment'].trim()) {
				str += addDepthTab(depth, '// ' + value['_comment'].trim() + os.EOL);
			}
			str += addDepthTab(depth, '"' + key + '"' + os.EOL);
			str += addDepthTab(depth, '{' + os.EOL);
			// Filter out _comment from inner content
			const innerObj: any = {};
			for (const innerKey in value) {
				if (innerKey !== '_comment') {
					innerObj[innerKey] = value[innerKey];
				}
			}
			str += writeKeyValue(innerObj, depth + 1);
			str += addDepthTab(depth, '}' + os.EOL);
		}
	}
	return str;
}

/** Get the list of #base paths for the kv */
export async function getBaseInfo(fullPath: string) {
	let kvString = fs.readFileSync(fullPath, 'utf-8');
	let result: string[] = [];
	kvString = removeComment(kvString);
	const rows: string[] = kvString.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		const lineText: string = rows[i];
		if (lineText.search(/#base\s+"([^"]+)"/) !== -1) {
			lineText.replace(/#base "(.*)"/, (a: string, b) => {
				result.push(b);
				return a;
			});
		} else {
			continue;
		}
	}
	return result;
}