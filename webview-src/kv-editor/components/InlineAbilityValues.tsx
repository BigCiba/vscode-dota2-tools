/* eslint-disable @typescript-eslint/naming-convention -- Solid component and CSS names use framework-native casing. */
import { For, Show } from 'solid-js';
import type { KvEditorV2AbilityValue } from '../../../src/types/kvEditorV2Shared';
import { Icon } from './Icon';

export function InlineAbilityValues(props: { entries: KvEditorV2AbilityValue[]; descriptions: Record<string, string>; onChange(entries: KvEditorV2AbilityValue[]): void; onDescriptions(value: Record<string, string>): void }) {
	const replaceEntry = (index: number, patch: Partial<KvEditorV2AbilityValue>) => props.onChange(props.entries.map((entry, current) => current === index ? { ...entry, ...patch } : entry));
	const renameEntry = (index: number, key: string) => {
		const previousKey = props.entries[index].key;
		if (previousKey !== key && Object.prototype.hasOwnProperty.call(props.descriptions, previousKey)) {
			const descriptions = { ...props.descriptions, [key]: props.descriptions[previousKey] };
			delete descriptions[previousKey];
			props.onDescriptions(descriptions);
		}
		replaceEntry(index, { key });
	};
	const moveEntry = (index: number, direction: -1 | 1) => {
		const target = index + direction; if (target < 0 || target >= props.entries.length) {return;}
		const next = props.entries.slice(); [next[index], next[target]] = [next[target], next[index]]; props.onChange(next);
	};
	const addEntry = (index = props.entries.length - 1) => {
		const next = props.entries.slice(); next.splice(index + 1, 0, { key: '', value: '', type: 'scalar', modifiers: [] }); props.onChange(next);
	};
	const changeModifier = (entryIndex: number, modifierIndex: number, key: 'key' | 'value', value: string) => {
		const modifiers = props.entries[entryIndex].modifiers.map((modifier, current) => current === modifierIndex ? { ...modifier, [key]: value } : modifier);
		replaceEntry(entryIndex, { modifiers, type: modifiers.length ? 'object' : 'scalar' });
	};
	const moveModifier = (entryIndex: number, modifierIndex: number, direction: -1 | 1) => {
		const modifiers = props.entries[entryIndex].modifiers.slice(); const target = modifierIndex + direction;
		if (target < 0 || target >= modifiers.length) {return;} [modifiers[modifierIndex], modifiers[target]] = [modifiers[target], modifiers[modifierIndex]];
		replaceEntry(entryIndex, { modifiers });
	};
	const addModifier = (entryIndex: number, modifierIndex = props.entries[entryIndex].modifiers.length - 1) => {
		const modifiers = props.entries[entryIndex].modifiers.slice(); modifiers.splice(modifierIndex + 1, 0, { key: '', value: '' }); replaceEntry(entryIndex, { modifiers, type: 'object' });
	};
	const removeModifier = (entryIndex: number, modifierIndex: number) => {
		const modifiers = props.entries[entryIndex].modifiers.filter((_modifier, current) => current !== modifierIndex); replaceEntry(entryIndex, { modifiers, type: modifiers.length ? 'object' : 'scalar' });
	};
	return <div class="record-ability-values">
		<div class="record-ability-head"><span>{props.entries.length} 项</span><button type="button" onClick={() => addEntry()}><Icon name="add" />新增</button></div>
		<For each={props.entries} fallback={<button type="button" class="record-ability-empty" onClick={() => addEntry()}><Icon name="add" />添加第一个 AbilityValue</button>}>{(entry, entryIndex) => <div class="record-ability-entry">
			<div class="record-ability-main">
				<span class="record-ability-index">{entryIndex() + 1}</span>
				<input aria-label={`AbilityValue ${entryIndex() + 1} key`} value={entry.key} placeholder="key" onInput={(event) => renameEntry(entryIndex(), event.currentTarget.value)} />
				<input aria-label={`AbilityValue ${entryIndex() + 1} value`} value={entry.value} placeholder="value" onInput={(event) => replaceEntry(entryIndex(), { value: event.currentTarget.value })} />
				<input aria-label={`AbilityValue ${entryIndex() + 1} 本地化描述`} value={props.descriptions[entry.key] ?? ''} placeholder="本地化描述（可选）" onInput={(event) => props.onDescriptions({ ...props.descriptions, [entry.key]: event.currentTarget.value })} />
				<div class="record-ability-actions"><button type="button" title="上移" disabled={entryIndex() === 0} onClick={() => moveEntry(entryIndex(), -1)}><Icon name="arrow-up" /></button><button type="button" title="下移" disabled={entryIndex() === props.entries.length - 1} onClick={() => moveEntry(entryIndex(), 1)}><Icon name="arrow-down" /></button><button type="button" title="在下方新增" onClick={() => addEntry(entryIndex())}><Icon name="add" /></button><button type="button" title="删除" onClick={() => props.onChange(props.entries.filter((_value, current) => current !== entryIndex()))}><Icon name="trash" /></button></div>
			</div>
			<Show when={entry.modifiers.length}><div class="record-modifier-list"><For each={entry.modifiers}>{(modifier, modifierIndex) => <div class="record-modifier-row">
				<span>{modifierIndex() + 1}</span><input value={modifier.key} placeholder="modifier key" onInput={(event) => changeModifier(entryIndex(), modifierIndex(), 'key', event.currentTarget.value)} /><input value={modifier.value} placeholder="value" onInput={(event) => changeModifier(entryIndex(), modifierIndex(), 'value', event.currentTarget.value)} />
				<div><button type="button" title="上移" disabled={modifierIndex() === 0} onClick={() => moveModifier(entryIndex(), modifierIndex(), -1)}><Icon name="arrow-up" /></button><button type="button" title="下移" disabled={modifierIndex() === entry.modifiers.length - 1} onClick={() => moveModifier(entryIndex(), modifierIndex(), 1)}><Icon name="arrow-down" /></button><button type="button" title="在下方新增" onClick={() => addModifier(entryIndex(), modifierIndex())}><Icon name="add" /></button><button type="button" title="删除" onClick={() => removeModifier(entryIndex(), modifierIndex())}><Icon name="trash" /></button></div>
			</div>}</For></div></Show>
			<Show when={!entry.modifiers.length}><button type="button" class="record-add-modifier" onClick={() => addModifier(entryIndex())}><Icon name="add" />添加 modifier</button></Show>
		</div>}</For>
	</div>;
}
