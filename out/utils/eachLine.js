"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eachLine = void 0;
const os = require("os");
function eachLine(data, callback, start = 0) {
    const rows = Array.isArray(data) ? data : data.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        let result = callback(i, rows[i]);
        if (result === true) {
            break;
        }
        else if (typeof (result) === "number") {
            i = result;
        }
    }
}
exports.eachLine = eachLine;
//# sourceMappingURL=eachLine.js.map