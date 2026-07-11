/**
 * releaseData.ts
 *
 * Resolves paths to read-only resource/data files.
 * When a newer (or equal) installed release of iwasinminedream.dota2tools exists in
 * ~/.vscode/extensions/, its resource files are preferred over the dev copy.
 * This way installing the official extension from the marketplace keeps the
 * dev build's API data up to date automatically — no manual sync needed.
 *
 * Falls back to context.extensionPath if:
 *  - no release installation is found, OR
 *  - the requested file does not exist in the release folder
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

let _cachedReleasePath: string | null | undefined = undefined;

/** Returns the folder of the latest installed iwasinminedream.dota2tools release, or null. */
function findLatestReleasePath(devPath: string): string | null {
    const vsExtDir = path.join(os.homedir(), '.vscode', 'extensions');
    if (!fs.existsSync(vsExtDir)) { return null; }

    try {
        const best = fs.readdirSync(vsExtDir)
            .filter(d => /^iwasinminedream\.dota2tools-\d+\.\d+\.\d+$/.test(d))
            .map(d => {
                const m = d.match(/(\d+)\.(\d+)\.(\d+)$/);
                return { dir: d, ver: m ? +m[1] * 1_000_000 + +m[2] * 1_000 + +m[3] : 0 };
            })
            .sort((a, b) => b.ver - a.ver)[0];

        if (!best) { return null; }

        const releasePath = path.join(vsExtDir, best.dir);
        // Don't use if it IS the dev folder (running from installed location)
        if (path.normalize(releasePath) === path.normalize(devPath)) { return null; }
        return releasePath;
    } catch {
        return null;
    }
}

/**
 * Returns the base path to use for reading data/resource files.
 * Prefers the latest installed release over the dev extension path.
 */
export function getReleasePath(context: vscode.ExtensionContext): string {
    if (_cachedReleasePath === undefined) {
        _cachedReleasePath = findLatestReleasePath(context.extensionPath);
    }
    return _cachedReleasePath ?? context.extensionPath;
}

/**
 * Resolves a resource file path, preferring the installed release copy.
 * Usage: getResourcePath(context, 'resource', 'dota_script_help2.lua')
 *        getResourcePath(context, 'resource/npc/heroes')
 */
export function getResourcePath(context: vscode.ExtensionContext, ...segments: string[]): string {
    const releasePath = getReleasePath(context);
    if (releasePath !== context.extensionPath) {
        const releaseFull = path.join(releasePath, ...segments);
        if (fs.existsSync(releaseFull)) {
            return releaseFull;
        }
    }
    return path.join(context.extensionPath, ...segments);
}

/** Reset the cached release path (useful for testing). */
export function resetReleasePathCache(): void {
    _cachedReleasePath = undefined;
}
