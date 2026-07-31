import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const css = fs.readFileSync(path.resolve(__dirname, '../../webview-src/kv-editor/styles.css'), 'utf8');

function zIndex(name: string): number {
	const match = css.match(new RegExp(`--${name}:\\s*(\\d+)`, 'u'));
	assert.ok(match, `missing --${name}`);
	return Number(match[1]);
}

suite('KvEditor frozen layer contract', () => {
	test('keeps active scrolling cells below every frozen layer', () => {
		assert.ok(zIndex('kv-z-cell-active') < zIndex('kv-z-frozen-cell'));
		assert.ok(zIndex('kv-z-cell-editing') < zIndex('kv-z-frozen-cell'));
		assert.ok(zIndex('kv-z-frozen-cell') < zIndex('kv-z-row-number'));
		assert.ok(zIndex('kv-z-row-number') < zIndex('kv-z-grid-header'));
		assert.ok(zIndex('kv-z-grid-header') < zIndex('kv-z-frozen-header'));
	});

	test('keeps popovers and modals above the complete table stack', () => {
		assert.ok(zIndex('kv-z-frozen-header') < zIndex('kv-z-modal'));
		assert.ok(zIndex('kv-z-modal') < zIndex('kv-z-popover'));
	});

	test('composites translucent row selection over an opaque editor canvas', () => {
		assert.match(css, /\.cell\s*\{[^}]*linear-gradient\(var\(--row-cell-overlay\)[^}]*var\(--kv-canvas\)/u);
		assert.match(css, /\.virtual-rows \.frozen\s*\{[^}]*linear-gradient\(var\(--row-cell-overlay\)[^}]*var\(--kv-canvas\)/u);
		assert.match(css, /\.row-grid:not\(\.selected\) \.cell:hover\s*\{[^}]*linear-gradient[^}]*var\(--kv-canvas\)/u);
		assert.match(css, /\.header-cell\.selected\s*\{[^}]*linear-gradient[^}]*var\(--kv-surface-3\)/u);
	});
});