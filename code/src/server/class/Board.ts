import { type StatePieceCollision, type ResultMethod, type StateLine, CelluleType, DEFAULT_HEIGHT_BOARD, DEFAULT_WIDTH_BOARD, ErrorInitMsgBoard} from "../constant/Board.js";
import type { BoardData, I_Board, MatrixCellule } from "../interface/I_Board.js";
import type { I_Piece, Matrix } from "../interface/I_Piece.js";

export class Board implements I_Board {
  readonly real_height: number;
  readonly real_width: number;
  readonly height: number;
  readonly width: number;
  highest_point: number;
  board: MatrixCellule;

  private constructor(data: BoardData) {
    this.height = data.height;
    this.width = data.width;
    this.real_height = data.real_height;
    this.real_width = data.real_width;
    this.highest_point = data.highest_point;
    this.board = data.board.map(row => [...row]);
  }

  static create(height: number = DEFAULT_HEIGHT_BOARD, width: number = DEFAULT_WIDTH_BOARD): Board {
    if (height < 4)
      throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.HEIGHT_LOW);
    else if (height > 80)
      throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.HEIGHT_HIGH);
    else if (width < 4)
      throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_LOW);
    else if (width > 40)
      throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_HIGH);
    else if (height < width)
      throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_HEIGHT);

    const real_height = height + 4;
    const real_width = width + 2;
    const board = new Board({ height, width, real_height, real_width, highest_point: height, board: [] });
    board.board = board.initBoard();
    return board;
  }

  static fromData(data: BoardData): Board {
    return new Board(data);
  }
  canSpawnPiece(piece: I_Piece): ResultMethod {
    throw new Error("Method not implemented.");
  }

  initBoard(): MatrixCellule {
    return Array.from({length: this.real_height}, 
      (_, i) => Array.from({length: this.real_width}, 
        (_, j) => {
          if (j === 0 || j === this.real_width - 1 || i === this.real_height - 1 || i === 0)
            return (CelluleType.WALL);
          return (CelluleType.EMPTY);
        }))
  }


  clone(): Board {
    return Board.fromData(this.get());
  }
  getMatrix(): MatrixCellule {
    return ([...this.board]);
  }
  get(): BoardData {
    return ({
      real_height: this.real_height,
      real_width: this.real_width,
      height: this.height,
      width: this.width,
      highest_point: this.highest_point,
      board: this.getMatrix()
    });
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
}