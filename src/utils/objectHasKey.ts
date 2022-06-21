export function objectHasKey(obj: Table, _key: string): boolean {
	let bHas = false;
	for (const key in obj) {
		const value = obj[key];
		if (key == _key) {
			return true;
		} else if (typeof value == "object") {
			bHas = objectHasKey(value, _key);
			if (bHas) {
				return true;
			}
		}
	}
	return bHas;
}