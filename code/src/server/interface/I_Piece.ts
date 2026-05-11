export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Matrix = number[][];
export type Rotations = [Matrix, Matrix, Matrix, Matrix];
export type Position = { x: number; y: number };

export type PieceData = {
    readonly shape: PieceShape;
    orientation: 0 | 1 | 2 | 3;
    position: Position;
};

export interface I_Piece extends PieceData {
// TODO:
  // shift(direction: 'L' | 'R'): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou colision
  // fall(): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou colision
// Autre
  clone(): I_Piece;
  getMatrix(): Matrix;
// Setter
  rotate(): void;
// Getter d'attribut
  get(): PieceData;
}
