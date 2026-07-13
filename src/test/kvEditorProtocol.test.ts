import * as assert from 'assert';
import { isValidKvEditorV2Message } from '../kv-editor-v2/protocolValidation';

suite('KvEditor V2 protocol validation', () => {
	test('accepts complete command envelopes', () => {
		assert.strictEqual(isValidKvEditorV2Message({
			protocolVersion: 2,
			type: 'executeCommand',
			requestId: 'request-1',
			documentUri: 'file:///test.kv',
			baseVersion: 4,
			command: { type: 'editCell', rowId: 'row', columnKey: 'Damage', value: '10' },
		}), true);
	});

	test('rejects incomplete or unknown commands before routing', () => {
		assert.strictEqual(isValidKvEditorV2Message({ protocolVersion: 2, type: 'executeCommand', command: { type: 'editCell' } }), false);
		assert.strictEqual(isValidKvEditorV2Message({
			protocolVersion: 2, type: 'executeCommand', requestId: 'x',
			documentUri: 'file:///test.kv', baseVersion: 1, command: { type: 'runJavaScript' },
		}), false);
	});

	test('rejects malformed resource requests', () => {
		assert.strictEqual(isValidKvEditorV2Message({ protocolVersion: 2, type: 'requestResource', requestId: 'x', resource: 'filesystem' }), false);
	});
});
