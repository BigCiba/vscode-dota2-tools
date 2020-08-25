"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const util = require("./util");
/**
 * 继承表
 */
function InheritTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let root_path = util.GetRootPath();
        if (root_path === undefined) {
            return;
        }
        let sConfigPath = (root_path + "/eom_config.txt").replace("\\", "/");
        let EOMProjectConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sConfigPath, 'utf-8')));
        let InheritConfig = EOMProjectConfig.InheritConfig;
        if (!InheritConfig) {
            return;
        }
        let abilities_excel_paths = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
        let units_excel_paths = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};
        // 可能配置了多个路径，每个一一对应来生成继承表
        for (let configIndex = 0; configIndex < 100; configIndex++) {
            let abilities_excel_path = abilities_excel_paths[configIndex];
            let units_excel_path = units_excel_paths[configIndex];
            // 任意一个没有就不算合格的配置
            if (!abilities_excel_path || !units_excel_path) {
                break;
            }
            // 读取每一个继承表的配置
            for (const key in InheritConfig) {
                const config = InheritConfig[key];
                // 缺少必填项
                if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
                    continue;
                }
                // 读取配置的三项路径
                let sParentPath, sTransitionPath, sChildPath = "invalid";
                if (config.type == "ability") {
                    sParentPath = abilities_excel_path + "/csv/" + config.parent + ".csv";
                    sTransitionPath = abilities_excel_path + "/csv/" + config.transition + ".csv";
                    sChildPath = abilities_excel_path + "/csv/" + config.child + ".csv";
                }
                else if (config.type == "unit") {
                    sParentPath = units_excel_path + "/csv/" + config.parent + ".csv";
                    sTransitionPath = units_excel_path + "/csv/" + config.transition + ".csv";
                    sChildPath = units_excel_path + "/csv/" + config.child + ".csv";
                }
                else {
                    continue;
                }
                generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
            }
        }
    });
}
exports.InheritTable = InheritTable;
function generateInheritTable(sParentPath, sTransitionPath, sChildPath, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // 文件内容的string
        let sParentCSV = fs.readFileSync(sParentPath, "utf-8");
        if (!sParentCSV)
            return;
        let sTransitionCSV = fs.readFileSync(sTransitionPath, "utf-8");
        if (!sTransitionCSV)
            return;
        // 文件内容转为obj
        let oParent = util.CSV2Obj(sParentCSV);
        let oTransition = util.CSV2Obj(sTransitionCSV);
        let oChild = {};
        // 中文key的处理
        if (oTransition.__key_sc) {
            oChild.__key_sc = Object.assign(oTransition.__key_sc);
            for (let sColumnKey in oParent.__key_sc) {
                let sC = oParent.__key_sc[sColumnKey];
                if (util.isEmptyCSVValue(oChild.__key_sc[sColumnKey])) {
                    if (!util.isEmptyCSVValue(sC)) {
                        oChild.__key_sc[sColumnKey] = sC;
                    }
                }
            }
            // 不继承的项目
            if (config.no_inherits) {
                for (let no_inherit in config.no_inherits) {
                    delete oChild.__key_sc[no_inherit];
                }
            }
        }
        // 根据Transition的每一行继承parent，生成child的一行
        for (let lineKey in oTransition) {
            if (lineKey == "__key_sc") {
                continue;
            }
            let line = oTransition[lineKey];
            // 根据inherit_column指定的id找到parent的一行去继承
            let sParentID = line[config.inherit_column];
            if (!sParentID || sParentID == "")
                continue;
            // parent中没这行
            let oParentLine = oParent[sParentID];
            if (!oParentLine)
                continue;
            // 复制parent的数据
            let oChildLine = {};
            oChildLine = Object.assign(oChildLine, oParentLine);
            // 如果有，去掉parent的所有饰品
            for (let index = 1; index < 30; index++) {
                delete oChildLine["AttachWearables" + index];
            }
            // 如果有，去掉parent不需要继承的属性
            if (config.no_inherits) {
                for (let no_inherit in config.no_inherits) {
                    delete oChildLine[no_inherit];
                }
            }
            // 用transition的数据覆盖parent的数据
            for (let k in line) {
                let value = line[k];
                oChildLine[k] = value;
            }
            //处理EOMAbility
            if (config.eom_ability == 1) {
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
        let sChildCSV = util.Obj2CSV(oChild);
        fs.writeFileSync(sChildPath, sChildCSV);
    });
}
exports.generateInheritTable = generateInheritTable;
//# sourceMappingURL=table_inherit.js.map