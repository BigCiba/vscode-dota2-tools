import * as assert from 'assert';
import { recalculateAffectedFormulas } from '../kv-editor-v2/formulaRecalculation';

suite('Formula change recalculation', () => {
	test('evaluates a newly assigned formula and its downstream formula', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Base', 'Derived', 'Total'],
			rows: [{ rowId: 'row_a', values: { Base: '4', Derived: '0', Total: '1' } }],
			cellFormulas: [{ rowId: 'row_a', columnKey: 'Total', formula: '=NUMBER(C1) + 1' }],
			columnFormulas: {},
			baseEdits: [],
			formulaChanges: [{ rowId: 'row_a', columnKey: 'Derived', formula: '=B1 * 3' }],
		}).edits;
		assert.deepStrictEqual(result, [
			{ rowId: 'row_a', columnKey: 'Derived', value: '12' },
			{ rowId: 'row_a', columnKey: 'Total', value: '13' },
		]);
	});

	test('uses an explicit cell formula instead of a column formula', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Base', 'Result'],
			rows: [{ rowId: 'row_a', values: { Base: '2', Result: '0' } }],
			cellFormulas: [{ rowId: 'row_a', columnKey: 'Result', formula: '=B1 * 10' }],
			columnFormulas: { Result: '=B1 + 1' },
			baseEdits: [{ rowId: 'row_a', columnKey: 'Base', value: '5' }],
		}).edits;
		assert.deepStrictEqual(result, [{ rowId: 'row_a', columnKey: 'Result', value: '50' }]);
	});
});
