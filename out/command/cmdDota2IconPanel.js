"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dota2IconPanel = exports.dota2IconPanelInit = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
const path = require("path");
const child_process_1 = require("child_process");
const getUri_1 = require("../utils/getUri");
const getWebViewContent_1 = require("../utils/getWebViewContent");
const kvUtils_1 = require("../utils/kvUtils");
const readFile_1 = require("../utils/readFile");
const statusBar_1 = require("../module/statusBar");
const addonInfo_1 = require("../module/addonInfo");
const pathUtils_1 = require("../utils/pathUtils");
let spellicons;
let items;
let npcHeroes;
let customSpellicons = {
    game: {},
    content: {}
};
let customItems = {
    game: {},
    content: {}
};
async function dota2IconPanelInit(context) {
    spellicons = await getFolderIcons(context.extensionUri, "/images/spellicons");
    items = await getFolderIcons(context.extensionUri, "/images/items");
    npcHeroes = await readHeroesIcon(context.extensionUri, "/images/heroes_icon");
    // 自定义图标
    await locdCustomSpellicons();
    await locdCustomItems();
}
exports.dota2IconPanelInit = dota2IconPanelInit;
async function locdCustomSpellicons() {
    let gameDir = (0, addonInfo_1.getGameDir)();
    if (gameDir) {
        if (await (0, pathUtils_1.getPathInfo)(path.join(gameDir, "/resource/flash3/images/spellicons")) !== false) {
            customSpellicons.game = await getFolderIcons(vscode.Uri.file(gameDir), "/resource/flash3/images/spellicons");
        }
    }
    let contentDir = (0, addonInfo_1.getContentDir)();
    if (contentDir) {
        if (await (0, pathUtils_1.getPathInfo)(path.join(contentDir, "/panorama/images/spellicons")) !== false) {
            customSpellicons.content = await getFolderIcons(vscode.Uri.file(contentDir), "/panorama/images/spellicons");
        }
    }
}
async function locdCustomItems() {
    let gameDir = (0, addonInfo_1.getGameDir)();
    if (gameDir) {
        if (await (0, pathUtils_1.getPathInfo)(path.join(gameDir, "/resource/flash3/images/items")) !== false) {
            customItems.game = await getFolderIcons(vscode.Uri.file(gameDir), "/resource/flash3/images/items");
        }
    }
    let contentDir = (0, addonInfo_1.getContentDir)();
    if (contentDir) {
        if (await (0, pathUtils_1.getPathInfo)(path.join(contentDir, "/panorama/images/items")) !== false) {
            customItems.content = await getFolderIcons(vscode.Uri.file(contentDir), "/panorama/images/items");
        }
    }
}
/**
 * 技能与物品图标的查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
async function dota2IconPanel(context) {
    // 创建一个Webview视图
    const panel = vscode.window.createWebviewPanel('dota2IconPanel', // viewType
    "Dota2图标", // 视图标题
    vscode.ViewColumn.One, // 显示在编辑器的哪个部位
    {
        enableScripts: true,
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
    });
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
    panel.webview.html = await (0, getWebViewContent_1.getWebviewContent)(panel.webview, context.extensionUri, "dota2Icon", html => {
        let replaceText = "";
        // 英雄图标
        const attributeList = ["DOTA_ATTRIBUTE_STRENGTH", "DOTA_ATTRIBUTE_AGILITY", "DOTA_ATTRIBUTE_INTELLECT", "DOTA_ATTRIBUTE_ALL"];
        for (const attributeType of attributeList) {
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
            let gameDir = (0, addonInfo_1.getGameDir)();
            for (const iconName in customSpellicons.game) {
                const iconPath = customSpellicons.game[iconName];
                const src = (0, getUri_1.getUri)(panel.webview, vscode.Uri.file(gameDir), [iconPath]);
                replaceText += `\t\t<img id="${iconName}" class="icon texture-icon" src="${src}" onclick="copyIconName('${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
            }
        }
        if (Object.keys(customSpellicons.content).length > 0) {
            let contentDir = (0, addonInfo_1.getContentDir)();
            for (const iconName in customSpellicons.content) {
                const iconPath = customSpellicons.content[iconName];
                const src = (0, getUri_1.getUri)(panel.webview, vscode.Uri.file(contentDir), [iconPath]);
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
            let gameDir = (0, addonInfo_1.getGameDir)();
            for (const iconName in customItems.game) {
                const iconPath = customItems.game[iconName];
                const src = (0, getUri_1.getUri)(panel.webview, vscode.Uri.file(gameDir), [iconPath]);
                replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
            }
        }
        if (Object.keys(customItems.content).length > 0) {
            let contentDir = (0, addonInfo_1.getContentDir)();
            for (const iconName in customItems.content) {
                const iconPath = customItems.content[iconName];
                const src = (0, getUri_1.getUri)(panel.webview, vscode.Uri.file(contentDir), [iconPath]);
                replaceText += `\t\t<img id="${iconName}" class="icon item-texture-icon" src="${src}" onclick="copyIconName('item_${iconName}')" oncontextmenu="openFolder('spellicons/${iconName}')">\n`;
            }
        }
        html = html.replace("<div>__replace__</div>", replaceText);
        return html;
    });
    // 监听消息
    panel.webview.onDidReceiveMessage(async (message) => {
        console.log(message);
        const type = message.type;
        const text = message.text;
        switch (type) {
            case "copy_ability_name": // 复制技能名
                let texture = text.replace(/_png\.png/, '').replace(/\\/g, "/");
                vscode.env.clipboard.writeText(texture);
                (0, statusBar_1.showStatusBarMessage)('已将图标路径复制到剪切板：' + texture);
                return;
            case "copy_ability_file": // 复制文件
                let fullpath = path.join(context.extensionPath, 'images', text);
                (0, child_process_1.exec)(`explorer.exe /select,"${fullpath}_png.png"`);
                return;
        }
    }, null, context.subscriptions);
    // 销毁处理
    panel.onDidDispose(() => {
    }, null, context.subscriptions);
}
exports.dota2IconPanel = dota2IconPanel;
/**
 * 获取文件夹中的图标信息
 * @param iconPath 文件夹路径或者文件夹路径数组
 */
