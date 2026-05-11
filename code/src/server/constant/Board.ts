import type { Matrix } from "../interface/I_Piece.js";

// ENUM
export enum ResultMethod {
  SUCCESS = 0,
  FAIL = 1,
  ERROR  = 2
}

export enum CelluleType {
  EMPTY = 0,
  PIECE = 1,
  WALL = 2,
  CEILING_LIMIT = 3
}

export enum StatePieceCollision {
  OUT_BOARD = -1,
  EMPTY = 0,
  PIECE  = 1,
  SIDE_COLLISION = 2,
  GROUND_COLLISION = 3,
  CEILING_COLLISION = 4
}

export enum StateLine {
  EMPTY = 0,
  PARTIAL = 1,
  FULL = 2
}

// ARRAY

// CelluleType longuer du nombre de celule type
export const CELLULE_SYMBOLS: string[] = ['V', 'O', 'W', 'L'];
// 10 sur 20, 0 == vide, 
export const EXEMPLE_DEFAULT_BOARD_MATRIX: Matrix = [
[2,3,3,3,3,3,3,3,3,3,3,2],// -1
[2,0,0,0,0,0,0,0,0,0,0,2],//  0
[2,0,0,0,0,0,0,0,0,0,0,2],//  1
[2,0,0,0,0,0,0,0,0,0,0,2],//  2
[2,0,0,0,0,0,0,0,0,0,0,2],//  3
[2,0,0,0,0,0,0,0,0,0,0,2],//  4
[2,0,0,0,0,0,0,0,0,0,0,2],//  5
[2,0,0,0,0,0,0,0,0,0,0,2],//  6
[2,0,0,0,0,0,0,0,0,0,0,2],//  7
[2,0,0,0,0,0,0,0,0,0,0,2],//  8
[2,0,0,0,0,0,0,0,0,0,0,2],//  9
[2,0,0,0,0,0,0,0,0,0,0,2],//  10
[2,0,0,0,0,0,0,0,0,0,0,2],//  11
[2,0,0,0,0,0,0,0,0,0,0,2],//  12
[2,0,0,0,0,0,0,0,0,0,0,2],//  13
[2,0,0,0,0,0,0,0,0,0,0,2],//  14
[2,0,0,0,0,0,0,0,0,0,0,2],//  15
[2,0,0,0,0,0,0,0,0,0,0,2],//  16
[2,0,0,0,0,0,0,0,0,0,0,2],//  17
[2,0,0,0,0,0,0,0,0,0,0,2],//  18
[2,0,0,0,0,0,0,0,0,0,0,2],//  19
[2,2,2,2,2,2,2,2,2,2,2,2],//  20
]