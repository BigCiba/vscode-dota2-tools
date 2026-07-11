import * as vscode from 'vscode';

/**
 * Returns the extension UI language based on the global `dota2-tools.language` setting.
 * - "auto" (default): uses vscode.env.language (maps to "zh-cn" or "en")
 * - "schinese": returns "zh-cn"
 * - "english": returns "en"
 */
export function getExtensionLang(): "zh-cn" | "en" {
	const configLang: string | undefined = vscode.workspace.getConfiguration().get("dota2-tools.language");
	if (configLang === "english") {
		return "en";
	}
	if (configLang === "schinese") {
		return "zh-cn";
	}
	// "auto" or undefined — use VS Code app language
	const appLang = vscode.env.language;
	if (appLang.startsWith("zh")) {
		return "zh-cn";
	}
	return "en";
}
