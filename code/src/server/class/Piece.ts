import type { I_Piece, Matrix, PieceData, PieceShape, Position } from '../interface/I_Piece.js';
import { Shapes } from '../constant/Shapes.js';

export class Piece implements I_Piece {
// Attribut
  readonly shape: I_Piece['shape'];
  orientation: I_Piece['orientation'];
  position: Position;

// Constructeur

  constructor(shape: I_Piece['shape'], position: Position) {
    this.shape = shape;
    this.orientation = 0;
    this.position = {...position};
  }

// Autre

  clone(): I_Piece {
      const self_data : PieceData = this.get();
      return (new Piece(self_data.shape, {...self_data.position}));
    }

  getMatrix(): Matrix {
    return Shapes[this.shape][this.orientation];
  }

// Setter

  rotate(): void{
    this.orientation = (this.orientation + 1) % 4 as 0 | 1 | 2 | 3 ;
  }

// Getter

  get(): PieceData {
    return (
      {
        shape: this.shape,
        orientation: this.orientation,
        position: {...this.position}
      });
  }
}