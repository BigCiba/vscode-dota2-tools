import * as assert from 'assert';
import { kvEditorColumnDisplayName } from '../kv-editor-v2/displayNames';

function snapshot(localizedMode: boolean) {
	return {
		localizedMode,
		columnDescriptions: { AbilityCooldown: { label: '冷却时间' } },
	};
}

suite('KvEditor display names', () => {
	test('switches column titles with localized mode', () => {
		assert.strictEqual(kvEditorColumnDisplayName(snapshot(false), 'AbilityCooldown'), 'AbilityCooldown');
		assert.strictEqual(kvEditorColumnDisplayName(snapshot(true), 'AbilityCooldown'), '冷却时间');
	});

	test('falls back to the original key when no localized label exists', () => {
		assert.strictEqual(kvEditorColumnDisplayName(snapshot(true), 'ScriptFile'), 'ScriptFile');
	});
});