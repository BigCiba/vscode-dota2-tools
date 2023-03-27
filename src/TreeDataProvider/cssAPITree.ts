import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getWebviewContent } from '../utils/getWebViewContent';
import { DotaApiNote } from '../Class/DotaApiNote';
import { showStatusBarMessage } from '../module/statusBar';

// 类型
enum APIType {
	class = 'class',
	function = 'function',
	enum = 'enum',
	enumType = 'enum_type',
}

export class CssApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiTreeData: any = {};
	filteredApiTreeData: any = undefined;
	cssAPIBrowserView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.apiTreeData = dotaApiNote.getCssApiNote();
		// 复制
		vscode.commands.registerCommand("dota2tools.css_api_browser.copy", async (data) => {
			vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage('复制到剪切板：' + data.label);
		});
		// 注释属性
		vscode.commands.registerCommand('dota2tools.css_property.edit', async (nodeItem: NodeItem) => {
			let args: any[] | undefined = nodeItem.command?.arguments;
			if (args) {
				let data = { ...this.apiTreeData[nodeItem.label] };
				data.class = nodeItem.label;
				const panel = vscode.window.createWebviewPanel(
					'dota2api', // viewType
					"Dota2 Css Property", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'noteCssAPI');
				panel.webview.postMessage({
					data: data,
				});
				panel.webview.onDidReceiveMessage(message => {
					this.dotaApiNote.updataCssNote(message.data);
					panel.dispose();
				}, undefined, context.subscriptions);
			}
		});
		// 搜索
		vscode.commands.registerCommand("dota2tools.dota2cssapi.filter", async () => {
			vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
				if (msg !== undefined) {
					this.filteredApiTreeData = {};
					for (const className in this.apiTreeData) {
						const funcList = this.apiTreeData[className];
						if (className.search(new RegExp(msg, 'i')) !== -1) {
							this.filteredApiTreeData[className] = funcList;
						}
					}
					this._onDidChangeTreeData.fire(undefined);
				}
			});
		});
		// 清除搜索
		vscode.commands.registerCommand("dota2tools.dota2cssapi.clearfilter", async () => {
			this.filteredApiTreeData = undefined;
			this._onDidChangeTreeData.fire(undefined);
		});
		// 打开webView
		vscode.commands.registerCommand("dota2tools.css_api_browser", async (funcName) => {
			this.apiTreeData = this.dotaApiNote.getCssApiNote();
			if (this.cssAPIBrowserView === undefined) {
				this.cssAPIBrowserView = vscode.window.createWebviewPanel(
					'CSSBrowser', // viewType
					"CSS Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
						enableFindWidget: true
					}
				);
				this.cssAPIBrowserView.onDidDispose(() => {
					this.cssAPIBrowserView = undefined;
				});
			}
			if (this.cssAPIBrowserView.active === false) {
				this.cssAPIBrowserView.reveal(vscode.ViewColumn.One);
			}
			// 把相关的数据都展示出来
			let webViewData: any = {};
			let keywords: string[] = funcName.split('-');
			webViewData[funcName] = this.apiTreeData[funcName];

			dotaApiNote.getCssNote(webViewData[funcName], (result) => {
				webViewData[funcName] = result;
				for (let index = 0; index < keywords.length; index++) {
					const keyword = keywords[index];
					for (const className in this.apiTreeData) {
						const funcList = this.apiTreeData[className];
						if (className.search(new RegExp(keyword, 'i')) !== -1 && className !== funcName) {
							webViewData[className] = funcList;
						}
					}
				}
				if (this.cssAPIBrowserView !== undefined) {
					this.cssAPIBrowserView.webview.postMessage({
						data: webViewData,
					});
				}
			});
			// console.log(keywords);

			for (let index = 0; index < keywords.length; index++) {
				const keyword = keywords[index];
				for (const className in this.apiTreeData) {
					const funcList = this.apiTreeData[className];
					if (className.search(new RegExp(keyword, 'i')) !== -1 && className !== funcName) {
						webViewData[className] = funcList;
					}
				}
			}
			this.cssAPIBrowserView.webview.postMessage({
				data: webViewData,
			});
			this.cssAPIBrowserView.webview.html = await getWebviewContent(this.cssAPIBrowserView.webview, context.extensionUri, 'cssBrowser');
			// 复制
			vscode.env.clipboard.writeText(funcName);
			showStatusBarMessage('复制到剪切板：' + funcName);
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
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const className in apiTreeData) {
				classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.None, ItemType.class, undefined, apiTreeData[className].description, {
					command: 'dota2tools.css_api_browser',
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