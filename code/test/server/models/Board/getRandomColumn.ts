import { expect, it, vi } from 'vitest';
import { Board } from '../../../../src/server/models/Board.js';
import { CellType, MethodResult } from '../../../../src/server/constants/board.js';
import type { IPiece, Position } from '../../../../src/server/types/IPiece.js';
import { ALL_SHAPES, ORIENTATION_SYMBOLS } from '../../../../src/server/constants/shapes.js';
import { Piece } from '../../../../src/server/models/Piece.js';


function rngColumnWithPiece({ piece }: { piece: IPiece }) {
	it("Reste dans les bornes (1000 tirages) que l'aletoire est bien bornée", () => {
    	for (let i = 0; i < 1000; i++) {
    		const board = Board.create();
    		const indexColumn = board.getRandomColumn(piece);
    		expect(indexColumn).toBeGreaterThanOrEqual(1);
    		expect(indexColumn).toBeLessThanOrEqual((board.realWidth - piece.getWidth()) - 1);
    		expect(Number.isInteger(indexColumn)).toBeTruthy();
    		expect(board.canAddPiece(piece, { row: 1, col: indexColumn}).result).toBe(MethodResult.SUCCESS);
    	}
	});
    
	it("l'aléatoire est bien borné", () => {
		const board = Board.create();

		vi.spyOn(Math, 'random').mockReturnValue(0);
		const minRes = board.getRandomColumn(piece);
		expect(minRes).toBe(1); // min

		vi.spyOn(Math, 'random').mockReturnValue(0.9999);
		const maxRes = board.getRandomColumn(piece);
		expect(maxRes).toBe((board.realWidth - piece.getWidth()) - 1); // max

		vi.restoreAllMocks();
	});

}

export function testGetRandomColumn() {
	it("Reste dans les bornes (1000 tirages) que l'aletoire est bien bornée", () => {
		for (let i = 0; i < 1000; i++) {
			const board = Board.create();
			const indexColumn = board.getRandomColumn();
			expect(indexColumn).toBeGreaterThanOrEqual(1);
			expect(indexColumn).toBeLessThanOrEqual(board.realWidth - 2);
			expect(Number.isInteger(indexColumn)).toBeTruthy();
			expect((board.grid[1] as CellType[])[indexColumn] as CellType).toBe(CellType.EMPTY);
		}
	});

	it("l'aléatoire est bien borné", () => {
		const board = Board.create();

		vi.spyOn(Math, 'random').mockReturnValue(0);
		const minRes = board.getRandomColumn();
		expect(minRes).toBe(1); // min

		vi.spyOn(Math, 'random').mockReturnValue(0.9999);
		const maxRes = board.getRandomColumn();
		expect(maxRes).toBe(board.realWidth - 2); // max

		vi.restoreAllMocks();
	});

    const turnCount: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3] as const;

    const allPieces: { 
        piece: IPiece;
        shape: IPiece['shape'];
        arrow: string }[] =
        turnCount.flatMap((tour) =>
            ALL_SHAPES.map((shape) => (
                {
                    piece: new Piece(shape, {row : 1, col :1}, tour),
                    shape: shape,
                    arrow: ORIENTATION_SYMBOLS[tour]
                }
            )),
        );
    it.each(allPieces)('Shape $shape — rotation $arrow ', rngColumnWithPiece);
    
}
