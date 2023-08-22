import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { StatusBarState, changeStatusBarState, showStatusBarMessage } from '../module/statusBar';
import { isNumber } from '../utils/isNumber';
import { getKeyValueObjectByIndex, overrideKeyValue, readKeyValue2, readKeyValueWithBase, replaceKeyValue } from '../utils/kvUtils';
import { localize } from '../utils/localize';
import { getPathInfo } from '../utils/pathUtils';

/** kv转js */
export async function kvToJs(context: vscode.ExtensionContext) {
	const gameDir = getGameDir();
	const contentDir = getContentDir();
	if (contentDir === undefined) {
		// vscode.window.showErrorMessage(localize("content_folder_no_found"));
		return;
	}
	// 消息
	changeStatusBarState(StatusBarState.LOADING);

	const config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
	let sKvPath = path.join(gameDir + config);
	if (await getPathInfo(sKvPath) === false) {
		vscode.window.showWarningMessage(localize("dota2-tools.KV to Js Config.no_found"), localize("confirm"), localize("cancel")).then(value => {
			if (value === localize("confirm")) {
				vscode.window.showInputBox({ prompt: localize("are you sure to generate to this path"), value: path.join(gameDir + config) }).then((msg) => {
					if (msg !== undefined) {
						fs.writeFileSync(msg, fs.readFileSync(path.join(context.extensionPath, "resource", "kv_js_config.txt"), 'utf-8'));
					}
				});
			}
		});
		return;
	}
	let kvJsConfig = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
	let kvFiles = kvJsConfig.kvfiles;

	for (const sKVName in kvFiles) {
		await generateJS(context, kvJsConfig, sKVName);
	}
	// 生成KV文件名列表
	let sKVListPath = kvJsConfig.configs?.KvListPath;
	if (sKVListPath) {
		let sFileData = "module.exports = [\n";
		for (const sKVName in kvFiles) {
			sFileData += `\t"${sKVName}",\n`;
		}
		sFileData += "];";
		let jsPath = (contentDir + "/" + sKVListPath).replace(/\\/g, "/");
		fs.writeFileSync(jsPath, sFileData);
	}

	changeStatusBarState(StatusBarState.ALL_DONE);
	showStatusBarMessage("JS文件生成完毕");
}

