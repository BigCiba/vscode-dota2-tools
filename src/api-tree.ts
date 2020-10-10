import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// 类型
export enum APIType {
	Function = 'function',
	Enum = 'enum',
}

export class ApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {

	constructor(private class_list: any, private enum_list: any) {
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		console.log(element);
		
		if (element) {
			if (element.itemType === ItemType.Class) {
				let funcItems = [];
				for (const funcName in this.class_list[element.label]) {
					let funcData = this.class_list[element.label][funcName];
					funcItems.push(new NodeItem(funcData.function, vscode.TreeItemCollapsibleState.None, ItemType.Function, funcData.description, {
						command: 'dota2tools.api_browser',
						title: '',
						arguments: [funcData, APIType.Function]
					}));
				}
				return Promise.resolve(funcItems);
			} else if (element.itemType === ItemType.Constants) {
				let enumTypeItems = [];
				for (const enumName in this.enum_list) {
					enumTypeItems.push(new NodeItem(enumName, vscode.TreeItemCollapsibleState.Collapsed, ItemType.EnumType));
				}
				return Promise.resolve(enumTypeItems);
			} else if (element.itemType === ItemType.EnumType) {
				let enumItems = [];
				for (let i = 0; i < this.enum_list[element.label].length; i++) {
					let enumItem = this.enum_list[element.label][i];
					enumItems.push(new NodeItem(enumItem.name, vscode.TreeItemCollapsibleState.None, ItemType.Enum, enumItem.description_lite || enumItem.description, {
						command: 'dota2tools.api_browser',
						title: '',
						arguments: [enumItem, APIType.Enum]
					}));
				}
				return Promise.resolve(enumItems);
			} else if (element.itemType === ItemType.Enum) {
			} else if (element.itemType === ItemType.Function) {
			}
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const class_name in this.class_list) {
				classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.Collapsed, ItemType.Class));
			}
			classItems.push(new NodeItem('Constants', vscode.TreeItemCollapsibleState.Collapsed, ItemType.Constants));
			return Promise.resolve(classItems);
		}
	}
}
// 类型
enum ItemType {
	Class = 0,
	Function = 1,
	Constants = 2,
	EnumType = 3,
	Enum = 4,
}
export class NodeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,	// 用来保存名字
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,	// 折叠状态
		public readonly itemType: ItemType,	// 类型
		public readonly tooltip?: string,	// tooltip
		public readonly command?: vscode.Command	// 注册指令
	) {
		super(label, collapsibleState);
	}

	contextValue = 'NodeItem';
}