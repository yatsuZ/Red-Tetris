export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z' | '.';
export type Matrix<T = number> = T[][];
export type MatrixBin = Matrix<0 | 1>;
export type Rotations = [MatrixBin, MatrixBin, MatrixBin, MatrixBin];
export type Position = { x: number; y: number };

// =====================================================
// Attributs
// =====================================================

export type PieceData = {
	readonly shape: PieceShape;
	orientation: 0 | 1 | 2 | 3;
	position: Position;
};

export interface IPiece extends PieceData {
	// =====================================================
	// Création / accès
	// =====================================================

	toData(): PieceData;
	getWidth(): number;
	getHeight(): number;
	clone(): IPiece;
	getMatrix(): MatrixBin;

	// =====================================================
	// Mouvement
	// =====================================================

	rotate(): void;

	// TODO:
	// shift(direction: 'L' | 'R'): void;
	// Problème : a besoin de son environnement pour éviter les sorties de terrain et les collisions
	// fall(): void; // Problème : a besoin de son environnement pour éviter les sorties de terrain et les collisions
}
