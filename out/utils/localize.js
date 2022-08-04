"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasLocalize = exports.localize = exports.localizeInit = void 0;
const vscode = require("vscode");
const readFile_1 = require("./readFile");
let langData;
var LangEnum;
(function (LangEnum) {
    LangEnum["schinese"] = "zh-cn";
    LangEnum["english"] = "en";
})(LangEnum || (LangEnum = {}));
;
async function localizeInit(context) {
    langData = {
        [LangEnum.schinese]: JSON.parse(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "package.nls.zh-cn.json"))),
        [LangEnum.english]: JSON.parse(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "package.nls.json")))
    };
}
exports.localizeInit = localizeInit;
/**
 * 获取本地化文本
 */
function localize(text, dialogVariables) {
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
exports.localize = localize;
/** 是否拥有本地化 */
function hasLocalize(text) {
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
exports.hasLocalize = hasLocalize;
//# sourceMappingURL=localize.js.map