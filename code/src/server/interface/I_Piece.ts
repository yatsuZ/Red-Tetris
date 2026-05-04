export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Matrix = number[][];
export type Rotations = [Matrix, Matrix, Matrix, Matrix];

export interface I_Piece {
    readonly shape: PieceShape;
    orientation: 0 | 1 | 2 | 3;
    x: number;
    y: number;
    getMatrix(): Matrix;
    rotate(): void;
}
