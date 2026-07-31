import * as vscode from 'vscode';
import * as path from 'path';
import { EventManager, EventType } from '../Class/event';
import { KvEditorProvider } from '../CustomTextEditorProvider/kvEditorProvider';
import { KvEditorTreeProvider } from '../TreeDataProvider/kvTree';
import { KvEditorSettings, readKvEditorSettings } from './kvEditorConfig';

let controller: KvEditorController | undefined;
let coreRegistered = false;

/** Provider and public commands must exist even when the optional explorer module is disabled. */
export function kvEditorCoreInit(context: vscode.ExtensionContext): void {
	if (coreRegistered) {return;}
	context.subscriptions.push(
		KvEditorProvider.register(context),
		vscode.commands.registerCommand('dota2tools.kvEditor.openFile', (uri?: vscode.Uri) => openKvEditorFile(uri)),
		vscode.commands.registerCommand('dota2tools.kvEditor.switchVersion', () => switchKvEditorVersion()),
	);
	coreRegistered = true;
}

/** Optional KV explorer tree module. */
export async function kvEditorInit(context: vscode.ExtensionContext) {
	kvEditorCoreInit(context);
	if (!controller) {
		controller = new KvEditorController(context);
		context.subscriptions.push(controller);
	} else {
		controller.refresh();
	}
}

class KvEditorController implements vscode.Disposable {
	private readonly treeProvider: KvEditorTreeProvider;
	private readonly treeView: vscode.TreeView<vscode.TreeItem>;
	private configurationListenerId: number | undefined;
	private currentSettings: KvEditorSettings | undefined;

	constructor(private readonly context: vscode.ExtensionContext) {
		this.currentSettings = readKvEditorSettings();
		this.treeProvider = new KvEditorTreeProvider(context, this.currentSettings);
		this.treeView = vscode.window.createTreeView('kv_explorer', { treeDataProvider: this.treeProvider, showCollapseAll: true });
		this.context.subscriptions.push(this.treeView);

		this.configurationListenerId = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(
			EventType.EVENT_ON_DID_CHANGE_CONFIGURATION,
			(event) => this.handleConfigurationChange(event)
		);
	}

	refresh() {
		this.currentSettings = readKvEditorSettings();
		this.treeProvider.updateSettings(this.currentSettings);
	}

	dispose(): void {
		if (this.configurationListenerId !== undefined) {
			EventManager.stopListenToEvent(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, this.configurationListenerId);
		}
		this.treeProvider.dispose();
	}

	private handleConfigurationChange(event: vscode.ConfigurationChangeEvent) {
		if (!event.affectsConfiguration('dota2-tools.A10.kv_editor')) {
			return;
		}
		this.refresh();
	}
}

function getActiveKvResource(): vscode.Uri | undefined {
	const textDocumentUri = vscode.window.activeTextEditor?.document.uri;
	if (textDocumentUri) {return textDocumentUri;}
	const windowWithTabs = vscode.window as typeof vscode.window & {
		tabGroups?: { activeTabGroup?: { activeTab?: { input?: unknown } } };
	};
	const input = windowWithTabs.tabGroups?.activeTabGroup?.activeTab?.input;
	if (!input || typeof input !== 'object') {return undefined;}
	for (const property of ['uri', 'modified', 'original'] as const) {
		const candidate = (input as Record<string, unknown>)[property];
		if (candidate instanceof vscode.Uri) {return candidate;}
	}
	return undefined;
}

async function openKvEditorFile(uri?: vscode.Uri): Promise<void> {
	const resource = uri ?? getActiveKvResource();
	if (!resource) {
		void vscode.window.showWarningMessage('Open a KV file before launching KvEditor.');
		return;
	}
	await vscode.commands.executeCommand('vscode.openWith', resource, 'dota2tools.kv');
}

async function switchKvEditorVersion(): Promise<void> {
	const resource = getActiveKvResource();
	const configuration = vscode.workspace.getConfiguration('dota2-tools.A10.kv_editor', resource);
	const current = configuration.get<'legacy' | 'v2'>('version', 'legacy');
	const selected = await vscode.window.showQuickPick([
		{ label: 'KvEditor V2 (Solid + TypeScript)', value: 'v2' as const, description: current === 'v2' ? 'Current' : undefined },
		{ label: 'Legacy KvEditor', value: 'legacy' as const, description: current === 'legacy' ? 'Current' : undefined },
	], { placeHolder: 'Select the KvEditor implementation' });
	if (!selected) {return;}
	if (selected.value !== current) {
		await configuration.update('version', selected.value, vscode.ConfigurationTarget.Workspace);
	}
	if (resource && ['.kv', '.txt'].includes(path.extname(resource.fsPath).toLowerCase())) {
		await vscode.commands.executeCommand('vscode.openWith', resource, 'dota2tools.kv');
		return;
	}
	void vscode.window.showInformationMessage('KvEditor version updated. Open a KV file to apply it.');
}
