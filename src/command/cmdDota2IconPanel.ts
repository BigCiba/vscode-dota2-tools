import * as vscode from 'vscode';
import * as fs from 'fs';
import { Uri } from "vscode";
import * as path from 'path';
import { exec } from 'child_process';
import { getUri } from '../utils/getUri';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readKeyValue2 } from '../utils/kvUtils';
import { readFile } from '../utils/readFile';
import { showStatusBarMessage } from '../module/statusBar';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { getPathInfo } from '../utils/pathUtils';
import { localize } from '../utils/localize';
import { kvEditorProvider } from '../CustomTextEditorProvider/kvEditorProvider';

let spellicons: Table;
let items: Table;
let npcHeroes: Table;
let abilityCN: Table;
interface CustomIcon {
	game: Table,
	content: Table,
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
	await loadIconData(context);

	// Custom icons
	await locdCustomSpellicons();
	await locdCustomItems();

	// Watch images directory for changes (e.g. after extract-images.js runs)
	const imagesDir = path.join(context.extensionPath, 'images');
	try {
		if (!fs.existsSync(imagesDir)) {
			fs.mkdirSync(imagesDir, { recursive: true });
		}
		const watcher = fs.watch(imagesDir, { recursive: true }, debounce(async () => {
			await loadIconData(context);
			kvEditorProvider.clearImageCaches();
		}, 3000));
		context.subscriptions.push({ dispose: () => watcher.close() });
	} catch {
		// ignore watcher failures
	}

	// Check if bundled icons are missing
	if (Object.keys(spellicons).length === 0 && Object.keys(items).length === 0) {
		const scriptPath = path.join(context.extensionPath, 'scripts', 'extract-images.js');
		const runExtract = localize('msg_run_extract_icons');
		const openDocs = localize('msg_open_extract_docs');
		vscode.window.showWarningMessage(
			localize('msg_icons_missing'),
			runExtract,
			openDocs,
		).then((choice) => {
			if (choice === runExtract) {
				const terminal = vscode.window.createTerminal('Extract Icons');
				terminal.show();
				terminal.sendText(`node "${scriptPath}"`);
			} else if (choice === openDocs) {
				vscode.env.openExternal(vscode.Uri.parse('https://github.com/iwasinminedream/vscode-dota2-tools#icon-extraction'));
			}
		});
	}
}

async function loadIconData(context: vscode.ExtensionContext) {
	spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	items = await getFolderIcons(context.extensionUri, "/images/items");
	npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
	abilityCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/abilities_schinese.txt"), 'utf-8'), false).lang.Tokens;
}

