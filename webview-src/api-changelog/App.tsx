/* eslint-disable @typescript-eslint/naming-convention, curly */
import { For, Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import type { ApiChangelogHostMessage, ApiChangelogWebviewMessage } from '../../src/types/apiChangelogWebviewMessages';
import { getVsCodeApi } from '../shared/vscodeApi';

interface ChangelogSection { title: string; items: string[]; }
interface ChangelogRelease { id: string; date: string; sections: ChangelogSection[]; }
interface ChangelogDocument { title: string; introduction: string; releases: ChangelogRelease[]; }
interface FilteredRelease extends ChangelogRelease { matchCount: number; }
interface ViewState { query: string; selectedRelease?: string; }

const vscode = getVsCodeApi<ViewState>();

export function App() {
	const restored = vscode.getState();
	const [document, setDocument] = createSignal<ChangelogDocument>();
	const [query, setQuery] = createSignal(restored?.query ?? '');
	const [selectedRelease, setSelectedRelease] = createSignal(restored?.selectedRelease);
	const [updatedAt, setUpdatedAt] = createSignal(0);
	let searchInput: HTMLInputElement | undefined;
	let contentPane: HTMLElement | undefined;
	let scrollFrame: number | undefined;

	const syncReleaseFromScroll = () => {
		if (!contentPane) return;
		if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
		scrollFrame = requestAnimationFrame(() => {
			if (!contentPane) return;
			const articles = Array.from(contentPane.querySelectorAll<HTMLElement>('.release-block'));
			if (articles.length === 0) return;
			const threshold = contentPane.getBoundingClientRect().top + 72;
			let activeId = articles[0].id;
			for (const article of articles) {
				if (article.getBoundingClientRect().top <= threshold) activeId = article.id;
				else break;
			}
			if (contentPane.scrollTop + contentPane.clientHeight >= contentPane.scrollHeight - 2) activeId = articles[articles.length - 1].id;
			if (activeId !== selectedRelease()) {
				setSelectedRelease(activeId);
				vscode.setState({ query: query(), selectedRelease: activeId });
				globalThis.document.querySelector<HTMLElement>(`.version-rail [data-release-id="${activeId}"]`)?.scrollIntoView({ block: 'nearest' });
			}
		});
	};

	const words = createMemo(() => query().trim().toLocaleLowerCase().split(/\s+/).filter(Boolean));
	const filteredReleases = createMemo<FilteredRelease[]>(() => {
		const releases = document()?.releases ?? [];
		if (words().length === 0) return releases.map((release) => ({ ...release, matchCount: release.sections.reduce((sum, section) => sum + section.items.length, 0) }));
		return releases.flatMap((release) => {
			const releaseMatches = matchesWords(release.date, words());
			const sections = release.sections.flatMap((section) => {
				const sectionMatches = releaseMatches || matchesWords(section.title, words());
				const items = sectionMatches ? section.items : section.items.filter((item) => matchesWords(stripMarkup(item), words()));
				return items.length > 0 ? [{ ...section, items }] : [];
			});
			const matchCount = sections.reduce((sum, section) => sum + section.items.length, 0);
			return matchCount > 0 ? [{ ...release, sections, matchCount }] : [];
		});
	});
	const totalMatches = createMemo(() => filteredReleases().reduce((sum, release) => sum + release.matchCount, 0));

	onMount(() => {
		const receive = (event: MessageEvent<ApiChangelogHostMessage>) => {
			if (event.data.type !== 'initialize') return;
			const parsed = parseChangelog(event.data.markdown);
			setDocument(parsed);
			setUpdatedAt(event.data.updatedAt);
			if (!selectedRelease()) setSelectedRelease(parsed.releases[0]?.id);
			queueMicrotask(syncReleaseFromScroll);
		};
		const keydown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
				event.preventDefault();
				searchInput?.focus();
				searchInput?.select();
			}
			if (event.key === 'Escape' && globalThis.document.activeElement === searchInput && query()) setQuery('');
		};
		window.addEventListener('message', receive);
		window.addEventListener('keydown', keydown);
		contentPane?.addEventListener('scroll', syncReleaseFromScroll, { passive: true });
		onCleanup(() => {
			window.removeEventListener('message', receive);
			window.removeEventListener('keydown', keydown);
			contentPane?.removeEventListener('scroll', syncReleaseFromScroll);
			if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
		});
		postMessage({ type: 'ready' });
	});

	const selectRelease = (id: string) => {
		setSelectedRelease(id);
		vscode.setState({ query: query(), selectedRelease: id });
		globalThis.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	const updateQuery = (value: string) => {
		setQuery(value);
		queueMicrotask(() => { contentPane?.scrollTo({ top: 0 }); syncReleaseFromScroll(); });
	};
	const persistState = () => vscode.setState({ query: query(), selectedRelease: selectedRelease() });

	return <div class="changelog-shell" onInput={persistState}>
		<header class="command-bar">
			<div class="title-block"><span class="eyebrow">Dota 2 Tools</span><strong>{document()?.title ?? 'API 更新日志'}</strong></div>
			<label class="search-box"><span class="codicon codicon-search" aria-hidden="true" /><span class="sr-only">搜索更新日志</span><input ref={searchInput} type="search" value={query()} placeholder="搜索版本、平台或 API" onInput={(event) => updateQuery(event.currentTarget.value)} /> <Show when={!query()}><kbd>Ctrl K</kbd></Show><Show when={query()}><button type="button" onClick={() => updateQuery('')}>清除</button></Show></label>
			<div class="result-summary" aria-live="polite"><strong>{query() ? totalMatches() : document()?.releases.length ?? 0}</strong><span>{query() ? '匹配项' : '个版本'}</span></div>
		</header>
		<div class="workspace">
			<aside class="version-rail" aria-label="版本导航">
				<div class="rail-heading"><span>版本</span><span>{filteredReleases().length}</span></div>
				<nav><For each={filteredReleases()}>{(release) => <button type="button" data-release-id={release.id} aria-current={selectedRelease() === release.id ? 'true' : undefined} classList={{ active: selectedRelease() === release.id }} onClick={() => selectRelease(release.id)}><span class="timeline-dot" /><span>{release.date}</span><small>{release.matchCount}</small></button>}</For></nav>
			</aside>
			<main class="content-pane" ref={contentPane}>
				<Show when={document()} fallback={<LoadingState />}>
					<Show when={filteredReleases().length > 0} fallback={<EmptyState query={query()} />}>
						<div class="document-intro"><p>{document()!.introduction}</p><span>{updatedAt() ? `来源更新于 ${formatTime(updatedAt())}` : ''}</span></div>
						<For each={filteredReleases()}>{(release) => <article id={release.id} class="release-block">
							<header class="release-header"><div><span class="release-kicker">Release</span><h1>{release.date}</h1></div><span>{release.matchCount} 项变更</span></header>
							<For each={release.sections}>{(section) => <section class="change-section"><div class="section-heading"><h2>{section.title}</h2><span>{section.items.length}</span></div><ul><For each={section.items}>{(item) => <li class={changeKind(item)}><span class="change-marker" aria-hidden="true" /><div innerHTML={renderInlineMarkdown(item)} /></li>}</For></ul></section>}</For>
						</article>}</For>
					</Show>
				</Show>
			</main>
		</div>
	</div>;
}

