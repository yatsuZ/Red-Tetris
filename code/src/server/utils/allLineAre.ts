import type { Board } from '../class/Board.js';
import { StateLine } from '../constant/Board.js';

export function allLinesAre(board: Board, state: StateLine): boolean {
	const linesToCheck = Array.from({ length: board.real_height - 3 }, (_, i) => i + 1);
	const states = board.stateLines(linesToCheck);
	return states.every((element) => element.state === state);
}

export function isBoardEmpty(board: Board): boolean {
	return allLinesAre(board, StateLine.EMPTY);
}

// Full si different de vide
export function isBoardFull(board: Board): boolean {
	const linesToCheck = Array.from({ length: board.real_height - 3 }, (_, i) => i + 1);
	const states = board.stateLines(linesToCheck);
	return states.every((element) => element.state === StateLine.FULL || element.state === StateLine.PARTIAL);
}
