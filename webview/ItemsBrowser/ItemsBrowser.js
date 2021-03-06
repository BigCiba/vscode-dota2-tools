const vscode = acquireVsCodeApi();

const filter = document.getElementById("filter");

const LOCALIZE = {
	"zh-cn": {
		"item_name": "物品名",
		"item_description": "物品描述",
		"used_by_heroes": "使用英雄",
		"prefab": "类型",
		"model_player": "模型",
		"visuals": "资源修改",
		"index": "编号",
		"item_rarity": "稀有度",
		"item_slot": "物品槽位",
		"item_type_name": "物品类型",
		"price_info": "商品信息",
		"bundle_contain": "含有该物品的捆绑包",
		"bundle": "捆绑包",
		"misc": "杂项",
		"wearable": "可佩带",
		"default_item": "基础",
		"misc_item": "杂项",
		"tool": "工具",
		"emoticon_tool": "表情工具包",
		"league": "联赛",
		"courier": "信使",
		"treasure_chest": "珍藏",
		"courier_wearable": "信使饰品",
		"ward": "守卫",
		"pennant": "锦旗",
		"announcer": "播音员",
		"modifier": "特效",
		"hud_skin": "游戏界面皮肤",
		"key": "符印",
		"player_card": "选手卡牌",
		"passport_fantasy_team": "互动联赛梦之队",
		"loading_screen": "载入画面",
		"taunt": "嘲讽",
		"dynamic_recipe": "图纸",
		"socket_gem": "宝石 / 符文",
		"music": "音乐",
		"retired_treasure_chest": "过期珍藏",
		"cursor_pack": "指针包",
		"teleport_effect": "传送特效",
		"blink_effect": "闪烁特效",
		"summons": "召唤单位周身特效",
		"terrain": "地图",
		"emblem": "纹章",
		"direcreeps": "夜魇小兵",
		"radiantcreeps": "天辉小兵",
		"diretowers": "夜魇防御塔",
		"radianttowers": "天辉防御塔",
		"versus_screen": "对阵画面",
		"npc_dota_hero_none": "--",
		"npc_dota_hero_queenofpain": "痛苦女王",
		"npc_dota_hero_antimage": "敌法师",
		"npc_dota_hero_kunkka": "昆卡",
		"npc_dota_hero_lina": "莉娜",
		"npc_dota_hero_mirana": "米拉娜",
		"npc_dota_hero_slardar": "斯拉达",
		"npc_dota_hero_lion": "莱恩",
		"npc_dota_hero_phantom_assassin": "幻影刺客",
		"npc_dota_hero_tidehunter": "潮汐猎人",
		"npc_dota_hero_witch_doctor": "巫医",
		"npc_dota_hero_vengefulspirit": "复仇之魂",
		"npc_dota_hero_juggernaut": "主宰",
		"npc_dota_hero_earthshaker": "撼地者",
		"npc_dota_hero_pudge": "帕吉",
		"npc_dota_hero_bane": "祸乱之源",
		"npc_dota_hero_crystal_maiden": "水晶室女",
		"npc_dota_hero_sven": "斯温",
		"npc_dota_hero_skeleton_king": "冥魂大帝",
		"npc_dota_hero_storm_spirit": "风暴之灵",
		"npc_dota_hero_sand_king": "沙王",
		"npc_dota_hero_nevermore": "影魔",
		"npc_dota_hero_drow_ranger": "卓尔游侠",
		"npc_dota_hero_axe": "斧王",
		"npc_dota_hero_bloodseeker": "血魔",
		"npc_dota_hero_phantom_lancer": "幻影长矛手",
		"npc_dota_hero_razor": "剃刀",
		"npc_dota_hero_morphling": "变体精灵",
		"npc_dota_hero_zuus": "宙斯",
		"npc_dota_hero_tiny": "小小",
		"npc_dota_hero_puck": "帕克",
		"npc_dota_hero_windrunner": "风行者",
		"npc_dota_hero_lich": "巫妖",
		"npc_dota_hero_shadow_shaman": "暗影萨满",
		"npc_dota_hero_riki": "力丸",
		"npc_dota_hero_enigma": "谜团",
		"npc_dota_hero_tinker": "修补匠",
		"npc_dota_hero_sniper": "狙击手",
		"npc_dota_hero_necrolyte": "瘟疫法师",
		"npc_dota_hero_warlock": "术士",
		"npc_dota_hero_beastmaster": "兽王",
		"npc_dota_hero_venomancer": "剧毒术士",
		"npc_dota_hero_faceless_void": "虚空假面",
		"npc_dota_hero_death_prophet": "死亡先知",
		"npc_dota_hero_pugna": "帕格纳",
		"npc_dota_hero_templar_assassin": "圣堂刺客",
		"npc_dota_hero_viper": "冥界亚龙",
		"npc_dota_hero_luna": "露娜",
		"npc_dota_hero_dragon_knight": "龙骑士",
		"npc_dota_hero_dazzle": "戴泽",
		"npc_dota_hero_rattletrap": "发条技师",
		"npc_dota_hero_leshrac": "拉席克",
		"npc_dota_hero_furion": "先知",
		"npc_dota_hero_life_stealer": "噬魂鬼",
		"npc_dota_hero_dark_seer": "黑暗贤者",
		"npc_dota_hero_clinkz": "克林克兹",
		"npc_dota_hero_omniknight": "全能骑士",
		"npc_dota_hero_enchantress": "魅惑魔女",
		"npc_dota_hero_huskar": "哈斯卡",
		"npc_dota_hero_night_stalker": "暗夜魔王",
		"npc_dota_hero_broodmother": "育母蜘蛛",
		"npc_dota_hero_bounty_hunter": "赏金猎人",
		"npc_dota_hero_weaver": "编织者",
		"npc_dota_hero_jakiro": "杰奇洛",
		"npc_dota_hero_batrider": "蝙蝠骑士",
		"npc_dota_hero_chen": "陈",
		"npc_dota_hero_spectre": "幽鬼",
		"npc_dota_hero_doom_bringer": "末日使者",
		"npc_dota_hero_ancient_apparition": "远古冰魄",
		"npc_dota_hero_ursa": "熊战士",
		"npc_dota_hero_spirit_breaker": "裂魂人",
		"npc_dota_hero_gyrocopter": "矮人直升机",
		"npc_dota_hero_alchemist": "炼金术士",
		"npc_dota_hero_invoker": "祈求者",
		"npc_dota_hero_invoker_persona1": "祈求者（少年）",
		"npc_dota_hero_silencer": "沉默术士",
		"npc_dota_hero_obsidian_destroyer": "殁境神蚀者",
		"npc_dota_hero_lycan": "狼人",
		"npc_dota_hero_brewmaster": "酒仙",
		"npc_dota_hero_shadow_demon": "暗影恶魔",
		"npc_dota_hero_lone_druid": "德鲁伊",
		"npc_dota_hero_chaos_knight": "混沌骑士",
		"npc_dota_hero_treant": "树精卫士",
		"npc_dota_hero_meepo": "米波",
		"npc_dota_hero_ogre_magi": "食人魔魔法师",
		"npc_dota_hero_undying": "不朽尸王",
		"npc_dota_hero_rubick": "拉比克",
		"npc_dota_hero_disruptor": "干扰者",
		"npc_dota_hero_nyx_assassin": "司夜刺客",
		"npc_dota_hero_naga_siren": "娜迦海妖",
		"npc_dota_hero_keeper_of_the_light": "光之守卫",
		"npc_dota_hero_visage": "维萨吉",
		"npc_dota_hero_wisp": "艾欧",
		"npc_dota_hero_slark": "斯拉克",
		"npc_dota_hero_medusa": "美杜莎",
		"npc_dota_hero_troll_warlord": "巨魔战将",
		"npc_dota_hero_centaur": "半人马战行者",
		"npc_dota_hero_magnataur": "马格纳斯",
		"npc_dota_hero_shredder": "伐木机",
		"npc_dota_hero_bristleback": "钢背兽",
		"npc_dota_hero_tusk": "巨牙海民",
		"npc_dota_hero_skywrath_mage": "天怒法师",
		"npc_dota_hero_abaddon": "亚巴顿",
		"npc_dota_hero_elder_titan": "上古巨神",
		"npc_dota_hero_legion_commander": "军团指挥官",
		"npc_dota_hero_ember_spirit": "灰烬之灵",
		"npc_dota_hero_earth_spirit": "大地之灵",
		"npc_dota_hero_abyssal_underlord": "孽主",
		"npc_dota_hero_phoenix": "凤凰",
		"npc_dota_hero_terrorblade": "恐怖利刃",
		"npc_dota_hero_oracle": "神谕者",
		"npc_dota_hero_techies": "工程师",
		"npc_dota_hero_target_dummy": "傀儡目标",
		"npc_dota_hero_winter_wyvern": "寒冬飞龙",
		"npc_dota_hero_arc_warden": "天穹守望者",
		"npc_dota_hero_monkey_king": "齐天大圣",
		"npc_dota_hero_pangolier": "石鳞剑士",
		"npc_dota_hero_dark_willow": "邪影芳灵",
		"npc_dota_hero_grimstroke": "天涯墨客",
		"npc_dota_hero_mars": "玛尔斯",
		"Rarity_Common": "普通",
		"Rarity_Uncommon": "罕见",
		"Rarity_Rare": "稀有",
		"Rarity_Mythical": "神话",
		"Rarity_Legendary": "传说",
		"Rarity_Ancient": "远古",
		"Rarity_Immortal": "不朽",
		"Rarity_Arcana": "至宝",
		"Rarity_Seasonal": "赛季",
		"loadoutslot_none": "无",
		"loadoutslot_weapon": "武器",
		"loadoutslot_offhand_weapon": "副手",
		"loadoutslot_head": "头部",
		"loadoutslot_shoulder": "肩部",
		"loadoutslot_arms": "手臂",
		"loadoutslot_armor": "护甲",
		"loadoutslot_belt": "腰带",
		"loadoutslot_back": "背部",
		"loadoutslot_neck": "颈部",
		"loadoutslot_legs": "腿部",
		"loadoutslot_gloves": "手套",
		"loadoutslot_tail": "尾巴",
		"loadoutslot_taunt": "嘲讽",
		"loadoutslot_emblem": "纹章",
		"loadoutslot_courier": "信使",
		"loadoutslot_announcer": "系统广播",
		"loadoutslot_heroic_statue": "英雄雕像",
		"loadoutslot_mega_kills": "连杀系统广播",
		"loadoutslot_fan": "粉丝",
		"loadoutslot_action_item": "动作物品",
		"loadoutslot_fan_item": "粉丝物品",
		"loadoutslot_weather": "天气",
		"loadoutslot_terrain": "地图",
		"loadoutslot_multikill_banner": "多杀标语",
		"loadoutslot_music": "音乐",
		"loadoutslot_ability_attack": "默认攻击",
		"loadoutslot_ability1": "技能1",
		"loadoutslot_ability2": "技能2",
		"loadoutslot_ability3": "技能3",
		"loadoutslot_ability4": "技能4",
		"loadoutslot_abilityultimate": "终极技能",
		"loadoutslot_ability_ultimate": "终极技能",
		"loadoutslot_body_head": "身体 - 头部",
		"loadoutslot_mount": "坐骑",
		"loadoutslot_custom_hex": "妖术效果",
		"loadoutslot_misc": "杂项",
		"loadoutslot_summon": "召唤单位",
		"loadoutslot_ward": "守卫",
		"loadoutslot_hud_skin": "游戏界面皮肤",
		"loadoutslot_shapeshift": "变身",
		"loadoutslot_wolves": "精灵狼",
		"loadoutslot_loading_screen": "载入画面",
		"loadoutslot_elder_dragon": "古龙形态",
		"loadoutslot_head_accessory": "头饰",
		"loadoutslot_shield": "盾牌",
		"loadoutslot_wings": "翅膀",
		"loadoutslot_quiver": "箭袋",
		"loadoutslot_beard": "胡须",
		"loadoutslot_heads": "头部",
		"loadoutslot_leftarm": "左臂",
		"loadoutslot_rightarm": "右臂",
		"loadoutslot_body": "身体",
		"loadoutslot_claws": "爪子",
		"loadoutslot_ambient_effects": "周身特效",
		"loadoutslot_cursor_pack": "指针包",
		"loadoutslot_teleport_effect": "传送特效",
		"loadoutslot_blink_effect": "闪烁特效",
		"loadoutslot_voice": "配音",
		"loadoutslot_pet": "宠物",
		"loadoutslot_visage_familiar": "佣兽",
		"loadoutslot_phoenix_supernova": "超新星",
		"loadoutslot_radiant_creeps": "天辉小兵",
		"loadoutslot_dire_creeps": "夜魇小兵",
		"loadoutslot_radiant_towers": "天辉防御塔",
		"loadoutslot_dire_towers": "夜魇防御塔",
		"loadoutslot_versus_screen": "对阵画面",
		"loadoutslot_persona_selector": "身心",
		"loadoutslot_head_invoker_kid": "头部（少年）",
		"loadoutslot_shoulder_invoker_kid": "肩部（少年）",
		"loadoutslot_arms_invoker_kid": "手臂（少年）",
		"loadoutslot_armor_invoker_kid": "护甲（少年）",
		"loadoutslot_invoker_forgespirit_invoker_kid": "精灵（少年）",
		"loadoutslot_taunt_invoker_kid": "嘲讽（少年）",
		"loadoutslot_back_invoker_kid": "背部（少年）",
		"loadoutslot_clinkz_army": "燃烧之军",
		"loadoutslot_tiny_body_0": "小小",
		"loadoutslot_tiny_body_1": "小",
		"loadoutslot_tiny_body_2": "中",
		"loadoutslot_tiny_body_3": "大",
		"loadoutslot_alchemist_tinyarmor": "微型护服",
		"loadoutslot_alchemist_flask": "烧瓶",
		"loadoutslot_alchemist_tinyhead": "微型头饰",
		"loadoutslot_beastmaster_hawk": "战鹰",
		"loadoutslot_beastmaster_boar": "豪猪",
		"loadoutslot_brewmaster_barrel": "酒桶",
		"loadoutslot_brewmaster_shoulder": "护甲",
		"loadoutslot_broodmother_spiderling": "小蜘蛛",
		"loadoutslot_clockwerk_rocket": "照明火箭",
		"loadoutslot_clockwerk_cogs": "能量齿轮",
		"loadoutslot_death_spirits": "恶灵",
		"loadoutslot_earthspirit_stoneremnant": "残岩",
		"loadoutslot_earthshaker_totem": "图腾",
		"loadoutslot_eldertitan_astralspirit": "星体游魂",
		"loadoutslot_enigma_eidolons": "虚灵体",
		"loadoutslot_gyrocopter_guns": "机枪",
		"loadoutslot_gyrocopter_propeller": "螺旋桨",
		"loadoutslot_gyrocopter_missilecompartment": "飞弹装置",
		"loadoutslot_gyrocopter_homingmissile": "追踪导弹",
		"loadoutslot_invoker_forgespirit": "熔炉精灵",
		"loadoutslot_juggernaut_healingward": "治疗守卫",
		"loadoutslot_legioncommander_banners": "战旗",
		"loadoutslot_lonedruid_trueform": "真熊形态",
		"loadoutslot_lonedruid_spiritbear": "熊灵",
		"loadoutslot_naturesprophet_treants": "树人",
		"loadoutslot_pugna_netherward": "幽冥守卫",
		"loadoutslot_shadowshaman_serpentwards": "群蛇守卫",
		"loadoutslot_techies_cart": "推车",
		"loadoutslot_techies_bazooka": "火箭炮",
		"loadoutslot_techies_squee": "斯奎",
		"loadoutslot_techies_spoon": "斯布恩",
		"loadoutslot_techies_spleen": "斯布林",
		"loadoutslot_techies_remotemines": "遥控炸弹",
		"loadoutslot_terrorblade_demon": "恶魔",
		"loadoutslot_trollwarlord_offhand_weapon_melee": "副手近战武器",
		"loadoutslot_trollwarlord_weapon_melee": "近战武器",
		"loadoutslot_tusk_tusks": "长牙",
		"loadoutslot_tusk_fist": "拳头",
		"loadoutslot_tusk_frozensigil": "冰封魔印",
		"loadoutslot_undying_tombstone": "墓碑",
		"loadoutslot_undying_flesh_golem": "血肉傀儡",
		"loadoutslot_venomancer_stingerlimbs": "毒刺肢干",
		"loadoutslot_venomancer_plagueward": "瘟疫守卫",
		"loadoutslot_warlock_golem": "地狱火",
		"loadoutslot_warlock_lantern": "灯笼",
		"loadoutslot_warlock_evilpurse": "邪包",
		"loadoutslot_weaver_antennae": "触角",
		"loadoutslot_witchdoctor_deathward": "死亡守卫",
		"loadoutslot_techies_sign": "标识",
		"loadoutslot_jakiro_head_left": "左头",
		"loadoutslot_jakiro_head_right": "右头",
	},
	"en": {
		"item_name": "Item Name",
		"item_description": "Item Description",
		"used_by_heroes": "Used By Heroes",
		"prefab": "Prefab",
		"model_player": "Model",
		"visuals": "Asset Modifier",
		"index": "Index",
		"item_rarity": "Rarity",
		"item_slot": "Item Slot",
		"item_type_name": "Item Type Name",
		"price_info": "Price Info",
		"bundle_contain": "Bundles Contain",
		"bundle": "Bundle",
		"misc": "Misc",
		"wearable": "Wearable",
		"default_item": "Base",
		"misc_item": "Misc",
		"tool": "Tool",
		"emoticon_tool": "Emoticon Tool",
		"league": "League",
		"courier": "Courier",
		"treasure_chest": "Treasure",
		"courier_wearable": "Courier Wearable",
		"ward": "Ward",
		"pennant": "Pennant",
		"announcer": "Announcer",
		"modifier": "Modifier",
		"hud_skin": "HUD Skin",
		"key": "Treasure Key",
		"player_card": "Player Card",
		"passport_fantasy_team": "Compendium Fantasy Team",
		"loading_screen": "Loading Screen",
		"taunt": "Taunt",
		"dynamic_recipe": "Recipe",
		"socket_gem": "Gem / Rune",
		"music": "Music",
		"retired_treasure_chest": "Retired Chest",
		"cursor_pack": "Cursor Pack",
		"teleport_effect": "Teleport Effect",
		"blink_effect": "Blink Effect",
		"summons": "Summoned Unit Ambient Effect",
		"terrain": "Terrain",
		"emblem": "Emblem",
		"direcreeps": "Dire Creeps",
		"radiantcreeps": "Radiant Creeps",
		"diretowers": "Dire Towers",
		"radianttowers": "Radiant Towers",
		"versus_screen": "Versus Screen",
		"npc_dota_hero_none": "--",
		"npc_dota_hero_queenofpain": "Queen of Pain",
		"npc_dota_hero_antimage": "Anti-Mage",
		"npc_dota_hero_antimage_persona1": "Anti-Mage (Wei)",
		"npc_dota_hero_kunkka": "Kunkka",
		"npc_dota_hero_lina": "Lina",
		"npc_dota_hero_mirana": "Mirana",
		"npc_dota_hero_slardar": "Slardar",
		"npc_dota_hero_lion": "Lion",
		"npc_dota_hero_phantom_assassin": "Phantom Assassin",
		"npc_dota_hero_tidehunter": "Tidehunter",
		"npc_dota_hero_witch_doctor": "Witch Doctor",
		"npc_dota_hero_vengefulspirit": "Vengeful Spirit",
		"npc_dota_hero_juggernaut": "Juggernaut",
		"npc_dota_hero_earthshaker": "Earthshaker",
		"npc_dota_hero_pudge": "Pudge",
		"npc_dota_hero_bane": "Bane",
		"npc_dota_hero_crystal_maiden": "Crystal Maiden",
		"npc_dota_hero_sven": "Sven",
		"npc_dota_hero_skeleton_king": "Wraith King",
		"npc_dota_hero_storm_spirit": "Storm Spirit",
		"npc_dota_hero_sand_king": "Sand King",
		"npc_dota_hero_nevermore": "Shadow Fiend",
		"npc_dota_hero_drow_ranger": "Drow Ranger",
		"npc_dota_hero_axe": "Axe",
		"npc_dota_hero_bloodseeker": "Bloodseeker",
		"npc_dota_hero_phantom_lancer": "Phantom Lancer",
		"npc_dota_hero_razor": "Razor",
		"npc_dota_hero_morphling": "Morphling",
		"npc_dota_hero_zuus": "Zeus",
		"npc_dota_hero_tiny": "Tiny",
		"npc_dota_hero_puck": "Puck",
		"npc_dota_hero_windrunner": "Windranger",
		"npc_dota_hero_lich": "Lich",
		"npc_dota_hero_shadow_shaman": "Shadow Shaman",
		"npc_dota_hero_riki": "Riki",
		"npc_dota_hero_enigma": "Enigma",
		"npc_dota_hero_tinker": "Tinker",
		"npc_dota_hero_sniper": "Sniper",
		"npc_dota_hero_necrolyte": "Necrophos",
		"npc_dota_hero_warlock": "Warlock",
		"npc_dota_hero_beastmaster": "Beastmaster",
		"npc_dota_hero_venomancer": "Venomancer",
		"npc_dota_hero_faceless_void": "Faceless Void",
		"npc_dota_hero_death_prophet": "Death Prophet",
		"npc_dota_hero_pugna": "Pugna",
		"npc_dota_hero_templar_assassin": "Templar Assassin",
		"npc_dota_hero_viper": "Viper",
		"npc_dota_hero_luna": "Luna",
		"npc_dota_hero_dragon_knight": "Dragon Knight",
		"npc_dota_hero_dazzle": "Dazzle",
		"npc_dota_hero_rattletrap": "Clockwerk",
		"npc_dota_hero_leshrac": "Leshrac",
		"npc_dota_hero_furion": "Nature's Prophet",
		"npc_dota_hero_life_stealer": "Lifestealer",
		"npc_dota_hero_dark_seer": "Dark Seer",
		"npc_dota_hero_clinkz": "Clinkz",
		"npc_dota_hero_omniknight": "Omniknight",
		"npc_dota_hero_enchantress": "Enchantress",
		"npc_dota_hero_huskar": "Huskar",
		"npc_dota_hero_night_stalker": "Night Stalker",
		"npc_dota_hero_broodmother": "Broodmother",
		"npc_dota_hero_bounty_hunter": "Bounty Hunter",
		"npc_dota_hero_weaver": "Weaver",
		"npc_dota_hero_jakiro": "Jakiro",
		"npc_dota_hero_batrider": "Batrider",
		"npc_dota_hero_chen": "Chen",
		"npc_dota_hero_spectre": "Spectre",
		"npc_dota_hero_doom_bringer": "Doom",
		"npc_dota_hero_ancient_apparition": "Ancient Apparition",
		"npc_dota_hero_ursa": "Ursa",
		"npc_dota_hero_spirit_breaker": "Spirit Breaker",
		"npc_dota_hero_gyrocopter": "Gyrocopter",
		"npc_dota_hero_alchemist": "Alchemist",
		"npc_dota_hero_invoker": "Invoker",
		"npc_dota_hero_invoker_persona1": "Invoker (Kid)",
		"npc_dota_hero_silencer": "Silencer",
		"npc_dota_hero_obsidian_destroyer": "Outworld Devourer",
		"npc_dota_hero_lycan": "Lycan",
		"npc_dota_hero_brewmaster": "Brewmaster",
		"npc_dota_hero_shadow_demon": "Shadow Demon",
		"npc_dota_hero_lone_druid": "Lone Druid",
		"npc_dota_hero_chaos_knight": "Chaos Knight",
		"npc_dota_hero_treant": "Treant Protector",
		"npc_dota_hero_meepo": "Meepo",
		"npc_dota_hero_ogre_magi": "Ogre Magi",
		"npc_dota_hero_undying": "Undying",
		"npc_dota_hero_rubick": "Rubick",
		"npc_dota_hero_disruptor": "Disruptor",
		"npc_dota_hero_nyx_assassin": "Nyx Assassin",
		"npc_dota_hero_naga_siren": "Naga Siren",
		"npc_dota_hero_keeper_of_the_light": "Keeper of the Light",
		"npc_dota_hero_visage": "Visage",
		"npc_dota_hero_wisp": "Io",
		"npc_dota_hero_slark": "Slark",
		"npc_dota_hero_medusa": "Medusa",
		"npc_dota_hero_troll_warlord": "Troll Warlord",
		"npc_dota_hero_centaur": "Centaur Warrunner",
		"npc_dota_hero_magnataur": "Magnus",
		"npc_dota_hero_shredder": "Timbersaw",
		"npc_dota_hero_bristleback": "Bristleback",
		"npc_dota_hero_tusk": "Tusk",
		"npc_dota_hero_skywrath_mage": "Skywrath Mage",
		"npc_dota_hero_abaddon": "Abaddon",
		"npc_dota_hero_elder_titan": "Elder Titan",
		"npc_dota_hero_legion_commander": "Legion Commander",
		"npc_dota_hero_ember_spirit": "Ember Spirit",
		"npc_dota_hero_earth_spirit": "Earth Spirit",
		"npc_dota_hero_abyssal_underlord": "Underlord",
		"npc_dota_hero_phoenix": "Phoenix",
		"npc_dota_hero_terrorblade": "Terrorblade",
		"npc_dota_hero_oracle": "Oracle",
		"npc_dota_hero_techies": "Techies",
		"npc_dota_hero_target_dummy": "Target Dummy",
		"npc_dota_hero_winter_wyvern": "Winter Wyvern",
		"npc_dota_hero_arc_warden": "Arc Warden",
		"npc_dota_hero_monkey_king": "Monkey King",
		"npc_dota_hero_pangolier": "Pangolier",
		"npc_dota_hero_dark_willow": "Dark Willow",
		"npc_dota_hero_grimstroke": "Grimstroke",
		"npc_dota_hero_mars": "Mars",
		"Rarity_Common": "Common",
		"Rarity_Uncommon": "Uncommon",
		"Rarity_Rare": "Rare",
		"Rarity_Mythical": "Mythical",
		"Rarity_Legendary": "Legendary",
		"Rarity_Ancient": "Ancient",
		"Rarity_Immortal": "Immortal",
		"Rarity_Arcana": "Arcana",
		"Rarity_Seasonal": "Seasonal",
		"loadoutslot_none": "N/A",
		"loadoutslot_weapon": "Weapon",
		"loadoutslot_offhand_weapon": "Off-Hand",
		"loadoutslot_head": "Head",
		"loadoutslot_shoulder": "Shoulder",
		"loadoutslot_arms": "Arms",
		"loadoutslot_armor": "Armor",
		"loadoutslot_belt": "Belt",
		"loadoutslot_back": "Back",
		"loadoutslot_neck": "Neck",
		"loadoutslot_legs": "Legs",
		"loadoutslot_gloves": "Gloves",
		"loadoutslot_tail": "Tail",
		"loadoutslot_taunt": "Taunt",
		"loadoutslot_emblem": "Emblem",
		"loadoutslot_courier": "Courier",
		"loadoutslot_announcer": "Announcer",
		"loadoutslot_heroic_statue": "Heroic Effigy",
		"loadoutslot_mega_kills": "Mega-Kill Announcer",
		"loadoutslot_fan": "Fan",
		"loadoutslot_action_item": "Action Item",
		"loadoutslot_fan_item": "Fan Item",
		"loadoutslot_weather": "Weather",
		"loadoutslot_terrain": "Terrain",
		"loadoutslot_multikill_banner": "Multikill Banner",
		"loadoutslot_music": "Music",
		"loadoutslot_ability_attack": "Default Attack",
		"loadoutslot_ability1": "Ability 1",
		"loadoutslot_ability2": "Ability 2",
		"loadoutslot_ability3": "Ability 3",
		"loadoutslot_ability4": "Ability 4",
		"loadoutslot_abilityultimate": "Ultimate",
		"loadoutslot_ability_ultimate": "Ultimate",
		"loadoutslot_body_head": "Body - Head",
		"loadoutslot_mount": "Mount",
		"loadoutslot_custom_hex": "Hex Effects",
		"loadoutslot_misc": "Misc",
		"loadoutslot_summon": "Summoned Unit",
		"loadoutslot_ward": "Ward",
		"loadoutslot_hud_skin": "HUD Skin",
		"loadoutslot_shapeshift": "Shapeshift",
		"loadoutslot_wolves": "Wolves",
		"loadoutslot_loading_screen": "Loading Screen",
		"loadoutslot_elder_dragon": "Elder Dragon Form",
		"loadoutslot_head_accessory": "Head",
		"loadoutslot_shield": "Shield",
		"loadoutslot_wings": "Wings",
		"loadoutslot_quiver": "Quiver",
		"loadoutslot_beard": "Beard",
		"loadoutslot_heads": "Heads",
		"loadoutslot_leftarm": "Left Arm",
		"loadoutslot_rightarm": "Right Arm",
		"loadoutslot_body": "Body",
		"loadoutslot_claws": "Claws",
		"loadoutslot_ambient_effects": "Ambient Effects",
		"loadoutslot_cursor_pack": "Cursor Pack",
		"loadoutslot_teleport_effect": "Teleport Effect",
		"loadoutslot_blink_effect": "Blink Effect",
		"loadoutslot_voice": "Voice",
		"loadoutslot_pet": "Pet",
		"loadoutslot_visage_familiar": "Familiars",
		"loadoutslot_phoenix_supernova": "Supernova",
		"loadoutslot_radiant_creeps": "Radiant Creeps",
		"loadoutslot_dire_creeps": "Dire Creeps",
		"loadoutslot_radiant_towers": "Radiant Towers",
		"loadoutslot_dire_towers": "Dire Towers",
		"loadoutslot_versus_screen": "Versus Screen",
		"loadoutslot_persona_selector": "Persona",
		"loadoutslot_head_invoker_kid": "Head (Kid)",
		"loadoutslot_shoulder_invoker_kid": "Shoulder (Kid)",
		"loadoutslot_arms_invoker_kid": "Arms (Kid)",
		"loadoutslot_armor_invoker_kid": "Armor (Kid)",
		"loadoutslot_invoker_forgespirit_invoker_kid": "Spirit (Kid)",
		"loadoutslot_taunt_invoker_kid": "Taunt (Kid)",
		"loadoutslot_back_invoker_kid": "Back (Kid)",
		"loadoutslot_clinkz_army": "Burning Army",
		"loadoutslot_tiny_body_0": "Tiny",
		"loadoutslot_tiny_body_1": "Small",
		"loadoutslot_tiny_body_2": "Medium",
		"loadoutslot_tiny_body_3": "Large",
		"npc_dota_hero_pudge_persona1": "Pudge (Persona)",
		"loadoutslot_taunt_pudge_persona": "Taunt (Persona)",
		"loadoutslot_weapon_pudge_persona": "Weapon (Persona)",
		"loadoutslot_offhand_weapon_pudge_persona": "Offhand (Persona)",
		"loadoutslot_armor_pudge_persona": "Armor (Persona)",
		"loadoutslot_head_pudge_persona": "Head (Persona)",
		"loadoutslot_taunt_antimage_persona": "Taunt (Persona)",
		"loadoutslot_weapon_antimage_persona": "Weapon (Persona)",
		"loadoutslot_offhand_weapon_antimage_persona": "Offhand (Persona)",
		"loadoutslot_armor_antimage_persona": "Armor (Persona)",
		"loadoutslot_head_antimage_persona": "Head (Persona)",
		"loadoutslot_alchemist_tinyarmor": "Tiny Armor",
		"loadoutslot_alchemist_flask": "Flask",
		"loadoutslot_alchemist_tinyhead": "Tiny Head",
		"loadoutslot_beastmaster_hawk": "Hawk",
		"loadoutslot_beastmaster_boar": "Boar",
		"loadoutslot_brewmaster_barrel": "Barrel",
		"loadoutslot_brewmaster_shoulder": "Armor",
		"loadoutslot_broodmother_spiderling": "Spiderling",
		"loadoutslot_clockwerk_rocket": "Rocket Flare",
		"loadoutslot_clockwerk_cogs": "Power Cogs",
		"loadoutslot_death_spirits": "Spirits",
		"loadoutslot_earthspirit_stoneremnant": "Stone Remnant",
		"loadoutslot_earthshaker_totem": "Totem",
		"loadoutslot_eldertitan_astralspirit": "Astral Spirit",
		"loadoutslot_enigma_eidolons": "Eidolons",
		"loadoutslot_gyrocopter_guns": "Guns",
		"loadoutslot_gyrocopter_propeller": "Propeller",
		"loadoutslot_gyrocopter_missilecompartment": "Missile Compartment",
		"loadoutslot_gyrocopter_homingmissile": "Homing Missile",
		"loadoutslot_invoker_forgespirit": "Forge Spirit",
		"loadoutslot_juggernaut_healingward": "Healing Ward",
		"loadoutslot_legioncommander_banners": "Banners",
		"loadoutslot_lonedruid_trueform": "True Form",
		"loadoutslot_lonedruid_spiritbear": "Spirit Bear",
		"loadoutslot_naturesprophet_treants": "Treants",
		"loadoutslot_pugna_netherward": "Nether Ward",
		"loadoutslot_shadowshaman_serpentwards": "Serpent Wards",
		"loadoutslot_techies_cart": "Cart",
		"loadoutslot_techies_bazooka": "Bazooka",
		"loadoutslot_techies_squee": "Squee",
		"loadoutslot_techies_spoon": "Spoon",
		"loadoutslot_techies_spleen": "Spleen",
		"loadoutslot_techies_remotemines": "Remote Mines",
		"loadoutslot_terrorblade_demon": "Demon",
		"loadoutslot_trollwarlord_offhand_weapon_melee": "Off-Hand Melee Weapon",
		"loadoutslot_trollwarlord_weapon_melee": "Melee Weapon",
		"loadoutslot_tusk_tusks": "Tusks",
		"loadoutslot_tusk_fist": "Fist",
		"loadoutslot_tusk_frozensigil": "Frozen Sigil",
		"loadoutslot_undying_tombstone": "Tombstone",
		"loadoutslot_undying_flesh_golem": "Flesh Golem",
		"loadoutslot_venomancer_stingerlimbs": "Stinger Limbs",
		"loadoutslot_venomancer_plagueward": "Plague Wards",
		"loadoutslot_warlock_golem": "Golem",
		"loadoutslot_warlock_lantern": "Lantern",
		"loadoutslot_warlock_evilpurse": "Evil Purse",
		"loadoutslot_weaver_antennae": "Antennae",
		"loadoutslot_witchdoctor_deathward": "Death Ward",
		"loadoutslot_techies_sign": "Sign",
		"loadoutslot_jakiro_head_left": "Left Head",
		"loadoutslot_jakiro_head_right": "Right Head",
	}
};
function Localize(name) {
	if (name == undefined) {
		return "";
	}
	const LocalizeData = vscode.getState().localize_data;
	let lang = document.documentElement.lang;
	name = name.replace(/#/, '');
	let result = LocalizeData[lang][name] || LOCALIZE[lang][name];
	if (result) {
		return result;
	}
	return name;
}
function SearchIndex(sInput) {
	let index = GetIndexByModelName(sInput) || GetIndexByAssetModifierName(sInput);
	if (index) {
		return index;
	}
	return undefined;
}
// 根据资源modifier索引物品
function GetIndexByAssetModifierName(ModifierName) {
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.visuals) {
			for (const modifierIndex in ItemData.visuals) {
				if (ItemData.visuals[modifierIndex].modifier == ModifierName) {
					return index;
				}
			}
		}
	}
	return undefined;
}

