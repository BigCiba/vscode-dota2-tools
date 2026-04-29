const vscode = acquireVsCodeApi();

const fileNameEl = document.getElementById('kv-file-name');
const fileMetaEl = document.getElementById('kv-file-meta');
const openTextEditorBtn = document.getElementById('kv-open-text-editor');
const openLocalizationFileBtn = document.getElementById('kv-open-localization-file');
const localizationSettingsBtn = document.getElementById('kv-localization-settings');
const toggleCompactModeBtn = document.getElementById('kv-toggle-compact-mode');
const toggleLocalizedModeBtn = document.getElementById('kv-toggle-localized-mode');
const tableSection = document.getElementById('kv-table');
const emptySection = document.getElementById('kv-empty');
const errorSection = document.getElementById('kv-error');
const externalChangeSection = document.getElementById('kv-external-change');
const externalChangeMessageEl = document.getElementById('kv-external-change-message');
const reloadDataBtn = document.getElementById('kv-reload-data');
const formulaAddressInput = document.getElementById('kv-editor-address');
const formulaValueInput = document.getElementById('kv-editor-value');
const formulaHelpBtn = document.getElementById('kv-formula-help');

if (emptySection) {
	emptySection.textContent = 'Loading KV data...';
}

if (reloadDataBtn) {
	reloadDataBtn.addEventListener('click', () => {
		vscode.postMessage({ type: 'reloadData' });
	});
}
setSectionVisibility({ showTable: false, showEmpty: true, showError: false });

// 绑定公式帮助按钮
if (formulaHelpBtn) {
	formulaHelpBtn.addEventListener('click', () => {
		vscode.postMessage({ type: 'openFormulaHelp' });
	});
}

function showExternalChangeNotice(message) {
	if (externalChangeMessageEl) {
		externalChangeMessageEl.textContent = message || '检测到该 KV 文件已被外部修改。请点击“重载”以重新加载最新内容。';
	}
	if (externalChangeSection) {
		externalChangeSection.hidden = false;
	}
}

function hideExternalChangeNotice() {
	if (externalChangeSection) {
		externalChangeSection.hidden = true;
	}
	if (externalChangeMessageEl) {
		externalChangeMessageEl.textContent = '';
	}
}

// 绑定"用文本编辑器打开"按钮事件
if (openTextEditorBtn) {
	openTextEditorBtn.addEventListener('click', () => {
		vscode.postMessage({ type: 'openTextEditor' });
	});
}

function updateOpenLocalizationFileButtonState() {
	if (!openLocalizationFileBtn) {
		return;
	}
	const hasConfig = Boolean(localizationSettings?.enabled && typeof localizationSettings.filePath === 'string' && localizationSettings.filePath.trim().length > 0);
	openLocalizationFileBtn.disabled = !hasConfig;
	openLocalizationFileBtn.title = hasConfig
		? `打开本地化文件: ${localizationSettings.filePath}`
		: '本地化设置未配置，无法打开本地化文件';
}

if (openLocalizationFileBtn) {
	openLocalizationFileBtn.addEventListener('click', () => {
		if (!localizationSettings.enabled || !localizationSettings.filePath) {
			return;
		}
		vscode.postMessage({
			type: 'openLocalizationFile',
			payload: {
				path: localizationSettings.filePath,
			}
		});
	});
}

// 绑定本地化设置按钮
if (localizationSettingsBtn) {
	localizationSettingsBtn.addEventListener('click', () => {
		openLocalizationSettingsDialog();
	});
}

// 本地化设置状态
let localizationSettings = {
	enabled: false,
	language: 'schinese',
	filePath: '',
	autoUpdateOnOpen: false, // 打开文件时自动更新本地化
	mappings: [] // { columnName: string, rule: string }[]
};

updateOpenLocalizationFileButtonState();

// 精简模式状态管理
let compactMode = false;

// 本地化模式状态管理
let localizedMode = false;

// 对话框打开状态管理
let isDialogOpen = false;

// 列描述配置
let columnDescriptions = {};

// 冻结列管理
const frozenColumns = new Set();

