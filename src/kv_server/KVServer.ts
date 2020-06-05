import * as vscode from 'vscode';
import * as request from 'request';
import * as fs from 'fs';
import { Response } from 'request';
import { KvProvider, kvNode } from './KVProvider';

export const KVREFRESH_COMMAND = "tss.kvTools.refresh"
export const KVDOWNLOAD_COMMAND = "tss.kvTools.download"
export const KVDOWNLOADALL_COMMAND = "tss.kvTools.downloadall"
export const KV_OPEN_FILE_COMMAND = "tss.kvTools.openFile"

export class KVServer {
	static ConfigUrl = "dota2-tools.KV Server"
	static ConfigSteamid = "dota2-tools.KV Server Steamid"

	static url?: string
	static steamid?: string

	static ReadConfig() {
		// 配置变更
		vscode.workspace.onDidChangeConfiguration((event) => {
			KVServer.url = vscode.workspace.getConfiguration().get(KVServer.ConfigUrl)
			KVServer.steamid = vscode.workspace.getConfiguration().get(KVServer.ConfigSteamid)
		});
		KVServer.url = vscode.workspace.getConfiguration().get(KVServer.ConfigUrl)
		KVServer.steamid = vscode.workspace.getConfiguration().get(KVServer.ConfigSteamid)
	}

	static Install(context: vscode.ExtensionContext) {
		this.ReadConfig()

		const kvProvider = new KvProvider(context)
		vscode.window.registerTreeDataProvider('kvdownloadExplorer', kvProvider);
		vscode.commands.registerCommand(KVREFRESH_COMMAND, () => kvProvider.refresh())

		const download = (file_path: string, js_path: string) => {
			const url = KVServer.url
			let msg: string
			let res = request.post(
				url + '?action=d1&mod=kv_ctx',
				{
					body: JSON.stringify({
						file_path: file_path,
					})
				},
				(error: any, response: Response, body: any) => {
					const path = file_path
					const fileName = path.slice(path.lastIndexOf('/') + 1, path.length)

					if (response.statusCode == 200) {
						let str = body
						// if (fileName.indexOf('.js') > -1) {
						// 	str = "GameUI." + fileName.slice(0, fileName.indexOf('.')) + " = " + body
						// }
						fs.writeFileSync((js_path + fileName), str)
						msg = 'Download kv ' + fileName + ' succend.'
					} else {
						msg = 'Download kv ' + fileName + ' failed.'
					}

					vscode.window.showInformationMessage(msg);
				}
			)
		}
		vscode.commands.registerCommand(KVDOWNLOAD_COMMAND, (node: kvNode) => {
			download(node.file_path, node.js_path)
		})
		vscode.commands.registerCommand(KVDOWNLOADALL_COMMAND, (node: kvNode) => {
			let nodes: any = kvProvider.getFiles(node.file_path)
			for (const k in nodes) {
				const node = nodes[k];
				download(node.file_path, node.js_path)
			}
		})
		vscode.commands.registerCommand(KV_OPEN_FILE_COMMAND, (node: kvNode) => {
			const path = node.file_path
			const fileName = path.slice(path.lastIndexOf('/') + 1, path.length)
			vscode.workspace.openTextDocument(node.js_path + fileName);
		})
	}
}
