"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuaCompletionItemProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class LuaCompletionItemProvider {
    constructor(context) {
        this.selector = { scheme: 'file', language: 'lua' };
        this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dota_script_help2.json'), 'utf-8'));
        this.snippets = [];
        for (const className in this.document.class_list) {
            for (const funInfo of this.document.class_list[className]) {
                let item = new vscode.CompletionItem(funInfo.function, vscode.CompletionItemKind.Function);
                item.detail = funInfo.description;
                item.documentation = this.getDocumentation(funInfo);
                item.insertText = this.getInsertText(funInfo);
                this.snippets.push(item);
            }
        }
        for (const enumType in this.document.enum_list) {
            for (const enumInfo of this.document.enum_list[enumType]) {
                let item = new vscode.CompletionItem(enumInfo.name, vscode.CompletionItemKind.Enum);
                item.detail = (enumInfo.function ? (enumInfo.function) : 'Value: ' + enumInfo.value);
                item.documentation = new vscode.MarkdownString(enumInfo.description || enumInfo.description_lite);
                item.insertText = enumInfo.name + (enumInfo.function ? ('\n-- ' + enumInfo.function) : '');
                this.snippets.push(item);
            }
        }
    }
    getDocumentation(funInfo) {
        let detail = '```lua\n' + funInfo.return + ' ' + funInfo.function + '(';
        let count = 1;
        for (let paramsName in funInfo.params) {
            let paramsNoteName = funInfo.params[paramsName].params_name || paramsName;
            if (count === 1) {
                detail += paramsNoteName;
            }
            else {
                detail += ', ' + paramsNoteName;
            }
            count++;
        }
        detail += ')\n```\n';
        detail += (funInfo.server === true ? '✔️' : '❌') + ' `Server: ' + funInfo.class + '`  \n';
        detail += (funInfo.client === true ? '✔️' : '❌') + ' `Client: ' + funInfo.class_cl + '`  \n\n';
        detail += 'Type|Name|Description\n:-|:-|:-\n';
        for (let params_name in funInfo.params) {
            const params_info = funInfo.params[params_name];
            let params_name_note = params_info.params_name || params_name;
            detail += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
        }
        return new vscode.MarkdownString(detail);
    }
    /**
     * 获取补全
     * @param {LuaFunction} funInfo
     * @return {*}
     * @memberof LuaCompletionItemProvider
     */
    getInsertText(funInfo) {
        let insertText = funInfo.function + '(';
        let count = 1;
        for (let paramsName in funInfo.params) {
            let paramsNoteName = funInfo.params[paramsName].params_name || paramsName;
            if (count === 1) {
                insertText += ('${' + count + ':' + paramsNoteName + '}');
            }
            else {
                insertText += ', ' + ('${' + count + ':' + paramsNoteName + '}');
            }
            count++;
        }
        insertText += ')';
        return new vscode.SnippetString(insertText);
    }
    provideCompletionItems(document, position, token, context) {
        return this.snippets;
    }
}
exports.LuaCompletionItemProvider = LuaCompletionItemProvider;
//# sourceMappingURL=luaCompletionItemProvider.js.map