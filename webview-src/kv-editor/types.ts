import type { KvEditorV2ColumnOption } from '../../src/types/kvEditorV2Shared';

export interface CellAddress {
	rowId: string;
	columnKey: string;
}

export type FillMode = 'copy' | 'arithmetic' | 'geometric' | 'formula';

export type DialogState =
	| { kind: 'localization'; enabled: boolean; language: string; filePath: string; autoUpdateOnOpen: boolean; mappings: Array<{ columnName: string; rule: string }> }
	| { kind: 'localizationAction'; action: 'import' | 'export'; filePath: string }
	| { kind: 'insertColumn'; anchorColumnKey: string; columnKey: string }
	| { kind: 'deleteColumn'; columnKey: string }
	| { kind: 'columnFormula'; columnKey: string; formula: string }
	| { kind: 'columnOptions'; columnKey: string; options: KvEditorV2ColumnOption[]; multiple: boolean; separator: string }
	| { kind: 'columnDescription'; columnKey: string; label: string; description: string }
	| { kind: 'fill'; source: CellAddress; sourceValue: string; targetRowIds: string[]; mode: FillMode; factor: string; formula: string }
	| { kind: 'deleteRows'; rowIds: string[] };
