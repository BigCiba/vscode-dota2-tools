"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeItem = exports.PanelTreeProvider = exports.APIType = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
// 类型
var APIType;
(function (APIType) {
    APIType["Class"] = "class";
    APIType["Function"] = "function";
    APIType["Enum"] = "enum";
    APIType["EnumType"] = "enum_type";
})(APIType = exports.APIType || (exports.APIType = {}));
class PanelTreeProvider {
    constructor(context) {
        this.context = context;
        this.tree_data = {};
        this.raw_data = {};
        this.filtered_tree_data = undefined;
        this.BrowserView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), 'utf-8'));
        this.raw_data = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8').split(os.EOL);
        // 打开文档
        vscode.commands.registerCommand("dota2tools.dota2panel.event", () => __awaiter(this, void 0, void 0, function* () {
            vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md')));
        }));
        // 打开webView
        vscode.commands.registerCommand("dota2tools.panel_browser", (funcName) => __awaiter(this, void 0, void 0, function* () {
            vscode.commands.executeCommand('markdown.showPreview', fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8'));
            // if (this.BrowserView == undefined) {
            // 	this.BrowserView = vscode.window.createWebviewPanel(
            // 		'PanelBrowser', // viewType
            // 		"Panel Browser", // 视图标题
            // 		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            // 		{
            // 			enableScripts: true, // 启用JS，默认禁用
            // 			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
            // 		}
            // 	);
            // 	this.BrowserView.onDidDispose(() => {
            // 		this.BrowserView = undefined;
            // 	});
            // }
            // if (this.BrowserView.active === false) {
            // 	this.BrowserView.reveal(vscode.ViewColumn.One)
            // }
            // // 把相关的数据都展示出来
            // let webViewData: string = '';
            // for (let index = this.tree_data[funcName].start; index < this.tree_data[funcName].end; index++) {
            // 	const element = this.raw_data[index];
            // 	webViewData += element + os.EOL;
            // }
            // this.BrowserView.webview.postMessage({
            // 	data: webViewData,
            // });
            // this.BrowserView.webview.html = GetWebViewContent(context, 'webview/PanelBrowser/APIBrowser.html');
            // // 复制
            // vscode.env.clipboard.writeText(funcName);
            // vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
        }));
    }
    refresh() {
        this._onDidChangeTreeData.fire(undefined);
    }
    rebuild() {
        let temp = this.filtered_tree_data ? this.filtered_tree_data : this.tree_data;
        this.filtered_tree_data = {};
        this._onDidChangeTreeData.fire(undefined);
        setTimeout(() => {
            this.filtered_tree_data = temp;
            this._onDidChangeTreeData.fire(undefined);
        }, 10);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let api_tree_data = this.filtered_tree_data ? this.filtered_tree_data : this.tree_data;
        if (element) {
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const class_name in api_tree_data) {
                classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.None, ItemType.Class, undefined, undefined, {
                    command: 'dota2tools.panel_browser',
                    title: '',
                    arguments: [class_name]
                }));
            }
            return Promise.resolve(classItems);
        }
    }
}
exports.PanelTreeProvider = PanelTreeProvider;
// 类型
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Class"] = 0] = "Class";
    ItemType[ItemType["Function"] = 1] = "Function";
    ItemType[ItemType["Constants"] = 2] = "Constants";
    ItemType[ItemType["EnumType"] = 3] = "EnumType";
    ItemType[ItemType["Enum"] = 4] = "Enum";
})(ItemType || (ItemType = {}));
class NodeItem extends vscode.TreeItem {
    constructor(label, // 用来保存名字
    collapsibleState, // 折叠状态
    itemType, // 类型
    description, // 描述
    tooltip, // tooltip
    command // 注册指令
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.itemType = itemType;
        this.description = description;
        this.tooltip = tooltip;
        this.command = command;
        if (this.itemType === ItemType.Function) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'function.svg');
            this.contextValue = 'NodeItem';
        }
        else if (this.itemType === ItemType.Class) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
            this.contextValue = 'Class';
        }
        else if (this.itemType === ItemType.EnumType) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
            this.contextValue = 'Class';
        }
        else if (this.itemType === ItemType.Constants) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
        }
        else if (this.itemType === ItemType.Enum) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum.svg');
            this.contextValue = 'NodeItem';
        }
    }
}
exports.NodeItem = NodeItem;
//# sourceMappingURL=panel-tree.js.map