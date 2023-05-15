"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyDotaResourcePath = void 0;
const path = require("path");
const vscode = require("vscode");
const addonInfo_1 = require("../module/addonInfo");
async function CopyDotaResourcePath(context, uri) {
    let imageDir = path.resolve((0, addonInfo_1.getContentDir)(), "panorama/images/");
    let filePath = path.normalize(uri.fsPath);
    vscode.env.clipboard.writeText(`file://{images}/${path.relative(imageDir, filePath).replace(/\\/g, "/")}`);
}
exports.CopyDotaResourcePath = CopyDotaResourcePath;
//# sourceMappingURL=cmdDotaResourcePath.js.map