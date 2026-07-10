import * as vscode from 'vscode';
import * as fs from 'fs';
import { Uri } from "vscode";
import * as path from 'path';
import type {
	Dota2HeroAttribute,
	Dota2HeroEntry,
	Dota2IconEntry,
	Dota2IconHostMessage,
	Dota2IconKind,
	Dota2IconPayload,
	Dota2IconSource,
	Dota2IconWebviewMessage,
} from '../types/dota2IconWebviewMessages';
import { getBundledWebviewContent } from '../utils/getBundledWebviewContent';
import { readKeyValue2 } from '../utils/kvUtils';
import { readFile } from '../utils/readFile';
import { showStatusBarMessage } from '../module/statusBar';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { getPathInfo } from '../utils/pathUtils';

let spellicons: Table;
let items: Table;
let npcHeroes: Table;
let abilityCN: Table;
const heroAttributeList: Dota2HeroAttribute[] = [
	'DOTA_ATTRIBUTE_STRENGTH',
	'DOTA_ATTRIBUTE_AGILITY',
	'DOTA_ATTRIBUTE_INTELLECT',
	'DOTA_ATTRIBUTE_ALL',
];

interface CustomIcon {
	game: Table,
	content: Table,
}

interface IconAction {
	copyValue: string;
	revealUri: Uri;
}
let customSpellicons: CustomIcon = {
	game: {},
	content: {}
};
let customItems: CustomIcon = {
	game: {},
	content: {}
};

export async function dota2IconPanelInit(context: vscode.ExtensionContext) {
	spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	items = await getFolderIcons(context.extensionUri, "/images/items");
	npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
	abilityCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/abilities_schinese.txt"), 'utf-8'), false).lang.Tokens;

	// 自定义图标
	await Promise.all([locdCustomSpellicons(), locdCustomItems()]);
}

