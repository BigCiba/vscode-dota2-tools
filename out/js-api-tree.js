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
exports.NodeItem = exports.JsApiTreeProvider = exports.APIType = void 0;
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
class JsApiTreeProvider {
    constructor(context) {
        this.context = context;
        this.api_tree_data = {};
        this.filtered_api_tree_data = undefined;
        this.JSAPIBrowserView = undefined;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.api_tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
        vscode.commands.registerCommand('dota2tools.dota2jsapi.list', (nodeItem) => {
            if (nodeItem.itemType == ItemType.Class) {
                vscode.commands.executeCommand('dota2tools.js_api_browser', this.api_tree_data[nodeItem.label], APIType.Class, nodeItem.label);
            }
        });
        // 搜索
        vscode.commands.registerCommand("dota2tools.dota2jsapi.filter", () => __awaiter(this, void 0, void 0, function* () {
            vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
                if (msg !== undefined) {
                    this.filtered_api_tree_data = {};
                    for (const className in this.api_tree_data) {
                        const funcList = this.api_tree_data[className];
                        if (className.search(new RegExp(msg, 'i')) !== -1) {
                            this.filtered_api_tree_data[className] = funcList;
                        }
                        else {
                            for (const funcName in funcList) {
                                const funcInfo = funcList[funcName];
                                if (funcName.search(new RegExp(msg, 'i')) !== -1) {
                                    if (this.filtered_api_tree_data[className] == undefined) {
                                        this.filtered_api_tree_data[className] = {};
                                    }
                                    this.filtered_api_tree_data[className][funcName] = funcInfo;
                                }
                            }
                        }
                    }
                    this._onDidChangeTreeData.fire(undefined);
                }
            });
        }));
        // 清除搜索
        vscode.commands.registerCommand("dota2tools.dota2jsapi.clearfilter", () => __awaiter(this, void 0, void 0, function* () {
            this.filtered_api_tree_data = undefined;
            this._onDidChangeTreeData.fire(undefined);
        }));
        // 展开
        vscode.commands.registerCommand("dota2tools.dota2jsapi.expand", () => __awaiter(this, void 0, void 0, function* () {
            this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            this.rebuild();
            context.workspaceState.update('js-expanded', true);
            vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', true));
        }));
        // 折叠
        vscode.commands.registerCommand("dota2tools.dota2jsapi.collapse", () => __awaiter(this, void 0, void 0, function* () {
            this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            this.rebuild();
            context.workspaceState.update('js-expanded', false);
            vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', false));
        }));
        // 复制
        vscode.commands.registerCommand("dota2tools.js_api_browser.copy", (funcName) => __awaiter(this, void 0, void 0, function* () {
            vscode.env.clipboard.writeText(funcName);
            vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
        }));
        // JS API 相关
        vscode.commands.registerCommand("dota2tools.js_api_browser", (funInfo, infoType, name) => __awaiter(this, void 0, void 0, function* () {
            if (this.JSAPIBrowserView == undefined) {
                this.JSAPIBrowserView = vscode.window.createWebviewPanel('JSAPIBrowser', // viewType
                "JS API Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                });
                this.JSAPIBrowserView.onDidDispose(() => {
                    this.JSAPIBrowserView = undefined;
                });
            }
            if (this.JSAPIBrowserView.active === false) {
                this.JSAPIBrowserView.reveal(vscode.ViewColumn.One);
            }
            this.JSAPIBrowserView.webview.postMessage({
                type: infoType,
                data: funInfo,
                name: name
            });
            this.JSAPIBrowserView.webview.html = util_1.GetWebViewContent(context, 'webview/JSAPIBrowser/APIBrowser.html');
            if (infoType == APIType.Function) {
                vscode.env.clipboard.writeText(funInfo.function);
            }
            else if (infoType == APIType.Enum) {
                vscode.env.clipboard.writeText(funInfo.name);
            }
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
            if (element.itemType === ItemType.Class) {
                let funcItems = [];
                for (const funcName in api_tree_data[element.label]) {
                    let funcData = api_tree_data[element.label][funcName];
                    funcItems.push(new NodeItem(funcData.Function || funcData.Enumerator, vscode.TreeItemCollapsibleState.None, ItemType.Function, funcData.Description, undefined, {
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
            for (const class_name in api_tree_data) {
                classItems.push(new NodeItem(class_name, this.collapsibleState, ItemType.Class));
            }
            return Promise.resolve(classItems);
        }
    }
}
exports.JsApiTreeProvider = JsApiTreeProvider;
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
//# sourceMappingURL=js-api-tree.js.map