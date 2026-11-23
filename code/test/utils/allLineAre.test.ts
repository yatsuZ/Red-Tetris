import { describe } from 'vitest';
import { Board } from '../../src/server/class/Board.js';
import { expect, it } from 'vitest';
import { StateLine } from '../../src/server/constant/Board.js';
import { allLinesAre, isBoardEmpty, isBoardFull } from '../../src/server/utils/allLineAre.js';
import { Piece } from '../../src/server/class/Piece.js';

function test_allLinesAre() {
	const board = Board.create();
	it('true', () => {
		expect(allLinesAre(board, StateLine.EMPTY)).toBeTruthy();
	});

	it('false', () => {
		expect(allLinesAre(board, StateLine.FULL)).toBeFalsy();
	});
}
function test_isBoardEmpty() {
	const board = Board.create();
	it('true', () => {
		expect(isBoardEmpty(board)).toBeTruthy();
	});
	it('false', () => {
		board.addPiece(new Piece('O', { x: 1, y: 1 }), { x: 1, y: 1 });
		expect(isBoardEmpty(board)).toBeFalsy();
	});
}
function test_isBoardFull() {
	const board = Board.create();
	it('false', () => {
		expect(isBoardFull(board)).toBeFalsy();
	});

	it('true', () => {
		for (let i = 1; i < board.real_height - 1; i++) {
			for (let j = 1; j <= board.width; j++) {
				board.addPiece(new Piece('.', { x: 1, y: 1 }), { x: i, y: j });
			}
		}
		expect(isBoardFull(board)).toBeTruthy();
	});
}

describe('allLineAre', () => {
	describe('allLinesAre ', test_allLinesAre);
	describe('isBoardEmpty ', test_isBoardEmpty);
	describe('isBoardFull ', test_isBoardFull);
});
