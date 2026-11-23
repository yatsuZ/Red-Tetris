import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { CellType, MethodResult, LineState } from '../../../../src/server/constant/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { allLinesAre } from '../../../../src/server/utils/boardState.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function filledWithPartialLines() {
	// create
	const board = Board.create();

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i);

		// Vérification
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(MethodResult.ERROR);
		else expect(res).toBe(MethodResult.SUCCESS);
	}

	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	expect(allLinesAre(board, LineState.PARTIAL)).toBe(true);
}

function failCreatePartialLine() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });

	board.addPiece(piece, { row: 2, col: 2 });

	for (let i = -1; i < board.realHeight + 1; i++) {
		board.createPartialLine(i, 1);
		if (i >= 1 && i <= board.realHeight + -2 && i % 2)
			board.addPiece(new Piece('.', { row: 0, col: 0 }), { row: i, col: 1 });
	}

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i);
		// Vérification
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(MethodResult.ERROR);
		else expect(res).toBe(MethodResult.FAIL);
	}

	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
}

function filledWithPartialLinesChosen() {
	// create
	const board = Board.create();
	const indexEmptyColumn: number = getRandomInt(1, board.realWidth - 2);

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i, indexEmptyColumn);
		// Vérification
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(MethodResult.ERROR);
		else {
			expect(res).toBe(MethodResult.SUCCESS);
			for (let j = 1; j < board.realWidth - 1; j++) {
				// Vérification
				if (indexEmptyColumn === j) expect((board.grid[i] as CellType[])[j]).toBe(CellType.EMPTY);
				else expect((board.grid[i] as CellType[])[j]).toBe(CellType.PIECE);
			}
		}
	}
	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	expect(allLinesAre(board, LineState.PARTIAL)).toBe(true);
}

function failCreatePartialLineChosen() {
	// create
	const board = Board.create();
	const indexEmptyColumn: number = 0;

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i, indexEmptyColumn);
		// Vérification
		expect(res).toBe(MethodResult.ERROR);
	}

	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
}

export function test_createPartialLine(): void {
	it('createPartialLine    : Crée une ligne avec un trou sur chaque ligne du tableau', filledWithPartialLines);
	it('createPartialLine    : Ne peut pas crée de ligne car ligne occupe', failCreatePartialLine);
	it('createPartialLine    : Choisie ou sera le troue', filledWithPartialLinesChosen);
	it('createPartialLine    : Échoue pour la sélection du trou', failCreatePartialLineChosen);
}
