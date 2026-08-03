/** Shared, serializable contract for KvEditor V2. */
export const KV_EDITOR_PROTOCOL_VERSION = 2 as const;
export type KvEditorFolderType = 'ability' | 'item' | 'unit' | 'custom';
export interface KvEditorV2ColumnOption { value: string; label: string; description?: string; color?: string; }
export interface KvEditorV2ColumnOptions { options: KvEditorV2ColumnOption[]; multiple: boolean; separator: string; }
export interface KvEditorV2TextureIcon { textureName: string; label: string; relativePath: string; searchKey: string; source: 'extension' | 'addon'; kind: 'spell' | 'item'; hero?: string; uri: string; }
export interface KvEditorV2TextureHero { id: string; name: string; searchTerm: string; uri: string; attribute?: string; }
export interface KvEditorV2AbilityValueModifier { key: string; value: string; }
export interface KvEditorV2AbilityValue { key: string; originalKey?: string; value: string; type: 'object' | 'scalar'; modifiers: KvEditorV2AbilityValueModifier[]; }
export interface KvEditorV2Row { rowId: string; values: Record<string, string>; abilityValues?: KvEditorV2AbilityValue[]; localization?: { name?: string; description?: string }; rawObject?: Record<string, unknown>; formulas?: Record<string, string>; }
export interface KvEditorV2Formula { columnKey: string; rowId: string; formula: string; status: 'compatible' | 'legacy' | 'error'; error?: string; }
export interface KvEditorV2Snapshot {
	documentUri: string; documentVersion: number; fileName: string; documentKey?: string;
	folderType: KvEditorFolderType; header: string; columns: string[]; rows: KvEditorV2Row[]; error?: string;
	columnOptions: Record<string, KvEditorV2ColumnOptions>; columnWidths: Record<string, number>;
	compactMode: boolean; localizedMode: boolean; frozenColumn?: string;
	columnDescriptions: Record<string, { label?: string; description?: string }>;
	formulas: KvEditorV2Formula[]; columnFormulas: Record<string, string>;
	texturePreviews: Record<string, { uri: string; kind: 'spell' | 'item'; source: 'extension' | 'addon'; fileName: string }>;
	scriptSupport: { applicable: boolean; baseReady: boolean; useTypescript: boolean };
	localizationSettings?: { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string }> };
	abilityValuesDescriptions: Record<string, Record<string, string>>;
}
export type KvEditorV2Command =
	| { type: 'editCell'; rowId: string; columnKey: string; value: string }
	| { type: 'editRecord'; rowId: string; newRowId: string; edits: Array<{ columnKey: string; value: string }>; abilityValues?: KvEditorV2AbilityValue[]; abilityValueDescriptions?: Record<string, string> }
	| { type: 'bulkEdit'; edits: Array<{ rowId: string; columnKey: string; value: string }> }
	| { type: 'fillCells'; entries: Array<{ rowId: string; columnKey: string; value?: string; formula?: string }> }
	| { type: 'insertRows'; anchorRowId?: string; rows: KvEditorV2Row[] }
	| { type: 'renameRow'; rowId: string; newRowId: string }
	| { type: 'insertRow'; anchorRowId?: string; position: 'before' | 'after' }
	| { type: 'deleteRows'; rowIds: string[] }
	| { type: 'reorderRow'; rowId: string; anchorRowId: string; position: 'before' | 'after' }
	| { type: 'insertColumn'; anchorColumnKey: string; position: 'before' | 'after'; columnKey: string }
	| { type: 'deleteColumn'; columnKey: string }
	| { type: 'reorderColumn'; columnKey: string; anchorColumnKey: string; position: 'before' | 'after' }
	| { type: 'editAbilityValues'; rowId: string; entries: KvEditorV2AbilityValue[]; descriptions?: Record<string, string> }
	| { type: 'saveCellFormula'; rowId: string; columnKey: string; formula?: string }
	| { type: 'saveColumnFormula'; columnKey: string; formula?: string }
	| { type: 'saveColumnDescription'; columnKey: string; label?: string; description?: string; scope: 'global' | 'file' }
	| { type: 'saveColumnOptions'; columnKey: string; options: KvEditorV2ColumnOption[]; multiple: boolean; separator: string; scope: 'global' | 'file' }
	| { type: 'saveLocalizationSettings'; settings: { enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string }> } }
	| { type: 'runLocalizationAction'; action: 'import' | 'export' };
export interface KvEditorV2CommandEnvelope {
	protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'executeCommand'; requestId: string;
	documentUri: string; baseVersion: number; command: KvEditorV2Command;
}
export type KvEditorV2Preference =
	| { type: 'compactMode'; value: boolean }
	| { type: 'localizedMode'; value: boolean }
	| { type: 'frozenColumn'; value?: string }
	| { type: 'columnWidths'; value: Record<string, number> };
export type KvEditorV2WebviewMessage =
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'clientReady' }
	| KvEditorV2CommandEnvelope
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'updatePreference'; requestId: string; preference: KvEditorV2Preference }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'openTarget'; target: 'textEditor' | 'formulaHelp' | 'localizationFile' | 'scriptFile'; path?: string }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'requestResource'; requestId: string; resource: 'textureMenu' }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'reloadData' };
export type KvEditorV2HostMessage =
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'initialize' | 'documentChanged'; snapshot: KvEditorV2Snapshot }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'commandResult'; requestId: string; documentVersion: number; snapshot: KvEditorV2Snapshot }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'commandRejected'; requestId: string; reason: 'stale' | 'invalid' | 'failed'; message: string; snapshot: KvEditorV2Snapshot }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'externalChange'; message: string; documentVersion: number }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'resourceResult'; requestId: string; resource: 'textureMenu'; payload: { defaultKind: 'spell' | 'item'; icons: KvEditorV2TextureIcon[]; heroFilters: KvEditorV2TextureHero[]; error?: string } }
	| { protocolVersion: typeof KV_EDITOR_PROTOCOL_VERSION; type: 'notification'; level: 'info' | 'warning' | 'error'; message: string };
export function isKvEditorV2WebviewMessage(value: unknown): value is KvEditorV2WebviewMessage {
	if (!value || typeof value !== 'object') {
		return false;
	}
	const message = value as { protocolVersion?: unknown; type?: unknown };
	return message.protocolVersion === KV_EDITOR_PROTOCOL_VERSION && typeof message.type === 'string'
		&& ['clientReady', 'executeCommand', 'updatePreference', 'openTarget', 'requestResource', 'reloadData'].includes(message.type);
}
