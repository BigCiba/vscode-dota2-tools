import {
	For,
	Show,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
} from 'solid-js';
import type {
	Dota2HeroAttribute,
	Dota2HeroEntry,
	Dota2IconEntry,
	Dota2IconHostMessage,
	Dota2IconKind,
	Dota2IconPayload,
	Dota2IconWebviewMessage,
} from '../../src/types/dota2IconWebviewMessages';
import { getVsCodeApi } from '../shared/vscodeApi';

interface IconViewState {
	activeKind: Dota2IconKind;
	query: string;
	selectedHeroName: string;
}

const attributeSections: Array<{ key: Dota2HeroAttribute; label: string; }> = [
	{ key: 'DOTA_ATTRIBUTE_STRENGTH', label: '力量英雄' },
	{ key: 'DOTA_ATTRIBUTE_AGILITY', label: '敏捷英雄' },
	{ key: 'DOTA_ATTRIBUTE_INTELLECT', label: '智力英雄' },
	{ key: 'DOTA_ATTRIBUTE_ALL', label: '全才英雄' },
];

const sourceLabels: Record<Dota2IconEntry['source'], string> = {
	builtin: '内置',
	game: '游戏目录',
	content: '内容目录',
};

const vscode = getVsCodeApi<IconViewState>();

export function App() {
	const restoredState = vscode.getState();
	const [payload, setPayload] = createSignal<Dota2IconPayload>();
	const [activeKind, setActiveKind] = createSignal<Dota2IconKind>(restoredState?.activeKind ?? 'ability');
	const [query, setQuery] = createSignal(restoredState?.query ?? '');
	const [selectedHeroName, setSelectedHeroName] = createSignal(restoredState?.selectedHeroName ?? 'base');
	const [selectedHeroUri, setSelectedHeroUri] = createSignal('');
	const [status, setStatus] = createSignal('');
	let heroPicker: HTMLDetailsElement | undefined;
	let statusTimer: ReturnType<typeof setTimeout> | undefined;

	const activeIcons = createMemo(() => {
		const data = payload();
		if (!data) {
			return [];
		}
		return activeKind() === 'ability' ? data.abilities : data.items;
	});

	const filteredIcons = createMemo(() => {
		const words = query().trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
		if (words.length === 0) {
			return activeIcons();
		}

		return activeIcons().filter((icon) => {
			const searchableText = `${icon.name} ${icon.copyValue} ${icon.localizedName ?? ''}`.toLocaleLowerCase();
			return words.every((word) => searchableText.includes(word));
		});
	});

	createEffect(() => {
		vscode.setState({
			activeKind: activeKind(),
			query: query(),
			selectedHeroName: selectedHeroName(),
		});
	});

	onMount(() => {
		const handleMessage = (event: MessageEvent<Dota2IconHostMessage>) => {
			const message = event.data;
			if (message.type === 'initialize') {
				setPayload(message.payload);
				const selectedHero = findHero(message.payload, selectedHeroName());
				setSelectedHeroUri(selectedHero?.uri ?? message.payload.defaultHeroUri);
				return;
			}

			if (message.type === 'copyComplete') {
				showStatus(`已复制：${message.payload.copyValue}`);
			}
		};

		const closeHeroPicker = (event: PointerEvent) => {
			if (heroPicker?.open && event.target instanceof Node && !heroPicker.contains(event.target)) {
				heroPicker.open = false;
			}
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && heroPicker?.open) {
				heroPicker.open = false;
				heroPicker.querySelector<HTMLElement>('summary')?.focus();
			}
		};

		window.addEventListener('message', handleMessage);
		document.addEventListener('pointerdown', closeHeroPicker);
		document.addEventListener('keydown', closeOnEscape);
		onCleanup(() => {
			window.removeEventListener('message', handleMessage);
			document.removeEventListener('pointerdown', closeHeroPicker);
			document.removeEventListener('keydown', closeOnEscape);
			if (statusTimer) {
				clearTimeout(statusTimer);
			}
		});

		postMessage({ type: 'ready' });
	});

	const showStatus = (message: string) => {
		setStatus(message);
		if (statusTimer) {
			clearTimeout(statusTimer);
		}
		statusTimer = setTimeout(() => setStatus(''), 2200);
	};

	const selectHero = (hero: Dota2HeroEntry) => {
		setSelectedHeroName(hero.name);
		setSelectedHeroUri(hero.uri);
		setQuery(hero.name === 'base' ? '' : hero.name);
		if (heroPicker) {
			heroPicker.open = false;
		}
	};

	const copyIcon = (icon: Dota2IconEntry) => {
		postMessage({ type: 'copyIcon', payload: { key: icon.key } });
	};

	const revealIcon = (event: MouseEvent | KeyboardEvent, icon: Dota2IconEntry) => {
		event.preventDefault();
		postMessage({ type: 'revealIcon', payload: { key: icon.key } });
	};

	return (
		<div class="page-shell">
			<header class="toolbar">
				<div class="texture-type-content" role="tablist" aria-label="图标类型">
					<button
						type="button"
						classList={{ 'texture-type': true, selected: activeKind() === 'ability' }}
						role="tab"
						aria-selected={activeKind() === 'ability'}
						onClick={() => setActiveKind('ability')}
					>
						技能
					</button>
					<button
						type="button"
						classList={{ 'texture-type': true, selected: activeKind() === 'item' }}
						role="tab"
						aria-selected={activeKind() === 'item'}
						onClick={() => setActiveKind('item')}
					>
						物品
					</button>
				</div>

				<div class="search-content">
					<details class="hero-picker" ref={heroPicker}>
						<summary title="按英雄筛选技能图标" aria-label="选择英雄">
							<Show when={selectedHeroUri()} fallback={<span class="hero-placeholder" />}>
								<img src={selectedHeroUri()} alt="" draggable={false} />
							</Show>
							<span class="chevron" aria-hidden="true" />
						</summary>
						<div class="hero-menu">
							<For each={attributeSections}>
								{(section) => (
									<section class="hero-section" aria-labelledby={`hero-section-${section.key}`}>
										<h2 id={`hero-section-${section.key}`}>{section.label}</h2>
										<div class="hero-grid">
											<For each={payload()?.heroes[section.key] ?? []}>
												{(hero) => (
													<button
														type="button"
														classList={{ selected: selectedHeroName() === hero.name }}
														title={hero.name === 'base' ? '清除英雄筛选' : hero.name}
														onClick={() => selectHero(hero)}
													>
														<img src={hero.uri} alt="" loading="lazy" draggable={false} />
													</button>
												)}
											</For>
										</div>
									</section>
								)}
							</For>
						</div>
					</details>

					<div class="search-box">
						<span class="search-icon" aria-hidden="true" />
						<input
							id="filter"
							type="search"
							value={query()}
							placeholder="搜索名称、中文名称或多个关键词"
							aria-label="搜索图标"
							onInput={(event) => setQuery(event.currentTarget.value)}
						/>
						<Show when={query()}>
							<button type="button" class="clear-search" aria-label="清除搜索" onClick={() => setQuery('')}>
								×
							</button>
						</Show>
					</div>
				</div>

				<div class="result-count" aria-live="polite">
					{filteredIcons().length} / {activeIcons().length}
				</div>
			</header>

			<main class="content">
				<Show when={payload()} fallback={<div class="empty-state">正在加载图标…</div>}>
					<Show when={filteredIcons().length > 0} fallback={<div class="empty-state">没有匹配的图标</div>}>
						<div id="icon-grid" class={`icon-grid ${activeKind()}`} role="list">
							<For each={filteredIcons()}>
								{(icon) => (
									<button
										type="button"
										class="icon-card"
										classList={{ custom: icon.source !== 'builtin' }}
										role="listitem"
										title={`${icon.copyValue}${icon.localizedName ? ` · ${icon.localizedName}` : ''}\n${sourceLabels[icon.source]}\n单击复制，右键或 Shift+Enter 定位文件`}
										onClick={() => copyIcon(icon)}
										onContextMenu={(event) => revealIcon(event, icon)}
										onKeyDown={(event) => {
											if (event.key === 'Enter' && event.shiftKey) {
												revealIcon(event, icon);
											}
										}}
									>
										<img src={icon.uri} alt={icon.copyValue} loading="lazy" draggable={false} />
										<Show when={icon.source !== 'builtin'}>
											<span class="source-marker" aria-label={sourceLabels[icon.source]} />
										</Show>
									</button>
								)}
							</For>
						</div>
					</Show>
				</Show>
			</main>

			<Show when={status()}>
				<div class="status-toast" role="status">{status()}</div>
			</Show>
		</div>
	);
}

function findHero(payload: Dota2IconPayload, name: string): Dota2HeroEntry | undefined {
	return attributeSections
		.flatMap((section) => payload.heroes[section.key])
		.find((hero) => hero.name === name);
}

function postMessage(message: Dota2IconWebviewMessage): void {
	vscode.postMessage(message);
}
