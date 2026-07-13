import * as assert from 'assert';
import { recalculateAffectedFormulas } from '../kv-editor-v2/formulaRecalculation';

suite('Formula recalculation', () => {
	test('recalculates transitive dependencies from the edited value overlay', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Base', 'Double', 'Total'],
			rows: [
				{ rowId: 'row_a', values: { Base: '2', Double: '4', Total: '5' } },
				{ rowId: 'row_b', values: { Base: '3', Double: '', Total: '' } },
			],
			cellFormulas: [
				{ rowId: 'row_a', columnKey: 'Double', formula: '=B1 * 2' },
				{ rowId: 'row_a', columnKey: 'Total', formula: '=NUMBER(C1) + 1' },
			],
			columnFormulas: {},
			baseEdits: [{ rowId: 'row_a', columnKey: 'Base', value: '10' }],
		}).edits;
		assert.deepStrictEqual(result, [
			{ rowId: 'row_a', columnKey: 'Double', value: '20' },
			{ rowId: 'row_a', columnKey: 'Total', value: '21' },
		]);
	});

	test('does not overwrite a formula cell explicitly edited by the user', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Base', 'Double'],
			rows: [{ rowId: 'row_a', values: { Base: '2', Double: '4' } }],
			cellFormulas: [{ rowId: 'row_a', columnKey: 'Double', formula: '=B1 * 2' }],
			columnFormulas: {},
			baseEdits: [{ rowId: 'row_a', columnKey: 'Double', value: 'manual' }],
		}).edits;
		assert.deepStrictEqual(result, []);
	});

	test('recalculates a column formula when another value in its row changes', () => {
		const result = recalculateAffectedFormulas({
			columns: ['Base', 'Result'],
			rows: [{ rowId: 'row_a', values: { Base: '2', Result: '3' } }],
			cellFormulas: [],
			columnFormulas: { Result: '=NUMBER(Base) + 1' },
			baseEdits: [{ rowId: 'row_a', columnKey: 'Base', value: '8' }],
		}).edits;
		assert.deepStrictEqual(result, [{ rowId: 'row_a', columnKey: 'Result', value: '9' }]);
	});
});
