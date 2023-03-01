"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizationViewrInit = void 0;
const vscode = require("vscode");
const localizationView_1 = require("../WebviewViewProvider/localizationView");
/** 代码补全模块 */
let localizationViewProvider;
async function localizationViewrInit(context) {
    if (localizationViewProvider === undefined) {
        localizationViewProvider = new localizationView_1.LocalizationViewProvider(context);
        context.subscriptions.push(vscode.window.registerWebviewViewProvider(localizationView_1.LocalizationViewProvider.viewType, localizationViewProvider));
    }
}
exports.localizationViewrInit = localizationViewrInit;
//# sourceMappingURL=localizationViewr.js.map