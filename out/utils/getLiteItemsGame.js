"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiteItemsGame = void 0;
const fs = require("fs");
const path = require("path");
const kvUtils_1 = require("./kvUtils");
function getLiteItemsGame(context) {
    let sFilePath = path.join(context.extensionPath, "resource/items_game.txt");
    // items
    let items_game = fs.readFileSync(sFilePath, 'utf-8');
    let prase_items_game = (0, kvUtils_1.readKeyValue2)(items_game, true, false);
    let tItemsData = prase_items_game.items_game.items;
    // attribute_controlled_attached_particles
    let attribute_controlled_attached_particles = prase_items_game.items_game.attribute_controlled_attached_particles;
    // fs.writeFileSync(path.join(this.context.extensionPath, "resource/attribute_controlled_attached_particles.json"), JSON.stringify(attribute_controlled_attached_particles));
    // asset_modifiers
    let asset_modifiers = prase_items_game.items_game.asset_modifiers;
    // fs.writeFileSync(path.join(this.context.extensionPath, "resource/asset_modifiers.json"), JSON.stringify(asset_modifiers));
    for (const index in tItemsData) {
        let socketIndex = 0;
        const element = tItemsData[index];
        if (element.portraits != undefined) {
            let newPortraits = {};
            let keys = Object.keys(element.portraits);
            keys.map((key) => {
                if (key.indexOf(".vmdl") != -1 || key == "game") {
                    if (key == "game") {
                        if (element.visuals) {
                            for (const visualName in element.visuals) {
                                if (element.visuals[visualName].type == "entity_model") {
                                    let modifier = element.visuals[visualName].modifier;
                                    newPortraits[modifier] = element.portraits[key];
                                }
                            }
                        }
                    }
                    else {
                        newPortraits[key] = element.portraits[key];
                    }
                }
            });
            element.portraits = newPortraits;
        }
        // 遍历控制点信息
        if (element.visuals) {
            for (const asset_modifier in element.visuals) {
                let assetData = element.visuals[asset_modifier];
                if (typeof assetData == "object") {
                    let attachInfo = FindAttachInfo(assetData.modifier);
                    if (attachInfo) {
                        attachInfo = Object.assign(assetData, attachInfo);
                    }
                }
            }
        }
        if (element.static_attributes) {
            for (const attribute in element.static_attributes) {
                let attributeData = element.static_attributes[attribute];
                if (typeof attributeData == "object" && attributeData.attribute_class == "socket") {
                    if (attributeData.value.indexOf("asset_modifier") != -1) {
                        let asset_modifier_index = attributeData.value.split("asset_modifier: ")[1];
                        let asset_modifier = asset_modifiers[String(asset_modifier_index)];
                        for (const key in asset_modifier) {
                            const socket = asset_modifier[key];
                            if (key.indexOf("asset_modifier") != -1 && typeof socket == "object") {
                                if (element.visuals == undefined) {
                                    element.visuals = {};
                                }
                                element.visuals["asset_modifier_socket" + socketIndex] = socket;
                                socketIndex++;
                            }
                        }
                    }
                }
            }
        }
    }
    return tItemsData;
    function FindAttachInfo(asset) {
        for (const index in attribute_controlled_attached_particles) {
            const element = attribute_controlled_attached_particles[index];
            if (element.system == asset) {
                return element;
            }
        }
    }
}
exports.getLiteItemsGame = getLiteItemsGame;
//# sourceMappingURL=getLiteItemsGame.js.map