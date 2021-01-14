import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { GetWebViewContent, ShowInfo } from '../util';

// 类型
export enum APIType {
	Class = 'class',
	Function = 'function',
	Enum = 'enum',
	EnumType = 'enum_type',
}

export class PanelTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	private readonly tree_data: any = {};
	private readonly raw_data: any = {};
	private filtered_tree_data: any = undefined;
	private BrowserView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), 'utf-8'));
		this.raw_data = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8').split(os.EOL);
		// 打开文档
		vscode.commands.registerCommand("dota2tools.dota2panel.event", async () => {
			vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md')));
		});
		// 打开webView
		vscode.commands.registerCommand("dota2tools.panel_browser", async (funcName) => {
			if (this.BrowserView == undefined) {
				this.BrowserView = vscode.window.createWebviewPanel(
					'PanelBrowser', // viewType
					"Panel Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				this.BrowserView.onDidDispose(() => {
					this.BrowserView = undefined;
				});
			}
			if (this.BrowserView.active === false) {
				this.BrowserView.reveal(vscode.ViewColumn.One);
			}
			// 把相关的数据都展示出来
			let webViewData: string = '';
			for (let index = this.tree_data[funcName].start; index < this.tree_data[funcName].end; index++) {
				const element = this.raw_data[index];
				webViewData += element + os.EOL;
			}

			this.BrowserView.webview.postMessage({
				data: webViewData,
			});
			this.BrowserView.webview.html = GetWebViewContent(context, 'webview/PanelBrowser/APIBrowser.html');
			// 复制
			vscode.env.clipboard.writeText(funcName);
			vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
		});
	}
	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}
	rebuild(): void {
		let temp = this.filtered_tree_data ? this.filtered_tree_data : this.tree_data;
		this.filtered_tree_data = {};
		this._onDidChangeTreeData.fire(undefined);
		setTimeout(() => {
			this.filtered_tree_data = temp;
			this._onDidChangeTreeData.fire(undefined);
		}, 10);
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		let api_tree_data = this.filtered_tree_data ? this.filtered_tree_data : this.tree_data;
		if (element) {
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const class_name in api_tree_data) {
				classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.None, ItemType.Class, undefined, undefined, {
					command: 'dota2tools.panel_browser',
					title: '',
					arguments: [class_name]
				}));
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
			this.iconPath = path.join(__filename, '..', '..', '..', 'images', 'function.svg');
			this.contextValue = 'NodeItem';
		} else if (this.itemType === ItemType.Class) {
			this.iconPath = path.join(__filename, '..', '..', '..', 'images', 'class.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.EnumType) {
			this.iconPath = path.join(__filename, '..', '..', '..', 'images', 'enum_type.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.Constants) {
			this.iconPath = path.join(__filename, '..', '..', '..', 'images', 'enum_type.svg');
		} else if (this.itemType === ItemType.Enum) {
			this.iconPath = path.join(__filename, '..', '..', '..', 'images', 'enum.svg');
			this.contextValue = 'NodeItem';
		}
	}
}