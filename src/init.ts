import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';
import { isObject, log } from 'util';
export function Init(context: vscode.ExtensionContext) {
	let root_path:string|undefined = util.GetRootPath();
	if (root_path === undefined) {
		return;
	}
	// 关联kv与lua
	let kv2lua:any = {};
	let ability_kv = util.ReadKeyValueWithBase(root_path + '/game/dota_addons/tui3/scripts/npc/npc_abilities_custom.txt');
	for (const key in ability_kv.DOTAAbilities) {
		const value = ability_kv.DOTAAbilities[key];
		if (isObject(value) === true) {
			kv2lua[key] = root_path + '/game/dota_addons/tui3/scripts/vscripts/' + value.ScriptFile + '.lua';
		}
	}
	console.log(kv2lua);

	function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
		const fileName	= document.fileName;
		const workDir	 = path.dirname(fileName);
		const word		= document.getText(document.getWordRangeAtPosition(position));
		const line		= document.lineAt(position);
	
		console.log('====== 进入 provideDefinition 方法 ======');
		console.log('fileName: ' + fileName); // 当前文件完整路径
		console.log('workDir: ' + workDir); // 当前文件所在目录
		console.log('word: ' + word); // 当前光标所在单词
		console.log('line: ' + line.text); // 当前光标所在行
		// 只处理package.json文件
		if (/\/.*\.kv$/.test(fileName) || /\/.*\.txt$/.test(fileName)) {
			const json = document.getText();
			console.log(json);
			
			if (new RegExp(`"ScriptFile".*"${word}"`).test(json)) {
				let destPath = `${root_path}/game/dota_addons/tui3/scripts/vscripts/${word} + '.lua'`;
				if (fs.existsSync(destPath)) {
					return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
				}
			}
		}
	}
	let def_jump = vscode.languages.registerDefinitionProvider({pattern: '**/*.txt'}, {provideDefinition});
	context.subscriptions.push(def_jump);
	// function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
	// 	const fileName	= document.fileName;
	// 	const workDir	 = path.dirname(fileName);
	// 	const word		= document.getText(document.getWordRangeAtPosition(position));
	// 	const line		= document.lineAt(position);
	
	// 	console.log('====== 进入 provideDefinition 方法 ======');
	// 	console.log('fileName: ' + fileName); // 当前文件完整路径
	// 	console.log('workDir: ' + workDir); // 当前文件所在目录
	// 	console.log('word: ' + word); // 当前光标所在单词
	// 	console.log('line: ' + line.text); // 当前光标所在行
	// 	// 只处理package.json文件
	// 	if (/\/package\.json$/.test(fileName)) {
	// 		console.log(word, line.text);
	// 		const json = document.getText();
	// 		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
	// 			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
	// 			if (fs.existsSync(destPath)) {
	// 				// new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
	// 				return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
	// 			}
	// 		}
	// 	}
	// }
	// context.subscriptions.push(vscode.languages.registerDefinitionProvider(['json'], {
	// 	provideDefinition
	// }));
}