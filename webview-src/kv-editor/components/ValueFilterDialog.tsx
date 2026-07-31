/* eslint-disable @typescript-eslint/naming-convention -- Solid components intentionally use PascalCase. */
import { For, createMemo, createSignal } from 'solid-js';
import { Icon } from './Icon';
import { ModalShell } from './ModalShell';

export interface ValueFilterDialogProps {
	column?: string;
	title: string;
	values: string[];
	selectedValues?: string[];
	onApply(values: string[]): void;
	onCancel(): void;
}

export function ValueFilterDialog(props: ValueFilterDialogProps) {
	const [search, setSearch] = createSignal('');
	const [selected, setSelected] = createSignal(new Set(props.selectedValues ?? props.values));
	const visibleValues = createMemo(() => {
		const query = search().trim().toLocaleLowerCase();
		return query ? props.values.filter((value) => value.toLocaleLowerCase().includes(query)) : props.values;
	});
	const toggle = (value: string) => setSelected((current) => {
		const next = new Set(current);
		if (next.has(value)) {next.delete(value);} else {next.add(value);}
		return next;
	});
	const selectVisible = () => setSelected((current) => new Set([...current, ...visibleValues()]));

	return <ModalShell
		ariaLabel={`筛选 ${props.title}`}
		title={<>筛选 · {props.title}</>}
		eyebrow="唯一值筛选"
		subtitle={`${visibleValues().length} 个当前结果`}
		class="value-filter-dialog"
		initialFocus=".value-filter-toolbar input"
		onCancel={props.onCancel}
		footer={<><span class="dialog-footnote">已选择 {selected().size}/{props.values.length}</span><span></span><button onClick={props.onCancel}>取消</button><button class="primary" onClick={() => props.onApply(props.values.filter((value) => selected().has(value)))}><Icon name="check" />应用</button></>}
	>
		<div class="value-filter-content">
			<div class="value-filter-toolbar">
				<label class="filter-search"><Icon name="search" /><input value={search()} placeholder="搜索唯一值" onInput={(event) => setSearch(event.currentTarget.value)} /></label>
				<button onClick={selectVisible}>全选结果</button>
				<button onClick={() => setSelected(new Set())}>清空</button>
			</div>
			<div class="value-filter-list" role="listbox" aria-multiselectable="true">
				<For each={visibleValues()} fallback={<div class="value-filter-empty">没有匹配的值</div>}>{(value) => <label title={value || '(空值)'}><input type="checkbox" checked={selected().has(value)} onChange={() => toggle(value)} /><span>{value || '(空值)'}</span></label>}</For>
			</div>
		</div>
	</ModalShell>;
}
