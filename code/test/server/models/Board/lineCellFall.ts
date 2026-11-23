import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { CellType, MethodResult, LineState } from '../../../../src/server/constants/board.js';
import { Piece } from '../../../../src/server/models/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { allLinesAre, isBoardEmpty, isBoardFull } from '../../../../src/server/utils/boardState.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function testLineCellFall_Empty_or_Full() {
	// create
	const board = Board.create();

	expect(MethodResult.FAIL).toBe(board.lineCellFall());

	for (let i = 1; i < board.realHeight - 1; i++) {
		board.addPiece(new Piece('.', { row: 0, col: 0 }), { row: i, col: 1 });
	}
	// if (SHOW_BOARD) showBoard(board.grid, "ASCII");
	expect(MethodResult.FAIL).toBe(board.lineCellFall());
}

function basic_lineCellFall() {
	// create
	const board = Board.create();
	const piece = new Piece('.', { row: 0, col: 0 });

	expect(MethodResult.FAIL).toBe(board.lineCellFall());
	let loop = 0;
	for (let i = 1; i < board.realHeight - 1; i = i + 2) {
		loop++;
		for (let j = 1; j <= board.width; j++) {
			board.addPiece(piece, { row: i, col: j });
		}
	}
	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	while (loop) {
		loop--;
		const res = board.lineCellFall();
		expect(MethodResult.SUCCESS).toBe(res);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}
	expect(MethodResult.FAIL).toBe(board.lineCellFall());
}

export function testLineCellFall(): void {
	it('lineCellFall    : Board vide ou rempli', testLineCellFall_Empty_or_Full);
	it('lineCellFall    : Crée une ligne sous 2 et tout doit tomber', basic_lineCellFall);
}
