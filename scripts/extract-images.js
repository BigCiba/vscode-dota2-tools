/**
 * extract-images.js
 *
 * Extracts ability, item, hero, and cosmetic icons from Dota 2 VPK files
 * using ValveResourceFormat CLI (Source2Viewer-CLI.exe).
 * Only extracts new images that don't already exist.
 *
 * Usage:
 *   node scripts/extract-images.js [dota2-path]
 *
 * If dota2-path is not provided, common Steam library paths are checked.
 * Source2Viewer-CLI.exe is expected in the extension's lib/vrf/ directory.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync, spawn } = require('child_process');
const { ensureVrf, VRF_CLI } = require('./ensure-vrf');

const EXTENSION_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(EXTENSION_ROOT, 'images');

const DOTA2_COMMON_PATHS = [
    'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta',
    'D:/SteamLibrary/steamapps/common/dota 2 beta',
    'E:/SteamLibrary/steamapps/common/dota 2 beta',
    'F:/SteamLibrary/steamapps/common/dota 2 beta',
];

function findDota2Dir(userPath) {
    if (userPath) {
        const vpk = path.join(userPath, 'game', 'dota', 'pak01_dir.vpk');
        if (fs.existsSync(vpk)) return userPath;
        console.error(`ERROR: VPK not found at ${vpk}`);
        process.exit(1);
    }
    for (const p of DOTA2_COMMON_PATHS) {
        if (fs.existsSync(path.join(p, 'game', 'dota', 'pak01_dir.vpk'))) return p;
    }
    return null;
}

function runVrf(vpk, args) {
    return new Promise((resolve) => {
        const proc = spawn(VRF_CLI, ['-i', vpk, ...args], { stdio: 'ignore', timeout: 600000 });
        proc.on('close', () => resolve());
        proc.on('error', () => resolve());
    });
}

function listVpkFiles(vpk, vpkFilter) {
    const out = execFileSync(VRF_CLI, [
        '-i', vpk, '-l', '-f', vpkFilter, '-e', 'vtex_c',
    ], { timeout: 30000, maxBuffer: 50 * 1024 * 1024 }).toString();
    return out.split('\n').map(l => l.trim().split(' ')[0]).filter(f => f.endsWith('.vtex_c'));
}

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

function collectPngsFlat(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...collectPngsFlat(full));
        else if (entry.name.endsWith('.png')) results.push(full);
    }
    return results;
}

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

function extractSmallTask(vpk, name, vpkFilter, targetDir, tmpDir) {
    console.log(`\n  Extracting ${name} ...`);
    const existing = collectExistingPngs(targetDir);

    let vpkFiles;
    try { vpkFiles = listVpkFiles(vpk, vpkFilter); } catch (err) {
        console.error(`  x Failed to list VPK for ${name}:`, err.message);
        return;
    }

    const newFiles = vpkFiles.filter(f => !existing.has(path.basename(f).replace('.vtex_c', '.png')));
    if (newFiles.length === 0) {
        console.log(`  ok ${name}: up to date (${vpkFiles.length} images, 0 new)`);
        return;
    }

    console.log(`    ${vpkFiles.length} total, ${newFiles.length} new`);
    const taskTmp = path.join(tmpDir, name);
    if (fs.existsSync(taskTmp)) fs.rmSync(taskTmp, { recursive: true });
    fs.mkdirSync(taskTmp, { recursive: true });

    try {
        execFileSync(VRF_CLI, ['-i', vpk, '-o', taskTmp, '-d', '-f', vpkFilter, '--threads', '8'],
            { stdio: 'ignore', timeout: 600000 });
    } catch (err) {
        console.error(`  x VRF extraction failed for ${name}:`, err.message);
        return;
    }

    const extractedRoot = path.join(taskTmp, ...vpkFilter.split('/').filter(Boolean));
    if (!fs.existsSync(extractedRoot)) { console.warn(`  ? No files extracted for ${name}`); return; }

    fs.mkdirSync(targetDir, { recursive: true });
    let count = 0;
    const pngs = collectPngsFlat(extractedRoot);
    for (const src of pngs) {
        const n = path.basename(src);
        if (!existing.has(n)) { fs.copyFileSync(src, path.join(targetDir, n)); count++; }
    }
    console.log(`  ok ${name}: ${count} new images extracted`);
}

async function extractEconParallel(vpk, tmpDir) {
    const subFilters = [
        'panorama/images/econ/heroes/',
        'panorama/images/econ/items/',
        'panorama/images/econ/loading_screens/',
        'panorama/images/econ/sets/',
    ];

    const econTargetBase = path.join(IMAGES_DIR, 'econ_items', 'econ');
    const existing = collectExistingPngsRelative(econTargetBase);
    console.log(`\n  Extracting econ_items (${subFilters.length} categories + root in parallel) ...`);
    console.log(`    ${existing.size} existing images`);

    const promises = subFilters.map((filter) => {
        const categoryName = filter.split('/').filter(Boolean).pop();
        const taskTmp = path.join(tmpDir, `econ_${categoryName}`);
        if (fs.existsSync(taskTmp)) fs.rmSync(taskTmp, { recursive: true });
        fs.mkdirSync(taskTmp, { recursive: true });

        console.log(`    Starting: ${categoryName}`);

        return runVrf(vpk, ['-o', taskTmp, '-d', '-f', filter, '--threads', '4']).then(() => {
            const extractedRoot = path.join(taskTmp, 'panorama', 'images', 'econ', categoryName);
            const targetDir = path.join(econTargetBase, categoryName);
            if (!fs.existsSync(extractedRoot)) { console.warn(`    ? No files for ${categoryName}`); return 0; }
            fs.mkdirSync(targetDir, { recursive: true });
            const count = copyNewFiles(extractedRoot, targetDir, existing, categoryName);
            console.log(`    ok ${categoryName}: ${count} new images`);
            return count;
        });
    });

    // Also extract root-level econ files (e.g. testitem_slot_empty)
    const rootTmp = path.join(tmpDir, 'econ_root');
    if (fs.existsSync(rootTmp)) fs.rmSync(rootTmp, { recursive: true });
    fs.mkdirSync(rootTmp, { recursive: true });
    console.log(`    Starting: econ root`);
    promises.push(
        runVrf(vpk, ['-o', rootTmp, '-d', '-f', 'panorama/images/econ/', '--threads', '4']).then(() => {
            const extractedRoot = path.join(rootTmp, 'panorama', 'images', 'econ');
            if (!fs.existsSync(extractedRoot)) { console.warn(`    ? No files for econ root`); return 0; }
            fs.mkdirSync(econTargetBase, { recursive: true });
            // Only copy root-level PNG files (not subdirectories already handled above)
            let count = 0;
            const rootExisting = collectExistingPngs(econTargetBase);
            for (const entry of fs.readdirSync(extractedRoot, { withFileTypes: true })) {
                if (entry.isFile() && entry.name.endsWith('.png') && !rootExisting.has(entry.name)) {
                    fs.copyFileSync(path.join(extractedRoot, entry.name), path.join(econTargetBase, entry.name));
                    count++;
                }
            }
            console.log(`    ok econ root: ${count} new images`);
            return count;
        })
    );

    const counts = await Promise.all(promises);
    const total = counts.reduce((a, b) => a + b, 0);
    console.log(`  ok econ_items: ${total} new images total`);
}

function extractHeroIcons(vpk, tmpDir) {
    console.log('\n  Extracting hero icons (portraits + minimap) ...');
    const heroesTarget = path.join(IMAGES_DIR, 'heroes_icon');
    const iconsTarget = path.join(heroesTarget, 'icons');
    const existing = collectExistingPngs(heroesTarget);
    const existingIcons = collectExistingPngs(iconsTarget);
    const taskTmp = path.join(tmpDir, 'heroes_all');
    if (fs.existsSync(taskTmp)) fs.rmSync(taskTmp, { recursive: true });
    fs.mkdirSync(taskTmp, { recursive: true });

    try {
        execFileSync(VRF_CLI, ['-i', vpk, '-o', taskTmp, '-d', '-f', 'panorama/images/heroes/', '--threads', '8'],
            { stdio: 'ignore', timeout: 600000 });
    } catch (err) {
        console.error(`  x VRF extraction failed for heroes:`, err.message);
        return;
    }

    // Portraits: panorama/images/heroes/*.png -> heroes_icon/
    const portraitsRoot = path.join(taskTmp, 'panorama', 'images', 'heroes');
    if (!fs.existsSync(portraitsRoot)) { console.warn('  ? No hero files extracted'); return; }
    fs.mkdirSync(heroesTarget, { recursive: true });
    fs.mkdirSync(iconsTarget, { recursive: true });
    let portraitCount = 0;
    let iconCount = 0;
    for (const entry of fs.readdirSync(portraitsRoot, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith('.png') && !existing.has(entry.name)) {
            fs.copyFileSync(path.join(portraitsRoot, entry.name), path.join(heroesTarget, entry.name));
            portraitCount++;
        }
    }
    // Minimap icons: panorama/images/heroes/icons/*.png -> heroes_icon/icons/
    const iconsRoot = path.join(portraitsRoot, 'icons');
    if (fs.existsSync(iconsRoot)) {
        for (const entry of fs.readdirSync(iconsRoot, { withFileTypes: true })) {
            if (entry.isFile() && entry.name.endsWith('.png') && !existingIcons.has(entry.name)) {
                fs.copyFileSync(path.join(iconsRoot, entry.name), path.join(iconsTarget, entry.name));
                iconCount++;
            }
        }
    }
    console.log(`  ok heroes: ${portraitCount} portraits, ${iconCount} minimap icons extracted`);
}

async function main() {
    console.log('=== extract-images ===');

    await ensureVrf();

    const dota2Dir = findDota2Dir(process.argv[2]);
    if (!dota2Dir) {
        console.error('ERROR: Dota 2 installation not found.');
        console.error('Provide the path: node scripts/extract-images.js "C:/path/to/dota 2 beta"');
        process.exit(1);
    }

    const vpk = path.join(dota2Dir, 'game', 'dota', 'pak01_dir.vpk');
    console.log(`Dota 2:   ${dota2Dir}`);
    console.log(`VRF CLI:  ${VRF_CLI}`);
    console.log(`Images:   ${IMAGES_DIR}`);

    const tmpDir = path.join(EXTENSION_ROOT, '.vpk_extract_tmp');

    extractSmallTask(vpk, 'spellicons', 'panorama/images/spellicons/', path.join(IMAGES_DIR, 'spellicons'), tmpDir);
    extractSmallTask(vpk, 'items', 'panorama/images/items/', path.join(IMAGES_DIR, 'items'), tmpDir);
    extractHeroIcons(vpk, tmpDir);
    await extractEconParallel(vpk, tmpDir);

    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
    console.log('\n=== Done! ===');
}

main();
