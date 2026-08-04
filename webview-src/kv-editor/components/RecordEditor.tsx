/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS class keys use framework-native names. */
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';
import type { KvEditorV2Command, KvEditorV2Snapshot } from '../../../src/types/kvEditorV2Shared';
import { kvEditorColumnDisplayName } from '../../../src/kv-editor-v2/displayNames';
import { Icon } from './Icon';
import { InlineAbilityValues } from './InlineAbilityValues';
import { RecordOptionControl } from './RecordOptionControl';

interface RecordEditorProps {
	snapshot: KvEditorV2Snapshot;
	rowId: string;
	pending: boolean;
	onSelectRow(rowId: string): void;
	onDirtyChange(dirty: boolean): void;
	onSave(command: Extract<KvEditorV2Command, { type: 'editRecord' }>): void;
	onTexture(rowId: string, value: string): void;
	onScript(path: string): void;
}

export function RecordEditor(props: RecordEditorProps) {
	const [query, setQuery] = createSignal('');
	const [idDraft, setIdDraft] = createSignal('');
	const [values, setValues] = createSignal<Record<string, string>>({});
	const [abilityValues, setAbilityValues] = createSignal<KvEditorV2Snapshot['rows'][number]['abilityValues']>([]);
	const [abilityDescriptions, setAbilityDescriptions] = createSignal<Record<string, string>>({});
	const [switchWarning, setSwitchWarning] = createSignal(false);
	const row = createMemo(() => props.snapshot.rows.find((entry) => entry.rowId === props.rowId) ?? props.snapshot.rows[0]);
	const columns = createMemo(() => props.snapshot.columns.filter((column) => column !== 'id'));
	const baselineSignature = createMemo(() => {
		const current = row();
		return current ? `${current.rowId}\u0000${columns().map((column) => current.values[column] ?? '').join('\u0000')}\u0000${JSON.stringify(current.abilityValues ?? [])}\u0000${JSON.stringify(props.snapshot.abilityValuesDescriptions[current.rowId] ?? {})}` : '';
	});
	const dirtyColumns = createMemo(() => {
		const current = row();
		if (!current) {return [] as string[];}
		const changed = columns().filter((column) => column !== 'AbilityValues' && (values()[column] ?? '') !== (current.values[column] ?? ''));
		if (JSON.stringify(abilityValues() ?? []) !== JSON.stringify(current.abilityValues ?? []) || JSON.stringify(abilityDescriptions()) !== JSON.stringify(props.snapshot.abilityValuesDescriptions[current.rowId] ?? {})) {changed.push('AbilityValues');}
		if (idDraft().trim() !== current.rowId) {changed.unshift('id');}
		return changed;
	});
	const dirty = createMemo(() => dirtyColumns().length > 0);
	const visibleRows = createMemo(() => {
		const term = query().trim().toLocaleLowerCase();
		return term ? props.snapshot.rows.filter((entry) => entry.rowId.toLocaleLowerCase().includes(term)) : props.snapshot.rows;
	});

	createEffect(() => {
		baselineSignature();
		const current = row();
		if (!current) {return;}
		setIdDraft(current.rowId);
		setValues(Object.fromEntries(columns().map((column) => [column, current.values[column] ?? ''])));
		setAbilityValues(structuredClone(current.abilityValues ?? []));
		setAbilityDescriptions({ ...(props.snapshot.abilityValuesDescriptions[current.rowId] ?? {}) });
		setSwitchWarning(false);
	});
	createEffect(() => props.onDirtyChange(dirty()));

	const discard = () => {
		const current = row();
		if (!current) {return;}
		setIdDraft(current.rowId);
		setValues(Object.fromEntries(columns().map((column) => [column, current.values[column] ?? ''])));
		setAbilityValues(structuredClone(current.abilityValues ?? []));
		setAbilityDescriptions({ ...(props.snapshot.abilityValuesDescriptions[current.rowId] ?? {}) });
		setSwitchWarning(false);
	};
	const save = () => {
		const current = row();
		const newRowId = idDraft().trim();
		if (!current || !dirty() || !newRowId || props.pending) {return;}
		props.onSave({
			type: 'editRecord', rowId: current.rowId, newRowId,
			edits: dirtyColumns().filter((column) => column !== 'id' && column !== 'AbilityValues').map((columnKey) => ({ columnKey, value: values()[columnKey] ?? '' })),
			abilityValues: dirtyColumns().includes('AbilityValues') ? abilityValues() : undefined,
			abilityValueDescriptions: dirtyColumns().includes('AbilityValues') ? abilityDescriptions() : undefined,
		});
	};
	const selectRow = (nextRowId: string) => {
		if (nextRowId === row()?.rowId) {return;}
		if (dirty()) {setSwitchWarning(true); return;}
		props.onSelectRow(nextRowId);
	};
	const updateValue = (column: string, value: string) => setValues((current) => ({ ...current, [column]: value }));

	return <section class="record-workspace" onKeyDown={(event) => {
		if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 's') {event.preventDefault(); save();}
	}}>
		<aside class="record-index" aria-label="数据 ID 列表">
			<div class="record-index-head"><strong>数据 ID</strong><span>{visibleRows().length}/{props.snapshot.rows.length}</span></div>
			<label class="record-search"><Icon name="search" /><input aria-label="搜索数据 ID" value={query()} placeholder="搜索 ID" onInput={(event) => setQuery(event.currentTarget.value)} /></label>
			<div class="record-id-list" role="listbox" aria-label="选择数据记录">
				<For each={visibleRows()}>{(entry, index) => <button role="option" aria-selected={entry.rowId === row()?.rowId} classList={{ 'record-id': true, active: entry.rowId === row()?.rowId }} onClick={() => selectRow(entry.rowId)} title={entry.rowId}>
					<span class="record-id-order">{String(index() + 1).padStart(2, '0')}</span><span>{entry.rowId}</span><Show when={entry.rowId === row()?.rowId && dirty()}><i aria-label="有未保存修改" /></Show>
				</button>}</For>
				<Show when={!visibleRows().length}><div class="record-index-empty">没有匹配的 ID</div></Show>
			</div>
		</aside>
		<div class="record-detail">
			<Show when={row()}>{(current) => <>
				<header class="record-detail-head">
					<div><span class="title-eyebrow">记录编辑</span><h2 title={current().rowId}>{current().rowId}</h2><p>{columns().length} 个字段 · 按当前表格列顺序显示</p></div>
					<div class="record-save-state" classList={{ dirty: dirty() }}><span>{dirty() ? `${dirtyColumns().length} 处修改` : '已同步'}</span></div>
				</header>
				<Show when={switchWarning()}><div class="record-draft-warning"><Icon name="warning" /><span>当前记录有未保存修改，请先保存或放弃，再切换 ID。</span><button onClick={() => setSwitchWarning(false)} aria-label="关闭"><Icon name="close" /></button></div></Show>
				<div class="record-fields">
					<label classList={{ 'record-field': true, changed: dirtyColumns().includes('id') }}>
						<span class="record-field-label" title="数据块的稳定标识"><strong>ID</strong></span>
						<input class="record-field-control code" value={idDraft()} onInput={(event) => setIdDraft(event.currentTarget.value)} />
					</label>
					<For each={columns()}>{(column) => {
						const description = () => props.snapshot.columnDescriptions[column];
						const options = () => props.snapshot.columnOptions[column];
						return <div classList={{ 'record-field': true, changed: dirtyColumns().includes(column), complex: column === 'AbilityValues' }}>
							<label class="record-field-label" for={`record-${column}`} title={description()?.description ?? column}><strong>{kvEditorColumnDisplayName(props.snapshot, column)}</strong></label>
							<div class="record-control-wrap">
								<Show when={column === 'AbilityValues'} fallback={<Show when={options()} fallback={<><Show when={column === 'AbilityTextureName' && props.snapshot.texturePreviews[values()[column] ?? '']}>{(preview) => <button type="button" class="record-texture-preview-button" disabled={dirty()} aria-label="打开纹理资源库" title="打开纹理资源库" onClick={() => props.onTexture(current().rowId, values()[column] ?? '')}><img class="record-texture-preview" src={preview().uri} alt="" /></button>}</Show><input id={`record-${column}`} class="record-field-control" value={values()[column] ?? ''} title={description()?.description} onInput={(event) => updateValue(column, event.currentTarget.value)} /></>}>
									{(configured) => <RecordOptionControl column={column} value={values()[column] ?? ''} options={configured()} localized={props.snapshot.localizedMode} onChange={(value) => updateValue(column, value)} />}
								</Show>}>
									<InlineAbilityValues entries={abilityValues() ?? []} descriptions={abilityDescriptions()} onChange={setAbilityValues} onDescriptions={setAbilityDescriptions} />
								</Show>
								<Show when={column === 'AbilityTextureName'}><button class="record-inline-action" disabled={dirty()} title="打开纹理资源库" onClick={() => props.onTexture(current().rowId, values()[column] ?? '')}><Icon name="symbol-color" /></button></Show>
								<Show when={column === 'ScriptFile'}><button class="record-inline-action" title="打开脚本" onClick={() => props.onScript(values()[column] ?? '')}><Icon name="go-to-file" /></button></Show>

							</div>
						</div>;
					}}</For>
				</div>
				<footer class="record-actions"><span><Show when={dirty()} fallback="修改会先保留为草稿">未保存字段：{dirtyColumns().join('、')}</Show></span><div><button disabled={!dirty() || props.pending} onClick={discard}><Icon name="discard" />放弃</button><button class="primary" disabled={!dirty() || !idDraft().trim() || props.pending} onClick={save}><Icon name={props.pending ? 'loading' : 'save'} spin={props.pending} />保存记录</button></div></footer>
			</>}</Show>
		</div>
	</section>;
}
