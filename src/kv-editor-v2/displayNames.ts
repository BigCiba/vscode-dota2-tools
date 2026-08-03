import type { KvEditorV2Snapshot } from '../types/kvEditorV2Shared';

export function kvEditorColumnDisplayName(snapshot: Pick<KvEditorV2Snapshot, 'localizedMode' | 'columnDescriptions'>, columnKey: string): string {
	if (!snapshot.localizedMode) {return columnKey;}
	return snapshot.columnDescriptions[columnKey]?.label?.trim() || columnKey;
}