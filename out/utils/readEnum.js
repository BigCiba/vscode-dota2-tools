"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnum = void 0;
function readEnum(line, rows) {
    let enumList = [];
    let endLine = 0;
    for (let index = line + 1; index < rows.length; index++) {
        let enumInfo = {};
        const text = rows[index];
        if (text === '') {
            endLine = index;
            break;
        }
        const info = text.split(' = ');
        enumInfo.name = info[0];
        if (info[1].search('--') !== -1) {
            enumInfo.value = info[1].split(' -- ')[0];
            enumInfo.function = info[1].split(' -- ')[1];
        }
        else {
            enumInfo.value = info[1];
        }
        enumInfo.description_lite = 'No Description Set';
        enumInfo.description = 'No Description Set';
        enumInfo.example = 'No Example Set';
        enumInfo.client = '❌';
        enumList.push(enumInfo);
    }
    return [enumList, endLine];
}
exports.readEnum = readEnum;
//# sourceMappingURL=readEnum.js.map