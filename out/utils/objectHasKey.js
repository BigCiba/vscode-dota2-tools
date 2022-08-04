"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectHasKey = void 0;
function objectHasKey(obj, _key) {
    let bHas = false;
    for (const key in obj) {
        const value = obj[key];
        if (key == _key) {
            return true;
        }
        else if (typeof value == "object") {
            bHas = objectHasKey(value, _key);
            if (bHas) {
                return true;
            }
        }
    }
    return bHas;
}
exports.objectHasKey = objectHasKey;
//# sourceMappingURL=objectHasKey.js.map