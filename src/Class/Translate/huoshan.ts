import { request } from "../../utils/request";
import { TranslateBase } from "./translateBase";

export class HuoShan implements TranslateBase {
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
	url: string = "https://translate.volcengine.com/crx/translate/v1";
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
			"POST",
			this.url,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					"text": text,
					"source_language": this.remapLang(sourceLang),
					"target_language": this.remapLang(targetLang),
				}
			}
		);
		if (data) {
			return data.translation;
		}
		return text;
	}
}