import * as assert from 'assert';
import { evaluateSafeFormula, validateSafeFormula } from '../kv-editor-v2/formulaEngine';
import { isKvEditorV2WebviewMessage } from '../types/kvEditorV2Shared';

suite('KvEditor V2', () => {
	test('evaluates the safe formula subset without JavaScript evaluation', () => {
		const result = evaluateSafeFormula('ROUND(A1 * 1.5, 0) + rowNumber', {
			rowId: 'npc_test',
			rowIndex: 1,
			row: {},
			resolveCell: (reference) => reference === 'A1' ? 10 : 0,
		});
		assert.strictEqual(result, 17);
	});

	test('rejects arbitrary JavaScript and property access', () => {
		assert.strictEqual(validateSafeFormula('globalThis.process.exit()').compatible, false);
		assert.strictEqual(validateSafeFormula('new Function("return 1")()').compatible, false);
		assert.strictEqual(validateSafeFormula('row.constructor').compatible, false);
	});

	test('reports unsafe arithmetic instead of materializing an error value', () => {
		assert.throws(() => evaluateSafeFormula('1 / 0', {
			rowId: 'npc_test',
			rowIndex: 0,
			row: {},
			resolveCell: () => null,
		}), /除以零/u);
	});

	test('validates the V2 protocol discriminator', () => {
		assert.strictEqual(isKvEditorV2WebviewMessage({ protocolVersion: 2, type: 'clientReady' }), true);
		assert.strictEqual(isKvEditorV2WebviewMessage({ protocolVersion: 1, type: 'clientReady' }), false);
		assert.strictEqual(isKvEditorV2WebviewMessage({ protocolVersion: 2, type: 'unknown' }), false);
	});
});
