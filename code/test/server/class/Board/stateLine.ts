import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { StateLine} from "../../../../src/server/constant/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = false;

const LINE_SELECT = 1;

function stateLine_error() {
  // create
  const board = Board.create();

  // Verif
  const results = board.stateLine(-1);

  // Assert
  expect(results).toBe(StateLine.ERROR);
}

function stateLine_empty() {
  // create
  const board = Board.create();

  // Verif
  const results = board.stateLine(LINE_SELECT);

  // Assert
  expect(results).toBe(StateLine.EMPTY);
}

// la dernier colonne est vide
function stateLine_partial() {
	// create
  const board = Board.create();
  const piece = new Piece('O', { x: LINE_SELECT, y: 1 });

  // Act
  for (let i = 0; i < 4; i++) {
  board.addPiece(piece, piece.position)
  piece.position.y += 2;
  }
  piece.position.y -= 1;
  board.addPiece(piece, piece.position)

  // Verif
  const results = board.stateLine(LINE_SELECT);

  if (SHOW_BOARD) show_board(board.board, "ASCII");
  // Assert
  expect(results).toBe(StateLine.PARTIAL);
}

function stateLine_full() {
  // create
  const board = Board.create();
  const piece = new Piece('O', { x: LINE_SELECT, y: 1 });

  // Act
	for (let i = 0; i < 5; i++) {
		board.addPiece(piece, piece.position)
		piece.position.y += 2;
	}

  // Verif
  const results = board.stateLine(LINE_SELECT);

  if (SHOW_BOARD) show_board(board.board, "ASCII");
  // Assert
  expect(results).toBe(StateLine.FULL);
}

export function test_stateLine(): void {
	it('StateLine ERROR   : Error ligne non existante',	stateLine_error);
	it('StateLine EMPTY   : La ligne est vide', stateLine_empty);
	it('StateLine PARTIAL : La ligne est partielement remplie', stateLine_partial);
	it('StateLine FULL    : La ligne est remplie', stateLine_full);
}
