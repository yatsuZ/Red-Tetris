import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { CelluleType, ResultMethod, StatePieceCollision } from "../../../../src/server/constant/Board.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import type { Position } from "../../../../src/server/interface/I_Piece.js";
import { log_collision_matrix } from "../../../../src/server/utils/showStateColision.js";

const SHOW_LOGS = true;

// Piece 'O' = [[1,1],[1,1]] — 2x2
// Board defaut : real_height=24 (sol=ligne 23), real_width=12 (murs col 0 et 11)

function log(board: Board, label: string) {
  if (!SHOW_LOGS) return;
  console.log(label);
  // show_board(board.board, "ASCII");
}


function position_valide() {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos: Position = { x: 5, y: 5 };

  log(board, `=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);

  // Act
  const { matrix, res } = board.canAddPiece(piece, pos);
  log_collision_matrix(matrix, "  collision matrix:", SHOW_LOGS);

  // Assert
  expect(res).toBe(ResultMethod.SUCCESS);
  expect(matrix).toEqual([
    [StatePieceCollision.NO_COLLISION, StatePieceCollision.NO_COLLISION],
    [StatePieceCollision.NO_COLLISION, StatePieceCollision.NO_COLLISION],
  ]);
}

function hors_memoire() {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos: Position = { x: 100, y: 5 };

  log(board, `=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);

  // Act
  const { matrix, res } = board.canAddPiece(piece, pos);
  log_collision_matrix(matrix, "  collision matrix:", SHOW_LOGS);

  // Assert
  expect(res).toBe(ResultMethod.ERROR);
  expect(matrix).toEqual([
    [StatePieceCollision.OUT_BOARD, StatePieceCollision.OUT_BOARD],
    [StatePieceCollision.OUT_BOARD, StatePieceCollision.OUT_BOARD],
  ]);
}

function collision_mur_lateral() {
  // Arrange — O en (5,0) : col 0 = mur gauche
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos: Position = { x: 5, y: 0 };

  log(board, `=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);

  // Act
  const { matrix, res } = board.canAddPiece(piece, pos);
  log_collision_matrix(matrix, "  collision matrix:", SHOW_LOGS);

  // Assert — col 0 = SIDE, col 1 = NO_COLLISION
  expect(res).toBe(ResultMethod.FAIL);
  expect(matrix).toEqual([
    [StatePieceCollision.SIDE_COLLISION, StatePieceCollision.NO_COLLISION],
    [StatePieceCollision.SIDE_COLLISION, StatePieceCollision.NO_COLLISION],
  ]);
}

function collision_sol() {
  // Arrange — O en (22,5) : ligne 23 = sol (real_height-1)
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos: Position = { x: 22, y: 5 };

  log(board, `=== canAddPiece O en (x:${pos.x} y:${pos.y}) ===`);

  // Act
  const { matrix, res } = board.canAddPiece(piece, pos);
  log_collision_matrix(matrix, "  collision matrix:", SHOW_LOGS);

  // Assert — ligne 22 = NO_COLLISION, ligne 23 = sol
  expect(res).toBe(ResultMethod.FAIL);
  expect(matrix).toEqual([
    [StatePieceCollision.NO_COLLISION,            StatePieceCollision.NO_COLLISION],
    [StatePieceCollision.GROUND_COLLISION, StatePieceCollision.GROUND_COLLISION],
  ]);
}

function collision_piece_existante() {
  // Arrange — on place d'abord une pièce, puis on vérifie la même position
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos: Position = { x: 5, y: 5 };

  board.addPiece(piece, pos);
  log(board, `=== canAddPiece O en (x:${pos.x} y:${pos.y}) apres addPiece ===`);

  // Act
  const { matrix, res } = board.canAddPiece(piece, pos);
  log_collision_matrix(matrix, "  collision matrix:", SHOW_LOGS);

  // Assert
  expect(res).toBe(ResultMethod.FAIL);
  expect(matrix).toEqual([
    [StatePieceCollision.PIECE_COLLISION, StatePieceCollision.PIECE_COLLISION],
    [StatePieceCollision.PIECE_COLLISION, StatePieceCollision.PIECE_COLLISION],
  ]);
}

export function test_canAddPiece(): void {
  it('Position valide : res SUCCESS, matrix tout NO_COLLISION',      position_valide);
  it('Hors memoire   : res ERROR,   matrix tout OUT_BOARD',   hors_memoire);
  it('Mur lateral    : res FAIL,    SIDE_COLLISION col 0',    collision_mur_lateral);
  it('Sol            : res FAIL,    GROUND_COLLISION ligne 23', collision_sol);
  it('Piece existante: res FAIL,    PIECE_COLLISION sur toutes les cases', collision_piece_existante);
}
