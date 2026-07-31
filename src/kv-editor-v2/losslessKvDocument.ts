export interface KvTextReplacement { start: number; end: number; text: string; }
interface Token { kind: 'value' | 'open' | 'close'; start: number; end: number; value: string; }
interface KvFieldRange { keyToken: Token; valueToken: Token; start: number; end: number; }
interface KvBlockRange { start: number; end: number; }
interface KvRowRange {
	keyToken: Token;
	openToken: Token;
	closeToken: Token;
	fields: Map<string, KvFieldRange>;
	blocks: Map<string, KvBlockRange>;
	start: number;
	end: number;
}

/**
 * Conservative source index for root -> row -> fields KV documents.
 * Unsupported shapes fail explicitly instead of falling back to full serialization.
 */
export class KvDocumentModel {
	private readonly rows = new Map<string, KvRowRange>();
	private readonly eol: string;
	private constructor(private readonly source: string) {
		this.eol = source.includes('\r\n') ? '\r\n' : '\n';
		this.indexRows(tokenize(source));
	}
	static parse(source: string): KvDocumentModel { return new KvDocumentModel(source); }

	hasRow(rowId: string): boolean { return this.rows.has(rowId); }

	renameRow(rowId: string, newRowId: string): KvTextReplacement {
		const row = this.requireRow(rowId);
		if (this.rows.has(newRowId)) {throw new Error(`行 ID “${newRowId}” 已存在。`);}
		return replaceToken(row.keyToken, newRowId);
	}

	editScalar(rowId: string, columnKey: string, value: string): KvTextReplacement {
		const row = this.requireRow(rowId);
		const field = row.fields.get(columnKey);
		if (field) {return replaceToken(field.valueToken, value);}
		return this.insertScalarAtEnd(row, columnKey, value);
	}

	editScalarOrdered(rowId: string, columnKey: string, value: string, columnOrder: string[]): KvTextReplacement {
		const row = this.requireRow(rowId);
		const field = row.fields.get(columnKey);
		if (field) {return replaceToken(field.valueToken, value);}
		const columnIndex = columnOrder.indexOf(columnKey);
		if (columnIndex < 0) {return this.insertScalarAtEnd(row, columnKey, value);}
		for (let index = columnIndex + 1; index < columnOrder.length; index++) {
			const anchor = row.fields.get(columnOrder[index]);
			if (anchor) {return this.insertScalarBeside(row, columnKey, value, anchor, 'before');}
		}
		for (let index = columnIndex - 1; index >= 0; index--) {
			const anchor = row.fields.get(columnOrder[index]);
			if (anchor) {return this.insertScalarBeside(row, columnKey, value, anchor, 'after');}
		}
		return this.insertScalarAtEnd(row, columnKey, value);
	}

	hasScalar(rowId: string, columnKey: string): boolean { return this.requireRow(rowId).fields.has(columnKey); }

	insertScalarRelative(rowId: string, columnKey: string, value: string, anchorColumnKey: string, position: 'before' | 'after'): KvTextReplacement {
		const row = this.requireRow(rowId);
		if (row.fields.has(columnKey)) {throw new Error(`字段 “${columnKey}” 已存在于行 “${rowId}”。`);}
		const anchor = row.fields.get(anchorColumnKey);
		if (!anchor) {return this.insertScalarAtEnd(row, columnKey, value);}
		return this.insertScalarBeside(row, columnKey, value, anchor, position);
	}
	insertRow(anchorRowId: string, position: 'before' | 'after', rowId: string, values: Record<string, string>): KvTextReplacement {
		if (this.rows.has(rowId)) {throw new Error(`行 ID “${rowId}” 已存在。`);}
		const anchor = this.requireRow(anchorRowId);
		const indentation = this.source.slice(lineStart(this.source, anchor.keyToken.start), anchor.keyToken.start);
		const innerIndentation = indentation + '\t';
		const fields = Object.entries(values).map(([key, value]) => `${innerIndentation}"${escapeKv(key)}"\t"${escapeKv(value)}"${this.eol}`).join('');
		const text = `${indentation}"${escapeKv(rowId)}"${this.eol}${indentation}{${this.eol}${fields}${indentation}}${this.eol}`;
		const insertion = position === 'before' ? anchor.start : anchor.end;
		return { start: insertion, end: insertion, text };
	}
	insertRowsText(anchorRowId: string, position: 'before' | 'after', text: string): KvTextReplacement {
		const anchor = this.requireRow(anchorRowId);
		const insertion = position === 'before' ? anchor.start : anchor.end;
		return { start: insertion, end: insertion, text: normalizeLineEndings(text, this.eol) };
	}

