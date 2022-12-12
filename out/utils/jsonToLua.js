"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToLua = void 0;
function jsonToLua(json, depth = 1) {
    let result = "{";
    let keys = Object.keys(json);
    for (let index = 0; index < keys.length; index++) {
        let k = keys[index];
        let v = json[k];
        if (typeof v == "object") {
            v = jsonToLua(v, depth + 1);
        }
        else if (typeof v == "string") {
            v = `"${v.replace(/\\/g, "\\\"")}"`;
        }
        result += `${index == 0 ? "" : ","}\n${getTab(depth)}["${k.replace(/\\/g, "\\\"")}"] = ${v}`;
    }
    return result + "\n" + getTab(depth - 1) + "}";
}
exports.jsonToLua = jsonToLua;
function getTab(depth) {
    let result = "";
    for (let index = 0; index < depth; index++) {
        result += "\t";
    }
    return result;
}
//# sourceMappingURL=jsonToLua.js.map