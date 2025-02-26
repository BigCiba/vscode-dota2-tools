import * as fs from 'fs';
import watch from "node-watch";
import * as path from 'path';
import * as vscode from 'vscode';
import { KvNode, KvNodePool, KvNodeType } from '../Class/KvTreeItem';
import { getGameDir } from '../module/addonInfo';
import { readKeyValue2 } from '../utils/kvUtils';

export class KvEditorTreeProvider implements vscode.TreeDataProvider<KvNode> {
	private treeData: any = {};
	private readonly descData: any = {};
	private readonly fileWatcher: fs.FSWatcher;
	private readonly kvNodePool: KvNodePool;
	private readonly nodeMap: Record<string, KvNode> = {};
	private filteredTreeData: any = undefined;
	private rootPath: string;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<KvNode | undefined> = new vscode.EventEmitter<KvNode | undefined>();
	readonly onDidChangeTreeData: vscode.Event<KvNode | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.kvNodePool = new KvNodePool();
		const gameDir = getGameDir();
		this.rootPath = path.normalize(path.join(gameDir, "scripts/npc"));
		this.treeData = this.readDirectory(this.rootPath);
		this.descData = readKeyValue2(fs.readFileSync(path.join(gameDir, "resource/addon_schinese.txt"), "utf-8")).lang.Tokens;
		this.fileWatcher = watch(this.rootPath, { recursive: true, filter: /\.txt$|\.kv$/ }, (evt, name) => {
			// this.nodeMap[name].children.forEach(node => {
			// });
			this.treeData = this.readDirectory(this.rootPath);
			this._onDidChangeTreeData.fire(undefined);
		});
	}

	private readDirectory(dir: string): any {
		const result: any = {};
		const items = fs.readdirSync(dir, { withFileTypes: true });
		items.forEach(item => {
			const filePath = path.normalize(path.join(dir, item.name));
			if (item.isDirectory()) {
				result[item.name] = this.readDirectory(filePath);
			} else {
				result[item.name] = filePath;
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

	getTreeItem(element: KvNode): vscode.TreeItem {
		return element;
	}

	getChildren(element?: KvNode): Thenable<KvNode[]> {
		if (element) {
			if (element.itemType == KvNodeType.folder) {
				const childItems = [];
				for (const childName in element.childrenData) {
					const isDirectory = typeof element.childrenData[childName] === 'object';
					const filePath = path.normalize(path.join(element.filePath, childName));
					const node = isDirectory
						? this.nodeMap[filePath] ?? this.kvNodePool.getNodeItem(childName, vscode.TreeItemCollapsibleState.Collapsed, KvNodeType.folder, filePath, element.childrenData[childName])
						: this.nodeMap[filePath] ?? this.kvNodePool.getNodeItem(childName, vscode.TreeItemCollapsibleState.Collapsed, KvNodeType.file, filePath);
					childItems.push(node);
					node.parent = element;
					this.nodeMap[filePath] = node;
				}
				element.children = childItems;
				// 对 childItems 进行排序，文件夹在上面，文件在下面
				this.sortNode(childItems);
				return Promise.resolve(childItems);
			} else if (element.itemType === KvNodeType.file) {
				const childItems = [];
				let kv: any = {};
				// 创建kv的子节点导航
				try {
					kv = readKeyValue2(fs.readFileSync(element.filePath, 'utf-8'));
				} catch (error) {
					return Promise.resolve([]);
				};
				const header = Object.keys(kv)[0];
				if (header == undefined) return Promise.resolve([]);
				const keys = kv[header];
				for (const key in keys) {
					const descKey = Object.keys(this.descData).find(k => k.toLowerCase() === ("dota_tooltip_ability_" + key).toLowerCase())
						?? Object.keys(this.descData).find(k => k.toLowerCase() === key.toLowerCase());
					const desc = descKey ? this.descData[descKey] : undefined;
					const tooltip = descKey ? this.descData[descKey + "_description"] : undefined;
					const node = this.kvNodePool.getNodeItem(key, vscode.TreeItemCollapsibleState.None, KvNodeType.key, element.filePath, undefined, desc, tooltip);
					childItems.push(node);
					node.parent = element;
				}
				element.children = childItems;
				return Promise.resolve(childItems);
			} else {
				return Promise.resolve([]);
			}
		} else {
			let apiTreeData = this.filteredTreeData ? this.filteredTreeData : this.treeData;
			// 根目录
			const childItems = [];
			for (const rootName in apiTreeData) {
				const filePath = path.normalize(path.join(this.rootPath, rootName));
				const isDirectory = typeof apiTreeData[rootName] === 'object';
				const node = isDirectory
					? this.kvNodePool.getNodeItem(rootName, vscode.TreeItemCollapsibleState.Expanded, KvNodeType.folder, filePath, apiTreeData[rootName])
					: this.kvNodePool.getNodeItem(rootName, vscode.TreeItemCollapsibleState.Collapsed, KvNodeType.file, filePath);
				childItems.push(node);
				this.nodeMap[filePath] = node;
			}
			// 对 childItems 进行排序，文件夹在上面，文件在下面
			this.sortNode(childItems);
			return Promise.resolve(childItems);
		}
	}
	sortNode(nodeItems: KvNode[]) {
		nodeItems.sort((a, b) => {
			if (a.itemType === KvNodeType.folder && b.itemType === KvNodeType.file) {
				return -1;
			} else if (a.itemType === KvNodeType.file && b.itemType === KvNodeType.folder) {
				return 1;
			} else {
				return a.label.localeCompare(b.label);
			}
		});
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