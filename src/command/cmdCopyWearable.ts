/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';
import { localize } from '../utils/localize';

/**
 * Copy all wearable bundle info for a hero to the clipboard
 * @export
 */
export function copyWearable(context: vscode.ExtensionContext) {
	// Build the equipment slot name from the localization key
	function getSlotName(slotKey: string): string {
		const localizedName = localize(slotKey.toLowerCase());
		return localizedName !== slotKey.toLowerCase() ? localizedName : slotKey;
	}
	let zhCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_schinese.txt"), 'utf-8'), false).lang.Tokens;
	let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = localize('msg_enter_set_id');
	inputBox.show();
	inputBox.onDidAccept((t) => {
		let itemData = itemsGame[inputBox.value];
		let result: { [key: string]: any; } = {};
		result.bundle = findBundle(itemData.name) || itemData.item_rarity || "";
		result.item_slot = itemData.item_slot || "";
		result.item_name = itemData.item_name || "";
		result.item_description = itemData.item_description || "";
		if (itemData.item_name) {
			result.note_name = zhCN[itemData.item_name.replace(/#/, '')];
		}
		if (itemData.item_slot) {
			result.note_item_slot = getSlotName(`LoadoutSlot_${itemData.item_slot}`);
		}
		result.item_rarity = itemData.item_rarity || "common";
		result.model_player = itemData.model_player;
		if (itemData.visuals) {
			result.visuals = itemData.visuals;
		}
		console.log(result);
		vscode.env.clipboard.writeText(writeKeyValue({ [inputBox.value]: result }, 2));
		inputBox.dispose();
	});
	function findBundle(itemName: string) {
		for (const index in itemsGame) {
			const element = itemsGame[index];
			if (element.bundle) {
				for (const name in element.bundle) {
					if (name === itemName) {
						return index;
					}
				}
			}
		}
	}
}