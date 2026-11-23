import { StatePieceCollision } from '../constant/Board.js';

const COLLISION_SYMBOL: Record<StatePieceCollision, string> = {
	[StatePieceCollision.OUT_BOARD]: 'OUT',
	[StatePieceCollision.NO_COLLISION]: ' . ',
	[StatePieceCollision.PIECE_COLLISION]: 'PIE',
	[StatePieceCollision.SIDE_COLLISION]: 'SID',
	[StatePieceCollision.GROUND_COLLISION]: 'GRD',
};

export function logCollisionMatrix(matrix: StatePieceCollision[][], label?: string, enabled: true | false = true) {
	if (!enabled) return;
	if (label) console.log(label);
	const sep = '+' + (matrix[0] ? matrix[0].map(() => '-----').join('+') : '') + '+';
	console.log(sep);
	for (const row of matrix) {
		console.log('|' + row.map((cell) => ' ' + COLLISION_SYMBOL[cell] + ' ').join('|') + '|');
		console.log(sep);
	}
}
