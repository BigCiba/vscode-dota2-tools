"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCompletionItemProvider = void 0;
const vscode_1 = require("vscode");
class BaseCompletionItemProvider {
    provideCompletionItems(document, position, token, context) {
        let item = new vscode_1.CompletionItem("prefix", vscode_1.CompletionItemKind.Snippet);
        item.insertText = new vscode_1.SnippetString("这是内容");
        item.detail = "这是详细";
        item.documentation = new vscode_1.MarkdownString("这是文档");
        return [item];
    }
}
exports.BaseCompletionItemProvider = BaseCompletionItemProvider;
//# sourceMappingURL=completionItemProvider.js.map