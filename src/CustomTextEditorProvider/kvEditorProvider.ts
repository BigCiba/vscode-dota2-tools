import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { findKvEntryForUri, KvEditorEntry, KvFolderType, readKvEditorSettings } from '../module/kvEditorConfig';
import { evaluateSafeFormula, validateSafeFormula } from '../kv-editor-v2/formulaEngine';
import { assertNoFormulaCycles } from '../kv-editor-v2/formulaDependencies';
import { FormulaValueEdit, recalculateAffectedFormulas } from '../kv-editor-v2/formulaRecalculation';
import { rewriteFormulaRowReferences } from '../kv-editor-v2/formulaReferenceRewrite';
import { isValidKvEditorV2Message } from '../kv-editor-v2/protocolValidation';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';
import {
	KV_EDITOR_PROTOCOL_VERSION,
	KvEditorV2Command,
	KvEditorV2HostMessage,
	KvEditorV2Snapshot,
	KvEditorV2WebviewMessage,
} from '../types/kvEditorV2Shared';
import { getBundledWebviewContent } from '../utils/getBundledWebviewContent';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';

export class KvEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider(KvEditorProvider.viewType, new KvEditorProvider(context), {
			webviewOptions: {
				retainContextWhenHidden: true,
				enableFindWidget: true,
			}
		});
	}

	private static readonly viewType = 'dota2tools.kv';

	constructor(
		private readonly context: vscode.ExtensionContext
	) {
		this.extensionImagesRoot = this.context.asAbsolutePath('images');
		this.columnOptionConfig = this.readColumnOptionConfig();
		this.setupConfigFileWatchers();
	}

	private readonly extensionImagesRoot: string;
	private readonly columnOptionConfig: KvEditorColumnOptionMap;
	private readonly textureMenuCache = new Map<string, TextureMenuRawIcon[]>();
	private readonly localizationCache = new Map<string, LocalizationCacheEntry>();
	private readonly localizationSettingsCache = new Map<string, any>(); // 存储每个文档的本地化设置
	private readonly abilityValuesDescriptionCache = new Map<string, Map<string, Map<string, string>>>(); // 存储 AbilityValues 描述: documentKey -> rowId -> key -> description
	private readonly userSettingsCache = new Map<string, { settings: KvEditorUserSettings; mtimeMs: number; }>();
	private readonly columnOptionOverridesCache = new Map<string, { overrides: KvEditorColumnOptionsFile; mtimeMs: number; }>();
	private readonly fileWatchers = new Map<string, vscode.FileSystemWatcher>();
	private readonly trackedDocumentMutations = new Map<string, number>();
	private readonly nativeSaveLifecycleDocuments = new Set<string>();
	private readonly formulaRuntimeErrors = new Map<string, Map<string, string>>();
	private heroFilterCache: TextureMenuHeroCache[] | undefined;
	// Serialize document writes so concurrent webview messages don't clash.
	private editSequence: Promise<void> = Promise.resolve();

	private runSerializedEdit<T>(operation: () => Promise<T>): Promise<T> {
		const run = this.editSequence.then(() => operation());
		this.editSequence = run.then(
			() => undefined,
			() => undefined,
		);
		return run;
	}

	private beginTrackedDocumentMutation(document: vscode.TextDocument): void {
		const key = document.uri.toString();
		const current = this.trackedDocumentMutations.get(key) ?? 0;
		this.trackedDocumentMutations.set(key, current + 1);
	}

	private endTrackedDocumentMutation(document: vscode.TextDocument): void {
		const key = document.uri.toString();
		const current = this.trackedDocumentMutations.get(key) ?? 0;
		if (current <= 1) {
			this.trackedDocumentMutations.delete(key);
			return;
		}
		this.trackedDocumentMutations.set(key, current - 1);
	}

	private hasTrackedDocumentMutation(document: vscode.TextDocument): boolean {
		return (this.trackedDocumentMutations.get(document.uri.toString()) ?? 0) > 0;
	}

	private async runWithTrackedDocumentMutation<T>(document: vscode.TextDocument, operation: () => Thenable<T>): Promise<T> {
		this.beginTrackedDocumentMutation(document);
		try {
			return await operation();
		} finally {
			this.endTrackedDocumentMutation(document);
		}
	}

	private applyWorkspaceEditTracked(document: vscode.TextDocument, edit: vscode.WorkspaceEdit): Promise<boolean> {
		return this.runWithTrackedDocumentMutation(document, () => vscode.workspace.applyEdit(edit));
	}

	private shouldExplicitlySave(document: vscode.TextDocument, autoSaveMode: string): boolean {
		return !this.nativeSaveLifecycleDocuments.has(document.uri.toString()) && Boolean(autoSaveMode) && autoSaveMode !== 'off';
	}
	private saveDocumentTracked(document: vscode.TextDocument): Promise<boolean> {
		return this.runWithTrackedDocumentMutation(document, () => document.save());
	}

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		token: vscode.CancellationToken
	): Promise<void> {
		const version = vscode.workspace.getConfiguration('dota2-tools.A10.kv_editor', document.uri)
			.get<'legacy' | 'v2'>('version', 'legacy');
		if (version === 'v2') {
			return this.resolveV2CustomTextEditor(document, webviewPanel, token);
		}
		return this.resolveLegacyCustomTextEditor(document, webviewPanel, token);
	}

	private async resolveLegacyCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		token: vscode.CancellationToken
	): Promise<void> {
		void token;
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = await getWebviewContent(webviewPanel.webview, this.context.extensionUri, 'KvEditor');

		let webviewReady = false;
		let pendingPayload: KvEditorPayload | undefined;
		let externalChangePending = false;

		const postPayload = (payload: KvEditorPayload) => {
			if (!webviewReady) {
				pendingPayload = payload;
				return;
			}
			webviewPanel.webview.postMessage({ type: 'update', payload });
		};

		const showExternalChangeNotice = () => {
			externalChangePending = true;
			if (!webviewReady) {
				return;
			}
			webviewPanel.webview.postMessage({
				type: 'externalChangeDetected',
				payload: {
					message: '检测到该 KV 文件已被外部修改。请点击“重载”以重新加载最新内容。',
				},
			});
		};

		const clearExternalChangeNotice = () => {
			if (!externalChangePending) {
				return;
			}
			externalChangePending = false;
			if (!webviewReady) {
				return;
			}
			webviewPanel.webview.postMessage({ type: 'clearExternalChangeNotice' });
		};

		const updateWebview = () => {
			postPayload(this.buildPayload(document, webviewPanel.webview));
		};

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
			if (event.document.uri.toString() === document.uri.toString()) {
				if (!event.contentChanges.length) {
					return;
				}
				if (this.hasTrackedDocumentMutation(document)) {
					clearExternalChangeNotice();
					updateWebview();
					return;
				}
				showExternalChangeNotice();
			}
		});

		const saveDocumentSubscription = vscode.workspace.onDidSaveTextDocument((savedDocument) => {
			if (savedDocument.uri.toString() === document.uri.toString()) {
				// 在保存后自动导出本地化文件
				this.exportLocalizationOnSave(savedDocument).catch((error: unknown) => {
					console.error('Auto export localization failed:', error);
				});
			}
		});

		const messageListener = webviewPanel.webview.onDidReceiveMessage((message) => {
			if (!message || typeof message.type !== 'string') {
				return;
			}
			if (message.type === 'ready') {
				webviewReady = true;
				if (pendingPayload) {
					postPayload(pendingPayload);
					pendingPayload = undefined;
				} else {
					updateWebview();
				}
				if (externalChangePending) {
					showExternalChangeNotice();
				}
				// 检查是否需要自动更新本地化，如果导入了描述则刷新前端
				this.checkAndAutoUpdateLocalization(document, updateWebview).catch((error: unknown) => {
					console.error('Auto update localization failed:', error);
				});
				return;
			}
			if (message.type === 'editAbilityValues') {
				const abilityEditMessage: KvEditorAbilityValuesEditMessage | undefined = message.payload;
				this.handleAbilityValuesEditMessage(document, abilityEditMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'bulkEdit') {
				const bulkMessage: KvEditorBulkEditMessage | undefined = message.payload;
				this.handleBulkEditMessage(document, bulkMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'edit') {
				const editMessage: KvEditorEditMessage | undefined = message.payload;
				this.handleEditMessage(document, editMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
			}
			if (message.type === 'renameId') {
				const renameMessage: KvEditorRenameIdMessage | undefined = message.payload;
				this.handleRenameIdMessage(document, renameMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
			}
			if (message.type === 'reorderRows') {
				const reorderMessage: KvEditorReorderMessage | undefined = message.payload;
				this.handleReorderRows(document, reorderMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
			}
			if (message.type === 'insertRow') {
				const insertMessage: KvEditorInsertRowMessage | undefined = message.payload;
				this.handleInsertRow(document, insertMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'bulkInsertRows') {
				const bulkInsertMessage: KvEditorBulkInsertRowsMessage | undefined = message.payload;
				this.handleBulkInsertRows(document, bulkInsertMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'deleteRow') {
				const deleteMessage: KvEditorDeleteRowMessage | undefined = message.payload;
				this.handleDeleteRow(document, deleteMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'insertColumn') {
				const insertMessage: KvEditorInsertColumnMessage | undefined = message.payload;
				this.handleInsertColumn(document, insertMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'deleteColumn') {
				const deleteMessage: KvEditorDeleteColumnMessage | undefined = message.payload;
				this.handleDeleteColumn(document, deleteMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'reorderColumns') {
				const reorderMessage: KvEditorColumnReorderMessage | undefined = message.payload;
				this.handleReorderColumns(document, reorderMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
			}
			if (message.type === 'saveColumnWidths') {
				const saveMessage: KvEditorSaveColumnWidthsMessage | undefined = message.payload;
				this.handleSaveColumnWidths(document, saveMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'saveColumnOptions') {
				const saveMessage: KvEditorSaveColumnOptionsMessage | undefined = message.payload;
				this.handleSaveColumnOptions(document, saveMessage)
					.then(() => updateWebview())
					.catch((error: unknown) => {
						const messageText = error instanceof Error ? error.message : String(error);
						vscode.window.showErrorMessage(messageText);
					});
				return;
			}
			if (message.type === 'saveFormula') {
				const saveMessage: KvEditorSaveFormulaMessage | undefined = message.payload;
				this.handleSaveFormula(document, saveMessage)
					.then(() => updateWebview())
					.catch((error: unknown) => {
						const messageText = error instanceof Error ? error.message : String(error);
						vscode.window.showErrorMessage(messageText);
					});
				return;
			}
			if (message.type === 'saveColumnFormula') {
				const saveMessage: KvEditorSaveColumnFormulaMessage | undefined = message.payload;
				this.handleSaveColumnFormula(document, saveMessage)
					.then(() => updateWebview())
					.catch((error: unknown) => {
						const messageText = error instanceof Error ? error.message : String(error);
						vscode.window.showErrorMessage(messageText);
					});
				return;
			}
			if (message.type === 'requestTextureMenu') {
				const requestPayload: TextureMenuRequestMessage | undefined = message.payload;
				if (!requestPayload || typeof requestPayload.requestId !== 'string') {
					return;
				}
				void this.handleTextureMenuRequest(document, webviewPanel.webview, requestPayload);
				return;
			}
			if (message.type === 'openScriptFile') {
				const requestPayload: OpenScriptFileMessage | undefined = message.payload;
				void this.handleOpenScriptFile(document, requestPayload);
			}
			if (message.type === 'openTextEditor') {
				void this.handleOpenTextEditor(document);
			}
			if (message.type === 'saveCompactMode') {
				const saveMessage: KvEditorSaveCompactModeMessage | undefined = message.payload;
				this.handleSaveCompactMode(document, saveMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'saveLocalizedMode') {
				const saveMessage: KvEditorSaveLocalizedModeMessage | undefined = message.payload;
				this.handleSaveLocalizedMode(document, saveMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'saveFrozenColumns') {
				const saveMessage: KvEditorSaveFrozenColumnsMessage | undefined = message.payload;
				this.handleSaveFrozenColumns(document, saveMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'saveColumnDescription') {
				const saveMessage: KvEditorSaveColumnDescriptionMessage | undefined = message.payload;
				this.handleSaveColumnDescription(document, saveMessage).catch((error: unknown) => {
					const messageText = error instanceof Error ? error.message : String(error);
					vscode.window.showErrorMessage(messageText);
				});
				return;
			}
			if (message.type === 'openFormulaHelp') {
				void this.handleOpenFormulaHelp();
				return;
			}
			if (message.type === 'requestLocalizationPath') {
				void this.handleRequestLocalizationPath(document, webviewPanel.webview, message.payload);
				return;
			}
			if (message.type === 'saveLocalizationSettings') {
				void this.handleSaveLocalizationSettings(document, message.payload);
				return;
			}
			if (message.type === 'openLocalizationFile') {
				void this.handleOpenLocalizationFile(document, message.payload);
				return;
			}
			if (message.type === 'reloadData') {
				clearExternalChangeNotice();
				updateWebview();
				return;
			}
			if (message.type === 'saveAbilityValuesDescriptions') {
				void this.handleSaveAbilityValuesDescriptions(document, message.payload);
				return;
			}
		});

		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
			saveDocumentSubscription.dispose();
			messageListener.dispose();
		});

		updateWebview();
	}

	private async resolveV2CustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		token: vscode.CancellationToken
	): Promise<void> {
		void token;
		this.nativeSaveLifecycleDocuments.add(document.uri.toString());
		const roots = [
			vscode.Uri.joinPath(this.context.extensionUri, 'dist', 'webview'),
			vscode.Uri.joinPath(this.context.extensionUri, 'images'),
		];
		const contentDir = getContentDir();
		const gameDir = getGameDir();
		if (contentDir) {roots.push(vscode.Uri.file(contentDir));}
		if (gameDir) {roots.push(vscode.Uri.file(gameDir));}
		webviewPanel.webview.options = { enableScripts: true, localResourceRoots: roots };
		webviewPanel.webview.html = await getBundledWebviewContent(webviewPanel.webview, this.context.extensionUri, 'kv-editor');

		let ready = false;
		let executingCommand = false;
		let commandQueue: Promise<void> = Promise.resolve();
		let latestTextureRequestId: string | undefined;
		const post = (message: KvEditorV2HostMessage): Thenable<boolean> => webviewPanel.webview.postMessage(message);
		const snapshot = (): KvEditorV2Snapshot => this.buildV2Snapshot(document, webviewPanel.webview);
		const postSnapshot = (type: 'initialize' | 'documentChanged') => {
			if (ready) {void post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type, snapshot: snapshot() });}
		};

		const documentSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
			if (event.document.uri.toString() !== document.uri.toString() || !event.contentChanges.length) {return;}
			if (executingCommand || this.hasTrackedDocumentMutation(document)) {return;}
			postSnapshot('documentChanged');
		});
		const saveSubscription = vscode.workspace.onDidSaveTextDocument((savedDocument) => {
			if (savedDocument.uri.toString() !== document.uri.toString()) {return;}
			void this.exportLocalizationOnSave(savedDocument).catch((error: unknown) => {
				void post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'notification', level: 'error', message: error instanceof Error ? error.message : String(error) });
			});
		});
		const messageSubscription = webviewPanel.webview.onDidReceiveMessage(async (raw: unknown) => {
			if (!isValidKvEditorV2Message(raw)) {return;}
			const message: KvEditorV2WebviewMessage = raw;
			if (message.type === 'clientReady') {
				ready = true;
				postSnapshot('initialize');
				void this.checkAndAutoUpdateLocalization(document, () => postSnapshot('documentChanged'));
				return;
			}
			if (message.type === 'reloadData') { postSnapshot('initialize'); return; }
			if (message.type === 'requestResource') {
				const folderType = this.detectFolderType(document.uri);
				latestTextureRequestId = message.requestId;
				try {
					const settings = readKvEditorSettings();
					const entry = settings ? findKvEntryForUri(document.uri, settings) : undefined;
					const response = await this.buildTextureMenuResponse(webviewPanel.webview, folderType, entry, document.uri.fsPath);
					if (latestTextureRequestId !== message.requestId) {return;}
					await post({
						protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'resourceResult', requestId: message.requestId, resource: 'textureMenu',
						payload: { defaultKind: response.defaultKind, icons: response.icons.map((icon) => { const { filePath, ...webviewIcon } = icon; void filePath; return webviewIcon; }), heroFilters: response.heroFilters ?? [] },
					});
				} catch (error) {
					if (latestTextureRequestId !== message.requestId) {return;}
					await post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'resourceResult', requestId: message.requestId, resource: 'textureMenu', payload: { defaultKind: folderType === 'item' ? 'item' : 'spell', icons: [], heroFilters: [], error: error instanceof Error ? error.message : String(error) } });
				}
				return;
			}
			if (message.type === 'openTarget') {
				if (message.target === 'textEditor') {await this.handleOpenTextEditor(document);}
				else if (message.target === 'formulaHelp') {await this.handleOpenFormulaHelp();}
				else if (message.target === 'localizationFile') {await this.handleOpenLocalizationFile(document, { path: message.path });}
				else if (message.target === 'scriptFile') {await this.handleOpenScriptFile(document, { scriptPath: message.path ?? '', folderType: this.detectFolderType(document.uri) });}
				return;
			}
			if (message.type === 'updatePreference') {
				try {
					if (message.preference.type === 'compactMode') {await this.handleSaveCompactMode(document, { compactMode: message.preference.value });}
					else if (message.preference.type === 'localizedMode') {await this.handleSaveLocalizedMode(document, { localizedMode: message.preference.value });}
					else if (message.preference.type === 'frozenColumn') {await this.handleSaveFrozenColumns(document, { frozenColumns: message.preference.value ?? null });}
					else {await this.handleSaveColumnWidths(document, { widths: message.preference.value });}
					postSnapshot('documentChanged');
				} catch (error) {
					void post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'notification', level: 'error', message: error instanceof Error ? error.message : String(error) });
				}
				return;
			}
			if (message.documentUri !== document.uri.toString()) {return;}
			const runCommand = async () => {
				if (message.baseVersion !== document.version) {
					await post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'commandRejected', requestId: message.requestId, reason: 'stale', message: '文档已经变化，此操作未执行。已加载最新数据。', snapshot: snapshot() });
					return;
				}
				executingCommand = true;
				try {
					await this.executeV2Command(document, message.command);
					await post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'commandResult', requestId: message.requestId, documentVersion: document.version, snapshot: snapshot() });
				} catch (error) {
					await post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'commandRejected', requestId: message.requestId, reason: 'failed', message: error instanceof Error ? error.message : String(error), snapshot: snapshot() });
				} finally {
					executingCommand = false;
				}
			};
			const queuedCommand = commandQueue.then(runCommand, runCommand);
			commandQueue = queuedCommand.catch(() => undefined);
			await queuedCommand;
		});
		webviewPanel.onDidDispose(() => {
			this.nativeSaveLifecycleDocuments.delete(document.uri.toString());
			this.formulaRuntimeErrors.delete(document.uri.toString());
			documentSubscription.dispose();
			saveSubscription.dispose();
			messageSubscription.dispose();
		});
	}

	private buildV2Snapshot(document: vscode.TextDocument, webview: vscode.Webview): KvEditorV2Snapshot {
		const payload = this.buildPayload(document, webview);
		payload.columns = payload.columns.filter((columnKey) => columnKey !== 'id');
		return {
			documentUri: document.uri.toString(),
			documentVersion: document.version,
			fileName: payload.fileName,
			documentKey: payload.documentKey,
			folderType: payload.folderType,
			header: payload.header,
			columns: payload.columns,
			rows: payload.rows.map((row, rowIndex) => ({
				rowId: row.id,
				values: row.values,
				abilityValues: row.abilityValues?.map((entry) => ({ ...entry, modifiers: entry.modifiers.map((modifier) => ({ ...modifier })) })),
				localization: row.localization,
				rawObject: row.rawObject,
				formulas: Object.fromEntries(payload.formulas
					.filter((formula) => (formula.rowId ?? payload.rows[formula.rowIndex]?.id) === row.id)
					.map((formula) => [formula.column, formula.formula.startsWith('=') ? formula.formula : `=${formula.formula}`])),
			})),
			error: payload.error,
			columnOptions: payload.columnOptions,
			columnWidths: payload.columnLayout?.columnWidths ?? {},
			compactMode: payload.compactMode ?? false,
			localizedMode: payload.localizedMode ?? false,
			frozenColumn: payload.frozenColumns,
			columnDescriptions: payload.columnDescriptions ?? {},
			formulas: payload.formulas.flatMap((formula) => {
				const rowId = formula.rowId ?? payload.rows[formula.rowIndex]?.id;
				if (!rowId) {return [];}
				const validation = validateSafeFormula(formula.formula);
				const runtimeError = this.formulaRuntimeErrors.get(document.uri.toString())?.get(`${rowId}::${formula.column}`);
				return [{
					columnKey: formula.column,
					rowId,
					formula: formula.formula,
					status: runtimeError ? 'error' as const : validation.compatible ? 'compatible' as const : 'legacy' as const,
					error: runtimeError ?? validation.error,
				}];
			}),
			columnFormulas: payload.columnFormulas ?? {},
			texturePreviews: payload.texturePreviews,
			scriptSupport: payload.scriptSupport,
			localizationSettings: payload.localizationSettings,
			abilityValuesDescriptions: payload.abilityValuesDescriptions ?? {},
		};
	}

	private buildV2CellReplacements(
		document: vscode.TextDocument,
		payload: KvEditorPayload,
		model: KvDocumentModel,
		baseEdits: FormulaValueEdit[],
		formulaChanges: Array<{ rowId: string; columnKey: string; formula?: string }> = [],
	): KvTextReplacement[] {
		const deduplicated = new Map<string, FormulaValueEdit>();
		for (const edit of baseEdits) {deduplicated.set(`${edit.rowId}::${edit.columnKey}`, edit);}
		const recalculation = recalculateAffectedFormulas({
			columns: payload.columns,
			rows: payload.rows.map((row) => ({ rowId: row.id, values: row.values })),
			cellFormulas: payload.formulas.flatMap((entry) => {
				const rowId = entry.rowId ?? payload.rows[entry.rowIndex]?.id;
				return rowId ? [{ rowId, columnKey: entry.column, formula: entry.formula }] : [];
			}),
			columnFormulas: payload.columnFormulas ?? {},
			baseEdits: [...deduplicated.values()],
			formulaChanges,
		});
		const documentErrors = this.formulaRuntimeErrors.get(document.uri.toString()) ?? new Map<string, string>();
		for (const edit of [...baseEdits, ...recalculation.edits]) {documentErrors.delete(`${edit.rowId}::${edit.columnKey}`);}
		for (const change of formulaChanges) {if (!change.formula) {documentErrors.delete(`${change.rowId}::${change.columnKey}`);}}
		for (const error of recalculation.errors) {documentErrors.set(`${error.rowId}::${error.columnKey}`, error.message);}
		if (documentErrors.size) {this.formulaRuntimeErrors.set(document.uri.toString(), documentErrors);}
		else {this.formulaRuntimeErrors.delete(document.uri.toString());}
		for (const edit of recalculation.edits) {deduplicated.set(`${edit.rowId}::${edit.columnKey}`, edit);}
		return [...deduplicated.values()].map((edit) => model.editScalarOrdered(edit.rowId, edit.columnKey, edit.value, payload.columns));
	}

	private async clearV2CellFormulas(document: vscode.TextDocument, payload: KvEditorPayload, edits: FormulaValueEdit[]): Promise<void> {
		const formulaTargets = new Set(payload.formulas.map((entry) => {
			const rowId = entry.rowId ?? payload.rows[entry.rowIndex]?.id;
			return rowId ? `${rowId}::${entry.column}` : '';
		}));
		for (const edit of edits) {
			if (!formulaTargets.has(`${edit.rowId}::${edit.columnKey}`)) {continue;}
			await this.handleSaveFormula(document, {
				column: edit.columnKey,
				rowId: edit.rowId,
				rowIndex: payload.rows.findIndex((row) => row.id === edit.rowId),
				formula: undefined,
			});
		}
	}

	private async applyV2Replacements(document: vscode.TextDocument, replacements: KvTextReplacement[]): Promise<void> {
		if (!replacements.length) {return;}
		const ordered = [...replacements].sort((left, right) => left.start - right.start);
		for (let index = 1; index < ordered.length; index++) {
			if (ordered[index].start < ordered[index - 1].end) {throw new Error('编辑范围发生重叠，操作未执行。');}
		}
		const edit = new vscode.WorkspaceEdit();
		for (const replacement of ordered) {
			edit.replace(document.uri, new vscode.Range(document.positionAt(replacement.start), document.positionAt(replacement.end)), replacement.text);
		}
		const applied = await this.applyWorkspaceEditTracked(document, edit);
		if (!applied) {throw new Error('无法把修改应用到 KV 文档。');}
	}

	private migrateV2FormulaRowId(document: vscode.TextDocument, oldId: string, newId: string): void {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {return;}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {return;}
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const formulas = overrides.formulas?.[documentKey];
		if (!formulas) {return;}
		const oldKey = `id:${oldId}`;
		const newKey = `id:${newId}`;
		if (!formulas[oldKey]) {return;}
		formulas[newKey] = { ...formulas[oldKey] };
		delete formulas[oldKey];
		this.writeColumnOptionOverrides(workspaceFolder, overrides);
	}

	private assertV2FormulaCycles(payload: KvEditorPayload, candidates: Array<{ rowId: string; columnKey: string; formula?: string }>): void {
		const address = (rowId: string, columnKey: string) => `${rowId}::${columnKey}`;
		const formulas = new Map<string, string>();
		for (const entry of payload.formulas) {
			const rowId = entry.rowId ?? payload.rows[entry.rowIndex]?.id;
			if (rowId && validateSafeFormula(entry.formula).compatible) {formulas.set(address(rowId, entry.column), entry.formula);}
		}
		for (const [columnKey, formula] of Object.entries(payload.columnFormulas ?? {})) {
			if (!validateSafeFormula(formula).compatible) {continue;}
			for (const row of payload.rows) {if (!formulas.has(address(row.id, columnKey))) {formulas.set(address(row.id, columnKey), formula);}}
		}
		for (const candidate of candidates) {
			const key = address(candidate.rowId, candidate.columnKey);
			if (candidate.formula) {formulas.set(key, candidate.formula);} else {formulas.delete(key);}
		}
		assertNoFormulaCycles(formulas, (reference) => {
			const match = /^\$?([A-Z]{1,3})\$?([1-9][0-9]*)$/u.exec(reference);
			if (!match) {return undefined;}
			let columnIndex = 0;
			for (const character of match[1]) {columnIndex = columnIndex * 26 + character.charCodeAt(0) - 64;}
			const row = payload.rows[Number(match[2]) - 1];
			const columnKey = ['id', ...payload.columns][columnIndex - 1];
			return row && columnKey ? address(row.id, columnKey) : undefined;
		});
	}
	private evaluateV2Formula(formula: string, payload: KvEditorPayload, rowIndex: number): string {
		const row = payload.rows[rowIndex];
		if (!row) {throw new Error('公式目标行不存在。');}
		const result = evaluateSafeFormula(formula, {
			rowId: row.id, rowIndex, row: row.values,
			resolveCell: (reference) => {
				const match = /^\$?([A-Z]{1,3})\$?([1-9][0-9]*)$/u.exec(reference);
				if (!match) {throw new Error(`单元格引用无效：${reference}`);}
				let columnIndex = 0;
				for (const character of match[1]) {columnIndex = columnIndex * 26 + character.charCodeAt(0) - 64;}
				const referencedRow = payload.rows[Number(match[2]) - 1];
				const columnKey = ['id', ...payload.columns][columnIndex - 1];
				if (!referencedRow || !columnKey) {throw new Error(`单元格引用超出范围：${reference}`);}
				return columnKey === 'id' ? referencedRow.id : referencedRow.values[columnKey] ?? '';
			},
		});
		return result === null ? '' : String(result);
	}

	private buildV2AbilityValues(entries: AbilityValuesEditEntry[]): Record<string, unknown> {
		const result: Record<string, unknown> = {};
		for (const rawEntry of entries) {
			const entry = this.normalizeAbilityValuesEditEntry(rawEntry);
			if (!entry) {throw new Error('AbilityValues key 不能为空。');}
			if (Object.prototype.hasOwnProperty.call(result, entry.key)) {throw new Error(`AbilityValues key “${entry.key}” 重复。`);}
			const modifierKeys = new Set<string>();
			for (const modifier of entry.modifiers) {
				if (modifierKeys.has(modifier.key)) {throw new Error(`AbilityValues “${entry.key}” 的 modifier “${modifier.key}” 重复。`);}
				modifierKeys.add(modifier.key);
			}
			if (entry.type === 'scalar' && entry.modifiers.length === 0) {
				result[entry.key] = entry.value;
			} else {
				result[entry.key] = Object.fromEntries([
					['value', entry.value],
					...entry.modifiers.map((modifier) => [modifier.key, modifier.value]),
				]);
			}
		}
		return result;
	}

	private async handleV2AbilityValuesEdit(document: vscode.TextDocument, rowId: string, entries: AbilityValuesEditEntry[]): Promise<void> {
		const abilityValues = this.buildV2AbilityValues(entries);
		const serialized = Object.keys(abilityValues).length ? writeKeyValue({ AbilityValues: abilityValues }, 2) : '';
		await this.applyV2Replacements(document, [KvDocumentModel.parse(document.getText()).replaceObjectBlock(rowId, 'AbilityValues', serialized)]);
	}

	private async handleV2InsertRows(
		document: vscode.TextDocument,
		payload: KvEditorPayload,
		command: Extract<KvEditorV2Command, { type: 'insertRows' }>,
	): Promise<void> {
		if (!command.rows.length) {return;}
		const anchorRowId = command.anchorRowId ?? payload.rows[payload.rows.length - 1]?.id;
		if (!anchorRowId) {throw new Error('空文档暂不支持批量粘贴，请先在文本编辑器中建立一个条目。');}
		const insertionRowIndex = payload.rows.findIndex((row) => row.id === anchorRowId) + 1;
		if (insertionRowIndex <= 0) {throw new Error(`无法找到批量插入锚点 “${anchorRowId}”。`);}

		const usedIds = new Set(payload.rows.map((row) => row.id));
		const inserted: Array<{ rowId: string; value: Record<string, unknown>; formulas: Record<string, string> }> = [];
		for (const sourceRow of command.rows) {
			const requestedId = sourceRow.rowId.trim() || 'new_entry';
			let rowId = requestedId;
			let suffix = 1;
			while (usedIds.has(rowId)) {
				rowId = `${requestedId}_copy${suffix === 1 ? '' : suffix}`;
				suffix++;
			}
			usedIds.add(rowId);

			const usedRawObject = Boolean(sourceRow.rawObject && this.isPlainObject(sourceRow.rawObject));
			const value: Record<string, unknown> = usedRawObject
				? JSON.parse(JSON.stringify(sourceRow.rawObject)) as Record<string, unknown>
				: { ...sourceRow.values };
			delete value.AbilityValues;
			if (sourceRow.abilityValues?.length) {value.AbilityValues = this.buildV2AbilityValues(sourceRow.abilityValues);}
			const formulas: Record<string, string> = {};
			for (const [columnKey, formula] of Object.entries(sourceRow.formulas ?? {})) {
				const normalized = formula.trim();
				if (!normalized) {continue;}
				const validation = validateSafeFormula(normalized);
				if (!validation.compatible) {throw new Error(validation.error ?? `列 “${columnKey}” 的复制公式不属于安全语法子集。`);}
				formulas[columnKey] = normalized;
			}
			inserted.push({ rowId, value: usedRawObject ? value : this.rebuildCreatureStructure(value), formulas });
		}

		const serialized = inserted.map((row) => writeKeyValue({ [row.rowId]: row.value }, 1)).join('');
		await this.applyV2Replacements(document, [KvDocumentModel.parse(document.getText()).insertRowsText(anchorRowId, 'after', serialized)]);
		const previousRowIds = payload.rows.map((row) => row.id);
		const nextRowIds = previousRowIds.slice();
		nextRowIds.splice(insertionRowIndex, 0, ...inserted.map((row) => row.rowId));
		this.syncStoredFormulasForRowChange(document, previousRowIds, nextRowIds);
		for (let offset = 0; offset < inserted.length; offset++) {
			for (const [column, formula] of Object.entries(inserted[offset].formulas)) {
				await this.handleSaveFormula(document, { column, rowId: inserted[offset].rowId, rowIndex: insertionRowIndex + offset, formula });
			}
		}
	}

	private removeV2FormulaRows(document: vscode.TextDocument, rowIds: string[]): void {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {return;}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {return;}
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const formulas = overrides.formulas?.[documentKey];
		if (!formulas) {return;}
		let changed = false;
		for (const rowId of rowIds) {
			const key = `id:${rowId}`;
			if (formulas[key]) { delete formulas[key]; changed = true; }
		}
		if (changed) {this.writeColumnOptionOverrides(workspaceFolder, overrides);}
	}
	private async executeV2Command(document: vscode.TextDocument, command: KvEditorV2Command): Promise<void> {
		const payload = this.buildPayload(document, { asWebviewUri: (uri: vscode.Uri) => uri } as vscode.Webview);
		payload.columns = payload.columns.filter((columnKey) => columnKey !== 'id');
		const rowIndex = (rowId: string) => payload.rows.findIndex((row) => row.id === rowId);
		const documentModel = () => KvDocumentModel.parse(document.getText());
		switch (command.type) {
			case 'editCell': {
				if (!command.rowId || !command.columnKey || command.columnKey === 'id') {throw new Error('单元格地址无效。');}
				const edits = [{ rowId: command.rowId, columnKey: command.columnKey, value: command.value }];
				await this.applyV2Replacements(document, this.buildV2CellReplacements(document, payload, documentModel(), edits));
				await this.clearV2CellFormulas(document, payload, edits);
				return;
			}
			case 'bulkEdit': {
				const edits = command.edits.map((edit) => ({ ...edit }));
				if (edits.some((edit) => !edit.rowId || !edit.columnKey || edit.columnKey === 'id')) {throw new Error('批量编辑包含无效单元格地址。');}
				await this.applyV2Replacements(document, this.buildV2CellReplacements(document, payload, documentModel(), edits));
				await this.clearV2CellFormulas(document, payload, edits);
				return;
			}
			case 'fillCells': {
				this.assertV2FormulaCycles(payload, command.entries.map((entry) => ({ rowId: entry.rowId, columnKey: entry.columnKey, formula: entry.formula })));
				for (const entry of command.entries) {
					if (rowIndex(entry.rowId) < 0 || entry.columnKey === 'id') {throw new Error('填充目标单元格无效。');}
					if (entry.formula !== undefined) {
						const validation = validateSafeFormula(entry.formula);
						if (!validation.compatible) {throw new Error(validation.error ?? '填充公式不属于安全语法子集。');}
					}
				}
				const valueEdits = command.entries.filter((entry) => entry.formula === undefined)
					.map((entry) => ({ rowId: entry.rowId, columnKey: entry.columnKey, value: entry.value ?? '' }));
				const formulaChanges = command.entries.map((entry) => ({
					rowId: entry.rowId, columnKey: entry.columnKey, formula: entry.formula,
				}));
				await this.applyV2Replacements(document, this.buildV2CellReplacements(document, payload, documentModel(), valueEdits, formulaChanges));
				for (const entry of command.entries) {
					await this.handleSaveFormula(document, { column: entry.columnKey, rowId: entry.rowId, rowIndex: rowIndex(entry.rowId), formula: entry.formula });
				}
				return;
			}
			case 'insertRows':
				await this.handleV2InsertRows(document, payload, command);
				return;
			case 'renameRow':
				if (!command.newRowId.trim()) {throw new Error('行 ID 不能为空。');}
				await this.applyV2Replacements(document, [documentModel().renameRow(command.rowId, command.newRowId.trim())]);
				this.migrateV2FormulaRowId(document, command.rowId, command.newRowId.trim());
				return;
			case 'insertRow': {
				const anchorRowId = command.anchorRowId ?? payload.rows[payload.rows.length - 1]?.id;
				if (!anchorRowId) {throw new Error('空文档暂不支持图形化插入，请先在文本编辑器中建立一个条目。');}
				let rowId = 'new_entry'; let suffix = 2;
				while (payload.rows.some((row) => row.id === rowId)) {rowId = `new_entry_${suffix++}`;}
				const values = Object.fromEntries(payload.columns.filter((column) => column !== 'AbilityValues').map((column) => [column, '']));
				await this.applyV2Replacements(document, [documentModel().insertRow(anchorRowId, command.position, rowId, values)]);
				const anchorIndex = rowIndex(anchorRowId);
				const insertionIndex = anchorIndex + (command.position === 'after' ? 1 : 0);
				const previousRowIds = payload.rows.map((row) => row.id);
				const nextRowIds = previousRowIds.slice();
				nextRowIds.splice(insertionIndex, 0, rowId);
				this.syncStoredFormulasForRowChange(document, previousRowIds, nextRowIds);
				return;
			}
			case 'deleteRows': {
				const rowIds = [...new Set(command.rowIds)];
				await this.applyV2Replacements(document, documentModel().deleteRows(rowIds));
				const previousRowIds = payload.rows.map((row) => row.id);
				this.syncStoredFormulasForRowChange(document, previousRowIds, previousRowIds.filter((rowId) => !rowIds.includes(rowId)));
				return;
			}
			case 'reorderRow': {
				const sourceIndex = rowIndex(command.rowId);
				const anchorIndex = rowIndex(command.anchorRowId);
				if (sourceIndex < 0 || anchorIndex < 0) {throw new Error('无法找到要移动的行。');}
				await this.applyV2Replacements(document, documentModel().moveRow(command.rowId, command.anchorRowId, command.position));
				const previousRowIds = payload.rows.map((row) => row.id);
				const nextRowIds = previousRowIds.slice();
				const [movedRowId] = nextRowIds.splice(sourceIndex, 1);
				let targetIndex = anchorIndex + (command.position === 'after' ? 1 : 0);
				if (sourceIndex < targetIndex) {targetIndex--;}
				nextRowIds.splice(targetIndex, 0, movedRowId);
				this.syncStoredFormulasForRowChange(document, previousRowIds, nextRowIds);
				return;
			}
			case 'insertColumn': {
				const referenceIndex = command.anchorColumnKey === 'id' ? -1 : payload.columns.indexOf(command.anchorColumnKey);
				if (referenceIndex < 0 && command.anchorColumnKey !== 'id') {throw new Error('无法找到参考列。');}
				if (command.anchorColumnKey === 'id' && command.position !== 'after') {throw new Error('不能在 ID 列之前插入 KV 字段。');}
				if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/u.test(command.columnKey)) {throw new Error('列名只能包含字母、数字和下划线，且不能以数字开头。');}
				if (payload.columns.includes(command.columnKey) || command.columnKey === 'id') {throw new Error(`列 “${command.columnKey}” 已存在。`);}
				const model = documentModel();
				const replacements = command.anchorColumnKey === 'id'
					? payload.rows.map((row) => model.editScalarOrdered(row.id, command.columnKey, '', [command.columnKey, ...payload.columns]))
					: payload.rows.map((row) => model.insertScalarRelative(row.id, command.columnKey, '', command.anchorColumnKey, command.position));
				await this.applyV2Replacements(document, replacements);
				const nextColumns = payload.columns.slice();
				nextColumns.splice(referenceIndex + (command.position === 'after' ? 1 : 0), 0, command.columnKey);
				this.syncStoredFormulasForColumnChange(document, payload.columns, nextColumns);
				return;
			}
			case 'deleteColumn': {
				const replacements: KvTextReplacement[] = [];
				const model = documentModel();
				for (const row of payload.rows) {
					const replacement = this.isCreatureField(command.columnKey)
						? model.deleteNestedField(row.id, 'Creature', command.columnKey)
						: model.deleteScalar(row.id, command.columnKey);
					if (replacement) {replacements.push(replacement);}
				}
				if (!replacements.length) {throw new Error(`无法在源文本中安全定位列 “${command.columnKey}”。`);}
				await this.applyV2Replacements(document, replacements);
				this.syncStoredFormulasForColumnChange(document, payload.columns, payload.columns.filter((key) => key !== command.columnKey), command.columnKey);
				return;
			}
			case 'reorderColumn': {
				const sourceIndex = payload.columns.indexOf(command.columnKey);
				const anchorIndex = payload.columns.indexOf(command.anchorColumnKey);
				if (sourceIndex < 0 || anchorIndex < 0) {throw new Error('无法找到要移动的列。');}
				const nextColumns = payload.columns.slice();
				const [moved] = nextColumns.splice(sourceIndex, 1);
				let targetIndex = anchorIndex + (command.position === 'after' ? 1 : 0);
				if (sourceIndex < targetIndex) {targetIndex--;}
				nextColumns.splice(targetIndex, 0, moved);
				const model = documentModel();
				const movedIndex = nextColumns.indexOf(command.columnKey);
				const replacements = payload.rows.flatMap((row) => {
					if (!model.hasScalar(row.id, command.columnKey)) {return [];}
					for (let index = movedIndex + 1; index < nextColumns.length; index++) {
						if (model.hasScalar(row.id, nextColumns[index])) {return model.moveScalar(row.id, command.columnKey, nextColumns[index], 'before');}
					}
					for (let index = movedIndex - 1; index >= 0; index--) {
						if (model.hasScalar(row.id, nextColumns[index])) {return model.moveScalar(row.id, command.columnKey, nextColumns[index], 'after');}
					}
					return [];
				});
				if (!replacements.length) {throw new Error('没有可安全移动的直接标量字段。');}
				await this.applyV2Replacements(document, replacements);
				this.syncStoredFormulasForColumnChange(document, payload.columns, nextColumns);
				return;
			}
			case 'editAbilityValues':
				await this.handleV2AbilityValuesEdit(document, command.rowId, command.entries);
				if (command.descriptions) {await this.handleSaveAbilityValuesDescriptions(document, { rowId: command.rowId, descriptions: command.descriptions }, false);}
				return;
			case 'saveLocalizationSettings':
				await this.handleSaveLocalizationSettings(document, command.settings, false);
				return;
			case 'runLocalizationAction': {
				const settings = payload.localizationSettings;
				if (!settings?.filePath || !settings.mappings.length) {throw new Error('请先配置本地化文件路径和列映射。');}
				if (command.action === 'export') {
					await this.exportLocalizationFile(document, settings);
					return;
				}
				await this.importLocalizationFile(document, settings);
				const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
				const documentKey = workspaceFolder ? this.getDocumentSettingsKey(document.uri, workspaceFolder) : undefined;
				if (documentKey) {await this.importAbilityValuesDescriptions(document, settings, documentKey);}
				void vscode.window.showInformationMessage('本地化内容已导入当前 KV 文档。');
				return;
			}
			case 'saveColumnOptions':
				await this.handleSaveColumnOptions(document, {
					column: command.columnKey, folderType: this.detectFolderType(document.uri), options: command.options,
					multiple: command.multiple, separator: command.separator, scope: command.scope,
				});
				return;			case 'saveColumnDescription':
				await this.handleSaveColumnDescription(document, {
					columnKey: command.columnKey, label: command.label, description: command.description, scope: command.scope,
				});
				return;			case 'saveCellFormula': {
				if (rowIndex(command.rowId) < 0 || command.columnKey === 'id') {throw new Error('公式目标单元格无效。');}
				if (command.formula) {
					this.assertV2FormulaCycles(payload, [{ rowId: command.rowId, columnKey: command.columnKey, formula: command.formula }]);
					const validation = validateSafeFormula(command.formula);
					if (!validation.compatible) {throw new Error(validation.error ?? '公式不属于安全语法子集。');}
					const formulaChanges = [{ rowId: command.rowId, columnKey: command.columnKey, formula: command.formula }];
					await this.applyV2Replacements(document, this.buildV2CellReplacements(document, payload, documentModel(), [], formulaChanges));
				}
				await this.handleSaveFormula(document, { column: command.columnKey, rowId: command.rowId, rowIndex: rowIndex(command.rowId), formula: command.formula });
				return;
			}
			case 'saveColumnFormula': {
				if (command.formula) {
					const validation = validateSafeFormula(command.formula);
					if (!validation.compatible) {throw new Error(validation.error ?? '公式不属于安全语法子集。');}
					const cellFormulaTargets = new Set(payload.formulas.map((entry) => {
						const rowId = entry.rowId ?? payload.rows[entry.rowIndex]?.id;
						return rowId ? `${rowId}::${entry.column}` : '';
					}));
					const formulaChanges = payload.rows.filter((row) => !cellFormulaTargets.has(`${row.id}::${command.columnKey}`))
						.map((row) => ({ rowId: row.id, columnKey: command.columnKey, formula: command.formula }));
					this.assertV2FormulaCycles(payload, formulaChanges);
					await this.applyV2Replacements(document, this.buildV2CellReplacements(document, payload, documentModel(), [], formulaChanges));
				}
				await this.handleSaveColumnFormula(document, { columnKey: command.columnKey, formula: command.formula });
				return;
			}
		}
	}


	private buildPayload(document: vscode.TextDocument, webview: vscode.Webview): KvEditorPayload {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		const documentKey = workspaceFolder ? this.getDocumentSettingsKey(document.uri, workspaceFolder) : undefined;
		const settings = readKvEditorSettings();
		const entry = settings ? findKvEntryForUri(document.uri, settings) : undefined;
		const folderType: KvFolderType = entry?.type ?? 'custom';
		const parsed = this.parseKv(document.getText());
		this.enrichRowsWithLocalization(parsed.rows, folderType, document.uri.fsPath, entry);
		const columnLayout = this.loadColumnLayout(document);
		const columnOptions = this.getResolvedColumnOptions(folderType, workspaceFolder, document.uri);
		const formulas = workspaceFolder && documentKey
			? this.buildFormulaPayload(workspaceFolder, documentKey, parsed.rows, document.uri)
			: [];
		const columnFormulas = workspaceFolder && documentKey
			? this.buildColumnFormulaPayload(workspaceFolder, documentKey)
			: undefined;

		// 加载精简模式设置
		let compactMode: boolean | undefined;
		let localizedMode: boolean | undefined;
		let frozenColumns: string | undefined;
		let columnDescriptions: Record<string, { label?: string; description?: string; }> | undefined;
		let localizationSettings: { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; } | undefined;
		let abilityValuesDescriptions: Record<string, Record<string, string>> | undefined; // rowId -> key -> description
		if (workspaceFolder && documentKey) {
			const userSettings = this.getUserSettings(workspaceFolder);
			const fileSettings = userSettings.files[documentKey];
			if (fileSettings && typeof fileSettings.compactMode === 'boolean') {
				compactMode = fileSettings.compactMode;
			}
			if (fileSettings && typeof fileSettings.localizedMode === 'boolean') {
				localizedMode = fileSettings.localizedMode;
			}
			if (fileSettings && typeof fileSettings.frozenColumns === 'string') {
				frozenColumns = fileSettings.frozenColumns;
			}

			// 加载本地化设置
			const columnOptionOverrides = this.getColumnOptionOverrides(workspaceFolder);
			if (columnOptionOverrides.localizationSettings && columnOptionOverrides.localizationSettings[documentKey]) {
				localizationSettings = columnOptionOverrides.localizationSettings[documentKey];
				// 更新缓存
				this.localizationSettingsCache.set(documentKey, localizationSettings);
			}

			// 加载 AbilityValues 描述
			const docDescriptions = this.abilityValuesDescriptionCache.get(documentKey);
			if (docDescriptions && docDescriptions.size > 0) {
				abilityValuesDescriptions = {};
				docDescriptions.forEach((keyMap, rowId) => {
					abilityValuesDescriptions![rowId] = Object.fromEntries(keyMap);
				});
			}
			const baseDefaults = this.readColumnLocalizationConfig();
			const workspaceDefaults = columnOptionOverrides.columnDescriptions ?? {};
			const fileColumnOptions = columnOptionOverrides.files && columnOptionOverrides.files[documentKey];
			const fileDefaults = fileColumnOptions && fileColumnOptions.columnDescriptions ? fileColumnOptions.columnDescriptions : {};
			const merged: Record<string, { label?: string; description?: string; }> = {};
			Object.assign(merged, baseDefaults);
			Object.assign(merged, workspaceDefaults);
			Object.assign(merged, fileDefaults);
			if (Object.keys(merged).length) {
				columnDescriptions = merged;
			}
		}

		return {
			fileName: path.basename(document.uri.fsPath),
			documentKey,
			folderType,
			header: parsed.header,
			columns: parsed.columns,
			rows: parsed.rows,
			error: parsed.error,
			columnOptions,
			columnLayout,
			texturePreviews: this.buildTexturePreviews(document, parsed.rows, webview, entry),
			scriptSupport: this.buildScriptSupport(folderType),
			formulas,
			columnFormulas,
			compactMode,
			localizedMode,
			columnDescriptions,
			frozenColumns,
			localizationSettings,
			abilityValuesDescriptions,
		};
	}

	private readColumnOptionConfig(): KvEditorColumnOptionMap {
		try {
			const configPath = this.context.asAbsolutePath(path.join('resource', 'kv_editor_field_options.json'));
			const raw = fs.readFileSync(configPath, 'utf8');
			const parsed = JSON.parse(raw) as Record<string, unknown> | undefined;
			if (!parsed || typeof parsed !== 'object') {
				return {};
			}


			const result: KvEditorColumnOptionMap = {};
			for (const [column, value] of Object.entries(parsed)) {
				if (!value || typeof value !== 'object') {
					continue;
				}
				const columnConfig = this.parseColumnOptionSource(value);
				if (!columnConfig) {
					continue;
				}
				result[column] = columnConfig;
			}
			return result;
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to read column option config:', error);
			return {};
		}
	}

	private readColumnLocalizationConfig(): Record<string, { label?: string; description?: string; }> {
		try {
			const configPath = this.context.asAbsolutePath(path.join('resource', 'kv_editor_field_localization.json'));
			if (!this.pathExists(configPath)) {return {};}
			const raw = fs.readFileSync(configPath, 'utf8');
			const parsed = JSON.parse(raw) as Record<string, unknown> | undefined;
			if (!parsed || typeof parsed !== 'object') {return {};}
			const result: Record<string, { label?: string; description?: string; }> = {};
			for (const [key, value] of Object.entries(parsed)) {
				if (!key || typeof key !== 'string') {continue;}
				if (!value || typeof value !== 'object') {continue;}
				const entry = value as Record<string, unknown>;
				const label = typeof entry.label === 'string' && entry.label.length ? entry.label : undefined;
				const description = typeof entry.description === 'string' && entry.description.length ? entry.description : undefined;
				if (label === undefined && description === undefined) {continue;}
				result[key] = {};
				if (label !== undefined) {result[key].label = label;}
				if (description !== undefined) {result[key].description = description;}
			}
			return result;
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to read column localization config:', error);
			return {};
		}
	}

	private parseColumnOptionSource(raw: unknown): KvEditorColumnOptionSource | undefined {
		if (!raw || typeof raw !== 'object') {
			return undefined;
		}
		const obj = raw as Record<string, unknown>;
		const options = this.parseOptionEntries(obj.options);
		if (!options.length) {
			return undefined;
		}
		const multiple = Boolean(obj.multiple);
		const separatorRaw = obj.separator;
		const separator = typeof separatorRaw === 'string' && separatorRaw.length > 0 ? separatorRaw : ',';
		const overridesRaw = obj.overrides;
		let overrides: Partial<Record<KvFolderType, KvEditorColumnOptionOverride>> | undefined;
		if (overridesRaw && typeof overridesRaw === 'object' && !Array.isArray(overridesRaw)) {
			overrides = {};
			for (const [key, overrideValue] of Object.entries(overridesRaw as Record<string, unknown>)) {
				const folderType = this.normalizeFolderTypeKey(key);
				if (!folderType) {
					continue;
				}
				const parsedOverride = this.parseOverrideConfig(overrideValue);
				if (!parsedOverride) {
					continue;
				}
				overrides[folderType] = parsedOverride;
			}
			if (!Object.keys(overrides).length) {
				overrides = undefined;
			}
		}
		return { options, multiple, separator, overrides };
	}

	private parseOptionEntries(raw: unknown): KvEditorColumnOption[] {
		if (!Array.isArray(raw)) {
			return [];
		}
		return raw
			.map((entry) => {
				if (!entry || typeof entry !== 'object') {
					return undefined;
				}
				const optionObj = entry as Record<string, unknown>;
				const value = optionObj.value;
				if (typeof value !== 'string') {
					return undefined;
				}
				const rawLabel = optionObj.label;
				const rawDescription = optionObj.description;
				const hasLabel = typeof rawLabel === 'string' && rawLabel.length > 0;
				const option: KvEditorColumnOption = {
					value,
					label: hasLabel ? rawLabel : value,
				};
				if (!hasLabel) {
					option.labelIsFallback = true;
				}
				if (typeof rawDescription === 'string' && rawDescription.length > 0) {
					option.description = rawDescription;
				}
				return option;
			})
			.filter((entry): entry is KvEditorColumnOption => Boolean(entry));
	}

	private parseOverrideConfig(raw: unknown): KvEditorColumnOptionOverride | undefined {
		if (!raw || typeof raw !== 'object') {
			return undefined;
		}
		const obj = raw as Record<string, unknown>;
		const override: KvEditorColumnOptionOverride = {};
		const options = this.parseOptionEntries(obj.options);
		if (options.length) {
			override.options = options;
		}
		if (typeof obj.multiple === 'boolean') {
			override.multiple = obj.multiple;
		}
		const separatorRaw = obj.separator;
		if (typeof separatorRaw === 'string' && separatorRaw.length > 0) {
			override.separator = separatorRaw;
		}
		if (!override.options && override.multiple === undefined && override.separator === undefined) {
			return undefined;
		}
		return override;
	}

	private normalizeFolderTypeKey(input: string): KvFolderType | undefined {
		switch (input) {
			case 'ability':
			case 'item':
			case 'unit':
			case 'custom':
				return input;
			default:
				return undefined;
		}
	}

	private getResolvedColumnOptions(
		folderType: KvFolderType,
		workspaceFolder?: vscode.WorkspaceFolder,
		documentUri?: vscode.Uri
	): KvEditorColumnOptionResolvedMap {
		const resolved: KvEditorColumnOptionResolvedMap = {};
		for (const [column, config] of Object.entries(this.columnOptionConfig)) {
			const override = config.overrides?.[folderType];
			const optionsSource = override?.options ?? config.options;
			const multiple = override?.multiple ?? config.multiple;
			const separator = override?.separator ?? config.separator;
			resolved[column] = {
				options: optionsSource.map((option) => ({ ...option })),
				multiple,
				separator,
			};
		}
		if (workspaceFolder) {
			const overrides = this.getColumnOptionOverrides(workspaceFolder);

			// 先应用全局（folderType）级别的覆盖
			for (const [column, folderMap] of Object.entries(overrides.columns)) {
				const overrideOptions = this.getColumnOverrideOptionsForFolder(folderMap, folderType);
				if (!overrideOptions?.length) {
					continue;
				}
				const existing = resolved[column];
				if (existing) {
					existing.options = overrideOptions.map((option) => ({ ...option }));
				} else {
					resolved[column] = {
						options: overrideOptions.map((option) => ({ ...option })),
						multiple: false,
						separator: ',',
					};
				}
			}

			// 应用全局级别的 multiple 和 separator 设置
			if (overrides.columnSettings) {
				for (const [column, scopeMap] of Object.entries(overrides.columnSettings)) {
					const existing = resolved[column];
					if (!existing) {
						continue;
					}
					// 先尝试 folderType 对应的 scope，再 fallback 到 default
					const settings = scopeMap[folderType] ?? scopeMap['default'];
					if (settings) {
						if (typeof settings.multiple === 'boolean') {
							existing.multiple = settings.multiple;
						}
						if (typeof settings.separator === 'string' && settings.separator.length > 0) {
							existing.separator = settings.separator;
						}
					}
				}
			}

			// 再应用文件级别的覆盖（优先级最高）
			if (documentUri && overrides.files) {
				const documentKey = this.getDocumentSettingsKey(documentUri, workspaceFolder);
				const fileConfig = documentKey ? overrides.files[documentKey] : undefined;
				const fileColumnOptions = fileConfig?.columnOptions;
				const fileColumnSettings = fileConfig?.columnSettings;

				if (fileColumnOptions) {
					for (const [column, fileOptions] of Object.entries(fileColumnOptions)) {
						if (!fileOptions?.length) {
							continue;
						}
						const existing = resolved[column];
						if (existing) {
							existing.options = fileOptions.map((option) => ({ ...option }));
						} else {
							resolved[column] = {
								options: fileOptions.map((option) => ({ ...option })),
								multiple: false,
								separator: ',',
							};
						}
					}
				}

				// 应用文件级别的 multiple 和 separator 设置（最高优先级）
				if (fileColumnSettings) {
					for (const [column, settings] of Object.entries(fileColumnSettings)) {
						const existing = resolved[column];
						if (existing) {
							if (typeof settings.multiple === 'boolean') {
								existing.multiple = settings.multiple;
							}
							if (typeof settings.separator === 'string' && settings.separator.length > 0) {
								existing.separator = settings.separator;
							}
						} else {
							// 如果列不存在，创建一个空的配置
							resolved[column] = {
								options: [],
								multiple: settings.multiple ?? false,
								separator: settings.separator ?? ',',
							};
						}
					}
				}
			}
		}
		return resolved;
	}

	private buildScriptSupport(folderType: KvFolderType): KvEditorScriptSupport {
		const useTypescript = Boolean(vscode.workspace.getConfiguration().get('dota2-tools.A6.Kv to lua generate typescript'));
		const baseDir = useTypescript ? getContentDir() : getGameDir();
		const applicable = folderType === 'ability' || folderType === 'item';
		return {
			applicable,
			baseReady: applicable ? Boolean(baseDir) : false,
			useTypescript,
		};
	}

	private async handleTextureMenuRequest(
		document: vscode.TextDocument,
		webview: vscode.Webview,
		request: TextureMenuRequestMessage,
	): Promise<void> {
		try {
			const settings = readKvEditorSettings();
			const entry = settings ? findKvEntryForUri(document.uri, settings) : undefined;
			const folderType = request.folderType ?? this.detectFolderType(document.uri);
			const response = await this.buildTextureMenuResponse(webview, folderType, entry, document.uri.fsPath);
			webview.postMessage({
				type: 'textureMenuData',
				payload: {
					requestId: request.requestId,
					...response,
				},
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			webview.postMessage({
				type: 'textureMenuError',
				payload: {
					requestId: request.requestId,
					error: message,
				},
			});
		}
	}

	private detectFolderType(uri: vscode.Uri): KvFolderType {
		const settings = readKvEditorSettings();
		const entry = settings ? findKvEntryForUri(uri, settings) : undefined;
		return entry?.type ?? 'custom';
	}

	private async buildTextureMenuResponse(
		webview: vscode.Webview,
		folderType: KvFolderType,
		entry: KvEditorEntry | undefined,
		documentPath?: string,
	): Promise<TextureMenuResponsePayload> {
		const addonImagesRoot = this.resolveAddonImagesRoot(documentPath ?? entry?.resolvedPath ?? '', entry);
		const extensionSpellRoots = [path.join(this.extensionImagesRoot, 'spellicons')];
		const extensionItemRoots = [path.join(this.extensionImagesRoot, 'items')];
		const addonSpellRoots = addonImagesRoot ? [path.join(addonImagesRoot, 'spellicons')] : [];
		const addonItemRoots = addonImagesRoot ? [path.join(addonImagesRoot, 'items')] : [];
		const extensionSpellIcons = await this.collectIconsForRoots(extensionSpellRoots, 'spell', 'extension', webview);
		const extensionItemIcons = await this.collectIconsForRoots(extensionItemRoots, 'item', 'extension', webview);
		const addonSpellIcons = await this.collectIconsForRoots(addonSpellRoots, 'spell', 'addon', webview);
		const addonItemIcons = await this.collectIconsForRoots(addonItemRoots, 'item', 'addon', webview);
		const allIcons = [...extensionSpellIcons, ...extensionItemIcons, ...addonSpellIcons, ...addonItemIcons];
		const defaultKind = folderType === 'item' ? 'item' : 'spell';
		const heroFilters = await this.collectHeroFilters(webview);
		return {
			folderType,
			defaultKind,
			icons: allIcons,
			heroFilters: heroFilters.length ? heroFilters : undefined,
		};
	}

	private async collectIconsForRoots(
		roots: string[],
		kind: TextureKind,
		source: TextureSource,
		webview: vscode.Webview,
	): Promise<TextureMenuIcon[]> {
		const results: TextureMenuIcon[] = [];
		for (const rawRoot of roots) {
			if (!rawRoot) {
				continue;
			}
			const normalizedRoot = path.normalize(rawRoot);
			if (!this.pathExists(normalizedRoot)) {
				continue;
			}
			const cacheKey = `${source}|${kind}|${normalizedRoot}`;
			let cached = this.textureMenuCache.get(cacheKey);
			if (!cached) {
				cached = await this.scanTextureDirectory(normalizedRoot, kind, source);
				this.textureMenuCache.set(cacheKey, cached);
			}
			for (const icon of cached) {
				results.push({
					...icon,
					uri: webview.asWebviewUri(vscode.Uri.file(icon.filePath)).toString(),
				});
			}
		}
		return results;
	}

	private async scanTextureDirectory(
		root: string,
		kind: TextureKind,
		source: TextureSource,
	): Promise<TextureMenuRawIcon[]> {
		const results: TextureMenuRawIcon[] = [];
		const stack: Array<{ dir: string; relative: string; depth: number; }> = [{ dir: root, relative: '', depth: 0 }];
		while (stack.length) {
			const current = stack.pop()!;
			let entries: fs.Dirent[];
			try {
				entries = await fs.promises.readdir(current.dir, { withFileTypes: true });
			} catch (error) {
				continue;
			}
			for (const entry of entries) {
				const fullPath = path.join(current.dir, entry.name);
				const relativePath = current.relative ? path.join(current.relative, entry.name) : entry.name;
				if (entry.isDirectory()) {
					stack.push({ dir: fullPath, relative: relativePath, depth: current.depth + 1 });
					continue;
				}
				if (!this.isSupportedImage(entry.name)) {
					continue;
				}
				const icon = this.buildRawIconData(root, relativePath, fullPath, kind, source);
				if (icon) {
					results.push(icon);
				}
			}
		}
		return results;
	}

	private isSupportedImage(fileName: string): boolean {
		return /\.(png|jpg|jpeg|webp)$/i.test(fileName);
	}

	private buildRawIconData(
		root: string,
		relativePathInput: string,
		fullPath: string,
		kind: TextureKind,
		source: TextureSource,
	): TextureMenuRawIcon | undefined {
		const normalizedRelative = relativePathInput.replace(/\\/g, '/');
		const withoutExt = normalizedRelative.replace(/\.[^.]+$/u, '');
		const trimmedPath = withoutExt.replace(/_png$/i, '');
		const segments = trimmedPath.split('/').filter(Boolean);
		if (!segments.length) {
			return undefined;
		}
		const heroSlug = kind === 'spell' ? segments[0].toLowerCase() : undefined;
		const textureName = trimmedPath.toLowerCase();
		if (!textureName) {
			return undefined;
		}
		const label = segments[segments.length - 1];
		const searchParts = new Set<string>();
		searchParts.add(textureName);
		searchParts.add(trimmedPath);
		searchParts.add(withoutExt);
		searchParts.add(segments.map((segment) => segment.replace(/_/g, ' ')).join(' '));
		if (heroSlug) {
			searchParts.add(heroSlug);
		}
		const searchKey = Array.from(searchParts)
			.map((part) => part.replace(/[\\/_]+/g, ' '))
			.join(' ')
			.toLowerCase();
		return {
			filePath: fullPath,
			textureName,
			label,
			relativePath: normalizedRelative,
			searchKey,
			source,
			kind,
			hero: heroSlug,
		};
	}

	private async collectHeroFilters(webview: vscode.Webview): Promise<TextureMenuHeroDisplay[]> {
		if (this.heroFilterCache) {
			return this.heroFilterCache.map((hero) => ({
				id: hero.id,
				name: hero.name,
				searchTerm: hero.searchTerm,
				uri: webview.asWebviewUri(vscode.Uri.file(hero.filePath)).toString(),
				attribute: hero.attribute,
			}));
		}
		// prefer icons subfolder for small avatars
		const iconsSub = path.join(this.extensionImagesRoot, 'heroes_icon', 'icons');
		const heroesDir = this.pathExists(iconsSub) ? iconsSub : path.join(this.extensionImagesRoot, 'heroes_icon');
		if (!this.pathExists(heroesDir)) {
			this.heroFilterCache = [];
			return [];
		}

		// build attribute map from resource/npc/npc_heroes.txt
		const attributeMap: Record<string, string | undefined> = {};
		try {
			const heroesTxt = this.context.asAbsolutePath(path.join('resource', 'npc', 'npc_heroes.txt'));
			if (this.pathExists(heroesTxt)) {
				const raw = await fs.promises.readFile(heroesTxt, 'utf8');
				const attrRegex = /"(npc_dota_hero_[a-z0-9_]+)"[\s\S]*?"AttributePrimary"\s+"(DOTA_ATTRIBUTE_[A-Z]+)"/gi;
				let m: RegExpExecArray | null;
				while ((m = attrRegex.exec(raw))) {
					attributeMap[m[1].toLowerCase()] = m[2];
				}
			}
		} catch (e) {
			// ignore
		}

		const heroes: TextureMenuHeroCache[] = [];
		let entries: fs.Dirent[];
		try {
			entries = await fs.promises.readdir(heroesDir, { withFileTypes: true });
		} catch (error) {
			this.heroFilterCache = [];
			return [];
		}
		for (const entry of entries) {
			if (!entry.isFile() || !this.isSupportedImage(entry.name)) {
				continue;
			}
			const fullPath = path.join(heroesDir, entry.name);
			const baseName = entry.name.replace(/\.[^.]+$/u, '');
			const withoutSuffix = baseName.replace(/_png$/i, '');
			const slug = withoutSuffix.replace(/^npc_dota_hero_/i, '').replace(/_/g, ' ').trim();
			const searchTerm = slug || withoutSuffix.replace(/_/g, ' ') || baseName;
			const label = this.toTitleCase(searchTerm);
			let heroKey = withoutSuffix.toLowerCase();
			if (!heroKey.startsWith('npc_dota_hero_')) {
				heroKey = `npc_dota_hero_${heroKey}`;
			}
			heroes.push({
				id: baseName,
				name: label,
				searchTerm,
				filePath: fullPath,
				attribute: attributeMap[heroKey],
			});
		}
		heroes.sort((a, b) => a.name.localeCompare(b.name));
		this.heroFilterCache = heroes;
		return heroes.map((hero) => ({
			id: hero.id,
			name: hero.name,
			searchTerm: hero.searchTerm,
			uri: webview.asWebviewUri(vscode.Uri.file(hero.filePath)).toString(),
			attribute: hero.attribute,
		}));
	}

	private toTitleCase(value: string): string {
		if (!value) {
			return '';
		}
		return value
			.split(/\s+/)
			.filter(Boolean)
			.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
			.join(' ');
	}

	private mergeColumnOrder(globalOrder: string[], rowOrder: string[]): void {
		if (!rowOrder.length) {
			return;
		}
		if (!globalOrder.length) {
			globalOrder.push(...rowOrder);
			return;
		}

		for (let index = 0; index < rowOrder.length; index++) {
			const key = rowOrder[index];
			if (!key || globalOrder.includes(key)) {
				continue;
			}

			let insertIndex = globalOrder.length;

			for (let nextIndex = index + 1; nextIndex < rowOrder.length; nextIndex++) {
				const nextKey = rowOrder[nextIndex];
				const existingIndex = globalOrder.indexOf(nextKey);
				if (existingIndex >= 0) {
					insertIndex = existingIndex;
					break;
				}
			}

			if (insertIndex === globalOrder.length) {
				for (let previousIndex = index - 1; previousIndex >= 0; previousIndex--) {
					const previousKey = rowOrder[previousIndex];
					const existingIndex = globalOrder.indexOf(previousKey);
					if (existingIndex >= 0) {
						insertIndex = existingIndex + 1;
						break;
					}
				}
			}

			globalOrder.splice(insertIndex, 0, key);
		}
	}
	private parseKv(text: string): ParsedKvTable {
		try {
			const kvObject = readKeyValue2(text ?? '');
			const header = Object.keys(kvObject)[0] ?? '';
			const block = header ? kvObject[header] : undefined;
			if (!block || typeof block !== 'object') {
				return { header, columns: [], rows: [] };
			}

			const columnOrder: string[] = [];
			const rows = Object.entries(block)
				.filter(([, value]) => value && typeof value === 'object')
				.map(([id, value]) => {
					const entry = value as Record<string, unknown>;
					const rowValues: Record<string, string> = {};
					const rowColumnOrder: string[] = [];
					const pushRowColumn = (key: string) => {
						if (!rowColumnOrder.includes(key)) {
							rowColumnOrder.push(key);
						}
					};
					let abilityValues: AbilityValuesEntry[] | undefined;
					for (const [key, field] of Object.entries(entry)) {
						if (key === 'AbilityValues' && this.isPlainObject(field)) {
							pushRowColumn(key);
							abilityValues = this.parseAbilityValuesField(field as Record<string, unknown>);
							rowValues[key] = '';
							continue;
						}
						// 特殊处理 Creature 字段 - 扁平化其子字段
						if (key === 'Creature' && this.isPlainObject(field)) {
							const creatureBlock = field as Record<string, unknown>;
							for (const [creatureKey, creatureValue] of Object.entries(creatureBlock)) {
								// DisableClumpingBehavior 和 UsesGestureBasedAttackAnimation 是标量
								if (creatureKey === 'DisableClumpingBehavior' || creatureKey === 'UsesGestureBasedAttackAnimation') {
									pushRowColumn(creatureKey);
									rowValues[creatureKey] = this.coerceKvScalar(creatureValue);
									continue;
								}
								// AttachWearables 是嵌套的数字索引对象
								if (creatureKey === 'AttachWearables' && this.isPlainObject(creatureValue)) {
									pushRowColumn(creatureKey);
									rowValues[creatureKey] = this.parseAttachWearablesField(creatureValue as Record<string, unknown>);
									continue;
								}
								// 其他 Creature 子字段按标量处理
								if (!this.isPlainObject(creatureValue)) {
									pushRowColumn(creatureKey);
									rowValues[creatureKey] = this.coerceKvScalar(creatureValue);
								}
							}
							continue;
						}
						if (this.isPlainObject(field)) {
							// other nested blocks are skipped for now
							continue;
						}
						pushRowColumn(key);
						rowValues[key] = this.coerceKvScalar(field);
					}
					this.mergeColumnOrder(columnOrder, rowColumnOrder);
					// 保存完整的原始对象，用于复制粘贴时保留嵌套结构
					const row: ParsedKvRow = { id, values: rowValues, rawObject: entry };
					if (abilityValues && abilityValues.length) {
						row.abilityValues = abilityValues;
					}
					return row;
				});

			const columns = ['id', ...columnOrder];
			return { header, columns, rows };
		} catch (error) {
			return {
				header: '',
				columns: [],
				rows: [],
				error: error instanceof Error ? error.message : String(error),
			};
		}
	}

	private getDocumentLineEnding(text: string): string {
		return text.includes('\r\n') ? '\r\n' : '\n';
	}

	private extractBaseDirectives(text: string): string[] {
		if (!text) {
			return [];
		}
		return text
			.split(/\r?\n/u)
			.map((line) => line.trim())
			.filter((line) => /^#base\s+"[^"]+"$/u.test(line));
	}

	private serializeKvDocument(kvObject: unknown, originalText: string, depth: number = 0): string {
		const body = writeKeyValue(kvObject, depth);
		const baseDirectives = this.extractBaseDirectives(originalText);
		if (!baseDirectives.length) {
			return body;
		}
		const eol = this.getDocumentLineEnding(originalText);
		return `${baseDirectives.join(eol)}${eol}${eol}${body}`;
	}

	private isPlainObject(value: unknown): value is Record<string, unknown> {
		return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
	}

	private coerceKvScalar(value: unknown): string {
		if (value === undefined || value === null) {
			return '';
		}
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'number' || typeof value === 'boolean') {
			return String(value);
		}
		return String(value);
	}

	private parseAbilityValuesField(field: Record<string, unknown>): AbilityValuesEntry[] {
		const entries: AbilityValuesEntry[] = [];
		for (const [entryKey, entryValue] of Object.entries(field)) {
			if (this.isPlainObject(entryValue)) {
				const block = entryValue as Record<string, unknown>;
				const baseValue = this.coerceKvScalar(block.value);
				const modifiers: AbilityValuesModifier[] = [];
				for (const [modifierKey, modifierValue] of Object.entries(block)) {
					if (modifierKey === 'value') {
						continue;
					}
					modifiers.push({
						key: modifierKey,
						value: this.coerceKvScalar(modifierValue),
					});
				}
				entries.push({
					key: entryKey,
					originalKey: entryKey,
					value: baseValue,
					type: 'object',
					modifiers,
				});
				continue;
			}
			entries.push({
				key: entryKey,
				originalKey: entryKey,
				value: this.coerceKvScalar(entryValue),
				type: 'scalar',
				modifiers: [],
			});
		}
		return entries;
	}

	/**
	 * 解析 AttachWearables 字段，将数字索引的对象数组转换为逗号分隔的 ItemDef 列表
	 * 例如：{ "1": { "ItemDef": "14878" }, "2": { "ItemDef": "22264" } } => "14878,22264"
	 */
	private parseAttachWearablesField(field: Record<string, unknown>): string {
		const itemDefs: string[] = [];
		// 按数字键排序
		const sortedKeys = Object.keys(field).sort((a, b) => {
			const numA = parseInt(a, 10);
			const numB = parseInt(b, 10);
			return numA - numB;
		});
		for (const key of sortedKeys) {
			const entry = field[key];
			if (this.isPlainObject(entry)) {
				const itemDef = (entry as Record<string, unknown>).ItemDef;
				if (itemDef !== undefined && itemDef !== null) {
					itemDefs.push(String(itemDef));
				}
			}
		}
		return itemDefs.join(',');
	}

	private buildTexturePreviews(
		document: vscode.TextDocument,
		rows: ParsedKvRow[] = [],
		webview: vscode.Webview,
		entry: KvEditorEntry | undefined,
	): Record<string, TexturePreviewPayload> {
		if (!rows.length) {
			return {};
		}
		const previewMap: Record<string, TexturePreviewPayload> = {};
		const addonImagesRoot = this.resolveAddonImagesRoot(document.uri.fsPath, entry);
		for (const row of rows) {
			const rowId = typeof row.id === 'string' ? row.id : undefined;
			if (!rowId) {
				continue;
			}
			const textureName = row.values?.AbilityTextureName;
			if (!textureName || typeof textureName !== 'string' || !textureName.trim()) {
				continue;
			}
			const asset = this.findTextureAsset(textureName, addonImagesRoot, entry);
			if (!asset) {
				continue;
			}
			const iconUri = webview.asWebviewUri(vscode.Uri.file(asset.fullPath)).toString();
			previewMap[rowId] = {
				uri: iconUri,
				kind: asset.kind,
				source: asset.source,
				fileName: path.basename(asset.fullPath),
			};
		}
		return previewMap;
	}

	private resolveAddonImagesRoot(documentPath: string, entry: KvEditorEntry | undefined): string | undefined {
		const candidates = new Set<string>();
		// if (entry?.isDirectory) {
		// 	const normalizedEntry = path.normalize(entry.resolvedPath);
		// 	if (/images?$/i.test(path.basename(normalizedEntry))) {
		// 		candidates.add(normalizedEntry);
		// 	}
		// }
		// const entryContentRoot = this.deriveAddonContentRoot(entry?.resolvedPath);
		// if (entryContentRoot) {
		// 	candidates.add(path.join(entryContentRoot, 'panorama', 'images'));
		// }
		// const documentContentRoot = this.deriveAddonContentRoot(documentPath);
		// if (documentContentRoot) {
		// 	candidates.add(path.join(documentContentRoot, 'panorama', 'images'));
		// }
		// const contentDir = getContentDir();
		// if (contentDir) {
		// 	candidates.add(path.join(path.normalize(contentDir), 'panorama', 'images'));
		// }
		const gameDir = getGameDir();
		if (gameDir) {
			candidates.add(path.join(path.normalize(gameDir), 'resource', 'flash3', 'images'));
		}
		for (const candidate of candidates) {
			if (this.pathExists(candidate)) {
				return candidate;
			}
		}
		return undefined;
	}
	private resolveAddonLocalizationRoot(documentPath: string, entry: KvEditorEntry | undefined): string | undefined {
		const candidates = new Set<string>();
		const localizationFiles = this.getLocalizationFileCandidates();
		const entryContentRoot = this.deriveAddonContentRoot(entry?.resolvedPath);
		if (entryContentRoot) {
			for (const fileName of localizationFiles) {
				candidates.add(path.join(entryContentRoot, 'resource', fileName));
				const gameRoot = this.deriveAddonGameRoot(entryContentRoot);
				if (gameRoot) {
					candidates.add(path.join(gameRoot, 'resource', fileName));
				}
			}
		}
		const documentContentRoot = this.deriveAddonContentRoot(documentPath);
		if (documentContentRoot) {
			for (const fileName of localizationFiles) {
				candidates.add(path.join(documentContentRoot, 'resource', fileName));
				const gameRoot = this.deriveAddonGameRoot(documentContentRoot);
				if (gameRoot) {
					candidates.add(path.join(gameRoot, 'resource', fileName));
				}
			}
		}
		const contentDir = getContentDir();
		if (contentDir) {
			for (const fileName of localizationFiles) {
				candidates.add(path.join(path.normalize(contentDir), 'resource', fileName));
			}
		}
		const gameDir = getGameDir();
		if (gameDir) {
			for (const fileName of localizationFiles) {
				candidates.add(path.join(path.normalize(gameDir), 'resource', fileName));
			}
		}
		for (const candidate of candidates) {
			if (this.pathExists(candidate)) {
				return candidate;
			}
		}
		return undefined;
	}

	private getLocalizationFileCandidates(): string[] {
		const language = (vscode.env.language ?? '').toLowerCase();
		const mapping = new Map<string, string>([
			['zh-cn', 'addon_schinese.txt'],
			['zh-hans', 'addon_schinese.txt'],
			['zh', 'addon_schinese.txt'],
			['en', 'addon_english.txt'],
			['en-us', 'addon_english.txt'],
			['en-gb', 'addon_english.txt'],
			['ru', 'addon_russian.txt'],
			['ru-ru', 'addon_russian.txt'],
		]);
		const candidates: string[] = [];
		const pushUnique = (value: string | undefined) => {
			if (value && !candidates.includes(value)) {
				candidates.push(value);
			}
		};
		pushUnique(mapping.get(language));
		const baseLanguage = language.split('-')[0];
		if (baseLanguage && baseLanguage !== language) {
			pushUnique(mapping.get(baseLanguage));
		}
		pushUnique('addon_schinese.txt');
		pushUnique('addon_english.txt');
		pushUnique('addon_russian.txt');
		return candidates;
	}

	private deriveAddonContentRoot(targetPath: string | undefined): string | undefined {
		if (!targetPath) {
			return undefined;
		}

		const normalized = path.normalize(targetPath);
		const forward = normalized.replace(/\\/g, '/');
		const lower = forward.toLowerCase();
		const gameMarker = '/game/dota_addons/';
		const gameIndex = lower.indexOf(gameMarker);
		if (gameIndex >= 0) {
			const base = forward.slice(0, gameIndex);
			const remaining = forward.slice(gameIndex + gameMarker.length);
			const addonName = remaining.split('/')[0];
			if (addonName) {
				return path.normalize(`${base}/content/dota_addons/${addonName}`);
			}
		}
		const contentMarker = '/content/dota_addons/';
		const contentIndex = lower.indexOf(contentMarker);
		if (contentIndex >= 0) {
			const base = forward.slice(0, contentIndex);
			const remaining = forward.slice(contentIndex + contentMarker.length);
			const addonName = remaining.split('/')[0];
			if (addonName) {
				return path.normalize(`${base}/content/dota_addons/${addonName}`);
			}
		}
		return undefined;
	}

	private deriveAddonGameRoot(contentRoot: string | undefined): string | undefined {
		if (!contentRoot) {
			return undefined;
		}
		const normalized = path.normalize(contentRoot);
		const segments = normalized.split(path.sep);
		const contentIndex = segments.findIndex((segment) => segment.toLowerCase() === 'content');
		if (contentIndex >= 0 && segments.length > contentIndex + 1 && segments[contentIndex + 1].toLowerCase() === 'dota_addons') {
			segments[contentIndex] = 'game';
			return segments.join(path.sep);
		}
		return undefined;
	}

	private loadLocalizationTokens(localizationPath: string): LocalizationTokenMap | undefined {
		try {
			const stat = fs.statSync(localizationPath);
			const cached = this.localizationCache.get(localizationPath);
			if (cached && cached.mtimeMs === stat.mtimeMs) {
				return cached.tokens;
			}
			const raw = fs.readFileSync(localizationPath, 'utf8');
			const parsed = readKeyValue2(raw ?? '');

			// Localization VDFs commonly look like:
			// "lang" { "Language" "schinese" "Tokens" { ... } }
			// Some KV parsers (or files) may also produce { Tokens: { ... } } directly.
			// Be robust and accept both shapes.
			let tokensSection: unknown = (parsed as Record<string, unknown> | undefined)?.Tokens;
			if (!tokensSection || typeof tokensSection !== 'object') {
				const langBlock = (parsed as Record<string, unknown> | undefined)?.lang;
				if (langBlock && typeof langBlock === 'object') {
					tokensSection = (langBlock as Record<string, unknown>).Tokens;
				}
			}
			if (!tokensSection || typeof tokensSection !== 'object') {
				// Fallback: if root has exactly one object child, check its Tokens.
				const rootKeys = parsed && typeof parsed === 'object' ? Object.keys(parsed as Record<string, unknown>) : [];
				if (rootKeys.length === 1) {
					const rootChild = (parsed as Record<string, unknown>)[rootKeys[0]];
					if (rootChild && typeof rootChild === 'object') {
						const candidate = (rootChild as Record<string, unknown>).Tokens;
						if (candidate && typeof candidate === 'object') {
							tokensSection = candidate;
						}
					}
				}
			}
			if (!tokensSection || typeof tokensSection !== 'object') {
				return cached?.tokens;
			}
			const entries = tokensSection as Record<string, unknown>;
			const tokens: LocalizationTokenMap = new Map();
			for (const [key, value] of Object.entries(entries)) {
				if (typeof value === 'string') {
					tokens.set(key.toLowerCase(), value);
				}
			}
			this.localizationCache.set(localizationPath, {
				tokens,
				mtimeMs: stat.mtimeMs,
			});
			return tokens;
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to load localization tokens:', error);
			return this.localizationCache.get(localizationPath)?.tokens;
		}
	}

	private findLocalizationToken(tokens: LocalizationTokenMap | undefined, candidateKeys: string[]): string | undefined {
		if (!tokens || !candidateKeys.length) {
			return undefined;
		}
		for (const key of candidateKeys) {
			const normalizedKey = typeof key === 'string' ? key.trim().toLowerCase() : '';
			if (!normalizedKey) {
				continue;
			}
			const value = tokens.get(normalizedKey);
			if (typeof value === 'string' && value.length > 0) {
				return value;
			}
		}
		return undefined;
	}

	private enrichRowsWithLocalization(
		rows: ParsedKvRow[],
		folderType: KvFolderType,
		documentPath: string,
		entry: KvEditorEntry | undefined,
	): void {
		if (!rows.length) {
			return;
		}
		const localizationPath = this.resolveAddonLocalizationRoot(documentPath, entry);
		if (!localizationPath) {
			return;
		}
		const tokens = this.loadLocalizationTokens(localizationPath);
		if (!tokens || !tokens.size) {
			return;
		}
		const isAbilityLike = folderType === 'ability' || folderType === 'item';
		for (const row of rows) {
			const rowId = typeof row.id === 'string' ? row.id.trim() : '';
			if (!rowId) {
				continue;
			}
			const localizationInfo: ParsedKvRowLocalization = {};
			if (isAbilityLike) {
				const baseKey = `dota_tooltip_ability_${rowId.toLowerCase()}`;
				const name = this.findLocalizationToken(tokens, [baseKey, rowId, `dota_tooltip_ability_${rowId}`]);
				if (name) {
					localizationInfo.name = name;
				}
				let description = this.findLocalizationToken(tokens, [
					`${baseKey}_description`,
					`${baseKey}_Description`,
					`dota_tooltip_ability_${rowId}_description`,
					`dota_tooltip_ability_${rowId}_Description`,
				]);
				if (description) {
					const replacements = this.buildLocalizationReplacementMap(row);
					description = this.applyLocalizationReplacements(description, replacements);
					localizationInfo.description = description;
				}
			} else {
				const name = this.findLocalizationToken(tokens, [rowId, rowId.toLowerCase()]);
				if (name) {
					localizationInfo.name = name;
				}
				const description = this.findLocalizationToken(tokens, [
					`${rowId}_description`,
					`${rowId}_Description`,
				]);
				if (description) {
					localizationInfo.description = description;
				}
			}
			if (localizationInfo.name || localizationInfo.description) {
				row.localization = localizationInfo;
			}
		}
	}

	private buildLocalizationReplacementMap(row: ParsedKvRow): Map<string, string> {
		const replacements = new Map<string, string>();
		for (const [key, value] of Object.entries(row.values ?? {})) {
			const normalizedKey = key.trim().toLowerCase();
			const normalizedValue = typeof value === 'string' ? value.trim() : '';
			if (normalizedKey && normalizedValue) {
				replacements.set(normalizedKey, normalizedValue);
			}
		}
		for (const entry of row.abilityValues ?? []) {
			const entryValue = (entry.value ?? '').trim();
			if (entryValue) {
				const entryKey = entry.key?.trim().toLowerCase();
				const originalKey = entry.originalKey?.trim().toLowerCase();
				if (entryKey) {
					replacements.set(entryKey, entryValue);
				}
				if (originalKey && originalKey !== entryKey) {
					replacements.set(originalKey, entryValue);
				}
			}
			for (const modifier of entry.modifiers ?? []) {
				const modifierKey = modifier.key?.trim().toLowerCase();
				const modifierValue = (modifier.value ?? '').trim();
				if (modifierKey && modifierValue) {
					replacements.set(modifierKey, modifierValue);
				}
			}
		}
		return replacements;
	}

	private applyLocalizationReplacements(input: string, replacements: Map<string, string>): string {
		if (!input || !replacements.size) {
			return input;
		}
		return input.replace(/%([^%]+)%/g, (match, token) => {
			const normalizedToken = typeof token === 'string' ? token.trim().toLowerCase() : '';
			if (!normalizedToken) {
				return match;
			}
			const replacement = replacements.get(normalizedToken);
			return replacement !== undefined ? replacement : match;
		});
	}

	private findTextureAsset(textureName: string, addonImagesRoot: string | undefined, entry: KvEditorEntry | undefined): TextureAssetMatch | undefined {
		const normalized = textureName.trim().replace(/\\/g, '/');
		if (!normalized) {
			return undefined;
		}
		const roots: TextureSearchRoot[] = [];
		if (addonImagesRoot && this.pathExists(addonImagesRoot)) {
			roots.push({ root: addonImagesRoot, source: 'addon' });
		}
		if (this.pathExists(this.extensionImagesRoot)) {
			roots.push({ root: this.extensionImagesRoot, source: 'extension' });
		}
		if (!roots.length) {
			return undefined;
		}
		const segments = normalized.split('/').filter(Boolean);
		if (!segments.length) {
			return undefined;
		}
		const baseNameSegment = segments[segments.length - 1];
		const hasExtension = /\.[a-z0-9]+$/i.test(baseNameSegment);
		const baseNameCore = hasExtension ? baseNameSegment.replace(/\.[a-z0-9]+$/i, '') : baseNameSegment;
		const originalExtension = hasExtension ? path.extname(baseNameSegment) : '';
		const firstSegment = segments[0];
		const baseDirProvided = firstSegment === 'items' || firstSegment === 'spellicons';
		const entryType = entry?.type ?? 'custom';
		let baseDirCandidates: string[];
		if (baseDirProvided) {
			baseDirCandidates = [firstSegment];
		} else if (entryType === 'item') {
			baseDirCandidates = ['items', 'spellicons'];
		} else if (entryType === 'ability') {
			baseDirCandidates = ['spellicons', 'items'];
		} else {
			baseDirCandidates = ['spellicons', 'items'];
		}
		const relativePathSegments = baseDirProvided ? segments.slice(1, -1) : segments.slice(0, -1);
		const baseNameVariants = this.buildBaseNameVariants(baseNameCore, entryType, hasExtension ? baseNameSegment : undefined);
		for (const root of roots) {
			const allowPluginSuffix = root.source === 'extension';
			const stripPngSuffix = root.source === 'addon';
			const extensionCandidates = this.buildExtensionCandidates(hasExtension, originalExtension);
			const candidateNames = this.buildCandidateNamesPerRoot(baseNameVariants, extensionCandidates, allowPluginSuffix, stripPngSuffix);
			for (const baseDir of baseDirCandidates) {
				const kind: TextureKind = baseDir === 'items' ? 'item' : 'spell';
				for (const candidateName of candidateNames) {
					const segmentsToJoin = [root.root, baseDir, ...relativePathSegments, candidateName].filter(Boolean);
					const candidatePath = path.join(...segmentsToJoin);
					if (!this.pathExists(candidatePath)) {
						continue;
					}
					return {
						fullPath: candidatePath,
						kind,
						source: root.source,
					};
				}
			}
		}
		return undefined;
	}

	private buildBaseNameVariants(baseNameCore: string, entryType: KvFolderType, baseNameSegment?: string): Set<string> {
		const variants = new Set<string>();
		variants.add(baseNameCore);
		if (baseNameSegment && baseNameSegment !== baseNameCore) {
			variants.add(baseNameSegment.replace(/\.[a-z0-9]+$/i, ''));
		}
		if (entryType === 'item') {
			const trimmed = baseNameCore.replace(/^item_/, '');
			if (trimmed && trimmed !== baseNameCore) {
				variants.add(trimmed);
			}
		}
		return variants;
	}

	private buildExtensionCandidates(hasExtension: boolean, originalExtension: string): string[] {
		if (hasExtension) {
			const normalized = originalExtension.toLowerCase();
			const candidates = new Set<string>([originalExtension]);
			if (normalized !== '.png') {
				candidates.add('.png');
			}
			if (normalized !== '.jpg') {
				candidates.add('.jpg');
			}
			return Array.from(candidates);
		}
		return ['', '.png', '.jpg', '.jpeg', '.webp'];
	}

	private buildCandidateNamesPerRoot(
		baseNameVariants: Set<string>,
		extensionCandidates: string[],
		allowPluginSuffix: boolean,
		stripPngSuffix: boolean,
	): string[] {
		const results = new Set<string>();
		for (const variant of baseNameVariants) {
			const coreCandidates = new Set<string>();
			coreCandidates.add(variant);
			if (stripPngSuffix && /_png$/i.test(variant)) {
				coreCandidates.add(variant.replace(/_png$/i, ''));
			}
			if (allowPluginSuffix && !/_png$/i.test(variant)) {
				coreCandidates.add(`${variant}_png`);
			}
			for (const core of coreCandidates) {
				for (const ext of extensionCandidates) {
					if (ext) {
						results.add(`${core}${ext}`);
					} else {
						results.add(core);
					}
				}
			}
		}
		return Array.from(results);
	}

	private pathExists(target: string | undefined): boolean {
		if (!target) {
			return false;
		}
		try {
			return fs.existsSync(target);
		} catch (error) {
			return false;
		}
	}

	private async handleAbilityValuesEditMessage(
		document: vscode.TextDocument,
		message?: KvEditorAbilityValuesEditMessage,
	): Promise<void> {
		if (!message || typeof message.id !== 'string' || !message.id) {
			return;
		}
		const normalizedEntries = (Array.isArray(message.entries) ? message.entries : [])
			.map((entry) => this.normalizeAbilityValuesEditEntry(entry))
			.filter((entry): entry is AbilityValuesEntry => Boolean(entry));
		const originalText = document.getText();
		const kvObject = readKeyValue2(originalText ?? '');
		const header = Object.keys(kvObject)[0];
		if (!header) {
			throw new Error('无法解析 KV 根节点，修改未保存。');
		}
		const block = kvObject[header];
		if (!block || typeof block !== 'object') {
			throw new Error('当前 KV 结构不支持 AbilityValues 编辑。');
		}
		const row = (block as Record<string, unknown>)[message.id];
		if (!row || typeof row !== 'object') {
			throw new Error(`未找到条目 "${message.id}"，修改未保存。`);
		}
		const record = row as Record<string, unknown>;
		if (!normalizedEntries.length) {
			delete record.AbilityValues;
		} else {
			const abilityBlock: Record<string, unknown> = {};
			for (const entry of normalizedEntries) {
				const key = entry.key;
				if (!key) {
					continue;
				}
				if (entry.type === 'scalar' && (!entry.modifiers || !entry.modifiers.length)) {
					abilityBlock[key] = entry.value ?? '';
					continue;
				}
				const blockValue: Record<string, string> = {};
				blockValue.value = entry.value ?? '';
				for (const modifier of entry.modifiers ?? []) {
					if (!modifier.key) {
						continue;
					}
					blockValue[modifier.key] = modifier.value ?? '';
				}
				abilityBlock[key] = blockValue;
			}
			if (Object.keys(abilityBlock).length) {
				record.AbilityValues = abilityBlock;
			} else {
				delete record.AbilityValues;
			}
		}
		const newContent = this.serializeKvDocument(kvObject, originalText);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await this.applyWorkspaceEditTracked(document, edit);
		if (!applied) {
			throw new Error('写入 KV 文本失败。');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (this.shouldExplicitlySave(document, autoSaveMode)) {
			const saved = await this.saveDocumentTracked(document);
			if (!saved) {
				throw new Error('保存 KV 文件失败。');
			}
		}
	}

	private normalizeAbilityValuesEditEntry(entry: AbilityValuesEditEntry | undefined): AbilityValuesEntry | undefined {
		if (!entry || typeof entry.key !== 'string') {
			return undefined;
		}
		const key = entry.key.trim();
		if (!key) {
			return undefined;
		}
		const rawValue = entry.value;
		const normalizedValue = typeof rawValue === 'string' ? rawValue.trim() : this.coerceKvScalar(rawValue);
		const modifiersRaw = Array.isArray(entry.modifiers) ? entry.modifiers : [];
		const modifiers: AbilityValuesModifier[] = modifiersRaw
			.map((modifier) => {
				if (!modifier || typeof modifier.key !== 'string') {
					return undefined;
				}
				const modifierKey = modifier.key.trim();
				if (!modifierKey) {
					return undefined;
				}
				const modifierValueRaw = modifier.value;
				const modifierValue = typeof modifierValueRaw === 'string'
					? modifierValueRaw.trim()
					: this.coerceKvScalar(modifierValueRaw);
				return {
					key: modifierKey,
					value: modifierValue,
				};
			})
			.filter((modifier): modifier is AbilityValuesModifier => Boolean(modifier));
		const normalizedType: AbilityValuesEntryType = entry.type === 'scalar' && modifiers.length === 0
			? 'scalar'
			: 'object';
		const originalKey = typeof entry.originalKey === 'string' && entry.originalKey.trim().length
			? entry.originalKey.trim()
			: key;
		return {
			key,
			originalKey,
			value: normalizedValue,
			type: normalizedType,
			modifiers,
		};
	}

	/**
	 * 检查一个键是否属于 Creature 字段的子字段
	 */
	private isCreatureField(key: string): boolean {
		return key === 'DisableClumpingBehavior' ||
			key === 'UsesGestureBasedAttackAnimation' ||
			key === 'AttachWearables';
	}

	private getCreatureColumnBounds(columns: string[]): { firstIndex: number; lastIndex: number; } | undefined {
		const indices = columns
			.map((column, index) => (this.isCreatureField(column) ? index : -1))
			.filter((index) => index >= 0);
		if (!indices.length) {
			return undefined;
		}
		return {
			firstIndex: indices[0],
			lastIndex: indices[indices.length - 1],
		};
	}

	/**
	 * 从扁平化的行数据中重建 Creature 结构
	 * @param row 原始行对象
	 * @returns 重建后包含 Creature 结构的行对象
	 */
	private rebuildCreatureStructure(row: Record<string, unknown>): Record<string, unknown> {
		const creatureFields: Record<string, unknown> = {};
		let hasCreatureFields = false;

		for (const key of Object.keys(row)) {
			if (this.isCreatureField(key)) {
				hasCreatureFields = true;
				const value = row[key];

				// AttachWearables 需要从逗号分隔的字符串重建为数字索引对象
				if (key === 'AttachWearables') {
					const itemDefs = String(value).split(',').map(s => s.trim()).filter(s => s.length > 0);
					if (itemDefs.length > 0) {
						const attachWearables: Record<string, Record<string, string>> = {};
						itemDefs.forEach((itemDef, index) => {
							attachWearables[String(index + 1)] = { ItemDef: itemDef };
						});
						creatureFields[key] = attachWearables;
					}
				} else {
					// DisableClumpingBehavior 和 UsesGestureBasedAttackAnimation 直接复制
					creatureFields[key] = value;
				}
			}
		}

		// 如果有 Creature 相关字段，重建结构
		if (hasCreatureFields) {
			const newRow: Record<string, unknown> = {};

			// 复制非 Creature 字段
			for (const [key, value] of Object.entries(row)) {
				if (!this.isCreatureField(key)) {
					newRow[key] = value;
				}
			}

			// 添加 Creature 结构
			if (Object.keys(creatureFields).length > 0) {
				newRow.Creature = creatureFields;
			}

			return newRow;
		}

		return row;
	}

	private handleEditMessage(document: vscode.TextDocument, message?: KvEditorEditMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message || !message.id || !message.key || message.key === 'id') {
				return;
			}
			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，修改未保存。');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('当前 KV 结构不支持直接编辑。');
			}
			const row = (block as Record<string, unknown>)[message.id];
			if (!row || typeof row !== 'object') {
				throw new Error(`未找到条目 "${message.id}"，修改未保存。`);
			}
			const normalizedKey = message.key;
			const normalizedValue = message.value === undefined || message.value === null ? '' : String(message.value);
			const record = row as Record<string, unknown>;

			// 如果是编辑 Creature 相关字段，需要特殊处理
			if (this.isCreatureField(normalizedKey)) {
				// 确保 Creature 对象存在
				let creature = record.Creature as Record<string, unknown> | undefined;
				if (!creature || typeof creature !== 'object') {
					creature = {};
					record.Creature = creature;
				}

				// 更新 Creature 中的字段
				if (normalizedKey === 'AttachWearables') {
					// 将逗号分隔的字符串转换为数字索引对象
					const itemDefs = normalizedValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
					if (itemDefs.length > 0) {
						const attachWearables: Record<string, Record<string, string>> = {};
						itemDefs.forEach((itemDef, index) => {
							attachWearables[String(index + 1)] = { ItemDef: itemDef };
						});
						creature[normalizedKey] = attachWearables;
					} else {
						delete creature[normalizedKey];
					}
				} else {
					// DisableClumpingBehavior 和 UsesGestureBasedAttackAnimation
					if (normalizedValue) {
						creature[normalizedKey] = normalizedValue;
					} else {
						delete creature[normalizedKey];
					}
				}

				// 如果 Creature 为空，删除它
				if (Object.keys(creature).length === 0) {
					delete record.Creature;
				}
			} else {
				// 普通字段直接更新
				const previousValue = record[normalizedKey];
				if ((previousValue === undefined || previousValue === null ? '' : String(previousValue)) === normalizedValue) {
					return;
				}
				record[normalizedKey] = normalizedValue;
			}

			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}

			// 如果启用了本地化绑定，自动导出本地化文件
			const docKey = this.getRelativeDocumentKey(document.uri);
			const localizationSettings = this.localizationSettingsCache.get(docKey);
			if (localizationSettings?.enabled && localizationSettings?.mappings?.length > 0) {
				await this.exportLocalizationFile(document, localizationSettings).catch(err => {
					console.error('自动导出本地化文件失败:', err);
				});
			}
		});
	}

	private handleBulkEditMessage(document: vscode.TextDocument, message?: KvEditorBulkEditMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			const rawEdits = Array.isArray(message?.edits) ? (message?.edits ?? []) : [];
			const edits = rawEdits
				.filter((edit): edit is KvEditorEditMessage => Boolean(edit && edit.id && edit.key && edit.key !== 'id'));
			if (!edits.length) {
				return;
			}
			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，修改未保存。');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('当前 KV 结构不支持直接编辑。');
			}
			let mutated = false;
			for (const edit of edits) {
				const row = (block as Record<string, unknown>)[edit.id];
				if (!row || typeof row !== 'object') {
					continue;
				}
				const normalizedKey = edit.key;
				const normalizedValue = edit.value === undefined || edit.value === null ? '' : String(edit.value);
				const record = row as Record<string, unknown>;

				// 如果是编辑 Creature 相关字段，需要特殊处理
				if (this.isCreatureField(normalizedKey)) {
					// 确保 Creature 对象存在
					let creature = record.Creature as Record<string, unknown> | undefined;
					if (!creature || typeof creature !== 'object') {
						creature = {};
						record.Creature = creature;
					}

					// 更新 Creature 中的字段
					if (normalizedKey === 'AttachWearables') {
						// 将逗号分隔的字符串转换为数字索引对象
						const itemDefs = normalizedValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
						if (itemDefs.length > 0) {
							const attachWearables: Record<string, Record<string, string>> = {};
							itemDefs.forEach((itemDef, index) => {
								attachWearables[String(index + 1)] = { ItemDef: itemDef };
							});
							creature[normalizedKey] = attachWearables;
						} else {
							delete creature[normalizedKey];
						}
					} else {
						// DisableClumpingBehavior 和 UsesGestureBasedAttackAnimation
						if (normalizedValue) {
							creature[normalizedKey] = normalizedValue;
						} else {
							delete creature[normalizedKey];
						}
					}

					// 如果 Creature 为空，删除它
					if (Object.keys(creature).length === 0) {
						delete record.Creature;
					}
					mutated = true;
				} else {
					// 普通字段直接更新
					const previousValue = record[normalizedKey];
					if ((previousValue === undefined || previousValue === null ? '' : String(previousValue)) === normalizedValue) {
						continue;
					}
					record[normalizedKey] = normalizedValue;
					mutated = true;
				}
			}
			if (!mutated) {
				return;
			}
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}

			// 如果启用了本地化绑定，自动导出本地化文件
			const docKey = this.getRelativeDocumentKey(document.uri);
			const localizationSettings = this.localizationSettingsCache.get(docKey);
			if (localizationSettings?.enabled && localizationSettings?.mappings?.length > 0) {
				await this.exportLocalizationFile(document, localizationSettings).catch(err => {
					console.error('自动导出本地化文件失败:', err);
				});
			}
		});
	}

	private handleRenameIdMessage(document: vscode.TextDocument, message?: KvEditorRenameIdMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message || !message.oldId || !message.newId) {
				return;
			}
			const oldId = message.oldId.trim();
			const newId = message.newId.trim();
			if (!oldId || !newId || oldId === newId) {
				return;
			}
			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，修改未保存。');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('当前 KV 结构不支持直接编辑。');
			}
			const blockRecord = block as Record<string, unknown>;
			const oldRow = blockRecord[oldId];
			if (!oldRow) {
				throw new Error(`未找到条目 "${oldId}"，修改未保存。`);
			}
			if (blockRecord[newId] !== undefined) {
				throw new Error(`条目 "${newId}" 已存在，无法重命名。`);
			}

			// 重建对象以保持属性顺序
			const newBlock: Record<string, unknown> = {};
			for (const key of Object.keys(blockRecord)) {
				if (key === oldId) {
					newBlock[newId] = oldRow;
				} else {
					newBlock[key] = blockRecord[key];
				}
			}
			kvObject[header] = newBlock;

			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}

			// 更新公式存储中的 rowId
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (workspaceFolder) {
				const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
				if (documentKey) {
					const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
					if (overrides.formulas && overrides.formulas[documentKey]) {
						const documentFormulas = { ...overrides.formulas[documentKey] };
						const oldRowKey = `id:${oldId}`;
						const newRowKey = `id:${newId}`;

						// 如果存在旧的行键，将其公式移到新的行键下
						if (documentFormulas[oldRowKey]) {
							documentFormulas[newRowKey] = { ...documentFormulas[oldRowKey] };
							delete documentFormulas[oldRowKey];

							overrides.formulas[documentKey] = documentFormulas;
							this.writeColumnOptionOverrides(workspaceFolder, overrides);
						}
					}
				}
			}
		});
	}

	private async handleOpenScriptFile(
		document: vscode.TextDocument,
		payload: OpenScriptFileMessage | undefined,
	): Promise<void> {
		if (!payload) {
			return;
		}
		const rawScriptPath = typeof payload.scriptPath === 'string' ? payload.scriptPath.trim() : '';
		if (!rawScriptPath) {
			void vscode.window.showInformationMessage('当前单元格没有脚本路径。');
			return;
		}
		const folderType = payload.folderType ?? this.detectFolderType(document.uri);
		if (folderType !== 'ability' && folderType !== 'item') {
			void vscode.window.showWarningMessage('当前 KV 类型不支持脚本跳转。');
			return;
		}
		const useTypescript = Boolean(vscode.workspace.getConfiguration().get('dota2-tools.A6.Kv to lua generate typescript'));
		const baseDir = useTypescript ? getContentDir() : getGameDir();
		if (!baseDir) {
			void vscode.window.showWarningMessage('未配置 Dota 2 目录，无法定位脚本文件。');
			return;
		}
		const extension = useTypescript ? '.ts' : '.lua';
		let normalized = rawScriptPath.replace(/\\/g, '/').trim();
		if (!normalized) {
			void vscode.window.showWarningMessage('无法解析脚本路径。');
			return;
		}
		normalized = normalized.replace(/^scripts\/vscripts\//i, '');
		normalized = normalized.replace(/^vscripts\//i, '');
		normalized = normalized.replace(/\.(lua|ts)$/i, '');
		const candidatePath = path.join(baseDir, 'scripts', 'vscripts', `${normalized}${extension}`);
		let fileExists = false;
		try {
			await fs.promises.access(candidatePath, fs.constants.F_OK);
			fileExists = true;
		} catch {
			fileExists = false;
		}

		// 如果文件不存在，创建该文件
		if (!fileExists) {
			const createFile = await vscode.window.showInformationMessage(
				`脚本文件不存在，是否创建？\n${candidatePath}`,
				'创建',
				'取消'
			);
			if (createFile !== '创建') {
				return;
			}

			try {
				// 确保目录存在
				const dirPath = path.dirname(candidatePath);
				await fs.promises.mkdir(dirPath, { recursive: true });

				// 生成脚本模板内容
				const scriptContent = this.generateScriptTemplate(normalized, folderType, useTypescript);
				await fs.promises.writeFile(candidatePath, scriptContent, 'utf8');
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				void vscode.window.showErrorMessage(`创建脚本文件失败：${message}`);
				return;
			}
		}

		try {
			const scriptDocument = await vscode.workspace.openTextDocument(candidatePath);
			await vscode.window.showTextDocument(scriptDocument, { preview: false });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`无法打开脚本文件：${message}`);
		}
	}

	private generateScriptTemplate(scriptPath: string, folderType: KvFolderType, useTypescript: boolean): string {
		// 从路径中提取文件名（不含扩展名）
		const filename = path.basename(scriptPath);
		const luaPath = scriptPath.replace(/\\/g, '/');

		// 尝试读取用户自定义模板
		try {
			const templateConfig = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles') as { ability?: string; item?: string; } | undefined;
			if (templateConfig) {
				const templateKey = folderType === 'item' ? 'item' : 'ability';
				const templateRelPath = templateConfig[templateKey];
				if (templateRelPath) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders && workspaceFolders.length > 0) {
						const templatePath = path.join(workspaceFolders[0].uri.fsPath, templateRelPath);
						if (fs.existsSync(templatePath)) {
							let snippet = fs.readFileSync(templatePath, 'utf8');
							snippet = snippet.replace(/\[filename\]/g, filename);
							snippet = snippet.replace(/\[path\]/g, luaPath);
							snippet = snippet.replace(/__filename_replacer__/g, filename);
							snippet = snippet.replace(/__path_replacer__/g, luaPath);
							return snippet;
						}
					}
				}
			}
		} catch {
			// 忽略模板读取错误，使用默认模板
		}

		// 使用插件内置的默认模板
		try {
			const defaultTemplatePath = path.join(this.context.extensionPath, 'resource', 'lua_template.lua');
			if (fs.existsSync(defaultTemplatePath)) {
				let snippet = fs.readFileSync(defaultTemplatePath, 'utf8');
				snippet = snippet.replace(/filename/g, filename);
				snippet = snippet.replace(/path/g, luaPath);
				return snippet;
			}
		} catch {
			// 忽略模板读取错误
		}

		// 最后的备用模板
		if (useTypescript) {
			return `// ${filename}\n\nexport function ${filename}(): void {\n    // TODO: Implement\n}\n`;
		}
		return `-- ${filename}\n\nfunction ${filename}()\n    -- TODO: Implement\nend\n`;
	}

	private async handleOpenTextEditor(document: vscode.TextDocument): Promise<void> {
		try {
			// 关闭当前的自定义编辑器，打开默认的文本编辑器
			await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			// 用默认编辑器打开文档
			await vscode.window.showTextDocument(document, { preview: false });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`无法打开文本编辑器：${message}`);
		}
	}

	private async handleOpenFormulaHelp(): Promise<void> {
		try {
			const docPath = this.context.asAbsolutePath(path.join('docs', 'kv-editor-formula-guide.md'));
			const docUri = vscode.Uri.file(docPath);
			await vscode.commands.executeCommand('markdown.showPreview', docUri);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`无法打开公式帮助文档：${message}`);
		}
	}

	private async handleOpenLocalizationFile(document: vscode.TextDocument, payload: { path?: string; } | undefined): Promise<void> {
		try {
			const rawPath = typeof payload?.path === 'string' ? payload.path.trim() : '';
			if (!rawPath) {
				void vscode.window.showWarningMessage('未配置本地化文件路径。');
				return;
			}
			const filePath = this.resolveLocalizationFilePath(document, { filePath: rawPath });
			if (!fs.existsSync(filePath)) {
				void vscode.window.showErrorMessage(`本地化文件不存在：${rawPath}`);
				return;
			}
			const localizationDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
			await vscode.window.showTextDocument(localizationDocument, { preview: false });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`无法打开本地化文件：${message}`);
		}
	}

	private async checkAndAutoUpdateLocalization(document: vscode.TextDocument, onRefresh?: () => void): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				return;
			}

			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				return;
			}

			// 读取配置
			const overrides = this.getColumnOptionOverrides(workspaceFolder);
			const settings = overrides.localizationSettings?.[docKey];

			// 如果启用了本地化且有映射配置，加载 AbilityValues 描述缓存
			// 这个操作独立于 autoUpdateOnOpen，确保重启后缓存能恢复
			if (settings && settings.enabled && settings.mappings && settings.mappings.length > 0) {
				const imported = await this.importAbilityValuesDescriptions(document, settings, docKey);
				// 如果成功导入了描述，通知前端刷新
				if (imported > 0 && onRefresh) {
					onRefresh();
				}
			}

			// 检查是否启用了自动更新
			if (!settings || !settings.enabled || !settings.autoUpdateOnOpen) {
				return;
			}

			// 检查是否有映射配置和文件路径
			if (!settings.mappings || settings.mappings.length === 0 || !settings.filePath) {
				return;
			}

			// 执行自动导入（从VDF更新到KV）
			await this.importLocalizationFile(document, settings);
		} catch (error) {
			// 静默失败，不打扰用户
			console.error('Auto update localization error:', error);
		}
	}

	private async exportLocalizationOnSave(document: vscode.TextDocument): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				return;
			}

			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				return;
			}

			// 读取配置
			const overrides = this.getColumnOptionOverrides(workspaceFolder);
			const settings = overrides.localizationSettings?.[docKey];

			// 检查是否启用了本地化绑定
			if (!settings || !settings.enabled) {
				return;
			}

			// 检查是否有映射配置和文件路径
			if (!settings.mappings || settings.mappings.length === 0 || !settings.filePath) {
				return;
			}

			// 执行导出（从KV导出到VDF）
			await this.exportLocalizationFile(document, settings, true);
		} catch (error) {
			// 静默失败，不打扰用户
			console.error('Auto export localization error:', error);
		}
	}

	private async handleRequestLocalizationPath(
		document: vscode.TextDocument,
		webview: vscode.Webview,
		payload: any
	): Promise<void> {
		try {
			const language = payload?.language || 'schinese';
			const localizationBasePath = vscode.workspace.getConfiguration().get<string>('dota2-tools.A5.localization_path') || '';

			// 从document.uri获取KV文件的完整路径
			const kvFilePath = document.uri.fsPath;

			// 提取scripts/npc之后的相对路径
			let kvRelativePath = '';
			const normalizedPath = kvFilePath.replace(/\\/g, '/');
			const npcMatch = normalizedPath.match(/\/scripts\/npc\/(.+)$/i);
			if (npcMatch && npcMatch[1]) {
				kvRelativePath = npcMatch[1];
				// 移除文件扩展名
				kvRelativePath = kvRelativePath.replace(/\.(txt|kv)$/, '');
			}

			if (!kvRelativePath) {
				webview.postMessage({
					type: 'localizationPathResponse',
					payload: { path: '' }
				});
				return;
			}

			// 构建完整路径
			const fullPath = localizationBasePath
				? `${localizationBasePath}/${language}/${kvRelativePath}.vdf`
				: `{localization_path}/${language}/${kvRelativePath}.vdf`;

			webview.postMessage({
				type: 'localizationPathResponse',
				payload: { path: fullPath }
			});
		} catch (error) {
			console.error('Error calculating localization path:', error);
			webview.postMessage({
				type: 'localizationPathResponse',
				payload: { path: '' }
			});
		}
	}

	private async handleSaveLocalizationSettings(
		document: vscode.TextDocument,
		payload: any,
		exportImmediately = true
	): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				throw new Error('未找到工作区文件夹');
			}

			// 读取现有的配置文件
			const overrides = this.readColumnOptionOverridesFromDisk(workspaceFolder);

			// 更新localizationSettings
			if (!overrides.localizationSettings) {
				overrides.localizationSettings = {};
			}

			// 使用工作区相对路径作为key，与其他配置保持一致
			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				throw new Error('无法获取文档相对路径');
			}

			overrides.localizationSettings[docKey] = {
				enabled: Boolean(payload?.enabled),
				language: String(payload?.language || 'schinese'),
				filePath: String(payload?.filePath || ''),
				autoUpdateOnOpen: Boolean(payload?.autoUpdateOnOpen),
				mappings: Array.isArray(payload?.mappings) ? payload.mappings : []
			};

			// 写入文件
			this.writeColumnOptionOverrides(workspaceFolder, overrides);

			// 更新缓存
			this.localizationSettingsCache.set(docKey, overrides.localizationSettings[docKey]);

			// 如果启用了绑定，立即导出一次本地化文件
			if (exportImmediately && payload?.enabled && payload?.mappings && Array.isArray(payload.mappings) && payload?.filePath) {
				await this.exportLocalizationFile(document, payload);
			}

		} catch (error) {
			console.error('Error saving localization settings:', error);
			if (!exportImmediately) {throw error;}
			vscode.window.showErrorMessage(`保存本地化设置失败: ${error}`);
		}
	}

	private resolveLocalizationFilePath(document: vscode.TextDocument, settings: { filePath?: unknown }): string {
		const rawPath = typeof settings.filePath === 'string' ? settings.filePath.trim() : '';
		if (!rawPath) {throw new Error('未配置本地化文件路径。');}
		const macroPath = this.resolveRelativeDocumentKey(rawPath);
		if (macroPath) {return path.normalize(macroPath);}
		if (path.isAbsolute(rawPath)) {return path.normalize(rawPath);}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		const basePath = workspaceFolder?.uri.fsPath ?? path.dirname(document.uri.fsPath);
		return path.resolve(basePath, rawPath);
	}
	private async exportLocalizationFile(document: vscode.TextDocument, settings: any, silent = false): Promise<void> {
		try {
			const language = settings.language || 'schinese';
			const mappings = settings.mappings || [];

			if (mappings.length === 0) {
				return;
			}

			const vdfPath = this.resolveLocalizationFilePath(document, settings);

			// 解析KV文件
			const kvText = document.getText();
			const kvObject = readKeyValue2(kvText);
			const rootKey = Object.keys(kvObject)[0];
			if (!rootKey) {
				return;
			}

			const kvData = kvObject[rootKey];
			if (!kvData || typeof kvData !== 'object') {
				return;
			}

			// 构建tokens对象
			const tokens: Record<string, string> = {};

			// 获取 documentKey 和 AbilityValues 描述缓存
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			const documentKey = workspaceFolder ? this.getDocumentSettingsKey(document.uri, workspaceFolder) : undefined;
			const docDescriptions = documentKey ? this.abilityValuesDescriptionCache.get(documentKey) : undefined;

			// 遍历KV数据的每一行
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				// 对每个映射规则进行处理
				for (const mapping of mappings) {
					const columnName = mapping.columnName;
					const rule = mapping.rule;

					if (!columnName || !rule) {
						continue;
					}

					// 特殊处理 AbilityValues
					if (columnName === 'AbilityValues') {
						const abilityValues = (rowData as any)[columnName];
						if (abilityValues && typeof abilityValues === 'object') {
							const rowDescriptions = docDescriptions?.get(id);
							// 遍历 AbilityValues 的每个 key，导出其描述
							for (const key of Object.keys(abilityValues)) {
								const description = rowDescriptions?.get(key);
								if (description) {
									// 替换规则中的 ${id} 和 ${key}
									const tokenKey = rule
										.replace(/\$\{id\}/g, id)
										.replace(/\$\{key\}/g, key);
									tokens[tokenKey] = description;
								}
							}
						}
						continue;
					}

					// 普通列的处理
					const columnValue = (rowData as any)[columnName];
					if (columnValue === undefined || columnValue === null) {
						continue;
					}

					// 替换规则中的${id}
					const tokenKey = rule.replace(/\$\{id\}/g, id);
					tokens[tokenKey] = String(columnValue);
				}
			}

			// 构建VDF结构
			const vdfObject = {
				lang: {
					Language: this.getLanguageDisplayName(language),
					Tokens: tokens
				}
			};

			// 写入VDF文件
			const vdfContent = writeKeyValue(vdfObject, 0);

			// 添加文件头部注释
			// const fileHeader = '// 此文件由Dota2 KV编辑器自动生成\n// 请勿手动编辑 - 更改将在下次导出时被覆盖\n\n';
			const finalContent = vdfContent;

			// 确保目录存在
			const dir = path.dirname(vdfPath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			// 写入文件
			fs.writeFileSync(vdfPath, finalContent, 'utf8');

			if (!silent) {
				vscode.window.showInformationMessage(`本地化文件已导出: ${path.basename(vdfPath)}`);
			}
		} catch (error) {
			console.error('Error exporting localization file:', error);
			throw error;
		}
	}

	private async importLocalizationFile(document: vscode.TextDocument, settings: any): Promise<void> {
		try {
			const language = settings.language || 'schinese';
			const mappings = settings.mappings || [];

			if (mappings.length === 0) {
				return;
			}

			const vdfPath = this.resolveLocalizationFilePath(document, settings);

			if (!fs.existsSync(vdfPath)) {throw new Error(`本地化文件不存在：${vdfPath}`);}
			const tokens = this.loadLocalizationTokens(vdfPath);
			if (!tokens) {throw new Error('无法读取本地化文件中的 Tokens。');}

			// 解析KV文件
			const kvText = document.getText();
			const kvObject = readKeyValue2(kvText);
			const rootKey = Object.keys(kvObject)[0];
			if (!rootKey) {
				return;
			}

			const kvData = kvObject[rootKey];
			if (!kvData || typeof kvData !== 'object') {
				return;
			}

			let hasChanges = false;

			// 遍历KV数据的每一行
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				// 对每个映射规则进行处理
				for (const mapping of mappings) {
					const columnName = mapping.columnName;
					const rule = mapping.rule;

					if (!columnName || !rule) {
						continue;
					}

					// 替换规则中的${id}生成token key
					const tokenKey = rule.replace(/\$\{id\}/g, id);
					const tokenValue = tokens.get(tokenKey.toLowerCase());

					if (tokenValue !== undefined) {
						const currentValue = (rowData as any)[columnName];
						// 只有当值不同时才更新
						if (currentValue !== tokenValue) {
							(rowData as any)[columnName] = tokenValue;
							hasChanges = true;
						}
					}
				}
			}

			// 如果有修改，写回文件
			if (hasChanges) {
				const newKvText = this.serializeKvDocument(kvObject, kvText, 0);
				const edit = new vscode.WorkspaceEdit();
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(document.getText().length)
				);
				edit.replace(document.uri, fullRange, newKvText);
				await this.applyWorkspaceEditTracked(document, edit);
			}
		} catch (error) {
			console.error('Error importing localization file:', error);
			throw error;
		}
	}

	private async importAbilityValuesDescriptions(document: vscode.TextDocument, settings: any, documentKey: string): Promise<number> {
		try {
			const language = settings.language || 'schinese';
			const mappings = settings.mappings || [];

			// 查找 AbilityValues 的映射规则
			const abilityValuesMapping = mappings.find((m: any) => m.columnName === 'AbilityValues');
			if (!abilityValuesMapping || !abilityValuesMapping.rule) {
				return 0;
			}

			const vdfPath = this.resolveLocalizationFilePath(document, settings);

			if (!fs.existsSync(vdfPath)) {
				return 0;
			}

			// 读取VDF文件中的 tokens
			const tokens = this.loadLocalizationTokens(vdfPath);
			if (!tokens) {
				return 0;
			}

			// 解析KV文件以获取所有行的id和AbilityValues的key
			const kvText = document.getText();
			const kvObject = readKeyValue2(kvText);
			const rootKey = Object.keys(kvObject)[0];
			if (!rootKey) {
				return 0;
			}

			const kvData = kvObject[rootKey];
			if (!kvData || typeof kvData !== 'object') {
				return 0;
			}

			// 创建或获取文档的描述缓存
			let docDescriptions = this.abilityValuesDescriptionCache.get(documentKey);
			if (!docDescriptions) {
				docDescriptions = new Map();
				this.abilityValuesDescriptionCache.set(documentKey, docDescriptions);
			}

			// 清空现有描述
			docDescriptions.clear();

			let totalDescriptionsFound = 0;

			// 遍历每一行，提取 AbilityValues 的描述
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				const abilityValues = (rowData as any)['AbilityValues'];
				if (!abilityValues || typeof abilityValues !== 'object') {
					continue;
				}

				const rowDescriptions = new Map<string, string>();

				// 遍历 AbilityValues 的每个key
				for (const key of Object.keys(abilityValues)) {
					// 根据规则生成 token key: ${id} 和 ${key}
					const tokenKey = abilityValuesMapping.rule
						.replace(/\$\{id\}/g, id)
						.replace(/\$\{key\}/g, key);

					const description = tokens.get(tokenKey.toLowerCase());
					if (description) {
						rowDescriptions.set(key, description);
						totalDescriptionsFound++;
					}
				}

				if (rowDescriptions.size > 0) {
					docDescriptions.set(id, rowDescriptions);
				}
			}

			return totalDescriptionsFound;
		} catch (error) {
			console.error('Error importing AbilityValues descriptions:', error);
			return 0;
		}
	}

	private async handleSaveAbilityValuesDescriptions(
		document: vscode.TextDocument,
		payload: any,
		exportImmediately = true
	): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				throw new Error('未找到工作区文件夹');
			}

			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				throw new Error('无法获取文档相对路径');
			}

			const rowId = payload?.rowId;
			const descriptions = payload?.descriptions; // Record<string, string>

			if (!rowId || typeof descriptions !== 'object') {
				throw new Error('无效的payload');
			}

			// 获取或创建文档的描述缓存
			let docDescriptions = this.abilityValuesDescriptionCache.get(docKey);
			if (!docDescriptions) {
				docDescriptions = new Map();
				this.abilityValuesDescriptionCache.set(docKey, docDescriptions);
			}

			// 更新该行的描述
			const rowDescriptions = new Map<string, string>();
			for (const [key, description] of Object.entries(descriptions)) {
				if (description && typeof description === 'string') {
					rowDescriptions.set(key, description);
				}
			}
			docDescriptions.set(rowId, rowDescriptions);

			// 检查是否启用了本地化，如果启用则立即导出
			const settings = this.localizationSettingsCache.get(docKey);
			if (exportImmediately && settings?.enabled && settings.autoUpdateOnOpen) {
				await this.exportLocalizationFile(document, settings, true);
			}

		} catch (error) {
			console.error('Error saving AbilityValues descriptions:', error);
			vscode.window.showErrorMessage(`保存描述失败: ${error}`);
		}
	}

	private getLanguageDisplayName(language: string): string {
		const languageMap: Record<string, string> = {
			'schinese': 'Schinese',
			'tchinese': 'Tchinese',
			'english': 'English',
			'russian': 'Russian',
			'japanese': 'Japanese',
			'korean': 'Korean',
			'spanish': 'Spanish',
			'german': 'German',
			'french': 'French',
			'portuguese': 'Portuguese',
			'polish': 'Polish',
			'thai': 'Thai'
		};
		return languageMap[language.toLowerCase()] || 'English';
	}

	/**
	 * 将文档URI转换为团队协作友好的相对路径格式
	 * 例如: file:///f:/path/to/game/scripts/npc/items/bless.kv -> ${content}/scripts/npc/items/bless.kv
	 * 注意：KV文件虽然在game目录下，但为了统一性，统一使用${content}作为基准
	 */
	private getRelativeDocumentKey(documentUri: vscode.Uri): string {
		const fsPath = documentUri.fsPath;
		const normalizedPath = fsPath.replace(/\\/g, '/');

		// 尝试提取scripts/npc之后的路径（优先使用这个，因为更通用）
		const npcMatch = normalizedPath.match(/\/(scripts\/npc\/.+)$/i);
		if (npcMatch && npcMatch[1]) {
			return `\${content}/${npcMatch[1]}`;
		}

		// 尝试匹配content目录
		const contentDir = getContentDir();
		if (contentDir) {
			const normalizedContentDir = contentDir.replace(/\\/g, '/');
			if (normalizedPath.startsWith(normalizedContentDir)) {
				const relativePath = normalizedPath.substring(normalizedContentDir.length).replace(/^\//, '');
				return `\${content}/${relativePath}`;
			}
		}

		// 如果content目录不可用，尝试匹配game目录
		const gameDir = getGameDir();
		if (gameDir) {
			const normalizedGameDir = gameDir.replace(/\\/g, '/');
			if (normalizedPath.startsWith(normalizedGameDir)) {
				const relativePath = normalizedPath.substring(normalizedGameDir.length).replace(/^\//, '');
				// 即使匹配到game目录，也使用${content}作为前缀，保持一致性
				return `\${content}/${relativePath}`;
			}
		}

		// 最后回退到使用URI字符串
		return documentUri.toString();
	}

	/**
	 * 将相对路径转换为实际的文件路径
	 * 例如: ${content}/scripts/npc/items/bless.kv -> /actual/path/to/content/scripts/npc/items/bless.kv
	 */
	private resolveRelativeDocumentKey(relativeKey: string): string | undefined {
		if (relativeKey.startsWith('${content}/')) {
			const contentDir = getContentDir();
			if (contentDir) {
				const relativePath = relativeKey.substring('${content}/'.length);
				return path.join(contentDir, relativePath).replace(/\\/g, '/');
			}
		} else if (relativeKey.startsWith('${game}/')) {
			const gameDir = getGameDir();
			if (gameDir) {
				const relativePath = relativeKey.substring('${game}/'.length);
				return path.join(gameDir, relativePath).replace(/\\/g, '/');
			}
		}
		return undefined;
	}

	private async handleReorderRows(document: vscode.TextDocument, payload: KvEditorReorderMessage | undefined): Promise<void> {
		if (!payload) {
			return;
		}
		const sourceId = typeof payload.sourceId === 'string' ? payload.sourceId : '';
		const sourceIndex = typeof payload.sourceIndex === 'number' ? payload.sourceIndex : -1;
		const targetIndex = typeof payload.targetIndex === 'number' ? payload.targetIndex : -1;
		if (!sourceId || sourceIndex < 0 || targetIndex < 0 || !Number.isInteger(sourceIndex) || !Number.isInteger(targetIndex)) {
			return;
		}
		if (sourceIndex === targetIndex) {
			return;
		}
		const originalText = document.getText();
		const kvObject = readKeyValue2(originalText ?? '');
		const header = Object.keys(kvObject)[0];
		if (!header) {
			throw new Error('无法解析 KV 根节点，未执行排序。');
		}
		const blockRaw = kvObject[header];
		if (!blockRaw || typeof blockRaw !== 'object') {
			throw new Error('当前 KV 结构不支持行排序。');
		}
		const block = blockRaw as Record<string, unknown>;
		const entries = Object.entries(block);
		if (!entries.length) {
			return;
		}
		const rowEntryIndices: number[] = [];
		const rowEntries: Array<[string, unknown]> = [];
		entries.forEach((entry, index) => {
			const [, value] = entry;
			if (this.isPlainObject(value)) {
				rowEntryIndices.push(index);
				rowEntries.push(entry);
			}
		});
		if (!rowEntries.length) {
			return;
		}
		const actualSourceIndex = rowEntries.findIndex(([key]) => key === sourceId);
		if (actualSourceIndex === -1) {
			return;
		}
		const totalRows = rowEntries.length;
		let finalTargetIndex = Math.max(0, Math.min(targetIndex, totalRows - 1));
		if (finalTargetIndex === actualSourceIndex) {
			return;
		}
		const removed = rowEntries.splice(actualSourceIndex, 1);
		if (!removed.length) {
			return;
		}
		const movedEntry = removed[0];
		const insertionIndex = Math.min(finalTargetIndex, rowEntries.length);
		rowEntries.splice(insertionIndex, 0, movedEntry);
		const reorderedBlock: Record<string, unknown> = {};
		const rowIndexSet = new Set(rowEntryIndices);
		let rowPointer = 0;
		entries.forEach((entry, index) => {
			if (rowIndexSet.has(index)) {
				const nextRow = rowEntries[rowPointer++];
				if (nextRow) {
					reorderedBlock[nextRow[0]] = nextRow[1];
				} else {
					reorderedBlock[entry[0]] = entry[1];
				}
			} else {
				reorderedBlock[entry[0]] = entry[1];
			}
		});
		kvObject[header] = reorderedBlock;
		const newContent = this.serializeKvDocument(kvObject, originalText);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await this.applyWorkspaceEditTracked(document, edit);
		if (!applied) {
			throw new Error('写入 KV 文本失败。');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (this.shouldExplicitlySave(document, autoSaveMode)) {
			const saved = await this.saveDocumentTracked(document);
			if (!saved) {
				throw new Error('保存 KV 文件失败。');
			}
		}
	}

	private handleInsertRow(document: vscode.TextDocument, message?: KvEditorInsertRowMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message) {
				return;
			}
			const position = message.position === 'before' || message.position === 'after' ? message.position : undefined;
			if (!position) {
				return;
			}
			const referenceIndex = Number(message.referenceIndex);
			if (!Number.isFinite(referenceIndex)) {
				return;
			}
			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，未执行插入。');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('当前 KV 结构不支持行插入。');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);
			const rowEntries = entries
				.map(([key, value], index) => ({ key, value, index }))
				.filter((entry) => this.isPlainObject(entry.value));
			const totalRows = rowEntries.length;
			const referenceId = typeof message.referenceId === 'string' ? message.referenceId.trim() : '';
			let referenceInfo = referenceId ? rowEntries.find((entry) => entry.key === referenceId) : undefined;
			let referenceRowPosition = referenceInfo ? rowEntries.findIndex((entry) => entry.key === referenceInfo?.key) : -1;
			if (!referenceInfo && totalRows) {
				const clampedIndex = Math.max(0, Math.min(totalRows - 1, Math.floor(referenceIndex)));
				referenceInfo = rowEntries[clampedIndex];
				referenceRowPosition = clampedIndex;
			}
			let insertionEntryIndex = entries.length;
			let insertionRowIndex = totalRows;
			if (referenceInfo && referenceRowPosition >= 0) {
				if (position === 'before') {
					insertionEntryIndex = referenceInfo.index;
					insertionRowIndex = referenceRowPosition;
				} else {
					insertionEntryIndex = referenceInfo.index + 1;
					insertionRowIndex = referenceRowPosition + 1;
				}
			} else if (!totalRows) {
				insertionEntryIndex = entries.length;
				insertionRowIndex = 0;
			} else {
				const fallback = rowEntries[rowEntries.length - 1];
				const fallbackPosition = rowEntries.length - 1;
				if (position === 'before') {
					insertionEntryIndex = fallback.index;
					insertionRowIndex = fallbackPosition;
				} else {
					insertionEntryIndex = fallback.index + 1;
					insertionRowIndex = fallbackPosition + 1;
				}
			}
			insertionEntryIndex = Math.max(0, Math.min(entries.length, insertionEntryIndex));
			const maxRowIndex = Math.max(0, totalRows);
			insertionRowIndex = Math.max(0, Math.min(maxRowIndex, insertionRowIndex));
			const newRowKey = this.generateUniqueRowKey(block);
			const newRowValue = this.buildInitialRowValue(rowEntries, referenceInfo, insertionRowIndex);
			const newEntries = entries.slice();
			newEntries.splice(insertionEntryIndex, 0, [newRowKey, newRowValue]);
			const reorderedBlock: Record<string, unknown> = {};
			newEntries.forEach(([key, value]) => {
				reorderedBlock[key] = value;
			});
			kvObject[header] = reorderedBlock;
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			try {
				this.shiftFormulaRowIndices(document, insertionRowIndex, 1);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after insertion:', error);
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}
		});
	}

	private handleBulkInsertRows(document: vscode.TextDocument, message?: KvEditorBulkInsertRowsMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message || !message.rows || message.rows.length === 0) {
				return;
			}


			const insertAfterIndex = Number(message.insertAfterIndex);
			if (!Number.isFinite(insertAfterIndex)) {
				return;
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，未执行批量插入。');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('当前 KV 结构不支持批量插入。');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);
			const rowEntries = entries
				.map(([key, value], index) => ({ key, value, index }))
				.filter((entry) => this.isPlainObject(entry.value));
			const totalRows = rowEntries.length;

			// 计算插入位置
			let insertionEntryIndex = entries.length;
			let insertionRowIndex = totalRows;

			if (insertAfterIndex >= 0 && insertAfterIndex < totalRows) {
				const referenceInfo = rowEntries[insertAfterIndex];
				insertionEntryIndex = referenceInfo.index + 1;
				insertionRowIndex = insertAfterIndex + 1;
			}

			insertionEntryIndex = Math.max(0, Math.min(entries.length, insertionEntryIndex));

			const newEntries = entries.slice();
			let insertedCount = 0;


			// 批量插入行
			for (const rowData of message.rows) {
				// 生成唯一 key 时需要考虑已插入的行
				const updatedBlock: Record<string, unknown> = {};
				newEntries.forEach(([key, value]) => {
					updatedBlock[key] = value;
				});

				const newRowKey = this.generateUniqueRowKey(updatedBlock);
				const newRowValue: Record<string, unknown> = {};


				// 优先使用 rawObject 完整复制（保留嵌套结构），否则使用 values
				const usedRawObject = !!(rowData.rawObject && typeof rowData.rawObject === 'object');

				if (usedRawObject) {
					// 深拷贝原始对象，保留所有嵌套结构（如 AttackRangeActivityModifiers, animation_transitions 等）
					for (const [key, value] of Object.entries(rowData.rawObject!)) {
						if (key === 'AbilityValues') {
							// AbilityValues 特殊处理，稍后覆盖
							continue;
						}
						if (this.isPlainObject(value)) {
							// 深拷贝嵌套对象
							newRowValue[key] = JSON.parse(JSON.stringify(value));
						} else {
							newRowValue[key] = value;
						}
					}
				} else if (rowData.values && typeof rowData.values === 'object') {
					// 后备方案：使用扁平化的 values
					Object.assign(newRowValue, rowData.values);
				}

				// 处理 AbilityValues
				if (rowData.abilityValues && Array.isArray(rowData.abilityValues)) {
					const abilityValuesBlock: Record<string, unknown> = {};
					for (const entry of rowData.abilityValues as unknown as AbilityValuesEntry[]) {
						const key = entry.key;
						if (!key) {
							continue;
						}
						// 如果是纯标量且没有修饰符，直接保存值
						if (entry.type === 'scalar' && (!entry.modifiers || !entry.modifiers.length)) {
							abilityValuesBlock[key] = entry.value ?? '';
							continue;
						}
						// 否则保存为对象结构
						const blockValue: Record<string, string> = {};
						blockValue.value = entry.value ?? '';
						for (const modifier of entry.modifiers ?? []) {
							if (!modifier.key) {
								continue;
							}
							blockValue[modifier.key] = modifier.value ?? '';
						}
						abilityValuesBlock[key] = blockValue;
					}
					if (Object.keys(abilityValuesBlock).length) {
						newRowValue['AbilityValues'] = abilityValuesBlock;
					}
				}

				// 只有在使用扁平化 values 时才需要重建 Creature 结构
				// 使用 rawObject 时 Creature 已经是正确的嵌套结构
				if (!usedRawObject) {
					const rebuiltRowValue = this.rebuildCreatureStructure(newRowValue);
					newEntries.splice(insertionEntryIndex + insertedCount, 0, [newRowKey, rebuiltRowValue]);
				} else {
					newEntries.splice(insertionEntryIndex + insertedCount, 0, [newRowKey, newRowValue]);
				}
				insertedCount++;
			}


			// 收集所有需要保存的公式
			const formulasToSave: Array<{ column: string; rowId: string; rowIndex: number; formula: string; }> = [];
			message.rows.forEach((rowData, index) => {
				if (rowData.formulas && typeof rowData.formulas === 'object') {
					const targetRowIndex = insertionRowIndex + index;
					const newRowKey = newEntries[insertionEntryIndex + index]?.[0] as string;
					if (newRowKey) {
						for (const [column, formula] of Object.entries(rowData.formulas)) {
							if (typeof formula === 'string' && formula.trim().startsWith('=')) {
								formulasToSave.push({
									column,
									rowId: newRowKey,
									rowIndex: targetRowIndex,
									formula: formula.trim(),
								});
							}
						}
					}
				}
			});

			const reorderedBlock: Record<string, unknown> = {};
			newEntries.forEach(([key, value]) => {
				reorderedBlock[key] = value;
			});

			kvObject[header] = reorderedBlock;
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}

			// 调整公式行索引
			try {
				this.shiftFormulaRowIndices(document, insertionRowIndex, insertedCount);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after bulk insertion:', error);
			}

			// 保存所有公式
			if (formulasToSave.length > 0) {
				for (const formulaData of formulasToSave) {
					await this.handleSaveFormula(document, formulaData);
				}
			}

			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}
		});
	}

	private handleDeleteRow(document: vscode.TextDocument, message?: KvEditorDeleteRowMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message) {
				return;
			}
			const rowId = typeof message.rowId === 'string' ? message.rowId.trim() : '';
			const rowIndex = Number(message.rowIndex);

			if (!rowId) {
				return;
			}
			if (!Number.isFinite(rowIndex)) {
				return;
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，未执行删除。');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('当前 KV 结构不支持行删除。');
			}
			const block = blockRaw as Record<string, unknown>;

			// 验证行是否存在
			if (!(rowId in block)) {
				throw new Error(`行 "${rowId}" 不存在。`);
			}

			// 删除指定行
			const newBlock: Record<string, unknown> = {};
			for (const [key, value] of Object.entries(block)) {
				if (key !== rowId) {
					newBlock[key] = value;
				}
			}

			kvObject[header] = newBlock;
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}

			// 更新公式的行索引（删除行后，后面的行索引需要减1）
			try {
				this.shiftFormulaRowIndices(document, rowIndex, -1);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after deletion:', error);
			}

			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}
		});
	}

	private handleInsertColumn(document: vscode.TextDocument, message?: KvEditorInsertColumnMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message) {
				return;
			}
			const position = message.position === 'before' || message.position === 'after' ? message.position : undefined;
			if (!position) {
				return;
			}
			const referenceKey = typeof message.referenceKey === 'string' ? message.referenceKey.trim() : '';
			const columnName = typeof message.columnName === 'string' ? message.columnName.trim() : '';
			const referenceIndex = Number(message.referenceIndex);

			if (!referenceKey || !columnName) {
				return;
			}
			if (!Number.isFinite(referenceIndex) || referenceIndex < 0) {
				return;
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，未执行插入。');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('当前 KV 结构不支持列插入。');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);

			// 验证列名是否已存在
			const parsed = this.parseKv(originalText);
			if (parsed.columns.includes(columnName) || columnName === 'id') {
				throw new Error(`列名 "${columnName}" 已存在。`);
			}

			// 验证列名是否合法
			if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)) {
				throw new Error('列名只能包含字母、数字和下划线，且不能以数字开头。');
			}

			// 在每一行的指定位置插入新列
			const updatedBlock: Record<string, unknown> = {};
			for (const [rowKey, rowValue] of entries) {
				if (!this.isPlainObject(rowValue)) {
					updatedBlock[rowKey] = rowValue;
					continue;
				}

				const rowRecord = rowValue as Record<string, unknown>;
				const rowEntries = Object.entries(rowRecord);

				// 找到参考列的位置
				const referencePosition = rowEntries.findIndex(([key]) => key === referenceKey);

				if (referencePosition === -1) {
					// 如果找不到参考列，直接添加到末尾
					updatedBlock[rowKey] = {
						...rowRecord,
						[columnName]: '',
					};
				} else {
					// 在参考列的指定位置插入新列
					const insertPosition = position === 'before' ? referencePosition : referencePosition + 1;
					const newRowEntries = rowEntries.slice();
					newRowEntries.splice(insertPosition, 0, [columnName, '']);

					const newRowRecord: Record<string, unknown> = {};
					for (const [key, value] of newRowEntries) {
						newRowRecord[key] = value;
					}
					updatedBlock[rowKey] = newRowRecord;
				}
			}

			kvObject[header] = updatedBlock;
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}
		});
	}

	private handleDeleteColumn(document: vscode.TextDocument, message?: KvEditorDeleteColumnMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message) {
				return;
			}
			const columnKey = typeof message.columnKey === 'string' ? message.columnKey.trim() : '';

			if (!columnKey) {
				return;
			}

			// id 列不能删除
			if (columnKey === 'id') {
				throw new Error('id 列不能删除。');
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('无法解析 KV 根节点，未执行删除。');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('当前 KV 结构不支持列删除。');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);

			// 验证列名是否存在
			const parsed = this.parseKv(originalText);
			if (!parsed.columns.includes(columnKey)) {
				throw new Error(`列 "${columnKey}" 不存在。`);
			}
			const previousColumns = parsed.columns.slice();
			const nextColumns = previousColumns.filter((key) => key !== columnKey);

			// 从每一行中删除指定列
			const updatedBlock: Record<string, unknown> = {};
			for (const [rowKey, rowValue] of entries) {
				if (!this.isPlainObject(rowValue)) {
					updatedBlock[rowKey] = rowValue;
					continue;
				}

				const rowRecord = rowValue as Record<string, unknown>;
				const newRowRecord: Record<string, unknown> = {};

				// 如果是 Creature 相关字段，需要从 Creature 对象中删除
				if (this.isCreatureField(columnKey)) {
					// 复制所有非 Creature 字段
					for (const [key, value] of Object.entries(rowRecord)) {
						if (key === 'Creature' && this.isPlainObject(value)) {
							const creature = { ...(value as Record<string, unknown>) };
							delete creature[columnKey];
							// 如果 Creature 还有其他字段，保留它；否则删除整个 Creature
							if (Object.keys(creature).length > 0) {
								newRowRecord[key] = creature;
							}
						} else {
							newRowRecord[key] = value;
						}
					}
				} else {
					// 普通列：复制除了要删除的列之外的所有列
					for (const [key, value] of Object.entries(rowRecord)) {
						if (key !== columnKey) {
							newRowRecord[key] = value;
						}
					}
				}

				updatedBlock[rowKey] = newRowRecord;
			}

			kvObject[header] = updatedBlock;
			const newContent = this.serializeKvDocument(kvObject, originalText);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await this.applyWorkspaceEditTracked(document, edit);
			if (!applied) {
				throw new Error('写入 KV 文本失败。');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (this.shouldExplicitlySave(document, autoSaveMode)) {
				const saved = await this.saveDocumentTracked(document);
				if (!saved) {
					throw new Error('保存 KV 文件失败。');
				}
			}
			this.syncStoredFormulasForColumnChange(document, previousColumns, nextColumns, columnKey);
		});
	}

	private buildInitialRowValue(
		rowEntries: Array<{ key: string; value: unknown; index: number; }>,
		referenceEntry: { key: string; value: unknown; index: number; } | undefined,
		insertionRowIndex: number,
	): Record<string, unknown> {
		const totalRows = rowEntries.length;
		let templateEntry = referenceEntry;
		if ((!templateEntry || !this.isPlainObject(templateEntry.value)) && totalRows > 0) {
			const fallbackIndex = Math.min(Math.max(0, insertionRowIndex > 0 ? insertionRowIndex - 1 : 0), totalRows - 1);
			const fallbackEntry = rowEntries[fallbackIndex];
			if (fallbackEntry && this.isPlainObject(fallbackEntry.value)) {
				templateEntry = fallbackEntry;
			}
		}
		let columnKeys: string[] = [];
		if (templateEntry && this.isPlainObject(templateEntry.value)) {
			columnKeys = this.extractTemplateScalarColumns(templateEntry.value as Record<string, unknown>);
		}
		if (!columnKeys.length) {
			columnKeys = this.collectTemplateScalarColumns(rowEntries);
		}
		const newRow: Record<string, unknown> = {};
		for (const key of columnKeys) {
			newRow[key] = '';
		}
		return newRow;
	}

	private extractTemplateScalarColumns(rowValue: Record<string, unknown>): string[] {
		const keys: string[] = [];
		for (const [key, value] of Object.entries(rowValue)) {
			if (this.shouldSkipTemplateColumn(key, value)) {
				continue;
			}
			keys.push(key);
		}
		return keys;
	}

	private collectTemplateScalarColumns(rowEntries: Array<{ key: string; value: unknown; index: number; }>): string[] {
		const seen = new Set<string>();
		const keys: string[] = [];
		for (const entry of rowEntries) {
			if (!this.isPlainObject(entry.value)) {
				continue;
			}
			const rowValue = entry.value as Record<string, unknown>;
			for (const [key, value] of Object.entries(rowValue)) {
				if (seen.has(key) || this.shouldSkipTemplateColumn(key, value)) {
					continue;
				}
				seen.add(key);
				keys.push(key);
			}
		}
		return keys;
	}

	private shouldSkipTemplateColumn(key: string, value: unknown): boolean {
		if (!key) {
			return true;
		}
		if (key === 'id') {
			return true;
		}
		if (key.startsWith('//')) {
			return true;
		}
		if (key === 'AbilityValues') {
			return true;
		}
		if (this.isPlainObject(value)) {
			return true;
		}
		return false;
	}

	private async handleReorderColumns(document: vscode.TextDocument, payload: KvEditorColumnReorderMessage | undefined): Promise<void> {
		if (!payload) {
			return;
		}
		const sourceKey = typeof payload.sourceKey === 'string' ? payload.sourceKey : '';
		const sourceIndex = typeof payload.sourceIndex === 'number' ? payload.sourceIndex : -1;
		const targetIndex = typeof payload.targetIndex === 'number' ? payload.targetIndex : -1;
		if (!sourceKey || sourceIndex <= 0 || targetIndex <= 0 || !Number.isInteger(sourceIndex) || !Number.isInteger(targetIndex)) {
			return;
		}
		const originalText = document.getText();
		const parsed = this.parseKv(originalText);
		if (!parsed.columns.length) {
			return;
		}
		const columns = parsed.columns.slice();
		const previousColumns = columns.slice();
		if (this.isCreatureField(sourceKey)) {
			return;
		}
		const sourcePosition = columns.indexOf(sourceKey);
		if (sourcePosition <= 0 || sourcePosition !== sourceIndex) {
			return;
		}
		const creatureBounds = this.getCreatureColumnBounds(columns);
		if (creatureBounds && targetIndex > creatureBounds.firstIndex && targetIndex <= creatureBounds.lastIndex) {
			return;
		}
		const kvObject = readKeyValue2(originalText ?? '');
		const header = Object.keys(kvObject)[0];
		if (!header) {
			throw new Error('无法解析 KV 根节点，未执行列排序。');
		}
		const blockRaw = kvObject[header];
		if (!blockRaw || typeof blockRaw !== 'object') {
			throw new Error('当前 KV 结构不支持列排序。');
		}
		const totalColumns = columns.length;
		let finalTargetIndex = Math.max(1, Math.min(targetIndex, totalColumns - 1));
		if (finalTargetIndex === sourcePosition) {
			return;
		}
		const [movedKey] = columns.splice(sourcePosition, 1);
		columns.splice(finalTargetIndex, 0, movedKey);
		const orderedKeys = columns.filter((key) => key !== 'id');
		const block = blockRaw as Record<string, unknown>;
		const entries = Object.entries(block);
		if (!entries.length) {
			return;
		}
		const reorderedBlock: Record<string, unknown> = {};
		for (const [rowKey, rowValue] of entries) {
			if (this.isPlainObject(rowValue)) {
				reorderedBlock[rowKey] = this.reorderRowColumns(rowValue as Record<string, unknown>, orderedKeys);
			} else {
				reorderedBlock[rowKey] = rowValue;
			}
		}
		kvObject[header] = reorderedBlock;
		const newContent = this.serializeKvDocument(kvObject, originalText);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await this.applyWorkspaceEditTracked(document, edit);
		if (!applied) {
			throw new Error('写入 KV 文本失败。');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (this.shouldExplicitlySave(document, autoSaveMode)) {
			const saved = await this.saveDocumentTracked(document);
			if (!saved) {
				throw new Error('保存 KV 文件失败。');
			}
		}
		this.syncStoredFormulasForColumnChange(document, previousColumns, columns);
	}

	private syncStoredFormulasForColumnChange(
		document: vscode.TextDocument,
		previousColumns: string[],
		nextColumns: string[],
		deletedColumnKey?: string,
	): void {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder || !previousColumns.length || !nextColumns.length) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const oldColumnByLetter = new Map<string, string>();
		previousColumns.forEach((columnKey, index) => {
			oldColumnByLetter.set(this.getFormulaColumnLetter(index), columnKey);
		});
		const newLetterByColumn = new Map<string, string>();
		nextColumns.forEach((columnKey, index) => {
			newLetterByColumn.set(columnKey, this.getFormulaColumnLetter(index));
		});

		let hasChanges = false;
		hasChanges = this.rewriteStoredCellFormulasForDocument(
			overrides,
			documentKey,
			document.uri,
			oldColumnByLetter,
			newLetterByColumn,
			deletedColumnKey,
		) || hasChanges;
		hasChanges = this.rewriteStoredColumnFormulasForDocument(
			overrides,
			documentKey,
			document.uri,
			oldColumnByLetter,
			newLetterByColumn,
			deletedColumnKey,
		) || hasChanges;

		if (hasChanges) {
			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		}
	}

	private rewriteStoredCellFormulasForDocument(
		overrides: KvEditorColumnOptionsFile,
		documentKey: string,
		documentUri: vscode.Uri,
		oldColumnByLetter: Map<string, string>,
		newLetterByColumn: Map<string, string>,
		deletedColumnKey?: string,
	): boolean {
		const storage = overrides.formulas;
		if (!storage) {
			return false;
		}
		const storageKey = this.resolveScopedStorageKey(documentKey, documentUri, storage);
		if (!storageKey || !storage[storageKey]) {
			return false;
		}

		const documentFormulas = storage[storageKey];
		const nextDocumentFormulas: Record<string, Record<string, string>> = {};
		let changed = false;

		for (const [rowKey, columnMap] of Object.entries(documentFormulas)) {
			const nextColumnMap: Record<string, string> = {};
			for (const [columnKey, formula] of Object.entries(columnMap)) {
				if (deletedColumnKey && columnKey === deletedColumnKey) {
					changed = true;
					continue;
				}
				const rewritten = this.rewriteFormulaForColumnChange(formula, oldColumnByLetter, newLetterByColumn, deletedColumnKey);
				if (rewritten !== formula) {
					changed = true;
				}
				nextColumnMap[columnKey] = rewritten;
			}
			if (Object.keys(nextColumnMap).length) {
				nextDocumentFormulas[rowKey] = nextColumnMap;
			} else if (Object.keys(columnMap).length) {
				changed = true;
			}
		}

		if (Object.keys(nextDocumentFormulas).length) {
			storage[storageKey] = nextDocumentFormulas;
		} else {
			delete storage[storageKey];
			changed = true;
		}

		if (!Object.keys(storage).length) {
			overrides.formulas = undefined;
		}
		return changed;
	}

	private rewriteStoredColumnFormulasForDocument(
		overrides: KvEditorColumnOptionsFile,
		documentKey: string,
		documentUri: vscode.Uri,
		oldColumnByLetter: Map<string, string>,
		newLetterByColumn: Map<string, string>,
		deletedColumnKey?: string,
	): boolean {
		const storage = overrides.columnFormulas;
		if (!storage) {
			return false;
		}
		const storageKey = this.resolveScopedStorageKey(documentKey, documentUri, storage);
		if (!storageKey || !storage[storageKey]) {
			return false;
		}

		const documentColumnFormulas = storage[storageKey];
		const nextDocumentColumnFormulas: Record<string, string> = {};
		let changed = false;

		for (const [columnKey, formula] of Object.entries(documentColumnFormulas)) {
			if (deletedColumnKey && columnKey === deletedColumnKey) {
				changed = true;
				continue;
			}
			const rewritten = this.rewriteFormulaForColumnChange(formula, oldColumnByLetter, newLetterByColumn, deletedColumnKey);
			if (rewritten !== formula) {
				changed = true;
			}
			nextDocumentColumnFormulas[columnKey] = rewritten;
		}

		if (Object.keys(nextDocumentColumnFormulas).length) {
			storage[storageKey] = nextDocumentColumnFormulas;
		} else {
			delete storage[storageKey];
			changed = true;
		}

		if (!Object.keys(storage).length) {
			overrides.columnFormulas = undefined;
		}
		return changed;
	}

	private rewriteFormulaForColumnChange(
		formula: string,
		oldColumnByLetter: Map<string, string>,
		newLetterByColumn: Map<string, string>,
		deletedColumnKey?: string,
	): string {
		const trimmed = typeof formula === 'string' ? formula.trim() : '';
		if (!trimmed.startsWith('=')) {
			return trimmed;
		}
		const expression = trimmed.slice(1);
		const rewritten = this.replaceFormulaCellReferences(expression, (columnLetter, rowNumber, originalRef) => {
			const targetColumnKey = oldColumnByLetter.get(columnLetter);
			if (!targetColumnKey || (deletedColumnKey && targetColumnKey === deletedColumnKey)) {
				return '#REF!';
			}
			const nextLetter = newLetterByColumn.get(targetColumnKey);
			if (!nextLetter) {
				return '#REF!';
			}
			return `${nextLetter}${rowNumber}`;
		});
		return `=${rewritten}`;
	}

	private replaceFormulaCellReferences(
		expression: string,
		replacer: (columnLetter: string, rowNumber: number, originalRef: string) => string | undefined,
	): string {
		if (!expression) {
			return '';
		}
		let result = '';
		let index = 0;
		let stringDelimiter: string | null = null;
		while (index < expression.length) {
			const char = expression[index];
			if (stringDelimiter) {
				result += char;
				if (char === '\\' && index + 1 < expression.length) {
					result += expression[index + 1];
					index += 2;
					continue;
				}
				if (char === stringDelimiter) {
					stringDelimiter = null;
				}
				index += 1;
				continue;
			}
			if (char === '"' || char === '\'' || char === '`') {
				stringDelimiter = char;
				result += char;
				index += 1;
				continue;
			}
			if (/[A-Za-z]/.test(char)) {
				let letters = '';
				while (index < expression.length && /[A-Za-z]/.test(expression[index])) {
					letters += expression[index];
					index += 1;
				}
				if (/^[A-Z]+$/.test(letters) && index < expression.length && /\d/.test(expression[index])) {
					let digits = '';
					while (index < expression.length && /\d/.test(expression[index])) {
						digits += expression[index];
						index += 1;
					}
					const rowNumber = Number(digits);
					if (Number.isFinite(rowNumber) && rowNumber > 0) {
						const originalRef = `${letters}${digits}`;
						const replacement = replacer(letters, rowNumber, originalRef);
						if (replacement !== undefined) {
							result += replacement;
							continue;
						}
					}
					result += `${letters}${digits}`;
					continue;
				}
				result += letters;
				continue;
			}
			result += char;
			index += 1;
		}
		return result;
	}

	private getFormulaColumnLetter(index: number): string {
		let dividend = Math.floor(index) + 1;
		let columnLetter = '';
		while (dividend > 0) {
			const modulo = (dividend - 1) % 26;
			columnLetter = String.fromCharCode(65 + modulo) + columnLetter;
			dividend = Math.floor((dividend - modulo) / 26);
		}
		return columnLetter;
	}

	private async handleSaveColumnWidths(
		document: vscode.TextDocument,
		message?: KvEditorSaveColumnWidthsMessage,
	): Promise<void> {
		if (!message || typeof message !== 'object' || !message.widths) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}

		// 分离需要更新和需要删除的列
		const widthsToUpdate: Record<string, number> = {};
		const columnsToDelete: string[] = [];

		if (message.widths && typeof message.widths === 'object') {
			for (const [column, value] of Object.entries(message.widths)) {
				if (column === '__rowNumber') {
					continue;
				}
				if (value === null || value === undefined) {
					// null 或 undefined 表示删除
					columnsToDelete.push(column);
				} else {
					const numeric = typeof value === 'number' ? value : Number(value);
					if (Number.isFinite(numeric)) {
						const rounded = Math.max(32, Math.round(numeric));
						widthsToUpdate[column] = rounded;
					}
				}
			}
		}

		const settings = this.copyUserSettings(this.getUserSettings(workspaceFolder));
		const existingEntry = settings.files[documentKey];
		const existingWidths = existingEntry?.columnWidths ? { ...existingEntry.columnWidths } : {};

		// 应用更新
		Object.assign(existingWidths, widthsToUpdate);

		// 应用删除
		columnsToDelete.forEach((column) => {
			delete existingWidths[column];
		});

		// 如果没有剩余的列宽配置，删除整个文档条目
		if (!Object.keys(existingWidths).length) {
			if (settings.files[documentKey]) {
				delete settings.files[documentKey];
			}
		} else {
			// 否则更新或创建文档条目
			settings.files[documentKey] = existingEntry
				? { ...existingEntry, columnWidths: existingWidths }
				: { columnWidths: existingWidths };
		}

		this.writeUserSettings(workspaceFolder, settings);
	}

	private async handleSaveCompactMode(
		document: vscode.TextDocument,
		message?: KvEditorSaveCompactModeMessage,
	): Promise<void> {
		if (!message || typeof message !== 'object' || typeof message.compactMode !== 'boolean') {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}

		const settings = this.copyUserSettings(this.getUserSettings(workspaceFolder));
		const existingEntry = settings.files[documentKey];

		// 更新精简模式设置
		settings.files[documentKey] = existingEntry
			? { ...existingEntry, compactMode: message.compactMode }
			: { compactMode: message.compactMode };

		this.writeUserSettings(workspaceFolder, settings);
	}

	private async handleSaveLocalizedMode(
		document: vscode.TextDocument,
		message?: KvEditorSaveLocalizedModeMessage,
	): Promise<void> {
		if (!message || typeof message !== 'object' || typeof message.localizedMode !== 'boolean') {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}

		const settings = this.copyUserSettings(this.getUserSettings(workspaceFolder));
		const existingEntry = settings.files[documentKey];

		// 更新本地化显示切换设置
		settings.files[documentKey] = existingEntry
			? { ...existingEntry, localizedMode: message.localizedMode }
			: { localizedMode: message.localizedMode };

		this.writeUserSettings(workspaceFolder, settings);
	}

	private async handleSaveFrozenColumns(
		document: vscode.TextDocument,
		message?: KvEditorSaveFrozenColumnsMessage,
	): Promise<void> {
		if (!message || typeof message !== 'object') {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}

		const settings = this.copyUserSettings(this.getUserSettings(workspaceFolder));
		const existingEntry = settings.files[documentKey];

		// 更新冻结列设置
		settings.files[documentKey] = existingEntry
			? { ...existingEntry, frozenColumns: message.frozenColumns || undefined }
			: { frozenColumns: message.frozenColumns || undefined };

		this.writeUserSettings(workspaceFolder, settings);
	}

	private async handleSaveColumnDescription(
		document: vscode.TextDocument,
		message?: KvEditorSaveColumnDescriptionMessage,
	): Promise<void> {
		if (!message || typeof message !== 'object' || typeof message.columnKey !== 'string') {
			return;
		}
		const columnKey = message.columnKey.trim();
		if (!columnKey) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			throw new Error('无法定位工作区，无法保存列描述。');
		}

		const scope = message.scope === 'file' ? 'file' : 'global';
		const label = typeof message.label === 'string' && message.label.trim().length ? message.label.trim() : undefined;
		const description = typeof message.description === 'string' && message.description.trim().length ? message.description.trim() : undefined;

		if (scope === 'file') {
			// per-file setting - 保存到 kv_editor_setting.json
			const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!documentKey) {
				return;
			}
			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
			const files = overrides.files ? { ...overrides.files } : {};
			const existingEntry = files[documentKey] ? { ...files[documentKey] } : {};
			const descriptions = existingEntry.columnDescriptions ? { ...existingEntry.columnDescriptions } : {};
			if (label === undefined && description === undefined) {
				if (descriptions[columnKey]) {delete descriptions[columnKey];}
			} else {
				descriptions[columnKey] = {};
				if (label !== undefined) {descriptions[columnKey].label = label;}
				if (description !== undefined) {descriptions[columnKey].description = description;}
			}
			existingEntry.columnDescriptions = Object.keys(descriptions).length ? descriptions : undefined;
			if (Object.keys(existingEntry).filter(k => existingEntry[k as keyof KvEditorFileColumnOptions] !== undefined).length) {
				files[documentKey] = existingEntry;
			} else if (files[documentKey]) {
				delete files[documentKey];
			}
			overrides.files = Object.keys(files).length ? files : undefined;
			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		} else {
			// global (workspace-level) default - 保存到 kv_editor_setting.json
			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
			const global = overrides.columnDescriptions ? { ...overrides.columnDescriptions } : {};
			if (label === undefined && description === undefined) {
				if (global[columnKey]) {delete global[columnKey];}
			} else {
				global[columnKey] = {};
				if (label !== undefined) {global[columnKey].label = label;}
				if (description !== undefined) {global[columnKey].description = description;}
			}
			overrides.columnDescriptions = Object.keys(global).length ? global : undefined;
			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		}
	}

	private loadColumnLayout(document: vscode.TextDocument): KvEditorColumnLayout | undefined {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return undefined;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return undefined;
		}
		const settings = this.getUserSettings(workspaceFolder);
		const entry = settings.files[documentKey];
		if (!entry?.columnWidths || !Object.keys(entry.columnWidths).length) {
			return undefined;
		}
		return {
			columnWidths: { ...entry.columnWidths },
		};
	}

	private getUserSettings(folder: vscode.WorkspaceFolder): KvEditorUserSettings {
		const cacheKey = folder.uri.fsPath;
		const settingsPath = this.getUserSettingsPath(folder);

		// 检查文件修改时间，如果文件已变更则清除缓存
		let currentMtime = 0;
		if (this.pathExists(settingsPath)) {
			try {
				const stats = fs.statSync(settingsPath);
				currentMtime = stats.mtimeMs;
			} catch (error) {
				// 文件读取失败，清除缓存
				this.userSettingsCache.delete(cacheKey);
			}
		}

		const cached = this.userSettingsCache.get(cacheKey);
		if (cached && cached.mtimeMs === currentMtime) {
			return cached.settings;
		}

		const settings = this.readUserSettingsFromDisk(folder);
		this.userSettingsCache.set(cacheKey, { settings, mtimeMs: currentMtime });
		return settings;
	}

	private copyUserSettings(source: KvEditorUserSettings): KvEditorUserSettings {
		const files: Record<string, KvEditorUserFileSettings> = {};
		for (const [key, value] of Object.entries(source.files) as Array<[string, KvEditorUserFileSettings]>) {
			files[key] = {
				columnWidths: value.columnWidths ? { ...value.columnWidths } : undefined,
				compactMode: value.compactMode,
				localizedMode: value.localizedMode,
				frozenColumns: value.frozenColumns,
			};
		}
		return { files };
	}

	private readUserSettingsFromDisk(folder: vscode.WorkspaceFolder): KvEditorUserSettings {
		const settingsPath = this.getUserSettingsPath(folder);
		if (!this.pathExists(settingsPath)) {
			return { files: {} };
		}
		try {
			const raw = fs.readFileSync(settingsPath, 'utf8');
			const parsed = JSON.parse(raw) as unknown;
			return this.normalizeUserSettings(parsed);
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to read column width settings:', error);
			return { files: {} };
		}
	}

	private normalizeUserSettings(raw: unknown): KvEditorUserSettings {
		const result: KvEditorUserSettings = { files: {} };
		if (!raw || typeof raw !== 'object') {
			return result;
		}
		const container = raw as Record<string, unknown>;

		// Parse files section (column widths)
		const filesSection = container.files;
		if (filesSection && typeof filesSection === 'object') {
			for (const [key, entry] of Object.entries(filesSection as Record<string, unknown>)) {
				if (typeof key !== 'string' || !key) {
					continue;
				}
				if (!entry || typeof entry !== 'object') {
					continue;
				}
				const recordEntry = entry as Record<string, unknown>;
				const columnWidths = this.sanitizeColumnWidthMap(recordEntry.columnWidths);
				const compactMode = typeof recordEntry.compactMode === 'boolean' ? recordEntry.compactMode : undefined;
				const localizedMode = typeof recordEntry.localizedMode === 'boolean' ? recordEntry.localizedMode : undefined;
				const frozenColumns = this.sanitizeFrozenColumn(recordEntry.frozenColumns);

				const fileEntry: KvEditorUserFileSettings = {};
				if (columnWidths && Object.keys(columnWidths).length) {
					fileEntry.columnWidths = columnWidths;
				}
				if (compactMode !== undefined) {
					fileEntry.compactMode = compactMode;
				}
				if (localizedMode !== undefined) {
					fileEntry.localizedMode = localizedMode;
				}
				if (frozenColumns) {
					fileEntry.frozenColumns = frozenColumns;
				}

				if (Object.keys(fileEntry).length) {
					result.files[key] = fileEntry;
				}
			}
		}

		return result;
	}

	private writeFileAtomic(targetPath: string, content: string): void {
		const temporaryPath = `${targetPath}.${process.pid}.${Date.now()}.tmp`;
		try {
			fs.writeFileSync(temporaryPath, content, 'utf8');
			fs.renameSync(temporaryPath, targetPath);
		} finally {
			if (this.pathExists(temporaryPath)) {
				try { fs.unlinkSync(temporaryPath); } catch { /* Best effort cleanup. */ }
			}
		}
	}
	private preserveUnknownConfigFields(targetPath: string, serialized: string, knownKeys: string[]): string {
		let existing: Record<string, unknown> = {};
		if (this.pathExists(targetPath)) {
			try {
				const parsed = JSON.parse(fs.readFileSync(targetPath, 'utf8')) as unknown;
				if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {existing = { ...(parsed as Record<string, unknown>) };}
			} catch { /* The normal write path will replace malformed JSON. */ }
		}
		for (const key of knownKeys) {delete existing[key];}
		const generated = JSON.parse(serialized) as Record<string, unknown>;
		return JSON.stringify({ ...existing, ...generated, schemaVersion: 2 }, null, 2);
	}
	private writeUserSettings(folder: vscode.WorkspaceFolder, settings: KvEditorUserSettings): void {
		const targetPath = this.getUserSettingsPath(folder);
		const dir = path.dirname(targetPath);
		try {
			fs.mkdirSync(dir, { recursive: true });
			const serialized = this.preserveUnknownConfigFields(targetPath, this.serializeUserSettings(settings), ['files', 'schemaVersion']);
			this.writeFileAtomic(targetPath, `${serialized}\n`);
			// 获取写入后的文件修改时间
			const stats = fs.statSync(targetPath);
			this.userSettingsCache.set(folder.uri.fsPath, {
				settings: this.copyUserSettings(settings),
				mtimeMs: stats.mtimeMs
			});
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to write column width settings:', error);
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(`保存列宽失败：${message}`);
		}
	}

	private serializeUserSettings(settings: KvEditorUserSettings): string {
		const files: Record<string, KvEditorUserFileSettings> = {};
		for (const [key, value] of Object.entries(settings.files) as Array<[string, KvEditorUserFileSettings]>) {
			const hasColumnWidths = value.columnWidths && Object.keys(value.columnWidths).length > 0;
			const hasCompactMode = typeof value.compactMode === 'boolean';
			const hasLocalizedMode = typeof value.localizedMode === 'boolean';
			const hasFrozenColumns = typeof value.frozenColumns === 'string' && value.frozenColumns.length > 0;

			if (!hasColumnWidths && !hasCompactMode && !hasLocalizedMode && !hasFrozenColumns) {
				continue;
			}

			const fileEntry: KvEditorUserFileSettings = {};

			if (hasColumnWidths) {
				const sorted = Object.keys(value.columnWidths!)
					.sort()
					.reduce<Record<string, number>>((acc, column) => {
						acc[column] = value.columnWidths![column];
						return acc;
					}, {});
				fileEntry.columnWidths = sorted;
			}

			if (hasCompactMode) {
				fileEntry.compactMode = value.compactMode;
			}

			if (hasLocalizedMode) {
				fileEntry.localizedMode = value.localizedMode;
			}

			if (hasFrozenColumns) {
				fileEntry.frozenColumns = value.frozenColumns;
			}

			files[key] = fileEntry;
		}
		const payload: Record<string, unknown> = { files };
		return JSON.stringify(payload, null, 2);
	}

	private sanitizeColumnWidthMap(raw: unknown): Record<string, number> | undefined {
		if (!raw || typeof raw !== 'object') {
			return undefined;
		}
		const result: Record<string, number> = {};
		for (const [column, value] of Object.entries(raw as Record<string, unknown>)) {
			if (column === '__rowNumber') {
				continue;
			}
			const numeric = typeof value === 'number' ? value : Number(value);
			if (!Number.isFinite(numeric)) {
				continue;
			}
			const rounded = Math.max(32, Math.round(numeric));
			result[column] = rounded;
		}
		return Object.keys(result).length ? result : undefined;
	}

	private sanitizeColumnDescriptionMap(raw: unknown): Record<string, { label?: string; description?: string; }> | undefined {
		if (!raw || typeof raw !== 'object') {
			return undefined;
		}
		const result: Record<string, { label?: string; description?: string; }> = {};
		for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
			if (!key || typeof key !== 'string') {
				continue;
			}
			if (!value || typeof value !== 'object') {
				continue;
			}
			const entry = value as Record<string, unknown>;
			const label = typeof entry.label === 'string' && entry.label.length ? entry.label : undefined;
			const description = typeof entry.description === 'string' && entry.description.length ? entry.description : undefined;
			if (label === undefined && description === undefined) {
				continue;
			}
			result[key] = {};
			if (label !== undefined) {
				result[key].label = label;
			}
			if (description !== undefined) {
				result[key].description = description;
			}
		}
		return Object.keys(result).length ? result : undefined;
	}

	private sanitizeFrozenColumn(raw: unknown): string | undefined {
		if (typeof raw === 'string' && raw.length > 0) {
			return raw;
		}
		return undefined;
	}

	private getUserSettingsPath(folder: vscode.WorkspaceFolder): string {
		return path.join(folder.uri.fsPath, '.vscode', 'kv_editor_user_setting.json');
	}

	private getDocumentSettingsKey(uri: vscode.Uri, folder: vscode.WorkspaceFolder): string | undefined {
		let relativePath = path.relative(folder.uri.fsPath, uri.fsPath);
		if (!relativePath) {
			relativePath = path.basename(uri.fsPath);
		}
		if (!relativePath || relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
			return undefined;
		}
		const normalized = relativePath.split(path.sep).filter(Boolean).join('/');
		return normalized || path.basename(uri.fsPath);
	}

	private async handleSaveColumnOptions(
		document: vscode.TextDocument,
		message?: KvEditorSaveColumnOptionsMessage,
	): Promise<void> {
		if (!message || typeof message.column !== 'string') {
			return;
		}
		const columnKey = message.column.trim();
		if (!columnKey) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			throw new Error('无法定位工作区，无法保存自定义下拉选项。');
		}

		const sanitizedOptions = this.sanitizeColumnOptionList(message.options);
		const isFileScope = message.scope === 'file';
		const multiple = message.multiple === true;
		const separator = typeof message.separator === 'string' && message.separator.length > 0 ? message.separator : '|';

		if (isFileScope) {
			// 保存到文件级别配置
			const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!documentKey) {
				throw new Error('无法生成文档配置键，无法保存文件级别选项。');
			}

			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));

			// 确保 files 对象存在
			if (!overrides.files) {
				overrides.files = {};
			}
			if (!overrides.files[documentKey]) {
				overrides.files[documentKey] = {};
			}
			if (!overrides.files[documentKey].columnOptions) {
				overrides.files[documentKey].columnOptions = {};
			}

			// 保存或删除选项
			if (!sanitizedOptions.length) {
				delete overrides.files[documentKey].columnOptions![columnKey];
				// 清理空对象
				if (Object.keys(overrides.files[documentKey].columnOptions!).length === 0) {
					delete overrides.files[documentKey].columnOptions;
				}
			} else {
				overrides.files[documentKey].columnOptions![columnKey] = sanitizedOptions;
			}

			// 保存 multiple 和 separator 设置
			if (!overrides.files[documentKey].columnSettings) {
				overrides.files[documentKey].columnSettings = {};
			}
			overrides.files[documentKey].columnSettings![columnKey] = { multiple, separator };

			// 清理空的 columnSettings
			if (Object.keys(overrides.files[documentKey].columnSettings!).length === 0) {
				delete overrides.files[documentKey].columnSettings;
			}

			// 清理空的文件配置
			if (Object.keys(overrides.files[documentKey]).length === 0) {
				delete overrides.files[documentKey];
			}

			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		} else {
			// 保存到全局（folderType）级别配置
			const scope = this.resolveColumnOptionsScope(message.folderType);
			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
			const columnOverrides = overrides.columns[columnKey] ?? {};

			if (!sanitizedOptions.length) {
				if (columnOverrides[scope]) {
					delete columnOverrides[scope];
				}
			} else {
				columnOverrides[scope] = sanitizedOptions;
			}

			if (Object.keys(columnOverrides).length) {
				overrides.columns[columnKey] = columnOverrides;
			} else if (overrides.columns[columnKey]) {
				delete overrides.columns[columnKey];
			}

			// 保存全局级别的 multiple 和 separator 设置
			if (!overrides.columnSettings) {
				overrides.columnSettings = {};
			}
			if (!overrides.columnSettings[columnKey]) {
				overrides.columnSettings[columnKey] = {};
			}
			overrides.columnSettings[columnKey][scope] = { multiple, separator };

			// 清理空的设置（只有在两个字段都未定义时才删除）
			const scopeSettings = overrides.columnSettings[columnKey][scope];
			if (scopeSettings && typeof scopeSettings.multiple !== 'boolean' && !scopeSettings.separator) {
				delete overrides.columnSettings[columnKey][scope];
			}
			if (Object.keys(overrides.columnSettings[columnKey]).length === 0) {
				delete overrides.columnSettings[columnKey];
			}
			if (Object.keys(overrides.columnSettings).length === 0) {
				delete overrides.columnSettings;
			}

			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		}
	}

	private async handleSaveFormula(
		document: vscode.TextDocument,
		message?: KvEditorSaveFormulaMessage,
	): Promise<void> {
		if (!message || typeof message.column !== 'string') {
			return;
		}
		const columnKey = message.column.trim();
		if (!columnKey) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			throw new Error('无法定位工作区，无法保存公式。');
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}
		const rowKey = this.buildFormulaRowKey(
			typeof message.rowId === 'string' ? message.rowId : undefined,
			typeof message.rowIndex === 'number' ? message.rowIndex : undefined,
		);
		if (!rowKey) {
			return;
		}
		const formulaTextRaw = typeof message.formula === 'string' ? message.formula.trim() : '';
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const formulas = overrides.formulas ? { ...overrides.formulas } : {};
		const documentFormulas = formulas[documentKey] ? { ...formulas[documentKey] } : {};
		const rowFormulas = documentFormulas[rowKey] ? { ...documentFormulas[rowKey] } : {};
		if (!formulaTextRaw || !formulaTextRaw.startsWith('=')) {
			if (rowFormulas[columnKey]) {
				delete rowFormulas[columnKey];
			}
		} else {
			rowFormulas[columnKey] = formulaTextRaw;
		}
		if (Object.keys(rowFormulas).length) {
			documentFormulas[rowKey] = rowFormulas;
		} else if (documentFormulas[rowKey]) {
			delete documentFormulas[rowKey];
		}
		if (Object.keys(documentFormulas).length) {
			formulas[documentKey] = documentFormulas;
		} else if (formulas[documentKey]) {
			delete formulas[documentKey];
		}
		overrides.formulas = Object.keys(formulas).length ? formulas : undefined;
		this.writeColumnOptionOverrides(workspaceFolder, overrides);
	}

	private async handleSaveColumnFormula(
		document: vscode.TextDocument,
		message?: KvEditorSaveColumnFormulaMessage,
	): Promise<void> {
		if (!message || typeof message.columnKey !== 'string') {
			return;
		}
		const columnKey = message.columnKey.trim();
		if (!columnKey) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			throw new Error('无法定位工作区，无法保存列公式。');
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}
		const formulaTextRaw = typeof message.formula === 'string' ? message.formula.trim() : '';
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const columnFormulas = overrides.columnFormulas ? { ...overrides.columnFormulas } : {};
		const documentColumnFormulas = columnFormulas[documentKey] ? { ...columnFormulas[documentKey] } : {};

		if (!formulaTextRaw || !formulaTextRaw.startsWith('=')) {
			if (documentColumnFormulas[columnKey]) {
				delete documentColumnFormulas[columnKey];
			}
		} else {
			documentColumnFormulas[columnKey] = formulaTextRaw;
		}

		if (Object.keys(documentColumnFormulas).length) {
			columnFormulas[documentKey] = documentColumnFormulas;
		} else if (columnFormulas[documentKey]) {
			delete columnFormulas[documentKey];
		}

		overrides.columnFormulas = Object.keys(columnFormulas).length ? columnFormulas : undefined;
		this.writeColumnOptionOverrides(workspaceFolder, overrides);
	}

	private getColumnOptionOverrides(folder: vscode.WorkspaceFolder): KvEditorColumnOptionsFile {
		const cacheKey = folder.uri.fsPath;
		const overridesPath = this.getColumnOptionOverridesPath(folder);

		// 检查文件修改时间，如果文件已变更则清除缓存
		let currentMtime = 0;
		if (this.pathExists(overridesPath)) {
			try {
				const stats = fs.statSync(overridesPath);
				currentMtime = stats.mtimeMs;
			} catch (error) {
				// 文件读取失败，清除缓存
				this.columnOptionOverridesCache.delete(cacheKey);
			}
		}

		const cached = this.columnOptionOverridesCache.get(cacheKey);
		if (cached && cached.mtimeMs === currentMtime) {
			return this.copyColumnOptionOverrides(cached.overrides);
		}

		const overrides = this.readColumnOptionOverridesFromDisk(folder);
		this.columnOptionOverridesCache.set(cacheKey, { overrides, mtimeMs: currentMtime });
		return this.copyColumnOptionOverrides(overrides);
	}

	private readColumnOptionOverridesFromDisk(folder: vscode.WorkspaceFolder): KvEditorColumnOptionsFile {
		const targetPath = this.getColumnOptionOverridesPath(folder);
		if (!this.pathExists(targetPath)) {
			return { columns: {} };
		}
		try {
			const raw = fs.readFileSync(targetPath, 'utf8');
			const parsed = JSON.parse(raw) as unknown;
			return this.normalizeColumnOptionOverrides(parsed);
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to read column option overrides:', error);
			return { columns: {} };
		}
	}

	private normalizeColumnOptionOverrides(raw: unknown): KvEditorColumnOptionsFile {
		const result: KvEditorColumnOptionsFile = { columns: {} };
		if (!raw || typeof raw !== 'object') {
			return result;
		}
		const container = raw as Record<string, unknown>;
		const columnsSection = container.columns;
		if (columnsSection && typeof columnsSection === 'object') {
			for (const [columnKey, value] of Object.entries(columnsSection as Record<string, unknown>)) {
				const normalizedKey = typeof columnKey === 'string' ? columnKey.trim() : '';
				if (!normalizedKey) {
					continue;
				}
				if (!value || typeof value !== 'object') {
					continue;
				}
				const folderMap: KvEditorColumnOptionsFolderMap = {};
				for (const [scopeKey, entries] of Object.entries(value as Record<string, unknown>)) {
					const scope = this.normalizeColumnOptionsScope(scopeKey);
					if (!scope) {
						continue;
					}
					const sanitized = this.sanitizeColumnOptionList(entries);
					if (sanitized.length) {
						folderMap[scope] = sanitized;
					}
				}
				if (Object.keys(folderMap).length) {
					result.columns[normalizedKey] = folderMap;
				}
			}
		}
		const formulasSection = container.formulas;
		if (formulasSection && typeof formulasSection === 'object' && !Array.isArray(formulasSection)) {
			const formulas: KvEditorFormulaStorage = {};
			for (const [documentKey, rowsValue] of Object.entries(formulasSection as Record<string, unknown>)) {
				if (typeof documentKey !== 'string' || !rowsValue || typeof rowsValue !== 'object') {
					continue;
				}
				const rowMap: Record<string, Record<string, string>> = {};
				for (const [rowKey, columnsValue] of Object.entries(rowsValue as Record<string, unknown>)) {
					if (typeof rowKey !== 'string' || !columnsValue || typeof columnsValue !== 'object') {
						continue;
					}
					const columnMap: Record<string, string> = {};
					for (const [columnKey, formulaValue] of Object.entries(columnsValue as Record<string, unknown>)) {
						if (typeof columnKey !== 'string') {
							continue;
						}
						const formulaText = typeof formulaValue === 'string' ? formulaValue.trim() : '';
						if (!formulaText || !formulaText.startsWith('=')) {
							continue;
						}
						columnMap[columnKey] = formulaText;
					}
					if (Object.keys(columnMap).length) {
						rowMap[rowKey] = columnMap;
					}
				}
				if (Object.keys(rowMap).length) {
					formulas[documentKey] = rowMap;
				}
			}
			if (Object.keys(formulas).length) {
				result.formulas = formulas;
			}
		}
		const columnFormulasSection = container.columnFormulas;
		if (columnFormulasSection && typeof columnFormulasSection === 'object' && !Array.isArray(columnFormulasSection)) {
			const columnFormulas: Record<string, Record<string, string>> = {};
			for (const [documentKey, columnsValue] of Object.entries(columnFormulasSection as Record<string, unknown>)) {
				if (typeof documentKey !== 'string' || !columnsValue || typeof columnsValue !== 'object') {
					continue;
				}
				const columnMap: Record<string, string> = {};
				for (const [columnKey, formulaValue] of Object.entries(columnsValue as Record<string, unknown>)) {
					if (typeof columnKey !== 'string') {
						continue;
					}
					const formulaText = typeof formulaValue === 'string' ? formulaValue.trim() : '';
					if (!formulaText || !formulaText.startsWith('=')) {
						continue;
					}
					columnMap[columnKey] = formulaText;
				}
				if (Object.keys(columnMap).length) {
					columnFormulas[documentKey] = columnMap;
				}
			}
			if (Object.keys(columnFormulas).length) {
				result.columnFormulas = columnFormulas;
			}
		}
		const columnDescriptionsSection = container.columnDescriptions;
		if (columnDescriptionsSection && typeof columnDescriptionsSection === 'object') {
			const sanitized = this.sanitizeColumnDescriptionMap(columnDescriptionsSection);
			if (sanitized && Object.keys(sanitized).length) {
				result.columnDescriptions = sanitized;
			}
		}

		// 处理 files 字段（文件级别的列选项）
		const filesSection = container.files;
		if (filesSection && typeof filesSection === 'object' && !Array.isArray(filesSection)) {
			const files: Record<string, KvEditorFileColumnOptions> = {};
			for (const [documentKey, fileConfig] of Object.entries(filesSection as Record<string, unknown>)) {
				if (typeof documentKey !== 'string' || !fileConfig || typeof fileConfig !== 'object') {
					continue;
				}
				const fileOptions: KvEditorFileColumnOptions = {};
				const configObj = fileConfig as Record<string, unknown>;

				// 处理 columnOptions
				if (configObj.columnOptions && typeof configObj.columnOptions === 'object') {
					const columnOptions: Record<string, KvEditorColumnOption[]> = {};
					for (const [columnKey, options] of Object.entries(configObj.columnOptions as Record<string, unknown>)) {
						if (typeof columnKey !== 'string') {
							continue;
						}
						const sanitized = this.sanitizeColumnOptionList(options);
						if (sanitized.length) {
							columnOptions[columnKey] = sanitized;
						}
					}
					if (Object.keys(columnOptions).length) {
						fileOptions.columnOptions = columnOptions;
					}
				}

				// 处理 columnSettings（多选和分隔符配置）
				if (configObj.columnSettings && typeof configObj.columnSettings === 'object') {
					const columnSettings: Record<string, KvEditorColumnMultiSelectSettings> = {};
					for (const [columnKey, settings] of Object.entries(configObj.columnSettings as Record<string, unknown>)) {
						if (typeof columnKey !== 'string' || !settings || typeof settings !== 'object') {
							continue;
						}
						const settingsObj = settings as Record<string, unknown>;
						const normalized: KvEditorColumnMultiSelectSettings = {};
						if (typeof settingsObj.multiple === 'boolean') {
							normalized.multiple = settingsObj.multiple;
						}
						if (typeof settingsObj.separator === 'string' && settingsObj.separator.length > 0) {
							normalized.separator = settingsObj.separator;
						}
						if (Object.keys(normalized).length) {
							columnSettings[columnKey] = normalized;
						}
					}
					if (Object.keys(columnSettings).length) {
						fileOptions.columnSettings = columnSettings;
					}
				}

				// 处理 columnDescriptions（文件级别的列描述）
				if (configObj.columnDescriptions && typeof configObj.columnDescriptions === 'object') {
					const columnDescriptions = this.sanitizeColumnDescriptionMap(configObj.columnDescriptions);
					if (columnDescriptions && Object.keys(columnDescriptions).length) {
						fileOptions.columnDescriptions = columnDescriptions;
					}
				}

				if (Object.keys(fileOptions).length) {
					files[documentKey] = fileOptions;
				}
			}
			if (Object.keys(files).length) {
				result.files = files;
			}
		}

		// 处理全局 columnSettings（多选和分隔符配置）
		const columnSettingsSection = container.columnSettings;
		if (columnSettingsSection && typeof columnSettingsSection === 'object') {
			const columnSettings: Record<string, Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnMultiSelectSettings>>> = {};
			for (const [columnKey, scopeMap] of Object.entries(columnSettingsSection as Record<string, unknown>)) {
				if (typeof columnKey !== 'string' || !scopeMap || typeof scopeMap !== 'object') {
					continue;
				}
				const scopeSettings: Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnMultiSelectSettings>> = {};
				for (const [scopeKey, settings] of Object.entries(scopeMap as Record<string, unknown>)) {
					const normalizedScope = this.normalizeFolderTypeKey(scopeKey) ?? (scopeKey === 'default' ? 'default' : undefined);
					if (!normalizedScope || !settings || typeof settings !== 'object') {
						continue;
					}
					const settingsObj = settings as Record<string, unknown>;
					const normalized: KvEditorColumnMultiSelectSettings = {};
					if (typeof settingsObj.multiple === 'boolean') {
						normalized.multiple = settingsObj.multiple;
					}
					if (typeof settingsObj.separator === 'string' && settingsObj.separator.length > 0) {
						normalized.separator = settingsObj.separator;
					}
					if (Object.keys(normalized).length) {
						scopeSettings[normalizedScope] = normalized;
					}
				}
				if (Object.keys(scopeSettings).length) {
					columnSettings[columnKey] = scopeSettings;
				}
			}
			if (Object.keys(columnSettings).length) {
				result.columnSettings = columnSettings;
			}
		}

		// 解析localizationSettings
		const localizationSettingsSection = container.localizationSettings;
		if (localizationSettingsSection && typeof localizationSettingsSection === 'object') {
			const localizationSettings: Record<string, { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; }> = {};
			for (const [docKey, settings] of Object.entries(localizationSettingsSection as Record<string, unknown>)) {
				if (typeof docKey !== 'string' || !settings || typeof settings !== 'object') {
					continue;
				}
				const settingsObj = settings as Record<string, unknown>;
				const enabled = Boolean(settingsObj.enabled);
				const language = typeof settingsObj.language === 'string' ? settingsObj.language : 'schinese';
				const filePath = typeof settingsObj.filePath === 'string' ? settingsObj.filePath : '';
				const autoUpdateOnOpen = Boolean(settingsObj.autoUpdateOnOpen);
				const mappings = Array.isArray(settingsObj.mappings) ? settingsObj.mappings.filter((m: any) =>
					m && typeof m === 'object' && typeof m.columnName === 'string' && typeof m.rule === 'string'
				) : [];

				localizationSettings[docKey] = { enabled, language, filePath, autoUpdateOnOpen, mappings };
			}
			if (Object.keys(localizationSettings).length) {
				result.localizationSettings = localizationSettings;
			}
		}

		return result;
	}

	private copyColumnOptionOverrides(source: KvEditorColumnOptionsFile): KvEditorColumnOptionsFile {
		const columns: Record<string, KvEditorColumnOptionsFolderMap> = {};
		for (const [columnKey, folderMap] of Object.entries(source.columns)) {
			const copiedMap: KvEditorColumnOptionsFolderMap = {};
			for (const [scopeKey, options] of Object.entries(folderMap) as Array<[KvEditorColumnOptionsScope, KvEditorColumnOption[]]>) {
				copiedMap[scopeKey] = options.map((option) => ({ ...option }));
			}
			columns[columnKey] = copiedMap;
		}
		let formulas: KvEditorFormulaStorage | undefined;
		if (source.formulas && typeof source.formulas === 'object') {
			formulas = {};
			for (const [documentKey, rowMap] of Object.entries(source.formulas)) {
				const copiedRows: Record<string, Record<string, string>> = {};
				for (const [rowKey, columnMap] of Object.entries(rowMap)) {
					const copiedColumns: Record<string, string> = {};
					for (const [columnKey, formula] of Object.entries(columnMap)) {
						copiedColumns[columnKey] = formula;
					}
					if (Object.keys(copiedColumns).length) {
						copiedRows[rowKey] = copiedColumns;
					}
				}
				if (Object.keys(copiedRows).length) {
					formulas[documentKey] = copiedRows;
				}
			}
		}
		let columnFormulas: Record<string, Record<string, string>> | undefined;
		if (source.columnFormulas && typeof source.columnFormulas === 'object') {
			columnFormulas = {};
			for (const [documentKey, columnMap] of Object.entries(source.columnFormulas)) {
				const copiedColumns: Record<string, string> = {};
				for (const [columnKey, formula] of Object.entries(columnMap)) {
					copiedColumns[columnKey] = formula;
				}
				if (Object.keys(copiedColumns).length) {
					columnFormulas[documentKey] = copiedColumns;
				}
			}
		}
		let columnDescriptions: Record<string, { label?: string; description?: string; }> | undefined;
		if (source.columnDescriptions && typeof source.columnDescriptions === 'object') {
			columnDescriptions = {};
			for (const [key, value] of Object.entries(source.columnDescriptions)) {
				columnDescriptions[key] = { ...value };
			}
		}

		// 复制全局 columnSettings
		let columnSettings: Record<string, Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnMultiSelectSettings>>> | undefined;
		if (source.columnSettings && typeof source.columnSettings === 'object') {
			columnSettings = {};
			for (const [columnKey, scopeMap] of Object.entries(source.columnSettings)) {
				const copiedScopeMap: Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnMultiSelectSettings>> = {};
				for (const [scopeKey, settings] of Object.entries(scopeMap)) {
					copiedScopeMap[scopeKey as KvEditorColumnOptionsScope] = { ...settings };
				}
				if (Object.keys(copiedScopeMap).length) {
					columnSettings[columnKey] = copiedScopeMap;
				}
			}
		}

		let files: Record<string, KvEditorFileColumnOptions> | undefined;
		if (source.files && typeof source.files === 'object') {
			files = {};
			for (const [documentKey, fileConfig] of Object.entries(source.files)) {
				const copiedFile: KvEditorFileColumnOptions = {};
				if (fileConfig.columnOptions) {
					copiedFile.columnOptions = {};
					for (const [columnKey, options] of Object.entries(fileConfig.columnOptions)) {
						copiedFile.columnOptions[columnKey] = options.map((option) => ({ ...option }));
					}
				}
				// 复制文件级别 columnSettings
				if (fileConfig.columnSettings) {
					copiedFile.columnSettings = {};
					for (const [columnKey, settings] of Object.entries(fileConfig.columnSettings)) {
						copiedFile.columnSettings[columnKey] = { ...settings };
					}
				}
				// 复制文件级别 columnDescriptions
				if (fileConfig.columnDescriptions) {
					copiedFile.columnDescriptions = {};
					for (const [columnKey, desc] of Object.entries(fileConfig.columnDescriptions)) {
						copiedFile.columnDescriptions[columnKey] = { ...desc };
					}
				}
				if (Object.keys(copiedFile).length) {
					files[documentKey] = copiedFile;
				}
			}
		}

		// 复制本地化设置
		let localizationSettings: Record<string, { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; }> | undefined;
		if (source.localizationSettings && typeof source.localizationSettings === 'object') {
			localizationSettings = {};
			for (const [docKey, settings] of Object.entries(source.localizationSettings)) {
				localizationSettings[docKey] = {
					enabled: settings.enabled,
					language: settings.language,
					filePath: settings.filePath || '',
					autoUpdateOnOpen: settings.autoUpdateOnOpen || false,
					mappings: settings.mappings.map((mapping) => ({ ...mapping }))
				};
			}
		}

		const result: KvEditorColumnOptionsFile = { columns };
		if (formulas) {
			result.formulas = formulas;
		}
		if (columnFormulas && Object.keys(columnFormulas).length) {
			result.columnFormulas = columnFormulas;
		}
		if (columnDescriptions && Object.keys(columnDescriptions).length) {
			result.columnDescriptions = columnDescriptions;
		}
		if (columnSettings && Object.keys(columnSettings).length) {
			result.columnSettings = columnSettings;
		}
		if (files && Object.keys(files).length) {
			result.files = files;
		}
		if (localizationSettings && Object.keys(localizationSettings).length) {
			result.localizationSettings = localizationSettings;
		}
		return result;
	}

	private writeColumnOptionOverrides(folder: vscode.WorkspaceFolder, overrides: KvEditorColumnOptionsFile): void {
		const targetPath = this.getColumnOptionOverridesPath(folder);
		const dir = path.dirname(targetPath);
		try {
			fs.mkdirSync(dir, { recursive: true });
			const serialized = this.preserveUnknownConfigFields(targetPath, this.serializeColumnOptionOverrides(overrides), ['columns', 'formulas', 'columnFormulas', 'columnDescriptions', 'columnSettings', 'files', 'localizationSettings', 'schemaVersion']);
			this.writeFileAtomic(targetPath, `${serialized}\n`);
			// 获取写入后的文件修改时间
			const stats = fs.statSync(targetPath);
			this.columnOptionOverridesCache.set(folder.uri.fsPath, {
				overrides: this.copyColumnOptionOverrides(overrides),
				mtimeMs: stats.mtimeMs
			});
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to write column option overrides:', error);
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(`保存下拉选项失败：${message}`);
		}
	}

	private serializeColumnOptionOverrides(overrides: KvEditorColumnOptionsFile): string {
		const sortedColumns = Object.keys(overrides.columns).sort((a, b) => a.localeCompare(b));
		const columnsOutput: Record<string, Record<string, unknown[]>> = {};
		for (const columnKey of sortedColumns) {
			const folderMap = overrides.columns[columnKey];
			const sortedScopes = Object.keys(folderMap).sort((a, b) => a.localeCompare(b));
			const scopeOutput: Record<string, unknown[]> = {};
			for (const scopeKey of sortedScopes) {
				const scope = scopeKey as KvEditorColumnOptionsScope;
				const options = folderMap[scope];
				if (!options || !options.length) {
					continue;
				}
				scopeOutput[scope] = options.map((option: KvEditorColumnOption) => {
					const entry: Record<string, string> = {
						value: option.value,
					};
					if (!option.labelIsFallback) {
						entry.label = option.label;
					}
					if (option.description) {
						entry.description = option.description;
					}
					if (option.color) {
						entry.color = option.color;
					}
					return entry;
				});
			}
			if (Object.keys(scopeOutput).length) {
				columnsOutput[columnKey] = scopeOutput;
			}
		}
		const output: Record<string, unknown> = {};
		if (Object.keys(columnsOutput).length) {
			output.columns = columnsOutput;
		}
		if (overrides.formulas && typeof overrides.formulas === 'object') {
			const documentKeys = Object.keys(overrides.formulas).sort((a, b) => a.localeCompare(b));
			const formulasOutput: Record<string, Record<string, Record<string, string>>> = {};
			for (const documentKey of documentKeys) {
				const rowMap = overrides.formulas[documentKey];
				const rowKeys = Object.keys(rowMap).sort((a, b) => a.localeCompare(b));
				const rowsOutput: Record<string, Record<string, string>> = {};
				for (const rowKey of rowKeys) {
					const columnMap = rowMap[rowKey];
					const columnKeys = Object.keys(columnMap).sort((a, b) => a.localeCompare(b));
					const columnsOutputMap: Record<string, string> = {};
					for (const columnKey of columnKeys) {
						const formula = columnMap[columnKey];
						if (typeof formula === 'string' && formula.trim().startsWith('=')) {
							columnsOutputMap[columnKey] = formula.trim();
						}
					}
					if (Object.keys(columnsOutputMap).length) {
						rowsOutput[rowKey] = columnsOutputMap;
					}
				}
				if (Object.keys(rowsOutput).length) {
					formulasOutput[documentKey] = rowsOutput;
				}
			}
			if (Object.keys(formulasOutput).length) {
				output.formulas = formulasOutput;
			}
		}
		if (overrides.columnFormulas && typeof overrides.columnFormulas === 'object') {
			const documentKeys = Object.keys(overrides.columnFormulas).sort((a, b) => a.localeCompare(b));
			const columnFormulasOutput: Record<string, Record<string, string>> = {};
			for (const documentKey of documentKeys) {
				const columnMap = overrides.columnFormulas[documentKey];
				const columnKeys = Object.keys(columnMap).sort((a, b) => a.localeCompare(b));
				const columnsOutputMap: Record<string, string> = {};
				for (const columnKey of columnKeys) {
					const formula = columnMap[columnKey];
					if (typeof formula === 'string' && formula.trim().startsWith('=')) {
						columnsOutputMap[columnKey] = formula.trim();
					}
				}
				if (Object.keys(columnsOutputMap).length) {
					columnFormulasOutput[documentKey] = columnsOutputMap;
				}
			}
			if (Object.keys(columnFormulasOutput).length) {
				output.columnFormulas = columnFormulasOutput;
			}
		}
		if (overrides.columnDescriptions && typeof overrides.columnDescriptions === 'object') {
			const sorted = Object.keys(overrides.columnDescriptions)
				.sort((a, b) => a.localeCompare(b))
				.reduce<Record<string, { label?: string; description?: string; }>>((acc, key) => {
					acc[key] = overrides.columnDescriptions![key];
					return acc;
				}, {});
			if (Object.keys(sorted).length) {
				output.columnDescriptions = sorted;
			}
		}

		// 序列化localizationSettings
		if (overrides.localizationSettings && typeof overrides.localizationSettings === 'object') {
			const localizationOutput: Record<string, any> = {};
			const docKeys = Object.keys(overrides.localizationSettings).sort((a, b) => a.localeCompare(b));
			for (const docKey of docKeys) {
				const settings = overrides.localizationSettings[docKey];
				if (settings && typeof settings === 'object') {
					localizationOutput[docKey] = {
						enabled: Boolean(settings.enabled),
						language: String(settings.language || 'schinese'),
						filePath: String(settings.filePath || ''),
						autoUpdateOnOpen: Boolean(settings.autoUpdateOnOpen),
						mappings: Array.isArray(settings.mappings) ? settings.mappings : []
					};
				}
			}
			if (Object.keys(localizationOutput).length) {
				output.localizationSettings = localizationOutput;
			}
		}

		// 序列化全局 columnSettings 字段
		if (overrides.columnSettings && typeof overrides.columnSettings === 'object') {
			const columnSettingsOutput: Record<string, Record<string, KvEditorColumnMultiSelectSettings>> = {};
			const columnKeys = Object.keys(overrides.columnSettings).sort((a, b) => a.localeCompare(b));
			for (const columnKey of columnKeys) {
				const scopeMap = overrides.columnSettings[columnKey];
				if (!scopeMap || typeof scopeMap !== 'object') {
					continue;
				}
				const scopeOutput: Record<string, KvEditorColumnMultiSelectSettings> = {};
				const scopeKeys = Object.keys(scopeMap).sort((a, b) => a.localeCompare(b));
				for (const scopeKey of scopeKeys) {
					const settings = scopeMap[scopeKey as KvEditorColumnOptionsScope];
					if (settings && (typeof settings.multiple === 'boolean' || settings.separator)) {
						const entry: KvEditorColumnMultiSelectSettings = {};
						if (typeof settings.multiple === 'boolean') {
							entry.multiple = settings.multiple;
						}
						if (settings.separator) {
							entry.separator = settings.separator;
						}
						scopeOutput[scopeKey] = entry;
					}
				}
				if (Object.keys(scopeOutput).length) {
					columnSettingsOutput[columnKey] = scopeOutput;
				}
			}
			if (Object.keys(columnSettingsOutput).length) {
				output.columnSettings = columnSettingsOutput;
			}
		}

		// 序列化 files 字段
		if (overrides.files && typeof overrides.files === 'object') {
			const documentKeys = Object.keys(overrides.files).sort((a, b) => a.localeCompare(b));
			const filesOutput: Record<string, Record<string, unknown>> = {};
			for (const documentKey of documentKeys) {
				const fileConfig = overrides.files[documentKey];
				const fileOutput: Record<string, unknown> = {};

				if (fileConfig.columnOptions) {
					const columnKeys = Object.keys(fileConfig.columnOptions).sort((a, b) => a.localeCompare(b));
					const columnOptionsOutput: Record<string, unknown[]> = {};
					for (const columnKey of columnKeys) {
						const options = fileConfig.columnOptions[columnKey];
						if (!options || !options.length) {
							continue;
						}
						columnOptionsOutput[columnKey] = options.map((option: KvEditorColumnOption) => {
							const entry: Record<string, string> = {
								value: option.value,
							};
							if (!option.labelIsFallback) {
								entry.label = option.label;
							}
							if (option.description) {
								entry.description = option.description;
							}
							if (option.color) {
								entry.color = option.color;
							}
							return entry;
						});
					}
					if (Object.keys(columnOptionsOutput).length) {
						fileOutput.columnOptions = columnOptionsOutput;
					}
				}

				// 序列化文件级别 columnSettings
				if (fileConfig.columnSettings) {
					const columnKeys = Object.keys(fileConfig.columnSettings).sort((a, b) => a.localeCompare(b));
					const columnSettingsOutput: Record<string, KvEditorColumnMultiSelectSettings> = {};
					for (const columnKey of columnKeys) {
						const settings = fileConfig.columnSettings[columnKey];
						if (settings && (typeof settings.multiple === 'boolean' || settings.separator)) {
							const entry: KvEditorColumnMultiSelectSettings = {};
							if (typeof settings.multiple === 'boolean') {
								entry.multiple = settings.multiple;
							}
							if (settings.separator) {
								entry.separator = settings.separator;
							}
							columnSettingsOutput[columnKey] = entry;
						}
					}
					if (Object.keys(columnSettingsOutput).length) {
						fileOutput.columnSettings = columnSettingsOutput;
					}
				}

				// 序列化文件级别 columnDescriptions
				if (fileConfig.columnDescriptions) {
					const columnKeys = Object.keys(fileConfig.columnDescriptions).sort((a, b) => a.localeCompare(b));
					const columnDescriptionsOutput: Record<string, { label?: string; description?: string; }> = {};
					for (const columnKey of columnKeys) {
						const desc = fileConfig.columnDescriptions[columnKey];
						if (desc && (desc.label || desc.description)) {
							columnDescriptionsOutput[columnKey] = { ...desc };
						}
					}
					if (Object.keys(columnDescriptionsOutput).length) {
						fileOutput.columnDescriptions = columnDescriptionsOutput;
					}
				}

				if (Object.keys(fileOutput).length) {
					filesOutput[documentKey] = fileOutput;
				}
			}
			if (Object.keys(filesOutput).length) {
				output.files = filesOutput;
			}
		}

		return JSON.stringify(output, null, 2);
	}

	private sanitizeColumnOptionList(raw: unknown): KvEditorColumnOption[] {
		if (!Array.isArray(raw)) {
			return [];
		}
		const seen = new Set<string>();
		const result: KvEditorColumnOption[] = [];
		for (const entry of raw) {
			if (!entry || typeof entry !== 'object') {
				continue;
			}
			const record = entry as Record<string, unknown>;
			const valueRaw = record.value;
			const value = typeof valueRaw === 'string' ? valueRaw.trim() : '';
			if (!value) {
				continue;
			}
			const key = value.toLowerCase();
			if (seen.has(key)) {
				continue;
			}
			seen.add(key);
			const labelRaw = record.label;
			const descriptionRaw = record.description;
			const colorRaw = record.color;
			const hasLabel = typeof labelRaw === 'string' && labelRaw.trim().length > 0;
			const option: KvEditorColumnOption = {
				value,
				label: hasLabel ? labelRaw.trim() : value,
			};
			if (!hasLabel) {
				option.labelIsFallback = true;
			}
			if (typeof descriptionRaw === 'string' && descriptionRaw.trim().length) {
				option.description = descriptionRaw.trim();
			}
			if (typeof colorRaw === 'string' && colorRaw.trim().length) {
				option.color = colorRaw.trim();
			}
			result.push(option);
		}
		return result;
	}

	private getColumnOptionOverridesPath(folder: vscode.WorkspaceFolder): string {
		return path.join(folder.uri.fsPath, '.vscode', 'kv_editor_setting.json');
	}

	private resolveColumnOptionsScope(folderType: KvFolderType | undefined): KvEditorColumnOptionsScope {
		if (folderType === 'ability' || folderType === 'item' || folderType === 'unit' || folderType === 'custom') {
			return folderType;
		}
		return 'default';
	}

	private normalizeColumnOptionsScope(scope: string): KvEditorColumnOptionsScope | undefined {
		const normalized = scope.trim().toLowerCase();
		switch (normalized) {
			case 'ability':
			case 'item':
			case 'unit':
			case 'custom':
				return normalized as KvEditorColumnOptionsScope;
			case 'default':
				return 'default';
			default:
				return undefined;
		}
	}

	private getColumnOverrideOptionsForFolder(
		folderMap: KvEditorColumnOptionsFolderMap,
		folderType: KvFolderType,
	): KvEditorColumnOption[] | undefined {
		const scoped = folderMap[folderType];
		if (scoped && scoped.length) {
			return scoped;
		}
		const fallback = folderMap.default;
		if (fallback && fallback.length) {
			return fallback;
		}
		return undefined;
	}

	private buildFormulaRowKey(rowId: string | undefined, rowIndexRaw: number | undefined): string | undefined {
		const normalizedId = typeof rowId === 'string' ? rowId.trim() : '';
		if (normalizedId.length) {
			return `id:${normalizedId}`;
		}
		if (Number.isFinite(rowIndexRaw)) {
			const rowIndex = Math.max(0, Math.floor(Number(rowIndexRaw)));
			return `index:${rowIndex}`;
		}
		return undefined;
	}

	private resolveFormulaRowKey(
		rowKey: string,
		rowIdToIndex: Map<string, number>,
		rowCount: number,
	): { rowId?: string; rowIndex: number; } | undefined {
		if (!rowKey) {
			return undefined;
		}
		if (rowKey.startsWith('id:')) {
			const rowId = rowKey.slice(3);
			if (!rowId) {
				return undefined;
			}
			const index = rowIdToIndex.get(rowId);
			if (index === undefined) {
				return undefined;
			}
			return { rowId, rowIndex: index };
		}
		if (rowKey.startsWith('index:')) {
			const indexValue = Number(rowKey.slice(6));
			if (!Number.isFinite(indexValue)) {
				return undefined;
			}
			const rowIndex = Math.max(0, Math.floor(indexValue));
			if (rowIndex < 0 || rowIndex >= rowCount) {
				return undefined;
			}
			const entries = Array.from(rowIdToIndex.entries());
			const resolvedEntry = entries.find(([, idx]) => idx === rowIndex);
			const rowId = resolvedEntry ? resolvedEntry[0] : undefined;
			return { rowId, rowIndex };
		}
		const fallbackIndex = rowIdToIndex.get(rowKey);
		if (fallbackIndex !== undefined) {
			return { rowId: rowKey, rowIndex: fallbackIndex };
		}
		return undefined;
	}

	private buildFormulaPayload(
		folder: vscode.WorkspaceFolder,
		documentKey: string,
		rows: ParsedKvRow[],
		documentUri: vscode.Uri,
	): KvEditorFormulaPayloadEntry[] {
		const overrides = this.getColumnOptionOverrides(folder);
		const storage = overrides.formulas;
		if (!storage) {
			return [];
		}
		const resolvedDocument = this.resolveFormulaDocumentStorageEntry(documentKey, documentUri, storage);
		if (!resolvedDocument) {
			return [];
		}
		const { key: storageKey, formulas: documentFormulas } = resolvedDocument;
		if (storageKey !== documentKey && !storage[documentKey]) {
			const migrated = this.copyColumnOptionOverrides(overrides);
			const formulasMap = migrated.formulas ? { ...migrated.formulas } : {};
			const existing = formulasMap[storageKey];
			if (existing) {
				formulasMap[documentKey] = existing;
				delete formulasMap[storageKey];
				migrated.formulas = formulasMap;
				this.writeColumnOptionOverrides(folder, migrated);
			}
		}
		const rowIdToIndex = new Map<string, number>();
		rows.forEach((row, index) => {
			if (typeof row.id === 'string' && row.id.length) {
				rowIdToIndex.set(row.id, index);
			}
		});
		const payload: KvEditorFormulaPayloadEntry[] = [];
		for (const [rowKey, columnMap] of Object.entries(documentFormulas)) {
			const resolved = this.resolveFormulaRowKey(rowKey, rowIdToIndex, rows.length);
			if (!resolved) {
				continue;
			}
			for (const [columnKey, formula] of Object.entries(columnMap)) {
				if (typeof formula !== 'string' || !formula.trim().startsWith('=')) {
					continue;
				}
				payload.push({
					column: columnKey,
					rowId: resolved.rowId,
					rowIndex: resolved.rowIndex,
					formula: formula.trim(),
				});
			}
		}
		return payload;
	}

	private buildColumnFormulaPayload(
		folder: vscode.WorkspaceFolder,
		documentKey: string,
	): Record<string, string> | undefined {
		const overrides = this.getColumnOptionOverrides(folder);
		const storage = overrides.columnFormulas;
		if (!storage) {
			return undefined;
		}
		if (!storage[documentKey]) {
			return undefined;
		}
		const documentColumnFormulas = storage[documentKey];
		if (!documentColumnFormulas || Object.keys(documentColumnFormulas).length === 0) {
			return undefined;
		}
		return documentColumnFormulas;
	}

	private resolveFormulaDocumentStorageEntry(
		documentKey: string,
		documentUri: vscode.Uri,
		storage: KvEditorFormulaStorage,
	): { key: string; formulas: Record<string, Record<string, string>>; } | undefined {
		if (!storage || typeof storage !== 'object') {
			return undefined;
		}
		if (storage[documentKey]) {
			return { key: documentKey, formulas: storage[documentKey] };
		}
		const normalizedTarget = this.normalizeFormulaDocumentKey(documentKey);
		for (const [key, formulas] of Object.entries(storage)) {
			if (this.normalizeFormulaDocumentKey(key) === normalizedTarget) {
				return { key, formulas };
			}
		}
		const absoluteTarget = this.normalizeFormulaDocumentKey(documentUri.fsPath);
		for (const [key, formulas] of Object.entries(storage)) {
			if (this.normalizeFormulaDocumentKey(key) === absoluteTarget) {
				return { key, formulas };
			}
		}
		return undefined;
	}

	private resolveScopedStorageKey<T>(
		documentKey: string,
		documentUri: vscode.Uri,
		storage: Record<string, T>,
	): string | undefined {
		if (!storage || typeof storage !== 'object') {
			return undefined;
		}
		if (documentKey in storage) {
			return documentKey;
		}
		const normalizedTarget = this.normalizeFormulaDocumentKey(documentKey);
		for (const key of Object.keys(storage)) {
			if (this.normalizeFormulaDocumentKey(key) === normalizedTarget) {
				return key;
			}
		}
		const absoluteTarget = this.normalizeFormulaDocumentKey(documentUri.fsPath);
		for (const key of Object.keys(storage)) {
			if (this.normalizeFormulaDocumentKey(key) === absoluteTarget) {
				return key;
			}
		}
		return undefined;
	}

	private normalizeFormulaDocumentKey(input: string): string {
		return input.replace(/[\\/]+/g, '/').toLowerCase();
	}

	private reorderRowColumns(row: Record<string, unknown>, orderedKeys: string[]): Record<string, unknown> {
		if (!orderedKeys.length) {
			return row;
		}
		const entries = Object.entries(row);
		if (!entries.length) {
			return row;
		}
		const remaining = new Map(entries);
		const reordered: Record<string, unknown> = {};
		for (const key of orderedKeys) {
			if (!remaining.has(key)) {
				continue;
			}
			reordered[key] = remaining.get(key) as unknown;
			remaining.delete(key);
		}
		for (const [key, value] of entries) {
			if (remaining.has(key)) {
				reordered[key] = value;
				remaining.delete(key);
			}
		}
		return reordered;
	}

	private generateUniqueRowKey(block: Record<string, unknown>): string {
		const existingKeys = new Set(Object.keys(block).map((key) => key.toLowerCase()));
		let counter = 1;
		while (counter < Number.MAX_SAFE_INTEGER) {
			const candidate = `NewEntry${counter}`;
			if (!existingKeys.has(candidate.toLowerCase())) {
				return candidate;
			}
			counter += 1;
		}
		return `NewEntry${Date.now()}`;
	}

	private syncStoredFormulasForRowChange(document: vscode.TextDocument, previousRowIds: string[], nextRowIds: string[]): void {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {return;}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {return;}
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		let changed = false;
		const rewrite = (formula: string) => rewriteFormulaRowReferences(formula, previousRowIds, nextRowIds);

		if (overrides.formulas) {
			const resolved = this.resolveFormulaDocumentStorageEntry(documentKey, document.uri, overrides.formulas);
			if (resolved) {
				const nextFormulas: Record<string, Record<string, string>> = {};
				for (const [rowKey, columnMap] of Object.entries(resolved.formulas)) {
					let nextRowKey: string | undefined;
					if (rowKey.startsWith('id:')) {
						const rowId = rowKey.slice(3);
						nextRowKey = nextRowIds.includes(rowId) ? rowKey : undefined;
					} else {
						const previousIndex = this.getFormulaIndexFromKey(rowKey);
						const rowId = previousIndex === undefined ? undefined : previousRowIds[previousIndex];
						const nextIndex = rowId === undefined ? -1 : nextRowIds.indexOf(rowId);
						nextRowKey = nextIndex >= 0 ? `index:${nextIndex}` : undefined;
					}
					if (!nextRowKey) { changed = true; continue; }
					const rewritten = Object.fromEntries(Object.entries(columnMap).map(([columnKey, formula]) => [columnKey, rewrite(formula)]));
					if (nextRowKey !== rowKey || Object.entries(columnMap).some(([columnKey, formula]) => rewritten[columnKey] !== formula)) {changed = true;}
					nextFormulas[nextRowKey] = { ...(nextFormulas[nextRowKey] ?? {}), ...rewritten };
				}
				if (Object.keys(nextFormulas).length) {overrides.formulas[resolved.key] = nextFormulas;}
				else {delete overrides.formulas[resolved.key];}
			}
		}

		if (overrides.columnFormulas) {
			const storageKey = this.resolveScopedStorageKey(documentKey, document.uri, overrides.columnFormulas);
			if (storageKey && overrides.columnFormulas[storageKey]) {
				for (const [columnKey, formula] of Object.entries(overrides.columnFormulas[storageKey])) {
					const rewritten = rewrite(formula);
					if (rewritten !== formula) { overrides.columnFormulas[storageKey][columnKey] = rewritten; changed = true; }
				}
			}
		}
		if (changed) {this.writeColumnOptionOverrides(workspaceFolder, overrides);}
	}

	private shiftFormulaRowIndices(document: vscode.TextDocument, insertionIndex: number, delta: number): void {
		if (!Number.isInteger(insertionIndex) || delta === 0) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return;
		}
		const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
		if (!documentKey) {
			return;
		}
		const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
		const formulas = overrides.formulas;
		if (!formulas) {
			return;
		}
		const resolved = this.resolveFormulaDocumentStorageEntry(documentKey, document.uri, formulas);
		if (!resolved) {
			return;
		}
		const storageKey = resolved.key;
		const documentFormulas = resolved.formulas;
		const entries = Object.entries(documentFormulas);
		if (!entries.length) {
			return;
		}
		const sortedEntries = entries.slice().sort((a, b) => {
			const indexA = this.getFormulaIndexFromKey(a[0]);
			const indexB = this.getFormulaIndexFromKey(b[0]);
			if (indexA === undefined && indexB === undefined) {
				return a[0].localeCompare(b[0]);
			}
			if (indexA === undefined) {
				return delta > 0 ? -1 : 1;
			}
			if (indexB === undefined) {
				return delta > 0 ? 1 : -1;
			}
			return delta > 0 ? indexB - indexA : indexA - indexB;
		});
		let changed = false;
		const updated: Record<string, Record<string, string>> = {};
		for (const [rowKey, columnMap] of sortedEntries) {
			const indexValue = this.getFormulaIndexFromKey(rowKey);
			if (indexValue === undefined || indexValue < insertionIndex) {
				if (!updated[rowKey]) {
					updated[rowKey] = { ...columnMap };
				}
				continue;
			}
			const newIndex = indexValue + delta;
			const newKey = `index:${Math.max(0, newIndex)}`;
			if (newKey !== rowKey) {
				changed = true;
			}
			updated[newKey] = { ...columnMap };
		}
		if (!changed) {
			return;
		}
		const formulasCopy = { ...formulas };
		if (Object.keys(updated).length) {
			formulasCopy[storageKey] = updated;
		} else if (formulasCopy[storageKey]) {
			delete formulasCopy[storageKey];
		}
		overrides.formulas = Object.keys(formulasCopy).length ? formulasCopy : undefined;
		this.writeColumnOptionOverrides(workspaceFolder, overrides);
	}

	private getFormulaIndexFromKey(rowKey: string): number | undefined {
		if (!rowKey.startsWith('index:')) {
			return undefined;
		}
		const numeric = Number(rowKey.slice(6));
		if (!Number.isFinite(numeric)) {
			return undefined;
		}
		return Math.max(0, Math.floor(numeric));
	}

	/**
	 * 设置配置文件监听器，当配置文件变化时清除缓存
	 */
	private setupConfigFileWatchers(): void {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			return;
		}

		for (const folder of workspaceFolders) {
			const watcherKey = folder.uri.fsPath;

			// 避免重复创建监听器
			if (this.fileWatchers.has(watcherKey)) {
				continue;
			}

			// 监听 .vscode 目录下的配置文件
			const pattern = new vscode.RelativePattern(
				folder,
				'.vscode/{kv_editor_setting.json,kv_editor_user_setting.json}'
			);

			const watcher = vscode.workspace.createFileSystemWatcher(pattern);

			// 文件创建、修改、删除时都清除缓存
			const clearCache = (uri: vscode.Uri) => {
				const fileName = path.basename(uri.fsPath);

				if (fileName === 'kv_editor_user_setting.json') {
					this.userSettingsCache.delete(folder.uri.fsPath);
				} else if (fileName === 'kv_editor_setting.json') {
					this.columnOptionOverridesCache.delete(folder.uri.fsPath);
				}
			};

			watcher.onDidCreate(clearCache);
			watcher.onDidChange(clearCache);
			watcher.onDidDelete(clearCache);

			this.fileWatchers.set(watcherKey, watcher);
		}

		// 监听工作区文件夹变化
		this.context.subscriptions.push(
			vscode.workspace.onDidChangeWorkspaceFolders((event) => {
				// 移除已删除的工作区的监听器
				for (const removed of event.removed) {
					const watcher = this.fileWatchers.get(removed.uri.fsPath);
					if (watcher) {
						watcher.dispose();
						this.fileWatchers.delete(removed.uri.fsPath);
						this.userSettingsCache.delete(removed.uri.fsPath);
						this.columnOptionOverridesCache.delete(removed.uri.fsPath);
					}
				}

				// 为新添加的工作区创建监听器
				for (const added of event.added) {
					this.setupConfigFileWatchers();
				}
			})
		);

		// 注册清理函数
		this.context.subscriptions.push({
			dispose: () => {
				for (const watcher of this.fileWatchers.values()) {
					watcher.dispose();
				}
				this.fileWatchers.clear();
			}
		});
	}

}

