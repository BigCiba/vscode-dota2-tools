import { KvEditorV2Command } from '../types/kvEditorV2Shared';

export function isValidKvEditorV2Command(value: unknown): value is KvEditorV2Command {
	if (!isRecord(value) || typeof value.type !== 'string') {return false;}
	const string = (key: string) => typeof value[key] === 'string';
	const optionalString = (key: string) => value[key] === undefined || typeof value[key] === 'string';
	const position = () => value.position === 'before' || value.position === 'after';
	switch (value.type) {
		case 'editCell': return string('rowId') && string('columnKey') && string('value');
		case 'bulkEdit': return isArray(value.edits, (edit) => isRecord(edit)
			&& typeof edit.rowId === 'string' && typeof edit.columnKey === 'string' && typeof edit.value === 'string');
		case 'fillCells': return isArray(value.entries, (entry) => isRecord(entry)
			&& typeof entry.rowId === 'string' && typeof entry.columnKey === 'string'
			&& (entry.value === undefined || typeof entry.value === 'string')
			&& (entry.formula === undefined || typeof entry.formula === 'string'));
		case 'insertRows': return optionalString('anchorRowId') && isArray(value.rows, isRow);
		case 'renameRow': return string('rowId') && string('newRowId');
		case 'insertRow': return optionalString('anchorRowId') && position();
		case 'deleteRows': return isArray(value.rowIds, (rowId) => typeof rowId === 'string');
		case 'reorderRow': return string('rowId') && string('anchorRowId') && position();
		case 'insertColumn': return string('anchorColumnKey') && string('columnKey') && position();
		case 'deleteColumn': return string('columnKey');
		case 'reorderColumn': return string('columnKey') && string('anchorColumnKey') && position();
		case 'editAbilityValues': return string('rowId') && isArray(value.entries, isAbilityValue)
			&& (value.descriptions === undefined || isStringRecord(value.descriptions));
		case 'saveCellFormula': return string('rowId') && string('columnKey') && optionalString('formula');
		case 'saveColumnFormula': return string('columnKey') && optionalString('formula');
		case 'saveColumnDescription': return string('columnKey') && optionalString('label') && optionalString('description') && isScope(value.scope);
		case 'saveColumnOptions': return string('columnKey') && typeof value.multiple === 'boolean'
			&& string('separator') && isScope(value.scope) && isArray(value.options, isColumnOption);
		case 'saveLocalizationSettings': return isLocalizationSettings(value.settings);
		default: return false;
	}
}

function isRow(value: unknown): boolean {
	return isRecord(value) && typeof value.rowId === 'string' && isStringRecord(value.values)
		&& (value.abilityValues === undefined || isArray(value.abilityValues, isAbilityValue))
		&& (value.formulas === undefined || isStringRecord(value.formulas))
		&& (value.rawObject === undefined || isRecord(value.rawObject));
}

function isAbilityValue(value: unknown): boolean {
	return isRecord(value) && typeof value.key === 'string' && typeof value.value === 'string'
		&& (value.type === 'scalar' || value.type === 'object')
		&& isArray(value.modifiers, (modifier) => isRecord(modifier)
			&& typeof modifier.key === 'string' && typeof modifier.value === 'string');
}

function isColumnOption(value: unknown): boolean {
	return isRecord(value) && typeof value.value === 'string' && typeof value.label === 'string'
		&& (value.description === undefined || typeof value.description === 'string')
		&& (value.color === undefined || typeof value.color === 'string');
}

function isLocalizationSettings(value: unknown): boolean {
	return isRecord(value) && typeof value.enabled === 'boolean' && typeof value.language === 'string'
		&& typeof value.filePath === 'string' && typeof value.autoUpdateOnOpen === 'boolean'
		&& isArray(value.mappings, (mapping) => isRecord(mapping)
			&& typeof mapping.columnName === 'string' && typeof mapping.rule === 'string');
}

function isScope(value: unknown): value is 'global' | 'file' { return value === 'global' || value === 'file'; }
function isStringRecord(value: unknown): value is Record<string, string> {
	return isRecord(value) && Object.values(value).every((entry) => typeof entry === 'string');
}
function isArray(value: unknown, predicate: (entry: unknown) => boolean): boolean {
	return Array.isArray(value) && value.every(predicate);
}
function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
