import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import { ContentDir, GameDir } from '../init';
import { GetStat, GetVscodeResourceUri, GetWebViewContent } from '../util';

/**
 * 技能与物品图标的查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function AbilityTextureBrowser(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'SelectAbilityTexture', // viewType
		"Select Ability Texture", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);
	// 读取技能图标数据
	const path_list: any = {
		spellicons: context.extensionPath + '/images/spellicons',
		items: context.extensionPath + '/images/items',
		heroes: context.extensionPath + '/images/heroes_icon',
		custom_spellicons: vscode.workspace.getConfiguration().get('dota2-tools.Custom Spellicons Path'),
		custom_items: vscode.workspace.getConfiguration().get('dota2-tools.Custom Items Path'),
	};
	interface IconsData {
		[key: string]: {
			path: string | string[] | undefined | vscode.Uri,
			data: {} | [];
		} | IconsData[];
	}
	let custom_spellicons: any = [{}];
	let custom_items: any = [];
	for (const key in path_list.custom_spellicons) {
		const icon_path: string = (key === 'content' ? ContentDir : GameDir) + path_list.custom_spellicons[key];
		if (await GetStat(icon_path) !== false) {
			custom_spellicons.push({
				path: GetVscodeResourceUri(icon_path),
				data: await ReadIconFolder(icon_path, icon_path)
			});
		}
	}
	for (const key in path_list.custom_items) {
		const icon_path: string = (key === 'content' ? ContentDir : GameDir) + path_list.custom_items[key];
		if (await GetStat(icon_path) !== false) {
			custom_items.push({
				path: GetVscodeResourceUri(icon_path),
				data: await ReadIconFolder(icon_path, icon_path)
			});
		}
	}
	let icons_data: IconsData = {
		spellicons: {
			// path: GetVscodeResourceUri(path_list.spellicons),
			path: panel.webview.asWebviewUri(path_list.spellicons).toString(),
			data: await ReadIconFolder(path_list.spellicons, path_list.spellicons)
		},
		items: {
			path: GetVscodeResourceUri(path_list.items),
			data: await ReadIconFolder(path_list.items, path_list.items)
		},
		heroes: {
			path: GetVscodeResourceUri(path_list.heroes),
			data: await ReadHeroesIcon(path_list.heroes)
		},
		custom_spellicons: custom_spellicons,
		custom_items: custom_items,
	};
	// 读取英雄头像数据
	async function ReadHeroesIcon(heroes_path: string) {
		let heroes_data: any = {};
		let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(heroes_path));
		for (let i: number = 0; i < folders.length; i++) {
			const [name, is_directory] = folders[i];
			if (name === undefined) {
				continue;
			}
			if (Number(is_directory) === vscode.FileType.File) {
				let wb = panel.webview.asWebviewUri(vscode.Uri.file(heroes_path + '/' + name));
				heroes_data[name.replace('_png.png', '').replace('npc_dota_hero_', '')] = vscode.Uri.file(wb.path).with({ scheme: wb.scheme, authority: wb.authority }).toString();
			}
		}
		return heroes_data;
	}
	async function ReadIconFolder(path: string | [], root_path: string | []) {
		let icons_data: any = {};
		async function ReadFolder(path: string, root_path: string) {
			let icons_data: any = {};
			let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
			for (let i: number = 0; i < folders.length; i++) {
				const [name, is_directory] = folders[i];
				if (name === undefined) {
					continue;
				}
				if (Number(is_directory) === vscode.FileType.Directory) {
					let data = await ReadFolder(path + '/' + name, root_path);
					icons_data = Object.assign(icons_data, data);
				} else if (Number(is_directory) === vscode.FileType.File) {
					// icons_data[name.replace('_png.png','')] = name;
					let texture_name = (path + '/' + name).split(root_path)[1];
					texture_name = texture_name.replace('/', '');
					let wb = panel.webview.asWebviewUri(vscode.Uri.file(path + '/' + name));
					icons_data[texture_name.replace('_png.png', '').replace('.png', '')] = vscode.Uri.file(wb.path).with({ scheme: wb.scheme, authority: wb.authority }).toString();
				}
			}
			return icons_data;
		}
		if (typeof (path) === 'string' && typeof (root_path) === 'string') {
			let data = await ReadFolder(path, root_path);
			icons_data = Object.assign(icons_data, data);
		} else {
			for (let i = 0; i < path.length; i++) {
				const _path = path[i];
				let data = await ReadFolder(_path, root_path[i]);
				icons_data = Object.assign(icons_data, data);
			}
		}
		return icons_data;
	}

	panel.webview.html = GetWebViewContent(context, 'webview/TextureBrowser/TextureBrowser.html');

	panel.webview.postMessage({
		type: "update",
		icons_data: icons_data,
	});
	panel.webview.onDidReceiveMessage(message => {
		// console.log(message);
		if (message.event === "click") {
			let texture: string = message.id.replace(/_png\.png/, '');
			vscode.env.clipboard.writeText(texture);
			vscode.window.setStatusBarMessage('已将图标路径复制到剪切板：' + texture);
		} else if (message.event === "contextmenu") {
			let fullpath = path.join(context.extensionPath, 'images', message.type, message.id);
			exec(`explorer.exe /select,"${fullpath}_png.png"`);
		}
		// panel.dispose();
	}, undefined, context.subscriptions);
}