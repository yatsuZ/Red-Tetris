import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { Piece } from '../../../../src/server/models/Piece.js';
import { CellType, MethodResult } from '../../../../src/server/constants/board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import type { Position } from '../../../../src/server/types/IPiece.js';

const SHOW_LOGS = false;

// Piece 'O' = [[1,1],[1,1]] — 2x2, simple a verifier
// Board defaut : realHeight=24, realWidth=12
// Positions valides pour 'O' : x dans [1,21], y dans [1,9]
function validPlacement(pos: Position) {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });

	if (SHOW_LOGS) {
		console.log(`=== AVANT addPiece (O en row:${pos.row} col:${pos.col}) ===`);
		showBoard(board.grid, 'ASCII');
	}

	// Act
	const result = board.addPiece(piece, pos);

	if (SHOW_LOGS) {
		console.log(`=== APRES addPiece (O en row:${pos.row} col:${pos.col}) ===`);
		showBoard(board.grid, 'ASCII');
	}

	// Assert
	const row1 = board.grid[pos.row];
	const row2 = board.grid[pos.row + 1];
	if (row1 === undefined || row2 === undefined) throw new Error('position hors board');

	expect(result).toBe(MethodResult.SUCCESS);
	expect(row1[pos.col]).toBe(CellType.PIECE);
	expect(row1[pos.col + 1]).toBe(CellType.PIECE);
	expect(row2[pos.col]).toBe(CellType.PIECE);
	expect(row2[pos.col + 1]).toBe(CellType.PIECE);
	expect(piece.position).toEqual(pos);
}

function overwritePreviousPiece() {
	// Arrange — deux pièces O qui se chevauchent sur une colonne
	// O1 en (2,2) occupe : (2,2)(2,3)(3,2)(3,3)
	// O2 en (2,3) occupe : (2,3)(2,4)(3,3)(3,4)  ← (2,3) et (3,3) déjà PIECE
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });

	board.addPiece(piece, { row: 2, col: 2 });
	if (SHOW_LOGS) {
		console.log('=== APRES 1er addPiece (O en row:2 col:2) ===');
		showBoard(board.grid, 'ASCII');
	}

	// Act — doit réussir sans throw même si des cellules sont déjà PIECE
	const result = board.addPiece(piece, { row: 2, col: 3 });
	if (SHOW_LOGS) {
		console.log('=== APRES 2eme addPiece (O en row:2 col:3) ===');
		showBoard(board.grid, 'ASCII');
	}

	// Assert — les 6 cellules uniques des deux pièces sont toutes PIECE
	const row2 = board.grid[2];
	const row3 = board.grid[3];
	if (row2 === undefined || row3 === undefined) throw new Error('position hors board');

	expect(result).toBe(MethodResult.SUCCESS);
	expect(row2[2]).toBe(CellType.PIECE);
	expect(row2[3]).toBe(CellType.PIECE);
	expect(row2[4]).toBe(CellType.PIECE);
	expect(row3[2]).toBe(CellType.PIECE);
	expect(row3[3]).toBe(CellType.PIECE);
	expect(row3[4]).toBe(CellType.PIECE);
}

function outOfBounds() {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { row: 0, col: 0 });
	const pos = { row: -1, col: 1 };

	// Assert
	expect(() => board.addPiece(piece, pos)).toThrow('addPiece: out of bounds write');
}

function imbriquer() {
	// Arrange
	const board = Board.create();
	const piece1 = new Piece('I', { row: 18, col: 1 }, 1);
	const piece2 = new Piece('T', { row: 21, col: 1 }, 2);
	const piece3 = new Piece('Z', { row: 21, col: 3 });

	// Act
	expect(board.addPiece(piece1, piece1.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}
	expect(board.addPiece(piece2, piece2.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}

	expect(board.addPiece(piece3, piece3.position)).toBe(MethodResult.SUCCESS);
	if (SHOW_LOGS) {
		showBoard(board.grid, 'ASCII');
	}
}

export function testAddPiece(): void {
	const randX = getRandomInt(1, 21);
	const randY = getRandomInt(1, 9);

	it.each([
		{ row: 0, col: 0 }, // sur les murs (haut-gauche)
		{ row: 1, col: 1 }, // coin haut-gauche interieur
		{ row: 1, col: 9 }, // coin haut-droite interieur
		{ row: 21, col: 1 }, // coin bas-gauche interieur
		{ row: 21, col: 9 }, // coin bas-droite interieur
		{ row: randX, col: randY }, // position aleatoire
	])('Place une piece O en (row:$row, col:$col)', (pos) => validPlacement(pos));

	it('Ecrase les cellules PIECE existantes sans throw', overwritePreviousPiece);
	it('Throw si la position dépasse les limites du tableau', outOfBounds);
	it('Imbriqué', imbriquer);
}
