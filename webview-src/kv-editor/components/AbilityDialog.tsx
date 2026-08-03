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
		if (previousKey === key || !Object.prototype.hasOwnProperty.call(props.descriptions, previousKey)) {
			return;
		}
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
		if (target < 0 || target >= props.entries.length) {
			return;
		}
		const entries = props.entries.slice();
		[entries[index], entries[target]] = [entries[target], entries[index]];
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
		queueMicrotask(() => dialogElement.querySelector<HTMLInputElement>('.ability-entry[data-entry-index="' + entryIndex + '"] .modifier-row[data-modifier-index="' + nextIndex + '"] input')?.focus());
	};
	const moveModifier = (entryIndex: number, modifierIndex: number, offset: number) => {
		const target = modifierIndex + offset;
		const modifiers = props.entries[entryIndex].modifiers.slice();
		if (target < 0 || target >= modifiers.length) {return;}
		[modifiers[modifierIndex], modifiers[target]] = [modifiers[target], modifiers[modifierIndex]];
		updateModifiers(entryIndex, modifiers);
	};
	const toggleExpanded = (index: number) => setExpanded((current) => {
		const next = new Set(current);
		if (next.has(index)) {
			next.delete(index);
		} else {
			next.add(index);
		}
		return next;
	});
	const addEntry = () => {
		const index = props.entries.length;
		props.onChange([...props.entries, { key: '', value: '', type: 'scalar', modifiers: [] }]);
		setExpanded((current) => new Set([...current, index]));
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
	>			<div class="ability-toolbar">
				<label class="ability-search"><Icon name="search" /><input aria-label="搜索 Key、Value、描述或 Modifier" value={search()} placeholder="搜索 Key、Value、描述或 Modifier" onInput={(event) => setSearch(event.currentTarget.value)} /></label>
				<div class="toolbar-quiet-actions">
					<button onClick={() => setExpanded(new Set(props.entries.map((_, index) => index)))}><Icon name="expand-all" />全部展开</button>
					<button onClick={() => setExpanded(new Set())}><Icon name="collapse-all" />全部收起</button>
				</div>
			</div>
			<div class="ability-column-guide" aria-hidden="true"><span></span><span>#</span><span>Key</span><span>Value / 等级值</span><span>本地化描述</span><span>结构</span><span></span></div>
			<div class="ability-list">
				<Show when={props.error}>{(error) => <div class="dialog-error" role="alert">{error()}</div>}</Show>
				<Show when={props.entries.length} fallback={<div class="ability-empty"><Icon name="symbol-array" /><strong>还没有 AbilityValue</strong><span>添加后直接填写 Key 和 Value；是否为 object 会根据 Modifier 自动识别。</span></div>}>
					<For each={visibleEntries()} fallback={<div class="ability-empty compact">没有匹配的 AbilityValue</div>}>{({ entry, index }) => <section class="ability-entry" classList={{ expanded: expanded().has(index) }} data-entry-index={index}>
						<div class="ability-entry-row">
							<button class="icon-button expand-button" aria-label={expanded().has(index) ? '收起详情' : '展开详情'} onClick={() => toggleExpanded(index)}><Icon name={expanded().has(index) ? 'chevron-down' : 'chevron-right'} /></button>
							<span class="ability-index">{index + 1}</span>
							<input class="ability-key" value={entry.key} placeholder="Key" aria-label={`第 ${index + 1} 项 Key`} onInput={(event) => updateKey(index, event.currentTarget.value)} />
							<input class="ability-value" value={entry.value} placeholder="Value / 等级值" aria-label={`第 ${index + 1} 项 Value`} onInput={(event) => update(index, { value: event.currentTarget.value })} />
							<input class="ability-description" value={props.descriptions[entry.key] ?? ''} placeholder="本地化描述（可选）" aria-label={`第 ${index + 1} 项本地化描述`} onInput={(event) => props.onDescriptions({ ...props.descriptions, [entry.key]: event.currentTarget.value })} />
							<span classList={{ 'ability-kind': true, object: entry.modifiers.length > 0 }} title={entry.modifiers.length ? `对象结构，${entry.modifiers.length} 个 Modifier` : '标量值'}><Icon name={entry.modifiers.length ? 'symbol-object' : 'symbol-value'} />{entry.modifiers.length ? '对象' : '数值'}</span>
							<span class="ability-entry-actions">
								<button class="icon-button" aria-label="上移" title="上移" disabled={index === 0 || !!search()} onClick={() => move(index, -1)}><Icon name="arrow-up" /></button>
								<button class="icon-button" aria-label="下移" title="下移" disabled={index === props.entries.length - 1 || !!search()} onClick={() => move(index, 1)}><Icon name="arrow-down" /></button>
								<button class="icon-button danger" aria-label="删除 AbilityValue" title="删除" onClick={() => remove(index)}><Icon name="trash" /></button>
							</span>
						</div>
						<Show when={expanded().has(index)}>
							<div class="ability-entry-details">
								
								<div class="modifier-list">
									<div class="modifier-header"><strong>Modifiers</strong></div>
									<For each={entry.modifiers} fallback={<div class="modifier-empty-row"><span>暂无 Modifier</span><button class="icon-button" title="添加第一个 Modifier" aria-label="添加第一个 Modifier" onClick={() => insertModifier(index, -1)}><Icon name="add" /></button></div>}>{(modifier, modifierIndex) => <div class="modifier-row" data-modifier-index={modifierIndex()}>
										<span class="modifier-index">{modifierIndex() + 1}</span>
										<input value={modifier.key} placeholder="Modifier Key" aria-label="Modifier Key" onInput={(event) => updateModifier(index, modifierIndex(), { key: event.currentTarget.value })} />
										<input value={modifier.value} placeholder="Modifier Value" aria-label="Modifier Value" onInput={(event) => updateModifier(index, modifierIndex(), { value: event.currentTarget.value })} />
										<span class="modifier-actions"><button class="icon-button" title="在下方添加" aria-label="在下方添加 Modifier" onClick={() => insertModifier(index, modifierIndex())}><Icon name="add" /></button><button class="icon-button" title="上移" aria-label="上移 Modifier" disabled={modifierIndex() === 0} onClick={() => moveModifier(index, modifierIndex(), -1)}><Icon name="arrow-up" /></button><button class="icon-button" title="下移" aria-label="下移 Modifier" disabled={modifierIndex() === entry.modifiers.length - 1} onClick={() => moveModifier(index, modifierIndex(), 1)}><Icon name="arrow-down" /></button><button class="icon-button danger" title="删除" aria-label="删除 Modifier" onClick={() => updateModifiers(index, entry.modifiers.filter((_, current) => current !== modifierIndex()))}><Icon name="trash" /></button></span>
									</div>}</For>
								</div>
							</div>
						</Show>
					</section>}</For>
				</Show>
			</div>
	</ModalShell>;
}
