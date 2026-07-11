import { reverse } from 'dns';
import * as vscode from 'vscode';
import { readFile } from './readFile';

let langData: Table;
let reverseLangData: Table;

enum LangEnum {
	schinese = "zh-cn",
	english = "en"
};
export async function localizeInit(context: vscode.ExtensionContext) {
	const englishData = JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "package.nls.json")));
	langData = {
		[LangEnum.schinese]: englishData,
		[LangEnum.english]: englishData
	};
	reverseLangData = {
		[LangEnum.schinese]: { ...langData[LangEnum.schinese] },
		[LangEnum.english]: { ...langData[LangEnum.english] }
	};
	for (const key in reverseLangData[LangEnum.schinese]) {
		let value = reverseLangData[LangEnum.schinese][key];
		reverseLangData[LangEnum.schinese][value] = key;
		delete reverseLangData[LangEnum.schinese][key];
	}
	for (const key in reverseLangData[LangEnum.english]) {
		let value = reverseLangData[LangEnum.english][key];
		reverseLangData[LangEnum.english][value] = key;
		delete reverseLangData[LangEnum.english][key];
	}
}
/**
 * Get localized text
 */
export function localize(text: string, dialogVariables?: Table | string[], language?: "zh-cn" | "en") {
	if (langData === undefined || text === undefined) {
		return text;
	}
	let langType = language ?? (vscode.env.language === "zh-cn" ? "zh-cn" : "en");
	let langInfo = langData[langType];
	let result = langInfo[text] !== undefined ? langInfo[text] : text;
	if (dialogVariables) {
		if (Array.isArray(dialogVariables)) {
			for (let i = 0; i < dialogVariables.length; i++) {
				result = result.replace(new RegExp('\\$\\{' + i + '\\}', 'g'), dialogVariables[i]);
			}
		} else {
			for (const key in dialogVariables) {
				const value = dialogVariables[key];
				result = result.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), value);
			}
		}
	}
	return result;
}
/**
 * Reverse-lookup localized text
 */
export function reverseLocalize(text: string, dialogVariables?: Table, language?: "zh-cn" | "en") {
	if (reverseLangData === undefined || text === undefined) {
		return text;
	}
	let langType = language ?? (vscode.env.language === "zh-cn" ? "zh-cn" : "en");
	let langInfo = reverseLangData[langType];
	if (langInfo[text] !== undefined) {
		return langInfo[text];
	}
	if (dialogVariables) {
		for (const key in dialogVariables) {
			const value = dialogVariables[key];
			text.replace(/\${' + key + '}/g, value);
		}
	}
	return text;
}
/** Whether localization exists */
export function hasLocalize(text: string, language?: "zh-cn" | "en") {
	if (langData === undefined) {
		return false;
	}
	let langType = language ?? (vscode.env.language === "zh-cn" ? "zh-cn" : "en");
	let langInfo = langData[langType];
	if (langInfo[text] !== undefined) {
		return true;
	}
	return false;
}
/** Reverse-lookup whether localization exists */
export function hasReverseLocalize(text: string, language?: "zh-cn" | "en") {
	if (reverseLangData === undefined) {
		return false;
	}
	let langType = language ?? (vscode.env.language === "zh-cn" ? "zh-cn" : "en");
	let langInfo = reverseLangData[langType];
	if (langInfo[text] !== undefined) {
		return true;
	}
	return false;
}