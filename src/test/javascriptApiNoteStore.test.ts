import * as assert from 'assert';
import { createJavaScriptApiNoteId } from '../Class/JavaScriptApiNoteStore';

suite('JavaScript API documentation storage', () => {
	test('creates stable and collision-resistant source ids from the full identity', () => {
		const first = createJavaScriptApiNoteId('GameEvents', 'Subscribe', 'function');
		assert.strictEqual(first, createJavaScriptApiNoteId('GameEvents', 'Subscribe', 'function'));
		assert.notStrictEqual(first, createJavaScriptApiNoteId('GameEvents', 'Subscribe', 'enum'));
		assert.notStrictEqual(first, createJavaScriptApiNoteId('OtherGroup', 'Subscribe', 'function'));
		assert.match(first, /^[a-f0-9]{64}$/);
	});
});
