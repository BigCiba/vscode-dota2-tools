import { execFile } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { changeStatusBarState, getOutputChannel, refreshStatusBarMessage, showStatusBarMessage, StatusBarState } from "../module/statusBar";
import { localize } from "../utils/localize";

/**
 * Images have no direct compiler ("Failed to find compiler for file") — they compile
 * through a sibling <name>_<ext>.vtex descriptor, producing the <name>_<ext>.vtex_c
 * panorama expects. If the user has no hand-written .vtex, a temporary one is generated
 * (RGBA8888, no mips — mip generation fails on non-power-of-two panorama images).
 */
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".tga", ".psd"]);

/** Path relative to the mod content root (content/<mod> or content/dota_addons/<addon>), '/'-separated */
function contentRelativePath(filePath: string): string | undefined {
	const parts = filePath.split(path.sep);
	const contentIndex = parts.findIndex((part) => part.toLowerCase() === "content");
	if (contentIndex === -1) {
		return undefined;
	}
	const modDepth = parts[contentIndex + 1]?.toLowerCase() === "dota_addons" ? contentIndex + 3 : contentIndex + 2;
	if (modDepth >= parts.length) {
		return undefined;
	}
	return parts.slice(modDepth).join("/");
}

function buildVtexDescriptor(contentRelativeImage: string): string {
	return `<!-- dmx encoding keyvalues2_noids 1 format vtex 1 -->
"CDmeVtex"
{
	"m_inputTextureArray" "element_array"
	[
		"CDmeInputTexture"
		{
			"m_name" "string" "InputTexture0"
			"m_fileName" "string" "${contentRelativeImage}"
			"m_colorSpace" "string" "srgb"
			"m_typeString" "string" "2D"
			"m_imageProcessorArray" "element_array"
			[
				"CDmeImageProcessor"
				{
					"m_algorithm" "string" "None"
					"m_stringArg" "string" ""
					"m_vFloat4Arg" "vector4" "0 0 0 0"
				}
			]
		}
	]
	"m_outputTypeString" "string" "2D"
	"m_outputFormat" "string" "RGBA8888"
	"m_outputClearColor" "vector4" "0 0 0 0"
	"m_nOutputMinDimension" "int" "0"
	"m_nOutputMaxDimension" "int" "0"
	"m_textureOutputChannelArray" "element_array"
	[
		"CDmeTextureOutputChannel"
		{
			"m_inputTextureArray" "string_array" [ "InputTexture0" ]
			"m_srcChannels" "string" "rgba"
			"m_dstChannels" "string" "rgba"
			"m_mipAlgorithm" "CDmeImageProcessor"
			{
				"m_algorithm" "string" "None"
				"m_stringArg" "string" ""
				"m_vFloat4Arg" "vector4" "0 0 0 0"
			}
			"m_outputColorSpace" "string" "srgb"
		}
	]
	"m_vClamp" "vector3" "0 0 0"
	"m_bNoLod" "bool" "1"
}
`;
}

/**
 * Locate resourcecompiler.exe: the configured Dota 2 install path first, then walk up
 * from the compiled file itself (the addon usually lives at <dota>/content/dota_addons/<addon>,
 * the compiler at <dota>/game/bin/win64).
 */
function findResourceCompiler(contentFilePath: string): string | undefined {
	const installPath = vscode.workspace.getConfiguration().get<string>("dota2-tools.dota2_install_path");
	if (installPath !== undefined && installPath !== "") {
		const compiler = path.join(installPath, "game", "bin", "win64", "resourcecompiler.exe");
		if (fs.existsSync(compiler)) {
			return compiler;
		}
	}
	const parts = contentFilePath.split(path.sep);
	for (let i = parts.length - 1; i >= 0; i--) {
		if (parts[i].toLowerCase() === "content") {
			const compiler = path.join(parts.slice(0, i).join(path.sep), "game", "bin", "win64", "resourcecompiler.exe");
			if (fs.existsSync(compiler)) {
				return compiler;
			}
		}
	}
	return undefined;
}

