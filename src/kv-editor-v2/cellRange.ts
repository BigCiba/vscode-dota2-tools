export interface CellAddress {
	rowId: string;
	columnKey: string;
}

export interface CellRangeSelection {
	anchor: CellAddress;
	focus: CellAddress;
}

export interface ResolvedCellRange {
	anchorRow: number;
	anchorColumn: number;
	focusRow: number;
	focusColumn: number;
	top: number;
	bottom: number;
	left: number;
	right: number;
}

export interface CellRangeVisual {
	selected: boolean;
	anchor: boolean;
	top: boolean;
	right: boolean;
	bottom: boolean;
	left: boolean;
	handle: boolean;
}

export function resolveCellRange(selection: CellRangeSelection | undefined, rowIds: string[], columnKeys: string[]): ResolvedCellRange | undefined {
	if (!selection) {return undefined;}
	const anchorRow = rowIds.indexOf(selection.anchor.rowId);
	const focusRow = rowIds.indexOf(selection.focus.rowId);
	const anchorColumn = columnKeys.indexOf(selection.anchor.columnKey);
	const focusColumn = columnKeys.indexOf(selection.focus.columnKey);
	if (anchorRow < 0 || focusRow < 0 || anchorColumn < 0 || focusColumn < 0) {return undefined;}
	return {
		anchorRow, anchorColumn, focusRow, focusColumn,
		top: Math.min(anchorRow, focusRow), bottom: Math.max(anchorRow, focusRow),
		left: Math.min(anchorColumn, focusColumn), right: Math.max(anchorColumn, focusColumn),
	};
}

export function cellsInRange(selection: CellRangeSelection | undefined, rowIds: string[], columnKeys: string[]): CellAddress[] {
	const range = resolveCellRange(selection, rowIds, columnKeys);
	if (!range) {return [];}
	const cells: CellAddress[] = [];
	for (let row = range.top; row <= range.bottom; row++) {
		for (let column = range.left; column <= range.right; column++) {
			cells.push({ rowId: rowIds[row], columnKey: columnKeys[column] });
		}
	}
	return cells;
}

export function cellsInLinearRange(selection: CellRangeSelection | undefined, rowIds: string[], columnKeys: string[]): CellAddress[] {
	const range = resolveCellRange(selection, rowIds, columnKeys);
	if (!range || (range.anchorRow !== range.focusRow && range.anchorColumn !== range.focusColumn)) {return [];}
	const rowStep = Math.sign(range.focusRow - range.anchorRow);
	const columnStep = Math.sign(range.focusColumn - range.anchorColumn);
	const length = Math.max(Math.abs(range.focusRow - range.anchorRow), Math.abs(range.focusColumn - range.anchorColumn));
	const cells: CellAddress[] = [];
	for (let index = 0; index <= length; index++) {
		cells.push({
			rowId: rowIds[range.anchorRow + rowStep * index],
			columnKey: columnKeys[range.anchorColumn + columnStep * index],
		});
	}
	return cells;
}

export function cellsInFillRange(selection: CellRangeSelection | undefined, rowIds: string[], columnKeys: string[]): CellAddress[] {
	const range = resolveCellRange(selection, rowIds, columnKeys);
	if (!range) {return [];}
	const rowStep = range.focusRow >= range.anchorRow ? 1 : -1;
	const columnStep = range.focusColumn >= range.anchorColumn ? 1 : -1;
	const cells: CellAddress[] = [];
	for (let row = range.anchorRow; row !== range.focusRow + rowStep; row += rowStep) {
		for (let column = range.anchorColumn; column !== range.focusColumn + columnStep; column += columnStep) {
			cells.push({ rowId: rowIds[row], columnKey: columnKeys[column] });
		}
	}
	return cells;
}
export function cellRangeVisual(selection: CellRangeSelection | undefined, cell: CellAddress, rowIds: string[], columnKeys: string[]): CellRangeVisual {
	const range = resolveCellRange(selection, rowIds, columnKeys);
	const row = rowIds.indexOf(cell.rowId);
	const column = columnKeys.indexOf(cell.columnKey);
	const selected = Boolean(range && row >= range.top && row <= range.bottom && column >= range.left && column <= range.right);
	return {
		selected,
		anchor: selected && row === range?.anchorRow && column === range.anchorColumn,
		top: selected && row === range?.top,
		right: selected && column === range?.right,
		bottom: selected && row === range?.bottom,
		left: selected && column === range?.left,
		handle: selected && row === range?.bottom && column === range.right,
	};
}

export function matrixToTsv(matrix: string[][]): string {
	return matrix.map((row) => row.join('\t')).join('\n');
}

export function parseTsv(value: string): string[][] {
	const normalized = value.replace(/\r/gu, '');
	const lines = normalized.split('\n');
	if (lines.length > 1 && lines[lines.length - 1] === '') {lines.pop();}
	return lines.map((line) => line.split('\t'));
}