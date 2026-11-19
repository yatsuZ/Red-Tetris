import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { CelluleType, ResultMethod, StateLine} from "../../../../src/server/constant/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { AllLineAre, BoardIsEmpty, BoardIsFull } from "../../../../src/server/utils/allLineAre.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = false;


function test_lineCellFall_Empty_or_Full() {
    // create
    const board = Board.create();

    expect(ResultMethod.FAIL).toBe(board.lineCellFall());

    for (let i = 1; i < board.real_height - 1; i++) {
        board.addPiece(new Piece('.', { x: 0, y: 0 }), {x:i, y: 1});
    }
    // if (SHOW_BOARD) show_board(board.board, "ASCII");
    expect(ResultMethod.FAIL).toBe(board.lineCellFall());

}

function basic_lineCellFall() {
    // create
    const board = Board.create();
    const piece = new Piece('.', { x: 0, y: 0 });

    expect(ResultMethod.FAIL).toBe(board.lineCellFall());
    let loop = 0;
    for (let i = 1; i < board.real_height - 1; i = i + 2) {
        loop++;
        for (let j = 1; j <= board.width; j++) {
            board.addPiece(piece, {x:i, y: j});
        }
    }
    if (SHOW_BOARD) show_board(board.board, "ASCII");
    while (loop)
    {
        loop--;
        const res = board.lineCellFall();
        expect(ResultMethod.SUCCESS).toBe(res);
        if (SHOW_BOARD) show_board(board.board, "ASCII");
    }
    expect(ResultMethod.FAIL).toBe(board.lineCellFall());

}


export function test_lineCellFall(): void {
	it('lineCellFall    : Board Vide ou rempli', test_lineCellFall_Empty_or_Full);
	it('lineCellFall    : Cree une ligne sour 2 et tout dois tomber', basic_lineCellFall);
}
