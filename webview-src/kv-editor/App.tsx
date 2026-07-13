import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import type { KvEditorV2AbilityValue, KvEditorV2Command, KvEditorV2HostMessage, KvEditorV2Snapshot, KvEditorV2TextureIcon, KvEditorV2WebviewMessage } from '../../src/types/kvEditorV2Shared';
import { KV_EDITOR_PROTOCOL_VERSION } from '../../src/types/kvEditorV2Shared';
import { getVsCodeApi } from '../shared/vscodeApi';

interface PersistedState {
	filters: Record<string, string>;
	selectedCell?: CellAddress;
	selectedRows: string[];
	scrollTop: number;
}
interface CellAddress { rowId: string; columnKey: string; }
const vscode = getVsCodeApi<PersistedState>();
const rowHeight = 30;
const overscan = 8;

export default function App() {
	const persisted = vscode.getState();
	const [snapshot, setSnapshot] = createSignal<KvEditorV2Snapshot>();
	const [filters, setFilters] = createSignal<Record<string, string>>(persisted?.filters ?? {});
	const [selectedCell, setSelectedCell] = createSignal<CellAddress | undefined>(persisted?.selectedCell);
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
	const [rowClipboard, setRowClipboard] = createSignal<KvEditorV2Snapshot['rows']>([]);
	const [draggedRow, setDraggedRow] = createSignal<string>();
	const [selectedColumn, setSelectedColumn] = createSignal<string>();
	const [draggedColumn, setDraggedColumn] = createSignal<string>();
	const [textureTarget, setTextureTarget] = createSignal<CellAddress>();
	const [textureIcons, setTextureIcons] = createSignal<KvEditorV2TextureIcon[]>([]);
	const [textureKind, setTextureKind] = createSignal<'spell' | 'item'>('spell');
	const [textureSearch, setTextureSearch] = createSignal('');
	const [textureRequestId, setTextureRequestId] = createSignal<string>();
	let viewport!: HTMLDivElement;

	const filteredRows = createMemo(() => {
		const value = snapshot();
		if (!value) return [];
		const active = Object.entries(filters()).filter(([, query]) => query.trim());
		if (!active.length) return value.rows;
		return value.rows.filter((row) => active.every(([column, query]) => {
			const cell = column === 'id' ? row.rowId : row.values[column] ?? '';
			return cell.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
		}));
	});
	const range = createMemo(() => {
		const start = Math.max(0, Math.floor(scrollTop() / rowHeight) - overscan);
		const end = Math.min(filteredRows().length, Math.ceil((scrollTop() + viewportHeight()) / rowHeight) + overscan);
		return { start, end, rows: filteredRows().slice(start, end) };
	});
	const gridColumns = createMemo(() => {
		const value = snapshot();
		if (!value) return '46px';
		return ['46px', '220px', ...value.columns.map((key) => `${value.columnWidths[key] ?? 180}px`)].join(' ');
	});
	const visibleTextureIcons = createMemo(() => {
		const query = textureSearch().trim().toLocaleLowerCase();
		return textureIcons().filter((icon) => icon.kind === textureKind() && (!query || icon.searchKey.toLocaleLowerCase().includes(query) || icon.label.toLocaleLowerCase().includes(query)));
	});
	const frozenLeft = (columnKey: string): number | undefined => {
		const value = snapshot();
		if (!value?.frozenColumn) return undefined;
		const order = ['id', ...value.columns];
		const frozenIndex = order.indexOf(value.frozenColumn);
		const columnIndex = order.indexOf(columnKey);
		if (frozenIndex < 0 || columnIndex < 0 || columnIndex > frozenIndex) return undefined;
		if (columnKey === 'id') return 46;
		let left = 46 + 220;
		for (const key of value.columns) { if (key === columnKey) break; left += value.columnWidths[key] ?? 180; }
		return left;
	};	const activeRow = createMemo(() => snapshot()?.rows.find((row) => row.rowId === selectedCell()?.rowId));
	const activeValue = createMemo(() => {
		const cell = selectedCell(); const row = activeRow();
		if (!cell || !row) return '';
		const formula = snapshot()?.formulas.find((item) => item.rowId === cell.rowId && item.columnKey === cell.columnKey);
		return formula?.formula ? '=' + formula.formula.replace(/^=/, '') : cell.columnKey === 'id' ? row.rowId : row.values[cell.columnKey] ?? '';
	});
	const activeFormulaError = createMemo(() => {
		const cell = selectedCell();
		if (!cell) return undefined;
		return snapshot()?.formulas.find((item) => item.rowId === cell.rowId && item.columnKey === cell.columnKey && item.status === 'error')?.error;
	});

	createEffect(() => setFormulaDraft(activeValue()));
	createEffect(() => {
		vscode.setState({ filters: filters(), selectedCell: selectedCell(), selectedRows: [...selectedRows()], scrollTop: scrollTop() });
	});

	const post = (message: KvEditorV2WebviewMessage) => vscode.postMessage(message);
	const sendCommand = (command: KvEditorV2Command) => {
		const value = snapshot(); if (!value) return;
		const requestId = createRequestId();
		setPending((current) => new Set(current).add(requestId));
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'executeCommand', requestId, documentUri: value.documentUri, baseVersion: value.documentVersion, command });
	};
	const updatePreference = (preference: Extract<KvEditorV2WebviewMessage, { type: 'updatePreference' }>['preference']) => {
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'updatePreference', requestId: createRequestId(), preference });
	};
	const selectCell = (cell: CellAddress) => { setSelectedRows(new Set<string>()); setSelectedCell(cell); };
	const navigateSelection = (event: KeyboardEvent) => {
		const cell = selectedCell();
		const value = snapshot();
		if (!cell || !value) return;
		if (event.key === 'Delete' && cell.columnKey !== 'id') { event.preventDefault(); sendCommand({ type: 'editCell', rowId: cell.rowId, columnKey: cell.columnKey, value: '' }); return; }
		if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
		const rows = filteredRows(); const columns = ['id', ...value.columns];
		let rowIndex = rows.findIndex((row) => row.rowId === cell.rowId); let columnIndex = columns.indexOf(cell.columnKey);
		if (event.key === 'ArrowUp') rowIndex--; else if (event.key === 'ArrowDown') rowIndex++; else if (event.key === 'ArrowLeft') columnIndex--; else columnIndex++;
		rowIndex = Math.max(0, Math.min(rows.length - 1, rowIndex)); columnIndex = Math.max(0, Math.min(columns.length - 1, columnIndex));
		const next = { rowId: rows[rowIndex]?.rowId, columnKey: columns[columnIndex] };
		if (!next.rowId) return;
		event.preventDefault(); selectCell(next);
		queueMicrotask(() => document.querySelector<HTMLElement>(`[data-row-id="${CSS.escape(next.rowId)}"][data-column="${CSS.escape(next.columnKey)}"]`)?.focus());
	};
	const beginEdit = (cell: CellAddress, value: string) => { selectCell(cell); setDraft(value); setEditingCell(cell); queueMicrotask(() => document.querySelector<HTMLInputElement>('.cell-editor')?.select()); };
	const commitEdit = () => {
		const cell = editingCell(); if (!cell) return;
		setEditingCell(undefined);
		if (cell.columnKey === 'id') sendCommand({ type: 'renameRow', rowId: cell.rowId, newRowId: draft().trim() });
		else sendCommand({ type: 'editCell', rowId: cell.rowId, columnKey: cell.columnKey, value: draft() });
	};
	const submitFormulaBar = () => {
		const cell = selectedCell(); if (!cell) return;
		if (formulaDraft().trim().startsWith('=')) sendCommand({ type: 'saveCellFormula', rowId: cell.rowId, columnKey: cell.columnKey, formula: formulaDraft().trim().slice(1) });
		else if (cell.columnKey === 'id') sendCommand({ type: 'renameRow', rowId: cell.rowId, newRowId: formulaDraft().trim() });
		else sendCommand({ type: 'editCell', rowId: cell.rowId, columnKey: cell.columnKey, value: formulaDraft() });
	};
	const chooseRow = (rowId: string, event: MouseEvent) => {
		setSelectedCell(undefined);
		if (event.shiftKey && rowSelectionAnchor()) {
			const rows = filteredRows(); const start = rows.findIndex((row) => row.rowId === rowSelectionAnchor()); const end = rows.findIndex((row) => row.rowId === rowId);
			if (start >= 0 && end >= 0) setSelectedRows(new Set(rows.slice(Math.min(start, end), Math.max(start, end) + 1).map((row) => row.rowId)));
			return;
		}
		setRowSelectionAnchor(rowId);
		setSelectedRows((current) => {
			const next = new Set(event.ctrlKey || event.metaKey ? current : []);
			if (next.has(rowId)) next.delete(rowId); else next.add(rowId);
			return next;
		});
	};
	const applyFilter = (column: string, value: string) => {
		setFilters((current) => ({ ...current, [column]: value }));
		setSelectedCell(undefined);
		const visible = new Set(filteredRows().map((row) => row.rowId));
		setSelectedRows((current) => new Set([...current].filter((id) => visible.has(id))));
	};
	const copySelectedRows = async () => {
		const rows = snapshot()?.rows.filter((row) => selectedRows().has(row.rowId)) ?? [];
		if (!rows.length) return;
		setRowClipboard(rows);
		await navigator.clipboard?.writeText(JSON.stringify({ kind: 'KvEditorV2Rows', rows })).catch(() => undefined);
		setNotice({ level: 'info', message: '已复制 ' + rows.length + ' 行。' });
	};
	const pasteRows = async () => {
		let rows = rowClipboard();
		try {
			const parsed = JSON.parse(await navigator.clipboard.readText()) as { kind?: string; rows?: KvEditorV2Snapshot['rows'] };
			if (parsed.kind === 'KvEditorV2Rows' && Array.isArray(parsed.rows)) rows = parsed.rows;
		} catch { /* Use the in-Webview clipboard when system clipboard access is unavailable. */ }
		if (!rows.length) { setNotice({ level: 'warning', message: '没有可粘贴的 KvEditor 行数据。' }); return; }
		sendCommand({ type: 'insertRows', anchorRowId: selectedRows().values().next().value ?? selectedCell()?.rowId, rows });
	};	const editLocalizationSettings = () => {
		const current = snapshot()?.localizationSettings ?? { enabled: false, language: 'schinese', filePath: '', autoUpdateOnOpen: false, mappings: [] };
		const enabledText = prompt('是否启用本地化绑定（true/false）', String(current.enabled));
		if (enabledText === null) return;
		const language = prompt('语言', current.language);
		if (language === null) return;
		const filePath = prompt('本地化 VDF 路径', current.filePath);
		if (filePath === null) return;
		const autoText = prompt('打开时自动导入（true/false）', String(current.autoUpdateOnOpen));
		if (autoText === null) return;
		const mappingsText = prompt('列映射 JSON', JSON.stringify(current.mappings));
		if (mappingsText === null) return;
		try {
			const mappings = JSON.parse(mappingsText) as Array<{ columnName: string; rule: string }>;
			if (!Array.isArray(mappings)) throw new Error('映射必须是数组。');
			sendCommand({ type: 'saveLocalizationSettings', settings: { enabled: enabledText.toLowerCase() === 'true', language: language.trim() || 'schinese', filePath: filePath.trim(), autoUpdateOnOpen: autoText.toLowerCase() === 'true', mappings } });
		} catch (error) { setNotice({ level: 'error', message: error instanceof Error ? error.message : String(error) }); }
	};	const openTexturePicker = (rowId: string, value: string) => {
		const requestId = createRequestId();
		setTextureTarget({ rowId, columnKey: 'AbilityTextureName' });
		setTextureSearch(value);
		setTextureRequestId(requestId);
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'requestResource', requestId, resource: 'textureMenu' });
	};
	const chooseTexture = (icon: KvEditorV2TextureIcon) => {
		const target = textureTarget();
		if (!target) return;
		sendCommand({ type: 'editCell', rowId: target.rowId, columnKey: target.columnKey, value: icon.textureName });
		setTextureTarget(undefined);
	};	const insertColumn = () => {
		const anchor = selectedColumn();
		if (!anchor) { setNotice({ level: 'warning', message: '请先单击选择一个列头。' }); return; }
		const columnKey = prompt('新列字段名');
		if (columnKey?.trim()) sendCommand({ type: 'insertColumn', anchorColumnKey: anchor, position: 'after', columnKey: columnKey.trim() });
	};
	const deleteColumn = () => {
		const columnKey = selectedColumn();
		if (columnKey && confirm('删除列 “' + columnKey + '” 及所有行中的对应值？')) sendCommand({ type: 'deleteColumn', columnKey });
	};
	const editColumnFormula = () => {
		const columnKey = selectedColumn();
		if (!columnKey) return;
		const formula = prompt('输入列公式；留空可删除', snapshot()?.columnFormulas[columnKey] ?? '=');
		if (formula === null) return;
		sendCommand({ type: 'saveColumnFormula', columnKey, formula: formula.trim() ? formula.trim().replace(/^=/, '') : undefined });
	};
	const editColumnOptions = () => {
		const columnKey = selectedColumn();
		if (!columnKey) return;
		const current = snapshot()?.columnOptions[columnKey] ?? { options: [], multiple: false, separator: '|' };
		const optionsText = prompt('选项 JSON（value/label/description/color）', JSON.stringify(current.options));
		if (optionsText === null) return;
		const multipleText = prompt('是否多选（true/false）', String(current.multiple));
		if (multipleText === null) return;
		const separator = prompt('多选分隔符', current.separator || '|');
		if (separator === null) return;
		try {
			const options = JSON.parse(optionsText) as Array<{ value: string; label: string; description?: string; color?: string }>;
			if (!Array.isArray(options) || options.some((option) => !option || typeof option.value !== 'string')) throw new Error('选项必须是含 value 的数组。');
			sendCommand({ type: 'saveColumnOptions', columnKey, options, multiple: multipleText.toLowerCase() === 'true', separator: separator || '|', scope: 'file' });
		} catch (error) { setNotice({ level: 'error', message: error instanceof Error ? error.message : String(error) }); }
	};	const editColumnDescription = () => {
		const columnKey = selectedColumn();
		if (!columnKey) return;
		const current = snapshot()?.columnDescriptions[columnKey];
		const label = prompt('列显示名称', current?.label ?? columnKey);
		if (label === null) return;
		const description = prompt('列说明', current?.description ?? '');
		if (description === null) return;
		sendCommand({ type: 'saveColumnDescription', columnKey, label: label.trim() || undefined, description: description.trim() || undefined, scope: 'file' });
	};	const fillSelectedRows = () => {
		const value = snapshot();
		const cell = selectedCell();
		if (!value || !cell || cell.columnKey === 'id' || !selectedRows().size) {
			setNotice({ level: 'warning', message: '请先选择源单元格，并在行号列选择目标行。' });
			return;
		}
		const sourceIndex = value.rows.findIndex((row) => row.rowId === cell.rowId);
		const sourceRow = value.rows[sourceIndex];
		const targets = value.rows.filter((row) => selectedRows().has(row.rowId));
		if (!sourceRow || !targets.length) return;
		const mode = prompt('填充模式：copy / arithmetic / geometric / formula', 'copy')?.trim().toLowerCase();
		if (!mode) return;
		const sourceValue = sourceRow.values[cell.columnKey] ?? '';
		const entries: Array<{ rowId: string; columnKey: string; value?: string; formula?: string }> = [];
		if (mode === 'copy') {
			for (const row of targets) entries.push({ rowId: row.rowId, columnKey: cell.columnKey, value: sourceValue });
		} else if (mode === 'arithmetic' || mode === 'geometric') {
			const initial = Number(sourceValue);
			const factor = Number(prompt(mode === 'arithmetic' ? '输入公差' : '输入公比', mode === 'arithmetic' ? '1' : '2'));
			if (!Number.isFinite(initial) || !Number.isFinite(factor)) { setNotice({ level: 'error', message: '源值和步长必须是有效数字。' }); return; }
			for (const row of targets) {
				const delta = value.rows.findIndex((item) => item.rowId === row.rowId) - sourceIndex;
				const result = mode === 'arithmetic' ? initial + factor * delta : initial * Math.pow(factor, delta);
				entries.push({ rowId: row.rowId, columnKey: cell.columnKey, value: String(result) });
			}
		} else if (mode === 'formula') {
			const stored = value.formulas.find((formula) => formula.rowId === cell.rowId && formula.columnKey === cell.columnKey)?.formula;
			const formula = prompt('输入安全公式', stored ?? '=');
			if (!formula) return;
			for (const row of targets) {
				const delta = value.rows.findIndex((item) => item.rowId === row.rowId) - sourceIndex;
				entries.push({ rowId: row.rowId, columnKey: cell.columnKey, formula: shiftFormulaRows(formula.replace(/^=/, ''), delta) });
			}
		} else {
			setNotice({ level: 'warning', message: '未知填充模式。' });
			return;
		}
		if (confirm('将填充 ' + entries.length + ' 个单元格，是否继续？')) sendCommand({ type: 'fillCells', entries });
	};	const openAbilityValues = (rowId: string) => {
		const row = snapshot()?.rows.find((item) => item.rowId === rowId);
		setAbilityDraft((row?.abilityValues ?? []).map((entry) => ({ ...entry, modifiers: entry.modifiers.map((modifier) => ({ ...modifier })) })));
		setAbilityDescriptions({ ...(snapshot()?.abilityValuesDescriptions[rowId] ?? {}) });
		setAbilityRowId(rowId);
	};
	const saveAbilityValues = () => {
		const rowId = abilityRowId(); if (!rowId) return;
		const keys = abilityDraft().map((entry) => entry.key.trim());
		if (keys.some((key) => !key) || new Set(keys).size !== keys.length) { setNotice({ level: 'error', message: 'AbilityValues 的 key 不能为空或重复。' }); return; }
		if (abilityDraft().some((entry) => entry.modifiers.some((modifier) => !modifier.key.trim()) || new Set(entry.modifiers.map((modifier) => modifier.key.trim())).size !== entry.modifiers.length)) { setNotice({ level: 'error', message: 'Modifier key 不能为空或重复。' }); return; }
		sendCommand({ type: 'editAbilityValues', rowId, entries: abilityDraft(), descriptions: abilityDescriptions() }); setAbilityRowId(undefined);
	};

	onMount(() => {
		const receive = (event: MessageEvent<KvEditorV2HostMessage>) => {
			const message = event.data; if (!message || message.protocolVersion !== KV_EDITOR_PROTOCOL_VERSION) return;
			if (message.type === 'initialize' || message.type === 'documentChanged') { setSnapshot(message.snapshot); if (message.type === 'documentChanged') setExternalChange(undefined); }
			else if (message.type === 'commandResult') { setSnapshot(message.snapshot); setPending((current) => without(current, message.requestId)); setExternalChange(undefined); }
			else if (message.type === 'commandRejected') { setSnapshot(message.snapshot); setPending((current) => without(current, message.requestId)); setNotice({ level: 'error', message: message.message }); if (message.reason === 'stale') setExternalChange(message.message); }
			else if (message.type === 'externalChange') setExternalChange(message.message);
			else if (message.type === 'resourceResult') { if (message.requestId === textureRequestId()) { setTextureIcons(message.payload.icons); setTextureKind(message.payload.defaultKind); } }
			else if (message.type === 'notification') setNotice({ level: message.level, message: message.message });
		};
		window.addEventListener('message', receive);
		const observer = new ResizeObserver(() => setViewportHeight(viewport?.clientHeight ?? 600));
		if (viewport) { observer.observe(viewport); viewport.scrollTop = persisted?.scrollTop ?? 0; }
		post({ protocolVersion: KV_EDITOR_PROTOCOL_VERSION, type: 'clientReady' });
		onCleanup(() => { window.removeEventListener('message', receive); observer.disconnect(); });
	});

	return <main classList={{ compact: snapshot()?.compactMode }}>
		<header class="toolbar">
			<div class="title"><strong>{snapshot()?.fileName ?? 'KV Editor V2'}</strong><span>{snapshot() ? `${snapshot()!.folderType} · ${snapshot()!.header} · ${filteredRows().length}/${snapshot()!.rows.length}` : '正在加载…'}</span></div>
			<div class="actions">
				<button onClick={() => updatePreference({ type: 'compactMode', value: !snapshot()?.compactMode })}>紧凑</button>
				<button onClick={() => updatePreference({ type: 'localizedMode', value: !snapshot()?.localizedMode })}>本地化</button>
				<button onClick={editLocalizationSettings}>本地化设置</button>
				<button disabled={!snapshot()?.localizationSettings?.filePath} onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'localizationFile', path: snapshot()?.localizationSettings?.filePath })}>打开本地化</button>				<button onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'formulaHelp' })}>公式帮助</button>
				<button onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'textEditor' })}>文本编辑器</button>
			</div>
		</header>
		<Show when={externalChange()}><div class="banner warning"><span>{externalChange()}</span><button onClick={() => post({ protocolVersion: 2, type: 'reloadData' })}>重载</button></div></Show>
		<Show when={notice()}>{(value) => <div class={`banner ${value().level}`}><span>{value().message}</span><button aria-label="关闭" onClick={() => setNotice(undefined)}>×</button></div>}</Show>
		<section class="formula-bar">
			<label>{selectedCell() ? `${selectedCell()!.columnKey} · ${selectedCell()!.rowId}` : '未选择单元格'}</label>
			<input value={formulaDraft()} disabled={!selectedCell()} onInput={(event) => setFormulaDraft(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === 'Enter') submitFormulaBar(); if (event.key === 'Escape') setFormulaDraft(activeValue()); }} />
			<button disabled={!selectedCell()} onClick={submitFormulaBar}>应用</button>
			<Show when={activeFormulaError()}>{(error) => <span class="formula-error" title={error()}>{error()}</span>}</Show>
		</section>
		<section class="row-actions">
			<button onClick={() => sendCommand({ type: 'insertRow', anchorRowId: selectedRows().values().next().value ?? selectedCell()?.rowId, position: 'after' })}>插入行</button>
			<button disabled={!selectedRows().size} onClick={() => { if (confirm(`删除选中的 ${selectedRows().size} 行？`)) sendCommand({ type: 'deleteRows', rowIds: [...selectedRows()] }); }}>删除行 ({selectedRows().size})</button>
			<button disabled={!selectedRows().size} onClick={() => void copySelectedRows()}>复制行</button>
			<button onClick={() => void pasteRows()}>粘贴行</button>
			<button disabled={!selectedRows().size || !selectedCell()} onClick={fillSelectedRows}>填充</button>
			<button disabled={!selectedColumn()} onClick={insertColumn}>插入列</button>
			<button disabled={!selectedColumn()} onClick={deleteColumn}>删除列</button>
			<button disabled={!selectedColumn()} onClick={() => updatePreference({ type: 'frozenColumn', value: snapshot()?.frozenColumn === selectedColumn() ? undefined : selectedColumn() })}>冻结列</button>
			<button disabled={!selectedColumn()} onClick={editColumnOptions}>列选项</button>
			<button disabled={!selectedColumn()} onClick={editColumnDescription}>列说明</button>
			<button disabled={!selectedColumn()} onClick={editColumnFormula}>列公式</button>
			<Show when={pending().size}><span class="pending">正在应用 {pending().size} 个操作…</span></Show>
		</section>
		<Show when={snapshot()?.error}><div class="empty error">{snapshot()!.error}</div></Show>
		<Show when={snapshot() && !snapshot()!.error}>
			<div class="grid" style={{ '--grid-columns': gridColumns() }} onKeyDown={navigateSelection}>
				<div class="grid-header row-grid"><div class="corner-cell">#</div>
					<HeaderCell column="id" title="ID" filter={filters().id ?? ''} onFilter={applyFilter} frozenLeft={frozenLeft('id')} />
					<For each={snapshot()!.columns}>{(column) => <HeaderCell
						column={column} title={snapshot()!.columnDescriptions[column]?.label ?? column}
						filter={filters()[column] ?? ''} onFilter={applyFilter} selected={selectedColumn() === column}
						width={snapshot()!.columnWidths[column] ?? 180} frozenLeft={frozenLeft(column)} onResize={(width) => updatePreference({ type: 'columnWidths', value: { ...snapshot()!.columnWidths, [column]: width } })}
						onSelect={() => setSelectedColumn(column)} onDragStart={() => setDraggedColumn(column)}
						onDrop={() => { const source = draggedColumn(); if (source && source !== column) sendCommand({ type: 'reorderColumn', columnKey: source, anchorColumnKey: column, position: 'before' }); setDraggedColumn(undefined); }}
					/>}</For>
				</div>
				<div class="grid-viewport" ref={viewport} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
					<div class="grid-spacer" style={{ height: `${filteredRows().length * rowHeight}px` }}>
						<div class="virtual-rows" style={{ transform: `translateY(${range().start * rowHeight}px)` }}>
							<For each={range().rows}>{(row, localIndex) => <div classList={{ 'row-grid': true, selected: selectedRows().has(row.rowId) }} style={{ height: `${rowHeight}px` }} onDragOver={(event) => event.preventDefault()} onDrop={() => { const source = draggedRow(); if (source && source !== row.rowId) sendCommand({ type: 'reorderRow', rowId: source, anchorRowId: row.rowId, position: 'before' }); setDraggedRow(undefined); }}>
								<button class="row-number" draggable onDragStart={() => setDraggedRow(row.rowId)} onClick={(event) => chooseRow(row.rowId, event)}>{range().start + localIndex() + 1}</button>
								<Cell rowId={row.rowId} column="id" value={row.rowId} frozenLeft={frozenLeft('id')} selected={sameCell(selectedCell(), row.rowId, 'id')} editing={sameCell(editingCell(), row.rowId, 'id')} draft={draft()} onSelect={selectCell} onBeginEdit={beginEdit} onDraft={setDraft} onCommit={commitEdit} onCancel={() => setEditingCell(undefined)} />
								<For each={snapshot()!.columns}>{(column) => column === 'AbilityValues'
									? <button classList={{ cell: true, ability: true, frozen: frozenLeft(column) !== undefined }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} onClick={() => openAbilityValues(row.rowId)}>{row.abilityValues?.length ? `${row.abilityValues.length} 项` : '编辑…'}</button>
									: column === 'AbilityTextureName'
										? <button classList={{ cell: true, 'texture-cell': true, frozen: frozenLeft(column) !== undefined }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} title={row.values[column] ?? ''} onClick={() => selectCell({ rowId: row.rowId, columnKey: column })} onDblClick={() => openTexturePicker(row.rowId, row.values[column] ?? '')}><Show when={snapshot()!.texturePreviews[row.values[column] ?? '']}>{(preview) => <img src={preview().uri} width="20" height="20" alt="" />}</Show>{row.values[column] || '选择纹理…'}</button>
										: column === 'ScriptFile'
											? <button classList={{ cell: true, ability: true, frozen: frozenLeft(column) !== undefined }} style={{ left: frozenLeft(column) !== undefined ? `${frozenLeft(column)}px` : undefined }} title={row.values[column] ?? ''} onClick={() => post({ protocolVersion: 2, type: 'openTarget', target: 'scriptFile', path: row.values[column] ?? '' })}>{row.values[column] || '打开/创建脚本…'}</button>
											: <Cell rowId={row.rowId} column={column} value={row.values[column] ?? ''} display={localizedValue(snapshot()!, row, column)} previewUri={column === 'AbilityTextureName' ? snapshot()!.texturePreviews[row.values[column] ?? '']?.uri : undefined} frozenLeft={frozenLeft(column)} selected={sameCell(selectedCell(), row.rowId, column)} editing={sameCell(editingCell(), row.rowId, column)} draft={draft()} options={snapshot()!.columnOptions[column]} onSelect={selectCell} onBeginEdit={beginEdit} onDraft={setDraft} onCommit={commitEdit} onCancel={() => setEditingCell(undefined)} />}</For>
							</div>}</For>
						</div>
					</div>
				</div>
			</div>
		</Show>
		<Show when={textureTarget()}><TextureDialog icons={visibleTextureIcons()} kind={textureKind()} search={textureSearch()}
			onKind={setTextureKind} onSearch={setTextureSearch} onChoose={chooseTexture} onCancel={() => setTextureTarget(undefined)} /></Show>
		<Show when={abilityRowId()}><AbilityDialog rowId={abilityRowId()!} entries={abilityDraft()} descriptions={abilityDescriptions()} onChange={setAbilityDraft} onDescriptions={setAbilityDescriptions} onSave={saveAbilityValues} onCancel={() => setAbilityRowId(undefined)} /></Show>
	</main>;
}

