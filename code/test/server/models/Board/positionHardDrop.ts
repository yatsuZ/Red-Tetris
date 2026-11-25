import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { Piece } from '../../../../src/server/models/Piece.js';
import type { PieceShape, Position } from '../../../../src/server/types/IPiece.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { logCollisionMatrix } from '../../../../src/server/utils/showCollision.js';
import { CollisionState, MethodResult } from '../../../../src/server/constants/board.js';
import { ALL_SHAPES } from '../../../../src/server/constants/shapes.js';

const SHOW_LOGS = true;
const SHOW_BOARD = true;

function emptyBoard(shape: PieceShape) {
	// Arrange
	const board = Board.create();
	// const piece = new Piece(shape, { row: 1, col: 1});
	const piece = new Piece(shape, { row: 1, col: board.getRandomColumn() });
	// Act
	const resultHardDrop = board.positionHardDrop(piece, piece.position);

	// Assert
	expect(resultHardDrop.result).toBe(MethodResult.SUCCESS);
	expect(resultHardDrop.pos?.row).toBe((board.realHeight - piece.getHeight()) - 1);
	expect(resultHardDrop.pos?.col).toBe(piece.position.col);
	const pos: Position = resultHardDrop.pos as Position;

	if (SHOW_LOGS) {console.log(`=== canAddPiece ${piece.shape} en (row:${pos.row} col:${pos.col}) ===`);}

	const { matrix, result } = board.canAddPiece(piece, pos);

	expect(result).toBe(MethodResult.SUCCESS);
	expect(matrix.every((element, i) => element[i] === CollisionState.NO_COLLISION)).toBeTruthy();

	board.addPiece(piece, pos);
	if (SHOW_BOARD) showBoard(board.grid, 'ASCII');
}

export function testPositionHardDrop(): void {
	it.each(ALL_SHAPES)('On lache sur terrain vide avec la forme "%s"', emptyBoard);
	// it('Pièce empilée sur une autre', stack);
	// it('Position de départ invalide', invalidPosition);
	// it('Empile jusqu'à remplir tout le terrain', fillBoard);
	// it('Ne modifie pas le terrain', justReadNoWrite);
	// it("Situations d'erreur", errorCases);
}
