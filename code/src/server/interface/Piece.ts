export interface I_Piece {
    shape: 'I' | 'O' | 'T' | 'L' | 'J' | 'S' | 'Z';
    orientation: 0 | 1 | 2 | 3;
    x: number;
    y: number;
    getMatrix(): boolean[][];
    rotate(): void;
}
