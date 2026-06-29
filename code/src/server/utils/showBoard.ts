import { CELLULE_EMOJI, CELLULE_SYMBOLS } from "../constant/Board.js";
import type { MatrixCellule } from "../interface/I_Board.js";

export function show_board(board: MatrixCellule, type : "EMOJI" | "ASCII" = "EMOJI")
{
    board.forEach((element, i) => {
      let ligneStr = ""; // 1. On initialise une chaîne vide pour la ligne en cours
    
      element.forEach((celule, j) => {
        if (type == "ASCII")
          ligneStr += CELLULE_SYMBOLS[celule] + " "; // 2. On ajoute le symbole de la cellule
        else
          ligneStr += CELLULE_EMOJI[celule] + " "; // 2. On ajoute le symbole de la cellule
      });
    
      console.log(`Ligne ${i}:\t ${ligneStr}`); // 3. On affiche la ligne complète une fois le second forEach fini
    });
    console.log("");
}
