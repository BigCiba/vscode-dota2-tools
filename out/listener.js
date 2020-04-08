"use strict";
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
    }
    WatchAbilityExcel() {
        const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
        const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
        if (excel_object !== undefined && kv_object !== undefined) {
            for (const index in excel_object) {
                let listen_path = excel_object[index].replace(/\\\\/g, '/');
                listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                fs.watchFile(listen_path, (curr, prev) => {
                    if (curr.nlink === 0) {
                        console.log('removed');
                    }
                    else {
                        console.log('changed');
                        // let excel_stat: fs.Stats = fs.statSync(listen_path);
                        // let kv_stat: fs.Stats = fs.statSync(kv_object[index]);
                        // console.log(excel_stat);
                        // console.log(kv_stat);
                        // console.log(excel_stat.mtimeMs < kv_stat.mtimeMs);
                        // if (excel_stat.mtimeMs < kv_stat.mtimeMs) {
                        // 	util.ShowError('Excel版本过旧，不生成kv');
                        // 	return;
                        // }
                        // let sheet_list: any = xlsx.parse(listen_path);
                        // let csv: string = util.Array2CSV(sheet_list[0].data);
                        // let dir_name: string = path.dirname(listen_path);
                        // let file_name: string = listen_path.split(dir_name)[1].replace('/','').split('\.')[0];
                        // util.DirExists(dir_name + '/csv');
                        // fs.writeFileSync(dir_name + '/csv/' + file_name + '.csv', '\uFEFF' + csv);
                        let csv = fs.readFileSync(listen_path, 'utf-8');
                        // 生成kv
                        let csv_data = {};
                        let csv_arr = util.CSV2Array(csv);
                        const csv_key = csv_arr[1];
                        for (let i = 2; i < csv_arr.length; i++) {
                            const row = csv_arr[i];
                            if (row.length === 0) {
                                continue;
                            }
                            let AbilitySpecial = 1;
                            let values_obj = {
                                AbilitySpecial: {}
                            };
                            for (let j = 1; j < row.length; j++) {
                                const col = row[j];
                                // 跳过空值
                                if (col === '') {
                                    continue;
                                }
                                let key = csv_key[j];
                                // special值特殊处理
                                if (key === 'AbilitySpecial') {
                                    key = ("0" + AbilitySpecial).substr(-2);
                                    let value = csv_arr[i + 1][j];
                                    values_obj.AbilitySpecial[key] = {
                                        var_type: value.search(/\./g) !== -1 ? 'FIELD_FLOAT' : 'FIELD_INTEGER',
                                        [col]: csv_arr[i + 1][j]
                                    };
                                    AbilitySpecial++;
                                }
                                else if (key === '') {
                                    continue;
                                }
                                else {
                                    values_obj[key] = col;
                                }
                            }
                            i++;
                            csv_data[row[0]] = values_obj;
                        }
                        console.log(kv_object[index]);
                        fs.writeFileSync(kv_object[index], util.WriteKeyValue({ abilities: csv_data }));
                    }
                });
            }
        }
    }
    WatchUnitExcel() {
        const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
        const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
        if (excel_object !== undefined && kv_object !== undefined) {
            for (const index in excel_object) {
                let listen_path = excel_object[index].replace(/\\\\/g, '/');
                listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
                fs.watchFile(listen_path, (curr, prev) => {
                    if (curr.nlink === 0) {
                        console.log('removed');
                    }
                    else {
                        console.log('changed');
                        // let sheet_list: any = xlsx.parse(listen_path);
                        // let csv: string = util.Array2CSV(sheet_list[0].data);
                        // let dir_name: string = path.dirname(listen_path);
                        // let file_name: string = listen_path.split(dir_name)[1].replace('/','').split('\.')[0];
                        // util.DirExists(dir_name + '/csv');
                        // fs.writeFileSync(dir_name + '/csv/' + file_name + '.csv', '\uFEFF' + csv);
                        let csv = fs.readFileSync(listen_path, 'utf-8');
                        // 生成kv
                        let csv_data = {};
                        let csv_arr = util.CSV2Array(csv);
                        const csv_key = csv_arr[1];
                        for (let i = 2; i < csv_arr.length; i++) {
                            const row = csv_arr[i];
                            if (row.length === 0 || row[0] === '' || row[0] === undefined) {
                                continue;
                            }
                            let AttachWearables = 1;
                            let values_obj = {
                                Creature: {
                                    AttachWearables: {}
                                }
                            };
                            // 读取多层结构
                            let ReadBlock = function (index) {
                                let block = {};
                                for (let i = index + 1; i < row.length; i++) {
                                    const col = row[i];
                                    const key = csv_key[i];
                                    if (col === '') {
                                        if (key.search('[{]') !== -1) {
                                            let [_block, j] = ReadBlock(i);
                                            i = j;
                                            if (Object.keys(_block).length > 0) {
                                                block[key.split('[{]')[0]] = _block;
                                            }
                                        }
                                        else if (key.search('[}]') !== -1) {
                                            return [block, i];
                                        }
                                        continue;
                                    }
                                    if (key === '') {
                                        continue;
                                    }
                                    else {
                                        block[key] = col;
                                    }
                                }
                            };
                            for (let j = 1; j < row.length; j++) {
                                const col = row[j];
                                let key = csv_key[j];
                                // 跳过空值
                                if (col === '') {
                                    // 处理多层结构
                                    if (key.search('[{]') !== -1) {
                                        let [block, i] = ReadBlock(j);
                                        j = i;
                                        if (Object.keys(block).length > 0) {
                                            values_obj[key.split('[{]')[0]] = block;
                                        }
                                    }
                                    continue;
                                }
                                // special值特殊处理
                                if (key === 'AttachWearables') {
                                    key = AttachWearables.toString();
                                    let value = col;
                                    values_obj.Creature.AttachWearables[key] = {
                                        ItemDef: value
                                    };
                                    AttachWearables++;
                                    // 跳过没有key的值
                                }
                                else if (key === '') {
                                    continue;
                                }
                                else {
                                    values_obj[key] = col;
                                }
                            }
                            if (Object.keys(values_obj.Creature.AttachWearables).length === 0) {
                                delete values_obj.Creature;
                            }
                            csv_data[row[0]] = values_obj;
                        }
                        fs.writeFileSync(kv_object[index], util.WriteKeyValue({ units: csv_data }));
                    }
                });
            }
        }
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
}
exports.Listener = Listener;
//# sourceMappingURL=listener.js.map