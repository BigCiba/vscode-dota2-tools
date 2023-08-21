import { request } from "../../utils/request";
import { TranslateBase } from "./translateBase";

export class CaiYun implements TranslateBase {
	/** 支持的语言 */
	supportedLanguages = {
		"auto": "auto",
		"de": "de",
		"en": "en",
		"es": "es",
		"fr": "fr",
		"it": "it",
		"ja": "ja",
		"ko": "ko",
		"nl": "nl",
		"pl": "pl",
		"pt": "pt",
		"ru": "ru",
		"zh-Hans": "zh",
		"zh-Hant": "zh",
		"bg": "bg",
		"cs": "cs",
		"da": "da",
		"el": "el",
		"et": "et",
		"fi": "fi",
		"hu": "hu",
		"lt": "lt",
		"lv": "lv",
		"ro": "ro",
		"sk": "sk",
		"sl": "sl",
		"sv": "sv"
	};
	url: string = "https://interpreter.cyapi.cn/v1/translator";
	/** 获取接口定义的语言名称 */
	remapLang(sourceLang: keyof typeof this.supportedLanguages) {
		return this.supportedLanguages[sourceLang];
	}
	getRandomNumber() {
		const rand = Math.floor(Math.random() * 99999) + 100000;
		return rand * 1000;
	}
	/** 翻译 */
	async translate(text: string, sourceLang: keyof typeof this.supportedLanguages, targetLang: keyof typeof this.supportedLanguages) {
		const data = await request<{
			isdict: number,
			confidence: number,
			target: string,
			rc: number,
		}>(
			"POST",
			this.url,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-authorization': 'token ssdj273ksdiwi923bsd9',
					'user-agent': 'caiyunInterpreter/5 CFNetwork/1404.0.5 Darwin/22.3.0'
				},
				data: {
					"source": text,
					"detect": true,
					"os_type": "ios",
					"device_id": "F1F902F7-1780-4C88-848D-71F35D88A602",
					"trans_type": this.remapLang(sourceLang) + '2' + this.remapLang(targetLang),
					"media": "text",
					"request_id": this.getRandomNumber(),
					"user_id": "",
					"dict": true
				}
			}
		);
		if (data) {
			return data.target;
		}
		return text;
	}
}