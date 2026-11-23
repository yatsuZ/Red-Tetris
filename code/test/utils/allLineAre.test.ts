import { describe } from 'vitest';
import { Board } from '../../src/server/class/Board.js';
import { expect, it } from 'vitest';
import { StateLine } from '../../src/server/constant/Board.js';
import { AllLineAre, BoardIsEmpty, BoardIsFull } from '../../src/server/utils/allLineAre.js';
import { Piece } from '../../src/server/class/Piece.js';

function AllLineAre_test() {
	const board = Board.create();
	it('true', () => {
		expect(AllLineAre(board, StateLine.EMPTY)).toBeTruthy();
	});

	it('false', () => {
		expect(AllLineAre(board, StateLine.FULL)).toBeFalsy();
	});
}
function BoardIsEmpty_test() {
	const board = Board.create();
	it('true', () => {
		expect(BoardIsEmpty(board)).toBeTruthy();
	});
	it('false', () => {
		board.addPiece(new Piece('O', { x: 1, y: 1 }), { x: 1, y: 1 });
		expect(BoardIsEmpty(board)).toBeFalsy();
	});
}
function BoardIsFull_test() {
	const board = Board.create();
	it('false', () => {
		expect(BoardIsFull(board)).toBeFalsy();
	});

	it('true', () => {
		for (let i = 1; i < board.real_height - 1; i++) {
			for (let j = 1; j <= board.width; j++) {
				board.addPiece(new Piece('.', { x: 1, y: 1 }), { x: i, y: j });
			}
		}
		expect(BoardIsFull(board)).toBeTruthy();
	});
}

describe('allLineAre', () => {
	describe('AllLineAre ', AllLineAre_test);
	describe('BoardIsEmpty ', BoardIsEmpty_test);
	describe('BoardIsFull ', BoardIsFull_test);
});
