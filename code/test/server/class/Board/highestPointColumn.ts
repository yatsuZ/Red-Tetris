import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { CelluleType, StateLine } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { show_board } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function highestPointColumn_error() {
	// create
	const board = Board.create();

	// Verif
	const results = board.highestPointColumn(0);

	// Assert
	expect(results).toBe(-1);
	//
	// create
	(board as any).real_height = 30;
	expect(board.highestPointColumn(1)).toBe(-1);
}

function highestPointColumn_test() {
	// create
	const board = Board.create();
	const piece = new Piece('.', { x: 0, y: 0 });

	// Act
	for (let i = 1; i < board.real_width - 2; i++) {
		if (SHOW_BOARD) show_board(board.board, 'ASCII');

		const x = board.real_height - 1 - i;
		board.addPiece(piece, { x: x, y: i });
	}
	const index_x = board.real_height - board.real_width + 1;
	board.addPiece(piece, { x: index_x, y: board.real_width - 2 });
	if (SHOW_BOARD) show_board(board.board, 'ASCII');

	// Verif
	for (let i = 1; i < board.real_width - 1; i++) {
		const results = board.highestPointColumn(i);

		if (SHOW_LOGS) console.log('result = ' + results);
		expect(results).toBe(board.real_height - 1 - i);
	}
}

function highestPointColumn_nothing() {
	// create
	const board = Board.create();

	// Verif
	const results = board.highestPointColumn(1);

	// Assert
	expect(results).toBe(board.real_height - 1);
}

export function test_highestPointColumn(): void {
	it('highestPointColumn ERROR', highestPointColumn_error);
	it('highestPointColumn floor', highestPointColumn_nothing);
	it('highestPointColumn functioning normally', highestPointColumn_test);
}