interface KvEditorPayload {
	fileName: string;
	documentKey?: string;
	folderType: KvFolderType;
	header: string;
	columns: string[];
	rows: ParsedKvRow[];
	error?: string;
	columnOptions: KvEditorColumnOptionResolvedMap;
	columnLayout?: KvEditorColumnLayout;
	texturePreviews: Record<string, TexturePreviewPayload>;
	scriptSupport: KvEditorScriptSupport;
	formulas: KvEditorFormulaPayloadEntry[];
	columnFormulas?: Record<string, string>; // columnKey -> formula
	compactMode?: boolean;
	localizedMode?: boolean;
	columnDescriptions?: Record<string, { label?: string; description?: string; }>;
	frozenColumns?: string;
	localizationSettings?: { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; };
	abilityValuesDescriptions?: Record<string, Record<string, string>>; // rowId -> { key: description }
}

interface ParsedKvTable {
	header: string;
	columns: string[];
	rows: ParsedKvRow[];
	error?: string;
}

interface ParsedKvRow {
	id: string;
	values: Record<string, string>;
	abilityValues?: AbilityValuesEntry[];
	localization?: ParsedKvRowLocalization;
	rawObject?: Record<string, unknown>; // 保存完整的原始对象，用于复制粘贴保留嵌套结构
}

