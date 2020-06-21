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
const vscode = require("vscode");
const request = require("request");
const KVServer_1 = require("./KVServer");
class KvProvider {
    constructor(context) {
        this.list = null;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.request();
    }
    refresh(kvNode) {
        if (kvNode) {
            this._onDidChangeTreeData.fire(kvNode);
        }
        else {
            this._onDidChangeTreeData.fire(null);
        }
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const url = KVServer_1.KVServer.url;
                const req = request.post(url + '?action=kvlist&mod=kv_ctx', {
                    body: JSON.stringify({
                        steamid: KVServer_1.KVServer.steamid,
                    })
                }, ((error, response, body) => {
                    const data = JSON.parse(body);
                    console.log(11111);
                    console.log(data);
                    if (response.statusCode == 200) {
                        const data = JSON.parse(body);
                        this.list = {};
                        for (const addonname in data) {
                            const v = data[addonname];
                            this.list[addonname] = {
                                files: v.files,
                                file_index: v._index
                            };
                        }
                        resolve(1);
                    }
                }).bind(this));
            });
        });
    }
    getFiles(addonname) {
        const res = [];
        if (this.list && this.list[addonname]) {
            const file_index = this.list[addonname].file_index;
            const files = this.list[addonname].files;
            for (const k in files) {
                const file_path = files[k];
                const file_name = file_path.slice(file_path.lastIndexOf('/') + 1, file_path.length);
                res.push({ type: "file", file_path: file_path, js_path: file_index[file_name] });
            }
        }
        return res;
    }
    getAddons() {
        const res = [];
        for (const addonname in this.list) {
            res.push({ type: "addon", file_path: addonname, js_path: "" });
        }
        return res;
    }
    getTreeItem(node) {
        const fileName = node.file_path.slice(node.file_path.lastIndexOf('/') + 1, node.file_path.length);
        let treeItem = new vscode.TreeItem(fileName, node.type == "addon" ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        if (node.type == "addon") {
            let files = this.getFiles(node.file_path);
            // files = Promise.resolve(files)
            // treeItem.command = {
            // command: KVDOWNLOADALL_COMMAND,
            // title: 'downloadall',
            // arguments: [node]
            // };
        }
        else if (node.type == "file") {
            treeItem.command = {
                command: KVServer_1.KVDOWNLOAD_COMMAND,
                title: 'download',
                arguments: [node]
            };
        }
        // treeItem.iconPath = this.getIcon(valueNode);
        treeItem.contextValue = node.type;
        treeItem.file_path = node.file_path;
        treeItem.js_path = node.js_path;
        treeItem.type = node.type;
        return treeItem;
    }
    getChildren(node) {
        return __awaiter(this, void 0, void 0, function* () {
            if (node) {
                if (node.type == "addon") {
                    const files = this.getFiles(node.file_path);
                    return Promise.resolve(files);
                }
                return Promise.resolve([node]);
            }
            else {
                yield this.request();
                const addons = this.getAddons();
                return Promise.resolve(addons);
            }
        });
    }
}
exports.KvProvider = KvProvider;
//# sourceMappingURL=KVProvider.js.map