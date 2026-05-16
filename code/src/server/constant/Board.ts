import type { Matrix } from "../interface/I_Piece.js";

export enum ErrorInitMsgBoard {
  DEFAULT = "No valid input constructor Board. ",
  HEIGHT_LOW = "Cause : height too low.",
  HEIGHT_HIGH = "Cause : height too high.",
  WIDTH_LOW = "Cause : width too low.",
  WIDTH_HIGH = "Cause : width too high.",
  WIDTH_HEIGHT = "Cause : width too large in relation to height"
}

export const DEFAULT_HEIGHT_BOARD : number = 20;
export const DEFAULT_WIDTH_BOARD : number = 10;

// ENUM
export enum ResultMethod {
  ERROR  = -1,
  SUCCESS = 0,
  FAIL = 1
}

export enum CelluleType {
  EMPTY = 0,
  PIECE = 1,
  WALL = 2,
  SPAWN = 3,
}

export enum StatePieceCollision {
  OUT_BOARD = -1,
  NO_COLLISION = 0,
  PIECE_COLLISION  = 1,
  SIDE_COLLISION = 2,
  GROUND_COLLISION = 3
}

export enum StateLine {
  ERROR  = -1,
  EMPTY = 0,
  PARTIAL = 1,
  FULL = 2
}
// ARRAY

// Symboles d'affichage associés à chaque valeur de CelluleType (dans l'ordre de l'enum)
export const CELLULE_SYMBOLS: Record<CelluleType, string> = {
  [CelluleType.EMPTY]: ' ',
  [CelluleType.PIECE]: 'O',
  [CelluleType.WALL]: '|',
  [CelluleType.SPAWN]: 'X',
};
export const CELLULE_EMOJI: Record<CelluleType, string> = {
  [CelluleType.EMPTY]: '⬜',
  [CelluleType.PIECE]: '⬛',
  [CelluleType.WALL]: '🧱',
  [CelluleType.SPAWN]: '❌',
};
// Grille par défaut : 10 colonnes jouables, bordures (2=mur), plafond (3), sol (2)
export const EXEMPLE_DEFAULT_BOARD_MATRIX: Matrix = [
[2,2,2,2,2,2,2,2,2,2,2,2],//  -3
[2,0,0,0,0,0,0,0,0,0,0,2],//  -2
[2,0,0,0,0,0,0,0,0,0,0,2],//  -1
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