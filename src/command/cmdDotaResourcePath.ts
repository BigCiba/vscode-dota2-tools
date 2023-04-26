import * as path from 'path';
import * as vscode from 'vscode';
import { getContentDir } from "../module/addonInfo";

export async function CopyDotaResourcePath(context: vscode.ExtensionContext, uri: vscode.Uri) {
	let imageDir = path.resolve(getContentDir(), "panorama/images/");
	let filePath: string = path.normalize(uri.fsPath);
	vscode.env.clipboard.writeText(`file://{images}/${path.relative(imageDir, filePath).replace(/\\/g, "/")}`);
}