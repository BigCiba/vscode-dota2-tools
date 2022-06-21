import * as vscode from 'vscode';
import * as fs from 'fs';
import { getContentDir } from '../module/addonInfo';
import { DropHeroString } from '../class/DropString';

/** 轮回谷生成英雄掉落卡片的vtex和vpcf */
export function dropVPCf(context: vscode.ExtensionContext) {
	const contetDir = getContentDir();
	let sTgaPath = (contetDir + "/materials/items/").replace(/\\/g, "/");
	let sVTEXPath = (contetDir + "/materials/").replace(/\\/g, "/");
	let sVPCFPath = (contetDir + "/particles/generic_gameplay/").replace(/\\/g, "/");
	let fTGAs = fs.readdirSync(sTgaPath);
	fTGAs.forEach(fileName => {
		if (fileName.indexOf("npc_dota_hero_") !== -1) {
			let sHeroName = fileName.substr(14, fileName.length - 14 - 4);
			let sShortFileName = fileName.substr(0, fileName.length - 4);
			let sVTEXFileName = `${sVTEXPath}${sShortFileName}.vtex`;
			let sVPCFFileName = `${sVPCFPath}dropped_item_${sHeroName}.vpcf`;
			let oHeroString = new DropHeroString(sHeroName);
			// 已存在就不生成
			if (!fs.existsSync(sVTEXFileName)) {
				fs.writeFileSync(sVTEXFileName, oHeroString.strDropVtex);
			}
			if (!fs.existsSync(sVPCFFileName)) {
				fs.writeFileSync(sVPCFFileName, oHeroString.strDropVPCF);
			}
		}
	});
}