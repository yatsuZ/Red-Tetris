import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { ResultMethod, StatePieceCollision } from '../../../../src/server/constant/Board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import type { Position } from '../../../../src/server/interface/I_Piece.js';
import { logCollisionMatrix } from '../../../../src/server/utils/showCollision.js';

const SHOW_LOGS = false;
const SHOW_BOARD = false;
// Piece 'O' = [[1,1],[1,1]] — 2x2
// Board par défaut : realHeight=24 (sol=ligne 23), realWidth=12 (murs col 0 et 11)

function validPosition() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos: Position = { x: 5, y: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const { matrix, res } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(res).toBe(ResultMethod.SUCCESS);
	expect(matrix).toEqual([
		[StatePieceCollision.NO_COLLISION, StatePieceCollision.NO_COLLISION],
		[StatePieceCollision.NO_COLLISION, StatePieceCollision.NO_COLLISION],
	]);
}

function outOfBounds() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos: Position = { x: 100, y: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const { matrix, res } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(res).toBe(ResultMethod.ERROR);
	expect(matrix).toEqual([
		[StatePieceCollision.OUT_BOARD, StatePieceCollision.OUT_BOARD],
		[StatePieceCollision.OUT_BOARD, StatePieceCollision.OUT_BOARD],
	]);
}

function sideWallCollision() {
	// Arrange — O en (5,0) : col 0 = mur gauche
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos: Position = { x: 5, y: 0 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const { matrix, res } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert — col 0 = SIDE, col 1 = NO_COLLISION
	expect(res).toBe(ResultMethod.FAIL);
	expect(matrix).toEqual([
		[StatePieceCollision.SIDE_COLLISION, StatePieceCollision.NO_COLLISION],
		[StatePieceCollision.SIDE_COLLISION, StatePieceCollision.NO_COLLISION],
	]);
}

function groundCollision() {
	// Arrange — O en (22,5) : ligne 23 = sol (realHeight-1)
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos: Position = { x: 22, y: 5 };

	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const { matrix, res } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert — ligne 22 = NO_COLLISION, ligne 23 = sol
	expect(res).toBe(ResultMethod.FAIL);
	expect(matrix).toEqual([
		[StatePieceCollision.NO_COLLISION, StatePieceCollision.NO_COLLISION],
		[StatePieceCollision.GROUND_COLLISION, StatePieceCollision.GROUND_COLLISION],
	]);
}

function existingPieceCollision() {
	// Arrange — on place d'abord une pièce, puis on vérifie la même position
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos: Position = { x: 5, y: 5 };

	board.addPiece(piece, pos);
	if (SHOW_LOGS) {
		console.log(`=== canAddPiece O en (x:${pos.x} y:${pos.y}) apres addPiece ===`);
		if (SHOW_BOARD) showBoard(board.board, 'ASCII');
	}

	// Act
	const { matrix, res } = board.canAddPiece(piece, pos);
	logCollisionMatrix(matrix, '  collision matrix:', SHOW_LOGS);

	// Assert
	expect(res).toBe(ResultMethod.FAIL);
	expect(matrix).toEqual([
		[StatePieceCollision.PIECE_COLLISION, StatePieceCollision.PIECE_COLLISION],
		[StatePieceCollision.PIECE_COLLISION, StatePieceCollision.PIECE_COLLISION],
	]);
}

function imbriquer() {
	// Arrange
	const board = Board.create();
	const piece1 = new Piece('I', { x: 18, y: 1 }, 1);
	const piece2 = new Piece('T', { x: 21, y: 1 }, 2);
	const piece3 = new Piece('Z', { x: 21, y: 3 });

	// Act
	expect(board.canAddPiece(piece1, piece1.position).res).toBe(ResultMethod.SUCCESS);
	expect(board.addPiece(piece1, piece1.position)).toBe(ResultMethod.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.board, 'ASCII');
	}
	expect(board.canAddPiece(piece2, piece2.position).res).toBe(ResultMethod.SUCCESS);
	expect(board.addPiece(piece2, piece2.position)).toBe(ResultMethod.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.board, 'ASCII');
	}

	expect(board.canAddPiece(piece3, piece3.position).res).toBe(ResultMethod.SUCCESS);
	expect(board.addPiece(piece3, piece3.position)).toBe(ResultMethod.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.board, 'ASCII');
	}
}

export function test_canAddPiece(): void {
	it('Position valide : res SUCCESS, matrix tout NO_COLLISION', validPosition);
	it('Position valide : res SUCCESS, imbriqué', imbriquer);
	it('Hors mémoire   : res ERROR,   matrix tout OUT_BOARD', outOfBounds);
	it('Mur latéral    : res FAIL,    SIDE_COLLISION col 0', sideWallCollision);
	it('Sol            : res FAIL,    GROUND_COLLISION ligne 23', groundCollision);
	it('Pièce existante: res FAIL,    PIECE_COLLISION sur toutes les cases', existingPieceCollision);
}
