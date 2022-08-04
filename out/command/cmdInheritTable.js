"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInheritTable = exports.inheritTable = void 0;
const vscode = require("vscode");
const getRootPath_1 = require("../utils/getRootPath");
const fs = require("fs");
const kvUtils_1 = require("../utils/kvUtils");
const csvUtils_1 = require("../utils/csvUtils");
/** 表继承功能 */
async function inheritTable(context) {
    let rootPath = (0, getRootPath_1.getRootPath)();
    if (rootPath === undefined) {
        return;
    }
    let sConfigPath = (rootPath + "/eom_config.txt").replace("\\", "/");
    let eomProjectConfig = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sConfigPath, 'utf-8')));
    let inheritConfig = eomProjectConfig.InheritConfig;
    if (!inheritConfig) {
        return;
    }
    let abilitiesExcelPaths = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
    let unitsExcelPaths = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};
    // 可能配置了多个路径，每个一一对应来生成继承表
    for (let configIndex = 0; configIndex < 100; configIndex++) {
        let abilitiesExcelPath = abilitiesExcelPaths[configIndex];
        let unitsExcelPath = unitsExcelPaths[configIndex];
        // 任意一个没有就不算合格的配置
        if (!abilitiesExcelPath || !unitsExcelPath) {
            break;
        }
        // 读取每一个继承表的配置
        for (const key in inheritConfig) {
            const config = inheritConfig[key];
            // 缺少必填项
            if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
                continue;
            }
            // 读取配置的三项路径
            let sParentPath, sTransitionPath, sChildPath = "invalid";
            if (config.type === "ability") {
                sParentPath = abilitiesExcelPath + "/csv/" + config.parent + ".csv";
                sTransitionPath = abilitiesExcelPath + "/csv/" + config.transition + ".csv";
                sChildPath = abilitiesExcelPath + "/csv/" + config.child + ".csv";
            }
            else if (config.type === "unit") {
                sParentPath = unitsExcelPath + "/csv/" + config.parent + ".csv";
                sTransitionPath = unitsExcelPath + "/csv/" + config.transition + ".csv";
                sChildPath = unitsExcelPath + "/csv/" + config.child + ".csv";
            }
            else {
                continue;
            }
            generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
        }
    }
}
exports.inheritTable = inheritTable;
async function generateInheritTable(sParentPath, sTransitionPath, sChildPath, config) {
    // 文件内容的string
    let sParentCSV = fs.readFileSync(sParentPath, "utf-8");
    if (!sParentCSV) {
        return;
    }
    let sTransitionCSV = fs.readFileSync(sTransitionPath, "utf-8");
    if (!sTransitionCSV) {
        return;
    }
    // 文件内容转为obj
    let oParent = (0, csvUtils_1.csv2obj)(sParentCSV);
    let oTransition = (0, csvUtils_1.csv2obj)(sTransitionCSV);
    let oChild = {};
    // 中文key的处理
    if (oTransition.__key_sc) {
        oChild.__key_sc = Object.assign(oTransition.__key_sc);
        for (let sColumnKey in oParent.__key_sc) {
            let sC = oParent.__key_sc[sColumnKey];
            if ((0, csvUtils_1.isEmptyCSVValue)(oChild.__key_sc[sColumnKey])) {
                if (!(0, csvUtils_1.isEmptyCSVValue)(sC)) {
                    oChild.__key_sc[sColumnKey] = sC;
                }
            }
        }
        // 不继承的项目
        if (config.no_inherits) {
            for (let noInherit in config.no_inherits) {
                delete oChild.__key_sc[noInherit];
            }
        }
    }
    // 根据Transition的每一行继承parent，生成child的一行
    for (let lineKey in oTransition) {
        if (lineKey === "__key_sc") {
            continue;
        }
        let line = oTransition[lineKey];
        // 根据inherit_column指定的id找到parent的一行去继承
        let sParentID = line[config.inherit_column];
        if (!sParentID || sParentID === "") {
            continue;
        }
        // parent中没这行
        let oParentLine = oParent[sParentID];
        if (!oParentLine) {
            continue;
        }
        // 复制parent的数据
        let oChildLine = {};
        oChildLine = Object.assign(oChildLine, oParentLine);
        // 如果有，去掉parent的所有饰品
        for (let index = 1; index < 30; index++) {
            delete oChildLine["AttachWearables" + index];
        }
        // 如果有，去掉parent不需要继承的属性
        if (config.no_inherits) {
            for (let noInherit in config.no_inherits) {
                delete oChildLine[noInherit];
            }
        }
        // 用transition的数据覆盖parent的数据
        for (let k in line) {
            let value = line[k];
            oChildLine[k] = value;
        }
        //处理EOMAbility
        if (config.eom_ability === 1) {
            for (let index = 1; index < 35; index++) {
                let value = oChildLine["Ability" + index];
                if (!value) {
                    continue;
                }
                oChildLine["EOMAbility" + index] = value;
                delete oChildLine["Ability" + index];
            }
            // 中文key处理
            if (oChild.__key_sc) {
                for (let index = 1; index < 35; index++) {
                    if (oChild.__key_sc.hasOwnProperty("Ability" + index)) {
                        let sC = oChild.__key_sc["Ability" + index];
                        oChild.__key_sc["EOMAbility" + index] = sC;
                        delete oChild.__key_sc["Ability" + index];
                    }
                }
            }
        }
        oChild[lineKey] = oChildLine;
    }
    // object 转csv
    let sChildCSV = (0, csvUtils_1.obj2csv)(oChild);
    fs.writeFileSync(sChildPath, sChildCSV);
}
exports.generateInheritTable = generateInheritTable;
//# sourceMappingURL=cmdInheritTable.js.map