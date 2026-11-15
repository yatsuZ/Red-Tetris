import type { Board } from "../class/Board.js";
import type { StateLine } from "../constant/Board.js";

export function AllLineAre(board: Board, state: StateLine): boolean{
    const ligneToVerif = Array.from({ length: board.real_height - 2 }, (_, i) => i);
    const verif = board.stateLines(ligneToVerif);
    verif.forEach(element => {
        if (element.state !== state)
            return false;
    });
    return true;
}
