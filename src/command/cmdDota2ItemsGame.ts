import * as vscode from 'vscode';
import * as fs from 'fs';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readFile } from '../utils/readFile';
import { readKeyValue2 } from '../utils/kvUtils';
import { hasLocalize, hasReverseLocalize, localize, reverseLocalize } from '../utils/localize';
import { isNumber } from '../utils/isNumber';
import { TextEncoder } from 'util';
import { getExtensionLang } from '../utils/getExtensionLang';
import path = require('path');

let itemsGame: Table;
let language: Table;

enum LangEnum {
	schinese = "zh-cn",
	english = "en"
};

/** Get the wearable query language configured by the user */
function getItemsGameLang(): "zh-cn" | "en" {
	return getExtensionLang();
}

export async function dota2ItemsGameInit(context: vscode.ExtensionContext) {
	itemsGame = JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_game.json")));
	language = {
		[LangEnum.schinese]: readKeyValue2(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_schinese.txt")), false).lang.Tokens,
		[LangEnum.english]: readKeyValue2(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_english.txt")), false).lang.Tokens
	};
}

/** Try to get the base64 encoding of the item icon */
function getItemIconBase64(imageInventory: string | undefined, context: vscode.ExtensionContext): string | undefined {
	if (!imageInventory) {
		return undefined;
	}
	// Prefer reading from the user-configured econ_path
	let econPath: string | undefined = vscode.workspace.getConfiguration().get("dota2-tools.A5.econ_path");
	if (econPath != undefined && econPath !== "") {
		try {
			const image = fs.readFileSync(path.join(econPath, imageInventory + "_png.png"));
			return Buffer.from(image).toString('base64');
		} catch (error) { }
	}
	// Then read from the extension's bundled icons
	try {
		const bundledPath = path.join(context.extensionPath, "images", "econ_items", imageInventory + "_png.png");
		const image = fs.readFileSync(bundledPath);
		return Buffer.from(image).toString('base64');
	} catch (error) { }
	return undefined;
}

/**
 * Wearable query in item_game.txt
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function dota2ItemsGame(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'dota2ItemsGame', // viewType
		localize("dota2tools.items_game"), // View title
		vscode.ViewColumn.One, // Which part of the editor to show in
		{
			enableScripts: true, // Enable JS, disabled by default
			retainContextWhenHidden: true, // Keep state when the webview is hidden, to avoid being reset
		}
	);
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'dota2ItemsGame');

	// Send the currently configured language to the webview
	const uiLang = getItemsGameLang();
	panel.webview.postMessage({ type: "set_language", data: uiLang });

	// Listen for language config changes and update the webview language in real time
	const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('dota2-tools.language')) {
			panel.webview.postMessage({ type: "set_language", data: getItemsGameLang() });
		}
	});
	panel.onDidDispose(() => configListener.dispose());

	// Listen for messages
	panel.webview.onDidReceiveMessage(async (message: { type: string, text: string, language: string; }) => {
		const type = message.type;
		const text = message.text;
		// Load resources
		if (itemsGame === undefined) {
			await dota2ItemsGameInit(context);
		}

		switch (type) {
			case "query_item_data":	// Get item data (search)
			{
				let inputResult = validInput(text, context);
				if (typeof (inputResult) === "string") {
					panel.webview.postMessage({
						type: "query_item_data",
						data: getItemInfo(inputResult, context),
					});
				} else if (typeof (inputResult) === "object") {
					panel.webview.postMessage({
						type: "query_item_list_data",
						data: inputResult,
					});
				}
				return;
			}
			case "query_item_by_id": // Query item directly by ID (clicked from list or navigation jump)
			{
				if (text && itemsGame[text]) {
					panel.webview.postMessage({
						type: "query_item_data",
						data: getItemInfo(text, context),
					});
				}
				return;
			}
		}
	}, null, context.subscriptions);
}

/**
 * Bind the items_game query logic to the unified sidebar webview (same behavior as the panel version above).
 * Returns the list of Disposables to release when switching tabs.
 */
export async function attachItemsGame(webview: vscode.Webview, context: vscode.ExtensionContext): Promise<vscode.Disposable[]> {
	if (itemsGame === undefined) {
		await dota2ItemsGameInit(context);
	}
	const disposables: vscode.Disposable[] = [];

	// Send the currently configured language to the webview
	webview.postMessage({ type: "set_language", data: getItemsGameLang() });

	// Listen for language config changes and update the webview language in real time
	disposables.push(vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('dota2-tools.language')) {
			webview.postMessage({ type: "set_language", data: getItemsGameLang() });
		}
	}));

	disposables.push(webview.onDidReceiveMessage(async (message: { type: string, text: string, language: string; }) => {
		const type = message.type;
		const text = message.text;
		if (itemsGame === undefined) {
			await dota2ItemsGameInit(context);
		}
		switch (type) {
			case "query_item_data": {
				let inputResult = validInput(text, context);
				if (typeof (inputResult) === "string") {
					webview.postMessage({ type: "query_item_data", data: getItemInfo(inputResult, context) });
				} else if (typeof (inputResult) === "object") {
					webview.postMessage({ type: "query_item_list_data", data: inputResult });
				}
				return;
			}
			case "query_item_by_id": {
				if (text && itemsGame[text]) {
					webview.postMessage({ type: "query_item_data", data: getItemInfo(text, context) });
				}
				return;
			}
		}
	}));

	return disposables;
}

