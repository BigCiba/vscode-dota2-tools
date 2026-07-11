import * as fs from 'fs';
import * as os from 'os';
import * as vscode from 'vscode';
import { getGameDir, isValidFolder } from '../module/addonInfo';
import { StatusBarState, changeStatusBarState, refreshStatusBarMessage, showStatusBarMessage } from '../module/statusBar';
import { getPathConfiguration } from '../utils/getPathConfiguration';
import { readKeyValue2 } from '../utils/kvUtils';
import { localize } from '../utils/localize';

export async function combineLocalization(languageType: string = "") {
	if (isValidFolder() === false) {
		return;
	}
	// Message
	changeStatusBarState(StatusBarState.LOADING);
	let messageIndex = showStatusBarMessage(localize('msg_merge_text', [languageType == "" ? "ALL" : languageType]));
	const gameDir = getGameDir();
	const localizationPath = getPathConfiguration("dota2-tools.A5.localization_path");
	if (localizationPath) {
		if (languageType !== "") {
			let language = await getLanguageContent(localizationPath, languageType);
			if (language != undefined) {
				fs.writeFileSync(gameDir + '/resource/addon_' + languageType + '.txt', language);
				refreshStatusBarMessage(messageIndex, localize('msg_merge_text', [localizationPath + '/' + languageType]));
			}
		} else {
			let langFolders: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(localizationPath));
			// Sort langFolders by folderName
			langFolders.sort((a, b) => a[0].localeCompare(b[0]));
			for (let i: number = 0; i < langFolders.length; i++) {
				const [folderName, isDirectory] = langFolders[i];
				if (Number(isDirectory) === vscode.FileType.Directory) {
					let language = await getLanguageContent(localizationPath, folderName);
					if (language != undefined) {
						fs.writeFileSync(gameDir + '/resource/addon_' + folderName + '.txt', language);
						refreshStatusBarMessage(messageIndex, localize('msg_merge_text', [localizationPath + '/' + folderName]));
					}
					// let text_editor: vscode.TextEditor = await vscode.window.showTextDocument(vscode.Uri.file(root_path + '/game/dota_addons/dota_imba/resource/addon_' + folder_name + '.txt'));
					// text_editor.edit(function (edit_builder) {
					// 	edit_builder.delete(new vscode.Range(new vscode.Position(0,0),text_editor.document.lineAt(text_editor.document.lineCount - 1).range.end));
					// 	edit_builder.insert(new vscode.Position(0,0),language);
					// });
				}
			}
			refreshStatusBarMessage(messageIndex, localize('msg_merge_text_done'));
		}
		changeStatusBarState(StatusBarState.ALL_DONE);
	}
}
async function getLanguageContent(localizationPath: string, languageType: string) {
	if (languageType == "history") {
		return;
	}
	const languagePath: string = localizationPath + '/' + languageType;
	let language: string = `"lang"
{
	"Language"		"` + languageType.charAt(0).toUpperCase() + languageType.slice(1) + `"
	"Tokens"
	{
`;
	let promise: string = await readLanguage(languagePath);
	language += promise;
	language += `
	}
}`;
	return language;
}

async function readLanguage(path: string): Promise<string> {
	let lang: string = '';
	let files: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(vscode.Uri.file(path));
	files.sort((a, b) => a[0].localeCompare(b[0]));
	for (let i = 0; i < files.length; i++) {
		const [fileName, fileType] = files[i];
		if (Number(fileType) === vscode.FileType.File) {
			try {
				let document: vscode.TextDocument = await vscode.workspace.openTextDocument(path + '/' + fileName);
				const langContent = document.getText();

				// Use the KV parser to extract Tokens content, handling various formats more robustly
				const parsed = readKeyValue2(langContent);

				// Try multiple structures:
				// 1. Standard structure: lang.Tokens
				// 2. Old version: directly the tokens (without an outer wrapper)
				let tokens: Record<string, unknown> | undefined;

				const langBlock = parsed?.lang;
				if (langBlock && typeof langBlock === 'object') {
					tokens = (langBlock as Record<string, unknown>).Tokens as Record<string, unknown> | undefined;
				}

				// If lang.Tokens is not found, check whether it is directly the tokens (old version format)
				if (!tokens && parsed && typeof parsed === 'object') {
					// If parsed contains only string values, this is the old version's direct token format
					const entries = Object.entries(parsed as Record<string, unknown>);
					const hasStringValues = entries.length > 0 && entries.some(([_, value]) => typeof value === 'string');
					if (hasStringValues) {
						tokens = parsed as Record<string, unknown>;
					}
				}

				if (tokens && typeof tokens === 'object') {
					// Add file path comment
					lang += "\t\t//" + path.split("localization/")[1] + '/' + fileName + os.EOL;

					// Manually generate Tokens content to ensure correct formatting
					for (const [key, value] of Object.entries(tokens)) {
						if (typeof value === 'string') {
							// Escape quotes and format
							const escapedValue = value.replace(/"/g, '\\"');
							lang += `\t\t"${key}"\t\t"${escapedValue}"${os.EOL}`;
						}
					}
					lang += os.EOL;
				} else {
					// If parsing fails, use an improved regular expression as a fallback
					// Supports leading/trailing comments, blank lines, and whitespace
					const modifiedContent = extractTokensContent(langContent);
					if (modifiedContent) {
						lang += "\t\t//" + path.split("localization/")[1] + '/' + fileName + os.EOL;
						lang += modifiedContent + os.EOL;
						lang += os.EOL;
					}
				}
			} catch (error) {
				console.error(`Failed to process file ${path}/${fileName}:`, error);
			}
		} else if (Number(fileType) === vscode.FileType.Directory) {
			let promise: string = await readLanguage(path + '/' + fileName);
			lang += promise;
		}
	}
	return Promise.resolve(lang);
}

/**
 * Extract the Tokens content from a VDF file (fallback solution)
 * Uses an improved regular expression, supporting comments, blank lines, etc.
 */
function extractTokensContent(content: string): string {
	// Remove leading/trailing whitespace and comments
	const trimmed = content.trim();

	// Try to match "lang" { ... "Tokens" { ... } }
	// Use [\s\S] to match all characters including newlines
	const tokensMatch = trimmed.match(/"lang"[\s\S]*?"Tokens"[\s\S]*?\{([\s\S]*)\}[\s\S]*?\}[\s\S]*$/);

	if (tokensMatch && tokensMatch[1]) {
		// Extract the Tokens block content
		let tokensContent = tokensMatch[1];

		// Clean up content: remove leading/trailing whitespace but keep the formatting in between
		const lines = tokensContent.split(/\r?\n/);
		const filteredLines = lines
			.map(line => line.trim())
			.filter(line => line.length > 0 && !line.startsWith('//'));

		return filteredLines.join(os.EOL);
	}

	return '';
}