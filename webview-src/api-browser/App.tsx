import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import type {
	ApiBrowserCssValue,
	ApiBrowserEntry,
	ApiBrowserGroup,
	ApiBrowserHostMessage,
	ApiBrowserListLocation,
	ApiBrowserParameter,
	ApiBrowserPayload,
	ApiBrowserSelection,
	ApiBrowserSource,
	ApiBrowserSurface,
	ApiBrowserWebviewMessage,
} from '../../src/types/apiBrowserWebviewMessages';
import { getVsCodeApi } from '../shared/vscodeApi';

interface ApiBrowserState {
	source: ApiBrowserSource;
	query: string;
	selectedId?: string;
}

const vscode = getVsCodeApi<ApiBrowserState>();

export function App() {
	const restoredState = vscode.getState();
	const [payload, setPayload] = createSignal<ApiBrowserPayload>();
	const [surface, setSurface] = createSignal<ApiBrowserSurface>('panel');
	const [listLocation, setListLocation] = createSignal<ApiBrowserListLocation>('sidebar');
	const [source, setSource] = createSignal<ApiBrowserSource>(restoredState?.source ?? 'lua');
	const [query, setQuery] = createSignal(restoredState?.query ?? '');
	const [selectedId, setSelectedId] = createSignal<string | undefined>(restoredState?.selectedId);
	const [overviewOnly, setOverviewOnly] = createSignal(false);
	const [editing, setEditing] = createSignal(false);
	const [draft, setDraft] = createSignal<ApiBrowserEntry>();
	const [status, setStatus] = createSignal('');
	let searchInput: HTMLInputElement | undefined;
	let statusTimer: ReturnType<typeof setTimeout> | undefined;

	const catalog = createMemo(() => payload()?.[source()]);
	const groups = createMemo(() => {
		const allGroups = catalog()?.groups ?? [];
		if (source() !== 'lua' || !overviewOnly()) return allGroups;
		return allGroups.filter((group) => overviewGroupNames.has(group.name));
	});
	const selectedGroup = createMemo(() => {
		const id = selectedId();
		if (!id) return undefined;
		return groups().find((group) => group.id === id || group.entries.some((entry) => entry.id === id));
	});
	const selectedEntry = createMemo(() => {
		const id = selectedId();
		if (!id) return undefined;
		return groups().flatMap((group) => group.entries).find((entry) => entry.id === id);
	});
	const filterWords = createMemo(() => query().trim().toLocaleLowerCase().split(/\s+/).filter(Boolean));
	const filteredGroups = createMemo(() => {
		const words = filterWords();
		if (words.length === 0) return groups();
		return groups().flatMap((group) => {
			const groupMatches = matchesWords(`${group.name} ${group.description}`, words);
			const entries = groupMatches ? group.entries : group.entries.filter((entry) => matchesWords(entrySearchText(entry), words));
			return entries.length > 0 ? [{ ...group, entries }] : [];
		});
	});
	const visibleEntryCount = createMemo(() => filteredGroups().reduce((sum, group) => sum + group.entries.length, 0));
	const showCatalog = createMemo(() => surface() === 'sidebar' ? listLocation() === 'sidebar' : listLocation() === 'panel');

	createEffect(() => vscode.setState({ source: source(), query: query(), selectedId: selectedId() }));

	onMount(() => {
		const handleMessage = (event: MessageEvent<ApiBrowserHostMessage>) => {
			const message = event.data;
			if (message.type === 'initialize') {
				setPayload(message.payload);
				setSurface(message.surface);
				setListLocation(message.listLocation);
				if (message.selection) applySelection(message.selection);
				return;
			}
			if (message.type === 'navigate') {
				applySelection(message.selection);
				return;
			}
			if (message.type === 'preferencesChanged') {
				setListLocation(message.listLocation);
				return;
			}
			if (message.type === 'saveComplete') {
				replaceEntry(message.entry);
				setEditing(false);
				setDraft(undefined);
				showStatus(`已保存 ${message.entry.name}`);
				return;
			}
			if (message.type === 'catalogAction') {
				setSource(message.source);
				setEditing(false);
				if (message.action === 'setQuery') {
					setOverviewOnly(false);
					setQuery(message.query ?? '');
					queueMicrotask(() => searchInput?.focus());
				} else if (message.action === 'collapse') {
					setSelectedId(undefined);
				} else {
					setOverviewOnly(true);
					setQuery('');
					setSelectedId(undefined);
				}
				return;
			}
			if (message.type === 'copyComplete') showStatus('已复制到剪贴板');
		};
		const handleKeydown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k' && showCatalog()) {
				event.preventDefault();
				searchInput?.focus();
				searchInput?.select();
			}
			if (event.key === 'Escape' && document.activeElement === searchInput && query()) setQuery('');
		};
		window.addEventListener('message', handleMessage);
		window.addEventListener('keydown', handleKeydown);
		onCleanup(() => {
			window.removeEventListener('message', handleMessage);
			window.removeEventListener('keydown', handleKeydown);
			if (statusTimer) clearTimeout(statusTimer);
		});
		postMessage({ type: 'ready', source: source() });
	});

	const applySelection = (selection: ApiBrowserSelection) => {
		setSource(selection.source);
		setSelectedId(selection.entryId ?? selection.groupId);
		setEditing(Boolean(selection.edit && selection.entryId));
		setDraft(undefined);
	};

	const replaceEntry = (entry: ApiBrowserEntry) => {
		setPayload((current) => current ? {
			...current,
			[entry.source]: {
				...current[entry.source],
				groups: current[entry.source].groups.map((group) => group.id === entry.groupId
					? { ...group, entries: group.entries.map((item) => item.id === entry.id ? entry : item) }
					: group),
			},
		} : current);
	};

	const showStatus = (message: string) => {
		setStatus(message);
		if (statusTimer) clearTimeout(statusTimer);
		statusTimer = setTimeout(() => setStatus(''), 2200);
	};

	const selectSource = (nextSource: ApiBrowserSource) => {
		setSource(nextSource);
		setOverviewOnly(false);
		setQuery('');
		setSelectedId(undefined);
		setEditing(false);
		postMessage({ type: 'sourceChanged', source: nextSource });
	};

	const selectionForId = (id?: string): ApiBrowserSelection => {
		const group = groups().find((item) => item.id === id || item.entries.some((entry) => entry.id === id));
		const entry = group?.entries.find((item) => item.id === id);
		return { source: source(), groupId: group?.id, entryId: entry?.id };
	};

	const selectItem = (id: string) => {
		setSelectedId(id);
		setEditing(false);
		setDraft(undefined);
		if (surface() === 'sidebar') postMessage({ type: 'openSelection', selection: selectionForId(id) });
	};

	const changeListLocation = (nextLocation: ApiBrowserListLocation) => {
		setListLocation(nextLocation);
		postMessage({ type: 'setListLocation', listLocation: nextLocation });
	};

	const openPanel = () => {
		const fallbackId = selectedId() ?? groups()[0]?.id;
		postMessage({ type: 'openSelection', selection: selectionForId(fallbackId) });
	};

	const beginEditing = () => {
		const entry = selectedEntry();
		if (!entry?.editable) return;
		setDraft(cloneEntry(entry));
		setEditing(true);
	};

	const saveDraft = () => {
		const entry = draft() ?? selectedEntry();
		if (!entry) return;
		const signature = entry.kind === 'function'
			? `${entry.name}(${entry.params.map((param) => `${param.name}: ${param.type}`).join(', ')}): ${entry.returnType || 'void'}`
			: entry.kind === 'property'
				? `${entry.name}: ${(entry.cssValues ?? []).map((item) => item.name).filter(Boolean).join(' | ') || '<value>'};`
				: entry.signature;
		postMessage({ type: 'saveEntry', entry: { ...entry, signature } });
	};

	const catalogProps = {
		get source() { return source(); },
		get query() { return query(); },
		get groups() { return filteredGroups(); },
		get selectedId() { return selectedId(); },
		get selectedGroupId() { return selectedGroup()?.id; },
		get resultCount() { return visibleEntryCount(); },
		onSelect: selectItem,
	};

	return (
		<Show when={surface() === 'panel'} fallback={
			<div class="sidebar-shell" classList={{ 'is-javascript': source() === 'javascript', 'is-css': source() === 'css' }}>
				<Show when={showCatalog()} fallback={<SidebarLauncher onOpen={openPanel} onMove={() => changeListLocation('sidebar')} />}>
					<SidebarHeader source={source()} query={query()} onSource={selectSource} onQuery={setQuery} inputRef={(element) => { searchInput = element; }} />
					<Catalog {...catalogProps} compact />
				</Show>
			</div>
		}>
			<div class="workbench-shell" classList={{ 'is-javascript': source() === 'javascript', 'is-css': source() === 'css', 'catalog-inside': showCatalog() }}>
				<header class="topbar">
					<div class="product-title"><span class="product-name">API Browser</span><span class="product-context">Dota 2 Tools</span></div>
					<Show when={showCatalog()}><SourceSwitcher source={source()} onSelect={selectSource} /></Show>
					<Show when={showCatalog()}><SearchBox query={query()} onQuery={setQuery} inputRef={(element) => { searchInput = element; }} /></Show>
					<div class="topbar-actions">
						<button type="button" class="toolbar-button" onClick={() => postMessage({ type: 'openChangelog' })}>更新日志</button>
						<button type="button" class="location-button" title={showCatalog() ? '将 API 列表移到侧边栏' : '在当前页面显示 API 列表'} onClick={() => changeListLocation(showCatalog() ? 'sidebar' : 'panel')}>
							{showCatalog() ? '移到侧栏' : '移入页面'}
						</button>
						<span class="catalog-count" aria-live="polite">{catalog()?.entryCount ?? 0} APIs</span>
					</div>
				</header>
				<main class="workspace" classList={{ 'catalog-hidden': !showCatalog() }}>
					<Show when={showCatalog()}><Catalog {...catalogProps} /></Show>
					<section class="detail-pane" aria-live="polite">
						<Show when={payload()} fallback={<LoadingState />}>
							<Show when={selectedEntry()} keyed fallback={
								<Show when={selectedGroup()} keyed fallback={<WelcomeState payload={payload()!} source={source()} listLocation={listLocation()} />}>
									{(group) => <GroupDetail group={group} onSelect={selectItem} />}
								</Show>
							}>
								{(entry) => <Show when={editing() && entry.editable} fallback={<EntryDetail entry={entry} onCopy={(text) => postMessage({ type: 'copy', text })} onEdit={beginEditing} />}>
									<EditEntry entry={draft() ?? cloneEntry(entry)} onChange={setDraft} onCancel={() => { setEditing(false); setDraft(undefined); }} onSave={saveDraft} />
								</Show>}
							</Show>
						</Show>
					</section>
				</main>
				<Show when={status()}><div class="status-toast" role="status">{status()}</div></Show>
			</div>
		</Show>
	);
}

