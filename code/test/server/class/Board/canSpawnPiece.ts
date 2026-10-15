import { describe, it, expect, vi, afterEach } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import { ResultMethod } from "../../../../src/server/constant/Board.js";

const SHOW_LOGS = false;
const SHOW_BOARD = false;

function spawn_valide() {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 0, y: 0 });

  if (SHOW_LOGS)
  {
    console.log(`=== canSpawnPiece O ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
  }

  // Act
  const res = board.canSpawnPiece(piece);

  // Assert
  expect(res).toBe(ResultMethod.SUCCESS);
}

function spawn_invalide() {
  // Arrange
  const board = Board.create();
  const piece = new Piece('O', { x: 1, y: 4});


  board.addPiece(piece, { x: 1, y: 4});

  if (SHOW_LOGS)
  {
    console.log(`=== canSpawnPiece O ===`);
    if (SHOW_BOARD) show_board(board.board, "ASCII");
  }

  // Act
  const res = board.canSpawnPiece(piece);

  // Assert
  expect(res).toBe(ResultMethod.FAIL);
}

function error_get_largeur()
{
	describe("Fail get largeur Piece", () => {
		afterEach(() => {
			vi.restoreAllMocks(); // remet les vraies méthodes après chaque test
		});

		it("renvoie ERROR si la largeur de la pièce vaut -1", () => {
			// Arrange
			const board = Board.create();
			const piece = new Piece('O', { x: 0, y: 0 });

			if (SHOW_LOGS)
			{
				console.log(`=== canSpawnPiece O ===`);
				if (SHOW_BOARD) show_board(board.board, "ASCII");
			}

			// À partir d'ici, piece.getLargeur() renvoie -1
			vi.spyOn(piece, "getMatrix").mockReturnValue([]);

			// Act
			const res = board.canSpawnPiece(piece);

			// Assert
			expect(res).toBe(ResultMethod.ERROR);

		});
	});
}


export function test_canSpawnPiece(): void {
  it('Spawn valide   : res SUCCESS', spawn_valide);
	it('Spawn invalide : res FAIL', spawn_invalide);
  error_get_largeur()
}
