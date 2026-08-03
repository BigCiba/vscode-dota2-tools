/* eslint-disable @typescript-eslint/naming-convention -- Solid components and CSS keys intentionally use framework-native names. */
import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import type { KvEditorV2TextureHero, KvEditorV2TextureIcon } from '../../../src/types/kvEditorV2Shared';
import { heroAttributeLabel, textureSourceLabel } from '../uiUtils';
import { Icon } from './Icon';
import { ModalShell } from './ModalShell';

export interface TextureDialogProps {
	icons: KvEditorV2TextureIcon[];
	kind: 'spell' | 'item';
	hero: string;
	heroes: KvEditorV2TextureHero[];
	search: string;
	loading: boolean;
	error?: string;
	onKind(kind: 'spell' | 'item'): void;
	onHero(hero: KvEditorV2TextureHero): void;
	onClearHero(): void;
	onSearch(value: string): void;
	onChoose(icon: KvEditorV2TextureIcon): void;
	onCancel(): void;
}

export function TextureDialog(props: TextureDialogProps) {
	let gridElement!: HTMLDivElement;
	let heroFilterElement!: HTMLDivElement;
	const [displayMode, setDisplayMode] = createSignal<'icon' | 'detail'>('icon');
	const [heroesOpen, setHeroesOpen] = createSignal(false);
	const [gridWidth, setGridWidth] = createSignal(900);
	const [gridHeight, setGridHeight] = createSignal(500);
	const [gridScrollTop, setGridScrollTop] = createSignal(0);
	const activeHero = createMemo(() => props.heroes.find((hero) => hero.id === props.hero));
	const itemMetrics = createMemo(() => displayMode() === 'icon' ? { width: 64, height: 66 } : { width: 112, height: 98 });
	const gridColumns = createMemo(() => Math.max(1, Math.floor((gridWidth() - 16 + 4) / (itemMetrics().width + 4))));
	const gridRange = createMemo(() => {
		const columns = gridColumns();
		const height = itemMetrics().height;
		const rowCount = Math.ceil(props.icons.length / columns);
		const startRow = Math.max(0, Math.floor(gridScrollTop() / height) - 3);
		const endRow = Math.min(rowCount, Math.ceil((gridScrollTop() + gridHeight()) / height) + 3);
		return { columns, rowCount, startRow, icons: props.icons.slice(startRow * columns, endRow * columns) };
	});
	const heroGroups = createMemo(() => {
		const labels: Record<string, string> = { strength: '力量', agility: '敏捷', intelligence: '智力', universal: '全才', all: '全才', other: '其他' };
		const groups = new Map<string, KvEditorV2TextureHero[]>();
		for (const hero of props.heroes) {
			const key = (hero.attribute || 'other').toLocaleLowerCase();
			groups.set(key, [...(groups.get(key) ?? []), hero]);
		}
		return [...groups].map(([key, heroes]) => ({ key, label: labels[key] ?? heroAttributeLabel(key), heroes }));
	});

	createEffect(() => {
		void props.hero;
		void props.search;
		if (props.kind !== 'spell') {
			setHeroesOpen(false);
		}
		if (gridElement) {
			gridElement.scrollTop = 0;
		}
		setGridScrollTop(0);
	});
	onMount(() => {
		const observer = new ResizeObserver(() => {
			setGridWidth(gridElement.clientWidth || 900);
			setGridHeight(gridElement.clientHeight || 500);
		});
		observer.observe(gridElement);
		const closeHeroFilter = (event: PointerEvent) => {
			if (heroesOpen() && event.target instanceof Node && !heroFilterElement.contains(event.target)) {
				setHeroesOpen(false);
			}
		};
		document.addEventListener('pointerdown', closeHeroFilter);
		onCleanup(() => {
			observer.disconnect();
			document.removeEventListener('pointerdown', closeHeroFilter);
		});
	});

	return <ModalShell
		ariaLabel="纹理选择器"
		title="选择 AbilityTextureName"
		eyebrow="纹理资源库"
		subtitle={`${props.icons.length} 个匹配结果`}
		class="texture-dialog"
		initialFocus=".texture-search input"
		onCancel={props.onCancel}
		footer={<><span class="dialog-footnote"><Icon name="info" />单击图标立即选择；英雄筛选沿用旧版关键词规则。</span><span></span><button onClick={props.onCancel}>取消</button></>}
	>			<div class="texture-toolbar">
				<div class="control-cluster">
					<span class="control-label">类型</span>
					<div class="segmented">
						<button classList={{ active: props.kind === 'spell' }} aria-pressed={props.kind === 'spell'} onClick={() => props.onKind('spell')}><Icon name="symbol-event" />技能</button>
						<button classList={{ active: props.kind === 'item' }} aria-pressed={props.kind === 'item'} onClick={() => props.onKind('item')}><Icon name="package" />物品</button>
					</div>
				</div>
				<div class="control-cluster">
					<span class="control-label">英雄</span>
					<div ref={heroFilterElement} class="hero-filter" onKeyDown={(event) => { if (event.key === 'Escape' && heroesOpen()) {event.preventDefault(); event.stopPropagation(); setHeroesOpen(false);} }}>
						<button disabled={props.kind !== 'spell' || !props.heroes.length} classList={{ active: !!props.hero }} onClick={() => setHeroesOpen(!heroesOpen())}>
							<Show when={activeHero()} fallback={<Icon name="person" />}>{(hero) => <img src={hero().uri} alt="" />}</Show>
							<span>{activeHero()?.name ?? '全部英雄'}</span><Icon name="chevron-down" />
						</button>
						<Show when={heroesOpen() && props.kind === 'spell'}>
							<div class="hero-filter-panel">
								<button classList={{ 'hero-option': true, active: !props.hero }} title="全部英雄" onClick={() => {props.onClearHero(); setHeroesOpen(false);}}><Icon name="globe" /><span>全部</span></button>
								<For each={heroGroups()}>{(group) => <section><strong>{group.label}</strong><div><For each={group.heroes}>{(hero) => <button classList={{ 'hero-option': true, active: props.hero === hero.id }} title={hero.name} onClick={() => {props.onHero(hero); setHeroesOpen(false);}}><img src={hero.uri} alt="" /><span>{hero.name}</span></button>}</For></div></section>}</For>
							</div>
						</Show>
					</div>
				</div>
				<label class="texture-search">
					<Icon name="search" />
					<input autofocus aria-label="搜索名称、路径或英雄" value={props.search} placeholder="搜索名称、路径或英雄" onInput={(event) => props.onSearch(event.currentTarget.value)} />
					<Show when={props.search}><button aria-label="清除搜索" onClick={() => props.onSearch('')}><Icon name="close" /></button></Show>
				</label>
				<div class="segmented display-mode" aria-label="显示密度">
					<button classList={{ active: displayMode() === 'icon' }} title="紧凑图标" aria-label="紧凑图标" onClick={() => setDisplayMode('icon')}><Icon name="symbol-color" /></button>
					<button classList={{ active: displayMode() === 'detail' }} title="图标和名称" aria-label="图标和名称" onClick={() => setDisplayMode('detail')}><Icon name="list-flat" /></button>
				</div>
			</div>
			<div class="texture-grid" ref={gridElement} onScroll={(event) => setGridScrollTop(event.currentTarget.scrollTop)}>
				<Show when={!props.loading} fallback={<div class="texture-status"><Icon name="loading" spin />正在扫描并加载纹理…</div>}>
					<Show when={!props.error} fallback={<div class="texture-status error" role="alert">{props.error}</div>}>
						<Show when={props.icons.length} fallback={<div class="texture-status">没有匹配的纹理</div>}>
							<div class="texture-grid-spacer" style={{ height: `${gridRange().rowCount * itemMetrics().height}px` }}>
								<div class="texture-grid-window" classList={{ detailed: displayMode() === 'detail' }} style={{ transform: `translateY(${gridRange().startRow * itemMetrics().height}px)`, 'grid-template-columns': `repeat(${gridRange().columns}, minmax(0, 1fr))` }}>
									<For each={gridRange().icons}>{(icon) => <button class="texture-option" classList={{ detailed: displayMode() === 'detail' }} aria-label={icon.label || icon.textureName} title={`${icon.textureName}\n${icon.relativePath}\n${textureSourceLabel(icon.source)}`} onClick={() => props.onChoose(icon)}>
										<img src={icon.uri} width="48" height="48" alt="" />
										<Show when={displayMode() === 'detail'}><span>{icon.label || icon.textureName}</span></Show>
										<small classList={{ addon: icon.source === 'addon' }}>{icon.source === 'addon' ? '项目' : ''}</small>
									</button>}</For>
								</div>
							</div>
						</Show>
					</Show>
				</Show>
			</div>
	</ModalShell>;
}
