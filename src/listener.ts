import * as util from './util';
import * as watch from 'watch';

export function CreateListener() {
	// WatchKeyValue();
	// WatchLocalization();
}
// 监听CSV配置变更
// async function WatchKeyValue() {
// 	let root_path:string|undefined = util.GetRootPath();
// 	if (root_path === undefined) {
// 		return;
// 	}
// 	watch.watchTree(root_path + '/design/4_kv配置表', function (f, curr, prev) {
// 		if (typeof f === "object" && prev === null && curr === null) {
// 			// Finished walking the tree
// 		} else if (prev === null) {
// 			let info: util.FileInfo = util.GetFileInfo(root_path, String(f));
// 			if (String(f).search('4_kv配置表') !== -1) {
// 				util.CSV2KV(String(f), info.name);
// 			}

// 			console.log(info.full_name + ' is a new file');
// 		} else if (curr.nlink === 0) {
// 			let info: util.FileInfo = util.GetFileInfo(root_path, String(f));

// 			console.log(info.full_name + ' was removed');
// 		} else {
// 			let info: util.FileInfo = util.GetFileInfo(root_path, String(f));
// 			console.log(info);
// 			if (String(f).search('4_kv配置表') !== -1) {
// 				util.CSV2KV(String(f), info.name);
// 			}
// 			console.log(info.full_name + ' was changed');

// 		}
// 	});
// }
// 监听文本
// function WatchLocalization() {
// 	let root_path:string|undefined = util.GetRootPath();
// 	if (root_path === undefined) {
// 		return;
// 	}
// 	watch.watchTree(root_path + '/game/dota_addons/guarding_athena/localization', function (f, curr, prev) {
// 		if (typeof f === "object" && prev === null && curr === null) {
// 			// Finished walking the tree
// 		} else if (prev === null) {
// 			console.log(f + ' is a new file');
// 			util.CombineLocalization(String(f));
// 		} else if (curr.nlink === 0) {
// 			console.log(f + ' was removed');
// 			util.CombineLocalization(String(f));
// 		} else {
// 			console.log(f + ' was changed');
// 			util.CombineLocalization(String(f));
// 		}
// 	});
// }