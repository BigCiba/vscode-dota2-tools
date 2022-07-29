"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMapEntities = void 0;
const vscode = require("vscode");
const addonInfo_1 = require("../module/addonInfo");
const eachLine_1 = require("../utils/eachLine");
const os = require("os");
const fs = require("fs");
const kvUtils_1 = require("../utils/kvUtils");
/**
 * 解析vmap的实体信息
 * @param context
 */
async function parseMapEntities(context) {
    const gameDir = (0, addonInfo_1.getGameDir)();
    const mapPath = gameDir.replace("game\\dota_rogue", "design\\工具\\Decompiler-windows\\maps\\chapter");
    let jsonObj = {};
    await readFolder(mapPath);
    async function readFolder(folderName) {
        let folders = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folderName));
        for (let i = 0; i < folders.length; i++) {
            const [name, isDirectory] = folders[i];
            if (name === undefined) {
                continue;
            }
            if (Number(isDirectory) === vscode.FileType.Directory) {
                await readFolder(folderName + '/' + name);
            }
            else if (Number(isDirectory) === vscode.FileType.File) {
                // console.log(folder_name, ",", name);
                let data = parseVents(fs.readFileSync(folderName + '/' + name, 'utf-8'));
                let key = "chapter" + folderName.split(mapPath)[1].split("/entities")[0];
                jsonObj[key] = data;
            }
        }
    }
    function parseVents(text) {
        let row = text.split(os.EOL);
        let exitData = {};
        (0, eachLine_1.eachLine)(row, (line, lineText) => {
            if (lineText.indexOf("info_exit_") !== -1) {
                let direction = lineText.split("info_exit_")[1];
                let originLine = "";
                for (let index = 1; index < 10; index++) {
                    if (row[line + index].indexOf("origin                         string     ") !== -1) {
                        originLine = row[line + index];
                        break;
                    }
                }
                let aaa = originLine.split("origin                         string     ");
                let bbb = aaa[1].split(" ");
                exitData[direction] = {
                    x: bbb[0],
                    y: bbb[1],
                    z: bbb[2],
                };
            }
        });
        return exitData;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fs.writeFileSync(gameDir + "/scripts/npc/kv/rooms/room_exit_info.kv", (0, kvUtils_1.writeKeyValue)({ KeyValue: jsonObj }));
}
exports.parseMapEntities = parseMapEntities;
//# sourceMappingURL=cmdParseMapEntities.js.map