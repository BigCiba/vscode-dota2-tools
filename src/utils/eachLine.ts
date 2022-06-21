import * as os from 'os';
export function eachLine(data: string | string[], callback: (index: number, line: string) => void | boolean | number, start: number = 0) {
	const rows = Array.isArray(data) ? data : data.split(os.EOL);
	for (let i = 0; i < rows.length; i++) {
		let result = callback(i, rows[i]);
		if (result === true) {
			break;
		} else if (typeof (result) === "number") {
			i = result;
		}
	}
}