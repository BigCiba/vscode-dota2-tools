import { isNativeTextShortcut } from '../../src/kv-editor-v2/inputShortcuts';
export { isNativeTextShortcut } from '../../src/kv-editor-v2/inputShortcuts';

export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;

export function isTextInputElement(target: EventTarget | null): target is TextInputElement {
	return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
}

export function installTextInputShortcutGuard(owner: Document): () => void {
	const protectKey = (event: KeyboardEvent) => {
		if (isTextInputElement(event.target) && isNativeTextShortcut(event)) {
			// Keep Chromium's native edit/clipboard behavior, but do not let the
			// command escape the Webview and become a VS Code/table shortcut.
			event.stopPropagation();
		}
	};
	const protectClipboard = (event: ClipboardEvent) => {
		if (isTextInputElement(event.target)) {
			event.stopPropagation();
		}
	};
	owner.addEventListener('keydown', protectKey);
	owner.addEventListener('copy', protectClipboard);
	owner.addEventListener('cut', protectClipboard);
	owner.addEventListener('paste', protectClipboard);
	return () => {
		owner.removeEventListener('keydown', protectKey);
		owner.removeEventListener('copy', protectClipboard);
		owner.removeEventListener('cut', protectClipboard);
		owner.removeEventListener('paste', protectClipboard);
	};
}