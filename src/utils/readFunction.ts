/* eslint-disable @typescript-eslint/naming-convention */

export function readFunction(line: number, rows: any): any {
	let funInfo: { [k: string]: any; } = {};
	let paramList: { [k: string]: any; } = {};
	let endLine: number = 0;
	for (let index = line; index < rows.length; index++) {
		const text = rows[index];
		let option = rows[index].match(/---\[\[.*\]\]/g);
		if (option !== null && option.length > 0) {
			funInfo.description = text.substr(6, text.length - 9);
		} else if (text.search('-- @return') !== -1) {
			funInfo.return = text.substr(11, text.length);
			if (funInfo.return === '<unknown>') {
				funInfo.return = 'unknown';
			}
		} else if (text.search('-- @param') !== -1) {
			let arr = text.split(' ');
			paramList[arr[2]] = {
				type: arr[3],
				params_name: arr[2],
				description: 'No Description Set'
			};
		} else if (text.search('function') !== -1) {
			funInfo.function = text.split('(')[0].split('function ')[1];
			funInfo.description = funInfo.description.split(funInfo.function + '  ')[1];
			if (funInfo.function.search(':') === -1) {
				funInfo.class = 'Global';
			} else {
				funInfo.class = funInfo.function.split(':')[0];
				funInfo.function = funInfo.function.split(':')[1];
			}
			endLine = index;
			break;
		}
	}
	if (funInfo.class === "CDOTAGameRules") {
		funInfo.class = "CDOTAGamerules";
	}
	funInfo.params = paramList;
	funInfo.server = true;
	funInfo.client = false;
	return [funInfo, endLine];
}