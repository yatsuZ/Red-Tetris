import { expect, it } from 'vitest';
import { Board } from '../../../../src/server/class/Board.js';
import { Piece } from '../../../../src/server/class/Piece.js';
import { CellType, MethodResult } from '../../../../src/server/constant/Board.js';
import { showBoard } from '../../../../src/server/utils/showBoard.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import type { Position } from '../../../../src/server/interface/IPiece.js';

const SHOW_LOGS = false;

// Piece 'O' = [[1,1],[1,1]] — 2x2, simple a verifier
// Board defaut : realHeight=24, realWidth=12
// Positions valides pour 'O' : x dans [1,21], y dans [1,9]
function validPlacement(pos: Position) {
	// Arrange
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	if (SHOW_LOGS) {
		console.log(`=== AVANT addPiece (O en x:${pos.x} y:${pos.y}) ===`);
		showBoard(board.grid, 'ASCII');
	}

	// Act
	const result = board.addPiece(piece, pos);

	if (SHOW_LOGS) {
		console.log(`=== APRES addPiece (O en x:${pos.x} y:${pos.y}) ===`);
		showBoard(board.grid, 'ASCII');
	}

	// Assert
	const row1 = board.grid[pos.x];
	const row2 = board.grid[pos.x + 1];
	if (row1 === undefined || row2 === undefined) throw new Error('position hors board');

	expect(result).toBe(MethodResult.SUCCESS);
	expect(row1[pos.y]).toBe(CellType.PIECE);
	expect(row1[pos.y + 1]).toBe(CellType.PIECE);
	expect(row2[pos.y]).toBe(CellType.PIECE);
	expect(row2[pos.y + 1]).toBe(CellType.PIECE);
	expect(piece.position).toEqual(pos);
}

function overwritePreviousPiece() {
	// Arrange — deux pièces O qui se chevauchent sur une colonne
	// O1 en (2,2) occupe : (2,2)(2,3)(3,2)(3,3)
	// O2 en (2,3) occupe : (2,3)(2,4)(3,3)(3,4)  ← (2,3) et (3,3) déjà PIECE
	const board = Board.create();
	const piece = new Piece('O', { x: 0, y: 0 });

	board.addPiece(piece, { x: 2, y: 2 });
	if (SHOW_LOGS) {
		console.log('=== APRES 1er addPiece (O en x:2 y:2) ===');
		showBoard(board.grid, 'ASCII');
	}

	// Act — doit réussir sans throw même si des cellules sont déjà PIECE
	const result = board.addPiece(piece, { x: 2, y: 3 });
	if (SHOW_LOGS) {
		console.log('=== APRES 2eme addPiece (O en x:2 y:3) ===');
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
	const piece = new Piece('O', { x: 0, y: 0 });
	const pos = { x: -1, y: 1 };

	// Assert
	expect(() => board.addPiece(piece, pos)).toThrow('addPiece: out of bounds write');
}

function imbriquer() {
	// Arrange
	const board = Board.create();
	const piece1 = new Piece('I', { x: 18, y: 1 }, 1);
	const piece2 = new Piece('T', { x: 21, y: 1 }, 2);
	const piece3 = new Piece('Z', { x: 21, y: 3 });

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

export function test_addPiece(): void {
	const randX = getRandomInt(1, 21);
	const randY = getRandomInt(1, 9);

	it.each([
		{ x: 0, y: 0 }, // sur les murs (haut-gauche)
		{ x: 1, y: 1 }, // coin haut-gauche interieur
		{ x: 1, y: 9 }, // coin haut-droite interieur
		{ x: 21, y: 1 }, // coin bas-gauche interieur
		{ x: 21, y: 9 }, // coin bas-droite interieur
		{ x: randX, y: randY }, // position aleatoire
	])('Place une piece O en (x:$x, y:$y)', (pos) => validPlacement(pos));

	it('Ecrase les cellules PIECE existantes sans throw', overwritePreviousPiece);
	it('Throw si la position dépasse les limites du tableau', outOfBounds);
	it('Imbriqué', imbriquer);
}
