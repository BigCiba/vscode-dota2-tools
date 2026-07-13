import * as assert from 'assert';
import { evaluateSafeFormula, validateSafeFormula } from '../kv-editor-v2/formulaEngine';

suite('Safe formula absolute references', () => {
	test('accepts mixed absolute and relative A1 references', () => {
		for (const formula of ['$A$1 + A$2 + $B3', 'IF($A1 > 0, B$2, 0)']) {
			assert.strictEqual(validateSafeFormula(formula).compatible, true);
		}
	});

	test('passes absolute markers to the resolver without evaluating JavaScript', () => {
		const seen: string[] = [];
		const result = evaluateSafeFormula('$A$1 + B$2', {
			rowId: 'row',
			rowIndex: 0,
			row: {},
			resolveCell: (reference) => { seen.push(reference); return reference.startsWith('$A') ? 2 : 3; },
		});
		assert.strictEqual(result, 5);
		assert.deepStrictEqual(seen, ['$A$1', 'B$2']);
	});
});
