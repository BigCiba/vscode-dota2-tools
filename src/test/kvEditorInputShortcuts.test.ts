import * as assert from 'assert';
import { isNativeTextShortcut, resolveRowSelectionShortcut, type KeyboardShortcutLike } from '../kv-editor-v2/inputShortcuts';

function shortcut(key: string, patch: Partial<KeyboardShortcutLike> = {}): KeyboardShortcutLike {
	return { key, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...patch };
}

suite('KvEditor text input shortcuts', () => {
	test('keeps clipboard, selection, undo and redo commands inside text inputs', () => {
		for (const key of ['a', 'c', 'x', 'v', 'z', 'y']) {
			assert.strictEqual(isNativeTextShortcut(shortcut(key, { ctrlKey: true })), true, key);
		}
		assert.strictEqual(isNativeTextShortcut(shortcut('z', { metaKey: true, shiftKey: true })), true);
	});

	test('recognizes caret and word deletion shortcuts', () => {
		for (const key of ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace', 'Delete']) {
			assert.strictEqual(isNativeTextShortcut(shortcut(key, { ctrlKey: true })), true, key);
		}
		assert.strictEqual(isNativeTextShortcut(shortcut('Home', { shiftKey: true })), true);
		assert.strictEqual(isNativeTextShortcut(shortcut('Insert', { shiftKey: true })), true);
	});

	test('does not consume table or host commands unrelated to text editing', () => {
		assert.strictEqual(isNativeTextShortcut(shortcut('ArrowDown')), false);
		assert.strictEqual(isNativeTextShortcut(shortcut('p', { ctrlKey: true })), false);
		assert.strictEqual(isNativeTextShortcut(shortcut('ArrowLeft', { altKey: true })), false);
	});
});

suite('KvEditor row selection shortcuts', () => {
	test('maps the standard row copy, paste, insert and delete keys', () => {
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('c', { ctrlKey: true })), 'copy');
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('v', { metaKey: true })), 'paste');
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('Insert')), 'insert');
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('Delete')), 'delete');
	});

	test('supports Windows alternate clipboard keys without stealing modified commands', () => {
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('Insert', { ctrlKey: true })), 'copy');
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('Insert', { shiftKey: true })), 'paste');
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('Delete', { shiftKey: true })), undefined);
		assert.strictEqual(resolveRowSelectionShortcut(shortcut('c', { ctrlKey: true, altKey: true })), undefined);
	});
});
