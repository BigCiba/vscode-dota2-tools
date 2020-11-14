import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { GetWebViewContent, ShowInfo } from './util';

// 类型
export enum APIType {
	Class = 'class',
	Function = 'function',
	Enum = 'enum',
	EnumType = 'enum_type',
}
// 常用函数
const OverviewList: { class: string[]; enum: string[]; } = {
	'class': [
		'CDOTABaseAbility',
		'CDOTA_Ability_Lua',
		'CDOTA_BaseNPC',
		'CDOTA_BaseNPC_Hero',
		'CDOTA_Item',
		'CDOTA_Item_Lua',
		'CDOTA_Buff',
		'CDOTA_Modifier_Lua',
		'CScriptParticleManager',
	],
	'enum': [
		'modifierfunction',
		'modifierstate',
	]
};

export class CssApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	api_tree_data: any = {};
	filtered_api_tree_data: any = undefined;
	CssAPIBrowserView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.api_tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
		// 复制
		vscode.commands.registerCommand("dota2tools.css_api_browser.copy", async (funcName) => {
			vscode.env.clipboard.writeText(funcName);
			vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
		});
		// 搜索
		vscode.commands.registerCommand("dota2tools.dota2cssapi.filter", async () => {
			vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
				if (msg !== undefined) {
					this.filtered_api_tree_data = {};
					for (const className in this.api_tree_data) {
						const funcList = this.api_tree_data[className];
						if (className.search(new RegExp(msg, 'i')) !== -1) {
							this.filtered_api_tree_data[className] = funcList;
						}
					}
					this._onDidChangeTreeData.fire();
				}
			});
		});
		// 清除搜索
		vscode.commands.registerCommand("dota2tools.dota2cssapi.clearfilter", async () => {
			this.filtered_api_tree_data = undefined;
			this._onDidChangeTreeData.fire();
		});
		// 打开webView
		vscode.commands.registerCommand("dota2tools.css_api_browser", async (funcName) => {
			if (this.CssAPIBrowserView == undefined) {
				this.CssAPIBrowserView = vscode.window.createWebviewPanel(
					'CSSBrowser', // viewType
					"CSS Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				this.CssAPIBrowserView.onDidDispose(() => {
					this.CssAPIBrowserView = undefined;
				});
			}
			if (this.CssAPIBrowserView.active === false) {
				this.CssAPIBrowserView.reveal(vscode.ViewColumn.One)
			}
			// 把相关的数据都展示出来
			let webViewData: any = {};
			let keywords: string[] = funcName.split('-');
			console.log(keywords);
			
			for (let index = 0; index < keywords.length; index++) {
				const keyword = keywords[index];
				for (const className in this.api_tree_data) {
					const funcList = this.api_tree_data[className];
					if (className.search(new RegExp(keyword, 'i')) !== -1) {
						webViewData[className] = funcList;
					}
				}
			}
			this.CssAPIBrowserView.webview.postMessage({
				data: webViewData,
			});
			this.CssAPIBrowserView.webview.html = GetWebViewContent(context, 'webview/CSSBrowser/APIBrowser.html');
			// 复制
			vscode.env.clipboard.writeText(funcName);
			vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
		});
	}
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
	rebuild(): void {
		let temp = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
		this.filtered_api_tree_data = {}
		this._onDidChangeTreeData.fire();
		setTimeout(() => {
			this.filtered_api_tree_data = temp;
			this._onDidChangeTreeData.fire();
		}, 10);
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		let api_tree_data = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
		if (element) {
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const class_name in api_tree_data) {
				classItems.push(new NodeItem(class_name, vscode.TreeItemCollapsibleState.None, ItemType.Class, undefined, api_tree_data[class_name].description, {
					command: 'dota2tools.css_api_browser',
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
			this.iconPath = path.join(__filename, '..', '..', 'images', 'function.svg');
			this.contextValue = 'NodeItem';
		} else if (this.itemType === ItemType.Class) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'class.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.EnumType) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
			this.contextValue = 'Class';
		} else if (this.itemType === ItemType.Constants) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum_type.svg');
		} else if (this.itemType === ItemType.Enum) {
			this.iconPath = path.join(__filename, '..', '..', 'images', 'enum.svg');
			this.contextValue = 'NodeItem';
		}
	}
}