/** Recompile content resources (explorer context menu; multi-select compiles all in one run) */
export async function recompileResource(context: vscode.ExtensionContext, uri?: vscode.Uri, uris?: vscode.Uri[]) {
	// The explorer passes (clickedUri, allSelectedUris); fall back to the active editor
	const selection: vscode.Uri[] = uris !== undefined && uris.length > 0 ? uris : uri !== undefined ? [uri] : [];
	if (selection.length === 0) {
		const active = vscode.window.activeTextEditor?.document.uri;
		if (active === undefined) {
			return;
		}
		selection.push(active);
	}

	const inputs: string[] = [];
	const temporaryVtexes: string[] = [];
	const fileNames: string[] = [];
	let compiler: string | undefined;
	for (const target of selection) {
		// Resolve mklink junctions so the compiler sees the real path inside the Dota 2 installation
		let filePath = path.normalize(target.fsPath);
		try {
			filePath = fs.realpathSync.native(filePath);
		} catch {
			// keep the workspace path if it cannot be resolved
		}
		try {
			if (fs.statSync(filePath).isDirectory()) {
				continue;
			}
		} catch {
			continue;
		}
		if (!/[\\/]content[\\/]/i.test(filePath)) {
			vscode.window.showWarningMessage(localize("msg_not_content_file", [filePath]));
			continue;
		}
		if (compiler === undefined) {
			compiler = findResourceCompiler(filePath);
		}

		// Images compile through a <name>_<ext>.vtex descriptor; keep a user-authored one, generate a temporary one otherwise
		let inputPath = filePath;
		const ext = path.extname(filePath).toLowerCase();
		if (IMAGE_EXTENSIONS.has(ext)) {
			const vtexPath = filePath.slice(0, -ext.length) + `_${ext.slice(1)}.vtex`;
			if (!fs.existsSync(vtexPath)) {
				const relativeImage = contentRelativePath(filePath);
				if (relativeImage === undefined) {
					vscode.window.showWarningMessage(localize("msg_not_content_file", [filePath]));
					continue;
				}
				try {
					fs.writeFileSync(vtexPath, buildVtexDescriptor(relativeImage));
				} catch (e) {
					vscode.window.showErrorMessage(localize("msg_compile_failed", [path.basename(filePath)]) + ` (${e})`);
					continue;
				}
				temporaryVtexes.push(vtexPath);
			}
			inputPath = vtexPath;
		}
		inputs.push(inputPath);
		fileNames.push(path.basename(filePath));
	}

	const removeTemporaryVtexes = () => {
		for (const vtex of temporaryVtexes) {
			try {
				fs.unlinkSync(vtex);
			} catch {
				// leftover descriptor is harmless
			}
		}
	};

	if (inputs.length === 0) {
		removeTemporaryVtexes();
		return;
	}
	if (compiler === undefined) {
		removeTemporaryVtexes();
		vscode.window.showErrorMessage(localize("msg_resourcecompiler_missing"));
		return;
	}

	changeStatusBarState(StatusBarState.LOADING);
	const label = fileNames.length === 1 ? fileNames[0] : `${fileNames[0]} (+${fileNames.length - 1})`;
	const messageIndex = showStatusBarMessage(localize("msg_compiling_resource", [label]), 300);
	const args = ["-fshallow"];
	for (const input of inputs) {
		args.push("-i", input);
	}
	execFile(compiler, args, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
		removeTemporaryVtexes();
		changeStatusBarState(StatusBarState.ALL_DONE);
		const output = getOutputChannel();
		output.appendLine(`> "${compiler}" ${args.map((a) => (a.startsWith("-") ? a : `"${a}"`)).join(" ")}`);
		if (stdout) {
			output.append(stdout);
		}
		if (stderr) {
			output.append(stderr);
		}
		// resourcecompiler can exit with code 0 even when a resource fails, so also scan its output
		const combined = `${stdout}${stderr}`;
		const failed = error !== null || /compile failed/i.test(combined) || /[1-9]\d* failed/.test(combined);
		if (failed) {
			refreshStatusBarMessage(messageIndex, localize("msg_compile_failed", [label]));
			vscode.window.showErrorMessage(localize("msg_compile_failed", [label]), localize("dota2tools.showOutput")).then((choice) => {
				if (choice !== undefined) {
					output.show();
				}
			});
		} else {
			refreshStatusBarMessage(messageIndex, localize("msg_compile_done", [label]));
		}
	});
}
