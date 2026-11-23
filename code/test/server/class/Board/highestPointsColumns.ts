import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { StateLine } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { show_board } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function highestPointColumns_error() {
	// create
	const board = Board.create();
	const columns = [-1, 0, board.real_width - 1, board.real_width];
	// Verif
	const results = board.highestPointsColumns(columns);

	// Assert
	results.map((index) => {
		expect(index.highestPoint).toBe(-1);
	});
}

function highestPointColumns_test() {
	// create
	const board = Board.create();
	const piece = new Piece('.', { x: 0, y: 0 });
	const columns = Array.from({ length: board.real_width - 2 }, (_, i) => i + 1);

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
	const results = board.highestPointsColumns(columns);
	results.map((res, i) => {
		expect(res.highestPoint).toBe(board.real_height - (i + 2));
	});
	if (SHOW_LOGS) console.log(results);
}

function highestPointColumn_nothing() {
	// create
	const board = Board.create();
	const columns = Array.from({ length: board.real_width - 2 }, (_, i) => i + 1);
	// Verif
	const results = board.highestPointsColumns(columns);

	results.map((index) => {
		expect(index.highestPoint).toBe(board.real_height - 1);
	});
}

export function test_highestPointsColumns(): void {
	it('highestPointColumns ERROR', highestPointColumns_error);
	it('highestPointColumn functioning normally', highestPointColumns_test);
}
