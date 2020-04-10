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
const path = require("path");
const vscode = require("vscode");
const util_1 = require("./util");
/**
 * Provider for cat scratch editors.
 *
 * Cat scratch editors are used for `.cscratch` files, which are just json files.
 * To get started, run this extension and open an empty `.cscratch` file in VS Code.
 *
 * This provider demonstrates:
 *
 * - Setting up the initial webview for a custom editor.
 * - Loading scripts and styles in a custom editor.
 * - Synchronizing changes between a text document and a custom editor.
 */
class ActiveListEditorProvider {
    constructor(context) {
        this.context = context;
    }
    static register(context) {
        const provider = new ActiveListEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(ActiveListEditorProvider.viewType, provider);
        return providerRegistration;
    }
    /**
     * Called when our custom editor is opened.
     *
     *
     */
    resolveCustomTextEditor(document, webviewPanel, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Setup initial content for the webview
            webviewPanel.webview.options = {
                enableScripts: true,
            };
            webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
            const imgUri = vscode.Uri.file(path.join(this.context.extensionPath, 'images', 'heroes_icon')).with({ scheme: 'vscode-resource' }).toString();
            function updateWebview() {
                webviewPanel.webview.postMessage({
                    type: 'update',
                    text: JSON.stringify(util_1.ReadKeyValue2(document.getText())),
                    uri: imgUri
                });
            }
            // Hook up event handlers so that we can synchronize the webview with the text document.
            //
            // The text document acts as our model, so we have to sync change in the document to our
            // editor and sync changes in the editor back to the document.
            // 
            // Remember that a single text document can also be shared between multiple custom
            // editors (this happens for example when you split a custom editor)
            const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
                if (e.document.uri.toString() === document.uri.toString()) {
                    updateWebview();
                }
            });
            // Make sure we get rid of the listener when our editor is closed.
            webviewPanel.onDidDispose(() => {
                changeDocumentSubscription.dispose();
            });
            // Receive message from the webview.
            webviewPanel.webview.onDidReceiveMessage(e => {
                switch (e.type) {
                    case 'add':
                        this.addNewScratch(document);
                        return;
                    case 'delete':
                        this.deleteScratch(document, e.id);
                        return;
                    case 'change':
                        this.Change(document, e.id);
                        return;
                }
            });
            updateWebview();
        });
    }
    /**
     * Get the static html used for the editor webviews.
     */
    getHtmlForWebview(webview) {
        // Local path to script and css for the webview
        const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'resource', 'view', 'catScratch.js')));
        const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'resource', 'view', 'catScratch.css')));
        const imgUri = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'images', 'heroes_icon', 'npc_dota_hero_abyssal_underlord_png.png')));
        // Use a nonce to whitelist which scripts can be run
        const nonce = util_1.getNonce();
        return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">


				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleUri}" rel="stylesheet" />

				<title>Cat Scratch</title>
			</head>
			<body>
				<div class="active-list">
				</div>
				
				<script type="module" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
    /**
     * Add a new scratch to the current document.
     */
    addNewScratch(document) {
        const json = this.getDocumentAsJson(document);
        const character = ActiveListEditorProvider.scratchCharacters[Math.floor(Math.random() * ActiveListEditorProvider.scratchCharacters.length)];
        json.scratches = [
            ...(Array.isArray(json.scratches) ? json.scratches : []),
            {
                id: util_1.getNonce(),
                text: character,
                created: Date.now(),
            }
        ];
        return this.updateTextDocument(document, json);
    }
    /**
     * Delete an existing scratch from a document.
     */
    deleteScratch(document, id) {
        const json = this.getDocumentAsJson(document);
        if (!Array.isArray(json.scratches)) {
            return;
        }
        json.scratches = json.scratches.filter((note) => note.id !== id);
        return this.updateTextDocument(document, json);
    }
    Change(document, id) {
        const json = this.getDocumentAsJson(document);
        // if (!Array.isArray(json.CustomHeroList)) {
        // 	return;
        // }
        let mark = json.CustomHeroList[id];
        if (mark === "0") {
            mark = "1";
        }
        else {
            mark = "0";
        }
        json.CustomHeroList[id] = mark;
        // json.scratches = json.scratches.filter((note: any) => note.id !== id);
        return this.updateTextDocument(document, json);
    }
    /**
     * Try to get a current document as json text.
     */
    getDocumentAsJson(document) {
        const text = JSON.stringify(util_1.ReadKeyValue2(document.getText()));
        if (text.trim().length === 0) {
            return {};
        }
        try {
            return JSON.parse(text);
        }
        catch (_a) {
            throw new Error('Could not get document as json. Content is not valid json');
        }
    }
    /**
     * Write out the json to a given document.
     */
    updateTextDocument(document, json) {
        const edit = new vscode.WorkspaceEdit();
        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), util_1.WriteKeyValue(json));
        // JSON.stringify(json, null, 2));
        return vscode.workspace.applyEdit(edit);
    }
}
exports.ActiveListEditorProvider = ActiveListEditorProvider;
ActiveListEditorProvider.viewType = 'dota2tools.ActiveList';
ActiveListEditorProvider.scratchCharacters = ['🦵', '💦', '🦍', '🙈'];
//# sourceMappingURL=activelistEditor.js.map