async function getFolderIcons(extensionUri, iconPath) {
    let iconsInfo = {};
    if (typeof (iconPath) === 'string') {
        let data = await readFolder(extensionUri, iconPath);
        iconsInfo = Object.assign(iconsInfo, data);
    }
    else {
        for (let i = 0; i < iconPath.length; i++) {
            const _path = iconPath[i];
            let data = await readFolder(extensionUri, _path);
            iconsInfo = Object.assign(iconsInfo, data);
        }
    }
    return iconsInfo;
}
async function readFolder(extensionUri, relativeIconPath, currentPath = "") {
    let iconsInfo = {};
    let folders = await vscode.workspace.fs.readDirectory(vscode_1.Uri.joinPath(extensionUri, relativeIconPath));
    for (let i = 0; i < folders.length; i++) {
        const [name, isDirectory] = folders[i];
        if (name === undefined) {
            continue;
        }
        if (isDirectory === vscode.FileType.Directory) {
            let data = await readFolder(extensionUri, path.join(relativeIconPath, name), path.join(currentPath, name));
            iconsInfo = Object.assign(iconsInfo, data);
        }
        else if (isDirectory === vscode.FileType.File) {
            iconsInfo[path.join(currentPath, name).replace('_png.png', '').replace('.png', '').replace(/\\/g, "/")] = path.join(relativeIconPath, name);
        }
    }
    return iconsInfo;
}
async function readHeroesIcon(extensionUri, heroesPath) {
    let heroesData = {};
    let heroesInfo = await (0, kvUtils_1.readKeyValue2)(await (0, readFile_1.readFile)(vscode_1.Uri.joinPath(extensionUri, "/resource/npc/npc_heroes.txt")));
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
//# sourceMappingURL=cmdDota2IconPanel.js.map