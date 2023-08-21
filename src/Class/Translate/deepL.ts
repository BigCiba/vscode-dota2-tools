import { request } from "../../utils/request";

export class DeepL {
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
	url: string = "https://www2.deepl.com/jsonrpc";
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
				},
				data: {
					jsonrpc: '2.0',
					method: 'LMT_handle_texts',
					params: {
						splitting: 'newlines',
						lang: {
							source_lang_user_selected: this.remapLang(sourceLang),
							target_lang: this.remapLang(targetLang)
						}
					}
				}
			}
		);
		if (data) {
			return data.auto_translation[0];
		}
	}
}