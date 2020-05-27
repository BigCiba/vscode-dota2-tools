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
const util = require("./util");
const watch = require("watch");
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const init_1 = require("./init");
class Listener {
    constructor() {
        this.WatchAbilityExcel(); //监听技能excel
        this.WatchUnitExcel(); //监听单位excel
        if (vscode.workspace.getConfiguration().get('dota2-tools.Listen Localization') === true) {
            this.WatchLocalization(); //监听文本合并
        }
        if (vscode.workspace.getConfiguration().get('dota2-tools.Listen KV to Js') === true) {
            this.WatchKeyValue(); //监听kv
        }
    }
    WatchAbilityExcel() {
        return __awaiter(this, void 0, void 0, function* () {
            const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
            const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
            if (excel_object === undefined || kv_object === undefined) {
                return;
            }
            for (const index in excel_object) {
                let listen_path = excel_object[index].replace(/\\\\/g, '/');
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
                            WatchFile(csv_path, kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv');
                        }
                    }
                }
                else if (file_type === vscode.FileType.File) {
                    listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                    WatchFile(listen_path, kv_object[index]);
                }
                function WatchFile(csv_path, kv_path) {
                    // console.log('watch ' + csv_path);
                    fs.watchFile(csv_path, (curr, prev) => {
                        if (curr.nlink === 0) {
                            console.log('removed');
                        }
                        else {
                            vscode.window.setStatusBarMessage(path.basename(csv_path) + ' changed');
                            fs.writeFileSync(kv_path, util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(csv_path) }));
                        }
                    });
                }
            }
        });
    }
    WatchUnitExcel() {
        return __awaiter(this, void 0, void 0, function* () {
            const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
            const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
            if (excel_object === undefined || kv_object === undefined) {
                return;
            }
            for (const index in excel_object) {
                let listen_path = excel_object[index].replace(/\\\\/g, '/');
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
                            WatchFile(csv_path, kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv');
                        }
                    }
                }
                else if (file_type === vscode.FileType.File) {
                    listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                    WatchFile(listen_path, kv_object[index]);
                }
            }
            function WatchFile(csv_path, kv_path) {
                fs.watchFile(csv_path, (curr, prev) => {
                    if (curr.nlink === 0) {
                        console.log('removed');
                    }
                    else {
                        vscode.window.setStatusBarMessage(path.basename(csv_path) + ' changed');
                        console.log(csv_path + ' changed');
                        fs.writeFileSync(kv_path, util.WriteKeyValue({ KeyValue: util.UnitCSV2KV(csv_path) }));
                    }
                });
            }
        });
    }
    WatchLocalization() {
        watch.watchTree(init_1.GameDir + '/localization', function (f, curr, prev) {
            if (typeof f === "object" && prev === null && curr === null) {
                // Finished walking the tree
            }
            else if (prev === null) {
                // f is a new file
                console.log('f is a new file');
                vscode.commands.executeCommand('dota2tools.Localization');
            }
            else if (curr.nlink === 0) {
                // f was removed
                console.log('f was removed');
                vscode.commands.executeCommand('dota2tools.Localization');
            }
            else {
                // f was changed
                console.log('f was changed');
                vscode.commands.executeCommand('dota2tools.Localization');
            }
        });
    }
    UnWatchLocalization() {
        watch.unwatchTree(init_1.GameDir + '/localization');
    }
    WatchKeyValue() {
        let Config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
        let KVFiles = util.ReadKeyValue2(fs.readFileSync(path.join(init_1.GameDir, Config), 'utf-8'));
        KVFiles = KVFiles[Object.keys(KVFiles)[0]];
        for (const sKVName in KVFiles) {
            let sPath = KVFiles[sKVName];
            let sTotalPath = init_1.GameDir + '/scripts/' + sPath;
            fs.watchFile(sTotalPath, (curr, prev) => {
                if (curr.nlink === 0) {
                    console.log('removed');
                }
                else {
                    let kv = util.ReadKeyValueWithBase(sTotalPath.replace("\\", "/"));
                    let js = util.Obj2Str(kv, true);
                    let fileData = "const " + sKVName + " = " + js + ";";
                    let jsPath = (init_1.ContentDir + "/panorama/scripts/kv/" + sKVName + ".js").replace("\\", "/");
                    fs.writeFileSync(jsPath, fileData);
                }
            });
        }
    }
}
exports.Listener = Listener;
//# sourceMappingURL=listener.js.map