import { expect, it, vi } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { CellType } from '../../../../src/server/constants/board.js';

export function testGetRandomLine() {
	it('Reste dans les bornes (1000 tirages)', () => {
		for (let i = 0; i < 1000; i++) {
			const board = Board.create();
			const indexLine = board.getRandomLine();
			expect(indexLine).toBeGreaterThanOrEqual(1);
			expect(indexLine).toBeLessThanOrEqual(board.realHeight - 2);
			expect(Number.isInteger(indexLine)).toBeTruthy();
			expect((board.grid[indexLine] as CellType[])[1] as CellType).toBe(CellType.EMPTY);
		}
	});

	it("l'aléatoire est bien borné", () => {
		const board = Board.create();

		vi.spyOn(Math, 'random').mockReturnValue(0);
		const minRes = board.getRandomLine();
		expect(minRes).toBe(1); // min

		vi.spyOn(Math, 'random').mockReturnValue(0.9999);
		const maxRes = board.getRandomLine();
		expect(maxRes).toBe(board.realHeight - 2); // max

		vi.restoreAllMocks();
	});
}
