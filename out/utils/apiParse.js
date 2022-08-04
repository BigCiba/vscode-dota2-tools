"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiParse = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const os = require("os");
const readFunction_1 = require("./readFunction");
const readEnum_1 = require("./readEnum");
const addonInfo_1 = require("../module/addonInfo");
function apiParse(context, apiNote) {
    let praseFile = function (sDotaScriptHelp) {
        const rows = sDotaScriptHelp.split(os.EOL);
        let classList = {};
        let enumList = {};
        for (let i = 0; i < rows.length; i++) {
            // 函数
            let option = rows[i].match(/---\[\[.*\]\]/g);
            if (option !== null && option.length > 0) {
                let [funInfo, newLine] = (0, readFunction_1.readFunction)(i, rows);
                if ((apiNote[funInfo.class] !== undefined && apiNote[funInfo.class][funInfo.function] !== undefined) || apiNote[funInfo.function] !== undefined) {
                    let note = (apiNote[funInfo.class] !== undefined && apiNote[funInfo.class][funInfo.function] !== undefined) ? apiNote[funInfo.class][funInfo.function] : apiNote[funInfo.function];
                    funInfo.description = note.description;
                    for (const params_name in funInfo.params) {
                        const params_info = funInfo.params[params_name];
                        if (note.params[params_name]) {
                            params_info.type = note.params[params_name].type;
                            params_info.params_name = note.params[params_name].params_name;
                            params_info.description = note.params[params_name].description;
                        }
                    }
                    funInfo.example = note.example;
                    funInfo.return = note.return;
                }
                if (classList[funInfo.class] === undefined) {
                    classList[funInfo.class] = [];
                }
                classList[funInfo.class].push(funInfo);
                i = newLine;
            }
            // 常数
            if (rows[i].search('--- Enum ') !== -1) {
                let enum_name = rows[i].substr(9, rows[i].length);
                if (enumList[enum_name] === undefined) {
                    enumList[enum_name] = [];
                }
                let [enum_info, new_line] = (0, readEnum_1.readEnum)(i, rows);
                for (let j = 0; j < enum_info.length; j++) {
                    const enum_arr = enum_info[j];
                    enum_arr.class = enum_name;
                    if (apiNote[enum_name] !== undefined && apiNote[enum_name][enum_arr.name] !== undefined) {
                        enum_arr.description_lite = apiNote[enum_name][enum_arr.name].description_lite;
                        enum_arr.description = apiNote[enum_name][enum_arr.name].description;
                        enum_arr.example = apiNote[enum_name][enum_arr.name].example;
                    }
                    else if (apiNote[enum_arr.name] !== undefined) {
                        enum_arr.description_lite = apiNote[enum_arr.name].description_lite;
                        enum_arr.description = apiNote[enum_arr.name].description;
                        enum_arr.example = apiNote[enum_arr.name].example;
                    }
                }
                enumList[enum_name] = enum_info;
                i = new_line;
            }
        }
        // 将api_note中的自定义函数加入
        for (const className in apiNote) {
            if (classList[className] === undefined) {
                if (typeof (apiNote[className]) === 'object' && apiNote[className].type === 'custom_note') {
                    classList[className] = [];
                    for (const funcName in apiNote[className]) {
                        const funcInfo = apiNote[className][funcName];
                        if (typeof (funcInfo) === 'object' && funcInfo.function) {
                            classList[className].push(funcInfo);
                        }
                    }
                }
            }
            else {
                for (const funName in apiNote[className]) {
                    if (typeof (apiNote[className][funName]) === 'object' && apiNote[className][funName].type === 'custom_note') {
                        classList[className].push(apiNote[className][funName]);
                    }
                }
            }
        }
        // 将api_note中的自定义常数加入
        for (const enumType in apiNote) {
            if (enumList[enumType] === undefined) {
                if (typeof (apiNote[enumType]) === 'object' && apiNote[enumType].type === 'custom_note_enum') {
                    enumList[enumType] = [];
                    for (const enumName in apiNote[enumType]) {
                        const enumInfo = apiNote[enumType][enumName];
                        if (typeof (enumInfo) === 'object') {
                            enumList[enumType].push(enumInfo);
                        }
                    }
                }
            }
        }
        return [classList, enumList];
    };
    let Combine = function (class_list, class_list_cl) {
        for (const class_name in class_list) {
            const fun_list = class_list[class_name];
            // console.log('fun_list', fun_list);
            for (let i = 0; i < fun_list.length; i++) {
                const fun_info = fun_list[i];
                let class_info_cl = class_list_cl[class_name];
                if (class_info_cl === undefined) {
                    class_info_cl = class_list_cl[class_name.replace('C', 'C_')];
                }
                if (class_info_cl !== undefined) {
                    for (let j = 0; j < class_info_cl.length; j++) {
                        if (class_info_cl[j].function === fun_info.function) {
                            fun_info.client = true;
                            fun_info.class_cl = class_info_cl[j].class;
                            break;
                        }
                    }
                }
            }
        }
        // 补充client api
        for (const class_name in class_list_cl) {
            const fun_list = class_list_cl[class_name];
            for (let i = 0; i < fun_list.length; i++) {
                const fun_info = fun_list[i];
                let bHasServer = false;
                for (let i = 0; i < class_list[class_name.replace('C_', 'C')].length; i++) {
                    const server_fun_info = class_list[class_name.replace('C_', 'C')][i];
                    if (fun_info.function === server_fun_info.function) {
                        bHasServer = true;
                        break;
                    }
                }
                if (bHasServer === false) {
                    fun_info.server = false;
                    fun_info.client = true;
                    fun_info.class = undefined;
                    fun_info.class_cl = class_name.replace('C_', 'C');
                    class_list[class_name.replace('C_', 'C')].push(fun_info);
                }
            }
        }
        //重新排序
        for (const class_name in class_list) {
            let fun_list = class_list[class_name];
            let sort_func_list = [];
            let funcName = [];
            for (let i = 0; i < fun_list.length; i++) {
                const fun_info = fun_list[i];
                funcName.push(fun_info.function);
            }
            funcName.sort();
            for (let i = 0; i < funcName.length; i++) {
                for (let j = 0; j < fun_list.length; j++) {
                    if (funcName[i] === fun_list[j].function) {
                        sort_func_list.push(fun_list[j]);
                        break;
                    }
                }
            }
            class_list[class_name] = sort_func_list;
        }
    };
    let sHelp = path.join(context.extensionPath, "resource/dota_script_help2.lua");
    let sHelpClient = path.join(context.extensionPath, "resource/dota_cl_script_help2.lua");
    let [class_list, enum_list] = praseFile(fs.readFileSync(sHelp, 'utf-8'));
    let [class_list_cl, enum_list_cl] = praseFile(fs.readFileSync(sHelpClient, 'utf-8'));
    Combine(class_list, class_list_cl);
    // modifier function 对应
    let modifierfunctionPath = vscode.workspace.getConfiguration().get('dota2-tools.modifierfunction path');
    if (modifierfunctionPath !== undefined && modifierfunctionPath !== '') {
        let modifierfunction = 'return {\n';
        for (const property in enum_list.modifierfunction) {
            const element = enum_list.modifierfunction[property];
            modifierfunction += `	${element.name} = "${element.function || ''}",
`;
        }
        modifierfunction += '}';
        fs.writeFileSync(path.join((0, addonInfo_1.getGameDir)(), modifierfunctionPath), modifierfunction);
    }
    return [class_list, enum_list];
}
exports.apiParse = apiParse;
//# sourceMappingURL=apiParse.js.map