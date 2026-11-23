import { expect, it } from 'vitest';
import { Piece } from '../../../../src/server/class/Piece.js';
import { type IPiece, type PieceData, type Position } from '../../../../src/server/interface/IPiece.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { ALL_SHAPES, ORIENTATION_SYMBOLS } from '../../../../src/server/constant/Shapes.js';

function defaut({
	shape,
	position,
	turnCount,
	rotation,
	resultat,
}: {
	shape: IPiece['shape'];
	position: Position;
	turnCount: number;
	rotation: 0 | 1 | 2 | 3;
	resultat: 0 | 1 | 2 | 3;
}) {
	// Arrange
	const piece = new Piece(shape, position, rotation);
	// Act
	for (let index = 0; index < turnCount; index++) {
		piece.rotate();
	}

	// Assert
	const ref: PieceData = {
		shape,
		orientation: resultat,
		position,
	};
	expect(piece.toData()).toEqual(ref);
}

export function test_rotation(): void {
	const randomRotation: 0 | 1 | 2 | 3 = (getRandomInt(0, 3) % 4) as 0 | 1 | 2 | 3;
	const turnCount: number = getRandomInt(0, 200);
	const randomPos: Position = { x: getRandomInt(-100, 100), y: getRandomInt(-100, 100) };
	const resultat: 0 | 1 | 2 | 3 = ((randomRotation + turnCount) % 4) as 0 | 1 | 2 | 3;

	const allParams: {
		shape: IPiece['shape'];
		position: Position;
		turnCount: number;
		rotation: 0 | 1 | 2 | 3;
		initialArrow: string;
		resultat: 0 | 1 | 2 | 3;
		resultArrow: string;
	}[] = ALL_SHAPES.map((shape) => ({
		shape,
		position: randomPos,
		turnCount,
		rotation: randomRotation,
		initialArrow: ORIENTATION_SYMBOLS[randomRotation],
		resultat,
		resultArrow: ORIENTATION_SYMBOLS[resultat],
	}));
	it.each(allParams)(
		'Shape $shape — départ $initialArrow donc $rotation - tourne $turnCount fois → orientation $resultArrow donc $resultat',
		defaut,
	);
}
