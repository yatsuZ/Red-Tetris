import { expect, it } from 'vitest';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { Board } from '../../../../src/server/class/Board.js';
import { CellType, DEFAULT_HEIGHT_BOARD, DEFAULT_WIDTH_BOARD } from '../../../../src/server/constant/Board.js';

function sameData() {
	// Arrange
	const original = Board.create();
	// Act
	const clone = original.clone();
	// Assert
	expect(clone.get()).toEqual(original.get());
}

function differentInstance() {
	// Arrange
	const original = Board.create();
	// Act
	const clone = original.clone();
	// Assert
	expect(clone).not.toBe(original);
}

function matrixIsolation() {
	// Arrange
	const original = Board.create();
	const clone = original.clone();
	// Act — modifier une cellule intérieure (vide) du clone
	clone.board[1]![1] = CellType.WALL;
	// Assert — l'original ne doit pas être affecté
	expect(original.board[1]![1]).toBe(CellType.EMPTY);
}

function cloneCustomSize(w: number, h: number) {
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

	it.each([{ displayH: DEFAULT_HEIGHT_BOARD, displayW: DEFAULT_WIDTH_BOARD }])(
		"Clone a les mêmes données que l'original (h: $displayH, w: $displayW)",
		sameData,
	);

	it('Clone retourne une instance differente', differentInstance);

	it("Clone est une copie profonde (modifier le clone ne touche pas l'original)", matrixIsolation);

	it.each([{ h, w }])('Clone fonctionne avec dimensions custom (h: $h, w: $w)', () => cloneCustomSize(w, h));
}