async function locdCustomSpellicons() {
	let gameDir = getGameDir();
	if (gameDir) {
		if (await getPathInfo(path.join(gameDir, "/resource/flash3/images/spellicons")) !== false) {
			customSpellicons.game = await getFolderIcons(vscode.Uri.file(gameDir), "/resource/flash3/images/spellicons");
		}
	}
	let contentDir = getContentDir();
	if (contentDir) {
		if (await getPathInfo(path.join(contentDir, "/panorama/images/spellicons")) !== false) {
			customSpellicons.content = await getFolderIcons(vscode.Uri.file(contentDir), "/panorama/images/spellicons");
		}
	}
}
async function locdCustomItems() {
	let gameDir = getGameDir();
	if (gameDir) {
		if (await getPathInfo(path.join(gameDir, "/resource/flash3/images/items")) !== false) {
			customItems.game = await getFolderIcons(vscode.Uri.file(gameDir), "/resource/flash3/images/items");
		}
	}
	let contentDir = getContentDir();
	if (contentDir) {
		if (await getPathInfo(path.join(contentDir, "/panorama/images/items")) !== false) {
			customItems.content = await getFolderIcons(vscode.Uri.file(contentDir), "/panorama/images/items");
		}
	}
}
/**
 * 技能与物品图标的查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function dota2IconPanel(context: vscode.ExtensionContext) {
	const gameDir = getGameDir();
	const contentDir = getContentDir();
	const localResourceRoots = [
		Uri.joinPath(context.extensionUri, 'dist', 'webview'),
		Uri.joinPath(context.extensionUri, 'images'),
	];
	if (gameDir) {
		localResourceRoots.push(
			Uri.joinPath(Uri.file(gameDir), 'resource', 'flash3', 'images', 'spellicons'),
			Uri.joinPath(Uri.file(gameDir), 'resource', 'flash3', 'images', 'items'),
		);
	}
	if (contentDir) {
		localResourceRoots.push(
			Uri.joinPath(Uri.file(contentDir), 'panorama', 'images', 'spellicons'),
			Uri.joinPath(Uri.file(contentDir), 'panorama', 'images', 'items'),
		);
	}

	const panel = vscode.window.createWebviewPanel(
		'dota2IconPanel',
		'Dota2图标',
		vscode.ViewColumn.One,
		{
			enableScripts: true,
			localResourceRoots,
		}
	);

	if (spellicons === undefined) {
		spellicons = await getFolderIcons(context.extensionUri, '/images/spellicons');
	}
	if (items === undefined) {
		items = await getFolderIcons(context.extensionUri, '/images/items');
	}
	if (npcHeroes === undefined) {
		npcHeroes = await readHeroesIcon(context.extensionUri, '/images/heroes_icon');
	}
	if (abilityCN === undefined) {
		abilityCN = readKeyValue2(
			fs.readFileSync(path.join(context.extensionPath, 'resource/abilities_schinese.txt'), 'utf-8'),
			false
		).lang.Tokens;
	}

	const iconActions = new Map<string, IconAction>();
	const payload = buildIconPayload(
		panel.webview,
		context.extensionUri,
		gameDir,
		contentDir,
		iconActions
	);
	const postMessage = (message: Dota2IconHostMessage) => panel.webview.postMessage(message);

	const messageSubscription = panel.webview.onDidReceiveMessage(async (message: Dota2IconWebviewMessage) => {
		if (!message || typeof message.type !== 'string') {
			return;
		}
		if (message.type === 'ready') {
			await postMessage({ type: 'initialize', payload });
			return;
		}

		const action = iconActions.get(message.payload.key);
		if (!action) {
			return;
		}
		if (message.type === 'copyIcon') {
			await vscode.env.clipboard.writeText(action.copyValue);
			showStatusBarMessage('已将图标路径复制到剪切板：' + action.copyValue);
			await postMessage({
				type: 'copyComplete',
				payload: { key: message.payload.key, copyValue: action.copyValue },
			});
			return;
		}
		if (message.type === 'revealIcon') {
			await vscode.commands.executeCommand('revealFileInOS', action.revealUri);
		}
	});

	panel.onDidDispose(() => messageSubscription.dispose(), null, context.subscriptions);
	panel.webview.html = await getBundledWebviewContent(
		panel.webview,
		context.extensionUri,
		'dota2-icon'
	);
}

function buildIconPayload(
	webview: vscode.Webview,
	extensionUri: Uri,
	gameDir: string | undefined,
	contentDir: string | undefined,
	actions: Map<string, IconAction>
): Dota2IconPayload {
	const abilities: Dota2IconEntry[] = [];
	const itemEntries: Dota2IconEntry[] = [];

	appendIconEntries(webview, extensionUri, spellicons, 'ability', 'builtin', abilities, actions);
	appendIconEntries(webview, extensionUri, items, 'item', 'builtin', itemEntries, actions);

	if (gameDir) {
		const gameUri = Uri.file(gameDir);
		appendIconEntries(webview, gameUri, customSpellicons.game, 'ability', 'game', abilities, actions);
		appendIconEntries(webview, gameUri, customItems.game, 'item', 'game', itemEntries, actions);
	}
	if (contentDir) {
		const contentUri = Uri.file(contentDir);
		appendIconEntries(webview, contentUri, customSpellicons.content, 'ability', 'content', abilities, actions);
		appendIconEntries(webview, contentUri, customItems.content, 'item', 'content', itemEntries, actions);
	}

	const heroes = Object.fromEntries(
		heroAttributeList.map((attribute) => {
			const attributeHeroes = npcHeroes[attribute] ?? {};
			const entries: Dota2HeroEntry[] = Object.entries(attributeHeroes).map(([name, iconPath]) => ({
				name,
				uri: webview.asWebviewUri(resolveRelativeUri(extensionUri, String(iconPath))).toString(),
			}));
			return [attribute, entries];
		})
	) as Record<Dota2HeroAttribute, Dota2HeroEntry[]>;

	const defaultHero = heroAttributeList
		.flatMap((attribute) => heroes[attribute])
		.find((hero) => hero.name === 'base');
	const fallbackHeroUri = webview.asWebviewUri(
		Uri.joinPath(extensionUri, 'images', 'heroes_icon', 'npc_dota_hero_default_png.png')
	).toString();

	return {
		abilities,
		items: itemEntries,
		heroes,
		defaultHeroUri: defaultHero?.uri ?? fallbackHeroUri,
	};
}

function appendIconEntries(
	webview: vscode.Webview,
	rootUri: Uri,
	iconTable: Table,
	kind: Dota2IconKind,
	source: Dota2IconSource,
	target: Dota2IconEntry[],
	actions: Map<string, IconAction>
): void {
	for (const [name, iconPath] of Object.entries(iconTable)) {
		const key = kind + ':' + source + ':' + name;
		const copyValue = kind === 'item' ? 'item_' + name : name;
		const localizationKey = kind === 'item'
			? 'DOTA_Tooltip_Ability_item_' + name
			: 'DOTA_Tooltip_ability_' + name;
		const localizedNameValue = abilityCN[localizationKey];
		const revealUri = resolveRelativeUri(rootUri, String(iconPath));

		target.push({
			key,
			name,
			copyValue,
			localizedName: typeof localizedNameValue === 'string' ? localizedNameValue : undefined,
			uri: webview.asWebviewUri(revealUri).toString(),
			source,
		});
		actions.set(key, { copyValue, revealUri });
	}
}

function resolveRelativeUri(rootUri: Uri, relativePath: string): Uri {
	const pathSegments = relativePath.split(/[\\/]+/).filter(Boolean);
	return Uri.joinPath(rootUri, ...pathSegments);
}
/** 
 * 获取文件夹中的图标信息
 * @param iconPath 文件夹路径或者文件夹路径数组
 */
