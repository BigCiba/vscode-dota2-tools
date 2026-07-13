/* eslint-disable @typescript-eslint/naming-convention -- Formula functions and operator tokens intentionally use their public syntax names. */
export type FormulaPrimitive = string | number | boolean | null;
export interface FormulaContext { rowId: string; rowIndex: number; row: Record<string, string>; resolveCell(reference: string): FormulaPrimitive; }
type Node = { type: 'literal'; value: FormulaPrimitive } | { type: 'identifier'; name: string } | { type: 'cell'; reference: string } | { type: 'unary'; operator: string; value: Node } | { type: 'binary'; operator: string; left: Node; right: Node } | { type: 'conditional'; test: Node; consequent: Node; alternate: Node } | { type: 'call'; name: string; args: Node[] };
interface Token { kind: 'number' | 'string' | 'identifier' | 'cell' | 'operator' | 'punctuation' | 'eof'; value: string; position: number; }
const functions: Record<string, (...args: FormulaPrimitive[]) => FormulaPrimitive> = {
	ABS: value => Math.abs(toNumber(value)), CEIL: value => Math.ceil(toNumber(value)), FLOOR: value => Math.floor(toNumber(value)),
	ROUND: (value, digits = 0) => { const scale = 10 ** toNumber(digits); return Math.round(toNumber(value) * scale) / scale; },
	MIN: (...values) => Math.min(...values.map(toNumber)), MAX: (...values) => Math.max(...values.map(toNumber)),
	POW: (left, right) => Math.pow(toNumber(left), toNumber(right)), SQRT: value => Math.sqrt(toNumber(value)),
	NUMBER: value => toNumber(value), STRING: value => String(value ?? ''), LOWER: value => String(value ?? '').toLowerCase(),
	UPPER: value => String(value ?? '').toUpperCase(), TRIM: value => String(value ?? '').trim(),
	LEN: value => String(value ?? '').length, CONCAT: (...values) => values.map(value => String(value ?? '')).join(''),
	IF: (condition, truthy, falsy) => Boolean(condition) ? truthy : falsy,
};
export function parseSafeFormula(formula: string): Node {
	const source = formula.trim().replace(/^=/, '');
	if (!source) {throw new Error('公式不能为空。');}
	return new Parser(tokenize(source)).parse();
}
export function validateSafeFormula(formula: string): { compatible: boolean; error?: string } {
	try { parseSafeFormula(formula); return { compatible: true }; }
	catch (error) { return { compatible: false, error: error instanceof Error ? error.message : String(error) }; }
}
export function evaluateSafeFormula(formula: string, context: FormulaContext, budget = 1000): FormulaPrimitive {
	let remaining = budget;
	const visit = (node: Node): FormulaPrimitive => {
		if (--remaining < 0) {throw new Error('公式计算超过复杂度限制。');}
		switch (node.type) {
			case 'literal': return node.value;
			case 'cell': return context.resolveCell(node.reference);
			case 'identifier':
				if (node.name === 'rowId') {return context.rowId;}
				if (node.name === 'rowIndex') {return context.rowIndex;}
				if (node.name === 'rowNumber') {return context.rowIndex + 1;}
				if (node.name === 'true' || node.name === 'false') {return node.name === 'true';}
				if (node.name === 'null') {return null;}
				if (Object.prototype.hasOwnProperty.call(context.row, node.name)) {return context.row[node.name];}
				throw new Error(`不允许的变量：${node.name}`);
			case 'unary': { const value = visit(node.value); return node.operator === '!' ? !Boolean(value) : node.operator === '-' ? -toNumber(value) : toNumber(value); }
			case 'conditional': return Boolean(visit(node.test)) ? visit(node.consequent) : visit(node.alternate);
			case 'call': { const fn = functions[node.name.toUpperCase()]; if (!fn) {throw new Error(`不允许的函数：${node.name}`);} return fn(...node.args.map(visit)); }
			case 'binary': return binary(node.operator, visit(node.left), () => visit(node.right));
		}
	};
	return visit(parseSafeFormula(formula));
}
function binary(operator: string, left: FormulaPrimitive, rightValue: () => FormulaPrimitive): FormulaPrimitive {
	if (operator === '&&') {return Boolean(left) ? rightValue() : left;}
	if (operator === '||') {return Boolean(left) ? left : rightValue();}
	const right = rightValue();
	switch (operator) {
		case '+': return typeof left === 'string' || typeof right === 'string' ? String(left ?? '') + String(right ?? '') : toNumber(left) + toNumber(right);
		case '-': return toNumber(left) - toNumber(right); case '*': return toNumber(left) * toNumber(right);
		case '/': { const value = toNumber(right); if (!value) {throw new Error('不能除以零。');} return toNumber(left) / value; }
		case '%': { const value = toNumber(right); if (!value) {throw new Error('不能除以零。');} return toNumber(left) % value; }
		case '**': return Math.pow(toNumber(left), toNumber(right));
		case '==': case '===': return left === right || String(left) === String(right);
		case '!=': case '!==': return !(left === right || String(left) === String(right));
		case '<': return compare(left, right) < 0; case '<=': return compare(left, right) <= 0; case '>': return compare(left, right) > 0; case '>=': return compare(left, right) >= 0;
		default: throw new Error(`不允许的运算符：${operator}`);
	}
}
function compare(left: FormulaPrimitive, right: FormulaPrimitive): number { const l = typeof left === 'number' ? left : String(left ?? ''); const r = typeof right === 'number' ? right : String(right ?? ''); return l < r ? -1 : l > r ? 1 : 0; }
function toNumber(value: FormulaPrimitive): number { const result = typeof value === 'number' ? value : Number(value); if (!Number.isFinite(result)) {throw new Error(`无法转换为数字：${String(value)}`);} return result; }
function tokenize(source: string): Token[] {
	const tokens: Token[] = []; let index = 0;
	while (index < source.length) {
		const start = index; const char = source[index];
		if (/\s/u.test(char)) { index++; continue; }
		if (/[0-9]/u.test(char) || (char === '.' && /[0-9]/u.test(source[index + 1] ?? ''))) { index++; while (/[0-9.]/u.test(source[index] ?? '')) {index++;} const value = source.slice(start, index); if (!Number.isFinite(Number(value))) {throw new Error(`位置 ${start + 1} 的数字无效。`);} tokens.push({ kind: 'number', value, position: start }); continue; }
		if (char === '"' || char === "'") { const quote = char; index++; let value = ''; while (index < source.length && source[index] !== quote) { if (source[index] === '\\') { index++; const escaped = source[index]; value += escaped === 'n' ? '\n' : escaped === 't' ? '\t' : escaped; index++; } else {value += source[index++];} } if (source[index] !== quote) {throw new Error(`位置 ${start + 1} 的字符串没有结束。`);} index++; tokens.push({ kind: 'string', value, position: start }); continue; }
		if (char === '$' || /[A-Z]/u.test(char)) {
			const match = /^\$?[A-Z]{1,3}\$?[1-9][0-9]*/u.exec(source.slice(index));
			if (match) { tokens.push({ kind: 'cell', value: match[0], position: start }); index += match[0].length; continue; }
		}		if (/[A-Za-z_]/u.test(char)) { index++; while (/[A-Za-z0-9_]/u.test(source[index] ?? '')) {index++;} const value = source.slice(start, index); tokens.push({ kind: /^[A-Z]{1,3}[1-9][0-9]*$/u.test(value) ? 'cell' : 'identifier', value, position: start }); continue; }
		const triple = source.slice(index, index + 3); const pair = source.slice(index, index + 2);
		if (['===', '!=='].includes(triple)) { tokens.push({ kind: 'operator', value: triple, position: start }); index += 3; continue; }
		if (['&&', '||', '<=', '>=', '==', '!=', '**'].includes(pair)) { tokens.push({ kind: 'operator', value: pair, position: start }); index += 2; continue; }
		if ('+-*/%!<>'.includes(char)) { tokens.push({ kind: 'operator', value: char, position: start }); index++; continue; }
		if ('(),?:'.includes(char)) { tokens.push({ kind: 'punctuation', value: char, position: start }); index++; continue; }
		throw new Error(`位置 ${start + 1} 包含不允许的字符：${char}`);
	}
	tokens.push({ kind: 'eof', value: '', position: source.length }); return tokens;
}
class Parser {
	private index = 0; constructor(private readonly tokens: Token[]) {}
	parse(): Node { const value = this.conditional(); if (this.current().kind !== 'eof') {throw new Error(`位置 ${this.current().position + 1} 存在多余内容。`);} return value; }
	private conditional(): Node { let test = this.expression(0); if (this.match('?')) { const consequent = this.conditional(); this.consume(':'); test = { type: 'conditional', test, consequent, alternate: this.conditional() }; } return test; }
	private expression(minimum: number): Node { let left = this.unary(); const levels: Record<string, number> = { '||': 1, '&&': 2, '==': 3, '===': 3, '!=': 3, '!==': 3, '<': 4, '<=': 4, '>': 4, '>=': 4, '+': 5, '-': 5, '*': 6, '/': 6, '%': 6, '**': 7 }; while (this.current().kind === 'operator' && (levels[this.current().value] ?? -1) >= minimum) { const operator = this.advance().value; const level = levels[operator]; left = { type: 'binary', operator, left, right: this.expression(level + (operator === '**' ? 0 : 1)) }; } return left; }
	private unary(): Node { if (this.current().kind === 'operator' && ['!', '+', '-'].includes(this.current().value)) {return { type: 'unary', operator: this.advance().value, value: this.unary() };} return this.primary(); }
	private primary(): Node { const token = this.advance(); if (token.kind === 'number') {return { type: 'literal', value: Number(token.value) };} if (token.kind === 'string') {return { type: 'literal', value: token.value };} if (token.kind === 'cell') {return { type: 'cell', reference: token.value };} if (token.kind === 'identifier') { if (!this.match('(')) {return { type: 'identifier', name: token.value };} const args: Node[] = []; if (!this.match(')')) { do {args.push(this.conditional());} while (this.match(',')); this.consume(')'); } return { type: 'call', name: token.value, args }; } if (token.value === '(') { const value = this.conditional(); this.consume(')'); return value; } throw new Error(`位置 ${token.position + 1} 缺少表达式。`); }
	private current(): Token { return this.tokens[this.index]; } private advance(): Token { return this.tokens[this.index++]; }
	private match(value: string): boolean { if (this.current().value !== value) {return false;} this.index++; return true; }
	private consume(value: string): void { if (!this.match(value)) {throw new Error(`位置 ${this.current().position + 1} 需要 “${value}”。`);} }
}
