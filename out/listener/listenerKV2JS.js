"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWatch = exports.listenerKV2JSInit = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const node_watch_1 = require("node-watch");
const event_1 = require("../class/event");
const addonInfo_1 = require("../module/addonInfo");
const pathUtils_1 = require("../utils/pathUtils");
const kvUtils_1 = require("../utils/kvUtils");
const cmdKvToJs_1 = require("../command/cmdKvToJs");
let eventID;
let fileWatcher;
let baseInfo = [];
const configName = "dota2-tools.A3.listener";
let config;
/** 监听kv变更自动转js */
function listenerKV2JSInit(context) {
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
                startWatch(context);
            }
            else {
                stopWatch();
            }
        });
    }
}
exports.listenerKV2JSInit = listenerKV2JSInit;
/** 开始监听 */
async function startWatch(context) {
    if (fileWatcher === undefined) {
        if ((0, addonInfo_1.isValidFolder)()) {
            const contentDir = (0, addonInfo_1.getContentDir)();
            if (contentDir) {
                const gameDir = (0, addonInfo_1.getGameDir)();
                const config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
                let sKvPath = path.join(gameDir + config);
                if (await (0, pathUtils_1.getPathInfo)(sKvPath) === false) {
                    // vscode.window.showErrorMessage(localize("dota2-tools.KV to Js Config.no_found"));
                    return;
                }
                console.log("[监听目录]: kv转js");
                let kvJsConfig = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sKvPath, 'utf-8')));
                // 初始化#base信息
                for (const sKVName in kvJsConfig.kvfiles) {
                    let sPath = kvJsConfig.kvfiles[sKVName];
                    let sTotalPath = gameDir + '/scripts/' + sPath;
                    let baseList = await (0, kvUtils_1.getBaseInfo)(sTotalPath);
                    if (baseList.length > 0) {
                        baseInfo[sKVName] = baseList;
                    }
                }
                fileWatcher = (0, node_watch_1.default)(gameDir + '/scripts', { recursive: true, filter: /\.txt$|\.kv$/ }, function (evt, name) {
                    for (const sKVName in kvJsConfig.kvfiles) {
                        if (path.normalize(name).indexOf(path.normalize(kvJsConfig.kvfiles[sKVName])) !== -1) {
                            (0, cmdKvToJs_1.generateJS)(context, kvJsConfig, sKVName);
                        }
                        if (baseInfo[sKVName]) {
                            for (const basePath of baseInfo[sKVName]) {
                                if (path.normalize(name).indexOf(path.normalize(basePath)) !== -1) {
                                    (0, cmdKvToJs_1.generateJS)(context, kvJsConfig, sKVName);
                                }
                            }
                        }
                    }
                });
            }
            else {
                // vscode.window.showErrorMessage(`[${localize("listenerKV2JSInit")}]${localize("content_folder_no_found")}`);
            }
        }
        else {
            // vscode.window.showErrorMessage(`[${localize("listenerKV2JSInit")}]${localize("game_folder_no_found")}`);
        }
    }
}
/** 停止监听 */
function stopWatch() {
    if (fileWatcher) {
        console.log("[停止监听目录]: kv转js");
        fileWatcher.close();
        fileWatcher = undefined;
    }
}
exports.stopWatch = stopWatch;
/** 是否开启监听 */
function getConfiguration() {
    let listenerConfig = vscode.workspace.getConfiguration().get(configName);
    if (listenerConfig) {
        return listenerConfig.kv2js || false;
    }
}
//# sourceMappingURL=listenerKV2JS.js.map