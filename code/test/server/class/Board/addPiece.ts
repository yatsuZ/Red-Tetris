import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { CelluleType, ResultMethod } from "../../../../src/server/constant/Board.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import type { Position } from "../../../../src/server/interface/I_Piece.js";

const SHOW_LOGS = false;

// Piece 'O' = [[1,1],[1,1]] — 2x2, simple a verifier
// Board defaut : real_height=24, real_width=12
// Positions valides pour 'O' : x dans [1,21], y dans [1,9]
function place_valide(pos: Position) {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });

  if (SHOW_LOGS) { console.log(`=== AVANT addPiece (O en x:${pos.x} y:${pos.y}) ===`); show_board(board.board, "ASCII"); }

  // Act
  const result = board.addPiece(piece, pos);

  if (SHOW_LOGS) { console.log(`=== APRES addPiece (O en x:${pos.x} y:${pos.y}) ===`); show_board(board.board, "ASCII"); }

  // Assert
  const row1 = board.board[pos.x];
  const row2 = board.board[pos.x + 1];
  if (row1 === undefined || row2 === undefined)
    throw new Error("position hors board");

  expect(result).toBe(ResultMethod.SUCCESS);
  expect(row1[pos.y]).toBe(CelluleType.PIECE);
  expect(row1[pos.y + 1]).toBe(CelluleType.PIECE);
  expect(row2[pos.y]).toBe(CelluleType.PIECE);
  expect(row2[pos.y + 1]).toBe(CelluleType.PIECE);
  expect(piece.position).toEqual(pos);
}

function ecrase_piece_precedente() {
  // Arrange — deux pièces O qui se chevauchent sur une colonne
  // O1 en (2,2) occupe : (2,2)(2,3)(3,2)(3,3)
  // O2 en (2,3) occupe : (2,3)(2,4)(3,3)(3,4)  ← (2,3) et (3,3) déjà PIECE
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });

  board.addPiece(piece, { x: 2, y: 2 });
  if (SHOW_LOGS) { console.log("=== APRES 1er addPiece (O en x:2 y:2) ==="); show_board(board.board, "ASCII"); }

  // Act — doit réussir sans throw même si des cellules sont déjà PIECE
  const result = board.addPiece(piece, { x: 2, y: 3 });
  if (SHOW_LOGS) { console.log("=== APRES 2eme addPiece (O en x:2 y:3) ==="); show_board(board.board, "ASCII"); }

  // Assert — les 6 cellules uniques des deux pièces sont toutes PIECE
  const row2 = board.board[2];
  const row3 = board.board[3];
  if (row2 === undefined || row3 === undefined)
    throw new Error("position hors board");

  expect(result).toBe(ResultMethod.SUCCESS);
  expect(row2[2]).toBe(CelluleType.PIECE);
  expect(row2[3]).toBe(CelluleType.PIECE);
  expect(row2[4]).toBe(CelluleType.PIECE);
  expect(row3[2]).toBe(CelluleType.PIECE);
  expect(row3[3]).toBe(CelluleType.PIECE);
  expect(row3[4]).toBe(CelluleType.PIECE);
}

function hors_memoire() {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });
  const pos = { x: -1, y: 1 };

  // Assert
  expect(() => board.addPiece(piece, pos)).toThrow("addPiece: écriture hors mémoire");
}

export function test_addPiece(): void {
  const rand_x = getRandomInt(1, 21);
  const rand_y = getRandomInt(1, 9);

  it.each([
    { x: 0,       y: 0 },       // sur les murs (haut-gauche)
    { x: 1,       y: 1 },       // coin haut-gauche interieur
    { x: 1,       y: 9 },       // coin haut-droite interieur
    { x: 21,      y: 1 },       // coin bas-gauche interieur
    { x: 21,      y: 9 },       // coin bas-droite interieur
    { x: rand_x,  y: rand_y },  // position aleatoire
  ])('Place une piece O en (x:$x, y:$y)', (pos) => place_valide(pos));

  it('Ecrase les cellules PIECE existantes sans throw', ecrase_piece_precedente);
  it('Throw si la position depasse les limites du tableau', hors_memoire);
}
