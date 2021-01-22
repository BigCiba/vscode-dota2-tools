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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const path = require("path");
const util = require("./util");
const init_1 = require("./init");
const listener_1 = require("./listener");
const luaAPITree_1 = require("./TreeDataProvider/luaAPITree");
const KVServer_1 = require("./kv_server/KVServer");
const table_inherit_1 = require("./table_inherit");
const drop_string_1 = require("./drop_string");
const ftp = require("ftp");
const luaCompletionItemProvider_1 = require("./Completions/luaCompletionItemProvider");
const vsndPicker_1 = require("./Command/vsndPicker");
const combineLocalization_1 = require("./Command/combineLocalization");
const abilityTextureBrowser_1 = require("./Command/abilityTextureBrowser");
const itemGamesBrowser_1 = require("./Command/itemGamesBrowser");
const tools_1 = require("./tools");
const cssCompletionItemProvider_1 = require("./Completions/cssCompletionItemProvider");
const LocalizationViewProvider_1 = require("./WebviewViewProvider/LocalizationViewProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        KVServer_1.KVServer.Install(context);
        // 重新解析数据时打开
        let tools = new tools_1.Tools(context);
        // tools.ParseLuaAPI();
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        // passport: zut3ehvut7muv26u5axcbmnv6wlgkdxcsabxvjl4i6rbvwkgpmrq
        console.log('Congratulations, your extension "dota2-tools" is now active!');
        // 获取根目录（弃用）
        function GetRootPath() {
            const folders = vscode.workspace.workspaceFolders;
            if (folders !== undefined) {
                return folders[0].uri.fsPath;
            }
            else {
                return;
            }
        }
        // 读取kv文件（弃用）
        //（弃用）
        // 解析技能kv
        function WriteAbilitiesKV(obj, depth, hero_name) {
            var str = '';
            // 添加制表符
            function AddDepthTab(depth, add_string) {
                var tab = '';
                for (let d = 0; d < depth; d++) {
                    tab += '\t';
                }
                tab += add_string;
                return tab;
            }
            // 添加key与value之间制表符
            function AddIntervalTab(depth, key) {
                var tab = '';
                for (let d = 0; d < 12 - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
                    tab += '\t';
                }
                return tab;
            }
            for (const key in obj) {
                if (key === 'ID') {
                    continue;
                }
                const value = obj[key];
                if (typeof (value) === 'string') {
                    str += AddDepthTab(depth, '"' + key + '"');
                    str += AddIntervalTab(depth, key);
                    str += '"' + value + '"\n';
                }
                else {
                    str += AddDepthTab(depth, '"' + key + '"\n');
                    str += AddDepthTab(depth, '{\n');
                    if (depth === 1) {
                        // str += AddDepthTab(depth, '// General\n//-------------------------------------------------------------------------------------------------------------\n');
                        str += AddDepthTab(depth + 1, '"BaseClass"' + AddIntervalTab(depth + 1, 'BaseClass') + '"ability_lua"\n');
                        str += AddDepthTab(depth + 1, '"ScriptFile"' + AddIntervalTab(depth + 1, 'ScriptFile') + '"abilities/' + hero_name + '/' + key + '"\n');
                        str += AddDepthTab(depth + 1, '"AbilityTextureName"' + AddIntervalTab(depth + 1, 'AbilityTextureName') + '"' + key.split('_imba')[0] + '"\n');
                        if (value.AbilityType !== undefined && value.AbilityType === 'DOTA_ABILITY_TYPE_ULTIMATE') {
                            str += AddDepthTab(depth + 1, '"MaxLevel"' + AddIntervalTab(depth + 1, 'MaxLevel') + '"3"\n');
                            str += AddDepthTab(depth + 1, '"RequiredLevel"' + AddIntervalTab(depth + 1, 'RequiredLevel') + '"6"\n');
                            str += AddDepthTab(depth + 1, '"LevelsBetweenUpgrades"' + AddIntervalTab(depth + 1, 'LevelsBetweenUpgrades') + '"6"\n');
                        }
                        else {
                            str += AddDepthTab(depth + 1, '"MaxLevel"' + AddIntervalTab(depth + 1, 'MaxLevel') + '"4"\n');
                            str += AddDepthTab(depth + 1, '"RequiredLevel"' + AddIntervalTab(depth + 1, 'RequiredLevel') + '"1"\n');
                            str += AddDepthTab(depth + 1, '"LevelsBetweenUpgrades"' + AddIntervalTab(depth + 1, 'LevelsBetweenUpgrades') + '"2"\n');
                        }
                    }
                    str += WriteAbilitiesKV(value, depth + 1, hero_name);
                    str += AddDepthTab(depth, '}\n');
                }
            }
            return str;
        }
        //（弃用）
        function LoadKeyValue(uri) {
            return __awaiter(this, void 0, void 0, function* () {
                const document = yield vscode.workspace.openTextDocument(uri);
                var state = 'NONE';
                var state_save = 'NONE';
                var key_value = {
                    key: '',
                    value: '',
                    AddKey(char) { this.key += char; },
                    AddValue(char) { this.value += char; },
                    Clear() { this.key = ''; this.value = ''; },
                };
                var obj = {};
                var text_data = document.getText();
                var Next = (index) => text_data[index + 1];
                var NewTable = (index) => {
                    let state = 'NONE';
                    let state_save = 'NONE';
                    let key_value = {
                        key: '',
                        value: '',
                        AddKey(char) { this.key += char; },
                        AddValue(char) { this.value += char; },
                        Clear() { this.key = ''; this.value = ''; },
                    };
                    let obj = {};
                    for (let i = index; i < text_data.length; i++) {
                        const char = text_data[i];
                        if (state === 'NOTE') {
                            if (char === '\n') {
                                state = state_save;
                                continue;
                            }
                            else {
                                continue;
                            }
                        }
                        if (char === '"') {
                            if (state === 'NONE' || state === 'VALUE_END' || state === 'TABLE_END') {
                                state = 'KEY';
                                continue;
                            }
                            else if (state === 'KEY') {
                                state = 'KEY_END';
                                continue;
                            }
                            else if (state === 'KEY_END') {
                                state = 'VALUE';
                                continue;
                            }
                            else if (state === 'VALUE') {
                                state = 'VALUE_END';
                                obj[key_value.key] = key_value.value;
                                key_value.Clear();
                                continue;
                            }
                        }
                        else if (char === '{') {
                            if (state === 'KEY_END') {
                                state = 'TABLE';
                                let [new_obj, index] = NewTable(i + 1);
                                obj[key_value.key] = new_obj;
                                i = index;
                                key_value.Clear();
                                state = 'TABLE_END';
                                continue;
                            }
                        }
                        else if (char === '}') {
                            return [obj, i];
                        }
                        else if (char === '/' && state !== 'NOTE') {
                            if (Next(i) === '/') {
                                i += 1;
                                state_save = state;
                                state = 'NOTE';
                                // newtable
                                continue;
                            }
                        }
                        if (state === 'KEY') {
                            key_value.AddKey(char);
                        }
                        else if (state === 'VALUE') {
                            key_value.AddValue(char);
                        }
                    }
                };
                for (let i = 0; i < text_data.length; i++) {
                    const char = text_data[i];
                    if (state === 'NOTE') {
                        if (char === '\n') {
                            state = state_save;
                            continue;
                        }
                        else {
                            continue;
                        }
                    }
                    if (char === '"') {
                        if (state === 'NONE' || state === 'VALUE_END' || state === 'TABLE_END') {
                            state = 'KEY';
                            continue;
                        }
                        else if (state === 'KEY') {
                            state = 'KEY_END';
                            continue;
                        }
                        else if (state === 'KEY_END') {
                            state = 'VALUE';
                            continue;
                        }
                        else if (state === 'VALUE') {
                            state = 'VALUE_END';
                            obj[key_value.key] = key_value.value;
                            key_value.Clear();
                            continue;
                        }
                    }
                    else if (char === '{') {
                        if (state === 'KEY_END') {
                            state = 'TABLE';
                            let [new_obj, index] = NewTable(i + 1);
                            obj[key_value.key] = new_obj;
                            key_value.Clear();
                            i = index;
                            state = 'TABLE_END';
                            continue;
                            // newtable
                        }
                    }
                    else if (char === '/' && state !== 'NOTE') {
                        if (Next(i) === '/') {
                            i += 1;
                            state_save = state;
                            state = 'NOTE';
                            // newtable
                            continue;
                        }
                    }
                    if (state === 'KEY') {
                        key_value.AddKey(char);
                    }
                    else if (state === 'VALUE') {
                        key_value.AddValue(char);
                    }
                }
                return obj;
            });
        }
        // 合并文本
        let Localization = vscode.commands.registerCommand('dota2tools.Localization', combineLocalization_1.CombineLocalization);
        yield init_1.Init(context);
        // 监听
        let listener = new listener_1.Listener(context);
        // 配置变更
        vscode.workspace.onDidChangeConfiguration((event) => {
            listener.OnConfigChanged(event);
        });
        // 添加英雄基本文件（IMBA功能）
        let AddHero = vscode.commands.registerCommand('extension.AddHero', () => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            let addon_path = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
            if (addon_path === undefined || addon_path === '') {
                vscode.window.showErrorMessage('请设置dota2项目路径', '设置').then(function () {
                    vscode.window.showInputBox({
                        password: false,
                        ignoreFocusOut: true,
                        value: 'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
                        prompt: '示例：C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
                    }).then(function (msg) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (msg !== undefined) {
                                yield vscode.workspace.fs.readDirectory(vscode.Uri.file(msg));
                                vscode.workspace.getConfiguration().update('dota2-tools.addon_path', msg, true);
                            }
                        });
                    });
                });
                return;
            }
            // 读取英雄资料
            const npc_heroes_uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_heroes.txt');
            const npc_abilities_uri = vscode.Uri.file(vscode.workspace.getConfiguration().get('dota2-tools.addon_path') + '/game/dota/scripts/npc/npc_abilities.txt');
            let heroes_data = yield LoadKeyValue(npc_heroes_uri);
            let abilities_data = yield LoadKeyValue(npc_abilities_uri);
            // 选择英雄
            const quick_pick = vscode.window.createQuickPick();
            quick_pick.canSelectMany = false;
            quick_pick.ignoreFocusOut = true;
            quick_pick.placeholder = '英雄名字';
            quick_pick.title = '选择创建的英雄';
            // 添加选项
            var items = new Array;
            for (const key in heroes_data.DOTAHeroes) {
                if (heroes_data.DOTAHeroes.hasOwnProperty(key) && key !== 'Version' && key !== 'npc_dota_hero_base') {
                    items.push({
                        label: key,
                    });
                }
            }
            quick_pick.items = items;
            quick_pick.show();
            quick_pick.onDidChangeSelection((t) => __awaiter(this, void 0, void 0, function* () {
                quick_pick.hide();
                quick_pick.value = t[0].label;
                const hero_name = quick_pick.value;
                const hero_name_lite = hero_name.substr(14, hero_name.length);
                // 原版数据
                const scripts_path = root_path + '/game/dota_addons/dota_imba/scripts';
                // 添加npc_heroes_custom
                var ability_override = new Array;
                var text_editor = yield vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_heroes_custom.txt'));
                text_editor.edit(function (edit_builder) {
                    let abilities = '\t\t"Ability1"\t\t"hidden_1"\n' +
                        '\t\t"Ability2"\t\t"hidden_2"\n' +
                        '\t\t"Ability3"\t\t"hidden_3"\n' +
                        '\t\t"Ability4"\t\t"hidden_4"\n' +
                        '\t\t"Ability5"\t\t"hidden_5"\n' +
                        '\t\t"Ability6"\t\t"hidden_ultimate"\n' +
                        '\t\t"NormalAbilities"\n' +
                        '\t\t{\n';
                    for (const key in heroes_data.DOTAHeroes[hero_name]) {
                        if (key.search('Ability[1-9]') !== -1) {
                            let ability_name = heroes_data.DOTAHeroes[hero_name][key];
                            if (ability_name.search('special_bonus') !== -1) {
                                continue;
                            }
                            if (ability_name.search('generic_hidden') === -1) {
                                ability_override.push(ability_name);
                                ability_name += '_imba';
                            }
                            let ability_index = key.substr(7, 8);
                            if (ability_index !== '6') {
                                abilities += '\t\t\t"' + key.substr(7, 8) + '"\t\t\t"' + ability_name + '"\n';
                            }
                            else {
                                abilities += '\t\t\t"ultimate"\t"' + ability_name + '"\n';
                            }
                        }
                    }
                    abilities +=
                        '\t\t}\n' +
                            '\t\t"CustomAbilityDraftAbilities"\n' +
                            '\t\t{\n';
                    for (const key in heroes_data.DOTAHeroes[hero_name]) {
                        if (key.search('Ability[1-9]') !== -1) {
                            let ability_name = heroes_data.DOTAHeroes[hero_name][key];
                            if (ability_name.search('generic_hidden') === -1 && ability_name.search('special_bonus') === -1) {
                                ability_name += '_imba';
                                let ability_index = key.substr(7, 8);
                                if (ability_index === '6') {
                                    abilities += '\t\t\t"ultimate"\t"' + ability_name + '"\n';
                                }
                                else if (Number(ability_index) < 4) {
                                    abilities += '\t\t\t"' + key.substr(7, 8) + '"\t\t\t"' + ability_name + '"\n';
                                }
                            }
                        }
                    }
                    abilities += '\t\t}\n';
                    edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1, 0), '\t"' + quick_pick.value + '"\n\t{\n' + abilities + '\t}\n');
                });
                // 添加herolist
                text_editor = yield vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/herolist.txt'));
                text_editor.edit(function (edit_builder) {
                    var AddTab = function (length) {
                        var tab = '';
                        for (let d = 0; d < 10 - Math.floor((4 + length + 2) / 4); d++) {
                            tab += '\t';
                        }
                        return tab;
                    };
                    edit_builder.insert(new vscode.Position(text_editor.document.lineCount - 1, 0), '\t"' + hero_name + '"' + AddTab(hero_name.length) + '"1"\n');
                });
                // 添加npc_abilities_custom
                text_editor = yield vscode.window.showTextDocument(vscode.Uri.file(scripts_path + '/npc/npc_abilities_custom.txt'));
                text_editor.edit(function (edit_builder) {
                    edit_builder.insert(new vscode.Position(0, 0), '#base "abilities/heroes/' + hero_name_lite + '.kv"\n');
                });
                // 添加技能KV
                const ability_kv_uri = vscode.Uri.file(scripts_path + '/npc/abilities/heroes/' + hero_name_lite + '.kv');
                yield vscode.workspace.fs.writeFile(ability_kv_uri, new Uint8Array);
                text_editor = yield vscode.window.showTextDocument(ability_kv_uri);
                text_editor.edit(function (edit_builder) {
                    var ability_data = {};
                    var ability = {
                        [hero_name_lite]: ability_data,
                    };
                    ability_override.forEach(ability_name => {
                        ability_data[ability_name + '_imba'] = abilities_data.DOTAAbilities[ability_name];
                    });
                    edit_builder.insert(new vscode.Position(0, 0), WriteAbilitiesKV(ability, 0, hero_name_lite));
                });
                // 初始化技能lua
                for (let i = 0; i < ability_override.length; i++) {
                    const ability = ability_override[i] + '_imba';
                    const ability_lua_uri = vscode.Uri.file(scripts_path + '/vscripts/abilities/' + hero_name_lite + '/' + ability + '.lua');
                    yield vscode.workspace.fs.writeFile(ability_lua_uri, new Uint8Array);
                    text_editor = yield vscode.window.showTextDocument(ability_lua_uri);
                    yield text_editor.edit(function (edit_builder) {
                        return __awaiter(this, void 0, void 0, function* () {
                            var lua_data = '';
                            lua_data += 'LinkLuaModifier("modifier_' + ability + '", "abilities/' + hero_name_lite + '/' + ability + '.lua", LUA_MODIFIER_MOTION_NONE)\n';
                            lua_data += '--Abilities\n';
                            lua_data += 'if ' + ability + ' == nil then\n';
                            lua_data += '\t' + ability + ' = class({})\n';
                            lua_data += 'end\n';
                            lua_data += '---------------------------------------------------------------------\n';
                            lua_data += '-- Modifiers\n';
                            lua_data += 'if modifier_' + ability + ' == nil then\n';
                            lua_data += '\tmodifier_' + ability + ' = class({})\n';
                            lua_data += 'end\n';
                            edit_builder.insert(new vscode.Position(0, 0), lua_data);
                        });
                    });
                }
                // 写入技能描述
                const abilities_schinese_uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_schinese.txt');
                const abilities_english_uri = vscode.Uri.file(root_path + '/策划方案/参考资料/abilities_english.txt');
                // 中文
                let document_schinese = yield vscode.workspace.openTextDocument(abilities_schinese_uri);
                let sub_text = '';
                for (let line = 0; line < document_schinese.lineCount; line++) {
                    let lineText = document_schinese.lineAt(line).text;
                    if (lineText.search(hero_name_lite) !== -1) {
                        sub_text += lineText.substr(2, lineText.length) + '\n';
                    }
                }
                const localization_schinese_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + hero_name_lite + '.txt');
                yield vscode.workspace.fs.writeFile(localization_schinese_uri, new Uint8Array);
                text_editor = yield vscode.window.showTextDocument(localization_schinese_uri);
                yield text_editor.edit(function (edit_builder) {
                    edit_builder.insert(new vscode.Position(0, 0), sub_text);
                });
                // english
                let document_english = yield vscode.workspace.openTextDocument(abilities_english_uri);
                sub_text = '';
                for (let line = 0; line < document_english.lineCount; line++) {
                    let lineText = document_english.lineAt(line).text;
                    if (String(lineText.split('"')[1]).search(hero_name_lite) !== -1) {
                        sub_text += lineText.substr(2, lineText.length) + '\n';
                    }
                }
                const localization_english_uri = vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/english/abilities/' + hero_name_lite + '.txt');
                yield vscode.workspace.fs.writeFile(localization_english_uri, new Uint8Array);
                text_editor = yield vscode.window.showTextDocument(localization_english_uri);
                yield text_editor.edit(function (edit_builder) {
                    return __awaiter(this, void 0, void 0, function* () {
                        edit_builder.insert(new vscode.Position(0, 0), sub_text);
                    });
                });
            }));
        }));
        // 转到文本（IMBA功能）
        let OpenLang = vscode.commands.registerCommand('extension.OpenLang', (uri) => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            let path_array = uri.fsPath.split('\\');
            let full_file_name = path_array[path_array.length - 1];
            let file_name = full_file_name.split('.')[0];
            let ext_name = full_file_name.split('.')[1];
            if (ext_name === 'kv') {
                vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + file_name + '.txt'));
            }
            else if (ext_name === 'lua') {
                vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + path_array[path_array.length - 2] + '.txt'));
            }
        }));
        // 转到kv
        let OpenKV = vscode.commands.registerCommand('dota2tools.OpenKV', () => __awaiter(this, void 0, void 0, function* () {
            const text_editor = vscode.window.activeTextEditor;
            if (text_editor !== undefined) {
                let document = text_editor.document;
                const fileName = document.fileName;
                const position = text_editor.selection.start;
                let word = document.getText(document.getWordRangeAtPosition(position));
                // 如果是modifier则搜寻技能名（必须同一文件）
                if (init_1.KV2LUA[word] === undefined) {
                    let kv_string = fs.readFileSync(fileName, 'utf-8');
                    const rows = kv_string.split(os.EOL);
                    for (let i = 0; i < rows.length; i++) {
                        const line_text = rows[i];
                        if (/.* = class/.test(line_text) === true && /modifier_.* = class/.test(line_text) === false) {
                            word = line_text.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
                        }
                    }
                }
                if (init_1.KV2LUA[word] !== undefined) {
                    let kv_string = fs.readFileSync(init_1.GameDir + '/scripts/npc/npc_abilities_custom.txt', 'utf-8');
                    kv_string = util.RemoveComment(kv_string);
                    const rows = kv_string.split(os.EOL);
                    for (let i = 0; i < rows.length; i++) {
                        const line_text = rows[i];
                        if (line_text.search(/#base ".*"/) !== -1) {
                            let base_path = line_text.split('"')[1];
                            let bFind = GetKVInfo(init_1.GameDir + '/scripts/npc/' + base_path, word);
                            if (bFind !== false && typeof (bFind) === 'number') {
                                let document = yield vscode.workspace.openTextDocument(vscode.Uri.file(init_1.GameDir + '/scripts/npc/' + base_path));
                                const options = {
                                    selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
                                    preview: false,
                                    viewColumn: vscode.ViewColumn.Two
                                };
                                vscode.window.showTextDocument(document, options);
                                break;
                            }
                            continue;
                        }
                        else {
                            if (line_text.search(word) !== -1) {
                                let document = yield vscode.workspace.openTextDocument(vscode.Uri.file(init_1.GameDir + '/scripts/npc/npc_abilities_custom.txt'));
                                const options = {
                                    selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
                                    preview: false,
                                    viewColumn: vscode.ViewColumn.Two
                                };
                                vscode.window.showTextDocument(document, options);
                                break;
                            }
                        }
                    }
                }
            }
            function GetKVInfo(full_path, word) {
                let kv_string = fs.readFileSync(full_path, 'utf-8');
                const rows = kv_string.split(os.EOL);
                for (let i = 0; i < rows.length; i++) {
                    const line_text = rows[i];
                    if (line_text.search(word) !== -1) {
                        return i;
                    }
                }
                return false;
            }
            // let path_array: string[] = uri.fsPath.split('\\');
            // let full_file_name: string = path_array[path_array.length - 1];
            // let file_name: string = full_file_name.split('.')[0];
            // let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/scripts/npc/abilities/heroes/' + path_array[path_array.length - 2] + '.kv'));
            // for (let line = 0; line < document.lineCount; line++) {
            // 	const line_text: vscode.TextLine = document.lineAt(line);
            // 	if (line_text.text.search(file_name) !== -1) {
            // 		const options = {
            // 			selection: line_text.range,
            // 			preview: false,
            // 			viewColumn: vscode.ViewColumn.Two
            // 		};
            // 		vscode.window.showTextDocument(document,options);
            // 		break;
            // 	}
            // }
        }));
        // 打开API
        let OpenAPI = vscode.commands.registerCommand('extension.OpenAPI', () => __awaiter(this, void 0, void 0, function* () {
            vscode.window.showTextDocument(vscode.Uri.file(path.join(context.extensionPath, "resource/dota_script_help2.lua")));
        }));
        // 生成API
        let GenerateAPI = vscode.commands.registerCommand('extension.GenerateAPI', () => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
            const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
            const rows = dota_script_help2.split(os.EOL);
            // 读取服务器API
            let class_list = {};
            let enum_list = {};
            for (let i = 0; i < rows.length; i++) {
                // 函数
                let option = rows[i].match(/---\[\[.*\]\]/g);
                if (option !== null && option.length > 0) {
                    let [fun_info, new_line] = util.ReadFunction(i, rows);
                    if (api_note[fun_info.function] !== undefined) {
                        fun_info.description = api_note[fun_info.function].description;
                        for (const params_name in fun_info.params) {
                            const params_info = fun_info.params[params_name];
                            params_info.params_name = api_note[fun_info.function].params[params_name].params_name;
                            params_info.description = api_note[fun_info.function].params[params_name].description;
                        }
                        fun_info.example = api_note[fun_info.function].example;
                    }
                    if (class_list[fun_info.class] === undefined) {
                        class_list[fun_info.class] = [];
                    }
                    class_list[fun_info.class].push(fun_info);
                    i = new_line;
                }
                // 常数
                if (rows[i].search('--- Enum ') !== -1) {
                    let enum_name = rows[i].substr(9, rows[i].length);
                    if (enum_list[enum_name] === undefined) {
                        enum_list[enum_name] = [];
                    }
                    let [enum_info, new_line] = util.ReadEnum(i, rows);
                    for (let j = 0; j < enum_info.length; j++) {
                        const enum_arr = enum_info[j];
                        if (api_note[enum_arr.name] !== undefined) {
                            enum_arr.description_lite = api_note[enum_arr.name].description_lite;
                            enum_arr.description = api_note[enum_arr.name].description;
                            enum_arr.example = api_note[enum_arr.name].example;
                        }
                    }
                    enum_list[enum_name] = enum_info;
                    i = new_line;
                }
            }
            // 读取客户端API
            const dota_cl_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_cl_script_help2.lua', 'utf-8');
            const rows_cl = dota_cl_script_help2.split(os.EOL);
            let class_list_cl = {};
            let enum_list_cl = {};
            for (let i = 0; i < rows_cl.length; i++) {
                // 函数
                let option = rows_cl[i].match(/---\[\[.*\]\]/g);
                if (option !== null && option.length > 0) {
                    let [fun_info, new_line] = util.ReadFunction(i, rows_cl);
                    if (class_list_cl[fun_info.class] === undefined) {
                        class_list_cl[fun_info.class] = [];
                    }
                    class_list_cl[fun_info.class].push(fun_info);
                    i = new_line;
                }
                // 常数
                if (rows_cl[i].search('--- Enum ') !== -1) {
                    let enum_name = rows_cl[i].substr(9, rows_cl[i].length);
                    if (enum_list_cl[enum_name] === undefined) {
                        enum_list_cl[enum_name] = [];
                    }
                    let [enum_info, new_line] = util.ReadEnum(i, rows_cl);
                    enum_list_cl[enum_name] = enum_info;
                    i = new_line;
                }
            }
            console.log('读取客户端API');
            // 合并API
            for (const class_name in class_list) {
                const fun_list = class_list[class_name];
                // console.log('fun_list', fun_list);
                for (let i = 0; i < fun_list.length; i++) {
                    const fun_info = fun_list[i];
                    let class_info_cl = class_list_cl[class_name];
                    if (class_info_cl === undefined) {
                        class_info_cl = class_list_cl[class_name.replace('C', 'C_')];
                    }
                    if (class_info_cl !== undefined) {
                        for (let j = 0; j < class_info_cl.length; j++) {
                            if (class_info_cl[j].function === fun_info.function) {
                                fun_info.client = true;
                                fun_info.class_cl = class_info_cl[j].class;
                                break;
                            }
                        }
                    }
                }
            }
            console.log('合并API');
            // 生成API文档
            let _sidebar_root = '';
            let _sidebar = '';
            for (const class_name in class_list) {
                _sidebar_root += '* [**' + class_name + '**](' + class_name + '/_sidebar)\n';
                _sidebar = '* [**' + class_name + '**](/)\n';
                // 添加每个类的描述
                // fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/' + class_name + '.md', '# ' + class_name);
                // fs.mkdirSync(context.extensionPath + '/resource/' + class_name);
                const fun_list = class_list[class_name];
                for (let i = 0; i < fun_list.length; i++) {
                    const fun_info = fun_list[i];
                    let fun_md = '# ' + fun_info.function + '\n';
                    fun_md += '```js\n';
                    fun_md += fun_info.return + ' ';
                    // if (fun_info.class !== 'Globals') {
                    // 	fun_md += fun_info.class + ':';
                    // }
                    fun_md += fun_info.function + '(';
                    let count = 0;
                    for (let params_name in fun_info.params) {
                        let params_name_note = fun_info.params[params_name].params_name || params_name;
                        if (count === 0) {
                            count++;
                            fun_md += params_name_note;
                        }
                        else {
                            fun_md += ', ' + params_name_note;
                        }
                    }
                    fun_md += ')\n';
                    fun_md += '```\n';
                    fun_md += '# Class\n';
                    fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
                    fun_md += (fun_info.client === true ? '✔️' : '❌') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
                    // fun_md += '# Support\n';
                    // fun_md += '> __✔️ Server__  \n';
                    // fun_md += '> __' + (fun_info.client === true ? '✔️':'❌') + ' Client__  \n';
                    fun_md += '# Function Description\n' + fun_info.description + '\n';
                    if (Object.keys(fun_info.params).length > 0) {
                        fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
                        for (let params_name in fun_info.params) {
                            const params_info = fun_info.params[params_name];
                            let params_name_note = params_info.params_name || params_name;
                            fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
                        }
                    }
                    // 是否有Example
                    if (fun_info.example !== undefined) {
                        fun_md += '\n# Example\n```lua\n';
                        fun_md += fun_info.example + '\n```';
                    }
                    fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/' + fun_info.function + '.md', fun_md);
                    // _sidebar_root += '\t* [' + fun_info.function + '](' + class_name + '/' + fun_info.function + ')\n';
                    _sidebar += '\t* [' + fun_info.function + '](' + class_name + '/' + fun_info.function + ')\n';
                    fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/' + class_name + '/_sidebar.md', _sidebar);
                }
            }
            // 遍历常数
            _sidebar_root += '* [**Constants**](Constants/_sidebar.md)\n';
            _sidebar = '* [**Constants**](/)\n';
            for (const enum_name in enum_list) {
                const enum_arr = enum_list[enum_name];
                // 添加每个类的描述
                // fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/Constants.md', '# ' + enum_name);
                // fs.mkdirSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name);
                _sidebar += '\t* [' + enum_name + '](Constants/' + enum_name + '/' + enum_name + ')\n';
                let enum_sidebar = '* [**' + enum_name + '**](/Constants/_sidebar)\n';
                let enum_md = '# ' + enum_name + '\n';
                enum_md += '> No Description Set\n\n';
                enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description' : 'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--' : '') + '|:--:\n';
                for (let i = 0; i < enum_arr.length; i++) {
                    const enum_info = enum_arr[i];
                    // 判断客户端是否存在
                    let client = '❌';
                    let enum_arr_cl = enum_list_cl[enum_name];
                    if (enum_arr_cl !== undefined) {
                        for (let j = 0; j < enum_arr_cl.length; j++) {
                            const enum_info_cl = enum_arr_cl[j];
                            if (enum_info_cl.name === enum_info.name) {
                                client = '✔️';
                            }
                        }
                    }
                    enum_md += '[' + enum_info.name + '](Constants/' + enum_name + '/' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|' : '' + enum_info.description_lite + '|') + client + '\n';
                    enum_sidebar += '\t* [' + enum_info.name + '](Constants/' + enum_name + '/' + enum_info.name + ')\n';
                    // 生成常数详细页面
                    if (enum_info.description === undefined) {
                        enum_info.description = enum_info.description_lite;
                    }
                    if (enum_info.example === undefined) {
                        enum_info.example = 'No Example Set';
                    }
                    let enum_detail_md = '# ' + enum_info.name + '\n' +
                        '# Description\n' +
                        enum_info.description + '\n' +
                        '# Example\n```' +
                        enum_info.example +
                        '```';
                    fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/' + enum_info.name + '.md', enum_detail_md);
                }
                // 生成常数详细页面侧边栏
                fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/_sidebar.md', enum_sidebar);
                // 生成常数列表页面
                fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/' + enum_name + '/' + enum_name + '.md', enum_md);
            }
            // 生成常数侧边栏
            fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/Constants/_sidebar.md', _sidebar);
            // 生成侧边栏
            fs.writeFileSync('C:/Users/lsj58/Documents/docsify/Dota2-API-Docsify/docs/_sidebar.md', _sidebar_root);
            console.log('finish');
        }));
        // 注释API
        let NoteAPI = vscode.commands.registerCommand('extension.NoteAPI', (uri, funcName) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(uri, funcName);
            let select_text = funcName;
            if (select_text == undefined) {
                let active_text_editor = vscode.window.activeTextEditor;
                if (active_text_editor !== undefined) {
                    let range_start = active_text_editor.selection.start;
                    let range_end = active_text_editor.selection.end;
                    select_text = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.getText(new vscode.Range(range_start, range_end));
                }
            }
            if (select_text !== undefined) {
                // 读取服务器API
                const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
                const api_note = JSON.parse(init_1.GetApiNote());
                const rows = dota_script_help2.split(os.EOL);
                let class_list = {};
                let enum_list = {};
                for (let i = 0; i < rows.length; i++) {
                    // 函数
                    let option = rows[i].match(/---\[\[.*\]\]/g);
                    if (option !== null && option.length > 0) {
                        let [fun_info, new_line] = util.ReadFunction(i, rows);
                        if ((api_note[fun_info.class] !== undefined && api_note[fun_info.class][fun_info.function] !== undefined) || api_note[fun_info.function] !== undefined) {
                            let note = api_note[fun_info.class][fun_info.function] || api_note[fun_info.function];
                            fun_info.description = note.description;
                            for (const params_name in fun_info.params) {
                                const params_info = fun_info.params[params_name];
                                params_info.params_name = note.params[params_name].params_name;
                                params_info.description = note.params[params_name].description;
                            }
                            fun_info.example = note.example;
                        }
                        if (class_list[fun_info.class] === undefined) {
                            class_list[fun_info.class] = [];
                        }
                        class_list[fun_info.class].push(fun_info);
                        i = new_line;
                    }
                    // 常数
                    if (rows[i].search('--- Enum ') !== -1) {
                        let enum_name = rows[i].substr(9, rows[i].length);
                        if (enum_list[enum_name] === undefined) {
                            enum_list[enum_name] = [];
                        }
                        let [enum_info, new_line] = util.ReadEnum(i, rows);
                        for (let j = 0; j < enum_info.length; j++) {
                            const enum_arr = enum_info[j];
                            if (api_note[enum_arr.name] !== undefined) {
                                enum_arr.description_lite = api_note[enum_arr.name].description_lite;
                                enum_arr.description = api_note[enum_arr.name].description;
                                enum_arr.example = api_note[enum_arr.name].example;
                            }
                        }
                        enum_list[enum_name] = enum_info;
                        i = new_line;
                    }
                }
                // 遍历函数名
                for (const class_name in class_list) {
                    const fun_list = class_list[class_name];
                    for (let i = 0; i < fun_list.length; i++) {
                        const fun_info = fun_list[i];
                        if (fun_info.function === select_text) {
                            let params = {};
                            // 创建webview
                            const panel = vscode.window.createWebviewPanel('dota2api', // viewType
                            "Dota2 API", // 视图标题
                            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                            {
                                enableScripts: true,
                                retainContextWhenHidden: true,
                            });
                            panel.webview.html = util.GetNoteAPIContent(fun_info, context);
                            panel.webview.onDidReceiveMessage(message => {
                                console.log(message);
                                let output_obj = {};
                                output_obj[select_text] = message;
                                if (api_note[message.class] === undefined) {
                                    api_note[message.class] = {};
                                }
                                api_note[message.class][select_text] = message;
                                // fs.writeFileSync(api_note_path, JSON.stringify(api_note));
                                // 从服务器读取API Note， 读取配置信息
                                let noteServerConfig = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
                                if (noteServerConfig !== undefined) {
                                    let ftpClient = new ftp();
                                    ftpClient.connect({
                                        host: noteServerConfig.host,
                                        port: noteServerConfig.port,
                                        user: noteServerConfig.user,
                                        password: noteServerConfig.password,
                                    });
                                    ftpClient.on('ready', function () {
                                        ftpClient.put(JSON.stringify(api_note), noteServerConfig !== undefined ? noteServerConfig.filename : 'api_note.json', function (err) {
                                            if (err) {
                                                vscode.window.setStatusBarMessage('API Note上传超时');
                                                throw err;
                                            }
                                            ftpClient.end();
                                            vscode.window.setStatusBarMessage('API Note上传成功');
                                        });
                                    });
                                }
                                init_1.UpDataApiNote(JSON.stringify(api_note));
                                // fs.writeFileSync(context.extensionPath + '/resource/api_note.json', JSON.stringify(api_note));
                                panel.dispose();
                            }, undefined, context.subscriptions);
                        }
                    }
                }
                // 遍历常数
                for (const enum_name in enum_list) {
                    const enum_arr = enum_list[enum_name];
                    for (let i = 0; i < enum_arr.length; i++) {
                        const enum_info = enum_arr[i];
                        if (enum_info.name === select_text) {
                            // 创建webview
                            const panel = vscode.window.createWebviewPanel('dota2api', // viewType
                            "Dota2 API", // 视图标题
                            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                            {
                                enableScripts: true,
                                retainContextWhenHidden: true,
                            });
                            panel.webview.html = util.GetConstantNoteContent(enum_info, context);
                            panel.webview.onDidReceiveMessage(message => {
                                let output_obj = {};
                                console.log(message);
                                output_obj[select_text] = message;
                                api_note[select_text] = message;
                                // fs.writeFileSync(api_note_path, JSON.stringify(api_note));
                                // fs.writeFileSync(context.extensionPath + '/resource/api_note.json', JSON.stringify(api_note));
                                // 从服务器读取API Note， 读取配置信息
                                let noteServerConfig = vscode.workspace.getConfiguration().get('dota2-tools.API Note Server Configuration');
                                if (noteServerConfig !== undefined) {
                                    let ftpClient = new ftp();
                                    ftpClient.connect({
                                        host: noteServerConfig.host,
                                        port: noteServerConfig.port,
                                        user: noteServerConfig.user,
                                        password: noteServerConfig.password,
                                    });
                                    ftpClient.on('ready', function () {
                                        ftpClient.put(JSON.stringify(api_note), noteServerConfig !== undefined ? noteServerConfig.filename : 'api_note.json', function (err) {
                                            if (err) {
                                                throw err;
                                            }
                                            ftpClient.end();
                                        });
                                    });
                                }
                                init_1.UpDataApiNote(JSON.stringify(api_note));
                                panel.dispose();
                            }, undefined, context.subscriptions);
                        }
                    }
                }
            }
        }));
        // 生成API文档
        let GenerateDocument = vscode.commands.registerCommand('extension.GenerateDocument', () => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            const dota_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_script_help2.lua', 'utf-8');
            const dota_cl_script_help2 = fs.readFileSync(context.extensionPath + '/resource/dota_cl_script_help2.lua', 'utf-8');
            const api_note = JSON.parse(fs.readFileSync(root_path + '/game/dota_addons/dota_imba/scripts/vscripts/libraries/api_note.json', 'utf-8'));
            let [class_list, enum_list] = util.ReadAPI(dota_script_help2, dota_cl_script_help2);
            // 侧边栏与一些配置
            for (const class_name in class_list) {
                // 添加每个类的描述
                const fun_list = class_list[class_name];
                let readme = '# ' + class_name + '\n';
                readme += (api_note[class_name] === undefined ? '> No Description Set' : api_note[class_name]) + '\n\n' +
                    'Function|Description|Client\n' +
                    '--|--|:--:\n';
                for (let i = 0; i < fun_list.length; i++) {
                    const fun_info = fun_list[i];
                    let fun_md = '# ' + fun_info.function + '\n';
                    fun_md += '```lua\n';
                    let signature = fun_info.return + ' ' + fun_info.function + '(';
                    let count = 0;
                    for (let params_name in fun_info.params) {
                        let params_name_note = fun_info.params[params_name].params_name || params_name;
                        if (count === 0) {
                            count++;
                            signature += params_name_note;
                        }
                        else {
                            signature += ', ' + params_name_note;
                        }
                    }
                    signature += ')';
                    readme += '[' + signature + '](' + fun_info.function + ')|' + fun_info.description + '|' + (fun_info.client === true ? '✔️' : '❌') + '\n';
                    fun_md += signature + '\n';
                    fun_md += '```\n';
                    fun_md += '# Class\n';
                    fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
                    fun_md += (fun_info.client === true ? '✔️' : '❌') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
                    fun_md += '# Function Description\n' + fun_info.description + '\n';
                    if (Object.keys(fun_info.params).length > 0) {
                        fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
                        for (let params_name in fun_info.params) {
                            const params_info = fun_info.params[params_name];
                            let params_name_note = params_info.params_name || params_name;
                            fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
                        }
                    }
                    // 是否有Example
                    if (fun_info.example !== undefined) {
                        fun_md += '\n# Example\n```lua\n';
                        fun_md += fun_info.example + '\n```';
                    }
                    yield util.DirExists('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name);
                    fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name + '/' + fun_info.function + '.md', fun_md);
                }
                fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/' + class_name + '/README.md', readme);
            }
            for (const enum_name in enum_list) {
                const enum_arr = enum_list[enum_name];
                let enum_md = '# ' + enum_name + '\n';
                enum_md += (api_note[enum_name] === undefined ? '> No Description Set' : api_note[enum_name]) + '\n\n';
                enum_md += 'Name|Value|' + (enum_name === 'modifierfunction' ? 'Lua Function|Description' : 'Description') + '|Client\n--|:--:|--' + (enum_name === 'modifierfunction' ? '|--' : '') + '|:--:\n';
                for (let i = 0; i < enum_arr.length; i++) {
                    const enum_info = enum_arr[i];
                    enum_md += '[' + enum_info.name + '](' + enum_info.name + ')' + '|' + enum_info.value + '|' + (enum_name === 'modifierfunction' ? enum_info.function + '|' + enum_info.description_lite + '|' : '' + enum_info.description_lite + '|') + enum_info.client + '\n';
                    // 生成常数详细页面
                    if (enum_info.description === undefined) {
                        enum_info.description = enum_info.description_lite;
                    }
                    if (enum_info.example === undefined) {
                        enum_info.example = 'No Example Set';
                    }
                    let enum_detail_md = '# ' + enum_info.name + '\n' +
                        '# Description\n' +
                        enum_info.description + '\n' +
                        '# Example\n```' +
                        enum_info.example +
                        '```';
                    yield util.DirExists('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name);
                    fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name + '/' + enum_info.name + '.md', enum_detail_md);
                }
                // 生成常数列表页面
                fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/dota2-lua-api/Constants/' + enum_name + '/' + enum_name + '.md', enum_md);
            }
            // fs.writeFileSync('C:/Users/bigciba/Documents/docsify/dota2-api-vuepress/docs/.vuepress/config.js', config);
        }));
        // 选择音效
        let cmdVsndSelector = vscode.commands.registerCommand('dota2tools.vsnd_selector', vsndPicker_1.VsndPicker);
        // kv2csv
        let KV2CSV = vscode.commands.registerCommand('dota2tools.kv_to_csv', () => __awaiter(this, void 0, void 0, function* () {
            const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
            const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
            if (excel_object === undefined || kv_object === undefined) {
                return;
            }
            for (const index in kv_object) {
                const kv_path = kv_object[index].replace(/\\\\/g, '/');
                let file_type = (yield vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
                if (file_type === vscode.FileType.Directory) {
                    let files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(kv_path));
                    for (let i = 0; i < files.length; i++) {
                        let [file_name, is_file] = files[i];
                        if (file_name === undefined) {
                            continue;
                        }
                        if (is_file === vscode.FileType.File) {
                            let file_path = kv_path + '/' + file_name;
                            let csv_path = path.join(excel_object[index], 'csv', file_name.replace(path.extname(file_name), '.csv'));
                            KeyValue2CSV(file_path, csv_path);
                            // fs.writeFileSync(unit_kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv', util.WriteKeyValue({KeyValue:util.UnitCSV2KV(csv_path)}));
                        }
                    }
                }
                else if (file_type === vscode.FileType.File) {
                    let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
                    KeyValue2CSV(kv_path, csv_path);
                }
            }
            function KeyValue2CSV(kv_path, csv_path) {
                // let csv_path = path.dirname(excel_object[index]);
                if (fs.existsSync(csv_path) === false) {
                    return;
                }
                let csv = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
                let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
                let csv_title = csv[0];
                let csv_key = csv[1];
                let final_csv = [csv_title, csv_key];
                for (const ability_name in kv[Object.keys(kv)[0]]) {
                    const ability_data = kv[Object.keys(kv)[0]][ability_name];
                    let normal_data = []; //第一行
                    normal_data[0] = ability_name;
                    let special_data = []; //第二行
                    for (const ability_key in ability_data) {
                        const ability_value = ability_data[ability_key];
                        if (ability_key === 'AbilitySpecial') { //特殊处理AbilitySpecial
                            let special_count = 1; //记录第几个special值
                            for (const special_index in ability_value) { //遍历special
                                const special_info = ability_value[special_index];
                                let special_name = Object.keys(special_info)[1];
                                let special_avlue = special_info[Object.keys(special_info)[1]];
                                let counter = 0;
                                let has_find = false;
                                for (let i = 0; i < csv_key.length; i++) { // 寻找csv里的AbilitySpecial
                                    const key_name = csv_key[i];
                                    if (key_name === 'AbilitySpecial') {
                                        counter++;
                                        if (counter === special_count) {
                                            normal_data[i] = special_name;
                                            special_data[i] = special_avlue;
                                            has_find = true;
                                        }
                                    }
                                }
                                if (has_find === false) { //如果csv中的AbilitySpecial值不够则往后加
                                    csv_key.push('AbilitySpecial');
                                    normal_data[csv_key.length - 1] = special_name;
                                    special_data[csv_key.length - 1] = special_avlue;
                                }
                                special_count++;
                            }
                        }
                        else {
                            let has_find = false;
                            for (let i = 0; i < csv_key.length; i++) { //csv中是否有此key
                                const key_name = csv_key[i];
                                if (key_name === ability_key) {
                                    normal_data[i] = ability_value;
                                    has_find = true;
                                    break;
                                }
                            }
                            if (has_find === false) {
                                csv_key.push(ability_key);
                                normal_data[csv_key.length - 1] = ability_value;
                            }
                        }
                    }
                    // 合并已有的csv数据
                    for (let i = 2; i < csv.length; i++) {
                        const csv_data = csv[i];
                        if (csv_data[0] === normal_data[0]) { //技能名字已有
                            for (let j = 0; j < csv_data.length; j++) {
                                const value = csv_data[j];
                                if (normal_data[j] === undefined) {
                                    normal_data[j] = value;
                                }
                            }
                        }
                    }
                    final_csv.push(normal_data);
                    final_csv.push(special_data);
                }
                fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
            }
        }));
        // 导出技能csv
        let AbilityExport = vscode.commands.registerCommand('dota2tools.ability_export', (uri) => __awaiter(this, void 0, void 0, function* () {
            const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
            const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
            if (excel_object === undefined || kv_object === undefined) {
                return;
            }
            // 当前文件路径
            let file_path = util.FormatPath(uri.fsPath);
            for (const index in kv_object) {
                const kv_path = util.FormatPath(kv_object[index].replace(/\\\\/g, '/'));
                let file_type = (yield vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
                if (file_type === vscode.FileType.Directory) {
                    if (file_path.search(kv_path) !== -1) {
                        let csv_path = path.join(excel_object[index], 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
                        KeyValue2CSV(file_path, csv_path);
                        break;
                    }
                }
                else if (file_type === vscode.FileType.File) {
                    if (file_path === kv_path) {
                        let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
                        KeyValue2CSV(file_path, csv_path);
                        break;
                    }
                }
            }
            // KeyValue2CSV(uri.fsPath, 'C:/Users/wan/Documents/Dota Addons/Guarding Athena/design/3.kv配置表/abilities/csv/ability_enemy.csv');
            function KeyValue2CSV(kv_path, csv_path) {
                // let csv_path = path.dirname(excel_object[index]);
                if (fs.existsSync(csv_path) === false) {
                    util.ShowError("不存在csv文件");
                    return;
                }
                let csv = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
                let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
                let csv_title = csv[0];
                let csv_key = csv[1];
                let final_csv = [csv_title, csv_key];
                for (const ability_name in kv[Object.keys(kv)[0]]) {
                    const ability_data = kv[Object.keys(kv)[0]][ability_name];
                    let normal_data = []; //第一行
                    normal_data[0] = ability_name;
                    let special_data = []; //第二行
                    for (const ability_key in ability_data) {
                        const ability_value = ability_data[ability_key];
                        if (ability_key === 'AbilitySpecial') { //特殊处理AbilitySpecial
                            let special_count = 1; //记录第几个special值
                            let keys = Object.keys(ability_value).sort(function (a, b) { return Number(a) - Number(b); });
                            for (let index = 0; index < keys.length; index++) {
                                // for (const special_index in ability_value) {//遍历special
                                const special_info = ability_value[keys[index]];
                                // 遍历special里面的额外键值
                                let special_name = '';
                                let special_value = '';
                                for (const _special_name in special_info) {
                                    const _special_value = special_info[_special_name];
                                    if (_special_name !== 'var_type') {
                                        special_name += (special_name === '') ? _special_name : ('\n' + _special_name);
                                        special_value += (special_value === '') ? _special_value : ('\n' + _special_value);
                                    }
                                }
                                if (Object.keys(special_info).length > 2) {
                                    special_name = '"' + special_name + '"';
                                    special_value = '"' + special_value + '"';
                                }
                                // let special_name = Object.keys(special_info)[1];
                                // let special_avlue = special_info[Object.keys(special_info)[1]];
                                let counter = 0;
                                let has_find = false;
                                for (let i = 0; i < csv_key.length; i++) { // 寻找csv里的AbilitySpecial
                                    const key_name = csv_key[i];
                                    if (key_name === 'AbilitySpecial') {
                                        counter++;
                                        if (counter === special_count) {
                                            normal_data[i] = special_name;
                                            special_data[i] = special_value;
                                            has_find = true;
                                        }
                                    }
                                }
                                if (has_find === false) { //如果csv中的AbilitySpecial值不够则往后加
                                    csv_key.push('AbilitySpecial');
                                    normal_data[csv_key.length - 1] = special_name;
                                    special_data[csv_key.length - 1] = special_value;
                                }
                                special_count++;
                            }
                        }
                        else {
                            let has_find = false;
                            for (let i = 0; i < csv_key.length; i++) { //csv中是否有此key
                                const key_name = csv_key[i];
                                if (key_name === ability_key) {
                                    normal_data[i] = ability_value;
                                    has_find = true;
                                    break;
                                }
                            }
                            if (has_find === false) {
                                csv_key.push(ability_key);
                                normal_data[csv_key.length - 1] = ability_value;
                            }
                        }
                    }
                    // 合并已有的csv数据
                    for (let i = 2; i < csv.length; i++) {
                        const csv_data = csv[i];
                        if (csv_data[0] === normal_data[0]) { //技能名字已有
                            for (let j = 0; j < csv_data.length; j++) {
                                const value = csv_data[j];
                                if (normal_data[j] === undefined) {
                                    normal_data[j] = value;
                                }
                            }
                        }
                    }
                    final_csv.push(normal_data);
                    final_csv.push(special_data);
                }
                fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
            }
        }));
        // 导出单位csv
        let UnitExport = vscode.commands.registerCommand('dota2tools.unit_export', (uri) => __awaiter(this, void 0, void 0, function* () {
            const excel_object = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
            const kv_object = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
            if (excel_object === undefined || kv_object === undefined) {
                return;
            }
            // 当前文件路径
            let file_path = util.FormatPath(uri.fsPath);
            for (const index in kv_object) {
                const kv_path = util.FormatPath(kv_object[index].replace(/\\\\/g, '/'));
                let file_type = (yield vscode.workspace.fs.stat(vscode.Uri.file(kv_path))).type;
                if (file_type === vscode.FileType.Directory) {
                    if (file_path.search(kv_path) !== -1) {
                        let csv_path = path.join(excel_object[index], 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
                        KeyValue2CSV(file_path, csv_path);
                        break;
                    }
                }
                else if (file_type === vscode.FileType.File) {
                    console.log(file_path);
                    console.log(kv_path);
                    if (file_path === kv_path) {
                        let csv_path = path.join(path.dirname(excel_object[index]), 'csv', path.basename(excel_object[index]).replace(path.extname(excel_object[index]), '.csv'));
                        KeyValue2CSV(file_path, csv_path);
                        break;
                    }
                }
            }
            function KeyValue2CSV(kv_path, csv_path) {
                if (fs.existsSync(csv_path) === false) {
                    util.ShowError("不存在csv文件");
                    return;
                }
                let csv = util.CSV2Array(fs.readFileSync(csv_path, 'utf-8'));
                let kv = util.ReadKeyValue2(fs.readFileSync(kv_path, 'utf-8'));
                let csv_title = csv[0];
                let csv_key = csv[1];
                let final_csv = [csv_title, csv_key];
                for (const unit_name in kv[Object.keys(kv)[0]]) {
                    const unit_data = kv[Object.keys(kv)[0]][unit_name];
                    let csv_data = []; //第一行
                    csv_data[0] = unit_name;
                    for (const unit_key in unit_data) {
                        const unit_value = unit_data[unit_key];
                        if (unit_key === 'Creature') { //特殊处理AttachWearables
                            let wearable_count = 1; //记录第几个AttachWearables值
                            for (const wearable_index in unit_value.AttachWearables) { //遍历AttachWearables
                                const ItemDef = unit_value.AttachWearables[wearable_index].ItemDef;
                                let counter = 0;
                                let has_find = false;
                                for (let i = 0; i < csv_key.length; i++) { // 寻找csv里的AttachWearables
                                    const key_name = csv_key[i];
                                    if (key_name === 'AttachWearables') {
                                        counter++;
                                        if (counter === wearable_count) {
                                            csv_data[i] = ItemDef;
                                            has_find = true;
                                        }
                                    }
                                }
                                if (has_find === false) { //如果csv中的AbilitySpecial值不够则往后加
                                    csv_key.push('AttachWearables');
                                    csv_data[csv_key.length - 1] = ItemDef;
                                }
                                wearable_count++;
                            }
                        }
                        else if (typeof (unit_value) === 'string') {
                            let has_find = false;
                            for (let i = 0; i < csv_key.length; i++) { //csv中是否有此key
                                const key_name = csv_key[i];
                                if (key_name === unit_key) {
                                    csv_data[i] = unit_value;
                                    has_find = true;
                                    break;
                                }
                            }
                            if (has_find === false) {
                                csv_key.push(unit_key);
                                csv_data[csv_key.length - 1] = unit_value;
                            }
                        }
                        else {
                            // 多层结构先寻找csv是否存在此key，存在则导入数据，不存在则往后加
                            // let has_find:boolean = false;
                            // for (let i = 0; i < csv_key.length; i++) {//csv中是否有此key
                            // 	const key_name = csv_key[i];
                            // 	if (key_name === unit_key + '[{]') {
                            // 		has_find = true;
                            // 		break;
                            // 	}
                            // }
                            // if (has_find === false) {
                            // 	csv_key.push(unit_key + '[{]');
                            // }
                            // if (unit_key) {
                            // }
                        }
                    }
                    // 合并已有的csv数据
                    for (let i = 2; i < csv.length; i++) {
                        const csv_data = csv[i];
                        if (csv_data[0] === csv_data[0]) { //单位名字已有
                            for (let j = 0; j < csv_data.length; j++) {
                                const value = csv_data[j];
                                if (csv_data[j] === undefined) {
                                    csv_data[j] = value;
                                }
                            }
                        }
                    }
                    final_csv.push(csv_data);
                }
                fs.writeFileSync(csv_path, util.Array2CSV(final_csv));
            }
        }));
        // 选择图标
        let SelectAbilityTexture = vscode.commands.registerCommand('dota2tools.select_ability_texture', () => abilityTextureBrowser_1.AbilityTextureBrowser(context));
        // 暂时没啥用
        let CSV2PHPArray = vscode.commands.registerCommand("dota2tools.CSVToPHPArray", () => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            let Config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
            let sKvPath = (init_1.GameDir + Config).replace(/\\/g, "/");
            let KVJSConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
            let ServiceConfig = KVJSConfig.ServiceConfig;
            let sTotalCSVPath = (root_path + ServiceConfig.csvPath).replace(/\\/g, "/");
            let sPHPStr = "<?PHP\n";
            let fFiles = fs.readdirSync(sTotalCSVPath);
            fFiles.forEach(fileName => {
                if (fileName.indexOf(".csv") !== -1) {
                    let filePath = sTotalCSVPath + fileName;
                    let sfNameSimple = fileName.substr(0, fileName.length - 4);
                    let sCSV = fs.readFileSync(filePath, "utf-8");
                    if (!sCSV) {
                        return;
                    }
                    // 跳过不编译的
                    if (ServiceConfig.NoCompile[sfNameSimple] === 1) {
                        return;
                    }
                    let arrCSV = util.CSVParse(sCSV);
                    let csvConfigs = {};
                    let bVertical = ServiceConfig.VerticalSettingCSV[sfNameSimple] == 1;
                    if (bVertical) {
                        for (let i = 0; i < arrCSV.length; i++) {
                            let arrLine = arrCSV[i];
                            csvConfigs[arrLine[1]] = arrLine[2];
                        }
                    }
                    else {
                        if (arrCSV.length < 3) {
                            return;
                        }
                        let keys = arrCSV[1];
                        for (let i = 2; i < arrCSV.length; i++) {
                            let arrLine = arrCSV[i];
                            let id = arrLine[0];
                            if (id) {
                                csvConfigs[id] = {};
                                for (let j = 1; j < arrLine.length; j++) {
                                    if (keys[j]) {
                                        let value = arrLine[j];
                                        if (value == undefined || value == "") {
                                        }
                                        else {
                                            csvConfigs[id][keys[j]] = arrLine[j];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let result = "$" + sfNameSimple + " = " + util.Obj2Str(csvConfigs, "[", "]", " => ") + ";\n";
                    sPHPStr += result;
                }
            });
            const phpPath = sTotalCSVPath + 'game_config.php';
            fs.writeFileSync(phpPath, sPHPStr);
            const options = {
                // 显示在第二个编辑器
                viewColumn: vscode.ViewColumn.Two
            };
            vscode.window.showTextDocument(vscode.Uri.file(phpPath), options);
        }));
        // kv转js
        let KVToJs = vscode.commands.registerCommand('dota2tools.kv_to_js_config', () => __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            let Config = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
            let sKvPath = (init_1.GameDir + Config).replace(/\\/g, "/");
            let KVJSConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
            let Configs = KVJSConfig.configs;
            let KVFiles = KVJSConfig.kvfiles;
            let sOutputPath = Configs.OutputPath || "panorama/scripts/kv";
            let sObjectName = "GameUI";
            if (typeof (util.StringToAny(Configs.ObjectName)) === "string") {
                sObjectName = util.StringToAny(Configs.ObjectName);
            }
            for (const sKVName in KVFiles) {
                let sPath = KVFiles[sKVName];
                let sTotalPath = init_1.GameDir + '/scripts/' + sPath;
                let kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase(sTotalPath.replace(/\\/g, "/")));
                // 特殊处理
                if (util.StringToAny(Configs.OverrideAbilities) === true && sPath.search("npc_abilities_custom") !== -1) { // 技能合并
                    let npc_abilities_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_abilities.txt').replace(/\\/g, "/")));
                    let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((init_1.GameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
                    kv = util.OverrideKeyValue(util.ReplaceKeyValue(npc_abilities_kv, npc_abilities_override_kv), kv);
                }
                else if (util.StringToAny(Configs.OverrideUnits) === true && sPath.search("npc_units_custom") !== -1) { // 单位合并
                    let npc_units_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_units.txt').replace(/\\/g, "/")));
                    kv = util.OverrideKeyValue(npc_units_kv, kv);
                }
                else if (util.StringToAny(Configs.OverrideHeroes) === true && sPath.search("npc_heroes_custom") !== -1) { // 英雄合并
                    let npc_heroes_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/npc_heroes.txt').replace(/\\/g, "/")));
                    kv = util.OverrideKeyValue(npc_heroes_kv, kv);
                }
                else if (util.StringToAny(Configs.OverrideItems) === true && sPath.search("npc_items_custom") !== -1) { // 物品合并
                    let items_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((context.extensionPath + '/resource/npc/items.txt').replace(/\\/g, "/")));
                    let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(yield util.ReadKeyValueWithBase((init_1.GameDir + '/scripts/npc/npc_abilities_override.txt').replace(/\\/g, "/")));
                    kv = util.OverrideKeyValue(util.ReplaceKeyValue(items_kv, npc_abilities_override_kv), kv);
                }
                let js = util.Obj2Str(kv);
                let fileData = sObjectName + "." + sKVName + " = " + js + ";";
                let jsPath = (init_1.ContentDir + "/" + sOutputPath + "/" + sKVName + ".js").replace(/\\/g, "/");
                fs.writeFileSync(jsPath, fileData);
            }
            vscode.window.showInformationMessage('JS文件生成完毕');
        }));
        // 表继承功能
        let CmdInheritTable = vscode.commands.registerCommand("dota2tools.inherit_table", table_inherit_1.InheritTable);
        // 翻译txt转csv
        let CmdLocalizationCSV = vscode.commands.registerCommand("dota2tools.localization_csv", () => __awaiter(this, void 0, void 0, function* () {
            let localPaths = [
                (init_1.GameDir + "/panorama/localization/").replace(/\\/g, "/"),
                (init_1.GameDir + "/resource/").replace(/\\/g, "/"),
            ];
            let csvPaths = [
                (init_1.GameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
                (init_1.GameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
            ];
            for (let index = 0; index < localPaths.length; index++) {
                let sLocalizationPath = localPaths[index];
                let fFiles = fs.readdirSync(sLocalizationPath);
                let objTotal = {};
                // 排序让中文在第一，这样生成的key的顺序就和中文的一样了
                fFiles.sort((a, b) => {
                    if (a == "addon_schinese.txt") {
                        return -1;
                    }
                    if (b == "addon_schinese.txt") {
                        return 1;
                    }
                    return (a < b) ? -1 : a > b ? 1 : 0;
                });
                fFiles.forEach(fileName => {
                    if (fileName.indexOf("addon_") != -1) {
                        let sLanguage = fileName.substr(6, fileName.length - 4 - 6);
                        let oLocalization = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sLocalizationPath + fileName, 'utf-8')));
                        if (oLocalization.Tokens) {
                            oLocalization = oLocalization.Tokens;
                        }
                        for (let key in oLocalization) {
                            if (util.isEmptyCSVValue(oLocalization[key])) {
                                continue;
                            }
                            if (!objTotal[key]) {
                                objTotal[key] = { id: key };
                            }
                            // 前面加一个单引号禁用公式
                            objTotal[key][sLanguage] = "'" + oLocalization[key];
                        }
                    }
                });
                let sLocalizationCSV = util.Obj2CSV(objTotal);
                let sCSVPath = csvPaths[index];
                fs.writeFileSync(sCSVPath, "\uFEFF" + sLocalizationCSV);
            }
        }));
        // 翻译csv转回txt
        let CmdLocalizationCSV2Text = vscode.commands.registerCommand("dota2tools.localization_text", () => __awaiter(this, void 0, void 0, function* () {
            let localPaths = [
                (init_1.GameDir + "/panorama/localization/").replace(/\\/g, "/"),
                (init_1.GameDir + "/resource/").replace(/\\/g, "/"),
            ];
            let csvPaths = [
                (init_1.GameDir + "/panorama/localization/csv/localization.csv").replace(/\\/g, "/"),
                (init_1.GameDir + "/resource/csv/localization_resource.csv").replace(/\\/g, "/"),
            ];
            for (let index = 0; index < csvPaths.length; index++) {
                let oCSV = util.CSV2Obj(fs.readFileSync(csvPaths[index], "utf-8"));
                let oLocalizations = {};
                // 拆分成多个语言
                for (let key in oCSV) {
                    let info = oCSV[key];
                    for (let localKey in info) {
                        if (util.isEmptyCSVValue(localKey) || localKey == "id") {
                            continue;
                        }
                        if (!oLocalizations[localKey]) {
                            oLocalizations[localKey] = {};
                        }
                        if (!util.isEmptyCSVValue(info[localKey])) {
                            // 去除 前面加一个单引号禁用公式
                            oLocalizations[localKey][key] = info[localKey].substr(1);
                        }
                    }
                }
                // panorama的翻译
                if (index == 0) {
                    for (let localKey in oLocalizations) {
                        let oLocal = {};
                        oLocal.addon = oLocalizations[localKey];
                        delete oLocal.addon.__key_sc;
                        let sKV = util.WriteKeyValue(oLocal);
                        fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
                    }
                }
                else {
                    for (let localKey in oLocalizations) {
                        let oLocal = { addon: { Language: localKey } };
                        oLocal.addon.Tokens = oLocalizations[localKey];
                        delete oLocal.addon.Tokens.__key_sc;
                        let sKV = util.WriteKeyValue(oLocal);
                        fs.writeFileSync(localPaths[index] + "addon_" + localKey + ".txt", sKV);
                    }
                }
            }
        }));
        // 轮回谷生成英雄掉落卡片的vtex和vpcf
        let cmdDropVPCf = vscode.commands.registerCommand("samsara.hero_drop", () => __awaiter(this, void 0, void 0, function* () {
            let sTgaPath = (init_1.ContentDir + "/materials/items/").replace(/\\/g, "/");
            let sVTEXPath = (init_1.ContentDir + "/materials/").replace(/\\/g, "/");
            let sVPCFPath = (init_1.ContentDir + "/particles/generic_gameplay/").replace(/\\/g, "/");
            let fTGAs = fs.readdirSync(sTgaPath);
            fTGAs.forEach(fileName => {
                if (fileName.indexOf("npc_dota_hero_") !== -1) {
                    let sHeroName = fileName.substr(14, fileName.length - 14 - 4);
                    let sShortFileName = fileName.substr(0, fileName.length - 4);
                    let sVTEXFileName = `${sVTEXPath}${sShortFileName}.vtex`;
                    let sVPCFFileName = `${sVPCFPath}dropped_item_${sHeroName}.vpcf`;
                    let oHeroString = new drop_string_1.DropHeroString(sHeroName);
                    // 已存在就不生成
                    if (!fs.existsSync(sVTEXFileName)) {
                        fs.writeFileSync(sVTEXFileName, oHeroString.strDropVtex);
                    }
                    if (!fs.existsSync(sVPCFFileName)) {
                        fs.writeFileSync(sVPCFFileName, oHeroString.strDropVPCF);
                    }
                }
            });
        }));
        // items_game饰品查询
        let ItemsBrowser = vscode.commands.registerCommand("dota2tools.items_browser", () => itemGamesBrowser_1.ItemGamesBrowser(context));
        // Lua API 相关
        let APIBrowserView = undefined;
        vscode.commands.registerCommand("dota2tools.api_browser", (funInfo, infoType, name) => __awaiter(this, void 0, void 0, function* () {
            if (APIBrowserView == undefined) {
                APIBrowserView = vscode.window.createWebviewPanel('APIBrowser', // viewType
                "API Browser", // 视图标题
                vscode.ViewColumn.One, // 显示在编辑器的哪个部位
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableFindWidget: true
                });
                APIBrowserView.onDidDispose(() => {
                    APIBrowserView = undefined;
                });
            }
            if (APIBrowserView.active === false) {
                APIBrowserView.reveal(vscode.ViewColumn.One);
            }
            APIBrowserView.webview.postMessage({
                type: infoType,
                data: funInfo,
                name: name
            });
            APIBrowserView.webview.html = util.GetWebViewContent(context, 'webview/APIBrowser/APIBrowser.html');
            if (infoType == luaAPITree_1.APIType.Function) {
                vscode.env.clipboard.writeText(funInfo.function);
                vscode.window.setStatusBarMessage('复制到剪切板：' + funInfo.function);
            }
            else if (infoType == luaAPITree_1.APIType.Enum) {
                vscode.env.clipboard.writeText(funInfo.name);
                vscode.window.setStatusBarMessage('复制到剪切板：' + funInfo.function);
            }
            if (infoType == luaAPITree_1.APIType.Function || infoType == luaAPITree_1.APIType.Enum) {
                init_1.PullAPINote(infoType, funInfo, (info) => {
                    if (APIBrowserView !== undefined) {
                        APIBrowserView.webview.postMessage({
                            type: infoType,
                            data: info,
                        });
                        init_1.ApiTree.refresh();
                    }
                });
            }
        }));
        vscode.commands.registerCommand("dota2tools.dota2api.filter", () => __awaiter(this, void 0, void 0, function* () {
            vscode.window.showInputBox({ prompt: "输入过滤词搜索API" }).then((msg) => {
                let class_list = init_1.GetClassList();
                let enum_list = init_1.GetEnumList();
                if (msg !== undefined) {
                    let filter_class_list = {};
                    let filter_enum_list = {};
                    for (const class_name in class_list) {
                        const fun_list = class_list[class_name];
                        const filterClassName = class_name.search(new RegExp(msg, 'i')) !== -1 ? true : false;
                        for (let i = 0; i < fun_list.length; i++) {
                            const fun_info = fun_list[i];
                            if (fun_info.function.search(new RegExp(msg, 'i')) !== -1 || filterClassName === true) {
                                if (filter_class_list[class_name] === undefined) {
                                    filter_class_list[class_name] = [];
                                }
                                filter_class_list[class_name].push(fun_info);
                            }
                        }
                    }
                    for (const enum_name in enum_list) {
                        const enum_arr = enum_list[enum_name];
                        const filterEnumName = enum_name.search(new RegExp(msg, 'i')) !== -1 ? true : false;
                        for (let i = 0; i < enum_arr.length; i++) {
                            const enum_info = enum_arr[i];
                            if (enum_info.name.search(new RegExp(msg, 'i')) !== -1 || (enum_info.function !== undefined && enum_info.function.search(new RegExp(msg, 'i')) !== -1) || filterEnumName == true) {
                                if (filter_enum_list[enum_name] === undefined) {
                                    filter_enum_list[enum_name] = [];
                                }
                                filter_enum_list[enum_name].push(enum_info);
                            }
                        }
                    }
                    init_1.ApiTree.class_list = filter_class_list;
                    init_1.ApiTree.enum_list = filter_enum_list;
                    init_1.ApiTree.refresh();
                    // context.workspaceState.update('filtered', true);
                    // vscode.commands.executeCommand('setContext', 'dota2tools-filtered', context.workspaceState.get('filtered', true));
                }
            });
        }));
        context.subscriptions.push(vscode.commands.registerCommand("dota2tools.dota2api.clearfilter", () => __awaiter(this, void 0, void 0, function* () {
            let class_list = init_1.GetClassList();
            let enum_list = init_1.GetEnumList();
            init_1.ApiTree.class_list = class_list;
            init_1.ApiTree.enum_list = enum_list;
            init_1.ApiTree.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            init_1.ApiTree.refresh();
            // context.workspaceState.update('filtered', false);
            // vscode.commands.executeCommand('setContext', 'dota2tools-filtered', context.workspaceState.get('filtered', false));
        })));
        context.subscriptions.push(vscode.commands.registerCommand("dota2tools.dota2api.expand", () => __awaiter(this, void 0, void 0, function* () {
            init_1.ApiTree.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            init_1.ApiTree.rebuild();
            context.workspaceState.update('expanded', true);
            vscode.commands.executeCommand('setContext', 'dota2tools-expanded', context.workspaceState.get('expanded', true));
        })));
        context.subscriptions.push(vscode.commands.registerCommand("dota2tools.dota2api.collapse", () => __awaiter(this, void 0, void 0, function* () {
            init_1.ApiTree.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            init_1.ApiTree.rebuild();
            context.workspaceState.update('expanded', false);
            vscode.commands.executeCommand('setContext', 'dota2tools-expanded', context.workspaceState.get('expanded', false));
        })));
        // 注册指令
        context.subscriptions.push(Localization);
        context.subscriptions.push(AddHero);
        context.subscriptions.push(OpenLang);
        context.subscriptions.push(OpenKV);
        context.subscriptions.push(OpenAPI);
        context.subscriptions.push(GenerateAPI);
        context.subscriptions.push(NoteAPI);
        context.subscriptions.push(GenerateDocument);
        context.subscriptions.push(cmdVsndSelector);
        context.subscriptions.push(KV2CSV);
        context.subscriptions.push(AbilityExport);
        context.subscriptions.push(UnitExport);
        context.subscriptions.push(SelectAbilityTexture);
        context.subscriptions.push(KVToJs);
        context.subscriptions.push(CSV2PHPArray);
        context.subscriptions.push(CmdInheritTable);
        context.subscriptions.push(CmdLocalizationCSV);
        context.subscriptions.push(CmdLocalizationCSV2Text);
        context.subscriptions.push(cmdDropVPCf);
        context.subscriptions.push(ItemsBrowser);
        if (vscode.workspace.getConfiguration().get("dota2-tools.SnippetEnable Lua") == true) {
            let luaCompletionItemProvider = new luaCompletionItemProvider_1.LuaCompletionItemProvider(context);
            context.subscriptions.push(vscode.languages.registerCompletionItemProvider(luaCompletionItemProvider.selector, luaCompletionItemProvider));
        }
        if (vscode.workspace.getConfiguration().get("dota2-tools.SnippetEnable Css") == true) {
            let cssCompletionItemProvider = new cssCompletionItemProvider_1.CssCompletionItemProvider(context);
            context.subscriptions.push(vscode.languages.registerCompletionItemProvider(cssCompletionItemProvider.selector, cssCompletionItemProvider));
        }
        const localizationViewProvider = new LocalizationViewProvider_1.LocalizationViewProvider(context);
        vscode.window.registerWebviewViewProvider(LocalizationViewProvider_1.LocalizationViewProvider.viewType, localizationViewProvider);
        // let jsCompletionItemProvider = new JsCompletionItemProvider(context);
        // context.subscriptions.push(vscode.languages.registerCompletionItemProvider(jsCompletionItemProvider.selector, jsCompletionItemProvider));
        // context.subscriptions.push(ActiveListEditorProvider.register(context));
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map