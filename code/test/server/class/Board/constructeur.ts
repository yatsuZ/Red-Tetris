import { expect, it } from "vitest";
import { Piece } from "../../../../src/server/class/Piece.js";
import { type I_Piece, type PieceData, type Position } from "../../../../src/server/interface/I_Piece.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { Board } from "../../../../src/server/class/Board.js";
import type { BoardData, MatrixCellule } from "../../../../src/server/interface/I_Board.js";
import { CELLULE_EMOJI, CelluleType, DEFAULT_HEIGHT_BOARD, DEFAULT_WIDTH_BOARD, ErrorInitMsgBoard, EXEMPLE_DEFAULT_BOARD_MATRIX } from "../../../../src/server/constant/Board.js";

function defaut() {
    // Arrange
    const terrain = new Board();
    // Act — (ici rien, on teste juste l'état initial)

    // Assert
    const ref : BoardData = {
      width: DEFAULT_WIDTH_BOARD,
      height: DEFAULT_HEIGHT_BOARD,
      real_height: DEFAULT_HEIGHT_BOARD + 4,
      real_width: DEFAULT_WIDTH_BOARD + 2,
      highest_point: DEFAULT_HEIGHT_BOARD,
      board: [...EXEMPLE_DEFAULT_BOARD_MATRIX]
    }
    expect(terrain.get()).toEqual(ref);
}

function init(width : number, height : number)
{
  const terrain : Board = new Board(height, width);
  const ref : BoardData = {
    width: width,
    height: height,
    real_height: height + 4,
    real_width: width + 2,
    highest_point: height,
    board: [...terrain.getMatrix()]
  }
  expect(terrain.get()).toEqual(ref);
}

export function test_Constructeur(): void
{ 
  const height_too_small: number = getRandomInt(-100, 3);
  const height_too_high: number = getRandomInt(81, 100);
  const width_too_small: number = getRandomInt(-100, 3);
  const width_too_high: number = getRandomInt(41, 100);
  const w = getRandomInt(4, 40);
  const h = w*2;

  it.each([{ affichage_h: DEFAULT_HEIGHT_BOARD, affichage_w: DEFAULT_WIDTH_BOARD }])('Generation Board par defaut (h: $affichage_h, w: $affichage_w)', defaut);
  it.each([{ h: h, w: w }])('Generation Board par defaut (h: $h, w: $w)', () => {init(w, h)});

  it.each([
    [height_too_small, 10, ErrorInitMsgBoard.HEIGHT_LOW],  // [height, width, specific_error]
    [height_too_high, 10, ErrorInitMsgBoard.HEIGHT_HIGH],
    [20, width_too_small, ErrorInitMsgBoard.WIDTH_LOW],
    [20, width_too_high, ErrorInitMsgBoard.WIDTH_HIGH],
    [20, 40, ErrorInitMsgBoard.WIDTH_HEIGHT], // height < width
  ])('Doit throw la bonne erreur pour h:%i, w:%i', (h, w, specificError) => {
    expect(() => new Board(h, w)).toThrow(ErrorInitMsgBoard.DEFAULT + specificError);
  });
}
