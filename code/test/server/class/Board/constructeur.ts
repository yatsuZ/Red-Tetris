import { expect, it } from 'vitest';
import { Piece } from '../../../../src/server/class/Piece.js';
import { type IPiece, type PieceData, type Position } from '../../../../src/server/interface/IPiece.js';
import { getRandomInt } from '../../../../src/server/utils/rng.js';
import { Board } from '../../../../src/server/class/Board.js';
import type { BoardData, CellMatrix } from '../../../../src/server/interface/IBoard.js';
import {
	CELL_EMOJI,
	CellType,
	DEFAULT_HEIGHT_BOARD,
	DEFAULT_WIDTH_BOARD,
	BoardInitError,
	EXAMPLE_BOARD_MATRIX,
} from '../../../../src/server/constant/Board.js';

function defaut() {
	// Arrange
	const terrain = Board.create();
	// Act — (ici rien, on teste juste l'état initial)

	// Assert
	const ref: BoardData = {
		width: DEFAULT_WIDTH_BOARD,
		height: DEFAULT_HEIGHT_BOARD,
		realHeight: DEFAULT_HEIGHT_BOARD + 4,
		realWidth: DEFAULT_WIDTH_BOARD + 2,
		highestPoint: DEFAULT_HEIGHT_BOARD,
		board: [...EXAMPLE_BOARD_MATRIX],
	};
	expect(terrain.get()).toEqual(ref);
}

function init(width: number, height: number) {
	const terrain: Board = Board.create(height, width);
	const ref: BoardData = {
		width: width,
		height: height,
		realHeight: height + 4,
		realWidth: width + 2,
		highestPoint: height,
		board: [...terrain.getMatrix()],
	};
	expect(terrain.get()).toEqual(ref);
}

export function test_Constructeur(): void {
	const heightTooSmall: number = getRandomInt(-100, 3);
	const heightTooHigh: number = getRandomInt(81, 100);
	const widthTooSmall: number = getRandomInt(-100, 3);
	const widthTooHigh: number = getRandomInt(41, 100);
	const w = getRandomInt(4, 40);
	const h = w * 2;

	it.each([{ displayH: DEFAULT_HEIGHT_BOARD, displayW: DEFAULT_WIDTH_BOARD }])(
		'Génération Board par défaut (h: $displayH, w: $displayW)',
		defaut,
	);
	it.each([{ h: h, w: w }])('Génération Board par défaut (h: $h, w: $w)', () => {
		init(w, h);
	});

	it.each([
		[heightTooSmall, 10, BoardInitError.HEIGHT_LOW], // [height, width, specificError]
		[heightTooHigh, 10, BoardInitError.HEIGHT_HIGH],
		[20, widthTooSmall, BoardInitError.WIDTH_LOW],
		[20, widthTooHigh, BoardInitError.WIDTH_HIGH],
		[20, 40, BoardInitError.WIDTH_HEIGHT], // height < width
	])('Doit throw la bonne erreur pour h:%i, w:%i', (h, w, specificError) => {
		expect(() => Board.create(h, w)).toThrow(BoardInitError.DEFAULT + specificError);
	});
}
