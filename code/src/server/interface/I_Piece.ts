export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Matrix = number[][];
export type Rotations = [Matrix, Matrix, Matrix, Matrix];
export type Position = { x: number; y: number };
// export type PieceOrientation = ['→', '↓', '←', '↑']

export type PieceData = {
    readonly shape: PieceShape;
    orientation: 0 | 1 | 2 | 3;
    position: Position;
};

export interface I_Piece extends PieceData {
// Autre
  // shift(direction: 'L' | 'R'): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou colision
  // fall(): void; // Probléme a besoin de son environement pour eviter les sortie de terrian ou colision
  clone(): I_Piece;
  getMatrix(): Matrix;
// Seteur
  rotate(): void;
// Geteur d'attribut
  get(): PieceData;
}
