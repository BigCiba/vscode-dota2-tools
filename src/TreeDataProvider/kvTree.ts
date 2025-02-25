import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getGameDir } from '../module/addonInfo';
import { readKeyValue2 } from '../utils/kvUtils';

export class KvEditorTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	private readonly treeData: any = {};
	private readonly descData: any = {};
	private filteredTreeData: any = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		const gameDir = getGameDir();
		this.treeData = this.readDirectory(path.join(gameDir, "scripts/npc"));
		this.descData = readKeyValue2(fs.readFileSync(path.join(gameDir, "resource/addon_schinese.txt"), "utf-8")).lang.Tokens;
	}

	private readDirectory(dir: string): any {
		const result: any = {};
		const items = fs.readdirSync(dir, { withFileTypes: true });
		items.forEach(item => {
			if (item.isDirectory()) {
				result[item.name] = this.readDirectory(path.join(dir, item.name));
			} else {
				result[item.name] = path.join(dir, item.name);
			}
		});
		return result;
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
		if (element) {
			const children = element.filePath as Record<string, any>;
			if (typeof children == "object") {
				const childItems = [];
				for (const childName in children) {
					const isDirectory = typeof children[childName] === 'object';
					if (isDirectory) {
						childItems.push(new NodeItem(childName, vscode.TreeItemCollapsibleState.Collapsed, ItemType.folder, children[childName]));
					} else {
						childItems.push(new NodeItem(childName, vscode.TreeItemCollapsibleState.Collapsed, ItemType.file, children[childName]));
					}
				}
				// 对 childItems 进行排序，文件夹在上面，文件在下面
				childItems.sort((a, b) => {
					if (a.itemType === ItemType.folder && b.itemType === ItemType.file) {
						return -1;
					} else if (a.itemType === ItemType.file && b.itemType === ItemType.folder) {
						return 1;
					} else {
						return a.label.localeCompare(b.label);
					}
				});
				return Promise.resolve(childItems);
			} else if (element.itemType === ItemType.file) {
				const childItems = [];
				// 创建kv的子节点导航
				const kv = readKeyValue2(fs.readFileSync(children, 'utf-8'));
				const keys = kv[Object.keys(kv)[0]];
				for (const key in keys) {
					const descKey = Object.keys(this.descData).find(k => k.toLowerCase() === ("dota_tooltip_ability_" + key).toLowerCase())
						?? Object.keys(this.descData).find(k => k.toLowerCase() === key.toLowerCase());
					const desc = descKey ? this.descData[descKey] : undefined;
					const tooltip = descKey ? this.descData[descKey + "_description"] : undefined;
					childItems.push(new NodeItem(key, vscode.TreeItemCollapsibleState.None, ItemType.key, element.filePath, desc, tooltip));
				}
				return Promise.resolve(childItems);
			} else {
				return Promise.resolve([]);
			}
		} else {
			let apiTreeData = this.filteredTreeData ? this.filteredTreeData : this.treeData;
			// 根目录
			const rootItems = [];
			for (const rootName in apiTreeData) {
				const isDirectory = typeof apiTreeData[rootName] === 'object';
				if (isDirectory) {
					rootItems.push(new NodeItem(rootName, vscode.TreeItemCollapsibleState.Expanded, ItemType.folder, apiTreeData[rootName]));
				} else {
					rootItems.push(new NodeItem(rootName, vscode.TreeItemCollapsibleState.Collapsed, ItemType.file, apiTreeData[rootName]));
				}
			}
			// 对 rootItems 进行排序，文件夹在上面，文件在下面
			rootItems.sort((a, b) => {
				if (a.itemType === ItemType.folder && b.itemType === ItemType.file) {
					return -1;
				} else if (a.itemType === ItemType.file && b.itemType === ItemType.folder) {
					return 1;
				} else {
					return a.label.localeCompare(b.label);
				}
			});
			return Promise.resolve(rootItems);
		}
	}
}

enum ItemType {
	folder = 0,
	file = 1,
	key = 2,
}

export class NodeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,	// 用来保存名字
		public collapsibleState: vscode.TreeItemCollapsibleState,	// 折叠状态
		public readonly itemType: ItemType,	// 类型
		public readonly filePath: string | object,	// 文件路径
		public readonly description?: string,	// 描述
		public readonly tooltip?: string,	// tooltip
		public readonly command?: vscode.Command	// 注册指令
	) {
		super(label, collapsibleState);
		if (this.itemType === ItemType.folder) {
			this.iconPath = vscode.ThemeIcon.Folder;
		} else if (this.itemType === ItemType.key) {
			this.iconPath = new vscode.ThemeIcon("symbol-method");
			this.command = {
				command: 'extension.openFileAtPosition',
				title: 'Open File at Position',
				arguments: [this.filePath, this.label]
			};
		} else if (this.itemType === ItemType.file) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'kv.svg');
			this.command = {
				command: 'vscode.open',
				title: 'Open File',
				arguments: [vscode.Uri.file(this.filePath as string)]
			};
		}
	}
}

// 注册命令
vscode.commands.registerCommand('extension.openFileAtPosition', async (filePath: string, key: string) => {
	const document = await vscode.workspace.openTextDocument(filePath);
	const editor = await vscode.window.showTextDocument(document);
	const text = document.getText();
	const position = text.indexOf(key);
	if (position !== -1) {
		const startPosition = document.positionAt(position);
		editor.selection = new vscode.Selection(startPosition, startPosition);
		editor.revealRange(new vscode.Range(startPosition, startPosition));
	}
});