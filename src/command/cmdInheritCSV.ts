import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { getGameDir, isValidFolder } from '../module/addonInfo';
import { showStatusBarMessage } from '../module/statusBar';
import { getRootPath } from '../utils/getRootPath';
import { getPathInfo } from '../utils/pathUtils';
import { getKeyValueObjectByIndex, readKeyValue2 } from '../utils/kvUtils';
import { generateInheritTable } from './cmdInheritTable';

export async function inheritCSV(context: vscode.ExtensionContext) {
	let rootPath = getRootPath();
	if (rootPath === undefined) {
		return;
	}

	let sConfigPath = path.join(rootPath, "/eom_config.txt");
	if (await getPathInfo(sConfigPath) === false) {
		return;
	}

	let eomProjectConfig = getKeyValueObjectByIndex(readKeyValue2(fs.readFileSync(sConfigPath, 'utf-8')));
	let inheritConfig = eomProjectConfig.InheritConfig;
	if (!inheritConfig) {
		return;
	}
	let abilitiesExcelPaths: Table = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
	let unitsExcelPaths: Table = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};

	// 读取每一个继承表的配置
	for (const key in inheritConfig) {
		const config = inheritConfig[key];
		// 缺少必填项
		if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
			continue;
		}
		// 读取配置的三项路径
		let sParentPath = path.join(rootPath, path.dirname(config.parent), "csv", path.basename(config.parent).replace(path.extname(config.parent), '.csv'));
		let sTransitionPath = path.join(rootPath, path.dirname(config.transition), "csv", path.basename(config.transition).replace(path.extname(config.transition), '.csv'));
		let sChildPath = path.join(rootPath, path.dirname(config.child), "csv", path.basename(config.child).replace(path.extname(config.child), '.csv'));
		generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
		showStatusBarMessage("[表继承]：" + sChildPath);
	}
}