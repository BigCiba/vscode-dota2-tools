import * as assert from 'assert';
import { isValidKvEditorV2Message } from '../kv-editor-v2/protocolValidation';

suite('KvEditor V2 command validation', () => {
	const envelope = (command: unknown) => ({
		protocolVersion: 2,
		type: 'executeCommand',
		requestId: 'request-1',
		documentUri: 'file:///test.kv',
		baseVersion: 1,
		command,
	});

	test('accepts saveColumnOptions with a complete payload', () => {
		assert.strictEqual(isValidKvEditorV2Message(envelope({
			type: 'saveColumnOptions', columnKey: 'AbilityType', multiple: false,
			separator: ' | ', scope: 'file', options: [{ value: 'x', label: 'X' }],
		})), true);
	});

	test('rejects malformed edits even when the command discriminator is known', () => {
		assert.strictEqual(isValidKvEditorV2Message(envelope({ type: 'editCell', rowId: 'row_a', columnKey: 'Damage' })), false);
		assert.strictEqual(isValidKvEditorV2Message(envelope({ type: 'deleteRows', rowIds: [1, 2] })), false);
	});

	test('validates nested AbilityValues modifiers', () => {
		assert.strictEqual(isValidKvEditorV2Message(envelope({
			type: 'editAbilityValues', rowId: 'row_a',
			entries: [{ key: 'damage', value: '10', type: 'object', modifiers: [{ key: 'bad' }] }],
		})), false);
	});
});
