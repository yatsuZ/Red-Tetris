import type { Board } from "../class/Board.js";
import { StateLine } from "../constant/Board.js";

export function AllLineAre(board: Board, state: StateLine): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 3 }, (_, i) => i + 1);
    const verif = board.stateLines(ligneToVerif);
    return verif.every(element => element.state === state);
}

export function BoardIsEmpty(board: Board): boolean{
    return AllLineAre(board, StateLine.EMPTY);
}

// Full si different de vide
export function BoardIsFull(board: Board): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 3 }, (_, i) => i + 1);
    const verif = board.stateLines(ligneToVerif);
    return verif.every(element => element.state === StateLine.FULL || element.state === StateLine.PARTIAL);
}
