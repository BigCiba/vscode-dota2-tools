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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const util = require("./util");
const util_1 = require("util");
const os = require("os");
const ftp = require("ftp");
const api_tree_1 = require("./api-tree");
let KV2LUA = {}; // kv与lua文件关联数据
exports.KV2LUA = KV2LUA;
let VSND = new Array;
exports.VSND = VSND;
let GameDir = ''; // game目录
exports.GameDir = GameDir;
let ContentDir = ''; // content目录
exports.ContentDir = ContentDir;
let ApiNote = ''; // api_note.json
let ApiTree; // ApiTreeProvider
exports.ApiTree = ApiTree;
let class_list;
let enum_list;
let func_api_parse;
function UpDataApiNote(note) {
    ApiNote = note;
    [class_list, enum_list] = func_api_parse();
    ApiTree.reopen();
}
exports.UpDataApiNote = UpDataApiNote;
function GetApiNote() {
    return ApiNote;
}
exports.GetApiNote = GetApiNote;
function GetClassList() {
    return class_list;
}
exports.GetClassList = GetClassList;
function GetEnumList() {
    return enum_list;
}
exports.GetEnumList = GetEnumList;
function PullAPINote(infoType, funInfo, callback) {
    let noteServerConfig = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
    if (noteServerConfig !== undefined) {
        let ftpClient = new ftp();
        ftpClient.connect({
            host: noteServerConfig.host,
            port: noteServerConfig.port,
            user: noteServerConfig.user,
            password: noteServerConfig.password,
        });
        ftpClient.on('ready', function () {
            ftpClient.get(noteServerConfig !== undefined ? noteServerConfig.filename : 'api_note.json', function (err, stream) {
                var stream_1, stream_1_1;
                var e_1, _a;
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        vscode.window.setStatusBarMessage('API Note下载超时');
                        throw err;
                    }
                    ;
                    vscode.window.setStatusBarMessage('API Note下载成功');
                    let result = '';
                    try {
                        for (stream_1 = __asyncValues(stream); stream_1_1 = yield stream_1.next(), !stream_1_1.done;) {
                            const chunk = stream_1_1.value;
                            result += chunk;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) yield _a.call(stream_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    ApiNote = result;
                    // console.log(JSON.parse(ApiNote).Global);
                    [class_list, enum_list] = func_api_parse();
                    if (infoType == api_tree_1.APIType.Function) {
                        for (let index = 0; index < class_list[funInfo.class].length; index++) {
                            const element = class_list[funInfo.class][index];
                            if (element.function == funInfo.function) {
                                callback(element);
                            }
                        }
                    }
                    else if (infoType == api_tree_1.APIType.Enum) {
                        for (const enum_name in enum_list) {
                            const enum_arr = enum_list[enum_name];
                            for (let i = 0; i < enum_arr.length; i++) {
                                const enum_info = enum_arr[i];
                                if (enum_info.name === funInfo.name) {
                                    callback(enum_info);
                                }
                            }
                        }
                    }
                    ftpClient.end();
                });
            });
        });
    }
}
exports.PullAPINote = PullAPINote;
function Init(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let root_path = util.GetRootPath();
        if (root_path === undefined) {
            return;
        }
        // 读取目录
        let path_arr = yield FindFile(root_path, 'maps');
        if (path_arr !== false) {
            exports.ContentDir = ContentDir = path_arr[0], exports.GameDir = GameDir = path_arr[1];
            console.log(GameDir);
        }
        // 读取ApiNote
        ApiNote = fs.readFileSync(context.extensionPath + '/resource/api_note.json', 'utf-8');
        // 从服务器读取API Note， 读取配置信息
        let noteServerConfig = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
        if (noteServerConfig !== undefined) {
            let ftpClient = new ftp();
            ftpClient.connect({
                host: noteServerConfig.host,
                port: noteServerConfig.port,
                user: noteServerConfig.user,
                password: noteServerConfig.password,
            });
            ftpClient.on('ready', function () {
                ftpClient.get(noteServerConfig !== undefined ? noteServerConfig.filename : 'api_note.json', function (err, stream) {
                    var stream_2, stream_2_1;
                    var e_2, _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            vscode.window.setStatusBarMessage('API Note下载超时');
                            throw err;
                        }
                        ;
                        vscode.window.setStatusBarMessage('API Note下载成功');
                        let result = '';
                        try {
                            for (stream_2 = __asyncValues(stream); stream_2_1 = yield stream_2.next(), !stream_2_1.done;) {
                                const chunk = stream_2_1.value;
                                result += chunk;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (stream_2_1 && !stream_2_1.done && (_a = stream_2.return)) yield _a.call(stream_2);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        ApiNote = result;
                        // console.log(JSON.parse(ApiNote).Global);
                        [class_list, enum_list] = APIParse();
                        ApiTree.reopen();
                        ftpClient.end();
                    });
                });
            });
        }
        [class_list, enum_list] = APIParse();
        exports.ApiTree = ApiTree = new api_tree_1.ApiTreeProvider(context, class_list, enum_list);
        vscode.window.registerTreeDataProvider('dota2apiExplorer', ApiTree);
        function APIParse() {
            let api_note = JSON.parse(ApiNote);
            let PraseFile = function (sDotaScriptHelp) {
                const rows = sDotaScriptHelp.split(os.EOL);
                let class_list = {};
                let enum_list = {};
                for (let i = 0; i < rows.length; i++) {
                    // 函数
                    let option = rows[i].match(/---\[\[.*\]\]/g);
                    if (option !== null && option.length > 0) {
                        let [fun_info, new_line] = util.ReadFunction(i, rows);
                        if ((api_note[fun_info.class] !== undefined && api_note[fun_info.class][fun_info.function] !== undefined) || api_note[fun_info.function] !== undefined) {
                            let note = (api_note[fun_info.class] !== undefined && api_note[fun_info.class][fun_info.function] !== undefined) ? api_note[fun_info.class][fun_info.function] : api_note[fun_info.function];
                            fun_info.description = note.description;
                            for (const params_name in fun_info.params) {
                                const params_info = fun_info.params[params_name];
                                params_info.params_name = note.params[params_name].params_name;
                                params_info.description = note.params[params_name].description;
                            }
                            fun_info.example = note.example;
                        }
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
                        let [enum_info, new_line] = util.ReadEnum(i, rows);
                        for (let j = 0; j < enum_info.length; j++) {
                            const enum_arr = enum_info[j];
                            if (api_note[enum_arr.name] !== undefined) {
                                enum_arr.description_lite = api_note[enum_arr.name].description_lite;
                                enum_arr.description = api_note[enum_arr.name].description;
                                enum_arr.example = api_note[enum_arr.name].example;
                            }
                        }
                        enum_list[enum_name] = enum_info;
                        i = new_line;
                    }
                }
                return [class_list, enum_list];
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
                            if (fun_info.function == server_fun_info.function) {
                                bHasServer = true;
                                break;
                            }
                        }
                        if (bHasServer == false) {
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
                            if (funcName[i] == fun_list[j].function) {
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
            let [class_list, enum_list] = PraseFile(fs.readFileSync(sHelp, 'utf-8'));
            let [class_list_cl, enum_list_cl] = PraseFile(fs.readFileSync(sHelpClient, 'utf-8'));
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
                fs.writeFileSync(path.join(GameDir, modifierfunctionPath), modifierfunction);
            }
            return [class_list, enum_list];
        }
        func_api_parse = APIParse;
        function FindFile(path, file_name) {
            return __awaiter(this, void 0, void 0, function* () {
                let path_arr = [];
                var lang_folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                for (let i = 0; i < lang_folders.length; i++) {
                    const [folder_name, is_directory] = lang_folders[i];
                    if (folder_name === '.git') {
                        continue;
                    }
                    if (folder_name === file_name) {
                        path_arr.push(path);
                    }
                    if (Number(is_directory) === vscode.FileType.Directory || Number(is_directory) === vscode.FileType.SymbolicLink + vscode.FileType.Directory) {
                        let bFind = yield FindFile(path + '\\' + folder_name, file_name);
                        if (bFind !== false) {
                            path_arr = path_arr.concat(bFind);
                        }
                    }
                }
                if (path_arr.length === 0) {
                    return false;
                }
                else {
                    return path_arr;
                }
            });
        }
        // vsnd
        let obj_data = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/soundevents.json', 'utf-8'));
        // 添加选项
        for (const key in obj_data) {
            const element = obj_data[key];
            for (let i = 0; i < element.length; i++) {
                const sound = element[i];
                VSND.push({
                    label: sound,
                    description: key,
                });
            }
        }
        // 关联kv与lua
        if ((yield util.GetStat(GameDir + '/scripts/npc/npc_abilities_custom.txt')) === false) {
            return;
        }
        let ability_kv = yield util.ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_abilities_custom.txt');
        for (const key in ability_kv.DOTAAbilities) {
            const value = ability_kv.DOTAAbilities[key];
            if (util_1.isObject(value) === true) {
                KV2LUA[key] = GameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
            }
        }
        function provideDefinition(document, position, token) {
            const fileName = document.fileName;
            const workDir = path.dirname(fileName);
            const word = document.getText(document.getWordRangeAtPosition(position));
            const line = document.lineAt(position);
            // console.log('====== 进入 provideDefinition 方法 ======');
            // console.log('fileName: ' + fileName); // 当前文件完整路径
            // console.log('workDir: ' + workDir); // 当前文件所在目录
            // console.log('word: ' + word); // 当前光标所在单词
            // console.log('line: ' + line.text); // 当前光标所在行
            // console.log();
            // 只处理package.json文件
            if (/.*\.kv/.test(fileName) || /.*\.txt/.test(fileName)) {
                const json = document.getText();
                // console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
                // console.log(new RegExp(`"ScriptFile"`).test(line.text));
                if (new RegExp(`"ScriptFile"`).test(line.text)) {
                    let lua_path = line.text.split('"')[3];
                    let destPath = `${GameDir}/scripts/vscripts/${lua_path}.lua`;
                    // console.log(destPath);
                    if (fs.existsSync(destPath)) {
                        return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
                    }
                    else {
                        util.DirExists(path.dirname(destPath));
                        fs.writeFileSync(destPath, util.GetLuaScriptSnippet(path.basename(lua_path).replace('.lua', ''), lua_path));
                    }
                }
            }
        }
        let def_jump = vscode.languages.registerDefinitionProvider([{ pattern: '**/*.txt' }, { pattern: '**/*.kv' }], { provideDefinition });
        context.subscriptions.push(def_jump);
        // 强行运行一遍csv转kv
        const ability_excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
        const ability_kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
        if (ability_excel_object === undefined || ability_kv_object === undefined) {
            return;
        }
        for (const index in ability_excel_object) {
            let listen_path = ability_excel_object[index].replace(/\\\\/g, '/');
            let file_type = (yield vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
            if (file_type === vscode.FileType.Directory) {
                let files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
                for (let i = 0; i < files.length; i++) {
                    let [file_name, is_file] = files[i];
                    if (file_name === undefined || file_name.search(/~\$/) !== -1) {
                        continue;
                    }
                    if (is_file === vscode.FileType.File) {
                        let file_path = listen_path + '/' + file_name;
                        let csv_path = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
                        if (fs.existsSync(csv_path)) {
                            fs.writeFileSync(ability_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(csv_path) }));
                        }
                    }
                }
            }
            else if (file_type === vscode.FileType.File) {
                listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                if (fs.existsSync(listen_path)) {
                    fs.writeFileSync(ability_kv_object[index], util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(listen_path) }));
                }
            }
        }
        const unit_excel_object = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
        const unit_kv_object = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
        if (unit_excel_object === undefined || unit_kv_object === undefined) {
            return;
        }
        for (const index in unit_excel_object) {
            let listen_path = unit_excel_object[index].replace(/\\\\/g, '/');
            let file_type = (yield vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
            if (file_type === vscode.FileType.Directory) {
                let files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
                for (let i = 0; i < files.length; i++) {
                    let [file_name, is_file] = files[i];
                    if (file_name === undefined || file_name.search(/~\$/) !== -1) {
                        continue;
                    }
                    if (is_file === vscode.FileType.File) {
                        let file_path = listen_path + '/' + file_name;
                        let csv_path = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
                        fs.writeFileSync(unit_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({ KeyValue: util.UnitCSV2KV(csv_path) }));
                    }
                }
            }
            else if (file_type === vscode.FileType.File) {
                listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                console.log(listen_path);
                fs.writeFileSync(unit_kv_object[index], util.WriteKeyValue({ KeyValue: util.UnitCSV2KV(listen_path) }));
            }
        }
    });
}
exports.Init = Init;
//# sourceMappingURL=init.js.map