	replaceObjectBlock(rowId: string, columnKey: string, text: string): KvTextReplacement {
		const row = this.requireRow(rowId);
		const block = row.blocks.get(columnKey);
		if (block) {return { start: block.start, end: block.end, text: normalizeLineEndings(text, this.eol) };}
		if (!text) {return { start: row.closeToken.start, end: row.closeToken.start, text: '' };}
		const closeLineStart = lineStart(this.source, row.closeToken.start);
		return { start: closeLineStart, end: closeLineStart, text: normalizeLineEndings(text, this.eol) };
	}
	deleteNestedField(rowId: string, blockKey: string, fieldKey: string): KvTextReplacement | undefined {
		const block = this.requireRow(rowId).blocks.get(blockKey);
		if (!block) {return undefined;}
		const tokens = tokenize(this.source).filter((token) => token.start >= block.start && token.end <= block.end);
		let depth = 0;
		for (let index = 0; index < tokens.length; index++) {
			const token = tokens[index];
			if (token.kind === 'open') { depth++; continue; }
			if (token.kind === 'close') { depth--; continue; }
			if (depth !== 1 || token.value !== fieldKey) {continue;}
			const value = tokens[index + 1];
			if (value?.kind === 'value') {return { start: lineStart(this.source, token.start), end: lineEnd(this.source, value.end), text: '' };}
			if (value?.kind !== 'open') {return undefined;}
			let nestedDepth = 1;
			for (let nestedIndex = index + 2; nestedIndex < tokens.length; nestedIndex++) {
				if (tokens[nestedIndex].kind === 'open') {nestedDepth++;}
				else if (tokens[nestedIndex].kind === 'close' && --nestedDepth === 0) {
					return { start: lineStart(this.source, token.start), end: lineEnd(this.source, tokens[nestedIndex].end), text: '' };
				}
			}
			return undefined;
		}
		return undefined;
	}

	deleteRows(rowIds: string[]): KvTextReplacement[] {
		return [...new Set(rowIds)].map((rowId) => {
			const row = this.requireRow(rowId);
			return { start: row.start, end: row.end, text: '' };
		});
	}

	moveRow(rowId: string, anchorRowId: string, position: 'before' | 'after'): KvTextReplacement[] {
		if (rowId === anchorRowId) {return [];}
		const row = this.requireRow(rowId);
		const anchor = this.requireRow(anchorRowId);
		const text = this.source.slice(row.start, row.end);
		const insertion = position === 'before' ? anchor.start : anchor.end;
		return [
			{ start: row.start, end: row.end, text: '' },
			{ start: insertion, end: insertion, text },
		];
	}

	moveScalar(rowId: string, columnKey: string, anchorColumnKey: string, position: 'before' | 'after'): KvTextReplacement[] {
		if (columnKey === anchorColumnKey) {return [];}
		const row = this.requireRow(rowId);
		const field = row.fields.get(columnKey);
		const anchor = row.fields.get(anchorColumnKey);
		if (!field || !anchor) {return [];}
		const text = this.source.slice(field.start, field.end);
		const insertion = position === 'before' ? anchor.start : anchor.end;
		return [{ start: field.start, end: field.end, text: '' }, { start: insertion, end: insertion, text }];
	}
	deleteScalar(rowId: string, columnKey: string): KvTextReplacement | undefined {
		const field = this.requireRow(rowId).fields.get(columnKey);
		return field ? { start: field.start, end: field.end, text: '' } : undefined;
	}

	private insertScalarAtEnd(row: KvRowRange, columnKey: string, value: string): KvTextReplacement {
		const closeLineStart = lineStart(this.source, row.closeToken.start);
		const closeSharesLine = this.source.slice(closeLineStart, row.closeToken.start).trim().length > 0;
		if (closeSharesLine) {
			return { start: row.closeToken.start, end: row.closeToken.start, text: ` "${escapeKv(columnKey)}" "${escapeKv(value)}" ` };
		}
		const closeIndent = this.source.slice(closeLineStart, row.closeToken.start);
		return {
			start: closeLineStart,
			end: closeLineStart,
			text: `${closeIndent}\t"${escapeKv(columnKey)}"\t"${escapeKv(value)}"${this.eol}`,
		};
	}

	private insertScalarBeside(row: KvRowRange, columnKey: string, value: string, anchor: KvFieldRange, position: 'before' | 'after'): KvTextReplacement {
		const indentation = this.source.slice(lineStart(this.source, anchor.keyToken.start), anchor.keyToken.start);
		const text = `${indentation}"${escapeKv(columnKey)}"\t"${escapeKv(value)}"${this.eol}`;
		const insertion = position === 'before' ? anchor.start : anchor.end;
		return { start: insertion, end: insertion, text };
	}

