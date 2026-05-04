import type { I_Piece } from '../interface/I_Piece.js';
import { Shapes } from './Shapes.js';

class Piece implements I_Piece {
  readonly shape: I_Piece['shape'];
  orientation: I_Piece['orientation'];
  x: number;
  y: number;

  constructor(shape: I_Piece['shape'], x: number, y: number) {
    this.shape = shape;
    this.orientation = 0;
    this.x = x;
    this.y = y;
  }

  getMatrix(): number[][] {
    return Shapes[this.shape][this.orientation] as number[][];
    throw new Error("Method not implemented.");
  }
  rotate(): void {
    this.orientation = (this.orientation + 1) % 4 as I_Piece['orientation'];
    return;
    throw new Error("Method not implemented.");
  }
}