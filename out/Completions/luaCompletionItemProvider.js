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
        detail += ')\n```';
        return new vscode.MarkdownString(detail);
    }
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