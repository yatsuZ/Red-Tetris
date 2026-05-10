import { expect } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { it } from "vitest";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position }: { shape: I_Piece['shape'], position: Position }) {
    // Arrange
      const piece = new Piece(shape, position);
    // Act — (ici rien, on teste juste l'état initial)

    // Assert
    const ref : PieceData = {
      shape: shape,
      orientation : 0,
      position:position
    }
    expect(piece.get()).toEqual(ref);
  }

export function test_Constructeur(): void
{ 
  const rng_pos : Position = {x: getRandomInt(-100, 100), y:getRandomInt(-100, 100)};

  const all_param: {shape: I_Piece['shape'], position: Position}[] = ALL_SHAPES.map(shape => ({ shape, position: rng_pos }));

  it.each(all_param)('Avec shape $shape en ($position.x, $position.y)', defaut);
}
