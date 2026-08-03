export interface KeyboardShortcutLike {
	key: string;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
	altKey: boolean;
}

export type RowSelectionShortcut = 'copy' | 'paste' | 'insert' | 'delete';

export function resolveRowSelectionShortcut(event: KeyboardShortcutLike): RowSelectionShortcut | undefined {
	const key = event.key.toLocaleLowerCase();
	if (event.altKey) {return undefined;}
	const command = event.ctrlKey || event.metaKey;
	if (command && !event.shiftKey) {
		if (key === 'c' || key === 'insert') {return 'copy';}
		if (key === 'v') {return 'paste';}
	}
	if (!event.ctrlKey && !event.metaKey) {
		if (event.shiftKey && key === 'insert') {return 'paste';}
		if (!event.shiftKey && key === 'insert') {return 'insert';}
		if (!event.shiftKey && key === 'delete') {return 'delete';}
	}
	return undefined;
}

export function isNativeTextShortcut(event: KeyboardShortcutLike): boolean {
	const key = event.key.toLocaleLowerCase();
	if ((event.ctrlKey || event.metaKey) && !event.altKey) {
		return ['a', 'c', 'x', 'v', 'z', 'y', 'insert', 'arrowleft', 'arrowright', 'home', 'end', 'backspace', 'delete'].includes(key);
	}
	return !event.ctrlKey && !event.metaKey && !event.altKey && (
		key === 'home'
		|| key === 'end'
		|| (event.shiftKey && (key === 'insert' || key === 'delete'))
	);
}
