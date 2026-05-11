import { type StatePieceCollision, type ResultMethod, type StateLine, CelluleType } from "../constant/Board.js";
import type { BoardData, I_Board, MatrixCellule } from "../interface/I_Board.js";
import type { I_Piece, Matrix } from "../interface/I_Piece.js";

export class Board implements I_Board {
  readonly real_height: number;
  readonly real_width: number;
  readonly height: number;
  readonly width: number;
  readonly ceiling_limit : number;
  highest_point: number;
  board: MatrixCellule;

  constructor(height: number = 20, width: number = 10) {
    this.height = height;
    this.width = width;
    if (this.height < 4 || this.height > 80 || this.height < this.width || this.width < 4 || this.width > 40)
      throw new Error("No valid input constructor Board.");
    this.ceiling_limit = 4;
    this.highest_point = this.height;
    this.real_height = height + 4;
    this.real_width = width + 2;
    this.board = this.initBoard()
  }

  initBoard(): MatrixCellule {
    return Array.from({length: this.real_height}, 
      (_, i) => Array.from({length: this.real_width}, 
        (_, j) => {
          if (j === 0 || j === this.real_width - 1 || i === this.real_height - 1)
            return (CelluleType.WALL);
          else if (i < this.ceiling_limit)
            return (CelluleType.CEILING_LIMIT);
          return (CelluleType.EMPTY);
        }))
  }


  clone(): I_Board {
    throw new Error("Method not implemented.");
  }
  getMatrix(): MatrixCellule {
    throw new Error("Method not implemented.");
  }
  canAddPiece(piece: I_Piece): { matrix: Matrix<StatePieceCollision>; res: ResultMethod; } {
    throw new Error("Method not implemented.");
  }
  delLine(indexLine: number): ResultMethod {
    throw new Error("Method not implemented.");
  }
  delLines(indexLines: number[]): ({ indexLine: number; res: ResultMethod; })[] {
    throw new Error("Method not implemented.");
  }
  stateLine(indexLine: number): StateLine {
    throw new Error("Method not implemented.");
  }
  stateLines(indexLines: number[]): ({ indexLine: number; state: StateLine; })[] {
    throw new Error("Method not implemented.");
  }
  highestPointColumn(indexColumn: number): number {
    throw new Error("Method not implemented.");
  }
  highestPointsColumns(indexColumns: number[]): number[] {
    throw new Error("Method not implemented.");
  }
  lineCellFall(): ResultMethod {
    throw new Error("Method not implemented.");
  }
  lineCellRise(): ResultMethod {
    throw new Error("Method not implemented.");
  }
  addPiece(piece: I_Piece): ResultMethod {
    throw new Error("Method not implemented.");
  }
  get(): BoardData {
    throw new Error("Method not implemented.");
  }
}
