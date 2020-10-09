"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ApiTreeProvider {
    constructor(class_list, enum_list) {
        this.class_list = class_list;
        this.enum_list = enum_list;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        console.log(element);
        if (element) {
            let funcItems = [];
            if (element.itemType === ItemType.Class) {
                for (const funcName in this.class_list[element.label]) {
                    let funcData = this.class_list[element.label][funcName];
                    funcItems.push(new NodeItem(`${funcData.return} ${funcData.function}`, vscode.TreeItemCollapsibleState.None, ItemType.Function, funcData.description));
                }
            }
            else if (element.itemType === ItemType.Function) {
            }
            else {
            }
            return Promise.resolve(funcItems);
        }
        else {
            let classItems = [];
            for (const class_name in this.class_list) {
                classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.Collapsed, ItemType.Class));
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
})(ItemType || (ItemType = {}));
class NodeItem extends vscode.TreeItem {
    constructor(label, // 用来保存名字
    collapsibleState, // 折叠状态
    itemType, // 类型
    tooltip) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.itemType = itemType;
        this.tooltip = tooltip;
        this.contextValue = 'NodeItem';
    }
}
exports.NodeItem = NodeItem;
//# sourceMappingURL=api-tree.js.map