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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // passport: zut3ehvut7muv26u5axcbmnv6wlgkdxcsabxvjl4i6rbvwkgpmrq
    console.log('Congratulations, your extension "dota2-tools" is now active!');
    // 获取根目录
    function GetRootPath() {
        const folders = vscode.workspace.workspaceFolders;
        if (folders !== undefined) {
            return folders[0].uri.fsPath;
        }
        else {
            return;
        }
    }
    // 读取kv文件
    function ReadKeyValue(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            function NewTable(start_line, document) {
                var obj = {};
                var left_brackets = 0; // 记录{数量
                var right_brackets = 0; // 记录}数量
                for (let line = start_line; line < document.lineCount; line++) {
                    var text_line = document.lineAt(line);
                    var lineText = text_line.text;
                    // var lineText = document.getText(new vscode.Range(new vscode.Position(line,0),new vscode.Position(line,100)));
                    var left_brackets_arr = lineText.match('{');
                    if (left_brackets_arr !== null) {
                        left_brackets += left_brackets_arr.length;
                    }
                    var right_brackets_arr = lineText.match('}');
                    if (right_brackets_arr !== null) {
                        right_brackets += right_brackets_arr.length;
                    }
                    if (left_brackets !== 0 && left_brackets === right_brackets) {
                        return [obj, line];
                    }
                    if (lineText.search('//') !== -1) {
                        if (text_line.firstNonWhitespaceCharacterIndex === lineText.indexOf('//')) {
                            continue;
                        }
                    }
                    var arr = lineText.match(/"/g);
                    if (arr !== null) {
                        if (arr.length === 2) {
                            var [new_obj, next_line] = NewTable(line + 1, document);
                            obj[lineText.split('"')[1]] = new_obj;
                            line = next_line;
                        }
                        if (arr.length === 4) {
                            obj[lineText.split('"')[1]] = lineText.split('"')[3];
                            continue;
                        }
                    }
                }
            }
            let document = yield vscode.workspace.openTextDocument(uri);
            var obj = {};
            for (let line = 0; line < document.lineCount; line++) {
                var lineText = document.lineAt(line).text;
                var arr = lineText.match(/"/g);
                if (arr !== null) {
                    if (arr.length === 2) {
                        var [new_obj, next_line] = NewTable(line + 1, document);
                        obj[lineText.split('"')[1]] = new_obj;
                        line = next_line;
                        continue;
                    }
                }
            }
            return obj;
        });
    }
    function WriteKeyValue(obj, depth) {
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
            const value = obj[key];
            if (typeof (value) === 'string') {
                str += AddDepthTab(depth, '"' + key + '"');
                str += AddIntervalTab(depth, key);
                str += '"' + value + '"\n';
            }
            else {
                str += AddDepthTab(depth, '"' + key + '"\n');
                str += AddDepthTab(depth, '{\n');
                str += WriteKeyValue(value, depth + 1);
                str += AddDepthTab(depth, '}\n');
            }
        }
        return str;
    }
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
    let Localization = vscode.commands.registerCommand('extension.Localization', () => __awaiter(this, void 0, void 0, function* () {
        let root_path = GetRootPath();
        if (root_path === undefined) {
            return;
        }
        const localization_path = root_path + '/game/dota_addons/dota_imba/localization';
        var lang_folders = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(localization_path));
        for (let i = 0; i < lang_folders.length; i++) {
            const [folder_name, is_directory] = lang_folders[i];
            if (Number(is_directory) === vscode.FileType.Directory) {
                const language_path = localization_path + '/' + folder_name;
                var language = '"lang"\n{\n\t"Language"\t\t"' + folder_name.charAt(0).toUpperCase() + folder_name.slice(1) + '"\n\t"Tokens"\n\t{\n';
                var promise = yield ReadLanguage(language_path);
                language += promise;
                language += '\t}\n}';
                fs.writeFileSync(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt', language);
                // var text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
                // text_editor.edit(function (edit_builder) {
                // 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
                // 	edit_builder.insert(new vscode.Position(0,0),language);
                // });
            }
        }
        function ReadLanguage(path) {
            return __awaiter(this, void 0, void 0, function* () {
                var lang = '';
                var files = yield vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
                for (let i = 0; i < files.length; i++) {
                    const [file_name, file_type] = files[i];
                    if (Number(file_type) === vscode.FileType.File) {
                        var document = yield vscode.workspace.openTextDocument(path + '/' + file_name);
                        for (let line = 0; line < document.lineCount; line++) {
                            const lineText = document.lineAt(line).text;
                            lang += '\t\t' + lineText + '\n';
                        }
                        lang += '\n';
                    }
                    else if (Number(file_type) === vscode.FileType.Directory) {
                        var promise = yield ReadLanguage(path + '/' + file_name);
                        lang += promise;
                    }
                }
                return Promise.resolve(lang);
            });
        }
    }));
    // 监听文本变更
    function WatchLocalization() {
        return __awaiter(this, void 0, void 0, function* () {
            let root_path = GetRootPath();
            if (root_path === undefined) {
                return;
            }
            vscode.workspace.onDidSaveTextDocument((document) => {
                if (document.uri.fsPath.search('localization') !== -1) {
                    vscode.commands.executeCommand('extension.Localization');
                }
            });
        });
    }
    WatchLocalization();
    // 添加英雄基本文件
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
                let abilities = '';
                for (const key in heroes_data.DOTAHeroes[hero_name]) {
                    if (key.search('Ability[1-9]') !== -1) {
                        var ability_name = heroes_data.DOTAHeroes[hero_name][key];
                        if (ability_name.search('generic_hidden') === -1 && ability_name.search('special_bonus') === -1) {
                            ability_override.push(ability_name);
                            ability_name += '_imba';
                        }
                        abilities += '\t\t"' + key + '"\t\t"' + ability_name + '"\n';
                    }
                }
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
    // 转到文本
    let OpenLang = vscode.commands.registerCommand('extension.OpenLang', (uri) => __awaiter(this, void 0, void 0, function* () {
        let addon_path = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
        let path_array = uri.fsPath.split('\\');
        let full_file_name = path_array[path_array.length - 1];
        let file_name = full_file_name.split('.')[0];
        let ext_name = full_file_name.split('.')[1];
        if (ext_name === 'kv') {
            vscode.window.showTextDocument(vscode.Uri.file(addon_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + file_name + '.txt'));
        }
        else if (ext_name === 'lua') {
            vscode.window.showTextDocument(vscode.Uri.file(addon_path + '/game/dota_addons/dota_imba/localization/schinese/abilities/' + path_array[path_array.length - 2] + '.txt'));
        }
    }));
    // 转到kv
    let OpenKV = vscode.commands.registerCommand('extension.OpenKV', (uri) => __awaiter(this, void 0, void 0, function* () {
        let addon_path = vscode.workspace.getConfiguration().get('dota2-tools.addon_path');
        let path_array = uri.fsPath.split('\\');
        let full_file_name = path_array[path_array.length - 1];
        let file_name = full_file_name.split('.')[0];
        let document = yield vscode.workspace.openTextDocument(vscode.Uri.file(addon_path + '/game/dota_addons/dota_imba/scripts/npc/abilities/heroes/' + path_array[path_array.length - 2] + '.kv'));
        for (let line = 0; line < document.lineCount; line++) {
            const line_text = document.lineAt(line);
            if (line_text.text.search(file_name) !== -1) {
                const options = {
                    selection: line_text.range,
                    preview: false,
                    viewColumn: vscode.ViewColumn.Two
                };
                vscode.window.showTextDocument(document, options);
                break;
            }
        }
    }));
    // 注册指令
    context.subscriptions.push(Localization);
    context.subscriptions.push(AddHero);
    context.subscriptions.push(OpenLang);
    context.subscriptions.push(OpenKV);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map