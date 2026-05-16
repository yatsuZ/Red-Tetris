import { StatePieceCollision } from "../constant/Board.js";

const COLLISION_SYMBOL: Record<StatePieceCollision, string> = {
  [StatePieceCollision.OUT_BOARD]:        'OUT',
  [StatePieceCollision.NO_COLLISION]:     ' . ',
  [StatePieceCollision.PIECE_COLLISION]:  'PIE',
  [StatePieceCollision.SIDE_COLLISION]:   'SID',
  [StatePieceCollision.GROUND_COLLISION]: 'GRD',
};

export function log_collision_matrix(matrix: StatePieceCollision[][], label?: string, show_log: true | false = true) {
  if (!show_log) return;
  if (label) console.log(label);
  const sep = '+' + (matrix[0] ? matrix[0].map(() => '-----').join('+') : '') + '+';
  console.log(sep);
  for (const row of matrix) {
    console.log('|' + row.map(cell => ' ' + COLLISION_SYMBOL[cell] + ' ').join('|') + '|');
    console.log(sep);
  }
}