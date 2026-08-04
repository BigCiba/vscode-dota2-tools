/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import { Show } from 'solid-js';
import type { KvEditorV2ColumnOptions } from '../../../src/types/kvEditorV2Shared';
import type { CellRangeVisual } from '../cellRange';
import type { CellAddress } from '../types';
import { Icon } from './Icon';
import { OptionPicker, OptionValue } from './OptionPicker';

export interface HeaderCellProps {
	column: string;
	title: string;
	filter: string;
	showFilter: boolean;
	values: string[];
	valueFilterActive: boolean;
	selected?: boolean;
	dropTarget?: boolean;
	width?: number;
	frozenLeft?: number;
	frozenLast?: boolean;
	onFilter(column: string, value: string): void;
	onOpenValueFilter(column: string): void;
	onSelect?(): void;
	onPointerDrag?(event: PointerEvent): void;
	onMove?(direction: -1 | 1): void;
	onResizePreview?(width: number): void;
	onResizeCommit?(width: number): void;
	onResizeCancel?(): void;
}

export function HeaderCell(props: HeaderCellProps) {
	const startResize = (event: PointerEvent) => {
		if (!props.onResizeCommit) {return;}
		event.preventDefault();
		event.stopPropagation();
		const startX = event.clientX;
		const startWidth = props.width ?? 180;
		let width = startWidth;
		document.body.classList.add('resizing-column');
		const cleanup = () => {
			document.removeEventListener('pointermove', move);
			document.removeEventListener('pointerup', finish);
			document.removeEventListener('pointercancel', cancel);
			document.body.classList.remove('resizing-column');
		};
		const move = (moveEvent: PointerEvent) => {
			moveEvent.preventDefault();
			width = Math.round(Math.max(80, Math.min(800, startWidth + moveEvent.clientX - startX)));
			props.onResizePreview?.(width);
		};
		const finish = () => {cleanup(); props.onResizeCommit?.(width);};
		const cancel = () => {cleanup(); props.onResizeCancel?.();};
		document.addEventListener('pointermove', move, { passive: false });
		document.addEventListener('pointerup', finish);
		document.addEventListener('pointercancel', cancel);
	};

	return <div data-column-drop={props.column} role="columnheader" tabindex={props.selected || props.column === 'id' ? 0 : -1} classList={{ 'header-cell': true, selected: props.selected, 'drop-target': props.dropTarget, frozen: props.frozenLeft !== undefined, 'frozen-last': props.frozenLast }} style={{ left: props.frozenLeft !== undefined ? `${props.frozenLeft}px` : undefined }} title={`${props.column}；拖动排序；Alt+←/→ 移动`}
		onClick={props.onSelect} onPointerDown={(event) => {if (!(event.target as Element).closest('input, button, .column-resizer')) {props.onPointerDrag?.(event);}}} onKeyDown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); props.onSelect?.(); return;}
			if (!event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) {return;}
			event.preventDefault();
			props.onMove?.(event.key === 'ArrowLeft' ? -1 : 1);
		}}>
		<div class="header-title">
			<span>{props.title}</span>
			<Show when={props.filter.trim() || props.valueFilterActive}><span class="filter-dot" title="已应用筛选" /></Show>
			<button type="button" class="filter-menu-button" aria-label={`按唯一值筛选 ${props.title}`} aria-pressed={props.valueFilterActive} disabled={!props.values.length} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => {event.preventDefault(); event.stopPropagation(); props.onOpenValueFilter(props.column);}}><Icon name={props.valueFilterActive ? 'filter-filled' : 'filter'} /></button>
		</div>
		<Show when={props.showFilter}><input aria-label={`筛选 ${props.title}`} value={props.filter} placeholder="筛选…" onClick={(event) => event.stopPropagation()} onInput={(event) => props.onFilter(props.column, event.currentTarget.value)} /></Show>
		<Show when={props.onResizeCommit}><span class="column-resizer" onPointerDown={startResize} /></Show>
	</div>;
}

