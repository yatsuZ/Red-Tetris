import { Piece } from '../../../../src/server/class/Piece.js';
import { ALL_SHAPES, PieceOrientationAffichage } from '../../../../src/server/constant/Shapes.js';
import type { I_Piece, Position } from '../../../../src/server/interface/I_Piece.js';
import { describe, it, expect, vi, afterEach } from 'vitest';

function errorGetWidth() {
	describe('Échec de getWidth', () => {
		afterEach(() => {
			vi.restoreAllMocks(); // remet les vraies méthodes après chaque test
		});

		it('renvoie ERROR si la largeur de la pièce vaut -1', () => {
			const piece = new Piece('.', { x: 0, y: 0 });

			// À partir d'ici, piece.getWidth() renvoie -1
			vi.spyOn(piece, 'getMatrix').mockReturnValue([]);

			expect(piece.getWidth()).toBe(-1);
		});
	});
}

function defaut({
	shape,
	orientation,
	ref_Height,
	ref_Width,
}: {
	shape: I_Piece['shape'];
	orientation: 0 | 1 | 2 | 3;
	ref_Height: number;
	ref_Width: number;
}) {
	// Arrange
	const piece = new Piece(shape, { x: 0, y: 0 }, orientation);
	// Act

	// Assert
	expect(piece.getHeight()).toBe(ref_Height);
	expect(piece.getWidth()).toBe(ref_Width);
}

export function test_getWidthHeight(): void {
	const valeursSaisies = [
		{ shape: 'I' as const, pair: { h: 1, w: 4 }, impair: { h: 4, w: 1 } },
		{ shape: 'J' as const, pair: { h: 2, w: 3 }, impair: { h: 3, w: 2 } },
		{ shape: 'L' as const, pair: { h: 2, w: 3 }, impair: { h: 3, w: 2 } },
		{ shape: 'O' as const, pair: { h: 2, w: 2 }, impair: { h: 2, w: 2 } },
		{ shape: 'S' as const, pair: { h: 2, w: 3 }, impair: { h: 3, w: 2 } },
		{ shape: 'T' as const, pair: { h: 2, w: 3 }, impair: { h: 3, w: 2 } },
		{ shape: 'Z' as const, pair: { h: 2, w: 3 }, impair: { h: 3, w: 2 } },
		{ shape: '.' as const, pair: { h: 1, w: 1 }, impair: { h: 1, w: 1 } },
	];

	const allParams = valeursSaisies.flatMap(({ shape, pair, impair }) => {
		return ([0, 1, 2, 3] as const).map((orientation) => {
			const cible = orientation % 2 === 0 ? pair : impair;

			return {
				shape,
				orientation,
				arrow: PieceOrientationAffichage[orientation],
				ref_Height: cible.h,
				ref_Width: cible.w,
			};
		});
	});

	it.each(allParams)('Shape $shape — rotation $arrow pour {Height: $ref_Height\t, Width: $ref_Width}', defaut);

	errorGetWidth();
}
