"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizationText = exports.localizationCsv = void 0;
const addonInfo_1 = require("../module/addonInfo");
const fs = require("fs");
const kvUtils_1 = require("../utils/kvUtils");
const csvUtils_1 = require("../utils/csvUtils");
/** 翻译txt转csv */
function localizationCsv() {
    const gameDir = (0, addonInfo_1.getGameDir)();
    let localPaths = [
        (gameDir + "/panorama/localization/").replace(/\\/g, "/"),
        (gameDir + "/resource/").replace(/\\/g, "/"),
    ];
    let csvPaths = [
        (gameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
        (gameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
    ];
    for (let index = 0; index < localPaths.length; index++) {
        let sLocalizationPath = localPaths[index];
        let fFiles = fs.readdirSync(sLocalizationPath);
        let objTotal = {};
        // 排序让中文在第一，这样生成的key的顺序就和中文的一样了
        fFiles.sort((a, b) => {
            if (a === "addon_schinese.txt") {
                return -1;
            }
            if (b === "addon_schinese.txt") {
                return 1;
            }
            return (a < b) ? -1 : a > b ? 1 : 0;
        });
        fFiles.forEach(fileName => {
            if (fileName.indexOf("addon_") !== -1) {
                let sLanguage = fileName.substr(6, fileName.length - 4 - 6);
                let oLocalization = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sLocalizationPath + fileName, 'utf-8')));
                if (oLocalization.Tokens) {
                    oLocalization = oLocalization.Tokens;
                }
                for (let key in oLocalization) {
                    if ((0, csvUtils_1.isEmptyCSVValue)(oLocalization[key])) {
                        continue;
                    }
                    if (!objTotal[key]) {
                        objTotal[key] = { id: key };
                    }
                    // 前面加一个单引号禁用公式
                    objTotal[key][sLanguage] = "'" + oLocalization[key];
                }
            }
        });
        let sLocalizationCSV = (0, csvUtils_1.obj2csv)(objTotal);
        let sCSVPath = csvPaths[index];
        fs.writeFileSync(sCSVPath, "\uFEFF" + sLocalizationCSV);
    }
}
exports.localizationCsv = localizationCsv;
/** 翻译csv转回txt */
function localizationText() {
    const gameDir = (0, addonInfo_1.getGameDir)();
    let localPaths = [
        (gameDir + "/panorama/localization/").replace(/\\/g, "/"),
        (gameDir + "/resource/").replace(/\\/g, "/"),
    ];
    let csvPaths = [
        (gameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
        (gameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
    ];
    for (let index = 0; index < csvPaths.length; index++) {
        let oCSV = (0, csvUtils_1.csv2obj)(fs.readFileSync(csvPaths[index], "utf-8"));
        let oLocalizations = {};
        // 拆分成多个语言
        for (let key in oCSV) {
            let info = oCSV[key];
            for (let localKey in info) {
                if ((0, csvUtils_1.isEmptyCSVValue)(localKey) || localKey === "id") {
                    continue;
                }
                if (!oLocalizations[localKey]) {
                    oLocalizations[localKey] = {};
                }
                if (!(0, csvUtils_1.isEmptyCSVValue)(info[localKey])) {
                    // 去除 前面加一个单引号禁用公式
                    oLocalizations[localKey][key] = info[localKey].substr(1);
                }
            }
        }
        // panorama的翻译
        if (index === 0) {
            for (let localKey in oLocalizations) {
                let oLocal = {};
                oLocal.addon = oLocalizations[localKey];
                delete oLocal.addon.__key_sc;
                let sKV = (0, kvUtils_1.writeKeyValue)(oLocal);
                fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
            }
        }
        else {
            for (let localKey in oLocalizations) {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                let oLocal = { addon: { Language: localKey } };
                oLocal.addon.Tokens = oLocalizations[localKey];
                delete oLocal.addon.Tokens.__key_sc;
                let sKV = (0, kvUtils_1.writeKeyValue)(oLocal);
                fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
            }
        }
    }
}
exports.localizationText = localizationText;
//# sourceMappingURL=cmdLocalization.js.map