// 根据模型名字索引编号
function GetIndexByModelName(ModelName) {
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.model_player == ModelName) {
			return index;
		}
	}
	return undefined;
}
// 根据名字索引编号
function GetIndexByName(Name) {
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.name == Name) {
			return index;
		}
	}
	return undefined;
}
// 根据名字索引物品
function GetItemByName(Name) {
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.name == Name) {
			return ItemData;
		}
	}
	return undefined;
}
// 根据名字索引捆绑包信息
function GetBundlesByName(Name) {
	let Bundles = {};
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.bundle !== undefined) {
			for (const BundleItemName in ItemData.bundle) {
				if (BundleItemName == Name) {
					Bundles[index] = ItemData;
				}
			}
		}
	}
	return Bundles;
}
function FindItemsByHeroName(sHeroName) {
	let itemList = {};
	const ItemsData = vscode.getState().data;
	for (const index in ItemsData) {
		const ItemData = ItemsData[index];
		if (ItemData.used_by_heroes !== undefined) {
			for (const heroName in ItemData.used_by_heroes) {
				if (heroName == sHeroName) {
					itemList[index] = ItemData;
				}
			}
		}
	}
	return itemList;
}
function OnInput() {
	const state = vscode.getState();
	let filter_word = filter.value;
	let index;
	if (filter_word.match(/.vmdl/) != null) {
		index = SearchIndex(filter_word);
	} else if (!isNaN(Number(filter_word)) == true) {
		index = String(filter_word);
	}
	if (index != undefined && state.data[index] != undefined) {
		Render(index, state.data[index]);
	}
	// 处理英雄
	if (index == undefined) {
		if (filter_word.indexOf("npc_dota_hero_") == -1) {
			filter_word = "npc_dota_hero_" + filter_word;
		}
		let itemList = FindItemsByHeroName(filter_word);
		console.log(itemList);
		if (Object.keys(itemList).length > 0) {
			RenderList(itemList);
		}
	}
}
function RenderList(itemList) {
	let lang = document.documentElement.lang;

	let result = `${LOCALIZE[lang]["index"]}|${LOCALIZE[lang]["item_name"]}|${LOCALIZE[lang]["prefab"]}|${LOCALIZE[lang]["model_player"]}|${LOCALIZE[lang]["item_description"]}
----|----|----|----|----
`;
	for (const index in itemList) {
		let itemData = itemList[index];
		result += `${index}|${Localize(itemData.item_name)}|${LOCALIZE[lang][itemData.prefab]}|${itemData.model_player}|${Localize(itemData.item_description)}
`;
	}
	document.querySelector('.markdown-body').innerHTML = marked(result);
}
function Render(index, ItemData) {
	let lang = document.documentElement.lang;
	let RenderData = function (type, data) {
		if (data != undefined && typeof (data) == 'string') {	// 通用属性处理
			return `# ${LOCALIZE[lang][type]}  
${Localize(data)}  
`;
		} else if (type == 'visuals' && data != undefined) {	// 处理资源修改相关信息
			if (data.hasOwnProperty('asset_modifier') || data.hasOwnProperty('asset_modifier0')) {
				let result = `# ${LOCALIZE[lang][type]}
Asset Modifier|type|asset|modifier|style|frequency
----|----|----|----|----|----
`;
				for (const key in data) {
					const element = data[key];
					if (key.match(/asset_modifier/) != null) {
						result += `${key}|${element.type}|${element.asset}|${element.modifier}|${element.style}|${element.frequency}
`;
					}
				}
				return result;
			}
		} else if (type == 'price_info' && data != undefined) {	// 处理商品相关信息
			let result = `# ${LOCALIZE[lang][type]}
bucket|class|category_tags|date|price
----|----|----|----|----
${data.bucket}|${data.class}|${data.category_tags}|${data.date}|${data.price}`;
			return result;
		} else if (type == 'bundle' && data != undefined) {	// 处理捆绑包
			let result = `# ${LOCALIZE[lang][type]}
${Localize('index')}|${Localize('item_name')}
----|----
`;
			for (const key in data) {
				const element = data[key];
				let BundleItemData = GetItemByName(key);
				let BundleItemIndex = GetIndexByName(key);
				result += `${BundleItemIndex}|${Localize(BundleItemData.item_name)}
`;
			}
			return result;
		} else if (type == 'bundle_contain' && data != undefined && Object.keys(data).length != 0) {	// 处理包含该物品捆绑包信息
			let result = `# ${LOCALIZE[lang][type]}
${Localize('index')}|${Localize('bundle')}
----|----
`;
			for (const key in data) {
				const element = data[key];
				result += `${key}|${Localize(element.item_name)}
`;
			}
			return result;
		}
		return '';
	};
	let content = `
${RenderData('index', index)}
${RenderData('item_name', ItemData.item_name)}
${RenderData('item_description', ItemData.item_description)}
${RenderData('used_by_heroes', ItemData.used_by_heroes == undefined ? undefined : Object.keys(ItemData.used_by_heroes)[0])}
${RenderData('item_rarity', ItemData.item_rarity == undefined ? undefined : `Rarity_${ItemData.item_rarity.slice(0, 1).toUpperCase() + ItemData.item_rarity.slice(1).toLowerCase()}`)}
${RenderData('prefab', ItemData.prefab)}
${RenderData('item_type_name', ItemData.item_type_name)}
${RenderData('item_slot', ItemData.item_slot == undefined ? undefined : `LoadoutSlot_${ItemData.item_slot}`.toLowerCase())}
${RenderData('model_player', ItemData.model_player)}
${RenderData('bundle', ItemData.bundle)}
${RenderData('bundle_contain', GetBundlesByName(ItemData.name))}
${RenderData('visuals', ItemData.visuals)}
${RenderData('price_info', ItemData.price_info)}
`;
	// console.log(content);
	document.querySelector('.markdown-body').innerHTML = marked(content);
}

window.addEventListener('message', event => {
	const message = event.data;
	if (message.type == 'init') {
		vscode.setState({
			data: message.data,
			localize_data: message.localize_data
		});
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());
