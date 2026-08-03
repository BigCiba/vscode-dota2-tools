/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { DotaApiNote } from '../Class/DotaApiNote';
import { showStatusBarMessage } from '../module/statusBar';
import type {
	ApiBrowserCatalog,
	ApiBrowserEntry,
	ApiBrowserGroup,
	ApiBrowserGroupKind,
	ApiBrowserListLocation,
	ApiBrowserPayload,
	ApiBrowserSelection,
	ApiBrowserSource,
	ApiBrowserSurface,
	ApiBrowserWebviewMessage,
} from '../types/apiBrowserWebviewMessages';
import { getBundledWebviewContent } from '../utils/getBundledWebviewContent';

type JsApiRecord = Record<string, {
	Function?: string;
	Enumerator?: string;
	Signature?: string;
	Description?: string;
	Value?: string | number;
}>;

type CssValueRecord = Record<string, { description?: string; }>;

const listLocationStateKey = 'apiBrowser.listLocation';
let sharedPanel: ApiBrowserPanel | undefined;

export function getApiBrowserPanel(context: vscode.ExtensionContext, dotaApiNote: DotaApiNote): ApiBrowserPanel {
	if (!sharedPanel) {
		sharedPanel = new ApiBrowserPanel(context, dotaApiNote);
	}
	return sharedPanel;
}

export class ApiBrowserPanel {
	private panel: vscode.WebviewPanel | undefined;
	private sidebarView: vscode.WebviewView | undefined;
	private pendingSelection: ApiBrowserSelection | undefined;
	private readonly readyWebviews = new Set<vscode.Webview>();
	private readonly jsApiData: Record<string, JsApiRecord>;
	private listLocation: ApiBrowserListLocation;

	constructor(
		private readonly context: vscode.ExtensionContext,
		private readonly dotaApiNote: DotaApiNote,
	) {
		this.jsApiData = JSON.parse(fs.readFileSync(
			path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'),
			'utf-8',
		));
		this.listLocation = context.globalState.get<ApiBrowserListLocation>(listLocationStateKey, 'sidebar');
		context.subscriptions.push(vscode.window.registerWebviewViewProvider(
			'dota2UnifiedApiExplorer',
			{ resolveWebviewView: (view) => this.resolveSidebarView(view) },
			{ webviewOptions: { retainContextWhenHidden: true } },
		));
	}

	async open(selection: ApiBrowserSelection): Promise<void> {
		this.pendingSelection = selection;
		if (!this.panel) {
			this.panel = vscode.window.createWebviewPanel(
				'dota2tools.apiBrowser',
				'API Browser',
				vscode.ViewColumn.One,
				{ enableScripts: true, retainContextWhenHidden: true, enableFindWidget: true },
			);
			const webview = this.panel.webview;
			this.panel.onDidDispose(() => {
				this.readyWebviews.delete(webview);
				this.panel = undefined;
			});
			await this.configureWebview(webview, 'panel');
			return;
		}

		this.panel.reveal(vscode.ViewColumn.One);
		if (this.readyWebviews.has(this.panel.webview)) {
			await this.panel.webview.postMessage({ type: 'navigate', selection });
		}
	}

	runCatalogAction(source: ApiBrowserSource, action: 'setQuery' | 'collapse' | 'overview', query?: string): void {
		for (const webview of this.readyWebviews) {
			void webview.postMessage({ type: 'catalogAction', source, action, query });
		}
		if (this.listLocation === 'sidebar') {
			void vscode.commands.executeCommand('dota2UnifiedApiExplorer.focus');
		}
	}

	refreshCatalog(): void {
		for (const webview of this.readyWebviews) {
			void webview.postMessage({
				type: 'initialize',
				payload: this.createPayload(),
				surface: webview === this.sidebarView?.webview ? 'sidebar' : 'panel',
				listLocation: this.listLocation,
			});
		}
	}

	private async resolveSidebarView(view: vscode.WebviewView): Promise<void> {
		this.sidebarView = view;
		const webview = view.webview;
		view.onDidDispose(() => {
			this.readyWebviews.delete(webview);
			if (this.sidebarView === view) this.sidebarView = undefined;
		});
		await this.configureWebview(webview, 'sidebar');
	}

	private async configureWebview(webview: vscode.Webview, surface: ApiBrowserSurface): Promise<void> {
		webview.options = { enableScripts: true };
		webview.onDidReceiveMessage((message: ApiBrowserWebviewMessage) => {
			void this.handleMessage(webview, surface, message);
		});
		webview.html = await getBundledWebviewContent(webview, this.context.extensionUri, 'api-browser');
	}

