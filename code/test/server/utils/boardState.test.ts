import { describe } from 'vitest';
import { Board } from '../../../src/server/models/Board.js';
import { expect, it } from 'vitest';
import { LineState } from '../../../src/server/constants/board.js';
import { allLinesAre, isBoardEmpty, isBoardFull } from '../../../src/server/utils/boardState.js';
import { Piece } from '../../../src/server/models/Piece.js';

function testAllLinesAre() {
	const board = Board.create();
	it('true', () => {
		expect(allLinesAre(board, LineState.EMPTY)).toBeTruthy();
	});

	it('false', () => {
		expect(allLinesAre(board, LineState.FULL)).toBeFalsy();
	});
}
function testIsBoardEmpty() {
	const board = Board.create();
	it('true', () => {
		expect(isBoardEmpty(board)).toBeTruthy();
	});
	it('false', () => {
		board.addPiece(new Piece('O', { row: 1, col: 1 }), { row: 1, col: 1 });
		expect(isBoardEmpty(board)).toBeFalsy();
	});
}
function testIsBoardFull() {
	const board = Board.create();
	it('false', () => {
		expect(isBoardFull(board)).toBeFalsy();
	});

	it('true', () => {
		for (let i = 1; i < board.realHeight - 1; i++) {
			for (let j = 1; j <= board.width; j++) {
				board.addPiece(new Piece('.', { row: 1, col: 1 }), { row: i, col: j });
			}
		}
		expect(isBoardFull(board)).toBeTruthy();
	});
}

describe('boardState', () => {
	describe('allLinesAre ', testAllLinesAre);
	describe('isBoardEmpty ', testIsBoardEmpty);
	describe('isBoardFull ', testIsBoardFull);
});
