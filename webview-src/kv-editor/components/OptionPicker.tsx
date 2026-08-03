/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import { For, Show, createMemo, createSignal, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import type { KvEditorV2ColumnOptions } from '../../../src/types/kvEditorV2Shared';
import { resolveOptionColor, searchTerms, splitOptionValues } from '../uiUtils';
import { Icon } from './Icon';

export function OptionValue(props: { value: string; options?: KvEditorV2ColumnOptions; localized?: boolean }) {
	if (!props.options) {
		return <>{props.value}</>;
	}
	const optionByValue = createMemo(() => new Map(props.options!.options.map((option) => [option.value, option])));
	const values = createMemo(() => props.options!.multiple ? splitOptionValues(props.value, props.options!.separator) : [props.value]);
	return <span class="option-value"><For each={values()}>{(value) => {
		const option = optionByValue().get(value);
		return <span class="option-chip" style={{ '--option-color': option ? resolveOptionColor(option.value, option.color) : 'transparent' }} title={option?.description || value}>{props.localized ? option?.label || value : value}</span>;
	}}</For></span>;
}

export function OptionPicker(props: { column: string; value: string; options: KvEditorV2ColumnOptions; onDraft(value: string): void; onCommit(value: string): void; onCancel(): void }) {
	let searchInput!: HTMLInputElement;
	const [search, setSearch] = createSignal('');
	const [selected, setSelected] = createSignal(new Set(splitOptionValues(props.value, props.options.separator)));
	const filtered = createMemo(() => {
		const terms = searchTerms(search());
		return props.options.options.filter((option) => terms.every((term) => `${option.value} ${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(term)));
	});
	const orderedSelection = (values: Set<string>) => props.options.options.filter((option) => values.has(option.value)).map((option) => option.value).join(props.options.separator);
	const toggle = (value: string) => setSelected((current) => {
		const next = new Set(current);
		if (next.has(value)) {
			next.delete(value);
		} else {
			next.add(value);
		}
		props.onDraft(orderedSelection(next));
		return next;
	});
	const clear = () => {
		const next = new Set<string>();
		setSelected(next);
		props.onDraft('');
	};
	const commitMulti = () => props.onCommit(orderedSelection(selected()));
	onMount(() => queueMicrotask(() => searchInput?.focus()));

	return <Portal>
		<div class="cell-option-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) {props.onCancel();} }} onKeyDown={(event) => { event.stopPropagation(); if (event.key === 'Escape') {event.preventDefault(); props.onCancel();} }}>
			<section class="cell-option-picker cell-editor" role="dialog" aria-modal="true" aria-label={`${props.column} 选项`}>
				<header class="modal-heading"><div><span class="dialog-eyebrow">单元格选项</span><strong>{props.column}</strong><small>{props.options.multiple ? `已选 ${selected().size} 项` : '选择一项'}</small></div><button class="icon-button" aria-label="关闭" onClick={props.onCancel}><Icon name="close" /></button></header>
				<div class="cell-option-search"><Icon name="search" /><input ref={searchInput} aria-label="搜索选项" value={search()} placeholder="搜索值、名称或说明" onInput={(event) => setSearch(event.currentTarget.value)} /><Show when={search()}><button aria-label="清除搜索" onClick={() => setSearch('')}><Icon name="close" /></button></Show></div>
				<div class="cell-option-list" role="listbox" aria-multiselectable={props.options.multiple}>
					<button role="option" aria-selected={selected().size === 0} classList={{ 'cell-option-item': true, 'empty-option': true, selected: selected().size === 0 }} onClick={() => props.options.multiple ? clear() : props.onCommit('')}><span class="empty-option-mark"><Icon name="clear-all" /></span><span><strong>空值</strong><small>清空当前单元格</small></span><span class="option-check"><Show when={selected().size === 0}><Icon name="check" /></Show></span></button>
					<For each={filtered()} fallback={<div class="cell-option-empty">没有匹配选项</div>}>{(option) => <button role="option" aria-selected={selected().has(option.value)} classList={{ 'cell-option-item': true, selected: selected().has(option.value) }} title={option.description} onClick={() => props.options.multiple ? toggle(option.value) : props.onCommit(option.value)}><span class="option-swatch" style={{ background: resolveOptionColor(option.value, option.color) }} /><span><strong>{option.label || option.value}</strong><small>{option.value}{option.description ? ` · ${option.description}` : ''}</small></span><span class="option-check"><Show when={selected().has(option.value)}><Icon name="check" /></Show></span></button>}</For>
				</div>
				<footer><span>{filtered().length}/{props.options.options.length} 项</span><button onClick={props.onCancel}>取消</button><Show when={props.options.multiple}><button class="primary" onClick={commitMulti}><Icon name="check" />应用</button></Show></footer>
			</section>
		</div>
	</Portal>;
}
