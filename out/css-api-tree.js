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
exports.NodeItem = exports.CssApiTreeProvider = exports.APIType = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const util_1 = require("./util");
// 类型
var APIType;
(function (APIType) {
    APIType["Class"] = "class";
    APIType["Function"] = "function";
    APIType["Enum"] = "enum";
    APIType["EnumType"] = "enum_type";
})(APIType = exports.APIType || (exports.APIType = {}));
// 常用函数
const OverviewList = {
    'class': [
        'CDOTABaseAbility',
        'CDOTA_Ability_Lua',
        'CDOTA_BaseNPC',
        'CDOTA_BaseNPC_Hero',
        'CDOTA_Item',
        'CDOTA_Item_Lua',
        'CDOTA_Buff',
        'CDOTA_Modifier_Lua',
        'CScriptParticleManager',
    ],
    'enum': [
        'modifierfunction',
        'modifierstate',
    ]
};
class CssApiTreeProvider {
    constructor(context) {
        this.context = context;
        this.api_tree_data = {};
        this.filtered_api_tree_data = undefined;
        this.CssAPIBrowserView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.api_tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
        // 复制
        vscode.commands.registerCommand("dota2tools.css_api_browser.copy", (funcName) => __awaiter(this, void 0, void 0, function* () {
            vscode.env.clipboard.writeText(funcName);
            vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
        }));
        // 搜索
        vscode.commands.registerCommand("dota2tools.dota2cssapi.filter", () => __awaiter(this, void 0, void 0, function* () {
            vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
                if (msg !== undefined) {
                    this.filtered_api_tree_data = {};
                    for (const className in this.api_tree_data) {
                        const funcList = this.api_tree_data[className];
                        if (className.search(new RegExp(msg, 'i')) !== -1) {
                            this.filtered_api_tree_data[className] = funcList;
                        }
                    }
                    this._onDidChangeTreeData.fire(undefined);
                }
            });
        }));
        // 清除搜索
        vscode.commands.registerCommand("dota2tools.dota2cssapi.clearfilter", () => __awaiter(this, void 0, void 0, function* () {
            this.filtered_api_tree_data = undefined;
            this._onDidChangeTreeData.fire(undefined);
        }));
        // 打开webView
        vscode.commands.registerCommand("dota2tools.css_api_browser", (funcName) => __awaiter(this, void 0, void 0, function* () {
            if (this.CssAPIBrowserView == undefined) {
                this.CssAPIBrowserView = vscode.window.createWebviewPanel('CSSBrowser', // viewType
                "CSS Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                });
                this.CssAPIBrowserView.onDidDispose(() => {
                    this.CssAPIBrowserView = undefined;
                });
            }
            if (this.CssAPIBrowserView.active === false) {
                this.CssAPIBrowserView.reveal(vscode.ViewColumn.One);
            }
            // 把相关的数据都展示出来
            let webViewData = {};
            let keywords = funcName.split('-');
            console.log(keywords);
            for (let index = 0; index < keywords.length; index++) {
                const keyword = keywords[index];
                for (const className in this.api_tree_data) {
                    const funcList = this.api_tree_data[className];
                    if (className.search(new RegExp(keyword, 'i')) !== -1) {
                        webViewData[className] = funcList;
                    }
                }
            }
            this.CssAPIBrowserView.webview.postMessage({
                data: webViewData,
            });
            this.CssAPIBrowserView.webview.html = util_1.GetWebViewContent(context, 'webview/CSSBrowser/APIBrowser.html');
            // 复制
            vscode.env.clipboard.writeText(funcName);
            vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
        }));
    }
    refresh() {
        this._onDidChangeTreeData.fire(undefined);
    }
    rebuild() {
        let temp = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
        this.filtered_api_tree_data = {};
        this._onDidChangeTreeData.fire(undefined);
        setTimeout(() => {
            this.filtered_api_tree_data = temp;
            this._onDidChangeTreeData.fire(undefined);
        }, 10);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let api_tree_data = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
        if (element) {
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const class_name in api_tree_data) {
                classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.None, ItemType.Class, undefined, api_tree_data[class_name].description, {
                    command: 'dota2tools.css_api_browser',
                    title: '',
                    arguments: [class_name]
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
//# sourceMappingURL=css-api-tree.js.map