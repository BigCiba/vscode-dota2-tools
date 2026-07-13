import * as assert from 'assert';
import { KvDocumentModel, KvTextReplacement } from '../kv-editor-v2/losslessKvDocument';

suite('Lossless KV nested field deletion', () => {
	const source = [
		'"Root"', '{', '\t"unit_a"', '\t{', '\t\t"Creature"', '\t\t{',
		'\t\t\t"DisableClumpingBehavior"\t"1"',
		'\t\t\t"AttachWearables"', '\t\t\t{', '\t\t\t\t"1"', '\t\t\t\t{',
		'\t\t\t\t\t"ItemDef"\t"123"', '\t\t\t\t}', '\t\t\t}',
		'\t\t\t"UsesGestureBasedAttackAnimation"\t"1"',
		'\t\t}', '\t}', '}', '',
	].join('\r\n');

	test('deletes a scalar directly inside Creature', () => {
		const replacement = KvDocumentModel.parse(source).deleteNestedField('unit_a', 'Creature', 'DisableClumpingBehavior');
		assert.ok(replacement);
		const result = apply(source, [replacement!]);
		assert.ok(!result.includes('"DisableClumpingBehavior"'));
		assert.ok(result.includes('"AttachWearables"'));
		assert.ok(result.includes('"UsesGestureBasedAttackAnimation"'));
	});

	test('deletes a complete nested object directly inside Creature', () => {
		const replacement = KvDocumentModel.parse(source).deleteNestedField('unit_a', 'Creature', 'AttachWearables');
		assert.ok(replacement);
		const result = apply(source, [replacement!]);
		assert.ok(!result.includes('"AttachWearables"'));
		assert.ok(!result.includes('"ItemDef"'));
		assert.ok(result.includes('"UsesGestureBasedAttackAnimation"'));
	});
});

function apply(source: string, replacements: KvTextReplacement[]): string {
	return [...replacements].sort((left, right) => right.start - left.start)
		.reduce((text, replacement) => text.slice(0, replacement.start) + replacement.text + text.slice(replacement.end), source);
}