function parseChangelog(markdown: string): ChangelogDocument {
	const result: ChangelogDocument = { title: 'DOTA2 API 更新日志', introduction: '', releases: [] };
	let release: ChangelogRelease | undefined;
	let section: ChangelogSection | undefined;
	for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
		const line = rawLine.trim();
		if (!line) continue;
		const heading = /^(#{1,2})\s+(.+)$/.exec(line);
		if (heading?.[1] === '#' && !/^\d{4}[.-]\d{2}[.-]\d{2}$/.test(heading[2])) {
			if (result.releases.length === 0) result.title = heading[2];
			continue;
		}
		if (heading?.[1] === '#') {
			const date = heading[2];
			release = { id: `release-${date.replace(/[^\dA-Za-z]+/g, '-')}`, date, sections: [] };
			result.releases.push(release);
			section = undefined;
			continue;
		}
		if (heading?.[1] === '##' && release) {
			section = { title: heading[2], items: [] };
			release.sections.push(section);
			continue;
		}
		if (line.startsWith('- ') && release) {
			if (!section) { section = { title: 'Changes', items: [] }; release.sections.push(section); }
			section.items.push(line.slice(2));
			continue;
		}
		if (!release) result.introduction = [result.introduction, line].filter(Boolean).join(' ');
		else if (section?.items.length) section.items[section.items.length - 1] += ` ${line}`;
	}
	return result;
}

function renderInlineMarkdown(value: string): string {
	const tokens: string[] = [];
	let output = value.replace(/<font\s+color=(['"])(#[0-9a-f]{3,8})\1>([\s\S]*?)<\/font>/gi, (_match, _quote, color: string, content: string) => {
		const token = `@@DOTA_COLOR_${tokens.length}@@`;
		tokens.push(`<span style="color:${color}">${escapeHtml(content)}</span>`);
		return token;
	});
	output = escapeHtml(output).replace(/~~(.+?)~~/g, '<del>$1</del>').replace(/`(.+?)`/g, '<code>$1</code>');
	return output.replace(/@@DOTA_COLOR_(\d+)@@/g, (_match, index: string) => tokens[Number(index)] ?? '');
}

function escapeHtml(value: string): string { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function stripMarkup(value: string): string { return value.replace(/<[^>]*>/g, ' ').replace(/~~|`/g, ' '); }
function matchesWords(value: string, words: string[]): boolean { const text = value.toLocaleLowerCase(); return words.every((word) => text.includes(word)); }
function changeKind(item: string): string { return item.includes('✨') ? 'change-item added' : item.includes('🖊') ? 'change-item modified' : 'change-item'; }
function formatTime(value: number): string { return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(value); }
function postMessage(message: ApiChangelogWebviewMessage): void { vscode.postMessage(message); }
function LoadingState() { return <div class="empty-state"><strong>正在读取更新日志</strong></div>; }
function EmptyState(props: { query: string; }) { return <div class="empty-state"><strong>没有找到相关变更</strong><span>尝试缩短“{props.query}”或搜索 API 名称。</span></div>; }
