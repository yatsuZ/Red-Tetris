import { expect, it } from "vitest";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { Board } from "../../../../src/server/class/Board.js";
import { CelluleType, DEFAULT_HEIGHT_BOARD, DEFAULT_WIDTH_BOARD } from "../../../../src/server/constant/Board.js";

function same_data() {
  // Arrange
  const original = Board.create();
  // Act
  const clone = original.clone();
  // Assert
  expect(clone.get()).toEqual(original.get());
}

function different_instance() {
  // Arrange
  const original = Board.create();
  // Act
  const clone = original.clone();
  // Assert
  expect(clone).not.toBe(original);
}

function matrix_isolation() {
  // Arrange
  const original = Board.create();
  const clone = original.clone();
  // Act — modifier une cellule intérieure (vide) du clone
  clone.board[1]![1] = CelluleType.WALL;
  // Assert — l'original ne doit pas être affecté
  expect(original.board[1]![1]).toBe(CelluleType.EMPTY);
}

function clone_custom_size(w: number, h: number) {
  // Arrange
  const original = Board.create(h, w);
  // Act
  const clone = original.clone();
  // Assert
  expect(clone.get()).toEqual(original.get());
}

export function test_clone(): void {
  const w = getRandomInt(4, 40);
  const h = w * 2;

  it.each([{ affichage_h: DEFAULT_HEIGHT_BOARD, affichage_w: DEFAULT_WIDTH_BOARD }])(
    "Clone a les memes donnees que l'original (h: $affichage_h, w: $affichage_w)",
    same_data
  );

  it('Clone retourne une instance differente', different_instance);

  it('Clone est une copie profonde (modifier le clone ne touche pas l\'original)', matrix_isolation);

  it.each([{ h, w }])(
    'Clone fonctionne avec dimensions custom (h: $h, w: $w)',
    () => clone_custom_size(w, h)
  );
}
