"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const init_1 = require("./init");
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
class ApiTreeProvider {
    constructor(context, class_list, enum_list) {
        this.context = context;
        this.class_list = class_list;
        this.enum_list = enum_list;
        this.api_note = {};
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.api_note = JSON.parse(init_1.GetApiNote());
        vscode.commands.registerCommand('dota2tools.dota2api.edit', (nodeItem) => {
            console.log(nodeItem);
            vscode.commands.executeCommand('extension.NoteAPI', nodeItem.itemType, nodeItem.label);
        });
        vscode.commands.registerCommand('dota2tools.dota2api.list', (nodeItem) => {
            if (nodeItem.itemType == ItemType.Class) {
                vscode.commands.executeCommand('dota2tools.api_browser', this.class_list[nodeItem.label], APIType.Class, nodeItem.label);
            }
            else {
                vscode.commands.executeCommand('dota2tools.api_browser', this.enum_list[nodeItem.label], APIType.EnumType, nodeItem.label);
            }
        });
        vscode.commands.registerCommand('dota2tools.dota2api.overview', () => {
            let overview_class_list = {};
            let overview_enum_list = {};
            for (const class_name in this.class_list) {
                const fun_list = this.class_list[class_name];
                for (let i = 0; i < OverviewList.class.length; i++) {
                    const overview_class_name = OverviewList.class[i];
                    if (class_name === overview_class_name) {
                        overview_class_list[class_name] = fun_list;
                    }
                }
            }
            for (const enum_name in this.enum_list) {
                const enum_arr = this.enum_list[enum_name];
                for (let i = 0; i < OverviewList.enum.length; i++) {
                    const overview_enum_name = OverviewList.enum[i];
                    if (enum_name === overview_enum_name) {
                        overview_enum_list[enum_name] = enum_arr;
                    }
                }
            }
            this.class_list = overview_class_list;
            this.enum_list = overview_enum_list;
            this.refresh();
        });
    }
    reopen() {
        this.api_note = JSON.parse(init_1.GetApiNote());
        this.class_list = init_1.GetClassList();
        this.enum_list = init_1.GetEnumList();
        this._onDidChangeTreeData.fire();
    }
    refresh() {
        this.api_note = JSON.parse(init_1.GetApiNote());
        this._onDidChangeTreeData.fire();
    }
    rebuild() {
        let class_list = this.class_list;
        let enum_list = this.enum_list;
        this.class_list = {};
        this.enum_list = {};
        this._onDidChangeTreeData.fire();
        setTimeout(() => {
            this.class_list = class_list;
            this.enum_list = enum_list;
            this._onDidChangeTreeData.fire();
        }, 10);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            if (element.itemType === ItemType.Class) {
                let funcItems = [];
                for (const funcName in this.class_list[element.label]) {
                    let funcData = this.class_list[element.label][funcName];
                    funcItems.push(new NodeItem(funcData.function, vscode.TreeItemCollapsibleState.None, ItemType.Function, undefined, funcData.description, {
                        command: 'dota2tools.api_browser',
                        title: '',
                        arguments: [funcData, APIType.Function, funcName]
                    }));
                }
                return Promise.resolve(funcItems);
            }
            else if (element.itemType === ItemType.Constants) {
                let enumTypeItems = [];
                for (const enumName in this.enum_list) {
                    enumTypeItems.push(new NodeItem(enumName, this.collapsibleState, ItemType.EnumType, this.enum_list[enumName].description_lite));
                }
                return Promise.resolve(enumTypeItems);
            }
            else if (element.itemType === ItemType.EnumType) { // 常量类型
                let enumItems = [];
                for (let i = 0; i < this.enum_list[element.label].length; i++) {
                    let enumItem = this.enum_list[element.label][i];
                    enumItems.push(new NodeItem(enumItem.name, vscode.TreeItemCollapsibleState.None, ItemType.Enum, enumItem.description_lite, enumItem.description_lite || enumItem.description, {
                        command: 'dota2tools.api_browser',
                        title: '',
                        arguments: [enumItem, APIType.Enum]
                    }));
                }
                return Promise.resolve(enumItems);
            }
            else if (element.itemType === ItemType.Enum) { // 常量
            }
            else if (element.itemType === ItemType.Function) {
            }
            return Promise.resolve([]);
        }
        else {
            let classItems = [];
            for (const class_name in this.class_list) {
                classItems.push(new NodeItem(class_name, this.collapsibleState, ItemType.Class, this.api_note[class_name] === undefined ? undefined : this.api_note[class_name].description));
            }
            if (Object.keys(this.enum_list).length > 0) {
                classItems.push(new NodeItem('Constants', this.collapsibleState, ItemType.Constants));
            }
            return Promise.resolve(classItems);
        }
    }
}
exports.ApiTreeProvider = ApiTreeProvider;
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
//# sourceMappingURL=api-tree.js.map