import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const webviewRoot = resolve(__dirname, 'webview-src');
const outputRoot = resolve(__dirname, 'dist', 'webview');

function findWebviewEntries(): Record<string, string> {
	return Object.fromEntries(
		readdirSync(webviewRoot, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.filter((entry) => existsSync(resolve(webviewRoot, entry.name, 'index.html')))
			.map((entry) => [entry.name, resolve(webviewRoot, entry.name, 'index.html')])
	);
}

export default defineConfig({
	root: webviewRoot,
	base: './',
	plugins: [solidPlugin()],
	build: {
		// VS Code 1.66 uses Electron 17 / Chromium 98.
		target: 'chrome98',
		outDir: outputRoot,
		emptyOutDir: true,
		sourcemap: true,
		rolldownOptions: {
			input: findWebviewEntries(),
			output: {
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});
