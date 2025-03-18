import * as fs from "fs";
import { ExtensionContext, workspace } from "vscode";
import { getContentDir } from "../module/addonInfo";
import { StatusBarState, changeStatusBarState, showStatusBarMessage } from "../module/statusBar";
import { writeKeyValue } from "../utils/kvUtils";
import { localize } from "../utils/localize";
import { getPathInfo } from "../utils/pathUtils";
import path = require("path");

interface VPDIConfig {
	ImagePath: string | string[];
	VPDIPath: string;
}

export async function generateVPDI(context: ExtensionContext) {
	const contentDir = getContentDir();
	const VPDIConfig = workspace.getConfiguration().get<VPDIConfig>("dota2-tools.VPDI");
	if (VPDIConfig == undefined) {
		return;
	}
	let sImageFolders: string[] = [];
	// 允许字符串适配旧版本的配置
	if (typeof VPDIConfig.ImagePath === "string") {
		sImageFolders = [VPDIConfig.ImagePath];
	} else {
		sImageFolders = VPDIConfig.ImagePath;
	}
	sImageFolders = sImageFolders.map((sImageFolder) => path.join(contentDir, sImageFolder));

	for (let i = 0; i < sImageFolders.length; i++) {
		const sImageFolder = sImageFolders[i];
		if (await getPathInfo(sImageFolder) === false) {
			showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("path_no_found") + sImageFolder);
			return;
		}
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
				const sFullPath = sFilePath.replace(sDotaImageFolder, "{images}");
				if (sFullPath.search(/[^\x00-\xff]/g) == -1) {
					Explicit_Files[sFullPath.replace(/\\/g, "/")] = "";
				}
			} else if (stat.isDirectory()) {
				ReadImagePath(sFilePath);
			}
		});
	}
	for (let i = 0; i < sImageFolders.length; i++) {
		const sImageFolder = sImageFolders[i];
		ReadImagePath(sImageFolder);
	}

	const sVPDIPath = path.join(contentDir, VPDIConfig.VPDIPath);
	fs.writeFileSync(sVPDIPath, writeKeyValue({
		DynamicImages: {
			"Explicit Files": Explicit_Files
		}
	}));
	showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("generateFinish"));
	changeStatusBarState(StatusBarState.ALL_DONE);
}

export async function generateRecentVPDI(context: ExtensionContext) {
	const contentDir = getContentDir();
	const VPDIConfig = workspace.getConfiguration().get<VPDIConfig>("dota2-tools.VPDI");
	if (VPDIConfig == undefined) {
		return;
	}
	let sImageFolders: string[] = [];
	// 允许字符串适配旧版本的配置
	if (typeof VPDIConfig.ImagePath === "string") {
		sImageFolders = [VPDIConfig.ImagePath];
	} else {
		sImageFolders = VPDIConfig.ImagePath;
	}
	sImageFolders = sImageFolders.map((sImageFolder) => path.join(contentDir, sImageFolder));

	for (let i = 0; i < sImageFolders.length; i++) {
		const sImageFolder = sImageFolders[i];
		if (await getPathInfo(sImageFolder) === false) {
			showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("path_no_found") + sImageFolder);
			return;
		}
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
				const sFullPath = sFilePath.replace(sDotaImageFolder, "{images}");
				const modifiedTime = Math.max(stat.mtimeMs, stat.birthtimeMs);
				const currentTime = Date.now();
				const timeDifference = currentTime - modifiedTime;
				const twentyFourHours = 1 * 60 * 60 * 1000; // 24 hours in milliseconds

				if (sFullPath.search(/[^\x00-\xff]/g) == -1 && timeDifference <= twentyFourHours) {
					Explicit_Files[sFullPath.replace(/\\/g, "/")] = "";
				}
			} else if (stat.isDirectory()) {
				ReadImagePath(sFilePath);
			}
		});
	}
	for (let i = 0; i < sImageFolders.length; i++) {
		const sImageFolder = sImageFolders[i];
		ReadImagePath(sImageFolder);
	}

	const sVPDIPath = path.join(contentDir, VPDIConfig.VPDIPath);
	fs.writeFileSync(sVPDIPath, writeKeyValue({
		DynamicImages: {
			"Explicit Files": Explicit_Files
		}
	}));
	showStatusBarMessage(`[${localize("generateVPDI")}]：` + localize("generateFinish"));
	changeStatusBarState(StatusBarState.ALL_DONE);
}