const vscode = acquireVsCodeApi();

window.addEventListener('error', function(event) {
	console.error('[KvEditor] UNCAUGHT ERROR:', event.message, 'at', event.filename, 'line', event.lineno, 'col', event.colno, event.error?.stack);
});
window.addEventListener('unhandledrejection', function(event) {
	console.error('[KvEditor] UNHANDLED REJECTION:', event.reason);
});

// i18n
const _lang = document.documentElement.lang;
const _i18n = {
	'en': {
		compactModeOn: 'Compact mode is ON, click to disable',
		compactModeOff: 'Compact mode is OFF, click to enable',
		localizedModeOn: 'Localization mode is ON, showing descriptions',
		localizedModeOff: 'Localization mode is OFF, showing raw text',
		folderAbility: 'Ability', folderItem: 'Item', folderUnit: 'Unit', folderCustom: 'Custom',
		formulaHelp: 'Formula examples:\n1. baseNumber + offset → generates 1,2,3,4 sequence\n2. `Row_${rowNumber}` → outputs Row_1, Row_2 labels\n3. offset % 2 === 0 ? "A" : "B" → alternately fills A/B\n4. direction === 1 ? baseNumber + offset : baseNumber - offset → increment down, decrement up',
		selectCellToEdit: 'Select a cell to edit',
		pleaseSelectDropdown: 'Please select from dropdown',
		search: 'Search', searchName: 'Search {0}', noMatchingResults: 'No matching results',
		enterColumnName: 'Enter column name', formulaPlaceholder: 'e.g.: =row.id.toLowerCase()',
		localizedDisplayName: 'Localized display name (optional)',
		tooltipDescription: 'Description shown on hover (optional)',
		enterKeywords: 'Enter keywords (space-separated)',
		pathFormat: 'Path format: {localization_path}/{language}/{kv_path}.vdf',
		formulaExprPlaceholder: 'e.g.: base + offset * 2',
		enterScriptPath: 'Enter script path',
		dragToFill: 'Drag to quick fill',
		fillOptions: 'Fill Options', dirDown: 'Down', dirUp: 'Up',
		fillNRows: 'Fill {0} {1} rows',
		fillSequence: 'Sequence', fillCopy: 'Copy', fillLinear: 'Linear Fill',
		fillGeometric: 'Geometric Fill', fillFormula: 'Formula Fill',
		stepLabel: 'Step', ratioLabel: 'Ratio',
		formulaExprLabel: 'Expression (available: base, baseNumber, offset, rowIndex, rowNumber, direction)',
		cancel: 'Cancel', fill: 'Fill',
		unknownFillMode: 'Unknown fill mode',
		noFillableCells: 'No fillable cells currently',
		cannotDetermineColumn: 'Cannot determine fill column',
		selectFillRange: 'Please select the range to fill',
		nonEditableCells: 'Target area contains non-editable cells',
		fillModeNoDropdown: 'This fill mode does not support dropdown fields',
		missingRowId: 'Target row is missing a unique identifier; cannot write.',
		noFillableCellsDot: 'No fillable cells.',
		noWritableFormula: 'No writable formula was generated.',
		copyValueNotInDropdown: 'The value to copy does not exist in the target dropdown list',
		notFormulaSequence: 'Current cell is not a formula; cannot use sequence fill.',
		cannotDetermineBaseRow: 'Cannot determine the base row for the formula.',
		noLinearFill: 'Current cell does not support linear fill',
		notValidNumber: 'Current cell value is not a valid number',
		enterValidStep: 'Please enter a valid step value',
		noGeometricFill: 'Current cell does not support geometric fill',
		enterValidRatio: 'Please enter a valid ratio',
		noFormulaFill: 'Current cell does not support formula fill',
		enterFormulaExpr: 'Please enter a formula expression',
		formulaParseFailed: 'Formula parsing failed: ',
		formulaExecFailed: 'Formula execution failed: ',
		idColumnEmpty: '[kv-editor] The id column value cannot be empty',
		ignoreFormulaWrite: '[kv-editor] Ignoring formula write for unlocatable row',
		notSelected: 'Not selected',
		empty: '(empty)', noEntries: 'No entries',
		doubleClickAbilityValues: 'Double-click to edit AbilityValues',
		dragColumn: 'Drag column {0}',
		columnFormula: 'Column formula: {0}',
		editDropdownOptions: 'Edit {0} dropdown options',
		dragReorder: 'Drag to reorder',
		projectResources: 'Project Resources', extensionResources: 'Extension Resources',
		selectIcon: 'Select Icon',
		scriptDirNotConfigured: 'Script directory not configured',
		openScriptFile: 'Open script file ({0})',
		loadTimeout: 'Loading timed out', loadFailed: 'Failed to load',
		loadingIcons: 'Loading icons…',
		abilityIcons: 'Ability Icons', itemIcons: 'Item Icons',
		heroFilter: 'Hero Filter', heroes: 'Heroes',
		toggleDisplayMode: 'Toggle display mode',
		all: 'All',
		strength: 'Strength', agility: 'Agility', intelligence: 'Intelligence',
		universal: 'Universal', other: 'Other',
		currentFilter: 'Current filter: {0}',
		switchToImageText: 'Switch to image+text mode',
		switchToImageOnly: 'Switch to image-only mode',
		noMatchingIcons: 'No matching icons found.',
		extensionIcons: 'Extension Icons', projectIcons: 'Project Icons',
		close: 'Close', customPrefix: 'Custom: ',
		insertColumnLeft: 'Insert Column Left', insertColumnRight: 'Insert Column Right',
		columnName: 'Column Name', insert: 'Insert',
		columnNameEmpty: 'Column name cannot be empty',
		columnNameExists: 'Column name already exists',
		columnNameInvalid: 'Column name can only contain letters, numbers, and underscores, and cannot start with a digit',
		confirmDeleteColumn: 'Confirm Delete Column',
		confirmDeleteColumnMsg: 'Are you sure you want to delete column "{0}"? This cannot be undone.',
		delete: 'Delete',
		setFormulaForColumn: 'Set formula for column "{0}"',
		formula: 'Formula',
		formulaColumnNote: 'Note: Column formula applies to all cells without an individual formula',
		save: 'Save',
		addDescForColumn: 'Add description for column "{0}"',
		displayLabel: 'Display Label', tooltipDescLabel: 'Tooltip Description',
		applyCurrentFileOnly: 'Apply to current file only',
		savedToFile: 'Saved to current file',
		savedToWorkspace: 'Saved to workspace default config',
		unfreezeColumn: 'Unfreeze Column', freezeColumn: 'Freeze Column',
		removeColumnFormula: 'Remove Column Formula', addColumnFormula: 'Add Column Formula',
		addDescription: 'Add Description', deleteColumn: 'Delete Column',
		confirmDeleteRow: 'Confirm Delete Row',
		confirmDeleteRowMsg: 'Are you sure you want to delete row "{0}"? This cannot be undone.',
		insertRowAbove: 'Insert Row Above', insertRowBelow: 'Insert Row Below',
		copyRow: 'Copy Row', pasteRow: 'Paste Row', deleteRow: 'Delete Row',
		autoFill: 'Auto Fill',
		copiedNRows: 'Copied {0} row(s)', pastedNRows: 'Pasted {0} row(s)',
		baseValue: 'Base Value', levelIncrement: 'Level Increment', levelCount: 'Level Count',
		preview: 'Preview: ', apply: 'Apply',
		abilityValuesClose: 'Close', abilityValuesAddEntry: 'Add Entry',
		abilityValuesSave: 'Save',
		noAbilityValues: 'No AbilityValues entries yet. Please add one.',
		entryKey: 'Entry Key', descriptionLocalized: 'Description (localized)',
		baseValueLabel: 'Base Value',
		autoFillAbility: 'Auto Fill (Base + Increment × Level)',
		addModifier: 'Add Modifier', deleteEntry: 'Delete Entry',
		modifierKey: 'Modifier Key', modifierValue: 'Modifier Value',
		deleteModifier: 'Delete',
		entryKeyEmpty: 'Entry #{0} key cannot be empty.',
		entryKeyDuplicate: 'Duplicate entry key "{0}".',
		modifierKeyEmpty: 'Modifier #{0} key in entry "{1}" cannot be empty.',
		validationErrors: 'There are validation errors.',
		dropdownOptions: 'Dropdown Options', addOption: 'Add Option',
		allowMultiSelect: 'Allow multiple selection',
		separatorLabel: 'Separator:',
		noDropdownOptions: 'No dropdown options yet. Click "Add Option" to start.',
		clickSelectColor: 'Click to select color',
		optionValue: 'Option Value', displayText: 'Display text (optional)',
		tooltipDescOption: 'Tooltip description (optional)',
		moveUp: 'Move Up', moveDown: 'Move Down',
		optionValueEmpty: 'Option value at row #{0} cannot be empty.',
		optionValueDuplicate: 'Duplicate option value "{0}".',
		pathType: 'Path type: {0}', rootKey: 'Root key: {0}', unknown: 'Unknown',
		localizationSettings: 'Localization Settings',
		bindLocFile: 'Bind localization file',
		autoUpdateLoc: 'Auto-update localization on file open',
		language: 'Language', locFilePath: 'Localization file path',
		locExportMappings: 'Localization export mappings',
		locColumn: 'Localization Column', locRule: 'Localization Rule', actions: 'Actions',
		noMappingRules: 'No mapping rules yet. Click the button below to add one.',
		addMapping: ' Add Mapping',
		debugUndoRedo: '[KV-Editor Debug] setupUndoRedo received undo/redo:',
		debugDialogOpen: '[KV-Editor Debug] setupUndoRedo: dialog is open, is current input inside dialog:',
		debugMainDisabled: '[KV-Editor Debug] setupUndoRedo: main input undo/redo disabled while dialog is open',
		debugInputCtrlZ: '[KV-Editor Debug] Input received Ctrl+Z/Y:',
	},
	'zh-cn': {
		compactModeOn: 'Compact mode is ON, click to disable',
		compactModeOff: 'Compact mode is OFF, click to enable',
		localizedModeOn: 'Localization mode is ON, showing descriptions',
		localizedModeOff: 'Localization mode is OFF, showing raw text',
		folderAbility: 'Ability', folderItem: 'Item', folderUnit: 'Unit', folderCustom: 'Custom',
		formulaHelp: 'Formula examples:\n1. baseNumber + offset → generates 1,2,3,4 sequence\n2. `Row_${rowNumber}` → outputs Row_1, Row_2 labels\n3. offset % 2 === 0 ? "A" : "B" → alternately fills A/B\n4. direction === 1 ? baseNumber + offset : baseNumber - offset → increment down, decrement up',
		selectCellToEdit: 'Select a cell to edit',
		pleaseSelectDropdown: 'Please select from dropdown',
		search: 'Search', searchName: 'Search {0}', noMatchingResults: 'No matching results',
		enterColumnName: 'Enter column name', formulaPlaceholder: 'e.g.: =row.id.toLowerCase()',
		localizedDisplayName: 'Localized display name (optional)',
		tooltipDescription: 'Description shown on hover (optional)',
		enterKeywords: 'Enter keywords (space-separated)',
		pathFormat: 'Path format: {localization_path}/{language}/{kv_path}.vdf',
		formulaExprPlaceholder: 'e.g.: base + offset * 2',
		enterScriptPath: 'Enter script path',
		dragToFill: 'Drag to quick fill',
		fillOptions: 'Fill Options', dirDown: 'Down', dirUp: 'Up',
		fillNRows: 'Fill {0} {1} rows',
		fillSequence: 'Sequence', fillCopy: 'Copy', fillLinear: 'Linear Fill',
		fillGeometric: 'Geometric Fill', fillFormula: 'Formula Fill',
		stepLabel: 'Step', ratioLabel: 'Ratio',
		formulaExprLabel: 'Expression (available: base, baseNumber, offset, rowIndex, rowNumber, direction)',
		cancel: 'Cancel', fill: 'Fill',
		unknownFillMode: 'Unknown fill mode',
		noFillableCells: 'No fillable cells currently',
		cannotDetermineColumn: 'Cannot determine fill column',
		selectFillRange: 'Please select the range to fill',
		nonEditableCells: 'Target area contains non-editable cells',
		fillModeNoDropdown: 'This fill mode does not support dropdown fields',
		missingRowId: 'Target row is missing a unique identifier; cannot write.',
		noFillableCellsDot: 'No fillable cells.',
		noWritableFormula: 'No writable formula was generated.',
		copyValueNotInDropdown: 'The value to copy does not exist in the target dropdown list',
		notFormulaSequence: 'Current cell is not a formula; cannot use sequence fill.',
		cannotDetermineBaseRow: 'Cannot determine the base row for the formula.',
		noLinearFill: 'Current cell does not support linear fill',
		notValidNumber: 'Current cell value is not a valid number',
		enterValidStep: 'Please enter a valid step value',
		noGeometricFill: 'Current cell does not support geometric fill',
		enterValidRatio: 'Please enter a valid ratio',
		noFormulaFill: 'Current cell does not support formula fill',
		enterFormulaExpr: 'Please enter a formula expression',
		formulaParseFailed: 'Formula parsing failed: ',
		formulaExecFailed: 'Formula execution failed: ',
		idColumnEmpty: '[kv-editor] The id column value cannot be empty',
		ignoreFormulaWrite: '[kv-editor] Ignoring formula write for unlocatable row',
		notSelected: 'Not selected',
		empty: '(empty)', noEntries: 'No entries',
		doubleClickAbilityValues: 'Double-click to edit AbilityValues',
		dragColumn: 'Drag column {0}',
		columnFormula: 'Column formula: {0}',
		editDropdownOptions: 'Edit {0} dropdown options',
		dragReorder: 'Drag to reorder',
		projectResources: 'Project Resources', extensionResources: 'Extension Resources',
		selectIcon: 'Select Icon',
		scriptDirNotConfigured: 'Script directory not configured',
		openScriptFile: 'Open script file ({0})',
		loadTimeout: 'Loading timed out', loadFailed: 'Failed to load',
		loadingIcons: 'Loading icons…',
		abilityIcons: 'Ability Icons', itemIcons: 'Item Icons',
		heroFilter: 'Hero Filter', heroes: 'Heroes',
		toggleDisplayMode: 'Toggle display mode',
		all: 'All',
		strength: 'Strength', agility: 'Agility', intelligence: 'Intelligence',
		universal: 'Universal', other: 'Other',
		currentFilter: 'Current filter: {0}',
		switchToImageText: 'Switch to image+text mode',
		switchToImageOnly: 'Switch to image-only mode',
		noMatchingIcons: 'No matching icons found.',
		extensionIcons: 'Extension Icons', projectIcons: 'Project Icons',
		close: 'Close', customPrefix: 'Custom: ',
		insertColumnLeft: 'Insert Column Left', insertColumnRight: 'Insert Column Right',
		columnName: 'Column Name', insert: 'Insert',
		columnNameEmpty: 'Column name cannot be empty',
		columnNameExists: 'Column name already exists',
		columnNameInvalid: 'Column name can only contain letters, numbers, and underscores, and cannot start with a digit',
		confirmDeleteColumn: 'Confirm Delete Column',
		confirmDeleteColumnMsg: 'Are you sure you want to delete column "{0}"? This cannot be undone.',
		delete: 'Delete',
		setFormulaForColumn: 'Set formula for column "{0}"',
		formula: 'Formula',
		formulaColumnNote: 'Note: Column formula applies to all cells without an individual formula',
		save: 'Save',
		addDescForColumn: 'Add description for column "{0}"',
		displayLabel: 'Display Label', tooltipDescLabel: 'Tooltip Description',
		applyCurrentFileOnly: 'Apply to current file only',
		savedToFile: 'Saved to current file',
		savedToWorkspace: 'Saved to workspace default config',
		unfreezeColumn: 'Unfreeze Column', freezeColumn: 'Freeze Column',
		removeColumnFormula: 'Remove Column Formula', addColumnFormula: 'Add Column Formula',
		addDescription: 'Add Description', deleteColumn: 'Delete Column',
		confirmDeleteRow: 'Confirm Delete Row',
		confirmDeleteRowMsg: 'Are you sure you want to delete row "{0}"? This cannot be undone.',
		insertRowAbove: 'Insert Row Above', insertRowBelow: 'Insert Row Below',
		copyRow: 'Copy Row', pasteRow: 'Paste Row', deleteRow: 'Delete Row',
		autoFill: 'Auto Fill',
		copiedNRows: 'Copied {0} row(s)', pastedNRows: 'Pasted {0} row(s)',
		baseValue: 'Base Value', levelIncrement: 'Level Increment', levelCount: 'Level Count',
		preview: 'Preview: ', apply: 'Apply',
		abilityValuesClose: 'Close', abilityValuesAddEntry: 'Add Entry',
		abilityValuesSave: 'Save',
		noAbilityValues: 'No AbilityValues entries yet. Please add one.',
		entryKey: 'Entry Key', descriptionLocalized: 'Description (localized)',
		baseValueLabel: 'Base Value',
		autoFillAbility: 'Auto Fill (Base + Increment × Level)',
		addModifier: 'Add Modifier', deleteEntry: 'Delete Entry',
		modifierKey: 'Modifier Key', modifierValue: 'Modifier Value',
		deleteModifier: 'Delete',
		entryKeyEmpty: 'Entry #{0} key cannot be empty.',
		entryKeyDuplicate: 'Duplicate entry key "{0}".',
		modifierKeyEmpty: 'Modifier #{0} key in entry "{1}" cannot be empty.',
		validationErrors: 'There are validation errors.',
		dropdownOptions: 'Dropdown Options', addOption: 'Add Option',
		allowMultiSelect: 'Allow multiple selection',
		separatorLabel: 'Separator:',
		noDropdownOptions: 'No dropdown options yet. Click "Add Option" to start.',
		clickSelectColor: 'Click to select color',
		optionValue: 'Option Value', displayText: 'Display text (optional)',
		tooltipDescOption: 'Tooltip description (optional)',
		moveUp: 'Move Up', moveDown: 'Move Down',
		optionValueEmpty: 'Option value at row #{0} cannot be empty.',
		optionValueDuplicate: 'Duplicate option value "{0}".',
		pathType: 'Path type: {0}', rootKey: 'Root key: {0}', unknown: 'Unknown',
		localizationSettings: 'Localization Settings',
		bindLocFile: 'Bind localization file',
		autoUpdateLoc: 'Auto-update localization on file open',
		language: 'Language', locFilePath: 'Localization file path',
		locExportMappings: 'Localization export mappings',
		locColumn: 'Localization Column', locRule: 'Localization Rule', actions: 'Actions',
		noMappingRules: 'No mapping rules yet. Click the button below to add one.',
		addMapping: ' Add Mapping',
		debugUndoRedo: '[KV-Editor Debug] setupUndoRedo received undo/redo:',
		debugDialogOpen: '[KV-Editor Debug] setupUndoRedo: dialog is open, is current input inside dialog:',
		debugMainDisabled: '[KV-Editor Debug] setupUndoRedo: main input undo/redo disabled while dialog is open',
		debugInputCtrlZ: '[KV-Editor Debug] Input received Ctrl+Z/Y:',
	}
};
function _t(key) { return (_i18n[_lang] && _i18n[_lang][key]) || _i18n['en'][key] || key; }
function _tf(key, ...args) { let s = _t(key); args.forEach((a, i) => { s = s.replace(`{${i}}`, a); }); return s; }

const fileNameEl = document.getElementById('kv-file-name');
const fileMetaEl = document.getElementById('kv-file-meta');
const openTextEditorBtn = document.getElementById('kv-open-text-editor');
const localizationSettingsBtn = document.getElementById('kv-localization-settings');
const toggleCompactModeBtn = document.getElementById('kv-toggle-compact-mode');
const toggleLocalizedModeBtn = document.getElementById('kv-toggle-localized-mode');
const toggleVerticalModeBtn = document.getElementById('kv-toggle-vertical-mode');
let verticalMode = true;
const tableSection = document.getElementById('kv-table');
if (tableSection) {
	tableSection.addEventListener('wheel', (event) => {
		const dy = event.deltaY;
		const dx = event.deltaX;
		if (event.shiftKey) {
			// Shift+wheel: vertical scroll (browser may swap deltaY→deltaX)
			const delta = Math.abs(dy) > Math.abs(dx) ? dy : dx;
			if (delta) {
				event.preventDefault();
				tableSection.scrollTop += delta;
			}
		} else if (Math.abs(dy) > Math.abs(dx)) {
			// Normal wheel: horizontal scroll
			event.preventDefault();
			tableSection.scrollLeft += dy;
		}
	}, { passive: false });
}
const emptySection = document.getElementById('kv-empty');
const errorSection = document.getElementById('kv-error');
const formulaAddressInput = document.getElementById('kv-editor-address');
const formulaValueInput = document.getElementById('kv-editor-value');
const formulaHelpBtn = document.getElementById('kv-formula-help');
const searchInput = document.getElementById('kv-search-input');
const searchClearBtn = document.getElementById('kv-search-clear');

if (searchInput) {
	let searchDebounce = null;
	searchInput.addEventListener('input', () => {
		clearTimeout(searchDebounce);
		searchDebounce = setTimeout(() => {
			tableSearchFilter = searchInput.value.trim().toLowerCase();
			if (searchClearBtn) searchClearBtn.hidden = !tableSearchFilter;
			if (latestPayload) {
				renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
			}
		}, 200);
	});
	searchInput.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			searchInput.value = '';
			tableSearchFilter = '';
			if (searchClearBtn) searchClearBtn.hidden = true;
			if (latestPayload) {
				renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
			}
		}
	});
}
if (searchClearBtn) {
	searchClearBtn.addEventListener('click', () => {
		if (searchInput) searchInput.value = '';
		tableSearchFilter = '';
		searchClearBtn.hidden = true;
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

if (emptySection) {
	emptySection.textContent = 'Loading KV data...';
}
setSectionVisibility({ showTable: false, showEmpty: true, showError: false });

if (formulaHelpBtn) {
	formulaHelpBtn.addEventListener('click', () => {
		vscode.postMessage({ type: 'openFormulaHelp' });
	});
}

if (openTextEditorBtn) {
	openTextEditorBtn.addEventListener('click', () => {
		vscode.postMessage({ type: 'openTextEditor' });
	});
}

if (localizationSettingsBtn) {
	localizationSettingsBtn.addEventListener('click', () => {
		openLocalizationSettingsDialog();
	});
}

let localizationSettings = {
	enabled: false,
	language: 'schinese',
	filePath: '',
	autoUpdateOnOpen: false,
	mappings: [] // { columnName: string, rule: string }[]
};

let compactMode = false;

let localizedMode = false;

let isDialogOpen = false;

let columnDescriptions = {};

const frozenColumns = new Set();

if (toggleCompactModeBtn) {
	const updateButtonState = () => {
		if (compactMode) {
			toggleCompactModeBtn.classList.add('active');
			toggleCompactModeBtn.title = _t('compactModeOn');
		} else {
			toggleCompactModeBtn.classList.remove('active');
			toggleCompactModeBtn.title = _t('compactModeOff');
		}
	};
	updateButtonState();

	toggleCompactModeBtn.addEventListener('click', () => {
		compactMode = !compactMode;
		updateButtonState();

		vscode.postMessage({
			type: 'saveCompactMode',
			payload: { compactMode }
		});

		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

// Vertical mode toggle
if (toggleVerticalModeBtn) {
	if (verticalMode) {
		toggleVerticalModeBtn.classList.add('active');
		toggleVerticalModeBtn.title = 'Vertical mode ON';
	}
	toggleVerticalModeBtn.addEventListener('click', () => {
		verticalMode = !verticalMode;
		if (verticalMode) {
			toggleVerticalModeBtn.classList.add('active');
			toggleVerticalModeBtn.title = 'Vertical mode ON';
		} else {
			toggleVerticalModeBtn.classList.remove('active');
			toggleVerticalModeBtn.title = 'Vertical mode OFF';
		}
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

if (toggleLocalizedModeBtn) {
	const updateButtonState = () => {
		if (localizedMode) {
			toggleLocalizedModeBtn.classList.add('active');
			toggleLocalizedModeBtn.title = _t('localizedModeOn');
		} else {
			toggleLocalizedModeBtn.classList.remove('active');
			toggleLocalizedModeBtn.title = _t('localizedModeOff');
		}
	};
	updateButtonState();

	toggleLocalizedModeBtn.addEventListener('click', () => {
		localizedMode = !localizedMode;
		updateButtonState();

		vscode.postMessage({
			type: 'saveLocalizedMode',
			payload: { localizedMode }
		});

		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

const COLUMN_MIN_WIDTH = 100;
const ROW_NUMBER_COLUMN_KEY = '__rowNumber';
const ROW_NUMBER_MIN_WIDTH = 32;

const FOLDER_TYPE_LABELS = {
	ability: _t('folderAbility'),
	item: _t('folderItem'),
	unit: _t('folderUnit'),
	custom: _t('folderCustom')
};

const FORMULA_TOOLTIP_HELP = _t('formulaHelp');

let latestPayload = undefined;
let tableSearchFilter = '';
let pendingScrollRight = false;

const ABILITY_PROPERTIES = [
	'BaseClass', 'ScriptFile', 'AbilityTextureName', 'AbilitySound',
	'AbilityCastAnimation', 'AbilityCastGestureSlot', 'AbilityType', 'AbilityBehavior',
	'AbilityUnitDamageType', 'SpellImmunityType', 'AbilityUnitTargetTeam',
	'AbilityUnitTargetType', 'AbilityUnitTargetFlags', 'SpellDispellableType',
	'HasScepterUpgrade', 'HasShardUpgrade', 'IsShardUpgrade', 'IsGrantedByShard',
	'IsGrantedByScepter', 'LinkedAbility', 'LinkedShardAbility',
	'AbilityDraftScepterAbility', 'AbilityDraftShardAbility',
	'OnCastbar', 'OnLearnbar', 'FightRecapLevel',
	'MaxLevel', 'RequiredLevel', 'LevelsBetweenUpgrades',
	'AbilityDamage', 'AbilityCooldown', 'AbilityCharges', 'AbilityChargeRestoreTime',
	'AbilityCastRange', 'AbilityCastRangeBuffer', 'AbilityCastPoint',
	'AbilityManaCost', 'AbilityHealthCost', 'AbilityChannelTime', 'AbilityDuration',
	'AbilitySharedCooldown', 'AbilityOvershootCastRange',
	'HotKeyOverride', 'DisplayAdditionalHeroes', 'AbilityChannelAnimation',
	'AnimationIgnoresModelScale', 'IsCastableWhileHidden', 'AnimationPlaybackRate',
	'IsBreakable', 'Innate', 'SpecialBonusIntrinsicModifier',
	'AbilityModifierSupportValue', 'AbilityModifierSupportBonus',
	'AbilitySpecial', 'AbilityValues', 'precache',
];

const ITEM_PROPERTIES = [
	'BaseClass', 'ScriptFile', 'AbilityTextureName', 'AbilityBehavior',
	'AbilityUnitDamageType', 'SpellImmunityType', 'AbilityUnitTargetTeam',
	'AbilityUnitTargetType', 'AbilityUnitTargetFlags',
	'AbilityCastRange', 'AbilityCastPoint', 'AbilityCooldown', 'AbilityManaCost',
	'AbilityChannelTime', 'AbilityDuration', 'AbilityDamage',
	'MaxLevel', 'AbilityCharges', 'AbilityChargeRestoreTime',
	'ItemCost', 'ItemShopTags', 'ItemQuality', 'ItemAliases',
	'ItemPurchasable', 'ItemSellable', 'ItemInitiallySellable', 'ItemDroppable',
	'ItemKillable', 'ItemStackable', 'ItemStackableMax', 'ItemPermanent',
	'ItemCombinable', 'ItemDisassemblable', 'ItemDisassembleRule',
	'ItemRecipe', 'ItemRequiresCharges', 'ItemInitialCharges', 'ItemHideCharges',
	'ItemIsNeutralDrop', 'ItemIsNeutralActiveDrop', 'ItemIsNeutralPassiveDrop',
	'ItemContributesToNetWorthWhenDropped', 'AllowedInBackpack',
	'IsTempestDoubleClonable', 'SpeciallyBannedFromNeutralSlot',
	'ItemShareability', 'ItemDeclarations', 'ItemSupport',
	'ItemStockMax', 'ItemStockInitial', 'ItemStockTime', 'ItemInitialStockTime',
	'BonusDelayedStockCount', 'ItemInitialStockTimeTurbo',
	'SideShop', 'SecretShop', 'GlobalShop', 'ItemGloballyCombinable',
	'MaxUpgradeLevel', 'ItemBaseLevel', 'UpgradesItems', 'UpgradeRecipe',
	'ItemResult', 'ItemRequirements',
	'ShouldBeSuggested', 'ShouldBeInitiallySuggested',
	'Model', 'Effect', 'UIPickupSound', 'UIDropSound', 'WorldDropSound',
	'ItemAlertable', 'ItemDisplayCharges', 'ItemCastOnPickup',
	'ItemCanBeConsumed', 'AutoPickup', 'ItemLevelByGameTime',
	'HasScepterUpgrade', 'HasShardUpgrade',
	'AbilitySpecial', 'AbilityValues', 'precache',
];

const GENERIC_ABILITY_TEMPLATE = {
	_comment: '',
	BaseClass: 'ability_lua',
	ScriptFile: '',
	AbilityTextureName: '',
	AbilityBehavior: 'DOTA_ABILITY_BEHAVIOR_NO_TARGET',
	AbilityUnitTargetTeam: '',
	AbilityUnitTargetType: '',
	AbilityCastAnimation: 'ACT_DOTA_CAST_ABILITY_1',
	AbilityCastRange: '0',
	AbilityCastPoint: '0.2',
	AbilityCooldown: '10',
	AbilityManaCost: '100',
	MaxLevel: '4',
};

const GENERIC_ITEM_TEMPLATE = {
	_comment: '',
	BaseClass: 'item_lua',
	ScriptFile: '',
	AbilityTextureName: '',
	AbilityBehavior: 'DOTA_ABILITY_BEHAVIOR_NO_TARGET',
	ItemCost: '0',
	ItemDroppable: '1',
	ItemSellable: '1',
	ItemPurchasable: '1',
	ItemKillable: '1',
	ItemStackable: '0',
	ItemPermanent: '1',
	MaxLevel: '1',
	AbilityCooldown: '0',
	AbilityManaCost: '0',
};

function updateCreateButtons(folderType, rows) {
	let group = document.querySelector('.kv-header-create-group');
	if (group) {
		group.remove();
	}
	if (!folderType) return;
	const headerActions = document.querySelector('.kv-header-actions');
	if (!headerActions) return;

	group = document.createElement('div');
	group.className = 'kv-header-create-group';

	if (folderType === 'ability' || folderType === 'custom') {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'kv-header-create-btn';
		const icon = document.createElement('span');
		icon.className = 'codicon codicon-add';
		btn.appendChild(icon);
		btn.appendChild(document.createTextNode(' Ability'));
		btn.title = 'Add generic ability';
		btn.addEventListener('click', () => {
			const totalRows = Array.isArray(rows) ? rows.length : 0;
			pendingScrollRight = true;
			vscode.postMessage({
				type: 'bulkInsertRows',
				payload: {
					insertAfterIndex: totalRows - 1,
					rows: [{ id: 'new_ability', values: { ...GENERIC_ABILITY_TEMPLATE } }]
				}
			});
		});
		group.appendChild(btn);
	}

	if (folderType === 'item' || folderType === 'custom') {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'kv-header-create-btn';
		const icon = document.createElement('span');
		icon.className = 'codicon codicon-add';
		btn.appendChild(icon);
		btn.appendChild(document.createTextNode(' Item'));
		btn.title = 'Add generic item';
		btn.addEventListener('click', () => {
			const totalRows = Array.isArray(rows) ? rows.length : 0;
			pendingScrollRight = true;
			vscode.postMessage({
				type: 'bulkInsertRows',
				payload: {
					insertAfterIndex: totalRows - 1,
					rows: [{ id: 'new_item', values: { ...GENERIC_ITEM_TEMPLATE } }]
				}
			});
		});
		group.appendChild(btn);
	}

	// Add Property button
	const addPropBtn = document.createElement('button');
	addPropBtn.type = 'button';
	addPropBtn.className = 'kv-header-create-btn';
	const addPropIcon = document.createElement('span');
	addPropIcon.className = 'codicon codicon-symbol-property';
	addPropBtn.appendChild(addPropIcon);
	addPropBtn.appendChild(document.createTextNode(' Property'));
	addPropBtn.title = 'Add property from list';
	addPropBtn.addEventListener('click', () => openAddPropertyDropdown());
	group.appendChild(addPropBtn);

	headerActions.insertBefore(group, headerActions.firstChild);
}
const COLLAPSIBLE_COLUMNS = new Set(['AbilityBehavior', 'AbilityUnitTargetTeam', 'AbilityUnitTargetType', 'AbilityUnitTargetFlags']);

function wrapCollapsibleCell(td, displayValue) {
	const summary = document.createElement('div');
	summary.className = 'kv-collapsible-summary';
	const expandIcon = document.createElement('span');
	expandIcon.className = 'codicon codicon-chevron-right kv-collapsible-expand-icon';
	summary.appendChild(expandIcon);
	const values = (displayValue || '').split('|').map(v => v.trim()).filter(Boolean);
	const countBadge = document.createElement('span');
	countBadge.className = 'kv-collapsible-count';
	countBadge.textContent = String(values.length);
	summary.appendChild(countBadge);
	const label = document.createElement('span');
	label.className = 'kv-collapsible-label';
	label.textContent = values.join(', ');
	label.title = values.join(', ');
	summary.appendChild(label);

	// Hide existing content
	const children = Array.from(td.childNodes);
	const wrapper = document.createElement('div');
	wrapper.className = 'kv-collapsible-content';
	wrapper.hidden = true;
	children.forEach(c => wrapper.appendChild(c));
	td.appendChild(summary);
	td.appendChild(wrapper);

	summary.addEventListener('click', (e) => {
		e.stopPropagation();
		const collapsed = wrapper.hidden;
		wrapper.hidden = !collapsed;
		expandIcon.className = collapsed
			? 'codicon codicon-chevron-down kv-collapsible-expand-icon'
			: 'codicon codicon-chevron-right kv-collapsible-expand-icon';
	});
}

let activeCell = undefined;
const columnWidths = Object.create(null);
let currentDocumentKey = undefined;

let selectedCellKey = undefined;
let selectedCell = undefined;
let selectedTd = undefined;
let suppressFormulaCommit = false;
let columnOptionConfig = Object.create(null);

const COLUMN_INPUT_TYPES = {
	ItemDroppable: 'checkbox',
	ItemSellable: 'checkbox',
	ItemPurchasable: 'checkbox',
	ItemKillable: 'checkbox',
	ItemPermanent: 'checkbox',
	ItemIsNeutralDrop: 'checkbox',
	ItemDisassemblable: 'checkbox',
	ItemRequiresCharges: 'checkbox',
	ItemCombinable: 'checkbox',
	ItemStackable: 'checkbox',
	ItemRecipe: 'checkbox',
	ItemIsNeutralActiveDrop: 'checkbox',
	AllowedInBackpack: 'checkbox',
	IsTempestDoubleClonable: 'checkbox',
	SpeciallyBannedFromNeutralSlot: 'checkbox',
	ItemContributesToNetWorthWhenDropped: 'checkbox',
	ItemIsNeutralPassiveDrop: 'checkbox',
	OnCastbar: 'checkbox',
	Innate: 'checkbox',
	IsBreakable: 'checkbox',
	HasShardUpgrade: 'checkbox',
	HasScepterUpgrade: 'checkbox',
	IsCastableWhileHidden: 'checkbox',
	ItemCost: 'number',
	MaxUpgradeLevel: 'spinner',
	ItemBaseLevel: 'spinner',
};

function getColumnInputType(column) {
	return COLUMN_INPUT_TYPES[column] || null;
}

const modifiedColumns = new Set();
const originalColumnWidths = Object.create(null);
const savedColumnWidths = new Set();
let columnOptionsEditorState = null;
let resizeState = null;
let openMultiSelectContext = null;
let pendingMultiSelectReopen = null;
let textureMenuState = null;
let abilityValuesEditorState = null;
let rowContextMenuState = null;
let columnContextMenuState = null;
const pendingTextureMenuRequests = new Map();
let rowDragState = null;
let clipboardData = null;
let fillHandleElement = null;
let fillHandleState = null;
let fillPreviewCells = [];
let fillPopupState = null;
let columnDragState = null;
let autofillPopupState = null;

let abilityValuesDescriptions = {};

let selectedRows = new Set();
let lastSelectedRowIndex = null;
let copiedRowsData = null;

let payloadVersion = 0;
let pendingEditVersion = 0;
let isEditInProgress = false;

const FORMULA_ERROR_VALUE = '#ERROR!';
const FORMULA_CYCLE_VALUE = '#CYCLE!';

const formulaDefinitions = new Map();
const columnFormulas = new Map();

const DEFAULT_COLORS = [
	'#4A90E2', '#50C878', '#F5A623', '#E24A4A', '#9B59B6',
	'#1ABC9C', '#E67E22', '#3498DB', '#E91E63', '#9C27B0',
	'#00BCD4', '#8BC34A', '#FFC107', '#FF5722', '#607D8B',
	'#795548', '#FF9800', '#CDDC39', '#03A9F4', '#673AB7'
];

let colorPickerPopup = null;

function getAutoColor(index) {
	return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}
const formulaComputedValues = new Map();

const FILL_DEFAULT_STEP = 1;
const FILL_DEFAULT_RATIO = 2;
const COLUMN_WIDTH_SAVE_DEBOUNCE_MS = 600;

let columnWidthSaveHandle = null;

function beginEdit() {
	pendingEditVersion++;
	isEditInProgress = true;
	return pendingEditVersion;
}

function endEdit(editVersion) {
	if (editVersion === pendingEditVersion) {
		isEditInProgress = false;
	}
}

function isEditStale(editVersion) {
	return editVersion !== pendingEditVersion || payloadVersion > editVersion;
}

window.addEventListener('beforeunload', () => {
	if (columnWidthSaveHandle) {
		clearTimeout(columnWidthSaveHandle);
		columnWidthSaveHandle = null;
		flushColumnWidthSave();
	}
});

document.addEventListener('mousemove', handleColumnResize);
document.addEventListener('mouseup', stopColumnResize);

document.addEventListener('keydown', (event) => {
	const isUndoRedo = (event.ctrlKey || event.metaKey) && (event.key?.toLowerCase() === 'z' || event.key?.toLowerCase() === 'y');

	if (isUndoRedo) {
		const activeElement = document.activeElement;
		const isEditableElement = activeElement instanceof HTMLInputElement ||
			activeElement instanceof HTMLTextAreaElement ||
			activeElement?.isContentEditable;

		if (isDialogOpen || isEditableElement) {
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	}
}, true);

document.addEventListener('keydown', handleRowClipboardShortcuts);
document.addEventListener('keydown', handleClipboardShortcuts);
document.addEventListener('keydown', handleEscapeClearSelection);
document.addEventListener('keydown', handleCellNavigation);

if (formulaValueInput) {
	formulaValueInput.addEventListener('input', () => {
		if (!selectedCell || !selectedCell.editable || !selectedCell.element || selectedCell.usesDropdown) {
			return;
		}
		setElementValue(selectedCell.element, formulaValueInput.value ?? '', selectedCell.fieldConfig);
	});
	formulaValueInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			commitFormulaValue();
			if (selectedCell?.element instanceof HTMLInputElement) {
				selectedCell.element.focus();
				selectedCell.element.select();
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			revertFormulaValue();
			suppressFormulaCommit = true;
			formulaValueInput.blur();
		}
	});
	formulaValueInput.addEventListener('blur', () => {
		if (suppressFormulaCommit) {
			suppressFormulaCommit = false;
			return;
		}
		commitFormulaValue();
	});
}

function setSectionVisibility({ showTable, showEmpty, showError }) {
	if (tableSection) {
		tableSection.hidden = !showTable;
	}
	if (emptySection) {
		emptySection.hidden = !showEmpty;
	}
	if (errorSection) {
		errorSection.hidden = !showError;
	}
}

function makeFormulaDefinitionKey(column, rowId, rowIndex) {
	const columnKey = typeof column === 'string' ? column : '';
	const normalizedId = typeof rowId === 'string' && rowId.length ? rowId : undefined;
	if (normalizedId) {
		return `${columnKey}|id:${normalizedId}`;
	}
	if (Number.isFinite(rowIndex)) {
		const normalizedIndex = Math.max(0, Math.floor(Number(rowIndex)));
		return `${columnKey}|index:${normalizedIndex}`;
	}
	return undefined;
}

function setFormulaDefinition(column, rowId, rowIndex, formula) {
	const trimmed = typeof formula === 'string' ? formula.trim() : '';
	const key = makeFormulaDefinitionKey(column, rowId, rowIndex);
	if (!key) {
		return;
	}
	if (!trimmed || !trimmed.startsWith('=')) {
		formulaDefinitions.delete(key);
		return;
	}
	formulaDefinitions.set(key, {
		column,
		rowId: typeof rowId === 'string' && rowId.length ? rowId : undefined,
		rowIndex: Number.isFinite(rowIndex) ? Math.max(0, Math.floor(Number(rowIndex))) : undefined,
		formula: trimmed,
	});
}

function removeFormulaDefinition(column, rowId, rowIndex) {
	const keys = new Set();
	const idKey = makeFormulaDefinitionKey(column, rowId, undefined);
	if (idKey) {
		keys.add(idKey);
	}
	const indexKey = makeFormulaDefinitionKey(column, undefined, rowIndex);
	if (indexKey) {
		keys.add(indexKey);
	}
	keys.forEach((key) => {
		formulaDefinitions.delete(key);
	});
}

function getFormulaDefinition(column, rowId, rowIndex) {
	const idKey = makeFormulaDefinitionKey(column, rowId, undefined);
	const indexKey = makeFormulaDefinitionKey(column, undefined, rowIndex);

	if (idKey && formulaDefinitions.has(idKey)) {
		return formulaDefinitions.get(idKey);
	}
	if (indexKey && formulaDefinitions.has(indexKey)) {
		return formulaDefinitions.get(indexKey);
	}

	if (column && columnFormulas.has(column)) {
		const formula = columnFormulas.get(column);
		return {
			column,
			rowId,
			rowIndex: Number.isFinite(rowIndex) ? rowIndex : undefined,
			formula,
			isColumnFormula: true
		};
	}

	return undefined;
}

function updateFormulaDefinitionsOnIdRename(oldId, newId) {
	if (!oldId || !newId || oldId === newId) {
		return;
	}

	const updates = [];
	formulaDefinitions.forEach((definition, key) => {
		if (definition.rowId === oldId) {
			updates.push({
				oldKey: key,
				definition: {
					...definition,
					rowId: newId
				}
			});
		}
	});

	updates.forEach(({ oldKey, definition }) => {
		formulaDefinitions.delete(oldKey);
		const newKey = makeFormulaDefinitionKey(definition.column, definition.rowId, definition.rowIndex);
		if (newKey) {
			formulaDefinitions.set(newKey, definition);
		}
	});
}

function setColumnFormula(columnKey, formula) {
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}
	const trimmedFormula = typeof formula === 'string' ? formula.trim() : '';
	if (!trimmedFormula || !trimmedFormula.startsWith('=')) {
		columnFormulas.delete(columnKey);
	} else {
		columnFormulas.set(columnKey, trimmedFormula);
	}
}

function applyColumnFormulas(formulas) {
	columnFormulas.clear();
	if (!formulas || typeof formulas !== 'object') {
		return;
	}
	for (const [columnKey, formula] of Object.entries(formulas)) {
		if (typeof columnKey === 'string' && typeof formula === 'string' && formula.startsWith('=')) {
			columnFormulas.set(columnKey, formula);
		}
	}
}

function applyFormulaDefinitions(entries) {
	formulaDefinitions.clear();
	if (!Array.isArray(entries)) {
		return;
	}
	entries.forEach((entry) => {
		if (!entry || typeof entry.column !== 'string' || typeof entry.formula !== 'string') {
			return;
		}
		setFormulaDefinition(entry.column, entry.rowId, entry.rowIndex, entry.formula);
	});
}

function makeComputedFormulaKey(column, rowIndex) {
	const columnKey = typeof column === 'string' ? column : '';
	const normalizedIndex = Math.max(0, Math.floor(Number(rowIndex ?? 0)));
	return `${columnKey}|${normalizedIndex}`;
}

function getComputedFormulaEntry(column, rowIndex) {
	const key = makeComputedFormulaKey(column, rowIndex);
	return formulaComputedValues.get(key);
}

function setComputedFormulaEntry(column, rowIndex, entry) {
	const key = makeComputedFormulaKey(column, rowIndex);
	formulaComputedValues.set(key, entry);
}

function clearComputedFormulaEntries() {
	formulaComputedValues.clear();
}

function getCellDisplayValue(rowIndex, rowId, column, fallbackValue) {
	const computed = getComputedFormulaEntry(column, rowIndex);
	if (computed && typeof computed.value === 'string') {
		return computed.value;
	}
	if (fallbackValue !== undefined && fallbackValue !== null) {
		return String(fallbackValue);
	}
	return '';
}

function recalculateFormulas(options = {}) {
	if (!latestPayload || !Array.isArray(latestPayload.rows) || !Array.isArray(latestPayload.columns)) {
		clearComputedFormulaEntries();
		updatePayloadFormulasSnapshot();
		return;
	}
	const { emitUpdates = false } = options;
	const rows = latestPayload.rows;
	const columns = latestPayload.columns;
	if (!formulaDefinitions.size && !columnFormulas.size) {
		clearComputedFormulaEntries();
		updatePayloadFormulasSnapshot();
		return;
	}
	const letterToColumn = new Map();
	columns.forEach((column, index) => {
		letterToColumn.set(getColumnLetter(index), column);
	});
	const rowIdToIndex = new Map();
	rows.forEach((row, index) => {
		if (row && typeof row.id === 'string' && row.id.length) {
			rowIdToIndex.set(row.id, index);
		}
	});
	const positionDefinitions = new Map();

	formulaDefinitions.forEach((definition) => {
		if (!definition || typeof definition.column !== 'string' || typeof definition.formula !== 'string') {
			return;
		}
		let resolvedIndex;
		if (definition.rowId && rowIdToIndex.has(definition.rowId)) {
			resolvedIndex = rowIdToIndex.get(definition.rowId);
		} else if (Number.isFinite(definition.rowIndex)) {
			const idx = Math.max(0, Math.floor(Number(definition.rowIndex)));
			if (idx >= 0 && idx < rows.length) {
				resolvedIndex = idx;
			}
		}
		if (resolvedIndex === undefined) {
			return;
		}
		definition.rowIndex = resolvedIndex;
		const row = rows[resolvedIndex];
		if (!definition.rowId && row && typeof row.id === 'string' && row.id.length) {
			definition.rowId = row.id;
		}
		const key = makeComputedFormulaKey(definition.column, resolvedIndex);
		positionDefinitions.set(key, {
			column: definition.column,
			rowId: definition.rowId,
			rowIndex: resolvedIndex,
			formula: definition.formula,
		});
	});

	columnFormulas.forEach((formula, columnKey) => {
		rows.forEach((row, rowIndex) => {
			const key = makeComputedFormulaKey(columnKey, rowIndex);
			if (!positionDefinitions.has(key)) {
				positionDefinitions.set(key, {
					column: columnKey,
					rowId: row.id,
					rowIndex: rowIndex,
					formula: formula,
				});
			}
		});
	});

	const previousComputed = new Map(formulaComputedValues);
	clearComputedFormulaEntries();
	if (!positionDefinitions.size) {
		return;
	}
	const visiting = new Set();
	const cache = new Map();
	const getRawValue = (columnKey, rowIndex) => {
		const row = rows[rowIndex];
		if (!row) {
			return '';
		}
		if (columnKey === 'id') {
			return row.id ?? '';
		}
		if (!row.values) {
			return '';
		}
		const raw = row.values[columnKey];
		return raw === undefined || raw === null ? '' : String(raw);
	};
	const computePosition = (columnKey, rowIndex) => {
		const key = makeComputedFormulaKey(columnKey, rowIndex);
		if (cache.has(key)) {
			return cache.get(key);
		}
		if (visiting.has(key)) {
			const cycleResult = { value: FORMULA_CYCLE_VALUE, error: 'CYCLE' };
			cache.set(key, cycleResult);
			return cycleResult;
		}
		visiting.add(key);
		let result;
		const definition = positionDefinitions.get(key);
		if (!definition) {
			result = { value: getRawValue(columnKey, rowIndex) };
		} else {
			const evaluation = evaluateFormulaExpression(definition.formula, {
				resolveReference(columnLetter, rowNumber) {
					const column = letterToColumn.get(columnLetter);
					if (!column) {
						return { value: '', error: 'REF' };
					}
					const targetIndex = rowNumber - 1;
					if (targetIndex < 0 || targetIndex >= rows.length) {
						return { value: '', error: 'REF' };
					}
					return computePosition(column, targetIndex);
				},
				getRawValue: getRawValue,
				context: {
					rowIndex,
					rowNumber: rowIndex + 1,
					rowId: rows[rowIndex]?.id ?? '',
					row: rows[rowIndex],
					values: rows[rowIndex]?.values ?? {},
				},
				resolveColumn(columnLetter) {
					return letterToColumn.get(columnLetter);
				},
			});
			if (evaluation.error) {
				result = { value: FORMULA_ERROR_VALUE, error: evaluation.error };
			} else {
				result = { value: evaluation.value };
			}
		}
		cache.set(key, result);
		visiting.delete(key);
		return result;
	};
	const pendingEdits = [];
	positionDefinitions.forEach((definition) => {
		const evaluation = computePosition(definition.column, definition.rowIndex);
		const value = typeof evaluation.value === 'string' ? evaluation.value : String(evaluation.value ?? '');
		setComputedFormulaEntry(definition.column, definition.rowIndex, {
			column: definition.column,
			rowId: definition.rowId,
			rowIndex: definition.rowIndex,
			value,
			error: evaluation.error,
		});
		const targetRow = rows[definition.rowIndex];
		const currentValueInFile = targetRow?.values?.[definition.column];
		const normalizedCurrentValue = currentValueInFile === undefined || currentValueInFile === null
			? ''
			: String(currentValueInFile);
		if (normalizedCurrentValue !== value) {
			const row = rows[definition.rowIndex];
			if (row && row.id) {
				pendingEdits.push({ id: row.id, key: definition.column, value });
			}
		}
		if (targetRow && targetRow.values && !isEditInProgress) {
			targetRow.values[definition.column] = value;
		}
	});
	if (emitUpdates && pendingEdits.length && !isEditInProgress) {
		const editVersion = beginEdit();
		dispatchBulkEdit(pendingEdits);
		setTimeout(() => endEdit(editVersion), 100);
	}
	updatePayloadFormulasSnapshot();
}

function getFormulaDefinitionEntries() {
	return Array.from(formulaDefinitions.values())
		.map((definition) => {
			if (!definition || typeof definition.column !== 'string' || typeof definition.formula !== 'string') {
				return undefined;
			}
			const rowIndex = Number.isFinite(definition.rowIndex)
				? Math.max(0, Math.floor(Number(definition.rowIndex)))
				: undefined;
			if (rowIndex === undefined) {
				return undefined;
			}
			return {
				column: definition.column,
				rowId: definition.rowId,
				rowIndex,
				formula: definition.formula,
			};
		})
		.filter((entry) => Boolean(entry));
}

function updatePayloadFormulasSnapshot() {
	if (!latestPayload) {
		return;
	}
	latestPayload.formulas = getFormulaDefinitionEntries();
}

function postSaveFormulaMessage({ column, rowId, rowIndex, formula }) {
	if (!column) {
		return;
	}
	const payload = { column };
	if (typeof rowId === 'string' && rowId.length) {
		payload.rowId = rowId;
	}
	if (Number.isFinite(rowIndex) && rowIndex >= 0) {
		payload.rowIndex = Math.floor(Number(rowIndex));
	}
	if (typeof formula === 'string') {
		payload.formula = formula;
	}
	vscode.postMessage({
		type: 'saveFormula',
		payload,
	});
}

function replaceCellReferencesInExpression(expression, replacer) {
	if (typeof expression !== 'string' || !expression.length) {
		return { text: '', references: [] };
	}
	let result = '';
	const references = [];
	let index = 0;
	let stringDelimiter = null;
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
			let start = index;
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
					const replacement = replacer(letters, rowNumber, `${letters}${digits}`);
					if (replacement !== undefined) {
						result += replacement;
						references.push({ columnLetter: letters, rowNumber });
						continue;
					}
				}
				result += letters + digits;
				continue;
			}
			result += letters;
			continue;
		}
		result += char;
		index += 1;
	}
	return { text: result, references };
}

function evaluateFormulaExpression(formula, hooks = {}) {
	const trimmed = typeof formula === 'string' ? formula.trim() : '';
	if (!trimmed.startsWith('=')) {
		return { value: trimmed };
	}
	const expressionBody = trimmed.slice(1);
	const rewrite = replaceCellReferencesInExpression(expressionBody, (columnLetter, rowNumber) => {
		return `__ref(${JSON.stringify(columnLetter)}, ${Number(rowNumber)})`;
	});
	let evaluator;
	try {
		evaluator = new Function(
			'__ref',
			'__helpers',
			'Math',
			'Number',
			'String',
			`"use strict";\nconst __ctx = __helpers.context || {};\nconst { rowIndex = 0, rowNumber = rowIndex + 1, rowId = "", row = undefined, values = {} } = __ctx;\nconst { toNumber, toString } = __helpers;\nreturn (${rewrite.text});`,
		);
	} catch (error) {
		return { value: '', error: 'PARSE' };
	}
	let referenceError = null;
	const referenceGetter = (columnLetter, rowNumber) => {
		if (typeof hooks.resolveReference !== 'function') {
			referenceError = referenceError ?? 'REF';
			return '';
		}
		try {
			const result = hooks.resolveReference(columnLetter, Number(rowNumber));
			if (!result) {
				referenceError = referenceError ?? 'REF';
				return '';
			}
			if (result.error) {
				referenceError = referenceError ?? result.error;
			}
			return result.value ?? '';
		} catch (error) {
			referenceError = referenceError ?? 'REF';
			return '';
		}
	};
	const helpers = {
		toNumber(value, fallback = 0) {
			if (typeof value === 'number') {
				return Number.isFinite(value) ? value : fallback;
			}
			const parsed = Number(value);
			return Number.isFinite(parsed) ? parsed : fallback;
		},
		toString(value) {
			if (value === undefined || value === null) {
				return '';
			}
			return String(value);
		},
		context: hooks.context || {},
	};
	try {
		const value = evaluator(referenceGetter, helpers, Math, Number, String);
		if (referenceError) {
			return { value, error: referenceError };
		}
		return { value };
	} catch (error) {
		return { value: '', error: 'EXEC' };
	}
}

function applyFormulaDecorations(td, definition, computed) {
	if (!td) {
		return;
	}
	if (definition && typeof definition.formula === 'string' && definition.formula.length) {
		td.dataset.formula = definition.formula;
		td.classList.add('kv-cell-formula');
	} else {
		delete td.dataset.formula;
		td.classList.remove('kv-cell-formula');
	}
	if (computed && computed.error) {
		td.dataset.formulaError = computed.error;
		td.classList.add('kv-cell-formula-error');
	} else {
		delete td.dataset.formulaError;
		td.classList.remove('kv-cell-formula-error');
	}
}

function updateFormulaCell(columnKey, rowIndex) {
	if (!tableSection || !Array.isArray(latestPayload?.rows)) {
		return;
	}
	const selector = `td[data-column="${columnKey}"][data-row-index="${rowIndex}"]`;
	const td = tableSection.querySelector(selector);
	if (!td) {
		return;
	}
	const row = latestPayload.rows[rowIndex];
	const rowId = td.dataset.rowId ?? row?.id ?? '';
	const definition = getFormulaDefinition(columnKey, rowId, rowIndex);
	const computed = getComputedFormulaEntry(columnKey, rowIndex);
	applyFormulaDecorations(td, definition, computed);
	const displayValue = getCellDisplayValue(rowIndex, rowId, columnKey, row?.values?.[columnKey]);
	const fieldConfig = columnOptionConfig?.[columnKey];
	const input = td.querySelector('input');
	const select = td.querySelector('select');
	if (input) {
		setElementValue(input, displayValue, undefined);
		input.dataset.initialValue = input.value ?? '';
		if (definition) {
			input.dataset.formulaValue = definition.formula;
		} else {
			delete input.dataset.formulaValue;
		}
		input.title = input.value;
	} else if (select) {
		setElementValue(select, displayValue, fieldConfig);
		const normalized = readElementValue(select, fieldConfig);
		select.dataset.initialValue = normalized;
		if (definition) {
			select.dataset.formulaValue = definition.formula;
		} else {
			delete select.dataset.formulaValue;
		}
		select.title = normalized;
		const display = td.querySelector('.kv-select-display');
		if (display) {
			updateSelectDisplay(select, display, fieldConfig);
		}
	} else if (!td.classList.contains('kv-ability-values-cell')) {
		td.textContent = displayValue;
	}
	if (td.dataset) {
		td.dataset.displayValue = displayValue;
	}
	if (selectedTd === td) {
		if (selectedCell) {
			selectedCell.value = displayValue;
			selectedCell.formula = definition ? definition.formula : undefined;
			selectedCell.formulaError = computed?.error;
		}
		if (formulaValueInput) {
			if (definition && definition.formula) {
				formulaValueInput.value = definition.formula;
			} else {
				formulaValueInput.value = displayValue ?? '';
			}
		}
	}
}

function refreshFormulaResultsForTable() {
	if (!tableSection || !Array.isArray(latestPayload?.rows)) {
		return;
	}
	const seen = new Set();
	formulaDefinitions.forEach((definition) => {
		if (!definition || typeof definition.column !== 'string' || !Number.isFinite(definition.rowIndex)) {
			return;
		}
		const normalizedIndex = Math.max(0, Math.floor(Number(definition.rowIndex)));
		seen.add(makeComputedFormulaKey(definition.column, normalizedIndex));
		updateFormulaCell(definition.column, normalizedIndex);
	});
	const decorated = tableSection.querySelectorAll('td.kv-cell-formula, td[data-formula]');
	decorated.forEach((td) => {
		const column = td.dataset.column;
		const rowIndex = Number(td.dataset.rowIndex ?? '-1');
		if (!column || !Number.isFinite(rowIndex) || rowIndex < 0) {
			return;
		}
		const key = makeComputedFormulaKey(column, rowIndex);
		if (seen.has(key)) {
			return;
		}
		updateFormulaCell(column, rowIndex);
	});
}

function clearSelection() {
	closeMultiSelectDropdown();
	closeFillPopup();
	clearFillPreview();
	detachFillHandle();
	if (selectedTd && selectedTd.classList) {
		selectedTd.classList.remove('kv-cell-selected');
	}
	selectedTd = undefined;
	selectedCell = undefined;
	selectedCellKey = undefined;
	if (formulaAddressInput) {
		formulaAddressInput.value = '';
		formulaAddressInput.title = '';
	}
	if (formulaValueInput) {
		formulaValueInput.value = '';
		formulaValueInput.disabled = true;
		formulaValueInput.placeholder = _t('selectCellToEdit');
	}
}

function selectCell(td, context) {
	closeRowContextMenu();
	closeColumnContextMenu();
	if (!td || !context) {
		clearSelection();
		return;
	}
	if (openMultiSelectContext && openMultiSelectContext.td !== td) {
		closeMultiSelectDropdown();
	}
	if (selectedTd && selectedTd !== td) {
		selectedTd.classList.remove('kv-cell-selected');
		closeFillPopup();
		clearFillPreview();
		detachFillHandle();
	}
	selectedTd = td;
	td.classList.add('kv-cell-selected');
	const formulaDefinition = getFormulaDefinition(context.column, context.rowId, context.rowIndex);
	const computedEntry = getComputedFormulaEntry(context.column, context.rowIndex);
	const displayValue = getCellDisplayValue(context.rowIndex, context.rowId, context.column, context.value);
	selectedCell = {
		column: context.column,
		columnLetter: context.columnLetter,
		columnName: context.columnName,
		rowId: context.rowId,
		rowIndex: context.rowIndex,
		editable: context.editable,
		element: context.element ?? null,
		fieldConfig: context.fieldConfig,
		usesDropdown: Boolean(context.usesDropdown),
		value: displayValue,
		dataType: context.dataType ?? 'cell',
		abilityEntries: context.dataType === 'abilityValues' ? cloneAbilityValuesEntries(context.abilityEntries || []) : undefined,
		hasAbilityField: Boolean(context.hasAbilityField),
		formula: formulaDefinition ? formulaDefinition.formula : undefined,
		formulaError: computedEntry?.error,
	};
	selectedCellKey = {
		column: context.column,
		rowId: context.rowId,
		rowIndex: context.rowIndex
	};
	if (formulaAddressInput) {
		const rowLabel = context.rowIndex + 1;
		const columnLabel = context.columnLetter ?? context.column;
		const address = `${columnLabel}${rowLabel}`;
		formulaAddressInput.value = address;
		const columnName = context.columnName || context.column;
		formulaAddressInput.title = columnName ? `${columnName} · ${address}` : address;
	}
	if (formulaValueInput) {
		const disableFormulaInput = !context.editable || Boolean(context.usesDropdown);
		formulaValueInput.disabled = disableFormulaInput;
		formulaValueInput.placeholder = disableFormulaInput && context.editable ? _t('pleaseSelectDropdown') : '';
		if (formulaDefinition && formulaDefinition.formula) {
			formulaValueInput.value = formulaDefinition.formula;
		} else {
			formulaValueInput.value = displayValue ?? '';
		}
	}
	refreshFillHandle();
}

function isEditableElement(element) {
	if (!element) {
		return false;
	}
	if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
		return true;
	}
	return Boolean(element.isContentEditable);
}

/**
 */
function setDialogOpenState(isOpen) {
	isDialogOpen = isOpen;
}

/**
 */
function createManagedDialog(options = {}) {
	const { className = 'kv-dialog-overlay', onClose } = options;

	const overlay = document.createElement('div');
	overlay.className = className;

	setDialogOpenState(true);

	const originalRemove = overlay.remove.bind(overlay);

	overlay.remove = function () {
		setDialogOpenState(false);
		if (onClose) {
			onClose();
		}
		originalRemove();
	};

	const handleEsc = (event) => {
		if (event.key === 'Escape') {
			event.stopPropagation();
			overlay.remove();
			document.removeEventListener('keydown', handleEsc, true);
		}
	};
	document.addEventListener('keydown', handleEsc, true);

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of mutation.removedNodes) {
				if (node === overlay) {
					document.removeEventListener('keydown', handleEsc, true);
					observer.disconnect();
					setDialogOpenState(false);
					if (onClose) {
						onClose();
					}
					return;
				}
			}
		}
	});

	if (overlay.parentElement) {
		observer.observe(overlay.parentElement, { childList: true });
	} else {
		setTimeout(() => {
			if (overlay.parentElement) {
				observer.observe(overlay.parentElement, { childList: true });
			}
		}, 0);
	}

	return overlay;
}

function copyTextToClipboard(text) {
	const helper = document.createElement('textarea');
	try {
		helper.value = text ?? '';
		helper.setAttribute('readonly', '');
		helper.style.position = 'fixed';
		helper.style.opacity = '0';
		helper.style.pointerEvents = 'none';
		helper.style.top = '0';
		helper.style.left = '0';
		document.body.appendChild(helper);
		helper.focus();
		helper.select();
		document.execCommand('copy');
	} catch (error) {
		console.warn('[kv-editor] copy failed', error);
	} finally {
		if (helper.parentElement) {
			helper.parentElement.removeChild(helper);
		}
	}
}

function copySelectedCell() {
	if (!selectedCell) {
		return;
	}
	let text = '';
	const formula = getFormulaDefinition(selectedCell.column, selectedCell.rowId, selectedCell.rowIndex);
	if (selectedCell.dataType === 'abilityValues') {
		const entries = cloneAbilityValuesEntries(selectedCell.abilityEntries || []);
		clipboardData = {
			type: 'abilityValues',
			entries,
			hasAbilityField: Boolean(selectedCell.hasAbilityField),
			text: selectedCell.value ?? '',
			formula: formula?.formula,
			sourceRowIndex: selectedCell.rowIndex
		};
		text = clipboardData.text;
	} else if (selectedCell.editable && selectedCell.element) {
		const value = readElementValue(selectedCell.element, selectedCell.fieldConfig);
		clipboardData = {
			type: 'cell',
			value,
			column: selectedCell.column,
			text: value,
			formula: formula?.formula,
			sourceRowIndex: selectedCell.rowIndex
		};
		text = value;
	} else {
		const value = selectedCell.value ?? '';
		clipboardData = {
			type: 'text',
			value,
			column: selectedCell.column,
			text: value,
			formula: formula?.formula,
			sourceRowIndex: selectedCell.rowIndex
		};
		text = value;
	}
	copyTextToClipboard(text ?? '');
}

function pasteToSelectedCell() {
	if (!selectedCell || !clipboardData) {
		return;
	}
	if (selectedCell.dataType === 'abilityValues') {
		if (clipboardData.type !== 'abilityValues' || !selectedTd) {
			return;
		}
		if (!selectedCell.rowId) {
			return;
		}
		const hasAbilityField = clipboardData.hasAbilityField !== false || selectedCell.hasAbilityField;
		const { entries: sanitizedEntries, displayValue } = populateAbilityValuesCell(selectedTd, clipboardData.entries || [], hasAbilityField !== false);
		selectedCell.value = displayValue;
		selectedCell.abilityEntries = cloneAbilityValuesEntries(sanitizedEntries);
		selectedCell.hasAbilityField = hasAbilityField !== false;
		if (formulaValueInput) {
			formulaValueInput.value = displayValue;
		}
		const payloadEntries = normalizeAbilityEntriesForPayload(sanitizedEntries);
		vscode.postMessage({
			type: 'editAbilityValues',
			payload: {
				id: selectedCell.rowId,
				entries: payloadEntries,
			}
		});
		if (Array.isArray(latestPayload?.rows) && typeof selectedCell.rowIndex === 'number') {
			const targetRow = latestPayload.rows[selectedCell.rowIndex];
			if (targetRow) {
				targetRow.abilityValues = sanitizedEntries.map((entry) => ({
					key: entry.key,
					originalKey: entry.originalKey,
					value: entry.value,
					type: entry.type,
					modifiers: (entry.modifiers || []).map((modifier) => ({
						key: modifier.key,
						value: modifier.value,
					}))
				}));
				if (!targetRow.values || typeof targetRow.values !== 'object') {
					targetRow.values = {};
				}
				if (selectedCell.hasAbilityField) {
					targetRow.values.AbilityValues = targetRow.values.AbilityValues ?? '';
				} else if (targetRow.values) {
					delete targetRow.values.AbilityValues;
				}
			}
		}
		return;
	}
	if (!selectedCell.editable || !selectedCell.element) {
		return;
	}
	if (clipboardData.type === 'abilityValues') {
		return;
	}
	if (clipboardData.formula && typeof clipboardData.formula === 'string') {
		const sourceRow = clipboardData.sourceRowIndex;
		const targetRow = selectedCell.rowIndex;
		if (Number.isFinite(sourceRow) && Number.isFinite(targetRow)) {
			const rowOffset = targetRow - sourceRow;
			const adjustedFormula = offsetFormulaReferences(clipboardData.formula, rowOffset);
			setFormulaDefinition(selectedCell.column, selectedCell.rowId, selectedCell.rowIndex, adjustedFormula);
			postSaveFormulaMessage({
				column: selectedCell.column,
				rowId: selectedCell.rowId,
				rowIndex: selectedCell.rowIndex,
				formula: adjustedFormula
			});
			recalculateFormulas({ emitUpdates: true });
			return;
		}
	}
	const newValue = String(clipboardData.value ?? clipboardData.text ?? '');
	setElementValue(selectedCell.element, newValue, selectedCell.fieldConfig);
	if (selectedCell.usesDropdown) {
		const display = selectedTd?.querySelector('.kv-select-display');
		if (display) {
			updateSelectDisplay(selectedCell.element, display, selectedCell.fieldConfig);
		}
	}
	if (!selectedCell.usesDropdown && formulaValueInput) {
		formulaValueInput.value = newValue;
	}
	handleElementChange(selectedCell.element, selectedCell.fieldConfig);
	selectedCell.value = newValue;
}

function handleClipboardShortcuts(event) {
	if (isDialogOpen) {
		return;
	}
	if (!selectedCell) {
		return;
	}
	const isCopy = event.key?.toLowerCase() === 'c';
	const isPaste = event.key?.toLowerCase() === 'v';
	if (!(event.ctrlKey || event.metaKey) || (!isCopy && !isPaste)) {
		return;
	}
	if (isEditableElement(document.activeElement)) {
		return;
	}
	event.preventDefault();
	if (isCopy) {
		copySelectedCell();
	} else {
		pasteToSelectedCell();
	}
}

function handleRowClipboardShortcuts(event) {
	if (isDialogOpen) {
		return;
	}
	const isCopy = event.key?.toLowerCase() === 'c';
	const isPaste = event.key?.toLowerCase() === 'v';

	if (!(event.ctrlKey || event.metaKey) || (!isCopy && !isPaste)) {
		return;
	}

	if (selectedCell) {
		return;
	}

	if (isCopy && selectedRows.size === 0) {
		return;
	}

	if (isPaste && !copiedRowsData) {
		return;
	}

	if (isEditableElement(document.activeElement)) {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	if (isCopy) {
		copySelectedRows();
	} else if (isPaste) {
		pasteRows();
	}
}

function toggleRowSelection(rowIndex, multiSelect = false, rangeSelect = false) {
	if (selectedCell) {
		clearSelection();
	}

	if (!multiSelect && !rangeSelect) {
		clearRowSelection();
		selectedRows.add(rowIndex);
		lastSelectedRowIndex = rowIndex;
	} else if (multiSelect) {
		if (selectedRows.has(rowIndex)) {
			selectedRows.delete(rowIndex);
		} else {
			selectedRows.add(rowIndex);
		}
		lastSelectedRowIndex = rowIndex;
	} else if (rangeSelect && lastSelectedRowIndex !== null) {
		const start = Math.min(lastSelectedRowIndex, rowIndex);
		const end = Math.max(lastSelectedRowIndex, rowIndex);
		for (let i = start; i <= end; i++) {
			selectedRows.add(i);
		}
	}

	updateRowSelectionVisuals();
}

function clearRowSelection() {
	selectedRows.clear();
	lastSelectedRowIndex = null;
	updateRowSelectionVisuals();
}

function updateRowSelectionVisuals() {
	if (!tableSection) {
		return;
	}

	const rows = tableSection.querySelectorAll('tbody tr');
	rows.forEach((row, index) => {
		if (selectedRows.has(index)) {
			row.classList.add('kv-row-selected');
		} else {
			row.classList.remove('kv-row-selected');
		}
	});
}

function copySelectedRows() {
	if (!latestPayload || !Array.isArray(latestPayload.rows) || selectedRows.size === 0) {
		return;
	}

	const rowsToCopy = [];
	const sortedIndices = Array.from(selectedRows).sort((a, b) => a - b);

	for (const rowIndex of sortedIndices) {
		if (rowIndex >= 0 && rowIndex < latestPayload.rows.length) {
			const row = latestPayload.rows[rowIndex];
			const rowCopy = {
				id: row.id,
				values: { ...row.values },
				rowIndex: rowIndex,
			};

			if (row.rawObject) {
				rowCopy.rawObject = JSON.parse(JSON.stringify(row.rawObject));
			}

			if (row.abilityValues) {
				rowCopy.abilityValues = cloneAbilityValuesEntries(row.abilityValues);
			}

			const formulas = {};
			if (latestPayload.columns && Array.isArray(latestPayload.columns)) {
				for (const column of latestPayload.columns) {
					const columnKey = typeof column === 'string' ? column : column.key;
					const formula = getFormulaDefinition(columnKey, row.id, rowIndex);
					if (formula && formula.formula) {
						formulas[columnKey] = formula.formula;
					}
				}
			}
			if (Object.keys(formulas).length > 0) {
				rowCopy.formulas = formulas;
			} rowsToCopy.push(rowCopy);
		}
	}

	if (rowsToCopy.length > 0) {
		copiedRowsData = rowsToCopy;

		if (tableSection) {
			showTemporaryMessage(_tf('copiedNRows', rowsToCopy.length), 1000);
		}
	}
}

function pasteRows() {
	if (!copiedRowsData || copiedRowsData.length === 0) {
		return;
	}

	let insertAfterIndex = -1;
	if (selectedRows.size > 0) {
		insertAfterIndex = Math.max(...Array.from(selectedRows));
	} else if (latestPayload && latestPayload.rows) {
		insertAfterIndex = latestPayload.rows.length - 1;
	}

	const firstSourceRowIndex = copiedRowsData[0]?.rowIndex ?? 0;
	const firstTargetRowIndex = insertAfterIndex + 1;
	const baseOffset = firstTargetRowIndex - firstSourceRowIndex;

	const rowsWithAdjustedFormulas = copiedRowsData.map((rowData, index) => {
		const adjustedRow = {
			id: rowData.id,
			values: rowData.values,
		};
		if (rowData.rawObject) {
			adjustedRow.rawObject = rowData.rawObject;
		}
		if (rowData.abilityValues) {
			adjustedRow.abilityValues = rowData.abilityValues;
		}
		if (rowData.formulas && typeof rowData.formulas === 'object') {
			const adjustedFormulas = {};
			for (const [column, formula] of Object.entries(rowData.formulas)) {
				if (typeof formula === 'string') {
					adjustedFormulas[column] = offsetFormulaReferences(formula, baseOffset);
				}
			}
			if (Object.keys(adjustedFormulas).length > 0) {
				adjustedRow.formulas = adjustedFormulas;
			}
		}
		return adjustedRow;
	});

	vscode.postMessage({
		type: 'bulkInsertRows',
		payload: {
			insertAfterIndex,
			rows: rowsWithAdjustedFormulas,
		},
	});

	if (tableSection) {
		showTemporaryMessage(_tf('pastedNRows', copiedRowsData.length), 1000);
	}
}

function showTemporaryMessage(message, duration = 2000) {
	const existingMessage = document.querySelector('.kv-temp-message');
	if (existingMessage) {
		existingMessage.remove();
	}

	const messageEl = document.createElement('div');
	messageEl.className = 'kv-temp-message';
	messageEl.textContent = message;
	messageEl.style.cssText = `
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: var(--vscode-notifications-background, #2d2d30);
		color: var(--vscode-notifications-foreground, #cccccc);
		padding: 10px 16px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		z-index: 10000;
		font-size: 13px;
		animation: kv-message-slide-in 0.2s ease-out;
	`;

	document.body.appendChild(messageEl);

	setTimeout(() => {
		messageEl.style.animation = 'kv-message-fade-out 0.2s ease-out';
		setTimeout(() => messageEl.remove(), 200);
	}, duration);
}

function handleEscapeClearSelection(event) {
	if (isDialogOpen) {
		return;
	}
	if (event.key === 'Escape' && selectedRows.size > 0) {
		event.preventDefault();
		clearRowSelection();
	}
}

function handleCellNavigation(event) {
	if (isDialogOpen) {
		return;
	}
	if (isEditableElement(document.activeElement)) {
		return;
	}
	if (!selectedCellKey || !latestPayload || !Array.isArray(latestPayload.columns) || !Array.isArray(latestPayload.rows)) {
		return;
	}

	const key = event.key;
	const columns = latestPayload.columns;
	const rows = latestPayload.rows;
	const currentRowIndex = selectedCellKey.rowIndex;
	const currentColumn = selectedCellKey.column;
	const currentColumnIndex = columns.indexOf(currentColumn);

	if (currentColumnIndex < 0 || currentRowIndex < 0) {
		return;
	}

	if (key === ' ') {
		event.preventDefault();
		if (selectedCell && selectedCell.editable && selectedCell.element) {
			if (selectedCell.element instanceof HTMLInputElement) {
				selectedCell.element.focus();
				selectedCell.element.select();
			} else if (selectedCell.element.focus) {
				selectedCell.element.focus();
			}
		}
		return;
	}

	let newRowIndex = currentRowIndex;
	let newColumnIndex = currentColumnIndex;

	switch (key) {
		case 'ArrowUp':
			newRowIndex = Math.max(0, currentRowIndex - 1);
			break;
		case 'ArrowDown':
			newRowIndex = Math.min(rows.length - 1, currentRowIndex + 1);
			break;
		case 'ArrowLeft':
			newColumnIndex = Math.max(0, currentColumnIndex - 1);
			break;
		case 'ArrowRight':
			newColumnIndex = Math.min(columns.length - 1, currentColumnIndex + 1);
			break;
		default:
			return;
	}

	if (newRowIndex === currentRowIndex && newColumnIndex === currentColumnIndex) {
		return;
	}

	event.preventDefault();

	const newColumn = columns[newColumnIndex];
	const selector = `td[data-column="${newColumn}"][data-row-index="${newRowIndex}"]`;
	const targetTd = tableSection?.querySelector(selector);

	if (targetTd) {
		const rowId = targetTd.dataset.rowId ?? '';
		const isAbilityColumn = newColumn === 'AbilityValues';
		const editable = newColumn !== ROW_NUMBER_COLUMN_KEY && !isAbilityColumn;
		const fieldConfig = columnOptionConfig[newColumn];
		const usesDropdown = Boolean(fieldConfig?.options?.length);
		let element = null;
		if (editable) {
			element = usesDropdown ? targetTd.querySelector('select') : targetTd.querySelector('input');
		}
		const value = isAbilityColumn
			? (targetTd.dataset.displayValue ?? targetTd.textContent ?? '')
			: editable
				? readElementValue(element, fieldConfig)
				: (targetTd.textContent ?? '');
		const abilityEntries = isAbilityColumn ? parseAbilityEntriesFromCell(targetTd) : undefined;
		const hasAbilityField = isAbilityColumn ? targetTd.dataset.hasAbilityField === 'true' : false;

		const columnLetter = getColumnLetter(newColumnIndex);
		const columnName = latestPayload.columnLabels?.[newColumn] ?? newColumn;

		selectCell(targetTd, {
			column: newColumn,
			columnLetter,
			columnName,
			rowId,
			rowIndex: newRowIndex,
			editable,
			element,
			fieldConfig,
			usesDropdown,
			value,
			dataType: isAbilityColumn ? 'abilityValues' : 'cell',
			abilityEntries,
			hasAbilityField
		});

		targetTd.scrollIntoView({ block: 'nearest', inline: 'nearest' });
	}
}


function startFillDrag(event) {
	if (event.button !== 0) {
		return;
	}
	if (!selectedTd || !selectedCell || !selectedCell.editable) {
		return;
	}
	event.preventDefault();
	event.stopPropagation();
	closeFillPopup();
	clearFillPreview();
	const rect = selectedTd.getBoundingClientRect();
	fillHandleState = {
		startRow: selectedCell.rowIndex,
		currentRow: selectedCell.rowIndex,
		column: selectedCell.column,
		startClientX: event.clientX,
		startClientY: event.clientY,
		moved: false,
	};
	document.addEventListener('mousemove', handleFillDragMove);
	document.addEventListener('mouseup', handleFillDragEnd);
}

function handleFillDragMove(event) {
	if (!fillHandleState || !selectedTd) {
		return;
	}
	const deltaX = Math.abs(event.clientX - fillHandleState.startClientX);
	const deltaY = event.clientY - fillHandleState.startClientY;
	if (!fillHandleState.moved) {
		if (Math.abs(deltaY) < 4 && deltaX > 6) {
			return;
		}
		if (Math.abs(deltaY) < 2 && Math.abs(deltaX) < 2) {
			return;
		}
		if (deltaX > Math.abs(deltaY)) {
			return;
		}
		fillHandleState.moved = true;
	}

	if (tableSection) {
		const tableRect = tableSection.getBoundingClientRect();
		const scrollThreshold = 50;
		const scrollSpeed = 50;

		const distanceFromTop = event.clientY - tableRect.top;
		const distanceFromBottom = tableRect.bottom - event.clientY;

		if (distanceFromTop < scrollThreshold) {
			const normalizedDistance = Math.max(0, distanceFromTop);
			const scrollAmount = Math.max(1, scrollSpeed * (1 - normalizedDistance / scrollThreshold));
			tableSection.scrollTop = Math.max(0, tableSection.scrollTop - scrollAmount);
		}
		else if (distanceFromBottom < scrollThreshold) {
			const normalizedDistance = Math.max(0, distanceFromBottom);
			const scrollAmount = Math.max(1, scrollSpeed * (1 - normalizedDistance / scrollThreshold));
			const maxScroll = tableSection.scrollHeight - tableSection.clientHeight;
			tableSection.scrollTop = Math.min(maxScroll, tableSection.scrollTop + scrollAmount);
		}
	}

	const targetRow = resolveFillTargetRow(event.clientY);
	if (targetRow === null || targetRow === fillHandleState.currentRow) {
		return;
	}
	fillHandleState.currentRow = targetRow;
	updateFillPreview();
}

function resolveFillTargetRow(clientY) {
	const rows = latestPayload?.rows;
	if (!Array.isArray(rows) || !selectedTd) {
		return null;
	}
	const tableRect = tableSection?.getBoundingClientRect();
	if (!tableRect) {
		return null;
	}
	const rowElements = tableSection.querySelectorAll('tbody tr');
	let closestRow = null;
	let closestDistance = Number.POSITIVE_INFINITY;
	rowElements.forEach((row) => {
		const rect = row.getBoundingClientRect();
		const mid = rect.top + rect.height / 2;
		const distance = Math.abs(clientY - mid);
		if (distance < closestDistance) {
			closestDistance = distance;
			const index = Number(row.dataset.rowIndex ?? '-1');
			if (Number.isFinite(index)) {
				closestRow = index;
			}
		}
	});
	if (closestRow === null) {
		return null;
	}
	return closestRow;
}

function handleFillDragEnd(event) {
	document.removeEventListener('mousemove', handleFillDragMove);
	document.removeEventListener('mouseup', handleFillDragEnd);
	if (!fillHandleState) {
		return;
	}
	if (!fillHandleState.moved) {
		fillHandleState = null;
		return;
	}
	event.preventDefault();
	openFillPopup();
}

function revertFormulaValue() {
	if (!selectedCell || !selectedCell.element) {
		return;
	}
	const original = selectedCell.element.dataset.initialValue ?? '';
	setElementValue(selectedCell.element, original, selectedCell.fieldConfig);
	if (formulaValueInput) {
		if (selectedCell.formula) {
			formulaValueInput.value = selectedCell.formula;
		} else {
			formulaValueInput.value = original;
		}
	}
}

function commitFormulaValue() {
	if (!selectedCell || !selectedCell.editable || !selectedCell.element || !formulaValueInput) {
		return;
	}
	if (selectedCell.usesDropdown) {
		return;
	}
	const newValue = formulaValueInput.value ?? '';
	const trimmedValue = newValue.trim();
	const isFormula = trimmedValue.startsWith('=');

	if (isFormula) {
		const previousFormula = selectedCell.element.dataset.formulaValue ?? '';
		if (previousFormula === trimmedValue) {
			return;
		}
		setElementValue(selectedCell.element, trimmedValue, selectedCell.fieldConfig);
		handleElementChange(selectedCell.element, selectedCell.fieldConfig);
		if (selectedCell.rowIndex !== undefined && selectedCell.column) {
			const computed = getComputedFormulaEntry(selectedCell.column, selectedCell.rowIndex);
			if (computed && typeof computed.value === 'string') {
				setElementValue(selectedCell.element, computed.value, selectedCell.fieldConfig);
			}
		}
	} else {
		const current = readElementValue(selectedCell.element, selectedCell.fieldConfig);
		const initial = selectedCell.element.dataset.initialValue ?? '';
		if (current === newValue && initial === newValue) {
			return;
		}
		setElementValue(selectedCell.element, newValue, selectedCell.fieldConfig);
		handleElementChange(selectedCell.element, selectedCell.fieldConfig);
	}
}

function setupUndoRedo(input, maxHistory = 50) {
	if (!input || !(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
		return;
	}

	if (!input.dataset.undoHistory) {
		input.dataset.undoHistory = JSON.stringify([input.value || '']);
		input.dataset.undoIndex = '0';
	}

	const handleKeyDown = (event) => {
		const isUndo = event.key === 'z' && (event.ctrlKey || event.metaKey) && !event.shiftKey;
		const isRedo = (event.key === 'z' && (event.ctrlKey || event.metaKey) && event.shiftKey) ||
			(event.key === 'y' && (event.ctrlKey || event.metaKey));

		if (isUndo || isRedo) {
			console.log(_t('debugUndoRedo'), isUndo ? 'undo' : 'redo', 'isDialogOpen:', isDialogOpen, 'target:', event.target, 'input:', input);

			if (isDialogOpen) {
				const isInDialog = input.closest('.kv-quickpick, .kv-fill-popup, .kv-ability-editor-overlay, .kv-autofill-popup, .kv-column-insert-dialog-overlay, .kv-column-options-overlay, .kv-color-picker-overlay');
				console.log(_t('debugDialogOpen'), !!isInDialog, 'input:', input);

				if (!isInDialog) {
					console.log(_t('debugMainDisabled'));
					return;
				}
			}

			event.preventDefault();
			const history = JSON.parse(input.dataset.undoHistory || '[]');
			let index = parseInt(input.dataset.undoIndex || '0');

			if (isUndo && index > 0) {
				index--;
				input.dataset.undoIndex = String(index);
				input.value = history[index] || '';
				const changeEvent = new Event('change', { bubbles: true });
				input.dispatchEvent(changeEvent);
			} else if (isRedo && index < history.length - 1) {
				index++;
				input.dataset.undoIndex = String(index);
				input.value = history[index] || '';
				const changeEvent = new Event('change', { bubbles: true });
				input.dispatchEvent(changeEvent);
			}
		}
	};

	const handleInput = () => {
		const history = JSON.parse(input.dataset.undoHistory || '[]');
		let index = parseInt(input.dataset.undoIndex || '0');
		const currentValue = input.value;

		if (history[index] !== currentValue) {
			history.splice(index + 1);
			history.push(currentValue);
			if (history.length > maxHistory) {
				history.shift();
			} else {
				index++;
			}
			input.dataset.undoHistory = JSON.stringify(history);
			input.dataset.undoIndex = String(index);
		}
	};

	input.addEventListener('keydown', handleKeyDown);

	input.addEventListener('keydown', (event) => {
		if ((event.ctrlKey || event.metaKey) && (event.key === 'z' || event.key === 'y')) {
			console.log(_t('debugInputCtrlZ'), {
				inputClass: input.className,
				inputDataset: input.dataset,
				isDialogOpen,
				eventKey: event.key,
				eventDefaultPrevented: event.defaultPrevented
			});
		}
	}, true);

	input.addEventListener('input', handleInput);
}

/**
 * @returns {HTMLInputElement}
 */
function createInput(options = {}) {
	const {
		type = 'text',
		className = '',
		placeholder = '',
		value = '',
		enableUndoRedo = true,
		maxHistory = 50,
		attributes = {}
	} = options;

	const input = document.createElement('input');
	input.type = type;
	if (className) {
		input.className = className;
	}
	if (placeholder) {
		input.placeholder = placeholder;
	}
	if (value) {
		input.value = value;
	}

	Object.keys(attributes).forEach(key => {
		if (key === 'dataset') {
			Object.keys(attributes.dataset || {}).forEach(dataKey => {
				input.dataset[dataKey] = attributes.dataset[dataKey];
			});
		} else {
			input[key] = attributes[key];
		}
	});

	const textInputTypes = ['text', 'number', 'search'];
	if (enableUndoRedo && textInputTypes.includes(type)) {
		setupUndoRedo(input, maxHistory);
	}

	return input;
}

/**
 * @returns {HTMLTextAreaElement}
 */
function createTextarea(options = {}) {
	const {
		className = '',
		placeholder = '',
		value = '',
		enableUndoRedo = true,
		maxHistory = 50,
		attributes = {}
	} = options;

	const textarea = document.createElement('textarea');
	if (className) {
		textarea.className = className;
	}
	if (placeholder) {
		textarea.placeholder = placeholder;
	}
	if (value) {
		textarea.value = value;
	}

	Object.keys(attributes).forEach(key => {
		if (key === 'dataset') {
			Object.keys(attributes.dataset || {}).forEach(dataKey => {
				textarea.dataset[dataKey] = attributes.dataset[dataKey];
			});
		} else {
			textarea[key] = attributes[key];
		}
	});

	if (enableUndoRedo) {
		setupUndoRedo(textarea, maxHistory);
	}

	return textarea;
}

function getFieldSeparator(fieldConfig) {
	const separator = fieldConfig?.separator ?? ',';
	return typeof separator === 'string' && separator.length > 0 ? separator : ',';
}

function splitMultiValue(value, fieldConfig) {
	const separator = getFieldSeparator(fieldConfig);
	if (!value || typeof value !== 'string') {
		return [];
	}
	return value
		.split(separator)
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0);
}

function readElementValue(element, fieldConfig) {
	if (!element) {
		return '';
	}
	if (element instanceof HTMLSelectElement && fieldConfig?.multiple) {
		const separator = getFieldSeparator(fieldConfig);
		const selectedValues = Array.from(element.selectedOptions).map((option) => option.value);
		return selectedValues.join(separator);
	}
	return element.value ?? '';
}

function setElementValue(element, value, fieldConfig) {
	if (!element) {
		return;
	}
	if (element instanceof HTMLSelectElement) {
		if (fieldConfig?.multiple) {
			const selectedSet = new Set(splitMultiValue(value, fieldConfig));
			Array.from(element.options).forEach((option) => {
				option.selected = selectedSet.has(option.value);
			});
		} else {
			element.value = value ?? '';
		}
	} else {
		element.value = value ?? '';
	}
}

function clearFillPreview() {
	for (const cell of fillPreviewCells) {
		if (cell && cell.classList) {
			cell.classList.remove('kv-cell-fill-preview');
		}
	}
	fillPreviewCells = [];
}

function detachFillHandle() {
	if (fillHandleElement && fillHandleElement.parentElement) {
		fillHandleElement.parentElement.removeChild(fillHandleElement);
	}
	fillHandleElement = null;
}

function refreshFillHandle() {
	if (!selectedTd || !selectedCell || !selectedCell.editable || selectedCell.dataType !== 'cell' || !selectedCell.element) {
		detachFillHandle();
		return;
	}
	if (!fillHandleElement) {
		fillHandleElement = document.createElement('div');
		fillHandleElement.className = 'kv-cell-fill-handle';
		fillHandleElement.title = _t('dragToFill');
		fillHandleElement.addEventListener('mousedown', (event) => startFillDrag(event));
	}
	const host = selectedTd;
	// host.style.position = 'relative';
	if (fillHandleElement.parentElement !== host) {
		host.appendChild(fillHandleElement);
	}
}

function updateFillPreview() {
	clearFillPreview();
	if (!fillHandleState || !selectedCell || !selectedTd) {
		return;
	}
	const startRow = fillHandleState.startRow;
	const endRow = fillHandleState.currentRow;
	if (endRow === null || endRow === startRow) {
		return;
	}
	const step = endRow > startRow ? 1 : -1;
	for (let rowIndex = startRow + step; step > 0 ? rowIndex <= endRow : rowIndex >= endRow; rowIndex += step) {
		const cell = tableSection?.querySelector(`td[data-column="${fillHandleState.column}"][data-row-index="${rowIndex}"]`);
		if (cell) {
			cell.classList.add('kv-cell-fill-preview');
			fillPreviewCells.push(cell);
		}
	}
}

function computeFillTargetRows(startRow, endRow) {
	if (!Number.isFinite(startRow) || !Number.isFinite(endRow) || startRow === endRow) {
		return [];
	}
	const step = endRow > startRow ? 1 : -1;
	const rows = [];
	for (let rowIndex = startRow + step; step > 0 ? rowIndex <= endRow : rowIndex >= endRow; rowIndex += step) {
		rows.push(rowIndex);
	}
	return rows;
}

function getEditableCellContext(rowIndex, columnKey) {
	if (!tableSection) {
		return null;
	}
	const selector = `td[data-column="${columnKey}"][data-row-index="${rowIndex}"]`;
	const cell = tableSection.querySelector(selector);
	if (!cell) {
		return null;
	}
	const fieldConfig = columnOptionConfig?.[columnKey];
	const usesDropdown = Boolean(fieldConfig?.options?.length);
	const element = cell.querySelector(usesDropdown ? 'select' : 'input');
	if (!element) {
		return null;
	}
	return {
		cell,
		element,
		fieldConfig,
		usesDropdown,
		id: element.dataset.id ?? '',
		rowId: cell.dataset.rowId ?? '',
		rowIndex: Number(cell.dataset.rowIndex ?? `${rowIndex}`),
	};
}

function isValueAvailableInSelect(selectElement, value) {
	if (!(selectElement instanceof HTMLSelectElement)) {
		return true;
	}
	return Array.from(selectElement.options).some((option) => option.value === value);
}

function closeFillPopup(options = {}) {
	if (!fillPopupState) {
		fillHandleState = null;
		return;
	}
	const { element, keyHandler, outsideHandler, scrollHandler, resizeHandler } = fillPopupState;

	if (element && element.parentElement) {
		element.parentElement.removeChild(element);
	}

	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	if (outsideHandler) {
		document.removeEventListener('mousedown', outsideHandler, true);
	}
	if (scrollHandler) {
		tableSection?.removeEventListener('scroll', scrollHandler);
	}
	if (resizeHandler) {
		window.removeEventListener('resize', resizeHandler);
	}
	fillPopupState = null;
	fillHandleState = null;
	if (options.clearPreview !== false) {
		clearFillPreview();
	}
	refreshFillHandle();
}

function showFillPopupError(message) {
	if (!fillPopupState || !fillPopupState.errorElement) {
		return;
	}
	fillPopupState.errorElement.textContent = message ?? '';
	fillPopupState.errorElement.hidden = !message;
}

function clearFillPopupError() {
	showFillPopupError('');
}

function openFillPopup() {
	if (!fillHandleState || !selectedCell || !selectedTd) {
		fillHandleState = null;
		clearFillPreview();
		refreshFillHandle();
		return;
	}
	const { startRow, currentRow, column } = fillHandleState;
	if (!Number.isFinite(startRow) || !Number.isFinite(currentRow) || startRow === currentRow) {
		fillHandleState = null;
		clearFillPreview();
		refreshFillHandle();
		return;
	}
	const targetRows = computeFillTargetRows(startRow, currentRow);
	if (!targetRows.length) {
		fillHandleState = null;
		clearFillPreview();
		refreshFillHandle();
		return;
	}
	closeFillPopup({ clearPreview: false });

	const popup = createManagedDialog({
		className: 'kv-fill-popup',
		onClose: () => {
			fillPopupState = null;
			fillHandleState = null;
			clearFillPreview();
			refreshFillHandle();
		}
	});

	popup.setAttribute('role', 'dialog');
	popup.setAttribute('aria-label', _t('fillOptions'));
	const title = document.createElement('div');
	title.className = 'kv-fill-popup-title';
	const direction = currentRow > startRow ? 1 : -1;
	title.textContent = _tf('fillNRows', direction > 0 ? _t('dirDown') : _t('dirUp'), targetRows.length);
	popup.appendChild(title);
	const form = document.createElement('form');
	form.className = 'kv-fill-popup-form';
	const modeList = document.createElement('div');
	modeList.className = 'kv-fill-popup-modes';
	const baseFormula = getSelectedCellFormulaValue();
	const hasBaseFormula = baseFormula.length > 0;
	const modes = hasBaseFormula
		? [
			{ value: 'formulaSequence', label: _t('fillSequence') },
			{ value: 'copy', label: _t('fillCopy') },
		]
		: [
			{ value: 'copy', label: _t('fillCopy') },
			{ value: 'arithmetic', label: _t('fillLinear') },
			{ value: 'geometric', label: _t('fillGeometric') },
			{ value: 'formula', label: _t('fillFormula') }
		];
	const modeInputs = [];
	modes.forEach((mode, index) => {
		const item = document.createElement('label');
		item.className = 'kv-fill-popup-mode';
		const input = document.createElement('input');
		input.type = 'radio';
		input.name = 'fill-mode';
		input.value = mode.value;
		input.className = 'kv-radio-input';
		if (index === 0) {
			input.checked = true;
		}
		const indicator = document.createElement('span');
		indicator.className = 'kv-radio-indicator codicon codicon-circle-large-outline';
		const span = document.createElement('span');
		span.className = 'kv-radio-label';
		span.textContent = mode.label;
		if (mode.value === 'formula') {
			item.title = FORMULA_TOOLTIP_HELP;
		}
		item.appendChild(input);
		item.appendChild(indicator);
		item.appendChild(span);
		modeList.appendChild(item);
		modeInputs.push(input);
	});
	form.appendChild(modeList);
	const arithmeticWrapper = document.createElement('div');
	arithmeticWrapper.className = 'kv-fill-popup-field';
	arithmeticWrapper.hidden = true;
	const arithmeticLabel = document.createElement('label');
	arithmeticLabel.textContent = _t('stepLabel');
	const arithmeticInput = createInput({
		type: 'number',
		value: String(FILL_DEFAULT_STEP),
		attributes: { step: 'any' }
	});
	arithmeticWrapper.appendChild(arithmeticLabel);
	arithmeticWrapper.appendChild(arithmeticInput);
	form.appendChild(arithmeticWrapper);
	const geometricWrapper = document.createElement('div');
	geometricWrapper.className = 'kv-fill-popup-field';
	geometricWrapper.hidden = true;
	const geometricLabel = document.createElement('label');
	geometricLabel.textContent = _t('ratioLabel');
	const geometricInput = createInput({
		type: 'number',
		value: String(FILL_DEFAULT_RATIO),
		attributes: { step: 'any' }
	});
	geometricWrapper.appendChild(geometricLabel);
	geometricWrapper.appendChild(geometricInput);
	form.appendChild(geometricWrapper);
	const formulaWrapper = document.createElement('div');
	formulaWrapper.className = 'kv-fill-popup-field';
	formulaWrapper.hidden = true;
	const formulaLabel = document.createElement('label');
	formulaLabel.textContent = _t('formulaExprLabel');
	const formulaInput = createInput({
		type: 'text',
		placeholder: _t('formulaExprPlaceholder')
	});
	formulaWrapper.appendChild(formulaLabel);
	formulaWrapper.appendChild(formulaInput);
	form.appendChild(formulaWrapper);
	const errorEl = document.createElement('div');
	errorEl.className = 'kv-fill-popup-error';
	errorEl.hidden = true;
	form.appendChild(errorEl);
	const actions = document.createElement('div');
	actions.className = 'kv-fill-popup-actions';
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = _t('cancel');
	actions.appendChild(cancelButton);
	const applyButton = document.createElement('button');
	applyButton.type = 'submit';
	applyButton.className = 'kv-button kv-button-primary';
	applyButton.textContent = _t('fill');
	actions.appendChild(applyButton);
	form.appendChild(actions);
	popup.appendChild(form);
	const handleModeVisibility = () => {
		const currentMode = modeInputs.find((input) => input.checked)?.value ?? 'copy';
		arithmeticWrapper.hidden = currentMode !== 'arithmetic';
		geometricWrapper.hidden = currentMode !== 'geometric';
		formulaWrapper.hidden = currentMode !== 'formula';
		clearFillPopupError();
	};
	modeInputs.forEach((input) => {
		input.addEventListener('change', handleModeVisibility);
	});
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		handleFillApply();
	});
	cancelButton.addEventListener('click', () => {
		closeFillPopup();
	});
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeFillPopup();
		} else if (event.key === 'Enter' && event.target instanceof HTMLElement && popup.contains(event.target) && !(event.target instanceof HTMLTextAreaElement)) {
			event.preventDefault();
			handleFillApply();
		}
	};
	const outsideHandler = (event) => {
		if (!popup.contains(event.target)) {
			closeFillPopup();
		}
	};
	document.addEventListener('keydown', keyHandler, true);
	document.addEventListener('mousedown', outsideHandler, true);
	const scrollHandler = () => positionFillPopup();
	const resizeHandler = () => positionFillPopup();
	tableSection?.addEventListener('scroll', scrollHandler, { passive: true });
	window.addEventListener('resize', resizeHandler, { passive: true });
	document.body.appendChild(popup);
	fillPopupState = {
		element: popup,
		errorElement: errorEl,
		modeInputs,
		arithmeticInput,
		geometricInput,
		formulaInput,
		targetRows,
		column,
		direction,
		startRow,
		endRow: currentRow,
		keyHandler,
		outsideHandler,
		scrollHandler,
		resizeHandler,
		hasBaseFormula,
	};
	positionFillPopup();
	requestAnimationFrame(() => positionFillPopup());
	handleModeVisibility();
	focusFillPopup(modeInputs, arithmeticInput, formulaInput);
	fillHandleState = null;
}

function focusFillPopup(modeInputs, arithmeticInput, formulaInput) {
	const mode = modeInputs.find((input) => input.checked)?.value ?? 'copy';
	switch (mode) {
		case 'arithmetic':
			arithmeticInput.focus();
			arithmeticInput.select();
			break;
		case 'formula':
			formulaInput.focus();
			formulaInput.select();
			break;
		default:
			modeInputs[0]?.focus();
			break;
	}
}

function positionFillPopup() {
	if (!fillPopupState || !fillPopupState.element) {
		return;
	}
	const { element, targetRows, column, direction } = fillPopupState;
	const anchorRow = direction > 0 ? targetRows[targetRows.length - 1] : targetRows[0];
	const anchorSelector = `td[data-column="${column}"][data-row-index="${anchorRow}"]`;
	const anchorCell = tableSection?.querySelector(anchorSelector) || selectedTd;
	if (!anchorCell) {
		return;
	}
	const rect = anchorCell.getBoundingClientRect();
	const popupRect = element.getBoundingClientRect();
	let top = direction > 0 ? rect.bottom + 4 : rect.top - popupRect.height - 4;
	let left = rect.right - popupRect.width;
	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;
	if (top + popupRect.height > viewportHeight - 8) {
		top = viewportHeight - popupRect.height - 8;
	}
	if (top < 8) {
		top = 8;
	}
	if (left + popupRect.width > viewportWidth - 8) {
		left = viewportWidth - popupRect.width - 8;
	}
	if (left < 8) {
		left = 8;
	}
	element.style.top = `${Math.round(top)}px`;
	element.style.left = `${Math.round(left)}px`;
}

function getSelectedFillMode() {
	if (!fillPopupState?.modeInputs) {
		return 'copy';
	}
	return fillPopupState.modeInputs.find((input) => input.checked)?.value ?? 'copy';
}

function handleFillApply() {
	if (!fillPopupState) {
		return;
	}
	const mode = getSelectedFillMode();
	let result;
	switch (mode) {
		case 'copy':
			result = performCopyFill();
			break;
		case 'formulaSequence':
			result = performFormulaSequenceFill();
			break;
		case 'arithmetic':
			result = performArithmeticFill();
			break;
		case 'geometric':
			result = performGeometricFill();
			break;
		case 'formula':
			result = performFormulaFill();
			break;
		default:
			result = { success: false, message: _t('unknownFillMode') };
			break;
	}
	if (result?.success) {
		closeFillPopup();
	} else if (result?.message) {
		showFillPopupError(result.message);
	}
}

function prepareFillOperation({ allowDropdown }) {
	if (!fillPopupState || !selectedCell) {
		return { success: false, message: _t('noFillableCells') };
	}
	const columnKey = fillPopupState.column;
	if (!columnKey) {
		return { success: false, message: _t('cannotDetermineColumn') };
	}
	const baseValueRaw = selectedCell.element
		? readElementValue(selectedCell.element, selectedCell.fieldConfig)
		: (selectedCell.value ?? '');
	const targetRows = Array.isArray(fillPopupState.targetRows) ? fillPopupState.targetRows.slice() : [];
	if (!targetRows.length) {
		return { success: false, message: _t('selectFillRange') };
	}
	const contexts = [];
	for (const rowIndex of targetRows) {
		const context = getEditableCellContext(rowIndex, columnKey);
		if (!context) {
			return { success: false, message: _t('nonEditableCells') };
		}
		if (context.usesDropdown && !allowDropdown) {
			return { success: false, message: _t('fillModeNoDropdown') };
		}
		if (!context.id) {
			return { success: false, message: _t('missingRowId') };
		}
		contexts.push(context);
	}
	return {
		success: true,
		baseValueRaw,
		contexts,
		targetRows,
		column: columnKey,
	};
}

function getSelectedCellFormulaValue() {
	const direct = typeof selectedCell?.formula === 'string' ? selectedCell.formula : '';
	const fallback = selectedCell?.element?.dataset?.formulaValue ?? '';
	const candidate = direct && direct.trim().length ? direct : fallback;
	const trimmed = typeof candidate === 'string' ? candidate.trim() : '';
	return trimmed.startsWith('=') ? trimmed : '';
}

function offsetFormulaReferences(formula, rowOffset) {
	const trimmed = typeof formula === 'string' ? formula.trim() : '';
	if (!trimmed.startsWith('=') || !Number.isFinite(rowOffset) || rowOffset === 0) {
		return trimmed;
	}
	const expression = trimmed.slice(1);
	const rewrite = replaceCellReferencesInExpression(expression, (columnLetter, rowNumber) => {
		const nextRow = Number(rowNumber) + rowOffset;
		if (!Number.isFinite(nextRow) || nextRow <= 0) {
			return `${columnLetter}${rowNumber}`;
		}
		return `${columnLetter}${Math.floor(nextRow)}`;
	});
	return `=${rewrite.text}`;
}

function applyFormulaDefinitionsToContexts(columnKey, contexts, formulaFactory) {
	if (!Array.isArray(contexts) || !contexts.length) {
		return { success: false, message: _t('noFillableCellsDot') };
	}
	const updates = [];
	contexts.forEach((context, index) => {
		if (!context || !context.element) {
			return;
		}
		const formula = formulaFactory(context, index);
		const trimmed = typeof formula === 'string' ? formula.trim() : '';
		if (!trimmed.startsWith('=')) {
			return;
		}
		const targetRowIndex = Number.isFinite(context.rowIndex) ? Number(context.rowIndex) : undefined;
		if (targetRowIndex === undefined || targetRowIndex < 0) {
			return;
		}
		const rowId = typeof context.id === 'string' && context.id.length
			? context.id
			: (typeof context.rowId === 'string' ? context.rowId : '');
		context.element.dataset.formulaValue = trimmed;
		setElementValue(context.element, trimmed, context.fieldConfig);
		context.element.dataset.initialValue = trimmed;
		setFormulaDefinition(columnKey, rowId, targetRowIndex, trimmed);
		updates.push({ column: columnKey, rowId, rowIndex: targetRowIndex, formula: trimmed });
	});
	if (!updates.length) {
		return { success: false, message: _t('noWritableFormula') };
	}
	updatePayloadFormulasSnapshot();
	recalculateFormulas({ emitUpdates: true });
	refreshFormulaResultsForTable();
	updates.forEach((entry) => postSaveFormulaMessage(entry));
	return { success: true };
}

function applyValueToContext(context, value, columnKey, collector) {
	setElementValue(context.element, value, context.fieldConfig);
	if (context.usesDropdown) {
		const display = context.cell.querySelector('.kv-select-display');
		if (display) {
			updateSelectDisplay(context.element, display, context.fieldConfig);
		}
	}
	const normalizedValue = readElementValue(context.element, context.fieldConfig);
	context.element.dataset.initialValue = normalizedValue;
	context.element.title = normalizedValue;
	if (!context.usesDropdown && formulaValueInput && selectedCell?.element === context.element) {
		formulaValueInput.value = normalizedValue;
	}
	if (selectedCell && selectedCell.element === context.element) {
		selectedCell.value = normalizedValue;
	}
	updateCachedRowValue(context.rowIndex, columnKey, normalizedValue);
	if (Array.isArray(collector) && context.id) {
		collector.push({ id: context.id, key: columnKey, value: normalizedValue });
	}
}

function updateCachedRowValue(rowIndex, columnKey, value) {
	if (!Array.isArray(latestPayload?.rows)) {
		return;
	}
	const row = latestPayload.rows[rowIndex];
	if (!row) {
		return;
	}
	if (!row.values || typeof row.values !== 'object') {
		row.values = {};
	}
	row.values[columnKey] = value;
}

function dispatchBulkEdit(edits) {
	if (!Array.isArray(edits) || !edits.length) {
		return;
	}
	const filtered = edits.filter((edit) => edit && edit.id && edit.key);
	if (!filtered.length) {
		return;
	}
	vscode.postMessage({
		type: 'bulkEdit',
		payload: {
			edits: filtered.map((edit) => ({
				id: edit.id,
				key: edit.key,
				value: edit.value === undefined || edit.value === null ? '' : String(edit.value),
			})),
		},
	});
}

function formatNumericValueWithTemplate(value, template) {
	if (typeof template === 'string' && template.includes('.')) {
		const decimals = template.split('.')[1]?.length ?? 0;
		if (decimals > 0) {
			return value.toFixed(decimals);
		}
	}
	return String(value);
}

function performCopyFill() {
	const baseFormula = getSelectedCellFormulaValue();
	const prepared = prepareFillOperation({ allowDropdown: !baseFormula });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	if (baseFormula) {
		const result = applyFormulaDefinitionsToContexts(column, contexts, () => baseFormula);
		if (result.success) {
			clearFillPreview();
		}
		return result;
	}
	for (const context of contexts) {
		if (context.usesDropdown && !isValueAvailableInSelect(context.element, baseValueRaw)) {
			return { success: false, message: _t('copyValueNotInDropdown') };
		}
	}
	const edits = [];
	for (const context of contexts) {
		applyValueToContext(context, baseValueRaw, column, edits);
	}
	dispatchBulkEdit(edits);
	clearFillPreview();
	return { success: true };
}

function performFormulaSequenceFill() {
	const baseFormula = getSelectedCellFormulaValue();
	if (!baseFormula) {
		return { success: false, message: _t('notFormulaSequence') };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const baseRowIndex = Number.isFinite(selectedCell?.rowIndex) ? Number(selectedCell.rowIndex) : undefined;
	if (baseRowIndex === undefined) {
		return { success: false, message: _t('cannotDetermineBaseRow') };
	}
	const { contexts, column } = prepared;
	const result = applyFormulaDefinitionsToContexts(column, contexts, (context) => {
		const targetRowIndex = Number(context.rowIndex);
		const offset = Number.isFinite(targetRowIndex) ? targetRowIndex - baseRowIndex : 0;
		return offsetFormulaReferences(baseFormula, offset);
	});
	if (result.success) {
		clearFillPreview();
	}
	return result;
}

function performArithmeticFill() {
	if (selectedCell?.usesDropdown) {
		return { success: false, message: _t('noLinearFill') };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const baseNumber = Number(baseValueRaw);
	if (!Number.isFinite(baseNumber)) {
		return { success: false, message: _t('notValidNumber') };
	}
	const stepInput = fillPopupState?.arithmeticInput;
	const stepValue = stepInput ? Number(stepInput.value) : NaN;
	if (!Number.isFinite(stepValue)) {
		return { success: false, message: _t('enterValidStep') };
	}
	const direction = fillPopupState?.direction ?? 1;
	const edits = [];
	contexts.forEach((context, index) => {
		const offset = index + 1;
		const valueNumber = baseNumber + stepValue * (direction > 0 ? offset : -offset);
		const newValue = formatNumericValueWithTemplate(valueNumber, baseValueRaw);
		applyValueToContext(context, newValue, column, edits);
	});
	dispatchBulkEdit(edits);
	clearFillPreview();
	return { success: true };
}

function performGeometricFill() {
	if (selectedCell?.usesDropdown) {
		return { success: false, message: _t('noGeometricFill') };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const baseNumber = Number(baseValueRaw);
	if (!Number.isFinite(baseNumber)) {
		return { success: false, message: _t('notValidNumber') };
	}
	const ratioInput = fillPopupState?.geometricInput;
	const ratioValue = ratioInput ? Number(ratioInput.value) : NaN;
	if (!Number.isFinite(ratioValue) || ratioValue === 0) {
		return { success: false, message: _t('enterValidRatio') };
	}
	const direction = fillPopupState?.direction ?? 1;
	const edits = [];
	contexts.forEach((context, index) => {
		const offset = index + 1;
		const factor = Math.pow(ratioValue, offset);
		const valueNumber = direction > 0 ? baseNumber * factor : baseNumber / factor;
		const newValue = formatNumericValueWithTemplate(valueNumber, baseValueRaw);
		applyValueToContext(context, newValue, column, edits);
	});
	dispatchBulkEdit(edits);
	clearFillPreview();
	return { success: true };
}

function performFormulaFill() {
	if (selectedCell?.usesDropdown) {
		return { success: false, message: _t('noFormulaFill') };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const expression = (fillPopupState?.formulaInput?.value ?? '').trim();
	if (!expression) {
		return { success: false, message: _t('enterFormulaExpr') };
	}
	let evaluator;
	try {
		evaluator = new Function('base', 'baseNumber', 'offset', 'rowIndex', 'rowNumber', 'direction', 'rowId', 'toNumber', `return (${expression});`);
	} catch (error) {
		return { success: false, message: _t('formulaParseFailed') + error.message };
	}
	const baseNumber = Number(baseValueRaw);
	const direction = fillPopupState?.direction ?? 1;
	const edits = [];
	for (let index = 0; index < contexts.length; index += 1) {
		const context = contexts[index];
		const offset = index + 1;
		const signedOffset = direction > 0 ? offset : -offset;
		let resultValue;
		try {
			resultValue = evaluator(
				baseValueRaw,
				numberOrNull(baseNumber),
				signedOffset,
				context.rowIndex,
				context.rowIndex + 1,
				direction,
				context.rowId,
				(value) => Number(value)
			);
		} catch (error) {
			return { success: false, message: _t('formulaExecFailed') + error.message };
		}
		const finalValue = formatFormulaResult(resultValue, baseValueRaw);
		applyValueToContext(context, finalValue, column, edits);
	}
	dispatchBulkEdit(edits);
	clearFillPreview();
	return { success: true };
}

function numberOrNull(value) {
	return Number.isFinite(value) ? value : null;
}

function formatFormulaResult(result, template) {
	if (result === undefined || result === null) {
		return '';
	}
	if (typeof result === 'number') {
		if (Number.isFinite(result)) {
			return formatNumericValueWithTemplate(result, template);
		}
		return String(result);
	}
	return String(result);
}

function resolveRowIndex(rowId, fallbackIndex) {
	if (Number.isFinite(fallbackIndex) && fallbackIndex >= 0) {
		return Math.floor(Number(fallbackIndex));
	}
	if (!Array.isArray(latestPayload?.rows)) {
		return undefined;
	}
	if (typeof rowId === 'string' && rowId.length) {
		const index = latestPayload.rows.findIndex((row) => row && row.id === rowId);
		return index >= 0 ? index : undefined;
	}
	return undefined;
}

function handleElementChange(element, fieldConfig) {
	if (!element) {
		return;
	}
	const id = element.dataset.id;
	const key = element.dataset.key;
	const columnKey = typeof key === 'string' ? key.trim() : '';
	if (!columnKey) {
		return;
	}
	const rowIndex = resolveRowIndex(id, Number(element.dataset.rowIndex));
	const currentValueRaw = readElementValue(element, fieldConfig);
	const currentValue = currentValueRaw === undefined || currentValueRaw === null ? '' : String(currentValueRaw);
	const trimmedValue = currentValue.trim();

	if (columnKey === 'id') {
		const oldId = element.dataset.initialValue ?? '';
		const newId = trimmedValue;
		if (oldId === newId) {
			return;
		}
		if (!oldId || !newId) {
			console.warn(_t('idColumnEmpty'), { oldId, newId });
			setElementValue(element, oldId, fieldConfig);
			return;
		}
		element.dataset.initialValue = newId;
		element.title = newId;

		if (latestPayload && Array.isArray(latestPayload.rows)) {
			const row = latestPayload.rows.find(r => r && r.id === oldId);
			if (row) {
				row.id = newId;
			}
		}

		if (tableSection && Number.isFinite(rowIndex)) {
			const cells = tableSection.querySelectorAll(`td[data-row-index="${rowIndex}"]`);
			cells.forEach(td => {
				if (td.dataset.rowId === oldId) {
					td.dataset.rowId = newId;
				}
				const input = td.querySelector('input, select, textarea');
				if (input && input.dataset.id === oldId) {
					input.dataset.id = newId;
				}
			});
		}

		updateFormulaDefinitionsOnIdRename(oldId, newId);

		vscode.postMessage({
			type: 'renameId',
			payload: { oldId, newId }
		});

		if (selectedCell && selectedCell.element === element) {
			selectedCell.value = newId;
		}

		updatePayloadFormulasSnapshot();
		recalculateFormulas({ emitUpdates: true });
		refreshFormulaResultsForTable();

		return;
	}

	const previousFormula = element.dataset.formulaValue ?? '';
	const isFormula = trimmedValue.startsWith('=');
	if (isFormula) {
		if (previousFormula === trimmedValue) {
			return;
		}
		if (!Number.isFinite(rowIndex) || rowIndex === undefined || rowIndex < 0) {
			console.warn(_t('ignoreFormulaWrite'), { column: columnKey, id });
			return;
		}
		element.dataset.formulaValue = trimmedValue;
		setFormulaDefinition(columnKey, id, rowIndex, trimmedValue);
		updatePayloadFormulasSnapshot();
		recalculateFormulas({ emitUpdates: true });
		refreshFormulaResultsForTable();
		postSaveFormulaMessage({ column: columnKey, rowId: id, rowIndex, formula: trimmedValue });
		return;
	}
	const hadFormula = Boolean(previousFormula);
	if (hadFormula) {
		if (Number.isFinite(rowIndex) && rowIndex !== undefined && rowIndex >= 0) {
			removeFormulaDefinition(columnKey, id, rowIndex);
		}
		delete element.dataset.formulaValue;
		updatePayloadFormulasSnapshot();
		postSaveFormulaMessage({ column: columnKey, rowId: id, rowIndex, formula: '' });
	}
	const previous = element.dataset.initialValue ?? '';
	if (previous === currentValue) {
		return;
	}
	element.dataset.initialValue = currentValue;
	element.title = currentValue;
	if (Number.isFinite(rowIndex) && rowIndex !== undefined && rowIndex >= 0) {
		updateCachedRowValue(rowIndex, columnKey, currentValue);
	}
	if (id) {
		vscode.postMessage({
			type: 'edit',
			payload: { id, key: columnKey, value: currentValue }
		});
	}
	if (selectedCell && selectedCell.element === element) {
		selectedCell.value = currentValue;
		selectedCell.formula = undefined;
		selectedCell.formulaError = undefined;
		if (formulaValueInput) {
			formulaValueInput.value = currentValue;
		}
	}
	recalculateFormulas({ emitUpdates: true });
	refreshFormulaResultsForTable();
}

function getOptionLabel(fieldConfig, value) {
	const option = fieldConfig?.options?.find((option) => option.value === value);
	if (!option) return value;
	if (typeof localizedMode !== 'undefined' && localizedMode) {
		return option.label || option.value;
	}
	return option.value;
}

const optionColorCache = new Map();

function getOptionColor(option, index) {
	if (option?.color) {
		return option.color;
	}

	return getAutoColor(index);
}

function updateSelectDisplay(select, display, fieldConfig) {
	if (!display) {
		return;
	}
	display.innerHTML = '';
	const isMulti = Boolean(fieldConfig?.multiple);
	const rawValue = readElementValue(select, fieldConfig);
	const values = isMulti
		? splitMultiValue(rawValue, fieldConfig)
		: rawValue
			? [rawValue]
			: [];
	if (!values.length) {
		const placeholder = document.createElement('span');
		placeholder.className = 'kv-select-placeholder';
		placeholder.textContent = _t('notSelected');
		display.appendChild(placeholder);
		return;
	}
	const columnKey = select?.dataset?.key || '';
	values.forEach((value, index) => {
		const tag = document.createElement('span');
		tag.className = 'kv-select-tag';

		const option = fieldConfig?.options?.find((opt) => opt.value === value);

		tag.style.backgroundColor = getOptionColor(option, index);
		tag.style.color = '#fff';
		tag.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';

		if (localizedMode) {
			tag.textContent = option?.label || option?.value || value;
		} else {
			tag.textContent = option?.value || value;
		}

		display.appendChild(tag);
	});
}

function updateMultiSelectOverlaySelection() {
	if (!openMultiSelectContext) {
		return;
	}
	const { select, fieldConfig, entries } = openMultiSelectContext;
	const selectedSet = new Set(splitMultiValue(readElementValue(select, fieldConfig), fieldConfig));
	(entries || []).forEach((entry) => {
		if (!entry || !entry.element) {
			return;
		}
		if (selectedSet.has(entry.option.value)) {
			entry.element.classList.add('kv-quickpick-item-checked');
		} else {
			entry.element.classList.remove('kv-quickpick-item-checked');
		}
	});
}

function toggleMultiSelectOption(value) {
	if (!openMultiSelectContext) {
		return;
	}
	const { select, fieldConfig, display, td, isMulti } = openMultiSelectContext;
	if (isMulti) {
		const currentValues = splitMultiValue(readElementValue(select, fieldConfig), fieldConfig);
		const selectedSet = new Set(currentValues);
		if (selectedSet.has(value)) {
			selectedSet.delete(value);
		} else {
			selectedSet.add(value);
		}
		const orderedValues = (fieldConfig?.options ?? [])
			.map((option) => option.value)
			.filter((optionValue) => selectedSet.has(optionValue));
		const separator = getFieldSeparator(fieldConfig);
		const newValue = orderedValues.join(separator);
		const rowId = select.dataset.id ?? '';
		const columnKey = select.dataset.key ?? '';
		const rowIndex = td?.dataset.rowIndex ?? '';
		pendingMultiSelectReopen = { column: columnKey, rowId, rowIndex };
		setElementValue(select, newValue, fieldConfig);
		handleElementChange(select, fieldConfig);
		updateSelectDisplay(select, display, fieldConfig);
		updateMultiSelectOverlaySelection();
		if (openMultiSelectContext && openMultiSelectContext.focusSearch) {
			openMultiSelectContext.focusSearch();
		}
	} else {
		setElementValue(select, value, fieldConfig);
		handleElementChange(select, fieldConfig);
		updateSelectDisplay(select, display, fieldConfig);
		closeMultiSelectDropdown();
	}
}

function closeMultiSelectDropdown(options) {
	if (!openMultiSelectContext) {
		return;
	}
	const preservePending = Boolean(options?.preservePending);
	const { overlay, outsideHandler, keyHandler, scrollHandler, resizeHandler, searchInput, searchHandlers } = openMultiSelectContext;

	overlay.remove();

	document.removeEventListener('mousedown', outsideHandler, true);
	document.removeEventListener('keydown', keyHandler);
	if (searchInput && searchHandlers) {
		if (searchHandlers.input) {
			searchInput.removeEventListener('input', searchHandlers.input);
		}
		if (searchHandlers.keydown) {
			searchInput.removeEventListener('keydown', searchHandlers.keydown);
		}
	}
	if (tableSection) {
		tableSection.removeEventListener('scroll', scrollHandler);
	}
	window.removeEventListener('resize', resizeHandler);
	openMultiSelectContext = null;
	if (!preservePending) {
		pendingMultiSelectReopen = null;
	}
}

function openMultiSelectDropdown(context) {
	if (!tableSection || !context || !context.fieldConfig) {
		return;
	}
	const isMultiSelect = Boolean(context.fieldConfig?.multiple);
	if (openMultiSelectContext) {
		if (openMultiSelectContext.td === context.td) {
			updateMultiSelectOverlaySelection();
			openMultiSelectContext.reposition();
			return;
		}
		closeMultiSelectDropdown();
	}

	const overlay = createManagedDialog({
		className: 'kv-quickpick',
		onClose: () => {
			openMultiSelectContext = null;
			pendingMultiSelectReopen = null;
		}
	});

	const searchWrapper = document.createElement('div');
	searchWrapper.className = 'kv-quickpick-search-wrapper';
	const placeholderName = context.columnName ? ` ${context.columnName}` : '';
	const searchInput = createInput({
		type: 'search',
		className: 'kv-quickpick-search',
		placeholder: _tf('searchName', placeholderName).trim() || _t('search')
	});
	searchWrapper.appendChild(searchInput);
	overlay.appendChild(searchWrapper);
	const list = document.createElement('div');
	list.className = 'kv-quickpick-list';
	overlay.appendChild(list);
	const emptyIndicator = document.createElement('div');
	emptyIndicator.className = 'kv-quickpick-empty';
	emptyIndicator.textContent = _t('noMatchingResults');
	emptyIndicator.hidden = true;
	overlay.appendChild(emptyIndicator);
	tableSection.appendChild(overlay);
	const entries = [];
	const columnKey = context?.select?.dataset?.key || '';
	(context.fieldConfig.options ?? []).forEach((option, index) => {
		const item = document.createElement('div');
		item.className = 'kv-quickpick-item';
		item.dataset.value = option.value;

		const textWrapper = document.createElement('div');
		textWrapper.className = 'kv-quickpick-text';
		const hasCustomLabel = option.label && option.label !== option.value;

		let primaryText;
		let detailText;
		if (localizedMode) {
			primaryText = option.label || option.value;
			detailText = option.description || (option.label && option.label !== option.value ? option.value : undefined);
		} else {
			primaryText = option.value;
			detailText = option.description || undefined;
		}

		const labelEl = document.createElement('div');
		labelEl.className = 'kv-quickpick-label';

		const color = getOptionColor(option, index);
		if (color) {
			const colorTag = document.createElement('span');
			colorTag.className = 'kv-select-tag';
			colorTag.style.backgroundColor = color;
			colorTag.textContent = primaryText;
			labelEl.appendChild(colorTag);
		} else {
			labelEl.textContent = primaryText;
		}

		textWrapper.appendChild(labelEl);
		if (detailText) {
			const detailEl = document.createElement('div');
			detailEl.className = 'kv-quickpick-detail';
			detailEl.textContent = detailText;
			textWrapper.appendChild(detailEl);
		}
		item.appendChild(textWrapper);
		const checkEl = document.createElement('div');
		checkEl.className = 'kv-quickpick-check';
		checkEl.textContent = '✔';
		item.appendChild(checkEl);
		item.addEventListener('mousedown', (event) => {
			event.preventDefault();
		});
		item.addEventListener('click', (event) => {
			event.preventDefault();
			toggleMultiSelectOption(option.value);
		});
		const entry = {
			option,
			element: item,
			matches: true,
			searchText: `${option.value} ${option.label || ''} ${option.description || ''}`.toLowerCase(),
		};
		entries.push(entry);
		list.appendChild(item);
	});
	const reposition = () => {
		const tableRect = tableSection.getBoundingClientRect();
		const cellRect = context.td.getBoundingClientRect();
		const top = cellRect.bottom - tableRect.top + tableSection.scrollTop;
		const left = cellRect.left - tableRect.left + tableSection.scrollLeft;
		overlay.style.top = `${top}px`;
		overlay.style.left = `${left}px`;
		const minWidth = Math.max(cellRect.width, 220);
		overlay.style.minWidth = `${minWidth}px`;
	};
	const outsideHandler = (event) => {
		if (!overlay.contains(event.target) && !context.td.contains(event.target)) {
			closeMultiSelectDropdown();
		}
	};
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeMultiSelectDropdown();
		}
	};
	const scrollHandler = () => reposition();
	const resizeHandler = () => reposition();
	const state = {
		overlay,
		select: context.select,
		display: context.display,
		fieldConfig: context.fieldConfig,
		td: context.td,
		isMulti: isMultiSelect,
		reposition,
		outsideHandler,
		keyHandler,
		scrollHandler,
		resizeHandler,
		searchInput,
		searchHandlers: {},
		entries,
		visibleEntries: [],
		activeIndex: -1,
		emptyIndicator,
		focusSearch: () => {
			if (document.activeElement !== searchInput) {
				searchInput.focus({ preventScroll: true });
			}
		},
		setActiveIndex: (index) => { },
		moveActive: (delta) => { },
		getActiveEntry: () => undefined,
		setActiveEntry: () => { },
		applyFilter: () => { },
	};
	state.setActiveIndex = (index) => {
		(state.entries || []).forEach((entry) => {
			if (entry?.element) {
				entry.element.classList.remove('kv-quickpick-item-active');
			}
		});
		const visible = state.visibleEntries || [];
		if (!visible.length || index === undefined || index === null || index < 0) {
			state.activeIndex = -1;
			return;
		}
		const normalized = (index % visible.length + visible.length) % visible.length;
		state.activeIndex = normalized;
		const activeEntry = visible[normalized];
		if (activeEntry && activeEntry.element) {
			activeEntry.element.classList.add('kv-quickpick-item-active');
			activeEntry.element.scrollIntoView({ block: 'nearest' });
		}
	};
	state.setActiveEntry = (target) => {
		const visible = state.visibleEntries || [];
		const idx = visible.indexOf(target);
		if (idx >= 0) {
			state.setActiveIndex(idx);
		}
	};
	state.moveActive = (delta) => {
		const visible = state.visibleEntries || [];
		if (!visible.length) {
			state.setActiveIndex(-1);
			return;
		}
		const nextIndex = state.activeIndex === -1 ? 0 : state.activeIndex + delta;
		state.setActiveIndex(nextIndex);
	};
	state.getActiveEntry = () => {
		const visible = state.visibleEntries || [];
		if (state.activeIndex < 0 || state.activeIndex >= visible.length) {
			return undefined;
		}
		return visible[state.activeIndex];
	};
	state.applyFilter = (term) => {
		const keyword = (term || '').trim().toLowerCase();
		state.visibleEntries = [];
		(state.entries || []).forEach((entry) => {
			if (!entry || !entry.element) {
				return;
			}
			const matches = !keyword || entry.searchText.includes(keyword);
			entry.matches = matches;
			if (matches) {
				entry.element.hidden = false;
				state.visibleEntries.push(entry);
			} else {
				entry.element.hidden = true;
			}
		});
		state.emptyIndicator.hidden = state.visibleEntries.length > 0;
		if (!state.visibleEntries.length) {
			state.setActiveIndex(-1);
			return;
		}
		const active = state.getActiveEntry();
		if (active && state.visibleEntries.includes(active)) {
			state.setActiveEntry(active);
		} else {
			state.setActiveIndex(0);
		}
	};
	const entryLookup = new Map(entries.map((entry) => [entry.option.value, entry]));
	entries.forEach((entry) => {
		entry.element.addEventListener('mouseenter', () => {
			state.setActiveEntry(entry);
		});
	});
	const onSearchInput = () => {
		state.applyFilter(searchInput.value ?? '');
	};
	const onSearchKeyDown = (event) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			state.moveActive(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			state.moveActive(-1);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			const activeEntry = state.getActiveEntry();
			if (activeEntry) {
				toggleMultiSelectOption(activeEntry.option.value);
			}
		}
	};
	searchInput.addEventListener('input', onSearchInput);
	searchInput.addEventListener('keydown', onSearchKeyDown);
	state.searchHandlers = { input: onSearchInput, keydown: onSearchKeyDown };
	document.addEventListener('mousedown', outsideHandler, true);
	document.addEventListener('keydown', keyHandler);
	tableSection.addEventListener('scroll', scrollHandler);
	window.addEventListener('resize', resizeHandler);
	reposition();
	openMultiSelectContext = state;
	updateMultiSelectOverlaySelection();
	state.applyFilter('');
	const currentRawValue = readElementValue(context.select, context.fieldConfig);
	const currentValues = isMultiSelect ? splitMultiValue(currentRawValue, context.fieldConfig) : (currentRawValue ? [currentRawValue] : []);
	if (currentValues.length) {
		for (const val of currentValues) {
			const found = entryLookup.get(val);
			if (found) {
				state.setActiveEntry(found);
				break;
			}
		}
	} else {
		state.setActiveIndex(0);
	}
	state.focusSearch();
}

function getMinColumnWidth(column) {
	if (column === ROW_NUMBER_COLUMN_KEY) {
		return ROW_NUMBER_MIN_WIDTH;
	}
	if (column === 'AbilityValues') {
		return Math.max(COLUMN_MIN_WIDTH, 160);
	}
	return COLUMN_MIN_WIDTH;
}

function getColumnWidth(column, headerText) {
	if (columnWidths[column]) {
		return columnWidths[column];
	}
	if (column === ROW_NUMBER_COLUMN_KEY) {
		columnWidths[column] = ROW_NUMBER_MIN_WIDTH;
		return columnWidths[column];
	}
	const labelLength = Math.max((headerText ?? '').length, 4);
	const estimated = column === 'AbilityValues'
		? Math.max(COLUMN_MIN_WIDTH, 220)
		: Math.max(COLUMN_MIN_WIDTH, labelLength * 12);
	columnWidths[column] = estimated;
	return estimated;
}

function getColumnLetter(index) {
	let dividend = index + 1;
	let columnName = '';
	while (dividend > 0) {
		const modulo = (dividend - 1) % 26;
		columnName = String.fromCharCode(65 + modulo) + columnName;
		dividend = Math.floor((dividend - modulo) / 26);
	}
	return columnName;
}

function refreshTableWidth() {
	if (!tableSection) {
		return;
	}
	const table = tableSection.querySelector('table');
	if (!table) {
		return;
	}
	let totalWidth = 0;
	const colElements = table.querySelectorAll('col[data-column]');
	colElements.forEach((col) => {
		const column = col.getAttribute('data-column');
		if (!column) {
			return;
		}
		const headerLabel = column === ROW_NUMBER_COLUMN_KEY ? '#' : column;
		const width = columnWidths[column] ?? getColumnWidth(column, headerLabel);
		totalWidth += width;
	});
	table.style.minWidth = `${totalWidth}px`;
	table.style.width = `${totalWidth}px`;
}

function resetColumnState() {
	for (const key of Object.keys(columnWidths)) {
		delete columnWidths[key];
	}
	for (const key of Object.keys(originalColumnWidths)) {
		delete originalColumnWidths[key];
	}
	modifiedColumns.clear();
	savedColumnWidths.clear();
}

function cancelColumnWidthSave() {
	if (!columnWidthSaveHandle) {
		return;
	}
	clearTimeout(columnWidthSaveHandle);
	columnWidthSaveHandle = null;
}

function flushColumnWidthSave() {
	if (!latestPayload || !modifiedColumns.size) {
		return;
	}
	const widthsPayload = {};
	modifiedColumns.forEach((column) => {
		const width = columnWidths[column];
		if (typeof width !== 'number' || !Number.isFinite(width)) {
			return;
		}
		const normalized = Math.max(getMinColumnWidth(column), Math.round(width));
		widthsPayload[column] = normalized;
	});
	if (!Object.keys(widthsPayload).length) {
		return;
	}
	vscode.postMessage({
		type: 'saveColumnWidths',
		payload: { widths: widthsPayload },
	});
	modifiedColumns.clear();
}

function markColumnWidthChange(column, width) {
	if (column === ROW_NUMBER_COLUMN_KEY) {
		return;
	}
	const normalized = Math.max(getMinColumnWidth(column), Math.round(width));
	const baseline = originalColumnWidths[column];
	if (baseline === undefined) {
		originalColumnWidths[column] = normalized;
		modifiedColumns.delete(column);
		return;
	}
	if (Math.round(baseline) === normalized) {
		modifiedColumns.delete(column);
	} else {
		modifiedColumns.add(column);
	}
	if (!modifiedColumns.size) {
		cancelColumnWidthSave();
	}
}

function scheduleColumnWidthSave() {
	if (!latestPayload || !modifiedColumns.size) {
		return;
	}
	if (columnWidthSaveHandle) {
		clearTimeout(columnWidthSaveHandle);
	}
	columnWidthSaveHandle = setTimeout(() => {
		columnWidthSaveHandle = null;
		const widthsPayload = {};
		const columnsToRemoveFromSaved = new Set();

		modifiedColumns.forEach((column) => {
			const width = columnWidths[column];
			if (typeof width !== 'number' || !Number.isFinite(width)) {
				return;
			}
			const normalized = Math.max(getMinColumnWidth(column), Math.round(width));
			const baseline = originalColumnWidths[column];
			if (baseline !== undefined && Math.round(baseline) === normalized) {
				return;
			}
			widthsPayload[column] = normalized;
			savedColumnWidths.add(column);
		});

		if (!latestPayload.columns) {
			latestPayload.columns = [];
		}
		savedColumnWidths.forEach((column) => {
			if (widthsPayload[column] !== undefined) {
				return;
			}
			if (!latestPayload.columns.includes(column)) {
				columnsToRemoveFromSaved.add(column);
				return;
			}
			const currentWidth = columnWidths[column];
			if (!Number.isFinite(currentWidth)) {
				return;
			}
			const headerLabel = column;
			const labelLength = Math.max((headerLabel ?? '').length, 4);
			const systemDefaultWidth = column === 'AbilityValues'
				? Math.max(COLUMN_MIN_WIDTH, 220)
				: Math.max(COLUMN_MIN_WIDTH, labelLength * 12);
			if (Math.round(currentWidth) === Math.round(systemDefaultWidth)) {
				columnsToRemoveFromSaved.add(column);
			}
		});

		columnsToRemoveFromSaved.forEach((column) => {
			savedColumnWidths.delete(column);
			widthsPayload[column] = null;
		});

		if (!Object.keys(widthsPayload).length) {
			return;
		}
		vscode.postMessage({
			type: 'saveColumnWidths',
			payload: {
				widths: widthsPayload,
			},
		});
		Object.entries(widthsPayload).forEach(([column, value]) => {
			if (value === null) {
				delete originalColumnWidths[column];
			} else {
				originalColumnWidths[column] = value;
			}
			modifiedColumns.delete(column);
		});
	}, COLUMN_WIDTH_SAVE_DEBOUNCE_MS);
}

function updateColumnWidth(column, width) {
	const adjusted = Math.max(getMinColumnWidth(column), width);
	columnWidths[column] = adjusted;
	if (tableSection) {
		const colElement = tableSection.querySelector(`col[data-column="${column}"]`);
		if (colElement) {
			colElement.style.width = `${adjusted}px`;
		}
	}
	refreshTableWidth();
	markColumnWidthChange(column, adjusted);
	scheduleColumnWidthSave();
}

function startColumnResize(event, column) {
	if (!tableSection) {
		return;
	}
	const colElement = tableSection.querySelector(`col[data-column="${column}"]`);
	if (!colElement) {
		return;
	}
	event.preventDefault();
	resizeState = {
		column,
		startX: event.clientX,
		startWidth: colElement.getBoundingClientRect().width
	};
	document.body.classList.add('kv-resizing');
}

function handleColumnResize(event) {
	if (!resizeState) {
		return;
	}
	const delta = event.clientX - resizeState.startX;
	const newWidth = Math.max(getMinColumnWidth(resizeState.column), resizeState.startWidth + delta);
	updateColumnWidth(resizeState.column, newWidth);
}

function stopColumnResize() {
	if (!resizeState) {
		return;
	}
	resizeState = null;
	document.body.classList.remove('kv-resizing');
	scheduleColumnWidthSave();
}

function restoreActiveCell() {
	if (!activeCell) {
		return;
	}
	const selector = `[data-id="${activeCell.id}"][data-key="${activeCell.key}"]`;
	const focusTarget = tableSection?.querySelector(selector);
	if (focusTarget instanceof HTMLInputElement) {
		focusTarget.focus();
		if (focusTarget.type !== 'number' && focusTarget.type !== 'checkbox') {
			const length = focusTarget.value.length;
			focusTarget.setSelectionRange(length, length);
		}
	} else if (focusTarget instanceof HTMLSelectElement) {
		const styles = window.getComputedStyle(focusTarget);
		if (styles.display !== 'none' && styles.visibility !== 'hidden') {
			focusTarget.focus();
		}
	}
}

function restoreSelection(columnLabels, columnLetters, columnOptions) {
	if (!selectedCellKey) {
		return;
	}
	const selector = `td[data-column="${selectedCellKey.column}"][data-row-index="${String(selectedCellKey.rowIndex ?? 0)}"]`;
	const td = tableSection?.querySelector(selector);
	if (!td) {
		clearSelection();
		return;
	}
	const rowIndex = Number(td.dataset.rowIndex ?? '0');
	const columnName = columnLabels.get(selectedCellKey.column) ?? selectedCellKey.column;
	const columnLetter = columnLetters.get(selectedCellKey.column) ?? selectedCellKey.column;
	const isAbilityColumn = selectedCellKey.column === 'AbilityValues';
	const editable = selectedCellKey.column !== ROW_NUMBER_COLUMN_KEY && !isAbilityColumn;
	const fieldConfig = columnOptions[selectedCellKey.column];
	const usesDropdown = Boolean(fieldConfig?.options?.length);
	let element = null;
	if (editable) {
		element = usesDropdown ? td.querySelector('select') : td.querySelector('input');
	}
	const value = isAbilityColumn
		? (td.dataset.displayValue ?? td.textContent ?? '')
		: editable
			? readElementValue(element, fieldConfig)
			: (td.textContent ?? '');
	const rowId = td.dataset.rowId ?? '';
	const abilityEntries = isAbilityColumn ? parseAbilityEntriesFromCell(td) : undefined;
	const hasAbilityField = isAbilityColumn ? td.dataset.hasAbilityField === 'true' : false;
	selectCell(td, {
		column: selectedCellKey.column,
		columnLetter,
		columnName,
		rowId,
		rowIndex,
		editable,
		element,
		fieldConfig,
		usesDropdown,
		value,
		dataType: isAbilityColumn ? 'abilityValues' : 'cell',
		abilityEntries,
		hasAbilityField
	});
}

function parseAbilityEntriesFromCell(td) {
	if (!td) {
		return [];
	}
	const json = td.dataset.abilityEntries;
	if (!json) {
		return [];
	}
	try {
		const parsed = JSON.parse(json);
		return cloneAbilityValuesEntries(parsed);
	} catch (error) {
		console.warn('[kv-editor] failed to parse ability entries from cell', error);
		return [];
	}
}

function populateAbilityValuesCell(td, entries, hasAbilityField) {
	if (!td) {
		return { entries: [], displayValue: '' };
	}
	const sanitizedEntries = cloneAbilityValuesEntries(entries || []);
	td.innerHTML = '';
	td.classList.remove('kv-ability-values-cell-empty');
	td.dataset.hasAbilityField = hasAbilityField ? 'true' : 'false';
	try {
		td.dataset.abilityEntries = JSON.stringify(sanitizedEntries);
	} catch (error) {
		console.warn('[kv-editor] failed to stringify ability entries', error);
		delete td.dataset.abilityEntries;
	}

	if (compactMode) {
		const compactText = sanitizedEntries.map(entry => {
			const parts = [`${entry.key}: ${entry.value}`];
			(entry.modifiers || []).forEach(mod => {
				parts.push(`${mod.key}: ${mod.value}`);
			});
			return parts.join(', ');
		}).join(' | ');

		const compactDiv = document.createElement('div');
		compactDiv.className = 'kv-ability-values-compact';
		compactDiv.textContent = compactText || (hasAbilityField ? _t('empty') : '');
		compactDiv.title = compactText;
		td.appendChild(compactDiv);
		return { entries: sanitizedEntries, displayValue: compactText };
	}

	const list = document.createElement('div');
	list.className = 'kv-ability-values-list';
	const displayLines = [];
	if (sanitizedEntries.length) {
		// Collapsed summary
		const summary = document.createElement('div');
		summary.className = 'kv-ability-values-summary';
		const summaryText = sanitizedEntries.map(e => e.key).join(', ');
		const countBadge = document.createElement('span');
		countBadge.className = 'kv-ability-values-count';
		countBadge.textContent = String(sanitizedEntries.length);
		const summaryLabel = document.createElement('span');
		summaryLabel.className = 'kv-ability-values-summary-text';
		summaryLabel.textContent = summaryText;
		summaryLabel.title = summaryText;
		const expandIcon = document.createElement('span');
		expandIcon.className = 'codicon codicon-chevron-right kv-ability-values-expand-icon';
		summary.appendChild(expandIcon);
		summary.appendChild(countBadge);
		summary.appendChild(summaryLabel);
		td.appendChild(summary);

		list.hidden = true;
		sanitizedEntries.forEach((entry) => {
			const block = document.createElement('div');
			block.className = 'kv-ability-values-block';
			const baseRow = document.createElement('div');
			baseRow.className = 'kv-ability-values-entry kv-ability-values-entry-base';
			const baseKey = document.createElement('span');
			baseKey.className = 'kv-ability-values-key';
			baseKey.textContent = entry.key;
			baseKey.title = entry.key;
			const baseValue = document.createElement('span');
			baseValue.className = 'kv-ability-values-value';
			baseValue.textContent = entry.value;
			baseValue.title = entry.value;
			baseRow.appendChild(baseKey);
			baseRow.appendChild(baseValue);
			block.appendChild(baseRow);
			displayLines.push(`${entry.key}: ${entry.value}`);
			(entry.modifiers || []).forEach((modifier) => {
				const modifierRow = document.createElement('div');
				modifierRow.className = 'kv-ability-values-entry kv-ability-values-entry-modifier';
				const modifierKey = document.createElement('span');
				modifierKey.className = 'kv-ability-values-key';
				modifierKey.textContent = modifier.key;
				modifierKey.title = modifier.key;
				const modifierValue = document.createElement('span');
				modifierValue.className = 'kv-ability-values-value';
				modifierValue.textContent = modifier.value;
				modifierValue.title = modifier.value;
				modifierRow.appendChild(modifierKey);
				modifierRow.appendChild(modifierValue);
				block.appendChild(modifierRow);
				displayLines.push(`${modifier.key}: ${modifier.value}`);
			});
			list.appendChild(block);
		});
		td.appendChild(list);

		summary.addEventListener('click', (e) => {
			e.stopPropagation();
			const collapsed = list.hidden;
			list.hidden = !collapsed;
			expandIcon.className = collapsed
				? 'codicon codicon-chevron-down kv-ability-values-expand-icon'
				: 'codicon codicon-chevron-right kv-ability-values-expand-icon';
			td.classList.toggle('kv-ability-values-expanded', collapsed);
		});
	} else if (hasAbilityField) {
		const placeholder = document.createElement('div');
		placeholder.className = 'kv-ability-values-empty';
		placeholder.textContent = _t('noEntries');
		td.appendChild(placeholder);
	} else {
		td.classList.add('kv-ability-values-cell-empty');
		td.textContent = '—';
	}
	const displayValue = displayLines.length
		? displayLines.join('\n')
		: hasAbilityField
			? _t('noEntries')
			: '—';
	td.dataset.displayValue = displayValue;
	td.title = _t('doubleClickAbilityValues');
	return { entries: sanitizedEntries, displayValue };
}

function normalizeAbilityEntriesForPayload(entries) {
	return (entries || []).map((entry) => {
		const trimmedKey = (entry.key || '').trim();
		const trimmedOriginalKey = (entry.originalKey || '').trim() || trimmedKey;
		const normalizedModifiers = (entry.modifiers || [])
			.map((modifier) => ({
				key: (modifier.key || '').trim(),
				value: (modifier.value || '').trim(),
			}))
			.filter((modifier) => modifier.key.length > 0);
		const type = normalizedModifiers.length === 0 ? 'scalar' : 'object';
		return {
			key: trimmedKey,
			originalKey: trimmedOriginalKey,
			value: (entry.value || '').trim(),
			type,
			modifiers: normalizedModifiers,
		};
	}).filter((entry) => entry.key.length > 0);
}

// ============================================================================
// ============================================================================
const VIRTUAL_SCROLL_THRESHOLD = 200;
const VIRTUAL_SCROLL_BUFFER = 10;
const ROW_HEIGHT_ESTIMATE = 32;

let virtualScrollState = null;
let scrollRAFHandle = null;

function shouldUseVirtualScroll(rowCount) {
	return rowCount > VIRTUAL_SCROLL_THRESHOLD;
}

function calculateVisibleRowRange(scrollTop, containerHeight, totalRows) {
	const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT_ESTIMATE) - VIRTUAL_SCROLL_BUFFER);
	const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT_ESTIMATE) + 2 * VIRTUAL_SCROLL_BUFFER;
	const endRow = Math.min(totalRows - 1, startRow + visibleCount);
	return { startRow, endRow };
}

// ============================================================================
// ============================================================================

const RENDER_DEBOUNCE_MS = 16; // ~60fps
let pendingRenderHandle = null;
let lastRenderTime = 0;

/**
 */
function scheduleRender(columns, rows, columnOptions) {
	if (pendingRenderHandle) {
		cancelAnimationFrame(pendingRenderHandle);
	}

	const now = performance.now();
	const timeSinceLastRender = now - lastRenderTime;

	if (timeSinceLastRender < RENDER_DEBOUNCE_MS) {
		pendingRenderHandle = requestAnimationFrame(() => {
			pendingRenderHandle = null;
			lastRenderTime = performance.now();
			renderTable(columns, rows, columnOptions);
		});
	} else {
		lastRenderTime = now;
		renderTable(columns, rows, columnOptions);
	}
}

/**
 */
function createRowsBatch(rows, startIndex, endIndex, context) {
	const fragment = document.createDocumentFragment();
	for (let i = startIndex; i <= endIndex && i < rows.length; i++) {
		const tr = createTableRowElement(rows[i], i, context);
		if (tr) {
			fragment.appendChild(tr);
		}
	}
	return fragment;
}

/**
 */
function createTableRowElement(row, rowIndex, context) {
	return null;
}

// ============================================================================
// ============================================================================

/**
 */
function createRenderContext(columns, rows, columnOptions) {
	const safeColumns = Array.isArray(columns) ? columns : [];
	const displayColumns = [ROW_NUMBER_COLUMN_KEY, ...safeColumns];
	const columnLabels = new Map();
	const columnLetters = new Map();

	columns.forEach((column, index) => {
		columnLetters.set(column, getColumnLetter(index));
	});
	columnLetters.set(ROW_NUMBER_COLUMN_KEY, '#');

	for (const column of displayColumns) {
		const headerLabel = column === ROW_NUMBER_COLUMN_KEY ? '#' : column;
		columnLabels.set(column, headerLabel);
	}

	const frozenColumnsInOrder = displayColumns.filter(
		col => frozenColumns.has(col) && col !== ROW_NUMBER_COLUMN_KEY
	);
	const lastFrozenColumn = frozenColumnsInOrder.length > 0
		? frozenColumnsInOrder[frozenColumnsInOrder.length - 1]
		: null;

	return {
		columns,
		rows,
		columnOptions,
		displayColumns,
		columnLabels,
		columnLetters,
		frozenColumnsInOrder,
		lastFrozenColumn,
		texturePreviewMap: latestPayload?.texturePreviews ?? Object.create(null),
		scriptSupport: latestPayload?.scriptSupport || { applicable: false, baseReady: false, useTypescript: false },
	};
}

/**
 */
function calculateFrozenColumnLeft(column, context) {
	const { frozenColumnsInOrder, columnLabels } = context;
	const frozenIndex = frozenColumnsInOrder.indexOf(column);
	if (frozenIndex < 0) return 0;

	let leftPos = ROW_NUMBER_MIN_WIDTH;
	for (let i = 0; i < frozenIndex; i++) {
		const prevCol = frozenColumnsInOrder[i];
		const prevLabel = columnLabels.get(prevCol) ?? prevCol;
		leftPos += getColumnWidth(prevCol, prevLabel);
	}
	return leftPos;
}

/**
 */
function applyFrozenColumnStyle(element, column, context) {
	if (!frozenColumns.has(column) || column === ROW_NUMBER_COLUMN_KEY) {
		return;
	}
	element.dataset.frozen = 'true';
	if (column === context.lastFrozenColumn) {
		element.dataset.frozenLast = 'true';
	}
	element.style.left = `${calculateFrozenColumnLeft(column, context)}px`;
}

/**
 * @returns {HTMLTableColElement}
 */
function createColgroup(ctx) {
	const { displayColumns, columnLabels } = ctx;
	const colgroup = document.createElement('colgroup');

	for (const column of displayColumns) {
		const headerLabel = columnLabels.get(column) ?? column;
		const width = getColumnWidth(column, headerLabel);
		if (!(column in originalColumnWidths)) {
			originalColumnWidths[column] = Math.round(width);
		}
		const colElement = document.createElement('col');
		colElement.dataset.column = column;
		colElement.style.width = `${width}px`;
		colgroup.appendChild(colElement);
	}

	return colgroup;
}

/**
 * @returns {HTMLTableCellElement}
 */
function createHeaderCell(column, columnIndex, ctx) {
	const { columnLabels, columnLetters, columnOptions } = ctx;
	const th = document.createElement('th');
	const headerLabel = columnLabels.get(column) ?? column;

	th.dataset.column = column;
	th.dataset.columnIndex = String(columnIndex);
	th.style.width = `${getColumnWidth(column, headerLabel)}px`;
	th.style.minWidth = `${getMinColumnWidth(column)}px`;

	applyFrozenColumnStyle(th, column, ctx);

	if (column === ROW_NUMBER_COLUMN_KEY) {
		th.textContent = '#';
	} else {
		const wrapper = document.createElement('div');
		wrapper.className = 'kv-column-header';

		const letterButton = document.createElement('button');
		letterButton.type = 'button';
		letterButton.className = 'kv-column-letter';
		const letterText = document.createElement('span');
		letterText.className = 'kv-column-letter-text';
		letterText.textContent = columnLetters.get(column) ?? '';
		letterButton.appendChild(letterText);
		const letterIcon = document.createElement('span');
		letterIcon.className = 'codicon codicon-gripper kv-column-letter-icon';
		letterIcon.setAttribute('aria-hidden', 'true');
		letterButton.appendChild(letterIcon);

		if (columnIndex > 0) {
			letterButton.setAttribute('draggable', 'true');
			letterButton.setAttribute('aria-label', _tf('dragColumn', headerLabel));
			letterButton.addEventListener('dragstart', (event) => handleColumnDragStart(event, column, columnIndex, letterButton));
			letterButton.addEventListener('dragend', (event) => handleColumnDragEnd(event, letterButton));
			letterButton.addEventListener('mousedown', (event) => event.stopPropagation());
			letterButton.addEventListener('click', (event) => event.preventDefault());
			th.classList.add('kv-column-draggable');
		} else {
			letterButton.setAttribute('draggable', 'false');
			letterButton.setAttribute('aria-disabled', 'true');
			letterButton.tabIndex = -1;
			letterButton.addEventListener('mousedown', (event) => event.stopPropagation());
			letterButton.addEventListener('click', (event) => event.preventDefault());
		}

		const nameEl = document.createElement('span');
		nameEl.className = 'kv-column-name';
		const columnDesc = columnDescriptions[column];
		const displayLabel = (localizedMode && columnDesc?.label) ? columnDesc.label : headerLabel;
		const displayTooltip = (columnDesc?.description) ? columnDesc.description : headerLabel;
		nameEl.textContent = displayLabel;
		nameEl.title = displayTooltip;

		wrapper.appendChild(letterButton);

		const titleRow = document.createElement('div');
		titleRow.className = 'kv-column-header-title-row';
		titleRow.appendChild(nameEl);

		let formulaIndicator;
		if (columnFormulas.has(column)) {
			formulaIndicator = document.createElement('span');
			formulaIndicator.className = 'kv-column-formula-indicator';
			formulaIndicator.textContent = 'ƒ';
			formulaIndicator.title = _tf('columnFormula', columnFormulas.get(column));
		}

		const columnFieldConfig = columnOptions?.[column];
		const optionsButton = document.createElement('button');
		optionsButton.type = 'button';
		optionsButton.className = 'kv-column-options-button';
		optionsButton.title = _tf('editDropdownOptions', headerLabel);
		optionsButton.setAttribute('aria-label', _tf('editDropdownOptions', headerLabel));
		optionsButton.innerHTML = '<span class="codicon codicon-fold-down"></span>';
		optionsButton.addEventListener('mousedown', (event) => event.stopPropagation());
		optionsButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			openColumnOptionsEditor({
				column,
				columnKey: column,
				columnName: headerLabel,
				folderType: latestPayload?.folderType ?? 'custom',
				options: cloneColumnOptionEntries(columnFieldConfig?.options ?? []),
				multiple: columnFieldConfig?.multiple ?? false,
				separator: columnFieldConfig?.separator ?? '|',
			});
		});
		titleRow.appendChild(optionsButton);
		wrapper.appendChild(titleRow);
		if (formulaIndicator) {
			th.appendChild(formulaIndicator);
		}
		th.appendChild(wrapper);

		if (columnIndex >= 0) {
			th.addEventListener('contextmenu', (event) => {
				openColumnContextMenu(event, {
					targetElement: th,
					columnKey: column,
					columnIndex,
					columnName: headerLabel
				});
			});
			th.style.cursor = 'context-menu';
		}
	}

	if (columnIndex >= 0) {
		th.addEventListener('dragover', (event) => handleColumnDragOver(event, th, column, columnIndex));
		th.addEventListener('dragleave', (event) => handleColumnDragLeave(event, th));
		th.addEventListener('drop', (event) => handleColumnDrop(event, column));
	}

	const resizer = document.createElement('div');
	resizer.className = 'kv-resizer';
	resizer.addEventListener('mousedown', (event) => startColumnResize(event, column));
	th.appendChild(resizer);

	return th;
}

/**
 * @returns {HTMLTableSectionElement}
 */
function createTableHeader(columns, ctx) {
	const { displayColumns } = ctx;
	const thead = document.createElement('thead');
	const headRow = document.createElement('tr');

	for (const column of displayColumns) {
		const columnIndex = column === ROW_NUMBER_COLUMN_KEY ? -1 : columns.indexOf(column);
		const th = createHeaderCell(column, columnIndex, ctx);
		headRow.appendChild(th);
	}

	thead.appendChild(headRow);
	return thead;
}

function applySearchFilter(rows) {
	if (!tableSearchFilter) return rows;
	const q = tableSearchFilter;
	return rows.filter(row => {
		if ((row.id || '').toLowerCase().includes(q)) return true;
		if (row.values) {
			for (const val of Object.values(row.values)) {
				if (typeof val === 'string' && val.toLowerCase().includes(q)) return true;
			}
		}
		return false;
	});
}

function renderTable(columns, rows, columnOptions) {
	if (!tableSection) {
		return;
	}
	tableSection.classList.remove('kv-table-vertical');

	const filteredRows = applySearchFilter(rows);

	if (verticalMode && Array.isArray(columns) && Array.isArray(filteredRows) && filteredRows.length > 0) {
		return renderVerticalTable(columns, filteredRows, columnOptions);
	}
	return renderTableInner(columns, filteredRows, columnOptions);
}

function renderVerticalTable(columns, rows, columnOptions) {
	if (!tableSection) return;

	const scrollLeft = tableSection.scrollLeft;
	const scrollTop = tableSection.scrollTop;

	cleanupColumnDragState();
	closeRowContextMenu();
	let preservePending = Boolean(pendingMultiSelectReopen);
	if (!preservePending && openMultiSelectContext && openMultiSelectContext.isMulti) {
		const reopenColumn = openMultiSelectContext.select?.dataset.key ?? '';
		const reopenRowId = openMultiSelectContext.select?.dataset.id ?? '';
		const reopenRowIndex = openMultiSelectContext.td?.dataset.rowIndex ?? '';
		if (reopenColumn && reopenRowId) {
			pendingMultiSelectReopen = {
				column: reopenColumn,
				rowId: reopenRowId,
				rowIndex: reopenRowIndex
			};
			preservePending = true;
		}
	}
	closeMultiSelectDropdown({ preservePending });

	const ctx = createRenderContext(columns, rows, columnOptions);
	const { texturePreviewMap, scriptSupport, columnLabels, columnLetters } = ctx;

	// Reorder: id first, then BaseClass, AbilityBehavior, AbilityTextureName, then rest
	const priorityOrder = ['_comment', 'id', 'BaseClass', 'ScriptFile', 'AbilityTextureName', 'AbilityBehavior', 'AbilityUnitTargetTeam', 'AbilityUnitTargetType', 'AbilityUnitTargetFlags', 'AbilityCooldown', 'AbilityManaCost', 'AbilityCastRange', 'AbilityCastPoint', 'AbilityValues'];
	const otherProps = columns.filter(c => !priorityOrder.includes(c));
	const props = [...priorityOrder.filter(p => columns.includes(p)), ...otherProps];

	tableSection.innerHTML = '';
	const table = document.createElement('table');
	table.style.tableLayout = 'fixed';

	// colgroup: first col = row number, second = property name (auto-fit), then one col per entry
	const maxPropLength = Math.max(...props.map(p => p.length), 8);
	const propNameWidth = Math.max(120, maxPropLength * 8 + 16);
	const colgroup = document.createElement('colgroup');
	const propCol = document.createElement('col');
	propCol.style.width = '50px';
	colgroup.appendChild(propCol);
	const propNameCol = document.createElement('col');
	propNameCol.style.width = `${propNameWidth}px`;
	colgroup.appendChild(propNameCol);
	for (const row of rows) {
		const col = document.createElement('col');
		col.style.width = '200px';
		colgroup.appendChild(col);
	}
	table.appendChild(colgroup);

	// thead: # | Property | Entry 1 | Entry 2 | ...
	const thead = document.createElement('thead');
	const headRow = document.createElement('tr');
	const thNum = document.createElement('th');
	thNum.textContent = '#';
	thNum.classList.add('kv-col-header');
	headRow.appendChild(thNum);
	const thProp = document.createElement('th');
	thProp.textContent = 'Property';
	thProp.classList.add('kv-col-header');
	headRow.appendChild(thProp);
	rows.forEach((entry, i) => {
		const th = document.createElement('th');
		th.classList.add('kv-col-header', 'kv-entry-header');
		const span = document.createElement('span');
		span.textContent = `Entry ${i + 1}`;
		th.appendChild(span);
		const deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.className = 'kv-entry-delete-btn';
		deleteBtn.title = `Delete ${entry.id || `Entry ${i + 1}`}`;
		const deleteIcon = document.createElement('span');
		deleteIcon.className = 'codicon codicon-trash';
		deleteBtn.appendChild(deleteIcon);
		deleteBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			const name = entry.id || `Entry ${i + 1}`;
			if (confirm(`Delete "${name}"?`)) {
				vscode.postMessage({
					type: 'deleteRow',
					payload: { rowId: entry.id, rowIndex: i }
				});
			}
		});
		th.appendChild(deleteBtn);
		headRow.appendChild(th);
	});
	thead.appendChild(headRow);
	table.appendChild(thead);

	// tbody: one row per property
	const tbody = document.createElement('tbody');
	props.forEach((prop, propIndex) => {
		const tr = document.createElement('tr');
		tr.classList.add('kv-row');
		// Row number
		const tdNum = document.createElement('td');
		tdNum.classList.add('kv-row-index');
		tdNum.textContent = String(propIndex + 1);
		tr.appendChild(tdNum);
		// Property name
		const tdProp = document.createElement('td');
		tdProp.classList.add('kv-col-header');
		tdProp.style.fontWeight = '500';
		tdProp.textContent = prop;
		tdProp.title = prop;
		tr.appendChild(tdProp);

		// Cell for each entry — render same as horizontal
		rows.forEach((row, rowIndex) => {
			const td = document.createElement('td');
			const column = prop;
			td.dataset.column = column;
			td.dataset.rowId = row.id ?? '';
			td.dataset.rowIndex = String(rowIndex);

			const columnLetter = ctx.columnLetters?.get(column) ?? column;
			const columnName = ctx.columnLabels?.get(column) ?? column;
			const fieldConfig = columnOptions?.[column];
			const usesDropdown = Boolean(fieldConfig?.options?.length);

			if (column === 'id') {
				td.classList.add('kv-cell-id');
				const idValue = row.id ?? '';
				const input = createInput({
					type: 'text',
					value: idValue,
					attributes: {
						dataset: {
							id: idValue,
							key: 'id',
							rowIndex: String(rowIndex),
							initialValue: idValue
						}
					}
				});
				input.title = idValue;
				input.style.fontWeight = '600';
				input.addEventListener('change', () => handleElementChange(input, undefined));
				input.addEventListener('focus', () => {
					activeCell = { id: idValue, key: 'id' };
					selectCell(td, {
						column: 'id', columnLetter, columnName,
						rowId: idValue, rowIndex,
						editable: true, element: input,
						value: input.value
					});
				});
				input.addEventListener('keydown', (event) => {
					if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
					else if (event.key === 'Escape') { event.preventDefault(); setElementValue(input, input.dataset.initialValue ?? '', undefined); input.blur(); }
				});
				// Show texture preview if available
				const preview = ctx.texturePreviewMap?.[idValue];
				if (preview && preview.uri) {
					const img = document.createElement('img');
					img.src = preview.uri;
					img.style.width = '20px';
					img.style.height = '20px';
					img.style.verticalAlign = 'middle';
					img.style.marginRight = '4px';
					img.style.borderRadius = '3px';
					td.appendChild(img);
				}
				td.appendChild(input);
				tr.appendChild(td);
				return;
			}

			if (column === '_comment') {
				td.classList.add('kv-cell-comment');
				const commentValue = row.values?.['_comment'] ?? '';
				const input = createInput({
					type: 'text',
					value: commentValue,
					attributes: {
						placeholder: '// comment...',
						dataset: {
							id: row.id ?? '',
							key: '_comment',
							rowIndex: String(rowIndex),
							initialValue: commentValue
						}
					}
				});
				input.addEventListener('change', () => handleElementChange(input, undefined));
				input.addEventListener('focus', () => {
					activeCell = { id: row.id ?? '', key: '_comment' };
					selectCell(td, {
						column: '_comment', columnLetter, columnName,
						rowId: row.id ?? '', rowIndex,
						editable: true, element: input,
						value: input.value
					});
				});
				input.addEventListener('keydown', (event) => {
					if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
					else if (event.key === 'Escape') { event.preventDefault(); setElementValue(input, input.dataset.initialValue ?? '', undefined); input.blur(); }
				});
				td.appendChild(input);
				tr.appendChild(td);
				return;
			}

			const rawValue = row.values?.[column];
			const displayValue = getCellDisplayValue(rowIndex, row.id ?? '', column, rawValue);
			const formulaDefinition = getFormulaDefinition(column, row.id ?? '', rowIndex);
			const computedEntry = getComputedFormulaEntry(column, rowIndex);
			const _colInputType = getColumnInputType(column);

			if (_colInputType === 'checkbox') {
				td.classList.add('kv-cell-checkbox');
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.className = 'kv-checkbox-input';
				checkbox.checked = displayValue === '1';
				checkbox.dataset.id = row.id ?? '';
				checkbox.dataset.key = column;
				checkbox.dataset.rowIndex = String(rowIndex);
				checkbox.addEventListener('change', () => {
					const newValue = checkbox.checked ? '1' : '0';
					vscode.postMessage({ type: 'edit', payload: { id: row.id, key: column, value: newValue } });
				});
				td.addEventListener('click', (event) => {
					if (event.target !== checkbox) {
						checkbox.checked = !checkbox.checked;
						checkbox.dispatchEvent(new Event('change'));
					}
				});
				td.appendChild(checkbox);
			} else if (_colInputType === 'number') {
				const input = createInput({
					type: 'text',
					value: displayValue,
					attributes: {
						dataset: {
							id: row.id ?? '',
							key: column,
							rowIndex: String(rowIndex),
							initialValue: displayValue
						}
					}
				});
				input.className = 'kv-cell-input kv-cell-number';
				input.addEventListener('input', () => {
					input.value = input.value.replace(/[^0-9\-]/g, '');
				});
				input.addEventListener('change', () => {
					handleElementChange(input, undefined);
				});
				input.addEventListener('focus', () => {
					activeCell = { id: row.id ?? '', key: column };
					selectCell(td, {
						column, columnLetter, columnName,
						rowId: row.id ?? '', rowIndex,
						editable: true, element: input,
						value: input.value
					});
				});
				input.addEventListener('keydown', (event) => {
					if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
					else if (event.key === 'Escape') { event.preventDefault(); setElementValue(input, input.dataset.initialValue ?? '', undefined); input.blur(); }
				});
				td.appendChild(input);
			} else if (_colInputType === 'spinner') {
				td.classList.add('kv-cell-spinner');
				const wrapper = document.createElement('div');
				wrapper.className = 'kv-spinner-wrapper';
				const minusBtn = document.createElement('button');
				minusBtn.type = 'button';
				minusBtn.className = 'kv-spinner-btn kv-spinner-minus';
				minusBtn.textContent = '\u2212';
				const display = document.createElement('span');
				display.className = 'kv-spinner-value';
				display.textContent = displayValue || '0';
				const plusBtn = document.createElement('button');
				plusBtn.type = 'button';
				plusBtn.className = 'kv-spinner-btn kv-spinner-plus';
				plusBtn.textContent = '+';
				const updateSpinner = (delta) => {
					const current = parseInt(display.textContent || '0', 10) || 0;
					const next = Math.max(0, current + delta);
					display.textContent = String(next);
					vscode.postMessage({ type: 'edit', payload: { id: row.id, key: column, value: String(next) } });
				};
				minusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateSpinner(-1); });
				plusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateSpinner(1); });
				wrapper.appendChild(minusBtn);
				wrapper.appendChild(display);
				wrapper.appendChild(plusBtn);
				td.appendChild(wrapper);
			} else if (column === 'AbilityValues') {
				applyFormulaDecorations(td, undefined, undefined);
				td.classList.add('kv-ability-values-cell');
				td.tabIndex = 0;
				const hasAbilityField = row.values && Object.prototype.hasOwnProperty.call(row.values, column);
				const populated = populateAbilityValuesCell(td, row.abilityValues, hasAbilityField);
				const getAbilityContext = () => {
					const entries = parseAbilityEntriesFromCell(td);
					const hasField = td.dataset.hasAbilityField === 'true';
					const display = td.dataset.displayValue ?? populated.displayValue;
					return { entries, hasField, display };
				};
				const setSelection = () => {
					const abilityContext = getAbilityContext();
					selectCell(td, {
						column,
						columnLetter,
						columnName,
						rowId: row.id ?? '',
						rowIndex,
						editable: false,
						element: null,
						fieldConfig: undefined,
						usesDropdown: false,
						value: abilityContext.display,
						dataType: 'abilityValues',
						abilityEntries: abilityContext.entries,
						hasAbilityField: abilityContext.hasField,
					});
				};
				td.addEventListener('click', setSelection);
				td.addEventListener('focus', setSelection);
				td.addEventListener('keydown', (event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						setSelection();
						if (event.key === 'Enter' && !event.shiftKey) {
							const context = getAbilityContext();
							openAbilityValuesEditor({
								rowId: row.id ?? '',
								column,
								columnName,
								entries: context.entries,
							});
						}
					}
				});
				td.addEventListener('dblclick', () => {
					const context = getAbilityContext();
					openAbilityValuesEditor({
						rowId: row.id ?? '',
						column,
						columnName,
						entries: context.entries,
					});
				});
			} else if (usesDropdown) {
				const select = document.createElement('select');
				select.dataset.id = row.id ?? '';
				select.dataset.key = column;
				select.dataset.rowIndex = String(rowIndex);
				const isMultiSelect = Boolean(fieldConfig?.multiple);
				if (isMultiSelect) {
					select.multiple = true;
				}
				fieldConfig?.options.forEach((option) => {
					const optionEl = document.createElement('option');
					optionEl.value = option.value;
					optionEl.textContent = option.label;
					select.appendChild(optionEl);
				});
				setElementValue(select, displayValue, fieldConfig);
				const initialValue = readElementValue(select, fieldConfig);
				select.dataset.initialValue = initialValue;
				if (formulaDefinition) {
					select.dataset.formulaValue = formulaDefinition.formula;
				} else {
					delete select.dataset.formulaValue;
				}
				select.title = initialValue;
				const container = document.createElement('div');
				container.className = 'kv-select-cell';
				const display = document.createElement('div');
				display.className = 'kv-select-display';
				container.appendChild(display);
				container.appendChild(select);
				select.classList.add('kv-select-hidden');
				updateSelectDisplay(select, display, fieldConfig);
				td.appendChild(container);
				applyFormulaDecorations(td, formulaDefinition, computedEntry);
				td.dataset.displayValue = readElementValue(select, fieldConfig);
				if (isMultiSelect) {
					const updateSelection = () => {
						const currentValue = readElementValue(select, fieldConfig);
						activeCell = { id: row.id ?? '', key: column };
						selectCell(td, {
							column,
							columnLetter,
							columnName,
							rowId: row.id ?? '',
							rowIndex,
							editable: true,
							element: select,
							fieldConfig,
							usesDropdown: true,
							value: currentValue
						});
					};
					select.addEventListener('change', () => {
						handleElementChange(select, fieldConfig);
						updateSelectDisplay(select, display, fieldConfig);
					});
					td.addEventListener('click', () => {
						updateSelection();
					});
					td.addEventListener('dblclick', () => {
						updateSelection();
						openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
					});
				} else {
					const updateSelection = () => {
						const currentValue = readElementValue(select, fieldConfig);
						activeCell = { id: row.id ?? '', key: column };
						selectCell(td, {
							column,
							columnLetter,
							columnName,
							rowId: row.id ?? '',
							rowIndex,
							editable: true,
							element: select,
							fieldConfig,
							usesDropdown: true,
							value: currentValue
						});
					};
					select.addEventListener('change', () => {
						handleElementChange(select, fieldConfig);
						updateSelectDisplay(select, display, fieldConfig);
					});
					td.addEventListener('click', () => {
						updateSelection();
					});
					td.addEventListener('dblclick', () => {
						updateSelection();
						openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
					});
				}
				if (COLLAPSIBLE_COLUMNS.has(column)) {
					wrapCollapsibleCell(td, displayValue);
				}
			} else {
				const input = createInput({
					type: 'text',
					value: displayValue,
					attributes: {
						dataset: {
							id: row.id ?? '',
							key: column,
							rowIndex: String(rowIndex),
							initialValue: displayValue
						}
					}
				});

				if (formulaDefinition) {
					input.dataset.formulaValue = formulaDefinition.formula;
				} else {
					delete input.dataset.formulaValue;
				}
				input.title = input.value;
				const previewInfo = column === 'AbilityTextureName' && row.id ? texturePreviewMap[row.id] : undefined;
				const isScriptColumn = column === 'ScriptFile';
				const enableScriptAction = isScriptColumn && Boolean(scriptSupport?.applicable);
				let inlineWrapper = null;
				let hostElement = input;
				const ensureInlineWrapper = () => {
					if (!inlineWrapper) {
						inlineWrapper = document.createElement('div');
						inlineWrapper.className = 'kv-cell-inline';
						input.classList.add('kv-cell-inline-input');
						inlineWrapper.appendChild(input);
						hostElement = inlineWrapper;
					}
					return inlineWrapper;
				};
				if (column === 'AbilityTextureName') {
					const wrapper = ensureInlineWrapper();
					const preview = document.createElement('div');
					preview.className = 'kv-cell-preview kv-cell-preview-button';
					preview.tabIndex = 0;

					if (previewInfo && previewInfo.uri) {
						preview.dataset.type = previewInfo.kind === 'item' ? 'item' : 'spell';
						preview.dataset.source = previewInfo.source || '';
						const img = document.createElement('img');
						img.src = previewInfo.uri;
						img.alt = `${row.id ?? ''} icon`;
						img.draggable = false;
						if (previewInfo.fileName) {
							const tooltipParts = [previewInfo.fileName];
							if (previewInfo.source) {
								tooltipParts.push(previewInfo.source === 'addon' ? _t('projectResources') : _t('extensionResources'));
							}
							img.title = tooltipParts.join(' · ');
						}
						preview.appendChild(img);
					} else {
						preview.classList.add('kv-cell-preview-placeholder');
						const icon = document.createElement('span');
						icon.className = 'codicon codicon-file-media';
						icon.title = _t('selectIcon');
						preview.appendChild(icon);
					}

					const openMenu = (event) => {
						event.preventDefault();
						event.stopPropagation();
						openTextureMenu({
							input,
							folderType: latestPayload?.folderType ?? 'custom',
							currentValue: input.value ?? '',
							preferredKind: previewInfo?.kind ?? 'spell',
							rowId: row.id ?? '',
							column,
						});
					};
					preview.addEventListener('click', openMenu);
					preview.addEventListener('keydown', (event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							openMenu(event);
						}
					});
					wrapper.appendChild(preview);
				}
				let scriptButton = null;
				let updateScriptButtonState;
				if (enableScriptAction) {
					const wrapper = ensureInlineWrapper();
					const button = document.createElement('button');
					button.type = 'button';
					button.className = 'kv-cell-action kv-cell-action-script';
					const icon = document.createElement('span');
					icon.className = 'codicon codicon-go-to-file';
					button.appendChild(icon);
					const extensionLabel = scriptSupport.useTypescript ? '.ts' : '.lua';
					button.addEventListener('click', (event) => {
						event.preventDefault();
						event.stopPropagation();
						requestOpenScriptFile(input.value ?? '');
					});
					button.addEventListener('keydown', (event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							event.stopPropagation();
							requestOpenScriptFile(input.value ?? '');
						}
					});
					wrapper.appendChild(button);
					scriptButton = button;
					updateScriptButtonState = () => {
						if (!scriptButton) {
							return;
						}
						const hasValue = Boolean((input.value || '').trim());
						if (!scriptSupport.baseReady) {
							scriptButton.disabled = true;
							scriptButton.title = _t('scriptDirNotConfigured');
						} else if (!hasValue) {
							scriptButton.disabled = true;
							scriptButton.title = _t('enterScriptPath');
						} else {
							scriptButton.disabled = false;
							scriptButton.title = _tf('openScriptFile', extensionLabel);
						}
					};
					updateScriptButtonState();
					input.addEventListener('input', updateScriptButtonState);
				}
				applyFormulaDecorations(td, formulaDefinition, computedEntry);
				td.dataset.displayValue = input.value ?? '';
				const updateSelection = () => {
					selectCell(td, {
						column,
						columnLetter,
						columnName,
						rowId: row.id ?? '',
						rowIndex,
						editable: true,
						element: input,
						fieldConfig: undefined,
						usesDropdown: false,
						value: input.value
					});
				};
				input.addEventListener('focus', () => {
					activeCell = { id: row.id ?? '', key: column };
					const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
					if (formulaDef && formulaDef.formula) {
						const currentValue = input.value ?? '';
						if (!currentValue.startsWith('=')) {
							setElementValue(input, formulaDef.formula, undefined);
						}
					}
					updateSelection();
				});
				input.addEventListener('blur', () => {
					activeCell = undefined;
					setTimeout(() => {
						const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
						if (formulaDef && formulaDef.formula) {
							const currentValue = input.value ?? '';
							if (currentValue.trim() === formulaDef.formula.trim()) {
								const computed = getComputedFormulaEntry(column, rowIndex);
								if (computed && typeof computed.value === 'string') {
									setElementValue(input, computed.value, undefined);
									input.dataset.initialValue = computed.value;
								}
							}
						}
					}, 0);
				});
				input.addEventListener('change', () => {
					handleElementChange(input, undefined);
					if (updateScriptButtonState) {
						updateScriptButtonState();
					}
				});
				input.addEventListener('mousedown', (event) => {
					if (document.activeElement === input) {
						return;
					}
					if (document.activeElement instanceof HTMLElement && document.activeElement !== input) {
						document.activeElement.blur();
					}
					if (event.detail === 1) {
						event.preventDefault();
						updateSelection();
					}
				});
				input.addEventListener('keydown', (event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						event.currentTarget?.blur();
					} else if (event.key === 'Escape') {
						event.preventDefault();
						const original = input.dataset.initialValue ?? '';
						setElementValue(input, original, undefined);
						input.blur();
					}
				});
				td.appendChild(hostElement);
				td.addEventListener('click', (event) => {
					if (event.target instanceof HTMLInputElement) {
						return;
					}
					if (document.activeElement instanceof HTMLElement) {
						document.activeElement.blur();
					}
					updateSelection();
				});
				td.addEventListener('dblclick', () => {
					input.focus();
					input.select();
				});
			}

			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);
	tableSection.innerHTML = '';
	tableSection.appendChild(table);
	refreshTableWidth();
	updateRowSelectionVisuals();
	restoreSelection(columnLabels, columnLetters, columnOptions);
	restoreActiveCell();
	if (pendingMultiSelectReopen) {
		const { column, rowIndex, rowId } = pendingMultiSelectReopen;
		let td = null;
		if (column !== undefined && rowIndex !== undefined && rowIndex !== '') {
			const selector = `td[data-column="${column}"][data-row-index="${rowIndex}"]`;
			td = tableSection.querySelector(selector);
		}
		if (!td && column !== undefined && rowId) {
			const safeRowId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(rowId) : rowId.replace(/"/g, '\\"');
			const selector = `td[data-column="${column}"][data-row-id="${safeRowId}"]`;
			td = tableSection.querySelector(selector);
		}
		const fieldConfig = columnOptions?.[column];
		const select = td?.querySelector('select');
		const display = td?.querySelector('.kv-select-display');
		if (td && select && display && fieldConfig?.multiple) {
			const columnName = columnLabels.get(column) ?? column;
			openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
		}
		pendingMultiSelectReopen = null;
	}

	if (tableSection) {
		tableSection.scrollLeft = scrollLeft;
		tableSection.scrollTop = scrollTop;
	}
}

function renderTableInner(columns, rows, columnOptions) {
	if (!tableSection) {
		return;
	}
	const scrollLeft = tableSection.scrollLeft;
	const scrollTop = tableSection.scrollTop;

	cleanupColumnDragState();
	closeRowContextMenu();
	let preservePending = Boolean(pendingMultiSelectReopen);
	if (!preservePending && openMultiSelectContext && openMultiSelectContext.isMulti) {
		const reopenColumn = openMultiSelectContext.select?.dataset.key ?? '';
		const reopenRowId = openMultiSelectContext.select?.dataset.id ?? '';
		const reopenRowIndex = openMultiSelectContext.td?.dataset.rowIndex ?? '';
		if (reopenColumn && reopenRowId) {
			pendingMultiSelectReopen = {
				column: reopenColumn,
				rowId: reopenRowId,
				rowIndex: reopenRowIndex
			};
			preservePending = true;
		}
	}
	closeMultiSelectDropdown({ preservePending });

	const ctx = createRenderContext(columns, rows, columnOptions);
	const { displayColumns, columnLabels, columnLetters, texturePreviewMap, scriptSupport } = ctx;

	const table = document.createElement('table');
	const colgroup = createColgroup(ctx);
	table.appendChild(colgroup);
	const thead = createTableHeader(columns, ctx);

	const tbody = document.createElement('tbody');
	tbody.addEventListener('dragover', (event) => handleRowContainerDragOver(event, tbody));
	tbody.addEventListener('dragleave', (event) => handleRowContainerDragLeave(event, tbody));
	tbody.addEventListener('drop', (event) => handleRowContainerDrop(event, tbody));

	const fragment = document.createDocumentFragment();
	rows.forEach((row, rowIndex) => {
		const tr = document.createElement('tr');
		tr.classList.add('kv-row');
		tr.dataset.rowId = row.id ?? '';
		tr.dataset.rowIndex = String(rowIndex);
		for (const column of displayColumns) {
			const td = document.createElement('td');
			td.dataset.column = column;
			td.dataset.rowId = row.id ?? '';
			td.dataset.rowIndex = String(rowIndex);
			td.style.width = `${getColumnWidth(column, columnLabels.get(column) ?? column)}px`;

			applyFrozenColumnStyle(td, column, ctx);
			const columnLetter = columnLetters.get(column) ?? column;
			const columnName = columnLabels.get(column) ?? column;
			const fieldConfig = columnOptions?.[column];
			const usesDropdown = Boolean(fieldConfig?.options?.length);
			if (column === ROW_NUMBER_COLUMN_KEY) {
				td.classList.add('kv-row-index');
				td.dataset.draggable = row.id ? 'true' : 'false';
				if (row.id) {
					const dragBtn = document.createElement('button');
					dragBtn.type = 'button';
					dragBtn.className = 'kv-row-drag-btn';
					dragBtn.setAttribute('aria-label', _t('dragReorder'));
					const icon = document.createElement('span');
					icon.className = 'codicon codicon-gripper';
					dragBtn.appendChild(icon);
					dragBtn.draggable = true;
					dragBtn.addEventListener('dragstart', (event) => handleRowDragStart(event, row.id, rowIndex, rows.length));
					dragBtn.addEventListener('dragend', handleRowDragEnd);
					dragBtn.addEventListener('mousedown', (event) => event.stopPropagation());
					dragBtn.addEventListener('click', (event) => event.preventDefault());
					td.appendChild(dragBtn);
				}
				const indexLabel = document.createElement('span');
				indexLabel.className = 'kv-row-index-label';
				indexLabel.textContent = String(rowIndex + 1);
				td.appendChild(indexLabel);
				td.addEventListener('click', (event) => {
					event.preventDefault();
					event.stopPropagation();
					toggleRowSelection(rowIndex, event.ctrlKey || event.metaKey, event.shiftKey);
				});
				td.addEventListener('contextmenu', (event) => {
					openRowContextMenu(event, {
						targetElement: td,
						rowIndex,
						rowId: row.id ?? '',
						menuName: 'row-index'
					});
				});
			} else if (column === 'id') {
				td.classList.add('kv-cell-id');
				const displayValue = getCellDisplayValue(rowIndex, row.id ?? '', column, row.id ?? '');
				const formulaDefinition = getFormulaDefinition(column, row.id ?? '', rowIndex);
				const computedEntry = getComputedFormulaEntry(column, rowIndex);
				const input = createInput({
					type: 'text',
					value: displayValue,
					attributes: {
						dataset: {
							id: row.id ?? '',
							key: column,
							rowIndex: String(rowIndex),
							initialValue: displayValue
						}
					}
				});

				if (formulaDefinition) {
					input.dataset.formulaValue = formulaDefinition.formula;
				} else {
					delete input.dataset.formulaValue;
				}
				input.title = input.value;
				applyFormulaDecorations(td, formulaDefinition, computedEntry);
				td.dataset.displayValue = displayValue;
				td.appendChild(input);
				input.addEventListener('change', () => handleElementChange(input, undefined));
				input.addEventListener('focus', (event) => {
					activeCell = { id: row.id ?? '', key: column };
					const isFormula = typeof input.dataset.formulaValue === 'string' && input.dataset.formulaValue.length > 0;
					if (isFormula) {
						setElementValue(input, input.dataset.formulaValue, undefined);
					}
					setTimeout(() => {
						input.select();
					}, 0);
				});
				input.addEventListener('blur', (event) => {
					const isFormula = typeof input.dataset.formulaValue === 'string' && input.dataset.formulaValue.length > 0;
					if (isFormula) {
						const displayVal = getCellDisplayValue(rowIndex, row.id ?? '', column, input.dataset.initialValue ?? '');
						setElementValue(input, displayVal, undefined);
					}
				});
				input.addEventListener('mousedown', (event) => {
					if (document.activeElement !== input) {
						input.blur();
					}
				});
				td.addEventListener('click', () => {
					selectCell(td, {
						column,
						columnLetter,
						columnName,
						rowId: row.id ?? '',
						rowIndex,
						editable: true,
						element: input,
						fieldConfig: undefined,
						usesDropdown: false,
						value: displayValue
					});
				});
				td.addEventListener('dblclick', () => {
					input.focus();
					input.select();
				});
			} else {
				const rawValue = row.values?.[column];
				const displayValue = getCellDisplayValue(rowIndex, row.id ?? '', column, rawValue);
				const formulaDefinition = getFormulaDefinition(column, row.id ?? '', rowIndex);
				const computedEntry = getComputedFormulaEntry(column, rowIndex);
				const _colInputType = getColumnInputType(column);

				if (_colInputType === 'checkbox') {
					td.classList.add('kv-cell-checkbox');
					const checkbox = document.createElement('input');
					checkbox.type = 'checkbox';
					checkbox.className = 'kv-checkbox-input';
					checkbox.checked = displayValue === '1';
					checkbox.dataset.id = row.id ?? '';
					checkbox.dataset.key = column;
					checkbox.dataset.rowIndex = String(rowIndex);
					checkbox.addEventListener('change', () => {
						const newValue = checkbox.checked ? '1' : '0';
						vscode.postMessage({ type: 'edit', payload: { id: row.id, key: column, value: newValue } });
					});
					td.addEventListener('click', (event) => {
						if (event.target !== checkbox) {
							checkbox.checked = !checkbox.checked;
							checkbox.dispatchEvent(new Event('change'));
						}
					});
					td.appendChild(checkbox);
				} else if (_colInputType === 'number') {
					const input = createInput({
						type: 'text',
						value: displayValue,
						attributes: {
							dataset: {
								id: row.id ?? '',
								key: column,
								rowIndex: String(rowIndex),
								initialValue: displayValue
							}
						}
					});
					input.className = 'kv-cell-input kv-cell-number';
					input.addEventListener('input', () => {
						input.value = input.value.replace(/[^0-9\-]/g, '');
					});
					input.addEventListener('change', () => {
						handleElementChange(input, undefined);
					});
					input.addEventListener('focus', () => {
						activeCell = { id: row.id ?? '', key: column };
						selectCell(td, {
							column, columnLetter, columnName,
							rowId: row.id ?? '', rowIndex,
							editable: true, element: input,
							value: input.value
						});
					});
					input.addEventListener('keydown', (event) => {
						if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
						else if (event.key === 'Escape') { event.preventDefault(); setElementValue(input, input.dataset.initialValue ?? '', undefined); input.blur(); }
					});
					td.appendChild(input);
				} else if (_colInputType === 'spinner') {
					td.classList.add('kv-cell-spinner');
					const wrapper = document.createElement('div');
					wrapper.className = 'kv-spinner-wrapper';
					const minusBtn = document.createElement('button');
					minusBtn.type = 'button';
					minusBtn.className = 'kv-spinner-btn kv-spinner-minus';
					minusBtn.textContent = '\u2212';
					const display = document.createElement('span');
					display.className = 'kv-spinner-value';
					display.textContent = displayValue || '0';
					const plusBtn = document.createElement('button');
					plusBtn.type = 'button';
					plusBtn.className = 'kv-spinner-btn kv-spinner-plus';
					plusBtn.textContent = '+';
					const updateSpinner = (delta) => {
						const current = parseInt(display.textContent || '0', 10) || 0;
						const next = Math.max(0, current + delta);
						display.textContent = String(next);
						vscode.postMessage({ type: 'edit', payload: { id: row.id, key: column, value: String(next) } });
					};
					minusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateSpinner(-1); });
					plusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateSpinner(1); });
					wrapper.appendChild(minusBtn);
					wrapper.appendChild(display);
					wrapper.appendChild(plusBtn);
					td.appendChild(wrapper);
				} else if (column === 'AbilityValues') {
					applyFormulaDecorations(td, undefined, undefined);
					td.classList.add('kv-ability-values-cell');
					td.tabIndex = 0;
					const hasAbilityField = row.values && Object.prototype.hasOwnProperty.call(row.values, column);
					const populated = populateAbilityValuesCell(td, row.abilityValues, hasAbilityField);
					const getAbilityContext = () => {
						const entries = parseAbilityEntriesFromCell(td);
						const hasField = td.dataset.hasAbilityField === 'true';
						const display = td.dataset.displayValue ?? populated.displayValue;
						return { entries, hasField, display };
					};
					const setSelection = () => {
						const abilityContext = getAbilityContext();
						selectCell(td, {
							column,
							columnLetter,
							columnName,
							rowId: row.id ?? '',
							rowIndex,
							editable: false,
							element: null,
							fieldConfig: undefined,
							usesDropdown: false,
							value: abilityContext.display,
							dataType: 'abilityValues',
							abilityEntries: abilityContext.entries,
							hasAbilityField: abilityContext.hasField,
						});
					};
					td.addEventListener('click', setSelection);
					td.addEventListener('focus', setSelection);
					td.addEventListener('keydown', (event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							setSelection();
							if (event.key === 'Enter' && !event.shiftKey) {
								const context = getAbilityContext();
								openAbilityValuesEditor({
									rowId: row.id ?? '',
									column,
									columnName,
									entries: context.entries,
								});
							}
						}
					});
					td.addEventListener('dblclick', () => {
						const context = getAbilityContext();
						openAbilityValuesEditor({
							rowId: row.id ?? '',
							column,
							columnName,
							entries: context.entries,
						});
					});
				} else if (usesDropdown) {
					const select = document.createElement('select');
					select.dataset.id = row.id ?? '';
					select.dataset.key = column;
					select.dataset.rowIndex = String(rowIndex);
					const isMultiSelect = Boolean(fieldConfig?.multiple);
					if (isMultiSelect) {
						select.multiple = true;
					}
					fieldConfig?.options.forEach((option) => {
						const optionEl = document.createElement('option');
						optionEl.value = option.value;
						optionEl.textContent = option.label;
						select.appendChild(optionEl);
					});
					setElementValue(select, displayValue, fieldConfig);
					const initialValue = readElementValue(select, fieldConfig);
					select.dataset.initialValue = initialValue;
					if (formulaDefinition) {
						select.dataset.formulaValue = formulaDefinition.formula;
					} else {
						delete select.dataset.formulaValue;
					}
					select.title = initialValue;
					const container = document.createElement('div');
					container.className = 'kv-select-cell';
					const display = document.createElement('div');
					display.className = 'kv-select-display';
					container.appendChild(display);
					container.appendChild(select);
					select.classList.add('kv-select-hidden');
					updateSelectDisplay(select, display, fieldConfig);
					td.appendChild(container);
					applyFormulaDecorations(td, formulaDefinition, computedEntry);
					td.dataset.displayValue = readElementValue(select, fieldConfig);
					if (isMultiSelect) {
						const updateSelection = () => {
							const currentValue = readElementValue(select, fieldConfig);
							activeCell = { id: row.id ?? '', key: column };
							selectCell(td, {
								column,
								columnLetter,
								columnName,
								rowId: row.id ?? '',
								rowIndex,
								editable: true,
								element: select,
								fieldConfig,
								usesDropdown: true,
								value: currentValue
							});
						};
						select.addEventListener('change', () => {
							handleElementChange(select, fieldConfig);
							updateSelectDisplay(select, display, fieldConfig);
						});
						td.addEventListener('click', () => {
							updateSelection();
						});
						td.addEventListener('dblclick', () => {
							updateSelection();
							openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
						});
					} else {
						const updateSelection = () => {
							const currentValue = readElementValue(select, fieldConfig);
							activeCell = { id: row.id ?? '', key: column };
							selectCell(td, {
								column,
								columnLetter,
								columnName,
								rowId: row.id ?? '',
								rowIndex,
								editable: true,
								element: select,
								fieldConfig,
								usesDropdown: true,
								value: currentValue
							});
						};
						select.addEventListener('change', () => {
							handleElementChange(select, fieldConfig);
							updateSelectDisplay(select, display, fieldConfig);
						});
						td.addEventListener('click', () => {
							updateSelection();
						});
						td.addEventListener('dblclick', () => {
							updateSelection();
							openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
						});
					}
					if (COLLAPSIBLE_COLUMNS.has(column)) {
						wrapCollapsibleCell(td, displayValue);
					}
				} else {
					const input = createInput({
						type: 'text',
						value: displayValue,
						attributes: {
							dataset: {
								id: row.id ?? '',
								key: column,
								rowIndex: String(rowIndex),
								initialValue: displayValue
							}
						}
					});

					if (formulaDefinition) {
						input.dataset.formulaValue = formulaDefinition.formula;
					} else {
						delete input.dataset.formulaValue;
					}
					input.title = input.value;
					const previewInfo = column === 'AbilityTextureName' && row.id ? texturePreviewMap[row.id] : undefined;
					const isScriptColumn = column === 'ScriptFile';
					const enableScriptAction = isScriptColumn && Boolean(scriptSupport?.applicable);
					let inlineWrapper = null;
					let hostElement = input;
					const ensureInlineWrapper = () => {
						if (!inlineWrapper) {
							inlineWrapper = document.createElement('div');
							inlineWrapper.className = 'kv-cell-inline';
							input.classList.add('kv-cell-inline-input');
							inlineWrapper.appendChild(input);
							hostElement = inlineWrapper;
						}
						return inlineWrapper;
					};
					if (column === 'AbilityTextureName') {
						const wrapper = ensureInlineWrapper();
						const preview = document.createElement('div');
						preview.className = 'kv-cell-preview kv-cell-preview-button';
						preview.tabIndex = 0;

						if (previewInfo && previewInfo.uri) {
							preview.dataset.type = previewInfo.kind === 'item' ? 'item' : 'spell';
							preview.dataset.source = previewInfo.source || '';
							const img = document.createElement('img');
							img.src = previewInfo.uri;
							img.alt = `${row.id ?? ''} icon`;
							img.draggable = false;
							if (previewInfo.fileName) {
								const tooltipParts = [previewInfo.fileName];
								if (previewInfo.source) {
									tooltipParts.push(previewInfo.source === 'addon' ? _t('projectResources') : _t('extensionResources'));
								}
								img.title = tooltipParts.join(' · ');
							}
							preview.appendChild(img);
						} else {
							preview.classList.add('kv-cell-preview-placeholder');
							const icon = document.createElement('span');
							icon.className = 'codicon codicon-file-media';
							icon.title = _t('selectIcon');
							preview.appendChild(icon);
						}

						const openMenu = (event) => {
							event.preventDefault();
							event.stopPropagation();
							openTextureMenu({
								input,
								folderType: latestPayload?.folderType ?? 'custom',
								currentValue: input.value ?? '',
								preferredKind: previewInfo?.kind ?? 'spell',
								rowId: row.id ?? '',
								column,
							});
						};
						preview.addEventListener('click', openMenu);
						preview.addEventListener('keydown', (event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								openMenu(event);
							}
						});
						wrapper.appendChild(preview);
					}
					let scriptButton = null;
					let updateScriptButtonState;
					if (enableScriptAction) {
						const wrapper = ensureInlineWrapper();
						const button = document.createElement('button');
						button.type = 'button';
						button.className = 'kv-cell-action kv-cell-action-script';
						const icon = document.createElement('span');
						icon.className = 'codicon codicon-go-to-file';
						button.appendChild(icon);
						const extensionLabel = scriptSupport.useTypescript ? '.ts' : '.lua';
						button.addEventListener('click', (event) => {
							event.preventDefault();
							event.stopPropagation();
							requestOpenScriptFile(input.value ?? '');
						});
						button.addEventListener('keydown', (event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								event.stopPropagation();
								requestOpenScriptFile(input.value ?? '');
							}
						});
						wrapper.appendChild(button);
						scriptButton = button;
						updateScriptButtonState = () => {
							if (!scriptButton) {
								return;
							}
							const hasValue = Boolean((input.value || '').trim());
							if (!scriptSupport.baseReady) {
								scriptButton.disabled = true;
								scriptButton.title = _t('scriptDirNotConfigured');
							} else if (!hasValue) {
								scriptButton.disabled = true;
								scriptButton.title = _t('enterScriptPath');
							} else {
								scriptButton.disabled = false;
								scriptButton.title = _tf('openScriptFile', extensionLabel);
							}
						};
						updateScriptButtonState();
						input.addEventListener('input', updateScriptButtonState);
					}
					applyFormulaDecorations(td, formulaDefinition, computedEntry);
					td.dataset.displayValue = input.value ?? '';
					const updateSelection = () => {
						selectCell(td, {
							column,
							columnLetter,
							columnName,
							rowId: row.id ?? '',
							rowIndex,
							editable: true,
							element: input,
							fieldConfig: undefined,
							usesDropdown: false,
							value: input.value
						});
					};
					input.addEventListener('focus', () => {
						activeCell = { id: row.id ?? '', key: column };
						const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
						if (formulaDef && formulaDef.formula) {
							const currentValue = input.value ?? '';
							if (!currentValue.startsWith('=')) {
								setElementValue(input, formulaDef.formula, undefined);
							}
						}
						updateSelection();
					});
					input.addEventListener('blur', () => {
						activeCell = undefined;
						setTimeout(() => {
							const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
							if (formulaDef && formulaDef.formula) {
								const currentValue = input.value ?? '';
								if (currentValue.trim() === formulaDef.formula.trim()) {
									const computed = getComputedFormulaEntry(column, rowIndex);
									if (computed && typeof computed.value === 'string') {
										setElementValue(input, computed.value, undefined);
										input.dataset.initialValue = computed.value;
									}
								}
							}
						}, 0);
					});
					input.addEventListener('change', () => {
						handleElementChange(input, undefined);
						if (updateScriptButtonState) {
							updateScriptButtonState();
						}
					});
					input.addEventListener('mousedown', (event) => {
						if (document.activeElement === input) {
							return;
						}
						if (document.activeElement instanceof HTMLElement && document.activeElement !== input) {
							document.activeElement.blur();
						}
						if (event.detail === 1) {
							event.preventDefault();
							updateSelection();
						}
					});
					input.addEventListener('keydown', (event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							event.currentTarget?.blur();
						} else if (event.key === 'Escape') {
							event.preventDefault();
							const original = input.dataset.initialValue ?? '';
							setElementValue(input, original, undefined);
							input.blur();
						}
					});
					td.appendChild(hostElement);
					td.addEventListener('click', (event) => {
						if (event.target instanceof HTMLInputElement) {
							return;
						}
						if (document.activeElement instanceof HTMLElement) {
							document.activeElement.blur();
						}
						updateSelection();
					});
					td.addEventListener('dblclick', () => {
						input.focus();
						input.select();
					});
				}
			}
			tr.appendChild(td);
		}
		if (row.id) {
			tr.addEventListener('dragenter', (event) => handleRowDragEnter(event, tr));
			tr.addEventListener('dragover', (event) => handleRowDragOver(event, tr));
			tr.addEventListener('dragleave', () => handleRowDragLeave(tr));
			tr.addEventListener('drop', (event) => handleRowDrop(event, tr));
		}
		fragment.appendChild(tr);
	});
	tbody.appendChild(fragment);
	table.appendChild(thead);
	table.appendChild(tbody);
	tableSection.innerHTML = '';
	tableSection.appendChild(table);
	refreshTableWidth();
	updateRowSelectionVisuals();
	restoreSelection(columnLabels, columnLetters, columnOptions);
	restoreActiveCell();
	if (pendingMultiSelectReopen) {
		const { column, rowIndex, rowId } = pendingMultiSelectReopen;
		let td = null;
		if (column !== undefined && rowIndex !== undefined && rowIndex !== '') {
			const selector = `td[data-column="${column}"][data-row-index="${rowIndex}"]`;
			td = tableSection.querySelector(selector);
		}
		if (!td && column !== undefined && rowId) {
			const safeRowId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(rowId) : rowId.replace(/"/g, '\\"');
			const selector = `td[data-column="${column}"][data-row-id="${safeRowId}"]`;
			td = tableSection.querySelector(selector);
		}
		const fieldConfig = columnOptions?.[column];
		const select = td?.querySelector('select');
		const display = td?.querySelector('.kv-select-display');
		if (td && select && display && fieldConfig?.multiple) {
			const columnName = columnLabels.get(column) ?? column;
			openMultiSelectDropdown({ td, select, display, fieldConfig, columnName });
		}
		pendingMultiSelectReopen = null;
	}

	if (tableSection) {
		tableSection.scrollLeft = scrollLeft;
		tableSection.scrollTop = scrollTop;
	}

}

function cloneAbilityValuesEntries(entries) {
	if (!Array.isArray(entries)) {
		return [];
	}
	return entries.map((entry) => ({
		key: typeof entry?.key === 'string' ? entry.key : '',
		originalKey: typeof entry?.originalKey === 'string' && entry.originalKey.length ? entry.originalKey : (typeof entry?.key === 'string' ? entry.key : ''),
		value: typeof entry?.value === 'string' ? entry.value : '',
		type: entry?.type === 'scalar' ? 'scalar' : 'object',
		initialType: entry?.type === 'scalar' ? 'scalar' : 'object',
		modifiers: Array.isArray(entry?.modifiers)
			? entry.modifiers.map((modifier) => ({
				key: typeof modifier?.key === 'string' ? modifier.key : '',
				value: typeof modifier?.value === 'string' ? modifier.value : '',
			}))
			: [],
	}));
}

function cloneColumnOptionEntries(options) {
	if (!Array.isArray(options)) {
		return [];
	}
	return options.map((option) => {
		const value = typeof option?.value === 'string' ? option.value : '';
		const label = typeof option?.label === 'string' ? option.label : '';
		const description = typeof option?.description === 'string' ? option.description : '';
		const color = typeof option?.color === 'string' ? option.color : '';
		const hasFallbackFlag = option && typeof option === 'object' && Object.prototype.hasOwnProperty.call(option, 'labelIsFallback');
		const labelIsFallback = hasFallbackFlag ? option.labelIsFallback === true : false;
		return {
			value,
			label,
			description,
			color,
			labelIsFallback,
		};
	});
}

function createNewAbilityValuesEntry(existingEntries) {
	const usedKeys = new Set();
	(existingEntries || []).forEach((entry) => {
		if (entry && typeof entry.key === 'string') {
			usedKeys.add(entry.key.trim());
		}
	});
	let counter = (existingEntries?.length ?? 0) + 1;
	let candidate = '';
	do {
		candidate = `NewValue${counter}`;
		counter += 1;
	} while (usedKeys.has(candidate));
	return {
		key: candidate,
		originalKey: candidate,
		value: '',
		type: 'object',
		initialType: 'object',
		modifiers: [],
	};
}

function resetAbilityValuesEditorError() {
	if (!abilityValuesEditorState || !abilityValuesEditorState.errorEl) {
		return;
	}
	abilityValuesEditorState.errorEl.textContent = '';
	abilityValuesEditorState.errorEl.hidden = true;
}

function closeAbilityValuesEditor() {
	if (!abilityValuesEditorState) {
		return;
	}
	closeAutofillPopup();
	const { overlay, keyHandler } = abilityValuesEditorState;
	if (overlay && overlay.parentElement) {
		overlay.parentElement.removeChild(overlay);
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	document.body.classList.remove('kv-ability-editor-open');
	abilityValuesEditorState = null;
}

function closeRowContextMenu() {
	if (!rowContextMenuState) {
		return;
	}
	const { menu, outsideHandler, keyHandler, cleanupHandler } = rowContextMenuState;
	if (menu && menu.parentElement) {
		menu.parentElement.removeChild(menu);
	}
	if (outsideHandler) {
		document.removeEventListener('mousedown', outsideHandler, true);
		document.removeEventListener('contextmenu', outsideHandler, true);
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	if (cleanupHandler) {
		document.removeEventListener('scroll', cleanupHandler, true);
		window.removeEventListener('resize', cleanupHandler);
		window.removeEventListener('blur', cleanupHandler);
	}
	rowContextMenuState = null;
}

function closeColumnContextMenu() {
	if (!columnContextMenuState) {
		return;
	}
	const { menu, outsideHandler, keyHandler, cleanupHandler } = columnContextMenuState;
	if (menu && menu.parentElement) {
		menu.parentElement.removeChild(menu);
	}
	if (outsideHandler) {
		document.removeEventListener('mousedown', outsideHandler, true);
		document.removeEventListener('contextmenu', outsideHandler, true);
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	if (cleanupHandler) {
		document.removeEventListener('scroll', cleanupHandler, true);
		window.removeEventListener('resize', cleanupHandler);
		window.removeEventListener('blur', cleanupHandler);
	}
	columnContextMenuState = null;
}

function requestColumnInsertion(position, referenceKey, referenceIndex) {
	if (position !== 'before' && position !== 'after') {
		return;
	}
	if (!referenceKey || typeof referenceKey !== 'string') {
		return;
	}
	if (!Number.isFinite(referenceIndex) || referenceIndex < 0) {
		return;
	}

	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = position === 'before' ? _t('insertColumnLeft') : _t('insertColumnRight');
	form.appendChild(title);

	const label = document.createElement('label');
	label.textContent = _t('columnName');
	label.className = 'kv-column-insert-dialog-label';

	const input = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: _t('enterColumnName'),
		attributes: { required: true }
	});

	label.appendChild(input);
	form.appendChild(label);

	const errorEl = document.createElement('div');
	errorEl.className = 'kv-column-insert-dialog-error';
	errorEl.hidden = true;
	form.appendChild(errorEl);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = _t('cancel');
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = _t('insert');
	actions.appendChild(submitBtn);

	form.appendChild(actions);
	dialog.appendChild(form);

	const closeDialog = () => {
		if (dialog.parentElement) {
			dialog.parentElement.removeChild(dialog);
		}
	};

	const showError = (message) => {
		errorEl.textContent = message;
		errorEl.hidden = false;
	};

	const clearError = () => {
		errorEl.textContent = '';
		errorEl.hidden = true;
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const columnName = input.value.trim();
		if (!columnName) {
			showError(_t('columnNameEmpty'));
			return;
		}

		const existingColumns = latestPayload?.columns || [];
		if (existingColumns.includes(columnName) || columnName === 'id') {
			showError(_t('columnNameExists'));
			return;
		}

		if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)) {
			showError(_t('columnNameInvalid'));
			return;
		}

		vscode.postMessage({
			type: 'insertColumn',
			payload: {
				referenceKey,
				referenceIndex: Number(referenceIndex),
				position,
				columnName,
			},
		});

		closeDialog();
	});

	cancelBtn.addEventListener('click', closeDialog);

	input.addEventListener('input', clearError);

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeDialog();
		}
	};

	document.addEventListener('keydown', keyHandler, true);
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) {
			closeDialog();
		}
	});

	const originalRemove = dialog.remove;
	dialog.remove = function () {
		document.removeEventListener('keydown', keyHandler, true);
		originalRemove.call(this);
	};

	document.body.appendChild(dialog);

	requestAnimationFrame(() => {
		input.focus();
		input.select();
	});
}

function openAddPropertyDropdown() {
	const existing = document.querySelector('.kv-add-property-overlay');
	if (existing) existing.remove();

	const folderType = latestPayload?.folderType || 'custom';
	let allProps;
	if (folderType === 'item') {
		allProps = ITEM_PROPERTIES;
	} else if (folderType === 'ability') {
		allProps = ABILITY_PROPERTIES;
	} else {
		allProps = [...new Set([...ABILITY_PROPERTIES, ...ITEM_PROPERTIES])];
	}
	const existingColumns = latestPayload?.columns || [];
	const available = allProps.filter(p => !existingColumns.includes(p));

	const overlay = document.createElement('div');
	overlay.className = 'kv-add-property-overlay';

	const panel = document.createElement('div');
	panel.className = 'kv-add-property-panel';

	const searchInput = createInput({
		type: 'text',
		className: 'kv-add-property-search',
		placeholder: 'Search property...',
	});
	panel.appendChild(searchInput);

	const list = document.createElement('div');
	list.className = 'kv-add-property-list';

	const renderItems = (filter) => {
		list.innerHTML = '';
		const filtered = filter
			? available.filter(p => p.toLowerCase().includes(filter.toLowerCase()))
			: available;
		if (filtered.length === 0) {
			const empty = document.createElement('div');
			empty.className = 'kv-add-property-empty';
			empty.textContent = 'No properties found';
			list.appendChild(empty);
			return;
		}
		for (const prop of filtered) {
			const item = document.createElement('div');
			item.className = 'kv-add-property-item';
			item.textContent = prop;
			item.addEventListener('click', () => {
				const cols = latestPayload?.columns || [];
				const lastCol = cols.length > 0 ? cols[cols.length - 1] : 'id';
				const lastIndex = cols.indexOf(lastCol);
				vscode.postMessage({
					type: 'insertColumn',
					payload: {
						referenceKey: lastCol,
						referenceIndex: lastIndex,
						position: 'after',
						columnName: prop,
					},
				});
				overlay.remove();
			});
			list.appendChild(item);
		}
	};

	const addCustomProperty = (name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		if (existingColumns.includes(trimmed)) return;
		const cols = latestPayload?.columns || [];
		const lastCol = cols.length > 0 ? cols[cols.length - 1] : 'id';
		const lastIndex = cols.indexOf(lastCol);
		vscode.postMessage({
			type: 'insertColumn',
			payload: {
				referenceKey: lastCol,
				referenceIndex: lastIndex,
				position: 'after',
				columnName: trimmed,
			},
		});
		overlay.remove();
	};

	renderItems('');
	searchInput.addEventListener('input', () => renderItems(searchInput.value));
	searchInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const val = searchInput.value.trim();
			// If typed text matches exactly one item, add it; otherwise add as custom
			const filtered = available.filter(p => p.toLowerCase().includes(val.toLowerCase()));
			if (filtered.length === 1) {
				addCustomProperty(filtered[0]);
			} else if (val && !existingColumns.includes(val)) {
				addCustomProperty(val);
			}
		}
	});

	panel.appendChild(list);
	overlay.appendChild(panel);

	overlay.addEventListener('click', (event) => { if (event.target === overlay) overlay.remove(); });
	const keyHandler = (event) => { if (event.key === 'Escape') { event.preventDefault(); overlay.remove(); } };
	document.addEventListener('keydown', keyHandler, true);
	const originalRemove = overlay.remove;
	overlay.remove = function () { document.removeEventListener('keydown', keyHandler, true); originalRemove.call(this); };

	document.body.appendChild(overlay);
	requestAnimationFrame(() => searchInput.focus());
}

function requestColumnDeletion(columnKey) {
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}

	if (columnKey === 'id') {
		return;
	}

	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = _t('confirmDeleteColumn');
	form.appendChild(title);

	const message = document.createElement('div');
	message.className = 'kv-column-delete-message';
	message.textContent = _tf('confirmDeleteColumnMsg', columnKey);
	form.appendChild(message);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = _t('cancel');
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary kv-button-danger';
	submitBtn.textContent = _t('delete');
	actions.appendChild(submitBtn);

	form.appendChild(actions);
	dialog.appendChild(form);

	const closeDialog = () => {
		if (dialog.parentElement) {
			dialog.parentElement.removeChild(dialog);
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		vscode.postMessage({
			type: 'deleteColumn',
			payload: {
				columnKey,
			},
		});

		closeDialog();
	});

	cancelBtn.addEventListener('click', closeDialog);

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeDialog();
		}
	};

	document.addEventListener('keydown', keyHandler, true);
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) {
			closeDialog();
		}
	});

	const originalRemove = dialog.remove;
	dialog.remove = function () {
		document.removeEventListener('keydown', keyHandler, true);
		originalRemove.call(this);
	};

	document.body.appendChild(dialog);
	requestAnimationFrame(() => {
		submitBtn.focus();
	});
}

function requestColumnFormula(columnKey, columnName) {
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}

	const currentFormula = columnFormulas.get(columnKey) || '';

	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = _tf('setFormulaForColumn', columnName);
	form.appendChild(title);

	const formulaWrapper = document.createElement('label');
	formulaWrapper.textContent = _t('formula');
	formulaWrapper.className = 'kv-column-insert-dialog-label';

	const formulaInput = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: _t('formulaPlaceholder'),
		value: currentFormula
	});

	formulaWrapper.appendChild(formulaInput);
	form.appendChild(formulaWrapper);

	const hint = document.createElement('div');
	hint.className = 'kv-column-insert-dialog-hint';
	hint.textContent = _t('formulaColumnNote');
	form.appendChild(hint);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = _t('cancel');
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = _t('save');
	actions.appendChild(submitBtn);

	form.appendChild(actions);
	dialog.appendChild(form);

	const closeDialog = () => {
		if (dialog.parentElement) {
			dialog.remove();
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const formula = formulaInput.value.trim();
		setColumnFormula(columnKey, formula);

		vscode.postMessage({
			type: 'saveColumnFormula',
			payload: { columnKey, formula }
		});

		updatePayloadFormulasSnapshot();
		recalculateFormulas({ emitUpdates: true });
		refreshFormulaResultsForTable();

		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}

		closeDialog();
	});

	cancelBtn.addEventListener('click', closeDialog);

	document.body.appendChild(dialog);
	requestAnimationFrame(() => {
		formulaInput.focus();
		formulaInput.select();
	});
}

function requestColumnDescription(columnKey, columnName) {
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}

	const currentDesc = columnDescriptions[columnKey] || {};

	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = _tf('addDescForColumn', columnName);
	form.appendChild(title);

	const labelWrapper = document.createElement('label');
	labelWrapper.textContent = _t('displayLabel');
	labelWrapper.className = 'kv-column-insert-dialog-label';

	const labelInput = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: _t('localizedDisplayName'),
		value: currentDesc.label || ''
	});

	labelWrapper.appendChild(labelInput);
	form.appendChild(labelWrapper);

	const descWrapper = document.createElement('label');
	descWrapper.textContent = _t('tooltipDescLabel');
	descWrapper.className = 'kv-column-insert-dialog-label';

	const descInput = createTextarea({
		className: 'kv-column-insert-dialog-input kv-column-insert-dialog-textarea',
		placeholder: _t('tooltipDescription'),
		value: currentDesc.description || '',
		attributes: { rows: 3 }
	});

	descWrapper.appendChild(descInput);
	form.appendChild(descWrapper);

	const scopeWrapper = document.createElement('label');
	scopeWrapper.className = 'kv-column-insert-dialog-label kv-checkbox-wrapper';
	const scopeCheckbox = document.createElement('input');
	scopeCheckbox.type = 'checkbox';
	scopeCheckbox.className = 'kv-checkbox-input';
	scopeCheckbox.checked = true;
	scopeWrapper.appendChild(scopeCheckbox);
	const checkIndicator = document.createElement('span');
	checkIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	scopeWrapper.appendChild(checkIndicator);
	const scopeText = document.createElement('span');
	scopeText.className = 'kv-checkbox-label';
	scopeText.textContent = _t('applyCurrentFileOnly');
	scopeWrapper.appendChild(scopeText);
	form.appendChild(scopeWrapper);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = _t('cancel');
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = _t('save');
	actions.appendChild(submitBtn);

	form.appendChild(actions);
	dialog.appendChild(form);

	const closeDialog = () => {
		if (dialog.parentElement) {
			dialog.parentElement.removeChild(dialog);
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const label = labelInput.value.trim();
		const description = descInput.value.trim();

		if (!label && !description) {
			delete columnDescriptions[columnKey];
		} else {
			columnDescriptions[columnKey] = {
				label: label || undefined,
				description: description || undefined
			};
		}

		submitBtn.disabled = true;
		vscode.postMessage({
			type: 'saveColumnDescription',
			payload: {
				columnKey,
				label: label || undefined,
				description: description || undefined,
				scope: scopeCheckbox.checked ? 'file' : 'global'
			}
		});

		const statusEl = document.createElement('div');
		statusEl.className = 'kv-column-save-status';
		statusEl.textContent = scopeCheckbox.checked ? _t('savedToFile') : _t('savedToWorkspace');
		statusEl.style.marginTop = '8px';
		statusEl.style.color = '#3c763d';
		actions.appendChild(statusEl);

		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}

		setTimeout(() => {
			closeDialog();
		}, 900);
	});

	cancelBtn.addEventListener('click', closeDialog);

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeDialog();
		}
	};

	document.addEventListener('keydown', keyHandler, true);
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) {
			closeDialog();
		}
	});

	const originalRemove = dialog.remove;
	dialog.remove = function () {
		document.removeEventListener('keydown', keyHandler, true);
		originalRemove.call(this);
	};

	document.body.appendChild(dialog);
	requestAnimationFrame(() => {
		labelInput.focus();
		labelInput.select();
	});
}

function openColumnContextMenu(invocationEvent, context) {
	const resolvedContext = context ?? {};
	if (invocationEvent) {
		invocationEvent.preventDefault();
		invocationEvent.stopPropagation();
	}

	const { columnKey, columnIndex } = resolvedContext;
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}
	if (!Number.isFinite(columnIndex) || columnIndex < 0) {
		return;
	}

	if (columnKey === ROW_NUMBER_COLUMN_KEY) {
		return;
	}

	closeColumnContextMenu();
	closeRowContextMenu();
	closeMultiSelectDropdown();
	closeAbilityValuesEditor();

	const menu = document.createElement('div');
	menu.className = 'kv-column-context-menu';
	menu.setAttribute('role', 'menu');

	const isIdColumn = columnKey === 'id';

	const createMenuButton = ({ label, onClick, danger = false, disabled = false }) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = danger ? 'kv-column-context-menu-item kv-context-menu-item-danger' : 'kv-column-context-menu-item';
		button.textContent = label;
		if (disabled) {
			button.disabled = true;
		}
		if (!disabled && typeof onClick === 'function') {
			button.addEventListener('click', onClick);
		}
		return button;
	};

	const insertLeft = createMenuButton({
		label: _t('insertColumnLeft'),
		disabled: isIdColumn,
		onClick: () => {
			requestColumnInsertion('before', columnKey, columnIndex);
			closeColumnContextMenu();
		},
	});
	const insertRight = createMenuButton({
		label: _t('insertColumnRight'),
		onClick: () => {
			requestColumnInsertion('after', columnKey, columnIndex);
			closeColumnContextMenu();
		},
	});
	menu.appendChild(insertLeft);
	menu.appendChild(insertRight);

	const separator1 = document.createElement('div');
	separator1.className = 'kv-context-menu-separator';
	menu.appendChild(separator1);

	const isFrozen = frozenColumns.has(columnKey);
	const freezeButton = createMenuButton({
		label: isFrozen ? _t('unfreezeColumn') : _t('freezeColumn'),
		onClick: () => {
			let frozenColumnKey = null;
			if (isFrozen) {
				frozenColumns.clear();
			} else {
				frozenColumns.clear();
				if (latestPayload && latestPayload.columns) {
					const allColumns = latestPayload.columns;
					const targetIndex = allColumns.indexOf(columnKey);
					if (targetIndex >= 0) {
						for (let i = 0; i <= targetIndex; i++) {
							frozenColumns.add(allColumns[i]);
						}
						frozenColumnKey = columnKey;
					}
				}
			}
			vscode.postMessage({
				type: 'saveFrozenColumns',
				payload: { frozenColumns: frozenColumnKey }
			});
			if (latestPayload) {
				renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
			}
			closeColumnContextMenu();
		}
	});
	menu.appendChild(freezeButton);

	const separator2 = document.createElement('div');
	separator2.className = 'kv-context-menu-separator';
	menu.appendChild(separator2);

	const hasColumnFormula = columnFormulas.has(columnKey);
	const formulaButton = createMenuButton({
		label: hasColumnFormula ? _t('removeColumnFormula') : _t('addColumnFormula'),
		onClick: () => {
			if (hasColumnFormula) {
				setColumnFormula(columnKey, '');
				vscode.postMessage({
					type: 'saveColumnFormula',
					payload: { columnKey, formula: '' }
				});
				updatePayloadFormulasSnapshot();
				recalculateFormulas({ emitUpdates: true });
				refreshFormulaResultsForTable();
				if (latestPayload) {
					renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
				}
			} else {
				requestColumnFormula(columnKey, resolvedContext.columnName || columnKey);
			}
			closeColumnContextMenu();
		},
	});
	menu.appendChild(formulaButton);

	const descButton = createMenuButton({
		label: _t('addDescription'),
		onClick: () => {
			requestColumnDescription(columnKey, resolvedContext.columnName || columnKey);
			closeColumnContextMenu();
		},
	});
	menu.appendChild(descButton);

	const separator3 = document.createElement('div');
	separator3.className = 'kv-context-menu-separator';
	menu.appendChild(separator3);

	const deleteButton = createMenuButton({
		label: _t('deleteColumn'),
		danger: true,
		disabled: isIdColumn,
		onClick: () => {
			requestColumnDeletion(columnKey);
			closeColumnContextMenu();
		},
	});
	menu.appendChild(deleteButton);

	menu.addEventListener('contextmenu', (event) => event.preventDefault());
	document.body.appendChild(menu);

	const anchorElement = resolvedContext?.targetElement instanceof HTMLElement ? resolvedContext.targetElement : null;
	const anchorRect = anchorElement ? anchorElement.getBoundingClientRect() : null;
	const pointerX = invocationEvent?.clientX ?? (anchorRect ? anchorRect.left + (anchorRect.width / 2) : window.innerWidth / 2);
	const pointerY = invocationEvent?.clientY ?? (anchorRect ? anchorRect.top + (anchorRect.height / 2) : window.innerHeight / 2);

	const rect = menu.getBoundingClientRect();
	const margin = 8;
	let left = pointerX;
	let top = pointerY;

	if (left + rect.width > window.innerWidth - margin) {
		left = Math.max(margin, window.innerWidth - rect.width - margin);
	}
	if (top + rect.height > window.innerHeight - margin) {
		top = Math.max(margin, window.innerHeight - rect.height - margin);
	}
	left = Math.max(margin, left);
	top = Math.max(margin, top);

	menu.style.left = `${left}px`;
	menu.style.top = `${top}px`;

	const outsideHandler = (event) => {
		if (!menu.contains(event.target)) {
			closeColumnContextMenu();
		}
	};

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeColumnContextMenu();
		}
	};

	const cleanupHandler = () => closeColumnContextMenu();

	document.addEventListener('mousedown', outsideHandler, true);
	document.addEventListener('contextmenu', outsideHandler, true);
	document.addEventListener('keydown', keyHandler, true);
	document.addEventListener('scroll', cleanupHandler, true);
	window.addEventListener('resize', cleanupHandler);
	window.addEventListener('blur', cleanupHandler);

	columnContextMenuState = {
		menu,
		outsideHandler,
		keyHandler,
		cleanupHandler
	};
}

function requestRowInsertion(position, rowId, rowIndex) {
	if (position !== 'before' && position !== 'after') {
		return;
	}
	if (!Number.isFinite(rowIndex)) {
		return;
	}
	const normalizedRowId = typeof rowId === 'string' && rowId.length ? rowId : undefined;
	vscode.postMessage({
		type: 'insertRow',
		payload: {
			referenceId: normalizedRowId,
			referenceIndex: Number(rowIndex),
			position,
		},
	});
}

function requestRowDeletion(rowId, rowIndex) {
	if (!Number.isFinite(rowIndex)) {
		return;
	}
	const normalizedRowId = typeof rowId === 'string' && rowId.length ? rowId : undefined;

	if (!normalizedRowId) {
		return;
	}

	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = _t('confirmDeleteRow');
	form.appendChild(title);

	const message = document.createElement('div');
	message.className = 'kv-column-delete-message';
	message.textContent = _tf('confirmDeleteRowMsg', normalizedRowId);
	form.appendChild(message);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = _t('cancel');
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary kv-button-danger';
	submitBtn.textContent = _t('delete');
	actions.appendChild(submitBtn);

	form.appendChild(actions);
	dialog.appendChild(form);

	const closeDialog = () => {
		if (dialog.parentElement) {
			dialog.parentElement.removeChild(dialog);
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		vscode.postMessage({
			type: 'deleteRow',
			payload: {
				rowId: normalizedRowId,
				rowIndex: Number(rowIndex),
			},
		});

		closeDialog();
	});

	cancelBtn.addEventListener('click', closeDialog);

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeDialog();
		}
	};

	document.addEventListener('keydown', keyHandler, true);
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) {
			closeDialog();
		}
	});

	const originalRemove = dialog.remove;
	dialog.remove = function () {
		document.removeEventListener('keydown', keyHandler, true);
		originalRemove.call(this);
	};

	document.body.appendChild(dialog);
	requestAnimationFrame(() => {
		submitBtn.focus();
	});
}

function openRowContextMenu(invocationEvent, context) {
	const resolvedContext = context ?? {};
	if (invocationEvent) {
		invocationEvent.preventDefault();
		invocationEvent.stopPropagation();
	}
	const { rowIndex } = resolvedContext;
	if (!Number.isFinite(rowIndex)) {
		return;
	}
	const normalizedIndex = Number(rowIndex);
	const rowId = typeof resolvedContext.rowId === 'string' ? resolvedContext.rowId : '';
	closeRowContextMenu();
	closeMultiSelectDropdown();
	closeAbilityValuesEditor();
	const menu = document.createElement('div');
	menu.className = 'kv-row-context-menu';
	menu.setAttribute('role', 'menu');
	const options = [
		{ label: _t('insertRowAbove'), position: 'before' },
		{ label: _t('insertRowBelow'), position: 'after' }
	];
	options.forEach((option) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'kv-row-context-menu-item';
		button.textContent = option.label;
		button.addEventListener('click', () => {
			requestRowInsertion(option.position, rowId, normalizedIndex);
			closeRowContextMenu();
		});
		menu.appendChild(button);
	});

	const separator1 = document.createElement('div');
	separator1.className = 'kv-context-menu-separator';
	menu.appendChild(separator1);

	const copyButton = document.createElement('button');
	copyButton.type = 'button';
	copyButton.className = 'kv-row-context-menu-item';
	copyButton.textContent = _t('copyRow');
	copyButton.addEventListener('click', () => {
		selectedRows.clear();
		selectedRows.add(normalizedIndex);
		lastSelectedRowIndex = normalizedIndex;
		updateRowSelectionVisuals();
		copySelectedRows();
		closeRowContextMenu();
	});
	menu.appendChild(copyButton);

	const pasteButton = document.createElement('button');
	pasteButton.type = 'button';
	pasteButton.className = 'kv-row-context-menu-item';
	pasteButton.textContent = _t('pasteRow');
	pasteButton.disabled = !copiedRowsData || copiedRowsData.length === 0;
	pasteButton.addEventListener('click', () => {
		if (copiedRowsData && copiedRowsData.length > 0) {
			pasteRows();
		}
		closeRowContextMenu();
	});
	menu.appendChild(pasteButton);

	const separator2 = document.createElement('div');
	separator2.className = 'kv-context-menu-separator';
	menu.appendChild(separator2);

	const deleteButton = document.createElement('button');
	deleteButton.type = 'button';
	deleteButton.className = 'kv-row-context-menu-item kv-context-menu-item-danger';
	deleteButton.textContent = _t('deleteRow');
	deleteButton.addEventListener('click', () => {
		requestRowDeletion(rowId, normalizedIndex);
		closeRowContextMenu();
	});
	menu.appendChild(deleteButton);

	menu.addEventListener('contextmenu', (event) => event.preventDefault());
	document.body.appendChild(menu);
	const anchorElement = resolvedContext?.targetElement instanceof HTMLElement ? resolvedContext.targetElement : null;
	const anchorRect = anchorElement ? anchorElement.getBoundingClientRect() : null;
	const pointerX = invocationEvent?.clientX ?? (anchorRect ? anchorRect.left + (anchorRect.width / 2) : window.innerWidth / 2);
	const pointerY = invocationEvent?.clientY ?? (anchorRect ? anchorRect.top + (anchorRect.height / 2) : window.innerHeight / 2);
	const rect = menu.getBoundingClientRect();
	const margin = 8;
	let left = pointerX;
	let top = pointerY;
	if (left + rect.width > window.innerWidth - margin) {
		left = Math.max(margin, window.innerWidth - rect.width - margin);
	}
	if (top + rect.height > window.innerHeight - margin) {
		top = Math.max(margin, window.innerHeight - rect.height - margin);
	}
	left = Math.max(margin, left);
	top = Math.max(margin, top);
	menu.style.left = `${left}px`;
	menu.style.top = `${top}px`;
	const outsideHandler = (event) => {
		if (!menu.contains(event.target)) {
			closeRowContextMenu();
		}
	};
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeRowContextMenu();
		}
	};
	const cleanupHandler = () => closeRowContextMenu();
	document.addEventListener('mousedown', outsideHandler, true);
	document.addEventListener('contextmenu', outsideHandler, true);
	document.addEventListener('keydown', keyHandler, true);
	document.addEventListener('scroll', cleanupHandler, true);
	window.addEventListener('resize', cleanupHandler);
	window.addEventListener('blur', cleanupHandler);
	rowContextMenuState = {
		menu,
		outsideHandler,
		keyHandler,
		cleanupHandler
	};
}

function closeAutofillPopup() {
	if (!autofillPopupState) {
		return;
	}
	const { element, keyHandler, outsideHandler } = autofillPopupState;
	if (element && element.parentElement) {
		element.remove();
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	if (outsideHandler) {
		document.removeEventListener('mousedown', outsideHandler, true);
	}
	autofillPopupState = null;
}

function getDecimalPlacesFromInput(value) {
	const text = typeof value === 'string' ? value.trim() : '';
	if (!text.includes('.')) {
		return 0;
	}
	const fractional = text.split('.')[1];
	if (!fractional) {
		return 0;
	}
	const sanitized = fractional.split(/e|E/)[0]?.replace(/[^0-9]/g, '') ?? '';
	return sanitized.length;
}

function formatAutofillValue(valueScaled, scale, decimals) {
	if (decimals <= 0 || scale === 1) {
		return valueScaled === 0 ? '0' : String(valueScaled);
	}
	const raw = (valueScaled / scale).toFixed(decimals);
	const trimmedWhole = raw.replace(/\.0+$/, '');
	const trimmed = trimmedWhole.replace(/(\.\d*?)0+$/, '$1');
	const normalized = trimmed.length ? trimmed : '0';
	return normalized === '-0' ? '0' : normalized;
}

function buildAutofillValues(baseValueText, stepValueText, levelValueText) {
	const decimals = Math.max(
		getDecimalPlacesFromInput(baseValueText),
		getDecimalPlacesFromInput(stepValueText)
	);
	const scale = decimals > 0 ? Math.pow(10, decimals) : 1;
	const baseNumber = parseFloat(baseValueText);
	const stepNumber = parseFloat(stepValueText);
	const safeBase = Number.isFinite(baseNumber) ? baseNumber : 0;
	const safeStep = Number.isFinite(stepNumber) ? stepNumber : 0;
	const baseScaled = Math.round(safeBase * scale);
	const stepScaled = Math.round(safeStep * scale);
	const levels = Math.max(1, parseInt(levelValueText, 10) || 1);
	const values = [];
	for (let i = 0; i < levels; i += 1) {
		const scaledValue = baseScaled + stepScaled * i;
		if (decimals > 0) {
			values.push(formatAutofillValue(scaledValue, scale, decimals));
		} else {
			values.push(String(scaledValue));
		}
	}
	return values;
}

function openAutofillPopup(context) {
	if (!context || !context.input) {
		return;
	}
	closeAutofillPopup();

	const currentValue = context.input.value || '';
	const baseValue = parseFloat(currentValue) || 0;

	const popup = createManagedDialog({
		className: 'kv-autofill-popup',
		onClose: () => {
			autofillPopupState = null;
		}
	});

	const title = document.createElement('div');
	title.className = 'kv-autofill-popup-title';
	title.textContent = _t('autoFill');
	popup.appendChild(title);

	const baseField = document.createElement('div');
	baseField.className = 'kv-autofill-popup-field';
	const baseLabel = document.createElement('label');
	baseLabel.textContent = _t('baseValue');
	const baseInput = createInput({
		type: 'number',
		value: String(baseValue),
		attributes: { step: 'any' }
	});
	baseField.appendChild(baseLabel);
	baseField.appendChild(baseInput);
	popup.appendChild(baseField);

	const stepField = document.createElement('div');
	stepField.className = 'kv-autofill-popup-field';
	const stepLabel = document.createElement('label');
	stepLabel.textContent = _t('levelIncrement');
	const stepInput = createInput({
		type: 'number',
		value: '1',
		attributes: { step: 'any' }
	});
	stepField.appendChild(stepLabel);
	stepField.appendChild(stepInput);
	popup.appendChild(stepField);

	const levelsField = document.createElement('div');
	levelsField.className = 'kv-autofill-popup-field';
	const levelsLabel = document.createElement('label');
	levelsLabel.textContent = _t('levelCount');
	const levelsInput = createInput({
		type: 'number',
		value: '4',
		attributes: { min: '1' }
	});
	levelsField.appendChild(levelsLabel);
	levelsField.appendChild(levelsInput);
	popup.appendChild(levelsField);

	const preview = document.createElement('div');
	preview.className = 'kv-autofill-popup-preview';
	preview.textContent = _t('preview');
	popup.appendChild(preview);

	const updatePreview = () => {
		const values = buildAutofillValues(baseInput.value, stepInput.value, levelsInput.value);
		preview.textContent = _t('preview') + values.join(' ');
	};

	baseInput.addEventListener('input', updatePreview);
	stepInput.addEventListener('input', updatePreview);
	levelsInput.addEventListener('input', updatePreview);
	updatePreview();

	const actions = document.createElement('div');
	actions.className = 'kv-autofill-popup-actions';

	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = _t('cancel');
	actions.appendChild(cancelButton);

	const applyButton = document.createElement('button');
	applyButton.type = 'button';
	applyButton.className = 'kv-button kv-button-primary';
	applyButton.textContent = _t('apply');
	actions.appendChild(applyButton);

	popup.appendChild(actions);

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			closeAutofillPopup();
		}
	};

	const outsideHandler = (event) => {
		if (!popup.contains(event.target)) {
			closeAutofillPopup();
		}
	};

	cancelButton.addEventListener('click', () => closeAutofillPopup());

	applyButton.addEventListener('click', () => {
		const values = buildAutofillValues(baseInput.value, stepInput.value, levelsInput.value);
		context.input.value = values.join(' ');

		const inputEvent = new Event('input', { bubbles: true });
		context.input.dispatchEvent(inputEvent);

		closeAutofillPopup();
	});

	document.addEventListener('keydown', keyHandler, true);
	document.addEventListener('mousedown', outsideHandler, true);

	document.body.appendChild(popup);

	const inputRect = context.input.getBoundingClientRect();
	popup.style.top = `${inputRect.bottom + 4}px`;
	popup.style.left = `${inputRect.left}px`;

	autofillPopupState = {
		element: popup,
		keyHandler,
		outsideHandler,
		targetInput: context.input,
	};

	requestAnimationFrame(() => stepInput.focus());
}

function openAbilityValuesEditor(context) {
	if (!context || !context.rowId) {
		return;
	}
	closeMultiSelectDropdown();
	closeAbilityValuesEditor();
	const entries = cloneAbilityValuesEntries(context.entries || []);

	const overlay = createManagedDialog({
		className: 'kv-ability-editor-overlay',
		onClose: () => {
			abilityValuesEditorState = null;
		}
	});

	const dialog = document.createElement('div');
	dialog.className = 'kv-ability-editor';
	overlay.appendChild(dialog);
	const header = document.createElement('div');
	header.className = 'kv-ability-editor-header';
	const title = document.createElement('div');
	title.className = 'kv-ability-editor-title';
	const titleSegments = [];
	if (context.columnName) {
		titleSegments.push(context.columnName);
	}
	if (context.rowId) {
		titleSegments.push(context.rowId);
	}
	title.textContent = titleSegments.join(' · ') || 'AbilityValues';
	header.appendChild(title);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-button kv-button-icon kv-ability-editor-close';
	closeButton.title = _t('close');
	closeButton.innerHTML = '<span class="codicon codicon-close"></span>';
	header.appendChild(closeButton);
	dialog.appendChild(header);
	const body = document.createElement('div');
	body.className = 'kv-ability-editor-body';
	const entriesContainer = document.createElement('div');
	entriesContainer.className = 'kv-ability-editor-entries';
	body.appendChild(entriesContainer);
	dialog.appendChild(body);
	const footer = document.createElement('div');
	footer.className = 'kv-ability-editor-footer';
	const footerLeft = document.createElement('div');
	footerLeft.className = 'kv-ability-editor-footer-left';
	const addEntryButton = document.createElement('button');
	addEntryButton.type = 'button';
	addEntryButton.className = 'kv-button kv-button-secondary';
	addEntryButton.dataset.role = 'add-entry';
	addEntryButton.textContent = _t('abilityValuesAddEntry');
	footerLeft.appendChild(addEntryButton);
	footer.appendChild(footerLeft);
	const footerRight = document.createElement('div');
	footerRight.className = 'kv-ability-editor-footer-right';
	const errorEl = document.createElement('div');
	errorEl.className = 'kv-ability-editor-error';
	errorEl.hidden = true;
	footerRight.appendChild(errorEl);
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.dataset.role = 'cancel';
	cancelButton.textContent = _t('cancel');
	footerRight.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.dataset.role = 'apply';
	saveButton.textContent = _t('save');
	footerRight.appendChild(saveButton);
	footer.appendChild(footerRight);
	dialog.appendChild(footer);
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			closeAbilityValuesEditor();
		}
	};
	const handleOverlayClick = (event) => {
		if (event.target === overlay) {
			closeAbilityValuesEditor();
		}
	};
	overlay.addEventListener('click', handleOverlayClick);
	dialog.addEventListener('click', (event) => event.stopPropagation());
	closeButton.addEventListener('click', () => closeAbilityValuesEditor());
	cancelButton.addEventListener('click', () => closeAbilityValuesEditor());
	saveButton.addEventListener('click', () => submitAbilityValuesEditor());
	addEntryButton.addEventListener('click', () => {
		if (!abilityValuesEditorState) {
			return;
		}
		resetAbilityValuesEditorError();
		const nextEntry = createNewAbilityValuesEntry(abilityValuesEditorState.entries);
		abilityValuesEditorState.entries.push(nextEntry);
		renderAbilityValuesEditorEntries();
		focusAbilityValuesEditorInput('entry-key', abilityValuesEditorState.entries.length - 1);
	});
	entriesContainer.addEventListener('input', handleAbilityValuesEditorInput);
	entriesContainer.addEventListener('click', handleAbilityValuesEditorClick);
	document.body.appendChild(overlay);
	document.addEventListener('keydown', keyHandler, true);
	abilityValuesEditorState = {
		overlay,
		dialog,
		entriesContainer,
		errorEl,
		entries,
		rowId: context.rowId,
		column: context.column,
		columnName: context.columnName,
		keyHandler,
	};
	renderAbilityValuesEditorEntries();
	resetAbilityValuesEditorError();
	document.body.classList.add('kv-ability-editor-open');
	if (entries.length) {
		focusAbilityValuesEditorInput('entry-key', 0);
	}
}

function renderAbilityValuesEditorEntries() {
	if (!abilityValuesEditorState) {
		return;
	}
	const { entriesContainer, entries } = abilityValuesEditorState;
	entriesContainer.innerHTML = '';
	if (!entries.length) {
		const empty = document.createElement('div');
		empty.className = 'kv-ability-editor-empty';
		empty.textContent = _t('noAbilityValues');
		entriesContainer.appendChild(empty);
		return;
	}
	entries.forEach((entry, entryIndex) => {
		const entryEl = document.createElement('div');
		entryEl.className = 'kv-ability-editor-entry';
		entryEl.dataset.entryIndex = String(entryIndex);
		const mainRow = document.createElement('div');
		mainRow.className = 'kv-ability-editor-entry-row kv-ability-editor-entry-main-row';

		const hasAbilityValuesLocalization = localizationSettings.enabled &&
			localizationSettings.mappings.some(m => m.columnName === 'AbilityValues');

		const keyInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-ability-editor-key-input',
			placeholder: _t('entryKey'),
			value: entry.key,
			attributes: {
				dataset: {
					role: 'entry-key',
					entryIndex: String(entryIndex)
				}
			}
		});
		mainRow.appendChild(keyInput);

		if (hasAbilityValuesLocalization && abilityValuesEditorState) {
			const rowId = abilityValuesEditorState.rowId;
			console.log('[renderAbilityValuesEditor] rowId:', rowId, 'entry.key:', entry.key);
			console.log('[renderAbilityValuesEditor] abilityValuesDescriptions:', abilityValuesDescriptions);
			const rowDescriptions = abilityValuesDescriptions[rowId] || {};
			console.log('[renderAbilityValuesEditor] rowDescriptions:', rowDescriptions);
			const description = rowDescriptions[entry.key] || '';
			console.log('[renderAbilityValuesEditor] description for key', entry.key, ':', description);

			const descriptionInput = createInput({
				type: 'text',
				className: 'kv-ability-editor-input kv-ability-editor-description-input',
				placeholder: _t('descriptionLocalized'),
				value: description,
				attributes: {
					dataset: {
						role: 'entry-description',
						entryIndex: String(entryIndex)
					}
				}
			});
			mainRow.appendChild(descriptionInput);
		}

		const valueWrapper = document.createElement('div');
		valueWrapper.className = 'kv-ability-editor-value-wrapper';
		const valueInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-ability-editor-value-input',
			placeholder: _t('baseValue'),
			value: entry.value,
			attributes: {
				dataset: {
					role: 'entry-value',
					entryIndex: String(entryIndex)
				}
			}
		});
		valueWrapper.appendChild(valueInput);
		const autofillButton = document.createElement('button');
		autofillButton.type = 'button';
		autofillButton.className = 'kv-button kv-button-tertiary kv-ability-editor-autofill-btn';
		autofillButton.title = _t('autoFillAbility');
		autofillButton.innerHTML = '<span class="codicon codicon-wand"></span>';
		autofillButton.addEventListener('click', () => {
			openAutofillPopup({ input: valueInput });
		});
		valueWrapper.appendChild(autofillButton);
		mainRow.appendChild(valueWrapper);

		const addModifierButton = document.createElement('button');
		addModifierButton.type = 'button';
		addModifierButton.className = 'kv-button kv-button-tertiary kv-ability-editor-add-modifier';
		addModifierButton.dataset.role = 'add-modifier';
		addModifierButton.dataset.entryIndex = String(entryIndex);
		addModifierButton.title = _t('addModifier');
		addModifierButton.innerHTML = '<span class="codicon codicon-add"></span>';
		mainRow.appendChild(addModifierButton);

		const removeEntryButton = document.createElement('button');
		removeEntryButton.type = 'button';
		removeEntryButton.className = 'kv-button kv-button-tertiary kv-ability-editor-remove-entry';
		removeEntryButton.dataset.role = 'remove-entry';
		removeEntryButton.dataset.entryIndex = String(entryIndex);
		removeEntryButton.title = _t('deleteEntry');
		removeEntryButton.innerHTML = '<span class="codicon codicon-trash"></span>';
		mainRow.appendChild(removeEntryButton);
		entryEl.appendChild(mainRow);

		const modifiersContainer = document.createElement('div');
		modifiersContainer.className = 'kv-ability-editor-modifiers';
		entry.modifiers.forEach((modifier, modifierIndex) => {
			const modifierRow = document.createElement('div');
			modifierRow.className = 'kv-ability-editor-modifier';
			modifierRow.dataset.entryIndex = String(entryIndex);
			modifierRow.dataset.modifierIndex = String(modifierIndex);

			const isPredefined = Boolean(getPredefinedModifierDef(modifier.key));
			const modifierKeyInput = createInput({
				type: 'text',
				className: 'kv-ability-editor-input kv-ability-editor-modifier-key',
				placeholder: _t('modifierKey'),
				value: modifier.key,
				attributes: {
					dataset: {
						role: 'modifier-key',
						entryIndex: String(entryIndex),
						modifierIndex: String(modifierIndex)
					}
				}
			});
			if (isPredefined) {
				modifierKeyInput.readOnly = true;
				modifierKeyInput.style.opacity = '0.7';
			}
			modifierRow.appendChild(modifierKeyInput);

			const modifierValueWrapper = document.createElement('div');
			modifierValueWrapper.className = 'kv-ability-editor-value-wrapper';
			const modDef = getPredefinedModifierDef(modifier.key);
			if (modDef?.valueType === 'checkbox') {
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.className = 'kv-checkbox-input kv-modifier-checkbox';
				checkbox.checked = modifier.value === '1';
				checkbox.dataset.role = 'modifier-value';
				checkbox.dataset.entryIndex = String(entryIndex);
				checkbox.dataset.modifierIndex = String(modifierIndex);
				checkbox.addEventListener('change', () => {
					modifier.value = checkbox.checked ? '1' : '0';
				});
				modifierValueWrapper.appendChild(checkbox);
			} else if (modDef?.valueType === 'select' && modDef.options) {
				const select = document.createElement('select');
				select.className = 'kv-ability-editor-input kv-ability-editor-modifier-value';
				select.dataset.role = 'modifier-value';
				select.dataset.entryIndex = String(entryIndex);
				select.dataset.modifierIndex = String(modifierIndex);
				modDef.options.forEach(opt => {
					const option = document.createElement('option');
					option.value = opt;
					option.textContent = opt;
					if (opt === modifier.value) option.selected = true;
					select.appendChild(option);
				});
				select.addEventListener('change', () => {
					modifier.value = select.value;
				});
				modifierValueWrapper.appendChild(select);
			} else if (modDef?.valueType === 'spinner') {
				const spinWrap = document.createElement('div');
				spinWrap.className = 'kv-spinner-wrapper kv-modifier-spinner';
				const minusBtn = document.createElement('button');
				minusBtn.type = 'button';
				minusBtn.className = 'kv-spinner-btn kv-spinner-minus';
				minusBtn.textContent = '\u2212';
				const display = document.createElement('span');
				display.className = 'kv-spinner-value';
				display.dataset.role = 'modifier-value';
				display.dataset.entryIndex = String(entryIndex);
				display.dataset.modifierIndex = String(modifierIndex);
				display.textContent = modifier.value || '0';
				const plusBtn = document.createElement('button');
				plusBtn.type = 'button';
				plusBtn.className = 'kv-spinner-btn kv-spinner-plus';
				plusBtn.textContent = '+';
				const updateVal = (delta) => {
					const n = Math.max(0, (parseInt(display.textContent || '0', 10) || 0) + delta);
					display.textContent = String(n);
					modifier.value = String(n);
				};
				minusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateVal(-1); });
				plusBtn.addEventListener('click', (e) => { e.stopPropagation(); updateVal(1); });
				spinWrap.appendChild(minusBtn);
				spinWrap.appendChild(display);
				spinWrap.appendChild(plusBtn);
				modifierValueWrapper.appendChild(spinWrap);
			} else {
				const modifierValueInput = createInput({
					type: 'text',
					className: 'kv-ability-editor-input kv-ability-editor-modifier-value',
					placeholder: _t('modifierValue'),
					value: modifier.value,
					attributes: {
						dataset: {
							role: 'modifier-value',
							entryIndex: String(entryIndex),
							modifierIndex: String(modifierIndex)
						}
					}
				});
				modifierValueWrapper.appendChild(modifierValueInput);
				const modifierAutofillButton = document.createElement('button');
				modifierAutofillButton.type = 'button';
				modifierAutofillButton.className = 'kv-button kv-button-tertiary kv-ability-editor-autofill-btn';
				modifierAutofillButton.title = _t('autoFillAbility');
				modifierAutofillButton.innerHTML = '<span class="codicon codicon-wand"></span>';
				modifierAutofillButton.addEventListener('click', () => {
					openAutofillPopup({ input: modifierValueInput });
				});
				modifierValueWrapper.appendChild(modifierAutofillButton);
			}
			modifierRow.appendChild(modifierValueWrapper);

			const removeModifierButton = document.createElement('button');
			removeModifierButton.type = 'button';
			removeModifierButton.className = 'kv-button kv-button-tertiary kv-ability-editor-remove-modifier';
			removeModifierButton.dataset.role = 'remove-modifier';
			removeModifierButton.dataset.entryIndex = String(entryIndex);
			removeModifierButton.dataset.modifierIndex = String(modifierIndex);
			removeModifierButton.title = _t('delete');
			removeModifierButton.innerHTML = '<span class="codicon codicon-trash"></span>';
			modifierRow.appendChild(removeModifierButton);
			modifiersContainer.appendChild(modifierRow);
		});
		if (modifiersContainer.childElementCount > 0) {
			entryEl.appendChild(modifiersContainer);
		}
		entriesContainer.appendChild(entryEl);
	});
}

function focusAbilityValuesEditorInput(role, entryIndex, modifierIndex) {
	if (!abilityValuesEditorState) {
		return;
	}
	window.requestAnimationFrame(() => {
		if (!abilityValuesEditorState) {
			return;
		}
		let selector = '';
		if (role === 'entry-key') {
			selector = `.kv-ability-editor-input[data-role="entry-key"][data-entry-index="${entryIndex}"]`;
		} else if (role === 'entry-value') {
			selector = `.kv-ability-editor-input[data-role="entry-value"][data-entry-index="${entryIndex}"]`;
		} else if (role === 'modifier-key') {
			selector = `.kv-ability-editor-input[data-role="modifier-key"][data-entry-index="${entryIndex}"][data-modifier-index="${modifierIndex}"]`;
		} else if (role === 'modifier-value') {
			selector = `.kv-ability-editor-input[data-role="modifier-value"][data-entry-index="${entryIndex}"][data-modifier-index="${modifierIndex}"]`;
		}
		if (!selector) {
			return;
		}
		const input = abilityValuesEditorState.entriesContainer.querySelector(selector);
		if (input instanceof HTMLInputElement) {
			input.focus({ preventScroll: false });
			input.select();
		}
	});
}

function handleAbilityValuesEditorInput(event) {
	if (!abilityValuesEditorState) {
		return;
	}
	const target = event.target;
	if (!(target instanceof HTMLInputElement)) {
		return;
	}
	const entryIndex = Number(target.dataset.entryIndex);
	if (!Number.isFinite(entryIndex) || entryIndex < 0 || entryIndex >= abilityValuesEditorState.entries.length) {
		return;
	}
	const role = target.dataset.role;
	const entry = abilityValuesEditorState.entries[entryIndex];
	if (!entry) {
		return;
	}
	resetAbilityValuesEditorError();
	switch (role) {
		case 'entry-key':
			entry.key = target.value;
			break;
		case 'entry-value':
			entry.value = target.value;
			break;
		case 'modifier-key':
		case 'modifier-value': {
			const modifierIndex = Number(target.dataset.modifierIndex);
			if (!Number.isFinite(modifierIndex) || modifierIndex < 0 || modifierIndex >= entry.modifiers.length) {
				return;
			}
			if (role === 'modifier-key') {
				entry.modifiers[modifierIndex].key = target.value;
			} else {
				entry.modifiers[modifierIndex].value = target.value;
			}
			entry.type = 'object';
			break;
		}
		default:
			break;
	}
}

const DAMAGE_TYPE_OPTIONS = ['DAMAGE_TYPE_NONE', 'DAMAGE_TYPE_PHYSICAL', 'DAMAGE_TYPE_MAGICAL', 'DAMAGE_TYPE_PURE'];

const PREDEFINED_MODIFIERS = [
	{ key: 'affected_by_aoe_increase', defaultValue: '1', label: 'affected_by_aoe_increase', valueType: 'text' },
	{ key: 'CalculateSpellDamageTooltip', defaultValue: '0', label: 'CalculateSpellDamageTooltip', valueType: 'checkbox' },
	{ key: 'DamageTypeTooltip', defaultValue: 'DAMAGE_TYPE_NONE', label: 'DamageTypeTooltip', valueType: 'select', options: DAMAGE_TYPE_OPTIONS },
	{ key: 'display_type', defaultValue: '', label: 'display_type', valueType: 'text' },
	{ key: 'hero_levelup', defaultValue: '0', label: 'hero_levelup', valueType: 'spinner' },
	{ key: 'levelup_interval', defaultValue: '0', label: 'levelup_interval', valueType: 'spinner' },
];

function getPredefinedModifierDef(key) {
	return PREDEFINED_MODIFIERS.find(m => m.key === key);
}

function openModifierPickerMenu(anchorEl, entry, entryIndex) {
	const existing = document.querySelector('.kv-modifier-picker-menu');
	if (existing) existing.remove();

	const menu = document.createElement('div');
	menu.className = 'kv-modifier-picker-menu';

	const existingKeys = new Set(entry.modifiers.map(m => m.key));

	PREDEFINED_MODIFIERS.forEach(mod => {
		const item = document.createElement('button');
		item.type = 'button';
		item.className = 'kv-modifier-picker-item';
		item.textContent = mod.label;
		if (existingKeys.has(mod.key)) {
			item.disabled = true;
			item.classList.add('kv-modifier-picker-disabled');
		}
		item.addEventListener('click', () => {
			menu.remove();
			removeOutsideHandler();
			entry.modifiers.push({ key: mod.key, value: mod.defaultValue });
			entry.type = 'object';
			renderAbilityValuesEditorEntries();
			resetAbilityValuesEditorError();
		});
		menu.appendChild(item);
	});

	const separator = document.createElement('div');
	separator.className = 'kv-modifier-picker-separator';
	menu.appendChild(separator);

	const customItem = document.createElement('button');
	customItem.type = 'button';
	customItem.className = 'kv-modifier-picker-item';
	customItem.textContent = 'Custom...';
	customItem.addEventListener('click', () => {
		menu.remove();
		removeOutsideHandler();
		entry.modifiers.push({ key: '', value: '' });
		entry.type = 'object';
		renderAbilityValuesEditorEntries();
		focusAbilityValuesEditorInput('modifier-key', entryIndex, entry.modifiers.length - 1);
		resetAbilityValuesEditorError();
	});
	menu.appendChild(customItem);

	const rect = anchorEl.getBoundingClientRect();
	menu.style.position = 'fixed';
	menu.style.left = rect.left + 'px';
	menu.style.top = rect.bottom + 2 + 'px';
	document.body.appendChild(menu);

	const outsideHandler = (e) => {
		if (!menu.contains(e.target)) {
			menu.remove();
			removeOutsideHandler();
		}
	};
	const removeOutsideHandler = () => {
		document.removeEventListener('mousedown', outsideHandler, true);
	};
	setTimeout(() => {
		document.addEventListener('mousedown', outsideHandler, true);
	}, 0);
}

function handleAbilityValuesEditorClick(event) {
	if (!abilityValuesEditorState) {
		return;
	}
	const target = event.target;
	if (!(target instanceof HTMLElement)) {
		return;
	}
	const role = target.dataset.role;
	if (!role) {
		return;
	}
	const entryIndex = Number(target.dataset.entryIndex);
	const entry = Number.isFinite(entryIndex) ? abilityValuesEditorState.entries[entryIndex] : undefined;
	if (role === 'remove-entry') {
		event.preventDefault();
		if (entryIndex >= 0 && entryIndex < abilityValuesEditorState.entries.length) {
			abilityValuesEditorState.entries.splice(entryIndex, 1);
			renderAbilityValuesEditorEntries();
			resetAbilityValuesEditorError();
		}
		return;
	}
	if (role === 'add-modifier' && entry) {
		event.preventDefault();
		openModifierPickerMenu(target, entry, entryIndex);
		return;
	}
	if (role === 'remove-modifier' && entry) {
		event.preventDefault();
		const modifierIndex = Number(target.dataset.modifierIndex);
		if (!Number.isFinite(modifierIndex) || modifierIndex < 0 || modifierIndex >= entry.modifiers.length) {
			return;
		}
		entry.modifiers.splice(modifierIndex, 1);
		if (!entry.modifiers.length && entry.initialType === 'scalar') {
			entry.type = 'scalar';
		}
		renderAbilityValuesEditorEntries();
		resetAbilityValuesEditorError();
	}
}

function validateAbilityValuesEntries(entries) {
	const seenKeys = new Set();
	for (let i = 0; i < entries.length; i += 1) {
		const entry = entries[i];
		const trimmedKey = (entry.key || '').trim();
		if (!trimmedKey) {
			return { valid: false, message: _tf('entryKeyEmpty', i + 1) };
		}
		if (seenKeys.has(trimmedKey)) {
			return { valid: false, message: _tf('entryKeyDuplicate', trimmedKey) };
		}
		seenKeys.add(trimmedKey);
		for (let j = 0; j < entry.modifiers.length; j += 1) {
			const modifier = entry.modifiers[j];
			const modifierKey = (modifier.key || '').trim();
			if (!modifierKey) {
				return { valid: false, message: _tf('modifierKeyEmpty', j + 1, trimmedKey) };
			}
		}
	}
	return { valid: true };
}

function submitAbilityValuesEditor() {
	if (!abilityValuesEditorState) {
		return;
	}
	resetAbilityValuesEditorError();
	const { entries, rowId, errorEl } = abilityValuesEditorState;
	if (!rowId) {
		closeAbilityValuesEditor();
		return;
	}
	const validation = validateAbilityValuesEntries(entries);
	if (!validation.valid) {
		if (errorEl) {
			errorEl.textContent = validation.message || _t('validationErrors');
			errorEl.hidden = false;
		}
		return;
	}
	const payloadEntries = normalizeAbilityEntriesForPayload(entries);
	vscode.postMessage({
		type: 'editAbilityValues',
		payload: {
			id: rowId,
			entries: payloadEntries,
		},
	});

	const hasAbilityValuesLocalization = localizationSettings.enabled &&
		localizationSettings.mappings.some(m => m.columnName === 'AbilityValues');

	if (hasAbilityValuesLocalization && abilityValuesEditorState.entriesContainer) {
		const descriptions = {};
		const descriptionInputs = abilityValuesEditorState.entriesContainer.querySelectorAll('[data-role="entry-description"]');

		descriptionInputs.forEach((input) => {
			const entryIndex = parseInt(input.dataset.entryIndex, 10);
			if (Number.isFinite(entryIndex) && entryIndex >= 0 && entryIndex < entries.length) {
				const key = entries[entryIndex].key;
				const description = input.value.trim();
				if (key && description) {
					descriptions[key] = description;
				}
			}
		});

		vscode.postMessage({
			type: 'saveAbilityValuesDescriptions',
			payload: {
				rowId: rowId,
				descriptions: descriptions
			}
		});
	}

	closeAbilityValuesEditor();
}

function openColumnOptionsEditor(context) {
	if (!context || !context.column) {
		return;
	}
	closeColumnOptionsEditor();

	const overlay = createManagedDialog({
		className: 'kv-column-options-overlay',
		onClose: () => {
			columnOptionsEditorState = null;
		}
	});

	const dialog = document.createElement('div');
	dialog.className = 'kv-column-options-dialog';
	overlay.appendChild(dialog);
	const header = document.createElement('div');
	header.className = 'kv-column-options-header';
	const title = document.createElement('div');
	title.className = 'kv-column-options-title';
	const titleParts = [];
	if (context.columnName) {
		titleParts.push(context.columnName);
	}
	titleParts.push(_t('dropdownOptions'));
	title.textContent = titleParts.join(' · ');
	header.appendChild(title);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-button kv-button-icon kv-column-options-close';
	closeButton.title = _t('close');
	closeButton.innerHTML = '<span class="codicon codicon-close"></span>';
	header.appendChild(closeButton);
	dialog.appendChild(header);
	const body = document.createElement('div');
	body.className = 'kv-column-options-body';
	const listContainer = document.createElement('div');
	listContainer.className = 'kv-column-options-list';
	body.appendChild(listContainer);
	dialog.appendChild(body);
	const footer = document.createElement('div');
	footer.className = 'kv-column-options-footer';
	const footerLeft = document.createElement('div');
	footerLeft.className = 'kv-column-options-footer-left';
	const addButton = document.createElement('button');
	addButton.type = 'button';
	addButton.className = 'kv-button kv-button-secondary';
	addButton.textContent = _t('addOption');
	footerLeft.appendChild(addButton);

	const scopeCheckboxWrapper = document.createElement('label');
	scopeCheckboxWrapper.className = 'kv-checkbox-wrapper';
	scopeCheckboxWrapper.style.cssText = 'margin-left: 16px;';
	const scopeCheckbox = document.createElement('input');
	scopeCheckbox.type = 'checkbox';
	scopeCheckbox.className = 'kv-checkbox-input';
	scopeCheckbox.checked = true;
	scopeCheckboxWrapper.appendChild(scopeCheckbox);
	const checkIndicator = document.createElement('span');
	checkIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	scopeCheckboxWrapper.appendChild(checkIndicator);
	const scopeLabel = document.createElement('span');
	scopeLabel.className = 'kv-checkbox-label';
	scopeLabel.textContent = _t('applyCurrentFileOnly');
	scopeCheckboxWrapper.appendChild(scopeLabel);
	footerLeft.appendChild(scopeCheckboxWrapper);

	const multiSelectWrapper = document.createElement('label');
	multiSelectWrapper.className = 'kv-checkbox-wrapper';
	multiSelectWrapper.style.cssText = 'margin-left: 16px;';
	const multiSelectCheckbox = document.createElement('input');
	multiSelectCheckbox.type = 'checkbox';
	multiSelectCheckbox.className = 'kv-checkbox-input';
	multiSelectCheckbox.checked = context.multiple ?? false;
	multiSelectWrapper.appendChild(multiSelectCheckbox);
	const multiSelectIndicator = document.createElement('span');
	multiSelectIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	multiSelectWrapper.appendChild(multiSelectIndicator);
	const multiSelectLabel = document.createElement('span');
	multiSelectLabel.className = 'kv-checkbox-label';
	multiSelectLabel.textContent = _t('allowMultiSelect');
	multiSelectWrapper.appendChild(multiSelectLabel);
	footerLeft.appendChild(multiSelectWrapper);

	const separatorWrapper = document.createElement('div');
	separatorWrapper.className = 'kv-separator-wrapper';
	separatorWrapper.style.cssText = 'margin-left: 16px; display: inline-flex; align-items: center; gap: 4px;';
	const separatorLabel = document.createElement('span');
	separatorLabel.className = 'kv-separator-label';
	separatorLabel.textContent = _t('separatorLabel');
	separatorLabel.style.cssText = 'font-size: 12px; color: var(--vscode-descriptionForeground);';
	separatorWrapper.appendChild(separatorLabel);
	const separatorInput = createInput({
		type: 'text',
		className: 'kv-separator-input',
		value: context.separator ?? '|',
		attributes: {
			maxLength: 3,
			style: 'width: 40px; padding: 2px 6px; font-size: 12px; text-align: center; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, transparent); border-radius: 2px;'
		}
	});
	separatorWrapper.appendChild(separatorInput);
	footerLeft.appendChild(separatorWrapper);

	footer.appendChild(footerLeft);
	const footerRight = document.createElement('div');
	footerRight.className = 'kv-column-options-footer-right';
	const errorEl = document.createElement('div');
	errorEl.className = 'kv-column-options-error';
	errorEl.hidden = true;
	footerRight.appendChild(errorEl);
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = _t('cancel');
	footerRight.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.textContent = _t('save');
	footerRight.appendChild(saveButton);
	footer.appendChild(footerRight);
	dialog.appendChild(footer);
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			closeColumnOptionsEditor();
		}
	};
	const options = cloneColumnOptionEntries(context.options || []);
	const state = {
		overlay,
		dialog,
		listContainer,
		errorEl,
		scopeCheckbox,
		multiSelectCheckbox,
		separatorInput,
		column: context.column,
		columnKey: context.columnKey || context.column,
		columnName: context.columnName || context.column,
		folderType: context.folderType || (latestPayload?.folderType ?? 'custom'),
		options,
		keyHandler,
	};
	listContainer.addEventListener('input', handleColumnOptionsEditorInput);
	listContainer.addEventListener('click', handleColumnOptionsEditorClick);
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) {
			closeColumnOptionsEditor();
		}
	});
	dialog.addEventListener('click', (event) => event.stopPropagation());
	closeButton.addEventListener('click', () => closeColumnOptionsEditor());
	cancelButton.addEventListener('click', () => closeColumnOptionsEditor());
	saveButton.addEventListener('click', () => submitColumnOptionsEditor());
	addButton.addEventListener('click', () => {
		if (!columnOptionsEditorState) {
			return;
		}
		resetColumnOptionsEditorError();
		columnOptionsEditorState.options.push({ value: '', label: '', description: '', labelIsFallback: true });
		renderColumnOptionsEditorOptions();
		focusColumnOptionsEditorInput(columnOptionsEditorState.options.length - 1, 'value');
	});
	resetColumnOptionsEditorError(state);
	columnOptionsEditorState = state;
	renderColumnOptionsEditorOptions();
	document.body.appendChild(overlay);
	document.addEventListener('keydown', keyHandler, true);
	document.body.classList.add('kv-column-options-editor-open');
	if (options.length) {
		focusColumnOptionsEditorInput(0, 'value');
	}
}

function closeColumnOptionsEditor() {
	if (!columnOptionsEditorState) {
		return;
	}
	const { overlay, listContainer, keyHandler } = columnOptionsEditorState;
	if (listContainer) {
		listContainer.removeEventListener('input', handleColumnOptionsEditorInput);
		listContainer.removeEventListener('click', handleColumnOptionsEditorClick);
	}
	if (overlay?.parentElement) {
		overlay.parentElement.removeChild(overlay);
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	document.body.classList.remove('kv-column-options-editor-open');
	columnOptionsEditorState = null;
}

function resetColumnOptionsEditorError(state) {
	const targetState = state || columnOptionsEditorState;
	if (!targetState?.errorEl) {
		return;
	}
	targetState.errorEl.textContent = '';
	targetState.errorEl.hidden = true;
}

function setColumnOptionsEditorError(message) {
	if (!columnOptionsEditorState?.errorEl) {
		return;
	}
	columnOptionsEditorState.errorEl.textContent = message || _t('validationErrors');
	columnOptionsEditorState.errorEl.hidden = false;
}

function renderColumnOptionsEditorOptions() {
	if (!columnOptionsEditorState) {
		return;
	}
	const { listContainer, options, columnKey } = columnOptionsEditorState;
	listContainer.innerHTML = '';
	if (!options.length) {
		const empty = document.createElement('div');
		empty.className = 'kv-column-options-empty';
		empty.textContent = _t('noDropdownOptions');
		listContainer.appendChild(empty);
		return;
	}
	options.forEach((option, index) => {
		const row = document.createElement('div');
		row.className = 'kv-column-options-row';
		row.dataset.index = String(index);

		const colorPicker = document.createElement('div');
		colorPicker.className = 'kv-option-color-picker';
		colorPicker.dataset.role = 'color';
		colorPicker.dataset.index = String(index);
		colorPicker.style.backgroundColor = getOptionColor(option, index);
		colorPicker.title = _t('clickSelectColor');
		row.appendChild(colorPicker);

		const valueInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-column-options-input',
			placeholder: _t('optionValue'),
			value: option.value,
			attributes: {
				dataset: {
					role: 'value',
					index: String(index)
				}
			}
		});
		row.appendChild(valueInput);
		const labelInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-column-options-input',
			placeholder: _t('displayText'),
			value: option.labelIsFallback ? '' : (option.label || ''),
			attributes: {
				dataset: {
					role: 'label',
					index: String(index)
				}
			}
		});
		labelInput.value = option.labelIsFallback ? '' : option.label;
		row.appendChild(labelInput);
		const descriptionInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-column-options-input',
			placeholder: _t('tooltipDescOption'),
			value: option.description || '',
			attributes: {
				dataset: {
					role: 'description',
					index: String(index)
				}
			}
		});
		row.appendChild(descriptionInput);
		const actions = document.createElement('div');
		actions.className = 'kv-column-options-actions';
		const moveUpButton = document.createElement('button');
		moveUpButton.type = 'button';
		moveUpButton.className = 'kv-button kv-button-tertiary kv-column-options-action';
		moveUpButton.dataset.role = 'move-up';
		moveUpButton.dataset.index = String(index);
		moveUpButton.innerHTML = '<span class="codicon codicon-arrow-up"></span>';
		moveUpButton.title = _t('moveUp');
		moveUpButton.disabled = index === 0;
		actions.appendChild(moveUpButton);
		const moveDownButton = document.createElement('button');
		moveDownButton.type = 'button';
		moveDownButton.className = 'kv-button kv-button-tertiary kv-column-options-action';
		moveDownButton.dataset.role = 'move-down';
		moveDownButton.dataset.index = String(index);
		moveDownButton.innerHTML = '<span class="codicon codicon-arrow-down"></span>';
		moveDownButton.title = _t('moveDown');
		moveDownButton.disabled = index === options.length - 1;
		actions.appendChild(moveDownButton);
		const removeButton = document.createElement('button');
		removeButton.type = 'button';
		removeButton.className = 'kv-button kv-button-tertiary kv-column-options-action';
		removeButton.dataset.role = 'remove';
		removeButton.dataset.index = String(index);
		removeButton.innerHTML = '<span class="codicon codicon-trash"></span>';
		removeButton.title = _t('delete');
		actions.appendChild(removeButton);
		row.appendChild(actions);
		listContainer.appendChild(row);
	});
}

function handleColumnOptionsEditorInput(event) {
	if (!columnOptionsEditorState) {
		return;
	}
	const target = event.target;
	if (!(target instanceof HTMLInputElement)) {
		return;
	}
	const index = Number(target.dataset.index ?? '-1');
	if (Number.isNaN(index) || index < 0) {
		return;
	}
	const entry = columnOptionsEditorState.options[index];
	if (!entry) {
		return;
	}
	const role = target.dataset.role;
	if (role === 'value') {
		entry.value = target.value;
		if (entry.labelIsFallback) {
			entry.label = entry.value;
		}
	} else if (role === 'label') {
		const rawLabel = target.value;
		entry.label = rawLabel;
		entry.labelIsFallback = rawLabel.trim().length === 0;
		if (entry.labelIsFallback) {
			entry.label = entry.value;
		}
	} else if (role === 'description') {
		entry.description = target.value;
	}
	resetColumnOptionsEditorError();
}

function openColorPicker(targetElement, optionIndex) {
	if (colorPickerPopup) {
		closeColorPicker();
	}

	const overlay = createManagedDialog({
		className: 'kv-color-picker-overlay',
		onClose: () => {
			colorPickerPopup = null;
		}
	});

	const popup = document.createElement('div');
	popup.className = 'kv-color-picker-popup';

	const grid = document.createElement('div');
	grid.className = 'kv-color-picker-grid';
	DEFAULT_COLORS.forEach(color => {
		const colorBtn = document.createElement('button');
		colorBtn.type = 'button';
		colorBtn.className = 'kv-color-picker-btn';
		colorBtn.style.backgroundColor = color;
		colorBtn.dataset.color = color;
		colorBtn.addEventListener('click', () => {
			if (columnOptionsEditorState) {
				columnOptionsEditorState.options[optionIndex].color = color;
				targetElement.style.backgroundColor = color;
				closeColorPicker();
			}
		});
		grid.appendChild(colorBtn);
	});
	popup.appendChild(grid);

	const customWrapper = document.createElement('div');
	customWrapper.className = 'kv-color-picker-custom';
	const customLabel = document.createElement('label');
	customLabel.textContent = _t('customPrefix');
	const customInput = document.createElement('input');
	customInput.type = 'color';
	customInput.value = columnOptionsEditorState?.options[optionIndex]?.color || DEFAULT_COLORS[0];
	customInput.addEventListener('change', () => {
		if (columnOptionsEditorState) {
			columnOptionsEditorState.options[optionIndex].color = customInput.value;
			targetElement.style.backgroundColor = customInput.value;
			closeColorPicker();
		}
	});
	customLabel.appendChild(customInput);
	customWrapper.appendChild(customLabel);
	popup.appendChild(customWrapper);

	overlay.appendChild(popup);
	document.body.appendChild(overlay);

	colorPickerPopup = { overlay, popup, targetElement };

	const rect = targetElement.getBoundingClientRect();
	popup.style.left = `${rect.left}px`;
	popup.style.top = `${rect.bottom + 5}px`;

	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) {
			closeColorPicker();
		}
	});
}

function closeColorPicker() {
	if (colorPickerPopup) {
		colorPickerPopup.overlay.remove();
		colorPickerPopup = null;
	}
}

function handleColumnOptionsEditorClick(event) {
	if (!columnOptionsEditorState) {
		return;
	}

	const colorPicker = event.target instanceof HTMLElement ? event.target.closest('[data-role="color"]') : null;
	if (colorPicker) {
		const index = Number(colorPicker.dataset.index ?? '-1');
		if (!Number.isNaN(index) && index >= 0) {
			openColorPicker(colorPicker, index);
		}
		return;
	}

	const target = event.target instanceof HTMLElement ? event.target.closest('button[data-role]') : null;
	if (!(target instanceof HTMLButtonElement)) {
		return;
	}
	const index = Number(target.dataset.index ?? '-1');
	if (Number.isNaN(index) || index < 0) {
		return;
	}
	const role = target.dataset.role;
	const { options } = columnOptionsEditorState;
	if (role === 'remove') {
		options.splice(index, 1);
		renderColumnOptionsEditorOptions();
		resetColumnOptionsEditorError();
		if (options.length) {
			const focusIndex = Math.min(index, options.length - 1);
			focusColumnOptionsEditorInput(focusIndex, 'value');
		}
		return;
	}
	if (role === 'move-up' && index > 0) {
		const temp = options[index - 1];
		options[index - 1] = options[index];
		options[index] = temp;
		renderColumnOptionsEditorOptions();
		focusColumnOptionsEditorInput(index - 1, 'value');
		resetColumnOptionsEditorError();
		return;
	}
	if (role === 'move-down' && index < options.length - 1) {
		const temp = options[index + 1];
		options[index + 1] = options[index];
		options[index] = temp;
		renderColumnOptionsEditorOptions();
		focusColumnOptionsEditorInput(index + 1, 'value');
		resetColumnOptionsEditorError();
	}
}

function focusColumnOptionsEditorInput(index, role) {
	if (!columnOptionsEditorState) {
		return;
	}
	window.requestAnimationFrame(() => {
		if (!columnOptionsEditorState) {
			return;
		}
		const selector = `.kv-column-options-input[data-role="${role}"][data-index="${index}"]`;
		const input = columnOptionsEditorState.listContainer.querySelector(selector);
		if (input instanceof HTMLInputElement) {
			input.focus({ preventScroll: false });
			if (role === 'value' || role === 'label') {
				input.select();
			}
		}
	});
}

function validateColumnOptionsEntries(entries) {
	const seen = new Set();
	for (let i = 0; i < entries.length; i += 1) {
		const value = (entries[i].value || '').trim();
		if (!value) {
			return { valid: false, message: _tf('optionValueEmpty', i + 1) };
		}
		const key = value.toLowerCase();
		if (seen.has(key)) {
			return { valid: false, message: _tf('optionValueDuplicate', value) };
		}
		seen.add(key);
	}
	return { valid: true };
}

function submitColumnOptionsEditor() {
	if (!columnOptionsEditorState) {
		return;
	}
	resetColumnOptionsEditorError();
	const { column, folderType, options, scopeCheckbox, multiSelectCheckbox, separatorInput } = columnOptionsEditorState;
	const isFileScope = scopeCheckbox ? scopeCheckbox.checked : true;
	const isMultiple = multiSelectCheckbox ? multiSelectCheckbox.checked : false;
	const separator = separatorInput ? (separatorInput.value || '|') : '|';
	const normalized = options.map((option, index) => {
		const value = (option.value || '').trim();
		const description = (option.description || '').trim();
		const color = option.color || getAutoColor(index);
		const hasFallback = option.labelIsFallback === true;
		const rawLabel = hasFallback ? '' : (option.label || '').trim();
		const labelIsFallback = hasFallback || rawLabel.length === 0;
		return {
			value,
			label: rawLabel,
			description,
			color,
			labelIsFallback,
		};
	});
	const validation = validateColumnOptionsEntries(normalized);
	if (!validation.valid) {
		setColumnOptionsEditorError(validation.message || _t('validationErrors'));
		return;
	}
	const payloadOptions = normalized.map((entry) => {
		const result = {
			value: entry.value,
		};
		if (!entry.labelIsFallback && entry.label.length) {
			result.label = entry.label;
		}
		if (entry.description) {
			result.description = entry.description;
		}
		if (entry.color) {
			result.color = entry.color;
		}
		return result;
	});
	vscode.postMessage({
		type: 'saveColumnOptions',
		payload: {
			column,
			folderType,
			options: payloadOptions,
			multiple: isMultiple,
			separator: separator,
			scope: isFileScope ? 'file' : 'global',
		},
	});
	closeColumnOptionsEditor();
}

function createTextureMenuRequestId() {
	return `texture-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function requestTextureMenuData(folderType, requestId) {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			pendingTextureMenuRequests.delete(requestId);
			reject(_t('loadTimeout'));
		}, 15000);
		pendingTextureMenuRequests.set(requestId, { resolve, reject, timeout });
		vscode.postMessage({
			type: 'requestTextureMenu',
			payload: {
				requestId,
				folderType,
			},
		});
	});
}

function requestOpenScriptFile(scriptPath) {
	const value = (scriptPath || '').trim();
	if (!value) {
		return;
	}
	vscode.postMessage({
		type: 'openScriptFile',
		payload: {
			scriptPath: value,
			folderType: latestPayload?.folderType ?? 'custom',
		},
	});
}

function requestRowReorder(sourceId, sourceIndex, targetIndex) {
	if (!sourceId || typeof sourceIndex !== 'number' || Number.isNaN(sourceIndex) || typeof targetIndex !== 'number' || Number.isNaN(targetIndex)) {
		return;
	}
	vscode.postMessage({
		type: 'reorderRows',
		payload: {
			sourceId,
			sourceIndex,
			targetIndex,
		},
	});
}

function requestColumnReorder(sourceKey, sourceIndex, targetIndex) {
	if (!sourceKey || typeof sourceIndex !== 'number' || Number.isNaN(sourceIndex) || typeof targetIndex !== 'number' || Number.isNaN(targetIndex)) {
		return;
	}
	vscode.postMessage({
		type: 'reorderColumns',
		payload: {
			sourceKey,
			sourceIndex,
			targetIndex,
		},
	});
}

function handleTextureMenuData(payload) {
	if (!payload || typeof payload.requestId !== 'string') {
		return;
	}
	const pending = pendingTextureMenuRequests.get(payload.requestId);
	if (!pending) {
		return;
	}
	clearTimeout(pending.timeout);
	pendingTextureMenuRequests.delete(payload.requestId);
	pending.resolve(payload);
}

function handleTextureMenuError(payload) {
	if (!payload || typeof payload.requestId !== 'string') {
		return;
	}
	const pending = pendingTextureMenuRequests.get(payload.requestId);
	if (!pending) {
		return;
	}
	clearTimeout(pending.timeout);
	pendingTextureMenuRequests.delete(payload.requestId);
	pending.reject(payload.error || _t('loadFailed'));
}

function handleColumnDragStart(event, columnKey, columnIndex, handleElement) {
	if (!event || columnIndex <= 0 || !latestPayload?.columns?.length) {
		if (event) {
			event.preventDefault();
		}
		return;
	}
	columnDragState = {
		sourceKey: columnKey,
		sourceIndex: columnIndex,
		targetIndex: undefined,
		targetHeader: null,
		dropPosition: null,
		handle: handleElement || null,
	};
	if (event.dataTransfer) {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain', columnKey ?? '');
	}
	if (handleElement instanceof HTMLElement) {
		handleElement.classList.add('kv-column-letter-dragging');
	}
	document.body.classList.add('kv-column-dragging');
}

function handleColumnDragEnd(event, handleElement) {
	if (handleElement instanceof HTMLElement) {
		handleElement.classList.remove('kv-column-letter-dragging');
	}
	cleanupColumnDragState();
}


function handleColumnDragOver(event, headerElement, columnKey, columnIndex) {
	if (!columnDragState || !Array.isArray(latestPayload?.columns) || columnIndex < 0 || !headerElement) {
		return;
	}
	const columns = latestPayload.columns;
	const rect = headerElement.getBoundingClientRect();
	const center = rect.left + rect.width / 2;
	let position = event.clientX < center ? 'before' : 'after';
	if (columnIndex === 0 && position === 'before') {
		position = 'after';
	}
	let dropIndex = position === 'before' ? columnIndex : columnIndex + 1;
	dropIndex = Math.max(1, Math.min(dropIndex, columns.length));
	const sourceIndex = columnDragState.sourceIndex;
	let effectiveTarget = dropIndex;
	if (dropIndex > sourceIndex) {
		effectiveTarget -= 1;
	}
	if (!Number.isInteger(effectiveTarget) || effectiveTarget === sourceIndex || effectiveTarget < 1) {
		columnDragState.targetIndex = undefined;
		clearColumnDropIndicator();
		return;
	}
	columnDragState.targetIndex = dropIndex;
	columnDragState.dropPosition = position;
	setColumnDropIndicator(headerElement, position);
	if (event) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}
}

function handleColumnDragLeave(event, headerElement) {
	if (!columnDragState || !headerElement) {
		return;
	}
	const related = event?.relatedTarget;
	if (related && headerElement.contains(related)) {
		return;
	}
	if (columnDragState.targetHeader === headerElement) {
		headerElement.classList.remove('kv-column-drop-target-before', 'kv-column-drop-target-after');
		columnDragState.targetHeader = null;
		columnDragState.targetIndex = undefined;
		columnDragState.dropPosition = null;
	}
}

function handleColumnDrop(event, columnKey) {
	if (!columnDragState) {
		return;
	}
	if (event) {
		event.preventDefault();
	}
	const { sourceKey, sourceIndex, targetIndex } = columnDragState;
	if (sourceKey && typeof targetIndex === 'number') {
		let finalIndex = targetIndex;
		if (finalIndex > sourceIndex) {
			finalIndex -= 1;
		}
		const maxIndex = Math.max(1, ((latestPayload?.columns?.length ?? 1) - 1));
		finalIndex = Math.max(1, Math.min(finalIndex, maxIndex));
		if (finalIndex !== sourceIndex) {
			requestColumnReorder(sourceKey, sourceIndex, finalIndex);
		}
	}
	cleanupColumnDragState();
}

function setColumnDropIndicator(headerElement, position) {
	if (!columnDragState || !headerElement) {
		return;
	}
	if (columnDragState.targetHeader && columnDragState.targetHeader !== headerElement) {
		columnDragState.targetHeader.classList.remove('kv-column-drop-target-before', 'kv-column-drop-target-after');
	}
	headerElement.classList.toggle('kv-column-drop-target-before', position === 'before');
	headerElement.classList.toggle('kv-column-drop-target-after', position === 'after');
	columnDragState.targetHeader = headerElement;
}

function clearColumnDropIndicator() {
	if (columnDragState?.targetHeader) {
		columnDragState.targetHeader.classList.remove('kv-column-drop-target-before', 'kv-column-drop-target-after');
		columnDragState.targetHeader = null;
	}
}

function cleanupColumnDragState() {
	clearColumnDropIndicator();
	if (columnDragState?.handle instanceof HTMLElement) {
		columnDragState.handle.classList.remove('kv-column-letter-dragging');
	}
	columnDragState = null;
	document.body.classList.remove('kv-column-dragging');
}

function handleRowDragStart(event, rowId, rowIndex, totalRows) {
	if (!rowId) {
		event.preventDefault();
		return;
	}
	rowDragState = {
		sourceId: rowId,
		sourceIndex: rowIndex,
		totalRows,
		placeholder: null,
	};
	event.dataTransfer.effectAllowed = 'move';
	event.dataTransfer.setData('text/plain', rowId);
	const handle = event.currentTarget;
	if (handle instanceof HTMLElement) {
		handle.classList.add('kv-row-dragging');
	}
	requestAnimationFrame(() => {
		if (rowDragState) {
			rowDragState.placeholder = createRowPlaceholder();
		}
	});
}

function handleRowDragEnd(event) {
	cleanupDragIndicators();
	const handle = event.currentTarget;
	if (handle instanceof HTMLElement) {
		handle.classList.remove('kv-row-dragging');
	}
}

function handleRowDragEnter(event, rowElement) {
	if (!rowDragState || !rowElement || !rowElement.parentElement) {
		return;
	}
	if (!isValidDropTarget(rowElement)) {
		return;
	}
	event.preventDefault();
	rowElement.classList.add('kv-row-drop-target');
	insertPlaceholder(rowElement, event.clientY);
}

function handleRowDragOver(event, rowElement) {
	if (!rowDragState || !rowElement || !rowElement.parentElement) {
		return;
	}
	if (!isValidDropTarget(rowElement)) {
		return;
	}
	event.preventDefault();
	event.dataTransfer.dropEffect = 'move';
	rowElement.classList.add('kv-row-drop-target');
	insertPlaceholder(rowElement, event.clientY);
}

function handleRowDragLeave(rowElement) {
	if (!rowElement) {
		return;
	}
	rowElement.classList.remove('kv-row-drop-target');
}

function handleRowDrop(event, rowElement) {
	if (!rowDragState || !rowElement) {
		return;
	}
	event.preventDefault();
	let targetIndex = computePlaceholderIndex(rowElement.parentElement);
	if (typeof targetIndex === 'number') {
		if (targetIndex > rowDragState.sourceIndex) {
			targetIndex -= 1;
		}
		if (targetIndex !== rowDragState.sourceIndex) {
			requestRowReorder(rowDragState.sourceId, rowDragState.sourceIndex, targetIndex);
		}
	}
	cleanupDragIndicators();
}

function handleRowContainerDragOver(event, tbody) {
	if (!rowDragState || !tbody) {
		return;
	}
	if (!tbody.contains(event.target)) {
		return;
	}
	event.preventDefault();
	event.dataTransfer.dropEffect = 'move';
	insertPlaceholderIntoContainer(tbody, event.clientY);
}

function handleRowContainerDragLeave(event, tbody) {
	if (!rowDragState || !tbody) {
		return;
	}
	if (!tbody.contains(event.relatedTarget)) {
		cleanupDragIndicators();
	}
}

function handleRowContainerDrop(event, tbody) {
	if (!rowDragState || !tbody) {
		return;
	}
	event.preventDefault();
	let targetIndex = computePlaceholderIndex(tbody);
	if (typeof targetIndex === 'number') {
		if (targetIndex > rowDragState.sourceIndex) {
			targetIndex -= 1;
		}
		if (targetIndex !== rowDragState.sourceIndex) {
			requestRowReorder(rowDragState.sourceId, rowDragState.sourceIndex, targetIndex);
		}
	}
	cleanupDragIndicators();
}

function cleanupDragIndicators() {
	if (rowDragState?.placeholder) {
		rowDragState.placeholder.remove();
	}
	const highlighted = tableSection?.querySelectorAll('.kv-row-drop-target');
	if (highlighted) {
		highlighted.forEach((row) => row.classList.remove('kv-row-drop-target'));
	}
	const draggingHandles = tableSection?.querySelectorAll('.kv-row-drag-btn.kv-row-dragging');
	if (draggingHandles) {
		draggingHandles.forEach((handle) => handle.classList.remove('kv-row-dragging'));
	}
	rowDragState = null;
}

function isValidDropTarget(rowElement) {
	if (!rowDragState || !rowElement) {
		return false;
	}
	const rowId = rowElement.dataset.rowId;
	if (!rowId || rowId === rowDragState.sourceId) {
		return false;
	}
	return true;
}

function insertPlaceholder(rowElement, clientY) {
	if (!rowDragState || !rowElement || !rowElement.parentElement) {
		return;
	}
	const tbody = rowElement.parentElement;
	const placeholder = rowDragState.placeholder ?? createRowPlaceholder();
	rowDragState.placeholder = placeholder;
	const rect = rowElement.getBoundingClientRect();
	const shouldInsertBefore = clientY < rect.top + rect.height / 2;
	if (shouldInsertBefore) {
		if (rowElement.previousSibling !== placeholder) {
			tbody.insertBefore(placeholder, rowElement);
		}
	} else if (rowElement.nextSibling !== placeholder) {
		tbody.insertBefore(placeholder, rowElement.nextSibling);
	}
}

function insertPlaceholderIntoContainer(tbody, clientY) {
	if (!rowDragState || !tbody) {
		return;
	}
	const placeholder = rowDragState.placeholder ?? createRowPlaceholder();
	rowDragState.placeholder = placeholder;
	const rows = Array.from(tbody.querySelectorAll('tr.kv-row'));
	if (!rows.length) {
		tbody.appendChild(placeholder);
		return;
	}
	let inserted = false;
	for (const row of rows) {
		const rect = row.getBoundingClientRect();
		if (clientY < rect.top + rect.height / 2) {
			if (row.previousSibling !== placeholder) {
				tbody.insertBefore(placeholder, row);
			}
			inserted = true;
			break;
		}
	}
	if (!inserted && rows[rows.length - 1].nextSibling !== placeholder) {
		tbody.appendChild(placeholder);
	}
}

function computePlaceholderIndex(container) {
	if (!rowDragState || !container) {
		return undefined;
	}
	const rows = Array.from(container.querySelectorAll('tr.kv-row'));
	const placeholder = rowDragState.placeholder;
	if (!rows.length || !placeholder) {
		return undefined;
	}
	const siblings = Array.from(container.children);
	const placeholderIndex = siblings.indexOf(placeholder);
	if (placeholderIndex === -1) {
		return undefined;
	}
	const targetIndex = siblings.slice(0, placeholderIndex).filter((node) => node.classList?.contains?.('kv-row')).length;
	return targetIndex;
}

function createRowPlaceholder() {
	const placeholder = document.createElement('tr');
	placeholder.className = 'kv-row-placeholder';
	const headerCells = tableSection?.querySelectorAll('thead th');
	const colSpan = Math.max(1, headerCells ? headerCells.length : 1);
	const td = document.createElement('td');
	td.colSpan = colSpan;
	placeholder.appendChild(td);
	return placeholder;
}

function openTextureMenu(context) {
	closeTextureMenu();
	closeMultiSelectDropdown({ preservePending: true });
	const requestId = createTextureMenuRequestId();
	const overlayElements = createTextureMenuOverlaySkeleton();
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			closeTextureMenu();
		}
	};
	document.addEventListener('keydown', keyHandler);
	document.body.classList.add('kv-texture-menu-open');
	textureMenuState = {
		requestId,
		overlay: overlayElements.overlay,
		container: overlayElements.container,
		header: overlayElements.header,
		body: overlayElements.body,
		loading: overlayElements.loading,
		context,
		keyHandler,
		selectedKind: null,
		searchValue: '',
		data: null,
		sourceButtons: new Map(),
		heroWrapper: null,
		heroFilters: [],
		activeHeroId: null,
		searchInput: null,
		displayMode: 'both',
		heroFilterBtn: null,
		heroFilterImg: null,
		heroDropdown: null,
		displayModeButton: null,
		outsideClickHandler: null,
		heroButtonRefs: new Map(),
	};
	requestTextureMenuData(context.folderType, requestId)
		.then((data) => {
			if (!textureMenuState || textureMenuState.requestId !== requestId) {
				return;
			}
			populateTextureMenu(data);
		})
		.catch((error) => {
			if (!textureMenuState || textureMenuState.requestId !== requestId) {
				return;
			}
			showTextureMenuError(typeof error === 'string' ? error : _t('loadFailed'));
		});
}

function closeTextureMenu() {
	if (!textureMenuState) {
		return;
	}
	if (textureMenuState.overlay && textureMenuState.overlay.parentElement) {
		textureMenuState.overlay.parentElement.removeChild(textureMenuState.overlay);
	}
	if (textureMenuState.keyHandler) {
		document.removeEventListener('keydown', textureMenuState.keyHandler);
	}
	if (textureMenuState.outsideClickHandler) {
		document.removeEventListener('mousedown', textureMenuState.outsideClickHandler);
	}
	const pending = pendingTextureMenuRequests.get(textureMenuState.requestId);
	if (pending) {
		clearTimeout(pending.timeout);
		pendingTextureMenuRequests.delete(textureMenuState.requestId);
	}
	document.body.classList.remove('kv-texture-menu-open');
	textureMenuState = null;
}

function createTextureMenuOverlaySkeleton() {
	const overlay = document.createElement('div');
	overlay.className = 'kv-texture-menu-overlay';
	const container = document.createElement('div');
	container.className = 'kv-texture-menu';
	const header = document.createElement('div');
	header.className = 'kv-texture-menu-header';
	const body = document.createElement('div');
	body.className = 'kv-texture-menu-body';
	const loading = document.createElement('div');
	loading.className = 'kv-texture-menu-loading';
	loading.textContent = _t('loadingIcons');
	body.appendChild(loading);
	container.appendChild(header);
	container.appendChild(body);
	container.addEventListener('click', (event) => event.stopPropagation());
	overlay.addEventListener('click', () => closeTextureMenu());
	overlay.appendChild(container);
	document.body.appendChild(overlay);
	return { overlay, container, header, body, loading };
}

function populateTextureMenu(data) {
	if (!textureMenuState) {
		return;
	}
	textureMenuState.data = data;
	textureMenuState.heroFilters = data.heroFilters || [];
	textureMenuState.header.innerHTML = '';
	textureMenuState.body.innerHTML = '';
	const hasSpellIcons = data.icons.some((icon) => icon.kind === 'spell');
	const hasItemIcons = data.icons.some((icon) => icon.kind === 'item');
	let selectedKind = data.defaultKind;
	if (textureMenuState.context.preferredKind && data.icons.some((icon) => icon.kind === textureMenuState.context.preferredKind)) {
		selectedKind = textureMenuState.context.preferredKind;
	}
	if (!data.icons.some((icon) => icon.kind === selectedKind)) {
		selectedKind = hasSpellIcons ? 'spell' : hasItemIcons ? 'item' : data.defaultKind;
	}
	textureMenuState.selectedKind = selectedKind;
	textureMenuState.searchValue = textureMenuState.context.currentValue || '';
	const headerRow = document.createElement('div');
	headerRow.className = 'kv-texture-menu-search-row';
	const toggleGroup = document.createElement('div');
	toggleGroup.className = 'kv-texture-menu-toggle-group';
	const spellButton = createTextureMenuToggleButton('spell', _t('abilityIcons'), hasSpellIcons);
	const itemButton = createTextureMenuToggleButton('item', _t('itemIcons'), hasItemIcons);
	textureMenuState.sourceButtons.set('spell', spellButton);
	textureMenuState.sourceButtons.set('item', itemButton);
	toggleGroup.appendChild(spellButton);
	toggleGroup.appendChild(itemButton);
	headerRow.appendChild(toggleGroup);
	const searchWrapper = document.createElement('div');
	searchWrapper.className = 'kv-texture-menu-search';
	const searchInput = createInput({
		type: 'search',
		className: 'kv-texture-menu-search-input',
		placeholder: _t('enterKeywords'),
		value: textureMenuState.searchValue
	});
	searchInput.addEventListener('input', () => handleTextureMenuSearchChange(searchInput.value));
	searchWrapper.appendChild(searchInput);
	headerRow.appendChild(searchWrapper);
	textureMenuState.searchInput = searchInput;
	// filter area will contain hero-filter button and display-mode toggle
	const filterWrapper = document.createElement('div');
	filterWrapper.className = 'kv-texture-menu-filter';
	// hero filter button (shows current hero or icon)
	const heroFilterBtn = document.createElement('button');
	heroFilterBtn.type = 'button';
	heroFilterBtn.className = 'kv-texture-menu-hero-filter-btn';
	heroFilterBtn.title = _t('heroFilter');
	// small img inside
	const heroFilterImg = document.createElement('img');
	heroFilterImg.className = 'kv-texture-menu-hero-filter-img';
	heroFilterImg.alt = _t('heroes');
	heroFilterBtn.appendChild(heroFilterImg);
	filterWrapper.appendChild(heroFilterBtn);

	// display mode toggle (icon only vs icon+label)
	const displayModeBtn = document.createElement('button');
	displayModeBtn.type = 'button';
	displayModeBtn.className = 'kv-texture-menu-displaymode-btn';
	displayModeBtn.title = _t('toggleDisplayMode');
	filterWrapper.appendChild(displayModeBtn);

	// dropdown panel container (hidden by default)
	const heroDropdown = document.createElement('div');
	heroDropdown.className = 'kv-texture-menu-hero-dropdown';
	heroDropdown.hidden = true;
	filterWrapper.appendChild(heroDropdown);

	headerRow.appendChild(filterWrapper);
	textureMenuState.heroWrapper = heroDropdown;
	textureMenuState.displayMode = textureMenuState.displayMode || 'both';
	textureMenuState.heroFilterBtn = heroFilterBtn;
	textureMenuState.heroFilterImg = heroFilterImg;
	textureMenuState.heroDropdown = heroDropdown;
	textureMenuState.displayModeButton = displayModeBtn;

	const outsideClickHandler = (event) => {
		if (!textureMenuState || !textureMenuState.heroDropdown || !textureMenuState.heroFilterBtn) {
			return;
		}
		if (!filterWrapper.contains(event.target)) {
			textureMenuState.heroDropdown.hidden = true;
		}
	};
	document.addEventListener('mousedown', outsideClickHandler);
	textureMenuState.outsideClickHandler = outsideClickHandler;

	// interactions
	heroFilterBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		if (heroFilterBtn.disabled) {
			return;
		}
		if (textureMenuState && textureMenuState.selectedKind !== 'spell') {
			// only enabled for abilities
			return;
		}
		if (heroDropdown.hidden) {
			heroDropdown.hidden = false;
		} else {
			heroDropdown.hidden = true;
		}
	});
	displayModeBtn.addEventListener('click', () => {
		if (!textureMenuState) return;
		textureMenuState.displayMode = textureMenuState.displayMode === 'icon' ? 'both' : 'icon';
		updateDisplayModeButton();
		renderTextureMenuGrid();
	});
	updateDisplayModeButton();
	textureMenuState.header.appendChild(headerRow);
	buildHeroFilterButtons();
	updateTextureMenuToggleState();
	renderTextureMenuGrid();
	if (textureMenuState.searchInput) {
		textureMenuState.searchInput.focus();
		if (textureMenuState.searchInput.value) {
			textureMenuState.searchInput.select();
		}
	}
}

function createTextureMenuToggleButton(kind, label, available) {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = 'kv-texture-menu-toggle';
	button.textContent = label;
	button.dataset.kind = kind;
	if (!available) {
		button.disabled = true;
		button.classList.add('kv-texture-menu-toggle-disabled');
	}
	button.addEventListener('click', () => {
		if (button.disabled) {
			return;
		}
		setTextureMenuKind(kind);
	});
	return button;
}

function setTextureMenuKind(kind) {
	if (!textureMenuState || textureMenuState.selectedKind === kind) {
		return;
	}
	textureMenuState.selectedKind = kind;
	if (kind !== 'spell') {
		textureMenuState.activeHeroId = null;
	}
	updateTextureMenuToggleState();
	applyTextureMenuHeroVisibility();
	renderTextureMenuGrid();
}

function updateTextureMenuToggleState() {
	if (!textureMenuState) {
		return;
	}
	for (const [kind, button] of textureMenuState.sourceButtons.entries()) {
		if (kind === textureMenuState.selectedKind) {
			button.classList.add('kv-texture-menu-toggle-active');
		} else {
			button.classList.remove('kv-texture-menu-toggle-active');
		}
	}
	applyTextureMenuHeroVisibility();
}

function buildHeroFilterButtons(heroFilters) {
	if (!textureMenuState || !textureMenuState.heroWrapper) {
		return;
	}
	const dropdown = textureMenuState.heroWrapper;
	dropdown.innerHTML = '';
	textureMenuState.heroButtonRefs = new Map();
	const effectiveHeroes = heroFilters || textureMenuState.heroFilters;
	if (!effectiveHeroes || !effectiveHeroes.length) {
		dropdown.hidden = true;
		return;
	}
	const groups = {
		DOTA_ATTRIBUTE_STRENGTH: [],
		DOTA_ATTRIBUTE_AGILITY: [],
		DOTA_ATTRIBUTE_INTELLECT: [],
		DOTA_ATTRIBUTE_ALL: [],
		OTHER: [],
	};
	for (const hero of effectiveHeroes) {
		const attr = hero.attribute || 'OTHER';
		if (attr && groups[attr]) {
			groups[attr].push(hero);
		} else if (attr && attr.startsWith('DOTA_ATTRIBUTE_')) {
			groups.OTHER.push(hero);
		} else {
			groups.OTHER.push(hero);
		}
	}
	const clearBtn = document.createElement('button');
	clearBtn.type = 'button';
	clearBtn.className = 'kv-texture-menu-hero-clear';
	clearBtn.textContent = _t('all');
	clearBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		selectHeroFilter();
		dropdown.hidden = true;
	});
	dropdown.appendChild(clearBtn);
	textureMenuState.heroButtonRefs.set('__all__', clearBtn);

	const makeSection = (title, list) => {
		if (!list.length) return;
		const sec = document.createElement('div');
		sec.className = 'kv-texture-menu-hero-section';
		const h = document.createElement('div');
		h.className = 'kv-texture-menu-hero-section-title';
		h.textContent = title;
		sec.appendChild(h);
		const wrap = document.createElement('div');
		wrap.className = 'kv-texture-menu-hero-grid';
		for (const hero of list) {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'kv-texture-menu-hero-select';
			btn.title = hero.name;
			const img = document.createElement('img');
			img.src = hero.uri;
			img.alt = hero.name;
			btn.appendChild(img);
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				selectHeroFilter(hero);
				dropdown.hidden = true;
			});
			wrap.appendChild(btn);
			textureMenuState.heroButtonRefs.set(hero.id, btn);
		}
		sec.appendChild(wrap);
		dropdown.appendChild(sec);
	};
	makeSection(_t('strength'), groups.DOTA_ATTRIBUTE_STRENGTH);
	makeSection(_t('agility'), groups.DOTA_ATTRIBUTE_AGILITY);
	makeSection(_t('intelligence'), groups.DOTA_ATTRIBUTE_INTELLECT);
	makeSection(_t('universal'), groups.DOTA_ATTRIBUTE_ALL);
	makeSection(_t('other'), groups.OTHER);
	dropdown.hidden = textureMenuState.selectedKind !== 'spell';
	updateHeroFilterButtonImage();
	updateHeroFilterSelection();
}

function applyTextureMenuHeroVisibility() {
	if (!textureMenuState || !textureMenuState.heroWrapper) {
		return;
	}
	const hasHeroes = Boolean(textureMenuState.heroFilters && textureMenuState.heroFilters.length);
	const shouldEnable = textureMenuState.selectedKind === 'spell' && hasHeroes;
	textureMenuState.heroWrapper.hidden = !shouldEnable;
	if (textureMenuState.heroFilterBtn) {
		textureMenuState.heroFilterBtn.disabled = !shouldEnable;
		textureMenuState.heroFilterBtn.classList.toggle('kv-texture-menu-hero-filter-disabled', !shouldEnable);
	}
	if (textureMenuState.heroDropdown) {
		textureMenuState.heroDropdown.hidden = true;
	}
	if (!shouldEnable) {
		textureMenuState.activeHeroId = null;
		updateHeroFilterSelection();
		updateHeroFilterButtonImage();
	}
}

function selectHeroFilter(hero) {
	if (!textureMenuState) {
		return;
	}
	textureMenuState.activeHeroId = hero ? hero.id : null;
	const value = hero ? hero.searchTerm : '';
	textureMenuState.searchValue = value;
	if (textureMenuState.searchInput) {
		textureMenuState.searchInput.value = value;
		textureMenuState.searchInput.focus();
		if (value) {
			textureMenuState.searchInput.select();
		}
	}
	updateHeroFilterSelection();
	updateHeroFilterButtonImage();
	renderTextureMenuGrid();
}

function updateHeroFilterSelection() {
	if (!textureMenuState) {
		return;
	}
	if (!textureMenuState.heroButtonRefs) {
		return;
	}
	for (const [id, button] of textureMenuState.heroButtonRefs.entries()) {
		if (!(button instanceof HTMLButtonElement)) {
			continue;
		}
		if (id === '__all__') {
			if (!textureMenuState.activeHeroId) {
				button.classList.add('kv-texture-menu-hero-clear-active');
			} else {
				button.classList.remove('kv-texture-menu-hero-clear-active');
			}
			continue;
		}
		if (id === textureMenuState.activeHeroId) {
			button.classList.add('kv-texture-menu-hero-select-active');
		} else {
			button.classList.remove('kv-texture-menu-hero-select-active');
		}
	}
}

function findHeroFilterById(id) {
	if (!textureMenuState || !id) {
		return undefined;
	}
	return (textureMenuState.heroFilters || []).find((hero) => hero.id === id);
}

function getDefaultHeroForButton() {
	if (!textureMenuState) {
		return undefined;
	}
	const heroes = textureMenuState.heroFilters || [];
	if (!heroes.length) {
		return undefined;
	}
	const defaultHero = heroes.find((hero) => /npc_dota_hero_default/i.test(hero.id));
	return defaultHero || heroes[0];
}

function updateHeroFilterButtonImage() {
	if (!textureMenuState || !textureMenuState.heroFilterImg) {
		return;
	}
	let hero = textureMenuState.activeHeroId ? findHeroFilterById(textureMenuState.activeHeroId) : undefined;
	if (!hero) {
		hero = getDefaultHeroForButton();
	}
	if (hero) {
		textureMenuState.heroFilterImg.src = hero.uri;
		textureMenuState.heroFilterImg.alt = hero.name;
		if (textureMenuState.heroFilterBtn) {
			textureMenuState.heroFilterBtn.title = textureMenuState.activeHeroId ? _tf('currentFilter', hero.name) : _t('heroFilter');
		}
	} else {
		textureMenuState.heroFilterImg.removeAttribute('src');
		textureMenuState.heroFilterImg.alt = '';
		if (textureMenuState.heroFilterBtn) {
			textureMenuState.heroFilterBtn.title = _t('heroFilter');
		}
	}
}

function updateDisplayModeButton() {
	if (!textureMenuState || !textureMenuState.displayModeButton) {
		return;
	}
	const button = textureMenuState.displayModeButton;
	button.innerHTML = '';
	const icon = document.createElement('span');
	const iconOnly = textureMenuState.displayMode === 'icon';
	icon.className = `codicon ${iconOnly ? 'codicon-symbol-color' : 'codicon-symbol-text'}`;
	button.appendChild(icon);
	button.setAttribute('aria-label', iconOnly ? _t('switchToImageText') : _t('switchToImageOnly'));
	button.title = iconOnly ? _t('switchToImageText') : _t('switchToImageOnly');
	button.classList.toggle('kv-texture-menu-displaymode-icononly', iconOnly);
}

function handleTextureMenuSearchChange(value) {
	if (!textureMenuState) {
		return;
	}
	textureMenuState.searchValue = value;
	if (!value) {
		textureMenuState.activeHeroId = null;
	} else if (textureMenuState.activeHeroId) {
		const hero = (textureMenuState.heroFilters || []).find((item) => item.id === textureMenuState.activeHeroId);
		if (!hero || hero.searchTerm !== value) {
			textureMenuState.activeHeroId = null;
		}
	}
	updateHeroFilterSelection();
	updateHeroFilterButtonImage();
	renderTextureMenuGrid();
}

function filterTextureMenuIcons() {
	if (!textureMenuState || !textureMenuState.data) {
		return [];
	}
	const icons = textureMenuState.data.icons.filter((icon) => icon.kind === textureMenuState.selectedKind);
	const rawSearch = (textureMenuState.searchValue || '').toLowerCase();
	const keywords = rawSearch
		.trim()
		.split(/\s+/)
		.filter(Boolean);
	if (!keywords.length) {
		return icons;
	}
	return icons.filter((icon) => keywords.every((keyword) => matchesTextureMenuKeyword(icon, keyword)));
}

function matchesTextureMenuKeyword(icon, keyword) {
	if (!keyword) {
		return true;
	}
	const searchKey = (icon.searchKey || '').toLowerCase();
	const relativePathLower = getIconRelativePathLower(icon);
	if (relativePathLower.includes(keyword)) {
		return true;
	}
	const textureNameLower = getIconTextureNameLower(icon);
	if (textureNameLower.includes(keyword)) {
		return true;
	}

	if (icon.kind === 'item') {
		const withPrefix = textureNameLower.startsWith('item_') ? textureNameLower : 'item_' + textureNameLower;
		const withoutPrefix = textureNameLower.startsWith('item_') ? textureNameLower.substring(5) : textureNameLower;
		if (withPrefix.includes(keyword) || withoutPrefix.includes(keyword)) {
			return true;
		}
	}

	const variants = new Set();
	variants.add(keyword);
	const underscoreNormalized = keyword.includes('_') ? keyword.replace(/_/g, ' ') : keyword;
	variants.add(underscoreNormalized);
	const fullyNormalized = underscoreNormalized.replace(/[\\/]+/g, ' ');
	variants.add(fullyNormalized);
	const slashOnlyNormalized = keyword.replace(/[\\/]+/g, ' ');
	variants.add(slashOnlyNormalized);
	for (const variant of variants) {
		const normalized = variant.trim();
		if (!normalized) {
			continue;
		}
		if (searchKey.includes(normalized)) {
			return true;
		}
		if (textureNameLower.includes(normalized)) {
			return true;
		}
	}
	return false;
}

function getIconRelativePathLower(icon) {
	if (!icon) {
		return '';
	}
	if (!icon._relativePathLower) {
		icon._relativePathLower = (icon.relativePath || '').toLowerCase();
	}
	return icon._relativePathLower;
}

function getIconTextureNameLower(icon) {
	if (!icon) {
		return '';
	}
	if (!icon._textureNameLower) {
		icon._textureNameLower = (icon.textureName || '').toLowerCase();
	}
	return icon._textureNameLower;
}

function renderTextureMenuGrid() {
	if (!textureMenuState) {
		return;
	}
	const body = textureMenuState.body;
	body.innerHTML = '';
	const filteredIcons = filterTextureMenuIcons();
	if (!filteredIcons.length) {
		const empty = document.createElement('div');
		empty.className = 'kv-texture-menu-empty';
		empty.textContent = _t('noMatchingIcons');
		body.appendChild(empty);
		return;
	}
	const groups = [
		{ source: 'extension', title: _t('extensionIcons') },
		{ source: 'addon', title: _t('projectIcons') },
	];
	const currentValue = (textureMenuState.context.input.value || '').toLowerCase();
	const showLabel = textureMenuState.displayMode !== 'icon';
	for (const group of groups) {
		const icons = filteredIcons.filter((icon) => icon.source === group.source);
		if (!icons.length) {
			continue;
		}
		const section = document.createElement('div');
		section.className = 'kv-texture-menu-section';
		const title = document.createElement('div');
		title.className = 'kv-texture-menu-section-title';
		title.textContent = group.title;
		section.appendChild(title);
		const grid = document.createElement('div');
		grid.className = 'kv-texture-menu-grid kv-texture-menu-grid-tight';
		for (const icon of icons) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'kv-texture-menu-item';
			button.dataset.texture = icon.textureName;
			const img = document.createElement('img');
			img.src = icon.uri;
			img.alt = icon.label || icon.textureName;
			button.appendChild(img);
			if (showLabel) {
				const caption = document.createElement('span');
				caption.className = 'kv-texture-menu-item-label';
				caption.textContent = icon.label || icon.textureName;
				button.appendChild(caption);
			} else {
				button.classList.add('kv-texture-menu-item-icononly');
				button.setAttribute('aria-label', icon.label || icon.textureName);
			}
			button.title = `${icon.textureName}\n${icon.relativePath}`;
			let iconValueForComparison = icon.textureName.toLowerCase();
			if (icon.kind === 'item' && !iconValueForComparison.startsWith('item_')) {
				iconValueForComparison = 'item_' + iconValueForComparison;
			}
			if (iconValueForComparison === currentValue) {
				button.classList.add('kv-texture-menu-item-selected');
			}
			button.addEventListener('click', () => handleTextureSelection(icon));
			grid.appendChild(button);
		}
		section.appendChild(grid);
		body.appendChild(section);
	}
}

function handleTextureSelection(icon) {
	if (!textureMenuState) {
		return;
	}
	const input = textureMenuState.context.input;
	let newValue = icon.textureName;
	if (icon.kind === 'item' && !newValue.startsWith('item_')) {
		newValue = 'item_' + newValue;
	}
	const currentValue = readElementValue(input, undefined);
	if (currentValue === newValue) {
		closeTextureMenu();
		return;
	}
	setElementValue(input, newValue, undefined);
	handleElementChange(input, undefined);
	if (selectedCell && selectedCell.element === input && formulaValueInput) {
		formulaValueInput.value = newValue;
	}
	closeTextureMenu();
}

function showTextureMenuError(message) {
	if (!textureMenuState) {
		return;
	}
	textureMenuState.header.innerHTML = '';
	textureMenuState.body.innerHTML = '';
	const errorBox = document.createElement('div');
	errorBox.className = 'kv-texture-menu-error';
	errorBox.textContent = message || _t('loadFailed');
	textureMenuState.body.appendChild(errorBox);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-texture-menu-close-button-inline';
	closeButton.textContent = _t('close');
	closeButton.addEventListener('click', () => closeTextureMenu());
	textureMenuState.body.appendChild(closeButton);
}

function applyColumnLayout(columns, layout) {
	if (!Array.isArray(columns) || !layout || typeof layout !== 'object') {
		return;
	}
	const widths = layout.columnWidths;
	if (!widths || typeof widths !== 'object') {
		return;
	}
	for (const column of columns) {
		if (column === ROW_NUMBER_COLUMN_KEY) {
			continue;
		}
		const saved = widths[column];
		if (typeof saved !== 'number' || !Number.isFinite(saved)) {
			continue;
		}
		const normalized = Math.max(getMinColumnWidth(column), Math.round(saved));
		columnWidths[column] = normalized;
		originalColumnWidths[column] = normalized;
		savedColumnWidths.add(column);
		modifiedColumns.delete(column);
	}
}

function render(payload) {
	if (!payload) {
		return;
	}
	try {
		return renderInner(payload);
	} catch (e) {
		console.error('[KvEditor] RENDER CRASH:', e.message, e.stack);
		const errEl = document.getElementById('error');
		if (errEl) {
			errEl.textContent = 'Render error: ' + e.message + '\n' + e.stack;
			errEl.style.display = '';
		}
	}
}
function renderInner(payload) {
	payloadVersion++;
	if (isEditInProgress) {
		console.debug('[KvEditor] Skipping render during edit, version:', payloadVersion);
		return;
	}
	cancelColumnWidthSave();
	const nextDocumentKey = (payload.documentKey || payload.fileName || '').toString();
	if (currentDocumentKey !== nextDocumentKey) {
		resetColumnState();
		currentDocumentKey = nextDocumentKey;
	}
	latestPayload = payload;

	if (payload.columnDescriptions && typeof payload.columnDescriptions === 'object') {
		columnDescriptions = { ...payload.columnDescriptions };
	}

	if (typeof payload.frozenColumns === 'string' && payload.frozenColumns.length > 0) {
		frozenColumns.clear();
		if (payload.columns && Array.isArray(payload.columns)) {
			const targetIndex = payload.columns.indexOf(payload.frozenColumns);
			if (targetIndex >= 0) {
				for (let i = 0; i <= targetIndex; i++) {
					frozenColumns.add(payload.columns[i]);
				}
			}
		}
	} else if (payload.frozenColumns === null || payload.frozenColumns === undefined || payload.frozenColumns === '') {
		frozenColumns.clear();
	}

	if (typeof payload.compactMode === 'boolean') {
		compactMode = payload.compactMode;
		if (toggleCompactModeBtn) {
			if (compactMode) {
				toggleCompactModeBtn.classList.add('active');
				toggleCompactModeBtn.title = _t('compactModeOn');
			} else {
				toggleCompactModeBtn.classList.remove('active');
				toggleCompactModeBtn.title = _t('compactModeOff');
			}
		}
	}

	if (typeof payload.localizedMode === 'boolean') {
		localizedMode = payload.localizedMode;
		if (toggleLocalizedModeBtn) {
			if (localizedMode) {
				toggleLocalizedModeBtn.classList.add('active');
				toggleLocalizedModeBtn.title = _t('localizedModeOn');
			} else {
				toggleLocalizedModeBtn.classList.remove('active');
				toggleLocalizedModeBtn.title = _t('localizedModeOff');
			}
		}
	}

	if (payload.localizationSettings && typeof payload.localizationSettings === 'object') {
		localizationSettings.enabled = Boolean(payload.localizationSettings.enabled);
		localizationSettings.language = String(payload.localizationSettings.language || 'schinese');
		localizationSettings.filePath = String(payload.localizationSettings.filePath || '');
		localizationSettings.autoUpdateOnOpen = Boolean(payload.localizationSettings.autoUpdateOnOpen);
		localizationSettings.mappings = Array.isArray(payload.localizationSettings.mappings)
			? payload.localizationSettings.mappings
			: [];
	}

	if (payload.abilityValuesDescriptions && typeof payload.abilityValuesDescriptions === 'object') {
		abilityValuesDescriptions = { ...payload.abilityValuesDescriptions };
		console.log('[render] Loaded abilityValuesDescriptions:', abilityValuesDescriptions);
	} else {
		abilityValuesDescriptions = {};
		console.log('[render] No abilityValuesDescriptions in payload');
	}

	applyFormulaDefinitions(payload.formulas);
	console.log('[render] Received columnFormulas:', payload.columnFormulas);
	applyColumnFormulas(payload.columnFormulas);
	recalculateFormulas({ emitUpdates: true });
	const metaParts = [];
	if (payload.folderType) {
		metaParts.push(_tf('pathType', formatFolderType(payload.folderType)));
	}
	if (payload.header) {
		metaParts.push(_tf('rootKey', payload.header));
	}
	if (fileNameEl) {
		fileNameEl.textContent = payload.fileName || 'KV File';
	}
	if (fileMetaEl) {
		fileMetaEl.textContent = metaParts.join(' · ');
	}
	updateCreateButtons(payload.folderType, payload.rows);
	if (payload.error) {
		console.error('[KvEditor] payload.error:', payload.error);
		if (errorSection) {
			errorSection.textContent = payload.error;
		}
		clearSelection();
		setSectionVisibility({ showTable: false, showEmpty: false, showError: true });
		return;
	}
	if (errorSection) {
		errorSection.textContent = '';
	}
	columnOptionConfig = payload.columnOptions ? { ...payload.columnOptions } : Object.create(null);
	if (!payload.columns?.length || !payload.rows?.length) {
		if (emptySection) {
			emptySection.textContent = 'No flat entries found for this KV file.';
		}
		if (tableSection) {
			tableSection.innerHTML = '';
		}
		clearSelection();
		setSectionVisibility({ showTable: false, showEmpty: true, showError: false });
		return;
	}
	applyColumnLayout(payload.columns, payload.columnLayout);
	try {
		renderTable(payload.columns, payload.rows, columnOptionConfig);
	} catch (renderErr) {
		console.error('[KvEditor] renderTable error:', renderErr, renderErr.stack);
		if (errorSection) {
			errorSection.textContent = 'Render error: ' + renderErr.message;
		}
		setSectionVisibility({ showTable: false, showEmpty: false, showError: true });
		return;
	}
	if (emptySection) {
		emptySection.textContent = '';
	}
	setSectionVisibility({ showTable: true, showEmpty: false, showError: false });

	if (pendingScrollRight && tableSection) {
		pendingScrollRight = false;
		requestAnimationFrame(() => {
			tableSection.scrollLeft = tableSection.scrollWidth;
		});
	}
}

function formatFolderType(folderType) {
	if (!folderType) {
		return _t('unknown');
	}
	return FOLDER_TYPE_LABELS[folderType] || folderType;
}

window.addEventListener('message', (event) => {
	const message = event.data;
	if (!message || typeof message.type !== 'string') {
		return;
	}
	switch (message.type) {
		case 'update':
			render(message.payload);
			break;
		case 'textureMenuData':
			handleTextureMenuData(message.payload);
			break;
		case 'textureMenuError':
			handleTextureMenuError(message.payload);
			break;
		case 'localizationPathResponse':
			handleLocalizationPathResponse(message.payload);
			break;
		default:
			break;
	}
});

function handleLocalizationPathResponse(payload) {
	const pathInput = document.querySelector('.kv-localization-settings-overlay .kv-input[type="text"]');
	if (pathInput && payload && typeof payload.path === 'string') {
		pathInput.value = payload.path;
		localizationSettings.filePath = payload.path;
	}
}

function openLocalizationSettingsDialog() {
	const overlay = createManagedDialog({
		className: 'kv-localization-settings-overlay',
		onClose: () => {
		}
	});

	const dialog = document.createElement('div');
	dialog.className = 'kv-modal kv-modal-lg';
	overlay.appendChild(dialog);

	const header = document.createElement('div');
	header.className = 'kv-modal-header';
	const title = document.createElement('h3');
	title.className = 'kv-modal-title';
	title.textContent = _t('localizationSettings');
	header.appendChild(title);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-button kv-button-icon';
	closeButton.title = _t('close');
	closeButton.innerHTML = '<span class="codicon codicon-close"></span>';
	closeButton.style.marginLeft = 'auto';
	header.appendChild(closeButton);
	dialog.appendChild(header);

	const body = document.createElement('div');
	body.className = 'kv-modal-body';

	const enabledField = document.createElement('div');
	enabledField.className = 'kv-form-group';
	const enabledLabel = document.createElement('label');
	enabledLabel.className = 'kv-checkbox-wrapper';
	const enabledCheckbox = document.createElement('input');
	enabledCheckbox.type = 'checkbox';
	enabledCheckbox.className = 'kv-checkbox-input';
	enabledCheckbox.checked = localizationSettings.enabled;
	const enabledIndicator = document.createElement('span');
	enabledIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	const enabledText = document.createElement('span');
	enabledText.className = 'kv-checkbox-label';
	enabledText.textContent = _t('bindLocFile');
	enabledLabel.appendChild(enabledCheckbox);
	enabledLabel.appendChild(enabledIndicator);
	enabledLabel.appendChild(enabledText);
	enabledField.appendChild(enabledLabel);
	body.appendChild(enabledField);

	const autoUpdateField = document.createElement('div');
	autoUpdateField.className = 'kv-form-group';
	const autoUpdateLabel = document.createElement('label');
	autoUpdateLabel.className = 'kv-checkbox-wrapper';
	const autoUpdateCheckbox = document.createElement('input');
	autoUpdateCheckbox.type = 'checkbox';
	autoUpdateCheckbox.className = 'kv-checkbox-input';
	autoUpdateCheckbox.checked = localizationSettings.autoUpdateOnOpen;
	const autoUpdateIndicator = document.createElement('span');
	autoUpdateIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	const autoUpdateText = document.createElement('span');
	autoUpdateText.className = 'kv-checkbox-label';
	autoUpdateText.textContent = _t('autoUpdateLoc');
	autoUpdateLabel.appendChild(autoUpdateCheckbox);
	autoUpdateLabel.appendChild(autoUpdateIndicator);
	autoUpdateLabel.appendChild(autoUpdateText);
	autoUpdateField.appendChild(autoUpdateLabel);
	body.appendChild(autoUpdateField);

	const languageField = document.createElement('div');
	languageField.className = 'kv-form-group';
	const languageLabel = document.createElement('label');
	languageLabel.className = 'kv-form-label';
	languageLabel.textContent = _t('language');
	languageField.appendChild(languageLabel);
	const languageSelect = document.createElement('select');
	languageSelect.className = 'kv-input';
	const languages = [
		{ value: 'schinese', label: 'schinese' },
		{ value: 'english', label: 'english' },
		{ value: 'russian', label: 'russian' }
	];
	languages.forEach(lang => {
		const option = document.createElement('option');
		option.value = lang.value;
		option.textContent = lang.label;
		if (lang.value === localizationSettings.language) {
			option.selected = true;
		}
		languageSelect.appendChild(option);
	});
	languageField.appendChild(languageSelect);
	body.appendChild(languageField);

	const pathField = document.createElement('div');
	pathField.className = 'kv-form-group';
	const pathLabel = document.createElement('label');
	pathLabel.className = 'kv-form-label';
	pathLabel.textContent = _t('locFilePath');
	pathField.appendChild(pathLabel);
	const pathInput = createInput({
		type: 'text',
		className: 'kv-input',
		placeholder: _t('pathFormat'),
		value: localizationSettings.filePath,
		attributes: {
			readonly: true
		}
	});
	pathField.appendChild(pathInput);
	body.appendChild(pathField);

	const mappingsField = document.createElement('div');
	mappingsField.className = 'kv-form-group';
	const mappingsLabel = document.createElement('label');
	mappingsLabel.className = 'kv-form-label';
	mappingsLabel.textContent = _t('locExportMappings');
	mappingsField.appendChild(mappingsLabel);

	const tableWrapper = document.createElement('div');
	tableWrapper.className = 'kv-localization-mappings-table-wrapper';
	const table = document.createElement('table');
	table.className = 'kv-localization-mappings-table';

	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	const colNameHeader = document.createElement('th');
	colNameHeader.textContent = _t('locColumn');
	const ruleHeader = document.createElement('th');
	ruleHeader.textContent = _t('locRule');
	const actionHeader = document.createElement('th');
	actionHeader.textContent = _t('actions');
	actionHeader.style.width = '60px';
	headerRow.appendChild(colNameHeader);
	headerRow.appendChild(ruleHeader);
	headerRow.appendChild(actionHeader);
	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');
	table.appendChild(tbody);
	tableWrapper.appendChild(table);
	mappingsField.appendChild(tableWrapper);

	const renderMappingRows = () => {
		tbody.innerHTML = '';
		const currentMappings = localizationSettings.mappings || [];
		currentMappings.forEach((mapping, index) => {
			const row = document.createElement('tr');

			const colNameCell = document.createElement('td');
			const colNameInput = createInput({
				type: 'text',
				className: 'kv-input kv-input-sm',
				value: mapping.columnName,
				placeholder: 'Name'
			});
			colNameInput.addEventListener('input', () => {
				mapping.columnName = colNameInput.value;
			});
			colNameCell.appendChild(colNameInput);
			row.appendChild(colNameCell);

			const ruleCell = document.createElement('td');
			const ruleInput = createInput({
				type: 'text',
				className: 'kv-input kv-input-sm',
				value: mapping.rule,
				placeholder: 'DOTA_Tooltip_ability_${id}_${key}'
			});
			ruleInput.addEventListener('input', () => {
				mapping.rule = ruleInput.value;
			});
			ruleCell.appendChild(ruleInput);
			row.appendChild(ruleCell);

			const actionCell = document.createElement('td');
			const deleteBtn = document.createElement('button');
			deleteBtn.type = 'button';
			deleteBtn.className = 'kv-button kv-button-icon';
			deleteBtn.innerHTML = '<span class="codicon codicon-trash"></span>';
			deleteBtn.title = _t('delete');
			deleteBtn.addEventListener('click', () => {
				localizationSettings.mappings.splice(index, 1);
				renderMappingRows();
			});
			actionCell.appendChild(deleteBtn);
			row.appendChild(actionCell);

			tbody.appendChild(row);
		});

		if (currentMappings.length === 0) {
			const emptyRow = document.createElement('tr');
			const emptyCell = document.createElement('td');
			emptyCell.colSpan = 3;
			emptyCell.className = 'kv-localization-mappings-empty';
			emptyCell.textContent = _t('noMappingRules');
			emptyRow.appendChild(emptyCell);
			tbody.appendChild(emptyRow);
		}
	};

	renderMappingRows();

	const addMappingBtn = document.createElement('button');
	addMappingBtn.type = 'button';
	addMappingBtn.className = 'kv-button kv-button-secondary';
	addMappingBtn.style.marginTop = '8px';
	addMappingBtn.innerHTML = '<span class="codicon codicon-add"></span>' + _t('addMapping');
	addMappingBtn.addEventListener('click', () => {
		if (!localizationSettings.mappings) {
			localizationSettings.mappings = [];
		}
		localizationSettings.mappings.push({ columnName: '', rule: '' });
		renderMappingRows();
		requestAnimationFrame(() => {
			const rows = tbody.querySelectorAll('tr');
			if (rows.length > 0) {
				const lastRow = rows[rows.length - 1];
				const firstInput = lastRow.querySelector('input');
				if (firstInput) firstInput.focus();
			}
		});
	});
	mappingsField.appendChild(addMappingBtn);

	body.appendChild(mappingsField);

	dialog.appendChild(body);

	const footer = document.createElement('div');
	footer.className = 'kv-modal-footer';
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = _t('cancel');
	footer.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.textContent = _t('save');
	footer.appendChild(saveButton);
	dialog.appendChild(footer);

	const updatePathPreview = () => {
		vscode.postMessage({
			type: 'requestLocalizationPath',
			payload: {
				language: languageSelect.value
			}
		});
	};

	languageSelect.addEventListener('change', updatePathPreview);

	closeButton.addEventListener('click', () => {
		overlay.remove();
	});

	cancelButton.addEventListener('click', () => {
		overlay.remove();
	});

	saveButton.addEventListener('click', () => {
		localizationSettings.enabled = enabledCheckbox.checked;
		localizationSettings.autoUpdateOnOpen = autoUpdateCheckbox.checked;
		localizationSettings.language = languageSelect.value;
		localizationSettings.filePath = pathInput.value;

		vscode.postMessage({
			type: 'saveLocalizationSettings',
			payload: localizationSettings
		});

		overlay.remove();
	});

	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			overlay.remove();
		}
	};

	document.addEventListener('keydown', keyHandler, true);
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) {
			overlay.remove();
		}
	});

	dialog.addEventListener('click', (event) => event.stopPropagation());

	document.body.appendChild(overlay);

	updatePathPreview();

	requestAnimationFrame(() => enabledCheckbox.focus());
}

vscode.postMessage({ type: 'ready' });