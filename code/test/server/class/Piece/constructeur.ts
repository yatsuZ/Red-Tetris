import { expect, it } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES, PieceOrientationAffichage } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position, rotation}: { shape: I_Piece['shape'], position: Position, rotation : 0|1|2|3}) {
    // Arrange
      const piece = new Piece(shape, position, rotation);
    // Act — (ici rien, on teste juste l'état initial)

    // Assert
    const ref : PieceData = {
      shape: shape,
      orientation : rotation,
      position:position
    }
    expect(piece.get()).toEqual(ref);
  }

export function test_Constructeur(): void
{ 
  const rng_rotation : 0|1|2|3 = getRandomInt(0, 3) % 4 as 0|1|2|3;

  const rng_pos : Position = {x: getRandomInt(-100, 100), y:getRandomInt(-100, 100)};

  const all_param: {shape: I_Piece['shape'], position: Position, rotation: 0|1|2|3, arrow_init: string}[] =
    ALL_SHAPES.map(shape => ({ shape, position: rng_pos, rotation: rng_rotation, arrow_init: PieceOrientationAffichage[rng_rotation] }));

  it.each(all_param)('Shape $shape en ($position.x, $position.y) — orientation de départ $arrow_init', defaut);
}
