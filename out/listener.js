"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("./util");
const node_xlsx_1 = require("node-xlsx");
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
class Listener {
    constructor() {
        this.WatchAbilityExcel();
    }
    WatchAbilityExcel() {
        console.log(111);
        const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
        const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
        if (excel_object !== undefined && kv_object !== undefined) {
            for (const index in excel_object) {
                const listen_path = excel_object[index].replace(/\\\\/g, '/');
                fs.watchFile(listen_path, (curr, prev) => {
                    if (curr.nlink === 0) {
                        console.log('removed');
                    }
                    else {
                        console.log('changed');
                        let sheet_list = node_xlsx_1.default.parse(listen_path);
                        let csv = util.Array2CSV(sheet_list[0].data);
                        let dir_name = path.dirname(listen_path);
                        let file_name = listen_path.split(dir_name)[1].replace('/', '').split('\.')[0];
                        util.DirExists(dir_name + '/csv');
                        fs.writeFileSync(dir_name + '/csv/' + file_name + '.csv', '\uFEFF' + csv);
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
                        fs.writeFileSync(kv_object[index], util.WriteKeyValue({ abilities: csv_data }));
                    }
                });
            }
        }
    }
}
exports.Listener = Listener;
//# sourceMappingURL=listener.js.map