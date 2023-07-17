/* eslint-disable @typescript-eslint/naming-convention */
import * as https from "https";
import * as queryString from "querystring";
import md5 = require("md5");

type ErrorMap = {
	[key: string]: string;
};
const errorMap: ErrorMap = {
	52003: '用户认证失败',
	54001: '签名错误',
	54004: '账户余额不足',
};
const appId = '20210811000913406';
const appSecret = 'GPT0u7olcqXasoUAdaLZ';

export const translate = (word: string, callback: (str: string) => void) => {
	const salt = Math.random();
	const sign = md5(appId + word + salt + appSecret);
	let from, to;

	if (/[a-zA-Z]/.test(word[0])) {
		from = 'en';
		to = 'zh';
	} else {
		from = 'zh';
		to = 'en';
	}

	const query: string = queryString.stringify({
		q: word,
		appid: appId,
		from, to, salt, sign
	});

	// https.request({
	// 	hostname: 'transmart.qq.com',
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		"Content-length": Buffer.byteLength(JSON.stringify({
	// 			header: {
	// 				fn: "lang_detect",
	// 				token: "nXIJ00bfQAvilglrYnMY",
	// 			},
	// 			text: "content",
	// 		}))
	// 	},
	// 	path: "/api/imt",
	// 	method: 'POST'
	// }, (response) => {
	// 	let chunks: Buffer[] = [];
	// 	response.on('data', (chunk) => {
	// 		chunks.push(chunk);
	// 	});
	// 	response.on('end', () => {
	// 		const string = Buffer.concat(chunks).toString();
	// 		const object = JSON.parse(string);
	// 		console.log('腾讯交互', object);
	// 	});
	// });

	const options = {
		hostname: 'api.fanyi.baidu.com',
		port: 443,
		path: '/api/trans/vip/translate?' + query,
		method: 'GET'
	};

	// const request = https.request(options).on("end")
	const request = https.request(options, (response) => {
		let chunks: Buffer[] = [];
		response.on('data', (chunk) => {
			chunks.push(chunk);
		});
		response.on('end', () => {
			const string = Buffer.concat(chunks).toString();
			type BaiduResult = {
				error_code?: string;
				error_msg?: string;
				from: string;
				to: string;
				trans_result: {
					src: string;
					dst: string;
				}[];
			};
			const object: BaiduResult = JSON.parse(string);
			if (object.error_code) {
				console.error(errorMap[object.error_code] || object.error_msg);
				console.log('编译错误');
			} else {
				object.trans_result.map(obj => {
					// console.log(obj.dst);
					callback(obj.dst);
				});
			}
		});
	});

	request.on('error', (e) => {
		console.error(e);
	});
	request.end();
};