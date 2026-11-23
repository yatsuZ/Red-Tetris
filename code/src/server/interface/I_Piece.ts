export type PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z' | '.';
export type Matrix<T = number> = T[][];
export type MatrixBin = Matrix<0 | 1>;
export type Rotations = [MatrixBin, MatrixBin, MatrixBin, MatrixBin];
export type Position = { x: number; y: number };

// =====================================================
// Attribut
// =====================================================

export type PieceData = {
	readonly shape: PieceShape;
	orientation: 0 | 1 | 2 | 3;
	position: Position;
};

export interface I_Piece extends PieceData {
	// =====================================================
	// Creation / acces
	// =====================================================

	get(): PieceData;
	getLargeur(): number;
	getHauteur(): number;
	clone(): I_Piece;
	getMatrix(): MatrixBin;

	// =====================================================
	// Mouvement
	// =====================================================

	rotate(): void;

	// TODO:
	// shift(direction: 'L' | 'R'): void;
	// Problème a besoin de son environnement pour eviter les sortie de terrain ou collision
	// fall(): void; // Problème a besoin de son environnement pour eviter les sortie de terrain ou collision
}
