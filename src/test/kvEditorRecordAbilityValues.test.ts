import * as assert from 'assert';
import { isValidKvEditorV2Command } from '../kv-editor-v2/commandValidation';
import { KvDocumentModel } from '../kv-editor-v2/losslessKvDocument';

suite('KvEditor record AbilityValues', () => {
	test('validates inline AbilityValues payloads', () => {
		assert.strictEqual(isValidKvEditorV2Command({ type: 'editRecord', rowId: 'ability', newRowId: 'ability', edits: [], abilityValues: [{ key: 'damage', value: '10', type: 'scalar', modifiers: [] }] }), true);
		assert.strictEqual(isValidKvEditorV2Command({ type: 'editRecord', rowId: 'ability', newRowId: 'ability', edits: [], abilityValues: [{ key: 'damage' }] }), false);
	});

	test('updates the nested block inside one record replacement', () => {
		const source = '"Root"\n{\n\t"ability"\n\t{\n\t\t"Damage" "10"\n\t\t"AbilityValues"\n\t\t{\n\t\t\t"old" "1"\n\t\t}\n\t}\n}\n';
		const replacement = KvDocumentModel.parse(source).editRecord('ability', 'ability', [], ['Damage', 'AbilityValues'], [{
			columnKey: 'AbilityValues', text: '\t\t"AbilityValues"\n\t\t{\n\t\t\t"new" "2"\n\t\t}\n',
		}]);
		const result = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
		assert.ok(result.includes('"Damage" "10"'));
		assert.ok(result.includes('"new" "2"'));
		assert.ok(!result.includes('"old" "1"'));
	});
});