function SourceSwitcher(props: { source: ApiBrowserSource; onSelect: (source: ApiBrowserSource) => void; }) {
	return <div class="source-switcher" role="tablist" aria-label="API 类型">
		<For each={(['lua', 'javascript', 'css'] as ApiBrowserSource[])}>{(item) => <button type="button" role="tab" aria-selected={props.source === item} classList={{ active: props.source === item }} onClick={() => props.onSelect(item)}>{sourceLabel(item)}</button>}</For>
	</div>;
}

function SearchBox(props: { query: string; onQuery: (query: string) => void; inputRef: (element: HTMLInputElement) => void; }) {
	return <label class="global-search"><span class="sr-only">搜索 API</span><input ref={props.inputRef} type="search" value={props.query} placeholder="搜索名称、签名或说明" onInput={(event) => props.onQuery(event.currentTarget.value)} /><Show when={!props.query}><kbd>Ctrl K</kbd></Show><Show when={props.query}><button type="button" aria-label="清除搜索" onClick={() => props.onQuery('')}>清除</button></Show></label>;
}

function SidebarHeader(props: { source: ApiBrowserSource; query: string; onSource: (source: ApiBrowserSource) => void; onQuery: (query: string) => void; inputRef: (element: HTMLInputElement) => void; }) {
	return <header class="sidebar-header"><SourceSwitcher source={props.source} onSelect={props.onSource} /><SearchBox query={props.query} onQuery={props.onQuery} inputRef={props.inputRef} /></header>;
}

