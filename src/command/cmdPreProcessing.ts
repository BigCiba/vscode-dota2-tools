import * as vscode from 'vscode';
import { itemsGameParse, parseCssDocument, parseEventDocument, parseLuaAPI, parseLuaAPIChangelog, parsePanelList, parsePanoramaAPI, rogueItemsGameParse, vsndGenerator } from '../module/preProcessing';

export async function preProcessing(context: vscode.ExtensionContext) {
	// itemsGameParse(context);
	// console.log("itemsGameParse");
	// parsePanoramaAPI(context);
	// console.log("parsePanoramaAPI");
	// parseCssDocument(context);
	// console.log("parseCssDocument");
	// parseEventDocument(context);
	// console.log("parseEventDocument");
	// parsePanelList(context);
	// console.log("parsePanelList");
	// vsndGenerator(context);
	// console.log("vsndGenerator");
	parseLuaAPI(context);
	console.log("parseLuaAPI");
	parseLuaAPIChangelog(context);
	console.log("parseLuaAPIChangelog");
	// rogueItemsGameParse(context);
	// console.log("parseLuaAPIChangelog");
}