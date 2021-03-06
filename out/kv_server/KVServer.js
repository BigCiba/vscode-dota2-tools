"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVServer = exports.KV_OPEN_FILE_COMMAND = exports.KVDOWNLOADALL_COMMAND = exports.KVDOWNLOAD_COMMAND = exports.KVREFRESH_COMMAND = void 0;
const vscode = require("vscode");
const request = require("request");
const fs = require("fs");
const KVProvider_1 = require("./KVProvider");
exports.KVREFRESH_COMMAND = "tss.kvTools.refresh";
exports.KVDOWNLOAD_COMMAND = "tss.kvTools.download";
exports.KVDOWNLOADALL_COMMAND = "tss.kvTools.downloadall";
exports.KV_OPEN_FILE_COMMAND = "tss.kvTools.openFile";
class KVServer {
    static ReadConfig() {
        // 配置变更
        vscode.workspace.onDidChangeConfiguration((event) => {
            KVServer.url = vscode.workspace.getConfiguration().get(KVServer.ConfigUrl);
            KVServer.steamid = vscode.workspace.getConfiguration().get(KVServer.ConfigSteamid);
        });
        KVServer.url = vscode.workspace.getConfiguration().get(KVServer.ConfigUrl);
        KVServer.steamid = vscode.workspace.getConfiguration().get(KVServer.ConfigSteamid);
    }
    static Install(context) {
        this.ReadConfig();
        const kvProvider = new KVProvider_1.KvProvider(context);
        vscode.window.registerTreeDataProvider('kvdownloadExplorer', kvProvider);
        vscode.commands.registerCommand(exports.KVREFRESH_COMMAND, () => kvProvider.refresh());
        const download = (file_path, js_path) => {
            const url = KVServer.url;
            let msg;
            let res = request.post(url + '?action=d1&mod=kv_ctx', {
                body: JSON.stringify({
                    file_path: file_path,
                })
            }, (error, response, body) => {
                const path = file_path;
                const fileName = path.slice(path.lastIndexOf('/') + 1, path.length);
                if (response.statusCode == 200) {
                    let str = body;
                    // if (fileName.indexOf('.js') > -1) {
                    // 	str = "GameUI." + fileName.slice(0, fileName.indexOf('.')) + " = " + body
                    // }
                    fs.writeFileSync((js_path + fileName), str);
                    msg = 'Download kv ' + fileName + ' succend.';
                }
                else {
                    msg = 'Download kv ' + fileName + ' failed.';
                }
                vscode.window.showInformationMessage(msg);
            });
        };
        vscode.commands.registerCommand(exports.KVDOWNLOAD_COMMAND, (node) => {
            console.log(node);
            download(node.file_path, node.js_path);
        });
        vscode.commands.registerCommand(exports.KVDOWNLOADALL_COMMAND, (node) => {
            let nodes = kvProvider.getFiles(node.file_path);
            for (const k in nodes) {
                const node = nodes[k];
                download(node.file_path, node.js_path);
            }
        });
        vscode.commands.registerCommand(exports.KV_OPEN_FILE_COMMAND, (node) => {
            const path = node.file_path;
            const fileName = path.slice(path.lastIndexOf('/') + 1, path.length);
            vscode.workspace.openTextDocument(node.js_path + fileName);
        });
    }
}
exports.KVServer = KVServer;
KVServer.ConfigUrl = "dota2-tools.KV Server";
KVServer.ConfigSteamid = "dota2-tools.KV Server Steamid";
//# sourceMappingURL=KVServer.js.map