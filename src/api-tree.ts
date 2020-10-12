import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { print } from 'util';

// 类型
export enum APIType {
	Function = 'function',
	Enum = 'enum',
}

export class ApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	api_note: any = {};
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, public class_list: any, public enum_list: any) {
		this.api_note = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/api_note.json', 'utf-8'));
	}
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
	rebuild(): void {
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

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		if (element) {
			if (element.itemType === ItemType.Class) {
				let funcItems = [];
				for (const funcName in this.class_list[element.label]) {
					let funcData = this.class_list[element.label][funcName];
					funcItems.push(new NodeItem(funcData.function, vscode.TreeItemCollapsibleState.None, ItemType.Function, undefined, funcData.description, {
						command: 'dota2tools.api_browser',
						title: '',
						arguments: [funcData, APIType.Function]
					}));
				}
				return Promise.resolve(funcItems);
			} else if (element.itemType === ItemType.Constants) {
				let enumTypeItems = [];
				for (const enumName in this.enum_list) {
					enumTypeItems.push(new NodeItem(enumName, this.collapsibleState, ItemType.EnumType, this.enum_list[enumName].description_lite ));
				}
				return Promise.resolve(enumTypeItems);
			} else if (element.itemType === ItemType.EnumType) {	// 常量类型
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
			} else if (element.itemType === ItemType.Enum) {	// 常量
			} else if (element.itemType === ItemType.Function) {
			}
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const class_name in this.class_list) {
				classItems.push(new NodeItem(class_name, this.collapsibleState, ItemType.Class, this.api_note[class_name] === undefined ? undefined:this.api_note[class_name].description));
			}
			if (Object.keys(this.enum_list).length > 0) {
				classItems.push(new NodeItem('Constants', this.collapsibleState, ItemType.Constants));
			}
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
		public collapsibleState: vscode.TreeItemCollapsibleState,	// 折叠状态
		public readonly itemType: ItemType,	// 类型
		public readonly description?: string,	// 描述
		public readonly tooltip?: string,	// tooltip
		public readonly command?: vscode.Command	// 注册指令
	) {
		super(label, collapsibleState);
		if (this.itemType === ItemType.Function) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'function.svg');
		} else if (this.itemType === ItemType.Class) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
		} else if (this.itemType === ItemType.Enum) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum.svg');
		}
	}
	

	contextValue = 'NodeItem';
}