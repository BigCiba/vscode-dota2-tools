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
const path = require("path");
const util = require("./util");
const util_1 = require("util");
let KV2LUA = {}; // kv与lua文件关联数据
exports.KV2LUA = KV2LUA;
let VSND = new Array;
exports.VSND = VSND;
let GameDir = ''; // game目录
exports.GameDir = GameDir;
let ContentDir = ''; // content目录
exports.ContentDir = ContentDir;
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
        let ability_kv = util.ReadKeyValueWithBase(GameDir + '/scripts/npc/npc_abilities_custom.txt');
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
                    if (file_name === undefined || file_name.search('~$') !== -1) {
                        continue;
                    }
                    if (is_file === vscode.FileType.File) {
                        let file_path = listen_path + '/' + file_name;
                        let csv_path = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
                        fs.writeFileSync(ability_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(csv_path) }));
                    }
                }
            }
            else if (file_type === vscode.FileType.File) {
                listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                fs.writeFileSync(ability_kv_object[index], util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(listen_path) }));
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
                    if (file_name === undefined || file_name.search('~$') !== -1) {
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