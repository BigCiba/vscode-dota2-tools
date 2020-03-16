import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';
import { isObject, log } from 'util';
let KV2LUA:any = {};
// tslint:disable-next-line: no-unused-expression
export {KV2LUA};
export function Init(context: vscode.ExtensionContext) {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	// 关联kv与lua
	// let kv2lua:any = {};
	let ability_kv = util.ReadKeyValueWithBase(root_path + '/game/dota_addons/tui3/scripts/npc/npc_abilities_custom.txt');
	for (const key in ability_kv.DOTAAbilities) {
		const value = ability_kv.DOTAAbilities[key];
		if (isObject(value) === true) {
			KV2LUA[key] = root_path + '/game/dota_addons/tui3/scripts/vscripts/' + value.ScriptFile + '.lua';
		}
	}
	// console.log(kv2lua);

	function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		const fileName	= document.fileName;
		const workDir	 = path.dirname(fileName);
		const word		= document.getText(document.getWordRangeAtPosition(position));
		const line:vscode.TextLine = document.lineAt(position);
	
		// console.log('====== 进入 provideDefinition 方法 ======');
		// console.log('fileName: ' + fileName); // 当前文件完整路径
		// console.log('workDir: ' + workDir); // 当前文件所在目录
		// console.log('word: ' + word); // 当前光标所在单词
		// console.log('line: ' + line.text); // 当前光标所在行
		// console.log();
		
		// 只处理package.json文件
		if (/.*\.kv/.test(fileName) || /.*\.txt/.test(fileName)) {
			const json = document.getText();
			console.log(new RegExp(`"ScriptFile".*"${word}"`).test(json));
			
			if (new RegExp(`"ScriptFile"`).test(json)) {
				let path = line.text.split('"')[3];
				let destPath = `${root_path}/game/dota_addons/tui3/scripts/vscripts/${path}.lua`;
				console.log(destPath);
				
				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				}
			}
		}
	}
	let def_jump = vscode.languages.registerDefinitionProvider([{pattern: '**/*.txt'},{pattern: '**/*.kv'}], {provideDefinition});
	context.subscriptions.push(def_jump);
}