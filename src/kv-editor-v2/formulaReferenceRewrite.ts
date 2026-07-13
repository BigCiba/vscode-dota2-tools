/** Rewrites A1 row numbers by stable row identity while leaving string literals untouched. */
export function rewriteFormulaRowReferences(formula: string, previousRowIds: string[], nextRowIds: string[]): string {
	const nextIndexById = new Map(nextRowIds.map((rowId, index) => [rowId, index]));
	let result = '';
	let index = 0;
	let quote = '';
	while (index < formula.length) {
		const character = formula[index];
		if (quote) {
			result += character;
			if (character === '\\' && index + 1 < formula.length) {
				result += formula[index + 1];
				index += 2;
				continue;
			}
			if (character === quote) {quote = '';}
			index++;
			continue;
		}
		if (character === '"' || character === "'") {
			quote = character;
			result += character;
			index++;
			continue;
		}
		const match = /^(\$?[A-Z]{1,3})(\$?)([1-9][0-9]*)/u.exec(formula.slice(index));
		const previous = formula[index - 1] ?? '';
		const next = match ? formula[index + match[0].length] ?? '' : '';
		if (!match || /[A-Za-z0-9_]/u.test(previous) || /[A-Za-z0-9_]/u.test(next)) {
			result += character;
			index++;
			continue;
		}
		const previousRowId = previousRowIds[Number(match[3]) - 1];
		const nextIndex = previousRowId === undefined ? undefined : nextIndexById.get(previousRowId);
		result += nextIndex === undefined ? '#REF!' : `${match[1]}${match[2]}${nextIndex + 1}`;
		index += match[0].length;
	}
	return result;
}
