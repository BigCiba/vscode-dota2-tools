import type { KvEditorV2TextureIcon } from '../../src/types/kvEditorV2Shared';

const textureSearchCache = new WeakMap<KvEditorV2TextureIcon, string>();

export function searchTerms(value: string): string[] {
	return value.trim().toLocaleLowerCase().replace(/[_/\\]+/gu, ' ').split(/\s+/u).filter(Boolean);
}

export function textureSearchText(icon: KvEditorV2TextureIcon): string {
	const cached = textureSearchCache.get(icon);
	if (cached !== undefined) {
		return cached;
	}
	const value = `${icon.searchKey} ${icon.label} ${icon.textureName} ${icon.relativePath} ${icon.hero ?? ''}`
		.toLocaleLowerCase()
		.replace(/[_/\\]+/gu, ' ');
	textureSearchCache.set(icon, value);
	return value;
}

export function splitOptionValues(value: string, separator: string): string[] {
	return value ? value.split(separator || '|').map((part) => part.trim()).filter(Boolean) : [];
}

export function validOptionColor(value?: string): string {
	return value && /^#[0-9a-f]{6}$/iu.test(value) ? value : '#808080';
}

export function heroAttributeLabel(value: string): string {
	return value.replace(/^dota_attribute_/iu, '').replace(/_/gu, ' ');
}

export function textureSourceLabel(source: KvEditorV2TextureIcon['source']): string {
	return source === 'addon' ? '项目' : '内置';
}

export function handleDialogKey(event: KeyboardEvent, onCancel: () => void): void {
	if (event.key === 'Escape') {
		event.preventDefault();
		onCancel();
		return;
	}
	if (event.key !== 'Tab') {
		return;
	}
	const dialog = (event.currentTarget as HTMLElement).querySelector<HTMLElement>('[role="dialog"]');
	const focusable = [...(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
	if (!focusable.length) {
		return;
	}
	const first = focusable[0];
	const last = focusable[focusable.length - 1];
	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
}
