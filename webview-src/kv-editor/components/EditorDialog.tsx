/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import { For, Match, Show, Switch } from 'solid-js';
import type { KvEditorV2ColumnOption } from '../../../src/types/kvEditorV2Shared';
import type { DialogState } from '../types';
import { resolveOptionColor } from '../uiUtils';
import { Icon } from './Icon';
import { ModalFormShell } from './ModalShell';

export function EditorDialog(props: { state: DialogState; error?: string; onChange(state: DialogState): void; onSubmit(): void; onCancel(): void }) {
	const update = (patch: Record<string, unknown>) => props.onChange({ ...props.state, ...patch } as DialogState);
	const setColumnOptions = (options: KvEditorV2ColumnOption[]) => { if (props.state.kind === 'columnOptions') {props.onChange({ ...props.state, options });} };
	const updateColumnOption = (index: number, patch: Partial<KvEditorV2ColumnOption>) => { if (props.state.kind === 'columnOptions') {setColumnOptions(props.state.options.map((option, current) => current === index ? { ...option, ...patch } : option));} };
	const moveColumnOption = (index: number, offset: number) => { if (props.state.kind !== 'columnOptions') {return;} const target = index + offset; if (target < 0 || target >= props.state.options.length) {return;} const options = props.state.options.slice(); [options[index], options[target]] = [options[target], options[index]]; setColumnOptions(options); };
	const setLocalizationMappings = (mappings: Array<{ columnName: string; rule: string }>) => { if (props.state.kind === 'localization') {props.onChange({ ...props.state, mappings });} };
	const updateLocalizationMapping = (index: number, patch: Partial<{ columnName: string; rule: string }>) => { if (props.state.kind === 'localization') {setLocalizationMappings(props.state.mappings.map((mapping, current) => current === index ? { ...mapping, ...patch } : mapping));} };
	return <ModalFormShell
		ariaLabel={dialogTitle(props.state)}
		title={dialogTitle(props.state)}
		eyebrow={dialogEyebrow(props.state)}
		class={`form-dialog ${props.state.kind === 'columnOptions' ? 'column-options-dialog' : ''}`}
		initialFocus=".dialog-content input:not([disabled]), .dialog-content select:not([disabled]), .dialog-content textarea:not([disabled]), footer .primary"
		onCancel={props.onCancel}
		onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}
		footer={<><span></span><button type="button" onClick={props.onCancel}>取消</button><button class="primary" type="submit">{dialogSubmitLabel(props.state)}</button></>}
	>			<div class="dialog-content">
				<Show when={props.error}>{(error) => <div class="dialog-error" role="alert">{error()}</div>}</Show>
				<Switch>
					<Match when={props.state.kind === 'localization' && props.state}>{(state) => <>
						<div class="localization-toggle-row"><label class="checkbox-field"><input type="checkbox" checked={state().enabled} onChange={(event) => update({ enabled: event.currentTarget.checked })} /><span>启用本地化绑定</span></label><label class="checkbox-field"><input type="checkbox" checked={state().autoUpdateOnOpen} onChange={(event) => update({ autoUpdateOnOpen: event.currentTarget.checked })} /><span>打开 KV 时自动导入</span></label></div>
						<div class="localization-source-row"><label class="form-field localization-language"><span>语言</span><select autofocus value={state().language} onChange={(event) => update({ language: event.currentTarget.value })}><option value="schinese">schinese</option><option value="english">english</option><option value="russian">russian</option></select></label><label class="form-field"><span>本地化 VDF 路径</span><input value={state().filePath} placeholder="例如 localization/schinese/addon_schinese.txt" onInput={(event) => update({ filePath: event.currentTarget.value })} /></label></div>
						<section class="localization-mappings"><header><div><strong>本地化列映射</strong><small>把 KV 列绑定到 VDF Token 规则；支持 ${'{id}'}、${'{key}'} 等占位符。</small></div><button type="button" onClick={() => setLocalizationMappings([...state().mappings, { columnName: '', rule: '' }])}><Icon name="add" />添加映射</button></header><div class="localization-mapping-head" aria-hidden="true"><span>KV 列名</span><span>VDF Token 规则</span><span>操作</span></div><div class="localization-mapping-list"><For each={state().mappings} fallback={<div class="localization-mappings-empty">暂无映射。添加一条后即可配置导入与导出。</div>}>{(mapping, index) => <div class="localization-mapping-row"><input value={mapping.columnName} placeholder="例如 Name" aria-label={`映射 ${index() + 1} 的 KV 列名`} onInput={(event) => updateLocalizationMapping(index(), { columnName: event.currentTarget.value })} /><input value={mapping.rule} placeholder="例如 DOTA_Tooltip_ability_{id}" aria-label={`映射 ${index() + 1} 的 Token 规则`} onInput={(event) => updateLocalizationMapping(index(), { rule: event.currentTarget.value })} /><button type="button" class="icon-button danger" title="删除映射" aria-label={`删除映射 ${index() + 1}`} onClick={() => setLocalizationMappings(state().mappings.filter((_, current) => current !== index()))}><Icon name="trash" /></button></div>}</For></div></section>
					</>}</Match>
					<Match when={props.state.kind === 'localizationAction' && props.state}>{(state) => <div class="confirm-body">
						<strong>{state().action === 'import' ? '从本地化文件导入到当前 KV？' : '把当前 KV 导出到本地化文件？'}</strong>
						<p>{state().action === 'import' ? '匹配列的 KV 值将由 VDF Tokens 更新。整个导入可通过一次 VS Code 撤销还原。' : '目标 VDF 将按当前列映射重新生成；请确认已保存需要导出的 KV 内容。'}</p>
						<code>{state().filePath}</code>
					</div>}</Match>
					<Match when={props.state.kind === 'insertColumn' && props.state}>{(state) => <>
						<p class="dialog-hint">新列将插入到 <code>{state().anchorColumnKey}</code> 之后。</p>
						<label class="form-field"><span>字段名</span><input autofocus value={state().columnKey} placeholder="例如 AbilityCastRange" onInput={(event) => update({ columnKey: event.currentTarget.value })} /></label>
					</>}</Match>
					<Match when={props.state.kind === 'deleteColumn' && props.state}>{(state) => <div class="confirm-body">
						<strong>确定删除列 “{state().columnKey}” 吗？</strong>
						<p>所有行中的对应值、列公式和文件级列设置都会一并删除。此操作可通过 VS Code 撤销。</p>
					</div>}</Match>
					<Match when={props.state.kind === 'columnFormula' && props.state}>{(state) => <>
						<p class="dialog-hint">列 <code>{state().columnKey}</code> 的默认公式。单元格公式仍具有更高优先级；留空可移除列公式。</p>
						<label class="form-field"><span>安全公式</span><input autofocus value={state().formula} placeholder="=A1 * 2" onInput={(event) => update({ formula: event.currentTarget.value })} /></label>
					</>}</Match>
					<Match when={props.state.kind === 'columnOptions' && props.state}>{(state) => <>
						<p class="dialog-hint">配置列 <code>{state().columnKey}</code> 的下拉选项。表格中的顺序就是下拉菜单顺序。</p>
						<div class="column-options-editor">
							<div class="column-option-head"><span>颜色</span><span>保存值</span><span>显示文本</span><span>说明</span><span>操作</span></div>
							<For each={state().options} fallback={<div class="column-options-empty">暂无选项。点击下方按钮添加。</div>}>{(option, index) => <div class="column-option-row">
								<label class="option-color" title="选项颜色"><input type="color" value={resolveOptionColor(option.value, option.color)} onInput={(event) => updateColumnOption(index(), { color: event.currentTarget.value })} /><span style={{ background: resolveOptionColor(option.value, option.color) }} /></label>
								<input autofocus={index() === 0} value={option.value} placeholder="例如 passive" aria-label={`选项 ${index() + 1} 的保存值`} onInput={(event) => updateColumnOption(index(), { value: event.currentTarget.value })} />
								<input value={option.label} placeholder="留空则显示保存值" aria-label={`选项 ${index() + 1} 的显示文本`} onInput={(event) => updateColumnOption(index(), { label: event.currentTarget.value })} />
								<input value={option.description ?? ''} placeholder="可选说明，可被搜索" aria-label={`选项 ${index() + 1} 的说明`} onInput={(event) => updateColumnOption(index(), { description: event.currentTarget.value })} />
								<span class="column-option-actions"><button type="button" class="icon-button" title="上移" aria-label="上移选项" disabled={index() === 0} onClick={() => moveColumnOption(index(), -1)}><Icon name="arrow-up" /></button><button type="button" class="icon-button" title="下移" aria-label="下移选项" disabled={index() === state().options.length - 1} onClick={() => moveColumnOption(index(), 1)}><Icon name="arrow-down" /></button><button type="button" class="icon-button danger" title="删除" aria-label="删除选项" onClick={() => setColumnOptions(state().options.filter((_, current) => current !== index()))}><Icon name="trash" /></button></span>
							</div>}</For>
							<button type="button" class="add-option-button" onClick={() => setColumnOptions([...state().options, { value: '', label: '' }])}><Icon name="add" />添加选项</button>
						</div>
						<div class="form-row"><label class="checkbox-field"><input type="checkbox" checked={state().multiple} onChange={(event) => update({ multiple: event.currentTarget.checked })} /><span>允许多选</span></label><Show when={state().multiple}><label class="form-field compact-field"><span>分隔符</span><input value={state().separator} maxlength="4" onInput={(event) => update({ separator: event.currentTarget.value })} /></label></Show></div>
					</>}</Match>
					<Match when={props.state.kind === 'columnDescription' && props.state}>{(state) => <>
						<p class="dialog-hint">列字段：<code>{state().columnKey}</code></p>
						<label class="form-field"><span>显示名称</span><input autofocus value={state().label} onInput={(event) => update({ label: event.currentTarget.value })} /></label>
						<label class="form-field"><span>说明</span><textarea rows="5" value={state().description} onInput={(event) => update({ description: event.currentTarget.value })} /></label>
					</>}</Match>
					<Match when={props.state.kind === 'fill' && props.state}>{(state) => <>
						<div class="fill-summary">
							<div><span>源单元格</span><strong>{state().source.columnKey} · {state().source.rowId}</strong><code>{state().sourceValue || '(空值)'}</code></div>
							<Icon name="arrow-right" />
							<div><span>目标范围</span><strong>{state().targetCells.length} 个单元格</strong><small title={state().targetCells.map((cell) => `${cell.columnKey} · ${cell.rowId}`).join(', ')}>{state().targetCells.slice(0, 4).map((cell) => `${cell.columnKey} · ${cell.rowId}`).join(', ')}{state().targetCells.length > 4 ? ` 等 ${state().targetCells.length} 个单元格` : ''}</small></div>
						</div>
						<fieldset class="fill-mode-grid"><legend>选择填充规则</legend>
							<label classList={{ selected: state().mode === 'copy' }}><input autofocus type="radio" name="fill-mode" checked={state().mode === 'copy'} onChange={() => update({ mode: 'copy' })} /><Icon name="copy" /><span><strong>复制相同值</strong><small>每个目标单元格都写入源值</small></span></label>
							<label classList={{ selected: state().mode === 'arithmetic' }}><input type="radio" name="fill-mode" checked={state().mode === 'arithmetic'} onChange={() => update({ mode: 'arithmetic', factor: '1' })} /><Icon name="symbol-numeric" /><span><strong>固定步长</strong><small>按行距递增或递减，例如 1、2、3</small></span></label>
							<label classList={{ selected: state().mode === 'geometric' }}><input type="radio" name="fill-mode" checked={state().mode === 'geometric'} onChange={() => update({ mode: 'geometric', factor: '2' })} /><Icon name="graph" /><span><strong>固定倍数</strong><small>按行距乘以倍数，例如 2、4、8</small></span></label>
							<label classList={{ selected: state().mode === 'formula' }}><input type="radio" name="fill-mode" checked={state().mode === 'formula'} onChange={() => update({ mode: 'formula' })} /><Icon name="symbol-operator" /><span><strong>公式填充</strong><small>复制公式并自动调整相对行引用</small></span></label>
						</fieldset>
						<Show when={state().mode === 'arithmetic' || state().mode === 'geometric'}><label class="form-field"><span>{state().mode === 'arithmetic' ? '每跨一行的步长' : '每跨一行的倍数'}</span><input type="number" value={state().factor} onInput={(event) => update({ factor: event.currentTarget.value })} /><small>计算使用目标行与源行在完整文档中的行距；筛选隐藏的行不会被写入。</small></label></Show>
						<Show when={state().mode === 'formula'}><label class="form-field"><span>源公式</span><input value={state().formula} placeholder="=A1 + 1" onInput={(event) => update({ formula: event.currentTarget.value })} /><small>绝对引用（如 $A$1）保持不变，相对行引用会随目标行调整。</small></label></Show>
						<p class="dialog-hint"><Icon name="history" />本次填充只影响明确选中的可见行，并作为一次文档操作提交；一次撤销即可还原。</p>
					</>}</Match>
					<Match when={props.state.kind === 'deleteRows' && props.state}>{(state) => <div class="confirm-body">
						<strong>确定删除选中的 {state().rowIds.length} 行吗？</strong>
						<p>相关单元格公式和行级元数据会一并处理。此操作可通过 VS Code 撤销。</p>
					</div>}</Match>
				</Switch>
			</div>
	</ModalFormShell>;
}
function dialogEyebrow(state: DialogState): string {
	if (state.kind === 'localization' || state.kind === 'localizationAction') {return '本地化工作流';}
	if (state.kind === 'fill') {return '批量数据操作';}
	if (state.kind === 'deleteColumn' || state.kind === 'deleteRows') {return '确认影响范围';}
	return '列结构与显示';
}
function dialogTitle(state: DialogState): string {
	if (state.kind === 'localizationAction') {return state.action === 'import' ? '导入本地化' : '导出本地化';}
	return { localization: '本地化设置', insertColumn: '插入列', deleteColumn: '删除列', columnFormula: '列公式', columnOptions: '列选项', columnDescription: '列说明', fill: '批量填充', deleteRows: '删除行' }[state.kind];
}
function dialogSubmitLabel(state: DialogState): string {
	if (state.kind === 'localizationAction') {return state.action === 'import' ? '确认导入' : '确认导出';}
	if (state.kind === 'deleteColumn' || state.kind === 'deleteRows') {return '删除';}
	if (state.kind === 'fill') {return `填充 ${state.targetCells.length} 个单元格`;}
	return '保存';
}
