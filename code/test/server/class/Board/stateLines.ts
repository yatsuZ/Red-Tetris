import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { StateLine } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

const FULL = [1, 4, 8, 9, 10, 17, 19, 20, 22];
const PARTIAL = [3, 7, 11, 16, 18, 21];
const EMPTY = [2, 5, 6, 12, 13, 14, 15];
const ERROR = [-1, 0, 23, 24, 25];

// Place les pièces sur le terrain
function place_piece(board: Board) {
	const piece = new Piece('.', { x: 1, y: 1 });

	for (let i = 1; i < board.real_width - 1; i++) {
		for (let j = 1; j < board.real_height; j++) {
			if (FULL.includes(j)) board.addPiece(piece, { x: j, y: i });
			else if (PARTIAL.includes(j)) {
				if (i != board.real_width - 2) board.addPiece(piece, { x: j, y: i });
			}
		}
	}
}

// results attendue
// Lignes remplies entièrement : 1 4 8 9 10 17 19 20 22
// Lignes remplies partiellement : 3 7 11 16 18 21
// Lignes laissées vides : 2 5 6 12 13 14 15
// Lignes invalides : -1 0 23 24 25
function stateLines() {
	// create
	const board = Board.create();
	const Lines_Verif = [
		-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
	];

	// Act
	place_piece(board);

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');

	// Vérification
	const results = board.stateLines(Lines_Verif);

	// Assert
	// boucle for each results
	for (const result_line of results) {
		if (FULL.includes(result_line.indexLine)) expect(result_line.state).toBe(StateLine.FULL);
		else if (PARTIAL.includes(result_line.indexLine)) expect(result_line.state).toBe(StateLine.PARTIAL);
		else if (EMPTY.includes(result_line.indexLine)) expect(result_line.state).toBe(StateLine.EMPTY);
		else if (ERROR.includes(result_line.indexLine)) expect(result_line.state).toBe(StateLine.ERROR);
	}
}

export function test_stateLines(): void {
	it('StateLines    : Vérifie plusieurs lignes à la fois', stateLines);
}
