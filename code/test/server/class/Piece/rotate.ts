import { expect, it } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES, PieceOrientationAffichage } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position, nbr_turn, rotation, resultat }: { shape: I_Piece['shape'], position: Position, nbr_turn: number, rotation: 0 | 1 | 2 | 3 , resultat: 0 | 1 | 2 | 3 }) {
    // Arrange
    const piece = new Piece(shape, position, rotation);
    // Act
    for (let index = 0; index < nbr_turn; index++) {
      piece.rotate();
    }

    // Assert
    const ref : PieceData = {
      shape,
      orientation: resultat,
      position
    }
    expect(piece.get()).toEqual(ref);
}

export function test_rotation(): void
{
  const rng_rotation : 0 | 1 | 2 | 3 = getRandomInt(0, 3) % 4 as 0 | 1 | 2 | 3;
  const nbr_turn : number = getRandomInt(0, 200);
  const rng_pos : Position = {x: getRandomInt(-100, 100), y: getRandomInt(-100, 100)};
  const resultat: 0 | 1 | 2 | 3 = (rng_rotation + nbr_turn) % 4 as 0 | 1 | 2 | 3;

  const all_param: {shape: I_Piece['shape'], position: Position, nbr_turn: number, rotation: 0 | 1 | 2 | 3, arrow_init: string, resultat: 0 | 1 | 2 | 3, arrow_res: string}[] =
    ALL_SHAPES.map(shape => ({
      shape,
      position: rng_pos,
      nbr_turn,
      rotation: rng_rotation,
      arrow_init: PieceOrientationAffichage[rng_rotation],
      resultat,
      arrow_res: PieceOrientationAffichage[resultat]
    }));
  it.each(all_param)(
    'Shape $shape — départ $arrow_init donc $rotation - tourne $nbr_turn fois → orientation $arrow_res donc $resultat',
    defaut);
}
