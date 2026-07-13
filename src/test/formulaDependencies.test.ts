import * as assert from 'assert';
import { assertNoFormulaCycles, extractFormulaReferences } from '../kv-editor-v2/formulaDependencies';

suite('Formula dependencies', () => {
	test('ignores cell-like text inside string literals', () => {
		assert.deepStrictEqual(extractFormulaReferences('CONCAT("A1", $B$2, C3)'), ['$B$2', 'C3']);
	});

	test('detects direct and transitive cycles', () => {
		const formulas = new Map([
			['row1::A', 'B1'],
			['row1::B', 'C1'],
			['row1::C', 'A1'],
		]);
		const columns = new Map([['A1', 'row1::A'], ['B1', 'row1::B'], ['C1', 'row1::C']]);
		assert.throws(() => assertNoFormulaCycles(formulas, (reference) => columns.get(reference)), /循环引用/u);
	});

	test('accepts acyclic dependency chains', () => {
		const formulas = new Map([['row1::A', 'B1'], ['row1::B', '1']]);
		assert.doesNotThrow(() => assertNoFormulaCycles(formulas, (reference) => reference === 'B1' ? 'row1::B' : undefined));
	});
});
