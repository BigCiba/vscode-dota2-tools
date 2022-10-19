"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rogueItemsGameParse = exports.parseLuaAPIChangelog = exports.parseLuaAPI = exports.vsndGenerator = exports.parsePanelList = exports.parseEventDocument = exports.parseCssDocument = exports.parsePanoramaAPI = exports.itemsGameParse = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const kvUtils_1 = require("../utils/kvUtils");
const eachLine_1 = require("../utils/eachLine");
const objectHasKey_1 = require("../utils/objectHasKey");
const apiNote_1 = require("./apiNote");
const readFunction_1 = require("../utils/readFunction");
const readEnum_1 = require("../utils/readEnum");
/**
 * 更新步骤：
 * 1. 解包items_game.txt到resource文件夹
 * 2. 复制控制台cl_panorama_script_help_2到resource同名文件中
 * 3. 复制控制台dump_panorama_css_properties到resource同名文件中
 * 4. 复制控制台dump_panorama_events到resource同名文件中
 * 5. PanelList.md是手写文档
 * 6. 解包soundevents，手动改路径解析
 * 7. 复制最新的api用来生成changelog
 */
/** 将items_game.txt的套装信息解析出来 */
function itemsGameParse(context) {
    let sFilePath = path.join(context.extensionPath, "resource/items_game.txt");
    let tItemsData = (0, kvUtils_1.readKeyValue2)(fs.readFileSync(sFilePath, 'utf-8'), true, false).items_game.items;
    for (const index in tItemsData) {
        const element = tItemsData[index];
        delete element.portraits;
    }
    fs.writeFileSync(path.join(context.extensionPath, "resource/items_game.json"), JSON.stringify(tItemsData));
}
exports.itemsGameParse = itemsGameParse;
/** 将官方打印的api替换成md格式和obj */
function parsePanoramaAPI(context) {
    let cl_panorama_script_help_2 = fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.txt'), 'utf-8');
    // 处理成md格式
    cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/=== (.*) ===/g, (m, $1) => {
        return '# ' + $1;
    });
    cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
        return `${$1}|${$2}|${$3}`;
    });
    cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\{\| class="standard-table" style="width: 100%;"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => {
        return `${$1}|${$2}|${$3}${os.EOL}--|--|--`;
    });
    cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/\|\}\r\n/g, '');
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.md'), cl_panorama_script_help_2);
    // 以下处理成object
    cl_panorama_script_help_2 = cl_panorama_script_help_2.replace(/<code>(.*)<\/code>/g, (m, $1) => { return $1; });
    let row = cl_panorama_script_help_2.split(os.EOL);
    let api = {};
    (0, eachLine_1.eachLine)(row, (line, lineText) => {
        if (lineText.search(/# .*/) !== -1) {
            let name = lineText.split('# ')[1];
            api[name] = {};
            let titles = row[line + 1].split('|');
            for (let index = line + 3; index < row.length; index++) {
                if (row[index] === '') {
                    return index;
                }
                let data = row[index].split('|');
                api[name][data[0]] = {};
                api[name][data[0]][titles[0]] = data[0];
                api[name][data[0]][titles[1]] = data[1];
                api[name][data[0]][titles[2]] = data[2];
            }
        }
    });
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), JSON.stringify(api));
}
exports.parsePanoramaAPI = parsePanoramaAPI;
/** 将官方打印的css文档处理成md和obj */
function parseCssDocument(context) {
    let dump_panorama_css_properties = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.txt'), 'utf-8');
    // 处理成md格式
    dump_panorama_css_properties = dump_panorama_css_properties.replace(/=== (.*) ===/g, (m, $1) => { return `# ${$1}`; });
    dump_panorama_css_properties = dump_panorama_css_properties.replace(/<br>/g, os.EOL);
    dump_panorama_css_properties = dump_panorama_css_properties.replace(/<b>(.*)<\/b>/g, (m, $1) => {
        return `## ${$1}${os.EOL}`;
    });
    dump_panorama_css_properties = dump_panorama_css_properties.replace(/<pre>/g, '```' + os.EOL);
    dump_panorama_css_properties = dump_panorama_css_properties.replace(/<\/pre>/g, os.EOL + '```');
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.md'), dump_panorama_css_properties);
    // 以下处理成object
    // dump_panorama_css_properties = dump_panorama_css_properties.replace(/&lt;/g, '<');
    // dump_panorama_css_properties = dump_panorama_css_properties.replace(/&gt;/g, '>');
    let row = dump_panorama_css_properties.split(os.EOL);
    let CSS = {};
    (0, eachLine_1.eachLine)(row, (line, lineText) => {
        if (lineText.search(/# .*/) !== -1) {
            let name = lineText.split('# ')[1];
            CSS[name] = {};
            for (let index = line + 1; index < row.length; index++) {
                if (row[index].search('## Example') !== -1) {
                    for (let j = index + 2; j < row.length; j++) {
                        if (row[j].search('```') !== -1) {
                            return j;
                        }
                        if (CSS[name].example == undefined) {
                            CSS[name].example = '';
                        }
                        CSS[name].example += `${row[j]}${os.EOL}`;
                    }
                }
                if (row[index].search('#') !== -1) {
                    return index - 1;
                }
                if (CSS[name].description == undefined) {
                    CSS[name].description = '';
                }
                CSS[name].description += `${row[index]}${os.EOL}`;
            }
        }
    });
    // 去除首尾以及多余换行
    for (const key in CSS) {
        const element = CSS[key];
        if (element.description !== undefined) {
            element.description = element.description.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
        }
        if (element.example !== undefined) {
            element.example = element.example.replace('\r\n\r\n\r\n', '\r\n').replace('\r\n\r\n', '\r\n').replace(/^\s+|\s+$/g, '');
        }
    }
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), JSON.stringify(CSS));
}
exports.parseCssDocument = parseCssDocument;
/** 将官方打印的event文档处理成md */
function parseEventDocument(context) {
    let dump_panorama_events = fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.txt'), 'utf-8');
    // 处理成md格式
    dump_panorama_events = dump_panorama_events.replace(/\{\| class="wikitable"\r\n! (.*)\r\n! (.*)\r\n! (.*)/g, (m, $1, $2, $3) => { return `${$1}|${$2}|${$2}${os.EOL}--|--|--`; });
    dump_panorama_events = dump_panorama_events.replace(/\|-.*\r\n\| (.*)\r\n\| (.*)\r\n\| (.*)/g, (m, $1, $2, $3) => {
        return `${$1}|${$2}|${$3}`;
    });
    dump_panorama_events = dump_panorama_events.replace(/\|\}/g, '');
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md'), dump_panorama_events);
}
exports.parseEventDocument = parseEventDocument;
/** 读取PanelList */
function parsePanelList(context) {
    let PanelList = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8');
    let Panel = {};
    let row = PanelList.split(os.EOL);
    (0, eachLine_1.eachLine)(row, (line, lineText) => {
        if (lineText.search(/^# .*/) !== -1) {
            Panel[lineText.split('# ')[1]] = {
                start: line,
                end: row.length
            };
            for (let index = line + 1; index < row.length; index++) {
                const element = row[index];
                if (element.search(/^# .*/) !== -1) {
                    Panel[lineText.split('# ')[1]].end = index - 1;
                    break;
                }
            }
        }
    });
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), JSON.stringify(Panel));
}
exports.parsePanelList = parsePanelList;
/** 生成音效json */
async function vsndGenerator(context) {
    const sound_path = 'C:/Users/bigciba/Documents/Dota Addons/dota2 tracking/root/soundevents';
    let json_obj = {};
    await readFolder(sound_path);
    fs.writeFileSync(path.join(context.extensionPath, "resource", "soundevents.json"), JSON.stringify(json_obj));
    async function readFolder(folder_name) {
        let folders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folder_name));
        for (let i = 0; i < folders.length; i++) {
            const [name, is_directory] = folders[i];
            if (name === undefined) {
                continue;
            }
            if (Number(is_directory) === vscode.FileType.Directory) {
                await readFolder(folder_name + '/' + name);
            }
            else if (Number(is_directory) === vscode.FileType.File) {
                console.log(folder_name + '/' + name);
                let kvdata = fs.readFileSync(folder_name + '/' + name, 'utf-8');
                if (kvdata[0] === '"') {
                    let kv = (0, kvUtils_1.readKeyValue2)(kvdata);
                    for (const key in kv) {
                        const value = kv[key];
                        if (value['0'] === undefined) {
                            if ((0, objectHasKey_1.objectHasKey)(value, 'vsnd_files') === true) {
                                let sound = value.operator_stacks.update_stack.reference_operator.operator_variables.vsnd_files.value;
                                if (sound !== undefined) {
                                    if (typeof (sound) === 'string') {
                                        json_obj[key] = [sound.replace(/\\\\/g, '/').replace(/\\/g, '/')];
                                    }
                                    else {
                                        let sound_arr = [];
                                        for (const k in sound) {
                                            sound_arr.push(sound[k].replace(/\\\\/g, '/').replace(/\\/g, '/'));
                                        }
                                        json_obj[key] = sound_arr;
                                    }
                                }
                            }
                        }
                        else {
                            if (value['0'].vsnd_files !== undefined) {
                                if (typeof (value['0'].vsnd_files) === 'string') {
                                    json_obj[key] = [value['0'].vsnd_files.replace(/\\\\/g, '/').replace(/\\/g, '/')];
                                }
                                else {
                                    json_obj[key] = value['0'].vsnd_files;
                                    for (const k in json_obj[key]) {
                                        json_obj[key][k] = json_obj[key][k].replace(/\\\\/g, '/').replace(/\\/g, '/');
                                    }
                                }
                            }
                        }
                    }
                }
                else if (kvdata[0] === '{') {
                    let kv = (0, kvUtils_1.readKeyValue3)(kvdata);
                    for (const key in kv[0]) {
                        const value = kv[0][key];
                        if (value.vsnd_files !== undefined) {
                            if (typeof (value.vsnd_files) === 'string') {
                                json_obj[key] = [value.vsnd_files.replace(/\\\\/g, '/').replace(/\\/g, '/')];
                            }
                            else {
                                json_obj[key] = value.vsnd_files;
                                for (const k in json_obj[key]) {
                                    json_obj[key][k] = json_obj[key][k].replace(/\\\\/g, '/').replace(/\\/g, '/');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.vsndGenerator = vsndGenerator;
/** 将官方打印的api替换成md格式和obj */
function parseLuaAPI(context) {
    const dotaApiNote = (0, apiNote_1.getDotaApiNoteClass)();
    const classList = dotaApiNote.getClassList();
    const enumList = dotaApiNote.getEnumList();
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'dota_script_help2.json'), JSON.stringify({
        class_list: classList,
        enum_list: enumList,
    }));
}
exports.parseLuaAPI = parseLuaAPI;
/** 生成lua api变更历史 */
async function parseLuaAPIChangelog(context) {
    let serverChangelogPath = path.join(context.extensionPath, 'resource', 'lua_server_api_changelog');
    let serverFolders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(serverChangelogPath));
    let serverChangelogs = {};
    let clientChangelogPath = path.join(context.extensionPath, 'resource', 'lua_client_api_changelog');
    let clientFolders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(clientChangelogPath));
    let clientChangelogs = {};
    // 读取server api
    for (let i = 0; i < serverFolders.length; i++) {
        const [name, is_directory] = serverFolders[i];
        if (name === undefined) {
            continue;
        }
        if (Number(is_directory) === vscode.FileType.File) {
            const dota_script_help2 = fs.readFileSync(path.join(serverChangelogPath, name), 'utf-8');
            const rows = dota_script_help2.split(os.EOL);
            // 读取服务器API
            let class_list = {};
            let enum_list = {};
            for (let i = 0; i < rows.length; i++) {
                // 函数
                let option = rows[i].match(/---\[\[.*\]\]/g);
                if (option !== null && option.length > 0) {
                    let [fun_info, new_line] = (0, readFunction_1.readFunction)(i, rows);
                    if (class_list[fun_info.class] === undefined) {
                        class_list[fun_info.class] = [];
                    }
                    class_list[fun_info.class].push(fun_info);
                    i = new_line;
                }
                // 常数
                if (rows[i].search('--- Enum ') !== -1) {
                    let enum_name = rows[i].substr(9, rows[i].length);
                    if (enum_list[enum_name] === undefined) {
                        enum_list[enum_name] = [];
                    }
                    let [enum_info, new_line] = (0, readEnum_1.readEnum)(i, rows);
                    for (let j = 0; j < enum_info.length; j++) {
                        const enum_arr = enum_info[j];
                    }
                    enum_list[enum_name] = enum_info;
                    i = new_line;
                }
            }
            serverChangelogs[name.split(".")[0]] = {
                class_list: class_list,
                enum_list: enum_list
            };
        }
    }
    // client api
    for (let i = 0; i < clientFolders.length; i++) {
        const [name, is_directory] = clientFolders[i];
        if (name === undefined) {
            continue;
        }
        if (Number(is_directory) === vscode.FileType.File) {
            const dota_script_help2 = fs.readFileSync(path.join(clientChangelogPath, name), 'utf-8');
            const rows = dota_script_help2.split(os.EOL);
            // 读取客户端API
            let class_list = {};
            let enum_list = {};
            for (let i = 0; i < rows.length; i++) {
                // 函数
                let option = rows[i].match(/---\[\[.*\]\]/g);
                if (option !== null && option.length > 0) {
                    let [fun_info, new_line] = (0, readFunction_1.readFunction)(i, rows);
                    if (class_list[fun_info.class] === undefined) {
                        class_list[fun_info.class] = [];
                    }
                    class_list[fun_info.class].push(fun_info);
                    i = new_line;
                }
                // 常数
                if (rows[i].search('--- Enum ') !== -1) {
                    let enum_name = rows[i].substr(9, rows[i].length);
                    if (enum_list[enum_name] === undefined) {
                        enum_list[enum_name] = [];
                    }
                    let [enum_info, new_line] = (0, readEnum_1.readEnum)(i, rows);
                    for (let j = 0; j < enum_info.length; j++) {
                        const enum_arr = enum_info[j];
                    }
                    enum_list[enum_name] = enum_info;
                    i = new_line;
                }
            }
            clientChangelogs[name.split(".")[0]] = {
                class_list: class_list,
                enum_list: enum_list
            };
        }
    }
    // 比对
    let markdown = "# DOTA2 API 更新日志\n以下日期是插件更新日志的时间。\n";
    let serverKeys = Object.keys(serverChangelogs);
    for (let index = serverKeys.length - 1; index >= 0; index--) {
        if (index > 0) {
            markdown += `# ${serverKeys[index].replace(/_/g, ".")}\n## Lua Server\n`;
            const changelog_old = serverChangelogs[serverKeys[index - 1]];
            const changelog_new = serverChangelogs[serverKeys[index]];
            // 比对function
            for (const className in changelog_new.class_list) {
                const funcList_old = changelog_old.class_list[className];
                const funcList_new = changelog_new.class_list[className];
                for (let j = 0; j < funcList_new.length; j++) {
                    const funInfo_new = funcList_new[j];
                    let find = false;
                    if (funcList_old) {
                        for (const funInfo_old of funcList_old) {
                            if (funInfo_old.function == funInfo_new.function) {
                                find = true;
                                // 返回值
                                if (funInfo_old.return != funInfo_new.return) {
                                    markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
                                }
                                else {
                                    for (const paramName in funInfo_new.params) {
                                        if (funInfo_old.params[paramName] == undefined || funInfo_old.params[paramName].params_name != funInfo_new.params[paramName].params_name) {
                                            markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 新增
                    if (find == false) {
                        markdown += `- ✨ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ${funInfo_new.description}\n`;
                    }
                }
                if (funcList_old) {
                    for (let j = 0; j < funcList_old.length; j++) {
                        const funInfo_old = funcList_old[j];
                        let find = false;
                        if (funcList_new) {
                            for (const funInfo_new of funcList_new) {
                                if (funInfo_old.function == funInfo_new.function) {
                                    find = true;
                                }
                            }
                        }
                        // 移除
                        if (find == false) {
                            markdown += `- ❌ API: <font color='#00D6AA'>${funInfo_old.class == "Global" ? "" : funInfo_old.class}</font> ${formatLuaFunction(funInfo_old)}\n`;
                        }
                    }
                }
            }
            // 比对常数
            for (const enumType in changelog_new.enum_list) {
                const enumList_old = changelog_old.enum_list[enumType];
                const enumList_new = changelog_new.enum_list[enumType];
                for (let j = 0; j < enumList_new.length; j++) {
                    const enumInfo_new = enumList_new[j];
                    let find = false;
                    if (enumList_old) {
                        for (const enumInfo_old of enumList_old) {
                            if (enumInfo_old.name == enumInfo_new.name) {
                                find = true;
                            }
                        }
                    }
                    // 新增
                    if (find == false) {
                        markdown += `- ✨ Enum: <font color='#00D6AA'>${enumType}</font> <font color='#9cdcfe'>${enumInfo_new.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_new.function : ""}</font>\n`;
                    }
                }
                if (enumList_old) {
                    for (let j = 0; j < enumList_old.length; j++) {
                        const enumInfo_old = enumList_old[j];
                        let find = false;
                        if (enumList_new) {
                            for (const enumInfo_new of enumList_new) {
                                if (enumInfo_old.name == enumInfo_new.name) {
                                    find = true;
                                }
                            }
                        }
                        // 移除
                        if (find == false) {
                            markdown += `- ❌ Enum: <font color='#00D6AA'>${enumType}</font> ~~<font color='#9cdcfe'>${enumInfo_old.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_old.function : ""}</font>~~\n`;
                        }
                    }
                }
            }
            //结尾添加标记
            markdown += `${serverKeys[index]}_Lua_Client\n`;
        }
    }
    let clientKeys = Object.keys(clientChangelogs);
    for (let index = clientKeys.length - 1; index >= 0; index--) {
        if (index > 0) {
            let client_markdown = `## Lua Client\n`;
            const changelog_old = clientChangelogs[clientKeys[index - 1]];
            const changelog_new = clientChangelogs[clientKeys[index]];
            // 比对function
            for (const className in changelog_new.class_list) {
                const funcList_old = changelog_old.class_list[className];
                const funcList_new = changelog_new.class_list[className];
                for (let j = 0; j < funcList_new.length; j++) {
                    const funInfo_new = funcList_new[j];
                    let find = false;
                    if (funcList_old) {
                        for (const funInfo_old of funcList_old) {
                            if (funInfo_old.function == funInfo_new.function) {
                                find = true;
                                // 返回值
                                if (funInfo_old.return != funInfo_new.return) {
                                    client_markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
                                }
                                else {
                                    for (const paramName in funInfo_new.params) {
                                        if (funInfo_old.params[paramName] == undefined || funInfo_old.params[paramName].params_name != funInfo_new.params[paramName].params_name) {
                                            client_markdown += `- 🖊️ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ~~${formatLuaFunction(funInfo_old)}~~\n`;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 新增
                    if (find == false) {
                        client_markdown += `- ✨ API: <font color='#00D6AA'>${funInfo_new.class == "Global" ? "" : funInfo_new.class}</font> ${formatLuaFunction(funInfo_new)} ${funInfo_new.description}\n`;
                    }
                }
                if (funcList_old) {
                    for (let j = 0; j < funcList_old.length; j++) {
                        const funInfo_old = funcList_old[j];
                        let find = false;
                        if (funcList_new) {
                            for (const funInfo_new of funcList_new) {
                                if (funInfo_old.function == funInfo_new.function) {
                                    find = true;
                                }
                            }
                        }
                        // 移除
                        if (find == false) {
                            client_markdown += `- ❌ API: <font color='#00D6AA'>${funInfo_old.class == "Global" ? "" : funInfo_old.class}</font> ${formatLuaFunction(funInfo_old)}\n`;
                        }
                    }
                }
            }
            // 比对常数
            for (const enumType in changelog_new.enum_list) {
                const enumList_old = changelog_old.enum_list[enumType];
                const enumList_new = changelog_new.enum_list[enumType];
                for (let j = 0; j < enumList_new.length; j++) {
                    const enumInfo_new = enumList_new[j];
                    let find = false;
                    if (enumList_old) {
                        for (const enumInfo_old of enumList_old) {
                            if (enumInfo_old.name == enumInfo_new.name) {
                                find = true;
                            }
                        }
                    }
                    // 新增
                    if (find == false) {
                        client_markdown += `- ✨ Enum: <font color='#00D6AA'>${enumType}</font> <font color='#9cdcfe'>${enumInfo_new.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_new.function : ""}</font>\n`;
                    }
                }
                if (enumList_old) {
                    for (let j = 0; j < enumList_old.length; j++) {
                        const enumInfo_old = enumList_old[j];
                        let find = false;
                        if (enumList_new) {
                            for (const enumInfo_new of enumList_new) {
                                if (enumInfo_old.name == enumInfo_new.name) {
                                    find = true;
                                }
                            }
                        }
                        // 移除
                        if (find == false) {
                            client_markdown += `- ❌ Enum: <font color='#00D6AA'>${enumType}</font> ~~<font color='#9cdcfe'>${enumInfo_old.name}</font> <font color='#dcdcaa'>${enumType == "modifierfunction" ? enumInfo_old.function : ""}</font>~~\n`;
                        }
                    }
                }
            }
            let a = clientKeys[index] + "_Lua_Client";
            markdown = markdown.replace(clientKeys[index] + "_Lua_Client", client_markdown);
        }
    }
    fs.writeFileSync(path.join(context.extensionPath, 'resource', 'lua_api_changelog.md'), markdown);
    function formatLuaFunction(funInfo) {
        let fun_md = `<font color='#dcdcaa'>${funInfo.function}</font>` + '(';
        let count = 0;
        for (let params_name in funInfo.params) {
            let params_name_note = funInfo.params[params_name].params_name || params_name;
            if (count === 0) {
                count++;
                fun_md += `<font color='#569cd6'>${params_name_note}</font>: <font color='#c586c0'>${funInfo.params[params_name].type}</font>`;
            }
            else {
                fun_md += `, <font color='#569cd6'>${params_name_note}</font>: <font color='#c586c0'>${funInfo.params[params_name].type}</font>`;
            }
        }
        fun_md += ')';
        fun_md += `: <font color='#c586c0'>${funInfo.return}</font>`;
        return fun_md;
    }
}
exports.parseLuaAPIChangelog = parseLuaAPIChangelog;
/** 将items_game.txt的套装信息解析出来 */
function rogueItemsGameParse(context) {
    let sFilePath = path.join(context.extensionPath, "resource/items_game.txt");
    // items
    let items_game = fs.readFileSync(sFilePath, 'utf-8');
    let prase_items_game = (0, kvUtils_1.readKeyValue2)(items_game, true, false);
    let tItemsData = prase_items_game.items_game.items;
    // attribute_controlled_attached_particles
    let attribute_controlled_attached_particles = prase_items_game.items_game.attribute_controlled_attached_particles;
    // fs.writeFileSync(path.join(this.context.extensionPath, "resource/attribute_controlled_attached_particles.json"), JSON.stringify(attribute_controlled_attached_particles));
    // asset_modifiers
    let asset_modifiers = prase_items_game.items_game.asset_modifiers;
    // fs.writeFileSync(path.join(this.context.extensionPath, "resource/asset_modifiers.json"), JSON.stringify(asset_modifiers));
    for (const index in tItemsData) {
        let socketIndex = 0;
        const element = tItemsData[index];
        delete element.portraits;
        // 遍历控制点信息
        if (element.visuals) {
            for (const asset_modifier in element.visuals) {
                let assetData = element.visuals[asset_modifier];
                if (typeof assetData == "object") {
                    let attachInfo = FindAttachInfo(assetData.modifier);
                    if (attachInfo) {
                        attachInfo = Object.assign(assetData, attachInfo);
                    }
                }
            }
        }
        if (element.static_attributes) {
            for (const attribute in element.static_attributes) {
                let attributeData = element.static_attributes[attribute];
                if (typeof attributeData == "object" && attributeData.attribute_class == "socket") {
                    if (attributeData.value.indexOf("asset_modifier") != -1) {
                        let asset_modifier_index = attributeData.value.split("asset_modifier: ")[1];
                        let asset_modifier = asset_modifiers[String(asset_modifier_index)];
                        for (const key in asset_modifier) {
                            const socket = asset_modifier[key];
                            if (key.indexOf("asset_modifier") != -1 && typeof socket == "object") {
                                if (element.visuals == undefined) {
                                    element.visuals = {};
                                }
                                element.visuals["asset_modifier_socket" + socketIndex] = socket;
                                socketIndex++;
                            }
                        }
                    }
                }
            }
        }
    }
    fs.writeFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), JSON.stringify(tItemsData));
    function FindAttachInfo(asset) {
        for (const index in attribute_controlled_attached_particles) {
            const element = attribute_controlled_attached_particles[index];
            if (element.system == asset) {
                return element;
            }
        }
    }
}
exports.rogueItemsGameParse = rogueItemsGameParse;
//# sourceMappingURL=preProcessing.js.map