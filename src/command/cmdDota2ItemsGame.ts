import * as vscode from 'vscode';
import * as fs from 'fs';
import { fromByteArray } from 'base64-js';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readFile } from '../utils/readFile';
import { readKeyValue2 } from '../utils/kvUtils';
import { hasLocalize, hasReverseLocalize, localize, reverseLocalize } from '../utils/localize';
import { isNumber } from '../utils/isNumber';
import { TextEncoder } from 'util';

let itemsGame: Table;
let language: Table;

enum LangEnum {
	schinese = "zh-cn",
	english = "en"
};

export async function dota2ItemsGameInit(context: vscode.ExtensionContext) {
	itemsGame = JSON.parse(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_game.json")));
	language = {
		[LangEnum.schinese]: readKeyValue2(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_schinese.txt")), false).lang.Tokens,
		[LangEnum.english]: readKeyValue2(await readFile(vscode.Uri.joinPath(context.extensionUri, "resource/items_english.txt")), false).lang.Tokens
	};
}

/**
 * item_game.txt里的饰品查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
export async function dota2ItemsGame(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'dota2ItemsGame', // viewType
		"饰品查询", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
			// enableFindWidget: true
		}
	);
	panel.webview.html = await getWebviewContent(panel.webview, context.extensionUri, 'dota2ItemsGame');

	// 监听消息
	panel.webview.onDidReceiveMessage(async (message: { type: string, text: string, language: string; }) => {
		const type = message.type;
		const text = message.text;
		// 加载资源
		if (itemsGame === undefined) {
			await dota2ItemsGameInit(context);
		}

		switch (type) {
			case "query_item_data":	// 获取物品数据
				let inputResult = validInput(text);
				if (typeof (inputResult) === "string") {
					panel.webview.postMessage({
						type: "query_item_data",
						data: getItemInfo(inputResult),
					});
				} else if (typeof (inputResult) === "object") {
					panel.webview.postMessage({
						type: "query_item_list_data",
						data: inputResult,
					});
				}
				return;
		}
	}, null, context.subscriptions);
}
/** 验证输入的内容是否有效 */
function validInput(text: string) {
	if (isNumber(text)) {
		if (itemsGame[text]) {
			return text;
		}
	} else if (/models.*.vmdl/.test(text)) {
		let index = getIndexByModelName(text) || getIndexByAssetModifierName(text);
		if (index) {
			return index;
		}
	} else if (/particles.*.vpcf/.test(text)) {
		let index = getIndexByAssetModifierName(text);
		if (index) {
			return index;
		}
	} else if ((/npc_dota_hero_/.test(text) && (hasLocalize(text)) || hasLocalize("npc_dota_hero_" + text))) {
		let items = findItemsByHeroName(text);
		let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
		let result = [[localize("index"), localize("item_name"), localize("prefab"), localize("model_player")]];
		for (const index in items) {
			const itemData = items[index];
			result.push([index, languageInfo[itemData.item_name?.replace("#", "")], localize(itemData.prefab), itemData.model_player]);
		}
		return result;
	} else if (hasReverseLocalize(text)) {
		let items = findItemsByHeroName(reverseLocalize(text));
		let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
		let result = [[localize("index"), localize("item_name"), localize("prefab"), localize("model_player")]];
		for (const index in items) {
			const itemData = items[index];
			result.push([index, languageInfo[itemData.item_name?.replace("#", "")], localize(itemData.prefab), itemData.model_player]);
		}
		return result;
	}
	return false;
}

function getItemInfo(index: string) {
	let result: Table = {};
	let itemInfo: Table = itemsGame[index];

	let econPath: string | undefined = vscode.workspace.getConfiguration().get("dota2-tools.A5.econ_path");
	if (econPath != "") {
		// 读取图片文件
		const image = fs.readFileSync(econPath + itemInfo.image_inventory + "_png.png");
		// 将图片转换为Base64编码
		const base64Image = Buffer.from(image).toString('base64');
		result.econImg = base64Image
	}

	let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
	result[localize("index")] = index;
	if (itemInfo.item_name) {
		result[localize("item_name")] = languageInfo[itemInfo.item_name.replace("#", "")];
	}
	if (itemInfo.item_description) {
		result[localize("item_description")] = languageInfo[itemInfo.item_description.replace("#", "")];
	}
	if (itemInfo.used_by_heroes) {
		result[localize("used_by_heroes")] = localize(Object.keys(itemInfo.used_by_heroes)[0]);
	}
	if (itemInfo.prefab) {
		result[localize("prefab")] = localize(itemInfo.prefab);
	}
	if (itemInfo.item_type_name) {
		result[localize("item_type_name")] = languageInfo[itemInfo.item_type_name];
	}
	if (itemInfo.item_slot) {
		result[localize("item_slot")] = localize(`LoadoutSlot_${itemInfo.item_slot}`.toLowerCase());
	}
	if (itemInfo.model_player) {
		result[localize("model_player")] = localize(itemInfo.model_player);
	}
	if (itemInfo.bundle) {
		let bundle: Table = {};
		for (const itemName in itemInfo.bundle) {
			let itemIndex = getIndexByName(itemName);
			let item = getItemByName(itemName);

			if (itemIndex && item) {
				bundle[itemIndex] = languageInfo[item.item_name.replace("#", "")];
			}
		}

		bundle["localize"] = localize("bundle");
		result["bundle"] = bundle;
	}
	let bundleContain = getBundlesByName(itemInfo.name);
	if (Object.keys(bundleContain).length > 0) {
		let bundle: Table = {};
		for (const itemIndex in bundleContain) {
			bundle[itemIndex] = languageInfo[bundleContain[itemIndex].item_name.replace("#", "")];
		}
		bundle["localize"] = localize("bundle_contain");
		result["bundle_contain"] = bundle;
	}
	if (itemInfo.visuals) {
		let visuals: Table = {};
		for (const key in itemInfo.visuals) {
			if (key.match(/asset_modifier/) !== null) {
				const assetModifier = itemInfo.visuals[key];
				visuals[key] = {};
				for (const name in assetModifier) {
					visuals[key][name] = assetModifier[name];
				}
			}
		}
		visuals["localize"] = localize("visuals");
		result["visuals"] = visuals;
	}
	if (itemInfo.price_info) {
		let priceInfo: Table = {};
		for (const key in itemInfo.price_info) {
			priceInfo[key] = itemInfo.price_info[key];
		}
		priceInfo["localize"] = localize("price_info");
		result["price_info"] = priceInfo;
	}
	return result;
}
/** 搜索引 */
function searchIndex(sInput: string) {
	let index = getIndexByModelName(sInput) || getIndexByAssetModifierName(sInput);
	if (index) {
		return index;
	}
	return undefined;
}
// 根据资源modifier索引物品
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

// 根据模型名字索引编号
function getIndexByModelName(sModelName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.model_player === sModelName) {
			return index;
		}
	}
	return undefined;
}
// 根据名字索引编号
function getIndexByName(sName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.name === sName) {
			return index;
		}
	}
	return undefined;
}
// 根据名字索引物品
function getItemByName(sName: string) {
	for (const index in itemsGame) {
		const itemData = itemsGame[index];
		if (itemData.name === sName) {
			return itemData;
		}
	}
	return undefined;
}
// 根据名字索引捆绑包信息
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