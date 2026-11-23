import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { CelluleType, ResultMethod } from '../../../../src/server/constant/Board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function delLine_valide() {
	// Arrange
	const board = Board.create();
	const indexLine = 5;
	const piece = new Piece('O', { x: indexLine, y: 4 });

	board.addPiece(piece, piece.position);
	// ligne 5 : colonnes 4 et 5 sont maintenant PIECE

	if (SHOW_LOGS) console.log(`=== AVANT delLine(${indexLine}) ===`);
	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	if (SHOW_LOGS) {
		console.log(`board[${indexLine}][4] = ${board.board[indexLine]?.[4]} (attendu: ${CelluleType.PIECE})`);
		console.log(`board[${indexLine}][5] = ${board.board[indexLine]?.[5]} (attendu: ${CelluleType.PIECE})`);
	}

	const rowBefore = board.board[indexLine]!;
	expect(rowBefore[4]).toBe(CelluleType.PIECE);
	expect(rowBefore[5]).toBe(CelluleType.PIECE);

	// Act
	const res = board.delLine(indexLine);

	if (SHOW_LOGS) console.log(`=== APRES delLine(${indexLine}) ===`);
	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	if (SHOW_LOGS) {
		console.log(`res = ${res} (attendu: ${ResultMethod.SUCCESS})`);
		console.log(`board[${indexLine}][4] = ${board.board[indexLine]?.[4]} (attendu: ${CelluleType.EMPTY})`);
		console.log(`board[${indexLine}][5] = ${board.board[indexLine]?.[5]} (attendu: ${CelluleType.EMPTY})`);
	}

	// Assert
	const rowAfter = board.board[indexLine]!;
	expect(res).toBe(ResultMethod.SUCCESS);
	// cellules interieures videes
	expect(rowAfter[4]).toBe(CelluleType.EMPTY);
	expect(rowAfter[5]).toBe(CelluleType.EMPTY);
	// murs preserves
	expect(rowAfter[0]).toBe(CelluleType.WALL);
	expect(rowAfter[board.realWidth - 1]).toBe(CelluleType.WALL);
}

function delLine_invalide() {
	// Arrange
	const board = Board.create();
	const overflowMax = board.realHeight - 1; // = 23, mur du bas
	const overflowMin = 0; // = 0,  mur du haut

	if (SHOW_LOGS) {
		console.log(`=== delLine invalide ===`);
		console.log(`overflowMax = ${overflowMax} (attendu: ERROR)`);
		console.log(`overflowMin = ${overflowMin} (attendu: ERROR)`);
	}

	// Act
	const res_MAX = board.delLine(overflowMax);
	const res_MIN = board.delLine(overflowMin);
	const res_MAX_WithOutVerif = board.delLine(5000, false);
	const res_MIN_WithOutVerif = board.delLine(-1, false);

	if (SHOW_LOGS) {
		console.log(`res_MAX = ${res_MAX} (attendu: ${ResultMethod.ERROR})`);
		console.log(`res_MIN = ${res_MIN} (attendu: ${ResultMethod.ERROR})`);
	}

	// Assert
	expect(res_MAX).toBe(ResultMethod.ERROR);
	expect(res_MIN).toBe(ResultMethod.ERROR);
	expect(res_MAX_WithOutVerif).toBe(ResultMethod.ERROR);
	expect(res_MIN_WithOutVerif).toBe(ResultMethod.ERROR);
}

export function test_delLine(): void {
	it('delLine valide   : res SUCCESS', delLine_valide);
	it('delLine invalide : res ERROR', delLine_invalide);
}
