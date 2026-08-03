import * as path from 'path';
import * as vscode from 'vscode';
import { DotaApiNote } from '../Class/DotaApiNote';
import { showStatusBarMessage } from '../module/statusBar';
import { createEntryId, createGroupId, getApiBrowserPanel } from '../webview/ApiBrowserPanel';

enum APIType {
	class = 'class',
	function = 'function',
	enum = 'enum',
	enumType = 'enum_type',
}

const overviewList: { class: string[]; enum: string[]; } = {
	class: [
		'CDOTABaseAbility', 'CDOTA_Ability_Lua', 'CDOTA_BaseNPC', 'CDOTA_BaseNPC_Hero',
		'CDOTA_Item', 'CDOTA_Item_Lua', 'CDOTA_Buff', 'CDOTA_Modifier_Lua',
		'CScriptParticleManager',
	],
	enum: ['modifierfunction', 'modifierstate'],
};

export class ApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiNote: Table;
	classList: Table;
	enumList: Table;
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.apiNote = dotaApiNote.getApiNote();
		this.classList = dotaApiNote.getClassList();
		this.enumList = dotaApiNote.getEnumList();
		const apiBrowser = getApiBrowserPanel(context, dotaApiNote);
		const register = (command: string, callback: (...args: any[]) => unknown) => {
			context.subscriptions.push(vscode.commands.registerCommand(command, callback));
		};

		register('dota2tools.dota2api.copy', async (data) => {
			await vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage(`复制到剪切板：${data.label}`);
		});

		register('dota2tools.dota2api.edit', async (nodeItem: NodeItem) => {
			const [data, type] = nodeItem.command?.arguments ?? [];
			if (!data || (type !== APIType.function && type !== APIType.enum)) {return;}
			const groupName = data.class;
			await apiBrowser.open({
				source: 'lua',
				groupId: createGroupId('lua', type === APIType.enum ? 'enum' : 'class', groupName),
				entryId: createEntryId('lua', type === APIType.enum ? 'enum' : 'function', groupName, type === APIType.enum ? data.name : data.function),
				edit: true,
			});
		});

		register('dota2tools.dota2api.list', async (nodeItem: NodeItem) => {
			await apiBrowser.open({
				source: 'lua',
				groupId: createGroupId('lua', nodeItem.itemType === ItemType.class ? 'class' : 'enum', nodeItem.label),
			});
		});

		register('dota2tools.dota2api.overview', () => {
			apiBrowser.runCatalogAction('lua', 'overview');
		});

		register('dota2tools.dota2api.changelog', async () => {
			await vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(path.join(context.extensionPath, 'resource', 'lua_api_changelog.md')));
		});
		register('dota2tools.dota2api.clearfilter', () => {
			apiBrowser.runCatalogAction('lua', 'setQuery', '');
		});
		register('dota2tools.dota2api.collapse', () => apiBrowser.runCatalogAction('lua', 'collapse'));
		register('dota2tools.dota2api.filter', async () => {
			const query = await vscode.window.showInputBox({ prompt: '输入过滤词搜索 API' });
			if (query !== undefined) {apiBrowser.runCatalogAction('lua', 'setQuery', query);}
		});

		register('dota2tools.api_browser', async (data, type: APIType, name?: string) => {
			const groupName = type === APIType.function || type === APIType.enum ? data.class : name;
			if (!groupName) {return;}
			const groupKind = type === APIType.enum || type === APIType.enumType ? 'enum' : 'class';
			await apiBrowser.open({
				source: 'lua',
				groupId: createGroupId('lua', groupKind, groupName),
				entryId: type === APIType.function
					? createEntryId('lua', 'function', groupName, data.function)
					: type === APIType.enum
						? createEntryId('lua', 'enum', groupName, data.name)
						: undefined,
			});
		});
	}

	private applyFilter(query: string): void {
		const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
		const matches = (value: string) => words.every((word) => value.toLocaleLowerCase().includes(word));
		this.classList = {};
		this.enumList = {};

		for (const [className, functions] of Object.entries(this.dotaApiNote.getClassList())) {
			const groupMatches = matches(className);
			const filtered = (functions as LuaFunction[]).filter((func) => groupMatches || matches(`${func.function ?? ''} ${func.description ?? ''}`));
			if (filtered.length > 0) {this.classList[className] = filtered;}
		}
		for (const [enumName, values] of Object.entries(this.dotaApiNote.getEnumList())) {
			const groupMatches = matches(enumName);
			const filtered = (values as LuaEnum[]).filter((item) => groupMatches || matches(`${item.name ?? ''} ${item.function ?? ''} ${item.description_lite ?? ''} ${item.description ?? ''}`));
			if (filtered.length > 0) {this.enumList[enumName] = filtered;}
		}
		this._onDidChangeTreeData.fire(undefined);
	}

	refreshRawData(): void {
		this.apiNote = this.dotaApiNote.getApiNote();
		this.classList = this.dotaApiNote.getClassList();
		this.enumList = this.dotaApiNote.getEnumList();
		this._onDidChangeTreeData.fire(undefined);
		getApiBrowserPanel(this.context, this.dotaApiNote).refreshCatalog();
	}

	getTreeItem(element: NodeItem): vscode.TreeItem { return element; }

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		if (!element) {
			const items = Object.keys(this.classList).map((className) => new NodeItem(
				className,
				vscode.TreeItemCollapsibleState.Collapsed,
				ItemType.class,
				this.apiNote[className]?.description,
			));
			if (Object.keys(this.enumList).length > 0) {items.push(new NodeItem('Constants', vscode.TreeItemCollapsibleState.Collapsed, ItemType.constants));}
			return Promise.resolve(items);
		}

		if (element.itemType === ItemType.class) {
			return Promise.resolve((this.classList[element.label] ?? []).map((funcData: LuaFunction) => new NodeItem(
				funcData.function ?? '',
				vscode.TreeItemCollapsibleState.None,
				ItemType.function,
				undefined,
				funcData.description,
				{ command: 'dota2tools.api_browser', title: '', arguments: [funcData, APIType.function] },
			)));
		}
		if (element.itemType === ItemType.constants) {
			return Promise.resolve(Object.keys(this.enumList).map((name) => new NodeItem(name, vscode.TreeItemCollapsibleState.Collapsed, ItemType.enumType, this.apiNote[name]?.description)));
		}
		if (element.itemType === ItemType.enumType) {
			return Promise.resolve((this.enumList[element.label] ?? []).map((item: LuaEnum) => new NodeItem(
				item.name ?? '',
				vscode.TreeItemCollapsibleState.None,
				ItemType.enum,
				item.description_lite,
				item.description_lite || item.description,
				{ command: 'dota2tools.api_browser', title: '', arguments: [item, APIType.enum] },
			)));
		}
		return Promise.resolve([]);
	}
}

enum ItemType { class, function, constants, enumType, enum }

export class NodeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly itemType: ItemType,
		public readonly description?: string,
		public readonly tooltip?: string,
		public readonly command?: vscode.Command,
	) {
		super(label, collapsibleState);
		const iconName = itemType === ItemType.function ? 'function.svg'
			: itemType === ItemType.class ? 'class.svg'
				: itemType === ItemType.enum ? 'enum.svg' : 'enum_type.svg';
		this.iconPath = path.join(__filename, '..', '..', 'images', iconName);
		if (itemType === ItemType.function || itemType === ItemType.enum) {this.contextValue = 'NodeItem';}
		if (itemType === ItemType.class || itemType === ItemType.enumType) {this.contextValue = 'Class';}
	}
}