export interface CellProps {
	rowId: string;
	column: string;
	value: string;
	tabIndex: number;
	display?: string;
	previewUri?: string;
	localizedMode?: boolean;
	frozenLeft?: number;
	frozenLast?: boolean;
	selected: boolean;
	editing: boolean;
	draft: string;
	options?: KvEditorV2ColumnOptions;
	range?: CellRangeVisual;
	onSelect(cell: CellAddress): void;
	onPointerSelect?(event: PointerEvent, cell: CellAddress): boolean;
	onFillHandlePointerDown?(event: PointerEvent): void;
	onBeginEdit(cell: CellAddress, value: string, selectAll?: boolean): void;
	onDraft(value: string): void;
	onCommit(value?: string, restoreFocus?: boolean): void;
	onCancel(): void;
	onNavigate?(rowOffset: number, columnOffset: number): void;
}

export function Cell(props: CellProps) {
	const address = { rowId: props.rowId, columnKey: props.column };
	return <div role="gridcell" aria-label={`${props.column} ${props.value}`} title={`${props.value || '(空值)'} — 双击、Enter 或 F2 编辑`} classList={{ cell: true, selected: props.selected, editing: props.editing, frozen: props.frozenLeft !== undefined, 'frozen-last': props.frozenLast, 'range-selected': props.range?.selected, 'range-anchor': props.range?.anchor, 'range-top': props.range?.top, 'range-right': props.range?.right, 'range-bottom': props.range?.bottom, 'range-left': props.range?.left, 'range-handle': props.range?.handle }} style={{ left: props.frozenLeft !== undefined ? `${props.frozenLeft}px` : undefined }} data-row-id={props.rowId} data-column={props.column} tabindex={props.tabIndex} onPointerDown={(event) => {
		if (!(event.target as Element).closest('.cell-editor, .fill-handle')) {props.onPointerSelect?.(event, address);}
	}} onClick={(event) => {
		if ((event.target as Element).closest('.cell-editor')) {return;}
		if (event.detail === 0) {props.onSelect(address);}
	}} onDblClick={(event) => {
		if (!(event.target as Element).closest('.cell-editor, .fill-handle')) {props.onBeginEdit(address, props.value, false);}
	}} onKeyDown={(event) => {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'F2') {event.preventDefault(); props.onBeginEdit(address, props.value, true); return;}
		if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {event.preventDefault(); props.onBeginEdit(address, event.key, false);}
	}}>
		<Show when={props.editing} fallback={<span title={props.value}><Show when={props.previewUri}>{(uri) => <img src={uri()} width="20" height="20" alt="" />}</Show><Show when={!props.display || props.display === props.value} fallback={props.display}><OptionValue value={props.value} options={props.options} localized={props.localizedMode} /></Show></span>}>
			<Show when={props.options} fallback={<input autofocus class="cell-editor" value={props.draft} autocomplete="off" spellcheck={false} onInput={(event) => props.onDraft(event.currentTarget.value)} onBlur={(event) => props.onCommit(event.currentTarget.value, false)} onKeyDown={(event) => {
				event.stopPropagation();
				if (event.isComposing || event.keyCode === 229) {return;}
				if (event.key === 'Enter') {event.preventDefault(); props.onCommit(event.currentTarget.value);}
				if (event.key === 'Escape') {event.preventDefault(); props.onCancel();}
				if (event.key === 'Tab') {
					event.preventDefault();
					const columnOffset = event.shiftKey ? -1 : 1;
					props.onCommit(event.currentTarget.value, false);
					queueMicrotask(() => props.onNavigate?.(0, columnOffset));
				}
			}} />}>
				{(options) => <OptionPicker column={props.column} value={props.draft} options={options()} onDraft={props.onDraft} onCommit={(value) => props.onCommit(value)} onCancel={props.onCancel} />}
			</Show>
		</Show>
		<Show when={props.range?.handle && !props.editing && props.onFillHandlePointerDown}><span class="fill-handle" role="button" aria-label="拖动以填充当前选区" title="拖动以填充" onPointerDown={(event) => {event.preventDefault(); event.stopPropagation(); props.onFillHandlePointerDown?.(event);}} /></Show>
	</div>;
}
