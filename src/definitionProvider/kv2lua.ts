import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as vscode from 'vscode';
import { EventManager, EventType } from '../Class/event';
import { getContentDir, getGameDir } from '../module/addonInfo';
import { getRootPath } from '../utils/getRootPath';
import { readKeyValueWithBase } from '../utils/kvUtils';
import { getPathInfo } from '../utils/pathUtils';

/** Script paths associated with kv */
let scriptFiles: Table = {};
let defJump: vscode.Disposable;
let eventID: number;
const enableConfigName = "dota2-tools.A6.Kv to lua generate script";
const tsConfigName = "dota2-tools.A6.Kv to lua generate typescript";
let enableConfig: boolean | undefined;
let tsConfig: boolean | undefined;

/** File extension */
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

		// console.log('====== Entering the provideDefinition method ======');
		// console.log('fileName: ' + fileName); // Full path of the current file
		// console.log('workDir: ' + workDir); // Directory of the current file
		// console.log('word: ' + word); // Word under the current cursor
		// console.log('line: ' + line.text); // Line where the current cursor is
		// console.log();

		// Only process package.json files
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


/** Update the association table */
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

/** Template for auto-generated ability/item lua files */
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

/** Whether the setting is enabled */
function getConfiguration(configName: string) {
	let config = vscode.workspace.getConfiguration().get<boolean>(configName);
	return config;
}