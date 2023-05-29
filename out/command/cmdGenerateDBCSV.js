"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateDBCSV = void 0;
const fs = require("fs");
const vscode = require("vscode");
const csvUtils_1 = require("../utils/csvUtils");
const kvUtils_1 = require("../utils/kvUtils");
const path = require("path");
/**
 * 将csv的部分数据导出为新的csv（格式用于数据库软件导入）
 */
function GenerateDBCSV(context) {
    const folders = vscode.workspace.workspaceFolders;
    if (folders == undefined) {
        return;
    }
    const Folder = folders[0];
    if (Folder == undefined) {
        return;
    }
    let sConfigPath = path.resolve(Folder.uri.fsPath, "eom/server_db_config.kv");
    if (!fs.existsSync(sConfigPath)) {
        return;
    }
    let config = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sConfigPath, 'utf-8')));
    Object.entries(config.list ?? {}).forEach(([input, sKeys]) => {
        let InputPath = path.resolve(Folder.uri.fsPath, input);
        if (!fs.existsSync(InputPath)) {
            return;
        }
        let csv = (0, csvUtils_1.csv2obj)(fs.readFileSync(InputPath, "utf-8"));
        let result = {};
        let keys = sKeys.split("|");
        for (const [id, data] of Object.entries(csv)) {
            let temp = {};
            keys.forEach(sKey => {
                temp[sKey] = data[sKey];
            });
            result[id] = temp;
        }
        let outFile = path.resolve(Folder.uri.fsPath, config.OutputPath, path.basename(InputPath));
        fs.writeFileSync(outFile, Obj2CSVWithKey(result, keys));
    });
}
exports.GenerateDBCSV = GenerateDBCSV;
function Obj2CSVWithKey(obj, keys) {
    let arrCSV = [];
    arrCSV.push(keys);
    for (let lineID in obj) {
        if (lineID === "__key_sc") {
            continue;
        }
        let temp = [];
        let oLineInfo = obj[lineID];
        for (const columnKey of keys) {
            temp.push(oLineInfo[columnKey] ?? '');
        }
        arrCSV.push(temp);
    }
    return (0, csvUtils_1.array2csv)(arrCSV);
}
//# sourceMappingURL=cmdGenerateDBCSV.js.map