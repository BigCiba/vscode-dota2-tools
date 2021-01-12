"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityTextureSelector = void 0;
const vscode = require("vscode");
const path = require("path");
const child_process_1 = require("child_process");
const init_1 = require("../init");
const util_1 = require("../util");
function AbilityTextureSelector(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const panel = vscode.window.createWebviewPanel('SelectAbilityTexture', // viewType
        "Select Ability Texture", // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        // 读取技能图标数据
        const path_list = {
            spellicons: context.extensionPath + '/images/spellicons',
            items: context.extensionPath + '/images/items',
            heroes: context.extensionPath + '/images/heroes_icon',
            custom_spellicons: vscode.workspace.getConfiguration().get('dota2-tools.Custom Spellicons Path'),
            custom_items: vscode.workspace.getConfiguration().get('dota2-tools.Custom Items Path'),
        };
        let custom_spellicons = [{}];
        let custom_items = [];
        for (const key in path_list.custom_spellicons) {
            const icon_path = (key === 'content' ? init_1.ContentDir : init_1.GameDir) + path_list.custom_spellicons[key];
            if ((yield util_1.GetStat(icon_path)) !== false) {
                custom_spellicons.push({
                    path: util_1.GetVscodeResourceUri(icon_path),
                    data: yield ReadIconFolder(icon_path, icon_path)
                });
            }
        }
        for (const key in path_list.custom_items) {
            const icon_path = (key === 'content' ? init_1.ContentDir : init_1.GameDir) + path_list.custom_items[key];
            if ((yield util_1.GetStat(icon_path)) !== false) {
                custom_items.push({
                    path: util_1.GetVscodeResourceUri(icon_path),
                    data: yield ReadIconFolder(icon_path, icon_path)
                });
            }
        }
        let icons_data = {
            spellicons: {
                // path: GetVscodeResourceUri(path_list.spellicons),
                path: panel.webview.asWebviewUri(path_list.spellicons).toString(),
                data: yield ReadIconFolder(path_list.spellicons, path_list.spellicons)
            },
            items: {
                path: util_1.GetVscodeResourceUri(path_list.items),
                data: yield ReadIconFolder(path_list.items, path_list.items)
            },
            heroes: {
                path: util_1.GetVscodeResourceUri(path_list.heroes),
                data: yield ReadHeroesIcon(path_list.heroes)
            },
            custom_spellicons: custom_spellicons,
            custom_items: custom_items,
        };
        // 读取英雄头像数据
        function ReadHeroesIcon(heroes_path) {
            return __awaiter(this, void 0, void 0, function* () {
                let heroes_data = {};
                let folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(heroes_path));
                for (let i = 0; i < folders.length; i++) {
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
            });
        }
        function ReadIconFolder(path, root_path) {
            return __awaiter(this, void 0, void 0, function* () {
                let icons_data = {};
                function ReadFolder(path, root_path) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let icons_data = {};
                        let folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                        for (let i = 0; i < folders.length; i++) {
                            const [name, is_directory] = folders[i];
                            if (name === undefined) {
                                continue;
                            }
                            if (Number(is_directory) === vscode.FileType.Directory) {
                                let data = yield ReadFolder(path + '/' + name, root_path);
                                icons_data = Object.assign(icons_data, data);
                            }
                            else if (Number(is_directory) === vscode.FileType.File) {
                                // icons_data[name.replace('_png.png','')] = name;
                                let texture_name = (path + '/' + name).split(root_path)[1];
                                texture_name = texture_name.replace('/', '');
                                let wb = panel.webview.asWebviewUri(vscode.Uri.file(path + '/' + name));
                                icons_data[texture_name.replace('_png.png', '').replace('.png', '')] = vscode.Uri.file(wb.path).with({ scheme: wb.scheme, authority: wb.authority }).toString();
                            }
                        }
                        return icons_data;
                    });
                }
                if (typeof (path) === 'string' && typeof (root_path) === 'string') {
                    let data = yield ReadFolder(path, root_path);
                    icons_data = Object.assign(icons_data, data);
                }
                else {
                    for (let i = 0; i < path.length; i++) {
                        const _path = path[i];
                        let data = yield ReadFolder(_path, root_path[i]);
                        icons_data = Object.assign(icons_data, data);
                    }
                }
                return icons_data;
            });
        }
        panel.webview.html = util_1.GetWebViewContent(context, 'webview/TextureBrowser/TextureBrowser.html');
        panel.webview.postMessage({
            type: "update",
            icons_data: icons_data,
        });
        panel.webview.onDidReceiveMessage(message => {
            // console.log(message);
            if (message.event === "click") {
                let texture = message.id.replace(/_png\.png/, '');
                vscode.env.clipboard.writeText(texture);
                vscode.window.setStatusBarMessage('已将图标路径复制到剪切板：' + texture);
            }
            else if (message.event === "contextmenu") {
                let fullpath = path.join(context.extensionPath, 'images', message.type, message.id);
                child_process_1.exec(`explorer.exe /select,"${fullpath}_png.png"`);
            }
            // panel.dispose();
        }, undefined, context.subscriptions);
    });
}
exports.AbilityTextureSelector = AbilityTextureSelector;
//# sourceMappingURL=abilityTextureSelector.js.map