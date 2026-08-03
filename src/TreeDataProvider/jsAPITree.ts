/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { showStatusBarMessage } from '../module/statusBar';
import { getDotaApiNoteClass } from '../module/apiNote';
import { createEntryId, createGroupId, getApiBrowserPanel } from '../webview/ApiBrowserPanel';

enum APIType { class = 'class', function = 'function', enum = 'enum', enumType = 'enum_type' }

type JsApiValue = { Function?: string; Enumerator?: string; Signature?: string; Description?: string; Value?: string; };
type JsApiData = Record<string, Record<string, JsApiValue>>;

export class JsApiTreeProvider implements vscode.TreeDataProvider<NodeItem> {
	apiTreeData: JsApiData;
	filteredApiTreeData: JsApiData | undefined;
	public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<NodeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext) {
		this.apiTreeData = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		const apiBrowser = getApiBrowserPanel(context, getDotaApiNoteClass());
		const register = (command: string, callback: (...args: any[]) => unknown) => {
			context.subscriptions.push(vscode.commands.registerCommand(command, callback));
		};

		register('dota2tools.dota2jsapi.copy', async (data) => {
			await vscode.env.clipboard.writeText(data.label);
			showStatusBarMessage(`复制到剪切板：${data.label}`);
		});
		register('dota2tools.dota2jsapi.list', async (nodeItem: NodeItem) => {
			await apiBrowser.open({ source: 'javascript', groupId: createGroupId('javascript', this.getGroupKind(nodeItem.label), nodeItem.label) });
		});
		register('dota2tools.dota2jsapi.filter', async () => {
			const query = await vscode.window.showInputBox({ prompt: '输入过滤词搜索 API' });
			if (query !== undefined) {apiBrowser.runCatalogAction('javascript', 'setQuery', query);}
		});
		register('dota2tools.dota2jsapi.clearfilter', () => {
			apiBrowser.runCatalogAction('javascript', 'setQuery', '');
		});
		register('dota2tools.dota2jsapi.expand', () => {
			this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
			this._onDidChangeTreeData.fire(undefined);
			void context.workspaceState.update('js-expanded', true);
			void vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', true);
		});
		register('dota2tools.dota2jsapi.collapse', async () => {
			this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			await context.workspaceState.update('js-expanded', false);
			await vscode.commands.executeCommand('setContext', 'dota2tools-js-expanded', false);
			apiBrowser.runCatalogAction('javascript', 'collapse');
		});
		register('dota2tools.js_api_browser.copy', async (name) => {
			await vscode.env.clipboard.writeText(name);
			showStatusBarMessage(`复制到剪切板：${name}`);
		});
		register('dota2tools.js_api_browser', async (data: Record<string, JsApiValue> | JsApiValue, infoType: APIType, groupName?: string) => {
			if (!groupName) {return;}
			const groupKind = this.getGroupKind(groupName);
			const value = data as JsApiValue;
			const entryName = value.Function || value.Enumerator;
			await apiBrowser.open({
				source: 'javascript',
				groupId: createGroupId('javascript', groupKind, groupName),
				entryId: infoType === APIType.function && entryName
					? createEntryId('javascript', value.Enumerator ? 'enum' : 'function', groupName, entryName)
					: undefined,
			});
		});
	}

	private getGroupKind(groupName: string): 'class' | 'enum' {
		const first = Object.values(this.apiTreeData[groupName] ?? {})[0];
		return first?.Enumerator && !first.Function ? 'enum' : 'class';
	}

	private applyFilter(query: string): void {
		const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
		const matches = (value: string) => words.every((word) => value.toLocaleLowerCase().includes(word));
		this.filteredApiTreeData = {};
		for (const [groupName, entries] of Object.entries(this.apiTreeData)) {
			if (matches(groupName)) {
				this.filteredApiTreeData[groupName] = entries;
				continue;
			}
			const filteredEntries = Object.fromEntries(Object.entries(entries).filter(([entryName, entry]) => matches(`${entryName} ${entry.Signature ?? ''} ${entry.Description ?? ''}`)));
			if (Object.keys(filteredEntries).length > 0) {this.filteredApiTreeData[groupName] = filteredEntries;}
		}
		this._onDidChangeTreeData.fire(undefined);
	}

	refresh(): void { this._onDidChangeTreeData.fire(undefined); }
	rebuild(): void { this._onDidChangeTreeData.fire(undefined); }
	getTreeItem(element: NodeItem): vscode.TreeItem { return element; }

	getChildren(element?: NodeItem): Thenable<NodeItem[]> {
		const data = this.filteredApiTreeData ?? this.apiTreeData;
		if (!element) {
			return Promise.resolve(Object.keys(data).map((groupName) => new NodeItem(groupName, this.collapsibleState, ItemType.class)));
		}
		if (element.itemType !== ItemType.class) {return Promise.resolve([]);}
		return Promise.resolve(Object.values(data[element.label] ?? {}).map((entry) => {
			const name = entry.Function || entry.Enumerator || '';
			return new NodeItem(
				name,
				vscode.TreeItemCollapsibleState.None,
				ItemType.function,
				entry.Description,
				entry.Signature,
				{ command: 'dota2tools.js_api_browser', title: '', arguments: [entry, APIType.function, element.label] },
			);
		}));
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
		this.iconPath = path.join(__filename, '..', '..', 'images', itemType === ItemType.function ? 'function.svg' : 'class.svg');
		this.contextValue = itemType === ItemType.function ? 'NodeItem' : 'Class';
	}
}
