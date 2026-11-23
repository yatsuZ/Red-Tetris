import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { CelluleType, ResultMethod, StateLine } from '../../../../src/server/constant/Board.js';
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
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(ResultMethod.ERROR);
		else expect(res).toBe(ResultMethod.SUCCESS);
	}

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	expect(allLinesAre(board, StateLine.PARTIAL)).toBe(true);
}

function failCreatePartialLine() {
	// create
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	board.addPiece(piece, { x: 2, y: 2 });

	for (let i = -1; i < board.realHeight + 1; i++) {
		board.createPartialLine(i, 1);
		if (i >= 1 && i <= board.realHeight + -2 && i % 2)
			board.addPiece(new Piece('.', { x: 0, y: 0 }), { x: i, y: 1 });
	}

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i);
		// Vérification
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(ResultMethod.ERROR);
		else expect(res).toBe(ResultMethod.FAIL);
	}

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
}

function filledWithPartialLinesChosen() {
	// create
	const board = Board.create();
	const indexEmptyColumn: number = getRandomInt(1, board.realWidth - 2);

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i, indexEmptyColumn);
		// Vérification
		if (i <= 0 || i >= board.realHeight - 1) expect(res).toBe(ResultMethod.ERROR);
		else {
			expect(res).toBe(ResultMethod.SUCCESS);
			for (let j = 1; j < board.realWidth - 1; j++) {
				// Vérification
				if (indexEmptyColumn === j) expect((board.board[i] as CelluleType[])[j]).toBe(CelluleType.EMPTY);
				else expect((board.board[i] as CelluleType[])[j]).toBe(CelluleType.PIECE);
			}
		}
	}
	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	expect(allLinesAre(board, StateLine.PARTIAL)).toBe(true);
}

function failCreatePartialLineChosen() {
	// create
	const board = Board.create();
	const indexEmptyColumn: number = 0;

	for (let i = -1; i < board.realHeight + 1; i++) {
		// Act
		const res = board.createPartialLine(i, indexEmptyColumn);
		// Vérification
		expect(res).toBe(ResultMethod.ERROR);
	}

	if (SHOW_BOARD) showBoard(board.board, 'ASCII');
}

export function test_createPartialLine(): void {
	it('createPartialLine    : Crée une ligne avec un trou sur chaque ligne du tableau', filledWithPartialLines);
	it('createPartialLine    : Ne peut pas crée de ligne car ligne occupe', failCreatePartialLine);
	it('createPartialLine    : Choisie ou sera le troue', filledWithPartialLinesChosen);
	it('createPartialLine    : Échoue pour la sélection du trou', failCreatePartialLineChosen);
}
