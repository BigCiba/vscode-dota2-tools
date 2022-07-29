import { ExtensionContext, workspace } from "vscode";
import { getContentDir } from "../module/addonInfo";
import { getPathInfo } from "../utils/pathUtils";
import * as fs from "fs";
import path = require("path");
import { writeKeyValue } from "../utils/kvUtils";
import { changeStatusBarState, showStatusBarMessage, StatusBarState } from "../module/statusBar";
import { localize } from "../utils/localize";

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
	const sImageFolder = path.join(contentDir, VPDIConfig.ImagePath);
	if (await getPathInfo(sImageFolder) === false) {
		showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("path_no_found") + sImageFolder);
		return;
	}

	changeStatusBarState(StatusBarState.LOADING);
	const sDotaImageFolder = path.join(contentDir, "panorama", "images");
	const Explicit_Files: Record<string, string> = {};

	function ReadImagePath(sPath: string) {
		const files = fs.readdirSync(sPath);
		files.forEach((sFileName) => {
			const sFilePath = path.join(sPath, sFileName);
			const stat = fs.statSync(sFilePath);
			if (stat.isFile()) {
				Explicit_Files[sFilePath.replace(sDotaImageFolder, "{images}")] = "";
			} else if (stat.isDirectory()) {
				ReadImagePath(sFilePath);
			}
		});
	}
	ReadImagePath(sImageFolder);

	const sVPDIPath = path.join(contentDir, VPDIConfig.VPDIPath);
	fs.writeFileSync(sVPDIPath, writeKeyValue({
		DynamicImages: {
			"Explicit Files": Explicit_Files
		}
	}));
	showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("generateFinish"));
	changeStatusBarState(StatusBarState.ALL_DONE);
}