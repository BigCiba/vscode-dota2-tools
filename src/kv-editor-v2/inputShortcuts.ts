export interface KeyboardShortcutLike {
	key: string;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
	altKey: boolean;
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