"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preProcessing = void 0;
const preProcessing_1 = require("../module/preProcessing");
async function preProcessing(context) {
    (0, preProcessing_1.itemsGameParse)(context);
    console.log("itemsGameParse");
    (0, preProcessing_1.parsePanoramaAPI)(context);
    console.log("parsePanoramaAPI");
    (0, preProcessing_1.parseCssDocument)(context);
    console.log("parseCssDocument");
    (0, preProcessing_1.parseEventDocument)(context);
    console.log("parseEventDocument");
    (0, preProcessing_1.parsePanelList)(context);
    console.log("parsePanelList");
    (0, preProcessing_1.vsndGenerator)(context);
    console.log("vsndGenerator");
    (0, preProcessing_1.parseLuaAPI)(context);
    console.log("parseLuaAPI");
    (0, preProcessing_1.parseLuaAPIChangelog)(context);
    console.log("parseLuaAPIChangelog");
    // rogueItemsGameParse(context);
}
exports.preProcessing = preProcessing;
//# sourceMappingURL=cmdPreProcessing.js.map