"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVPDI = void 0;
const vscode_1 = require("vscode");
const addonInfo_1 = require("../module/addonInfo");
const pathUtils_1 = require("../utils/pathUtils");
const fs = require("fs");
const path = require("path");
const kvUtils_1 = require("../utils/kvUtils");
async function generateVPDI(context) {
    const contentDir = (0, addonInfo_1.getContentDir)();
    const VPDIConfig = vscode_1.workspace.getConfiguration().get("dota2-tools.VPDI");
    if (VPDIConfig == undefined) {
        return;
    }
    const sImageFolder = path.join(contentDir, "panorama", VPDIConfig.ImagePath);
    if (await (0, pathUtils_1.getPathInfo)(sImageFolder) === false) {
        return;
    }
    const sDotaImageFolder = path.join(contentDir, "panorama", "images");
    const Explicit_Files = {};
    function ReadImagePath(sPath) {
        const files = fs.readdirSync(sPath);
        files.forEach((sFileName) => {
            const sFilePath = path.join(sPath, sFileName);
            const stat = fs.statSync(sFilePath);
            if (stat.isFile()) {
                Explicit_Files[sFilePath.replace(sDotaImageFolder, "{images}")] = "";
            }
            else if (stat.isDirectory()) {
                ReadImagePath(sFilePath);
            }
        });
    }
    ReadImagePath(sImageFolder);
    const sVPDIPath = path.join(contentDir, VPDIConfig.VPDIPath);
    fs.writeFileSync(sVPDIPath, (0, kvUtils_1.writeKeyValue)({
        DynamicImages: {
            "Explicit Files": Explicit_Files
        }
    }));
}
exports.generateVPDI = generateVPDI;
//# sourceMappingURL=cmdGenerateVPDI.js.map