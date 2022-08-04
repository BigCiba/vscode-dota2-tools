"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeItem = exports.PanelTreeProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
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
class PanelTreeProvider {
    constructor(context) {
        this.context = context;
        this.treeData = {};
        this.rawData = {};
        this.filteredTreeData = undefined;
        this.panelDocumentView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.treeData = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), 'utf-8'));
        this.rawData = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8').split(os.EOL);
        // 打开文档
        vscode.commands.registerCommand("dota2tools.dota2panel.event", async () => {
            vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md')));
        });
        // 打开webView
        vscode.commands.registerCommand("dota2tools.panel_browser", async (funcName) => {
            if (this.panelDocumentView === undefined) {
                this.panelDocumentView = vscode.window.createWebviewPanel('PanelBrowser', // viewType
                "Panel Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableFindWidget: true
                });
                this.panelDocumentView.onDidDispose(() => {
                    this.panelDocumentView = undefined;
                });
            }
            if (this.panelDocumentView.active === false) {
                this.panelDocumentView.reveal(vscode.ViewColumn.One);
            }
            // 把相关的数据都展示出来
            let webViewData = '';
            for (let index = this.treeData[funcName].start; index < this.treeData[funcName].end; index++) {
                const element = this.rawData[index];
                webViewData += element + os.EOL;
            }
            this.panelDocumentView.webview.postMessage({
                data: webViewData,
            });
            this.panelDocumentView.webview.html = await (0, getWebViewContent_1.getWebviewContent)(this.panelDocumentView.webview, context.extensionUri, 'panelDocument');
            // 复制
            vscode.env.clipboard.writeText(funcName);
            (0, statusBar_1.showStatusBarMessage)('复制到剪切板：' + funcName);
        });
    }
    refresh() {
        this._onDidChangeTreeData.fire(undefined);
    }
    rebuild() {
        let temp = this.filteredTreeData ? this.filteredTreeData : this.treeData;
        this.filteredTreeData = {};
        this._onDidChangeTreeData.fire(undefined);
        setTimeout(() => {
            this.filteredTreeData = temp;
            this._onDidChangeTreeData.fire(undefined);
        }, 10);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let apiTreeData = this.filteredTreeData ? this.filteredTreeData : this.treeData;
        if (element) {
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const className in apiTreeData) {
                classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.None, ItemType.class, undefined, undefined, {
                    command: 'dota2tools.panel_browser',
                    title: '',
                    arguments: [className]
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
//# sourceMappingURL=panelTree.js.map