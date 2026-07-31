import { For, Match, Show, Switch, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import type {
	Dota2ItemsGameDetail,
	Dota2ItemsGameField,
	Dota2ItemsGameHostMessage,
	Dota2ItemsGameSearchResult,
	Dota2ItemsGameWebviewMessage,
} from '../../src/types/dota2ItemsGameWebviewMessages';
import { getVsCodeApi } from '../shared/vscodeApi';

interface ItemGameViewState {
	query: string;
}

type Result = Dota2ItemsGameDetail | Dota2ItemsGameSearchResult;

const vscode = getVsCodeApi<ItemGameViewState>();

export function App() {
	const restoredState = vscode.getState();
	const [query, setQuery] = createSignal(restoredState?.query ?? '');
	const [result, setResult] = createSignal<Result>();
	const [searchedQuery, setSearchedQuery] = createSignal('');
	const [isSearching, setIsSearching] = createSignal(false);
	let searchTimer: ReturnType<typeof setTimeout> | undefined;
	let searchInput: HTMLInputElement | undefined;

	createEffect(() => vscode.setState({ query: query() }));

	onMount(() => {
		const handleMessage = (event: MessageEvent<Dota2ItemsGameHostMessage>) => {
			const message = event.data;
			if (message.type !== 'searchResult') {
				return;
			}
			if (message.payload.query !== query().trim()) {
				return;
			}
			setSearchedQuery(message.payload.query);
			setResult(message.payload.result);
			setIsSearching(false);
		};

		window.addEventListener('message', handleMessage);
		onCleanup(() => {
			window.removeEventListener('message', handleMessage);
			if (searchTimer) {
				clearTimeout(searchTimer);
			}
		});
		postMessage({ type: 'ready' });
		if (query().trim()) {
			queueSearch(query());
		}
	});

	const queueSearch = (value: string) => {
		setQuery(value);
		if (searchTimer) {
			clearTimeout(searchTimer);
		}

		const normalizedQuery = value.trim();
		if (!normalizedQuery) {
			setResult(undefined);
			setSearchedQuery('');
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		postMessage({ type: 'search', payload: { query: normalizedQuery } });
	};

	const clearSearch = () => {
		queueSearch('');
		searchInput?.focus();
	};

	return (
		<div class="page-shell">
			<header class="command-bar">
				<div class="title-block">
					<span class="title-eyebrow">ITEMS_GAME / ECON DATA</span>
					<h1>Dota 2 饰品查询</h1>
				</div>
				<div class="search-box" classList={{ searching: isSearching() }}>
					<span class="search-icon" aria-hidden="true" />
					<input
						ref={searchInput}
						type="search"
						value={query()}
						placeholder="输入编号、模型路径、粒子路径或英雄名"
						aria-label="搜索饰品"
						onInput={(event) => queueSearch(event.currentTarget.value)}
					/>
					<Show when={query()}>
						<button type="button" class="clear-search" onClick={clearSearch} aria-label="清除搜索"><span aria-hidden="true">×</span></button>
					</Show>
					<Show when={isSearching()}>
						<span class="search-progress" aria-live="polite">正在查询</span>
					</Show>
				</div>
				{/* Search progress is shown inside the search box. */}
			</header>

			<main class="content" aria-live="polite">
				<Switch>
					<Match when={isSearching() && !result()}><LoadingState /></Match>
					<Match when={!result() && !query()}><EmptyState /></Match>
					<Match when={!result() && searchedQuery() && !isSearching()}><NoResult query={searchedQuery()} /></Match>
					<Match when={isDetail(result())}><ItemDetail detail={result() as Dota2ItemsGameDetail} onSearch={queueSearch} /></Match>
					<Match when={isList(result())}><ItemList list={result() as Dota2ItemsGameSearchResult} onSearch={queueSearch} /></Match>
				</Switch>
			</main>
		</div>
	);
}

function ItemDetail(props: { detail: Dota2ItemsGameDetail; onSearch: (query: string) => void; }) {
	const name = () => props.detail.fields.find((field) => field.label === '物品名称' || field.label === 'item_name')?.value;
	const index = () => props.detail.fields.find((field) => field.label === '编号' || field.label === 'index')?.value;

	return (
		<div class="detail-layout">
			<section class="item-summary" aria-labelledby="item-name">
				<div class="item-art" classList={{ missing: !props.detail.imageData }}>
					<Show when={props.detail.imageData} fallback={<span>预览不可用</span>}>
						<img src={`data:image/jpeg;base64,${props.detail.imageData}`} alt={name() ?? '饰品预览'} />
					</Show>
				</div>
				<div class="item-title">
					<span class="item-index">ITEM {index() ?? '—'}</span>
					<h2 id="item-name">{name() ?? '物品详情'}</h2>
					<p>来自 items_game 的原始饰品数据</p>
				</div>
			</section>

			<InfoSection title="基本信息" fields={props.detail.fields} onSearch={props.onSearch} />
			<InfoSection title="价格信息" fields={props.detail.priceInfo} onSearch={props.onSearch} />
			<InfoSection title="包含饰品" fields={props.detail.bundle} onSearch={props.onSearch} />
			<InfoSection title="所属捆绑包" fields={props.detail.bundleContain} onSearch={props.onSearch} />

			<Show when={props.detail.visualModifiers.length > 0}>
				<section class="data-section visual-section">
					<div class="section-heading">
						<div><span>VISUALS</span><h3>资源修饰器</h3></div>
						<small>{props.detail.visualModifiers.length} 个条目</small>
					</div>
					<div class="modifier-list">
						<For each={props.detail.visualModifiers}>
							{(modifier) => <InfoSection title={modifier.name} fields={modifier.fields} compact onSearch={props.onSearch} />}
						</For>
					</div>
				</section>
			</Show>
		</div>
	);
}

function InfoSection(props: { title: string; fields: Dota2ItemsGameField[]; compact?: boolean; onSearch: (query: string) => void; }) {
	return (
		<Show when={props.fields.length > 0}>
			<section class="data-section" classList={{ compact: props.compact }}>
				<div class="section-heading">
					<div><span>DATA</span><h3>{props.title}</h3></div>
					<small>{props.fields.length} 个字段</small>
				</div>
				<dl class="field-grid">
					<For each={props.fields}>
						{(field) => <><dt><FieldLabel label={field.label} onSearch={props.onSearch} /></dt><dd><FieldValue field={field} onSearch={props.onSearch} /></dd></>}
					</For>
				</dl>
			</section>
		</Show>
	);
}

function ItemList(props: { list: Dota2ItemsGameSearchResult; onSearch: (query: string) => void; }) {
	return (
		<section class="data-section list-section">
			<div class="section-heading"><div><span>HERO RESULTS</span><h2>关联饰品</h2></div><small>{props.list.rows.length} 个结果</small></div>
			<div class="table-wrap">
				<table>
					<thead><tr><For each={props.list.headers}>{(header) => <th>{header}</th>}</For></tr></thead>
					<tbody><For each={props.list.rows}>{(row) => <tr><For each={row}>{(cell, column) => <td>{column() === 0 && /^\d+$/.test(cell) ? <button type="button" class="field-link" title={`查询物品 ${cell}`} onClick={() => props.onSearch(cell)}>{cell}</button> : <span title={cell}>{cell || '—'}</span>}</td>}</For></tr>}</For></tbody>
				</table>
			</div>
		</section>
	);
}

function FieldLabel(props: { label: string; onSearch: (query: string) => void; }) {
	if (!/^\d+$/.test(props.label)) {
		return <>{props.label}</>;
	}
	return <button type="button" class="field-link field-label-link" title={`查询物品 ${props.label}`} onClick={() => props.onSearch(props.label)}>{props.label}<span class="jump-mark" aria-hidden="true">↗</span></button>;
}

// Quick-query value controls.
function FieldValue(props: { field: Dota2ItemsGameField; onSearch: (query: string) => void; }) {
	const quickQuery = isQuickQueryField(props.field) ? props.field.value : undefined;
	if (!quickQuery) {
		return <span title={props.field.value}>{props.field.value || '—'}</span>;
	}
	return <button type="button" class="field-link" title={`搜索 ${quickQuery}`} onClick={() => props.onSearch(quickQuery)}>{quickQuery}<span class="jump-mark" aria-hidden="true">↗</span></button>;
}

function isQuickQueryField(field: Dota2ItemsGameField): boolean {
	const value = field.value.trim();
	const label = field.label.toLocaleLowerCase();
	return Boolean(value) && (
		(label.includes('编号') || label === 'index') && /^\d+$/.test(value)
		|| label.includes('英雄') || label.includes('hero')
		|| /^(?:models|particles)\/.+\.(?:vmdl|vpcf)$/i.test(value)
		|| /^npc_dota_hero_/i.test(value)
	);
}
function EmptyState() {
	return <section class="empty-state"><span class="empty-mark">⌁</span><h2>从一个可识别的线索开始</h2><p>支持物品编号、模型路径、粒子路径，以及中英文英雄名。</p><div class="example-grid"><code>1047</code><code>npc_dota_hero_axe</code><code>models/items/...</code></div></section>;
}

function LoadingState() {
	return <section class="empty-state"><span class="loading-mark" /><h2>正在检索 items_game</h2><p>准备匹配的饰品记录。</p></section>;
}

function NoResult(props: { query: string; }) {
	return <section class="empty-state"><span class="empty-mark">?</span><h2>没有匹配 “{props.query}” 的记录</h2><p>请检查路径是否完整，或使用英雄的内部名、中文名再次搜索。</p></section>;
}

function isDetail(result: Result | undefined): result is Dota2ItemsGameDetail {
	return Boolean(result && 'fields' in result);
}

function isList(result: Result | undefined): result is Dota2ItemsGameSearchResult {
	return Boolean(result && 'headers' in result);
}

function postMessage(message: Dota2ItemsGameWebviewMessage): void {
	vscode.postMessage(message);
}
