"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dota2ItemsGame = exports.dota2ItemsGameInit = void 0;
const vscode = require("vscode");
const getWebViewContent_1 = require("../utils/getWebViewContent");
const readFile_1 = require("../utils/readFile");
const kvUtils_1 = require("../utils/kvUtils");
const localize_1 = require("../utils/localize");
const isNumber_1 = require("../utils/isNumber");
let itemsGame;
let language;
var LangEnum;
(function (LangEnum) {
    LangEnum["schinese"] = "zh-cn";
    LangEnum["english"] = "en";
})(LangEnum || (LangEnum = {}));
;
async function dota2ItemsGameInit(context) {
    itemsGame = JSON.parse(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "resource/items_game.json")));
    language = {
        [LangEnum.schinese]: (0, kvUtils_1.readKeyValue2)(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "resource/items_schinese.txt")), false).lang.Tokens,
        [LangEnum.english]: (0, kvUtils_1.readKeyValue2)(await (0, readFile_1.readFile)(vscode.Uri.joinPath(context.extensionUri, "resource/items_english.txt")), false).lang.Tokens
    };
}
exports.dota2ItemsGameInit = dota2ItemsGameInit;
/**
 * item_game.txt里的饰品查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
async function dota2ItemsGame(context) {
    const panel = vscode.window.createWebviewPanel('dota2ItemsGame', // viewType
    "饰品查询", // 视图标题
    vscode.ViewColumn.One, // 显示在编辑器的哪个部位
    {
        enableScripts: true,
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        // enableFindWidget: true
    });
    panel.webview.html = await (0, getWebViewContent_1.getWebviewContent)(panel.webview, context.extensionUri, 'dota2ItemsGame');
    // 监听消息
    panel.webview.onDidReceiveMessage(async (message) => {
        const type = message.type;
        const text = message.text;
        // 加载资源
        if (itemsGame === undefined) {
            await dota2ItemsGameInit(context);
        }
        switch (type) {
            case "query_item_data": // 获取物品数据
                let inputResult = validInput(text);
                if (typeof (inputResult) === "string") {
                    panel.webview.postMessage({
                        type: "query_item_data",
                        data: getItemInfo(inputResult),
                    });
                }
                else if (typeof (inputResult) === "object") {
                    panel.webview.postMessage({
                        type: "query_item_list_data",
                        data: inputResult,
                    });
                }
                return;
        }
    }, null, context.subscriptions);
}
exports.dota2ItemsGame = dota2ItemsGame;
/** 验证输入的内容是否有效 */
function validInput(text) {
    if ((0, isNumber_1.isNumber)(text)) {
        if (itemsGame[text]) {
            return text;
        }
    }
    else if (/models.*.vmdl/.test(text)) {
        let index = getIndexByModelName(text) || getIndexByAssetModifierName(text);
        if (index) {
            return index;
        }
    }
    else if (/particles.*.vpcf/.test(text)) {
        let index = getIndexByAssetModifierName(text);
        if (index) {
            return index;
        }
    }
    else if ((/npc_dota_hero_/.test(text) && ((0, localize_1.hasLocalize)(text)) || (0, localize_1.hasLocalize)("npc_dota_hero_" + text))) {
        let items = findItemsByHeroName(text);
        let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
        let result = [[(0, localize_1.localize)("index"), (0, localize_1.localize)("item_name"), (0, localize_1.localize)("prefab"), (0, localize_1.localize)("model_player")]];
        for (const index in items) {
            const itemData = items[index];
            result.push([index, languageInfo[itemData.item_name?.replace("#", "")], (0, localize_1.localize)(itemData.prefab), itemData.model_player]);
        }
        return result;
    }
    else if ((0, localize_1.hasReverseLocalize)(text)) {
        let items = findItemsByHeroName((0, localize_1.reverseLocalize)(text));
        let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
        let result = [[(0, localize_1.localize)("index"), (0, localize_1.localize)("item_name"), (0, localize_1.localize)("prefab"), (0, localize_1.localize)("model_player")]];
        for (const index in items) {
            const itemData = items[index];
            result.push([index, languageInfo[itemData.item_name?.replace("#", "")], (0, localize_1.localize)(itemData.prefab), itemData.model_player]);
        }
        return result;
    }
    return false;
}
function getItemInfo(index) {
    let result = {};
    let itemInfo = itemsGame[index];
    let languageInfo = language[vscode.env.language === "zh-cn" ? "zh-cn" : "en"];
    result[(0, localize_1.localize)("index")] = index;
    if (itemInfo.item_name) {
        result[(0, localize_1.localize)("item_name")] = languageInfo[itemInfo.item_name.replace("#", "")];
    }
    if (itemInfo.item_description) {
        result[(0, localize_1.localize)("item_description")] = languageInfo[itemInfo.item_description.replace("#", "")];
    }
    if (itemInfo.used_by_heroes) {
        result[(0, localize_1.localize)("used_by_heroes")] = (0, localize_1.localize)(Object.keys(itemInfo.used_by_heroes)[0]);
    }
    if (itemInfo.prefab) {
        result[(0, localize_1.localize)("prefab")] = (0, localize_1.localize)(itemInfo.prefab);
    }
    if (itemInfo.item_type_name) {
        result[(0, localize_1.localize)("item_type_name")] = languageInfo[itemInfo.item_type_name];
    }
    if (itemInfo.item_slot) {
        result[(0, localize_1.localize)("item_slot")] = (0, localize_1.localize)(`LoadoutSlot_${itemInfo.item_slot}`.toLowerCase());
    }
    if (itemInfo.model_player) {
        result[(0, localize_1.localize)("model_player")] = (0, localize_1.localize)(itemInfo.model_player);
    }
    if (itemInfo.bundle) {
        let bundle = {};
        for (const itemName in itemInfo.bundle) {
            let itemIndex = getIndexByName(itemName);
            let item = getItemByName(itemName);
            if (itemIndex && item) {
                bundle[itemIndex] = languageInfo[item.item_name.replace("#", "")];
            }
        }
        bundle["localize"] = (0, localize_1.localize)("bundle");
        result["bundle"] = bundle;
    }
    let bundleContain = getBundlesByName(itemInfo.name);
    if (Object.keys(bundleContain).length > 0) {
        let bundle = {};
        for (const itemIndex in bundleContain) {
            bundle[itemIndex] = languageInfo[bundleContain[itemIndex].item_name.replace("#", "")];
        }
        bundle["localize"] = (0, localize_1.localize)("bundle_contain");
        result["bundle_contain"] = bundle;
    }
    if (itemInfo.visuals) {
        let visuals = {};
        for (const key in itemInfo.visuals) {
            if (key.match(/asset_modifier/) !== null) {
                const assetModifier = itemInfo.visuals[key];
                visuals[key] = {};
                for (const name in assetModifier) {
                    visuals[key][name] = assetModifier[name];
                }
            }
        }
        visuals["localize"] = (0, localize_1.localize)("visuals");
        result["visuals"] = visuals;
    }
    if (itemInfo.price_info) {
        let priceInfo = {};
        for (const key in itemInfo.price_info) {
            priceInfo[key] = itemInfo.price_info[key];
        }
        priceInfo["localize"] = (0, localize_1.localize)("price_info");
        result["price_info"] = priceInfo;
    }
    return result;
}
/** 搜索引 */
function searchIndex(sInput) {
    let index = getIndexByModelName(sInput) || getIndexByAssetModifierName(sInput);
    if (index) {
        return index;
    }
    return undefined;
}
// 根据资源modifier索引物品
function getIndexByAssetModifierName(sModifierName) {
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
function getIndexByModelName(sModelName) {
    for (const index in itemsGame) {
        const itemData = itemsGame[index];
        if (itemData.model_player === sModelName) {
            return index;
        }
    }
    return undefined;
}
// 根据名字索引编号
function getIndexByName(sName) {
    for (const index in itemsGame) {
        const itemData = itemsGame[index];
        if (itemData.name === sName) {
            return index;
        }
    }
    return undefined;
}
// 根据名字索引物品
function getItemByName(sName) {
    for (const index in itemsGame) {
        const itemData = itemsGame[index];
        if (itemData.name === sName) {
            return itemData;
        }
    }
    return undefined;
}
// 根据名字索引捆绑包信息
function getBundlesByName(sName) {
    let bundles = {};
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
function findItemsByHeroName(sHeroName) {
    let itemList = {};
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
//# sourceMappingURL=cmdDota2ItemsGame.js.map