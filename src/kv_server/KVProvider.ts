import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
import { KVServer, KVDOWNLOADALL_COMMAND, KVDOWNLOAD_COMMAND, KV_OPEN_FILE_COMMAND } from './KVServer';

interface kvlist {
	[addonname: string]: { files: string[], file_index: { [fileName: string]: string } }
}

export interface kvNode {
	js_path: string
	file_path: string
	type: 'addon' | 'file'
}

export class KvProvider implements vscode.TreeDataProvider<kvNode> {
	list: kvlist | null = null

	private _onDidChangeTreeData: vscode.EventEmitter<kvNode | null> = new vscode.EventEmitter<kvNode | null>();
	readonly onDidChangeTreeData: vscode.Event<kvNode | null> = this._onDidChangeTreeData.event;

	constructor(context: vscode.ExtensionContext) {
		// this.request()
	}

	refresh(kvNode?: kvNode): void {
		if (kvNode) {
			this._onDidChangeTreeData.fire(kvNode);
		} else {
			this._onDidChangeTreeData.fire(null);
		}
	}

	async request() {
		return new Promise(resolve => {
			const url = KVServer.url
			const req = request.post(
				url + '?action=kvlist&mod=kv_ctx',
				{
					body: JSON.stringify({
						steamid: KVServer.steamid,
					})
				},
				((error: any, response: request.Response, body: any) => {

					if (response && response.statusCode == 200) {
						const data = JSON.parse(body);
						this.list = {}
						for (const addonname in data) {
							const v = data[addonname];
							this.list[addonname] = {
								files: v.files,
								file_index: v._index
							}
						}
						resolve(1);
					}
				}).bind(this)
			)
		})
	}

	getFiles(addonname: string): kvNode[] {
		const res: kvNode[] = []
		if (this.list && this.list[addonname]) {
			const file_index = this.list[addonname].file_index
			const files = this.list[addonname].files
			for (const k in files) {
				const file_path = files[k];
				const file_name = file_path.slice(file_path.lastIndexOf('/') + 1, file_path.length)
				res.push({ type: "file", file_path: file_path, js_path: file_index[file_name] })
			}
		}
		return res
	}

	getAddons(): kvNode[] {
		const res: kvNode[] = []
		for (const addonname in this.list) {
			res.push({ type: "addon", file_path: addonname, js_path: "" })
		}
		return res
	}

	getTreeItem(node: kvNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		const fileName = node.file_path.slice(node.file_path.lastIndexOf('/') + 1, node.file_path.length)
		let treeItem: any = new vscode.TreeItem(fileName, node.type == "addon" ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
		if (node.type == "addon") {
			let files: any = this.getFiles(node.file_path)
			// files = Promise.resolve(files)
			// treeItem.command = {
			// command: KVDOWNLOADALL_COMMAND,
			// title: 'downloadall',
			// arguments: [node]
			// };
		} else if (node.type == "file") {
			treeItem.command = {
				command: KVDOWNLOAD_COMMAND,
				title: 'download',
				arguments: [node]
			};
		}

		// treeItem.iconPath = this.getIcon(valueNode);
		treeItem.contextValue = node.type;
		treeItem.file_path = node.file_path
		treeItem.js_path = node.js_path
		treeItem.type = node.type
		return treeItem;
	}

	async getChildren(node?: kvNode | undefined): Promise<kvNode[]> {
		if (node) {
			if (node.type == "addon") {
				const files = this.getFiles(node.file_path)
				return Promise.resolve(files)
			}
			return Promise.resolve([node]);
		} else {
			await this.request();
			const addons = this.getAddons()
			return Promise.resolve(addons);
		}
	}
}
