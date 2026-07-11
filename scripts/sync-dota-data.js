/**
 * sync-dota-data.js
 *
 * Reads parsed JSON files from the sibling dota-data project
 * and generates resource files for the VS Code extension's
 * inline hints, completions, and tree views.
 *
 * Also extracts images (spellicons, items, heroes, econ) from Dota 2 VPK
 * files using ValveResourceFormat CLI (Source2Viewer-CLI.exe).
 *
 * Usage:
 *   node scripts/sync-dota-data.js [path-to-dota-data]
 *
 * Default dota-data path: ../../dota/dota-data (relative to extension root)
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { ensureVrf, VRF_CLI } = require('./ensure-vrf');

// ─── Configuration ───────────────────────────────────────────────────────────

const EXTENSION_ROOT = path.resolve(__dirname, '..');
const RESOURCE_DIR = path.join(EXTENSION_ROOT, 'resource');
const IMAGES_DIR = path.join(EXTENSION_ROOT, 'images');

// Resolve dota-data path from CLI arg or default
const dotaDataPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(EXTENSION_ROOT, '../../dota/dota-data');

const FILES_DIR = path.join(dotaDataPath, 'files');

// VRF_CLI is imported from ensure-vrf.js

// Dota 2 VPK path — auto-detect common locations
const DOTA2_COMMON_PATHS = [
    'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
    'D:/SteamLibrary/steamapps/common/dota 2 beta',
    'E:/SteamLibrary/steamapps/common/dota 2 beta',
];

function findDota2Dir() {
    for (const p of DOTA2_COMMON_PATHS) {
        if (fs.existsSync(path.join(p, 'game', 'dota', 'pak01_dir.vpk'))) return p;
    }
    return null;
}

const DOTA2_DIR = findDota2Dir();
const DOTA_VPK = DOTA2_DIR ? path.join(DOTA2_DIR, 'game', 'dota', 'pak01_dir.vpk') : null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJson(filePath) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    console.log(`  ✓ ${path.relative(EXTENSION_ROOT, filePath)}`);
}

function writeText(filePath, text) {
    fs.writeFileSync(filePath, text, 'utf-8');
    console.log(`  ✓ ${path.relative(EXTENSION_ROOT, filePath)}`);
}

// ─── 1. VScripts API → dota_script_help2.json ───────────────────────────────

function generateLuaApiJson() {
    console.log('\n[1/6] Generating dota_script_help2.json ...');

    const api = readJson(path.join(FILES_DIR, 'vscripts', 'api.json'));
    const enums = readJson(path.join(FILES_DIR, 'vscripts', 'enums.json'));

    const class_list = {};
    const enum_list = {};

    // Process classes and their members
    for (const decl of api) {
        if (decl.kind === 'class') {
            const className = decl.name;
            const clientClassName = decl.clientName || undefined;
            if (!class_list[className]) class_list[className] = [];

            for (const member of (decl.members || [])) {
                if (member.kind === 'function') {
                    const func = convertVScriptFunction(member, className, clientClassName);
                    class_list[className].push(func);
                }
            }
        } else if (decl.kind === 'function') {
            // Standalone global function
            if (!class_list['Global']) class_list['Global'] = [];
            const func = convertVScriptFunction(decl, 'Global', undefined);

            // Mark client availability from the clientName / available field
            if (decl.available === 'both' || decl.available === 'client') {
                func.class_cl = 'Global';
            }

            class_list['Global'].push(func);
        }
    }

    // Process enums and constants
    for (const decl of enums) {
        if (decl.kind === 'enum') {
            const enumName = decl.name;
            if (!enum_list[enumName]) enum_list[enumName] = [];

            for (const member of (decl.members || [])) {
                enum_list[enumName].push({
                    name: member.name,
                    class: enumName,
                    value: member.value,
                    function: member.description || '',
                    description_lite: '',
                    description: '',
                    example: ''
                });
            }
        } else if (decl.kind === 'constant') {
            // Constants go into a "Constants" enum group
            if (!enum_list['Constants']) enum_list['Constants'] = [];
            enum_list['Constants'].push({
                name: decl.name,
                class: 'Constants',
                value: decl.value,
                function: '',
                description_lite: '',
                description: '',
                example: ''
            });
        }
    }

    writeJson(path.join(RESOURCE_DIR, 'dota_script_help2.json'), { class_list, enum_list });
}

function convertVScriptFunction(member, className, clientClassName) {
    const params = {};
    if (member.args) {
        member.args.forEach((arg, index) => {
            const type = (arg.types && arg.types[0]) || 'handle';
            const key = `${type}_${index + 1}`;
            params[key] = {
                type: type,
                params_name: arg.name || `${type}_${index + 1}`,
                description: arg.description || 'No Description Set'
            };
        });
    }

    const returnType = (member.returns && member.returns.length > 0)
        ? member.returns.join(' | ')
        : 'void';

    const isServer = member.available === 'server' || member.available === 'both';
    const isClient = member.available === 'client' || member.available === 'both';

    const func = {
        description: member.description || '',
        return: returnType,
        function: member.name,
        class: className,
        params,
        server: isServer,
        client: isClient
    };

    // Add clientName if available on client
    if (isClient && clientClassName) {
        func.class_cl = clientClassName;
    }

    return func;
}

// ─── 2. VScripts API → .lua dump files ──────────────────────────────────────

function generateLuaDumpFiles() {
    console.log('\n[2/6] Generating dota_script_help2.lua + dota_cl_script_help2.lua ...');

    const api = readJson(path.join(FILES_DIR, 'vscripts', 'api.json'));
    const enums = readJson(path.join(FILES_DIR, 'vscripts', 'enums.json'));

    const serverLines = [];
    const clientLines = [];

    // Process global functions first (matches original file order)
    for (const decl of api) {
        if (decl.kind === 'function') {
            const luaBlock = formatLuaFunction(decl, null);

            if (decl.available === 'server' || decl.available === 'both') {
                serverLines.push(luaBlock);
            }
            if (decl.available === 'client' || decl.available === 'both') {
                clientLines.push(luaBlock);
            }
        }
    }

    // Then process classes
    for (const decl of api) {
        if (decl.kind === 'class') {
            const className = decl.name;
            const clientClassName = decl.clientName || className;

            for (const member of (decl.members || [])) {
                if (member.kind === 'function') {
                    const luaBlock = formatLuaFunction(member, className);
                    const luaBlockClient = formatLuaFunction(member, clientClassName);

                    if (member.available === 'server' || member.available === 'both') {
                        serverLines.push(luaBlock);
                    }
                    if (member.available === 'client' || member.available === 'both') {
                        clientLines.push(luaBlockClient);
                    }
                }
            }
        }
    }

    // Process enums
    for (const decl of enums) {
        if (decl.kind === 'enum') {
            const enumBlock = formatLuaEnum(decl);
            // Enums go into both server and client
            if (decl.available === 'server' || decl.available === 'both') {
                serverLines.push(enumBlock);
            }
            if (decl.available === 'client' || decl.available === 'both') {
                clientLines.push(enumBlock);
            }
        } else if (decl.kind === 'constant') {
            const constLine = formatLuaConstant(decl);
            if (decl.available === 'server' || decl.available === 'both') {
                serverLines.push(constLine);
            }
            if (decl.available === 'client' || decl.available === 'both') {
                clientLines.push(constLine);
            }
        }
    }

    writeText(path.join(RESOURCE_DIR, 'dota_script_help2.lua'), serverLines.join('\n'));
    writeText(path.join(RESOURCE_DIR, 'dota_cl_script_help2.lua'), clientLines.join('\n'));
}

function formatLuaFunction(member, className) {
    const args = (member.args || []);
    const paramNames = args.map(a => a.name || 'unknown');
    const paramStr = paramNames.join(', ');

    const desc = member.description || '';
    const returnType = (member.returns && member.returns.length > 0) ? member.returns[0] : 'void';

    const lines = [];
    lines.push(`---[[ ${member.name}  ${desc} ]]`);
    lines.push(`-- @return ${returnType}`);

    for (const arg of args) {
        const type = (arg.types && arg.types[0]) || 'handle';
        lines.push(`-- @param ${arg.name || 'unknown'} ${type}`);
    }

    if (className) {
        lines.push(`function ${className}:${member.name}( ${paramStr} ) end`);
    } else {
        lines.push(`function ${member.name}( ${paramStr} ) end`);
    }

    lines.push('');
    return lines.join('\n');
}

function formatLuaEnum(decl) {
    const lines = [];
    lines.push(`--- Enum ${decl.name}`);
    for (const member of (decl.members || [])) {
        lines.push(`${member.name} = ${member.value}`);
    }
    lines.push('');
    return lines.join('\n');
}

function formatLuaConstant(decl) {
    return `--- Enum Constants\n${decl.name} = ${decl.value}\n`;
}

// ─── 3. Panorama API → cl_panorama_script_help_2.json + .txt ────────────────

function generatePanoramaApiJson() {
    console.log('\n[3/6] Generating cl_panorama_script_help_2.json + cl_panorama_script_help_2.txt ...');

    const api = readJson(path.join(FILES_DIR, 'panorama', 'api.json'));
    const enums = readJson(path.join(FILES_DIR, 'panorama', 'enums.json'));

    const result = {};
    const txtLines = [];

    // Process interfaces (classes)
    for (const iface of api) {
        const className = iface.name;
        result[className] = {};

        // Build the instance name (short name used in Signature) from the className
        // e.g. CPanoramaScript_GameEvents → GameEvents
        //      CScriptBindingPR_Buffs → Buffs
        //      $ stays as $
        const instanceName = getJsInstanceName(className);

        txtLines.push(`=== ${className} ===`);
        txtLines.push('{| class="standard-table" style="width: 100%;"');
        txtLines.push('! Function');
        txtLines.push('! Signature');
        txtLines.push('! Description');

        for (const member of (iface.members || [])) {
            const funcName = member.name;
            const args = (member.args || []).map(a => {
                const type = a.type || 'js_value';
                return `${type} ${a.name}`;
            }).join(', ');

            const signature = `${instanceName}.${funcName}( ${args} )`;

            result[className][funcName] = {
                Function: funcName,
                Signature: signature,
                Description: member.description || ''
            };

            txtLines.push('|- ');
            txtLines.push(`| ${funcName}`);
            txtLines.push(`| <code>${signature}</code>`);
            txtLines.push(`| ${member.description || ''}`);
        }

        txtLines.push('|}');
        txtLines.push('');
        txtLines.push('');
    }

    // Process enums
    for (const enumDecl of enums) {
        const enumName = enumDecl.name;
        result[enumName] = {};

        txtLines.push(`=== ${enumName} ===`);
        txtLines.push('{| class="standard-table" style="width: 100%;"');
        txtLines.push('! Enumerator');
        txtLines.push('! Value');
        txtLines.push('! Description');

        for (const member of (enumDecl.members || [])) {
            const fullName = `${enumName}.${member.name}`;

            result[enumName][fullName] = {
                Enumerator: fullName,
                Value: String(member.value),
                Description: ''
            };

            txtLines.push('|- ');
            txtLines.push(`| ${fullName}`);
            txtLines.push(`| ${member.value}`);
            txtLines.push('| ');
        }

        txtLines.push('|}');
        txtLines.push('');
        txtLines.push('');
    }

    writeJson(path.join(RESOURCE_DIR, 'cl_panorama_script_help_2.json'), result);
    writeText(path.join(RESOURCE_DIR, 'cl_panorama_script_help_2.txt'), txtLines.join('\n'));
}

function getJsInstanceName(className) {
    // Special cases
    if (className === '$') return '$';
    if (className === 'Panel') return 'Panel';

    // CPanoramaScript_GameEvents → GameEvents
    // CScriptBindingPR_Buffs → Buffs
    // CDOTA_PanoramaScript_GameUI → GameUI
    let name = className;

    // Strip common prefixes
    const prefixes = [
        'CPanoramaScript_',
        'CScriptBindingPR_',
        'CDOTA_PanoramaScript_',
        'CDOTAPanoramaScript_',
    ];

    for (const prefix of prefixes) {
        if (name.startsWith(prefix)) {
            name = name.substring(prefix.length);
            break;
        }
    }

    return name;
}

// ─── 4. Panorama CSS → dump_panorama_css_properties.json ─────────────────────

function generatePanoramaCssJson() {
    console.log('\n[4/6] Generating dump_panorama_css_properties.json ...');

    const css = readJson(path.join(FILES_DIR, 'panorama', 'css.json'));
    const result = {};

    for (const [propName, propData] of Object.entries(css)) {
        result[propName] = {
            description: propData.description || '<Needs a description>'
        };
        if (propData.examples && propData.examples.length > 0) {
            result[propName].example = propData.examples.join('\r\n');
        }
    }

    writeJson(path.join(RESOURCE_DIR, 'dump_panorama_css_properties.json'), result);
}

// ─── 5. Panorama Events → dump_panorama_events.md + .txt ────────────────────

function generatePanoramaEvents() {
    console.log('\n[5/6] Generating dump_panorama_events.md + dump_panorama_events.txt ...');

    const events = readJson(path.join(FILES_DIR, 'panorama', 'events.json'));
    const mdLines = [];
    const txtLines = [];

    // Markdown table header
    mdLines.push('Event|Panel Event|Panel Event');
    mdLines.push('--|--|--');

    // Wiki table header (txt)
    txtLines.push('{| class="wikitable"');
    txtLines.push('! Event');
    txtLines.push('! Panel Event');
    txtLines.push('! Description');

    for (const [eventName, eventData] of Object.entries(events)) {
        const argsStr = (eventData.args || []).map(a => `${a.type} ${a.name}`).join(', ');
        const signature = `${eventName}(${argsStr})`;
        const isPanelEvent = eventData.panelEvent ? 'Yes' : 'No';
        const desc = eventData.description || '';

        // Markdown row
        mdLines.push(`<code>${signature}</code>|${isPanelEvent}|${desc}`);

        // Wiki table row (txt)
        txtLines.push('|-');
        txtLines.push(`| <code>${signature}</code>`);
        txtLines.push(`| ${isPanelEvent}`);
        txtLines.push(`| ${desc}`);
    }

    txtLines.push('|}');

    writeText(path.join(RESOURCE_DIR, 'dump_panorama_events.md'), mdLines.join('\n'));
    writeText(path.join(RESOURCE_DIR, 'dump_panorama_events.txt'), txtLines.join('\n'));
}

// ─── 6. PanelList — SKIPPED (hand-maintained) ───────────────────────────────
// PanelList.json and PanelList.md are hand-maintained with Chinese descriptions
// and panel attribute information that dota-data doesn't contain.
// They are NOT regenerated automatically.

// ─── 6b. VPK Text Files (npc/*, items_game.txt) ────────────────────────────

function extractVpkTextFiles() {
    console.log('\n[6b] Extracting npc files and items_game.txt from VPK ...');

    if (!DOTA_VPK) {
        console.warn('  ⚠ Dota 2 installation not found. Skipping VPK text extraction.');
        return;
    }

    const tmpDir = path.join(EXTENSION_ROOT, '.vpk_text_tmp');
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
    fs.mkdirSync(tmpDir, { recursive: true });

    // Extract scripts/npc/ and scripts/items/items_game.txt
    const filters = ['scripts/npc/', 'scripts/items/items_game.txt'];

    for (const filter of filters) {
        try {
            execFileSync(VRF_CLI, [
                '-i', DOTA_VPK,
                '-o', tmpDir,
                '-f', filter,
            ], { stdio: 'ignore', timeout: 60000 });
        } catch (err) {
            console.error(`  ✗ VRF extraction failed for ${filter}:`, err.message);
        }
    }

    // Copy npc files
    const npcSrc = path.join(tmpDir, 'scripts', 'npc');
    const npcDest = path.join(RESOURCE_DIR, 'npc');
    if (fs.existsSync(npcSrc)) {
        const count = copyTextFilesRecursive(npcSrc, npcDest);
        console.log(`  ✓ npc: ${count} files updated`);
    } else {
        console.warn('  ⚠ No npc files extracted');
    }

    // Copy items_game.txt
    const itemsSrc = path.join(tmpDir, 'scripts', 'items', 'items_game.txt');
    if (fs.existsSync(itemsSrc)) {
        fs.copyFileSync(itemsSrc, path.join(RESOURCE_DIR, 'items_game.txt'));
        console.log('  ✓ items_game.txt updated');
    } else {
        console.warn('  ⚠ items_game.txt not extracted');
    }

    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
}

/** Recursively copy text files, overwriting existing, returns count */
function copyTextFilesRecursive(src, dest) {
    let count = 0;
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            count += copyTextFilesRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            count++;
        }
    }
    return count;
}

