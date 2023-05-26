"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseInfo = exports.writeKeyValue = exports.replaceKeyValue = exports.overrideKeyValue = exports.getKeyValueObjectByIndex = exports.removeComment = exports.readKeyValueWithBaseIncludePath = exports.readKeyValueWithBase = exports.readKeyValue3 = exports.readKeyValue2 = void 0;
const fs = require("fs");
const os = require("os");
const pathUtils_1 = require("./pathUtils");
const isNumber_1 = require("./isNumber");
// 读取kv2格式为object(兼容kv3)
function readKeyValue2(kvdata, bRemoveComment = true, bOverride = true) {
    if (bRemoveComment === true) {
        kvdata = removeComment(kvdata);
    }
    // kvdata = kvdata.replace(/\t/g,'').replace(' ','').replace(/\r\n/g,'');
    kvdata = kvdata.replace(/\t/g, '').replace(/\r\n/g, '');
    let kvObj = {};
    let overrideIndex = 1;
    for (let i = 0; i < kvdata.length; i++) {
        let substr = kvdata[i];
        if (substr === '"') {
            let key;
            let value;
            [key, value, i] = readKeyValue(i);
            // 如果有重复值
            if (kvObj[key] === undefined || bOverride === true) {
                kvObj[key] = value;
            }
            else {
                kvObj[key + "_Repeat" + overrideIndex] = value;
                overrideIndex++;
            }
            continue;
        }
        if (substr === '#' && kvdata.substr(i, 5) === '#base') {
            i = getBase(i);
            continue;
        }
    }
    return kvObj;
    // 读取一对键对
    function readKeyValue(startIndex) {
        let key = '';
        let value;
        let state = 'NONE';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            // 读取key
            if (substr === '"' && state === 'NONE') {
                [key, i] = getContent(i);
                state = 'VALUE';
                continue;
            }
            // 读取value
            if (substr === '"' && state === 'VALUE') {
                [value, i] = getContent(i);
                return [key, value, i];
            }
            // 读取table
            if (substr === '{' && state === 'VALUE') {
                [value, i] = getTable(i);
                return [key, value, i];
            }
        }
    }
    function getTable(startIndex) {
        let kv = {};
        let state = 'NONE';
        let overrideIndex = 1;
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '{' && state === 'NONE') {
                state = 'READ';
                continue;
            }
            // 插入kv3
            if (substr === '<' && kvdata.substr(i, 8) === '<!-- kv3' && state === 'READ') {
                let [block, newIndex] = getKv3Block(i);
                kv = readKeyValue3(block);
                i = newIndex;
                continue;
            }
            if (substr === '"' && state === 'READ') {
                let key;
                let value;
                [key, value, i] = readKeyValue(i); // 如果有重复值
                if (kv[key] === undefined || bOverride === true) {
                    kv[key] = value;
                }
                else {
                    kv[key + "_Repeat" + overrideIndex] = value;
                    overrideIndex++;
                }
                continue;
            }
            if (substr === '}' && state === 'READ') {
                return [kv, i];
            }
        }
    }
    // 获取引号里的内容
    function getContent(startIndex) {
        let content = '';
        let state = 'NONE';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            // 跳过转义符
            if (substr === '\\' && kvdata[i + 1] === '"') {
                content += substr;
                i++;
                continue;
            }
            if (substr === '"' && state === 'NONE') {
                state = 'READ';
                continue;
            }
            if (state === 'READ') {
                if (substr === '"') {
                    return [content, i];
                }
                else {
                    content += substr;
                }
            }
        }
    }
    // 获得kv3块
    function getKv3Block(startIndex) {
        let block = '';
        let left = 0;
        let right = 0;
        let state = 'NONE';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (state === 'NONE' && substr === '<') {
                state = 'HEAD';
                continue;
            }
            if (state === 'HEAD') {
                if (substr === '>') {
                    state = 'NONE';
                }
                continue;
            }
            block += substr;
            if (substr === '{') {
                left++;
            }
            if (substr === '}') {
                right++;
                if (left === right) {
                    return [block, i];
                }
            }
        }
    }
    // #base
    function getBase(startIndex) {
        let path = '';
        let state = 'NONE';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '#') {
                state = 'START';
                continue;
            }
            if (substr === '"' && state === 'START') {
                state = 'READ';
                continue;
            }
            if (state === 'READ') {
                if (substr === '"') {
                    return i;
                }
                else {
                    path += substr;
                    continue;
                }
            }
        }
    }
}
exports.readKeyValue2 = readKeyValue2;
// 读取kv3格式为object
function readKeyValue3(kvdata) {
    kvdata = kvdata.replace(/<!-- kv3.*-->/, '').replace(/\t/g, '').replace(/\s+/g, '').replace(/\r\n/g, '');
    // kvdata = kvdata.replace(/\t/g,'').replace(/\r\n/g,'');
    let kvObj = [];
    for (let i = 0; i < kvdata.length; i++) {
        let substr = kvdata[i];
        if (substr === '{') {
            let [obj, newLine] = readTable(i);
            kvObj.push(obj);
            i = newLine;
            continue;
        }
    }
    return kvObj;
    // 读取一对中括号里面的内容
    function readTable(startIndex) {
        let kv = {};
        let key = '';
        let value = '';
        let state = 'NONE';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if (substr === '{' && state === 'NONE') {
                state = 'KEY';
                continue;
            }
            if (substr === '}') {
                return [kv, i];
            }
            if (state === 'KEY') {
                if (substr === '=') {
                    state = 'VALUE';
                    continue;
                }
                else {
                    key += substr;
                    continue;
                }
            }
            if (state === 'VALUE') {
                if (kvdata.substr(i, 5) === "false") {
                    kv[key] = "false";
                    key = '';
                    value = '';
                    state = 'KEY';
                    i = i + 4;
                    continue;
                }
                if (kvdata.substr(i, 4) === "true") {
                    kv[key] = "true";
                    key = '';
                    value = '';
                    state = 'KEY';
                    i = i + 3;
                    continue;
                }
                if (substr === '"') {
                    state = 'STRING';
                    continue;
                }
                else if (substr === '{') {
                    // 读表
                    let [obj, newLine] = readTable(i);
                    kv[key] = obj;
                    key = '';
                    value = '';
                    i = newLine;
                    state = 'KEY';
                    continue;
                }
                else if (substr === '[') {
                    // 读数组
                    let [obj, newLine] = readArray(i);
                    kv[key] = obj;
                    key = '';
                    value = '';
                    i = newLine;
                    state = 'KEY';
                    continue;
                }
                else if ((0, isNumber_1.isNumber)(substr) === true || substr === '.' || substr === '-') {
                    state = 'NUMBER';
                }
            }
            if (state === 'STRING') {
                if (substr === '"') {
                    kv[key] = value;
                    key = '';
                    value = '';
                    state = 'KEY';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
            if (state === 'NUMBER') {
                if ((0, isNumber_1.isNumber)(substr) === true || substr === '.' || substr === '-') {
                    value += substr;
                    continue;
                }
                else {
                    kv[key] = value;
                    key = '';
                    value = '';
                    i--;
                    state = 'KEY';
                    continue;
                }
            }
        }
    }
    // 读数组
    function readArray(startIndex) {
        let arr = [];
        let state = 'NONE';
        let value = '';
        for (let i = startIndex; i < kvdata.length; i++) {
            let substr = kvdata[i];
            if ((substr === '[' || substr === ',') && state === 'NONE') {
                state = 'VALUE';
                continue;
            }
            if (substr === ']') {
                return [arr, i];
            }
            if (state === 'VALUE') {
                if (substr === '"') {
                    state = 'STRING';
                    continue;
                }
                else if (substr === '{') {
                    let [obj, newLine] = readTable(i);
                    arr.push(obj);
                    i = newLine;
                    state = 'NONE';
                    continue;
                }
                else {
                    state = 'NUMBER';
                }
            }
            if (state === 'STRING') {
                if (substr === '"') {
                    arr.push(value);
                    value = '';
                    i++;
                    state = 'VALUE';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
            if (state === 'NUMBER') {
                if (substr === ',') {
                    arr.push(value);
                    value = '';
                    state = 'VALUE';
                    continue;
                }
                else {
                    value += substr;
                    continue;
                }
            }
        }
    }
}
exports.readKeyValue3 = readKeyValue3;
// 读取kv2格式为object（#base）
async function readKeyValueWithBase(fullPath) {
    // 获取名字
    let fileName = fullPath.split('/').pop() || '';
    let path = fullPath.split(fileName)[0];
    let kvdata = readKeyValue2(fs.readFileSync(fullPath, 'utf-8'));
    let kvtable = kvdata[Object.keys(kvdata)[0]];
    let kvString = fs.readFileSync(fullPath, 'utf-8');
    kvString = removeComment(kvString);
    const rows = kvString.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        const lineText = rows[i];
        if (lineText.search(/#base ".*"/) !== -1) {
            let basePath = lineText.split('"')[1];
            // 找不到文件则跳过
            if (await (0, pathUtils_1.getPathInfo)(path + basePath) === false) {
                // vscode.window.showErrorMessage("文件缺失：" + path + basePath);
                continue;
            }
            let kv = readKeyValue2(fs.readFileSync(path + basePath, 'utf-8'));
            let table = kv[Object.keys(kv)[0]];
            for (const key in table) {
                const value = table[key];
                kvtable[key] = value;
            }
        }
        else {
            continue;
        }
    }
    return kvdata;
}
exports.readKeyValueWithBase = readKeyValueWithBase;
// 读取kv2格式为object（#base）包含路径信息
async function readKeyValueWithBaseIncludePath(fullPath) {
    let result = {};
    // 获取名字
    let fileName = fullPath.split('/').pop() || '';
    let path = fullPath.split(fileName)[0];
    let kvdata = readKeyValue2(fs.readFileSync(fullPath, 'utf-8'));
    // 用路径索引
    result[fullPath] = kvdata;
    // let kvtable = kvdata[Object.keys(kvdata)[0]];
    let kvString = fs.readFileSync(fullPath, 'utf-8');
    kvString = removeComment(kvString);
    const rows = kvString.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        const lineText = rows[i];
        if (lineText.search(/#base ".*"/) !== -1) {
            let basePath = lineText.split('"')[1];
            // 找不到文件则跳过
            if (await (0, pathUtils_1.getPathInfo)(path + basePath) === false) {
                // vscode.window.showErrorMessage("文件缺失：" + path + basePath);
                continue;
            }
            let kv = readKeyValue2(fs.readFileSync(path + basePath, 'utf-8'));
            // 用路径索引
            result[path + basePath] = kv;
            let table = kv[Object.keys(kv)[0]];
            for (const key in table) {
                const value = table[key];
                // kvtable[key] = value;
            }
        }
        else {
            continue;
        }
    }
    return result;
}
exports.readKeyValueWithBaseIncludePath = readKeyValueWithBaseIncludePath;
function removeComment(data) {
    let newData = '';
    const rows = data.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        const lineText = rows[i];
        let state = 0; // 用于处理引号内的//注释
        for (let char = 0; char < lineText.length; char++) {
            const substr = lineText[char];
            if (substr === '"') {
                state = (state === 0) ? 1 : 0;
            }
            //引号里的// 不处理
            if (state !== 1 && substr === '/' && lineText[char + 1] === '/') {
                break;
            }
            else {
                newData += substr;
            }
        }
        newData += os.EOL;
    }
    return newData;
}
exports.removeComment = removeComment;
// 获取从ReadKeyValue2、ReadKeyValue3、ReadKeyValueWithBase得到的对象里的第index个对象，用于去掉外层，使其与DOTA2读取的KV结构一致
function getKeyValueObjectByIndex(obj, index = 0) {
    if (typeof (obj) !== "object") {
        return;
    }
    return obj[Object.keys(obj)[index]];
}
exports.getKeyValueObjectByIndex = getKeyValueObjectByIndex;
// 对象覆盖
function overrideKeyValue(mainObj, obj) {
    if (typeof (mainObj) !== "object") {
        return obj;
    }
    if (typeof (obj) !== "object") {
        return mainObj;
    }
    for (const k in obj) {
        const v = obj[k];
        if (typeof (v) === "object") {
            mainObj[k] = overrideKeyValue(mainObj[k], v);
        }
        else {
            mainObj[k] = v;
        }
    }
    return mainObj;
}
exports.overrideKeyValue = overrideKeyValue;
// 对象替换
function replaceKeyValue(mainObj, obj) {
    if (typeof (mainObj) !== "object") {
        return obj;
    }
    if (typeof (obj) !== "object") {
        return mainObj;
    }
    for (const k in obj) {
        const v = obj[k];
        if (mainObj[k] !== undefined && mainObj[k] !== null) {
            if (typeof (v) === "object") {
                mainObj[k] = overrideKeyValue(mainObj[k], v);
            }
            else {
                mainObj[k] = v;
            }
        }
    }
    return mainObj;
}
exports.replaceKeyValue = replaceKeyValue;
// 写入kv
function writeKeyValue(obj, depth = 0, tab = 12) {
    var str = '';
    if (obj === null || obj === undefined) {
        return str;
    }
    // 添加制表符
    function addDepthTab(depth, addString) {
        var tab = '';
        for (let d = 0; d < depth; d++) {
            tab += '\t';
        }
        tab += addString;
        return tab;
    }
    // 添加key与value之间制表符
    function addIntervalTab(depth, key, nTab = 12) {
        var tab = '';
        for (let d = 0; d < nTab - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
            tab += '\t';
        }
        return tab;
    }
    let keys = Object.keys(obj).sort(function (a, b) { return Number(a) - Number(b); });
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = obj[key];
        if (value === undefined || value === null || (typeof (value) === "object" && Object.keys(value).length === 0)) {
        }
        else if (typeof (value) === 'string') {
            str += addDepthTab(depth, '"' + key + '"');
            str += addIntervalTab(depth, key, tab);
            str += '"' + value + '"' + os.EOL;
        }
        else if (key === "precache" && typeof (value) === 'object') {
            // 特殊处理precache表
            str += addDepthTab(depth, '"' + key + '"' + os.EOL);
            str += addDepthTab(depth, '{' + os.EOL);
            for (const precacheType in value) {
                const typeList = value[precacheType];
                for (const precache of typeList) {
                    str += addDepthTab(depth + 1, '"' + precacheType + '"');
                    str += addIntervalTab(depth + 1, precacheType, tab);
                    str += '"' + precache + '"' + os.EOL;
                }
            }
            str += addDepthTab(depth, '}' + os.EOL);
        }
        else {
            str += addDepthTab(depth, '"' + key + '"' + os.EOL);
            str += addDepthTab(depth, '{' + os.EOL);
            str += writeKeyValue(value, depth + 1);
            str += addDepthTab(depth, '}' + os.EOL);
        }
    }
    return str;
}
exports.writeKeyValue = writeKeyValue;
/** 获取kv的#base路径列表 */
async function getBaseInfo(fullPath) {
    let kvString = fs.readFileSync(fullPath, 'utf-8');
    let result = [];
    kvString = removeComment(kvString);
    const rows = kvString.split(os.EOL);
    for (let i = 0; i < rows.length; i++) {
        const lineText = rows[i];
        if (lineText.search(/#base ".*"\s/) !== -1) {
            lineText.replace(/#base "(.*)"/, (a, b) => {
                result.push(b);
                return a;
            });
        }
        else {
            continue;
        }
    }
    return result;
}
exports.getBaseInfo = getBaseInfo;
//# sourceMappingURL=kvUtils.js.map