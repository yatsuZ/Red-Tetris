import { expect, it } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES, PieceOrientationAffichage, Shapes } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position, tour }: { shape: I_Piece['shape'], position: Position, tour: 0 | 1 | 2 | 3 }) {
    // Arrange
    const piece = new Piece(shape, position, tour);
    // Act

    // Assert
    const ref : PieceData = {
      shape,
      orientation: tour,
      position
    }
    expect(piece.get()).toEqual(ref);
    expect(piece.getMatrix()).toEqual(Shapes[shape][tour]);
}

export function test_matrix(): void
{
  const nbr_turn : (0 | 1 | 2 | 3)[] = [0, 1, 2, 3] as const;
  const rng_pos : Position = {x: getRandomInt(-100, 100), y: getRandomInt(-100, 100)};

  const all_param: {shape: I_Piece['shape'], position: Position, tour: 0 | 1 | 2 | 3, arrow: string}[] =
  nbr_turn.flatMap(tour =>
    ALL_SHAPES.map(shape => ({
      shape,
      position: rng_pos,
      tour,
      arrow: PieceOrientationAffichage[tour],
    })));
  it.each(all_param)(
    'Shape $shape — rotation $arrow',
    defaut);
}
