/* eslint-disable */
// Verifies that the API data shown by the NEW unified sidebar (sourced from the sibling
// @moddota/dota-data repo) covers the data the OLD extension browsers showed (the parsed
// JSON under resource/). For each category it prints the name-set sizes and any names that
// are only in one side, so a reviewer can confirm "new ⊇ old" (or spot real differences).
//
// Usage: node scripts/compare-api-data.js [path-to-dota-data]

const fs = require('fs');
const path = require('path');

const EXT_ROOT = path.resolve(__dirname, '..');
const RES = path.join(EXT_ROOT, 'resource');
const dotaData = process.argv[2]
	? path.resolve(process.argv[2])
	: path.resolve(EXT_ROOT, '../../dota/dota-data');
const FILES = path.join(dotaData, 'files');

function load(p) {
	return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function setOf(arr) {
	return new Set(arr.filter(Boolean));
}

function diff(label, oldNames, newNames) {
	const oldSet = setOf(oldNames);
	const newSet = setOf(newNames);
	const onlyOld = [...oldSet].filter((n) => !newSet.has(n)).sort();
	const onlyNew = [...newSet].filter((n) => !oldSet.has(n)).sort();
	const cover = oldSet.size === 0 ? 100 : Math.round(((oldSet.size - onlyOld.length) / oldSet.size) * 100);

	console.log(`\n=== ${label} ===`);
	console.log(`  old: ${oldSet.size}   new: ${newSet.size}   coverage of old by new: ${cover}%`);
	if (onlyOld.length) {
		console.log(`  ⚠ only in OLD (missing from new) [${onlyOld.length}]:`);
		console.log('    ' + onlyOld.slice(0, 40).join(', ') + (onlyOld.length > 40 ? ` … (+${onlyOld.length - 40})` : ''));
	} else {
		console.log('  ✓ new covers all old names');
	}
	if (onlyNew.length) {
		console.log(`  + only in NEW (added) [${onlyNew.length}]:`);
		console.log('    ' + onlyNew.slice(0, 20).join(', ') + (onlyNew.length > 20 ? ` … (+${onlyNew.length - 20})` : ''));
	}
}

// ── Lua API ────────────────────────────────────────────────────────────────────────
const luaOld = load(path.join(RES, 'dota_script_help2.json'));
const vApi = load(path.join(FILES, 'vscripts/api.json'));
const vEnums = load(path.join(FILES, 'vscripts/enums.json'));

diff(
	'Lua classes',
	Object.keys(luaOld.class_list || {}),
	vApi.filter((d) => d.kind === 'class').map((d) => d.name),
);
diff(
	'Lua enums + constants',
	Object.keys(luaOld.enum_list || {}),
	vEnums.map((d) => d.name),
);

// ── Panorama / JS API ────────────────────────────────────────────────────────────────
const jsOld = load(path.join(RES, 'cl_panorama_script_help_2.json'));
const pApi = load(path.join(FILES, 'panorama/api.json'));
const pEnums = load(path.join(FILES, 'panorama/enums.json'));
diff(
	'Panorama API interfaces',
	Object.keys(jsOld),
	[...pApi.map((d) => d.name), ...pEnums.map((d) => d.name)],
);

// ── Panorama CSS ─────────────────────────────────────────────────────────────────────
const cssOld = load(path.join(RES, 'dump_panorama_css_properties.json'));
const pCss = load(path.join(FILES, 'panorama/css.json'));
diff('Panorama CSS properties', Object.keys(cssOld), Object.keys(pCss));

// ── Panel docs (old) vs Panorama events (new) — not 1:1, informational only ───────────
try {
	const panelOld = load(path.join(RES, 'PanelList.json'));
	const pEvents = load(path.join(FILES, 'panorama/events.json'));
	console.log('\n=== Panel docs (old) vs Panorama events (new) — informational, not a 1:1 mapping ===');
	console.log(`  old PanelList entries: ${Object.keys(panelOld).length}   new panorama events: ${Object.keys(pEvents).length}`);
} catch (e) {
	/* optional */
}

console.log('\nDone.');
