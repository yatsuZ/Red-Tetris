import { describe, it, expect, vi, afterEach } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { ResultMethod } from '../../../../src/server/constant/Board.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function validSpawn() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	if (SHOW_LOGS) {
		console.log(`=== canSpawnPiece O ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const res = board.canSpawnPiece(piece);

	// Assert
	expect(res).toBe(ResultMethod.SUCCESS);
}

function invalidSpawn() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { x: 1, y: 4 });

	board.addPiece(piece, { x: 1, y: 4 });

	if (SHOW_LOGS) {
		console.log(`=== canSpawnPiece O ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const res = board.canSpawnPiece(piece);

	// Assert
	expect(res).toBe(ResultMethod.FAIL);
}

function errorGetWidth() {
	describe('Échec de getWidth sur la pièce', () => {
		afterEach(() => {
			vi.restoreAllMocks(); // remet les vraies méthodes après chaque test
		});

		it('renvoie ERROR si la largeur de la pièce vaut -1', () => {
			// Arrange
			const board = Board.create();
			const piece = new Piece('O', { x: 0, y: 0 });

			if (SHOW_LOGS) {
				console.log(`=== canSpawnPiece O ===`);
				if (SHOW_BOARD) showBoard(board.board, 'ASCII');
			}

			// À partir d'ici, piece.getWidth() renvoie -1
			vi.spyOn(piece, 'getMatrix').mockReturnValue([]);

			// Act
			const res = board.canSpawnPiece(piece);

			// Assert
			expect(res).toBe(ResultMethod.ERROR);
		});
	});
}

export function test_canSpawnPiece(): void {
	it('Spawn valide   : res SUCCESS', validSpawn);
	it('Spawn invalide : res FAIL', invalidSpawn);
	errorGetWidth();
}