function SidebarLauncher(props: { onOpen: () => void; onMove: () => void; }) {
	return <div class="sidebar-launcher"><p class="eyebrow">API list</p><strong>列表显示在编辑器中</strong><p>这里保留一个入口，避免同时出现两份相同列表。</p><button type="button" class="primary-button" onClick={props.onOpen}>打开 API Browser</button><button type="button" class="secondary-button" onClick={props.onMove}>移回侧边栏</button></div>;
}

function Catalog(props: { source: ApiBrowserSource; query: string; groups: ApiBrowserGroup[]; selectedId?: string; selectedGroupId?: string; resultCount: number; compact?: boolean; onSelect: (id: string) => void; }) {
	return <nav class="catalog" classList={{ compact: props.compact }} aria-label={`${props.source} API 列表`}>
		<div class="catalog-heading"><span>{props.query ? '搜索结果' : catalogTitle(props.source)}</span><span>{props.query ? props.resultCount : props.groups.length}</span></div>
		<div class="catalog-scroll" tabindex="0">
			<Show when={props.groups.length > 0} fallback={<EmptySearch query={props.query} />}>
				<For each={props.groups}>{(group) => <div class="group-block">
					<button type="button" class="group-row" classList={{ selected: props.selectedId === group.id }} onClick={() => props.onSelect(group.id)}>
						<span class={`kind-marker ${group.kind}`}>{kindMarker(group)}</span><span class="group-name">{group.name}</span><span class="group-count">{group.entries.length}</span>
					</button>
					<Show when={props.query || props.selectedGroupId === group.id}><div class="entry-list"><For each={group.entries}>{(entry) => <button type="button" class="entry-row" classList={{ selected: props.selectedId === entry.id }} onClick={() => props.onSelect(entry.id)}><span class="entry-name">{entry.name}</span><span class="entry-type">{entryType(entry)}</span></button>}</For></div></Show>
				</div>}</For>
			</Show>
		</div>
	</nav>;
}

