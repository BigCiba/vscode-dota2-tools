import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { getGameDir } from '../module/addonInfo';
import { readKeyValueWithBase } from '../utils/kvUtils';
import { getRootPath } from '../utils/getRootPath';
import { EventManager, EventType } from '../class/event';
import { getPathInfo } from '../utils/pathUtils';

/** 关联kv的脚本路径 */
let scriptFiles: Table = {};
let defJump: vscode.Disposable;

export async function kv2luaInit(context: vscode.ExtensionContext) {
	refreshScriptFiles();
	const gameDir = getGameDir();
	function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		const fileName = document.fileName;
		// const workDir = path.dirname(fileName);
		// const word = document.getText(document.getWordRangeAtPosition(position));
		const line: vscode.TextLine = document.lineAt(position);

		// console.log('====== 进入 provideDefinition 方法 ======');
		// console.log('fileName: ' + fileName); // 当前文件完整路径
		// console.log('workDir: ' + workDir); // 当前文件所在目录
		// console.log('word: ' + word); // 当前光标所在单词
		// console.log('line: ' + line.text); // 当前光标所在行
		// console.log();

		// 只处理package.json文件
		if (/.*\.kv/.test(fileName) || /.*\.txt/.test(fileName)) {
			const json = document.getText();
			// console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
			// console.log(new RegExp(`"ScriptFile"`).test(line.text));

			if (new RegExp(`"ScriptFile"`).test(line.text)) {
				let luaPath = line.text.split('"')[3];
				let destPath = `${gameDir}/scripts/vscripts/${luaPath}.lua`;
				// console.log(destPath);

				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				} else {
					mkdirp(path.dirname(destPath));
					fs.writeFileSync(destPath, getLuaScriptSnippet(path.basename(luaPath).replace('.lua', ''), luaPath, context));
				}
			}
		}
	}
	if (defJump !== undefined) {
		defJump.dispose();
	}
	defJump = vscode.languages.registerDefinitionProvider([{ pattern: '**/*.txt' }, { pattern: '**/*.kv' }], { provideDefinition });
	context.subscriptions.push(defJump);
}

/** 更新关联表 */
export async function refreshScriptFiles() {
	const gameDir = getGameDir();
	if (await getPathInfo(gameDir + '/scripts/npc/npc_abilities_custom.txt') === false) {
		return;
	}
	let abilityKv: any = await readKeyValueWithBase(gameDir + '/scripts/npc/npc_abilities_custom.txt');
	for (const key in abilityKv.DOTAAbilities) {
		const value = abilityKv.DOTAAbilities[key];
		if (typeof (value) === 'object') {
			scriptFiles[key] = gameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
		}
	}

	let itemKv: any = await readKeyValueWithBase(gameDir + '/scripts/npc/npc_items_custom.txt');
	for (const key in itemKv.DOTAAbilities) {
		const value = itemKv.DOTAAbilities[key];
		if (typeof (value) === 'object') {
			scriptFiles[key] = gameDir + '/scripts/vscripts/' + value.ScriptFile + '.lua';
		}
	}

}
export function getScriptFiles() {
	return scriptFiles;
}

/** 自动生成的技能物品lua文件模板 */
function getLuaScriptSnippet(filename: string, luaPath: string, context?: vscode.ExtensionContext): string {
	try {
		const templateConfig: Table = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles') as Table;
		let snippetPath = (filename.indexOf("item_") === -1) ? ((getRootPath() + templateConfig.ability).replace(/\\/g, "/")) : ((getRootPath() + templateConfig.item).replace(/\\/g, "/"));
		let snippet = fs.readFileSync(snippetPath, "utf-8");
		snippet = snippet.replace(/\[filename\]/g, filename);
		snippet = snippet.replace(/\[path\]/g, luaPath);
		return snippet;
	} catch (error) {
		console.log("[warning]:No snippet file");
	}
	if (context) {
		let snippet = fs.readFileSync(path.join(context.extensionPath, 'resource', 'lua_template.lua'), "utf-8");
		snippet = snippet.replace(/filename/g, filename);
		snippet = snippet.replace(/path/g, luaPath);
		return snippet;
	}
	return '';
}