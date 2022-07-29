"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preProcessing = void 0;
const preProcessing_1 = require("../module/preProcessing");
async function preProcessing(context) {
    (0, preProcessing_1.itemsGameParse)(context);
    (0, preProcessing_1.parsePanoramaAPI)(context);
    (0, preProcessing_1.parseCssDocument)(context);
    (0, preProcessing_1.parseEventDocument)(context);
    (0, preProcessing_1.parsePanelList)(context);
    (0, preProcessing_1.vsndGenerator)(context);
    (0, preProcessing_1.parseLuaAPI)(context);
    (0, preProcessing_1.parseLuaAPIChangelog)(context);
    // rogueItemsGameParse(context);
}
exports.preProcessing = preProcessing;
//# sourceMappingURL=cmdPreProcessing.js.map