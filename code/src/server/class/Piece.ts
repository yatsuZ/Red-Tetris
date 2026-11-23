import type { IPiece, MatrixBin, PieceData, Position } from '../interface/IPiece.js';
import { SHAPES } from '../constant/Shapes.js';

export class Piece implements IPiece {
	// =====================================================
	// Attributs
	// =====================================================

	readonly shape: IPiece['shape'];
	orientation: IPiece['orientation'];
	position: Position;

	// =====================================================
	// Création / accès
	// =====================================================

	constructor(shape: IPiece['shape'], position: Position, orientation: 0 | 1 | 2 | 3 = 0) {
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
		const selfData: PieceData = this.get();
		return new Piece(selfData.shape, { ...selfData.position }, selfData.orientation);
	}

	getMatrix(): MatrixBin {
		return SHAPES[this.shape][this.orientation];
	}

	// =====================================================
	// Mouvement
	// =====================================================

	rotate(): void {
		this.orientation = ((this.orientation + 1) % 4) as 0 | 1 | 2 | 3;
	}
}
