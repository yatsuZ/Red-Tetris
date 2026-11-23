import { afterEach, describe, expect, it, vi } from 'vitest';
import { showBoard } from '../../../src/server/utils/showBoard.js';
import { CellType } from '../../../src/server/constants/board.js';

const mini = [
	[CellType.WALL, CellType.PIECE],
	[CellType.EMPTY, CellType.SPAWN],
];

describe('showBoard', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('ASCII', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		showBoard(mini, 'ASCII');

		expect(spy).toHaveBeenCalledTimes(3);
		expect(spy).toHaveBeenNthCalledWith(1, 'Ligne 0:\t | O ');
		expect(spy).toHaveBeenNthCalledWith(2, 'Ligne 1:\t   X ');
		expect(spy).toHaveBeenNthCalledWith(3, '');
	});

	it('EMOJI par défaut', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		showBoard(mini);

		expect(spy).toHaveBeenNthCalledWith(1, 'Ligne 0:\t 🧱 ⬛ ');
		expect(spy).toHaveBeenNthCalledWith(2, 'Ligne 1:\t ⬜ ❌ ');
	});
});
