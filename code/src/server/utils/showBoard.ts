import { CELL_EMOJI, CELL_SYMBOLS } from '../constants/board.js';
import type { CellMatrix } from '../types/IBoard.js';

export function showBoard(board: CellMatrix, type: 'EMOJI' | 'ASCII' = 'EMOJI') {
	board.forEach((element, i) => {
		let lineStr = ''; // 1. On initialise une chaîne vide pour la ligne en cours

		element.forEach((cell, j) => {
			if (type == 'ASCII')
				lineStr += CELL_SYMBOLS[cell] + ' '; // 2. On ajoute le symbole de la cellule
			else lineStr += CELL_EMOJI[cell] + ' '; // 2. On ajoute le symbole de la cellule
		});

		console.log(`Ligne ${i}:\t ${lineStr}`); // 3. On affiche la ligne complète une fois le second forEach fini
	});
	console.log('');
}
