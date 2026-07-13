import * as vscode from 'vscode';
import * as path from 'path';
import { EventManager, EventType } from '../Class/event';
import { kvEditorProvider } from '../CustomTextEditorProvider/kvEditorProvider';
import { KvEditorTreeProvider } from '../TreeDataProvider/kvTree';
import { KvEditorSettings, readKvEditorSettings } from './kvEditorConfig';

let controller: KvEditorController | undefined;
let customEditorRegistered = false;

/** 树状图模块 */
export async function kvEditorInit(context: vscode.ExtensionContext) {
	if (!customEditorRegistered) {
		context.subscriptions.push(kvEditorProvider.register(context));
		customEditorRegistered = true;
	}
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
		this.context.subscriptions.push(
			vscode.commands.registerCommand('dota2tools.kvEditor.openFile', (uri: vscode.Uri) => this.openFile(uri)),
			vscode.commands.registerCommand('dota2tools.kvEditor.switchVersion', () => this.switchVersion())
		);
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

	private async openFile(uri: vscode.Uri) {
		await vscode.commands.executeCommand('vscode.openWith', uri, 'dota2tools.kv');
	}

	private async switchVersion(): Promise<void> {
		const resource = vscode.window.activeTextEditor?.document.uri;
		const configuration = vscode.workspace.getConfiguration('dota2-tools.A10.kv_editor', resource);
		const current = configuration.get<'legacy' | 'v2'>('version', 'legacy');
		const selected = await vscode.window.showQuickPick([
			{ label: 'KvEditor V2 (Solid + TypeScript)', value: 'v2' as const, description: current === 'v2' ? 'Current' : undefined },
			{ label: 'Legacy KvEditor', value: 'legacy' as const, description: current === 'legacy' ? 'Current' : undefined },
		], { placeHolder: 'Select the KvEditor implementation' });
		if (!selected || selected.value === current) return;
		await configuration.update('version', selected.value, vscode.ConfigurationTarget.Workspace);
		if (resource && ['.kv', '.txt'].includes(path.extname(resource.fsPath).toLowerCase())) {
			await vscode.commands.executeCommand('vscode.openWith', resource, 'dota2tools.kv');
			return;
		}
		void vscode.window.showInformationMessage('KvEditor version updated. Reopen a KV file to apply it.');
	}

	private handleConfigurationChange(event: vscode.ConfigurationChangeEvent) {
		if (!event.affectsConfiguration('dota2-tools.A10.kv_editor')) {
			return;
		}
		this.refresh();
	}
}