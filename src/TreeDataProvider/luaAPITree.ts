import * as vscode from 'vscode';
import * as path from 'path';
import { DotaApiNote } from '../Class/DotaApiNote';
import { apiParse } from '../utils/apiParse';
import { getWebviewContent } from '../utils/getWebViewContent';
import { showStatusBarMessage } from '../module/statusBar';
// import { GetApiNote, GetClassList, GetEnumList } from '../init';

// 类型
enum APIType {
	class = 'class',
	function = 'function',
	enum = 'enum',
	enumType = 'enum_type',
}
// 常用函数
const overviewList: { class: string[]; enum: string[]; } = {
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

export class ApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiNote: Table;
	classList: Table;
	enumList: Table;
	apiBrowserView: vscode.WebviewPanel | undefined = undefined;
	private _onDidChangeTreeData: vscode.EventEmitter<NodeItem | undefined> = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<NodeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.apiNote = dotaApiNote.getApiNote();
		this.classList = this.dotaApiNote.getClassList();
		this.enumList = this.dotaApiNote.getEnumList();

		// 复制
		vscode.commands.registerCommand("dota2tools.dota2api.copy", async (data) => {
			vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage('复制到剪切板：' + data.label);
		});
		// 编辑
		vscode.commands.registerCommand('dota2tools.dota2api.edit', async (nodeItem: NodeItem) => {
			let args: any[] | undefined = nodeItem.command?.arguments;
			if (args) {
				const panel = vscode.window.createWebviewPanel(
					'dota2api', // viewType
					"Dota2 API", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
					}
				);
				panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'noteLuaAPI');
				panel.webview.postMessage({
					type: args[1],
					data: args[0],
					name: args[2]
				});
				panel.webview.onDidReceiveMessage(message => {
					if (message.type === APIType.function) {
						this.dotaApiNote.updataFunctionNote(message.data);
					} else if (message.type === APIType.enum) {
						this.dotaApiNote.updataEnumNote(message.data);
					}

					panel.dispose();
				}, undefined, context.subscriptions);
			}
		});
		// 列表
		vscode.commands.registerCommand('dota2tools.dota2api.list', (nodeItem: NodeItem) => {
			if (nodeItem.itemType === ItemType.class) {
				vscode.commands.executeCommand('dota2tools.api_browser', this.classList[nodeItem.label], APIType.class, nodeItem.label);
			} else {
				vscode.commands.executeCommand('dota2tools.api_browser', this.enumList[nodeItem.label], APIType.enumType, nodeItem.label);
			}
		});
		// 常用
		vscode.commands.registerCommand('dota2tools.dota2api.overview', () => {
			let overviewClassList: { [k: string]: any; } = {};
			let overviewEnumList: { [k: string]: any; } = {};
			for (const className in this.classList) {
				const funList = this.classList[className];
				for (let i = 0; i < overviewList.class.length; i++) {
					const overviewClassName: string = overviewList.class[i];
					if (className === overviewClassName) {
						overviewClassList[className] = funList;
					}
				}
			}
			for (const enumName in this.enumList) {
				const enumArr = this.enumList[enumName];
				for (let i = 0; i < overviewList.enum.length; i++) {
					const overviewEnumName: string = overviewList.enum[i];
					if (enumName === overviewEnumName) {
						overviewEnumList[enumName] = enumArr;
					}
				}
			}
			this.classList = overviewClassList;
			this.enumList = overviewEnumList;
			this._onDidChangeTreeData.fire(undefined);
		});
		// 更新日志
		vscode.commands.registerCommand("dota2tools.dota2api.changelog", async () => {
			vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'lua_api_changelog.md')));
		});
		// 清除筛选
		vscode.commands.registerCommand("dota2tools.dota2api.clearfilter", async () => {
			this.refreshRawData();
			this._onDidChangeTreeData.fire(undefined);
		});
		// 全部缩起
		vscode.commands.registerCommand("dota2tools.dota2api.collapse", async () => {
			let classList = this.classList;
			let enumList = this.enumList;
			this.classList = {};
			this.enumList = {};
			this._onDidChangeTreeData.fire(undefined);
			setTimeout(() => {
				this.classList = classList;
				this.enumList = enumList;
				this._onDidChangeTreeData.fire(undefined);
			}, 10);
			// context.workspaceState.update('expanded', false);
			// vscode.commands.executeCommand('setContext', 'dota2tools-expanded', context.workspaceState.get('expanded', false));
		});
		// 输入过滤词搜索API
		vscode.commands.registerCommand("dota2tools.dota2api.filter", async () => {
			vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
				let classList = this.dotaApiNote.getClassList();
				let enumList = this.dotaApiNote.getEnumList();
				if (msg !== undefined) {
					let filterClassList: any = {};
					let filterEnumList: any = {};

					for (const className in classList) {
						const funList = classList[className];
						const filterWordList = msg.split(" ");
						const filterResult = filterWordList.every((word) => {
							return className.search(new RegExp(word, 'i')) !== -1;
						});
						const filterClassName = filterResult;
						// className.search(new RegExp(msg, 'i')) !== -1 ? true : false;
						for (let i = 0; i < funList.length; i++) {
							const funInfo = funList[i];
							const funcResult = filterWordList.every((word) => {
								return funInfo.function.search(new RegExp(word, 'i')) !== -1;
							});
							if (funcResult || filterClassName === true) {
								if (filterClassList[className] === undefined) {
									filterClassList[className] = [];
								}
								filterClassList[className].push(funInfo);
							}
						}
					}
					for (const enumName in enumList) {
						const enumArr = enumList[enumName];
						const filterWordList = msg.split(" ");
						const filterResult = filterWordList.every((word) => {
							return enumName.search(new RegExp(word, 'i')) !== -1;
						});
						const filterEnumName = filterResult;
						// enumName.search(new RegExp(msg, 'i')) !== -1 ? true : false;
						for (let i = 0; i < enumArr.length; i++) {
							const enumInfo = enumArr[i];
							const enumResult = filterWordList.every((word) => {
								return enumInfo.name.search(new RegExp(word, 'i')) !== -1;
							});
							const enumFunctionResult = filterWordList.every((word) => {
								if (enumInfo.function) {
									return enumInfo.function.search(new RegExp(word, 'i')) !== -1;
								}
								return false;
							});
							if (enumResult || enumFunctionResult || filterEnumName === true) {
								if (filterEnumList[enumName] === undefined) {
									filterEnumList[enumName] = [];
								}
								filterEnumList[enumName].push(enumInfo);
							}
						}
					}
					this.classList = filterClassList;
					this.enumList = filterEnumList;
					this._onDidChangeTreeData.fire(undefined);
				}
			});
		});
		// 查看API详细信息
		vscode.commands.registerCommand("dota2tools.api_browser", async (funInfo, infoType: APIType, name) => {
			if (this.apiBrowserView === undefined) {
				this.apiBrowserView = vscode.window.createWebviewPanel(
					'APIBrowser', // viewType
					"API Browser", // 视图标题
					vscode.ViewColumn.One, // 显示在编辑器的哪个部位
					{
						enableScripts: true, // 启用JS，默认禁用
						retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
						enableFindWidget: true
					}
				);
				this.apiBrowserView.onDidDispose(() => {
					this.apiBrowserView = undefined;
				});
			}
			if (this.apiBrowserView.active === false) {
				this.apiBrowserView.reveal(vscode.ViewColumn.One);
			}
			this.apiBrowserView.webview.postMessage({
				type: infoType,
				data: funInfo,
				name: name
			});
			this.apiBrowserView.webview.html = await getWebviewContent(this.apiBrowserView.webview, context.extensionUri, 'apiBrowser');
			if (infoType === APIType.function) {
				vscode.env.clipboard.writeText(funInfo.function);
				showStatusBarMessage('复制到剪切板：' + funInfo.function);
			} else if (infoType === APIType.enum) {
				vscode.env.clipboard.writeText(funInfo.name);
				showStatusBarMessage('复制到剪切板：' + funInfo.name);
			}
			if (infoType === APIType.function) {
				this.apiBrowserView.webview.postMessage({
					type: infoType,
					data: funInfo,
				});
				this.dotaApiNote.getFunctionNote(funInfo, results => {
					if (this.apiBrowserView !== undefined) {
						this.apiBrowserView.webview.postMessage({
							type: infoType,
							data: results,
						});
					}
				});
			}
			if (infoType === APIType.enum) {
				this.apiBrowserView.webview.postMessage({
					type: infoType,
					data: funInfo,
				});
				this.dotaApiNote.getEnumNote(funInfo, results => {
					if (this.apiBrowserView !== undefined) {
						this.apiBrowserView.webview.postMessage({
							type: infoType,
							data: results,
						});
					}
				});
			}
		});
	}
	/** 获取原始数据 */
	refreshRawData() {
		this.apiNote = this.dotaApiNote.getApiNote();
		this.classList = this.dotaApiNote.getClassList();
		this.enumList = this.dotaApiNote.getEnumList();
	}

	getTreeItem(element: NodeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		if (element) {
			if (element.itemType === ItemType.class) {
				let funcItems = [];
				for (const funcName in this.classList[element.label]) {
					let funcData = this.classList[element.label][funcName];

					funcItems.push(new NodeItem(funcData.function, vscode.TreeItemCollapsibleState.None, ItemType.function, undefined, funcData.description, {
						command: 'dota2tools.api_browser',
						title: '',
						arguments: [funcData, APIType.function, funcName]
					}));
				}
				return Promise.resolve(funcItems);
			} else if (element.itemType === ItemType.constants) {
				let enumTypeItems = [];
				for (const enumName in this.enumList) {
					enumTypeItems.push(new NodeItem(enumName, vscode.TreeItemCollapsibleState.Collapsed, ItemType.enumType, this.enumList[enumName].description_lite));
				}
				return Promise.resolve(enumTypeItems);
			} else if (element.itemType === ItemType.enumType) {	// 常量类型
				let enumItems = [];
				for (let i = 0; i < this.enumList[element.label].length; i++) {
					let enumItem = this.enumList[element.label][i];
					enumItems.push(new NodeItem(enumItem.name, vscode.TreeItemCollapsibleState.None, ItemType.enum, enumItem.description_lite, enumItem.description_lite || enumItem.description, {
						command: 'dota2tools.api_browser',
						title: '',
						arguments: [enumItem, APIType.enum]
					}));
				}
				return Promise.resolve(enumItems);
			} else if (element.itemType === ItemType.enum) {	// 常量
			} else if (element.itemType === ItemType.function) {
			}
			return Promise.resolve([]);
		} else {
			let classItems = [];
			for (const className in this.classList) {
				classItems.push(new NodeItem(className, vscode.TreeItemCollapsibleState.Collapsed, ItemType.class, this.apiNote[className] === undefined ? undefined : this.apiNote[className].description));
			}
			if (Object.keys(this.enumList).length > 0) {
				classItems.push(new NodeItem('Constants', vscode.TreeItemCollapsibleState.Collapsed, ItemType.constants));
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
	arguments: any;
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