// ─── 7. VPK Image Extraction ────────────────────────────────────────────────

const { spawn } = require('child_process');

/**
 * Run VRF CLI and return a promise. Uses spawn with stdio:'ignore' to avoid ENOBUFS.
 */
function runVrf(args) {
    return new Promise((resolve) => {
        const proc = spawn(VRF_CLI, args, { stdio: 'ignore', timeout: 600000 });
        proc.on('close', () => resolve());
        proc.on('error', () => resolve());
    });
}

/**
 * List files in VPK matching a filter (returns array of relative paths).
 */
function listVpkFiles(vpkFilter) {
    const out = execFileSync(VRF_CLI, [
        '-i', DOTA_VPK,
        '-l',
        '-f', vpkFilter,
        '-e', 'vtex_c',
    ], { timeout: 30000, maxBuffer: 50 * 1024 * 1024 }).toString();
    return out.split('\n')
        .map(line => line.trim().split(' ')[0])
        .filter(f => f.endsWith('.vtex_c'));
}

/**
 * Build a set of existing .png filenames (without path) in a directory, recursively.
 */
function collectExistingPngs(dir) {
    const existing = new Set();
    if (!fs.existsSync(dir)) return existing;
    const walk = (d) => {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
            if (entry.isDirectory()) walk(path.join(d, entry.name));
            else if (entry.name.endsWith('.png')) existing.add(entry.name);
        }
    };
    walk(dir);
    return existing;
}

