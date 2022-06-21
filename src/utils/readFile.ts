import { TextDecoder } from "util";
import { Uri, workspace } from "vscode";

/**
 * 读取插件内的文件
 */
export async function readFile(uri: Uri) {
	let array = await workspace.fs.readFile(uri);
	return new TextDecoder().decode(array);
}