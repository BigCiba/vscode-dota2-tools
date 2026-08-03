/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS class/style keys intentionally use framework-native names. */
import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import type { KvEditorV2AbilityValue, KvEditorV2Command, KvEditorV2HostMessage, KvEditorV2Snapshot, KvEditorV2TextureHero, KvEditorV2TextureIcon, KvEditorV2WebviewMessage } from '../../src/types/kvEditorV2Shared';
import { KV_EDITOR_PROTOCOL_VERSION } from '../../src/types/kvEditorV2Shared';
import { kvEditorColumnDisplayName } from '../../src/kv-editor-v2/displayNames';
import { getVsCodeApi } from '../shared/vscodeApi';
import { AbilityDialog } from './components/AbilityDialog';
import { EditorDialog } from './components/EditorDialog';
import { Icon } from './components/Icon';
import { RecordEditor } from './components/RecordEditor';
import { Cell, HeaderCell } from './components/TableCells';
import { TextureDialog } from './components/TextureDialog';
import { ValueFilterDialog } from './components/ValueFilterDialog';
import { cellRangeVisual, cellsInFillRange, cellsInRange, matrixToTsv, parseTsv, resolveCellRange } from './cellRange';
import { resolveRowSelectionShortcut } from './inputShortcuts';
import type { CellAddress, CellRangeSelection, DialogState } from './types';
import { searchTerms, textureSearchText } from './uiUtils';

interface PersistedState {
	filters: Record<string, string>;
	valueFilters?: Record<string, string[]>;
	filtersVisible?: boolean;
	selectedCell?: CellAddress;
	cellRange?: CellRangeSelection;
	selectedRows: string[];
	scrollTop: number;
	viewMode?: 'table' | 'record';
	recordRowId?: string;
}
const vscode = getVsCodeApi<PersistedState>();
const rowHeight = 30;
const overscan = 8;

