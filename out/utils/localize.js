"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasReverseLocalize = exports.hasLocalize = exports.reverseLocalize = exports.localize = exports.localizeInit = void 0;
const vscode = require("vscode");
const readFile_1 = require("./readFile");
let langData;
let reverseLangData;
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
    reverseLangData = {
        [LangEnum.schinese]: langData[LangEnum.schinese],
        [LangEnum.english]: langData[LangEnum.english]
    };
    for (const key in reverseLangData[LangEnum.schinese]) {
        let value = reverseLangData[LangEnum.schinese][key];
        reverseLangData[LangEnum.schinese][value] = key;
        delete reverseLangData[LangEnum.schinese][key];
    }
    for (const key in reverseLangData[LangEnum.english]) {
        let value = reverseLangData[LangEnum.english][key];
        reverseLangData[LangEnum.english][value] = key;
        delete reverseLangData[LangEnum.english][key];
    }
}
exports.localizeInit = localizeInit;
/**
 * 获取本地化文本
 */
function localize(text, dialogVariables, language) {
    if (langData === undefined || text === undefined) {
        return text;
    }
    let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
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
/**
 * 逆向获取本地化文本
 */
function reverseLocalize(text, dialogVariables, language) {
    if (reverseLangData === undefined || text === undefined) {
        return text;
    }
    let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
    let langInfo = reverseLangData[langType];
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
exports.reverseLocalize = reverseLocalize;
/** 是否拥有本地化 */
function hasLocalize(text, language) {
    if (langData === undefined) {
        return false;
    }
    let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
    let langInfo = langData[langType];
    if (langInfo[text] !== undefined) {
        return true;
    }
    return false;
}
exports.hasLocalize = hasLocalize;
/** 逆向查找是否拥有本地化 */
function hasReverseLocalize(text, language) {
    if (reverseLangData === undefined) {
        return false;
    }
    let langType = language ?? vscode.env.language === "zh-cn" ? "zh-cn" : "en";
    let langInfo = reverseLangData[langType];
    if (langInfo[text] !== undefined) {
        return true;
    }
    return false;
}
exports.hasReverseLocalize = hasReverseLocalize;
//# sourceMappingURL=localize.js.map