"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusBarState = exports.refreshStatusBarMessage = exports.showStatusBarMessage = exports.getStatusBarItem = exports.statusBarItemInit = exports.StatusBarState = void 0;
const vscode = require("vscode");
const enum_1 = require("../enum");
const localize_1 = require("../utils/localize");
let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
/** 最多信息条数 */
const MAX_MESSAGE_COUNT = 20;
/** 信息列表 */
let messageList = [];
/** 信息索引 */
let messageIndex = 0;
let output;
let showOutput = false;
var StatusBarState;
(function (StatusBarState) {
    StatusBarState["ALL_DONE"] = "$(check-all)";
    StatusBarState["LOADING"] = "$(loading~spin)";
})(StatusBarState = exports.StatusBarState || (exports.StatusBarState = {}));
// 通知栏
async function statusBarItemInit(context) {
    statusBarItem.text = '$(loading~spin) ' + (0, localize_1.localize)("pluginNameLite");
    context.subscriptions.push(statusBarItem);
    output = vscode.window.createOutputChannel((0, localize_1.localize)("pluginNameLite"));
    statusBarItem.show();
    context.subscriptions.push(vscode.commands.registerCommand("dota2tools.showOutput", async (data) => {
        if (showOutput) {
            showOutput = !showOutput;
            output.hide();
        }
        else {
            showOutput = !showOutput;
            output.show();
        }
    }));
    statusBarItem.command = "dota2tools.showOutput";
}
exports.statusBarItemInit = statusBarItemInit;
function getStatusBarItem() {
    return statusBarItem;
}
exports.getStatusBarItem = getStatusBarItem;
function showStatusBarMessage(text, hideAfterTimeout = enum_1.ENUM_STATUS_BAR_MESSAGE_TIMEOUT) {
    recordMessage(text);
    if (hideAfterTimeout === -1) {
        vscode.window.setStatusBarMessage(text);
    }
    vscode.window.setStatusBarMessage(text, hideAfterTimeout * 1000);
    // console.log(text);
    output.appendLine(text);
    return messageIndex - 1;
}
exports.showStatusBarMessage = showStatusBarMessage;
/** 更新文本 */
function refreshStatusBarMessage(index, text, hideAfterTimeout = enum_1.ENUM_STATUS_BAR_MESSAGE_TIMEOUT) {
    if (messageList[index]) {
        messageList[index] = text;
    }
    // console.log(text);
    output.appendLine(text);
    vscode.window.setStatusBarMessage(text, hideAfterTimeout * 1000);
}
exports.refreshStatusBarMessage = refreshStatusBarMessage;
/** 记录信息 */
function recordMessage(text) {
    messageList[messageIndex] = text;
    messageIndex++;
    let tooltip = `**${(0, localize_1.localize)("message_notification")}**  \n`;
    for (let index = Math.max(messageIndex - MAX_MESSAGE_COUNT, 0); index < messageIndex; index++) {
        const message = messageList[index];
        tooltip += "  \n" + message;
    }
    statusBarItem.tooltip = new vscode.MarkdownString(tooltip);
}
/** 改变状态 */
function changeStatusBarState(state) {
    statusBarItem.text = state + " " + (0, localize_1.localize)("pluginNameLite");
}
exports.changeStatusBarState = changeStatusBarState;
//# sourceMappingURL=statusBar.js.map