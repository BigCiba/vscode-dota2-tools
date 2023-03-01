"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWatch = exports.listenerAbilityExcelInit = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const node_watch_1 = require("node-watch");
const event_1 = require("../class/event");
const getRootPath_1 = require("../utils/getRootPath");
const cmdExcel2KV_1 = require("../command/cmdExcel2KV");
const csvUtils_1 = require("../utils/csvUtils");
const statusBar_1 = require("../module/statusBar");
const kvUtils_1 = require("../utils/kvUtils");
let eventID;
let fileWatcher;
const configName = "dota2-tools.A3.listener";
let config;
/** 监听技能excel变更 */
function listenerAbilityExcelInit(context) {
    config = getConfiguration();
    if (getConfiguration()) {
        startWatch(context);
    }
    if (eventID === undefined) {
        eventID = event_1.EventManager.listenToEvent(event_1.EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
            if (!event.affectsConfiguration(configName) || getConfiguration() === config) {
                return;
            }
            config = getConfiguration();
            if (getConfiguration()) {
                stopWatch();
                startWatch(context);
            }
            else {
                stopWatch();
            }
        });
    }
}
exports.listenerAbilityExcelInit = listenerAbilityExcelInit;
/** 开始监听 */
function startWatch(context) {
    if (fileWatcher === undefined) {
        const rootPath = (0, getRootPath_1.getRootPath)();
        if (rootPath) {
            (0, statusBar_1.showStatusBarMessage)("[监听目录]：技能excel");
            let abilityExcelConfig = vscode.workspace.getConfiguration().get('dota2-tools.A4.AbilityExcel');
            fileWatcher = (0, node_watch_1.default)(rootPath, { recursive: true, filter: /\.csv$/ }, function (evt, name) {
                if (abilityExcelConfig) {
                    (0, cmdExcel2KV_1.eachExcelConfig)(abilityExcelConfig, (kvDir, excelDir) => {
                        if (path.normalize(excelDir) == path.normalize(path.dirname(name)).replace("\\csv", "")) {
                            const kvName = path.join(kvDir, path.basename(name).replace(path.extname(name), getExtname(path.basename(name))));
                            fs.writeFileSync(kvName, (0, kvUtils_1.writeKeyValue)({ KeyValue: (0, csvUtils_1.abilityCSV2KV)(name) }));
                            (0, statusBar_1.showStatusBarMessage)("[excel导出kv]：" + path.basename(name).replace(path.extname(name), getExtname(path.basename(name))));
                            // excel2kv(kvDir, path.join(excelDir, path.basename(name).replace(path.extname(name), ".xlsm")), abilityCSV2KV);
                            return false;
                        }
                    });
                }
            });
        }
        else {
            // vscode.window.showErrorMessage(`[${localize("listenerLocalizationInit")}]${localize("game_folder_no_found")}`);
        }
    }
}
/** 停止监听 */
function stopWatch() {
    if (fileWatcher) {
        (0, statusBar_1.showStatusBarMessage)("[停止监听目录]：技能excel");
        fileWatcher.close();
        fileWatcher = undefined;
    }
}
exports.stopWatch = stopWatch;
/** 是否开启监听 */
function getConfiguration() {
    let listenerConfig = vscode.workspace.getConfiguration().get(configName);
    if (listenerConfig) {
        return listenerConfig.ability_excel || false;
    }
}
/** 获取后缀 */
function getExtname(fileName) {
    let extNameConfig = vscode.workspace.getConfiguration().get("dota2-tools.A4.extnameList");
    if (extNameConfig) {
        let fileNameList = extNameConfig.split(",");
        for (const _fileName of fileNameList) {
            if (fileName.indexOf(_fileName) != -1) {
                return ".txt";
            }
        }
    }
    return ".kv";
}
//# sourceMappingURL=listenerAbilityExcel.js.map