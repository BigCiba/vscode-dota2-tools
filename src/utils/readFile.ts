import { TextDecoder } from "util";
import { Uri, workspace } from "vscode";

/**
 * Read a file inside the extension
 */
export async function readFile(uri: Uri) {
	let array = await workspace.fs.readFile(uri);
	return new TextDecoder().decode(array);
}