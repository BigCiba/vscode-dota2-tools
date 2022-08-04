"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeItem = exports.JsApiTreeProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const getWebViewContent_1 = require("../utils/getWebViewContent");
const statusBar_1 = require("../module/statusBar");
// 类型
var APIType;
(function (APIType) {
    APIType["class"] = "class";
    APIType["function"] = "function";
    APIType["enum"] = "enum";
    APIType["enumType"] = "enum_type";
})(APIType || (APIType = {}));
class JsApiTreeProvider {
    constructor(context) {
        this.context = context;
        this.apiTreeData = {};
        this.filteredApiTreeData = undefined;
        this.jsAPIBrowserView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.apiTreeData = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
        // 复制
        vscode.commands.registerCommand("dota2tools.dota2jsapi.copy", async (data) => {
            vscode.env.clipboard.writeText(data.label);
            (0, statusBar_1.showStatusBarMessage)('复制到剪切板：' + data.label);
        });
        vscode.commands.registerCommand('dota2tools.dota2jsapi.list', (nodeItem) => {
            if (nodeItem.itemType === ItemType.class) {
                vscode.commands.executeCommand('dota2tools.js_api_browser', this.apiTreeData[nodeItem.label], APIType.class, nodeItem.label);
            }
        });
        // 搜索
        vscode.commands.registerCommand("dota2tools.dota2jsapi.filter", async () => {
            vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
                if (msg !== undefined) {
                    this.filteredApiTreeData = {};
                    for (const className in this.apiTreeData) {
                        const funcList = this.apiTreeData[className];
                        if (className.search(new RegExp(msg, 'i')) !== -1) {
                            this.filteredApiTreeData[className] = funcList;
                        }
                        else {
                            for (const funcName in funcList) {
                                const funcInfo = funcList[funcName];
                                if (funcName.search(new RegExp(msg, 'i')) !== -1) {
                                    if (this.filteredApiTreeData[className] === undefined) {
                                        this.filteredApiTreeData[className] = {};
                                    }
                                    this.filteredApiTreeData[className][funcName] = funcInfo;
                                }
                            }
                        }
                    }
                    this._onDidChangeTreeData.fire(undefined);
                }
            });
        });
        // 清除搜索
        vscode.commands.registerCommand("dota2tools.dota2jsapi.clearfilter", async () => {
            this.filteredApiTreeData = undefined;
            this._onDidChangeTreeData.fire(undefined);
        });
        // 展开
        vscode.commands.registerCommand("dota2tools.dota2jsapi.expand", async () => {
            this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            this.rebuild();
            context.workspaceState.update('js-expanded', true);
            vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', true));
        });
        // 折叠
        vscode.commands.registerCommand("dota2tools.dota2jsapi.collapse", async () => {
            this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            this.rebuild();
            context.workspaceState.update('js-expanded', false);
            vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', false));
        });
        // 复制
        vscode.commands.registerCommand("dota2tools.js_api_browser.copy", async (funcName) => {
            vscode.env.clipboard.writeText(funcName);
            (0, statusBar_1.showStatusBarMessage)('复制到剪切板：' + funcName);
        });
        // JS API 相关
        vscode.commands.registerCommand("dota2tools.js_api_browser", async (funInfo, infoType, name) => {
            if (this.jsAPIBrowserView === undefined) {
                this.jsAPIBrowserView = vscode.window.createWebviewPanel('JSAPIBrowser', // viewType
                "JS API Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableFindWidget: true
                });
                this.jsAPIBrowserView.onDidDispose(() => {
                    this.jsAPIBrowserView = undefined;
                });
            }
            if (this.jsAPIBrowserView.active === false) {
                this.jsAPIBrowserView.reveal(vscode.ViewColumn.One);
            }
            this.jsAPIBrowserView.webview.postMessage({
                type: infoType,
                data: funInfo,
                name: name
            });
            this.jsAPIBrowserView.webview.html = await (0, getWebViewContent_1.getWebviewContent)(this.jsAPIBrowserView.webview, context.extensionUri, 'jsAPIBrowser');
            if (infoType === APIType.function) {
                vscode.env.clipboard.writeText(funInfo.function);
            }
            else if (infoType === APIType.enum) {
                vscode.env.clipboard.writeText(funInfo.name);
            }
        });
    }
    refresh() {
        this._onDidChangeTreeData.fire(undefined);
    }
    rebuild() {
        let temp = this.filteredApiTreeData ? this.filteredApiTreeData : this.apiTreeData;
        this.filteredApiTreeData = {};
        this._onDidChangeTreeData.fire(undefined);
        setTimeout(() => {
            this.filteredApiTreeData = temp;
            this._onDidChangeTreeData.fire(undefined);
        }, 10);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let apiTreeData = this.filteredApiTreeData ? this.filteredApiTreeData : this.apiTreeData;
        if (element) {
            if (element.itemType === ItemType.class) {
                let funcItems = [];
                for (const funcName in apiTreeData[element.label]) {
                    let funcData = apiTreeData[element.label][funcName];
                    funcItems.push(new NodeItem(funcData.Function || funcData.Enumerator, vscode.TreeItemCollapsibleState.None, ItemType.function, funcData.Description, undefined, {
                        command: 'dota2tools.js_api_browser.copy',
                        title: '',
                        arguments: [funcName]
                    }));
                }
                return Promise.resolve(funcItems);
            }
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const className in apiTreeData) {
                classItems.push(new NodeItem(className, this.collapsibleState, ItemType.class));
            }
            return Promise.resolve(classItems);
        }
    }
}
exports.JsApiTreeProvider = JsApiTreeProvider;
// 类型
var ItemType;
(function (ItemType) {
    ItemType[ItemType["class"] = 0] = "class";
    ItemType[ItemType["function"] = 1] = "function";
    ItemType[ItemType["constants"] = 2] = "constants";
    ItemType[ItemType["enumType"] = 3] = "enumType";
    ItemType[ItemType["enum"] = 4] = "enum";
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
        if (this.itemType === ItemType.function) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'function.svg');
            this.contextValue = 'NodeItem';
        }
        else if (this.itemType === ItemType.class) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
            this.contextValue = 'Class';
        }
        else if (this.itemType === ItemType.enumType) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
            this.contextValue = 'Class';
        }
        else if (this.itemType === ItemType.constants) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
        }
        else if (this.itemType === ItemType.enum) {
            this.iconPath = path.join(__filename, '..', '..', 'images', 'enum.svg');
            this.contextValue = 'NodeItem';
        }
    }
}
exports.NodeItem = NodeItem;
//# sourceMappingURL=jsAPITree.js.map