"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmdlEditorProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const addonInfo_1 = require("../module/addonInfo");
const getWebViewContent_1 = require("../utils/getWebViewContent");
const kvUtils_1 = require("../utils/kvUtils");
const eachLine_1 = require("../utils/eachLine");
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
class vmdlEditorProvider {
    constructor(context) {
        this.context = context;
    }
    static register(context) {
        const provider = new vmdlEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(vmdlEditorProvider.viewType, provider);
        return providerRegistration;
    }
    /**
     * Called when our custom editor is opened.
     *
     *
     */
    async resolveCustomTextEditor(document, webviewPanel, _token) {
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = await (0, getWebViewContent_1.getWebviewContent)(webviewPanel.webview, this.context.extensionUri, 'VmdlViewer');
        function updateWebview() {
            const vmdl = (0, kvUtils_1.readKeyValue3)(document.getText());
            if (vmdl[0] != undefined) {
                let vmalData = {
                    meshList: [],
                    material: "",
                    normal: "",
                    specular: "",
                    diffuse: "",
                };
                if (vmdl[0].rootNode.children != undefined) {
                    for (const listArr of vmdl[0].rootNode.children) {
                        if (listArr._class == "RenderMeshList") {
                            if (listArr.children != undefined) {
                                for (const meshData of listArr.children) {
                                    if (meshData._class == "RenderMeshFile") {
                                        // webviewPanel.webview.postMessage({
                                        // 	type: 'update',
                                        // 	mesh: webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(getContentDir(), meshData.filename))).toString(),
                                        // 	material: webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(getContentDir(), "eom/t7_character/t7_bulianshi/t7_bulianshi_d.tga"))).toString(),
                                        // });
                                        vmalData.meshList.push(webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join((0, addonInfo_1.getContentDir)(), meshData.filename))).toString());
                                        // break;
                                    }
                                }
                            }
                        }
                        else if (listArr._class == "MaterialGroupList") {
                            if (listArr.children != undefined) {
                                for (const materialData of listArr.children) {
                                    if (materialData._class == "DefaultMaterialGroup" && materialData.remaps != undefined) {
                                        for (const material of materialData.remaps) {
                                            const materialKV = readVmat(fs.readFileSync(path.join((0, addonInfo_1.getContentDir)(), material.to), "utf-8"));
                                            vmalData.material = getWebviewPath(materialKV["TextureColor"]);
                                            vmalData.normal = getWebviewPath(materialKV.TextureNormal);
                                            vmalData.specular = getWebviewPath(materialKV.TextureSpecularMask);
                                            vmalData.diffuse = getWebviewPath(materialKV.TextureMetalnessMask);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    webviewPanel.webview.postMessage({
                        type: 'update',
                        vmalData: vmalData
                    });
                }
            }
        }
        /** 读取贴图文件 */
        function readVmat(data) {
            let res = {};
            (0, eachLine_1.eachLine)(data, (index, line) => {
                const lineData = line.replace(/\t/g, "").replace(" ", "__split__").split("__split__");
                if (lineData.length > 1) {
                    const key = lineData[0];
                    if (key.indexOf("//") == -1) {
                        let value = lineData[1];
                        if (value.match(/".*"/)) {
                            value = value.replace(/"(.*)"/, "$1");
                        }
                        else {
                            value = Number(value);
                        }
                        res[key] = value;
                    }
                }
            });
            return res;
        }
        /** 获取路径 */
        function getWebviewPath(_path) {
            return webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join((0, addonInfo_1.getContentDir)(), _path))).toString();
        }
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
        });
        updateWebview();
    }
}
exports.vmdlEditorProvider = vmdlEditorProvider;
vmdlEditorProvider.viewType = 'dota2tools.vmdl';
//# sourceMappingURL=vmdlEditorProvider.js.map