	private async handleMessage(
		webview: vscode.Webview,
		surface: ApiBrowserSurface,
		message: ApiBrowserWebviewMessage,
	): Promise<void> {
		if (message.type === 'ready') {
			if (surface === 'sidebar') {
				await vscode.commands.executeCommand('setContext', 'dota2tools.apiBrowser.source', message.source);
			}
			this.readyWebviews.add(webview);
			await webview.postMessage({
				type: 'initialize',
				payload: this.createPayload(),
				surface,
				listLocation: this.listLocation,
				selection: surface === 'panel' ? this.pendingSelection : undefined,
			});
			return;
		}

		if (message.type === 'sourceChanged') {
			if (surface === 'sidebar') {
				await vscode.commands.executeCommand('setContext', 'dota2tools.apiBrowser.source', message.source);
			}
			return;
		}

		if (message.type === 'copy') {
			await vscode.env.clipboard.writeText(message.text);
			showStatusBarMessage(`复制到剪切板：${message.text}`);
			await webview.postMessage({ type: 'copyComplete', text: message.text });
			return;
		}

		if (message.type === 'openChangelog') {
			await vscode.commands.executeCommand('dota2tools.lua_api_changelog');
			return;
		}

		if (message.type === 'openSelection') {
			await this.open(message.selection);
			return;
		}

		if (message.type === 'setListLocation') {
			this.listLocation = message.listLocation;
			await this.context.globalState.update(listLocationStateKey, this.listLocation);
			for (const readyWebview of this.readyWebviews) {
				void readyWebview.postMessage({ type: 'preferencesChanged', listLocation: this.listLocation });
			}
			if (this.listLocation === 'sidebar') {
				void vscode.commands.executeCommand('dota2UnifiedApiExplorer.focus');
			} else {
				void vscode.commands.executeCommand('workbench.action.closeSidebar');
			}
			return;
		}

		if (message.type === 'saveEntry') {
			const savedEntry = this.saveEntry(message.entry);
			for (const readyWebview of this.readyWebviews) {
				void readyWebview.postMessage({ type: 'saveComplete', entry: savedEntry });
			}
			showStatusBarMessage(`已保存：${savedEntry.name}`);
		}
	}

	private saveEntry(entry: ApiBrowserEntry): ApiBrowserEntry {
		if (!entry.editable) return entry;

		if (entry.source === 'css') {
			const value = Object.fromEntries((entry.cssValues ?? []).filter((item) => item.name.trim()).map((item) => [item.name, { description: item.description }]));
			this.dotaApiNote.updataCssNote({
				class: entry.name,
				description: entry.description,
				example: entry.example,
				value,
			});
			return entry;
		}

		if (entry.source !== 'lua') return entry;
		if (entry.kind === 'function') {
			const params = Object.fromEntries(entry.params.map((param) => [param.key, {
				type: param.type,
				params_name: param.name,
				description: param.description,
			}]));
			this.dotaApiNote.updataFunctionNote({
				class: entry.serverClass || entry.groupName,
				class_cl: entry.clientClass,
				function: entry.name,
				return: entry.returnType,
				description: entry.description,
				example: entry.example,
				server: entry.server,
				client: entry.client,
				params,
			});
			return entry;
		}

		this.dotaApiNote.updataEnumNote({
			class: entry.groupName,
			name: entry.name,
			value: entry.value === undefined ? undefined : String(entry.value),
			function: entry.functionName,
			description: entry.description,
			description_lite: entry.conciseDescription,
			example: entry.example,
		});
		return entry;
	}

	private createPayload(): ApiBrowserPayload {
		return {
			lua: this.createLuaCatalog(),
			javascript: this.createJsCatalog(),
			css: this.createCssCatalog(),
		};
	}

	private createLuaCatalog(): ApiBrowserCatalog {
		const apiNote = this.dotaApiNote.getApiNote();
		const groups: ApiBrowserGroup[] = [];
		for (const [className, functions] of Object.entries(this.dotaApiNote.getClassList())) {
			const groupId = createGroupId('lua', 'class', className);
			const classNote = apiNote[className] ?? {};
			groups.push({
				id: groupId,
				source: 'lua',
				kind: 'class',
				name: className,
				description: classNote.description ?? '',
				extends: classNote.extends ?? '',
				variable: classNote.variable ?? '',
				entries: (functions as LuaFunction[]).map((func) => createLuaFunctionEntry(func, groupId, className)),
			});
		}
		for (const [enumType, enumValues] of Object.entries(this.dotaApiNote.getEnumList())) {
			const groupId = createGroupId('lua', 'enum', enumType);
			groups.push({
				id: groupId,
				source: 'lua',
				kind: 'enum',
				name: enumType,
				description: apiNote[enumType]?.description ?? '',
				entries: (enumValues as LuaEnum[]).map((item) => createLuaEnumEntry(item, groupId, enumType)),
			});
		}
		return createCatalog(groups);
	}

	private createJsCatalog(): ApiBrowserCatalog {
		const groups = Object.entries(this.jsApiData).map(([groupName, values]): ApiBrowserGroup => {
			const records = Object.values(values);
			const isEnum = records.length > 0 && !records[0].Function && Boolean(records[0].Enumerator);
			const kind = isEnum ? 'enum' : 'class';
			const groupId = createGroupId('javascript', kind, groupName);
			return {
				id: groupId,
				source: 'javascript',
				kind,
				name: groupName,
				description: '',
				entries: Object.entries(values).map(([entryKey, value]): ApiBrowserEntry => {
					const name = value.Function || value.Enumerator || entryKey;
					return {
						id: createEntryId('javascript', isEnum ? 'enum' : 'function', groupName, name),
						source: 'javascript',
						kind: isEnum ? 'enum' : 'function',
						groupId,
						groupName,
						name,
						signature: value.Signature || (isEnum ? `${name} = ${value.Value ?? ''}` : `${name}()`),
						description: value.Description || '',
						value: value.Value,
						params: [],
						editable: false,
					};
				}),
			};
		});
		return createCatalog(groups);
	}

