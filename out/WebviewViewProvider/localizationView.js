"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationViewProvider = void 0;
const getWebViewContent_1 = require("../utils/getWebViewContent");
class LocalizationViewProvider {
    constructor(context) {
        this.context = context;
    }
    async resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [
                this.context.extensionUri
            ]
        };
        webviewView.webview.html = await (0, getWebViewContent_1.getWebviewContent)(webviewView.webview, this.context.extensionUri, 'LocalizationViewer');
    }
}
exports.LocalizationViewProvider = LocalizationViewProvider;
LocalizationViewProvider.viewType = 'dota2tools.views.Localization';
//# sourceMappingURL=localizationView.js.map