function GroupDetail(props: { group: ApiBrowserGroup; onSelect: (id: string) => void; }) {
	return <div class="detail-content group-detail">
		<div class="breadcrumb"><span>{sourceLabel(props.group.source)}</span><span>{groupKindLabel(props.group)}</span></div>
		<header class="detail-header"><div><p class="eyebrow">{groupKindLabel(props.group)}</p><h1>{props.group.name}</h1></div><span class="entry-total">{props.group.entries.length} 项</span></header>
		<Show when={props.group.description}><p class="lead-description">{props.group.description}</p></Show>
		<Show when={props.group.extends || props.group.variable}><div class="metadata-row"><Show when={props.group.extends}><span>继承 <code>{props.group.extends}</code></span></Show><Show when={props.group.variable}><span>变量 <code>{props.group.variable}</code></span></Show></div></Show>
		<section class="section-block"><h2>{props.group.kind === 'class' ? 'Functions' : props.group.kind === 'enum' ? 'Values' : 'Properties'}</h2><div class="api-table" role="table" aria-label={`${props.group.name} 成员`}><For each={props.group.entries}>{(entry) => <button type="button" class="api-table-row" role="row" onClick={() => props.onSelect(entry.id)}><span class="member-primary" role="cell"><code>{entry.name}</code><small>{entry.signature}</small></span><span class="member-description" role="cell">{entry.description || '暂无说明'}</span></button>}</For></div></section>
	</div>;
}

function EntryDetail(props: { entry: ApiBrowserEntry; onCopy: (text: string) => void; onEdit: () => void; }) {
	return <div class="detail-content entry-detail">
		<div class="breadcrumb"><span>{sourceLabel(props.entry.source)}</span><span>{props.entry.groupName}</span></div>
		<header class="detail-header"><div><p class="eyebrow">{entryKindLabel(props.entry)}</p><h1>{props.entry.name}</h1></div><Show when={props.entry.editable}><button type="button" class="secondary-button" onClick={props.onEdit}>编辑文档</button></Show></header>
		<div class="signature-block"><span>{props.entry.source === 'javascript' ? 'js' : props.entry.source}</span><code>{props.entry.signature}</code><button type="button" onClick={() => props.onCopy(props.entry.signature)}>复制</button></div>
		<Show when={props.entry.source === 'lua' && props.entry.kind === 'function'}><div class="availability" aria-label="运行环境"><span classList={{ supported: props.entry.server }}>Server <strong>{props.entry.server ? props.entry.serverClass : '不可用'}</strong></span><span classList={{ supported: props.entry.client }}>Client <strong>{props.entry.client ? props.entry.clientClass : '不可用'}</strong></span></div></Show>
		<Section title="说明"><p class="body-copy">{props.entry.description || '暂无说明。'}</p></Section>
		<Show when={props.entry.params.length > 0}><ParameterTable params={props.entry.params} /></Show>
		<Show when={(props.entry.cssValues?.length ?? 0) > 0}><CssValueTable values={props.entry.cssValues ?? []} /></Show>
		<Show when={props.entry.returnType}><Section title="返回值"><code class="inline-type">{props.entry.returnType}</code></Section></Show>
		<Show when={props.entry.functionName}><Section title="Lua function"><code class="inline-type">{props.entry.functionName}</code></Section></Show>
		<Show when={props.entry.example}><Section title="示例"><pre class="code-example"><code>{props.entry.example}</code></pre></Section></Show>
	</div>;
}

