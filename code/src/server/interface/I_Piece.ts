export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Matrix<T = number> = T[][];
export type MatrixBin = Matrix<0 | 1>
export type Rotations = [MatrixBin, MatrixBin, MatrixBin, MatrixBin];
export type Position = { x: number; y: number };

export type PieceData = {
    readonly shape: PieceShape;
    orientation: 0 | 1 | 2 | 3;
    position: Position;
};

export interface I_Piece extends PieceData {
// TODO:
  // shift(direction: 'L' | 'R'): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou collision
  // fall(): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou collision
// Autre
  clone(): I_Piece;
  getMatrix(): MatrixBin;
// Setter
  rotate(): void;
// Getter d'attribut
  get(): PieceData;
}
