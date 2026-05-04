export interface I_Piece {
    readonly shape: 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
    orientation: 0 | 1 | 2 | 3;
    x: number;
    y: number;
    getMatrix(): boolean[][];
    rotate(): void;
}
