import { expect, it } from 'vitest';
import { Piece } from '../../../../src/server/class/Piece.js';
import { type IPiece, type PieceData, type Position } from '../../../../src/server/interface/IPiece.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { ALL_SHAPES, ORIENTATION_SYMBOLS, SHAPES } from '../../../../src/server/constant/Shapes.js';

function defaut({ shape, position, tour }: { shape: IPiece['shape']; position: Position; tour: 0 | 1 | 2 | 3 }) {
	// Arrange
	const piece = new Piece(shape, position, tour);
	// Act

	// Assert
	const ref: PieceData = {
		shape,
		orientation: tour,
		position,
	};
	expect(piece.toData()).toEqual(ref);
	expect(piece.getMatrix()).toEqual(SHAPES[shape][tour]);
}

export function test_matrix(): void {
	const turnCount: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3] as const;
	const randomPos: Position = { row: getRandomInt(-100, 100), col: getRandomInt(-100, 100) };

	const allParams: { shape: IPiece['shape']; position: Position; tour: 0 | 1 | 2 | 3; arrow: string }[] =
		turnCount.flatMap((tour) =>
			ALL_SHAPES.map((shape) => ({
				shape,
				position: randomPos,
				tour,
				arrow: ORIENTATION_SYMBOLS[tour],
			})),
		);
	it.each(allParams)('Shape $shape — rotation $arrow', defaut);
}
