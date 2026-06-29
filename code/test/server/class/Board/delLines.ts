import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { CelluleType, ResultMethod } from "../../../../src/server/constant/Board.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = false;

// Board defaut : real_height=24, real_width=12
// Lignes jouables valides : 1 a 22
// Piece 'O' = [[1,1],[1,1]] — 2x2

function delLines_valide() {
  // Arrange
  const board = Board.create();
  const indexLines = [5, 8, 12];

  // on place une piece O sur chaque ligne a tester
  indexLines.forEach(indexLine => {
    const piece = new Piece('O', { x: indexLine, y: 4 });
    board.addPiece(piece, piece.position);
  });

  if (SHOW_LOGS) {
    console.log(`=== AVANT delLines(${indexLines}) ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
  }

  // Act
  const results = board.delLines(indexLines);

  if (SHOW_LOGS) {
    console.log(`=== APRES delLines(${indexLines}) ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
    results.forEach(({ indexLine, res }) => {
      console.log(`delLine(${indexLine}) = ${res} (attendu: ${ResultMethod.SUCCESS})`);
    });
  }

  // Assert — chaque ligne retourne SUCCESS et est videe
  results.forEach(({ indexLine, res }) => {
    expect(res).toBe(ResultMethod.SUCCESS);
    const row = board.board[indexLine]!;
    expect(row[4]).toBe(CelluleType.EMPTY);
    expect(row[5]).toBe(CelluleType.EMPTY);
    // murs preserves
    expect(row[0]).toBe(CelluleType.WALL);
    expect(row[board.real_width - 1]).toBe(CelluleType.WALL);
  });
}

function delLines_invalide() {
  // Arrange
  const board = Board.create();
  const indexLines = [0, board.real_height - 1]; // mur haut et mur bas

  if (SHOW_LOGS) {
    console.log(`=== delLines invalide (${indexLines}) ===`);
  }

  // Act
  const results = board.delLines(indexLines);

  if (SHOW_LOGS) {
    results.forEach(({ indexLine, res }) => {
      console.log(`delLine(${indexLine}) = ${res} (attendu: ${ResultMethod.ERROR})`);
    });
  }

  // Assert
  results.forEach(({ indexLine: _, res }) => {
    expect(res).toBe(ResultMethod.ERROR);
  });
}

function delLines_mixte() {
  // Arrange — indices valides et invalides melanges
  const board = Board.create();
  const piece = new Piece('O', { x: 6, y: 4 });
  board.addPiece(piece, piece.position);

  const indexLines = [0, 6, board.real_height - 1]; // invalide, valide, invalide

  if (SHOW_LOGS) {
    console.log(`=== AVANT delLines mixte (${indexLines}) ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
  }

  // Act
  const results = board.delLines(indexLines);

  if (SHOW_LOGS) {
    console.log(`=== APRES delLines mixte (${indexLines}) ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
    results.forEach(({ indexLine, res }) => console.log(`delLine(${indexLine}) = ${res}`));
  }

  // Assert
  expect(results[0]?.res).toBe(ResultMethod.ERROR);   // index 0  -> ERROR
  expect(results[1]?.res).toBe(ResultMethod.SUCCESS);  // index 6  -> SUCCESS
  expect(results[2]?.res).toBe(ResultMethod.ERROR);    // index 23 -> ERROR
}

export function test_delLines(): void {
  it('delLines valide   : tous SUCCESS et lignes videes', delLines_valide);
  it('delLines invalide : tous ERROR',                    delLines_invalide);
  it('delLines mixte   : ERROR/SUCCESS/ERROR',            delLines_mixte);
}