/** Validate whether the input content is valid */
function validInput(text: string, context: vscode.ExtensionContext) {
	const lang = getItemsGameLang();

	// Exact ID search
	if (isNumber(text)) {
		if (itemsGame[text]) {
			return text;
		}
	}

	// Model path search
	if (/models.*.vmdl/.test(text)) {
		let index = getIndexByModelName(text) || getIndexByAssetModifierName(text);
		if (index) {
			return index;
		}
	}

	// Particle effect path search
	if (/particles.*.vpcf/.test(text)) {
		let index = getIndexByAssetModifierName(text);
		if (index) {
			return index;
		}
	}

	// Icon path search (econ/)
	if (/econ\//.test(text)) {
		let index = getIndexByImageInventory(text);
		if (index) {
			return index;
		}
	}

	// Hero name search (npc_dota_hero_xxx)
	if ((/npc_dota_hero_/.test(text) && (hasLocalize(text)) || hasLocalize("npc_dota_hero_" + text))) {
		return buildHeroItemList(findItemsByHeroName(text), lang, context);
	}

	// Reverse localization search (Chinese/English hero name -> npc_dota_hero_xxx)
	if (hasReverseLocalize(text)) {
		return buildHeroItemList(findItemsByHeroName(reverseLocalize(text)), lang, context);
	}

	// Search by item name (name field, fuzzy match)
	let nameResults = findItemsByItemName(text);
	if (Object.keys(nameResults).length > 0) {
		return buildHeroItemList(nameResults, lang, context);
	}

	// Search by translated item name (item_name translated value)
	let translatedResults = findItemsByTranslatedName(text, lang);
	if (Object.keys(translatedResults).length > 0) {
		return buildHeroItemList(translatedResults, lang, context);
	}

	// Search by particle/model/asset (fuzzy)
	let assetResults = findItemsByAssetModifier(text);
	if (Object.keys(assetResults).length > 0) {
		return buildHeroItemList(assetResults, lang, context);
	}

	// Combined search: hero name + item keyword (e.g. "crystal maiden weapon")
	let combinedResult = tryCombinedHeroItemSearch(text, lang, context);
	if (combinedResult) {
		return combinedResult;
	}

	return false;
}

/**
 * Try to split the input text into all possible combinations of (heroQuery, itemQuery).
 * For each split, check whether heroQuery corresponds to a hero, then filter items by itemQuery.
 */
function tryCombinedHeroItemSearch(text: string, lang: "zh-cn" | "en", context: vscode.ExtensionContext): string[][] | false {
	const words = text.trim().split(/\s+/);
	if (words.length < 2) {
		return false;
	}

	const languageInfo = language[lang];

	// Try each split point: words[0..i] = hero part, words[i+1..] = item part
	for (let i = 0; i < words.length - 1; i++) {
		const heroPart = words.slice(0, i + 1).join(" ");
		const itemPart = words.slice(i + 1).join(" ").toLowerCase();

		let heroKey: string | undefined;

		// Check whether heroPart is a known hero name (npc_dota_hero_xxx)
		if (hasLocalize(heroPart)) {
			heroKey = heroPart;
		} else if (hasLocalize("npc_dota_hero_" + heroPart.replace(/\s+/g, "_"))) {
			heroKey = "npc_dota_hero_" + heroPart.replace(/\s+/g, "_");
		} else if (hasReverseLocalize(heroPart)) {
			heroKey = reverseLocalize(heroPart);
		}

		if (!heroKey) {
			continue;
		}

		// Found the hero - get all items for that hero, filter by itemPart
		const heroItems = findItemsByHeroName(heroKey);
		if (Object.keys(heroItems).length === 0) {
			continue;
		}

		// Filter hero items by item keyword
		const filtered: Table = {};
		for (const index in heroItems) {
			const itemData = heroItems[index];
			const translatedName = itemData.item_name
				? (languageInfo[itemData.item_name.replace("#", "")] || "").toLowerCase()
				: "";
			const internalName = (itemData.name || "").toLowerCase();

			if (translatedName.indexOf(itemPart) !== -1 || internalName.indexOf(itemPart) !== -1) {
				filtered[index] = itemData;
			}
		}

		if (Object.keys(filtered).length > 0) {
			return buildHeroItemList(filtered, lang, context);
		}
	}

	return false;
}

