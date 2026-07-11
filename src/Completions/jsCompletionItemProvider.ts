import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DotaApiNote } from '../Class/DotaApiNote';

interface JsFunction {
	Function?: string;
	Signature?: string;
	Description?: string;
	Value?: string;
	Enumerator?: string;
}

const DOTA_LABEL = 'Dota2 Panorama';

/** Priority class ordering - the earlier the entry, the higher the priority */
const PRIORITY_CLASSES = ['$', 'Game', 'Players', 'GameUI', 'Entities', 'Abilities', 'Items', 'Buffs', 'GameEvents', 'CustomNetTables', 'Particles'];

function classSortPrefix(shortName: string): string {
	const idx = PRIORITY_CLASSES.indexOf(shortName);
	if (idx >= 0) {
		return String(idx).padStart(2, '0');
	}
	return '99';
}

export class JsCompletionItemProvider implements vscode.CompletionItemProvider {
	selector: vscode.DocumentSelector;
	triggerCharacters: string[] = ['.'];
	document: {
		[key: string]: { [key: string]: JsFunction };
	};
	/** Global completion list (class names + functions + enums) - non-dot context */
	globalSnippets: vscode.CompletionItem[];
	/** Method completions grouped by short class name (e.g. "Game" -> [Time, GetGameTime, ...]) - dot context */
	classMethodMap: Map<string, vscode.CompletionItem[]>;
	/** Lowercase short class name -> correct-case mapping (game -> Game, gameevents -> GameEvents) */
	classNameNormalize: Map<string, string>;

