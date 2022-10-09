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
	langData = {
		[LangEnum.schinese]: JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "package.nls.zh-cn.json"))),
		[LangEnum.english]: JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "package.nls.json")))
	};
	reverseLangData = {
		[LangEnum.schinese]: langData[LangEnum.schinese],
		[LangEnum.english]: langData[LangEnum.english]
	}
	for (const key in reverseLangData[LangEnum.schinese]) {
		let value = reverseLangData[LangEnum.schinese][key]
		reverseLangData[LangEnum.schinese][value] = key
		delete reverseLangData[LangEnum.schinese][key]
	}
	for (const key in reverseLangData[LangEnum.english]) {
		let value = reverseLangData[LangEnum.english][key]
		reverseLangData[LangEnum.english][value] = key
		delete reverseLangData[LangEnum.english][key]
	}
}
/**
 * 获取本地化文本
 */
export function localize(text: string, dialogVariables?: Table, language?:"zh-cn" | "en") {
	if (langData === undefined || text === undefined) {
		return text;
	}
	let langType = language??vscode.env.language === "zh-cn" ? "zh-cn" : "en";
	let langInfo = langData[langType];
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
/**
 * 逆向获取本地化文本
 */
export function reverseLocalize(text: string, dialogVariables?: Table, language?:"zh-cn" | "en") {
	if (reverseLangData === undefined || text === undefined) {
		return text;
	}
	let langType = language??vscode.env.language === "zh-cn" ? "zh-cn" : "en";
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
/** 是否拥有本地化 */
export function hasLocalize(text: string, language?:"zh-cn" | "en") {
	if (langData === undefined) {
		return false;
	}
	let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
	let langInfo = langData[langType];
	if (langInfo[text] !== undefined) {
		return true;
	}
	return false;
}
/** 逆向查找是否拥有本地化 */
export function hasReverseLocalize(text: string, language?:"zh-cn" | "en") {
	if (reverseLangData === undefined) {
		return false;
	}
	let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
	let langInfo = reverseLangData[langType];
	if (langInfo[text] !== undefined) {
		return true;
	}
	return false;
}