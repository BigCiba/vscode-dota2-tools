import * as fs from 'fs';
import * as path from 'path';
/**
 * Read path info
 * @param {string} path The path
 */
export function getPathInfo(path: string): Promise<boolean | fs.Stats> {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				resolve(false);
			} else {
				resolve(stats);
			}
		});
	});
}

/**
 * Create a directory
 * @param {string} dir The path
 */
export async function makeDir(dir: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		fs.mkdir(dir, err => {
			if (err) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

/**
 * Whether the path exists; create it if it does not
 * @param {string} dir The path
 */
export async function dirExists(dir: string) {
	let isExists = await getPathInfo(dir);
	//If the path exists and is not a file, return true
	if (isExists && isExists !== true && isExists.isDirectory()) {
		return true;
	} else if (isExists) {	 //If the path exists but is a file, return false
		return false;
	}
	//If the path does not exist
	let tempDir = path.parse(dir).dir;	  //Get the parent path
	//Recursively check; if the parent directory also does not exist, the code keeps looping here until the directory exists
	let status = await dirExists(tempDir);
	let mkdirStatus;
	if (status) {
		mkdirStatus = await makeDir(dir);
	}
	return mkdirStatus;
}