/**
 * Build a set of existing .png relative paths in a directory, recursively.
 */
function collectExistingPngsRelative(dir) {
    const existing = new Set();
    if (!fs.existsSync(dir)) return existing;
    const walk = (d, rel) => {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
            const relPath = rel ? `${rel}/${entry.name}` : entry.name;
            if (entry.isDirectory()) walk(path.join(d, entry.name), relPath);
            else if (entry.name.endsWith('.png')) existing.add(relPath);
        }
    };
    walk(dir, '');
    return existing;
}

/**
 * Extract images from Dota 2 VPK using ValveResourceFormat CLI.
 * Only extracts new images that don't already exist in the target directory.
 * econ_items is split into sub-filters and extracted in parallel to avoid ENOBUFS.
 */
async function extractVpkImages() {
    console.log('\n[7/7] Extracting images from Dota 2 VPK ...');

    if (!DOTA_VPK) {
        console.warn('  ⚠ Dota 2 installation not found. Skipping image extraction.');
        return;
    }

    console.log(`  VRF CLI:  ${VRF_CLI}`);
    console.log(`  Dota VPK: ${DOTA_VPK}`);

    const tmpDir = path.join(EXTENSION_ROOT, '.vpk_extract_tmp');

    // --- Small tasks (spellicons, items, heroes) run synchronously ---
    const smallTasks = [
        {
            name: 'spellicons',
            vpkFilter: 'panorama/images/spellicons/',
            targetDir: path.join(IMAGES_DIR, 'spellicons'),
            flat: true,
        },
        {
            name: 'items',
            vpkFilter: 'panorama/images/items/',
            targetDir: path.join(IMAGES_DIR, 'items'),
            flat: true,
        },
        {
            name: 'heroes_icon',
            vpkFilter: 'panorama/images/heroes/icons/',
            targetDir: path.join(IMAGES_DIR, 'heroes_icon'),
            flat: true,
        },
    ];

    for (const task of smallTasks) {
        extractTask(task, tmpDir);
    }

    // --- econ_items: split into sub-filters, extract in parallel ---
    const econSubFilters = [
        'panorama/images/econ/heroes/',
        'panorama/images/econ/items/',
        'panorama/images/econ/loading_screens/',
        'panorama/images/econ/sets/',
    ];
    await extractEconParallel(econSubFilters, tmpDir);

    // Cleanup tmp
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
}