interface ParsedKvRowLocalization {
	name?: string;
	description?: string;
}

type AbilityValuesEntryType = 'object' | 'scalar';

interface AbilityValuesEntry {
	key: string;
	originalKey: string;
	value: string;
	type: AbilityValuesEntryType;
	modifiers: AbilityValuesModifier[];
}

interface AbilityValuesModifier {
	key: string;
	value: string;
}

interface KvEditorEditMessage {
	id: string;
	key: string;
	value: string;
}

interface KvEditorBulkEditMessage {
	edits: KvEditorEditMessage[];
}

interface KvEditorAbilityValuesEditMessage {
	id: string;
	entries: AbilityValuesEditEntry[];
}

interface AbilityValuesEditEntry {
	key: string;
	originalKey?: string;
	value: string;
	type: AbilityValuesEntryType;
	modifiers?: AbilityValuesModifier[];
}

interface LocalizationCacheEntry {
	tokens: LocalizationTokenMap;
	mtimeMs: number;
}

type LocalizationTokenMap = Map<string, string>;
interface KvEditorReorderMessage {
	sourceId: string;
	sourceIndex: number;
	targetIndex: number;
}

interface KvEditorInsertRowMessage {
	referenceId?: string;
	referenceIndex: number;
	position: 'before' | 'after';
}

