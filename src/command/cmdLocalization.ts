import { getGameDir } from "../module/addonInfo";
import * as fs from 'fs';
import { getKeyValueObjectByIndex, readKeyValue2, writeKeyValue } from "../utils/kvUtils";
import { csv2obj, isEmptyCSVValue, obj2csv } from "../utils/csvUtils";

/** 翻译txt转csv */
export function localizationCsv() {
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

/** 翻译csv转回txt */
export function localizationText() {
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