function extractTask(task, tmpDir) {
    console.log(`\n  Extracting ${task.name} ...`);

    // Collect existing files to skip
    const existing = task.flat
        ? collectExistingPngs(task.targetDir)
        : collectExistingPngsRelative(task.targetDir);

    // List what's in the VPK
    let vpkFiles;
    try {
        vpkFiles = listVpkFiles(task.vpkFilter);
    } catch (err) {
        console.error(`  ✗ Failed to list VPK for ${task.name}:`, err.message);
        return;
    }

    // Determine which files are new
    const newFiles = vpkFiles.filter(f => {
        const pngName = path.basename(f).replace('.vtex_c', '.png');
        if (task.flat) {
            return !existing.has(pngName);
        } else {
            // Relative path from the vpkFilter root
            const rel = f.replace(task.vpkFilter, '').replace('.vtex_c', '.png');
            return !existing.has(rel);
        }
    });

    if (newFiles.length === 0) {
        console.log(`  ✓ ${task.name}: up to date (${vpkFiles.length} images, 0 new)`);
        return;
    }

    console.log(`    ${vpkFiles.length} total, ${newFiles.length} new`);

    // Clean & create tmp dir for this task
    const taskTmp = path.join(tmpDir, task.name);
    if (fs.existsSync(taskTmp)) fs.rmSync(taskTmp, { recursive: true });
    fs.mkdirSync(taskTmp, { recursive: true });

    try {
        execFileSync(VRF_CLI, [
            '-i', DOTA_VPK,
            '-o', taskTmp,
            '-d',
            '-f', task.vpkFilter,
            '--threads', '8',
        ], { stdio: 'ignore', timeout: 600000 });
    } catch (err) {
        console.error(`  ✗ VRF extraction failed for ${task.name}:`, err.message);
        return;
    }

    const extractedRoot = path.join(taskTmp, ...task.vpkFilter.split('/').filter(Boolean));
    if (!fs.existsSync(extractedRoot)) {
        console.warn(`  ⚠ No files extracted for ${task.name}`);
        return;
    }

    fs.mkdirSync(task.targetDir, { recursive: true });

    let count = 0;
    if (task.flat) {
        const pngs = collectPngsFlat(extractedRoot);
        for (const src of pngs) {
            const name = path.basename(src);
            if (existing.has(name)) continue;
            fs.copyFileSync(src, path.join(task.targetDir, name));
            count++;
        }
    } else {
        count = copyNewFiles(extractedRoot, task.targetDir, existing, '');
    }

    console.log(`  ✓ ${task.name}: ${count} new images extracted`);
}

