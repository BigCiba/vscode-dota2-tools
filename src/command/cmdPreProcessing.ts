import * as vscode from 'vscode';
import { itemsGameParse, parseCssDocument, parseEventDocument, parseLuaAPI, parseLuaAPIChangelog, parsePanelList, parsePanoramaAPI, rogueItemsGameParse, vsndGenerator } from '../module/preProcessing';

export async function preProcessing(context: vscode.ExtensionContext) {
	itemsGameParse(context);
	parsePanoramaAPI(context);
	parseCssDocument(context);
	parseEventDocument(context);
	parsePanelList(context);
	vsndGenerator(context);
	parseLuaAPI(context);
	parseLuaAPIChangelog(context);
	// rogueItemsGameParse(context);
}