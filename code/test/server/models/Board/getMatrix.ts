import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { CellType } from '../../../../src/server/constants/board.js';

function sameContent() {
	// Arrange
	const board = Board.create();
	// Act
	const matrix = board.getMatrix();
	// Assert
	expect(matrix).toEqual(board.grid);
	expect(matrix).not.toBe(board.grid);
}

function cellIsolation() {
	// Arrange
	const board = Board.create();
	const matrix = board.getMatrix();
	// Act — modifier une cellule de la copie
	matrix[1]![1] = CellType.PIECE;
	// Assert — le board ne doit pas être affecté
	expect(board.grid[1]![1]).toBe(CellType.EMPTY);
}

function toDataIsolation() {
	// Arrange
	const board = Board.create();
	const data = board.toData();
	// Act — modifier une cellule des données exportées
	data.grid[1]![1] = CellType.PIECE;
	// Assert — le board ne doit pas être affecté
	expect(board.grid[1]![1]).toBe(CellType.EMPTY);
}

export function testGetMatrix(): void {
	it('Renvoie le même contenu que la grille, dans un autre tableau', sameContent);
	it('Modifier une cellule de la copie ne touche pas le board', cellIsolation);
	it('Modifier la grille de toData() ne touche pas le board', toDataIsolation);
}
