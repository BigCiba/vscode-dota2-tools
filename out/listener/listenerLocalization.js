"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWatch = exports.listenerLocalizationInit = void 0;
const vscode = require("vscode");
const path = require("path");
const node_watch_1 = require("node-watch");
const event_1 = require("../Class/event");
const cmdCombineLocalization_1 = require("../command/cmdCombineLocalization");
const addonInfo_1 = require("../module/addonInfo");
const localize_1 = require("../utils/localize");
const statusBar_1 = require("../module/statusBar");
const pathUtils_1 = require("../utils/pathUtils");
const getPathConfiguration_1 = require("../utils/getPathConfiguration");
let eventID;
let fileWatcher;
const configName = "dota2-tools.A3.listener";
let config;
/** 监听文本变更自动合并 */
function listenerLocalizationInit(context) {
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
exports.listenerLocalizationInit = listenerLocalizationInit;
/** 开始监听 */
async function startWatch(context) {
    if (fileWatcher === undefined) {
        if ((0, addonInfo_1.isValidFolder)()) {
            console.log("[监听目录]: 合并文本");
            let setting = (0, getPathConfiguration_1.getPathConfiguration)("dota2-tools.A5.localization_path");
            if (setting && await (0, pathUtils_1.getPathInfo)(setting) !== false) {
                fileWatcher = (0, node_watch_1.default)(setting, { recursive: true, filter: /\.txt$/ }, function (evt, name) {
                    if (setting) {
                        let language = path.dirname(name).replace(setting, "").split("\\")[1];
                        (0, cmdCombineLocalization_1.combineLocalization)(language);
                    }
                });
            }
            // fileWatcher = fs.watch(gameDir + '/localization', { recursive: true, persistent: false }, (event, filename) => {
            // 	console.log(event, filename);
            // });
            // fileWatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file(path.join(gameDir + '/schinese/localization')), '**/*.txt'), false, false, false);
            // fileWatcher.onDidChange((uri) => {
            // 	console.log(uri);
            // }, null, context.subscriptions);
        }
        else {
            (0, statusBar_1.showStatusBarMessage)(`[${(0, localize_1.localize)("listenerLocalizationInit")}]${(0, localize_1.localize)("game_folder_no_found")}`);
        }
    }
}
/** 停止监听 */
function stopWatch() {
    if (fileWatcher) {
        console.log("[停止监听目录]: 合并文本");
        fileWatcher.close();
        fileWatcher = undefined;
    }
}
exports.stopWatch = stopWatch;
/** 是否开启监听 */
function getConfiguration() {
    let listenerConfig = vscode.workspace.getConfiguration().get(configName);
    if (listenerConfig) {
        return listenerConfig.localization || false;
    }
}
//# sourceMappingURL=listenerLocalization.js.map