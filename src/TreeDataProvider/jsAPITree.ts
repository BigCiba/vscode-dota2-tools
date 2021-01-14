import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { GetWebViewContent, ShowInfo } from '../util';

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

export class JsApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	api_tree_data: any = {};
	filtered_api_tree_data: any = undefined;
	JSAPIBrowserView: vscode.WebviewPanel | undefined = undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.api_tree_data = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		vscode.commands.registerCommand('dota2tools.dota2jsapi.list', (nodeItem: NodeItem) => {
			if (nodeItem.itemType == ItemType.Class) {
				vscode.commands.executeCommand('dota2tools.js_api_browser', this.api_tree_data[nodeItem.label], APIType.Class, nodeItem.label);
			}
		});
		// 搜索
		vscode.commands.registerCommand("dota2tools.dota2jsapi.filter", async () => {
			vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
				if (msg !== undefined) {
					this.filtered_api_tree_data = {};
					for (const className in this.api_tree_data) {
						const funcList = this.api_tree_data[className];
						if (className.search(new RegExp(msg, 'i')) !== -1) {
							this.filtered_api_tree_data[className] = funcList;
						} else {
							for (const funcName in funcList) {
								const funcInfo = funcList[funcName];
								if (funcName.search(new RegExp(msg, 'i')) !== -1) {
									if (this.filtered_api_tree_data[className] == undefined) {
										this.filtered_api_tree_data[className] = {};
									}
									this.filtered_api_tree_data[className][funcName] = funcInfo;
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
			this.filtered_api_tree_data = undefined;
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
			vscode.window.setStatusBarMessage('复制到剪切板：' + funcName);
		});
		// JS API 相关
		vscode.commands.registerCommand("dota2tools.js_api_browser", async (funInfo, infoType: APIType, name) => {
			if (this.JSAPIBrowserView == undefined) {
				this.JSAPIBrowserView = vscode.window.createWebviewPanel(
					'JSAPIBrowser', // viewType
					"JS API Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				this.JSAPIBrowserView.onDidDispose(() => {
					this.JSAPIBrowserView = undefined;
				});
			}
			if (this.JSAPIBrowserView.active === false) {
				this.JSAPIBrowserView.reveal(vscode.ViewColumn.One);
			}
			this.JSAPIBrowserView.webview.postMessage({
				type: infoType,
				data: funInfo,
				name: name
			});
			this.JSAPIBrowserView.webview.html = GetWebViewContent(context, 'webview/JSAPIBrowser/APIBrowser.html');
			if (infoType == APIType.Function) {
				vscode.env.clipboard.writeText(funInfo.function);
			} else if (infoType == APIType.Enum) {
				vscode.env.clipboard.writeText(funInfo.name);
			}
		});

	}
	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}
	rebuild(): void {
		let temp = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
		this.filtered_api_tree_data = {};
		this._onDidChangeTreeData.fire(undefined);
		setTimeout(() => {
			this.filtered_api_tree_data = temp;
			this._onDidChangeTreeData.fire(undefined);
		}, 10);
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		let api_tree_data = this.filtered_api_tree_data ? this.filtered_api_tree_data : this.api_tree_data;
		if (element) {
			if (element.itemType === ItemType.Class) {
				let funcItems = [];
				for (const funcName in api_tree_data[element.label]) {
					let funcData = api_tree_data[element.label][funcName];
					funcItems.push(new NodeItem(funcData.Function || funcData.Enumerator, vscode.TreeItemCollapsibleState.None, ItemType.Function, funcData.Description, undefined, {
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
			for (const class_name in api_tree_data) {
				classItems.push(new NodeItem(class_name, this.collapsibleState, ItemType.Class));
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