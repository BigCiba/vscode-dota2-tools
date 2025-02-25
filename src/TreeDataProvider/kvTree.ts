import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';



export class KvEditorTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	private readonly treeData: any = {};
	private filteredTreeData: any = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, dir: string) {
		// 遍历abilitiesDir下面所有的文件
		const files = fs.readdirSync(dir);
		files.forEach(file => {
			this.treeData[file] = {};
		});
		console.log(this.treeData);

	}
	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}
	rebuild(): void {
		let temp = this.filteredTreeData ? this.filteredTreeData : this.treeData;
		this.filteredTreeData = {};
		this._onDidChangeTreeData.fire(undefined);
		setTimeout(() => {
			this.filteredTreeData = temp;
			this._onDidChangeTreeData.fire(undefined);
		}, 10);
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		let apiTreeData = this.filteredTreeData ? this.filteredTreeData : this.treeData;
		if (element) {
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const className in apiTreeData) {
				classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.None, ItemType.class));
			}
			return Promise.resolve(classItems);
		}
	}
}
// 类型
enum ItemType {
	class = 0,
	function = 1,
	constants = 2,
	enumType = 3,
	enum = 4,
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
		if (this.itemType === ItemType.function) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'function.svg');
			this.contextValue = 'NodeItem';
		} else if (this.itemType === ItemType.class) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'kv.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.enumType) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.constants) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
		} else if (this.itemType === ItemType.enum) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum.svg');
			this.contextValue = 'NodeItem';
		}
	}
}