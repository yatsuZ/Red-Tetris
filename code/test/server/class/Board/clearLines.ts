import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { CellType, MethodResult } from '../../../../src/server/constant/Board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

// Board defaut : realHeight=24, realWidth=12
// Lignes jouables valides : 1 a 22
// Piece 'O' = [[1,1],[1,1]] — 2x2

function clearLinesValid() {
	// Arrange
	const board = Board.create();
	const indexLines = [5, 8, 12];

	// on place une piece O sur chaque ligne a tester
	indexLines.forEach((indexLine) => {
		const piece = new Piece('O', { x: indexLine, y: 4 });
		board.addPiece(piece, piece.position);
	});

	if (SHOW_LOGS) {
		console.log(`=== AVANT clearLines(${indexLines}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const results = board.clearLines(indexLines);

	if (SHOW_LOGS) {
		console.log(`=== APRÈS clearLines(${indexLines}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
		results.forEach(({ indexLine, result }) => {
			console.log(`clearLine(${indexLine}) = ${result} (attendu: ${MethodResult.SUCCESS})`);
		});
	}

	// Assert — chaque ligne retourne SUCCESS et est vidée
	results.forEach(({ indexLine, result }) => {
		expect(result).toBe(MethodResult.SUCCESS);
		const row = board.grid[indexLine]!;
		expect(row[4]).toBe(CellType.EMPTY);
		expect(row[5]).toBe(CellType.EMPTY);
		// murs preserves
		expect(row[0]).toBe(CellType.WALL);
		expect(row[board.realWidth - 1]).toBe(CellType.WALL);
	});
}

function clearLinesInvalid() {
	// Arrange
	const board = Board.create();
	const indexLines = [0, board.realHeight - 1]; // mur haut et mur bas

	if (SHOW_LOGS) {
		console.log(`=== clearLines invalide (${indexLines}) ===`);
	}

	// Act
	const results = board.clearLines(indexLines);

	if (SHOW_LOGS) {
		results.forEach(({ indexLine, result }) => {
			console.log(`clearLine(${indexLine}) = ${result} (attendu: ${MethodResult.ERROR})`);
		});
	}

	// Assert
	results.forEach(({ indexLine: _, result }) => {
		expect(result).toBe(MethodResult.ERROR);
	});
}

function clearLinesMixed() {
	// Arrange — indices valides et invalides melanges
	const board = Board.create();
	const piece = new Piece('O', { x: 6, y: 4 });
	board.addPiece(piece, piece.position);

	const indexLines = [0, 6, board.realHeight - 1]; // invalide, valide, invalide

	if (SHOW_LOGS) {
		console.log(`=== AVANT clearLines mixte (${indexLines}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const results = board.clearLines(indexLines);

	if (SHOW_LOGS) {
		console.log(`=== APRÈS clearLines mixte (${indexLines}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
		results.forEach(({ indexLine, result }) => console.log(`clearLine(${indexLine}) = ${result}`));
	}

	// Assert
	expect(results[0]?.result).toBe(MethodResult.ERROR); // index 0  -> ERROR
	expect(results[1]?.result).toBe(MethodResult.SUCCESS); // index 6  -> SUCCESS
	expect(results[2]?.result).toBe(MethodResult.ERROR); // index 23 -> ERROR
}

export function test_clearLines(): void {
	it('clearLines valide   : tous SUCCESS et lignes vidées', clearLinesValid);
	it('clearLines invalide : tous ERROR', clearLinesInvalid);
	it('clearLines mixte   : ERROR/SUCCESS/ERROR', clearLinesMixed);
}
