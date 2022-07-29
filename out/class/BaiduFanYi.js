"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const https = require("https");
const queryString = require("querystring");
const md5 = require("md5");
const errorMap = {
    52003: '用户认证失败',
    54001: '签名错误',
    54004: '账户余额不足',
};
const appId = '20210811000913406';
const appSecret = 'GPT0u7olcqXasoUAdaLZ';
const translate = (word, callback) => {
    const salt = Math.random();
    const sign = md5(appId + word + salt + appSecret);
    let from, to;
    if (/[a-zA-Z]/.test(word[0])) {
        from = 'en';
        to = 'zh';
    }
    else {
        from = 'zh';
        to = 'en';
    }
    const query = queryString.stringify({
        q: word,
        appid: appId,
        from, to, salt, sign
    });
    const options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    // const request = https.request(options).on("end")
    const request = https.request(options, (response) => {
        let chunks = [];
        response.on('data', (chunk) => {
            chunks.push(chunk);
        });
        response.on('end', () => {
            const string = Buffer.concat(chunks).toString();
            const object = JSON.parse(string);
            if (object.error_code) {
                console.error(errorMap[object.error_code] || object.error_msg);
                console.log('编译错误');
            }
            else {
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
exports.translate = translate;
//# sourceMappingURL=BaiduFanYi.js.map