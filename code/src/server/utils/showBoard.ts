import { CELLULE_EMOJI, CELLULE_SYMBOLS } from '../constant/Board.js';
import type { MatrixCellule } from '../interface/I_Board.js';

export function showBoard(board: MatrixCellule, type: 'EMOJI' | 'ASCII' = 'EMOJI') {
	board.forEach((element, i) => {
		let lineStr = ''; // 1. On initialise une chaîne vide pour la ligne en cours

		element.forEach((cell, j) => {
			if (type == 'ASCII')
				lineStr += CELLULE_SYMBOLS[cell] + ' '; // 2. On ajoute le symbole de la cellule
			else lineStr += CELLULE_EMOJI[cell] + ' '; // 2. On ajoute le symbole de la cellule
		});

		console.log(`Ligne ${i}:\t ${lineStr}`); // 3. On affiche la ligne complète une fois le second forEach fini
	});
	console.log('');
}
