import * as vscode from 'vscode';
import { ENUM_STATUS_BAR_MESSAGE_TIMEOUT } from '../enum';
import { localize } from '../utils/localize';

let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1);
/** 最多信息条数 */
const MAX_MESSAGE_COUNT = 20;
/** 信息列表 */
let messageList: { [k: number]: string; } = [];
/** 信息索引 */
let messageIndex = 0;
let output: vscode.OutputChannel;
let showOutput = false;
export enum StatusBarState {
	ALL_DONE = "$(check-all)",
	LOADING = "$(loading~spin)",
}
// 通知栏
export async function statusBarItemInit(context: vscode.ExtensionContext) {
	statusBarItem.text = '$(loading~spin) ' + localize("pluginNameLite");
	context.subscriptions.push(statusBarItem);
	output = vscode.window.createOutputChannel(localize("pluginNameLite"));
	statusBarItem.show();

	context.subscriptions.push(vscode.commands.registerCommand("dota2tools.showOutput", async (data) => {
		if (showOutput) {
			showOutput = !showOutput;
			output.hide();
		} else {
			showOutput = !showOutput;
			output.show();
		}
	}));
	statusBarItem.command = "dota2tools.showOutput";
}

export function getStatusBarItem() {
	return statusBarItem;
}
export function showStatusBarMessage(text: string, hideAfterTimeout: number = ENUM_STATUS_BAR_MESSAGE_TIMEOUT) {
	recordMessage(text);
	if (hideAfterTimeout === -1) {
		vscode.window.setStatusBarMessage(text);
	}
	vscode.window.setStatusBarMessage(text, hideAfterTimeout * 1000);
	// console.log(text);
	output.appendLine(text);
	return messageIndex - 1;
}

/** 更新文本 */
export function refreshStatusBarMessage(index: number, text: string, hideAfterTimeout: number = ENUM_STATUS_BAR_MESSAGE_TIMEOUT) {
	if (messageList[index]) {
		messageList[index] = text;
	}
	// console.log(text);
	output.appendLine(text);
	vscode.window.setStatusBarMessage(text, hideAfterTimeout * 1000);
}

/** 记录信息 */
function recordMessage(text: string) {
	messageList[messageIndex] = text;
	messageIndex++;
	let tooltip = `**${localize("message_notification")}**  \n`;
	for (let index = Math.max(messageIndex - MAX_MESSAGE_COUNT, 0); index < messageIndex; index++) {
		const message = messageList[index];
		tooltip += "  \n" + message;
	}
	statusBarItem.tooltip = new vscode.MarkdownString(tooltip);
}
/** 改变状态 */
export function changeStatusBarState(state: StatusBarState) {
	statusBarItem.text = state + " " + localize("pluginNameLite");
}