	private createCssCatalog(): ApiBrowserCatalog {
		const categoryMap = new Map<string, ApiBrowserEntry[]>();
		for (const [propertyName, rawInfo] of Object.entries(this.dotaApiNote.getCssApiNote())) {
			const info = rawInfo as CssProperty;
			const category = categorizeCssProperty(propertyName);
			const groupId = createGroupId('css', 'css', category);
			const cssValues = Object.entries((info.value ?? {}) as CssValueRecord).map(([name, value]) => ({
				name,
				description: value.description ?? '',
			}));
			const entry: ApiBrowserEntry = {
				id: createEntryId('css', 'property', category, propertyName),
				source: 'css',
				kind: 'property',
				groupId,
				groupName: category,
				name: propertyName,
				signature: `${propertyName}: ${cssValues.length > 0 ? cssValues.map((item) => item.name).join(' | ') : '<value>'};`,
				description: cleanCssDescription(info.description),
				params: [],
				cssValues,
				example: info.example,
				editable: true,
			};
			categoryMap.set(category, [...(categoryMap.get(category) ?? []), entry]);
		}
		const groups = [...categoryMap.entries()].map(([category, entries]): ApiBrowserGroup => ({
			id: createGroupId('css', 'css', category),
			source: 'css',
			kind: 'css',
			name: category,
			description: `${category} related Panorama style properties.`,
			entries,
		}));
		return createCatalog(groups);
	}
}

function createCatalog(groups: ApiBrowserGroup[]): ApiBrowserCatalog {
	return { groups, entryCount: groups.reduce((total, group) => total + group.entries.length, 0) };
}

function createLuaFunctionEntry(func: LuaFunction, groupId: string, className: string): ApiBrowserEntry {
	const params = Object.entries(func.params ?? {}).map(([key, value]) => ({
		key,
		name: value.params_name || key,
		type: value.type || 'any',
		description: value.description || '',
	}));
	return {
		id: createEntryId('lua', 'function', className, func.function || ''),
		source: 'lua',
		kind: 'function',
		groupId,
		groupName: className,
		name: func.function || '',
		signature: `${func.function || ''}(${params.map((param) => `${param.name}: ${param.type}`).join(', ')}): ${func.return || 'void'}`,
		description: func.description || '',
		returnType: func.return || 'void',
		params,
		example: func.example,
		server: func.server,
		client: func.client,
		serverClass: func.class || className,
		clientClass: func.class_cl,
		editable: true,
	};
}

function createLuaEnumEntry(item: LuaEnum, groupId: string, enumType: string): ApiBrowserEntry {
	return {
		id: createEntryId('lua', 'enum', enumType, item.name || ''),
		source: 'lua',
		kind: 'enum',
		groupId,
		groupName: enumType,
		name: item.name || '',
		signature: `${item.name || ''} = ${item.value ?? ''}`,
		description: item.description || item.description_lite || '',
		conciseDescription: item.description_lite,
		value: item.value,
		functionName: item.function,
		params: [],
		example: item.example,
		editable: true,
	};
}

function categorizeCssProperty(name: string): string {
	if (/^(background|wash|opacity-mask)/.test(name)) return 'Background';
	if (/^border/.test(name)) return 'Border';
	if (/^(font|text|letter|line-height|color|white-space)/.test(name)) return 'Typography';
	if (/^(margin|padding)/.test(name)) return 'Spacing';
	if (/^(width|height|min-|max-)/.test(name)) return 'Sizing';
	if (/^(position|x$|y$|z$|z-index|align|flow|layout|overflow|visibility|ignore-parent-flow)/.test(name)) return 'Layout';
	if (/^(transform|pre-transform|perspective|ui-scale)/.test(name)) return 'Transform';
	if (/^(animation|transition)/.test(name)) return 'Animation';
	if (/^(blur|brightness|contrast|hue|saturation|shadow|img-shadow|texture|world-blur|clip)/.test(name)) return 'Effects';
	if (/^(sound|tooltip|context-menu)/.test(name)) return 'Interaction';
	return 'Other';
}

function cleanCssDescription(description?: string): string {
	if (!description) return '';
	const decoded = description
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&');
	return decoded === '<Needs a description>' ? '' : decoded;
}

export function createGroupId(source: ApiBrowserSource, kind: ApiBrowserGroupKind, name: string): string {
	return `${source}:${kind}:${name}`;
}

export function createEntryId(source: ApiBrowserSource, kind: ApiBrowserEntry['kind'], groupName: string, name: string): string {
	return `${source}:${kind}:${groupName}:${name}`;
}
