import * as fs from 'fs';
import * as os from 'os';
import { window } from "vscode";
import { getGameDir } from "../module/addonInfo";
import { csv2obj, isEmptyCSVValue, obj2csv } from "../utils/csvUtils";
import { getPathConfiguration } from "../utils/getPathConfiguration";
import { getKeyValueObjectByIndex, readKeyValue2, writeKeyValue } from "../utils/kvUtils";
import path = require("path");

function readlocalizationAsKv(sFile: string) {
	return readKeyValue2(`"value"
{
${fs.readFileSync(sFile, 'utf-8')}
}`).value;
}

// 如果开头是单引号并且结尾也是单引号的不处理，否则删掉第一个单引号
function checkSingleQuotationMark(str: string) {
	if (str[0] == "'") {
		if (str.length == 1) {
			return "";
		}
		if (str[str.length - 1] == "'") {
			return str;
		}
		return str.slice(1);
	}
	return str;
}

export function localizationBackup() {
	const gameDir = getGameDir();
	const schinesePath = path.join(gameDir, "resource/addon_schinese.txt");
	if (!fs.existsSync(schinesePath)) {
		return;
	}
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath == undefined || !fs.existsSync(localizationPath)) {
		return;
	}
	const sDir = path.join(localizationPath, "history");
	if (!fs.existsSync(sDir)) {
		fs.mkdirSync(sDir);
	}

	// 确认新的csv的编号
	let i = 1;
	while (true) {
		let sFile = path.join(sDir, `backup_${i}.csv`);
		if (!fs.existsSync(sFile)) {
			break;
		}
		i++;
	}

	const allTokens: Record<string, any> = {};
	const languages: string[] = ["schinese"];
	const schineseTokens = readKeyValue2(fs.readFileSync(schinesePath, 'utf-8')).lang.Tokens;
	for (let [key, value] of Object.entries(schineseTokens)) {
		allTokens[key] = {
			key,
			schinese: value
		};
	}
	// 读取其他语言的auto_generate.txt到allTokens
	fs.readdirSync(localizationPath, { withFileTypes: true }).forEach(file => {
		const sLanguage = file.name;
		if (sLanguage == "history") {
			return;
		}
		if (file.isDirectory()) {
			let sFileAutoGenerate = path.join(localizationPath, sLanguage, "auto_generate.txt");
			if (fs.existsSync(sFileAutoGenerate)) {
				const _tokens = readlocalizationAsKv(sFileAutoGenerate);
				for (let [key, value] of Object.entries(_tokens)) {
					allTokens[key] ??= { key };
					allTokens[key][sLanguage] = value;

					languages.push(sLanguage);
				}
			}
		}
	});

	let csvKeys: Record<string, string> = { key: "key" };
	for (let sLanguage of languages) {
		csvKeys[sLanguage] = sLanguage;
	}
	allTokens.__key_sc = csvKeys;
	fs.writeFileSync(path.join(sDir, `backup_${i}.csv`), "\uFEFF" + obj2csv(allTokens));
}

export function localizationCompare() {
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath == undefined || !fs.existsSync(localizationPath)) {
		return;
	}
	const sDir = path.join(localizationPath, "history");
	if (!fs.existsSync(sDir)) {
		fs.mkdirSync(sDir);
	}

	window.showInputBox({ prompt: "输入第1个版本号数字，它较小" }).then((str) => {
		if (str == undefined) {
			return;
		}
		let n1 = Number(str);

		window.showInputBox({ prompt: "输入第2个版本号数字，它较大" }).then((str) => {
			if (str == undefined) {
				return;
			}
			let n2 = Number(str);
			generateCompareCSV(n1, n2);
		});
	});
}

