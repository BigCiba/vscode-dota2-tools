import * as assert from 'assert';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';

suite('LosslessKvDocument', () => {
	const source = [
		'#base "base.txt"',
		'"Root"',
		'{',
		'\t// row comment',
		'\t"row_a"',
		'\t{',
		'\t\t"Damage"\t"100" // field comment',
		'\t}',
		'\t"row_b"',
		'\t{',
		'\t\t"Damage"\t"200"',
		'\t}',
		'}',
		'',
	].join('\r\n');

	test('inserts a missing scalar into the row without serializing the file', () => {
		const result = apply(source, [KvDocumentModel.parse(source).editScalar('row_a', 'Cooldown', '5')]);
		assert.ok(result.includes('\t\t"Cooldown"\t"5"\r\n\t}'));
		assert.ok(result.includes('// row comment'));
		assert.ok(result.includes('// field comment'));
	});

	test('deletes multiple rows as independent source ranges', () => {
		const result = apply(source, KvDocumentModel.parse(source).deleteRows(['row_a', 'row_b']));
		assert.ok(result.includes('#base "base.txt"'));
		assert.ok(!result.includes('"row_a"'));
		assert.ok(!result.includes('"row_b"'));
	});

	test('moves a row using stable ids and preserves its text', () => {
		const result = apply(source, KvDocumentModel.parse(source).moveRow('row_b', 'row_a', 'before'));
		assert.ok(result.indexOf('"row_b"') < result.indexOf('"row_a"'));
		assert.ok(result.includes('"Damage"\t"200"'));
	});
});

function apply(source: string, replacements: KvTextReplacement[]): string {
	return [...replacements].sort((left, right) => right.start - left.start)
		.reduce((text, replacement) => text.slice(0, replacement.start) + replacement.text + text.slice(replacement.end), source);
}
