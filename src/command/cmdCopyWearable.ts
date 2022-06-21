/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';

/**
 * 复制某个英雄所有饰品捆绑包信息到剪切板
 * @export
 */
export function copyWearable(context: vscode.ExtensionContext) {
	let slotData: any = {
		"LoadoutSlot_None": "无",
		"LoadoutSlot_Weapon": "武器",
		"LoadoutSlot_OffHand_Weapon": "副手",
		"LoadoutSlot_Head": "头部",
		"LoadoutSlot_Shoulder": "肩部",
		"LoadoutSlot_Arms": "手臂",
		"LoadoutSlot_Armor": "护甲",
		"LoadoutSlot_Belt": "腰带",
		"LoadoutSlot_Back": "背部",
		"LoadoutSlot_Neck": "颈部",
		"LoadoutSlot_Legs": "腿部",
		"LoadoutSlot_Gloves": "手套",
		"LoadoutSlot_Tail": "尾巴",
		"LoadoutSlot_Taunt": "嘲讽",
		"LoadoutSlot_Costume": "装束",
		"LoadoutSlot_Emblem": "纹章",
		"LoadoutSlot_Courier": "信使",
		"LoadoutSlot_Announcer": "系统广播",
		"LoadoutSlot_Heroic_Statue": "英雄雕像",
		"LoadoutSlot_Mega_Kills": "连杀系统广播",
		"LoadoutSlot_Fan": "粉丝",
		"LoadoutSlot_Action_Item": "动作物品",
		"LoadoutSlot_Fan_Item": "粉丝物品",
		"LoadoutSlot_Weather": "天气",
		"LoadoutSlot_Terrain": "地图",
		"LoadoutSlot_MultiKill_Banner": "多杀标语",
		"LoadoutSlot_Music": "音乐",
		"LoadoutSlot_Ability_Attack": "默认攻击",
		"LoadoutSlot_Ability1": "技能1",
		"LoadoutSlot_Ability2": "技能2",
		"LoadoutSlot_Ability3": "技能3",
		"LoadoutSlot_Ability4": "技能4",
		"LoadoutSlot_AbilityUltimate": "终极技能",
		"LoadoutSlot_Ability_Ultimate": "终极技能",
		"LoadoutSlot_Body_Head": "身体 - 头部",
		"LoadoutSlot_Mount": "坐骑",
		"LoadoutSlot_Custom_Hex": "妖术效果",
		"LoadoutSlot_Misc": "杂项",
		"LoadoutSlot_Summon": "召唤单位",
		"LoadoutSlot_ward": "守卫",
		"LoadoutSlot_hud_skin": "游戏界面皮肤",
		"LoadoutSlot_Shapeshift": "变身",
		"LoadoutSlot_Wolves": "精灵狼",
		"LoadoutSlot_loading_screen": "载入画面",
		"LoadoutSlot_Elder_Dragon": "古龙形态",
		"LoadoutSlot_Head_Accessory": "头饰",
		"LoadoutSlot_Shield": "盾牌",
		"LoadoutSlot_Wings": "翅膀",
		"LoadoutSlot_Quiver": "箭袋",
		"LoadoutSlot_Beard": "胡须",
		"LoadoutSlot_Heads": "头部",
		"LoadoutSlot_LeftArm": "左臂",
		"LoadoutSlot_RightArm": "右臂",
		"LoadoutSlot_Body": "身体",
		"LoadoutSlot_Claws": "爪子",
		"LoadoutSlot_ambient_effects": "周身特效",
		"LoadoutSlot_cursor_pack": "指针包",
		"LoadoutSlot_teleport_effect": "传送特效",
		"LoadoutSlot_blink_effect": "闪烁特效",
		"LoadoutSlot_Voice": "配音",
		"LoadoutSlot_Pet": "宠物",
		"LoadoutSlot_Visage_Familiar": "佣兽",
		"LoadoutSlot_Phoenix_Supernova": "超新星",
		"LoadoutSlot_Radiant_Creeps": "天辉小兵",
		"LoadoutSlot_Dire_Creeps": "夜魇小兵",
		"LoadoutSlot_Radiant_Towers": "天辉防御塔",
		"LoadoutSlot_Dire_Towers": "夜魇防御塔",
		"LoadoutSlot_Versus_Screen": "对阵画面",
		"LoadoutSlot_Head_Effect": "头部特效",
		"LoadoutSlot_Map_Effect": "地图特效",
		"LoadoutSlot_Courier_Effect": "信使特效",
		"LoadoutSlot_Persona_Selector": "身心",
		"LoadoutSlot_Head_Invoker_Kid": "头部（少年）",
		"LoadoutSlot_Shoulder_Invoker_Kid": "肩部（少年）",
		"LoadoutSlot_Arms_Invoker_Kid": "手臂（少年）",
		"LoadoutSlot_Armor_Invoker_Kid": "护甲（少年）",
		"LoadoutSlot_Invoker_ForgeSpirit_Invoker_Kid": "精灵（少年）",
		"LoadoutSlot_Taunt_Invoker_Kid": "嘲讽（少年）",
		"LoadoutSlot_Back_Invoker_Kid": "背部（少年）",
		"LoadoutSlot_Clinkz_Army": "燃烧之军",
		"LoadoutSlot_Tiny_Body_0": "小小",
		"LoadoutSlot_Tiny_Body_1": "小",
		"LoadoutSlot_Tiny_Body_2": "中",
		"LoadoutSlot_Tiny_Body_3": "大",
	};
	let zhCN = readKeyValue2(fs.readFileSync(path.join(context.extensionPath, "resource/items_schinese.txt"), 'utf-8'), false).lang.Tokens;
	let itemsGame = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "resource/rogue_wearable.json"), 'utf-8'));

	const inputBox = vscode.window.createInputBox();
	inputBox.placeholder = '请输入套装或饰品ID';
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
		if (itemData.item_slot && slotData[`LoadoutSlot_${itemData.item_slot}`.toLowerCase()] !== undefined) {
			result.note_item_slot = slotData[`LoadoutSlot_${itemData.item_slot}`.toLowerCase()];
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