import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as vscode from 'vscode';
import { EventManager, EventType } from '../Class/event';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { getRootPath } from '../utils/getRootPath';
import { readKeyValueWithBase } from '../utils/kvUtils';
import { getPathInfo } from '../utils/pathUtils';

/** 关联kv的脚本路径 */
let scriptFiles: Table = {};
let defJump: vscode.Disposable;
let eventID: number;
const enableConfigName = "dota2-tools.A6.Kv to lua generate script";
const tsConfigName = "dota2-tools.A6.Kv to lua generate typescript";
let enableConfig: boolean | undefined;
let tsConfig: boolean | undefined;

/** 扩展名 */
let extensionName = ".lua";

export async function kv2luaInit(context: vscode.ExtensionContext) {
	enableConfig = getConfiguration(enableConfigName);
	tsConfig = getConfiguration(tsConfigName);

	extensionName = tsConfig ? ".ts" : ".lua";
	let scriptDir = tsConfig ? getContentDir() : getGameDir();

	if (eventID === undefined) {
		eventID = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
			if (event.affectsConfiguration(enableConfigName) && getConfiguration(enableConfigName) === enableConfig) {
				enableConfig = getConfiguration(enableConfigName);
			} else if (event.affectsConfiguration(tsConfigName) && getConfiguration(tsConfigName) === tsConfig) {
				tsConfig = getConfiguration(tsConfigName);
				extensionName = tsConfig ? ".ts" : ".lua";
				scriptDir = tsConfig ? getContentDir() : getGameDir();
				refreshScriptFiles();
			}
		});
	}
	refreshScriptFiles();
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
				let destPath = `${scriptDir}/scripts/vscripts/${luaPath}${extensionName}`;
				// console.log(destPath);

				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				} else {
					if (enableConfig) {
						mkdirp(path.dirname(destPath));

						let nextLine = document.lineAt(new vscode.Position(line.lineNumber + 1, 0));
						let snippetPath: string | undefined = undefined;
						if (new RegExp(`"_ScriptTemplate"`).test(nextLine.text)) {
							let _temp = nextLine.text.split('"')[3];
							if (_temp != undefined) {
								snippetPath = `${scriptDir}/scripts/vscripts/${_temp}`;
							}
						}

						fs.writeFileSync(destPath, getLuaScriptSnippet(path.basename(luaPath).replace(extensionName, ''), luaPath, context, snippetPath));
					}
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
	const scriptDir = tsConfig ? getContentDir() : getGameDir();
	if (await getPathInfo(gameDir + '/scripts/npc/npc_abilities_custom.txt') === false) {
		return;
	}
	let abilityKv: any = await readKeyValueWithBase(gameDir + '/scripts/npc/npc_abilities_custom.txt');
	for (const key in abilityKv.DOTAAbilities) {
		const value = abilityKv.DOTAAbilities[key];
		if (typeof (value) === 'object') {
			scriptFiles[key] = scriptDir + '/scripts/vscripts/' + value.ScriptFile + extensionName;
		}
	}

	let itemKv: any = await readKeyValueWithBase(gameDir + '/scripts/npc/npc_items_custom.txt');
	for (const key in itemKv.DOTAAbilities) {
		const value = itemKv.DOTAAbilities[key];
		if (typeof (value) === 'object') {
			scriptFiles[key] = scriptDir + '/scripts/vscripts/' + value.ScriptFile + extensionName;
		}
	}
}
export function getScriptFiles() {
	return scriptFiles;
}

/** 自动生成的技能物品lua文件模板 */
function getLuaScriptSnippet(filename: string, luaPath: string, context?: vscode.ExtensionContext, snippetPath?: string): string {
	try {
		const templateConfig: Table = vscode.workspace.getConfiguration().get('dota2-tools.LuaTemplateFiles') as Table;
		snippetPath ??= (filename.indexOf("item_") === -1) ? ((getRootPath() + templateConfig.ability).replace(/\\/g, "/")) : ((getRootPath() + templateConfig.item).replace(/\\/g, "/"));
		let snippet = fs.readFileSync(snippetPath!, "utf-8");
		snippet = snippet.replace(/\[filename\]/g, filename);
		snippet = snippet.replace(/\[path\]/g, luaPath);
		snippet = snippet.replace(/__filename_replacer__/g, filename);
		snippet = snippet.replace(/__path_replacer__/g, luaPath);
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

/** 是否开启设置 */
function getConfiguration(configName: string) {
	let config = vscode.workspace.getConfiguration().get<boolean>(configName);
	return config;
}