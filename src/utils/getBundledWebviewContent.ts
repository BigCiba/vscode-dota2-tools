import { env, Uri, Webview } from 'vscode';
import { readFile } from './readFile';

const externalResourcePattern = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

/**
 * Load an HTML file emitted by the Webview Vite build and convert all local
 * assets to VS Code Webview URIs.
 */
export async function getBundledWebviewContent(
	webview: Webview,
	extensionUri: Uri,
	webviewName: string,
): Promise<string> {
	const pageRoot = Uri.joinPath(extensionUri, 'dist', 'webview', webviewName);
	const htmlUri = Uri.joinPath(pageRoot, 'index.html');
	let html: string;

	try {
		html = await readFile(htmlUri);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		throw new Error(
			`Webview bundle not found: ${htmlUri.toString()}. Run "npm run build:webview" first. ${reason}`,
		);
	}

	html = html.replace(
		/\b(src|href)=(['"])(.*?)\2/gi,
		(fullMatch: string, attribute: string, quote: string, resource: string) => {
			if (!resource || externalResourcePattern.test(resource)) {
				return fullMatch;
			}

			const match = /^([^?#]+)(.*)$/.exec(resource);
			if (!match) {
				return fullMatch;
			}

			const [, resourcePath, suffix] = match;
			const resourceUri = webview.asWebviewUri(Uri.joinPath(pageRoot, resourcePath));
			return `${attribute}=${quote}${resourceUri.toString()}${suffix}${quote}`;
		},
	);

	const csp = [
		"default-src 'none'",
		`img-src ${webview.cspSource} https: data:`,
		`font-src ${webview.cspSource}`,
		`style-src ${webview.cspSource} 'unsafe-inline'`,
		`script-src ${webview.cspSource}`,
	].join('; ');

	html = html.replace(
		/<head>/i,
		`<head>\n\t\t<meta http-equiv="Content-Security-Policy" content="${csp};">`,
	);
	html = html.replace(/<html\s+lang=(['"]).*?\1/i, `<html lang="${env.language}"`);

	return html;
}
