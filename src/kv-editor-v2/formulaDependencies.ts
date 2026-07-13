export function extractFormulaReferences(formula: string): string[] {
	const references: string[] = [];
	let index = 0;
	let quote = '';
	while (index < formula.length) {
		const char = formula[index];
		if (quote) {
			if (char === '\\') {index += 2;}
			else { if (char === quote) {quote = '';} index++; }
			continue;
		}
		if (char === '"' || char === "'") { quote = char; index++; continue; }
		const match = /^\$?[A-Z]{1,3}\$?[1-9][0-9]*/u.exec(formula.slice(index));
		const previous = formula[index - 1] ?? '';
		const next = match ? formula[index + match[0].length] ?? '' : '';
		if (match && !/[A-Za-z0-9_]/u.test(previous) && !/[A-Za-z0-9_]/u.test(next)) {
			references.push(match[0]); index += match[0].length; continue;
		}
		index++;
	}
	return references;
}

export function assertNoFormulaCycles(
	formulas: ReadonlyMap<string, string>,
	resolveReference: (reference: string) => string | undefined,
): void {
	const visiting = new Set<string>();
	const visited = new Set<string>();
	const visit = (address: string, path: string[]): void => {
		if (visiting.has(address)) {throw new Error(`公式存在循环引用：${[...path, address].join(' → ')}`);}
		if (visited.has(address)) {return;}
		visiting.add(address);
		const formula = formulas.get(address);
		if (formula) {
			for (const reference of extractFormulaReferences(formula)) {
				const dependency = resolveReference(reference);
				if (dependency && formulas.has(dependency)) {visit(dependency, [...path, address]);}
			}
		}
		visiting.delete(address);
		visited.add(address);
	};
	for (const address of formulas.keys()) {visit(address, []);}
}
