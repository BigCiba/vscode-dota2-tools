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
		const picker = read('webview-src/kv-editor/components/OptionPicker.tsx');
		const recordPicker = read('webview-src/kv-editor/components/RecordOptionControl.tsx');
		assert.ok(!picker.includes('option-swatch empty'));
		assert.ok(!recordPicker.includes('option-swatch empty'));
		assert.ok(recordPicker.includes('<Portal>'));
		assert.match(css, /\.record-option-popover\s*\{[^}]*position:\s*fixed/u);
		assert.doesNotMatch(css, /\.modal footer span\s*\{\s*flex:\s*1/u);
		assert.match(css, /\.modal footer > span\s*\{\s*flex:\s*1/u);
		assert.match(css, /\.cell-option-item\.empty-option\s*\{[^}]*height:\s*42px;[^}]*max-height:\s*42px;[^}]*margin-bottom:\s*3px/u);
		assert.ok(recordPicker.includes('aria-label="搜索选项"'));
		assert.ok(recordPicker.includes('onKeyDown={closeFromKeyboard}'));
		assert.ok(recordPicker.includes("popover?.contains(event.target as Node)"));
		assert.ok(recordPicker.includes('class="record-option-chip"'));
		assert.match(css, /\.option-value\s*\{[^}]*display:\s*inline-flex;[^}]*gap:\s*5px\s*!important/u);
		assert.match(css, /\.cell-option-picker > header \.icon-button\s*\{[^}]*margin-left:\s*auto/u);
	});

	test('makes record texture previews open the texture library', () => {
		const recordEditor = read('webview-src/kv-editor/components/RecordEditor.tsx');
		const css = read('webview-src/kv-editor/styles.css');
		assert.ok(recordEditor.includes('class="record-texture-preview-button"'));
		assert.ok(recordEditor.includes("onClick={() => props.onTexture(current().rowId, values()[column] ?? '')}"));
		assert.match(css, /\.record-texture-preview-button\s*\{[^}]*width:\s*28px/u);
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

	test('keeps texture searching size-stable and formula addresses inspectable', () => {
		const texture = read('webview-src/kv-editor/components/TextureDialog.tsx');
		const app = read('webview-src/kv-editor/App.tsx');
		const css = read('webview-src/kv-editor/styles.css');
		assert.ok(!texture.includes('adaptiveGridHeight'));
		assert.match(css, /\.texture-dialog\s*\{[^}]*height:\s*760px;[^}]*max-height:\s*calc\(100vh - 36px\)/u);
		assert.ok(app.includes('class="formula-address"'));
		assert.ok(app.includes('title={selectedCell()'));
	});

	test('keeps modifier controls row-local and ordered', () => {
		const ability = read('webview-src/kv-editor/components/AbilityDialog.tsx');
		const css = read('webview-src/kv-editor/styles.css');
		assert.ok(ability.includes('class="modifier-actions"'));
		assert.ok(ability.includes('在下方添加 Modifier'));
		assert.ok(ability.includes('上移 Modifier'));
		assert.ok(ability.includes('下移 Modifier'));
		assert.ok(!ability.includes('自动识别为 object'));
		assert.match(css, /\.modifier-actions\s*\{[^}]*grid-template-columns:\s*repeat\(4, 24px\)/u);
	});
});