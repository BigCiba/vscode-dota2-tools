"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsCompletionItemProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class JsCompletionItemProvider {
    constructor(context, dotaApiNote) {
        this.dotaApiNote = dotaApiNote;
        this.selector = { scheme: 'file', language: 'js' };
        this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
        this.snippets = [];
        for (const className in this.document.class_list) {
            for (const funName in this.document[className]) {
                let funInfo = this.document[className][funName];
                if (funInfo.function) {
                    let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Function);
                    item.detail = funInfo.description;
                    item.documentation = this.getDocumentation(funInfo);
                    item.insertText = funInfo.signature;
                    this.snippets.push(item);
                }
                else {
                    let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Enum);
                    item.detail = funInfo.value;
                    item.documentation = this.getDocumentation(funInfo);
                    item.insertText = funInfo.enumerator;
                    this.snippets.push(item);
                }
            }
        }
    }
    getDocumentation(funInfo) {
        let detail = '```js\n' + funInfo.signature + '\n```';
        return new vscode.MarkdownString(detail);
    }
    getInsertText(funInfo) {
        return new vscode.SnippetString(funInfo.signature);
    }
    provideCompletionItems(document, position, token, context) {
        return this.snippets;
    }
}
exports.JsCompletionItemProvider = JsCompletionItemProvider;
//# sourceMappingURL=jsCompletionItemProvider.js.map