function ParameterTable(props: { params: ApiBrowserParameter[]; }) {
	return <section class="section-block"><h2>参数</h2><div class="parameter-table"><div class="parameter-head"><span>名称</span><span>类型</span><span>说明</span></div><For each={props.params}>{(param) => <div class="parameter-row"><code>{param.name}</code><code>{param.type}</code><span>{param.description || '—'}</span></div>}</For></div></section>;
}

function CssValueTable(props: { values: ApiBrowserCssValue[]; }) {
	return <section class="section-block"><h2>可用值</h2><div class="css-value-table"><For each={props.values}>{(value) => <div class="css-value-row"><code>{value.name}</code><span>{value.description || '—'}</span></div>}</For></div></section>;
}

function EditEntry(props: { entry: ApiBrowserEntry; onChange: (entry: ApiBrowserEntry) => void; onCancel: () => void; onSave: () => void; }) {
	const update = (change: Partial<ApiBrowserEntry>) => props.onChange({ ...props.entry, ...change });
	const updateParam = (index: number, change: Partial<ApiBrowserParameter>) => update({ params: props.entry.params.map((param, itemIndex) => itemIndex === index ? { ...param, ...change } : param) });
	const updateCssValue = (index: number, change: Partial<ApiBrowserCssValue>) => update({ cssValues: (props.entry.cssValues ?? []).map((item, itemIndex) => itemIndex === index ? { ...item, ...change } : item) });
	return <form class="detail-content edit-form" onSubmit={(event) => { event.preventDefault(); props.onSave(); }}>
		<div class="breadcrumb"><span>{sourceLabel(props.entry.source)}</span><span>{props.entry.groupName}</span><span>编辑</span></div>
		<header class="detail-header"><div><p class="eyebrow">Editing documentation</p><h1>{props.entry.name}</h1></div><div class="form-actions"><button type="button" class="secondary-button" onClick={props.onCancel}>取消</button><button type="submit" class="primary-button">保存更改</button></div></header>
		<label class="form-field"><span>说明</span><textarea rows="5" value={props.entry.description} onInput={(event) => update({ description: event.currentTarget.value })} /></label>
		<Show when={props.entry.kind === 'enum'}><label class="form-field"><span>简短说明</span><input value={props.entry.conciseDescription ?? ''} onInput={(event) => update({ conciseDescription: event.currentTarget.value })} /></label></Show>
		<Show when={props.entry.kind === 'function'}><label class="form-field narrow"><span>返回类型</span><input value={props.entry.returnType ?? ''} onInput={(event) => update({ returnType: event.currentTarget.value })} /></label><Show when={props.entry.params.length > 0}><section class="section-block"><h2>参数</h2><div class="parameter-editor"><For each={props.entry.params}>{(param, index) => <div class="parameter-edit-row"><input aria-label="参数名称" value={param.name} onInput={(event) => updateParam(index(), { name: event.currentTarget.value })} /><input aria-label="参数类型" value={param.type} onInput={(event) => updateParam(index(), { type: event.currentTarget.value })} /><input aria-label="参数说明" value={param.description} onInput={(event) => updateParam(index(), { description: event.currentTarget.value })} /></div>}</For></div></section></Show></Show>
		<Show when={props.entry.kind === 'property'}><section class="section-block"><div class="section-heading-row"><h2>可用值</h2><button type="button" class="secondary-button small" onClick={() => update({ cssValues: [...(props.entry.cssValues ?? []), { name: '', description: '' }] })}>添加值</button></div><div class="css-value-editor"><For each={props.entry.cssValues ?? []}>{(item, index) => <div class="css-value-edit-row"><input aria-label="CSS 值" value={item.name} onInput={(event) => updateCssValue(index(), { name: event.currentTarget.value })} /><input aria-label="值说明" value={item.description} onInput={(event) => updateCssValue(index(), { description: event.currentTarget.value })} /><button type="button" aria-label={`删除 ${item.name || '此值'}`} onClick={() => update({ cssValues: (props.entry.cssValues ?? []).filter((_, itemIndex) => itemIndex !== index()) })}>删除</button></div>}</For></div></section></Show>
		<label class="form-field"><span>示例</span><textarea class="code-input" rows="8" value={props.entry.example ?? ''} onInput={(event) => update({ example: event.currentTarget.value })} /></label>
	</form>;
}

