import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { LineState } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function highestPointColumns_error() {
	// create
	const board = Board.create();
	const columns = [-1, 0, board.realWidth - 1, board.realWidth];
	// Vérification
	const results = board.highestPointsColumns(columns);

	// Assert
	results.map((index) => {
		expect(index.highestPoint).toBe(-1);
	});
}

function highestPointColumns_test() {
	// create
	const board = Board.create();
	const piece = new Piece('.', { row: 0, col: 0 });
	const columns = Array.from({ length: board.realWidth - 2 }, (_, i) => i + 1);

	// Act
	for (let i = 1; i < board.realWidth - 2; i++) {
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');

		const row = board.realHeight - 1 - i;
		board.addPiece(piece, { row, col: i });
	}

	const indexRow = board.realHeight - board.realWidth + 1;
	board.addPiece(piece, { row: indexRow, col: board.realWidth - 2 });

	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');

	// Vérification
	const results = board.highestPointsColumns(columns);
	results.map((res, i) => {
		expect(res.highestPoint).toBe(board.realHeight - (i + 2));
	});
	if (SHOW_LOGS) console.log(results);
}

function highestPointColumn_nothing() {
	// create
	const board = Board.create();
	const columns = Array.from({ length: board.realWidth - 2 }, (_, i) => i + 1);
	// Vérification
	const results = board.highestPointsColumns(columns);

	results.map((index) => {
		expect(index.highestPoint).toBe(board.realHeight - 1);
	});
}

export function test_highestPointsColumns(): void {
	it('highestPointColumns ERROR', highestPointColumns_error);
	it('highestPointColumn functioning normally', highestPointColumns_test);
}
