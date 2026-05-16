import { expect, it } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { ALL_SHAPES, PieceOrientationAffichage } from "../../../../src/server/constant/Shapes.js";

function defaut({ shape, position, rotation}: { shape: I_Piece['shape'], position: Position, rotation : 0|1|2|3}) {
    // Arrange
    const piece = new Piece(shape, position, rotation);
    const clonePiece : Piece = piece.clone();

    // Assert
    // Vérifie que ce ne sont pas les mêmes instances en mémoire
    expect(piece).not.toBe(clonePiece);
    expect(piece).toEqual(clonePiece);
    expect(piece.orientation).toEqual(clonePiece.orientation);

    // Act — 
    clonePiece.rotate();

    // Assert
    expect(piece.orientation).not.equal(clonePiece.orientation);
}

export function test_clone(): void
{ 
  const rng_rotation : 0|1|2|3 = getRandomInt(0, 3) % 4 as 0|1|2|3;
  const rng_pos : Position = {x: getRandomInt(-100, 100), y:getRandomInt(-100, 100)};

  const all_param: {
    shape: I_Piece['shape'], 
    position: Position, 
    rotation: 0|1|2|3, 
    arrow_init: string
  }[] =
  ALL_SHAPES.map(shape => 
    (
      { 
        shape, 
        position: rng_pos, 
        rotation: rng_rotation, 
        arrow_init: PieceOrientationAffichage[rng_rotation] 
      }
    )
  );

  it.each(all_param)
  (
    'Shape $shape en $arrow_init($position.x, $position.y) cloné, objet distinct.', 
    defaut
  );
}