function Section(props: { title: string; children: unknown; }) { return <section class="section-block"><h2>{props.title}</h2>{props.children as never}</section>; }
function WelcomeState(props: { payload: ApiBrowserPayload; source: ApiBrowserSource; listLocation: ApiBrowserListLocation; }) { const catalog = () => props.payload[props.source]; return <div class="welcome-state"><p class="eyebrow">Dota 2 API reference</p><h1>{props.listLocation === 'sidebar' ? '从侧边栏选择一个 API' : '从左侧选择一个 API'}</h1><p>Lua、JavaScript 与 Panorama CSS 使用同一套搜索、详情和编辑体验。</p><div class="welcome-stats"><span><strong>{catalog().groups.length}</strong> 分组</span><span><strong>{catalog().entryCount}</strong> APIs</span></div></div>; }
function LoadingState() { return <div class="empty-state">正在加载 API 索引…</div>; }
function EmptySearch(props: { query: string; }) { return <div class="empty-state"><strong>{props.query ? '没有匹配项' : '暂无 API'}</strong><Show when={props.query}><span>尝试缩短“{props.query}”或使用不同关键词。</span></Show></div>; }

function sourceLabel(source: ApiBrowserSource): string { return source === 'lua' ? 'Lua' : source === 'javascript' ? 'JavaScript' : 'CSS'; }

const overviewGroupNames = new Set([
	'CDOTABaseAbility',
	'CDOTA_Ability_Lua',
	'CDOTA_BaseNPC',
	'CDOTA_BaseNPC_Hero',
	'CDOTA_Item',
	'CDOTA_Item_Lua',
	'CDOTA_Buff',
	'CDOTA_Modifier_Lua',
	'CScriptParticleManager',
	'modifierfunction',
	'modifierstate',
]);
function catalogTitle(source: ApiBrowserSource): string { return source === 'lua' ? '类与常量' : source === 'javascript' ? '命名空间与枚举' : '属性分类'; }
function kindMarker(group: ApiBrowserGroup): string { return group.kind === 'class' ? 'C' : group.kind === 'enum' ? 'E' : '#'; }
function groupKindLabel(group: ApiBrowserGroup): string { return group.kind === 'class' ? 'API class' : group.kind === 'enum' ? 'Enumeration' : 'CSS category'; }
function entryKindLabel(entry: ApiBrowserEntry): string { return entry.kind === 'function' ? 'Function' : entry.kind === 'enum' ? 'Enum value' : 'CSS property'; }
function entryType(entry: ApiBrowserEntry): string { return entry.kind === 'function' ? 'fn' : entry.kind === 'property' ? 'css' : String(entry.value ?? 'enum'); }
function entrySearchText(entry: ApiBrowserEntry): string { return `${entry.name} ${entry.groupName} ${entry.signature} ${entry.description} ${entry.conciseDescription ?? ''} ${entry.functionName ?? ''} ${(entry.cssValues ?? []).map((item) => `${item.name} ${item.description}`).join(' ')}`; }
function matchesWords(value: string, words: string[]): boolean { const searchable = value.toLocaleLowerCase(); return words.every((word) => searchable.includes(word)); }
function cloneEntry(entry: ApiBrowserEntry): ApiBrowserEntry { return { ...entry, params: entry.params.map((param) => ({ ...param })), cssValues: entry.cssValues?.map((item) => ({ ...item })) }; }
function postMessage(message: ApiBrowserWebviewMessage): void { vscode.postMessage(message); }
