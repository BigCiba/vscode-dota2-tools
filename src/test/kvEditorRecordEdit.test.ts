import * as assert from 'assert';
import { isValidKvEditorV2Command } from '../kv-editor-v2/commandValidation';
import { KvDocumentModel } from '../kv-editor-v2/losslessKvDocument';

suite('KvEditor V2 record editing', () => {
	test('validates record edit payloads', () => {
		assert.strictEqual(isValidKvEditorV2Command({
			type: 'editRecord', rowId: 'ability_old', newRowId: 'ability_new',
			edits: [{ columnKey: 'Cooldown', value: '8' }],
		}), true);
		assert.strictEqual(isValidKvEditorV2Command({ type: 'editRecord', rowId: 'ability_old', newRowId: 'ability_new', edits: [{ columnKey: 'Cooldown' }] }), false);
	});

	test('renames and edits one record with one lossless replacement', () => {
		const source = '"Root"\n{\n\t// keep this comment\n\t"ability_old"\n\t{\n\t\t"Damage"\t"10" // keep trivia\n\t\t"ManaCost"\t"50"\n\t}\n}\n';
		const replacement = KvDocumentModel.parse(source).editRecord('ability_old', 'ability_new', [
			{ columnKey: 'Damage', value: '25' },
			{ columnKey: 'Cooldown', value: '8' },
		], ['Damage', 'Cooldown', 'ManaCost']);
		const result = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
		assert.ok(result.includes('// keep this comment'));
		assert.ok(result.includes('"ability_new"'));
		assert.ok(result.includes('"Damage"\t"25" // keep trivia'));
		assert.ok(result.indexOf('"Damage"') < result.indexOf('"Cooldown"'));
		assert.ok(result.indexOf('"Cooldown"') < result.indexOf('"ManaCost"'));
	});
});
