import { expect } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { it } from "vitest";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position, nbr_turn}: { shape: I_Piece['shape'], position: Position, nbr_turn: number }) {
    // Arrange
      const piece = new Piece(shape, position);
    // Act — (ici rien, on teste juste l'état initial)
    for (let index = 0; index < nbr_turn; index++) {
      piece.rotate();
    }

    const resultat = nbr_turn % 4 as 0 | 1 | 2 | 3;

    // Assert
    const ref : PieceData = {
      shape: shape,
      orientation : resultat,
      position:position
    }
    expect(piece.get()).toEqual(ref);
  }

export function test_rotation(): void
{
  const nbr_turn : number = getRandomInt(0, 200);
  const rng_pos : Position = {x: getRandomInt(-100, 100), y:getRandomInt(-100, 100)};

  const all_param: {shape: I_Piece['shape'], position: Position, nbr_turn:number}[] = ALL_SHAPES.map(shape => ({ shape, position: rng_pos, nbr_turn: nbr_turn, resultat: nbr_turn % 4 as 0 | 1 | 2 | 3}));
  it.each(all_param)('Avec shape $shape en ($position.x, $position.y) qui tourne $nbr_turn fois res = $resultat', defaut);
}