interface KvEditorBulkInsertRowsMessage {
	insertAfterIndex: number;
	rows: Array<{
		id: string;
		values: Record<string, string>;
		rawObject?: Record<string, unknown>; // 完整的原始对象，用于保留嵌套结构
		abilityValues?: AbilityValuesEditEntry[];
		formulas?: Record<string, string>;
	}>;
}

interface KvEditorDeleteRowMessage {
	rowId: string;
	rowIndex: number;
}

interface KvEditorInsertColumnMessage {
	referenceKey: string;
	referenceIndex: number;
	position: 'before' | 'after';
	columnName: string;
}

interface KvEditorDeleteColumnMessage {
	columnKey: string;
}

interface KvEditorColumnReorderMessage {
	sourceKey: string;
	sourceIndex: number;
	targetIndex: number;
}

interface KvEditorRenameIdMessage {
	oldId: string;
	newId: string;
}

interface KvEditorColumnOption {
	value: string;
	label: string;
	description?: string;
	color?: string;
	labelIsFallback?: boolean;
}

interface KvEditorColumnOptionConfig {
	options: KvEditorColumnOption[];
	multiple: boolean;
	separator: string;
}

interface KvEditorColumnOptionOverride {
	options?: KvEditorColumnOption[];
	multiple?: boolean;
	separator?: string;
}

