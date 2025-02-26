import * as path from 'path';
import * as vscode from 'vscode';

export enum KvNodeType {
	/** 默认 */
	None,
	/** 文件夹 */
	folder,
	/** 文件 */
	file,
	/** Kv文件里面的节点 */
	key,
}

export class KvNode extends vscode.TreeItem {
	public label: string = "";
	/** 子节点 */
	public children: KvNode[] = [];
	/** 父节点 */
	public parent?: KvNode;
	/** 是否被使用 */
	public used: boolean = false;
	/** 路径 */
	public filePath: string = "";
	/** 子节点数据 */
	public childrenData: Record<string, any> = {};
	public description?: string;
	public tooltip?: string;
	/** 执行指令 */
	public command?: vscode.Command;
	public itemType: KvNodeType = KvNodeType.None;
	public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None;
	constructor() {
		super("");
	}
	update(itemType: KvNodeType) {
		this.itemType = itemType;
		if (this.itemType === KvNodeType.folder) {
			this.iconPath = vscode.ThemeIcon.Folder;
		} else if (this.itemType === KvNodeType.key) {
			this.iconPath = new vscode.ThemeIcon("symbol-method");
			this.command = {
				command: 'extension.openFileAtPosition',
				title: 'Open File at Position',
				arguments: [this.filePath, this.label]
			};
		} else if (this.itemType === KvNodeType.file) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'kv.svg');
			this.command = {
				command: 'vscode.open',
				title: 'Open File',
				arguments: [vscode.Uri.file(this.filePath as string)]
			};
		}
	}
}

export class KvNodePool {
	private count: number = 1000;
	private pool: KvNode[] = [];
	private usedPool: KvNode[] = [];

	constructor() {
		for (let i = 0; i < this.count; i++) {
			this.pool.push(new KvNode());
		}
	}

	getNodeItem(
		label: string,
		collapsibleState: vscode.TreeItemCollapsibleState,
		itemType: KvNodeType,
		filePath: string,
		childrenData?: Object,
		description?: string,
		tooltip?: string,
		command?: vscode.Command
	): KvNode {
		let node = this.pool.pop() ?? new KvNode();
		node.label = label;
		node.collapsibleState = collapsibleState;
		node.itemType = itemType;
		node.filePath = filePath;
		node.childrenData = childrenData ?? {};
		node.description = description;
		node.tooltip = tooltip;
		node.used = true;
		node.command = command;
		node.update(itemType);
		this.usedPool.push(node);
		return node;
	}

	releaseNodeItem(item: KvNode): void {
		const node = this.usedPool.splice(this.usedPool.indexOf(item), 1);
		this.pool.push(node[0]);
	}
}