/**
 * Extract econ sub-categories in parallel (4 VRF processes).
 */
async function extractEconParallel(subFilters, tmpDir) {
    console.log(`\n  Extracting econ_items (${subFilters.length} categories in parallel) ...`);

    const econTargetBase = path.join(IMAGES_DIR, 'econ_items', 'econ');
    const existing = collectExistingPngsRelative(econTargetBase);
    console.log(`    ${existing.size} existing images`);

    // Launch VRF processes in parallel
    const promises = subFilters.map((filter) => {
        const categoryName = filter.split('/').filter(Boolean).pop();
        const taskTmp = path.join(tmpDir, `econ_${categoryName}`);
        if (fs.existsSync(taskTmp)) fs.rmSync(taskTmp, { recursive: true });
        fs.mkdirSync(taskTmp, { recursive: true });

        console.log(`    Starting: ${categoryName}`);

        return runVrf([
            '-i', DOTA_VPK,
            '-o', taskTmp,
            '-d',
            '-f', filter,
            '--threads', '4',
        ]).then(() => {
            // Copy new files from extracted tmp to target
            const extractedRoot = path.join(taskTmp, 'panorama', 'images', 'econ', categoryName);
            const targetDir = path.join(econTargetBase, categoryName);

            if (!fs.existsSync(extractedRoot)) {
                console.warn(`    ⚠ No files for ${categoryName}`);
                return 0;
            }

            fs.mkdirSync(targetDir, { recursive: true });
            const count = copyNewFiles(extractedRoot, targetDir, existing, categoryName);
            console.log(`    ✓ ${categoryName}: ${count} new images`);
            return count;
        });
    });

    const counts = await Promise.all(promises);
    const total = counts.reduce((a, b) => a + b, 0);
    console.log(`  ✓ econ_items: ${total} new images total`);
}

