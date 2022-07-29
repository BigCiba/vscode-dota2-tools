"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inheritCSV = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const statusBar_1 = require("../module/statusBar");
const getRootPath_1 = require("../utils/getRootPath");
const pathUtils_1 = require("../utils/pathUtils");
const kvUtils_1 = require("../utils/kvUtils");
const cmdInheritTable_1 = require("./cmdInheritTable");
async function inheritCSV(context) {
    let rootPath = (0, getRootPath_1.getRootPath)();
    if (rootPath === undefined) {
        return;
    }
    let sConfigPath = path.join(rootPath, "/eom_config.txt");
    if (await (0, pathUtils_1.getPathInfo)(sConfigPath) === false) {
        return;
    }
    let eomProjectConfig = (0, kvUtils_1.getKeyValueObjectByIndex)((0, kvUtils_1.readKeyValue2)(fs.readFileSync(sConfigPath, 'utf-8')));
    let inheritConfig = eomProjectConfig.InheritConfig;
    if (!inheritConfig) {
        return;
    }
    let abilitiesExcelPaths = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
    let unitsExcelPaths = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};
    // 读取每一个继承表的配置
    for (const key in inheritConfig) {
        const config = inheritConfig[key];
        // 缺少必填项
        if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
            continue;
        }
        // 读取配置的三项路径
        let sParentPath = path.join(rootPath, path.dirname(config.parent), "csv", path.basename(config.parent).replace(path.extname(config.parent), '.csv'));
        let sTransitionPath = path.join(rootPath, path.dirname(config.transition), "csv", path.basename(config.transition).replace(path.extname(config.transition), '.csv'));
        let sChildPath = path.join(rootPath, path.dirname(config.child), "csv", path.basename(config.child).replace(path.extname(config.child), '.csv'));
        (0, cmdInheritTable_1.generateInheritTable)(sParentPath, sTransitionPath, sChildPath, config);
        (0, statusBar_1.showStatusBarMessage)("[表继承]：" + sChildPath);
    }
}
exports.inheritCSV = inheritCSV;
//# sourceMappingURL=cmdInheritCSV.js.map