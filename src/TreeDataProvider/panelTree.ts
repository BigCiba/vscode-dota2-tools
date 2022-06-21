import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { getWebviewContent } from '../utils/getWebViewContent';
import { showStatusBarMessage } from '../module/statusBar';

// 类型
enum APIType {
	class = 'class',
	function = 'function',
	enum = 'enum',
	enumType = 'enum_type',
}

export class PanelTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	private readonly treeData: any = {};
	private readonly rawData: any = {};
	private filteredTreeData: any = undefined;
	private panelDocumentView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.treeData = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.json'), 'utf-8'));
		this.rawData = fs.readFileSync(path.join(context.extensionPath, 'resource', 'PanelList.md'), 'utf-8').split(os.EOL);
		// 打开文档
		vscode.commands.registerCommand("dota2tools.dota2panel.event", async () => {
			vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'dump_panorama_events.md')));
		});
		// 打开webView
		vscode.commands.registerCommand("dota2tools.panel_browser", async (funcName) => {
			if (this.panelDocumentView === undefined) {
				this.panelDocumentView = vscode.window.createWebviewPanel(
					'PanelBrowser', // viewType
					"Panel Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
						enableFindWidget: true
					}
				);
				this.panelDocumentView.onDidDispose(() => {
					this.panelDocumentView = undefined;
				});
			}
			if (this.panelDocumentView.active === false) {
				this.panelDocumentView.reveal(vscode.ViewColumn.One);
			}
			// 把相关的数据都展示出来
			let webViewData: string = '';
			for (let index = this.treeData[funcName].start; index < this.treeData[funcName].end; index++) {
				const element = this.rawData[index];
				webViewData += element + os.EOL;
			}

			this.panelDocumentView.webview.postMessage({
				data: webViewData,
			});
			this.panelDocumentView.webview.html = await getWebviewContent(this.panelDocumentView.webview, context.extensionUri, 'panelDocument');
			// 复制
			vscode.env.clipboard.writeText(funcName);
			showStatusBarMessage('复制到剪切板：' + funcName);
		});
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
				classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.None, ItemType.class, undefined, undefined, {
					command: 'dota2tools.panel_browser',
					title: '',
					arguments: [className]
				}));
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
			this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
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