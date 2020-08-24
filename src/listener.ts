import * as util from './util';
import * as watch from 'watch';
import xlsx from 'node-xlsx';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { Init, KV2LUA, VSND, GameDir, ContentDir } from './init';
import { print, log } from 'util';
import * as os from 'os';
import { generateInheritTable } from "./table_inherit";

export class Listener {
	context: vscode.ExtensionContext;
	InheritCSVInfo: any[] = [];

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.WatchAbilityExcel();	//监听技能excel
		this.WatchUnitExcel();		//监听单位excel
		if (vscode.workspace.getConfiguration().get('dota2-tools.Listen Localization') === true) {
			this.WatchLocalization();//监听文本合并
		}
		if (vscode.workspace.getConfiguration().get('dota2-tools.Listen KV to Js') === true) {
			this.WatchKeyValue();//监听kv
		}
		this.WatchInheritCSV();
	}

	async OnConfigChanged(event: vscode.ConfigurationChangeEvent) {
		if (event.affectsConfiguration('dota2-tools.abilities_excel_path') === true || event.affectsConfiguration('dota2-tools.abilities_kv_path') === true) {
			this.WatchAbilityExcel();
		}
		if (event.affectsConfiguration('dota2-tools.Listen Localization') === true) {
			if (vscode.workspace.getConfiguration().get('dota2-tools.Listen Localization') === true) {
				this.WatchLocalization();
			} else {
				this.UnWatchLocalization();
			}
		}
		// 和监听表相关的配置变更了的话
		let inheritConfigs = ["dota2-tools.abilities_excel_path", "dota2-tools.units_excel_path"];
		for (let index = 0; index < inheritConfigs.length; index++) {
			if (event.affectsConfiguration(inheritConfigs[index]) === true) {
				this.UnWatchInheritCSVInfo();
				this.WatchInheritCSV(true);
				break;
			}
		}

	}

	async WatchAbilityExcel() {
		const excel_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path');
		const kv_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.abilities_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		for (const index in excel_object) {
			let listen_path = excel_object[index].replace(/\\\\/g, '/');
			let file_type: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
			if (file_type === vscode.FileType.Directory) {
				let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
				for (let i: number = 0; i < files.length; i++) {
					let [file_name, is_file] = files[i];
					if (file_name === undefined || file_name.search(/~\$/) !== -1) {
						continue;
					}
					if (is_file === vscode.FileType.File) {
						let file_path: string = listen_path + '/' + file_name;
						let csv_path: string = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
						WatchFile(csv_path, kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv');
					}
				}
			} else if (file_type === vscode.FileType.File) {
				listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
				WatchFile(listen_path, kv_object[index]);
			}
			function WatchFile(csv_path: string, kv_path: string) {
				// console.log('watch ' + csv_path);
				fs.watchFile(csv_path, (curr, prev) => {
					if (curr.nlink === 0) {
						console.log('removed');
					} else {
						vscode.window.setStatusBarMessage(path.basename(csv_path) + ' changed');
						fs.writeFileSync(kv_path, util.WriteKeyValue({ KeyValue: util.AbilityCSV2KV(csv_path) }));
					}
				});
			}
		}
	}
	async WatchUnitExcel() {
		const excel_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path');
		const kv_object: util.Configuration | undefined = vscode.workspace.getConfiguration().get('dota2-tools.units_kv_path');
		if (excel_object === undefined || kv_object === undefined) {
			return;
		}
		for (const index in excel_object) {
			let listen_path: string = excel_object[index].replace(/\\\\/g, '/');
			let file_type: vscode.FileType = (await vscode.workspace.fs.stat(vscode.Uri.file(listen_path))).type;
			if (file_type === vscode.FileType.Directory) {
				let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(listen_path));
				for (let i: number = 0; i < files.length; i++) {
					let [file_name, is_file] = files[i];
					if (file_name === undefined || file_name.search(/~\$/) !== -1) {
						continue;
					}
					if (is_file === vscode.FileType.File) {
						let file_path: string = listen_path + '/' + file_name;
						let csv_path: string = path.join(path.dirname(file_path), 'csv', path.basename(file_path).replace(path.extname(file_path), '.csv'));
						WatchFile(csv_path, kv_object[index] + '/' + file_name.replace(path.extname(file_name), '') + '.kv');
					}
				}
			} else if (file_type === vscode.FileType.File) {
				listen_path = path.join(path.dirname(listen_path), 'csv', path.basename(listen_path).replace(path.extname(listen_path), '.csv'));
				WatchFile(listen_path, kv_object[index]);
			}
		}
		function WatchFile(csv_path: string, kv_path: string) {
			fs.watchFile(csv_path, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					vscode.window.setStatusBarMessage(path.basename(csv_path) + ' changed');
					console.log(csv_path + ' changed');
					fs.writeFileSync(kv_path, util.WriteKeyValue({ KeyValue: util.UnitCSV2KV(csv_path) }));
				}
			});
		}
	}

	WatchLocalization() {
		watch.watchTree(GameDir + '/localization', function (f, curr, prev) {
			if (typeof f === "object" && prev === null && curr === null) {
				// Finished walking the tree
			} else if (prev === null) {
				// f is a new file
				console.log('f is a new file');
				vscode.commands.executeCommand('dota2tools.Localization');
			} else if (curr.nlink === 0) {
				// f was removed
				console.log('f was removed');
				vscode.commands.executeCommand('dota2tools.Localization');
			} else {
				// f was changed
				console.log('f was changed');
				vscode.commands.executeCommand('dota2tools.Localization');
			}
		});
	}
	UnWatchLocalization() {
		watch.unwatchTree(GameDir + '/localization');
	}

	// 把现在正在监听的所有基础csv文件取消监听
	async UnWatchInheritCSVInfo() {
		for (let index = 0; index < this.InheritCSVInfo.length; index++) {
			const info = this.InheritCSVInfo[index];
			fs.unwatchFile(info.parent);
			fs.unwatchFile(info.transition);
		}
	}

	// 监听表继承的几个表文件
	async WatchInheritCSV(bGenerateNew = false) {
		let root_path: string | undefined = util.GetRootPath();
		if (root_path === undefined) {
			return;
		}

		let sConfigPath = (root_path + "/eom_config.txt").replace("\\", "/");
		// 监听配置文件的变动
		fs.watchFile(sConfigPath, (curr, prev) => {
			if (curr.nlink === 0) {
				console.log('removed');
			} else {
				console.log("WatchInheritCSV on config changed");
				this.UnWatchInheritCSVInfo();
				this.WatchInheritCSV(true);
			}
		});

		let EOMProjectConfig = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sConfigPath, 'utf-8')));
		let InheritConfig = EOMProjectConfig.InheritConfig;
		if (!InheritConfig) {
			return;
		}
		let abilities_excel_paths: util.Configuration = vscode.workspace.getConfiguration().get('dota2-tools.abilities_excel_path') || {};
		let units_excel_paths: util.Configuration = vscode.workspace.getConfiguration().get('dota2-tools.units_excel_path') || {};

		// 可能配置了多个路径，每个一一对应来生成继承表
		for (let configIndex = 0; configIndex < 100; configIndex++) {
			let abilities_excel_path = abilities_excel_paths[configIndex];
			let units_excel_path = units_excel_paths[configIndex];
			// 任意一个没有就不算合格的配置
			if (!abilities_excel_path || !units_excel_path) {
				break;
			}
			// 读取每一个继承表的配置
			for (const key in InheritConfig) {
				const config = InheritConfig[key];
				// 缺少必填项
				if (!config.type || !config.parent || !config.transition || !config.child || !config.inherit_column) {
					continue;
				}
				// 读取配置的三项路径
				let sParentPath, sTransitionPath, sChildPath = "invalid";
				if (config.type == "ability") {
					sParentPath = abilities_excel_path + "/csv/" + config.parent + ".csv";
					sTransitionPath = abilities_excel_path + "/csv/" + config.transition + ".csv";
					sChildPath = abilities_excel_path + "/csv/" + config.child + ".csv";
				} else if (config.type == "unit") {
					sParentPath = units_excel_path + "/csv/" + config.parent + ".csv";
					sTransitionPath = units_excel_path + "/csv/" + config.transition + ".csv";
					sChildPath = units_excel_path + "/csv/" + config.child + ".csv";
				} else {
					continue;
				}
				let watchInfo = { parent: sParentPath, transition: sTransitionPath };
				this.InheritCSVInfo.push(watchInfo);
				WatchInheritCSVFiles(sParentPath, sTransitionPath, sChildPath, config);
				if (bGenerateNew) {
					generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
				}
			}
		}

		function WatchInheritCSVFiles(sParentPath: string, sTransitionPath: string, sChildPath: string, config: any) {
			let result = fs.watchFile(sParentPath, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
				}
			});
			fs.watchFile(sTransitionPath, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					generateInheritTable(sParentPath, sTransitionPath, sChildPath, config);
				}
			});
		}
	}

	async WatchKeyValue() {
		let Config: any = vscode.workspace.getConfiguration().get('dota2-tools.KV to Js Config');
		let sKvPath = (GameDir + Config).replace("\\", "/");
		if (await util.GetStat(sKvPath) === false) {
			return;
		}
		let KVFiles = util.GetKeyValueObjectByIndex(util.ReadKeyValue2(fs.readFileSync(sKvPath, 'utf-8')));
		let KVString = fs.readFileSync(sKvPath, 'utf-8');
		let KVHeaders: { [k: string]: any } = {};
		const rows: string[] = KVString.split(os.EOL);
		for (let i = 0; i < rows.length; i++) {
			const line_text: string = rows[i];
			let aHeaders = line_text.match(/@.+?\b\s.+?\b/g);
			if (aHeaders) {
				for (let sHeader of aHeaders) {
					sHeader = sHeader.replace(/@/g, "");
					let a = sHeader.split(" ");
					if (a) {
						KVHeaders[a[0]] = util.StringToAny(a[1]);
					}
				}
			}
		}
		for (const sKVName in KVFiles) {
			let sPath = KVFiles[sKVName];
			let sTotalPath = GameDir + '/scripts/' + sPath;
			fs.watchFile(sTotalPath, (curr, prev) => {
				if (curr.nlink === 0) {
					console.log('removed');
				} else {
					let kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase(sTotalPath.replace("\\", "/")));
					// 特殊处理
					if (KVHeaders.OverrideAbilities === true && sPath.search("npc_abilities_custom") !== -1) { // 技能合并
						let npc_abilities_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((this.context.extensionPath + '/resource/npc/npc_abilities.txt').replace("\\", "/")));
						let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((GameDir + '/scripts/npc/npc_abilities_override.txt').replace("\\", "/")));
						kv = util.OverrideKeyValue(util.OverrideKeyValue(npc_abilities_kv, npc_abilities_override_kv), kv);
					} else if (KVHeaders.OverrideUnits === true && sPath.search("npc_units_custom") !== -1) { // 单位合并
						let npc_units_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((this.context.extensionPath + '/resource/npc/npc_units.txt').replace("\\", "/")));
						kv = util.OverrideKeyValue(npc_units_kv, kv);
					} else if (KVHeaders.OverrideHeroes === true && sPath.search("npc_heroes_custom") !== -1) { // 英雄合并
						let npc_heroes_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((this.context.extensionPath + '/resource/npc/npc_heroes.txt').replace("\\", "/")));
						kv = util.OverrideKeyValue(npc_heroes_kv, kv);
					} else if (KVHeaders.OverrideItems === true && sPath.search("npc_items_custom") !== -1) { // 物品合并
						let items_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((this.context.extensionPath + '/resource/npc/items.txt').replace("\\", "/")));
						let npc_abilities_override_kv = util.GetKeyValueObjectByIndex(util.ReadKeyValueWithBase((GameDir + '/scripts/npc/npc_abilities_override.txt').replace("\\", "/")));
						kv = util.OverrideKeyValue(util.OverrideKeyValue(items_kv, npc_abilities_override_kv), kv);
					}
					let js = util.Obj2Str(kv);
					let fileData = "GameUI." + sKVName + " = " + js + ";";
					let jsPath = (ContentDir + "/panorama/scripts/kv/" + sKVName + ".js").replace("\\", "/");
					fs.writeFileSync(jsPath, fileData);
				}
			});

		}
	}
}