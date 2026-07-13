import * as assert from 'assert';
import { extractFormulaReferences } from '../kv-editor-v2/formulaDependencies';
import { rewriteFormulaRowReferences } from '../kv-editor-v2/formulaReferenceRewrite';

suite('Formula reference boundaries', () => {
	test('does not treat cell-like suffixes inside identifiers as references', () => {
		assert.deepStrictEqual(extractFormulaReferences('=FOOB1 + B1 + item_C2'), ['B1']);
		assert.strictEqual(
			rewriteFormulaRowReferences('=FOOB1 + B1 + item_C2', ['a'], ['new', 'a']),
			'=FOOB1 + B2 + item_C2',
		);
	});
});
