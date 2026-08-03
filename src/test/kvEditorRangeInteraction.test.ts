import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const appSource = fs.readFileSync(path.resolve(__dirname, '../../webview-src/kv-editor/App.tsx'), 'utf8');
const cellSource = fs.readFileSync(path.resolve(__dirname, '../../webview-src/kv-editor/components/TableCells.tsx'), 'utf8');

suite('KvEditor range interaction contract', () => {
	test('keeps ordinary clicks native and only captures a pointer after a drag threshold', () => {
		const start = appSource.indexOf('const beginCellPointerSelection');
		const end = appSource.indexOf('const beginFillPointerSelection', start);
		assert.ok(start >= 0 && end > start);
		assert.doesNotMatch(appSource.slice(start, end), /event\.preventDefault\(\)/u);
		assert.doesNotMatch(appSource.slice(start, end), /setPointerCapture/u);
		assert.match(appSource, /Math\.hypot\(event\.clientX - start\.x, event\.clientY - start\.y\) < 4/u);
	});

	test('activates every double-click action from a controlled second pointer press', () => {
		assert.match(appSource, /previous\?\.key === key && time - previous\.time <= 450/u);
		assert.match(cellSource, /onPointerSelect\?\.\(event, address\)\) \{props\.onBeginEdit/u);
		assert.match(appSource, /beginCellPointerSelection\(event, \{ rowId: row\.rowId, columnKey: column \}\)\) \{openAbilityValues/u);
		assert.match(appSource, /beginCellPointerSelection\(event, \{ rowId: row\.rowId, columnKey: column \}\)\) \{openTexturePicker/u);
		assert.match(appSource, /beginCellPointerSelection\(event, \{ rowId: row\.rowId, columnKey: column \}\)\) \{post\(\{ protocolVersion: 2, type: 'openTarget', target: 'scriptFile'/u);
	});
});