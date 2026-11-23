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
	// Act — (ici rien, on teste juste l'état initial)

	// Assert
	const ref: PieceData = {
		shape: shape,
		orientation: rotation,
		position: position,
	};
	expect(piece.toData()).toEqual(ref);
}

export function test_Constructeur(): void {
	const randomRotation: 0 | 1 | 2 | 3 = (getRandomInt(0, 3) % 4) as 0 | 1 | 2 | 3;

	const randomPos: Position = { x: getRandomInt(-100, 100), y: getRandomInt(-100, 100) };

	const allParams: { shape: IPiece['shape']; position: Position; rotation: 0 | 1 | 2 | 3; initialArrow: string }[] =
		ALL_SHAPES.map((shape) => ({
			shape,
			position: randomPos,
			rotation: randomRotation,
			initialArrow: ORIENTATION_SYMBOLS[randomRotation],
		}));

	it.each(allParams)('Shape $shape en ($position.x, $position.y) — orientation de départ $initialArrow', defaut);
}