interface KvEditorColumnOptionSource extends KvEditorColumnOptionConfig {
	overrides?: Partial<Record<KvFolderType, KvEditorColumnOptionOverride>>;
}

type KvEditorColumnOptionResolvedMap = Record<string, KvEditorColumnOptionConfig>;

type KvEditorColumnOptionMap = Record<string, KvEditorColumnOptionSource>;

interface TexturePreviewPayload {
	uri: string;
	kind: TextureKind;
	source: 'extension' | 'addon';
	fileName: string;
}

interface KvEditorScriptSupport {
	applicable: boolean;
	baseReady: boolean;
	useTypescript: boolean;
}

type TextureKind = 'spell' | 'item';

interface TextureSearchRoot {
	root: string;
	source: 'extension' | 'addon';
}

interface TextureAssetMatch {
	fullPath: string;
	kind: TextureKind;
	source: 'extension' | 'addon';
}

type TextureSource = 'extension' | 'addon';

interface TextureMenuRequestMessage {
	requestId: string;
	folderType?: KvFolderType;
}

interface TextureMenuResponsePayload {
	folderType: KvFolderType;
	defaultKind: TextureKind;
	icons: TextureMenuIcon[];
	heroFilters?: TextureMenuHeroDisplay[];
}

interface TextureMenuRawIcon {
	filePath: string;
	textureName: string;
	label: string;
	relativePath: string;
	searchKey: string;
	source: TextureSource;
	kind: TextureKind;
	hero?: string;
}