function HeaderCell(props: { column: string; title: string; filter: string; selected?: boolean; width?: number; frozenLeft?: number; onFilter(column: string, value: string): void; onSelect?(): void; onDragStart?(): void; onDrop?(): void; onResize?(width: number): void }) {
	const startResize = (event: PointerEvent) => {
		if (!props.onResize) return;
		event.preventDefault(); event.stopPropagation();
		const startX = event.clientX; const startWidth = props.width ?? 180; let width = startWidth;
		const move = (moveEvent: PointerEvent) => { width = Math.max(80, Math.min(800, startWidth + moveEvent.clientX - startX)); };
		const finish = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', finish); props.onResize?.(width); };
		document.addEventListener('pointermove', move); document.addEventListener('pointerup', finish);
	};
	return <div classList={{ 'header-cell': true, selected: props.selected, frozen: props.frozenLeft !== undefined }} style={{ left: props.frozenLeft !== undefined ? `${props.frozenLeft}px` : undefined }} title={props.column} draggable={Boolean(props.onDragStart)}
		onClick={props.onSelect} onDragStart={props.onDragStart} onDragOver={(event) => { if (props.onDrop) event.preventDefault(); }} onDrop={props.onDrop}>
		<span>{props.title}</span><input aria-label={`筛选 ${props.title}`} value={props.filter} placeholder="筛选" onClick={(event) => event.stopPropagation()} onInput={(event) => props.onFilter(props.column, event.currentTarget.value)} />
		<Show when={props.onResize}><span class="column-resizer" onPointerDown={startResize} /></Show>
	</div>;
}
function Cell(props: { rowId: string; column: string; value: string; display?: string; previewUri?: string; frozenLeft?: number; selected: boolean; editing: boolean; draft: string; options?: { options: Array<{ value: string; label: string }>; multiple: boolean; separator: string }; onSelect(cell: CellAddress): void; onBeginEdit(cell: CellAddress, value: string): void; onDraft(value: string): void; onCommit(): void; onCancel(): void }) {
	const address = { rowId: props.rowId, columnKey: props.column };
	return <div classList={{ cell: true, selected: props.selected, frozen: props.frozenLeft !== undefined }} style={{ left: props.frozenLeft !== undefined ? `${props.frozenLeft}px` : undefined }} data-row-id={props.rowId} data-column={props.column} tabindex="0" onClick={() => props.onSelect(address)} onDblClick={() => props.onBeginEdit(address, props.value)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') props.onBeginEdit(address, props.value); }}>
		<Show when={props.editing} fallback={<span title={props.value}><Show when={props.previewUri}>{(uri) => <img src={uri()} width="20" height="20" alt="" />}</Show>{props.display ?? displayValue(props.value, props.options)}</span>}>
			<Show when={props.options && !props.options.multiple} fallback={<input class="cell-editor" value={props.draft} onInput={(event) => props.onDraft(event.currentTarget.value)} onBlur={props.onCommit} onKeyDown={(event) => { if (event.key === 'Enter') props.onCommit(); if (event.key === 'Escape') props.onCancel(); }} />}>
				<select class="cell-editor" value={props.draft} onChange={(event) => { props.onDraft(event.currentTarget.value); props.onCommit(); }}><option value=""></option><For each={props.options!.options}>{(option) => <option value={option.value}>{option.label}</option>}</For></select>
			</Show>
		</Show>
	</div>;
}
function TextureDialog(props: { icons: KvEditorV2TextureIcon[]; kind: 'spell' | 'item'; search: string; onKind(kind: 'spell' | 'item'): void; onSearch(value: string): void; onChoose(icon: KvEditorV2TextureIcon): void; onCancel(): void }) {
	return <div class="modal-backdrop" onKeyDown={(event) => handleDialogKey(event, props.onCancel)}><section class="modal texture-dialog" role="dialog" aria-modal="true" aria-label="纹理选择器">
		<header><strong>选择 AbilityTextureName</strong><button aria-label="关闭" onClick={props.onCancel}>×</button></header>
		<div class="texture-toolbar"><button classList={{ active: props.kind === 'spell' }} onClick={() => props.onKind('spell')}>技能</button><button classList={{ active: props.kind === 'item' }} onClick={() => props.onKind('item')}>物品</button><input autofocus value={props.search} placeholder="搜索纹理" onInput={(event) => props.onSearch(event.currentTarget.value)} /></div>
		<div class="texture-grid"><For each={props.icons}>{(icon) => <button class="texture-option" title={icon.textureName} onClick={() => props.onChoose(icon)}><img src={icon.uri} width="48" height="48" alt="" /><span>{icon.label || icon.textureName}</span><small>{icon.source}</small></button>}</For></div>
		<footer><span>{props.icons.length} 个结果</span><span></span><button onClick={props.onCancel}>取消</button></footer>
	</section></div>;
}
function AbilityDialog(props: { rowId: string; entries: KvEditorV2AbilityValue[]; descriptions: Record<string, string>; onChange(entries: KvEditorV2AbilityValue[]): void; onDescriptions(value: Record<string, string>): void; onSave(): void; onCancel(): void }) {
	const update = (index: number, patch: Partial<KvEditorV2AbilityValue>) => props.onChange(props.entries.map((entry, current) => current === index ? { ...entry, ...patch } : entry));
	const move = (index: number, offset: number) => { const target = index + offset; if (target < 0 || target >= props.entries.length) return; const entries = props.entries.slice(); [entries[index], entries[target]] = [entries[target], entries[index]]; props.onChange(entries); };
	const updateModifier = (entryIndex: number, modifierIndex: number, patch: { key?: string; value?: string }) => update(entryIndex, { modifiers: props.entries[entryIndex].modifiers.map((modifier, current) => current === modifierIndex ? { ...modifier, ...patch } : modifier) });
	return <div class="modal-backdrop" onKeyDown={(event) => handleDialogKey(event, props.onCancel)}><section class="modal ability-dialog" role="dialog" aria-modal="true" aria-label="AbilityValues 编辑器">
		<header><strong>AbilityValues · {props.rowId}</strong><button aria-label="关闭" onClick={props.onCancel}>×</button></header>
		<div class="ability-list"><For each={props.entries}>{(entry, index) => <section class="ability-entry">
			<div class="ability-main"><input value={entry.key} placeholder="Key" onInput={(event) => update(index(), { key: event.currentTarget.value })} /><select value={entry.type} onChange={(event) => update(index(), { type: event.currentTarget.value as 'object' | 'scalar' })}><option value="object">object</option><option value="scalar">scalar</option></select><input value={entry.value} placeholder="Value" onInput={(event) => update(index(), { value: event.currentTarget.value })} /><button onClick={() => move(index(), -1)}>↑</button><button onClick={() => move(index(), 1)}>↓</button><button onClick={() => props.onChange(props.entries.filter((_, current) => current !== index()))}>删除</button></div>
			<input class="ability-description" value={props.descriptions[entry.key] ?? ''} placeholder="本地化描述" onInput={(event) => props.onDescriptions({ ...props.descriptions, [entry.key]: event.currentTarget.value })} />
			<div class="modifier-list"><For each={entry.modifiers}>{(modifier, modifierIndex) => <div class="modifier-row"><input value={modifier.key} placeholder="Modifier key" onInput={(event) => updateModifier(index(), modifierIndex(), { key: event.currentTarget.value })} /><input value={modifier.value} placeholder="Modifier value" onInput={(event) => updateModifier(index(), modifierIndex(), { value: event.currentTarget.value })} /><button onClick={() => update(index(), { modifiers: entry.modifiers.filter((_, current) => current !== modifierIndex()) })}>删除</button></div>}</For><button onClick={() => update(index(), { modifiers: [...entry.modifiers, { key: '', value: '' }] })}>添加 Modifier</button></div>
		</section>}</For></div>
		<footer><button onClick={() => props.onChange([...props.entries, { key: '', value: '', type: 'object', modifiers: [] }])}>添加 AbilityValue</button><span></span><button onClick={props.onCancel}>取消</button><button class="primary" onClick={props.onSave}>保存</button></footer>
	</section></div>;
}
function displayValue(value: string, options?: { options: Array<{ value: string; label: string }>; multiple: boolean; separator: string }): string {
	if (!options) return value;
	const labels = new Map(options.options.map((option) => [option.value, option.label]));
	return (options.multiple ? value.split(options.separator) : [value]).map((part) => labels.get(part.trim()) ?? part.trim()).join(options.multiple ? ', ' : '');
}
function localizedValue(snapshot: KvEditorV2Snapshot, row: KvEditorV2Snapshot['rows'][number], column: string): string {
	if (snapshot.localizedMode && (column === 'Name' || /name/i.test(column)) && row.localization?.name) return row.localization.name;
	if (snapshot.localizedMode && /description/i.test(column) && row.localization?.description) return row.localization.description;
	return row.values[column] ?? '';
}
function sameCell(cell: CellAddress | undefined, rowId: string, columnKey: string): boolean { return cell?.rowId === rowId && cell.columnKey === columnKey; }
function without(values: Set<string>, value: string): Set<string> { const next = new Set(values); next.delete(value); return next; }
function handleDialogKey(event: KeyboardEvent, onCancel: () => void): void {
	if (event.key === 'Escape') { event.preventDefault(); onCancel(); return; }
	if (event.key !== 'Tab') return;
	const dialog = (event.currentTarget as HTMLElement).querySelector<HTMLElement>('[role="dialog"]');
	const focusable = [...(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
	if (!focusable.length) return;
	const first = focusable[0]; const last = focusable[focusable.length - 1];
	if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
	else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
function shiftFormulaRows(formula: string, delta: number): string {
	return formula.replace(/(\$?)([A-Z]{1,3})(\$?)([1-9][0-9]*)/gu, (_match, columnAbsolute: string, column: string, rowAbsolute: string, row: string) => {
		if (rowAbsolute === '$') return columnAbsolute + column + rowAbsolute + row;
		return columnAbsolute + column + String(Math.max(1, Number(row) + delta));
	});
}
function createRequestId(): string { return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
