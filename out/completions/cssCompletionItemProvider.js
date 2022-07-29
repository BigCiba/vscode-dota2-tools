"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssCompletionItemProvider = void 0;
const vscode = require("vscode");
class CssCompletionItemProvider {
    constructor(context, dotaApiNote) {
        this.dotaApiNote = dotaApiNote;
        this.selector = [{ scheme: 'file', language: 'css' }, { scheme: 'file', language: 'less' }, { scheme: 'file', language: 'sass' }, { scheme: 'file', language: 'scss' }];
        // this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
        this.document = dotaApiNote.getCssApiNote();
        this.snippets = [];
        this.refreshDocument();
    }
    refreshDocument() {
        this.document = this.dotaApiNote.getCssApiNote();
        for (const cssName in this.document) {
            let item = new vscode.CompletionItem(cssName, vscode.CompletionItemKind.Property);
            // item.detail = funInfo.description;
            item.documentation = new vscode.MarkdownString(this.document[cssName].description);
            item.insertText = this.getInsertText(cssName);
            this.snippets.push(item);
        }
    }
    getInsertText(cssName) {
        let insertText = cssName + ': $1;';
        return new vscode.SnippetString(insertText);
    }
    provideCompletionItems(document, position, token, context) {
        return this.snippets;
    }
}
exports.CssCompletionItemProvider = CssCompletionItemProvider;
//# sourceMappingURL=cssCompletionItemProvider.js.map