interface TextureMenuIcon extends TextureMenuRawIcon {
	uri: string;
}

interface TextureMenuHeroCache {
	id: string;
	name: string;
	searchTerm: string;
	filePath: string;
	attribute?: string;
}

interface TextureMenuHeroDisplay {
	id: string;
	name: string;
	searchTerm: string;
	uri: string;
	attribute?: string;
}

interface OpenScriptFileMessage {
	scriptPath: string;
	folderType?: KvFolderType;
}

interface KvEditorColumnLayout {
	columnWidths?: Record<string, number>;
}

interface KvEditorSaveColumnWidthsMessage {
	widths: Record<string, number>;
}

interface KvEditorSaveCompactModeMessage {
	compactMode: boolean;
}

interface KvEditorSaveFrozenColumnsMessage {
	frozenColumns: string | null;
}

interface KvEditorSaveLocalizedModeMessage {
	localizedMode: boolean;
}

interface KvEditorSaveColumnDescriptionMessage {
	columnKey: string;
	label?: string;
	description?: string;
	// scope: 'global' = workspace-wide default, 'file' = only for this KV
	scope?: 'global' | 'file';
}

interface KvEditorUserSettings {
	files: Record<string, KvEditorUserFileSettings>;
}

interface KvEditorUserFileSettings {
	columnWidths?: Record<string, number>;
	compactMode?: boolean;
	localizedMode?: boolean;
	frozenColumns?: string;
}

