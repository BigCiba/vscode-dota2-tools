"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
function isNumber(s) {
    let reg = /^(-?\d+)(\.\d+)?$/;
    if (reg.test(s)) {
        return true;
    }
    return false;
}
exports.isNumber = isNumber;
//# sourceMappingURL=isNumber.js.map