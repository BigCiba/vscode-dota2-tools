export function Float(f: number | string) {
	return Math.round(Number(f) * 10000) / 10000;
}