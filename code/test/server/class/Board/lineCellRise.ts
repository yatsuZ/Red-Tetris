import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { CelluleType, ResultMethod, StateLine} from "../../../../src/server/constant/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { AllLineAre } from "../../../../src/server/utils/allLineAre.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = true;


function filledWithlineCellRise() {
    // create
    const board = Board.create();

    for (let i = 0; i < board.real_height; i++) {
        const res = board.lineCellRise();
        if (i >= board.real_height -2)
            expect(res).toBe(ResultMethod.FAIL);
        else
        {
            if (SHOW_BOARD) show_board(board.board, "ASCII");
            expect(res).toBe(ResultMethod.SUCCESS);
        }
    }
    expect(AllLineAre(board, StateLine.PARTIAL)).toBe(true)
}


export function test_lineCellRise(): void {
	it('lineCellRise    : les ligne monte jusqua n en plus pouvoir', filledWithlineCellRise);
	// it('lineCellRise    : les ligne font monter avec des ligne pres existante', filledWithlineCellRise);
}

