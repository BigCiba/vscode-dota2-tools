import * as vscode from 'vscode';
import { TranslateBase } from '../Class/Translate/translateBase';
import { localize } from '../utils/localize';
import { Transmart } from '../Class/Translate/transmart';
import { TencentTranslate } from '../Class/Translate/tencentTranslate';
import { HuoShan } from '../Class/Translate/huoshan';
import { CaiYun } from '../Class/Translate/caiyun';
import { EventManager, EventType } from '../Class/event';

let translateService: TranslateBase;
let eventID: number;
/** 用户配置名 */
const configName = "dota2-tools.A7.translate service";
/** 用户配置 */
let translateConfig: string;
export function translateInit(content: vscode.ExtensionContext) {
	translateConfig = getTranslateService();
	if (translateService == undefined) {
		refreshTranslateService();
	}
	if (eventID === undefined) {
		eventID = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
			if (!event.affectsConfiguration(configName) || getTranslateService() === translateConfig) {
				return;
			}
			translateConfig = getTranslateService();
			refreshTranslateService();
		});
	}
	content.subscriptions.push(vscode.commands.registerCommand('dota2tools.A7.translate_advanced', () => {
		if (vscode.window.activeTextEditor) {
			let range = new vscode.Range(vscode.window.activeTextEditor?.selection.start, vscode.window.activeTextEditor?.selection.end);
			let textSelection = vscode.window.activeTextEditor?.document.getText(range);
			if (textSelection !== undefined && textSelection !== "") {
				const vsndPick = vscode.window.createQuickPick();
				vsndPick.canSelectMany = false;
				vsndPick.ignoreFocusOut = true;
				vsndPick.placeholder = '选择翻译的语言';
				vsndPick.matchOnDescription = true;
				vsndPick.items = getQuickPickLangList();

				vsndPick.show();
				vsndPick.onDidChangeSelection((t) => {
					vsndPick.value = t[0].label;
					translate(textSelection, "auto", t[0].label).then(res => {
						vscode.window.activeTextEditor?.edit(editBuilder => {
							if (vscode.window.activeTextEditor?.selection.start !== undefined) {
								editBuilder.replace(range, res);
							}
						});
					});
					vsndPick.dispose();
				});
			}
		}
	}));
}

/** 更新使用的翻译服务 */
function refreshTranslateService() {
	const config = getTranslateService();
	switch (config) {
		case localize("dota2-tools.A7.translate service.transmart"):
			translateService = new Transmart();
			break;
		case localize("dota2-tools.A7.translate service.caiyun"):
			translateService = new CaiYun();
			break;
		case localize("dota2-tools.A7.translate service.huoshan"):
			translateService = new HuoShan();
			break;
		case localize("dota2-tools.A7.translate service.tencentTranslate"):
			translateService = new TencentTranslate();
			break;
		default:
			translateService = new Transmart();
			break;
	}
}
export function detectTargetLanguage(str: string) {
	if (isChinese(str)) {
		return getPreferenceLanguage();
	}
	return "zh-Hans";
}
function getQuickPickLangList(): vscode.QuickPickItem[] {
	if (translateService) {
		const langList = Object.keys(translateService.supportedLanguages);
		return langList.filter((lang) => {
			return lang != "auto";
		}).map((lang) => {
			return {
				label: lang,
				description: localize(lang)
			};
		});
	}
	return [];
}
/** 检测语言 */
function isChinese(str: string) {
	const chineseRegex = /^[\u4e00-\u9fa5]+$/; // 匹配中文字符的正则表达式

	return chineseRegex.test(str);
}

export async function translate(text: string, sourceLang: string, targetLang: string) {
	return await translateService.translate(text, sourceLang, targetLang);
}

function getTranslateService() {
	return vscode.workspace.getConfiguration().get<string>(configName, localize("dota2-tools.A7.translate service.transmart"));
}

function getPreferenceLanguage() {
	return vscode.workspace.getConfiguration().get<string>("dota2-tools.A7.translate preference language", localize("en"));
}