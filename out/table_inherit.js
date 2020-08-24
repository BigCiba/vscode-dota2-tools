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
 * 将CSV的字符串或者数组转成Object
 * @param {any} CSV csv string 或者 any[][]
 * @param {boolean} bVertical 是否为纵向配置，每一行像这样：中文解释,key,value
 */
function CSV2Obj(CSV, bVertical = false) {
    let arrCSV = CSV;
    if (typeof (CSV) == "string") {
        arrCSV = util.CSVParse(CSV);
    }
    let csvConfigs = {};
    if (bVertical) {
        for (let i = 0; i < arrCSV.length; i++) {
            let arrLine = arrCSV[i];
            csvConfigs[arrLine[1]] = arrLine[2];
        }
    }
    else {
        // 横向的至少要有三行，第一行中文，第二行key， 第三行内容
        if (arrCSV.length < 3) {
            return csvConfigs;
        }
        let keys = arrCSV[1]; // 第二行 key
        for (let i = 2; i < arrCSV.length; i++) {
            let arrLine = arrCSV[i];
            let lineID = arrLine[0];
            if (!lineID) {
                continue;
            }
            csvConfigs[lineID] = {};
            for (let j = 0; j < arrLine.length; j++) {
                if (!keys[j] || keys[j] == "") {
                    continue;
                }
                let value = arrLine[j] || "";
                // if (value == undefined || value == "") {
                // 	continue;
                // }
                // 因为多个key都叫AttachWearables，处理成AttachWearables1234
                let columnKey = keys[j];
                if (keys[j] == "AttachWearables") {
                    for (let index = 1; index < 30; index++) {
                        if (!csvConfigs[lineID]["AttachWearables" + index]) {
                            columnKey = "AttachWearables" + index;
                            break;
                        }
                    }
                }
                csvConfigs[lineID][columnKey] = value;
            }
        }
        // 中文行处理
        csvConfigs["__key_sc"] = {};
        for (let j = 0; j < keys.length; j++) {
            let sc = arrCSV[0][j] || "";
            let columnKey = keys[j];
            if (keys[j] == "AttachWearables") {
                for (let index = 1; index < 30; index++) {
                    if (!csvConfigs["__key_sc"]["AttachWearables" + index]) {
                        columnKey = "AttachWearables" + index;
                        sc = "AttachWearables" + index;
                        break;
                    }
                }
            }
            csvConfigs["__key_sc"][columnKey] = sc;
        }
    }
    return csvConfigs;
}
exports.CSV2Obj = CSV2Obj;
// Obj转csv
function Obj2CSV(Obj) {
    let __key_sc = Obj.__key_sc;
    if (!__key_sc) {
        // 默认中英文key一样
        __key_sc = {};
        for (let lineID in Obj) {
            let lineInfo = Obj[lineID];
            for (let columnKey in lineInfo) {
                __key_sc[columnKey] = columnKey;
            }
        }
    }
    // 前两行
    let arrCSV = [];
    arrCSV[0] = [];
    arrCSV[1] = [];
    for (let key in __key_sc) {
        let sChineseKey = __key_sc[key];
        arrCSV[0].push(sChineseKey);
        if (key.indexOf("AttachWearables") != -1) {
            arrCSV[1].push("AttachWearables");
        }
        else {
            arrCSV[1].push(key);
        }
    }
    let y = 2;
    for (let lineID in Obj) {
        if (lineID == "__key_sc") {
            continue;
        }
        arrCSV[y] = [];
        let oLineInfo = Obj[lineID];
        for (let columnKey in __key_sc) {
            let value = oLineInfo[columnKey] || '';
            arrCSV[y].push(value);
        }
        y++;
    }
    return util.Array2CSV(arrCSV);
}
exports.Obj2CSV = Obj2CSV;
function isEmptyCSVValue(anything) {
    if (anything == undefined || anything == null || anything == "") {
        return true;
    }
    else {
        return false;
    }
}
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
        let oParent = CSV2Obj(sParentCSV);
        let oTransition = CSV2Obj(sTransitionCSV);
        let oChild = {};
        // 中文key的处理
        if (oTransition.__key_sc) {
            oChild.__key_sc = Object.assign(oTransition.__key_sc);
            for (let sColumnKey in oParent.__key_sc) {
                let sC = oParent.__key_sc[sColumnKey];
                if (isEmptyCSVValue(oChild.__key_sc[sColumnKey])) {
                    if (!isEmptyCSVValue(sC)) {
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
        let sChildCSV = Obj2CSV(oChild);
        fs.writeFileSync(sChildPath, sChildCSV);
    });
}
exports.generateInheritTable = generateInheritTable;
//# sourceMappingURL=table_inherit.js.map