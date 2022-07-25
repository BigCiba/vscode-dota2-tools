import { ExtensionContext, workspace } from "vscode";
import { getContentDir } from "../module/addonInfo";
import { getPathInfo } from "../utils/pathUtils";
import * as fs from "fs";
import path = require("path");
import { writeKeyValue } from "../utils/kvUtils";

interface VPDIConfig {
	ImagePath: string;
	VPDIPath: string;
}

export async function generateVPDI(context: ExtensionContext) {
	const contentDir = getContentDir();
	const VPDIConfig = workspace.getConfiguration().get<VPDIConfig>("dota2-tools.VPDI");
	if (VPDIConfig == undefined) {
		return;
	}
	const sImageFolder = path.join(contentDir, "panorama", VPDIConfig.ImagePath);
	if (await getPathInfo(sImageFolder) === false) {
		return;
	}
	const aVPDI: string[] = [];

	function ReadImagePath(sPath: string) {
		const files = fs.readdirSync(sPath);
		files.forEach((sFileName) => {
			const sFilePath = path.join(sPath, sFileName);
			const stat = fs.statSync(sFilePath);
			if (stat.isFile()) {
				aVPDI.push(sFilePath.replace(path.join(contentDir, "panorama", "images"), "{images}"));
			} else if (stat.isDirectory()) {
				ReadImagePath(sFilePath);
			}
		});
	}
	ReadImagePath(sImageFolder);

	const sVPDIPath = path.join(contentDir, VPDIConfig.VPDIPath);
	const Explicit_Files: Record<string, string> = {};
	aVPDI.forEach((sImageVPDI) => {
		Explicit_Files[sImageVPDI] = "";
	});
	fs.writeFileSync(sVPDIPath, writeKeyValue({
		DynamicImages: {
			"Explicit Files": Explicit_Files
		}
	}));
}