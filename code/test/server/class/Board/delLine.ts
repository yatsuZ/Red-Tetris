import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { CelluleType, ResultMethod } from "../../../../src/server/constant/Board.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = false;

function delLine_valide() {
  // Arrange
  const board = Board.create();
  const indexLine = 5;
  const piece = new Piece('O', { x: indexLine, y: 4 });

  board.addPiece(piece, piece.position);
  // ligne 5 : colonnes 4 et 5 sont maintenant PIECE

  if (SHOW_LOGS) console.log(`=== AVANT delLine(${indexLine}) ===`);
  if (SHOW_BOARD) show_board(board.board, "ASCII");
  if (SHOW_LOGS) {
    console.log(`board[${indexLine}][4] = ${board.board[indexLine]?.[4]} (attendu: ${CelluleType.PIECE})`);
    console.log(`board[${indexLine}][5] = ${board.board[indexLine]?.[5]} (attendu: ${CelluleType.PIECE})`);
  }

  const row_avant = board.board[indexLine]!;
  expect(row_avant[4]).toBe(CelluleType.PIECE);
  expect(row_avant[5]).toBe(CelluleType.PIECE);

  // Act
  const res = board.delLine(indexLine);

  if (SHOW_LOGS) console.log(`=== APRES delLine(${indexLine}) ===`);
  if (SHOW_BOARD) show_board(board.board, "ASCII");
  if (SHOW_LOGS) {
    console.log(`res = ${res} (attendu: ${ResultMethod.SUCCESS})`);
    console.log(`board[${indexLine}][4] = ${board.board[indexLine]?.[4]} (attendu: ${CelluleType.EMPTY})`);
    console.log(`board[${indexLine}][5] = ${board.board[indexLine]?.[5]} (attendu: ${CelluleType.EMPTY})`);
  }

  // Assert
  const row_apres = board.board[indexLine]!;
  expect(res).toBe(ResultMethod.SUCCESS);
  // cellules interieures videes
  expect(row_apres[4]).toBe(CelluleType.EMPTY);
  expect(row_apres[5]).toBe(CelluleType.EMPTY);
  // murs preserves
  expect(row_apres[0]).toBe(CelluleType.WALL);
  expect(row_apres[board.real_width - 1]).toBe(CelluleType.WALL);
}

export function test_delLine(): void {
  it('delLine valide   : res SUCCESS', delLine_valide);
}