// 绑定精简模式切换按钮
if (toggleCompactModeBtn) {
	const updateButtonState = () => {
		if (compactMode) {
			toggleCompactModeBtn.classList.add('active');
			toggleCompactModeBtn.title = '精简模式已开启，点击关闭';
		} else {
			toggleCompactModeBtn.classList.remove('active');
			toggleCompactModeBtn.title = '精简模式已关闭，点击开启';
		}
	};
	updateButtonState();

	toggleCompactModeBtn.addEventListener('click', () => {
		compactMode = !compactMode;
		updateButtonState();

		// 保存到后端
		vscode.postMessage({
			type: 'saveCompactMode',
			payload: { compactMode }
		});

		// 立即重新渲染表格
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

// 绑定本地化模式切换按钮
if (toggleLocalizedModeBtn) {
	const updateButtonState = () => {
		if (localizedMode) {
			toggleLocalizedModeBtn.classList.add('active');
			toggleLocalizedModeBtn.title = '本地化模式已开启，显示描述';
		} else {
			toggleLocalizedModeBtn.classList.remove('active');
			toggleLocalizedModeBtn.title = '本地化模式已关闭，显示原文';
		}
	};
	updateButtonState();

	toggleLocalizedModeBtn.addEventListener('click', () => {
		localizedMode = !localizedMode;
		updateButtonState();

		// 保存到后端
		vscode.postMessage({
			type: 'saveLocalizedMode',
			payload: { localizedMode }
		});

		// 立即重新渲染表格
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
	});
}

const COLUMN_MIN_WIDTH = 100;
const ROW_NUMBER_COLUMN_KEY = '__rowNumber';
const ROW_NUMBER_MIN_WIDTH = 32;

const FOLDER_TYPE_LABELS = {
	ability: '技能',
	item: '物品',
	unit: '单位',
	custom: '自定义'
};

const FORMULA_TOOLTIP_HELP = [
	'公式示例:',
	'1. baseNumber + offset → 生成 1,2,3,4 序列',
	'2. `Row_${rowNumber}` → 输出 Row_1, Row_2 等标签',
	'3. offset % 2 === 0 ? "A" : "B" → 交替填充 A/B',
	'4. direction === 1 ? baseNumber + offset : baseNumber - offset → 向下递增、向上递减'
].join('\n');

let latestPayload = undefined;
let activeCell = undefined;
const columnWidths = Object.create(null);
let currentDocumentKey = undefined;

let selectedCellKey = undefined;
let selectedCell = undefined;
let selectedTd = undefined;
let suppressFormulaCommit = false;
let columnOptionConfig = Object.create(null);

const modifiedColumns = new Set();
const originalColumnWidths = Object.create(null);
const savedColumnWidths = new Set(); // 记录哪些列的宽度是从配置文件加载的
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

// 列筛选状态 - Map<columnKey, Set<string>>，空 Set 表示显示全部
const columnFilters = new Map();
// 当前打开的筛选浮层状态
let filterDropdownState = null;

// AbilityValues 描述数据缓存 - 从 payload 接收
// 格式: { rowId: { key: description } }
let abilityValuesDescriptions = {};

// 行选择状态管理
let selectedRows = new Set(); // 存储选中的行索引
let lastSelectedRowIndex = null; // 用于 Shift 多选
let copiedRowsData = null; // 存储复制的行数据

// 状态版本机制 - 防止过期消息导致数据不一致
let payloadVersion = 0;
let pendingEditVersion = 0;
let isEditInProgress = false;

const FORMULA_ERROR_VALUE = '#ERROR!';
const FORMULA_CYCLE_VALUE = '#CYCLE!';

const formulaDefinitions = new Map();
const columnFormulas = new Map(); // 列公式定义，键为 columnKey，值为公式字符串

// 预定义的颜色选项
const DEFAULT_COLORS = [
	'#4A90E2', '#50C878', '#F5A623', '#E24A4A', '#9B59B6',
	'#1ABC9C', '#E67E22', '#3498DB', '#E91E63', '#9C27B0',
	'#00BCD4', '#8BC34A', '#FFC107', '#FF5722', '#607D8B',
	'#795548', '#FF9800', '#CDDC39', '#03A9F4', '#673AB7'
];

let colorPickerPopup = null;

// 自动分配颜色
function getAutoColor(index) {
	return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}
const formulaComputedValues = new Map();

const FILL_DEFAULT_STEP = 1;
const FILL_DEFAULT_RATIO = 2;
const COLUMN_WIDTH_SAVE_DEBOUNCE_MS = 600;

let columnWidthSaveHandle = null;

// 编辑锁辅助函数 - 防止公式计算期间数据被覆盖
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

// 页面关闭前强制保存列宽，防止防抖丢失
window.addEventListener('beforeunload', () => {
	if (columnWidthSaveHandle) {
		clearTimeout(columnWidthSaveHandle);
		columnWidthSaveHandle = null;
		flushColumnWidthSave();
	}
});

document.addEventListener('mousemove', handleColumnResize);
document.addEventListener('mouseup', stopColumnResize);

// 阻止撤销/重做操作传播到VS Code
document.addEventListener('keydown', (event) => {
	const isUndoRedo = (event.ctrlKey || event.metaKey) && (event.key?.toLowerCase() === 'z' || event.key?.toLowerCase() === 'y');

	if (isUndoRedo) {
		// 当焦点在可编辑元素上时，阻止事件传播到VS Code
		// 这样可以让输入框/文本域使用自己的撤销功能，而不是触发VS Code的文档撤销
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

// 行复制粘贴优先于单元格复制粘贴
document.addEventListener('keydown', handleRowClipboardShortcuts);
document.addEventListener('keydown', handleClipboardShortcuts);
document.addEventListener('keydown', handleDeleteClearSelectedCell);
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

// 根据给定状态切换表格、空白提示和错误提示的显示
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

	// 优先查找单元格公式
	if (idKey && formulaDefinitions.has(idKey)) {
		return formulaDefinitions.get(idKey);
	}
	if (indexKey && formulaDefinitions.has(indexKey)) {
		return formulaDefinitions.get(indexKey);
	}

	// 如果没有单元格公式，查找列公式
	if (column && columnFormulas.has(column)) {
		const formula = columnFormulas.get(column);
		return {
			column,
			rowId,
			rowIndex: Number.isFinite(rowIndex) ? rowIndex : undefined,
			formula,
			isColumnFormula: true // 标记为列公式
		};
	}

	return undefined;
}

function updateFormulaDefinitionsOnIdRename(oldId, newId) {
	if (!oldId || !newId || oldId === newId) {
		return;
	}

	// 收集所有需要更新的公式定义
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

	// 删除旧键，添加新键
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
	// 检查是否有任何公式需要计算（单元格公式或列公式）
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

	// 处理单元格公式
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

	// 处理列公式：为每一行生成公式定义
	columnFormulas.forEach((formula, columnKey) => {
		rows.forEach((row, rowIndex) => {
			const key = makeComputedFormulaKey(columnKey, rowIndex);
			// 如果该位置没有单元格公式，则使用列公式
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
		// id 列存储在 row.id 中，不在 row.values 中
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
		// 比较公式计算结果与文件中的实际值
		const targetRow = rows[definition.rowIndex];
		const currentValueInFile = targetRow?.values?.[definition.column];
		const normalizedCurrentValue = currentValueInFile === undefined || currentValueInFile === null
			? ''
			: String(currentValueInFile);
		// 只有当计算结果与文件中的值不一致时才需要更新
		if (normalizedCurrentValue !== value) {
			const row = rows[definition.rowIndex];
			if (row && row.id) {
				pendingEdits.push({ id: row.id, key: definition.column, value });
			}
		}
		// 更新内存中的值（仅在非编辑状态下）
		if (targetRow && targetRow.values && !isEditInProgress) {
			targetRow.values[definition.column] = value;
		}
	});
	// 使用编辑版本防止竞态条件
	if (emitUpdates && pendingEdits.length && !isEditInProgress) {
		const editVersion = beginEdit();
		dispatchBulkEdit(pendingEdits);
		// 延迟结束编辑状态，等待后端响应
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

// 清空当前选中单元格及其公式编辑器状态
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
		formulaValueInput.placeholder = '选择单元格以编辑';
	}
}

// 选中指定单元格并同步公式栏信息
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
		formulaValueInput.placeholder = disableFormulaInput && context.editable ? '请通过下拉选择' : '';
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
 * 设置对话框打开状态
 * 统一管理所有对话框/弹窗/编辑器的打开状态
 * 当对话框打开时，主界面的单元格操作（撤销恢复、复制粘贴、方向键导航等）将被禁用
 */
function setDialogOpenState(isOpen) {
	isDialogOpen = isOpen;
}

/**
 * 创建带有状态管理的对话框容器
 * @param {Object} options - 配置选项
 * @param {string} options.className - 对话框容器的CSS类名
 * @param {Function} options.onClose - 关闭对话框时的回调函数
 * @returns {HTMLElement} 对话框容器元素
 */
function createManagedDialog(options = {}) {
	const { className = 'kv-dialog-overlay', onClose } = options;

	const overlay = document.createElement('div');
	overlay.className = className;

	// 设置对话框打开状态
	setDialogOpenState(true);

	// 创建原始的移除函数引用
	const originalRemove = overlay.remove.bind(overlay);

	// 重写remove方法以自动更新状态
	overlay.remove = function () {
		setDialogOpenState(false);
		if (onClose) {
			onClose();
		}
		originalRemove();
	};

	// 监听ESC键关闭
	const handleEsc = (event) => {
		if (event.key === 'Escape') {
			event.stopPropagation();
			overlay.remove();
			document.removeEventListener('keydown', handleEsc, true);
		}
	};
	document.addEventListener('keydown', handleEsc, true);

	// 确保在移除时清理事件监听
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
		// 延迟观察，等待元素被添加到DOM
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
	// 获取单元格的公式定义（如果有）
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
	// 处理公式：如果复制的数据包含公式，则调整行引用并保存
	if (clipboardData.formula && typeof clipboardData.formula === 'string') {
		const sourceRow = clipboardData.sourceRowIndex;
		const targetRow = selectedCell.rowIndex;
		if (Number.isFinite(sourceRow) && Number.isFinite(targetRow)) {
			const rowOffset = targetRow - sourceRow;
			const adjustedFormula = offsetFormulaReferences(clipboardData.formula, rowOffset);
			// 设置公式定义
			setFormulaDefinition(selectedCell.column, selectedCell.rowId, selectedCell.rowIndex, adjustedFormula);
			// 保存公式到后端
			postSaveFormulaMessage({
				column: selectedCell.column,
				rowId: selectedCell.rowId,
				rowIndex: selectedCell.rowIndex,
				formula: adjustedFormula
			});
			// 重新计算公式
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
	// 对话框打开时禁用单元格复制粘贴
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

// 处理行级别的复制粘贴快捷键
function handleRowClipboardShortcuts(event) {
	// 对话框打开时禁用行复制粘贴
	if (isDialogOpen) {
		return;
	}
	const isCopy = event.key?.toLowerCase() === 'c';
	const isPaste = event.key?.toLowerCase() === 'v';

	if (!(event.ctrlKey || event.metaKey) || (!isCopy && !isPaste)) {
		return;
	}

	// 如果有选中的单元格，优先使用单元格复制粘贴
	if (selectedCell) {
		return;
	}

	// 复制需要有选中的行
	if (isCopy && selectedRows.size === 0) {
		return;
	}

	// 粘贴需要有复制的数据
	if (isPaste && !copiedRowsData) {
		return;
	}

	// 确保不在可编辑元素中
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

// 切换行选择状态
function toggleRowSelection(rowIndex, multiSelect = false, rangeSelect = false) {
	// 清除单元格选择（行选择和单元格选择互斥）
	if (selectedCell) {
		clearSelection();
	}

	if (!multiSelect && !rangeSelect) {
		// 单选：清除其他选择
		clearRowSelection();
		selectedRows.add(rowIndex);
		lastSelectedRowIndex = rowIndex;
	} else if (multiSelect) {
		// Ctrl 多选：切换当前行
		if (selectedRows.has(rowIndex)) {
			selectedRows.delete(rowIndex);
		} else {
			selectedRows.add(rowIndex);
		}
		lastSelectedRowIndex = rowIndex;
	} else if (rangeSelect && lastSelectedRowIndex !== null) {
		// Shift 范围选择
		const start = Math.min(lastSelectedRowIndex, rowIndex);
		const end = Math.max(lastSelectedRowIndex, rowIndex);
		for (let i = start; i <= end; i++) {
			selectedRows.add(i);
		}
	}

	updateRowSelectionVisuals();
}

// 清除行选择
function clearRowSelection() {
	selectedRows.clear();
	lastSelectedRowIndex = null;
	updateRowSelectionVisuals();
}

// 更新行选择的视觉效果
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

// 复制选中的行
function copySelectedRows() {
	if (!latestPayload || !Array.isArray(latestPayload.rows) || selectedRows.size === 0) {
		return;
	}

	const rowsToCopy = [];
	const sortedIndices = Array.from(selectedRows).sort((a, b) => a - b);

	for (const rowIndex of sortedIndices) {
		if (rowIndex >= 0 && rowIndex < latestPayload.rows.length) {
			const row = latestPayload.rows[rowIndex];
			// 深拷贝行数据
			const rowCopy = {
				id: row.id,
				values: { ...row.values },
				rowIndex: rowIndex,
			};

			// 复制完整的原始对象（包含嵌套结构）
			if (row.rawObject) {
				rowCopy.rawObject = JSON.parse(JSON.stringify(row.rawObject));
			}

			// 复制 abilityValues 如果存在
			if (row.abilityValues) {
				rowCopy.abilityValues = cloneAbilityValuesEntries(row.abilityValues);
			}

			// 收集该行所有列的公式
			const formulas = {};
			if (latestPayload.columns && Array.isArray(latestPayload.columns)) {
				for (const column of latestPayload.columns) {
					// columns 是字符串数组,不是对象数组
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

		// 可选：显示提示信息
		if (tableSection) {
			showTemporaryMessage(`已复制 ${rowsToCopy.length} 行`, 1000);
		}
	}
}

// 粘贴行
function pasteRows() {
	if (!copiedRowsData || copiedRowsData.length === 0) {
		return;
	}

	// 确定插入位置：如果有选中的行，在最后一个选中行之后插入；否则在表格末尾插入
	let insertAfterIndex = -1;
	if (selectedRows.size > 0) {
		insertAfterIndex = Math.max(...Array.from(selectedRows));
	} else if (latestPayload && latestPayload.rows) {
		insertAfterIndex = latestPayload.rows.length - 1;
	}

	// 计算基准偏移量：使用第一行的偏移作为所有行的基准
	// 这确保了复制组内的相对引用关系保持不变
	const firstSourceRowIndex = copiedRowsData[0]?.rowIndex ?? 0;
	const firstTargetRowIndex = insertAfterIndex + 1;
	const baseOffset = firstTargetRowIndex - firstSourceRowIndex;

	// 调整公式行引用
	const rowsWithAdjustedFormulas = copiedRowsData.map((rowData, index) => {
		const adjustedRow = {
			id: rowData.id,
			values: rowData.values,
		};
		// 传递完整的原始对象（包含嵌套结构）
		if (rowData.rawObject) {
			adjustedRow.rawObject = rowData.rawObject;
		}
		if (rowData.abilityValues) {
			adjustedRow.abilityValues = rowData.abilityValues;
		}
		// 如果有公式，使用统一的基准偏移量调整行引用
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

	// 发送批量插入请求
	vscode.postMessage({
		type: 'bulkInsertRows',
		payload: {
			insertAfterIndex,
			rows: rowsWithAdjustedFormulas,
		},
	});

	// 显示提示信息
	if (tableSection) {
		showTemporaryMessage(`已粘贴 ${copiedRowsData.length} 行`, 1000);
	}
}

// 显示临时提示消息
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

// 处理 Escape 键清除行选择
function handleEscapeClearSelection(event) {
	// 对话框打开时禁用此功能
	if (isDialogOpen) {
		return;
	}
	if (event.key === 'Escape' && selectedRows.size > 0) {
		event.preventDefault();
		clearRowSelection();
	}
}

function handleDeleteClearSelectedCell(event) {
	if (isDialogOpen) {
		return;
	}
	if (event.key !== 'Delete') {
		return;
	}
	if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
		return;
	}
	if (!selectedCell) {
		return;
	}
	if (isEditableElement(document.activeElement)) {
		return;
	}
	if (selectedCell.column === 'id') {
		return;
	}

	event.preventDefault();
	event.stopPropagation();

	if (selectedCell.dataType === 'abilityValues') {
		if (!selectedCell.rowId) {
			return;
		}
		vscode.postMessage({
			type: 'editAbilityValues',
			payload: {
				id: selectedCell.rowId,
				entries: [],
			},
		});
		selectedCell.value = '';
		selectedCell.abilityEntries = [];
		if (selectedTd) {
			populateAbilityValuesCell(selectedTd, [], false);
		}
		if (formulaValueInput) {
			formulaValueInput.value = '';
		}
		return;
	}

	if (!selectedCell.editable || !selectedCell.element) {
		return;
	}

	setElementValue(selectedCell.element, '', selectedCell.fieldConfig);
	if (selectedCell.usesDropdown) {
		const container = selectedCell.element.parentElement;
		const display = container?.querySelector('.kv-select-display');
		if (display) {
			updateSelectDisplay(selectedCell.element, display, selectedCell.fieldConfig);
		}
	}
	if (formulaValueInput) {
		formulaValueInput.value = '';
	}
	handleElementChange(selectedCell.element, selectedCell.fieldConfig);
	selectedCell.value = '';
}

// 处理方向键导航和空格键进入编辑状态
function handleCellNavigation(event) {
	// 对话框打开时禁用单元格导航
	if (isDialogOpen) {
		return;
	}
	// 如果正在编辑状态，不处理导航
	if (isEditableElement(document.activeElement)) {
		return;
	}
	// 如果没有选中单元格，不处理
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

	// 处理空格键进入编辑状态
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

	// 处理方向键导航
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
			return; // 不是方向键，不处理
	}

	// 如果位置没有变化，不处理
	if (newRowIndex === currentRowIndex && newColumnIndex === currentColumnIndex) {
		return;
	}

	event.preventDefault();

	// 找到目标单元格并选中
	const newColumn = columns[newColumnIndex];
	const selector = `td[data-column="${newColumn}"][data-row-index="${newRowIndex}"]`;
	const targetTd = tableSection?.querySelector(selector);

	if (targetTd) {
		// 直接构建 context 并调用 selectCell，而不是使用 click() 来避免自动进入编辑状态
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

		// 获取列字母和列名
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

		// 确保单元格可见
		targetTd.scrollIntoView({ block: 'nearest', inline: 'nearest' });
	}
}

// 注意：handleClipboardShortcuts 已在上方定义，此处不再重复

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

	// 自动滚动逻辑
	if (tableSection) {
		const tableRect = tableSection.getBoundingClientRect();
		const scrollThreshold = 50; // 距离边缘多少像素开始滚动
		const scrollSpeed = 50; // 每次滚动的像素数

		// 鼠标距离表格顶部和底部的距离
		const distanceFromTop = event.clientY - tableRect.top;
		const distanceFromBottom = tableRect.bottom - event.clientY;

		// 向上滚动：距离顶部小于阈值（包括超出顶部边缘）
		if (distanceFromTop < scrollThreshold) {
			const normalizedDistance = Math.max(0, distanceFromTop);
			const scrollAmount = Math.max(1, scrollSpeed * (1 - normalizedDistance / scrollThreshold));
			tableSection.scrollTop = Math.max(0, tableSection.scrollTop - scrollAmount);
		}
		// 向下滚动：距离底部小于阈值（包括超出底部边缘）
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

// 还原公式栏内容到单元格初始值
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

// 将公式栏的修改写回选中单元格
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

	// 对于公式，需要特殊处理以避免显示公式文本
	if (isFormula) {
		const previousFormula = selectedCell.element.dataset.formulaValue ?? '';
		// 如果公式没有变化，无需处理
		if (previousFormula === trimmedValue) {
			return;
		}
		// 临时设置公式文本以便 handleElementChange 检测
		setElementValue(selectedCell.element, trimmedValue, selectedCell.fieldConfig);
		handleElementChange(selectedCell.element, selectedCell.fieldConfig);
		// handleElementChange 会调用 refreshFormulaResultsForTable 更新显示
		// 但为了避免 focus 事件读取到公式文本，立即恢复显示计算结果
		if (selectedCell.rowIndex !== undefined && selectedCell.column) {
			const computed = getComputedFormulaEntry(selectedCell.column, selectedCell.rowIndex);
			if (computed && typeof computed.value === 'string') {
				setElementValue(selectedCell.element, computed.value, selectedCell.fieldConfig);
			}
		}
	} else {
		// 普通值的处理
		const current = readElementValue(selectedCell.element, selectedCell.fieldConfig);
		const initial = selectedCell.element.dataset.initialValue ?? '';
		if (current === newValue && initial === newValue) {
			return;
		}
		setElementValue(selectedCell.element, newValue, selectedCell.fieldConfig);
		handleElementChange(selectedCell.element, selectedCell.fieldConfig);
	}
}

// 获取字段配置中定义的分隔符
// 为输入框添加撤销/重做支持
function setupUndoRedo(input, maxHistory = 50) {
	if (!input || !(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
		return;
	}

	// 初始化撤销历史
	if (!input.dataset.undoHistory) {
		input.dataset.undoHistory = JSON.stringify([input.value || '']);
		input.dataset.undoIndex = '0';
	}

	// 处理撤销/重做快捷键
	const handleKeyDown = (event) => {
		const isUndo = event.key === 'z' && (event.ctrlKey || event.metaKey) && !event.shiftKey;
		const isRedo = (event.key === 'z' && (event.ctrlKey || event.metaKey) && event.shiftKey) ||
			(event.key === 'y' && (event.ctrlKey || event.metaKey));

		if (isUndo || isRedo) {
			console.log('[KV-Editor Debug] setupUndoRedo收到撤销/恢复:', isUndo ? 'undo' : 'redo', 'isDialogOpen:', isDialogOpen, 'target:', event.target, 'input:', input);

			// 检查当前输入框是否在对话框内
			// 如果对话框打开，但当前输入框不在对话框内（即在主界面），则禁用撤销恢复
			if (isDialogOpen) {
				const isInDialog = input.closest('.kv-quickpick, .kv-fill-popup, .kv-ability-editor-overlay, .kv-autofill-popup, .kv-column-insert-dialog-overlay, .kv-column-options-overlay, .kv-color-picker-overlay');
				console.log('[KV-Editor Debug] setupUndoRedo: 对话框已打开, 当前输入框是否在对话框内:', !!isInDialog, 'input:', input);

				if (!isInDialog) {
					console.log('[KV-Editor Debug] setupUndoRedo: 主界面输入框在对话框打开时禁用撤销恢复');
					return; // 主界面的输入框在对话框打开时不处理撤销恢复
				}
			}

			event.preventDefault();
			const history = JSON.parse(input.dataset.undoHistory || '[]');
			let index = parseInt(input.dataset.undoIndex || '0');

			if (isUndo && index > 0) {
				index--;
				input.dataset.undoIndex = String(index);
				input.value = history[index] || '';
				// 触发 change 事件以同步状态
				const changeEvent = new Event('change', { bubbles: true });
				input.dispatchEvent(changeEvent);
			} else if (isRedo && index < history.length - 1) {
				index++;
				input.dataset.undoIndex = String(index);
				input.value = history[index] || '';
				// 触发 change 事件以同步状态
				const changeEvent = new Event('change', { bubbles: true });
				input.dispatchEvent(changeEvent);
			}
		}
	};

	// 保存撤销历史
	const handleInput = () => {
		const history = JSON.parse(input.dataset.undoHistory || '[]');
		let index = parseInt(input.dataset.undoIndex || '0');
		const currentValue = input.value;

		// 如果当前值与历史中的值不同，则添加到历史
		if (history[index] !== currentValue) {
			// 删除当前索引之后的所有历史
			history.splice(index + 1);
			// 添加新值
			history.push(currentValue);
			// 限制历史记录数量
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

	// 调试：额外监听以查看所有keydown事件
	input.addEventListener('keydown', (event) => {
		if ((event.ctrlKey || event.metaKey) && (event.key === 'z' || event.key === 'y')) {
			console.log('[KV-Editor Debug] 输入框收到Ctrl+Z/Y:', {
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
 * 创建输入框的统一接口
 * @param {Object} options - 配置选项
 * @param {string} options.type - 输入框类型 (text, number, search, color 等)
 * @param {string} options.className - CSS 类名
 * @param {string} options.placeholder - 占位符文本
 * @param {string} options.value - 初始值
 * @param {boolean} options.enableUndoRedo - 是否启用撤销/重做功能 (默认 true，仅对 text/number/search 类型)
 * @param {number} options.maxHistory - 最大历史记录数 (默认 50)
 * @param {Object} options.attributes - 其他 HTML 属性 (如 min, max, step, required 等)
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

	// 应用其他属性
	Object.keys(attributes).forEach(key => {
		if (key === 'dataset') {
			// 特殊处理 dataset
			Object.keys(attributes.dataset || {}).forEach(dataKey => {
				input.dataset[dataKey] = attributes.dataset[dataKey];
			});
		} else {
			input[key] = attributes[key];
		}
	});

	// 对文本类输入框自动启用撤销/重做功能
	const textInputTypes = ['text', 'number', 'search'];
	if (enableUndoRedo && textInputTypes.includes(type)) {
		setupUndoRedo(input, maxHistory);
	}

	return input;
}

/**
 * 创建文本域的统一接口
 * @param {Object} options - 配置选项
 * @param {string} options.className - CSS 类名
 * @param {string} options.placeholder - 占位符文本
 * @param {string} options.value - 初始值
 * @param {boolean} options.enableUndoRedo - 是否启用撤销/重做功能 (默认 true)
 * @param {number} options.maxHistory - 最大历史记录数 (默认 50)
 * @param {Object} options.attributes - 其他 HTML 属性 (如 rows, cols 等)
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

	// 应用其他属性
	Object.keys(attributes).forEach(key => {
		if (key === 'dataset') {
			// 特殊处理 dataset
			Object.keys(attributes.dataset || {}).forEach(dataKey => {
				textarea.dataset[dataKey] = attributes.dataset[dataKey];
			});
		} else {
			textarea[key] = attributes[key];
		}
	});

	// 自动启用撤销/重做功能
	if (enableUndoRedo) {
		setupUndoRedo(textarea, maxHistory);
	}

	return textarea;
}

function getFieldSeparator(fieldConfig) {
	const separator = fieldConfig?.separator ?? ',';
	return typeof separator === 'string' && separator.length > 0 ? separator : ',';
}

// 将多选字段的原始文本拆分为值列表
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

// 从输入控件读取当前值
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

// 将指定值写入输入控件
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
		fillHandleElement.title = '拖动以快速填充';
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

	// 移除element会自动触发setDialogOpenState(false)
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

	// 使用统一的对话框管理
	const popup = createManagedDialog({
		className: 'kv-fill-popup',
		onClose: () => {
			// 清理填充状态
			fillPopupState = null;
			fillHandleState = null;
			clearFillPreview();
			refreshFillHandle();
		}
	});

	popup.setAttribute('role', 'dialog');
	popup.setAttribute('aria-label', '填充选项');
	const title = document.createElement('div');
	title.className = 'kv-fill-popup-title';
	const direction = currentRow > startRow ? 1 : -1;
	title.textContent = `填充 ${direction > 0 ? '向下' : '向上'} ${targetRows.length} 行`;
	popup.appendChild(title);
	const form = document.createElement('form');
	form.className = 'kv-fill-popup-form';
	const modeList = document.createElement('div');
	modeList.className = 'kv-fill-popup-modes';
	const baseFormula = getSelectedCellFormulaValue();
	const hasBaseFormula = baseFormula.length > 0;
	const modes = hasBaseFormula
		? [
			{ value: 'formulaSequence', label: '序列' },
			{ value: 'copy', label: '复制' },
		]
		: [
			{ value: 'copy', label: '复制' },
			{ value: 'arithmetic', label: '等差填充' },
			{ value: 'geometric', label: '等比填充' },
			{ value: 'formula', label: '公式填充' }
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
	arithmeticLabel.textContent = '步长';
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
	geometricLabel.textContent = '比率';
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
	formulaLabel.textContent = '表达式 (可用: base, baseNumber, offset, rowIndex, rowNumber, direction)';
	const formulaInput = createInput({
		type: 'text',
		placeholder: '例如: base + offset * 2'
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
	cancelButton.textContent = '取消';
	actions.appendChild(cancelButton);
	const applyButton = document.createElement('button');
	applyButton.type = 'submit';
	applyButton.className = 'kv-button kv-button-primary';
	applyButton.textContent = '填充';
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
			result = { success: false, message: '未知填充模式' };
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
		return { success: false, message: '当前没有可填充的单元格' };
	}
	const columnKey = fillPopupState.column;
	if (!columnKey) {
		return { success: false, message: '无法确定填充列' };
	}
	const baseValueRaw = selectedCell.element
		? readElementValue(selectedCell.element, selectedCell.fieldConfig)
		: (selectedCell.value ?? '');
	const targetRows = Array.isArray(fillPopupState.targetRows) ? fillPopupState.targetRows.slice() : [];
	if (!targetRows.length) {
		return { success: false, message: '请选择需要填充的范围' };
	}
	const contexts = [];
	for (const rowIndex of targetRows) {
		const context = getEditableCellContext(rowIndex, columnKey);
		if (!context) {
			return { success: false, message: '目标区域包含不可编辑的单元格' };
		}
		if (context.usesDropdown && !allowDropdown) {
			return { success: false, message: '该填充模式不支持下拉字段' };
		}
		if (!context.id) {
			return { success: false, message: '目标行缺少唯一标识，无法写入。' };
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
		return { success: false, message: '没有可填充的单元格。' };
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
		return { success: false, message: '未生成可写入的公式。' };
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
			return { success: false, message: '目标下拉列表中不存在要复制的值' };
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
		return { success: false, message: '当前单元格不是公式，无法使用序列填充。' };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const baseRowIndex = Number.isFinite(selectedCell?.rowIndex) ? Number(selectedCell.rowIndex) : undefined;
	if (baseRowIndex === undefined) {
		return { success: false, message: '无法确定公式的基准行。' };
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
		return { success: false, message: '当前单元格不支持等差填充' };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const baseNumber = Number(baseValueRaw);
	if (!Number.isFinite(baseNumber)) {
		return { success: false, message: '当前单元格的值不是有效的数字' };
	}
	const stepInput = fillPopupState?.arithmeticInput;
	const stepValue = stepInput ? Number(stepInput.value) : NaN;
	if (!Number.isFinite(stepValue)) {
		return { success: false, message: '请输入有效的步长' };
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
		return { success: false, message: '当前单元格不支持等比填充' };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const baseNumber = Number(baseValueRaw);
	if (!Number.isFinite(baseNumber)) {
		return { success: false, message: '当前单元格的值不是有效的数字' };
	}
	const ratioInput = fillPopupState?.geometricInput;
	const ratioValue = ratioInput ? Number(ratioInput.value) : NaN;
	if (!Number.isFinite(ratioValue) || ratioValue === 0) {
		return { success: false, message: '请输入有效的比率' };
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
		return { success: false, message: '当前单元格不支持公式填充' };
	}
	const prepared = prepareFillOperation({ allowDropdown: false });
	if (!prepared.success) {
		return prepared;
	}
	const { baseValueRaw, contexts, column } = prepared;
	const expression = (fillPopupState?.formulaInput?.value ?? '').trim();
	if (!expression) {
		return { success: false, message: '请输入公式表达式' };
	}
	let evaluator;
	try {
		evaluator = new Function('base', 'baseNumber', 'offset', 'rowIndex', 'rowNumber', 'direction', 'rowId', 'toNumber', `return (${expression});`);
	} catch (error) {
		return { success: false, message: `公式解析失败: ${error.message}` };
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
			return { success: false, message: `公式执行失败: ${error.message}` };
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

// 处理单元格数据变动并通知扩展端
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

	// 特殊处理 id 列的修改
	if (columnKey === 'id') {
		const oldId = element.dataset.initialValue ?? '';
		const newId = trimmedValue;
		if (oldId === newId) {
			return;
		}
		if (!oldId || !newId) {
			console.warn('[kv-editor] id 列的值不能为空', { oldId, newId });
			// 恢复原值
			setElementValue(element, oldId, fieldConfig);
			return;
		}
		element.dataset.initialValue = newId;
		element.title = newId;

		// 先更新 latestPayload 中的 id，确保 recalculateFormulas 使用新的 id
		if (latestPayload && Array.isArray(latestPayload.rows)) {
			const row = latestPayload.rows.find(r => r && r.id === oldId);
			if (row) {
				row.id = newId;
			}
		}

		// 更新该行所有 td 元素的 data-row-id 和 data-id 属性
		if (tableSection && Number.isFinite(rowIndex)) {
			const cells = tableSection.querySelectorAll(`td[data-row-index="${rowIndex}"]`);
			cells.forEach(td => {
				if (td.dataset.rowId === oldId) {
					td.dataset.rowId = newId;
				}
				// 同时更新子元素（input/select）的 data-id
				const input = td.querySelector('input, select, textarea');
				if (input && input.dataset.id === oldId) {
					input.dataset.id = newId;
				}
			});
		}

		// 更新所有引用该 rowId 的公式定义
		updateFormulaDefinitionsOnIdRename(oldId, newId);

		// 发送 renameId 消息
		vscode.postMessage({
			type: 'renameId',
			payload: { oldId, newId }
		});

		// 更新选中单元格的状态
		if (selectedCell && selectedCell.element === element) {
			selectedCell.value = newId;
		}

		// 重新计算公式并刷新表格显示
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
			console.warn('[kv-editor] 忽略无法定位行的公式写入', { column: columnKey, id });
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

// 获取多选项的显示文案
function getOptionLabel(fieldConfig, value) {
	const option = fieldConfig?.options?.find((option) => option.value === value);
	if (!option) return value;
	// 根据本地化模式调整显示：localedMode 为 true 则显示 label，否则显示 value（并在需要时显示 label 作为辅文）
	if (typeof localizedMode !== 'undefined' && localizedMode) {
		return option.label || option.value;
	}
	// 非本地化模式时优先显示原文
	return option.value;
}

// 渲染下拉选择的标签展示
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
		placeholder.textContent = '未选择';
		display.appendChild(placeholder);
		return;
	}
	const columnKey = select?.dataset?.key || '';
	values.forEach((value, index) => {
		const tag = document.createElement('span');
		tag.className = 'kv-select-tag';

		// 获取选项配置
		const option = fieldConfig?.options?.find((opt) => opt.value === value);

		// 整个标签填充颜色（无显式颜色时生成稳定色相）
		tag.style.backgroundColor = getOptionColor(option, index);
		tag.style.color = '#fff';
		tag.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';

		// 添加文本内容
		// 适配本地化显示：当 localizedMode 为 false 时，在必要时显示 "value (label)"
		if (localizedMode) {
			tag.textContent = option?.label || option?.value || value;
		} else {
			if (option && option.label && option.label !== option.value) {
				tag.textContent = `${option.value} (${option.label})`;
			} else {
				tag.textContent = option?.value || value;
			}
		}

		display.appendChild(tag);
	});
}

// 根据当前值刷新下拉浮层的选中状态
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

// 切换浮层中某个选项的勾选状态
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

// 关闭下拉浮层并清理监听
function closeMultiSelectDropdown(options) {
	if (!openMultiSelectContext) {
		return;
	}
	const preservePending = Boolean(options?.preservePending);
	const { overlay, outsideHandler, keyHandler, scrollHandler, resizeHandler, searchInput, searchHandlers } = openMultiSelectContext;

	// 移除overlay会自动触发setDialogOpenState(false)
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

// 打开下拉浮层并绑定事件
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

	// 使用统一的对话框管理
	const overlay = createManagedDialog({
		className: 'kv-quickpick',
		onClose: () => {
			// 清理context
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
		placeholder: `搜索${placeholderName}`.trim() || '搜索'
	});
	searchWrapper.appendChild(searchInput);
	overlay.appendChild(searchWrapper);
	const list = document.createElement('div');
	list.className = 'kv-quickpick-list';
	overlay.appendChild(list);
	const emptyIndicator = document.createElement('div');
	emptyIndicator.className = 'kv-quickpick-empty';
	emptyIndicator.textContent = '无匹配结果';
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

		// 根据本地化模式决定显示内容：
		// localizedMode === true -> 显示 label/description 为主，原文为辅
		// localizedMode === false -> 显示 value 为主，label 为辅（如果存在）
		let primaryText;
		let detailText;
		if (localizedMode) {
			primaryText = option.label || option.value;
			// 优先显示 description 作为细节，否则显示原文（当 label 与 value 不同时）
			detailText = option.description || (option.label && option.label !== option.value ? option.value : undefined);
		} else {
			primaryText = option.value;
			detailText = (option.label && option.label !== option.value) ? option.label : (option.description || undefined);
		}

		const labelEl = document.createElement('div');
		labelEl.className = 'kv-quickpick-label';

		// 主文本使用颜色标签样式（像单元格标签一样）
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

// 计算列的最小宽度
function getMinColumnWidth(column) {
	if (column === ROW_NUMBER_COLUMN_KEY) {
		return ROW_NUMBER_MIN_WIDTH;
	}
	if (column === 'AbilityValues') {
		return Math.max(COLUMN_MIN_WIDTH, 160);
	}
	return COLUMN_MIN_WIDTH;
}

// 获取列的当前宽度（含初次估算）
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

// 将列索引转换为字母标记
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

// 根据列宽重算整表宽度
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
	// 表格宽度只根据列的总宽度设置，不强制撑满容器
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
	// 切换文档时清除筛选状态
	columnFilters.clear();
	closeColumnFilterDropdown();
}

function cancelColumnWidthSave() {
	if (!columnWidthSaveHandle) {
		return;
	}
	clearTimeout(columnWidthSaveHandle);
	columnWidthSaveHandle = null;
}

// 立即刷新保存列宽（用于页面关闭前）
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

		// 处理修改过的列
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
			// 如果这个列曾经被保存过，现在又被修改了，需要更新保存记录
			savedColumnWidths.add(column);
		});

		// 检查曾经保存过但现在可能需要删除的列
		// 如果一个列曾经被保存，但现在的宽度已经恢复到系统计算的初始值（而不是保存的值），则需要删除
		if (!latestPayload.columns) {
			latestPayload.columns = [];
		}
		savedColumnWidths.forEach((column) => {
			// 如果这个列已经在 widthsPayload 中，说明它被重新修改了，不需要检查删除
			if (widthsPayload[column] !== undefined) {
				return;
			}
			// 检查该列是否仍存在于当前表格中
			if (!latestPayload.columns.includes(column)) {
				// 列已经不存在了，标记为需要从保存记录中删除
				columnsToRemoveFromSaved.add(column);
				return;
			}
			// 获取当前列宽
			const currentWidth = columnWidths[column];
			if (!Number.isFinite(currentWidth)) {
				return;
			}
			// 获取该列的系统默认宽度（不考虑保存的值）
			const headerLabel = column;
			const labelLength = Math.max((headerLabel ?? '').length, 4);
			const systemDefaultWidth = column === 'AbilityValues'
				? Math.max(COLUMN_MIN_WIDTH, 220)
				: Math.max(COLUMN_MIN_WIDTH, labelLength * 12);
			// 如果当前宽度等于系统默认宽度，说明用户已经将列宽恢复到初始状态
			// 此时应该删除配置文件中的保存值
			if (Math.round(currentWidth) === Math.round(systemDefaultWidth)) {
				columnsToRemoveFromSaved.add(column);
			}
		});

		// 从 savedColumnWidths 中移除标记为删除的列
		columnsToRemoveFromSaved.forEach((column) => {
			savedColumnWidths.delete(column);
			// 将这些列的宽度设为 null，后端会识别并删除配置
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
				// 删除该列的记录
				delete originalColumnWidths[column];
			} else {
				originalColumnWidths[column] = value;
			}
			modifiedColumns.delete(column);
		});
	}, COLUMN_WIDTH_SAVE_DEBOUNCE_MS);
}

// 更新指定列的宽度并刷新布局
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

// 开始列宽拖拽操作
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

// 拖拽过程中实时调整列宽
function handleColumnResize(event) {
	if (!resizeState) {
		return;
	}
	const delta = event.clientX - resizeState.startX;
	const newWidth = Math.max(getMinColumnWidth(resizeState.column), resizeState.startWidth + delta);
	updateColumnWidth(resizeState.column, newWidth);
}

// 结束列宽拖拽并清理状态
function stopColumnResize() {
	if (!resizeState) {
		return;
	}
	resizeState = null;
	document.body.classList.remove('kv-resizing');
	scheduleColumnWidthSave();
}

// 重新聚焦此前活跃的输入控件
function restoreActiveCell() {
	if (!activeCell) {
		return;
	}
	const selector = `[data-id="${activeCell.id}"][data-key="${activeCell.key}"]`;
	const focusTarget = tableSection?.querySelector(selector);
	if (focusTarget instanceof HTMLInputElement) {
		const length = focusTarget.value.length;
		focusTarget.focus();
		focusTarget.setSelectionRange(length, length);
	} else if (focusTarget instanceof HTMLSelectElement) {
		const styles = window.getComputedStyle(focusTarget);
		if (styles.display !== 'none' && styles.visibility !== 'hidden') {
			focusTarget.focus();
		}
	}
}

// 渲染后恢复之前的单元格选中状态
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
	// id 列现在也可以编辑了
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

	// 精简模式：显示为纯文本单行
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
		compactDiv.textContent = compactText || (hasAbilityField ? '(空)' : '');
		compactDiv.title = compactText;
		td.appendChild(compactDiv);
		return { entries: sanitizedEntries, displayValue: compactText };
	}

	// 详细模式：原有的多行显示逻辑
	const list = document.createElement('div');
	list.className = 'kv-ability-values-list';
	const displayLines = [];
	if (sanitizedEntries.length) {
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
	} else if (hasAbilityField) {
		const placeholder = document.createElement('div');
		placeholder.className = 'kv-ability-values-empty';
		placeholder.textContent = '无条目';
		td.appendChild(placeholder);
	} else {
		td.classList.add('kv-ability-values-cell-empty');
		td.textContent = '—';
	}
	const displayValue = displayLines.length
		? displayLines.join('\n')
		: hasAbilityField
			? '无条目'
			: '—';
	td.dataset.displayValue = displayValue;
	td.title = '双击编辑 AbilityValues';
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
// 虚拟滚动配置
// ============================================================================
const VIRTUAL_SCROLL_THRESHOLD = 200; // 超过此行数启用虚拟滚动
const VIRTUAL_SCROLL_BUFFER = 10;     // 可视区域外的缓冲行数
const ROW_HEIGHT_ESTIMATE = 32;       // 估算行高（像素）

let virtualScrollState = null;
let scrollRAFHandle = null;

// 检查是否应启用虚拟滚动
function shouldUseVirtualScroll(rowCount) {
	return rowCount > VIRTUAL_SCROLL_THRESHOLD;
}

// 计算可见行范围
function calculateVisibleRowRange(scrollTop, containerHeight, totalRows) {
	const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT_ESTIMATE) - VIRTUAL_SCROLL_BUFFER);
	const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT_ESTIMATE) + 2 * VIRTUAL_SCROLL_BUFFER;
	const endRow = Math.min(totalRows - 1, startRow + visibleCount);
	return { startRow, endRow };
}

// ============================================================================
// 渲染性能优化
// ============================================================================

const RENDER_DEBOUNCE_MS = 16; // ~60fps
let pendingRenderHandle = null;
let lastRenderTime = 0;

/**
 * 防抖渲染 - 合并短时间内的多次渲染请求
 */
function scheduleRender(columns, rows, columnOptions) {
	if (pendingRenderHandle) {
		cancelAnimationFrame(pendingRenderHandle);
	}

	const now = performance.now();
	const timeSinceLastRender = now - lastRenderTime;

	if (timeSinceLastRender < RENDER_DEBOUNCE_MS) {
		// 使用 RAF 延迟渲染
		pendingRenderHandle = requestAnimationFrame(() => {
			pendingRenderHandle = null;
			lastRenderTime = performance.now();
			renderTable(columns, rows, columnOptions);
		});
	} else {
		// 立即渲染
		lastRenderTime = now;
		renderTable(columns, rows, columnOptions);
	}
}

/**
 * 使用 DocumentFragment 批量创建 DOM 元素以提升性能
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
 * 创建单个表格行元素（占位符 - 将在后续重构中实现完整版本）
 * 当前直接返回 null，实际创建逻辑仍在 renderTable 中
 */
function createTableRowElement(row, rowIndex, context) {
	// TODO: 将 renderTable 中的行创建逻辑迁移到此函数
	// 当前返回 null，保持向后兼容
	return null;
}

// ============================================================================
// 表格渲染辅助函数（模块化拆分）
// ============================================================================

/**
 * 创建表格渲染上下文，包含所有共享状态
 */
function createRenderContext(columns, rows, columnOptions) {
	const displayColumns = [ROW_NUMBER_COLUMN_KEY, ...columns];
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

	// 计算冻结列信息
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
 * 计算冻结列的 left 偏移量
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
 * 应用冻结列样式到元素
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
 * 创建表格的 colgroup 元素
 * @param {RenderContext} ctx - 渲染上下文
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
 * 创建单个表头单元格
 * @param {string} column - 列标识
 * @param {number} columnIndex - 列索引
 * @param {RenderContext} ctx - 渲染上下文
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

	// 应用冻结列样式
	applyFrozenColumnStyle(th, column, ctx);

	if (column === ROW_NUMBER_COLUMN_KEY) {
		th.textContent = '#';
	} else {
		const wrapper = document.createElement('div');
		wrapper.className = 'kv-column-header';

		// 创建列字母拖拽按钮
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
		const isCreatureColumn = isCreatureColumnKey(column);

		if (columnIndex > 0 && !isCreatureColumn) {
			letterButton.setAttribute('draggable', 'true');
			letterButton.setAttribute('aria-label', `拖动列 ${headerLabel}`);
			letterButton.addEventListener('dragstart', (event) => handleColumnDragStart(event, column, columnIndex, letterButton));
			letterButton.addEventListener('dragend', (event) => handleColumnDragEnd(event, letterButton));
			letterButton.addEventListener('mousedown', (event) => event.stopPropagation());
			letterButton.addEventListener('click', (event) => event.preventDefault());
			th.classList.add('kv-column-draggable');
		} else if (isCreatureColumn) {
			letterButton.setAttribute('draggable', 'false');
			letterButton.setAttribute('aria-disabled', 'true');
			letterButton.setAttribute('aria-label', `${headerLabel} 属于 Creature 字段组，暂不支持单独拖拽`);
			letterButton.title = 'Creature 子字段需要保持嵌套结构，暂不支持单独拖拽';
			letterButton.tabIndex = -1;
			letterButton.addEventListener('mousedown', (event) => event.stopPropagation());
			letterButton.addEventListener('click', (event) => event.preventDefault());
		} else {
			letterButton.setAttribute('draggable', 'false');
			letterButton.setAttribute('aria-disabled', 'true');
			letterButton.tabIndex = -1;
			letterButton.addEventListener('mousedown', (event) => event.stopPropagation());
			letterButton.addEventListener('click', (event) => event.preventDefault());
		}

		// 创建列名元素
		const nameEl = document.createElement('span');
		nameEl.className = 'kv-column-name';
		const columnDesc = columnDescriptions[column];
		const displayLabel = (localizedMode && columnDesc?.label) ? columnDesc.label : headerLabel;
		const displayTooltip = (columnDesc?.description) ? columnDesc.description : headerLabel;
		nameEl.textContent = displayLabel;
		nameEl.title = displayTooltip;

		wrapper.appendChild(letterButton);

		// 创建标题行（包含列名和选项按钮）
		const titleRow = document.createElement('div');
		titleRow.className = 'kv-column-header-title-row';
		titleRow.appendChild(nameEl);

		let formulaIndicator;
		if (columnFormulas.has(column)) {
			formulaIndicator = document.createElement('span');
			formulaIndicator.className = 'kv-column-formula-indicator';
			formulaIndicator.textContent = 'ƒ';
			formulaIndicator.title = `列公式: ${columnFormulas.get(column)}`;
		}

		const columnFieldConfig = columnOptions?.[column];
		const optionsButton = document.createElement('button');
		optionsButton.type = 'button';
		optionsButton.className = 'kv-column-options-button kv-column-settings-button';
		optionsButton.title = `编辑 ${headerLabel} 下拉选项`;
		optionsButton.setAttribute('aria-label', `编辑 ${headerLabel} 下拉选项`);
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

		// 添加列筛选按钮
		const filterButton = document.createElement('button');
		filterButton.type = 'button';
		filterButton.className = 'kv-column-options-button kv-filter-btn-header';
		filterButton.dataset.filterColumn = column;
		const hasFilter = columnFilters.has(column) && (columnFilters.get(column)?.size ?? 0) > 0;
		titleRow.classList.toggle('kv-column-header-title-row-filter-active', hasFilter);
		filterButton.classList.toggle('kv-filter-active', hasFilter);
		filterButton.title = hasFilter ? `列 "${headerLabel}" 已筛选，点击修改` : `筛选 ${headerLabel}`;
		filterButton.setAttribute('aria-label', filterButton.title);
		filterButton.innerHTML = '<span class="codicon codicon-filter"></span>';
		filterButton.addEventListener('mousedown', (event) => event.stopPropagation());
		filterButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			openColumnFilterDropdown(filterButton, column, headerLabel);
		});
		titleRow.appendChild(filterButton);

		wrapper.appendChild(titleRow);
		if (formulaIndicator) {
			th.appendChild(formulaIndicator);
		}
		th.appendChild(wrapper);

		// 为列标题添加右键菜单（允许 id 列）
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

	// 添加拖放事件监听器
	if (columnIndex >= 0) {
		th.addEventListener('dragover', (event) => handleColumnDragOver(event, th, column, columnIndex));
		th.addEventListener('dragleave', (event) => handleColumnDragLeave(event, th));
		th.addEventListener('drop', (event) => handleColumnDrop(event, column));
	}

	// 添加列宽调整器
	const resizer = document.createElement('div');
	resizer.className = 'kv-resizer';
	resizer.addEventListener('mousedown', (event) => startColumnResize(event, column));
	th.appendChild(resizer);

	return th;
}

/**
 * 创建表头 thead 元素
 * @param {string[]} columns - 原始列数组
 * @param {RenderContext} ctx - 渲染上下文
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

// 渲染主表格结构和单元格控件
function renderTable(columns, rows, columnOptions) {
	if (!tableSection) {
		return;
	}
	// 保存当前滚动位置
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

	// 使用渲染上下文统一管理共享状态
	const ctx = createRenderContext(columns, rows, columnOptions);
	const { displayColumns, columnLabels, columnLetters, texturePreviewMap, scriptSupport } = ctx;

	// 应用列筛选
	const filteredRows = getFilteredRows(rows);
	const hasActiveFilter = columnFilters.size > 0 && Array.from(columnFilters.values()).some(s => s && s.size > 0);

	// 创建表格结构（使用辅助函数）
	const table = document.createElement('table');
	const colgroup = createColgroup(ctx);
	table.appendChild(colgroup);
	const thead = createTableHeader(columns, ctx);

	const tbody = document.createElement('tbody');
	tbody.addEventListener('dragover', (event) => handleRowContainerDragOver(event, tbody));
	tbody.addEventListener('dragleave', (event) => handleRowContainerDragLeave(event, tbody));
	tbody.addEventListener('drop', (event) => handleRowContainerDrop(event, tbody));

	// 使用 DocumentFragment 批量构建行，减少 DOM 重排
	const fragment = document.createDocumentFragment();
	filteredRows.forEach((row, rowIndex) => {
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

			// 应用冻结列样式（使用辅助函数）
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
					dragBtn.setAttribute('aria-label', '拖动调整顺序');
					const icon = document.createElement('span');
					icon.className = 'codicon codicon-gripper';
					dragBtn.appendChild(icon);
					dragBtn.draggable = true;
					dragBtn.addEventListener('dragstart', (event) => handleRowDragStart(event, row.id, rowIndex, filteredRows.length));
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
					// 点击行号进行行选择
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
				// 改为可编辑的 input 元素
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
					// 点击只选中单元格，不自动进入编辑状态
					// 用户可以通过空格键或双击进入编辑状态
				});
				td.addEventListener('dblclick', () => {
					// 双击进入编辑状态
					input.focus();
					input.select();
				});
			} else {
				const rawValue = row.values?.[column];
				const displayValue = getCellDisplayValue(rowIndex, row.id ?? '', column, rawValue);
				const formulaDefinition = getFormulaDefinition(column, row.id ?? '', rowIndex);
				const computedEntry = getComputedFormulaEntry(column, rowIndex);
				if (column === 'AbilityValues') {
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
					// AbilityTextureName 列始终显示图标选择按钮（即使没有有效的图标预览）
					if (column === 'AbilityTextureName') {
						const wrapper = ensureInlineWrapper();
						const preview = document.createElement('div');
						preview.className = 'kv-cell-preview kv-cell-preview-button';
						preview.tabIndex = 0;

						if (previewInfo && previewInfo.uri) {
							// 有有效的图标预览
							preview.dataset.type = previewInfo.kind === 'item' ? 'item' : 'spell';
							preview.dataset.source = previewInfo.source || '';
							const img = document.createElement('img');
							img.src = previewInfo.uri;
							img.alt = `${row.id ?? ''} icon`;
							img.draggable = false;
							if (previewInfo.fileName) {
								const tooltipParts = [previewInfo.fileName];
								if (previewInfo.source) {
									tooltipParts.push(previewInfo.source === 'addon' ? '项目资源' : '插件资源');
								}
								img.title = tooltipParts.join(' · ');
							}
							preview.appendChild(img);
						} else {
							// 没有有效的图标预览，显示占位图标
							preview.classList.add('kv-cell-preview-placeholder');
							const icon = document.createElement('span');
							icon.className = 'codicon codicon-file-media';
							icon.title = '选择图标';
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
								scriptButton.title = '未配置脚本目录';
							} else if (!hasValue) {
								scriptButton.disabled = true;
								scriptButton.title = '请输入脚本路径';
							} else {
								scriptButton.disabled = false;
								scriptButton.title = `打开脚本文件 (${extensionLabel})`;
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
						// 如果是公式单元格，focus 时显示公式以便编辑
						const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
						if (formulaDef && formulaDef.formula) {
							const currentValue = input.value ?? '';
							// 如果当前显示的是计算结果（不是公式），则切换到公式
							if (!currentValue.startsWith('=')) {
								setElementValue(input, formulaDef.formula, undefined);
							}
						}
						updateSelection();
					});
					input.addEventListener('blur', () => {
						activeCell = undefined;
						// 延迟执行以确保 change 事件先处理
						setTimeout(() => {
							// 如果是公式单元格且当前显示的是公式文本（未修改），恢复显示计算结果
							const formulaDef = getFormulaDefinition(column, row.id ?? '', rowIndex);
							if (formulaDef && formulaDef.formula) {
								const currentValue = input.value ?? '';
								// 只有当前值等于公式定义时才恢复（说明用户没有修改）
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
						// 如果 input 已经有焦点（正在编辑），允许浏览器处理点击（更新光标位置）
						if (document.activeElement === input) {
							return;
						}
						// 点击其他单元格时，先让当前焦点元素失焦
						if (document.activeElement instanceof HTMLElement && document.activeElement !== input) {
							document.activeElement.blur();
						}
						// 只在首次点击（获取焦点）时阻止默认行为并更新选中状态
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
						// 点击 td（非 input 区域）时，先让当前焦点元素失焦
						if (document.activeElement instanceof HTMLElement) {
							document.activeElement.blur();
						}
						updateSelection();
					});
					td.addEventListener('dblclick', () => {
						// focus 事件会自动处理公式显示
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
	// 批量将所有行添加到 tbody（单次 DOM 操作）
	tbody.appendChild(fragment);
	table.appendChild(thead);
	table.appendChild(tbody);
	tableSection.innerHTML = '';
	tableSection.appendChild(table);

	// 筛选状态栏：显示当前筛选结果
	if (hasActiveFilter) {
		const filterBar = document.createElement('div');
		filterBar.className = 'kv-filter-status-bar';
		const filterIcon = document.createElement('span');
		filterIcon.className = 'codicon codicon-filter';
		filterIcon.setAttribute('aria-hidden', 'true');
		const filterInfo = document.createElement('span');
		filterInfo.className = 'kv-filter-status-info';
		filterInfo.textContent = `已筛选：显示 ${filteredRows.length} / ${rows.length} 行`;
		const clearAllBtn = document.createElement('button');
		clearAllBtn.type = 'button';
		clearAllBtn.className = 'kv-filter-status-clear';
		clearAllBtn.textContent = '清除所有筛选';
		clearAllBtn.addEventListener('click', () => {
			columnFilters.clear();
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		});
		filterBar.appendChild(filterIcon);
		filterBar.appendChild(filterInfo);
		filterBar.appendChild(clearAllBtn);
		tableSection.appendChild(filterBar);
	}
	refreshTableWidth();
	updateRowSelectionVisuals(); // 恢复行选择的视觉状态
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

	// 恢复滚动位置
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

	// 使用统一的对话框管理
	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = position === 'before' ? '向左插入列' : '向右插入列';
	form.appendChild(title);

	const label = document.createElement('label');
	label.textContent = '列名';
	label.className = 'kv-column-insert-dialog-label';

	const input = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: '请输入列名',
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
	cancelBtn.textContent = '取消';
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = '插入';
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
			showError('列名不能为空');
			return;
		}

		// 检查列名是否已存在
		const existingColumns = latestPayload?.columns || [];
		if (existingColumns.includes(columnName) || columnName === 'id') {
			showError('列名已存在');
			return;
		}

		// 检查列名是否合法（不能包含特殊字符）
		if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)) {
			showError('列名只能包含字母、数字和下划线，且不能以数字开头');
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

function requestColumnDeletion(columnKey) {
	if (!columnKey || typeof columnKey !== 'string') {
		return;
	}

	// id 列不能删除
	if (columnKey === 'id') {
		return;
	}

	// 使用统一的对话框管理
	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = '确认删除列';
	form.appendChild(title);

	const message = document.createElement('div');
	message.className = 'kv-column-delete-message';
	message.textContent = `确定要删除列 "${columnKey}" 吗？此操作不可恢复。`;
	form.appendChild(message);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = '取消';
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary kv-button-danger';
	submitBtn.textContent = '删除';
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
	title.textContent = `为列 "${columnName}" 设置公式`;
	form.appendChild(title);

	const formulaWrapper = document.createElement('label');
	formulaWrapper.textContent = '公式';
	formulaWrapper.className = 'kv-column-insert-dialog-label';

	const formulaInput = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: '例如：=row.id.toLowerCase()',
		value: currentFormula
	});

	formulaWrapper.appendChild(formulaInput);
	form.appendChild(formulaWrapper);

	const hint = document.createElement('div');
	hint.className = 'kv-column-insert-dialog-hint';
	hint.textContent = '提示：列公式会应用到所有没有单独设置公式的单元格';
	form.appendChild(hint);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = '取消';
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = '保存';
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

		// 发送消息保存列公式
		vscode.postMessage({
			type: 'saveColumnFormula',
			payload: { columnKey, formula }
		});

		// 重新计算公式
		updatePayloadFormulasSnapshot();
		recalculateFormulas({ emitUpdates: true });
		refreshFormulaResultsForTable();

		// 刷新列 header 显示
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

	// 使用统一的对话框管理
	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = `为列 "${columnName}" 添加描述`;
	form.appendChild(title);

	// 标签输入
	const labelWrapper = document.createElement('label');
	labelWrapper.textContent = '显示标签';
	labelWrapper.className = 'kv-column-insert-dialog-label';

	const labelInput = createInput({
		type: 'text',
		className: 'kv-column-insert-dialog-input',
		placeholder: '本地化显示名称（可选）',
		value: currentDesc.label || ''
	});

	labelWrapper.appendChild(labelInput);
	form.appendChild(labelWrapper);

	// 描述输入
	const descWrapper = document.createElement('label');
	descWrapper.textContent = 'Tooltip 描述';
	descWrapper.className = 'kv-column-insert-dialog-label';

	const descInput = createTextarea({
		className: 'kv-column-insert-dialog-input kv-column-insert-dialog-textarea',
		placeholder: '鼠标悬停时显示的描述（可选）',
		value: currentDesc.description || '',
		attributes: { rows: 3 }
	});

	descWrapper.appendChild(descInput);
	form.appendChild(descWrapper);

	// 应用范围（默认：仅在当前文件生效）
	const scopeWrapper = document.createElement('label');
	scopeWrapper.className = 'kv-column-insert-dialog-label kv-checkbox-wrapper';
	const scopeCheckbox = document.createElement('input');
	scopeCheckbox.type = 'checkbox';
	scopeCheckbox.className = 'kv-checkbox-input';
	scopeCheckbox.checked = true; // 默认仅在当前文件生效
	scopeWrapper.appendChild(scopeCheckbox);
	const checkIndicator = document.createElement('span');
	checkIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	scopeWrapper.appendChild(checkIndicator);
	const scopeText = document.createElement('span');
	scopeText.className = 'kv-checkbox-label';
	scopeText.textContent = '仅在当前文件生效';
	scopeWrapper.appendChild(scopeText);
	form.appendChild(scopeWrapper);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = '取消';
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary';
	submitBtn.textContent = '保存';
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

		// 如果都为空，删除描述
		if (!label && !description) {
			delete columnDescriptions[columnKey];
		} else {
			columnDescriptions[columnKey] = {
				label: label || undefined,
				description: description || undefined
			};
		}

		// 保存到后端（scope: 'file' 或 'global'）并在对话框内显示保存结果
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

		// 显示保存提示
		const statusEl = document.createElement('div');
		statusEl.className = 'kv-column-save-status';
		statusEl.textContent = scopeCheckbox.checked ? '已保存到当前文件' : '已保存到工作区默认配置';
		statusEl.style.marginTop = '8px';
		statusEl.style.color = '#3c763d';
		actions.appendChild(statusEl);

		// 立即局部刷新表格（payload 最终会由扩展端返回并触发完整刷新）
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}

		// 0.9s 后关闭对话框
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

	// 不允许在行号列上右键
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

	// 插入列
	const insertLeft = createMenuButton({
		label: '向左插入列',
		disabled: isIdColumn,
		onClick: () => {
			requestColumnInsertion('before', columnKey, columnIndex);
			closeColumnContextMenu();
		},
	});
	const insertRight = createMenuButton({
		label: '向右插入列',
		onClick: () => {
			requestColumnInsertion('after', columnKey, columnIndex);
			closeColumnContextMenu();
		},
	});
	menu.appendChild(insertLeft);
	menu.appendChild(insertRight);

	// 分隔线
	const separator1 = document.createElement('div');
	separator1.className = 'kv-context-menu-separator';
	menu.appendChild(separator1);

	// 冻结/取消冻结
	const isFrozen = frozenColumns.has(columnKey);
	const freezeButton = createMenuButton({
		label: isFrozen ? '取消冻结列' : '冻结列',
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

	// 列公式
	const hasColumnFormula = columnFormulas.has(columnKey);
	const formulaButton = createMenuButton({
		label: hasColumnFormula ? '取消列公式' : '添加列公式',
		onClick: () => {
			if (hasColumnFormula) {
				// 取消列公式
				setColumnFormula(columnKey, '');
				vscode.postMessage({
					type: 'saveColumnFormula',
					payload: { columnKey, formula: '' }
				});
				// 重新计算公式
				updatePayloadFormulasSnapshot();
				recalculateFormulas({ emitUpdates: true });
				refreshFormulaResultsForTable();
				// 刷新列 header 显示
				if (latestPayload) {
					renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
				}
			} else {
				// 添加列公式
				requestColumnFormula(columnKey, resolvedContext.columnName || columnKey);
			}
			closeColumnContextMenu();
		},
	});
	menu.appendChild(formulaButton);

	// 描述
	const descButton = createMenuButton({
		label: '添加描述',
		onClick: () => {
			requestColumnDescription(columnKey, resolvedContext.columnName || columnKey);
			closeColumnContextMenu();
		},
	});
	menu.appendChild(descButton);

	// 删除列
	const separator3 = document.createElement('div');
	separator3.className = 'kv-context-menu-separator';
	menu.appendChild(separator3);

	const deleteButton = createMenuButton({
		label: '删除列',
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

	// 使用统一的对话框管理
	const dialog = createManagedDialog({
		className: 'kv-column-insert-dialog-overlay'
	});

	const form = document.createElement('form');
	form.className = 'kv-column-insert-dialog';

	const title = document.createElement('div');
	title.className = 'kv-column-insert-dialog-title';
	title.textContent = '确认删除行';
	form.appendChild(title);

	const message = document.createElement('div');
	message.className = 'kv-column-delete-message';
	message.textContent = `确定要删除行 "${normalizedRowId}" 吗？此操作不可恢复。`;
	form.appendChild(message);

	const actions = document.createElement('div');
	actions.className = 'kv-column-insert-dialog-actions';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.className = 'kv-button kv-button-secondary';
	cancelBtn.textContent = '取消';
	actions.appendChild(cancelBtn);

	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.className = 'kv-button kv-button-primary kv-button-danger';
	submitBtn.textContent = '删除';
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
		{ label: '向上插入一行', position: 'before' },
		{ label: '向下插入一行', position: 'after' }
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

	// 添加分隔线
	const separator1 = document.createElement('div');
	separator1.className = 'kv-context-menu-separator';
	menu.appendChild(separator1);

	// 添加复制行选项
	const copyButton = document.createElement('button');
	copyButton.type = 'button';
	copyButton.className = 'kv-row-context-menu-item';
	copyButton.textContent = '复制行';
	copyButton.addEventListener('click', () => {
		// 先清除现有选择，选中当前行，然后复制
		selectedRows.clear();
		selectedRows.add(normalizedIndex);
		lastSelectedRowIndex = normalizedIndex;
		updateRowSelectionVisuals();
		copySelectedRows();
		closeRowContextMenu();
	});
	menu.appendChild(copyButton);

	// 添加粘贴行选项
	const pasteButton = document.createElement('button');
	pasteButton.type = 'button';
	pasteButton.className = 'kv-row-context-menu-item';
	pasteButton.textContent = '粘贴行';
	pasteButton.disabled = !copiedRowsData || copiedRowsData.length === 0;
	pasteButton.addEventListener('click', () => {
		if (copiedRowsData && copiedRowsData.length > 0) {
			pasteRows();
		}
		closeRowContextMenu();
	});
	menu.appendChild(pasteButton);

	// 添加分隔线
	const separator2 = document.createElement('div');
	separator2.className = 'kv-context-menu-separator';
	menu.appendChild(separator2);

	// 添加删除行选项
	const deleteButton = document.createElement('button');
	deleteButton.type = 'button';
	deleteButton.className = 'kv-row-context-menu-item kv-context-menu-item-danger';
	deleteButton.textContent = '删除行';
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

// ============================================================================
// 列筛选功能
// ============================================================================

/**
 * 获取经过列筛选后的行数组
 */
function getFilteredRows(rows) {
	if (!rows || !columnFilters.size) {
		return rows;
	}
	return rows.filter((row) => {
		for (const [columnKey, selectedValues] of columnFilters) {
			if (!selectedValues || selectedValues.size === 0) {
				continue; // 该列无筛选
			}
			const cellValue = columnKey === 'id' ? (row.id ?? '') : (row.values?.[columnKey] ?? '');
			const normalizedValue = String(cellValue ?? '');
			if (!selectedValues.has(normalizedValue)) {
				return false;
			}
		}
		return true;
	});
}

/**
 * 获取某列所有唯一值（用于构建筛选列表）
 */
function getColumnUniqueValues(rows, columnKey) {
	const values = new Set();
	if (!rows) return values;
	for (const row of rows) {
		const v = columnKey === 'id' ? (row.id ?? '') : (row.values?.[columnKey] ?? '');
		values.add(String(v ?? ''));
	}
	return values;
}

/**
 * 关闭当前打开的列筛选浮层
 */
function closeColumnFilterDropdown(options = {}) {
	if (!filterDropdownState) {
		return;
	}
	const { element, outsideHandler, keyHandler } = filterDropdownState;
	if (outsideHandler) {
		document.removeEventListener('mousedown', outsideHandler, true);
	}
	if (keyHandler) {
		document.removeEventListener('keydown', keyHandler, true);
	}
	if (element && element.parentElement) {
		element.remove();
	}
	filterDropdownState = null;
	if (!options.skipDialogState) {
		setDialogOpenState(false);
	}
}

/**
 * 打开列筛选浮层（Excel 风格）
 * @param {HTMLElement} anchorEl - 触发按钮元素（用于定位）
 * @param {string} columnKey - 列 key
 * @param {string} columnName - 列显示名称
 */
function openColumnFilterDropdown(anchorEl, columnKey, columnName) {
	// 若已打开同一列的筛选器，则关闭
	if (filterDropdownState && filterDropdownState.columnKey === columnKey) {
		closeColumnFilterDropdown();
		return;
	}
	closeColumnFilterDropdown({ skipDialogState: true });

	const allRows = latestPayload?.rows ?? [];
	const uniqueValues = getColumnUniqueValues(allRows, columnKey);
	const activeFilter = columnFilters.get(columnKey);
	// 当前已选中的值（若无筛选则表示全选）
	const checkedValues = new Set(activeFilter && activeFilter.size > 0 ? activeFilter : uniqueValues);

	// 构建浮层容器
	const dropdown = document.createElement('div');
	dropdown.className = 'kv-filter-dropdown';
	dropdown.setAttribute('role', 'dialog');
	dropdown.setAttribute('aria-label', `筛选 ${columnName}`);

	// 标题行
	const header = document.createElement('div');
	header.className = 'kv-filter-dropdown-header';
	const titleEl = document.createElement('span');
	titleEl.className = 'kv-filter-dropdown-title';
	titleEl.textContent = `筛选: ${columnName}`;
	const closeBtn = document.createElement('button');
	closeBtn.type = 'button';
	closeBtn.className = 'kv-filter-dropdown-close';
	closeBtn.title = '关闭';
	closeBtn.innerHTML = '<span class="codicon codicon-close"></span>';
	closeBtn.addEventListener('click', () => closeColumnFilterDropdown());
	header.appendChild(titleEl);
	header.appendChild(closeBtn);
	dropdown.appendChild(header);

	// 搜索框
	const searchInput = createInput({
		type: 'search',
		className: 'kv-filter-search',
		placeholder: '搜索值...',
		enableUndoRedo: false
	});
	dropdown.appendChild(searchInput);

	// 全选行
	const selectAllRow = document.createElement('div');
	selectAllRow.className = 'kv-filter-option kv-filter-select-all';
	const selectAllCheckbox = document.createElement('input');
	selectAllCheckbox.type = 'checkbox';
	selectAllCheckbox.id = 'kv-filter-select-all-cb';
	selectAllCheckbox.className = 'kv-filter-checkbox';
	const selectAllLabel = document.createElement('label');
	selectAllLabel.htmlFor = 'kv-filter-select-all-cb';
	selectAllLabel.className = 'kv-filter-option-label';
	selectAllLabel.textContent = '(全选)';
	selectAllRow.appendChild(selectAllCheckbox);
	selectAllRow.appendChild(selectAllLabel);
	dropdown.appendChild(selectAllRow);

	// 分隔线
	const separator = document.createElement('hr');
	separator.className = 'kv-filter-separator';
	dropdown.appendChild(separator);

	// 值列表容器
	const listContainer = document.createElement('div');
	listContainer.className = 'kv-filter-list';
	dropdown.appendChild(listContainer);

	// 排序后的唯一值
	const sortedValues = Array.from(uniqueValues).sort((a, b) => {
		// 空值排最前
		if (a === '') return -1;
		if (b === '') return 1;
		// 尝试数值排序
		const na = parseFloat(a), nb = parseFloat(b);
		if (!isNaN(na) && !isNaN(nb)) return na - nb;
		return a.localeCompare(b, undefined, { sensitivity: 'base' });
	});

	const checkboxes = [];

	function buildList(filterText) {
		listContainer.innerHTML = '';
		checkboxes.length = 0;
		const keyword = filterText.trim().toLowerCase();
		let visibleCount = 0;
		for (const val of sortedValues) {
			const displayText = val === '' ? '(空值)' : val;
			if (keyword && !displayText.toLowerCase().includes(keyword) && !val.toLowerCase().includes(keyword)) {
				continue;
			}
			visibleCount++;
			const optionRow = document.createElement('div');
			optionRow.className = 'kv-filter-option';
			const cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.className = 'kv-filter-checkbox';
			cb.value = val;
			cb.checked = checkedValues.has(val);
			cb.id = `kv-filter-cb-${CSS.escape(val)}-${columnKey}`;
			const lbl = document.createElement('label');
			lbl.htmlFor = cb.id;
			lbl.className = 'kv-filter-option-label';
			lbl.textContent = displayText;
			lbl.title = displayText;
			cb.addEventListener('change', () => {
				if (cb.checked) {
					checkedValues.add(val);
				} else {
					checkedValues.delete(val);
				}
				updateSelectAllState();
			});
			optionRow.appendChild(cb);
			optionRow.appendChild(lbl);
			listContainer.appendChild(optionRow);
			checkboxes.push(cb);
		}
		if (visibleCount === 0) {
			const emptyMsg = document.createElement('div');
			emptyMsg.className = 'kv-filter-empty';
			emptyMsg.textContent = '没有匹配的值';
			listContainer.appendChild(emptyMsg);
		}
		updateSelectAllState();
	}

	function updateSelectAllState() {
		const visible = checkboxes.filter(cb => cb.offsetParent !== null || listContainer.contains(cb));
		const checkedVisible = checkboxes.filter(cb => cb.checked);
		if (checkedVisible.length === 0) {
			selectAllCheckbox.checked = false;
			selectAllCheckbox.indeterminate = false;
		} else if (checkedVisible.length === checkboxes.length) {
			selectAllCheckbox.checked = true;
			selectAllCheckbox.indeterminate = false;
		} else {
			selectAllCheckbox.checked = false;
			selectAllCheckbox.indeterminate = true;
		}
	}

	selectAllCheckbox.addEventListener('change', () => {
		const shouldCheck = selectAllCheckbox.checked;
		for (const cb of checkboxes) {
			cb.checked = shouldCheck;
			if (shouldCheck) {
				checkedValues.add(cb.value);
			} else {
				checkedValues.delete(cb.value);
			}
		}
		selectAllCheckbox.indeterminate = false;
	});

	searchInput.addEventListener('input', () => {
		buildList(searchInput.value);
	});

	// 底部按钮区
	const footer = document.createElement('div');
	footer.className = 'kv-filter-dropdown-footer';

	const clearBtn = document.createElement('button');
	clearBtn.type = 'button';
	clearBtn.className = 'kv-filter-btn kv-filter-btn-secondary';
	clearBtn.textContent = '清除筛选';
	clearBtn.addEventListener('click', () => {
		columnFilters.delete(columnKey);
		closeColumnFilterDropdown();
		// 重新渲染表格
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
		updateAllFilterButtonStates();
	});

	const applyBtn = document.createElement('button');
	applyBtn.type = 'button';
	applyBtn.className = 'kv-filter-btn kv-filter-btn-primary';
	applyBtn.textContent = '确定';
	applyBtn.addEventListener('click', () => {
		const allSelected = checkedValues.size >= uniqueValues.size &&
			Array.from(uniqueValues).every(v => checkedValues.has(v));
		if (allSelected) {
			columnFilters.delete(columnKey);
		} else {
			columnFilters.set(columnKey, new Set(checkedValues));
		}
		closeColumnFilterDropdown();
		if (latestPayload) {
			renderTable(latestPayload.columns, latestPayload.rows, columnOptionConfig);
		}
		updateAllFilterButtonStates();
	});

	footer.appendChild(clearBtn);
	footer.appendChild(applyBtn);
	dropdown.appendChild(footer);

	// 外部点击关闭
	const outsideHandler = (event) => {
		if (!dropdown.contains(event.target) && event.target !== anchorEl) {
			closeColumnFilterDropdown();
		}
	};
	const keyHandler = (event) => {
		if (event.key === 'Escape') {
			event.stopPropagation();
			closeColumnFilterDropdown();
		}
	};

	// 定位：相对于 anchorEl
	document.body.appendChild(dropdown);
	const anchorRect = anchorEl.getBoundingClientRect();
	const ddWidth = 220;
	const ddHeight = dropdown.getBoundingClientRect().height || 300;
	let left = anchorRect.left;
	let top = anchorRect.bottom + 4;
	// 防止超出视口右侧
	if (left + ddWidth > window.innerWidth - 8) {
		left = window.innerWidth - ddWidth - 8;
	}
	// 防止超出视口底部
	if (top + ddHeight > window.innerHeight - 8) {
		top = anchorRect.top - ddHeight - 4;
	}
	dropdown.style.left = `${Math.max(4, left)}px`;
	dropdown.style.top = `${Math.max(4, top)}px`;

	// 初始构建列表
	buildList('');

	setTimeout(() => {
		document.addEventListener('mousedown', outsideHandler, true);
		document.addEventListener('keydown', keyHandler, true);
		searchInput.focus();
	}, 0);

	filterDropdownState = { element: dropdown, columnKey, outsideHandler, keyHandler };
	setDialogOpenState(true);
}

/**
 * 更新所有表头筛选按钮的激活状态（筛选器重新渲染后调用）
 */
function updateAllFilterButtonStates() {
	if (!tableSection) return;
	const filterBtns = tableSection.querySelectorAll('.kv-filter-btn-header');
	filterBtns.forEach((btn) => {
		const col = btn.dataset.filterColumn;
		if (!col) return;
		const hasFilter = columnFilters.has(col) && (columnFilters.get(col)?.size ?? 0) > 0;
		btn.classList.toggle('kv-filter-active', hasFilter);
		btn.closest('.kv-column-header-title-row')?.classList.toggle('kv-column-header-title-row-filter-active', hasFilter);
		btn.title = hasFilter ? `列 "${col}" 已筛选，点击修改` : `筛选 ${col}`;
	});
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

	// 使用统一的对话框管理
	const popup = createManagedDialog({
		className: 'kv-autofill-popup',
		onClose: () => {
			// 清理自动填充状态
			autofillPopupState = null;
		}
	});

	const title = document.createElement('div');
	title.className = 'kv-autofill-popup-title';
	title.textContent = '自动填充';
	popup.appendChild(title);

	// 基础值
	const baseField = document.createElement('div');
	baseField.className = 'kv-autofill-popup-field';
	const baseLabel = document.createElement('label');
	baseLabel.textContent = '基础值';
	const baseInput = createInput({
		type: 'number',
		value: String(baseValue),
		attributes: { step: 'any' }
	});
	baseField.appendChild(baseLabel);
	baseField.appendChild(baseInput);
	popup.appendChild(baseField);

	// 升级间隔
	const stepField = document.createElement('div');
	stepField.className = 'kv-autofill-popup-field';
	const stepLabel = document.createElement('label');
	stepLabel.textContent = '升级间隔';
	const stepInput = createInput({
		type: 'number',
		value: '1',
		attributes: { step: 'any' }
	});
	stepField.appendChild(stepLabel);
	stepField.appendChild(stepInput);
	popup.appendChild(stepField);

	// 等级数
	const levelsField = document.createElement('div');
	levelsField.className = 'kv-autofill-popup-field';
	const levelsLabel = document.createElement('label');
	levelsLabel.textContent = '等级数';
	const levelsInput = createInput({
		type: 'number',
		value: '4',
		attributes: { min: '1' }
	});
	levelsField.appendChild(levelsLabel);
	levelsField.appendChild(levelsInput);
	popup.appendChild(levelsField);

	// 预览
	const preview = document.createElement('div');
	preview.className = 'kv-autofill-popup-preview';
	preview.textContent = '预览: ';
	popup.appendChild(preview);

	// 更新预览
	const updatePreview = () => {
		const values = buildAutofillValues(baseInput.value, stepInput.value, levelsInput.value);
		preview.textContent = '预览: ' + values.join(' ');
	};

	baseInput.addEventListener('input', updatePreview);
	stepInput.addEventListener('input', updatePreview);
	levelsInput.addEventListener('input', updatePreview);
	updatePreview();

	// 按钮
	const actions = document.createElement('div');
	actions.className = 'kv-autofill-popup-actions';

	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = '取消';
	actions.appendChild(cancelButton);

	const applyButton = document.createElement('button');
	applyButton.type = 'button';
	applyButton.className = 'kv-button kv-button-primary';
	applyButton.textContent = '应用';
	actions.appendChild(applyButton);

	popup.appendChild(actions);

	// 事件处理
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

		// 触发 input 事件以保存撤销历史
		const inputEvent = new Event('input', { bubbles: true });
		context.input.dispatchEvent(inputEvent);

		closeAutofillPopup();
	});

	document.addEventListener('keydown', keyHandler, true);
	document.addEventListener('mousedown', outsideHandler, true);

	document.body.appendChild(popup);

	// 定位弹窗
	const inputRect = context.input.getBoundingClientRect();
	popup.style.top = `${inputRect.bottom + 4}px`;
	popup.style.left = `${inputRect.left}px`;

	autofillPopupState = {
		element: popup,
		keyHandler,
		outsideHandler,
		targetInput: context.input,
	};

	// 聚焦到步长输入框
	requestAnimationFrame(() => stepInput.focus());
}

function openAbilityValuesEditor(context) {
	if (!context || !context.rowId) {
		return;
	}
	closeMultiSelectDropdown();
	closeAbilityValuesEditor();
	const entries = cloneAbilityValuesEntries(context.entries || []);

	// 使用统一的对话框管理
	const overlay = createManagedDialog({
		className: 'kv-ability-editor-overlay',
		onClose: () => {
			// 清理编辑器状态
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
	closeButton.title = '关闭';
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
	addEntryButton.textContent = '新增条目';
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
	cancelButton.textContent = '取消';
	footerRight.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.dataset.role = 'apply';
	saveButton.textContent = '保存';
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
		empty.textContent = '暂无 AbilityValues 条目，请添加。';
		entriesContainer.appendChild(empty);
		return;
	}
	entries.forEach((entry, entryIndex) => {
		const entryEl = document.createElement('div');
		entryEl.className = 'kv-ability-editor-entry';
		entryEl.dataset.entryIndex = String(entryIndex);
		const mainRow = document.createElement('div');
		mainRow.className = 'kv-ability-editor-entry-row kv-ability-editor-entry-main-row';

		// 检查是否启用了 AbilityValues 本地化映射
		const hasAbilityValuesLocalization = localizationSettings.enabled &&
			localizationSettings.mappings.some(m => m.columnName === 'AbilityValues');

		// 基础键输入框
		const keyInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-ability-editor-key-input',
			placeholder: '条目键',
			value: entry.key,
			attributes: {
				dataset: {
					role: 'entry-key',
					entryIndex: String(entryIndex)
				}
			}
		});
		mainRow.appendChild(keyInput);

		// 如果启用了 AbilityValues 本地化，添加描述输入框
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
				placeholder: '描述(本地化)',
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

		// 基础值输入框组（包含内嵌的 autofill 按钮）
		const valueWrapper = document.createElement('div');
		valueWrapper.className = 'kv-ability-editor-value-wrapper';
		const valueInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-ability-editor-value-input',
			placeholder: '基础值',
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
		autofillButton.title = '自动填充 (基础值 + 升级间隔 × 等级)';
		autofillButton.innerHTML = '<span class="codicon codicon-wand"></span>';
		autofillButton.addEventListener('click', () => {
			openAutofillPopup({ input: valueInput });
		});
		valueWrapper.appendChild(autofillButton);
		mainRow.appendChild(valueWrapper);

		// 新增修饰按钮（移到主行）
		const addModifierButton = document.createElement('button');
		addModifierButton.type = 'button';
		addModifierButton.className = 'kv-button kv-button-tertiary kv-ability-editor-add-modifier';
		addModifierButton.dataset.role = 'add-modifier';
		addModifierButton.dataset.entryIndex = String(entryIndex);
		addModifierButton.title = '新增修饰';
		addModifierButton.innerHTML = '<span class="codicon codicon-add"></span>';
		mainRow.appendChild(addModifierButton);

		// 删除条目按钮
		const removeEntryButton = document.createElement('button');
		removeEntryButton.type = 'button';
		removeEntryButton.className = 'kv-button kv-button-tertiary kv-ability-editor-remove-entry';
		removeEntryButton.dataset.role = 'remove-entry';
		removeEntryButton.dataset.entryIndex = String(entryIndex);
		removeEntryButton.title = '删除条目';
		removeEntryButton.innerHTML = '<span class="codicon codicon-trash"></span>';
		mainRow.appendChild(removeEntryButton);
		entryEl.appendChild(mainRow);

		// 修饰键值容器
		const modifiersContainer = document.createElement('div');
		modifiersContainer.className = 'kv-ability-editor-modifiers';
		entry.modifiers.forEach((modifier, modifierIndex) => {
			const modifierRow = document.createElement('div');
			modifierRow.className = 'kv-ability-editor-modifier';
			modifierRow.dataset.entryIndex = String(entryIndex);
			modifierRow.dataset.modifierIndex = String(modifierIndex);

			// 修饰键输入框
			const modifierKeyInput = createInput({
				type: 'text',
				className: 'kv-ability-editor-input kv-ability-editor-modifier-key',
				placeholder: '修饰键',
				value: modifier.key,
				attributes: {
					dataset: {
						role: 'modifier-key',
						entryIndex: String(entryIndex),
						modifierIndex: String(modifierIndex)
					}
				}
			});
			modifierRow.appendChild(modifierKeyInput);

			// 修饰值输入框组（包含内嵌的 autofill 按钮）
			const modifierValueWrapper = document.createElement('div');
			modifierValueWrapper.className = 'kv-ability-editor-value-wrapper';
			const modifierValueInput = createInput({
				type: 'text',
				className: 'kv-ability-editor-input kv-ability-editor-modifier-value',
				placeholder: '修饰值',
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
			modifierAutofillButton.title = '自动填充 (基础值 + 升级间隔 × 等级)';
			modifierAutofillButton.innerHTML = '<span class="codicon codicon-wand"></span>';
			modifierAutofillButton.addEventListener('click', () => {
				openAutofillPopup({ input: modifierValueInput });
			});
			modifierValueWrapper.appendChild(modifierAutofillButton);
			modifierRow.appendChild(modifierValueWrapper);

			// 删除修饰按钮
			const removeModifierButton = document.createElement('button');
			removeModifierButton.type = 'button';
			removeModifierButton.className = 'kv-button kv-button-tertiary kv-ability-editor-remove-modifier';
			removeModifierButton.dataset.role = 'remove-modifier';
			removeModifierButton.dataset.entryIndex = String(entryIndex);
			removeModifierButton.dataset.modifierIndex = String(modifierIndex);
			removeModifierButton.title = '删除';
			removeModifierButton.innerHTML = '<span class="codicon codicon-trash"></span>';
			modifierRow.appendChild(removeModifierButton);
			modifiersContainer.appendChild(modifierRow);
			// 仅当存在修饰项时再渲染容器，避免空容器带来的 gap
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
		const modifier = { key: '', value: '' };
		entry.modifiers.push(modifier);
		entry.type = 'object';
		renderAbilityValuesEditorEntries();
		focusAbilityValuesEditorInput('modifier-key', entryIndex, entry.modifiers.length - 1);
		resetAbilityValuesEditorError();
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
			return { valid: false, message: `第 ${i + 1} 个条目的键不能为空。` };
		}
		if (seenKeys.has(trimmedKey)) {
			return { valid: false, message: `条目键 "${trimmedKey}" 重复。` };
		}
		seenKeys.add(trimmedKey);
		for (let j = 0; j < entry.modifiers.length; j += 1) {
			const modifier = entry.modifiers[j];
			const modifierKey = (modifier.key || '').trim();
			if (!modifierKey) {
				return { valid: false, message: `条目 "${trimmedKey}" 的第 ${j + 1} 个修饰键不能为空。` };
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
			errorEl.textContent = validation.message || '存在未通过校验的内容。';
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

	// 如果启用了 AbilityValues 本地化，收集并保存描述
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

		// 发送描述到后端
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

	// 使用统一的对话框管理
	const overlay = createManagedDialog({
		className: 'kv-column-options-overlay',
		onClose: () => {
			// 清理列选项编辑器状态
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
	titleParts.push('下拉选项');
	title.textContent = titleParts.join(' · ');
	header.appendChild(title);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-button kv-button-icon kv-column-options-close';
	closeButton.title = '关闭';
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
	addButton.textContent = '新增选项';
	footerLeft.appendChild(addButton);

	// 添加"仅在当前文件生效"复选框（VS Code 风格）
	const scopeCheckboxWrapper = document.createElement('label');
	scopeCheckboxWrapper.className = 'kv-checkbox-wrapper';
	scopeCheckboxWrapper.style.cssText = 'margin-left: 16px;';
	const scopeCheckbox = document.createElement('input');
	scopeCheckbox.type = 'checkbox';
	scopeCheckbox.className = 'kv-checkbox-input';
	scopeCheckbox.checked = true; // 默认勾选
	scopeCheckboxWrapper.appendChild(scopeCheckbox);
	const checkIndicator = document.createElement('span');
	checkIndicator.className = 'kv-checkbox-indicator codicon codicon-check';
	scopeCheckboxWrapper.appendChild(checkIndicator);
	const scopeLabel = document.createElement('span');
	scopeLabel.className = 'kv-checkbox-label';
	scopeLabel.textContent = '仅在当前文件生效';
	scopeCheckboxWrapper.appendChild(scopeLabel);
	footerLeft.appendChild(scopeCheckboxWrapper);

	// 添加"允许多选"复选框
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
	multiSelectLabel.textContent = '允许多选';
	multiSelectWrapper.appendChild(multiSelectLabel);
	footerLeft.appendChild(multiSelectWrapper);

	// 添加"分隔符"输入框
	const separatorWrapper = document.createElement('div');
	separatorWrapper.className = 'kv-separator-wrapper';
	separatorWrapper.style.cssText = 'margin-left: 16px; display: inline-flex; align-items: center; gap: 4px;';
	const separatorLabel = document.createElement('span');
	separatorLabel.className = 'kv-separator-label';
	separatorLabel.textContent = '分隔符:';
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
	cancelButton.textContent = '取消';
	footerRight.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.textContent = '保存';
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
	columnOptionsEditorState.errorEl.textContent = message || '存在未通过校验的内容。';
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
		empty.textContent = '暂无下拉选项，点击“新增选项”开始添加。';
		listContainer.appendChild(empty);
		return;
	}
	options.forEach((option, index) => {
		const row = document.createElement('div');
		row.className = 'kv-column-options-row';
		row.dataset.index = String(index);

		// 颜色选择器
		const colorPicker = document.createElement('div');
		colorPicker.className = 'kv-option-color-picker';
		colorPicker.dataset.role = 'color';
		colorPicker.dataset.index = String(index);
		colorPicker.style.backgroundColor = getOptionColor(option, index);
		colorPicker.title = '点击选择颜色';
		row.appendChild(colorPicker);

		const valueInput = createInput({
			type: 'text',
			className: 'kv-ability-editor-input kv-column-options-input',
			placeholder: '选项值',
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
			placeholder: '显示文本（可选）',
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
			placeholder: 'Tooltip 描述（可选）',
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
		moveUpButton.title = '上移';
		moveUpButton.disabled = index === 0;
		actions.appendChild(moveUpButton);
		const moveDownButton = document.createElement('button');
		moveDownButton.type = 'button';
		moveDownButton.className = 'kv-button kv-button-tertiary kv-column-options-action';
		moveDownButton.dataset.role = 'move-down';
		moveDownButton.dataset.index = String(index);
		moveDownButton.innerHTML = '<span class="codicon codicon-arrow-down"></span>';
		moveDownButton.title = '下移';
		moveDownButton.disabled = index === options.length - 1;
		actions.appendChild(moveDownButton);
		const removeButton = document.createElement('button');
		removeButton.type = 'button';
		removeButton.className = 'kv-button kv-button-tertiary kv-column-options-action';
		removeButton.dataset.role = 'remove';
		removeButton.dataset.index = String(index);
		removeButton.innerHTML = '<span class="codicon codicon-trash"></span>';
		removeButton.title = '删除';
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

	// 使用统一的对话框管理
	const overlay = createManagedDialog({
		className: 'kv-color-picker-overlay',
		onClose: () => {
			// 清理颜色选择器状态
			colorPickerPopup = null;
		}
	});

	const popup = document.createElement('div');
	popup.className = 'kv-color-picker-popup';

	// 预定义颜色网格
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

	// 自定义颜色输入
	const customWrapper = document.createElement('div');
	customWrapper.className = 'kv-color-picker-custom';
	const customLabel = document.createElement('label');
	customLabel.textContent = '自定义: ';
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

	// 定位弹窗
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

	// 处理颜色选择器点击
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
			return { valid: false, message: `第 ${i + 1} 行的选项值不能为空。` };
		}
		const key = value.toLowerCase();
		if (seen.has(key)) {
			return { valid: false, message: `选项值 "${value}" 重复。` };
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
	const isFileScope = scopeCheckbox ? scopeCheckbox.checked : true; // 默认勾选
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
		setColumnOptionsEditorError(validation.message || '存在未通过校验的内容。');
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
			reject('加载超时');
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
	pending.reject(payload.error || '加载失败');
}

function isCreatureColumnKey(columnKey) {
	return columnKey === 'DisableClumpingBehavior'
		|| columnKey === 'UsesGestureBasedAttackAnimation'
		|| columnKey === 'AttachWearables';
}

function getCreatureColumnBounds(columns) {
	if (!Array.isArray(columns) || !columns.length) {
		return undefined;
	}
	const indices = columns
		.map((column, index) => (isCreatureColumnKey(column) ? index : -1))
		.filter((index) => index >= 0);
	if (!indices.length) {
		return undefined;
	}
	return {
		firstIndex: indices[0],
		lastIndex: indices[indices.length - 1],
	};
}

function canDropColumnAroundCreatureGroup(sourceKey, targetColumnKey, columnIndex, position) {
	const bounds = getCreatureColumnBounds(latestPayload?.columns);
	if (!bounds) {
		return true;
	}
	if (isCreatureColumnKey(sourceKey)) {
		return false;
	}
	if (!isCreatureColumnKey(targetColumnKey)) {
		return true;
	}
	if (position === 'before' && columnIndex === bounds.firstIndex) {
		return true;
	}
	if (position === 'after' && columnIndex === bounds.lastIndex) {
		return true;
	}
	return false;
}

function handleColumnDragStart(event, columnKey, columnIndex, handleElement) {
	if (!event || columnIndex <= 0 || !latestPayload?.columns?.length) {
		if (event) {
			event.preventDefault();
		}
		return;
	}
	if (isCreatureColumnKey(columnKey)) {
		event.preventDefault();
		showTemporaryMessage('Creature 子字段暂不支持单独拖拽，请将普通列移动到该字段组前后。');
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
	if (!canDropColumnAroundCreatureGroup(columnDragState.sourceKey, columnKey, columnIndex, position)) {
		columnDragState.targetIndex = undefined;
		clearColumnDropIndicator();
		return;
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
			showTextureMenuError(typeof error === 'string' ? error : '加载失败');
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
	loading.textContent = '加载图标中…';
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
	const spellButton = createTextureMenuToggleButton('spell', '技能图标', hasSpellIcons);
	const itemButton = createTextureMenuToggleButton('item', '物品图标', hasItemIcons);
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
		placeholder: '输入关键字（空格分隔）',
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
	heroFilterBtn.title = '英雄筛选';
	// small img inside
	const heroFilterImg = document.createElement('img');
	heroFilterImg.className = 'kv-texture-menu-hero-filter-img';
	heroFilterImg.alt = '英雄';
	heroFilterBtn.appendChild(heroFilterImg);
	filterWrapper.appendChild(heroFilterBtn);

	// display mode toggle (icon only vs icon+label)
	const displayModeBtn = document.createElement('button');
	displayModeBtn.type = 'button';
	displayModeBtn.className = 'kv-texture-menu-displaymode-btn';
	displayModeBtn.title = '切换显示模式';
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
	clearBtn.textContent = '全部';
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
	makeSection('力量', groups.DOTA_ATTRIBUTE_STRENGTH);
	makeSection('敏捷', groups.DOTA_ATTRIBUTE_AGILITY);
	makeSection('智力', groups.DOTA_ATTRIBUTE_INTELLECT);
	makeSection('全才', groups.DOTA_ATTRIBUTE_ALL);
	makeSection('其他', groups.OTHER);
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
			textureMenuState.heroFilterBtn.title = textureMenuState.activeHeroId ? `当前筛选: ${hero.name}` : '英雄筛选';
		}
	} else {
		textureMenuState.heroFilterImg.removeAttribute('src');
		textureMenuState.heroFilterImg.alt = '';
		if (textureMenuState.heroFilterBtn) {
			textureMenuState.heroFilterBtn.title = '英雄筛选';
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
	button.setAttribute('aria-label', iconOnly ? '切换为图文模式' : '切换为纯图模式');
	button.title = iconOnly ? '切换为图文模式' : '切换为纯图模式';
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

	// 对于物品图标，同时匹配带和不带 item_ 前缀的情况
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
		empty.textContent = '未找到匹配的图标。';
		body.appendChild(empty);
		return;
	}
	const groups = [
		{ source: 'extension', title: '插件图标' },
		{ source: 'addon', title: '项目图标' },
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
			// 比较时考虑物品图标的 item_ 前缀
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
	// 对于物品图标，确保有 item_ 前缀
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
	errorBox.textContent = message || '加载失败';
	textureMenuState.body.appendChild(errorBox);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-texture-menu-close-button-inline';
	closeButton.textContent = '关闭';
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
		savedColumnWidths.add(column); // 记录该列是从配置加载的
		modifiedColumns.delete(column);
	}
}

// 根据扩展端消息刷新整体界面
function render(payload) {
	if (!payload) {
		return;
	}
	hideExternalChangeNotice();
	// 递增版本号，用于检测过期编辑
	payloadVersion++;
	// 如果正在编辑中，跳过本次更新以防止数据覆盖
	if (isEditInProgress) {
		// 可选：记录被跳过的更新用于调试
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

	// 加载列描述配置
	if (payload.columnDescriptions && typeof payload.columnDescriptions === 'object') {
		columnDescriptions = { ...payload.columnDescriptions };
	}

	// 加载冻结列配置（从保存的最右侧列key恢复整个冻结列集合）
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

	// 加载精简模式设置
	if (typeof payload.compactMode === 'boolean') {
		compactMode = payload.compactMode;
		if (toggleCompactModeBtn) {
			if (compactMode) {
				toggleCompactModeBtn.classList.add('active');
				toggleCompactModeBtn.title = '精简模式已开启，点击关闭';
			} else {
				toggleCompactModeBtn.classList.remove('active');
				toggleCompactModeBtn.title = '精简模式已关闭，点击开启';
			}
		}
	}

	// 加载本地化模式设置
	if (typeof payload.localizedMode === 'boolean') {
		localizedMode = payload.localizedMode;
		if (toggleLocalizedModeBtn) {
			if (localizedMode) {
				toggleLocalizedModeBtn.classList.add('active');
				toggleLocalizedModeBtn.title = '本地化模式已开启，显示描述';
			} else {
				toggleLocalizedModeBtn.classList.remove('active');
				toggleLocalizedModeBtn.title = '本地化模式已关闭，显示原文';
			}
		}
	}

	// 加载本地化设置
	if (payload.localizationSettings && typeof payload.localizationSettings === 'object') {
		localizationSettings.enabled = Boolean(payload.localizationSettings.enabled);
		localizationSettings.language = String(payload.localizationSettings.language || 'schinese');
		localizationSettings.filePath = String(payload.localizationSettings.filePath || '');
		localizationSettings.autoUpdateOnOpen = Boolean(payload.localizationSettings.autoUpdateOnOpen);
		localizationSettings.mappings = Array.isArray(payload.localizationSettings.mappings)
			? payload.localizationSettings.mappings
			: [];
	}
	updateOpenLocalizationFileButtonState();

	// 加载 AbilityValues 描述数据
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
	// 初始加载时重新计算公式，如果发现值不一致则同步到文件
	recalculateFormulas({ emitUpdates: true });
	const metaParts = [];
	if (payload.folderType) {
		metaParts.push(`路径类型: ${formatFolderType(payload.folderType)}`);
	}
	if (payload.header) {
		metaParts.push(`根键: ${payload.header}`);
	}
	if (fileNameEl) {
		fileNameEl.textContent = payload.fileName || 'KV File';
	}
	if (fileMetaEl) {
		fileMetaEl.textContent = metaParts.join(' · ');
	}
	if (payload.error) {
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
	renderTable(payload.columns, payload.rows, columnOptionConfig);
	if (emptySection) {
		emptySection.textContent = '';
	}
	setSectionVisibility({ showTable: true, showEmpty: false, showError: false });
}

function formatFolderType(folderType) {
	if (!folderType) {
		return '未知';
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
		case 'externalChangeDetected':
			showExternalChangeNotice(message.payload?.message);
			break;
		case 'clearExternalChangeNotice':
			hideExternalChangeNotice();
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
	// 更新路径输入框
	const pathInput = document.querySelector('.kv-localization-settings-overlay .kv-input[type="text"]');
	if (pathInput && payload && typeof payload.path === 'string') {
		pathInput.value = payload.path;
		localizationSettings.filePath = payload.path;
		updateOpenLocalizationFileButtonState();
	}
}

function openLocalizationSettingsDialog() {
	// 使用统一的对话框管理
	const overlay = createManagedDialog({
		className: 'kv-localization-settings-overlay',
		onClose: () => {
			// 清理状态
		}
	});

	const dialog = document.createElement('div');
	dialog.className = 'kv-modal kv-modal-lg';
	overlay.appendChild(dialog);

	// 标题栏
	const header = document.createElement('div');
	header.className = 'kv-modal-header';
	const title = document.createElement('h3');
	title.className = 'kv-modal-title';
	title.textContent = '本地化设置';
	header.appendChild(title);
	const closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'kv-button kv-button-icon';
	closeButton.title = '关闭';
	closeButton.innerHTML = '<span class="codicon codicon-close"></span>';
	closeButton.style.marginLeft = 'auto';
	header.appendChild(closeButton);
	dialog.appendChild(header);

	// 内容区域
	const body = document.createElement('div');
	body.className = 'kv-modal-body';

	// Toggle: 是否绑定本地化文件
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
	enabledText.textContent = '绑定本地化文件';
	enabledLabel.appendChild(enabledCheckbox);
	enabledLabel.appendChild(enabledIndicator);
	enabledLabel.appendChild(enabledText);
	enabledField.appendChild(enabledLabel);
	body.appendChild(enabledField);

	// Toggle: 打开文件时自动更新
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
	autoUpdateText.textContent = '打开文件时自动更新本地化';
	autoUpdateLabel.appendChild(autoUpdateCheckbox);
	autoUpdateLabel.appendChild(autoUpdateIndicator);
	autoUpdateLabel.appendChild(autoUpdateText);
	autoUpdateField.appendChild(autoUpdateLabel);
	body.appendChild(autoUpdateField);

	// 下拉选项：语言
	const languageField = document.createElement('div');
	languageField.className = 'kv-form-group';
	const languageLabel = document.createElement('label');
	languageLabel.className = 'kv-form-label';
	languageLabel.textContent = '语言';
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

	// 输入框：本地化文件路径
	const pathField = document.createElement('div');
	pathField.className = 'kv-form-group';
	const pathLabel = document.createElement('label');
	pathLabel.className = 'kv-form-label';
	pathLabel.textContent = '本地化文件路径';
	pathField.appendChild(pathLabel);
	const pathInput = createInput({
		type: 'text',
		className: 'kv-input',
		placeholder: '路径格式: {localization_path}/{language}/{kv_path}.vdf',
		value: localizationSettings.filePath,
		attributes: {
			readonly: true
		}
	});
	pathField.appendChild(pathInput);
	body.appendChild(pathField);

	// 映射表格：本地化列名 -> 本地化规则
	const mappingsField = document.createElement('div');
	mappingsField.className = 'kv-form-group';
	const mappingsLabel = document.createElement('label');
	mappingsLabel.className = 'kv-form-label';
	mappingsLabel.textContent = '本地化导出映射';
	mappingsField.appendChild(mappingsLabel);

	// 表格容器
	const tableWrapper = document.createElement('div');
	tableWrapper.className = 'kv-localization-mappings-table-wrapper';
	const table = document.createElement('table');
	table.className = 'kv-localization-mappings-table';

	// 表头
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	const colNameHeader = document.createElement('th');
	colNameHeader.textContent = '本地化列名';
	const ruleHeader = document.createElement('th');
	ruleHeader.textContent = '本地化规则';
	const actionHeader = document.createElement('th');
	actionHeader.textContent = '操作';
	actionHeader.style.width = '60px';
	headerRow.appendChild(colNameHeader);
	headerRow.appendChild(ruleHeader);
	headerRow.appendChild(actionHeader);
	thead.appendChild(headerRow);
	table.appendChild(thead);

	// 表体
	const tbody = document.createElement('tbody');
	table.appendChild(tbody);
	tableWrapper.appendChild(table);
	mappingsField.appendChild(tableWrapper);

	// 渲染映射行
	const renderMappingRows = () => {
		tbody.innerHTML = '';
		const currentMappings = localizationSettings.mappings || [];
		currentMappings.forEach((mapping, index) => {
			const row = document.createElement('tr');

			// 列名输入
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

			// 规则输入
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

			// 删除按钮
			const actionCell = document.createElement('td');
			const deleteBtn = document.createElement('button');
			deleteBtn.type = 'button';
			deleteBtn.className = 'kv-button kv-button-icon';
			deleteBtn.innerHTML = '<span class="codicon codicon-trash"></span>';
			deleteBtn.title = '删除';
			deleteBtn.addEventListener('click', () => {
				localizationSettings.mappings.splice(index, 1);
				renderMappingRows();
			});
			actionCell.appendChild(deleteBtn);
			row.appendChild(actionCell);

			tbody.appendChild(row);
		});

		// 空状态提示
		if (currentMappings.length === 0) {
			const emptyRow = document.createElement('tr');
			const emptyCell = document.createElement('td');
			emptyCell.colSpan = 3;
			emptyCell.className = 'kv-localization-mappings-empty';
			emptyCell.textContent = '暂无映射规则，点击下方按钮添加';
			emptyRow.appendChild(emptyCell);
			tbody.appendChild(emptyRow);
		}
	};

	renderMappingRows();

	// 添加按钮
	const addMappingBtn = document.createElement('button');
	addMappingBtn.type = 'button';
	addMappingBtn.className = 'kv-button kv-button-secondary';
	addMappingBtn.style.marginTop = '8px';
	addMappingBtn.innerHTML = '<span class="codicon codicon-add"></span> 添加映射';
	addMappingBtn.addEventListener('click', () => {
		if (!localizationSettings.mappings) {
			localizationSettings.mappings = [];
		}
		localizationSettings.mappings.push({ columnName: '', rule: '' });
		renderMappingRows();
		// 聚焦到新添加行的第一个输入框
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

	// 底部按钮
	const footer = document.createElement('div');
	footer.className = 'kv-modal-footer';
	const cancelButton = document.createElement('button');
	cancelButton.type = 'button';
	cancelButton.className = 'kv-button kv-button-secondary';
	cancelButton.textContent = '取消';
	footer.appendChild(cancelButton);
	const saveButton = document.createElement('button');
	saveButton.type = 'button';
	saveButton.className = 'kv-button kv-button-primary';
	saveButton.textContent = '保存';
	footer.appendChild(saveButton);
	dialog.appendChild(footer);

	// 更新路径预览函数
	const updatePathPreview = () => {
		// 发送消息到后端请求计算路径
		vscode.postMessage({
			type: 'requestLocalizationPath',
			payload: {
				language: languageSelect.value
			}
		});
	};

	// 事件处理
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
		updateOpenLocalizationFileButtonState();

		// 发送设置到后端
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

	// 初始化时请求路径
	updatePathPreview();

	// 聚焦到第一个输入
	requestAnimationFrame(() => enabledCheckbox.focus());
}

vscode.postMessage({ type: 'ready' });