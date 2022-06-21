import * as vscode from 'vscode';

export async function findFile(currentPath: string, fileName: string, fordersLimit?: number, interest?: string[], exclude?: string[], stopAfterFind?: boolean): Promise<string[] | false> {
	let pathList: string[] = [];
	let folders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(currentPath));
	// 过滤掉大文件夹
	if (fordersLimit && folders.length > fordersLimit) {
		return false;
	}

	// 感兴趣的文件夹
	if (interest) {
		for (const interestName of interest) {
			for (let i: number = 0; i < folders.length; i++) {
				const [folderName, isDirectory] = folders[i];
				if (folderName === interestName) {
					if (i != 0) {
						folders.unshift(folders.splice(i, 1)[0]);
					}
				}
			}
		}
	}

	for (let i: number = 0; i < folders.length; i++) {
		const [folderName, isDirectory] = folders[i];

		if (folderName === '.git' || folderName === 'node_modules') {
			continue;
		}
		// 排除文件夹
		if (exclude) {
			for (const excludeName of exclude) {
				if (folderName === excludeName) {
					continue;
				}
			}
		}
		if (folderName === fileName) {
			pathList.push(currentPath);
			if (stopAfterFind) {
				return pathList;
			}
		}
		if (Number(isDirectory) === vscode.FileType.Directory || Number(isDirectory) === vscode.FileType.SymbolicLink + vscode.FileType.Directory) {
			let bFind: string[] | false = await findFile(currentPath + '\\' + folderName, fileName, fordersLimit, interest, exclude, stopAfterFind);
			if (bFind !== false) {
				pathList = pathList.concat(bFind);
			}
		}
	}
	if (pathList.length === 0) {
		return false;
	} else {
		return pathList;
	}
}