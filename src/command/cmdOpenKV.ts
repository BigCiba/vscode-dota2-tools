import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import { getScriptFiles, refreshScriptFiles } from '../definitionProvider/kv2lua';
import { getGameDir } from '../module/addonInfo';
import { removeComment } from '../utils/kvUtils';

export async function openKV(context: vscode.ExtensionContext) {
	const textEditor = vscode.window.activeTextEditor;
	const gameDir = getGameDir();
	if (textEditor !== undefined) {
		let document = textEditor.document;
		const fileName = document.fileName;
		const position = textEditor.selection.start;
		let scriptFiles = getScriptFiles();
		let word = document.getText(document.getWordRangeAtPosition(position));
		// 如果是modifier则搜寻技能名（必须同一文件）
		if (scriptFiles[word] === undefined) {
			let kvString = fs.readFileSync(fileName, 'utf-8');
			const rows: string[] = kvString.split(os.EOL);
			let configConditions: string[] | undefined = vscode.workspace.getConfiguration().get("dota2-tools.ability class constructor");
			let tsConfig = vscode.workspace.getConfiguration().get("dota2-tools.A6.Kv to lua generate typescript") as boolean;
			for (let i = 0; i < rows.length; i++) {
				const lineText: string = rows[i];
				if (configConditions) {
					for (const keyword of configConditions) {
						if (tsConfig) {
							let reg = new RegExp("class (.*) extends " + keyword);
							if (reg.test(lineText) === true) {
								word = lineText.replace(reg, (substring) => {
									return "$1";
								});
							}
						} else {
							let reg = new RegExp(".* = " + keyword);
							if (reg.test(lineText) === true) {
								word = lineText.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
							}
						}
					}
				}
				if (tsConfig) {
					if (/class (.*) extends BaseAbility/.test(lineText) === true) {
						word = lineText.replace(/class (.*) extends BaseAbility/, (substring) => {
							return "$1";
						});
					}
				} else {
					if (/.* = class/.test(lineText) === true && /modifier_.* = class/.test(lineText) === false) {
						word = lineText.split('=')[0].replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
					}
				}
			}
		}
		// 还是空尝试更新关系表
		if (scriptFiles[word] === undefined) {
			await refreshScriptFiles();
		}
		if (scriptFiles[word] !== undefined) {
			let kvString = fs.readFileSync(gameDir + '/scripts/npc/npc_abilities_custom.txt', 'utf-8');
			kvString = removeComment(kvString);
			let rows: string[] = kvString.split(os.EOL);
			for (let i = 0; i < rows.length; i++) {
				const lineText: string = rows[i];
				if (lineText.search(/#base ".*"/) !== -1) {
					let basePath = lineText.split('"')[1];
					let bFind: number | boolean = getKVInfo(gameDir + '/scripts/npc/' + basePath, word);

					if (bFind !== false && typeof (bFind) === 'number') {
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/' + basePath));
						const options = {
							selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
							preview: false,
							viewColumn: vscode.ViewColumn.Two
						};
						vscode.window.showTextDocument(document, options);
						break;
					}
					continue;
				} else {
					if (lineText.search(word) !== -1) {
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/npc_abilities_custom.txt'));
						const options = {
							selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
							preview: false,
							viewColumn: vscode.ViewColumn.Two
						};
						vscode.window.showTextDocument(document, options);
						break;
					}
				}
			}
			kvString = fs.readFileSync(gameDir + '/scripts/npc/npc_items_custom.txt', 'utf-8');
			kvString = removeComment(kvString);
			rows = kvString.split(os.EOL);
			for (let i = 0; i < rows.length; i++) {
				const lineText: string = rows[i];
				if (lineText.search(/#base ".*"/) !== -1) {
					let basePath = lineText.split('"')[1];
					let bFind: number | boolean = getKVInfo(gameDir + '/scripts/npc/' + basePath, word);

					if (bFind !== false && typeof (bFind) === 'number') {
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/' + basePath));
						const options = {
							selection: new vscode.Range(new vscode.Position(bFind, 0), new vscode.Position(bFind, 0)),
							preview: false,
							viewColumn: vscode.ViewColumn.Two
						};
						vscode.window.showTextDocument(document, options);
						break;
					}
					continue;
				} else {
					if (lineText.search(word) !== -1) {
						let document: vscode.TextDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(gameDir + '/scripts/npc/npc_abilities_custom.txt'));
						const options = {
							selection: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
							preview: false,
							viewColumn: vscode.ViewColumn.Two
						};
						vscode.window.showTextDocument(document, options);
						break;
					}
				}
			}
		}
	}
	function getKVInfo(fullPath: string, word: string): number | boolean {
		let kvString = fs.readFileSync(fullPath, 'utf-8');
		const rows: string[] = kvString.split(os.EOL);
		for (let i = 0; i < rows.length; i++) {
			const lineText: string = rows[i];
			if (lineText.search(word) !== -1) {
				return i;
			}
		}
		return false;
	}
}