import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const read = (relativePath: string) => fs.readFileSync(path.resolve(__dirname, `../../${relativePath}`), 'utf8');

suite('KvEditor dialog layout contract', () => {
	test('keeps every shared modal on a header/body/footer grid', () => {
		const shell = read('webview-src/kv-editor/components/ModalShell.tsx');
		assert.strictEqual(shell.match(/class="modal-body"/gu)?.length, 2);
		const css = read('webview-src/kv-editor/styles.css');
		assert.match(css, /\.modal > \.modal-body\s*\{[^}]*min-height:\s*0;[^}]*overflow:\s*hidden;/u);
		assert.match(css, /\.texture-dialog > \.modal-body\s*\{[^}]*grid-template-rows:\s*auto minmax\(190px, 1fr\)/u);
		assert.match(css, /\.ability-dialog > \.modal-body\s*\{[^}]*grid-template-rows:\s*auto auto minmax\(220px, 1fr\)/u);
	});

	test('does not stretch footer icons or the empty cell option', () => {
		const css = read('webview-src/kv-editor/styles.css');
		assert.doesNotMatch(css, /\.modal footer span\s*\{\s*flex:\s*1/u);
		assert.match(css, /\.modal footer > span\s*\{\s*flex:\s*1/u);
		assert.match(css, /\.cell-option-item\.empty-option\s*\{[^}]*height:\s*32px/u);
	});

	test('keeps localization mappings structured and closes hero filtering externally', () => {
		const editor = read('webview-src/kv-editor/components/EditorDialog.tsx');
		const types = read('webview-src/kv-editor/types.ts');
		const texture = read('webview-src/kv-editor/components/TextureDialog.tsx');
		assert.ok(editor.includes('class="localization-mapping-row"'));
		assert.ok(!types.includes('mappingsText'));
		assert.ok(texture.includes("document.addEventListener('pointerdown', closeHeroFilter)"));
		assert.ok(texture.includes("document.removeEventListener('pointerdown', closeHeroFilter)"));
	});
});