/** Build the hero item list (search result list) */
function buildHeroItemList(items: Table, lang: "zh-cn" | "en", context: vscode.ExtensionContext): string[][] {
	let languageInfo = language[lang];
	let result: string[][] = [[localize("icon", undefined, lang), localize("index", undefined, lang), localize("item_name", undefined, lang), localize("item_slot", undefined, lang), localize("prefab", undefined, lang), localize("model_player", undefined, lang)]];
	let rows: string[][] = [];
	for (const index in items) {
		const itemData = items[index];
		const iconBase64 = getItemIconBase64(itemData.image_inventory, context);
		const iconCell = iconBase64 ? `<img src="data:image/png;base64,${iconBase64}" class="list-icon" />` : "";
		const itemSlotKey = itemData.item_slot ? `loadoutslot_${itemData.item_slot}`.toLowerCase() : "";
		rows.push([
			iconCell,
			index,
			languageInfo[itemData.item_name?.replace("#", "")] || itemData.name || "",
			itemSlotKey ? (localize(itemSlotKey, undefined, lang) || itemData.item_slot || "") : "",
			localize(itemData.prefab, undefined, lang) || "",
			itemData.model_player || ""
		]);
	}
	// Sort by equipment slot, then by prefab, then by index
	rows.sort((a, b) => {
		const slotCmp = (a[3] || "").localeCompare(b[3] || "");
		if (slotCmp !== 0) { return slotCmp; }
		const prefabCmp = (a[4] || "").localeCompare(b[4] || "");
		if (prefabCmp !== 0) { return prefabCmp; }
		return parseInt(a[1]) - parseInt(b[1]);
	});
	result.push(...rows);
	return result;
}

function getItemInfo(index: string, context: vscode.ExtensionContext) {
	let result: Table = {};
	let itemInfo: Table = itemsGame[index];
	const lang = getItemsGameLang();

	// Item icon
	const iconBase64 = getItemIconBase64(itemInfo.image_inventory, context);
	if (iconBase64) {
		result.econImg = iconBase64;
	}

	let languageInfo = language[lang];
	result[localize("index", undefined, lang)] = index;
	if (itemInfo.name) {
		result[localize("internal_name", undefined, lang)] = itemInfo.name;
	}
	if (itemInfo.item_name) {
		result[localize("item_name", undefined, lang)] = languageInfo[itemInfo.item_name.replace("#", "")];
	}
	if (itemInfo.item_description) {
		result[localize("item_description", undefined, lang)] = languageInfo[itemInfo.item_description.replace("#", "")];
	}
	if (itemInfo.used_by_heroes) {
		result[localize("used_by_heroes", undefined, lang)] = localize(Object.keys(itemInfo.used_by_heroes)[0], undefined, lang);
	}
	if (itemInfo.prefab) {
		result[localize("prefab", undefined, lang)] = localize(itemInfo.prefab, undefined, lang);
	}
	if (itemInfo.item_type_name) {
		result[localize("item_type_name", undefined, lang)] = languageInfo[itemInfo.item_type_name];
	}
	if (itemInfo.item_slot) {
		result[localize("item_slot", undefined, lang)] = localize(`LoadoutSlot_${itemInfo.item_slot}`.toLowerCase(), undefined, lang);
	}
	if (itemInfo.model_player) {
		result[localize("model_player", undefined, lang)] = itemInfo.model_player;
	}
	if (itemInfo.image_inventory) {
		result[localize("image_inventory", undefined, lang)] = itemInfo.image_inventory;
	}
	if (itemInfo.bundle) {
		let bundle: Table = {};
		for (const itemName in itemInfo.bundle) {
			let itemIndex = getIndexByName(itemName);
			let item = getItemByName(itemName);

			if (itemIndex && item) {
				const bundleIconBase64 = getItemIconBase64(item.image_inventory, context);
				bundle[itemIndex] = {
					name: languageInfo[item.item_name?.replace("#", "")] || itemName,
					icon: bundleIconBase64 || ""
				};
			}
		}

		bundle["localize"] = localize("bundle", undefined, lang);
		result["bundle"] = bundle;
	}
	let bundleContain = getBundlesByName(itemInfo.name);
	if (Object.keys(bundleContain).length > 0) {
		let bundle: Table = {};
		for (const itemIndex in bundleContain) {
			const bundleIconBase64 = getItemIconBase64(bundleContain[itemIndex].image_inventory, context);
			bundle[itemIndex] = {
				name: languageInfo[bundleContain[itemIndex].item_name?.replace("#", "")] || "",
				icon: bundleIconBase64 || ""
			};
		}
		bundle["localize"] = localize("bundle_contain", undefined, lang);
		result["bundle_contain"] = bundle;
	}
	if (itemInfo.visuals) {
		let visuals: Table[] = [];
		for (const key in itemInfo.visuals) {
			if (key.match(/asset_modifier/) !== null) {
				const assetModifier = itemInfo.visuals[key];
				let row: Table = { _key: key };
				for (const name in assetModifier) {
					row[name] = assetModifier[name];
				}
				visuals.push(row);
			}
		}
		result["visuals"] = {
			localize: localize("visuals", undefined, lang),
			rows: visuals
		};
	}
	if (itemInfo.price_info) {
		let priceInfo: Table = {};
		for (const key in itemInfo.price_info) {
			priceInfo[key] = itemInfo.price_info[key];
		}
		priceInfo["localize"] = localize("price_info", undefined, lang);
		result["price_info"] = priceInfo;
	}
	return result;
}

