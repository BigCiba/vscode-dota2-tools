import * as vscode from 'vscode';
import * as fs from 'fs';
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

export class JsApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiTreeData: any = {};
	filteredApiTreeData: any = undefined;
	jsAPIBrowserView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.apiTreeData = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		// 复制
		vscode.commands.registerCommand("dota2tools.dota2jsapi.copy", async (data) => {
			vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage('复制到剪切板：' + data.label);
		});
		vscode.commands.registerCommand('dota2tools.dota2jsapi.list', (nodeItem: NodeItem) => {
			if (nodeItem.itemType === ItemType.class) {
				vscode.commands.executeCommand('dota2tools.js_api_browser', this.apiTreeData[nodeItem.label], APIType.class, nodeItem.label);
			}
		});
		// 搜索
		vscode.commands.registerCommand("dota2tools.dota2jsapi.filter", async () => {
			vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
				if (msg !== undefined) {
					this.filteredApiTreeData = {};
					for (const className in this.apiTreeData) {
						const funcList = this.apiTreeData[className];
						if (className.search(new RegExp(msg, 'i')) !== -1) {
							this.filteredApiTreeData[className] = funcList;
						} else {
							for (const funcName in funcList) {
								const funcInfo = funcList[funcName];
								if (funcName.search(new RegExp(msg, 'i')) !== -1) {
									if (this.filteredApiTreeData[className] === undefined) {
										this.filteredApiTreeData[className] = {};
									}
									this.filteredApiTreeData[className][funcName] = funcInfo;
								}
							}
						}
					}
					this._onDidChangeTreeData.fire(undefined);
				}
			});
		});
		// 清除搜索
		vscode.commands.registerCommand("dota2tools.dota2jsapi.clearfilter", async () => {
			this.filteredApiTreeData = undefined;
			this._onDidChangeTreeData.fire(undefined);
		});
		// 展开
		vscode.commands.registerCommand("dota2tools.dota2jsapi.expand", async () => {
			this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
			this.rebuild();
			context.workspaceState.update('js-expanded', true);
			vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', true));
		});
		// 折叠
		vscode.commands.registerCommand("dota2tools.dota2jsapi.collapse", async () => {
			this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			this.rebuild();
			context.workspaceState.update('js-expanded', false);
			vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', context.workspaceState.get('js-expanded', false));
		});
		// 复制
		vscode.commands.registerCommand("dota2tools.js_api_browser.copy", async (funcName) => {
			vscode.env.clipboard.writeText(funcName);
			showStatusBarMessage('复制到剪切板：' + funcName);
		});
		// JS API 相关
		vscode.commands.registerCommand("dota2tools.js_api_browser", async (funInfo, infoType: APIType, name) => {
			if (this.jsAPIBrowserView === undefined) {
				this.jsAPIBrowserView = vscode.window.createWebviewPanel(
					'JSAPIBrowser', // viewType
					"JS API Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
						enableFindWidget: true
					}
				);
				this.jsAPIBrowserView.onDidDispose(() => {
					this.jsAPIBrowserView = undefined;
				});
			}
			if (this.jsAPIBrowserView.active === false) {
				this.jsAPIBrowserView.reveal(vscode.ViewColumn.One);
			}
			this.jsAPIBrowserView.webview.postMessage({
				type: infoType,
				data: funInfo,
				name: name
			});
			this.jsAPIBrowserView.webview.html = await getWebviewContent(this.jsAPIBrowserView.webview, context.extensionUri, 'jsAPIBrowser');
			if (infoType === APIType.function) {
				vscode.env.clipboard.writeText(funInfo.function);
			} else if (infoType === APIType.enum) {
				vscode.env.clipboard.writeText(funInfo.name);
			}
		});

	}
	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}
	rebuild(): void {
		let temp = this.filteredApiTreeData ? this.filteredApiTreeData : this.apiTreeData;
		this.filteredApiTreeData = {};
		this._onDidChangeTreeData.fire(undefined);
		setTimeout(() => {
			this.filteredApiTreeData = temp;
			this._onDidChangeTreeData.fire(undefined);
		}, 10);
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		let apiTreeData = this.filteredApiTreeData ? this.filteredApiTreeData : this.apiTreeData;
		if (element) {
			if (element.itemType === ItemType.class) {
				let funcItems = [];
				for (const funcName in apiTreeData[element.label]) {
					let funcData = apiTreeData[element.label][funcName];
					funcItems.push(new NodeItem(funcData.Function || funcData.Enumerator, vscode.TreeItemCollapsibleState.None, ItemType.function, funcData.Description, undefined, {
						command: 'dota2tools.js_api_browser.copy',
						title: '',
						arguments: [funcName]
					}));
				}
				return Promise.resolve(funcItems);
			}
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const className in apiTreeData) {
				classItems.push(new NodeItem(className, this.collapsibleState, ItemType.class));
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