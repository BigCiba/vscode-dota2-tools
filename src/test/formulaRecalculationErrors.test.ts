import * as assert from 'assert';
import { recalculateAffectedFormulas } from '../kv-editor-v2/formulaRecalculation';

suite('Formula recalculation errors', () => {
	test('reports an error and omits the invalid computed edit', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Divisor', 'Result'],
			rows: [{ rowId: 'row_a', values: { Divisor: '2', Result: '5' } }],
			cellFormulas: [{ rowId: 'row_a', columnKey: 'Result', formula: '=10 / NUMBER(B1)' }],
			columnFormulas: {},
			baseEdits: [{ rowId: 'row_a', columnKey: 'Divisor', value: '0' }],
		});
		assert.deepStrictEqual(result.edits, []);
		assert.strictEqual(result.errors.length, 1);
		assert.strictEqual(result.errors[0].rowId, 'row_a');
		assert.strictEqual(result.errors[0].columnKey, 'Result');
		assert.match(result.errors[0].message, /除以零/u);
	});
});
