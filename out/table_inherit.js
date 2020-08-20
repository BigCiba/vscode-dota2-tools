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
 * 读取路径信息
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
        // 第二行为key
        let keys = arrCSV[1];
        for (let i = 2; i < arrCSV.length; i++) {
            let arrLine = arrCSV[i];
            let id = arrLine[0];
            if (!id) {
                continue;
            }
            csvConfigs[id] = {};
            for (let j = 1; j < arrLine.length; j++) {
                if (!keys[j]) {
                    continue;
                }
                let value = arrLine[j];
                if (value == undefined || value == "") {
                    continue;
                }
                if (keys[j] == "AttachWearables") {
                    for (let index = 1; index < 30; index++) {
                        if (csvConfigs[id]["AttachWearables" + index]) {
                            continue;
                        }
                        csvConfigs[id]["AttachWearables" + index] = value;
                        break;
                    }
                }
                else {
                    csvConfigs[id][keys[j]] = value;
                }
            }
        }
    }
    return csvConfigs;
}
exports.CSV2Obj = CSV2Obj;
// 写得好丑，先不用了
function Obj2CSV(Obj, sParentIndexKey, tKey2SChinese) {
    let line1 = "";
    let line2 = "";
    for (let key in tKey2SChinese) {
        let sChineseKey = tKey2SChinese[key];
        line1 += '"' + sChineseKey + '",';
        line2 += key + ',';
    }
    // 去除一个逗号
    line1 = line1.substr(0, line1.length - 1);
    line2 = line2.substr(0, line2.length - 1);
    let str = (line1 + "\n" + line2 + "\n");
    for (let lineKey in Obj) {
        let oLineInfo = Obj[lineKey];
        let sLine = "";
        for (let key in tKey2SChinese) {
            let value = oLineInfo[key];
            let sValue = "";
            if (value) {
                if (util.IsNumber(value)) {
                    sValue = value;
                }
                else {
                    sValue = '"' + value + '"';
                }
            }
            sLine += sValue + ",";
        }
        // 去除一个逗号
        sLine = sLine.substr(0, sLine.length - 1);
        str += (sLine + "\n");
    }
    return str;
}
exports.Obj2CSV = Obj2CSV;
/**
 * 创建路径
 * @param {string} dir 路径
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
        if (InheritConfig) {
            let abilities_excel_paths = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
            let abilities_kv_paths = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path') || {};
            let units_excel_paths = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};
            let units_kv_paths = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path') || {};
            let abilities_excel_path = abilities_excel_paths[0];
            let abilities_kv_path = abilities_kv_paths[0];
            let units_excel_path = units_excel_paths[0];
            let units_kv_path = units_kv_paths[0];
            // todo:支持多个配置
            for (const key in InheritConfig) {
                const config = InheritConfig[key];
                if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
                    continue;
                }
                let sParentPath, sTransitionPath = "invalid";
                if (config.type == "ability") {
                    sParentPath = abilities_excel_path + "/csv/" + config.parent + ".csv";
                    sTransitionPath = abilities_excel_path + "/csv/" + config.transition + ".csv";
                }
                else if (config.type == "unit") {
                    sParentPath = units_excel_path + "/csv/" + config.parent + ".csv";
                    sTransitionPath = units_excel_path + "/csv/" + config.transition + ".csv";
                }
                else {
                    continue;
                }
                let sParentCSV = fs.readFileSync(sParentPath, "utf-8");
                if (!sParentCSV)
                    return;
                let sTransitionCSV = fs.readFileSync(sTransitionPath, "utf-8");
                if (!sTransitionCSV)
                    return;
                let oParent = CSV2Obj(sParentCSV);
                let oTransition = CSV2Obj(sTransitionCSV);
                let oChild = {};
                for (let lineKey in oTransition) {
                    let line = oTransition[lineKey];
                    let sParentID = line[config.inherit_column];
                    if (!sParentID || sParentID == "")
                        continue;
                    let oParentLine = oParent[sParentID];
                    if (!oParentLine)
                        continue;
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
                    // 如果有，生成creature
                    for (let index = 1; index < 30; index++) {
                        let value = oChildLine["AttachWearables" + index];
                        if (!value) {
                            break;
                        }
                        if (!oChildLine.Creature) {
                            oChildLine.Creature = { AttachWearables: {} };
                        }
                        oChildLine.Creature.AttachWearables[index] = { ItemDef: value };
                        delete oChildLine["AttachWearables" + index];
                    }
                    // 如果有，生成EOMAbility
                    for (let index = 1; index < 35; index++) {
                        let value = oChildLine["Ability" + index];
                        if (!value) {
                            continue;
                        }
                        oChildLine["EOMAbility" + index] = value;
                        delete oChildLine["Ability" + index];
                    }
                    console.log(lineKey);
                    console.log(oChildLine);
                    oChild[lineKey] = oChildLine;
                    console.log(oChild);
                }
                console.log(oChild);
                let oKV = { KeyValue: oChild };
                let sKV = util.WriteKeyValue(oKV);
                let sKVPath = "";
                if (config.type == "ability") {
                    sKVPath = abilities_kv_path + "/" + config.child + ".kv";
                }
                else if (config.type == "unit") {
                    sKVPath = units_kv_path + "/" + config.child + ".kv";
                }
                fs.writeFileSync(sKVPath, sKV);
            }
        }
    });
}
exports.InheritTable = InheritTable;
//# sourceMappingURL=table_inherit.js.map