function generateCompareCSV(n1: number, n2: number) {
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath == undefined || !fs.existsSync(localizationPath)) {
		return;
	}
	const sDir = path.join(localizationPath, "history");
	if (!fs.existsSync(sDir)) {
		fs.mkdirSync(sDir);
	}

	const sFile1 = path.join(sDir, `backup_${n1}.csv`);
	const sFile2 = path.join(sDir, `backup_${n2}.csv`);
	if (!fs.existsSync(sFile2)) {
		return;
	}

	const token1: Record<string, any> = csv2obj(fs.existsSync(sFile1) ? fs.readFileSync(sFile1, 'utf-8') : "");
	const token2: Record<string, any> = csv2obj(fs.readFileSync(sFile2, 'utf-8'));
	const token_out: Record<string, any> = JSON.parse(JSON.stringify(token2));
	for (let [key, value_new] of Object.entries(token_out)) {
		if (key == "__key_sc") continue;

		const value_old = token1[key];
		// 旧版本所有语言都没这个key
		if (value_old == undefined) {
			for (let [sLanguage, v] of Object.entries(value_new)) {
				if (!(v == undefined || v == ""))
					value_new[sLanguage + "_state"] = "new";
			}
		} else { // 旧版本至少一个语言有这个key
			for (let [sLanguage, v] of Object.entries(value_new)) {
				const _old = value_old[sLanguage];
				if (_old == undefined || _old == "") {
					if (!(v == undefined || v == ""))
						value_new[sLanguage + "_state"] = "new";
				} else if (_old != v) {
					if (!(v == undefined || v == ""))
						value_new[sLanguage + "_state"] = "change";
					// else delete
				}
			}
		}
	}
	const languages = Object.keys(token2.__key_sc).filter(v => v != "key");
	// 从英语基础上翻译的其他语言
	const otherLanguage = languages.filter(sLanguage => sLanguage != "schinese" && sLanguage != "english");
	const needDelete: string[] = [];
	for (let [key, value] of Object.entries(token_out)) {
		// 英语以中文为基础，特殊处理
		const english_state = value["english_state"];
		const schinese_state = value["schinese_state"];
		// 中文没改动的，无论英文有没有改动都没必要重新翻译
		// 有改动的，若英文也有改动，让执行命令的人手动改一下
		if (schinese_state == "new" || schinese_state == "change") {
			if (english_state == "new" || english_state == "change") {
				value["english_state"] = "待定";
				for (let sLanguage of otherLanguage) {
					value[sLanguage + "_state"] = "待定";
				}
			} else {
				value["english_state"] = "1";
				for (let sLanguage of otherLanguage) {
					value[sLanguage + "_state"] = "1";
				}
			}
		} else {
			needDelete.push(key);
			value["english_state"] = "0";
			for (let sLanguage of otherLanguage) {
				value[sLanguage + "_state"] = "0";
			}
		}
	}
	needDelete.forEach(key => {
		delete token_out[key];
	});
	const key_sc: Record<string, string> = { key: "key" };
	languages.forEach(sLanguage => {
		key_sc[sLanguage] = sLanguage;
		key_sc[sLanguage + "_state"] = sLanguage + "_state";
	});
	token_out.__key_sc = key_sc;

	// 至少有一个__key_sc
	if (Object.keys(token_out).length > 1) {
		for (let [key, value] of Object.entries(token_out)) {
			if (key == "__key_sc") {
				continue;
			}
			if (value.schinese[0] != "'") {
				value.schinese = "'" + value.schinese;
			}
		}

		fs.writeFileSync(path.join(sDir, `change_${n1}_${n2}.csv`), "\uFEFF" + obj2csv(token_out));
	}
}

const autoGenerateTitle = `// 由DOTA2作图工具指令[dota2tools.import_localization](导入本地化文本)生成
// 手动修改此文件后，下次导入可能会显示冲突，到时候请手动解决
`;

