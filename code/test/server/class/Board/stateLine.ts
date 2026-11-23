import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { LineState } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

const LINE_SELECT = 1;

function stateLine_error() {
	// create
	const board = Board.create();

	// Vérification
	const results = board.stateLine(-1);

	// Assert
	expect(results).toBe(LineState.ERROR);
}

function stateLine_empty() {
	// create
	const board = Board.create();

	// Vérification
	const results = board.stateLine(LINE_SELECT);

	// Assert
	expect(results).toBe(LineState.EMPTY);
}

// la dernier colonne est vide
function stateLine_partial() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { x: LINE_SELECT, y: 1 });

	// Act
	for (let i = 0; i < 4; i++) {
		board.addPiece(piece, piece.position);
		piece.position.y += 2;
	}
	piece.position.y -= 1;
	board.addPiece(piece, piece.position);

	// Vérification
	const results = board.stateLine(LINE_SELECT);

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	// Assert
	expect(results).toBe(LineState.PARTIAL);
}

function stateLine_full() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { x: LINE_SELECT, y: 1 });

	// Act
	for (let i = 0; i < 5; i++) {
		board.addPiece(piece, piece.position);
		piece.position.y += 2;
	}

	// Vérification
	const results = board.stateLine(LINE_SELECT);

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	// Assert
	expect(results).toBe(LineState.FULL);
}

export function test_stateLine(): void {
	it('LineState ERROR   : Error ligne non existante', stateLine_error);
	it('LineState EMPTY   : La ligne est vide', stateLine_empty);
	it('LineState PARTIAL : La ligne est partiellement remplie', stateLine_partial);
	it('LineState FULL    : La ligne est remplie', stateLine_full);
}
