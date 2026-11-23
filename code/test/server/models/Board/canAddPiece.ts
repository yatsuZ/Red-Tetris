import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { Piece } from '../../../../src/server/models/Piece.js';
import { MethodResult, CollisionState } from '../../../../src/server/constants/board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import type { Position } from '../../../../src/server/types/IPiece.js';
import { logCollisionMatrix } from '../../../../src/server/utils/showCollision.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;
// Piece 'O' = [[1,1],[1,1]] — 2x2
// Board par défaut : realHeight=24 (sol=ligne 23), realWidth=12 (murs col 0 et 11)

function validPosition() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos: Position = { row: 5, col: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (row:${pos.row} col:${pos.col}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const { matrix, result } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(result).toBe(MethodResult.SUCCESS);
	expect(matrix).toEqual([
		[CollisionState.NO_COLLISION, CollisionState.NO_COLLISION],
		[CollisionState.NO_COLLISION, CollisionState.NO_COLLISION],
	]);
}

function outOfBounds() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos: Position = { row: 100, col: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (row:${pos.row} col:${pos.col}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const { matrix, result } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(result).toBe(MethodResult.ERROR);
	expect(matrix).toEqual([
		[CollisionState.OUT_BOARD, CollisionState.OUT_BOARD],
		[CollisionState.OUT_BOARD, CollisionState.OUT_BOARD],
	]);
}

function sideWallCollision() {
	// Arrange — O en (5,0) : col 0 = mur gauche
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos: Position = { row: 5, col: 0 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (row:${pos.row} col:${pos.col}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const { matrix, result } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert — col 0 = SIDE, col 1 = NO_COLLISION
	expect(result).toBe(MethodResult.FAIL);
	expect(matrix).toEqual([
		[CollisionState.SIDE_COLLISION, CollisionState.NO_COLLISION],
		[CollisionState.SIDE_COLLISION, CollisionState.NO_COLLISION],
	]);
}

function groundCollision() {
	// Arrange — O en (22,5) : ligne 23 = sol (realHeight-1)
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos: Position = { row: 22, col: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (row:${pos.row} col:${pos.col}) ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const { matrix, result } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert — ligne 22 = NO_COLLISION, ligne 23 = sol
	expect(result).toBe(MethodResult.FAIL);
	expect(matrix).toEqual([
		[CollisionState.NO_COLLISION, CollisionState.NO_COLLISION],
		[CollisionState.GROUND_COLLISION, CollisionState.GROUND_COLLISION],
	]);
}

function existingPieceCollision() {
	// Arrange — on place d'abord une pièce, puis on vérifie la même position
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos: Position = { row: 5, col: 5 };

	board.addPiece(piece, pos);
	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (row:${pos.row} col:${pos.col}) apres addPiece ===`);
		if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
	}

	// Act
	const { matrix, result } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(result).toBe(MethodResult.FAIL);
	expect(matrix).toEqual([
		[CollisionState.PIECE_COLLISION, CollisionState.PIECE_COLLISION],
		[CollisionState.PIECE_COLLISION, CollisionState.PIECE_COLLISION],
	]);
}

function imbriquer() {
	// Arrange
	const board = Board.create();
	const piece1 = new Piece('I', { row: 18, col: 1 }, 1);
	const piece2 = new Piece('T', { row: 21, col: 1 }, 2);
	const piece3 = new Piece('Z', { row: 21, col: 3 });

	// Act
	expect(board.canAddPiece(piece1, piece1.position).result).toBe(MethodResult.SUCCESS);
	expect(board.addPiece(piece1, piece1.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}
	expect(board.canAddPiece(piece2, piece2.position).result).toBe(MethodResult.SUCCESS);
	expect(board.addPiece(piece2, piece2.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}

	expect(board.canAddPiece(piece3, piece3.position).result).toBe(MethodResult.SUCCESS);
	expect(board.addPiece(piece3, piece3.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}
}

export function testCanAddPiece(): void {
	it('Position valide : result SUCCESS, matrix tout NO_COLLISION', validPosition);
	it('Position valide : result SUCCESS, imbriqué', imbriquer);
	it('Hors mémoire   : result ERROR,   matrix tout OUT_BOARD', outOfBounds);
	it('Mur latéral    : result FAIL,    SIDE_COLLISION col 0', sideWallCollision);
	it('Sol            : result FAIL,    GROUND_COLLISION ligne 23', groundCollision);
	it('Pièce existante: result FAIL,    PIECE_COLLISION sur toutes les cases', existingPieceCollision);
}
