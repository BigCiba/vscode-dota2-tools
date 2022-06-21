export function isNumber(s: string): boolean {
	let reg = /^(-?\d+)(\.\d+)?$/;
	if (reg.test(s)) {
		return true;
	}
	return false;
}