interface KvEditorSaveColumnOptionsMessage {
	column: string;
	folderType?: KvFolderType;
	options?: KvEditorColumnOptionUpdate[];
	multiple?: boolean;
	separator?: string;
	scope?: 'global' | 'file';
}

interface KvEditorColumnOptionUpdate {
	value: string;
	label?: string;
	description?: string;
	color?: string;
}

interface KvEditorSaveFormulaMessage {
	column: string;
	rowId?: string;
	rowIndex?: number;
	formula?: string;
}

interface KvEditorSaveColumnFormulaMessage {
	columnKey: string;
	formula?: string;
}

interface KvEditorColumnOptionsFile {
	columns: Record<string, KvEditorColumnOptionsFolderMap>;
	formulas?: KvEditorFormulaStorage;
	columnFormulas?: Record<string, Record<string, string>>; // documentKey -> columnKey -> formula
	columnDescriptions?: Record<string, { label?: string; description?: string; }>;
	columnSettings?: Record<string, Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnMultiSelectSettings>>>;
	files?: Record<string, KvEditorFileColumnOptions>;
	localizationSettings?: Record<string, { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; }>; // documentKey -> settings
}

interface KvEditorColumnMultiSelectSettings {
	multiple?: boolean;
	separator?: string;
}

interface KvEditorFileColumnOptions {
	columnOptions?: Record<string, KvEditorColumnOption[]>;
	columnSettings?: Record<string, KvEditorColumnMultiSelectSettings>;
	columnDescriptions?: Record<string, { label?: string; description?: string; }>;
}

type KvEditorColumnOptionsFolderMap = Partial<Record<KvEditorColumnOptionsScope, KvEditorColumnOption[]>>;

type KvEditorColumnOptionsScope = KvFolderType | 'default';

type KvEditorFormulaStorage = Record<string, Record<string, Record<string, string>>>;

interface KvEditorFormulaPayloadEntry {
	column: string;
	rowId?: string;
	rowIndex: number;
	formula: string;
}
