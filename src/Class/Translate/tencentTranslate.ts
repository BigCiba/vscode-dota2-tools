import { request } from "../../utils/request";
import { TranslateBase } from "./translateBase";

export class TencentTranslate implements TranslateBase {
	/** 支持的语言 */
	supportedLanguages = {
		'auto': 'auto',
		'zh-Hans': 'zh',
		'en': 'en',
		'de': 'de',
		'fr': 'fr',
		'it': 'it',
		'ja': 'ja',
		'es': 'es',
		'nl': 'nl',
		'pl': 'pl',
		'pt': 'pt',
		'ru': 'ru',
	};
	url: string = "https://wxapp.translator.qq.com/api/translate";
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
			translation: string,
			detected_language: string,
			probability: number,
		}>(
			"GET",
			this.url,
			{
				headers: {
					"content-type": "application/json",
					"Host": "wxapp.translator.qq.com",
					"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.32(0x18002035) NetType/WIFI Language/zh_TW",
					"Referer": "https://servicewechat.com/wxb1070eabc6f9107e/117/page-frame.html"
				},
				data: {
					"source": 'auto',
					"target": 'auto',
					"sourceText": text,
					"platform": "WeChat_APP",
					"candidateLangs": this.remapLang(sourceLang) + '|' + this.remapLang(targetLang),
					"guid": "oqdgX0SIwhvM0TmqzTHghWBvfk22"
				}
			}
		);
		if (data) {
			return data.translation;
		}
		return text;
	}
}