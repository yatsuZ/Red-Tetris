import { CollisionState } from '../constant/Board.js';

const COLLISION_SYMBOLS: Record<CollisionState, string> = {
	[CollisionState.OUT_BOARD]: 'OUT',
	[CollisionState.NO_COLLISION]: ' . ',
	[CollisionState.PIECE_COLLISION]: 'PIE',
	[CollisionState.SIDE_COLLISION]: 'SID',
	[CollisionState.GROUND_COLLISION]: 'GRD',
};

export function logCollisionMatrix(matrix: CollisionState[][], label?: string, enabled: boolean = true) {
	if (!enabled) return;
	if (label) console.log(label);
	const sep = '+' + (matrix[0] ? matrix[0].map(() => '-----').join('+') : '') + '+';
	console.log(sep);
	for (const row of matrix) {
		console.log('|' + row.map((cell) => ' ' + COLLISION_SYMBOLS[cell] + ' ').join('|') + '|');
		console.log(sep);
	}
}
