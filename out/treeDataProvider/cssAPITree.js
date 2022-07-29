"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeItem = exports.CssApiTreeProvider = void 0;
const vscode = require("vscode");
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
class CssApiTreeProvider {
    constructor(context, dotaApiNote) {
        this.context = context;
        this.dotaApiNote = dotaApiNote;
        this.apiTreeData = {};
        this.filteredApiTreeData = undefined;
        this.cssAPIBrowserView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.apiTreeData = dotaApiNote.getCssApiNote();
        // 复制
        vscode.commands.registerCommand("dota2tools.css_api_browser.copy", async (data) => {
            vscode.env.clipboard.writeText(data.label);
            (0, statusBar_1.showStatusBarMessage)('复制到剪切板：' + data.label);
        });
        // 注释属性
        vscode.commands.registerCommand('dota2tools.css_property.edit', async (nodeItem) => {
            let args = nodeItem.command?.arguments;
            if (args) {
                let data = { ...this.apiTreeData[nodeItem.label] };
                data.class = nodeItem.label;
                const panel = vscode.window.createWebviewPanel('dota2api', // viewType
                "Dota2 Css Property", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
                });
                panel.webview.html = await (0, getWebViewContent_1.getWebviewContent)(panel.webview, context.extensionUri, 'noteCssAPI');
                panel.webview.postMessage({
                    data: data,
                });
                panel.webview.onDidReceiveMessage(message => {
                    this.dotaApiNote.updataCssNote(message.data);
                    panel.dispose();
                }, undefined, context.subscriptions);
            }
        });
        // 搜索
        vscode.commands.registerCommand("dota2tools.dota2cssapi.filter", async () => {
            vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
                if (msg !== undefined) {
                    this.filteredApiTreeData = {};
                    for (const className in this.apiTreeData) {
                        const funcList = this.apiTreeData[className];
                        if (className.search(new RegExp(msg, 'i')) !== -1) {
                            this.filteredApiTreeData[className] = funcList;
                        }
                    }
                    this._onDidChangeTreeData.fire(undefined);
                }
            });
        });
        // 清除搜索
        vscode.commands.registerCommand("dota2tools.dota2cssapi.clearfilter", async () => {
            this.filteredApiTreeData = undefined;
            this._onDidChangeTreeData.fire(undefined);
        });
        // 打开webView
        vscode.commands.registerCommand("dota2tools.css_api_browser", async (funcName) => {
            this.apiTreeData = this.dotaApiNote.getCssApiNote();
            if (this.cssAPIBrowserView === undefined) {
                this.cssAPIBrowserView = vscode.window.createWebviewPanel('CSSBrowser', // viewType
                "CSS Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableFindWidget: true
                });
                this.cssAPIBrowserView.onDidDispose(() => {
                    this.cssAPIBrowserView = undefined;
                });
            }
            if (this.cssAPIBrowserView.active === false) {
                this.cssAPIBrowserView.reveal(vscode.ViewColumn.One);
            }
            // 把相关的数据都展示出来
            let webViewData = {};
            let keywords = funcName.split('-');
            webViewData[funcName] = this.apiTreeData[funcName];
            dotaApiNote.getCssNote(webViewData[funcName], (result) => {
                webViewData[funcName] = result;
                for (let index = 0; index < keywords.length; index++) {
                    const keyword = keywords[index];
                    for (const className in this.apiTreeData) {
                        const funcList = this.apiTreeData[className];
                        if (className.search(new RegExp(keyword, 'i')) !== -1 && className !== funcName) {
                            webViewData[className] = funcList;
                        }
                    }
                }
                if (this.cssAPIBrowserView !== undefined) {
                    this.cssAPIBrowserView.webview.postMessage({
                        data: webViewData,
                    });
                }
            });
            // console.log(keywords);
            for (let index = 0; index < keywords.length; index++) {
                const keyword = keywords[index];
                for (const className in this.apiTreeData) {
                    const funcList = this.apiTreeData[className];
                    if (className.search(new RegExp(keyword, 'i')) !== -1 && className !== funcName) {
                        webViewData[className] = funcList;
                    }
                }
            }
            this.cssAPIBrowserView.webview.postMessage({
                data: webViewData,
            });
            this.cssAPIBrowserView.webview.html = await (0, getWebViewContent_1.getWebviewContent)(this.cssAPIBrowserView.webview, context.extensionUri, 'cssBrowser');
            // 复制
            vscode.env.clipboard.writeText(funcName);
            (0, statusBar_1.showStatusBarMessage)('复制到剪切板：' + funcName);
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
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const className in apiTreeData) {
                classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.None, ItemType.class, undefined, apiTreeData[className].description, {
                    command: 'dota2tools.css_api_browser',
                    title: '',
                    arguments: [className]
                }));
            }
            return Promise.resolve(classItems);
        }
    }
}
exports.CssApiTreeProvider = CssApiTreeProvider;
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
//# sourceMappingURL=cssAPITree.js.map