function debounce(fn: (...args: any[]) => void, ms: number) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return (...args: any[]) => {
		if (timer) { clearTimeout(timer); }
		timer = setTimeout(() => { timer = undefined; fn(...args); }, ms);
	};
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
 * Query of ability and item icons
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function dota2IconPanel(context: vscode.ExtensionContext) {
	// Create a Webview view
	const panel = vscode.window.createWebviewPanel(
		'dota2IconPanel', // viewType
		localize('panel_dota2_icons'), // View title
		vscode.ViewColumn.One, // Which part of the editor to show in
		{
			enableScripts: true, // Enable JS, disabled by default
			retainContextWhenHidden: true, // Keep state when the webview is hidden, to avoid being reset
		}
	);

	// Prevent empty data
	if (spellicons === undefined) {
		spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	}
	if (items === undefined) {
		items = await getFolderIcons(context.extensionUri, "/images/items");
	}
	if (npcHeroes === undefined) {
		npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
	}
	if (abilityCN === undefined) {
		abilityCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/abilities_schinese.txt"), 'utf-8'), false).lang.Tokens;
	}

	// Custom icons
	if (customSpellicons === undefined) {
		locdCustomSpellicons();
	}
	if (customItems === undefined) {
		locdCustomItems();
	}

	// Page content
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, "dota2Icon", html => {
		// Ability icons
		let replaceText = "";
		for (const iconName in spellicons) {
			const iconPath = spellicons[iconName];
			replaceText += `\t\t<img id="${iconName}" data-abilityName="${abilityCN["DOTA_Tooltip_ability_" + iconName]}" class="icon texture-icon" src="../../${iconPath}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
		}
		if (Object.keys(customSpellicons.game).length > 0) {
			let gameDir = getGameDir();
			for (const iconName in customSpellicons.game) {
				const iconPath = customSpellicons.game[iconName];
				const src = getUri(panel.webview, vscode.Uri.file(gameDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="${src}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		if (Object.keys(customSpellicons.content).length > 0) {
			let contentDir = getContentDir();
			for (const iconName in customSpellicons.content) {
				const iconPath = customSpellicons.content[iconName];
				const src = getUri(panel.webview, vscode.Uri.file(contentDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="${src}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		html = html.replace("<div>__replace__</div>", replaceText);

		// Item icons
		replaceText = "";
		for (const iconName in items) {
			const iconPath = items[iconName];
			replaceText += `\t\t<img id="${iconName}" data-abilityName="${abilityCN["DOTA_Tooltip_Ability_item_" + iconName]}" class="icon item-texture-icon" src="../../${iconPath}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('items/${iconName}')">\n`;
		}
		if (Object.keys(customItems.game).length > 0) {
			let gameDir = getGameDir();
			for (const iconName in customItems.game) {
				const iconPath = customItems.game[iconName];
				const src = getUri(panel.webview, vscode.Uri.file(gameDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		if (Object.keys(customItems.content).length > 0) {
			let contentDir = getContentDir();
			for (const iconName in customItems.content) {
				const iconPath = customItems.content[iconName];
				const src = getUri(panel.webview, vscode.Uri.file(contentDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		html = html.replace("<div>__replace__</div>", replaceText);
		return html;
	});

	// Listen for messages
	panel.webview.onDidReceiveMessage(async (message: { type: string, text: string; }) => {
		console.log(message);

		const type = message.type;
		const text = message.text;

		switch (type) {
			case "copy_ability_name":	// Copy ability name
				let texture: string = text.replace(/_png\.png/, '').replace(/\\/g, "/");
				vscode.env.clipboard.writeText(texture);
				showStatusBarMessage(localize('msg_icon_copied', [texture]));
				return;
			case "copy_ability_file":	// Copy file
				let fullpath = path.join(context.extensionPath, 'images', text);
				exec(`explorer.exe /select,"${fullpath}_png.png"`);
				return;
		}
	}, null, context.subscriptions);
	// Dispose handling
	panel.onDidDispose(() => {

	}, null, context.subscriptions);
}
/** Ensure icon data is loaded (called before rendering the unified sidebar) */
export async function ensureIconData(context: vscode.ExtensionContext) {
	if (spellicons === undefined) {
		spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	}
	if (items === undefined) {
		items = await getFolderIcons(context.extensionUri, "/images/items");
	}
	if (npcHeroes === undefined) {
		npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
	}
	if (abilityCN === undefined) {
		abilityCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/abilities_schinese.txt"), 'utf-8'), false).lang.Tokens;
	}
	if (Object.keys(customSpellicons.game).length === 0 && Object.keys(customSpellicons.content).length === 0) {
		await locdCustomSpellicons();
	}
	if (Object.keys(customItems.game).length === 0 && Object.keys(customItems.content).length === 0) {
		await locdCustomItems();
	}
}

/** Build the HTML pre-processing function for the dota2Icon webview (same as the panel version, only the webview is parameterized) */
export function buildIconsPreProcess(webview: vscode.Webview): (html: string) => string {
	return (html) => {
		// Ability icons
		let replaceText = "";
		for (const iconName in spellicons) {
			const iconPath = spellicons[iconName];
			replaceText += `\t\t<img id="${iconName}" data-abilityName="${abilityCN["DOTA_Tooltip_ability_" + iconName]}" class="icon texture-icon" src="../../${iconPath}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
		}
		if (Object.keys(customSpellicons.game).length > 0) {
			let gameDir = getGameDir();
			for (const iconName in customSpellicons.game) {
				const iconPath = customSpellicons.game[iconName];
				const src = getUri(webview, vscode.Uri.file(gameDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="${src}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		if (Object.keys(customSpellicons.content).length > 0) {
			let contentDir = getContentDir();
			for (const iconName in customSpellicons.content) {
				const iconPath = customSpellicons.content[iconName];
				const src = getUri(webview, vscode.Uri.file(contentDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="${src}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		html = html.replace("<div>__replace__</div>", replaceText);

		// Item icons
		replaceText = "";
		for (const iconName in items) {
			const iconPath = items[iconName];
			replaceText += `\t\t<img id="${iconName}" data-abilityName="${abilityCN["DOTA_Tooltip_Ability_item_" + iconName]}" class="icon item-texture-icon" src="../../${iconPath}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('items/${iconName}')">\n`;
		}
		if (Object.keys(customItems.game).length > 0) {
			let gameDir = getGameDir();
			for (const iconName in customItems.game) {
				const iconPath = customItems.game[iconName];
				const src = getUri(webview, vscode.Uri.file(gameDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		if (Object.keys(customItems.content).length > 0) {
			let contentDir = getContentDir();
			for (const iconName in customItems.content) {
				const iconPath = customItems.content[iconName];
				const src = getUri(webview, vscode.Uri.file(contentDir), [iconPath]);
				replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
			}
		}
		html = html.replace("<div>__replace__</div>", replaceText);
		return html;
	};
}

/** Bind the icon query message handler to the unified sidebar webview, returns a list of Disposables */
export function attachIcons(webview: vscode.Webview, context: vscode.ExtensionContext): vscode.Disposable[] {
	return [
		webview.onDidReceiveMessage(async (message: { type: string, text: string; }) => {
			const type = message.type;
			const text = message.text;
			switch (type) {
				case "copy_ability_name": {
					let texture: string = text.replace(/_png\.png/, '').replace(/\\/g, "/");
					vscode.env.clipboard.writeText(texture);
					showStatusBarMessage(localize('msg_icon_copied', [texture]));
					return;
				}
				case "copy_ability_file": {
					let fullpath = path.join(context.extensionPath, 'images', text);
					exec(`explorer.exe /select,"${fullpath}_png.png"`);
					return;
				}
			}
		}),
	];
}

/**
 * Get the icon info from a folder
 * @param iconPath folder path or array of folder paths
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
	let folders: [string, vscode.FileType][];
	try {
		folders = await vscode.workspace.fs.readDirectory(Uri.joinPath(extensionUri, relativeIconPath));
	} catch {
		return iconsInfo;
	}
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