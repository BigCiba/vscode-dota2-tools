"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryStartWatch = exports.StopAllListener = void 0;
const vscode = require("vscode");
const listenerAbilityExcel_1 = require("./listenerAbilityExcel");
const listenerKV2JS_1 = require("./listenerKV2JS");
const listenerLocalization_1 = require("./listenerLocalization");
const listenerUnitExcel_1 = require("./listenerUnitExcel");
async function StopAllListener() {
    (0, listenerAbilityExcel_1.stopWatch)();
    (0, listenerKV2JS_1.stopWatch)();
    (0, listenerLocalization_1.stopWatch)();
    (0, listenerUnitExcel_1.stopWatch)();
}
exports.StopAllListener = StopAllListener;
const configName = "dota2-tools.A3.listener";
function TryStartWatch() {
    let records = {};
    let config = vscode.workspace.getConfiguration().get(configName);
    if (config) {
        for (const key in config) {
            const element = config[key];
            if (element == true) {
                records[key] = element;
                vscode.workspace.getConfiguration().update(configName + "." + key, false);
                break;
            }
        }
    }
    for (const key in records) {
        const element = records[key];
        vscode.workspace.getConfiguration().update(configName + "." + key, element);
    }
}
exports.TryStartWatch = TryStartWatch;
//# sourceMappingURL=common.js.map