/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import { For, Show, createMemo, createSignal } from 'solid-js';
import type { KvEditorV2AbilityValue } from '../../../src/types/kvEditorV2Shared';
import { searchTerms } from '../uiUtils';
import { Icon } from './Icon';
import { ModalShell } from './ModalShell';

export interface AbilityDialogProps {
	rowId: string;
	entries: KvEditorV2AbilityValue[];
	descriptions: Record<string, string>;
	error?: string;
	onChange(entries: KvEditorV2AbilityValue[]): void;
	onDescriptions(value: Record<string, string>): void;
	onSave(): void;
	onCancel(): void;
}

export function AbilityDialog(props: AbilityDialogProps) {
	let dialogElement!: HTMLElement;
	const [search, setSearch] = createSignal('');
	const [expanded, setExpanded] = createSignal(new Set<number>(props.entries.map((entry, index) => entry.modifiers.length ? index : -1).filter((index) => index >= 0)));
	const [draggedEntry, setDraggedEntry] = createSignal<number>();
	const [draggedModifier, setDraggedModifier] = createSignal<{ entryIndex: number; modifierIndex: number }>();
	const visibleEntries = createMemo(() => {
		const terms = searchTerms(search());
		return props.entries
			.map((entry, index) => ({ entry, index }))
			.filter(({ entry }) => terms.every((term) => `${entry.key} ${entry.value} ${props.descriptions[entry.key] ?? ''} ${entry.modifiers.map((modifier) => `${modifier.key} ${modifier.value}`).join(' ')}`.toLocaleLowerCase().includes(term)));
	});
	const objectCount = createMemo(() => props.entries.filter((entry) => entry.modifiers.length > 0).length);
	const update = (index: number, patch: Partial<KvEditorV2AbilityValue>) => props.onChange(props.entries.map((entry, current) => current === index ? { ...entry, ...patch } : entry));
	const updateKey = (index: number, key: string) => {
		const previousKey = props.entries[index]?.key ?? '';
		update(index, { key });
		if (previousKey === key || !Object.prototype.hasOwnProperty.call(props.descriptions, previousKey)) {return;}
		const descriptions = { ...props.descriptions };
		const description = descriptions[previousKey];
		delete descriptions[previousKey];
		descriptions[key] = description;
		props.onDescriptions(descriptions);
	};
	const remove = (index: number) => {
		const key = props.entries[index]?.key;
		props.onChange(props.entries.filter((_, current) => current !== index));
		if (key !== undefined && Object.prototype.hasOwnProperty.call(props.descriptions, key)) {
			const descriptions = { ...props.descriptions };
			delete descriptions[key];
			props.onDescriptions(descriptions);
		}
	};
	const move = (index: number, offset: number) => {
		const target = index + offset;
		if (target < 0 || target >= props.entries.length) {return;}
		const entries = props.entries.slice();
		[entries[index], entries[target]] = [entries[target], entries[index]];
		props.onChange(entries);
	};
	const reorderEntries = (source: number, target: number) => {
		if (source === target) {return;}
		const entries = props.entries.slice();
		const [entry] = entries.splice(source, 1);
		entries.splice(target, 0, entry);
		props.onChange(entries);
	};
	const updateModifiers = (entryIndex: number, modifiers: KvEditorV2AbilityValue['modifiers']) => update(entryIndex, { modifiers, type: modifiers.length ? 'object' : 'scalar' });
	const updateModifier = (entryIndex: number, modifierIndex: number, patch: { key?: string; value?: string }) => updateModifiers(entryIndex, props.entries[entryIndex].modifiers.map((modifier, current) => current === modifierIndex ? { ...modifier, ...patch } : modifier));
	const insertModifier = (entryIndex: number, afterIndex: number) => {
		const modifiers = props.entries[entryIndex].modifiers.slice();
		const nextIndex = afterIndex + 1;
		modifiers.splice(nextIndex, 0, { key: '', value: '' });
		updateModifiers(entryIndex, modifiers);
		setExpanded((current) => new Set([...current, entryIndex]));
		queueMicrotask(() => dialogElement.querySelector<HTMLInputElement>(`.ability-entry[data-entry-index="${entryIndex}"] .modifier-row[data-modifier-index="${nextIndex}"] input`)?.focus());
	};
	const moveModifier = (entryIndex: number, modifierIndex: number, offset: number) => {
		const target = modifierIndex + offset;
		const modifiers = props.entries[entryIndex].modifiers.slice();
		if (target < 0 || target >= modifiers.length) {return;}
		[modifiers[modifierIndex], modifiers[target]] = [modifiers[target], modifiers[modifierIndex]];
		updateModifiers(entryIndex, modifiers);
	};
	const reorderModifiers = (entryIndex: number, source: number, target: number) => {
		if (source === target) {return;}
		const modifiers = props.entries[entryIndex].modifiers.slice();
		const [modifier] = modifiers.splice(source, 1);
		modifiers.splice(target, 0, modifier);
		updateModifiers(entryIndex, modifiers);
	};
	const toggleExpanded = (index: number) => setExpanded((current) => {
		const next = new Set(current);
		if (next.has(index)) {next.delete(index);} else {next.add(index);}
		return next;
	});
	const addEntry = () => {
		const index = props.entries.length;
		props.onChange([...props.entries, { key: '', value: '', type: 'scalar', modifiers: [] }]);
		queueMicrotask(() => dialogElement.querySelector<HTMLInputElement>(`.ability-entry[data-entry-index="${index}"] .ability-key`)?.focus());
	};
	return <ModalShell
		ariaLabel="AbilityValues 编辑器"
		title={<><Icon name="symbol-array" />AbilityValues</>}
		eyebrow="结构化数值"
		subtitle={`${props.rowId} · ${props.entries.length} 项 · ${objectCount()} 个含 Modifier`}
		class="ability-dialog"
		dialogRef={(element) => {dialogElement = element;}}
		initialFocus=".ability-search input"
		onCancel={props.onCancel}
		footer={<><button onClick={addEntry}><Icon name="add" />添加 AbilityValue</button><span></span><button onClick={props.onCancel}>取消</button><button class="primary" onClick={props.onSave}><Icon name="save" />保存全部更改</button></>}
	>
		<div class="ability-toolbar">
			<label class="ability-search"><Icon name="search" /><input aria-label="搜索 Key、Value、描述或 Modifier" value={search()} placeholder="搜索 Key、Value、描述或 Modifier" onInput={(event) => setSearch(event.currentTarget.value)} /></label>
			<div class="toolbar-quiet-actions">
				<button onClick={() => setExpanded(new Set(props.entries.map((_, index) => index)))}><Icon name="expand-all" />全部展开</button>
				<button onClick={() => setExpanded(new Set())}><Icon name="collapse-all" />全部收起</button>
			</div>
		</div>
		<div class="ability-column-guide" aria-hidden="true"><span></span><span>#</span><span>Key</span><span>Value / 等级值</span><span>本地化描述</span><span>结构</span><span></span></div>
		<div class="ability-list">
			<Show when={props.error}>{(error) => <div class="dialog-error" role="alert">{error()}</div>}</Show>
			<Show when={props.entries.length} fallback={<div class="ability-empty"><Icon name="symbol-array" /><strong>还没有 AbilityValue</strong><span>添加后直接填写 Key 和 Value；需要嵌套字段时，使用右侧的“添加 Modifier”。</span></div>}>
				<For each={visibleEntries()} fallback={<div class="ability-empty compact">没有匹配的 AbilityValue</div>}>{({ entry, index }) => <section class="ability-entry" classList={{ expanded: expanded().has(index), dragging: draggedEntry() === index }} data-entry-index={index}
					onDragOver={(event) => {if (draggedEntry() !== undefined) {event.preventDefault(); if (event.dataTransfer) {event.dataTransfer.dropEffect = 'move';}}}}
					onDrop={(event) => {event.preventDefault(); const source = draggedEntry(); if (source !== undefined) {reorderEntries(source, index);} setDraggedEntry(undefined);}}>
					<div class="ability-entry-row">
						<span class="drag-handle" draggable="true" role="button" tabindex="0" aria-label={`拖动第 ${index + 1} 项以排序`} title="拖动排序" onDragStart={(event) => {if (event.dataTransfer) {event.dataTransfer.effectAllowed = 'move';} setDraggedEntry(index);}} onDragEnd={() => setDraggedEntry(undefined)}><Icon name="gripper" /></span>
						<span class="ability-index">{index + 1}</span>
						<input class="ability-key" value={entry.key} placeholder="Key" aria-label={`第 ${index + 1} 项 Key`} onInput={(event) => updateKey(index, event.currentTarget.value)} />
						<input class="ability-value" value={entry.value} placeholder="Value / 等级值" aria-label={`第 ${index + 1} 项 Value`} onInput={(event) => update(index, { value: event.currentTarget.value })} />
						<input class="ability-description" value={props.descriptions[entry.key] ?? ''} placeholder="本地化描述（可选）" aria-label={`第 ${index + 1} 项本地化描述`} onInput={(event) => props.onDescriptions({ ...props.descriptions, [entry.key]: event.currentTarget.value })} />
						<button type="button" classList={{ 'ability-kind': true, object: entry.modifiers.length > 0 }} disabled={!entry.modifiers.length} aria-expanded={entry.modifiers.length ? expanded().has(index) : undefined} title={entry.modifiers.length ? `${expanded().has(index) ? '收起' : '展开'} ${entry.modifiers.length} 个 Modifier` : '数值'} onClick={() => toggleExpanded(index)}><Icon name={entry.modifiers.length ? 'symbol-object' : 'symbol-value'} />{entry.modifiers.length ? `对象 ${entry.modifiers.length}` : '数值'}</button>
						<span class="ability-entry-actions">
							<button class="icon-button" aria-label="添加 Modifier" title="添加 Modifier" onClick={() => insertModifier(index, entry.modifiers.length - 1)}><Icon name="add" /></button>
							<button class="icon-button" aria-label="上移" title="上移" disabled={index === 0 || !!search()} onClick={() => move(index, -1)}><Icon name="arrow-up" /></button>
							<button class="icon-button" aria-label="下移" title="下移" disabled={index === props.entries.length - 1 || !!search()} onClick={() => move(index, 1)}><Icon name="arrow-down" /></button>
							<button class="icon-button danger" aria-label="删除 AbilityValue" title="删除" onClick={() => remove(index)}><Icon name="trash" /></button>
						</span>
					</div>
					<Show when={expanded().has(index) && entry.modifiers.length}>
						<div class="ability-entry-details"><div class="modifier-list"><For each={entry.modifiers}>{(modifier, modifierIndex) => <div class="modifier-row" classList={{ dragging: draggedModifier()?.entryIndex === index && draggedModifier()?.modifierIndex === modifierIndex() }} data-modifier-index={modifierIndex()}
							onDragOver={(event) => {const source = draggedModifier(); if (source?.entryIndex === index) {event.preventDefault(); if (event.dataTransfer) {event.dataTransfer.dropEffect = 'move';}}}}
							onDrop={(event) => {event.preventDefault(); const source = draggedModifier(); if (source?.entryIndex === index) {reorderModifiers(index, source.modifierIndex, modifierIndex());} setDraggedModifier(undefined);}}>
							<span class="drag-handle modifier-drag-handle" draggable="true" role="button" tabindex="0" aria-label={`拖动 Modifier ${modifierIndex() + 1} 以排序`} title="拖动排序" onDragStart={(event) => {if (event.dataTransfer) {event.dataTransfer.effectAllowed = 'move';} setDraggedModifier({ entryIndex: index, modifierIndex: modifierIndex() });}} onDragEnd={() => setDraggedModifier(undefined)}><Icon name="gripper" /></span>
							<span class="modifier-index">{modifierIndex() + 1}</span>
							<input value={modifier.key} placeholder="Modifier Key" aria-label="Modifier Key" onInput={(event) => updateModifier(index, modifierIndex(), { key: event.currentTarget.value })} />
							<input value={modifier.value} placeholder="Modifier Value" aria-label="Modifier Value" onInput={(event) => updateModifier(index, modifierIndex(), { value: event.currentTarget.value })} />
							<span class="modifier-actions"><button class="icon-button" title="上移" aria-label="上移 Modifier" disabled={modifierIndex() === 0} onClick={() => moveModifier(index, modifierIndex(), -1)}><Icon name="arrow-up" /></button><button class="icon-button" title="下移" aria-label="下移 Modifier" disabled={modifierIndex() === entry.modifiers.length - 1} onClick={() => moveModifier(index, modifierIndex(), 1)}><Icon name="arrow-down" /></button><button class="icon-button danger" title="删除" aria-label="删除 Modifier" onClick={() => updateModifiers(index, entry.modifiers.filter((_, current) => current !== modifierIndex()))}><Icon name="trash" /></button></span>
						</div>}</For></div></div>
					</Show>
				</section>}</For>
			</Show>
		</div>
	</ModalShell>;
}