	private requireRow(rowId: string): KvRowRange {
		const row = this.rows.get(rowId);
		if (!row) {throw new Error(`无法在源文本中安全定位行 “${rowId}”。`);}
		return row;
	}

	private indexRows(tokens: Token[]): void {
		let depth = 0;
		let rootDepth = -1;
		for (let index = 0; index < tokens.length; index++) {
			const token = tokens[index];
			if (token.kind === 'open') { depth++; if (rootDepth < 0) {rootDepth = depth;} continue; }
			if (token.kind === 'close') { depth--; continue; }
			const openToken = tokens[index + 1];
			if (depth !== rootDepth || openToken?.kind !== 'open') {continue;}
			const row: KvRowRange = {
				keyToken: token, openToken, closeToken: openToken, fields: new Map(), blocks: new Map(),
				start: lineStart(this.source, token.start), end: openToken.end,
			};
			const rowDepth = depth + 1;
			index += 2;
			depth++;
			for (; index < tokens.length; index++) {
				const current = tokens[index];
				if (current.kind === 'open') { depth++; continue; }
				if (current.kind === 'close') {
					depth--;
					if (depth < rowDepth) {
						row.closeToken = current;
						row.end = lineEnd(this.source, current.end);
						break;
					}
					continue;
				}
				const valueToken = tokens[index + 1];
				if (depth === rowDepth && valueToken?.kind === 'open') {
					let nestedDepth = 1;
					for (let nestedIndex = index + 2; nestedIndex < tokens.length; nestedIndex++) {
						if (tokens[nestedIndex].kind === 'open') {nestedDepth++;}
						else if (tokens[nestedIndex].kind === 'close' && --nestedDepth === 0) {
							row.blocks.set(current.value, { start: lineStart(this.source, current.start), end: lineEnd(this.source, tokens[nestedIndex].end) });
							break;
						}
					}
				}
				if (depth === rowDepth && valueToken?.kind === 'value') {
					const start = lineStart(this.source, current.start);
					row.fields.set(current.value, { keyToken: current, valueToken, start, end: lineEnd(this.source, valueToken.end) });
					index++;
				}
			}
			this.rows.set(token.value, row);
		}
	}
}

function normalizeLineEndings(value: string, eol: string): string {
	return value.replace(/\r?\n/gu, eol);
}
function replaceToken(token: Token, value: string): KvTextReplacement {
	return { start: token.start, end: token.end, text: `"${escapeKv(value)}"` };
}
function lineStart(source: string, offset: number): number {
	const previous = source.lastIndexOf('\n', Math.max(0, offset - 1));
	return previous < 0 ? 0 : previous + 1;
}
function lineEnd(source: string, offset: number): number {
	const next = source.indexOf('\n', offset);
	return next < 0 ? source.length : next + 1;
}
function escapeKv(value: string): string {
	return value.replace(/\\/gu, '\\\\').replace(/"/gu, '\\"').replace(/\r/gu, '\\r').replace(/\n/gu, '\\n').replace(/\t/gu, '\\t');
}
function tokenize(source: string): Token[] {
	const tokens: Token[] = [];
	let index = 0;
	while (index < source.length) {
		const char = source[index];
		if (/\s/u.test(char)) { index++; continue; }
		if (char === '/' && source[index + 1] === '/') { index += 2; while (index < source.length && source[index] !== '\n') {index++;} continue; }
		if (char === '/' && source[index + 1] === '*') { const end = source.indexOf('*/', index + 2); index = end < 0 ? source.length : end + 2; continue; }
		if (char === '{' || char === '}') { tokens.push({ kind: char === '{' ? 'open' : 'close', start: index, end: index + 1, value: char }); index++; continue; }
		if (char === '"') {
			const start = index++; let value = '';
			while (index < source.length && source[index] !== '"') {
				if (source[index] === '\\' && index + 1 < source.length) {
					index++; const escaped = source[index++];
					value += escaped === 'n' ? '\n' : escaped === 't' ? '\t' : escaped === 'r' ? '\r' : escaped;
				} else {value += source[index++];}
			}
			if (source[index] !== '"') {throw new Error(`位置 ${start + 1} 的 KV 字符串没有结束。`);}
			index++; tokens.push({ kind: 'value', start, end: index, value }); continue;
		}
		const start = index;
		while (index < source.length && !/[\s{}]/u.test(source[index])) {index++;}
		tokens.push({ kind: 'value', start, end: index, value: source.slice(start, index) });
	}
	return tokens;
}
