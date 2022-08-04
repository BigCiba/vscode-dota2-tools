"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excel2kv = exports.eachExcelConfig = exports.cmdExcel2KV = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const addonInfo_1 = require("../module/addonInfo");
const kvUtils_1 = require("../utils/kvUtils");
const csvUtils_1 = require("../utils/csvUtils");
const getRootPath_1 = require("../utils/getRootPath");
const statusBar_1 = require("../module/statusBar");
const localize_1 = require("../utils/localize");
const pathUtils_1 = require("../utils/pathUtils");
function cmdExcel2KV(context) {
    let abilityExcelConfig = vscode.workspace.getConfiguration().get('dota2-tools.A4.AbilityExcel');
    if (abilityExcelConfig) {
        eachExcelConfig(abilityExcelConfig, (kvDir, excelDir) => {
            excel2kv(kvDir, excelDir, csvUtils_1.abilityCSV2KV);
        });
    }
    let unitExcelConfig = vscode.workspace.getConfiguration().get('dota2-tools.A4.UnitExcel');
    if (unitExcelConfig) {
        eachExcelConfig(unitExcelConfig, (kvDir, excelDir) => {
            excel2kv(kvDir, excelDir, csvUtils_1.unitCSV2KV);
        });
    }
}
exports.cmdExcel2KV = cmdExcel2KV;
/** 遍历excel配置表 */
async function eachExcelConfig(config, callback) {
    for (const kvDir in config) {
        const excelDir = config[kvDir];
        if (path.isAbsolute(excelDir)) {
            // 绝对路径
            if (callback(path.normalize(kvDir), path.normalize(excelDir)) !== undefined) {
                break;
            }
            // excel2kv(kvDir, excelDir, method);
        }
        else {
            // 相对路径
            let realKvDir = kvDir;
            let realExcelDir = excelDir;
            if (kvDir.indexOf("${game}") !== -1) {
                const gameDire = (0, addonInfo_1.getGameDir)();
                if (gameDire) {
                    realKvDir = kvDir.replace("${game}", gameDire);
                }
                else {
                    (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + kvDir + (0, localize_1.localize)("game_folder_no_found"));
                }
            }
            if (excelDir.indexOf("${game}") !== -1) {
                const gameDire = (0, addonInfo_1.getGameDir)();
                if (gameDire) {
                    realExcelDir = excelDir.replace("${game}", gameDire);
                }
                else {
                    (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + excelDir + (0, localize_1.localize)("game_folder_no_found"));
                }
            }
            if (kvDir.indexOf("${content}") !== -1) {
                const contentDire = (0, addonInfo_1.getContentDir)();
                if (contentDire) {
                    realKvDir = kvDir.replace("${content}", contentDire);
                }
                else {
                    (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + kvDir + (0, localize_1.localize)("content_folder_no_found"));
                }
            }
            if (excelDir.indexOf("${content}") !== -1) {
                const contentDire = (0, addonInfo_1.getContentDir)();
                if (contentDire) {
                    realExcelDir = excelDir.replace("${content}", contentDire);
                }
                else {
                    (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + excelDir + (0, localize_1.localize)("content_folder_no_found"));
                }
            }
            const rootPath = (0, getRootPath_1.getRootPath)();
            if (rootPath) {
                if (path.isAbsolute(realKvDir) === false) {
                    realKvDir = path.join(rootPath, kvDir);
                }
                if (path.isAbsolute(realExcelDir) === false) {
                    realExcelDir = path.join(rootPath, excelDir);
                }
            }
            if (callback(path.normalize(realKvDir), path.normalize(realExcelDir)) !== undefined) {
                break;
            }
            // excel2kv(realKvDir, realExcelDir, method);
        }
    }
}
exports.eachExcelConfig = eachExcelConfig;
async function excel2kv(kvDir, excelDir, method) {
    if (await (0, pathUtils_1.getPathInfo)(kvDir) === false) {
        (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + (0, localize_1.localize)("path_no_found") + kvDir);
        vscode.window.showErrorMessage(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + (0, localize_1.localize)("path_no_found") + `(${kvDir})` + (0, localize_1.localize)("sure create folder"), (0, localize_1.localize)("confirm"), (0, localize_1.localize)("cancel")).then((value) => {
            if (value == (0, localize_1.localize)("confirm")) {
                (0, pathUtils_1.dirExists)(kvDir);
            }
        });
        return;
    }
    if (await (0, pathUtils_1.getPathInfo)(excelDir) === false) {
        (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + (0, localize_1.localize)("path_no_found") + excelDir);
        return;
    }
    (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.LOADING);
    let messageIndex = (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + excelDir);
    let fileType = (await vscode.workspace.fs.stat(vscode.Uri.file(excelDir))).type;
    if (fileType === vscode.FileType.Directory) {
        let files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(excelDir));
        for (let i = 0; i < files.length; i++) {
            let [fileName, isFile] = files[i];
            // 排除临时文件
            if (fileName === undefined || fileName.search(/~\$/) !== -1) {
                continue;
            }
            if (isFile === vscode.FileType.File) {
                let filePath = path.join(excelDir, fileName);
                let csvPath = path.join(path.dirname(filePath), 'csv', path.basename(filePath).replace(path.extname(filePath), '.csv'));
                if (await (0, pathUtils_1.getPathInfo)(csvPath) === false) {
                    (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + (0, localize_1.localize)("path_no_found") + csvPath);
                    return;
                }
                await (0, pathUtils_1.dirExists)(path.join(kvDir, path.dirname(fileName.replace(path.extname(fileName), '.kv'))));
                fs.writeFileSync(path.join(kvDir, fileName.replace(path.extname(fileName), '.kv')), (0, kvUtils_1.writeKeyValue)({ KeyValue: method(csvPath) }));
                (0, statusBar_1.refreshStatusBarMessage)(messageIndex, `[${(0, localize_1.localize)("cmdExcel2KV")}]：` + fileName);
            }
        }
    }
    else if (fileType === vscode.FileType.File) {
        let csvPath = path.join(path.dirname(excelDir), 'csv', path.basename(excelDir).replace(path.extname(excelDir), '.csv'));
        if (await (0, pathUtils_1.getPathInfo)(csvPath) === false) {
            (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("cmdExcel2KV")}]：` + (0, localize_1.localize)("path_no_found") + csvPath);
            return;
        }
        await (0, pathUtils_1.dirExists)(kvDir);
        fs.writeFileSync(kvDir, (0, kvUtils_1.writeKeyValue)({ KeyValue: method(csvPath) }));
        (0, statusBar_1.refreshStatusBarMessage)(messageIndex, `[${(0, localize_1.localize)("cmdExcel2KV")}]：` + path.basename(excelDir));
    }
    (0, statusBar_1.changeStatusBarState)(statusBar_1.StatusBarState.ALL_DONE);
}
exports.excel2kv = excel2kv;
//# sourceMappingURL=cmdExcel2KV.js.map