export async function localizationImportTool() {
	const gameDir = getGameDir();
	const schinesePath = path.join(gameDir, "resource/addon_schinese.txt");
	if (!fs.existsSync(schinesePath)) {
		return;
	}
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath == undefined || !fs.existsSync(localizationPath)) {
		return;
	}
	const sHistory = path.join(localizationPath, "history");
	if (!fs.existsSync(sHistory)) {
		return;
	}
	const files: string[] = [];
	fs.readdirSync(sHistory, { withFileTypes: true }).forEach(file => {
		if (file.isFile()) {
			if (file.name.includes("change_")) {
				files.push(file.name);
			}
		}
	});
	const sFile = await window.showQuickPick(files, { title: "选择导入的文件" });
	if (sFile == undefined) {
		return;
	}
	const sImport = path.join(localizationPath, "history", sFile);
	if (!fs.existsSync(sImport)) {
		return;
	}
	// 这个change文件对应的backup
	const sID = sFile.replace(".csv", "").split("_")[2];
	const sBackup = path.join(localizationPath, "history", `backup_${sID}.csv`);
	if (!fs.existsSync(sBackup)) {
		return;
	}

	const importTokens: Record<string, Record<string, any>> = csv2obj(fs.readFileSync(sImport, 'utf-8'));
	const keys = Object.keys(importTokens.__key_sc).filter(v => v != "key" && v != "schinese" && !v.includes("_state"));
	const sLanguage = await window.showQuickPick(keys, { title: "选择导入的语言" });
	if (sLanguage == undefined) {
		return;
	}

	const sCurrent = path.join(localizationPath, sLanguage, "auto_generate.txt");
	const backupTokens: Record<string, any> = csv2obj(fs.readFileSync(sBackup, 'utf-8'));
	const currentTokens: Record<string, any> = fs.existsSync(sCurrent) ? readlocalizationAsKv(sCurrent) : {};
	const schineseTokens: Record<string, string> = readKeyValue2(fs.readFileSync(schinesePath, 'utf-8')).lang.Tokens;
	const tokens: Record<string, string> = {};
	let bWarning = false;
	for (let key of Object.keys(schineseTokens)) {
		const importData = importTokens[key];
		let _current = currentTokens[key] ?? "";
		if (importData == undefined
			|| (importData[sLanguage] ?? "") == ""
			|| (importData[sLanguage + "_state"] != "1")
		) {

			if (_current.length > 0) {
				tokens[key] = `"${key}"	"${_current}"`;
			}
			continue;
		}
		const _backup = backupTokens[key]?.[sLanguage] ?? "";
		let _import = checkSingleQuotationMark(importData[sLanguage] ?? "");
		// 标记为冲突
		if (_backup != _current) {
			console.log("warning", _backup, _current);
			bWarning = true;
			tokens[key] = `>>>>>> Import >>>>>>
"${key}"	"${_import}"
>>>>>> OLD >>>>>>
"${key}"	"${_current}"
<<<<<<<<<<<<
`;
		} else {
			tokens[key] = `"${key}"	"${_import}"`;
		}
	}

	let sFileName = path.join(localizationPath, sLanguage, "auto_generate.txt");
	fs.writeFileSync(sFileName, autoGenerateTitle + os.EOL + Object.values(tokens).join(os.EOL));
	if (bWarning) {
		window.showErrorMessage(`有冲突,请手动处理`);
	}
}

function _LoadOld() {
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	const sDir = path.join(localizationPath!, "history");
	const english: Record<string, any> = csv2obj(fs.readFileSync(path.join(sDir, "english.csv"), 'utf-8'));
	const russian: Record<string, any> = csv2obj(fs.readFileSync(path.join(sDir, "russian.csv"), 'utf-8'));
	const total: Record<string, any> = {
		__key_sc: { key: "key", schinese: "schinese", english: "english", russian: "russian" },
	};
	for (let [key, value] of Object.entries(english)) {
		if (value.type == "注释" || (value.type ?? "") == "") {
			continue;
		}
		total[key] ??= { key };
		total[key].schinese = (value.new as string).slice(1);
		total[key].english = value.eng;
	}
	for (let [key, value] of Object.entries(russian)) {
		if (value.type == "注释" || (value.type ?? "") == "") {
			continue;
		}
		total[key] ??= { key };
		total[key].schinese = (value.new as string).slice(1);
		total[key].russian = value.rus;
	}
	fs.writeFileSync(path.join(sDir, `backup_temp.csv`), "\uFEFF" + obj2csv(total));
}

