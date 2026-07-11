/**
 * ensure-vrf.js
 *
 * Downloads and extracts ValveResourceFormat CLI if not already present.
 * Used by sync-dota-data.js and extract-images.js.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execFileSync } = require('child_process');

const VRF_DIR = path.join(path.resolve(__dirname, '..'), 'lib', 'vrf');
const VRF_CLI = path.join(VRF_DIR, 'Source2Viewer-CLI.exe');
const VRF_ZIP = path.join(VRF_DIR, 'cli.zip');

const VRF_RELEASE_URL = 'https://api.github.com/repos/ValveResourceFormat/ValveResourceFormat/releases/latest';

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        const opts = { headers: { 'User-Agent': 'dota2tools' } };
        https.get(url, opts, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return httpsGet(res.headers.location).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                res.resume();
                return reject(new Error(`HTTP ${res.statusCode}`));
            }
            const chunks = [];
            res.on('data', (c) => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        }).on('error', reject);
    });
}

async function ensureVrf() {
    if (fs.existsSync(VRF_CLI)) return VRF_CLI;

    console.log('  VRF CLI not found. Downloading...');
    fs.mkdirSync(VRF_DIR, { recursive: true });

    // Get latest release info
    const releaseJson = await httpsGet(VRF_RELEASE_URL);
    const release = JSON.parse(releaseJson.toString());
    const asset = release.assets.find(a => /cli.*win.*x64.*\.zip$/i.test(a.name));
    if (!asset) throw new Error('Could not find VRF CLI Windows x64 asset in latest release');

    console.log(`  Downloading ${asset.name} (${(asset.size / 1024 / 1024).toFixed(1)} MB)...`);
    const zipData = await httpsGet(asset.browser_download_url);
    fs.writeFileSync(VRF_ZIP, zipData);

    // Extract using PowerShell (available on all Windows)
    console.log('  Extracting...');
    execFileSync('powershell', [
        '-NoProfile', '-Command',
        `Expand-Archive -Force -Path '${VRF_ZIP}' -DestinationPath '${VRF_DIR}'`
    ], { stdio: 'pipe', timeout: 60000 });

    // Cleanup zip
    fs.unlinkSync(VRF_ZIP);

    if (!fs.existsSync(VRF_CLI)) {
        throw new Error(`Extraction succeeded but ${VRF_CLI} not found`);
    }

    console.log('  VRF CLI ready.');
    return VRF_CLI;
}

module.exports = { ensureVrf, VRF_CLI, VRF_DIR };
