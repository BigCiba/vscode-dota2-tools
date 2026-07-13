import * as assert from 'assert';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';

suite('Lossless KV row insertion', () => {
	test('inserts a complete row beside a stable anchor', () => {
		const source = '"Root"\r\n{\r\n\t// keep\r\n\t"row_a"\r\n\t{\r\n\t\t"Damage"\t"1"\r\n\t}\r\n}\r\n';
		const replacement = KvDocumentModel.parse(source).insertRow('row_a', 'after', 'new_entry', { Damage: '', Cooldown: '' });
		const result = apply(source, [replacement]);
		assert.ok(result.includes('// keep'));
		assert.ok(result.indexOf('"row_a"') < result.indexOf('"new_entry"'));
		assert.ok(result.includes('\t\t"Cooldown"\t""\r\n'));
	});
});

function apply(source: string, replacements: KvTextReplacement[]): string {
	return [...replacements].sort((left, right) => right.start - left.start)
		.reduce((text, replacement) => text.slice(0, replacement.start) + replacement.text + text.slice(replacement.end), source);
}