	constructor(context: vscode.ExtensionContext, public dotaApiNote: DotaApiNote) {
		this.selector = [
			{ scheme: 'file', language: 'javascript' },
			{ scheme: 'file', language: 'typescript' },
			{ scheme: 'untitled', language: 'javascript' },
			{ scheme: 'untitled', language: 'typescript' },
		];
		this.document = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'cl_panorama_script_help_2.json'), 'utf-8'));
		this.globalSnippets = [];
		this.classMethodMap = new Map();
		this.classNameNormalize = new Map();

		const classShortNames = new Set<string>();
		/** Dedup: global-context function name -> already added */
		const globalFunctionAdded = new Set<string>();

		for (const className in this.document) {
			const classData = this.document[className];
			// Extract the short class name from the first function signature (e.g. "GameEvents.Subscribe(...)" -> "GameEvents")
			let shortName = className;
			for (const funName in classData) {
				const funInfo = classData[funName];
				if (funInfo.Signature) {
					const dotIdx = funInfo.Signature.indexOf('.');
					if (dotIdx > 0) {
						shortName = funInfo.Signature.substring(0, dotIdx);
					}
				}
				break;
			}

			const classPriority = classSortPrefix(shortName);

			// Class name completion (e.g. $, Game, GameEvents, Particles)
			if (!classShortNames.has(shortName)) {
				classShortNames.add(shortName);
				this.classNameNormalize.set(shortName.toLowerCase(), shortName);
				let classItem = new vscode.CompletionItem(shortName, vscode.CompletionItemKind.Class);
				classItem.detail = `${DOTA_LABEL} — ${className}`;
				classItem.sortText = `!0_${classPriority}_${shortName}`;
				this.globalSnippets.push(classItem);
			}

			/** Dedup: dot-context method name -> already added (within the same shortName) */
			const existingMethods = this.classMethodMap.get(shortName);
			const dotMethodAdded = new Set<string>();
			if (existingMethods) {
				existingMethods.forEach(item => dotMethodAdded.add(item.label as string));
			}

			const methodItems: vscode.CompletionItem[] = existingMethods || [];

			for (const funName in classData) {
				let funInfo = classData[funName];
				if (funInfo.Function) {
					// ===== dot context (Game. -> Time): dedup within the same shortName =====
					if (!dotMethodAdded.has(funName)) {
						dotMethodAdded.add(funName);
						let dotItem = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Method);
						dotItem.detail = `${DOTA_LABEL} — ${funInfo.Description || ''}`;
						dotItem.documentation = this.getDocumentation(funInfo, shortName);
						dotItem.insertText = this.buildMethodSnippet(funInfo);
						dotItem.sortText = `0_${funName}`;
						methodItems.push(dotItem);
					}

					// ===== global context (time -> Game.Time()): keep only one =====
					if (!globalFunctionAdded.has(funName)) {
						globalFunctionAdded.add(funName);
						const displayPrefix = shortName + '.';
						let globalItem = new vscode.CompletionItem(
							{ label: funName, description: displayPrefix + funName },
							vscode.CompletionItemKind.Method
						);
						globalItem.detail = `${DOTA_LABEL}`;
						globalItem.documentation = this.getDocumentation(funInfo, shortName);
						globalItem.insertText = this.buildFullSnippet(funInfo);
						globalItem.filterText = funName;
						globalItem.sortText = `!1_${classPriority}_${funName}`;
						this.globalSnippets.push(globalItem);
					}
				}
				else if (funInfo.Enumerator) {
					let item = new vscode.CompletionItem(funName, vscode.CompletionItemKind.Enum);
					item.detail = `${DOTA_LABEL} — ${funInfo.Value || ''}`;
					item.documentation = this.getDocumentation(funInfo);
					item.insertText = funInfo.Enumerator;
					item.sortText = `!2_${funName}`;
					this.globalSnippets.push(item);
				}
			}

			if (!existingMethods && methodItems.length > 0) {
				this.classMethodMap.set(shortName, methodItems);
			}
		}
	}

	getDocumentation(funInfo: JsFunction, shortName?: string) {
		let sigDisplay = funInfo.Signature || funInfo.Enumerator || '';
		// The $ class signature has no $. prefix; add it for readability
		if (shortName === '$' && funInfo.Function && !sigDisplay.startsWith('$.')) {
			sigDisplay = '$.' + sigDisplay;
		}
		let detail = '```js\n' + sigDisplay + '\n```';
		if (funInfo.Description) {
			detail += '\n\n' + funInfo.Description;
		}
		return new vscode.MarkdownString(detail);
	}

	/** Parse the parameter portion of the Signature into clean parameter names.
	 *  Signatures look like "Game.GetGameTime( number a, string b )" — params are "type name"
	 *  pairs; we keep just the name and tidy the dump's "_arg_1" placeholders to "arg1". */
	private parseParams(signature: string): string[] {
		const parenStart = signature.indexOf('(');
		if (parenStart < 0) { return []; }
		const parenEnd = signature.lastIndexOf(')');
		if (parenEnd <= parenStart) { return []; }
		const paramsStr = signature.substring(parenStart + 1, parenEnd).trim();
		if (!paramsStr || paramsStr === '...') { return []; }
		return paramsStr.split(',').map(p => {
			const parts = p.trim().split(/\s+/).filter(Boolean);
			const name = (parts.length > 1 ? parts[parts.length - 1] : parts[0]) || '';
			return name.replace(/^_arg_/, 'arg');
		}).filter(p => p.length > 0);
	}

	/** Build the "(${1:p1}, ${2:p2})" tab-stop list (or "()" when there are no params). */
	private buildParamList(params: string[]): string {
		if (params.length === 0) { return '()'; }
		return '(' + params.map((name, i) => '${' + (i + 1) + ':' + name + '}').join(', ') + ')';
	}

	/** dot context: insert just the method call (the part after the class prefix), e.g. after
	 *  "Game." -> "GetGameTime()", after "$." -> "Msg(${1:arg1})". Every signature includes the
	 *  "Class." prefix (incl. "$.Msg(...)"), so we strip up to the last dot before the paren. */
	private buildMethodSnippet(funInfo: JsFunction): vscode.SnippetString {
		if (!funInfo.Signature) { return new vscode.SnippetString(''); }
		const sig = funInfo.Signature;
		const parenStart = sig.indexOf('(');
		const callPart = parenStart >= 0 ? sig.substring(0, parenStart) : sig;
		const dotIdx = callPart.lastIndexOf('.');
		const methodName = (dotIdx >= 0 ? callPart.substring(dotIdx + 1) : callPart).trim();
		if (parenStart < 0) { return new vscode.SnippetString(methodName); }
		return new vscode.SnippetString(methodName + this.buildParamList(this.parseParams(sig)));
	}

	/** global context: insert the full call straight from the signature prefix, e.g.
	 *  "Game.GetGameTime()" or "$.Msg(${1:arg1})". */
	private buildFullSnippet(funInfo: JsFunction): vscode.SnippetString {
		if (!funInfo.Signature) { return new vscode.SnippetString(''); }
		const sig = funInfo.Signature;
		const parenStart = sig.indexOf('(');
		if (parenStart < 0) { return new vscode.SnippetString(sig.trim()); }
		const callName = sig.substring(0, parenStart).trim(); // "Game.GetGameTime" or "$.Msg"
		return new vscode.SnippetString(callName + this.buildParamList(this.parseParams(sig)));
	}

	/** Heuristic: is the cursor inside a string literal or a line comment on this line?
	 *  Prevents Dota completions from popping up inside "..."/'...'/`...` or after //. */
	private inStringOrComment(line: string): boolean {
		let quote: string | null = null;
		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (quote) {
				if (ch === '\\') { i++; continue; }
				if (ch === quote) { quote = null; }
			} else if (ch === '"' || ch === "'" || ch === '`') {
				quote = ch;
			} else if (ch === '/' && line[i + 1] === '/') {
				return true;
			}
		}
		return quote !== null;
	}

	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		const lineText = document.lineAt(position.line).text.substring(0, position.character);
		// Don't offer Dota completions inside strings or comments.
		if (this.inStringOrComment(lineText)) { return; }
		// Match "ClassName." OR "ClassName.partialMethod" ($ is not \w, so handle it explicitly).
		// Capturing the partial after the dot is what fixes "$.M" + Tab producing "$.$.Msg(...)":
		// without it the line didn't end in "." so we fell through to the global (prefixed)
		// snippets, which were then inserted on top of the "$." the user had already typed.
		const dotMatch = lineText.match(/([\w$]+)\.\s*(\w*)$/);

		if (dotMatch) {
			const typedPrefix = dotMatch[1];
			// Case-insensitive lookup: game. -> Game, gameevents. -> GameEvents
			const normalizedName = this.classNameNormalize.get(typedPrefix.toLowerCase());
			if (normalizedName) {
				const methods = this.classMethodMap.get(normalizedName);
				if (methods) {
					// Replace the whole "Class.partial" span and always emit "CorrectClass.method(...)".
					// One code path fixes both wrong-case prefixes (game -> Game) and the prefix
					// duplication when a partial method name is already typed after the dot.
					const replaceRange = new vscode.Range(
						new vscode.Position(position.line, position.character - dotMatch[0].length),
						position,
					);
					return methods.map(item => {
						const label = item.label as string;
						const fixed = new vscode.CompletionItem(item.label, item.kind);
						fixed.detail = item.detail;
						fixed.documentation = item.documentation;
						fixed.sortText = item.sortText;
						fixed.insertText = this.prependClassSnippet(normalizedName, item.insertText as vscode.SnippetString);
						fixed.range = replaceRange;
						// Filter against "typedPrefix.method" so the typed "Class.partial" still matches
						// even though the replace range now covers the class prefix as well.
						fixed.filterText = `${typedPrefix}.${label}`;
						return fixed;
					});
				}
			}
			// Не Dota 2 класс -> не мешаем
			return [];
		}

		return this.globalSnippets;
	}

	/** Создаёт snippet: "CorrectClassName.MethodSnippet" */
	private prependClassSnippet(className: string, methodSnippet: vscode.SnippetString): vscode.SnippetString {
		return new vscode.SnippetString(className + '.' + methodSnippet.value);
	}
}