import * as vscode from 'vscode';
import { readFile } from './readFile';

let langData: Table;

enum LangEnum {
	schinese = "zh-cn",
	english = "en"
};
export async function localizeInit(context: vscode.ExtensionContext) {
	langData = {
		[LangEnum.schinese]: JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "package.nls.zh-cn.json"))),
		[LangEnum.english]: JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "package.nls.json")))
	};
}
/**
 * 获取本地化文本
 */
export function localize(text: string, dialogVariables?: Table) {
	if (langData === undefined || text === undefined) {
		return text;
	}
	let langType = vscode.env.language === "zh-cn" ? "zh-cn" : "en";
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
/** 是否拥有本地化 */
export function hasLocalize(text: string) {
	if (langData === undefined) {
		return false;
	}
	let langType = vscode.env.language === "zh-cn" ? "zh-cn" : "en";
	let langInfo = langData[langType];
	if (langInfo[text] !== undefined) {
		return true;
	}
	return false;
}