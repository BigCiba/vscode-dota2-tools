import { evaluateSafeFormula, FormulaPrimitive, validateSafeFormula } from './formulaEngine';
import { extractFormulaReferences } from './formulaDependencies';

export interface FormulaGridRow { rowId: string; values: Record<string, string>; }
export interface FormulaDefinition { rowId: string; columnKey: string; formula: string; }
export interface FormulaValueEdit { rowId: string; columnKey: string; value: string; }
export interface FormulaRecalculationError { rowId: string; columnKey: string; message: string; }
export interface FormulaRecalculationResult { edits: FormulaValueEdit[]; errors: FormulaRecalculationError[]; }
export interface FormulaRecalculationInput {
	columns: string[];
	rows: FormulaGridRow[];
	cellFormulas: FormulaDefinition[];
	columnFormulas: Record<string, string>;
	baseEdits: FormulaValueEdit[];
	formulaChanges?: Array<Omit<FormulaDefinition, 'formula'> & { formula?: string }>;
}

/** Recalculates only formulas transitively affected by a set of committed cell edits. */
export function recalculateAffectedFormulas(input: FormulaRecalculationInput): FormulaRecalculationResult {
	const address = (rowId: string, columnKey: string) => `${rowId}::${columnKey}`;
	const editedAddresses = new Set(input.baseEdits.map((edit) => address(edit.rowId, edit.columnKey)));
	const values = new Map<string, string>();
	for (const row of input.rows) {
		values.set(address(row.rowId, 'id'), row.rowId);
		for (const columnKey of input.columns) {values.set(address(row.rowId, columnKey), row.values[columnKey] ?? '');}
	}
	for (const edit of input.baseEdits) {values.set(address(edit.rowId, edit.columnKey), edit.value);}

	const formulas = new Map<string, FormulaDefinition>();
	for (const definition of input.cellFormulas) {
		if (!editedAddresses.has(address(definition.rowId, definition.columnKey)) && validateSafeFormula(definition.formula).compatible) {
			formulas.set(address(definition.rowId, definition.columnKey), definition);
		}
	}
	for (const [columnKey, formula] of Object.entries(input.columnFormulas)) {
		if (!validateSafeFormula(formula).compatible) {continue;}
		for (const row of input.rows) {
			const target = address(row.rowId, columnKey);
			if (!editedAddresses.has(target) && !formulas.has(target)) {formulas.set(target, { rowId: row.rowId, columnKey, formula });}
		}
	}

	for (const change of input.formulaChanges ?? []) {
		const target = address(change.rowId, change.columnKey);
		if (change.formula && validateSafeFormula(change.formula).compatible) {formulas.set(target, { ...change, formula: change.formula });}
		else {formulas.delete(target);}
	}

	const resolveReference = (reference: string): string | undefined => {
		const match = /^\$?([A-Z]{1,3})\$?([1-9][0-9]*)$/u.exec(reference);
		if (!match) {return undefined;}
		let columnIndex = 0;
		for (const character of match[1]) {columnIndex = columnIndex * 26 + character.charCodeAt(0) - 64;}
		const row = input.rows[Number(match[2]) - 1];
		const columnKey = ['id', ...input.columns][columnIndex - 1];
		return row && columnKey ? address(row.rowId, columnKey) : undefined;
	};

	const dependents = new Map<string, Set<string>>();
	for (const [target, definition] of formulas) {
		for (const reference of extractFormulaReferences(definition.formula)) {
			const dependency = resolveReference(reference);
			if (!dependency) {continue;}
			const targets = dependents.get(dependency) ?? new Set<string>();
			targets.add(target);
			dependents.set(dependency, targets);
		}
		// Direct row identifiers can depend on any value in their own row.
		for (const columnKey of input.columns) {
			const dependency = address(definition.rowId, columnKey);
			const targets = dependents.get(dependency) ?? new Set<string>();
			targets.add(target);
			dependents.set(dependency, targets);
		}
	}

	const affected = new Set<string>();
	const changedFormulaTargets = (input.formulaChanges ?? []).filter((change) => Boolean(change.formula))
		.map((change) => address(change.rowId, change.columnKey));
	for (const target of changedFormulaTargets) {affected.add(target);}
	const pending = [...editedAddresses, ...changedFormulaTargets];
	while (pending.length) {
		const dependency = pending.shift()!;
		for (const target of dependents.get(dependency) ?? []) {
			if (affected.has(target)) {continue;}
			affected.add(target);
			pending.push(target);
		}
	}

	const evaluating = new Set<string>();
	const evaluated = new Set<string>();
	const evaluateTarget = (target: string): FormulaPrimitive => {
		if (evaluated.has(target)) {return values.get(target) ?? '';}
		if (evaluating.has(target)) {throw new Error(`公式存在循环引用：${target}`);}
		const definition = formulas.get(target);
		if (!definition) {return values.get(target) ?? '';}
		evaluating.add(target);
		const rowIndex = input.rows.findIndex((row) => row.rowId === definition.rowId);
		const row = input.rows[rowIndex];
		if (!row) {throw new Error(`公式目标行不存在：${definition.rowId}`);}
		const rowValues = Object.fromEntries(input.columns.map((columnKey) => [columnKey, values.get(address(row.rowId, columnKey)) ?? '']));
		const result = evaluateSafeFormula(definition.formula, {
			rowId: row.rowId,
			rowIndex,
			row: rowValues,
			resolveCell: (reference) => {
				const dependency = resolveReference(reference);
				if (!dependency) {throw new Error(`单元格引用无效：${reference}`);}
				return formulas.has(dependency) ? evaluateTarget(dependency) : values.get(dependency) ?? '';
			},
		});
		const serialized = result === null ? '' : String(result);
		values.set(target, serialized);
		evaluating.delete(target);
		evaluated.add(target);
		return serialized;
	};

	const results: FormulaValueEdit[] = [];
	const errors: FormulaRecalculationError[] = [];
	for (const target of affected) {
		const definition = formulas.get(target);
		if (!definition) {continue;}
		try {
			const value = String(evaluateTarget(target) ?? '');
			results.push({ rowId: definition.rowId, columnKey: definition.columnKey, value });
		} catch (error) {
			// Keep the last valid KV value. Formula errors are state, never document content.
			evaluating.clear();
			errors.push({
				rowId: definition.rowId,
				columnKey: definition.columnKey,
				message: error instanceof Error ? error.message : String(error),
			});
		}
	}
	return { edits: results, errors };
}
