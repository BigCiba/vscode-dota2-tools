/* eslint-disable @typescript-eslint/naming-convention -- Solid component and CSS names use framework-native casing. */
import { For, Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import type { KvEditorV2ColumnOptions } from '../../../src/types/kvEditorV2Shared';
import { resolveOptionColor, searchTerms, splitOptionValues } from '../uiUtils';
import { Icon } from './Icon';

export function RecordOptionControl(props: { column: string; value: string; options: KvEditorV2ColumnOptions; localized?: boolean; onChange(value: string): void }) {
	let root!: HTMLDivElement;
	let popover!: HTMLDivElement;
	let trigger!: HTMLButtonElement;
	let searchInput!: HTMLInputElement;
	const [open, setOpen] = createSignal(false);
	const [search, setSearch] = createSignal('');
	const [placement, setPlacement] = createSignal({ left: 8, top: undefined as number | undefined, bottom: undefined as number | undefined, width: 300, listHeight: 180 });
	const selected = createMemo(() => new Set(splitOptionValues(props.value, props.options.separator)));
	const filtered = createMemo(() => {
		const terms = searchTerms(search());
		return props.options.options.filter((option) => terms.every((term) => `${option.label} ${option.value} ${option.description ?? ''}`.toLocaleLowerCase().includes(term)));
	});
	const selectedOptions = createMemo(() => props.options.options.filter((option) => selected().has(option.value)));
	const choose = (value: string) => {
		if (!props.options.multiple) {props.onChange(value); setOpen(false); return;}
		const next = new Set(selected());
		if (next.has(value)) {next.delete(value);} else {next.add(value);}
		props.onChange(props.options.options.filter((option) => next.has(option.value)).map((option) => option.value).join(props.options.separator));
	};
	onMount(() => {
		const close = (event: PointerEvent) => { if (!root.contains(event.target as Node) && !popover?.contains(event.target as Node)) {setOpen(false);} };
		const closeOnViewportChange = (event: Event) => {
			if (event.type === 'scroll' && popover?.contains(event.target as Node)) {return;}
			setOpen(false);
		};
		document.addEventListener('pointerdown', close, true);
		window.addEventListener('resize', closeOnViewportChange);
		window.addEventListener('scroll', closeOnViewportChange, true);
		onCleanup(() => { document.removeEventListener('pointerdown', close, true); window.removeEventListener('resize', closeOnViewportChange); window.removeEventListener('scroll', closeOnViewportChange, true); });
	});
	const toggle = () => {
		if (open()) {setOpen(false); return;}
		const rect = root.getBoundingClientRect();
		const margin = 8;
		const width = Math.min(620, Math.max(300, rect.width), window.innerWidth - margin * 2);
		const left = Math.min(Math.max(margin, rect.right - width), window.innerWidth - width - margin);
		const below = window.innerHeight - rect.bottom - margin;
		const above = rect.top - margin;
		const desiredHeight = Math.min(362, 42 + (props.options.options.length + 1) * 36);
		const openUpward = above >= 180 && (rect.top > window.innerHeight * 0.55 || below < desiredHeight);
		const available = Math.max(110, Math.min(320, (openUpward ? above : below) - 42));
		setPlacement({ left, top: openUpward ? undefined : rect.bottom + 3, bottom: openUpward ? window.innerHeight - rect.top + 3 : undefined, width, listHeight: available });
		setOpen(true);
		queueMicrotask(() => searchInput?.focus());
	};
	const closeFromKeyboard = (event: KeyboardEvent) => {
		if (event.key !== 'Escape') {return;}
		event.preventDefault();
		event.stopPropagation();
		setOpen(false);
		queueMicrotask(() => trigger?.focus());
	};
	return <div class="record-option" ref={root}>
		<button ref={trigger} type="button" class="record-option-trigger" aria-expanded={open()} aria-haspopup="listbox" onClick={toggle}>
			<span class="record-option-values" classList={{ placeholder: !selectedOptions().length }}>
				<Show when={selectedOptions().length} fallback="空值"><For each={selectedOptions()}>{(option) => <span class="record-option-chip"><span class="record-option-dot" style={{ background: resolveOptionColor(option.value, option.color) }} aria-hidden="true" /><span>{props.localized ? option.label || option.value : option.value}</span></span>}</For></Show>
			</span><Icon name="chevron-down" />
		</button>
		<Show when={open()}><Portal><div class="record-option-popover" ref={popover} style={{ left: `${placement().left}px`, top: placement().top === undefined ? undefined : `${placement().top}px`, bottom: placement().bottom === undefined ? undefined : `${placement().bottom}px`, width: `${placement().width}px`, '--record-option-list-height': `${placement().listHeight}px` }} onKeyDown={closeFromKeyboard}>
			<label><Icon name="search" /><input ref={searchInput} aria-label="搜索选项" value={search()} placeholder="搜索选项" onInput={(event) => setSearch(event.currentTarget.value)} /></label>
			<div role="listbox" aria-multiselectable={props.options.multiple}>
				<button type="button" role="option" aria-selected={selected().size === 0} classList={{ selected: selected().size === 0 }} onClick={() => {props.onChange(''); if (!props.options.multiple) {setOpen(false);}}}><span class="empty-option-mark"><Icon name="clear-all" /></span><span><strong>空值</strong><small>清空字段</small></span><span class="record-option-check"><Show when={selected().size === 0}><Icon name="check" /></Show></span></button>
				<For each={filtered()} fallback={<div class="record-option-empty">没有匹配选项</div>}>{(option) => <button type="button" role="option" aria-selected={selected().has(option.value)} classList={{ selected: selected().has(option.value) }} onClick={() => choose(option.value)} title={option.description}>
					<span class="option-swatch" style={{ background: resolveOptionColor(option.value, option.color) }} /><span><strong>{option.label || option.value}</strong><small>{option.value}</small></span><span class="record-option-check"><Show when={selected().has(option.value)}><Icon name="check" /></Show></span>
				</button>}</For>
			</div>
		</div></Portal></Show>
	</div>;
}
