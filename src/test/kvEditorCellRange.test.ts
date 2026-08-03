import * as assert from 'assert';
import { cellRangeVisual, cellsInFillRange, cellsInLinearRange, cellsInRange, matrixToTsv, parseTsv } from '../kv-editor-v2/cellRange';
import type { CellRangeSelection } from '../kv-editor-v2/cellRange';

const rows = ['row_a', 'row_b', 'row_c'];
const columns = ['id', 'A', 'B'];

suite('KvEditor cell ranges', () => {
	test('resolves a reverse drag into one stable rectangle', () => {
		const selection: CellRangeSelection = { anchor: { rowId: 'row_c', columnKey: 'B' }, focus: { rowId: 'row_a', columnKey: 'A' } };
		assert.deepStrictEqual(cellsInRange(selection, rows, columns), [
			{ rowId: 'row_a', columnKey: 'A' }, { rowId: 'row_a', columnKey: 'B' },
			{ rowId: 'row_b', columnKey: 'A' }, { rowId: 'row_b', columnKey: 'B' },
			{ rowId: 'row_c', columnKey: 'A' }, { rowId: 'row_c', columnKey: 'B' },
		]);
		const visual = cellRangeVisual(selection, { rowId: 'row_c', columnKey: 'B' }, rows, columns);
		assert.strictEqual(visual.anchor, true);
		assert.strictEqual(visual.handle, true);
	});

	test('keeps linear fill order attached to the drag anchor', () => {
		const selection: CellRangeSelection = { anchor: { rowId: 'row_c', columnKey: 'A' }, focus: { rowId: 'row_a', columnKey: 'A' } };
		assert.deepStrictEqual(cellsInLinearRange(selection, rows, columns).map((cell) => cell.rowId), ['row_c', 'row_b', 'row_a']);
		assert.deepStrictEqual(cellsInLinearRange({ anchor: { rowId: 'row_a', columnKey: 'A' }, focus: { rowId: 'row_b', columnKey: 'B' } }, rows, columns), []);
	});

	test('round trips rectangular clipboard text without losing empty cells', () => {
		const matrix = [['1', '', '3'], ['a', 'b', '']];
		assert.deepStrictEqual(parseTsv(matrixToTsv(matrix)), matrix);
	});

	test('fills a rectangle from the drag anchor in drag direction', () => {
		assert.deepStrictEqual(cellsInFillRange({
			anchor: { rowId: 'r2', columnKey: 'B' },
			focus: { rowId: 'r1', columnKey: 'A' },
		}, ['r1', 'r2'], ['A', 'B']), [
			{ rowId: 'r2', columnKey: 'B' },
			{ rowId: 'r2', columnKey: 'A' },
			{ rowId: 'r1', columnKey: 'B' },
			{ rowId: 'r1', columnKey: 'A' },
		]);
	});
});