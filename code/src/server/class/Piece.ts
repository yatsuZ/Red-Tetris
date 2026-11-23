import type { I_Piece, MatrixBin, PieceData, Position } from '../interface/I_Piece.js';
import { Shapes } from '../constant/Shapes.js';

export class Piece implements I_Piece {
	// =====================================================
	// Attributs
	// =====================================================

	readonly shape: I_Piece['shape'];
	orientation: I_Piece['orientation'];
	position: Position;

	// =====================================================
	// Création / accès
	// =====================================================

	constructor(shape: I_Piece['shape'], position: Position, orientation: 0 | 1 | 2 | 3 = 0) {
		this.shape = shape;
		this.orientation = orientation;
		this.position = { ...position };
	}

	get(): PieceData {
		return {
			shape: this.shape,
			orientation: this.orientation,
			position: { ...this.position },
		};
	}

	getWidth(): number {
		const matrix = this.getMatrix();
		return matrix[0]?.length === undefined ? -1 : matrix[0].length;
	}

	getHeight(): number {
		return this.getMatrix().length;
	}

	clone(): Piece {
		const self_data: PieceData = this.get();
		return new Piece(self_data.shape, { ...self_data.position }, self_data.orientation);
	}

	getMatrix(): MatrixBin {
		return Shapes[this.shape][this.orientation];
	}

	// =====================================================
	// Mouvement
	// =====================================================

	rotate(): void {
		this.orientation = ((this.orientation + 1) % 4) as 0 | 1 | 2 | 3;
	}
}