// Index items by image_inventory
function getIndexByImageInventory(sImageInventory: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.image_inventory === sImageInventory) {
			return index;
		}
	}
	return undefined;
}

// Fuzzy search by item name (name field)
function findItemsByItemName(text: string): Table {
	let itemList: Table = {};
	const lowerText = text.toLowerCase();
	let count = 0;
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.name && itemData.name.toLowerCase().indexOf(lowerText) !== -1) {
			itemList[index] = itemData;
			count++;
			if (count >= 200) { break; }
		}
	}
	return itemList;
}

// Search by translated item name
function findItemsByTranslatedName(text: string, lang: "zh-cn" | "en"): Table {
	let itemList: Table = {};
	const lowerText = text.toLowerCase();
	const languageInfo = language[lang];
	let count = 0;
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.item_name) {
			const translatedName = languageInfo[itemData.item_name.replace("#", "")];
			if (translatedName && translatedName.toLowerCase().indexOf(lowerText) !== -1) {
				itemList[index] = itemData;
				count++;
				if (count >= 200) { break; }
			}
		}
	}
	return itemList;
}

// Fuzzy search by asset modifier (particle/model/asset path)
function findItemsByAssetModifier(text: string): Table {
	let itemList: Table = {};
	const lowerText = text.toLowerCase();
	let count = 0;
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.visuals) {
			for (const modifierIndex in itemData.visuals) {
				const mod = itemData.visuals[modifierIndex];
				if (typeof mod === "object") {
					const modifier = mod.modifier || mod.asset || "";
					if (modifier.toLowerCase().indexOf(lowerText) !== -1) {
						itemList[index] = itemData;
						count++;
						break;
					}
				}
			}
		}
		if (count >= 200) { break; }
	}
	return itemList;
}

// Index items by asset modifier
function getIndexByAssetModifierName(sModifierName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.visuals) {
			for (const modifierIndex in itemData.visuals) {
				if (itemData.visuals[modifierIndex].modifier === sModifierName) {
					return index;
				}
			}
		}
	}
	return undefined;
}

// Index by model name
function getIndexByModelName(sModelName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.model_player === sModelName) {
			return index;
		}
	}
	return undefined;
}
// Index by name
function getIndexByName(sName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.name === sName) {
			return index;
		}
	}
	return undefined;
}
// Index items by name
function getItemByName(sName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.name === sName) {
			return itemData;
		}
	}
	return undefined;
}
// Index bundle info by name
function getBundlesByName(sName: string) {
	let bundles: Table = {};
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.bundle !== undefined) {
			for (const bundleItemName in itemData.bundle) {
				if (bundleItemName === sName) {
					bundles[index] = itemData;
				}
			}
		}
	}
	return bundles;
}
function findItemsByHeroName(sHeroName: string) {
	let itemList: Table = {};
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.used_by_heroes !== undefined) {
			for (const heroName in itemData.used_by_heroes) {
				if (heroName === sHeroName || heroName.search(new RegExp(sHeroName, 'i')) !== -1) {
					itemList[index] = itemData;
				}
			}
		}
	}
	return itemList;
}