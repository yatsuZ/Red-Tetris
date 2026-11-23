import { expect, it } from 'vitest';
import { Piece } from '../../../../src/server/class/Piece.js';
import { type IPiece, type PieceData, type Position } from '../../../../src/server/interface/IPiece.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { ALL_SHAPES, ORIENTATION_SYMBOLS } from '../../../../src/server/constant/Shapes.js';

function defaut({
	shape,
	position,
	rotation,
}: {
	shape: IPiece['shape'];
	position: Position;
	rotation: 0 | 1 | 2 | 3;
}) {
	// Arrange
	const piece = new Piece(shape, position, rotation);
	const clonePiece: Piece = piece.clone();

	// Assert
	// Vérifie que ce ne sont pas les mêmes instances en mémoire
	expect(piece).not.toBe(clonePiece);
	expect(piece).toEqual(clonePiece);
	expect(piece.orientation).toEqual(clonePiece.orientation);

	// Act —
	clonePiece.rotate();

	// Assert
	expect(piece.orientation).not.equal(clonePiece.orientation);
}

export function test_clone(): void {
	const randomRotation: 0 | 1 | 2 | 3 = (getRandomInt(0, 3) % 4) as 0 | 1 | 2 | 3;
	const randomPos: Position = { row: getRandomInt(-100, 100), col: getRandomInt(-100, 100) };

	const allParams: {
		shape: IPiece['shape'];
		position: Position;
		rotation: 0 | 1 | 2 | 3;
		initialArrow: string;
	}[] = ALL_SHAPES.map((shape) => ({
		shape,
		position: randomPos,
		rotation: randomRotation,
		initialArrow: ORIENTATION_SYMBOLS[randomRotation],
	}));

	it.each(allParams)('Shape $shape en $initialArrow($position.row, $position.col) cloné, objet distinct.', defaut);
}
