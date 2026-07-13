import * as assert from 'assert';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';

suite('Lossless KV nested blocks', () => {
	const source = [
		'#base "base.txt"',
		'"Root"',
		'{',
		'\t"row_a"',
		'\t{',
		'\t\t"Damage"\t"100" // preserve this field',
		'\t\t"AbilityValues"',
		'\t\t{',
		'\t\t\t"damage"\t"10"',
		'\t\t}',
		'\t}',
		'}',
		'',
	].join('\r\n');

	test('replaces only the requested nested block', () => {
		const replacement = KvDocumentModel.parse(source).replaceObjectBlock(
			'row_a', 'AbilityValues', '\t\t"AbilityValues"\n\t\t{\n\t\t\t"damage"\t"20"\n\t\t}\n',
		);
		const result = apply(source, [replacement]);
		assert.ok(result.includes('#base "base.txt"'));
		assert.ok(result.includes('// preserve this field'));
		assert.ok(result.includes('"damage"\t"20"\r\n'));
		assert.ok(!result.includes('"damage"\t"10"'));
	});

	test('deletes a nested block without touching adjacent fields', () => {
		const result = apply(source, [KvDocumentModel.parse(source).replaceObjectBlock('row_a', 'AbilityValues', '')]);
		assert.ok(!result.includes('"AbilityValues"'));
		assert.ok(result.includes('"Damage"\t"100" // preserve this field'));
	});

	test('inserts serialized rows after a stable row anchor', () => {
		const serialized = '\t"row_b"\n\t{\n\t\t"Damage"\t"200"\n\t}\n';
		const result = apply(source, [KvDocumentModel.parse(source).insertRowsText('row_a', 'after', serialized)]);
		assert.ok(result.indexOf('"row_a"') < result.indexOf('"row_b"'));
		assert.ok(result.includes('"Damage"\t"200"\r\n'));
		assert.ok(result.includes('// preserve this field'));
	});
});

function apply(source: string, replacements: KvTextReplacement[]): string {
	return [...replacements].sort((left, right) => right.start - left.start)
		.reduce((text, replacement) => text.slice(0, replacement.start) + replacement.text + text.slice(replacement.end), source);
}
