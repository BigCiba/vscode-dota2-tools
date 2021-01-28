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
exports.ItemGamesBrowser = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const util_1 = require("../util");
/**
 * item_game.txt里的饰品查询
 * @export
 * @param {vscode.ExtensionContext} context
 */
function ItemGamesBrowser(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const panel = vscode.window.createWebviewPanel('ItemsBrowser', // viewType
        "Items Browser", // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.webview.postMessage({
            type: "init",
            data: JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/items_game.json"), 'utf-8')),
            localize_data: {
                "zh-cn": util_1.ReadKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_schinese.txt"), 'utf-8'), false).lang.Tokens,
                "en": util_1.ReadKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_english.txt"), 'utf-8'), false).lang.Tokens,
            }
        });
        panel.webview.html = util_1.GetWebViewContent(context, 'webview/ItemsBrowser/ItemsBrowser.html');
    });
}
exports.ItemGamesBrowser = ItemGamesBrowser;
//# sourceMappingURL=itemGamesBrowser.js.map