async function getFolderIcons(extensionUri: Uri, iconPath: string | string[]) {
	let iconsInfo: Table = {};
	if (typeof (iconPath) === 'string') {
		let data = await readFolder(extensionUri, iconPath);
		iconsInfo = Object.assign(iconsInfo, data);
	} else {
		for (let i = 0; i < iconPath.length; i++) {
			const _path = iconPath[i];
			let data = await readFolder(extensionUri, _path);
			iconsInfo = Object.assign(iconsInfo, data);
		}
	}

	return iconsInfo;
}
async function readFolder(extensionUri: Uri, relativeIconPath: string, currentPath: string = "") {
	let iconsInfo: Table = {};
	let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(Uri.joinPath(extensionUri, relativeIconPath));
	for (let i: number = 0; i < folders.length; i++) {
		const [name, isDirectory] = folders[i];
		if (name === undefined) {
			continue;
		}
		if (isDirectory === vscode.FileType.Directory) {
			let data = await readFolder(extensionUri, path.join(relativeIconPath, name), path.join(currentPath, name));
			iconsInfo = Object.assign(iconsInfo, data);
		} else if (isDirectory === vscode.FileType.File) {
			iconsInfo[path.join(currentPath, name).replace('_png.png', '').replace('.png', '').replace(/\\/g, "/")] = path.join(relativeIconPath, name);
		}
	}
	return iconsInfo;
}
async function readHeroesIcon(extensionUri: Uri, heroesPath: string) {
	let heroesData: Table = {};
	let heroesInfo: Table = await readKeyValue2(await readFile(Uri.joinPath(extensionUri, "/resource/npc/npc_heroes.txt")));
	for (const heroName in heroesInfo.DOTAHeroes) {
		const heroData = heroesInfo.DOTAHeroes[heroName];
		if (heroName !== "Version" && (heroData.Enabled === "1" || heroName === "npc_dota_hero_base")) {
			if (heroesData[heroData.AttributePrimary] === undefined) {
				heroesData[heroData.AttributePrimary] = {};
			}
			heroesData[heroData.AttributePrimary][heroName.replace('npc_dota_hero_', '')] = heroesPath + '/' + heroName + "_png.png";
		}
	}
	return heroesData;
}