export default function App() {
	const persisted = vscode.getState();
	const [snapshot, setSnapshot] = createSignal<KvEditorV2Snapshot>();
	const [viewMode, setViewMode] = createSignal<'table' | 'record'>(persisted?.viewMode ?? 'table');
	const [recordRowId, setRecordRowId] = createSignal(persisted?.recordRowId ?? '');
	const [recordDirty, setRecordDirty] = createSignal(false);
	const [recordSaveRequest, setRecordSaveRequest] = createSignal<{ requestId: string; newRowId: string }>();
	const [filters, setFilters] = createSignal<Record<string, string>>(persisted?.filters ?? {});
	const [valueFilters, setValueFilters] = createSignal<Record<string, string[]>>(persisted?.valueFilters ?? {});
	const [valueFilterColumn, setValueFilterColumn] = createSignal<string>();
	const [filtersVisible, setFiltersVisible] = createSignal(persisted?.filtersVisible ?? Object.values(persisted?.filters ?? {}).some(Boolean));
	const [selectedCell, setSelectedCell] = createSignal<CellAddress | undefined>(persisted?.selectedCell);
	const [cellRange, setCellRange] = createSignal<CellRangeSelection | undefined>(persisted?.cellRange ?? (persisted?.selectedCell ? { anchor: persisted.selectedCell, focus: persisted.selectedCell } : undefined));
	const [cellClipboard, setCellClipboard] = createSignal('');
	const [selectedRows, setSelectedRows] = createSignal(new Set(persisted?.selectedRows ?? []));
	const [rowSelectionAnchor, setRowSelectionAnchor] = createSignal<string>();
	const [editingCell, setEditingCell] = createSignal<CellAddress>();
	const [draft, setDraft] = createSignal('');
	const [formulaDraft, setFormulaDraft] = createSignal('');
	const [scrollTop, setScrollTop] = createSignal(persisted?.scrollTop ?? 0);
	const [viewportHeight, setViewportHeight] = createSignal(600);
	const [pending, setPending] = createSignal(new Set<string>());
	const [externalChange, setExternalChange] = createSignal<string>();
	const [notice, setNotice] = createSignal<{ level: string; message: string }>();
	const [abilityRowId, setAbilityRowId] = createSignal<string>();
	const [abilityDraft, setAbilityDraft] = createSignal<KvEditorV2AbilityValue[]>([]);
	const [abilityDescriptions, setAbilityDescriptions] = createSignal<Record<string, string>>({});
	const [abilityError, setAbilityError] = createSignal<string>();
	const [rowClipboard, setRowClipboard] = createSignal<KvEditorV2Snapshot['rows']>([]);
	const [draggedRow, setDraggedRow] = createSignal<string>();
	const [dropRow, setDropRow] = createSignal<string>();
	const [selectedColumn, setSelectedColumn] = createSignal<string>();
	const [previewColumnWidths, setPreviewColumnWidths] = createSignal<Record<string, number>>({});
	const [draggedColumn, setDraggedColumn] = createSignal<string>();
	const [dropColumn, setDropColumn] = createSignal<string>();
	const [textureTarget, setTextureTarget] = createSignal<CellAddress>();
	const [textureIcons, setTextureIcons] = createSignal<KvEditorV2TextureIcon[]>([]);
	const [textureHeroes, setTextureHeroes] = createSignal<KvEditorV2TextureHero[]>([]);
	const [textureKind, setTextureKind] = createSignal<'spell' | 'item'>('spell');
	const [textureHero, setTextureHero] = createSignal('');
	const [textureSearch, setTextureSearch] = createSignal('');
	const [textureRequestId, setTextureRequestId] = createSignal<string>();
	const [textureLoading, setTextureLoading] = createSignal(false);
	const [textureError, setTextureError] = createSignal<string>();
	const [dialog, setDialog] = createSignal<DialogState>();
	const [dialogError, setDialogError] = createSignal<string>();
	const commandQueue: Array<{ requestId: string; command: KvEditorV2Command }> = [];
	let commandInFlight = false;
	let viewport!: HTMLDivElement;
	let viewportObserver: ResizeObserver | undefined;
	let scrollRestored = false;
	let suppressRowClick = false;
	let activeCellPointerId: number | undefined;
	let cellDragMode: 'select' | 'fill' | undefined;
	let cellPointerStart: { x: number; y: number } | undefined;
	let cellPointerDragging = false;
	let lastCellPointerPress: { key: string; time: number } | undefined;

	const filteredRows = createMemo(() => {
		const value = snapshot();
		if (!value) {return [];}
		const activeText = Object.entries(filters()).filter(([, query]) => query.trim());
		const activeValues = Object.entries(valueFilters());
		if (!activeText.length && !activeValues.length) {return value.rows;}
		return value.rows.filter((row) => {
			const cellValue = (column: string) => column === 'id' ? row.rowId : row.values[column] ?? '';
			return activeText.every(([column, query]) => cellValue(column).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
				&& activeValues.every(([column, selected]) => selected.includes(cellValue(column)));
		});
	});
	const displayColumns = createMemo(() => snapshot()?.columns.filter((columnKey) => columnKey !== 'id') ?? []);
	const tableRowIds = createMemo(() => filteredRows().map((row) => row.rowId));
	const tableColumnKeys = createMemo(() => ['id', ...displayColumns()]);
	const selectedRangeCells = createMemo(() => cellsInRange(cellRange(), tableRowIds(), tableColumnKeys()));
	const fillRangeCells = createMemo(() => cellsInFillRange(cellRange(), tableRowIds(), tableColumnKeys()));
	const rangeVisual = (cell: CellAddress) => cellRangeVisual(cellRange(), cell, tableRowIds(), tableColumnKeys());
	const canFillColumn = (columnKey: string) => columnKey !== 'id' && columnKey !== 'AbilityValues';
	const rangeClassList = (cell: CellAddress) => {
		const visual = rangeVisual(cell);
		return { 'range-selected': visual.selected, 'range-anchor': visual.anchor, 'range-top': visual.top, 'range-right': visual.right, 'range-bottom': visual.bottom, 'range-left': visual.left, 'range-handle': visual.handle };
	};
	const uniqueValuesByColumn = createMemo(() => {
		const values: Record<string, Set<string>> = { id: new Set<string>() };
		for (const column of displayColumns()) {values[column] = new Set<string>();}
		for (const row of snapshot()?.rows ?? []) {
			values.id.add(row.rowId);
			for (const column of displayColumns()) {values[column].add(row.values[column] ?? '');}
		}
		return Object.fromEntries(Object.entries(values).map(([column, entries]) => [column, [...entries].sort((left, right) => left.localeCompare(right))]));
	});
	const activeFilterCount = createMemo(() => new Set([
		...Object.entries(filters()).filter(([, value]) => value.trim()).map(([column]) => column),
		...Object.keys(valueFilters()),
	]).size);
	const gridHeaderHeight = createMemo(() => filtersVisible() ? (snapshot()?.compactMode ? 49 : 55) : (snapshot()?.compactMode ? 28 : 32));
	const range = createMemo(() => {
		const bodyScrollTop = Math.max(0, scrollTop() - gridHeaderHeight());
		const start = Math.max(0, Math.floor(bodyScrollTop / rowHeight) - overscan);
		const end = Math.min(filteredRows().length, Math.ceil((bodyScrollTop + viewportHeight()) / rowHeight) + overscan);
		return { start, end, rows: filteredRows().slice(start, end) };
	});
	const effectiveColumnWidth = (columnKey: string) => previewColumnWidths()[columnKey] ?? snapshot()?.columnWidths[columnKey] ?? (columnKey === 'id' ? 220 : 180);
	const gridColumns = createMemo(() => {
		if (!snapshot()) {return '46px';}
		return ['46px', `${effectiveColumnWidth('id')}px`, ...displayColumns().map((key) => `${effectiveColumnWidth(key)}px`)].join(' ');
	});
	const visibleTextureIcons = createMemo(() => {
		const terms = searchTerms(textureSearch());
		return textureIcons().filter((icon) => icon.kind === textureKind() && terms.every((term) => textureSearchText(icon).includes(term)));
	});
	const frozenLeft = (columnKey: string): number | undefined => {
		const value = snapshot();
		if (!value?.frozenColumn) {return undefined;}
		const order = ['id', ...displayColumns()];
		const frozenIndex = order.indexOf(value.frozenColumn);
		const columnIndex = order.indexOf(columnKey);
		if (frozenIndex < 0 || columnIndex < 0 || columnIndex > frozenIndex) {return undefined;}
		if (columnKey === 'id') {return 46;}
		let left = 46 + effectiveColumnWidth('id');
		for (const key of displayColumns()) { if (key === columnKey) {break;} left += effectiveColumnWidth(key); }
		return left;
	};
	const activeRow = createMemo(() => snapshot()?.rows.find((row) => row.rowId === selectedCell()?.rowId));
	const activeValue = createMemo(() => {
		const cell = selectedCell(); const row = activeRow();
		if (!cell || !row) {return '';}
		const formula = snapshot()?.formulas.find((item) => item.rowId === cell.rowId && item.columnKey === cell.columnKey);
		return formula?.formula ? '=' + formula.formula.replace(/^=/, '') : cell.columnKey === 'id' ? row.rowId : row.values[cell.columnKey] ?? '';
	});
	const activeFormulaError = createMemo(() => {
		const cell = selectedCell();
		if (!cell) {return undefined;}
		return snapshot()?.formulas.find((item) => item.rowId === cell.rowId && item.columnKey === cell.columnKey && item.status === 'error')?.error;
	});

	createEffect(() => setFormulaDraft(activeValue()));
	createEffect(() => {
		const widths = snapshot()?.columnWidths;
		if (!widths) {return;}
		setPreviewColumnWidths((current) => {
			const next = Object.fromEntries(Object.entries(current).filter(([key, width]) => widths[key] !== width));
			return Object.keys(next).length === Object.keys(current).length ? current : next;
		});
	});
	createEffect(() => {
		vscode.setState({ filters: filters(), valueFilters: valueFilters(), filtersVisible: filtersVisible(), selectedCell: selectedCell(), cellRange: cellRange(), selectedRows: [...selectedRows()], scrollTop: scrollTop(), viewMode: viewMode(), recordRowId: recordRowId() });
	});
	createEffect(() => {
		const value = snapshot();
		if (!value?.rows.length) {return;}
		if (!value.rows.some((row) => row.rowId === recordRowId())) {setRecordRowId(value.rows[0].rowId);}
	});
	createEffect(() => {
		const value = snapshot();
		if (!value || !viewport) {return;}
		if (!viewportObserver) {
			viewportObserver = new ResizeObserver(() => setViewportHeight(viewport.clientHeight || 600));
			viewportObserver.observe(viewport);
			setViewportHeight(viewport.clientHeight || 600);
		}
		if (!scrollRestored) {
			scrollRestored = true;
			requestAnimationFrame(() => {
				const maximum = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
				const restored = Math.max(0, Math.min(persisted?.scrollTop ?? 0, maximum));
				viewport.scrollTop = restored;
				setScrollTop(restored);
			});
		}
	});

	const post = (message: KvEditorV2WebviewMessage) => vscode.postMessage(message);
	const dispatchNextCommand = () => {
		if (commandInFlight || !commandQueue.length) {return;}
		const value = snapshot();
		if (!value) {return;}
		const next = commandQueue.shift()!;
		commandInFlight = true;
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'executeCommand', requestId: next.requestId, documentUri: value.documentUri, baseVersion: value.documentVersion, command: next.command });
	};
	const sendCommand = (command: KvEditorV2Command) => {
		const requestId = createRequestId();
		commandQueue.push({ requestId, command });
		setPending((current) => new Set(current).add(requestId));
		dispatchNextCommand();
		return requestId;
	};
	const completeCommand = (requestId: string, continueQueue: boolean) => {
		setPending((current) => without(current, requestId));
		commandInFlight = false;
		if (!continueQueue) {
			const discarded = new Set(commandQueue.map((entry) => entry.requestId));
			commandQueue.splice(0);
			setPending((current) => new Set([...current].filter((id) => !discarded.has(id))));
			return;
		}
		queueMicrotask(dispatchNextCommand);
	};
	const updatePreference = (preference: Extract<KvEditorV2WebviewMessage, { type: 'updatePreference' }>['preference']) => {
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'updatePreference', requestId: createRequestId(), preference });
	};
	const showDialog = (state: DialogState) => { setDialogError(undefined); setDialog(state); };
	const focusCell = (cell: CellAddress) => queueMicrotask(() => document.querySelector<HTMLElement>(`[data-row-id="${CSS.escape(cell.rowId)}"][data-column="${CSS.escape(cell.columnKey)}"]`)?.focus({ preventScroll: true }));
	const selectCell = (cell: CellAddress) => {
		setSelectedRows(new Set<string>());
		setSelectedCell(cell);
		setCellRange({ anchor: cell, focus: cell });
		focusCell(cell);
	};
	const cellTabIndex = (rowId: string, columnKey: string) => { const current = selectedCell(); return current ? (sameCell(current, rowId, columnKey) ? 0 : -1) : (filteredRows()[0]?.rowId === rowId && columnKey === 'id' ? 0 : -1); };
	const moveSelection = (cell: CellAddress, rowOffset: number, columnOffset: number, extend = false) => {
		const value = snapshot();
		if (!value) {return;}
		const rows = filteredRows();
		const columns = ['id', ...displayColumns()];
		const currentRow = rows.findIndex((row) => row.rowId === cell.rowId);
		const currentColumn = columns.indexOf(cell.columnKey);
		if (currentRow < 0 || currentColumn < 0) {return;}
		const rowIndex = Math.max(0, Math.min(rows.length - 1, currentRow + rowOffset));
		const columnIndex = Math.max(0, Math.min(columns.length - 1, currentColumn + columnOffset));
		const rowId = rows[rowIndex]?.rowId;
		if (!rowId || (rowIndex === currentRow && columnIndex === currentColumn)) {focusCell(cell); return;}
		const next = { rowId, columnKey: columns[columnIndex] };
		setSelectedRows(new Set<string>());
		setSelectedCell(next);
		setCellRange((current) => ({ anchor: extend && current ? current.anchor : next, focus: next }));
		const top = gridHeaderHeight() + rowIndex * rowHeight;
		const visibleTop = viewport.scrollTop + gridHeaderHeight();
		if (top < visibleTop) {viewport.scrollTop = Math.max(0, top - gridHeaderHeight());}
		else if (top + rowHeight > viewport.scrollTop + viewport.clientHeight) {viewport.scrollTop = top + rowHeight - viewport.clientHeight;}
		requestAnimationFrame(() => focusCell(next));
	};
	const navigateSelection = (event: KeyboardEvent) => {
		if ((event.target as HTMLElement).closest('input, select, textarea')) {return;}
		const cell = selectedCell();
		if (!cell) {return;}
		if (event.key === 'Delete') {
			event.preventDefault();
			const cells = selectedRangeCells();
			if (!cells.length || cells.some((entry) => entry.columnKey === 'id' || entry.columnKey === 'AbilityValues')) {
				setNotice({ level: 'warning', message: 'ID 与 AbilityValues 不能通过批量清空修改。' });
				return;
			}
			sendCommand({ type: 'bulkEdit', edits: cells.map((entry) => ({ rowId: entry.rowId, columnKey: entry.columnKey, value: '' })) });
			return;
		}
		const offset = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1],
		}[event.key] as [number, number] | undefined;
		if (!offset) {return;}
		event.preventDefault();
		moveSelection(cell, offset[0], offset[1], event.shiftKey);
	};
	const beginCellPointerSelection = (event: PointerEvent, cell: CellAddress): boolean => {
		if (event.button !== 0 || editingCell()) {return false;}
		const key = `${cell.rowId}\u0000${cell.columnKey}`;
		const time = event.timeStamp > 0 ? event.timeStamp : performance.now();
		const previous = lastCellPointerPress;
		if (previous?.key === key && time - previous.time <= 450) {
			lastCellPointerPress = undefined;
			return true;
		}
		lastCellPointerPress = { key, time };
		const current = cellRange();
		const anchor = event.shiftKey && current ? current.anchor : cell;
		setSelectedRows(new Set<string>());
		setSelectedCell(cell);
		setCellRange({ anchor, focus: cell });
		activeCellPointerId = event.pointerId;
		cellDragMode = 'select';
		cellPointerStart = { x: event.clientX, y: event.clientY };
		cellPointerDragging = false;
		return false;
	};	const beginFillPointerSelection = (event: PointerEvent) => {
		if (event.button !== 0 || !cellRange()) {return;}
		event.preventDefault();
		event.stopPropagation();
		activeCellPointerId = event.pointerId;
		cellDragMode = 'fill';
		cellPointerStart = { x: event.clientX, y: event.clientY };
		cellPointerDragging = true;
		viewport.setPointerCapture?.(event.pointerId);
		document.body.classList.add('selecting-cells', 'dragging-fill-handle');
	};
	const updateCellPointerSelection = (event: PointerEvent) => {
		if (activeCellPointerId !== event.pointerId || !cellDragMode) {return;}
		if (cellDragMode === 'select' && !cellPointerDragging) {
			const start = cellPointerStart;
			if (!start || Math.hypot(event.clientX - start.x, event.clientY - start.y) < 4) {return;}
			cellPointerDragging = true;
			viewport.setPointerCapture?.(event.pointerId);
			document.body.classList.add('selecting-cells');
		}
		event.preventDefault();
		const bounds = viewport.getBoundingClientRect();
		if (event.clientY < bounds.top + gridHeaderHeight() + 18) {viewport.scrollTop = Math.max(0, viewport.scrollTop - rowHeight);}
		else if (event.clientY > bounds.bottom - 18) {viewport.scrollTop += rowHeight;}
		const owner = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-row-id][data-column]');
		const rowId = owner?.dataset.rowId;
		const columnKey = owner?.dataset.column;
		if (!rowId || !columnKey || !tableRowIds().includes(rowId) || !tableColumnKeys().includes(columnKey)) {return;}
		const focus = { rowId, columnKey };
		setSelectedCell(focus);
		setCellRange((current) => current ? { anchor: current.anchor, focus } : { anchor: focus, focus });
	};
	const finishCellPointerSelection = (event: PointerEvent) => {
		if (activeCellPointerId !== event.pointerId) {return;}
		const mode = cellDragMode;
		const focus = cellRange()?.focus;
		const dragged = cellPointerDragging;
		if (viewport.hasPointerCapture?.(event.pointerId)) {viewport.releasePointerCapture(event.pointerId);}
		activeCellPointerId = undefined;
		cellDragMode = undefined;
		cellPointerStart = undefined;
		cellPointerDragging = false;
		document.body.classList.remove('selecting-cells', 'dragging-fill-handle');
		if (mode === 'fill') {openRangeFill();}
		else if (dragged && focus) {focusCell(focus);}
	};
	const cancelCellPointerSelection = () => {
		activeCellPointerId = undefined;
		cellDragMode = undefined;
		cellPointerStart = undefined;
		cellPointerDragging = false;
		document.body.classList.remove('selecting-cells', 'dragging-fill-handle');
	};	const beginEdit = (cell: CellAddress, value: string, selectAll = true) => {
		selectCell(cell); setDraft(value); setEditingCell(cell);
		queueMicrotask(() => {
			const owner = document.querySelector<HTMLElement>(`[data-row-id="${CSS.escape(cell.rowId)}"][data-column="${CSS.escape(cell.columnKey)}"]`);
			const editor = owner?.querySelector<HTMLInputElement | HTMLSelectElement>('.cell-editor');
			editor?.focus();
			if (editor instanceof HTMLInputElement) {
				if (selectAll) {editor.select();}
				else {editor.setSelectionRange(editor.value.length, editor.value.length);}
			}
		});
	};
	const commitEdit = (submittedValue?: string, restoreFocus = true) => {
		const cell = editingCell(); if (!cell) {return;}
		setEditingCell(undefined);
		const row = snapshot()?.rows.find((item) => item.rowId === cell.rowId);
		const rawValue = submittedValue ?? draft();
		const nextValue = cell.columnKey === 'id' ? rawValue.trim() : rawValue;
		const currentValue = cell.columnKey === 'id' ? row?.rowId ?? '' : row?.values[cell.columnKey] ?? '';
		if (restoreFocus) {focusCell(cell);}
		if (nextValue === currentValue) {return;}
		if (cell.columnKey === 'id') {sendCommand({ type: 'renameRow', rowId: cell.rowId, newRowId: nextValue });}
		else {sendCommand({ type: 'editCell', rowId: cell.rowId, columnKey: cell.columnKey, value: nextValue });}
	};
	const cancelEdit = () => { const cell = editingCell(); setEditingCell(undefined); if (cell) {focusCell(cell);} };
	const submitFormulaBar = (submittedValue = formulaDraft()) => {
		const cell = selectedCell(); if (!cell) {return;}
		if (submittedValue.trim().startsWith('=')) {sendCommand({ type: 'saveCellFormula', rowId: cell.rowId, columnKey: cell.columnKey, formula: submittedValue.trim().slice(1) });}
		else if (cell.columnKey === 'id') {sendCommand({ type: 'renameRow', rowId: cell.rowId, newRowId: submittedValue.trim() });}
		else {sendCommand({ type: 'editCell', rowId: cell.rowId, columnKey: cell.columnKey, value: submittedValue });}
	};
	const chooseRow = (rowId: string, event: MouseEvent) => {
		setSelectedCell(undefined);
		setCellRange(undefined);
		if (event.shiftKey && rowSelectionAnchor()) {
			const rows = filteredRows(); const start = rows.findIndex((row) => row.rowId === rowSelectionAnchor()); const end = rows.findIndex((row) => row.rowId === rowId);
			if (start >= 0 && end >= 0) {setSelectedRows(new Set(rows.slice(Math.min(start, end), Math.max(start, end) + 1).map((row) => row.rowId)));}
			return;
		}
		setRowSelectionAnchor(rowId);
		setSelectedRows((current) => {
			const next = new Set(event.ctrlKey || event.metaKey ? current : []);
			if (next.has(rowId)) {next.delete(rowId);} else {next.add(rowId);}
			return next;
		});
	};
	const beginPointerReorder = (event: PointerEvent, kind: 'row' | 'column', source: string) => {
		if (event.button !== 0) {return;}
		const startX = event.clientX; const startY = event.clientY;
		let active = false;
		const targetAt = (clientX: number, clientY: number) => document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>(kind === 'row' ? '[data-row-drop]' : '[data-column-drop]');
		const move = (moveEvent: PointerEvent) => {
			if (!active && Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) < 6) {return;}
			active = true; moveEvent.preventDefault();
			if (kind === 'row') {setDraggedRow(source);} else {setDraggedColumn(source);}
			const target = targetAt(moveEvent.clientX, moveEvent.clientY);
			if (kind === 'row') {setDropRow(target?.dataset.rowDrop);} else {setDropColumn(target?.dataset.columnDrop);}
		};
		const finish = (finishEvent: PointerEvent) => {
			document.removeEventListener('pointermove', move);
			document.removeEventListener('pointerup', finish);
			document.removeEventListener('pointercancel', cancel);
			if (active) {
				finishEvent.preventDefault();
				const target = targetAt(finishEvent.clientX, finishEvent.clientY);
				const targetKey = kind === 'row' ? target?.dataset.rowDrop : target?.dataset.columnDrop;
				if (targetKey && targetKey !== source) {
					const rect = target!.getBoundingClientRect();
					const position = kind === 'row' ? (finishEvent.clientY >= rect.top + rect.height / 2 ? 'after' : 'before') : (finishEvent.clientX >= rect.left + rect.width / 2 ? 'after' : 'before');
					if (kind === 'row') {sendCommand({ type: 'reorderRow', rowId: source, anchorRowId: targetKey, position });}
					else {sendCommand({ type: 'reorderColumn', columnKey: source, anchorColumnKey: targetKey, position });}
				}
				if (kind === 'row') { suppressRowClick = true; setTimeout(() => { suppressRowClick = false; }, 0); }
			}
			setDraggedRow(undefined); setDraggedColumn(undefined); setDropRow(undefined); setDropColumn(undefined);
		};
		const cancel = () => {
			document.removeEventListener('pointermove', move);
			document.removeEventListener('pointerup', finish);
			document.removeEventListener('pointercancel', cancel);
			setDraggedRow(undefined); setDraggedColumn(undefined); setDropRow(undefined); setDropColumn(undefined);
		};
		document.addEventListener('pointermove', move, { passive: false });
		document.addEventListener('pointerup', finish);
		document.addEventListener('pointercancel', cancel);
	};
	const reconcileSelectionAfterFilter = () => {
		setCellRange(undefined);
		setSelectedCell(undefined);
		const visible = new Set(filteredRows().map((row) => row.rowId));
		setSelectedRows((current) => new Set([...current].filter((id) => visible.has(id))));
	};
	const applyFilter = (column: string, value: string) => {
		setFilters((current) => ({ ...current, [column]: value }));
		reconcileSelectionAfterFilter();
	};
	const applyValueFilter = (column: string, values: string[]) => {
		setValueFilters((current) => {
			const next = { ...current };
			if (values.length === (uniqueValuesByColumn()[column]?.length ?? 0)) {delete next[column];}
			else {next[column] = values;}
			return next;
		});
		setValueFilterColumn(undefined);
		reconcileSelectionAfterFilter();
	};
	const clearAllFilters = () => {
		setFilters({});
		setValueFilters({});
		reconcileSelectionAfterFilter();
	};
	const cellValue = (cell: CellAddress): string => {
		const row = snapshot()?.rows.find((entry) => entry.rowId === cell.rowId);
		if (!row) {return '';}
		return cell.columnKey === 'id' ? row.rowId : row.values[cell.columnKey] ?? '';
	};
	const copySelectedCells = async () => {
		const value = snapshot();
		const resolved = resolveCellRange(cellRange(), tableRowIds(), tableColumnKeys());
		if (!value || !resolved) {return;}
		if (selectedRangeCells().some((cell) => cell.columnKey === 'AbilityValues')) {
			setNotice({ level: 'warning', message: 'AbilityValues 是结构化字段，请在专用编辑器中复制。' });
			return;
		}
		const rows = tableRowIds().slice(resolved.top, resolved.bottom + 1);
		const columns = tableColumnKeys().slice(resolved.left, resolved.right + 1);
		const text = matrixToTsv(rows.map((rowId) => columns.map((columnKey) => cellValue({ rowId, columnKey }))));
		setCellClipboard(text);
		try {await navigator.clipboard?.writeText(text);} catch { /* The in-Webview clipboard remains available. */ }
		setNotice({ level: 'info', message: `已复制 ${rows.length} × ${columns.length} 个单元格。` });
	};
	const validatePastedValue = (columnKey: string, value: string): string | undefined => {
		const configuration = snapshot()?.columnOptions[columnKey];
		if (!configuration?.options.length || !value) {return undefined;}
		const allowed = new Set(configuration.options.map((option) => option.value));
		const values = configuration.multiple ? value.split(configuration.separator || '|').map((part) => part.trim()).filter(Boolean) : [value];
		const invalid = values.find((part) => !allowed.has(part));
		return invalid ? `“${invalid}” 不是 ${columnKey} 的有效选项。` : undefined;
	};
	const pasteSelectedCells = async () => {
		const anchor = cellRange()?.anchor ?? selectedCell();
		if (!anchor) {setNotice({ level: 'warning', message: '请先选择粘贴起始单元格。' }); return;}
		let text = cellClipboard();
		let available = Boolean(text);
		try {
			if (navigator.clipboard?.readText) {text = await navigator.clipboard.readText(); available = true;}
		} catch { /* Fall back to the clipboard captured in this Webview. */ }
		if (!available) {setNotice({ level: 'warning', message: '剪贴板中没有可粘贴的单元格数据。' }); return;}
		const matrix = parseTsv(text);
		const startRow = tableRowIds().indexOf(anchor.rowId);
		const startColumn = tableColumnKeys().indexOf(anchor.columnKey);
		const width = Math.max(...matrix.map((row) => row.length));
		if (startRow < 0 || startColumn < 0 || startRow + matrix.length > tableRowIds().length || startColumn + width > tableColumnKeys().length) {
			setNotice({ level: 'warning', message: '粘贴范围超出当前可见表格，请选择更靠左上方的起始单元格。' });
			return;
		}
		const edits: Array<{ rowId: string; columnKey: string; value: string }> = [];
		for (let rowOffset = 0; rowOffset < matrix.length; rowOffset++) {
			for (let columnOffset = 0; columnOffset < matrix[rowOffset].length; columnOffset++) {
				const rowId = tableRowIds()[startRow + rowOffset];
				const columnKey = tableColumnKeys()[startColumn + columnOffset];
				if (columnKey === 'id' || columnKey === 'AbilityValues') {
					setNotice({ level: 'warning', message: `粘贴范围包含不可批量覆盖的 ${columnKey} 列，操作已取消。` });
					return;
				}
				const value = matrix[rowOffset][columnOffset];
				const validationError = validatePastedValue(columnKey, value);
				if (validationError) {setNotice({ level: 'warning', message: validationError }); return;}
				edits.push({ rowId, columnKey, value });
			}
		}
		if (!edits.length) {return;}
		sendCommand({ type: 'bulkEdit', edits });
		const focus = edits[edits.length - 1];
		setSelectedRows(new Set<string>());
		setSelectedCell({ rowId: focus.rowId, columnKey: focus.columnKey });
		setCellRange({ anchor, focus: { rowId: focus.rowId, columnKey: focus.columnKey } });
		setNotice({ level: 'info', message: `已粘贴 ${matrix.length} × ${width} 个单元格；按 Ctrl+Z 可一次撤销。` });
	};
	const copySelectedRows = async () => {
		const rows = snapshot()?.rows.filter((row) => selectedRows().has(row.rowId)) ?? [];
		if (!rows.length) {return;}
		setRowClipboard(rows);
		await navigator.clipboard?.writeText(JSON.stringify({ kind: 'KvEditorV2Rows', rows })).catch(() => undefined);
		setNotice({ level: 'info', message: '已复制 ' + rows.length + ' 行。' });
	};
	const pasteRows = async () => {
		let rows = rowClipboard();
		try {
			const parsed = JSON.parse(await navigator.clipboard.readText()) as { kind?: string; rows?: KvEditorV2Snapshot['rows'] };
			if (parsed.kind === 'KvEditorV2Rows' && Array.isArray(parsed.rows)) {rows = parsed.rows;}
		} catch { /* Use the in-Webview clipboard when system clipboard access is unavailable. */ }
		if (!rows.length) { setNotice({ level: 'warning', message: '没有可粘贴的 KvEditor 行数据。' }); return; }
		sendCommand({ type: 'insertRows', anchorRowId: selectedRows().values().next().value ?? selectedCell()?.rowId, rows });
	};
	const handleTableKeyDown = (event: KeyboardEvent) => {
		const target = event.target instanceof HTMLElement ? event.target : undefined;
		if (editingCell() || dialog() || valueFilterColumn() || textureTarget() || abilityRowId()
			|| target?.closest('input, textarea, select, [contenteditable="true"]')) {navigateSelection(event); return;}
		if (selectedRows().size) {
			const action = resolveRowSelectionShortcut(event);
			if (!action) {navigateSelection(event); return;}
			event.preventDefault();
			event.stopPropagation();
			if (action === 'copy') {void copySelectedRows();}
			else if (action === 'paste') {void pasteRows();}
			else if (action === 'insert') {sendCommand({ type: 'insertRow', anchorRowId: selectedRows().values().next().value, position: 'after' });}
			else {showDialog({ kind: 'deleteRows', rowIds: [...selectedRows()] });}
			return;
		}
		if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLocaleLowerCase() === 'c' && cellRange()) {
			event.preventDefault(); event.stopPropagation(); void copySelectedCells(); return;
		}
		if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLocaleLowerCase() === 'v' && cellRange()) {
			event.preventDefault(); event.stopPropagation(); void pasteSelectedCells(); return;
		}
		navigateSelection(event);
	};
	const editLocalizationSettings = () => {
		const current = snapshot()?.localizationSettings ?? { enabled: false, language: 'schinese', filePath: '', autoUpdateOnOpen: false, mappings: [] };
		showDialog({ kind: 'localization', enabled: current.enabled, language: current.language, filePath: current.filePath, autoUpdateOnOpen: current.autoUpdateOnOpen, mappings: current.mappings.map((mapping) => ({ ...mapping })) });
	};
	const openTexturePicker = (rowId: string, value: string) => {
		const requestId = createRequestId();
		setTextureTarget({ rowId, columnKey: 'AbilityTextureName' });
		setTextureSearch(value);
		setTextureHero('');
		setTextureLoading(true);
		setTextureError(undefined);
		setTextureRequestId(requestId);
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'requestResource', requestId, resource: 'textureMenu' });
	};
	const chooseTexture = (icon: KvEditorV2TextureIcon) => {
		const target = textureTarget();
		if (!target) {return;}
		sendCommand({ type: 'editCell', rowId: target.rowId, columnKey: target.columnKey, value: icon.textureName });
		setTextureTarget(undefined);
	};
	const insertColumn = () => {
		const anchorColumnKey = selectedColumn();
		if (!anchorColumnKey) { setNotice({ level: 'warning', message: '请先单击选择一个列头。' }); return; }
		showDialog({ kind: 'insertColumn', anchorColumnKey, columnKey: '' });
	};
	const deleteColumn = () => {
		const columnKey = selectedColumn();
		if (columnKey) {showDialog({ kind: 'deleteColumn', columnKey });}
	};
	const editColumnFormula = () => {
		const columnKey = selectedColumn();
		if (!columnKey) {return;}
		const stored = snapshot()?.columnFormulas[columnKey];
		showDialog({ kind: 'columnFormula', columnKey, formula: stored ? `=${stored.replace(/^=/, '')}` : '' });
	};
	const editColumnOptions = () => {
		const columnKey = selectedColumn();
		if (!columnKey) {return;}
		const current = snapshot()?.columnOptions[columnKey] ?? { options: [], multiple: false, separator: '|' };
		showDialog({ kind: 'columnOptions', columnKey, options: current.options.map((option) => ({ ...option })), multiple: current.multiple, separator: current.separator || '|' });
	};
	const editColumnDescription = () => {
		const columnKey = selectedColumn();
		if (!columnKey) {return;}
		const current = snapshot()?.columnDescriptions[columnKey];
		showDialog({ kind: 'columnDescription', columnKey, label: current?.label ?? columnKey, description: current?.description ?? '' });
	};
	const openRangeFill = () => {
		const value = snapshot();
		const cells = fillRangeCells();
		if (!value || cells.length < 2) {
			setNotice({ level: 'warning', message: '请拖选至少两个单元格；起始格会作为填充源。' });
			return;
		}
		if (cells.some((cell) => cell.columnKey === 'id' || cell.columnKey === 'AbilityValues')) {
			setNotice({ level: 'warning', message: 'ID 与 AbilityValues 不支持批量填充。' });
			return;
		}
		const source = cells[0];
		const stored = value.formulas.find((formula) => formula.rowId === source.rowId && formula.columnKey === source.columnKey)?.formula;
		showDialog({ kind: 'fill', source, sourceValue: cellValue(source), targetCells: cells.slice(1), mode: 'copy', factor: '1', formula: stored ? `=${stored.replace(/^=/, '')}` : '=' });
	};
	const submitDialog = () => {
		const current = dialog();
		if (!current) {return;}
		try {
			switch (current.kind) {
				case 'localization': {
					const mappings = current.mappings.map((mapping) => ({ columnName: mapping.columnName.trim(), rule: mapping.rule.trim() }));
					if (mappings.some((mapping) => !mapping.columnName || !mapping.rule)) {throw new Error('列名和本地化规则都不能为空。');}
					if (new Set(mappings.map((mapping) => mapping.columnName)).size !== mappings.length) {throw new Error('同一个列不能配置多条本地化映射。');}
					sendCommand({ type: 'saveLocalizationSettings', settings: { enabled: current.enabled, language: current.language.trim() || 'schinese', filePath: current.filePath.trim(), autoUpdateOnOpen: current.autoUpdateOnOpen, mappings } });
					break;
				}
				case 'localizationAction':
					sendCommand({ type: 'runLocalizationAction', action: current.action });
					break;
				case 'insertColumn': {
					const columnKey = current.columnKey.trim();
					if (!columnKey) {throw new Error('列字段名不能为空。');}
					if (displayColumns().includes(columnKey) || columnKey === 'id') {throw new Error(`列 “${columnKey}” 已存在。`);}
					sendCommand({ type: 'insertColumn', anchorColumnKey: current.anchorColumnKey, position: 'after', columnKey });
					break;
				}
				case 'deleteColumn':
					sendCommand({ type: 'deleteColumn', columnKey: current.columnKey });
					break;
				case 'columnFormula':
					sendCommand({ type: 'saveColumnFormula', columnKey: current.columnKey, formula: current.formula.trim() ? current.formula.trim().replace(/^=/, '') : undefined });
					break;
				case 'columnOptions': {
					const options = current.options.map((option) => ({ ...option, value: option.value.trim(), label: option.label.trim() || option.value.trim(), description: option.description?.trim() || undefined, color: option.color?.trim() || undefined }));
					if (options.some((option) => !option.value)) {throw new Error('选项值不能为空。');}
					if (new Set(options.map((option) => option.value)).size !== options.length) {throw new Error('选项值不能重复。');}
					sendCommand({ type: 'saveColumnOptions', columnKey: current.columnKey, options, multiple: current.multiple, separator: current.separator || '|', scope: 'file' });
					break;
				}
				case 'columnDescription':
					sendCommand({ type: 'saveColumnDescription', columnKey: current.columnKey, label: current.label.trim() || undefined, description: current.description.trim() || undefined, scope: 'file' });
					break;
				case 'deleteRows':
					sendCommand({ type: 'deleteRows', rowIds: current.rowIds });
					break;
				case 'fill': {
					const value = snapshot();
					if (!value) {throw new Error('文档尚未加载。');}
					const sourceRow = value.rows.find((row) => row.rowId === current.source.rowId);
					if (!sourceRow || !tableColumnKeys().includes(current.source.columnKey)) {throw new Error('源单元格已经变化，请重新选择。');}
					const targets = current.targetCells.filter((cell) => value.rows.some((row) => row.rowId === cell.rowId) && tableColumnKeys().includes(cell.columnKey));
					if (targets.length !== current.targetCells.length || !targets.length) {throw new Error('目标范围已经变化，请重新选择。');}
					const sourceValue = cellValue(current.source);
					const entries: Array<{ rowId: string; columnKey: string; value?: string; formula?: string }> = [];
					if (current.mode === 'copy') {
						for (const cell of targets) {
							const validationError = validatePastedValue(cell.columnKey, sourceValue);
							if (validationError) {throw new Error(validationError);}
							entries.push({ rowId: cell.rowId, columnKey: cell.columnKey, value: sourceValue });
						}
					} else if (current.mode === 'arithmetic' || current.mode === 'geometric') {
						const initial = Number(sourceValue);
						const factor = Number(current.factor);
						if (!Number.isFinite(initial) || !Number.isFinite(factor)) {throw new Error('源值和公差/公比必须是有效数字。');}
						targets.forEach((cell, index) => {
							const step = index + 1;
							const result = current.mode === 'arithmetic' ? initial + factor * step : initial * Math.pow(factor, step);
							const nextValue = String(result);
							const validationError = validatePastedValue(cell.columnKey, nextValue);
							if (validationError) {throw new Error(validationError);}
							entries.push({ rowId: cell.rowId, columnKey: cell.columnKey, value: nextValue });
						});
					} else {
						const formula = current.formula.trim().replace(/^=/, '');
						if (!formula) {throw new Error('公式不能为空。');}
						const sourceRowIndex = tableRowIds().indexOf(current.source.rowId);
						const sourceColumnIndex = tableColumnKeys().indexOf(current.source.columnKey);
						for (const cell of targets) {
							const rowDelta = tableRowIds().indexOf(cell.rowId) - sourceRowIndex;
							const columnDelta = tableColumnKeys().indexOf(cell.columnKey) - sourceColumnIndex;
							entries.push({ rowId: cell.rowId, columnKey: cell.columnKey, formula: shiftFormulaReferences(formula, rowDelta, columnDelta) });
						}
					}
					sendCommand({ type: 'fillCells', entries });
					break;
				}
			}
			setDialog(undefined);
			setDialogError(undefined);
		} catch (error) {
			setDialogError(error instanceof Error ? error.message : String(error));
		}
	};
	const openAbilityValues = (rowId: string) => {
		setAbilityError(undefined);
		const row = snapshot()?.rows.find((item) => item.rowId === rowId);
		setAbilityDraft((row?.abilityValues ?? []).map((entry) => ({ ...entry, modifiers: entry.modifiers.map((modifier) => ({ ...modifier })) })));
		setAbilityDescriptions({ ...(snapshot()?.abilityValuesDescriptions[rowId] ?? {}) });
		setAbilityRowId(rowId);
	};
	const saveAbilityValues = () => {
		const rowId = abilityRowId(); if (!rowId) {return;}
		const keys = abilityDraft().map((entry) => entry.key.trim());
		if (keys.some((key) => !key) || new Set(keys).size !== keys.length) { setAbilityError('AbilityValues 的 key 不能为空或重复。'); return; }
		if (abilityDraft().some((entry) => entry.modifiers.some((modifier) => !modifier.key.trim()) || new Set(entry.modifiers.map((modifier) => modifier.key.trim())).size !== entry.modifiers.length)) { setAbilityError('Modifier key 不能为空或重复。'); return; }
		setAbilityError(undefined);
		const entries = abilityDraft().map((entry) => ({ ...entry, key: entry.key.trim(), type: entry.modifiers.length ? 'object' as const : 'scalar' as const, modifiers: entry.modifiers.map((modifier) => ({ key: modifier.key.trim(), value: modifier.value })) }));
		sendCommand({ type: 'editAbilityValues', rowId, entries, descriptions: abilityDescriptions() }); setAbilityRowId(undefined);
	};
	const changeViewMode = (next: 'table' | 'record') => {
		if (next === viewMode()) {return;}
		if (recordDirty()) {setNotice({ level: 'warning', message: '请先保存或放弃当前记录草稿，再切换编辑模式。' }); return;}
		if (next === 'record') {
			const preferred = selectedCell()?.rowId ?? selectedRows().values().next().value;
			if (preferred && snapshot()?.rows.some((row) => row.rowId === preferred)) {setRecordRowId(preferred);}
		}
		setViewMode(next);
	};

	onMount(() => {
		const receive = (event: MessageEvent<KvEditorV2HostMessage>) => {
			const message = event.data; if (!message || message.protocolVersion !== KV_EDITOR_PROTOCOL_VERSION) {return;}
			if (message.type === 'initialize' || message.type === 'documentChanged') { setSnapshot(message.snapshot); if (message.type === 'documentChanged') {setExternalChange(undefined);} }
			else if (message.type === 'commandResult') {
				setSnapshot(message.snapshot); completeCommand(message.requestId, true); setExternalChange(undefined);
				if (recordSaveRequest()?.requestId === message.requestId) {setRecordRowId(recordSaveRequest()!.newRowId); setRecordSaveRequest(undefined);}
			}
			else if (message.type === 'commandRejected') {
				setSnapshot(message.snapshot); completeCommand(message.requestId, message.reason !== 'stale'); setNotice({ level: 'error', message: message.message });
				if (recordSaveRequest()?.requestId === message.requestId) {setRecordSaveRequest(undefined);}
				if (message.reason === 'stale') {setExternalChange(message.message);}
			}
			else if (message.type === 'externalChange') {setExternalChange(message.message);}
			else if (message.type === 'resourceResult') { if (message.requestId === textureRequestId()) { setTextureIcons(message.payload.icons); setTextureHeroes(message.payload.heroFilters); setTextureKind(message.payload.defaultKind); setTextureHero(''); setTextureLoading(false); setTextureError(message.payload.error); } }
			else if (message.type === 'notification') {setNotice({ level: message.level, message: message.message });}
		};
		window.addEventListener('message', receive);
		window.addEventListener('blur', cancelCellPointerSelection);
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'clientReady' });
		onCleanup(() => { window.removeEventListener('message', receive); window.removeEventListener('blur', cancelCellPointerSelection); cancelCellPointerSelection(); viewportObserver?.disconnect(); });
	});

	return <main classList={{ compact: snapshot()?.compactMode }}>
		<header class="toolbar">
			<div class="title">
				<span class="title-eyebrow">KV 数据工作台</span>
				<strong><Icon name="json" />{snapshot()?.fileName ?? 'KV Editor V2'}</strong>
				<span class="title-meta">{snapshot() ? `${folderTypeLabel(snapshot()!.folderType)} · ${snapshot()!.header} · ${filteredRows().length}/${snapshot()!.rows.length} 行` : '正在加载…'}</span>
			</div>
			<div class="actions">
				<div class="action-cluster view-switch" aria-label="编辑模式">
					<span>模式</span>
					<button classList={{ active: viewMode() === 'table' }} aria-pressed={viewMode() === 'table'} onClick={() => changeViewMode('table')}><Icon name="table" />表格</button>
					<button classList={{ active: viewMode() === 'record' }} aria-pressed={viewMode() === 'record'} onClick={() => changeViewMode('record')}><Icon name="list-flat" />单条记录</button>
				</div>
				<div class="action-cluster" aria-label="显示">
					<span>显示</span>
					<button classList={{ active: snapshot()?.compactMode }} aria-pressed={Boolean(snapshot()?.compactMode)} onClick={() => updatePreference({ type: 'compactMode', value: !snapshot()?.compactMode })}><Icon name="list-tree" />紧凑</button>
					<button classList={{ active: snapshot()?.localizedMode }} aria-pressed={Boolean(snapshot()?.localizedMode)} onClick={() => updatePreference({ type: 'localizedMode', value: !snapshot()?.localizedMode })}><Icon name="globe" />本地化</button>
				</div>
				<div class="action-cluster" aria-label="本地化">
					<span>本地化</span>
					<button onClick={editLocalizationSettings}><Icon name="settings-gear" />设置</button>
					<button disabled={!snapshot()?.localizationSettings?.filePath || !snapshot()?.localizationSettings?.mappings.length} onClick={() => showDialog({ kind: 'localizationAction', action: 'import', filePath: snapshot()?.localizationSettings?.filePath ?? '' })}><Icon name="cloud-download" />导入</button>
					<button disabled={!snapshot()?.localizationSettings?.filePath || !snapshot()?.localizationSettings?.mappings.length} onClick={() => showDialog({ kind: 'localizationAction', action: 'export', filePath: snapshot()?.localizationSettings?.filePath ?? '' })}><Icon name="cloud-upload" />导出</button>
					<button disabled={!snapshot()?.localizationSettings?.filePath} onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'localizationFile', path: snapshot()?.localizationSettings?.filePath })}><Icon name="book" />打开</button>
				</div>
				<div class="action-cluster" aria-label="文档">
					<span>文档</span>
					<button onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'formulaHelp' })}><Icon name="question" />公式</button>
					<button onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'textEditor' })}><Icon name="go-to-file" />文本</button>
				</div>
			</div>
		</header>
		<Show when={externalChange()}><div class="banner warning"><span>{externalChange()}</span><button onClick={() => post({ protocolVersion: 2, type: 'reloadData' })}><Icon name="refresh" />重载</button></div></Show>
		<Show when={notice()}>{(value) => <div class={`banner ${value().level}`}><span>{value().message}</span><button aria-label="关闭" onClick={() => setNotice(undefined)}><Icon name="close" /></button></div>}</Show>
		<Show when={viewMode() === 'table'} fallback={<Show when={snapshot()}>{(value) => <RecordEditor snapshot={value()} rowId={recordRowId()} pending={Boolean(recordSaveRequest())} onSelectRow={setRecordRowId} onDirtyChange={setRecordDirty} onSave={(command) => { const requestId = sendCommand(command); setRecordSaveRequest({ requestId, newRowId: command.newRowId }); }} onTexture={openTexturePicker} onScript={(path) => post({ protocolVersion: 2, type: 'openTarget', target: 'scriptFile', path })} />}</Show>}>
		<section class="formula-bar">
			<label class="formula-address" title={selectedCell() ? `${selectedCell()!.columnKey} · ${selectedCell()!.rowId}` : '未选择单元格'}><Icon name="symbol-operator" /><span class="formula-address-text"><Show when={selectedCell()} fallback={<span>未选择单元格</span>}>{(cell) => <><strong>{cell().columnKey}</strong><span aria-hidden="true">·</span><span>{cell().rowId}</span></>}</Show></span></label>
			<input value={formulaDraft()} disabled={!selectedCell()} placeholder={selectedCell() ? '输入值，或以 = 开头输入公式' : '单击单元格后可在此编辑'} onInput={(event) => setFormulaDraft(event.currentTarget.value)} onKeyDown={(event) => { if (event.isComposing || event.keyCode === 229) {return;} if (event.key === 'Enter') {event.preventDefault(); event.stopPropagation(); submitFormulaBar(event.currentTarget.value);} if (event.key === 'Escape') {setFormulaDraft(activeValue());} }} />
			<button disabled={!selectedCell()} onClick={() => submitFormulaBar()}><Icon name="check" />应用</button>
			<Show when={activeFormulaError()}>{(error) => <span class="formula-error" title={error()}>{error()}</span>}</Show>
		</section>
		<section class="row-actions" aria-label="表格操作">
			<div class="action-group">
				<button classList={{ active: filtersVisible() }} aria-pressed={filtersVisible()} onClick={() => setFiltersVisible(!filtersVisible())}><Icon name={activeFilterCount() ? "filter-filled" : "filter"} />筛选<Show when={activeFilterCount()}> ({activeFilterCount()})</Show></button>
				<Show when={activeFilterCount()}><button onClick={clearAllFilters}><Icon name="clear-all" />清除筛选</button></Show>
			</div>
			<div class="action-group" aria-label="行操作">
				<button onClick={() => sendCommand({ type: 'insertRow', anchorRowId: selectedRows().values().next().value ?? selectedCell()?.rowId, position: 'after' })}><Icon name="add" />插入行</button>
				<button disabled={!selectedRows().size} onClick={() => showDialog({ kind: 'deleteRows', rowIds: [...selectedRows()] })}><Icon name="trash" />删除行 ({selectedRows().size})</button>
				<button disabled={!selectedRows().size} onClick={() => void copySelectedRows()}><Icon name="copy" />复制行</button>
				<button onClick={() => void pasteRows()}><Icon name="clippy" />粘贴行</button>
			</div>
			<div class="action-group" aria-label="单元格操作">
				<span class="group-label"><Icon name="selection" />单元格</span>
				<button disabled={!cellRange()} title="复制当前矩形选区 (Ctrl+C)" onClick={() => void copySelectedCells()}><Icon name="copy" />复制</button>
				<button disabled={!cellRange()} title="从当前活动单元格开始粘贴；整次操作可一次撤销 (Ctrl+V)" onClick={() => void pasteSelectedCells()}><Icon name="clippy" />粘贴</button>
				<button disabled={fillRangeCells().length < 2} title="将起始格作为源，填充当前矩形选区" onClick={openRangeFill}><Icon name="wand" />批量填充 ({Math.max(0, fillRangeCells().length - 1)})</button>
			</div>
			<div class="action-group" aria-label="列操作">
				<span class="group-label"><Icon name="symbol-field" />列</span>
				<button disabled={!selectedColumn()} onClick={insertColumn}><Icon name="add" />插入</button>
				<button disabled={!selectedColumn() || selectedColumn() === 'id'} onClick={deleteColumn}><Icon name="trash" />删除</button>
				<button disabled={!selectedColumn()} onClick={() => updatePreference({ type: 'frozenColumn', value: snapshot()?.frozenColumn === selectedColumn() ? undefined : selectedColumn() })}><Icon name="pin" />冻结</button>
				<button disabled={!selectedColumn() || selectedColumn() === 'id'} onClick={editColumnOptions}><Icon name="list-selection" />选项</button>
				<button disabled={!selectedColumn()} onClick={editColumnDescription}><Icon name="info" />说明</button>
				<button disabled={!selectedColumn() || selectedColumn() === 'id'} onClick={editColumnFormula}><Icon name="symbol-operator" />公式</button>
			</div>
			<Show when={pending().size}><span class="pending"><Icon name="loading" spin />正在应用 {pending().size} 个操作…</span></Show>
		</section>
		<Show when={snapshot()?.error}><div class="empty error">{snapshot()!.error}</div></Show>
		<Show when={snapshot() && !snapshot()!.error}>
			<div classList={{ grid: true, 'filters-visible': filtersVisible() }} style={{ '--grid-columns': gridColumns() }} ref={viewport} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)} onPointerMove={updateCellPointerSelection} onPointerUp={finishCellPointerSelection} onPointerCancel={cancelCellPointerSelection} onKeyDown={handleTableKeyDown}>
				<div class="grid-header row-grid"><div class="corner-cell">#</div>
					<HeaderCell column="id" title="ID" filter={filters().id ?? ''} showFilter={filtersVisible()} values={uniqueValuesByColumn().id ?? []} valueFilterActive={Object.prototype.hasOwnProperty.call(valueFilters(), 'id')} onFilter={applyFilter} onOpenValueFilter={setValueFilterColumn} selected={selectedColumn() === 'id'} onSelect={() => setSelectedColumn('id')} width={effectiveColumnWidth('id')} frozenLeft={frozenLeft('id')} frozenLast={snapshot()?.frozenColumn === 'id'} onResizePreview={(width) => setPreviewColumnWidths((current) => ({ ...current, id: width }))} onResizeCommit={(width) => { setPreviewColumnWidths((current) => ({ ...current, id: width })); updatePreference({ type: 'columnWidths', value: { ...snapshot()!.columnWidths, id: width } }); }} onResizeCancel={() => setPreviewColumnWidths((current) => { const next = { ...current }; delete next.id; return next; })} />
					<For each={displayColumns()}>{(column) => <HeaderCell
						column={column} title={kvEditorColumnDisplayName(snapshot()!, column)} showFilter={filtersVisible()}
						filter={filters()[column] ?? ''} values={uniqueValuesByColumn()[column] ?? []} valueFilterActive={Object.prototype.hasOwnProperty.call(valueFilters(), column)} onFilter={applyFilter} onOpenValueFilter={setValueFilterColumn} selected={selectedColumn() === column}
						width={effectiveColumnWidth(column)} frozenLeft={frozenLeft(column)} frozenLast={snapshot()?.frozenColumn === column} onResizePreview={(width) => setPreviewColumnWidths((current) => ({ ...current, [column]: width }))} onResizeCommit={(width) => { setPreviewColumnWidths((current) => ({ ...current, [column]: width })); updatePreference({ type: 'columnWidths', value: { ...snapshot()!.columnWidths, [column]: width } }); }} onResizeCancel={() => setPreviewColumnWidths((current) => { const next = { ...current }; delete next[column]; return next; })}
						onSelect={() => setSelectedColumn(column)} dropTarget={dropColumn() === column} onPointerDrag={(event) => beginPointerReorder(event, 'column', column)}
							onMove={(direction) => { const columns = displayColumns(); const index = columns.indexOf(column); const anchor = columns[index + direction]; if (anchor) {sendCommand({ type: 'reorderColumn', columnKey: column, anchorColumnKey: anchor, position: direction < 0 ? 'before' : 'after' });} }}
					/>}</For>
				</div>
				<div class="grid-spacer" style={{ height: `${filteredRows().length * rowHeight}px` }}>
						<div class="virtual-rows" style={{ transform: `translateY(${range().start * rowHeight}px)` }}>
							<For each={range().rows}>{(row, localIndex) => <div data-row-drop={row.rowId} classList={{ 'row-grid': true, selected: selectedRows().has(row.rowId), 'drop-target': dropRow() === row.rowId }} style={{ height: `${rowHeight}px` }}>
								<button class="row-number" data-row-number={row.rowId} tabindex={rowSelectionAnchor() === row.rowId || (!rowSelectionAnchor() && filteredRows()[0]?.rowId === row.rowId) ? 0 : -1} aria-label={`第 ${range().start + localIndex() + 1} 行，${row.rowId}`} title="单击选择；拖动排序；Alt+↑/↓ 移动；Ctrl+C/V 复制粘贴；Insert/Delete 插入删除" onPointerDown={(event) => beginPointerReorder(event, 'row', row.rowId)} onClick={(event) => { if (!suppressRowClick) {chooseRow(row.rowId, event);} }} onKeyDown={(event) => { if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) {return;} event.preventDefault(); const rows = filteredRows(); const index = rows.findIndex((entry) => entry.rowId === row.rowId); const direction = event.key === 'ArrowUp' ? -1 : 1; const anchor = rows[index + direction]; if (anchor) {sendCommand({ type: 'reorderRow', rowId: row.rowId, anchorRowId: anchor.rowId, position: direction < 0 ? 'before' : 'after' });} }}>{range().start + localIndex() + 1}</button>
								<Cell rowId={row.rowId} column="id" value={row.rowId} tabIndex={cellTabIndex(row.rowId, 'id')} frozenLeft={frozenLeft('id')} frozenLast={snapshot()?.frozenColumn === 'id'} selected={sameCell(selectedCell(), row.rowId, 'id')} range={rangeVisual({ rowId: row.rowId, columnKey: 'id' })} onPointerSelect={beginCellPointerSelection} editing={sameCell(editingCell(), row.rowId, 'id')} draft={draft()} onSelect={selectCell} onBeginEdit={beginEdit} onDraft={setDraft} onCommit={commitEdit} onCancel={cancelEdit} onNavigate={(rowOffset, columnOffset) => moveSelection({ rowId: row.rowId, columnKey: 'id' }, rowOffset, columnOffset)} />
								<For each={displayColumns()}>{(column) => column === 'AbilityValues'
									? <button classList={{ cell: true, ability: true, ...rangeClassList({ rowId: row.rowId, columnKey: column }), selected: sameCell(selectedCell(), row.rowId, column), frozen: frozenLeft(column) !== undefined, 'frozen-last': snapshot()?.frozenColumn === column }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} data-row-id={row.rowId} data-column={column} tabindex={cellTabIndex(row.rowId, column)} aria-label={`AbilityValues ${row.rowId}，${row.abilityValues?.length ?? 0} 项`} title="单击选择，双击编辑 AbilityValues" onPointerDown={(event) => { if (beginCellPointerSelection(event, { rowId: row.rowId, columnKey: column })) {openAbilityValues(row.rowId);} }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); openAbilityValues(row.rowId); } }}><Icon name="symbol-array" />{row.abilityValues?.length ? `${row.abilityValues.length} 项` : '编辑…'}</button>
									: column === 'AbilityTextureName'
										? <button classList={{ cell: true, 'texture-cell': true, ...rangeClassList({ rowId: row.rowId, columnKey: column }), selected: sameCell(selectedCell(), row.rowId, column), frozen: frozenLeft(column) !== undefined, 'frozen-last': snapshot()?.frozenColumn === column }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} data-row-id={row.rowId} data-column={column} tabindex={cellTabIndex(row.rowId, column)} aria-label={`${column} ${row.values[column] ?? ''}`} title={`单击选择，双击选择纹理${row.values[column] ? `：${row.values[column]}` : ''}`} onPointerDown={(event) => { if (beginCellPointerSelection(event, { rowId: row.rowId, columnKey: column })) {openTexturePicker(row.rowId, row.values[column] ?? '');} }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); openTexturePicker(row.rowId, row.values[column] ?? ''); } }}><Show when={snapshot()!.texturePreviews[row.rowId]}>{(preview) => <img src={preview().uri} width="20" height="20" alt="" />}</Show>{row.values[column] || '选择纹理…'}<Show when={canFillColumn(column) && rangeVisual({ rowId: row.rowId, columnKey: column }).handle}><span class="fill-handle" role="button" aria-label="拖动以填充当前选区" title="拖动以填充" onPointerDown={beginFillPointerSelection} /></Show></button>
										: column === 'ScriptFile'
											? <button classList={{ cell: true, ability: true, ...rangeClassList({ rowId: row.rowId, columnKey: column }), selected: sameCell(selectedCell(), row.rowId, column), frozen: frozenLeft(column) !== undefined, 'frozen-last': snapshot()?.frozenColumn === column }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} data-row-id={row.rowId} data-column={column} tabindex={cellTabIndex(row.rowId, column)} aria-label={`${column} ${row.values[column] ?? ''}`} title="单击选择，双击打开或创建脚本" onPointerDown={(event) => { if (beginCellPointerSelection(event, { rowId: row.rowId, columnKey: column })) {post({ protocolVersion: 2, type: 'openTarget', target: 'scriptFile', path: row.values[column] ?? '' });} }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); post({ protocolVersion: 2, type: 'openTarget', target: 'scriptFile', path: row.values[column] ?? '' }); } }}><Icon name="go-to-file" />{row.values[column] || '打开/创建脚本…'}<Show when={canFillColumn(column) && rangeVisual({ rowId: row.rowId, columnKey: column }).handle}><span class="fill-handle" role="button" aria-label="拖动以填充当前选区" title="拖动以填充" onPointerDown={beginFillPointerSelection} /></Show></button>
											: <Cell rowId={row.rowId} column={column} value={row.values[column] ?? ''} tabIndex={cellTabIndex(row.rowId, column)} display={localizedValue(snapshot()!, row, column)} previewUri={column === 'AbilityTextureName' ? snapshot()!.texturePreviews[row.rowId]?.uri : undefined} localizedMode={Boolean(snapshot()?.localizedMode)} frozenLeft={frozenLeft(column)} frozenLast={snapshot()?.frozenColumn === column} selected={sameCell(selectedCell(), row.rowId, column)} range={rangeVisual({ rowId: row.rowId, columnKey: column })} onPointerSelect={beginCellPointerSelection} onFillHandlePointerDown={beginFillPointerSelection} editing={sameCell(editingCell(), row.rowId, column)} draft={draft()} options={snapshot()!.columnOptions[column]} onSelect={selectCell} onBeginEdit={beginEdit} onDraft={setDraft} onCommit={commitEdit} onCancel={cancelEdit} onNavigate={(rowOffset, columnOffset) => moveSelection({ rowId: row.rowId, columnKey: column }, rowOffset, columnOffset)} />}</For>
							</div>}</For>
						</div>
					</div>
			</div>
		</Show>
		</Show>
		<Show when={textureTarget()}><TextureDialog icons={visibleTextureIcons()} kind={textureKind()} hero={textureHero()} heroes={textureHeroes()} search={textureSearch()} loading={textureLoading()} error={textureError()}
			onKind={(kind) => { setTextureKind(kind); setTextureHero(''); if (kind === 'item') {setTextureSearch('');} }} onHero={(hero) => { setTextureHero(hero.id); setTextureSearch(hero.searchTerm); }} onClearHero={() => { setTextureHero(''); setTextureSearch(''); }} onSearch={(value) => { setTextureSearch(value); const active = textureHeroes().find((hero) => hero.id === textureHero()); if (active && value.trim() !== active.searchTerm.trim()) {setTextureHero('');} }} onChoose={chooseTexture} onCancel={() => setTextureTarget(undefined)} /></Show>
		<Show when={abilityRowId()}><AbilityDialog rowId={abilityRowId()!} entries={abilityDraft()} descriptions={abilityDescriptions()} error={abilityError()} onChange={(entries) => { setAbilityError(undefined); setAbilityDraft(entries); }} onDescriptions={(descriptions) => { setAbilityError(undefined); setAbilityDescriptions(descriptions); }} onSave={saveAbilityValues} onCancel={() => { setAbilityError(undefined); setAbilityRowId(undefined); }} /></Show>
		<Show when={dialog()} keyed>{(state) => <EditorDialog state={state} error={dialogError()} onChange={(next) => { setDialogError(undefined); setDialog(next); }} onSubmit={submitDialog} onCancel={() => { setDialogError(undefined); setDialog(undefined); }} />}</Show>
		<Show when={valueFilterColumn()} keyed>{(column) => <ValueFilterDialog column={column} title={column === 'id' ? 'ID' : snapshot() ? kvEditorColumnDisplayName(snapshot()!, column) : column} values={uniqueValuesByColumn()[column] ?? []} selectedValues={valueFilters()[column]} onApply={(values) => applyValueFilter(column, values)} onCancel={() => setValueFilterColumn(undefined)} />}</Show>
	</main>;
}

