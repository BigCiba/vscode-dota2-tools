"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirExists = exports.makeDir = exports.getPathInfo = void 0;
const fs = require("fs");
const path = require("path");
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getPathInfo(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(stats);
            }
        });
    });
}
exports.getPathInfo = getPathInfo;
/**
 * 创建路径
 * @param {string} dir 路径
 */
async function makeDir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.makeDir = makeDir;
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getPathInfo(dir);
    //如果该路径且不是文件，返回true
    if (isExists && isExists !== true && isExists.isDirectory()) {
        return true;
    }
    else if (isExists) { //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir; //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await makeDir(dir);
    }
    return mkdirStatus;
}
exports.dirExists = dirExists;
//# sourceMappingURL=pathUtils.js.map