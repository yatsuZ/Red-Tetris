import { Piece } from "../../../../src/server/class/Piece.js";
import { ALL_SHAPES, PieceOrientationAffichage } from "../../../../src/server/constant/Shapes.js";
import type { I_Piece, Position } from "../../../../src/server/interface/I_Piece.js";
import { expect, it } from "vitest";

function defaut({ shape, orientation, ref_Hauteur, ref_Largeur }: { shape: I_Piece['shape'], orientation: 0 | 1 | 2 | 3, ref_Hauteur : number, ref_Largeur : number}) {
    // Arrange
    const piece = new Piece(shape, {x:0, y:0}, orientation);
    // Act

    // Assert
    expect(piece.getHauteur()).toBe(ref_Hauteur);
    expect(piece.getLargeur()).toBe(ref_Largeur);
}


export function test_getLargeurHauteur(): void
{
  const valeursSaisies = [
      { shape: 'I' as const, pair: { h: 1, l: 4 }, impair: { h: 4, l: 1 } },
      { shape: 'J' as const, pair: { h: 2, l: 3 }, impair: { h: 3, l: 2 } },
      { shape: 'L' as const, pair: { h: 2, l: 3 }, impair: { h: 3, l: 2 } },
      { shape: 'O' as const, pair: { h: 2, l: 2 }, impair: { h: 2, l: 2 } },
      { shape: 'S' as const, pair: { h: 2, l: 3 }, impair: { h: 3, l: 2 } },
      { shape: 'T' as const, pair: { h: 2, l: 3 }, impair: { h: 3, l: 2 } },
      { shape: 'Z' as const, pair: { h: 2, l: 3 }, impair: { h: 3, l: 2 } },
    ];

    const all_param = valeursSaisies.flatMap(({ shape, pair, impair }) => {
      return ([0, 1, 2, 3] as const).map(orientation => {
        const cible = (orientation % 2 === 0) ? pair : impair;

        return {
          shape,
          orientation,
          arrow: PieceOrientationAffichage[orientation],
          ref_Hauteur: cible.h,
          ref_Largeur: cible.l
        };
      });
    });

    it.each(all_param)(
    'Shape $shape — rotation $arrow Pour {Hauteur: $ref_Hauteur\t, Largeur: $ref_Largeur}',
    defaut);
}
