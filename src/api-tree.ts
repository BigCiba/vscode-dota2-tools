import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {

	constructor(private class_list: any, private enum_list: any) {
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		console.log(element);
		
		if (element) {
			let funcItems = [];
			if (element.itemType === ItemType.Class) {
				for (const funcName in this.class_list[element.label]) {
					let funcData = this.class_list[element.label][funcName];
					funcItems.push(new NodeItem(`${funcData.return} ${funcData.function}`, vscode.TreeItemCollapsibleState.None, ItemType.Function, funcData.description));
				}
			} else if (element.itemType === ItemType.Function) {
				
			} else {
				
			}
			return Promise.resolve(funcItems);
		} else {
			let classItems = [];
			for (const class_name in this.class_list) {
				classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.Collapsed, ItemType.Class));
			}
			return Promise.resolve(classItems);
		}
	}
}
// 类型
enum ItemType {
	Class = 0,
	Function = 1,
}
export class NodeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,	// 用来保存名字
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,	// 折叠状态
		public readonly itemType: ItemType,	// 类型
		public readonly tooltip?: string,	// tooltip
	) {
		super(label, collapsibleState);
	}

	contextValue = 'NodeItem';
}