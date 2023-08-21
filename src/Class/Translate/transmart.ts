import { request } from "../../utils/request";
import { TranslateBase } from "./translateBase";

export class Transmart implements TranslateBase {
	/** 支持的语言 */
	supportedLanguages = {
		auto: "auto",
		de: "DE",
		en: "EN",
		es: "ES",
		fr: "FR",
		it: "IT",
		ja: "JA",
		ko: "KO",
		nl: "NL",
		pl: "PL",
		pt: "PT",
		ru: "RU",
		"zh-Hans": "ZH",
		"zh-Hant": "ZH",
		bg: "BG",
		cs: "CS",
		da: "DA",
		el: "EL",
		et: "ET",
		fi: "FI",
		hu: "HU",
		lt: "LT",
		lv: "LV",
		ro: "RO",
		sk: "SK",
		sl: "SL",
		sv: "SV"
	};
	url: string = "https://yi.qq.com/api/imt";
	/** 获取接口定义的语言名称 */
	remapLang(sourceLang: keyof typeof this.supportedLanguages) {
		return this.supportedLanguages[sourceLang];
	}
	/** 翻译 */
	async translate(text: string, sourceLang: keyof typeof this.supportedLanguages, targetLang: keyof typeof this.supportedLanguages) {
		const data = await request<{
			header: {
				"type": string,
				"ret_code": string,
				"time_cost": number,
				"request_id": string;
			};
			auto_translation: string[];
		}>(
			"POST",
			this.url,
			{
				headers: {
					'Content-Type': 'application/json',
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
					'referer': 'https://yi.qq.com/zh-CN/index'
				},
				data: {
					"header": {
						"fn": "auto_translation",
						"client_key": "browser-chrome-110.0.0-Mac OS-df4bd4c5-a65d-44b2-a40f-42f34f3535f2-1677486696487"
					},
					"type": "plain",
					"model_category": "normal",
					"source": {
						"lang": this.remapLang(sourceLang),
						"text_list": [
							text
						]
					},
					"target": {
						"lang": this.remapLang(targetLang)
					}
				}
			}
		);
		if (data) {
			return data.auto_translation[0];
		}
		return text;
	}
}