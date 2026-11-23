import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { CellType, MethodResult } from '../../../../src/server/constant/Board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function clearLineValid() {
	// Arrange
	const board = Board.create();
	const indexLine = 5;
	const piece = new Piece('O', { x: indexLine, y: 4 });

	board.addPiece(piece, piece.position);
	// ligne 5 : colonnes 4 et 5 sont maintenant PIECE

	if (SHOW_LOGS) console.log(`=== AVANT clearLine(${indexLine}) ===`);
	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	if (SHOW_LOGS) {
		console.log(`board[${indexLine}][4] = ${board.grid[indexLine]?.[4]} (attendu: ${CellType.PIECE})`);
		console.log(`board[${indexLine}][5] = ${board.grid[indexLine]?.[5]} (attendu: ${CellType.PIECE})`);
	}

	const rowBefore = board.grid[indexLine]!;
	expect(rowBefore[4]).toBe(CellType.PIECE);
	expect(rowBefore[5]).toBe(CellType.PIECE);

	// Act
	const res = board.clearLine(indexLine);

	if (SHOW_LOGS) console.log(`=== APRES clearLine(${indexLine}) ===`);
	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	if (SHOW_LOGS) {
		console.log(`res = ${res} (attendu: ${MethodResult.SUCCESS})`);
		console.log(`board[${indexLine}][4] = ${board.grid[indexLine]?.[4]} (attendu: ${CellType.EMPTY})`);
		console.log(`board[${indexLine}][5] = ${board.grid[indexLine]?.[5]} (attendu: ${CellType.EMPTY})`);
	}

	// Assert
	const rowAfter = board.grid[indexLine]!;
	expect(res).toBe(MethodResult.SUCCESS);
	// cellules interieures videes
	expect(rowAfter[4]).toBe(CellType.EMPTY);
	expect(rowAfter[5]).toBe(CellType.EMPTY);
	// murs preserves
	expect(rowAfter[0]).toBe(CellType.WALL);
	expect(rowAfter[board.realWidth - 1]).toBe(CellType.WALL);
}

function clearLineInvalid() {
	// Arrange
	const board = Board.create();
	const overflowMax = board.realHeight - 1; // = 23, mur du bas
	const overflowMin = 0; // = 0,  mur du haut

	if (SHOW_LOGS) {
		console.log(`=== clearLine invalide ===`);
		console.log(`overflowMax = ${overflowMax} (attendu: ERROR)`);
		console.log(`overflowMin = ${overflowMin} (attendu: ERROR)`);
	}

	// Act
	const res_MAX = board.clearLine(overflowMax);
	const res_MIN = board.clearLine(overflowMin);
	const res_MAX_WithOutVerif = board.clearLine(5000, false);
	const res_MIN_WithOutVerif = board.clearLine(-1, false);

	if (SHOW_LOGS) {
		console.log(`res_MAX = ${res_MAX} (attendu: ${MethodResult.ERROR})`);
		console.log(`res_MIN = ${res_MIN} (attendu: ${MethodResult.ERROR})`);
	}

	// Assert
	expect(res_MAX).toBe(MethodResult.ERROR);
	expect(res_MIN).toBe(MethodResult.ERROR);
	expect(res_MAX_WithOutVerif).toBe(MethodResult.ERROR);
	expect(res_MIN_WithOutVerif).toBe(MethodResult.ERROR);
}

export function test_clearLine(): void {
	it('clearLine valide   : result SUCCESS', clearLineValid);
	it('clearLine invalide : result ERROR', clearLineInvalid);
}
