import * as assert from 'assert';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';

suite('Lossless KV column operations', () => {
	const source = '"Root"\n{\n\t"row"\n\t{\n\t\t"A"\t"1" // A\n\t\t"B"\t"2"\n\t}\n}\n';

	test('inserts relative to an anchor field', () => {
		const model = KvDocumentModel.parse(source);
		const result = apply(source, [model.insertScalarRelative('row', 'C', '', 'A', 'after')]);
		assert.ok(result.indexOf('"A"') < result.indexOf('"C"'));
		assert.ok(result.indexOf('"C"') < result.indexOf('"B"'));
		assert.ok(result.includes('// A'));
	});

	test('deletes one field line without touching neighbors', () => {
		const replacement = KvDocumentModel.parse(source).deleteScalar('row', 'A');
		assert.ok(replacement);
		const result = apply(source, [replacement!]);
		assert.ok(!result.includes('"A"'));
		assert.ok(result.includes('"B"\t"2"'));
	});

	test('moves a field relative to another field', () => {
		const result = apply(source, KvDocumentModel.parse(source).moveScalar('row', 'B', 'A', 'before'));
		assert.ok(result.indexOf('"B"') < result.indexOf('"A"'));
		assert.ok(result.includes('// A'));
	});
});

function apply(source: string, replacements: KvTextReplacement[]): string {
	return [...replacements].sort((left, right) => right.start - left.start)
		.reduce((text, replacement) => text.slice(0, replacement.start) + replacement.text + text.slice(replacement.end), source);
}
