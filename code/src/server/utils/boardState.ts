import type { Board } from '../models/Board.js';
import { LineState } from '../constants/board.js';

export function allLinesAre(board: Board, state: LineState): boolean {
	const linesToCheck = Array.from({ length: board.realHeight - 3 }, (_, i) => i + 1);
	const states = board.stateLines(linesToCheck);
	return states.every((element) => element.state === state);
}

export function isBoardEmpty(board: Board): boolean {
	return allLinesAre(board, LineState.EMPTY);
}

// Plein si aucune ligne n'est vide (lignes pleines ou partielles)
export function isBoardFull(board: Board): boolean {
	const linesToCheck = Array.from({ length: board.realHeight - 3 }, (_, i) => i + 1);
	const states = board.stateLines(linesToCheck);
	return states.every((element) => element.state === LineState.FULL || element.state === LineState.PARTIAL);
}
