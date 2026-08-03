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

	test('composites every sticky row-number state over the opaque canvas', () => {
		assert.match(css, /\.row-number\s*\{[^}]*background:\s*var\(--kv-canvas\)/u);
		assert.match(css, /\.row-number:hover\s*\{[^}]*linear-gradient[^}]*var\(--kv-canvas\)/u);
		assert.match(css, /\.row-grid\.selected\s*>\s*\.row-number\s*\{[^}]*linear-gradient[^}]*var\(--kv-canvas\)/u);
		assert.match(css, /\.row-grid\.selected\s*>\s*\.row-number:hover\s*\{[^}]*linear-gradient[^}]*var\(--kv-canvas\)/u);
	});

	test('keeps range decorations clipped inside cells so frozen values cannot bleed into later columns', () => {
		assert.doesNotMatch(css, /\.cell\.range-handle\s*\{[^}]*overflow:\s*visible/u);
		assert.match(css, /\.fill-handle\s*\{[^}]*right:\s*1px[^}]*bottom:\s*1px/u);
	});

	test('does not let range selection reset a frozen cell from sticky positioning', () => {
		assert.doesNotMatch(css, /\.cell\.range-selected\s*\{[^}]*position:\s*relative/u);
		assert.match(css, /\.virtual-rows \.row-grid > \.frozen\.range-selected\s*\{[^}]*position:\s*sticky/u);
		assert.match(css, /\.frozen\.range-selected\.editing\s*\{[^}]*z-index:\s*var\(--kv-z-frozen-active\)/u);
	});

	test('anchors an inline editor to the cell that owns it', () => {
		assert.match(css, /\.cell-editor\s*\{[^}]*top:\s*1px[^}]*right:\s*1px[^}]*bottom:\s*1px[^}]*left:\s*1px/u);
		assert.match(css, /\.cell\.editing\s*\{[^}]*overflow:\s*hidden/u);
	});
});