/** 【无用】翻译txt转csv */
function localizationCsv() {
	const gameDir = getGameDir();
	let localPaths = [
		(gameDir + "/panorama/localization/").replace(/\\/g, "/"),
		(gameDir + "/resource/").replace(/\\/g, "/"),
	];
	let csvPaths = [
		(gameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
		(gameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
	];
	for (let index = 0; index < localPaths.length; index++) {
		let sLocalizationPath = localPaths[index];
		let fFiles = fs.readdirSync(sLocalizationPath);
		let objTotal: any = {};
		// 排序让中文在第一，这样生成的key的顺序就和中文的一样了
		fFiles.sort((a: string, b: string) => {
			if (a === "addon_schinese.txt") {
				return -1;
			}
			if (b === "addon_schinese.txt") {
				return 1;
			}
			return (a < b) ? -1 : a > b ? 1 : 0;
		});
		fFiles.forEach(fileName => {
			if (fileName.indexOf("addon_") !== -1) {
				let sLanguage = fileName.substr(6, fileName.length - 4 - 6);
				let oLocalization = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sLocalizationPath + fileName, 'utf-8')));
				if (oLocalization.Tokens) {
					oLocalization = oLocalization.Tokens;
				}
				for (let key in oLocalization) {
					if (isEmptyCSVValue(oLocalization[key])) {
						continue;
					}
					if (!objTotal[key]) {
						objTotal[key] = { id: key };
					}
					// 前面加一个单引号禁用公式
					objTotal[key][sLanguage] = "'" + oLocalization[key];
				}
			}
		});
		let sLocalizationCSV = obj2csv(objTotal);
		let sCSVPath = csvPaths[index];
		fs.writeFileSync(sCSVPath, "\uFEFF" + sLocalizationCSV);
	}
}

/** 【无用】翻译csv转回txt */
function localizationText() {
	const gameDir = getGameDir();
	let localPaths = [
		(gameDir + "/panorama/localization/").replace(/\\/g, "/"),
		(gameDir + "/resource/").replace(/\\/g, "/"),
	];
	let csvPaths = [
		(gameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
		(gameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
	];
	for (let index = 0; index < csvPaths.length; index++) {
		let oCSV = csv2obj(fs.readFileSync(csvPaths[index], "utf-8"));
		let oLocalizations: any = {};
		// 拆分成多个语言
		for (let key in oCSV) {
			let info = oCSV[key];
			for (let localKey in info) {
				if (isEmptyCSVValue(localKey) || localKey === "id") {
					continue;
				}
				if (!oLocalizations[localKey]) {
					oLocalizations[localKey] = {};
				}
				if (!isEmptyCSVValue(info[localKey])) {
					// 去除 前面加一个单引号禁用公式
					oLocalizations[localKey][key] = info[localKey].substr(1);
				}
			}
		}
		// panorama的翻译
		if (index === 0) {
			for (let localKey in oLocalizations) {
				let oLocal: any = {};
				oLocal.addon = oLocalizations[localKey];
				delete oLocal.addon.__key_sc;
				let sKV = writeKeyValue(oLocal);
				fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
			}
		} else {
			for (let localKey in oLocalizations) {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				let oLocal: any = { addon: { Language: localKey } };
				oLocal.addon.Tokens = oLocalizations[localKey];
				delete oLocal.addon.Tokens.__key_sc;
				let sKV = writeKeyValue(oLocal);
				fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
			}
		}
	}
}