import { request } from "../../utils/request";
import * as CryptoJS from "crypto-js";

export class YouDao {
	/** 支持的语言 */
	supportedLanguages = {
		auto: 'auto',
		'zh-Hans': 'zh',
		en: 'en',
		de: 'de',
		fr: 'fr',
		it: 'it',
		ja: 'ja',
		es: 'es',
		nl: 'nl',
		pl: 'pl',
		pt: 'pt',
		ru: 'ru',
	};
	r = "fanyideskweb";
	i = "webfanyi";
	url: string = "https://dict.youdao.com/webtranslate";
	m(e: string) {
		return CryptoJS.MD5(e).toString(CryptoJS.enc.Hex);
	}
	p(e: string) {
		return CryptoJS.MD5(e.toString()).toString(CryptoJS.enc.Hex);
	}
	b(e: number, t: string) {
		return this.p('client=' + this.r + '&mysticTime=' + e + '&product=' + this.i + '&key=' + t);
	}
	f() {
		const e = 'fsdsogkndfokasodnaso', s = 'client,mysticTime,product', u = 'fanyi.web', l = '1.0.0', d = 'web';
		const t = (new Date).getTime();

		return {
			sign: this.b(t, e),
			client: this.r,
			product: this.i,
			appVersion: l,
			vendor: d,
			pointParam: s,
			mysticTime: t,
			keyfrom: u
		};
	}
	A(t: any) {
		const o = "ydsecret://query/key/BRGygVywfNBwpmBaZgWT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl";
		const n = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4";
		if (!t)
			return null;
		const a = CryptoJS.enc.Hex.parse(this.m(o)),
			r = CryptoJS.enc.Hex.parse(this.m(n)),
			i = CryptoJS.AES.decrypt(t, a, {
				iv: r
			});
		return i.toString(CryptoJS.enc.Utf8);
	}
	/** 获取接口定义的语言名称 */
	remapLang(sourceLang: keyof typeof this.supportedLanguages) {
		return this.supportedLanguages[sourceLang];
	}
	/** 翻译 */
	async translate(text: string, sourceLang: keyof typeof this.supportedLanguages, targetLang: keyof typeof this.supportedLanguages) {
		const targetLanguage = this.remapLang(targetLang);
		const sourceLanguage = this.remapLang(sourceLang);
		if (!targetLanguage) {
			const err = new Error();
			Object.assign(err, {
				_type: 'unsupportLanguage',
				_message: '不支持该语种',
			});
			throw err;
		}
		const originData = {
			'i': text,
			'from': sourceLanguage,
			'to': targetLanguage,
			'domain': '0',
			'dictResult': 'true',
			'keyid': 'webfanyi'
		};
		let fData = this.f();
		const body = Object.assign(originData, fData);

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
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54',
					'Cookie': 'OUTFOX_SEARCH_USER_ID_NCOO=976405377.6815147; OUTFOX_SEARCH_USER_ID=-198948307@211.83.126.235; _ga=GA1.2.1162596953.1667349221; search-popup-show=12-2',
					'Referer': 'https://fanyi.youdao.com/'
				},
				data: body
			}
		);
		if (data) {
			let rs = this.A(data);
			console.log(data);

			// return data.auto_translation[0];
		}
	}
}