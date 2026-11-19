import { expect, it } from "vitest";
import { Board } from "../../../../src/server/class/Board.js";
import { CelluleType, ResultMethod, StateLine} from "../../../../src/server/constant/Board.js";
import { Piece } from "../../../../src/server/class/Piece.js";
import { show_board } from "../../../../src/server/utils/showBoard.js";
import { getRandomInt } from "../../../../src/server/utils/rng.js";
import { AllLineAre } from "../../../../src/server/utils/allLineAre.js";

const SHOW_LOGS  = false;
const SHOW_BOARD = false;


function filledWithPartialLines() {
  // create
  const board = Board.create();


    for (let i = -1; i < board.real_height + 1; i++) {
        // Act
        const res = board.createPartialLine(i);

        // Verif
        if (i <= 0 || i  >= board.real_height - 1)
            expect(res).toBe(ResultMethod.ERROR);
        else
            expect(res).toBe(ResultMethod.SUCCESS);
    }


    if (SHOW_BOARD) show_board(board.board, "ASCII");
    expect(AllLineAre(board, StateLine.PARTIAL)).toBe(true);

}

function failCreatePartialLine() {
    // create
    const board = Board.create();
    const piece = new Piece('O', { x: 0, y: 0 });
    
    board.addPiece(piece, { x: 2, y: 2 });

    for (let i = -1; i < board.real_height + 1; i++) {
        board.createPartialLine(i, 1);
        if (i >= 1 && i <= board.real_height + -2 && i % 2)
            board.addPiece(new Piece(".", {x:0,y:0}), {x: i, y: 1});
    }

    for (let i = -1; i < board.real_height + 1; i++) {
        // Act
        const res = board.createPartialLine(i);
        // Verif
        if (i <= 0 || i  >= board.real_height - 1)
            expect(res).toBe(ResultMethod.ERROR);
        else
            expect(res).toBe(ResultMethod.FAIL);
    }


  if (SHOW_BOARD) show_board(board.board, "ASCII");
}

function filledWithPartialLinesChosen() {
  // create
  const board = Board.create();
  const indexEmptyColumn: number = getRandomInt(1, board.real_width - 2);

    for (let i = -1; i < board.real_height + 1; i++) {
        // Act
        const res = board.createPartialLine(i, indexEmptyColumn);
        // Verif
        if (i <= 0 || i  >= board.real_height - 1)
            expect(res).toBe(ResultMethod.ERROR);
        else
        {
            expect(res).toBe(ResultMethod.SUCCESS);            
            for (let j = 1; j < board.real_width - 1; j++) {
                // Verif
                if (indexEmptyColumn === j)
                    expect((board.board[i] as CelluleType[])[j]).toBe(CelluleType.EMPTY);
                else
                    expect((board.board[i] as CelluleType[])[j]).toBe(CelluleType.PIECE);
            }
        }

    }
    if (SHOW_BOARD) show_board(board.board, "ASCII");
    expect(AllLineAre(board, StateLine.PARTIAL)).toBe(true);
}

function failCreatePartialLineChosen() {
  // create
  const board = Board.create();
  const indexEmptyColumn: number = 0;

    for (let i = -1; i < board.real_height + 1; i++) {
        // Act
        const res = board.createPartialLine(i, indexEmptyColumn);
        // Verif
        expect(res).toBe(ResultMethod.ERROR);
    }


  if (SHOW_BOARD) show_board(board.board, "ASCII");
}

export function test_createPartialLine(): void {
	it('createPartialLine    : Cree une ligne avec un troue sur chaque ligne du tableau', filledWithPartialLines);
	it('createPartialLine    : Ne peut pas crée de ligne car ligne occupe', failCreatePartialLine);
	it('createPartialLine    : Choisie ou sera le troue', filledWithPartialLinesChosen);
	it('createPartialLine    : Echoue pour la selection du troue', failCreatePartialLineChosen);
}