/** 生成js文件 */
export async function generateJS(context: vscode.ExtensionContext, kvJsConfig: Table, sKVName: string) {
	console.log(sKVName);
	const gameDir = getGameDir();
	const contentDir = getContentDir();
	let configs = kvJsConfig.configs;
	let kvFiles = kvJsConfig.kvfiles;
	let sPath = kvFiles[sKVName];
	let sOutputPath = configs.OutputPath || "panorama/scripts/kv";
	let sTotalPath = gameDir + '/scripts/' + sPath;

	let sObjectName = "GameUI";
	if (typeof (stringToAny(configs.ObjectName)) === "string") {
		sObjectName = stringToAny(configs.ObjectName);
	}
	let kv = getKeyValueObjectByIndex(await readKeyValueWithBase(sTotalPath.replace(/\\/g, "/")));
	// 特殊处理
	if (stringToAny(configs.OverrideAbilities) === true && sPath.search("npc_abilities_custom") !== -1) { // 技能合并
		let npcAbilitiesKv = getKeyValueObjectByIndex(await readKeyValueWithBase((context.extensionPath + '/resource/npc/npc_abilities.txt').replace(/\\/g, "/")));
		let npcAbilitiesOverrideKv = getKeyValueObjectByIndex(await readKeyValueWithBase((gameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
		kv = overrideKeyValue(replaceKeyValue(npcAbilitiesKv, npcAbilitiesOverrideKv), kv);
	} else if (stringToAny(configs.OverrideUnits) === true && sPath.search("npc_units_custom") !== -1) { // 单位合并
		let npcUnitsKv = getKeyValueObjectByIndex(await readKeyValueWithBase((context.extensionPath + '/resource/npc/npc_units.txt').replace(/\\/g, "/")));
		kv = overrideKeyValue(npcUnitsKv, kv);
	} else if (stringToAny(configs.OverrideHeroes) === true && sPath.search("npc_heroes_custom") !== -1) { // 英雄合并
		let npcHeroesKv = getKeyValueObjectByIndex(await readKeyValueWithBase((context.extensionPath + '/resource/npc/npc_heroes.txt').replace(/\\/g, "/")));
		kv = overrideKeyValue(npcHeroesKv, kv);
	} else if (stringToAny(configs.OverrideItems) === true && sPath.search("npc_items_custom") !== -1) { // 物品合并
		let itemsKv = getKeyValueObjectByIndex(await readKeyValueWithBase((context.extensionPath + '/resource/npc/items.txt').replace(/\\/g, "/")));
		let npcAbilitiesOverrideKv = getKeyValueObjectByIndex(await readKeyValueWithBase((gameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
		kv = overrideKeyValue(replaceKeyValue(itemsKv, npcAbilitiesOverrideKv), kv);
	}

	let js = obj2Str(kv);
	let fileData = sObjectName + "." + sKVName + " = " + js + ";";
	let jsPath = (contentDir + "/" + sOutputPath + "/" + sKVName + ".js").replace(/\\/g, "/");
	fs.writeFileSync(jsPath, fileData);
	showStatusBarMessage("[生成js]：" + sKVName);
	// 生成定义文件
	if (configs.DeclarePath && kvJsConfig.DeclareConfig) {
		let DeclareType = kvJsConfig.DeclareConfig[sKVName];
		if (DeclareType != undefined) {
			let sDetail = "";
			switch (DeclareType) {
				case "1":
					sDetail = GetKVDeclare(kv, 2);
					break;
				case "2":
					sDetail = obj2Str(kv, 2);
					break;
			}
			if (sDetail.length > 0) {
				let sPath = `${contentDir}/${configs.DeclarePath}/${sKVName}.d.ts`.replace(/\\/g, "/");
				let sDeclareData = `interface CustomUIConfig {\n\t${sKVName}: ${sDetail}\n}`;
				fs.writeFileSync(sPath, sDeclareData);
			}
		}
	}
}

function GetKVDeclare(kv: Table, depth = 1) {
	let declare: Table = {};
	for (const one of Object.values(kv)) {
		for (const [k, v] of Object.entries(one as Table)) {
			if (typeof v == "object") {
				declare[k] = "any";
			} else if (isNumber(v)) {
				// 有一个不是number的，大概率是string
				if (declare[k] == undefined) {
					declare[k] = "number";
				}
			} else {
				declare[k] = typeof v;
			}
		}
	}

	let ret = `Record<string, {\n`;
	for (const [k, v] of Object.entries(declare)) {
		let bPartial = Object.values(kv).some(one => {
			return one[k] == undefined;
		});
		for (let index = 0; index < depth; index++) {
			ret += "\t";
		}
		ret += `"${k}"${bPartial ? "?" : ""}: ${v},\n`;
	}
	for (let index = 0; index < depth - 1; index++) {
		ret += "\t";
	}
	ret += "}>";
	return ret;
}

function stringToAny(str: string): any {
	if (str === "true") {
		return true;
	} else if (str === "false") {
		return false;
	} else if (!isNaN(Number(str))) {
		return Number(str);
	}
	return str;
}
// 把js的obj转成字符串
// obj:要转的数据对象 
function obj2Str(obj: any, depth = 1, bracketLeft: string = "{", bracketRight: string = "}", sSeparator: string = ": "): string {
	let ret = bracketLeft + "\n";

	for (const key in obj) {
		const element: { [k: string]: object; } = obj[key];
		for (let index = 0; index < depth; index++) {
			ret += "\t";
		}
		if (typeof (element) === "object") {
			ret += '"' + key + '"' + sSeparator + obj2Str(element, depth + 1, bracketLeft, bracketRight, sSeparator) + ",";
		} else {
			if (isNumber(element)) {
				ret += '"' + key + '"' + sSeparator + "" + element + ",";
			} else {
				ret += '"' + key + '"' + sSeparator + '"' + element + "\",";
			}
		}
		ret += os.EOL;
	}
	if (ret[ret.length - 1] === ",") {
		ret = ret.slice(0, -1);// 去掉最后一个逗号
	}
	for (let index = 0; index < depth - 1; index++) {
		ret += "\t";
	}
	ret += bracketRight;
	return ret;
};