function folderTypeLabel(type: KvEditorV2Snapshot['folderType']): string {
	return { ability: '技能', item: '物品', unit: '单位', custom: '自定义' }[type];
}
function localizedValue(snapshot: KvEditorV2Snapshot, row: KvEditorV2Snapshot['rows'][number], column: string): string {
	if (snapshot.localizedMode && column === 'Name' && row.localization?.name) {return row.localization.name;}
	if (snapshot.localizedMode && column === 'Description' && row.localization?.description) {return row.localization.description;}
	return row.values[column] ?? '';
}
function sameCell(cell: CellAddress | undefined, rowId: string, columnKey: string): boolean { return cell?.rowId === rowId && cell.columnKey === columnKey; }
function without(values: Set<string>, value: string): Set<string> { const next = new Set(values); next.delete(value); return next; }
function shiftFormulaReferences(formula: string, rowDelta: number, columnDelta: number): string {
	return formula.replace(/(\$?)([A-Z]{1,3})(\$?)([1-9][0-9]*)/gu, (_match, columnAbsolute: string, column: string, rowAbsolute: string, row: string) => {
		const nextColumn = columnAbsolute === '$' ? column : columnIndexToLabel(Math.max(0, columnLabelToIndex(column) + columnDelta));
		const nextRow = rowAbsolute === '$' ? row : String(Math.max(1, Number(row) + rowDelta));
		return columnAbsolute + nextColumn + rowAbsolute + nextRow;
	});
}
function columnLabelToIndex(label: string): number {
	let result = 0;
	for (const character of label) {result = result * 26 + character.charCodeAt(0) - 64;}
	return result - 1;
}
function columnIndexToLabel(index: number): string {
	let value = index + 1;
	let result = '';
	while (value > 0) {value--; result = String.fromCharCode(65 + value % 26) + result; value = Math.floor(value / 26);}
	return result;
}function createRequestId(): string { return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
