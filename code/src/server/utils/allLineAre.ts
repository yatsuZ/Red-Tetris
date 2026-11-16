import type { Board } from "../class/Board.js";
import { StateLine } from "../constant/Board.js";

export function AllLineAre(board: Board, state: StateLine): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 2 }, (_, i) => i);
    const verif = board.stateLines(ligneToVerif);
    verif.forEach(element => {
        if (element.state !== state)
            return false;
    });
    return true;
}

export function BoardIsEmpty(board: Board): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 2 }, (_, i) => i);
    const verif = board.stateLines(ligneToVerif);
    verif.forEach(element => {
        if (element.state !== StateLine.EMPTY)
            return false;
    });
    return true;
}

export function BoardIsFull(board: Board): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 2 }, (_, i) => i);
    const verif = board.stateLines(ligneToVerif);
    verif.forEach(element => {
        if (element.state === StateLine.EMPTY || element.state === StateLine.ERROR)
            return false;
    });
    return true;
}