/** Recursively collect all .png file paths (flat list) */
function collectPngsFlat(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...collectPngsFlat(full));
        else if (entry.name.endsWith('.png')) results.push(full);
    }
    return results;
}

/** Recursively copy only files not in the existing set, returns count */
function copyNewFiles(src, dest, existing, relPrefix) {
    let count = 0;
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            count += copyNewFiles(srcPath, destPath, existing, rel);
        } else if (entry.name.endsWith('.png') && !existing.has(rel)) {
            fs.copyFileSync(srcPath, destPath);
            count++;
        }
    }
    return count;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    console.log('=== sync-dota-data ===');
    console.log(`dota-data path: ${dotaDataPath}`);
    console.log(`resource dir:   ${RESOURCE_DIR}`);

    // Ensure VRF CLI is available (downloads if needed)
    await ensureVrf();

    // Validate dota-data exists
    if (!fs.existsSync(FILES_DIR)) {
        console.error(`\nERROR: dota-data files directory not found at: ${FILES_DIR}`);
        console.error('Please provide the correct path: node scripts/sync-dota-data.js <path-to-dota-data>');
        process.exit(1);
    }

    // Validate required files
    const requiredFiles = [
        'vscripts/api.json',
        'vscripts/enums.json',
        'panorama/api.json',
        'panorama/css.json',
        'panorama/enums.json',
        'panorama/events.json',
    ];

    for (const file of requiredFiles) {
        const filePath = path.join(FILES_DIR, file);
        if (!fs.existsSync(filePath)) {
            console.error(`\nERROR: Required file not found: ${filePath}`);
            console.error('Ensure dota-data has been built: cd dota-data && npm run build:static');
            process.exit(1);
        }
    }

    // Run all generators
    generateLuaApiJson();
    generateLuaDumpFiles();
    generatePanoramaApiJson();
    generatePanoramaCssJson();
    generatePanoramaEvents();
    // PanelList.json + PanelList.md are hand-maintained — not overwritten

    // Extract text files from VPK (npc/*, items_game.txt)
    extractVpkTextFiles();

    // Extract images from VPK
    await extractVpkImages();

    console.log('\n=== Done! All resource files updated. ===');
    console.log('Note: PanelList.json and PanelList.md are hand-maintained and NOT overwritten.');
    console.log('Note: api_note.json is maintained via MySQL and NOT overwritten.');
}

main();
