import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { findKvEntryForUri, KvEditorEntry, KvFolderType, readKvEditorSettings } from '../module/kvEditorConfig';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';
import { localize } from '../utils/localize';
import { getResourcePath } from '../utils/releaseData';

export class kvEditorProvider implements vscode.CustomTextEditorProvider {

	private static _instance: kvEditorProvider | undefined;

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const instance = new kvEditorProvider(context);
		kvEditorProvider._instance = instance;
		return vscode.window.registerCustomEditorProvider(kvEditorProvider.viewType, instance, {
			webviewOptions: {
				retainContextWhenHidden: true,
				enableFindWidget: true,
			}
		});
	}

	public static clearImageCaches(): void {
		if (kvEditorProvider._instance) {
			kvEditorProvider._instance.heroFilterCache = undefined;
			kvEditorProvider._instance.textureMenuCache.clear();
		}
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
	private readonly localizationSettingsCache = new Map<string, any>(); // Stores localization settings for each document
	private readonly abilityValuesDescriptionCache = new Map<string, Map<string, Map<string, string>>>(); // Stores AbilityValues descriptions: documentKey -> rowId -> key -> description
	private readonly userSettingsCache = new Map<string, { settings: KvEditorUserSettings; mtimeMs: number; }>();
	private readonly columnOptionOverridesCache = new Map<string, { overrides: KvEditorColumnOptionsFile; mtimeMs: number; }>();
	private readonly fileWatchers = new Map<string, vscode.FileSystemWatcher>();
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

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = await getWebviewContent(webviewPanel.webview, this.context.extensionUri, 'KvEditor');

		let webviewReady = false;
		let pendingPayload: KvEditorPayload | undefined;

		const postPayload = (payload: KvEditorPayload) => {
			if (!webviewReady) {
				pendingPayload = payload;
				return;
			}
			webviewPanel.webview.postMessage({ type: 'update', payload });
		};

		const updateWebview = () => {
			postPayload(this.buildPayload(document, webviewPanel.webview));
		};

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
			if (event.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		const saveDocumentSubscription = vscode.workspace.onDidSaveTextDocument((savedDocument) => {
			if (savedDocument.uri.toString() === document.uri.toString()) {
				// Automatically export the localization file after saving
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
				// Check whether localization needs to be auto-updated; if descriptions were imported, refresh the frontend
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

	private buildPayload(document: vscode.TextDocument, webview: vscode.Webview): KvEditorPayload {
	  try {
		console.log('[buildPayload] step 1: getWorkspaceFolder');
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		console.log('[buildPayload] step 2: getDocumentSettingsKey');
		const documentKey = workspaceFolder ? this.getDocumentSettingsKey(document.uri, workspaceFolder) : undefined;
		console.log('[buildPayload] step 3: readKvEditorSettings');
		const settings = readKvEditorSettings();
		const entry = settings ? findKvEntryForUri(document.uri, settings) : undefined;
		const folderType: KvFolderType = entry?.type ?? 'custom';
		console.log('[buildPayload] step 4: parseKv');
		const parsed = this.parseKv(document.getText());
		console.log('[buildPayload] step 5: enrichRows');
		this.enrichRowsWithLocalization(parsed.rows, folderType, document.uri.fsPath, entry);
		console.log('[buildPayload] step 6: loadColumnLayout');
		const columnLayout = this.loadColumnLayout(document);
		console.log('[buildPayload] step 7: getResolvedColumnOptions');
		const columnOptions = this.getResolvedColumnOptions(folderType, workspaceFolder, document.uri);
		console.log('[buildPayload] step 8: formulas');
		const formulas = workspaceFolder && documentKey
			? this.buildFormulaPayload(workspaceFolder, documentKey, parsed.rows, document.uri)
			: [];
		const columnFormulas = workspaceFolder && documentKey
			? this.buildColumnFormulaPayload(workspaceFolder, documentKey)
			: undefined;
		console.log('[buildPayload] step 9: user settings, workspaceFolder=', !!workspaceFolder, 'documentKey=', documentKey);

		// Load compact mode settings
		let compactMode: boolean | undefined;
		let localizedMode: boolean | undefined;
		let frozenColumns: string | undefined;
		let columnDescriptions: Record<string, { label?: string; description?: string; }> | undefined;
		let localizationSettings: { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string; }>; } | undefined;
		let abilityValuesDescriptions: Record<string, Record<string, string>> | undefined; // rowId -> key -> description
		if (workspaceFolder && documentKey) {
			console.log('[buildPayload] step 9a: getUserSettings');
			const userSettings = this.getUserSettings(workspaceFolder);
			console.log('[buildPayload] step 9b: files=', typeof userSettings.files, Object.keys(userSettings.files ?? {}).length);
			const fileSettings = userSettings.files[documentKey];
			console.log('[buildPayload] step 9c: fileSettings=', typeof fileSettings);
			if (fileSettings && typeof fileSettings.compactMode === 'boolean') {
				compactMode = fileSettings.compactMode;
			}
			if (fileSettings && typeof fileSettings.localizedMode === 'boolean') {
				localizedMode = fileSettings.localizedMode;
			}
			if (fileSettings && typeof fileSettings.frozenColumns === 'string') {
				frozenColumns = fileSettings.frozenColumns;
			}

			console.log('[buildPayload] step 9d: getColumnOptionOverrides');
			const columnOptionOverrides = this.getColumnOptionOverrides(workspaceFolder);
			if (columnOptionOverrides.localizationSettings && columnOptionOverrides.localizationSettings[documentKey]) {
				localizationSettings = columnOptionOverrides.localizationSettings[documentKey];
				// Update the cache
				this.localizationSettingsCache.set(documentKey, localizationSettings);
			}

			// Load AbilityValues descriptions
			const docDescriptions = this.abilityValuesDescriptionCache.get(documentKey);
			if (docDescriptions && docDescriptions.size > 0) {
				abilityValuesDescriptions = {};
				docDescriptions.forEach((keyMap, rowId) => {
					abilityValuesDescriptions![rowId] = Object.fromEntries(keyMap);
				});
			}
			console.log('[buildPayload] step 9e: readColumnLocalizationConfig');
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

		console.log('[buildPayload] step 10: buildTexturePreviews');
		const texturePreviews = this.buildTexturePreviews(document, parsed.rows, webview, entry);
		console.log('[buildPayload] step 11: buildScriptSupport');
		const scriptSupport = this.buildScriptSupport(folderType);
		console.log('[buildPayload] step 12: return');
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
			texturePreviews,
			scriptSupport,
			formulas,
			columnFormulas,
			compactMode,
			localizedMode,
			columnDescriptions,
			frozenColumns,
			localizationSettings,
			abilityValuesDescriptions,
		};
	  } catch (err) {
		const errMsg = err instanceof Error ? err.stack ?? err.message : String(err);
		console.error('[kvEditorProvider] buildPayload error:', errMsg);
		vscode.window.showErrorMessage('[KV Editor] buildPayload: ' + (err instanceof Error ? err.message : String(err)));
		return {
			fileName: path.basename(document.uri.fsPath),
			documentKey: undefined,
			folderType: 'custom',
			header: '',
			columns: [],
			rows: [],
			error: err instanceof Error ? err.stack ?? err.message : String(err),
			columnOptions: {},
			texturePreviews: {},
			scriptSupport: undefined as any,
			formulas: [],
		};
	  }
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
			if (!this.pathExists(configPath)) return {};
			const raw = fs.readFileSync(configPath, 'utf8');
			const parsed = JSON.parse(raw) as Record<string, unknown> | undefined;
			if (!parsed || typeof parsed !== 'object') return {};
			const result: Record<string, { label?: string; description?: string; }> = {};
			for (const [key, value] of Object.entries(parsed)) {
				if (!key || typeof key !== 'string') continue;
				if (!value || typeof value !== 'object') continue;
				const entry = value as Record<string, unknown>;
				const label = typeof entry.label === 'string' && entry.label.length ? entry.label : undefined;
				const description = typeof entry.description === 'string' && entry.description.length ? entry.description : undefined;
				if (label === undefined && description === undefined) continue;
				result[key] = {};
				if (label !== undefined) result[key].label = label;
				if (description !== undefined) result[key].description = description;
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
		const inputTypeRaw = obj.inputType;
		const inputType = typeof inputTypeRaw === 'string' && ['checkbox', 'number', 'spinner'].includes(inputTypeRaw)
			? inputTypeRaw as 'checkbox' | 'number' | 'spinner'
			: undefined;
		const folderTypeOnlyRaw = obj.folderTypeOnly;
		const folderTypeOnly = Array.isArray(folderTypeOnlyRaw)
			? folderTypeOnlyRaw.filter((v): v is KvFolderType => typeof v === 'string' && ['ability', 'item', 'unit', 'custom'].includes(v))
			: undefined;
		if (!options.length && !inputType) {
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
		const result: KvEditorColumnOptionSource = { options, multiple, separator, overrides };
		if (inputType) {
			result.inputType = inputType;
		}
		if (folderTypeOnly?.length) {
			result.folderTypeOnly = folderTypeOnly;
		}
		return result;
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
			if (config.folderTypeOnly?.length && !config.folderTypeOnly.includes(folderType)) {
				continue;
			}
			const override = config.overrides?.[folderType];
			const optionsSource = override?.options ?? config.options;
			const multiple = override?.multiple ?? config.multiple;
			const separator = override?.separator ?? config.separator;
			resolved[column] = {
				options: optionsSource.map((option) => ({ ...option })),
				multiple,
				separator,
				...(config.inputType ? { inputType: config.inputType } : {}),
			};
		}
		if (workspaceFolder) {
			const overrides = this.getColumnOptionOverrides(workspaceFolder);

			// First apply the global (folderType) level overrides
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

			// Apply the global level multiple and separator settings
			if (overrides.columnSettings) {
				for (const [column, scopeMap] of Object.entries(overrides.columnSettings)) {
					const existing = resolved[column];
					if (!existing) {
						continue;
					}
					// First try the scope for the folderType, then fall back to default
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

			// Then apply the file level overrides (highest priority)
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

				// Apply the file level multiple and separator settings (highest priority)
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
							// If the column does not exist, create an empty configuration
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
		return {
			applicable: true,
			baseReady: true,
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
		if (entry?.type) {
			return entry.type;
		}
		const fileName = path.basename(uri.fsPath).toLowerCase();
		if (fileName.includes('item')) {
			return 'item';
		}
		if (fileName.includes('abili')) {
			return 'ability';
		}
		if (fileName.includes('unit') || fileName.includes('hero')) {
			return 'unit';
		}
		return 'custom';
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
		const heroesDir = path.join(this.extensionImagesRoot, 'heroes_icon');
		if (!this.pathExists(heroesDir)) {
			this.heroFilterCache = [];
			return [];
		}

		// build attribute map from resource/npc/npc_heroes.txt
		const attributeMap: Record<string, string | undefined> = {};
		try {
			const heroesTxt = getResourcePath(this.context, 'resource', 'npc', 'npc_heroes.txt');
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

	private extractEntryComments(text: string): Map<string, string> {
		const comments = new Map<string, string>();
		const lines = text.split(/\r?\n/);
		let pendingComment = '';
		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed.startsWith('//')) {
				pendingComment = trimmed.slice(2).trim();
			} else if (trimmed.startsWith('"') && pendingComment) {
				const match = trimmed.match(/^"([^"]+)"/);
				if (match) {
					comments.set(match[1], pendingComment);
				}
				pendingComment = '';
			} else if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('}')) {
				pendingComment = '';
			}
		}
		return comments;
	}

	private parseKv(text: string): ParsedKvTable {
		try {
			const entryComments = this.extractEntryComments(text);
			const kvObject = readKeyValue2(text ?? '');
			const header = Object.keys(kvObject)[0] ?? '';
			const block = header ? kvObject[header] : undefined;
			if (!block || typeof block !== 'object') {
				return { header, columns: [], rows: [] };
			}

			const columnOrder: string[] = [];
			if (!columnOrder.includes('_comment')) {
				columnOrder.unshift('_comment');
			}
			const rows = Object.entries(block)
				.filter(([_, value]) => value && typeof value === 'object')
				.map(([id, value]) => {
					const entry = value as Record<string, unknown>;
					const rowValues: Record<string, string> = {};
					// Populate _comment from parsed comments
					const comment = entryComments.get(id);
					if (comment) {
						rowValues['_comment'] = comment;
					}
					let abilityValues: AbilityValuesEntry[] | undefined;
					for (const [key, field] of Object.entries(entry)) {
						if (key === 'AbilityValues' && this.isPlainObject(field)) {
							if (!columnOrder.includes(key)) {
								columnOrder.push(key);
							}
							abilityValues = this.parseAbilityValuesField(field as Record<string, unknown>);
							rowValues[key] = '';
							continue;
						}
						// Special handling for the Creature field - flatten its sub-fields
						if (key === 'Creature' && this.isPlainObject(field)) {
							const creatureBlock = field as Record<string, unknown>;
							for (const [creatureKey, creatureValue] of Object.entries(creatureBlock)) {
								// DisableClumpingBehavior and UsesGestureBasedAttackAnimation are scalars
								if (creatureKey === 'DisableClumpingBehavior' || creatureKey === 'UsesGestureBasedAttackAnimation') {
									if (!columnOrder.includes(creatureKey)) {
										columnOrder.push(creatureKey);
									}
									rowValues[creatureKey] = this.coerceKvScalar(creatureValue);
									continue;
								}
								// AttachWearables is a nested numeric-indexed object
								if (creatureKey === 'AttachWearables' && this.isPlainObject(creatureValue)) {
									if (!columnOrder.includes(creatureKey)) {
										columnOrder.push(creatureKey);
									}
									rowValues[creatureKey] = this.parseAttachWearablesField(creatureValue as Record<string, unknown>);
									continue;
								}
								// Other Creature sub-fields are treated as scalars
								if (!this.isPlainObject(creatureValue)) {
									if (!columnOrder.includes(creatureKey)) {
										columnOrder.push(creatureKey);
									}
									rowValues[creatureKey] = this.coerceKvScalar(creatureValue);
								}
							}
							continue;
						}
						if (this.isPlainObject(field)) {
							// other nested blocks are skipped for now
							continue;
						}
						if (!columnOrder.includes(key)) {
							columnOrder.push(key);
						}
						rowValues[key] = this.coerceKvScalar(field);
					}
					// Save the full original object to preserve the nested structure when copying and pasting
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
	 * Parse the AttachWearables field, converting the numeric-indexed object array into a comma-separated ItemDef list
	 * For example: { "1": { "ItemDef": "14878" }, "2": { "ItemDef": "22264" } } => "14878,22264"
	 */
	private parseAttachWearablesField(field: Record<string, unknown>): string {
		const itemDefs: string[] = [];
		// Sort by numeric key
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
		const mapping: Record<string, string> = {
			'zh-cn': 'addon_schinese.txt',
			'zh-hans': 'addon_schinese.txt',
			'zh': 'addon_schinese.txt',
			'en': 'addon_english.txt',
			'en-us': 'addon_english.txt',
			'en-gb': 'addon_english.txt',
			'ru': 'addon_russian.txt',
			'ru-ru': 'addon_russian.txt',
		};
		const candidates: string[] = [];
		const pushUnique = (value: string | undefined) => {
			if (value && !candidates.includes(value)) {
				candidates.push(value);
			}
		};
		pushUnique(mapping[language]);
		const baseLanguage = language.split('-')[0];
		if (baseLanguage && baseLanguage !== language) {
			pushUnique(mapping[baseLanguage]);
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
		const trimmed = baseNameCore.replace(/^item_/, '');
		if (trimmed && trimmed !== baseNameCore) {
			variants.add(trimmed);
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
			throw new Error('Failed to parse the KV root node; changes were not saved.');
		}
		const block = kvObject[header];
		if (!block || typeof block !== 'object') {
			throw new Error('The current KV structure does not support AbilityValues editing.');
		}
		const row = (block as Record<string, unknown>)[message.id];
		if (!row || typeof row !== 'object') {
			throw new Error(`Entry "${message.id}" not found; changes were not saved.`);
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
		const newContent = writeKeyValue(kvObject);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await vscode.workspace.applyEdit(edit);
		if (!applied) {
			throw new Error('Failed to write the KV text.');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (autoSaveMode && autoSaveMode !== 'off') {
			const saved = await document.save();
			if (!saved) {
				throw new Error('Failed to save the KV file.');
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
	 * Check whether a key belongs to a sub-field of the Creature field
	 */
	private isCreatureField(key: string): boolean {
		return key === 'DisableClumpingBehavior' ||
			key === 'UsesGestureBasedAttackAnimation' ||
			key === 'AttachWearables';
	}

	/**
	 * Rebuild the Creature structure from flattened row data
	 * @param row The original row object
	 * @returns The rebuilt row object containing the Creature structure
	 */
	private rebuildCreatureStructure(row: Record<string, unknown>): Record<string, unknown> {
		const creatureFields: Record<string, unknown> = {};
		let hasCreatureFields = false;

		for (const key of Object.keys(row)) {
			if (this.isCreatureField(key)) {
				hasCreatureFields = true;
				const value = row[key];

				// AttachWearables needs to be rebuilt from a comma-separated string into a numeric-indexed object
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
					// DisableClumpingBehavior and UsesGestureBasedAttackAnimation are copied directly
					creatureFields[key] = value;
				}
			}
		}

		// If there are Creature-related fields, rebuild the structure
		if (hasCreatureFields) {
			const newRow: Record<string, unknown> = {};

			// Copy non-Creature fields
			for (const [key, value] of Object.entries(row)) {
				if (!this.isCreatureField(key)) {
					newRow[key] = value;
				}
			}

			// Add the Creature structure
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
				throw new Error('Failed to parse the KV root node; changes were not saved.');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('The current KV structure does not support direct editing.');
			}
			const row = (block as Record<string, unknown>)[message.id];
			if (!row || typeof row !== 'object') {
				throw new Error(`Entry "${message.id}" not found; changes were not saved.`);
			}
			const normalizedKey = message.key;
			const normalizedValue = message.value === undefined || message.value === null ? '' : String(message.value);
			const record = row as Record<string, unknown>;

			// If editing Creature-related fields, special handling is needed
			if (this.isCreatureField(normalizedKey)) {
				// Ensure the Creature object exists
				let creature = record.Creature as Record<string, unknown> | undefined;
				if (!creature || typeof creature !== 'object') {
					creature = {};
					record.Creature = creature;
				}

				// Update the field within Creature
				if (normalizedKey === 'AttachWearables') {
					// Convert the comma-separated string to a numeric-index object
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
					// DisableClumpingBehavior and UsesGestureBasedAttackAnimation
					if (normalizedValue) {
						creature[normalizedKey] = normalizedValue;
					} else {
						delete creature[normalizedKey];
					}
				}

				// If Creature is empty, delete it
				if (Object.keys(creature).length === 0) {
					delete record.Creature;
				}
			} else {
				// Update normal fields directly
				const previousValue = record[normalizedKey];
				if ((previousValue === undefined || previousValue === null ? '' : String(previousValue)) === normalizedValue) {
					return;
				}
				record[normalizedKey] = normalizedValue;
			}

			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
				}
			}

			// If localization binding is enabled, automatically export the localization file
			const docKey = this.getRelativeDocumentKey(document.uri);
			const localizationSettings = this.localizationSettingsCache.get(docKey);
			if (localizationSettings?.enabled && localizationSettings?.mappings?.length > 0) {
				await this.exportLocalizationFile(document, localizationSettings).catch(err => {
					console.error('Failed to auto-export the localization file:', err);
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
				throw new Error('Failed to parse the KV root node; changes were not saved.');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('The current KV structure does not support direct editing.');
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

				// Editing a Creature-related field requires special handling
				if (this.isCreatureField(normalizedKey)) {
					// Ensure the Creature object exists
					let creature = record.Creature as Record<string, unknown> | undefined;
					if (!creature || typeof creature !== 'object') {
						creature = {};
						record.Creature = creature;
					}

					// Update the field within Creature
					if (normalizedKey === 'AttachWearables') {
						// Convert the comma-separated string into a numeric-indexed object
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
						// DisableClumpingBehavior and UsesGestureBasedAttackAnimation
						if (normalizedValue) {
							creature[normalizedKey] = normalizedValue;
						} else {
							delete creature[normalizedKey];
						}
					}

					// If Creature is empty, delete it
					if (Object.keys(creature).length === 0) {
						delete record.Creature;
					}
					mutated = true;
				} else {
					// Update normal fields directly
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
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
				}
			}

			// If localization binding is enabled, automatically export the localization file
			const docKey = this.getRelativeDocumentKey(document.uri);
			const localizationSettings = this.localizationSettingsCache.get(docKey);
			if (localizationSettings?.enabled && localizationSettings?.mappings?.length > 0) {
				await this.exportLocalizationFile(document, localizationSettings).catch(err => {
					console.error('Failed to auto-export the localization file:', err);
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
				throw new Error('Failed to parse the KV root node; changes were not saved.');
			}
			const block = kvObject[header];
			if (!block || typeof block !== 'object') {
				throw new Error('The current KV structure does not support direct editing.');
			}
			const blockRecord = block as Record<string, unknown>;
			const oldRow = blockRecord[oldId];
			if (!oldRow) {
				throw new Error(`Entry "${oldId}" not found, changes not saved.`);
			}
			if (blockRecord[newId] !== undefined) {
				throw new Error(`Entry "${newId}" already exists, cannot rename.`);
			}

			// Rebuild the object to preserve property order
			const newBlock: Record<string, unknown> = {};
			for (const key of Object.keys(blockRecord)) {
				if (key === oldId) {
					newBlock[newId] = oldRow;
				} else {
					newBlock[key] = blockRecord[key];
				}
			}
			kvObject[header] = newBlock;

			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
				}
			}

			// Update rowId in the formula store
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (workspaceFolder) {
				const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
				if (documentKey) {
					const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
					if (overrides.formulas && overrides.formulas[documentKey]) {
						const documentFormulas = { ...overrides.formulas[documentKey] };
						const oldRowKey = `id:${oldId}`;
						const newRowKey = `id:${newId}`;

						// If an old row key exists, move its formula under the new row key
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
			void vscode.window.showInformationMessage(localize('msg_no_script_path'));
			return;
		}
		const folderType = payload.folderType ?? this.detectFolderType(document.uri);
		const useTypescript = Boolean(vscode.workspace.getConfiguration().get('dota2-tools.A6.Kv to lua generate typescript'));
		let baseDir = useTypescript ? getContentDir() : getGameDir();
		// Fallback: derive game dir from document path (look for /game/scripts/npc/)
		if (!baseDir) {
			const docPath = document.uri.fsPath.replace(/\\/g, '/');
			const gameMatch = docPath.match(/^(.+?\/game)\//i);
			if (gameMatch) {
				baseDir = gameMatch[1];
			}
		}
		if (!baseDir) {
			void vscode.window.showWarningMessage(localize('msg_dota2_dir_not_configured'));
			return;
		}
		const extension = useTypescript ? '.ts' : '.lua';
		let normalized = rawScriptPath.replace(/\\/g, '/').trim();
		if (!normalized) {
			void vscode.window.showWarningMessage(localize('msg_cannot_resolve_script'));
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

		// If the file does not exist, create it
		if (!fileExists) {
			const createLabel = localize('msg_create');
			const createFile = await vscode.window.showInformationMessage(
				localize('msg_create_script_prompt', [candidatePath]),
				createLabel,
				localize('msg_cancel')
			);
			if (createFile !== createLabel) {
				return;
			}

			try {
				// Ensure the directory exists
				const dirPath = path.dirname(candidatePath);
				await fs.promises.mkdir(dirPath, { recursive: true });

				// Generate the script template content
				const scriptContent = this.generateScriptTemplate(normalized, folderType, useTypescript);
				await fs.promises.writeFile(candidatePath, scriptContent, 'utf8');
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				void vscode.window.showErrorMessage(localize('msg_failed_create_script', [message]));
				return;
			}
		}

		try {
			const scriptDocument = await vscode.workspace.openTextDocument(candidatePath);
			await vscode.window.showTextDocument(scriptDocument, { preview: false });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(localize('msg_cannot_open_script', [message]));
		}
	}

	private generateScriptTemplate(scriptPath: string, folderType: KvFolderType, useTypescript: boolean): string {
		// Extract the file name from the path (without extension)
		const filename = path.basename(scriptPath);
		const luaPath = scriptPath.replace(/\\/g, '/');

		// Try to read the user's custom template
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
			// Ignore template read errors and use the default template
		}

		// Use the extension's built-in default template
		try {
			const defaultTemplatePath = path.join(this.context.extensionPath, 'resource', 'lua_template.lua');
			if (fs.existsSync(defaultTemplatePath)) {
				let snippet = fs.readFileSync(defaultTemplatePath, 'utf8');
				snippet = snippet.replace(/filename/g, filename);
				snippet = snippet.replace(/path/g, luaPath);
				return snippet;
			}
		} catch {
			// Ignore template read errors
		}

		// Final fallback template
		if (useTypescript) {
			return `// ${filename}\n\nexport function ${filename}(): void {\n    // TODO: Implement\n}\n`;
		}
		return `-- ${filename}\n\nfunction ${filename}()\n    -- TODO: Implement\nend\n`;
	}

	private async handleOpenTextEditor(document: vscode.TextDocument): Promise<void> {
		try {
			// Close the current custom editor and open the default text editor
			await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			// Open the document with the default editor
			await vscode.window.showTextDocument(document, { preview: false });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(localize('msg_cannot_open_editor', [message]));
		}
	}

	private async handleOpenFormulaHelp(): Promise<void> {
		try {
			const docPath = this.context.asAbsolutePath(path.join('docs', 'kv-editor-formula-guide.md'));
			const docUri = vscode.Uri.file(docPath);
			await vscode.commands.executeCommand('markdown.showPreview', docUri);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(localize('msg_cannot_open_formula_doc', [message]));
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

			// Read the configuration
			const overrides = this.getColumnOptionOverrides(workspaceFolder);
			const settings = overrides.localizationSettings?.[docKey];

			// If localization is enabled and mapping configs exist, load the AbilityValues description cache
			// This operation is independent of autoUpdateOnOpen, ensuring the cache can be restored after a restart
			if (settings && settings.enabled && settings.mappings && settings.mappings.length > 0) {
				const imported = await this.importAbilityValuesDescriptions(document, settings, docKey);
				// If descriptions were imported successfully, notify the frontend to refresh
				if (imported > 0 && onRefresh) {
					onRefresh();
				}
			}

			// Check whether auto-update is enabled
			if (!settings || !settings.enabled || !settings.autoUpdateOnOpen) {
				return;
			}

			// Check whether mapping configs and a file path exist
			if (!settings.mappings || settings.mappings.length === 0 || !settings.filePath) {
				return;
			}

			// Perform automatic import (update from VDF to KV)
			await this.importLocalizationFile(document, settings);
		} catch (error) {
			// Fail silently without disturbing the user
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

			// Read the configuration
			const overrides = this.getColumnOptionOverrides(workspaceFolder);
			const settings = overrides.localizationSettings?.[docKey];

			// Check whether localization binding is enabled
			if (!settings || !settings.enabled) {
				return;
			}

			// Check whether mapping configs and a file path exist
			if (!settings.mappings || settings.mappings.length === 0 || !settings.filePath) {
				return;
			}

			// Perform export (export from KV to VDF)
			await this.exportLocalizationFile(document, settings, true);
		} catch (error) {
			// Fail silently without disturbing the user
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

			// Get the full path of the KV file from document.uri
			const kvFilePath = document.uri.fsPath;

			// Extract the relative path after scripts/npc
			let kvRelativePath = '';
			const normalizedPath = kvFilePath.replace(/\\/g, '/');
			const npcMatch = normalizedPath.match(/\/scripts\/npc\/(.+)$/i);
			if (npcMatch && npcMatch[1]) {
				kvRelativePath = npcMatch[1];
				// Remove the file extension
				kvRelativePath = kvRelativePath.replace(/\.(txt|kv)$/, '');
			}

			if (!kvRelativePath) {
				webview.postMessage({
					type: 'localizationPathResponse',
					payload: { path: '' }
				});
				return;
			}

			// Build the full path
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
		payload: any
	): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				throw new Error('Workspace folder not found');
			}

			// Read the existing configuration file
			const overrides = this.readColumnOptionOverridesFromDisk(workspaceFolder);

			// Update localizationSettings
			if (!overrides.localizationSettings) {
				overrides.localizationSettings = {};
			}

			// Use the workspace relative path as the key, consistent with other configs
			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				throw new Error('Failed to get the document relative path');
			}

			overrides.localizationSettings[docKey] = {
				enabled: Boolean(payload?.enabled),
				language: String(payload?.language || 'schinese'),
				filePath: String(payload?.filePath || ''),
				autoUpdateOnOpen: Boolean(payload?.autoUpdateOnOpen),
				mappings: Array.isArray(payload?.mappings) ? payload.mappings : []
			};

			// Write the file
			this.writeColumnOptionOverrides(workspaceFolder, overrides);

			// Update the cache
			this.localizationSettingsCache.set(docKey, overrides.localizationSettings[docKey]);

			// If binding is enabled, immediately export the localization file once
			if (payload?.enabled && payload?.mappings && Array.isArray(payload.mappings) && payload?.filePath) {
				await this.exportLocalizationFile(document, payload);
			}

			console.log('Localization settings saved:', payload);
		} catch (error) {
			console.error('Error saving localization settings:', error);
			vscode.window.showErrorMessage(localize('msg_failed_save_localization', [String(error)]));
		}
	}

	private async exportLocalizationFile(document: vscode.TextDocument, settings: any, silent = false): Promise<void> {
		try {
			const language = settings.language || 'schinese';
			const mappings = settings.mappings || [];

			if (mappings.length === 0) {
				return;
			}

			// Build the actual file path
			const contentDir = getContentDir();
			if (!contentDir) {
				throw new Error('content directory not found');
			}

			// Get the relative path of the KV file from document.uri
			const kvFilePath = document.uri.fsPath;
			const normalizedPath = kvFilePath.replace(/\\/g, '/');
			const npcMatch = normalizedPath.match(/\/scripts\/npc\/(.+)$/i);
			if (!npcMatch || !npcMatch[1]) {
				throw new Error('Failed to parse the KV file path');
			}

			let kvRelativePath = npcMatch[1];
			// Remove the file extension
			kvRelativePath = kvRelativePath.replace(/\.(txt|kv)$/, '');

			// Build the VDF file path
			const vdfPath = path.join(contentDir, 'localization', language, kvRelativePath + '.vdf');

			// Parse the KV file
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

			// Build the tokens object
			const tokens: Record<string, string> = {};

			// Get the documentKey and AbilityValues description cache
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			const documentKey = workspaceFolder ? this.getDocumentSettingsKey(document.uri, workspaceFolder) : undefined;
			const docDescriptions = documentKey ? this.abilityValuesDescriptionCache.get(documentKey) : undefined;

			// Iterate over each row of the KV data
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				// Process each mapping rule
				for (const mapping of mappings) {
					const columnName = mapping.columnName;
					const rule = mapping.rule;

					if (!columnName || !rule) {
						continue;
					}

					// Special handling for AbilityValues
					if (columnName === 'AbilityValues') {
						const abilityValues = (rowData as any)[columnName];
						if (abilityValues && typeof abilityValues === 'object') {
							const rowDescriptions = docDescriptions?.get(id);
							// Iterate over each key of AbilityValues and export its description
							for (const key of Object.keys(abilityValues)) {
								const description = rowDescriptions?.get(key);
								if (description) {
									// Replace ${id} and ${key} in the rule
									const tokenKey = rule
										.replace(/\$\{id\}/g, id)
										.replace(/\$\{key\}/g, key);
									tokens[tokenKey] = description;
								}
							}
						}
						continue;
					}

					// Handling for normal columns
					const columnValue = (rowData as any)[columnName];
					if (columnValue === undefined || columnValue === null) {
						continue;
					}

					// Replace ${id} in the rule
					const tokenKey = rule.replace(/\$\{id\}/g, id);
					tokens[tokenKey] = String(columnValue);
				}
			}

			// Build the VDF structure
			const vdfObject = {
				lang: {
					Language: this.getLanguageDisplayName(language),
					Tokens: tokens
				}
			};

			// Write the VDF file
			const vdfContent = writeKeyValue(vdfObject, 0);

			// Add a file header comment
			// const fileHeader = '// This file is auto-generated by the Dota2 KV editor\n// Do not edit manually - changes will be overwritten on the next export\n\n';
			const finalContent = vdfContent;

			// Ensure the directory exists
			const dir = path.dirname(vdfPath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			// Write the file
			fs.writeFileSync(vdfPath, finalContent, 'utf8');

			if (!silent) {
				vscode.window.showInformationMessage(localize('msg_localization_exported', [path.basename(vdfPath)]));
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

			// Build the actual file path
			const contentDir = getContentDir();
			if (!contentDir) {
				throw new Error('content directory not found');
			}

			// Get the relative path of the KV file from document.uri
			const kvFilePath = document.uri.fsPath;
			const normalizedPath = kvFilePath.replace(/\\/g, '/');
			const npcMatch = normalizedPath.match(/\/scripts\/npc\/(.+)$/i);
			if (!npcMatch || !npcMatch[1]) {
				throw new Error('Failed to parse the KV file path');
			}

			let kvRelativePath = npcMatch[1];
			// Remove the file extension
			kvRelativePath = kvRelativePath.replace(/\.(txt|kv)$/, '');

			// Build the VDF file path
			const vdfPath = path.join(contentDir, 'localization', language, kvRelativePath + '.vdf');

			// Check whether the VDF file exists
			if (!fs.existsSync(vdfPath)) {
				console.warn(`Localization file does not exist: ${vdfPath}`);
				return;
			}

			// Read and parse the VDF file
			const tokens = this.loadLocalizationTokens(vdfPath);
			if (!tokens) {
				console.warn('Failed to load localization tokens');
				return;
			}

			// Parse the KV file
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

			// Iterate over each row of the KV data
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				// Process each mapping rule
				for (const mapping of mappings) {
					const columnName = mapping.columnName;
					const rule = mapping.rule;

					if (!columnName || !rule) {
						continue;
					}

					// Replace ${id} in the rule to generate the token key
					const tokenKey = rule.replace(/\$\{id\}/g, id);
					const tokenValue = tokens.get(tokenKey.toLowerCase());

					if (tokenValue !== undefined) {
						const currentValue = (rowData as any)[columnName];
						// Only update when the values differ
						if (currentValue !== tokenValue) {
							(rowData as any)[columnName] = tokenValue;
							hasChanges = true;
						}
					}
				}
			}

			// If there are changes, write back to the file
			if (hasChanges) {
				const newKvText = writeKeyValue(kvObject, 0);
				const edit = new vscode.WorkspaceEdit();
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(document.getText().length)
				);
				edit.replace(document.uri, fullRange, newKvText);
				await vscode.workspace.applyEdit(edit);
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

			// Find the mapping rule for AbilityValues
			const abilityValuesMapping = mappings.find((m: any) => m.columnName === 'AbilityValues');
			if (!abilityValuesMapping || !abilityValuesMapping.rule) {
				return 0;
			}

			// Build the VDF file path
			const contentDir = getContentDir();
			if (!contentDir) {
				return 0;
			}

			const kvFilePath = document.uri.fsPath;
			const normalizedPath = kvFilePath.replace(/\\/g, '/');
			const npcMatch = normalizedPath.match(/\/scripts\/npc\/(.+)$/i);
			if (!npcMatch || !npcMatch[1]) {
				return 0;
			}

			let kvRelativePath = npcMatch[1];
			kvRelativePath = kvRelativePath.replace(/\.(txt|kv)$/, '');
			const vdfPath = path.join(contentDir, 'localization', language, kvRelativePath + '.vdf');

			if (!fs.existsSync(vdfPath)) {
				return 0;
			}

			// Read the tokens from the VDF file
			const tokens = this.loadLocalizationTokens(vdfPath);
			if (!tokens) {
				return 0;
			}

			// Parse the KV file to get the id of every row and the keys of AbilityValues
			const kvText = document.getText();
			const kvObject = readKeyValue2(kvText);
			const rootKey = Object.keys(kvObject)[0];
			if (!rootKey) {
				console.log('[importAbilityValuesDescriptions] No root key in KV');
				return 0;
			}

			const kvData = kvObject[rootKey];
			if (!kvData || typeof kvData !== 'object') {
				console.log('[importAbilityValuesDescriptions] Invalid KV data');
				return 0;
			}

			// Create or get the document's description cache
			let docDescriptions = this.abilityValuesDescriptionCache.get(documentKey);
			if (!docDescriptions) {
				docDescriptions = new Map();
				this.abilityValuesDescriptionCache.set(documentKey, docDescriptions);
			}

			// Clear existing descriptions
			docDescriptions.clear();

			let totalDescriptionsFound = 0;

			// Iterate over each row and extract the AbilityValues descriptions
			for (const [id, rowData] of Object.entries(kvData)) {
				if (!rowData || typeof rowData !== 'object') {
					continue;
				}

				const abilityValues = (rowData as any)['AbilityValues'];
				if (!abilityValues || typeof abilityValues !== 'object') {
					continue;
				}

				const rowDescriptions = new Map<string, string>();

				// Iterate over each key of AbilityValues
				for (const key of Object.keys(abilityValues)) {
					// Generate the token key from the rule: ${id} and ${key}
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
		payload: any
	): Promise<void> {
		try {
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			if (!workspaceFolder) {
				throw new Error('Workspace folder not found');
			}

			const docKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!docKey) {
				throw new Error('Failed to get the document relative path');
			}

			const rowId = payload?.rowId;
			const descriptions = payload?.descriptions; // Record<string, string>

			if (!rowId || typeof descriptions !== 'object') {
				throw new Error('Invalid payload');
			}

			// Get or create the document's description cache
			let docDescriptions = this.abilityValuesDescriptionCache.get(docKey);
			if (!docDescriptions) {
				docDescriptions = new Map();
				this.abilityValuesDescriptionCache.set(docKey, docDescriptions);
			}

			// Update this row's descriptions
			const rowDescriptions = new Map<string, string>();
			for (const [key, description] of Object.entries(descriptions)) {
				if (description && typeof description === 'string') {
					rowDescriptions.set(key, description);
				}
			}
			docDescriptions.set(rowId, rowDescriptions);

			// Check whether localization is enabled; if so, export immediately
			const settings = this.localizationSettingsCache.get(docKey);
			if (settings?.enabled && settings.autoUpdateOnOpen) {
				await this.exportLocalizationFile(document, settings, true);
			}

			console.log('AbilityValues descriptions saved for row:', rowId);
		} catch (error) {
			console.error('Error saving AbilityValues descriptions:', error);
			vscode.window.showErrorMessage(localize('msg_failed_save_description', [String(error)]));
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
	 * Convert the document URI into a team-collaboration-friendly relative path format
	 * For example: file:///f:/path/to/game/scripts/npc/items/bless.kv -> ${content}/scripts/npc/items/bless.kv
	 * Note: although KV files live under the game directory, for consistency they always use ${content} as the base
	 */
	private getRelativeDocumentKey(documentUri: vscode.Uri): string {
		const fsPath = documentUri.fsPath;
		const normalizedPath = fsPath.replace(/\\/g, '/');

		// Try to extract the path after scripts/npc (prefer this since it is more general)
		const npcMatch = normalizedPath.match(/\/(scripts\/npc\/.+)$/i);
		if (npcMatch && npcMatch[1]) {
			return `\${content}/${npcMatch[1]}`;
		}

		// Try to match the content directory
		const contentDir = getContentDir();
		if (contentDir) {
			const normalizedContentDir = contentDir.replace(/\\/g, '/');
			if (normalizedPath.startsWith(normalizedContentDir)) {
				const relativePath = normalizedPath.substring(normalizedContentDir.length).replace(/^\//, '');
				return `\${content}/${relativePath}`;
			}
		}

		// If the content directory is unavailable, try to match the game directory
		const gameDir = getGameDir();
		if (gameDir) {
			const normalizedGameDir = gameDir.replace(/\\/g, '/');
			if (normalizedPath.startsWith(normalizedGameDir)) {
				const relativePath = normalizedPath.substring(normalizedGameDir.length).replace(/^\//, '');
				// Even when matching the game directory, use ${content} as the prefix for consistency
				return `\${content}/${relativePath}`;
			}
		}

		// Finally fall back to using the URI string
		return documentUri.toString();
	}

	/**
	 * Convert a relative path into an actual file path
	 * For example: ${content}/scripts/npc/items/bless.kv -> /actual/path/to/content/scripts/npc/items/bless.kv
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
			throw new Error('Failed to parse the KV root node; sorting was not performed.');
		}
		const blockRaw = kvObject[header];
		if (!blockRaw || typeof blockRaw !== 'object') {
			throw new Error('The current KV structure does not support row sorting.');
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
		const newContent = writeKeyValue(kvObject);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await vscode.workspace.applyEdit(edit);
		if (!applied) {
			throw new Error('Failed to write the KV text.');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (autoSaveMode && autoSaveMode !== 'off') {
			const saved = await document.save();
			if (!saved) {
				throw new Error('Failed to save the KV file.');
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
				throw new Error('Failed to parse the KV root node; insertion was not performed.');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('The current KV structure does not support row insertion.');
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
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			try {
				this.shiftFormulaRowIndices(document, insertionRowIndex, 1);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after insertion:', error);
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
				}
			}
		});
	}

	private handleBulkInsertRows(document: vscode.TextDocument, message?: KvEditorBulkInsertRowsMessage): Promise<void> {
		return this.runSerializedEdit(async () => {
			if (!message || !message.rows || message.rows.length === 0) {
				return;
			}

			console.log(`[handleBulkInsertRows] Received ${message.rows.length} rows of data`, message.rows);

			const insertAfterIndex = Number(message.insertAfterIndex);
			if (!Number.isFinite(insertAfterIndex)) {
				return;
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('Failed to parse the KV root node; bulk insertion was not performed.');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('The current KV structure does not support bulk insertion.');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);
			const rowEntries = entries
				.map(([key, value], index) => ({ key, value, index }))
				.filter((entry) => this.isPlainObject(entry.value));
			const totalRows = rowEntries.length;

			// Calculate the insertion position
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

			console.log(`[handleBulkInsertRows] Starting insertion of ${message.rows.length} rows, insertion position: ${insertionEntryIndex}`);

			// Bulk insert rows
			for (const rowData of message.rows) {
				// When generating a unique key, account for already inserted rows
				const updatedBlock: Record<string, unknown> = {};
				newEntries.forEach(([key, value]) => {
					updatedBlock[key] = value;
				});

				const newRowKey = this.generateUniqueRowKey(updatedBlock);
				const newRowValue: Record<string, unknown> = {};

				console.log(`[handleBulkInsertRows] Inserting row ${insertedCount + 1}, new key: ${newRowKey}`);

				// Prefer a full copy via rawObject (preserves nested structure); otherwise use values
				const usedRawObject = !!(rowData.rawObject && typeof rowData.rawObject === 'object');

				if (usedRawObject) {
					// Deep-copy the original object, preserving all nested structures (e.g. AttackRangeActivityModifiers, animation_transitions, etc.)
					for (const [key, value] of Object.entries(rowData.rawObject!)) {
						if (key === 'AbilityValues') {
							// AbilityValues is handled specially and overwritten later
							continue;
						}
						if (this.isPlainObject(value)) {
							// Deep-copy the nested object
							newRowValue[key] = JSON.parse(JSON.stringify(value));
						} else {
							newRowValue[key] = value;
						}
					}
				} else if (rowData.values && typeof rowData.values === 'object') {
					// Fallback: use the flattened values
					Object.assign(newRowValue, rowData.values);
				}

				// Handle AbilityValues
				if (rowData.abilityValues && Array.isArray(rowData.abilityValues)) {
					const abilityValuesBlock: Record<string, unknown> = {};
					for (const entry of rowData.abilityValues as unknown as AbilityValuesEntry[]) {
						const key = entry.key;
						if (!key) {
							continue;
						}
						// If it is a pure scalar with no modifiers, save the value directly
						if (entry.type === 'scalar' && (!entry.modifiers || !entry.modifiers.length)) {
							abilityValuesBlock[key] = entry.value ?? '';
							continue;
						}
						// Otherwise save as an object structure
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

				// Only rebuild the Creature structure when using flattened values
				// When using rawObject, Creature is already the correct nested structure
				if (!usedRawObject) {
					const rebuiltRowValue = this.rebuildCreatureStructure(newRowValue);
					newEntries.splice(insertionEntryIndex + insertedCount, 0, [newRowKey, rebuiltRowValue]);
				} else {
					newEntries.splice(insertionEntryIndex + insertedCount, 0, [newRowKey, newRowValue]);
				}
				insertedCount++;
			}

			console.log(`[handleBulkInsertRows] finished inserting, inserted ${insertedCount} rows`);

			// Collect all formulas that need saving
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
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}

			// Adjust formula row indices
			try {
				this.shiftFormulaRowIndices(document, insertionRowIndex, insertedCount);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after bulk insertion:', error);
			}

			// Save all formulas
			if (formulasToSave.length > 0) {
				console.log(`[handleBulkInsertRows] saving ${formulasToSave.length} formulas`);
				for (const formulaData of formulasToSave) {
					await this.handleSaveFormula(document, formulaData);
				}
			}

			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
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
				throw new Error('Cannot parse KV root node; deletion not performed.');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('The current KV structure does not support row deletion.');
			}
			const block = blockRaw as Record<string, unknown>;

			// Verify the row exists
			if (!(rowId in block)) {
				throw new Error(`Row "${rowId}" does not exist.`);
			}

			// Delete the specified row
			const newBlock: Record<string, unknown> = {};
			for (const [key, value] of Object.entries(block)) {
				if (key !== rowId) {
					newBlock[key] = value;
				}
			}

			kvObject[header] = newBlock;
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}

			// Update formula row indices (after deleting a row, subsequent row indices decrease by 1)
			try {
				this.shiftFormulaRowIndices(document, rowIndex, -1);
			} catch (error) {
				console.warn('[kvEditorProvider] Failed to shift formula row indices after deletion:', error);
			}

			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
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
				throw new Error('Failed to parse the KV root node; insertion was not performed.');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('The current KV structure does not support column insertion.');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);

			// Verify whether the column name already exists
			const parsed = this.parseKv(originalText);
			if (parsed.columns.includes(columnName) || columnName === 'id') {
				throw new Error(`Column name "${columnName}" already exists.`);
			}

			// Verify the column name is valid
			if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)) {
				throw new Error('Column names may contain only letters, digits, and underscores, and cannot start with a digit.');
			}

			// Insert the new column at the specified position in each row
			const updatedBlock: Record<string, unknown> = {};
			for (const [rowKey, rowValue] of entries) {
				if (!this.isPlainObject(rowValue)) {
					updatedBlock[rowKey] = rowValue;
					continue;
				}

				const rowRecord = rowValue as Record<string, unknown>;
				const rowEntries = Object.entries(rowRecord);

				// Find the position of the reference column
				const referencePosition = rowEntries.findIndex(([key]) => key === referenceKey);

				if (referencePosition === -1) {
					// If the reference column is not found, append to the end
					updatedBlock[rowKey] = {
						...rowRecord,
						[columnName]: '',
					};
				} else {
					// Insert the new column at the reference column's position
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
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
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

			// The id column cannot be deleted
			if (columnKey === 'id') {
				throw new Error('The id column cannot be deleted.');
			}

			const originalText = document.getText();
			const kvObject = readKeyValue2(originalText ?? '');
			const header = Object.keys(kvObject)[0];
			if (!header) {
				throw new Error('Cannot parse KV root node; deletion not performed.');
			}
			const blockRaw = kvObject[header];
			if (!blockRaw || typeof blockRaw !== 'object') {
				throw new Error('The current KV structure does not support column deletion.');
			}
			const block = blockRaw as Record<string, unknown>;
			const entries = Object.entries(block);

			// Verify whether the column name exists
			const parsed = this.parseKv(originalText);
			if (!parsed.columns.includes(columnKey)) {
				throw new Error(`Column "${columnKey}" does not exist.`);
			}

			// Delete the specified column from each row
			const updatedBlock: Record<string, unknown> = {};
			for (const [rowKey, rowValue] of entries) {
				if (!this.isPlainObject(rowValue)) {
					updatedBlock[rowKey] = rowValue;
					continue;
				}

				const rowRecord = rowValue as Record<string, unknown>;
				const newRowRecord: Record<string, unknown> = {};

				// If it is a Creature-related field, delete it from the Creature object
				if (this.isCreatureField(columnKey)) {
					// Copy all non-Creature fields
					for (const [key, value] of Object.entries(rowRecord)) {
						if (key === 'Creature' && this.isPlainObject(value)) {
							const creature = { ...(value as Record<string, unknown>) };
							delete creature[columnKey];
							// If the Creature has other fields, keep it; otherwise delete the entire Creature
							if (Object.keys(creature).length > 0) {
								newRowRecord[key] = creature;
							}
						} else {
							newRowRecord[key] = value;
						}
					}
				} else {
					// Normal column: copy all columns except the one being deleted
					for (const [key, value] of Object.entries(rowRecord)) {
						if (key !== columnKey) {
							newRowRecord[key] = value;
						}
					}
				}

				updatedBlock[rowKey] = newRowRecord;
			}

			kvObject[header] = updatedBlock;
			const newContent = writeKeyValue(kvObject);
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, newContent);
			const applied = await vscode.workspace.applyEdit(edit);
			if (!applied) {
				throw new Error('Failed to write the KV text.');
			}
			const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
			if (autoSaveMode && autoSaveMode !== 'off') {
				const saved = await document.save();
				if (!saved) {
					throw new Error('Failed to save the KV file.');
				}
			}
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
		const sourcePosition = columns.indexOf(sourceKey);
		if (sourcePosition <= 0 || sourcePosition !== sourceIndex) {
			return;
		}
		const kvObject = readKeyValue2(originalText ?? '');
		const header = Object.keys(kvObject)[0];
		if (!header) {
			throw new Error('Cannot parse KV root node; column sort not performed.');
		}
		const blockRaw = kvObject[header];
		if (!blockRaw || typeof blockRaw !== 'object') {
			throw new Error('The current KV structure does not support column sorting.');
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
		const newContent = writeKeyValue(kvObject);
		const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(originalText.length));
		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, newContent);
		const applied = await vscode.workspace.applyEdit(edit);
		if (!applied) {
			throw new Error('Failed to write the KV text.');
		}
		const autoSaveMode = vscode.workspace.getConfiguration('files').get<string>('autoSave', 'off');
		if (autoSaveMode && autoSaveMode !== 'off') {
			const saved = await document.save();
			if (!saved) {
				throw new Error('Failed to save the KV file.');
			}
		}
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

		// Separate the columns to update from the columns to delete
		const widthsToUpdate: Record<string, number> = {};
		const columnsToDelete: string[] = [];

		if (message.widths && typeof message.widths === 'object') {
			for (const [column, value] of Object.entries(message.widths)) {
				if (column === '__rowNumber') {
					continue;
				}
				if (value === null || value === undefined) {
					// null or undefined means delete
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

		// Apply updates
		Object.assign(existingWidths, widthsToUpdate);

		// Apply deletions
		columnsToDelete.forEach((column) => {
			delete existingWidths[column];
		});

		// If no column-width config remains, delete the entire document entry
		if (!Object.keys(existingWidths).length) {
			if (settings.files[documentKey]) {
				delete settings.files[documentKey];
			}
		} else {
			// Otherwise update or create the document entry
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

		// Update the lite-mode setting
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

		// Update the localization-display toggle setting
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

		// Update the frozen-column setting
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
			throw new Error('Cannot locate the workspace; column description cannot be saved.');
		}

		const scope = message.scope === 'file' ? 'file' : 'global';
		const label = typeof message.label === 'string' && message.label.trim().length ? message.label.trim() : undefined;
		const description = typeof message.description === 'string' && message.description.trim().length ? message.description.trim() : undefined;

		if (scope === 'file') {
			// per-file setting - save to kv_editor_setting.json
			const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!documentKey) {
				return;
			}
			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
			const files = overrides.files ? { ...overrides.files } : {};
			const existingEntry = files[documentKey] ? { ...files[documentKey] } : {};
			const descriptions = existingEntry.columnDescriptions ? { ...existingEntry.columnDescriptions } : {};
			if (label === undefined && description === undefined) {
				if (descriptions[columnKey]) delete descriptions[columnKey];
			} else {
				descriptions[columnKey] = {};
				if (label !== undefined) descriptions[columnKey].label = label;
				if (description !== undefined) descriptions[columnKey].description = description;
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
			// global (workspace-level) default - save to kv_editor_setting.json
			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));
			const global = overrides.columnDescriptions ? { ...overrides.columnDescriptions } : {};
			if (label === undefined && description === undefined) {
				if (global[columnKey]) delete global[columnKey];
			} else {
				global[columnKey] = {};
				if (label !== undefined) global[columnKey].label = label;
				if (description !== undefined) global[columnKey].description = description;
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

		// Check the file modification time; clear the cache if the file changed
		let currentMtime = 0;
		if (this.pathExists(settingsPath)) {
			try {
				const stats = fs.statSync(settingsPath);
				currentMtime = stats.mtimeMs;
			} catch (error) {
				// File read failed; clear the cache
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

	private writeUserSettings(folder: vscode.WorkspaceFolder, settings: KvEditorUserSettings): void {
		const targetPath = this.getUserSettingsPath(folder);
		const dir = path.dirname(targetPath);
		try {
			fs.mkdirSync(dir, { recursive: true });
			const serialized = this.serializeUserSettings(settings);
			fs.writeFileSync(targetPath, `${serialized}\n`, 'utf8');
			// Get the file modification time after writing
			const stats = fs.statSync(targetPath);
			this.userSettingsCache.set(folder.uri.fsPath, {
				settings: this.copyUserSettings(settings),
				mtimeMs: stats.mtimeMs
			});
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to write column width settings:', error);
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to save column width: ${message}`);
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
			throw new Error('Cannot locate the workspace; custom dropdown options cannot be saved.');
		}

		const sanitizedOptions = this.sanitizeColumnOptionList(message.options);
		const isFileScope = message.scope === 'file';
		const multiple = message.multiple === true;
		const separator = typeof message.separator === 'string' && message.separator.length > 0 ? message.separator : '|';

		if (isFileScope) {
			// Save to file-level config
			const documentKey = this.getDocumentSettingsKey(document.uri, workspaceFolder);
			if (!documentKey) {
				throw new Error('Cannot generate the document config key; file-level options cannot be saved.');
			}

			const overrides = this.copyColumnOptionOverrides(this.getColumnOptionOverrides(workspaceFolder));

			// Ensure the files object exists
			if (!overrides.files) {
				overrides.files = {};
			}
			if (!overrides.files[documentKey]) {
				overrides.files[documentKey] = {};
			}
			if (!overrides.files[documentKey].columnOptions) {
				overrides.files[documentKey].columnOptions = {};
			}

			// Save or delete the option
			if (!sanitizedOptions.length) {
				delete overrides.files[documentKey].columnOptions![columnKey];
				// Clean up empty objects
				if (Object.keys(overrides.files[documentKey].columnOptions!).length === 0) {
					delete overrides.files[documentKey].columnOptions;
				}
			} else {
				overrides.files[documentKey].columnOptions![columnKey] = sanitizedOptions;
			}

			// Save the multiple and separator settings
			if (!overrides.files[documentKey].columnSettings) {
				overrides.files[documentKey].columnSettings = {};
			}
			overrides.files[documentKey].columnSettings![columnKey] = { multiple, separator };

			// Clean up empty columnSettings
			if (Object.keys(overrides.files[documentKey].columnSettings!).length === 0) {
				delete overrides.files[documentKey].columnSettings;
			}

			// Clean up empty file config
			if (Object.keys(overrides.files[documentKey]).length === 0) {
				delete overrides.files[documentKey];
			}

			this.writeColumnOptionOverrides(workspaceFolder, overrides);
		} else {
			// Save to global (folderType) level config
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

			// Save global-level multiple and separator settings
			if (!overrides.columnSettings) {
				overrides.columnSettings = {};
			}
			if (!overrides.columnSettings[columnKey]) {
				overrides.columnSettings[columnKey] = {};
			}
			overrides.columnSettings[columnKey][scope] = { multiple, separator };

			// Clean up empty settings (delete only when both fields are undefined)
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
			throw new Error('Cannot locate the workspace; formula cannot be saved.');
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
			throw new Error('Cannot locate the workspace; column formula cannot be saved.');
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

		// Check the file modification time; clear the cache if the file changed
		let currentMtime = 0;
		if (this.pathExists(overridesPath)) {
			try {
				const stats = fs.statSync(overridesPath);
				currentMtime = stats.mtimeMs;
			} catch (error) {
				// File read failed; clear the cache
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

		// Handle the files field (file-level column options)
		const filesSection = container.files;
		if (filesSection && typeof filesSection === 'object' && !Array.isArray(filesSection)) {
			const files: Record<string, KvEditorFileColumnOptions> = {};
			for (const [documentKey, fileConfig] of Object.entries(filesSection as Record<string, unknown>)) {
				if (typeof documentKey !== 'string' || !fileConfig || typeof fileConfig !== 'object') {
					continue;
				}
				const fileOptions: KvEditorFileColumnOptions = {};
				const configObj = fileConfig as Record<string, unknown>;

				// Handle columnOptions
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

				// Handle columnSettings (multi-select and separator config)
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

				// Handle columnDescriptions (file-level column descriptions)
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

		// Handle global columnSettings (multi-select and separator config)
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

		// Parse localizationSettings
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

		// Copy global columnSettings
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
				// Copy file-level columnSettings
				if (fileConfig.columnSettings) {
					copiedFile.columnSettings = {};
					for (const [columnKey, settings] of Object.entries(fileConfig.columnSettings)) {
						copiedFile.columnSettings[columnKey] = { ...settings };
					}
				}
				// Copy file-level columnDescriptions
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

		// Copy localization settings
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
			const serialized = this.serializeColumnOptionOverrides(overrides);
			fs.writeFileSync(targetPath, `${serialized}\n`, 'utf8');
			// Get the file modification time after writing
			const stats = fs.statSync(targetPath);
			this.columnOptionOverridesCache.set(folder.uri.fsPath, {
				overrides: this.copyColumnOptionOverrides(overrides),
				mtimeMs: stats.mtimeMs
			});
		} catch (error) {
			console.warn('[kvEditorProvider] Failed to write column option overrides:', error);
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to save dropdown options: ${message}`);
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

		// Serialize localizationSettings
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

		// Serialize the global columnSettings field
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

		// Serialize the files field
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

				// Serialize file-level columnSettings
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

				// Serialize file-level columnDescriptions
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
	 * Set up the config-file watcher; clear the cache when the config file changes
	 */
	private setupConfigFileWatchers(): void {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			return;
		}

		for (const folder of workspaceFolders) {
			const watcherKey = folder.uri.fsPath;

			// Avoid creating duplicate watchers
			if (this.fileWatchers.has(watcherKey)) {
				continue;
			}

			// Watch config files under the .vscode directory
			const pattern = new vscode.RelativePattern(
				folder,
				'.vscode/{kv_editor_setting.json,kv_editor_user_setting.json}'
			);

			const watcher = vscode.workspace.createFileSystemWatcher(pattern);

			// Clear the cache on file create, modify, and delete
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

		// Watch for workspace folder changes
		this.context.subscriptions.push(
			vscode.workspace.onDidChangeWorkspaceFolders((event) => {
				// Remove watchers for removed workspaces
				for (const removed of event.removed) {
					const watcher = this.fileWatchers.get(removed.uri.fsPath);
					if (watcher) {
						watcher.dispose();
						this.fileWatchers.delete(removed.uri.fsPath);
						this.userSettingsCache.delete(removed.uri.fsPath);
						this.columnOptionOverridesCache.delete(removed.uri.fsPath);
					}
				}

				// Create watchers for newly added workspaces
				for (const added of event.added) {
					this.setupConfigFileWatchers();
				}
			})
		);

		// Register the cleanup function
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
	rawObject?: Record<string, unknown>; // Store the complete raw object, used to preserve nested structure on copy/paste
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
		rawObject?: Record<string, unknown>; // The complete raw object, used to preserve nested structure
		abilityValues?: Array<Record<string, unknown>>;
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
	inputType?: 'checkbox' | 'number' | 'spinner';
}

interface KvEditorColumnOptionOverride {
	options?: KvEditorColumnOption[];
	multiple?: boolean;
	separator?: string;
}

interface KvEditorColumnOptionSource extends KvEditorColumnOptionConfig {
	overrides?: Partial<Record<KvFolderType, KvEditorColumnOptionOverride>>;
	folderTypeOnly?: KvFolderType[];
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