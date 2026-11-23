import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { CelluleType, ResultMethod, StateLine } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { allLinesAre } from '../../../../src/server/utils/boardState.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function filledWithlineCellRiseEmpty() {
	// create
	const board = Board.create();

	for (let i = 0; i < board.real_height; i++) {
		const res = board.lineCellRise();
		if (i >= board.real_height - 2) expect(res).toBe(ResultMethod.FAIL);
		else {
			if (SHOW_BOARD) showBoard(board.board, 'ASCII');
			expect(res).toBe(ResultMethod.SUCCESS);
		}
	}
	expect(allLinesAre(board, StateLine.PARTIAL)).toBe(true);
}

function filledWithlineCellRise() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	board.addPiece(piece, { x: 21, y: 1 });

	for (let i = 0; i < board.real_height; i++) {
		const res = board.lineCellRise();
		if (i >= board.real_height - 4) expect(res).toBe(ResultMethod.FAIL);
		else {
			if (SHOW_BOARD) showBoard(board.board, 'ASCII');
			expect(res).toBe(ResultMethod.SUCCESS);
		}
	}
	expect(allLinesAre(board, StateLine.PARTIAL)).toBe(true);
}

function failFilledWithlineCellRise() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	board.addPiece(piece, { x: 1, y: 1 });
	const res = board.lineCellRise();
	expect(res).toBe(ResultMethod.FAIL);
	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
}

export function test_lineCellRise(): void {
	it('lineCellRise    : les ligne monte jusqua n en plus pouvoir', filledWithlineCellRiseEmpty);
	it('lineCellRise    : les ligne font monter avec des ligne pres existante', filledWithlineCellRise);
	it('lineCellRise    : Élément déjà au sommet', failFilledWithlineCellRise);
}
