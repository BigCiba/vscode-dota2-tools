import * as assert from 'assert';
import { rewriteFormulaRowReferences } from '../kv-editor-v2/formulaReferenceRewrite';

suite('Formula row reference rewriting', () => {
	test('keeps references attached to stable row ids after insertion and reorder', () => {
		assert.strictEqual(
			rewriteFormulaRowReferences('=B1 + $C$2', ['a', 'b'], ['new', 'b', 'a']),
			'=B3 + $C$2',
		);
	});

	test('marks references to deleted rows invalid instead of silently retargeting them', () => {
		assert.strictEqual(rewriteFormulaRowReferences('=B1 + C2', ['a', 'b'], ['b']), '=#REF! + C1');
	});

	test('does not rewrite cell-like text inside strings', () => {
		assert.strictEqual(rewriteFormulaRowReferences('=CONCAT("B1", B1)', ['a'], ['new', 'a']), '=CONCAT("B1", B2)');
	});
});
