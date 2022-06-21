import * as vscode from 'vscode';
import { Uri, Webview } from "vscode";
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { getUri } from '../utils/getUri';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readKeyValue2 } from '../utils/kvUtils';
import { readFile } from '../utils/readFile';
import { showStatusBarMessage } from '../module/statusBar';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { getPathInfo } from '../utils/pathUtils';

let spellicons: Table;
let items: Table;
let npcHeroes: Table;
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
	spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	items = await getFolderIcons(context.extensionUri, "/images/items");
	npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");

	// 自定义图标
	await locdCustomSpellicons();
	await locdCustomItems();
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
	// 创建一个Webview视图
	const panel = vscode.window.createWebviewPanel(
		'dota2IconPanel', // viewType
		"Dota2图标", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);

	// 防止数据为空
	if (spellicons === undefined) {
		spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
	}
	if (items === undefined) {
		items = await getFolderIcons(context.extensionUri, "/images/items");
	}
	if (npcHeroes === undefined) {
		npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
	}

	// 自定义图标
	if (customSpellicons === undefined) {
		locdCustomSpellicons();
	}
	if (customItems === undefined) {
		locdCustomItems();
	}

	// 页面内容
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, "dota2Icon", html => {
		let replaceText = "";
		// 英雄图标
		for (const attributeType in npcHeroes) {
			replaceText = "";
			for (const heroName in npcHeroes[attributeType]) {
				replaceText += `\t\t\t\t\t\t<img class="hero-icon" src="../../${npcHeroes[attributeType][heroName]}" onclick="heroFilter(this,'${heroName}')">\n`;
			}
			html = html.replace("<div>__replace__</div>", replaceText);
		}
		// 技能图标
		replaceText = "";
		for (const iconName in spellicons) {
			const iconPath = spellicons[iconName];
			replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="../../${iconPath}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
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

		// 物品图标
		replaceText = "";
		for (const iconName in items) {
			const iconPath = items[iconName];
			replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="../../${iconPath}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('items/${iconName}')">\n`;
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

	// 监听消息
	panel.webview.onDidReceiveMessage(async (message: { type: string, text: string; }) => {
		console.log(message);

		const type = message.type;
		const text = message.text;

		switch (type) {
			case "copy_ability_name":	// 复制技能名
				let texture: string = text.replace(/_png\.png/, '').replace(/\\/g, "/");
				vscode.env.clipboard.writeText(texture);
				showStatusBarMessage('已将图标路径复制到剪切板：' + texture);
				return;
			case "copy_ability_file":	// 复制文件
				let fullpath = path.join(context.extensionPath, 'images', text);
				exec(`explorer.exe /select,"${fullpath}_png.png"`);
				return;
		}
	}, null, context.subscriptions);
	// 销毁处理
	panel.onDidDispose(() => {

	}, null, context.subscriptions);
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