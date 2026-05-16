import { StatePieceCollision, CelluleType, DEFAULT_HEIGHT_BOARD, DEFAULT_WIDTH_BOARD, ErrorInitMsgBoard, ResultMethod, StateLine} from "../constant/Board.js";
import type { BoardData, I_Board, MatrixCellule } from "../interface/I_Board.js";
import type { I_Piece, Matrix, Position } from "../interface/I_Piece.js";

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

  initBoard(): MatrixCellule {
    return Array.from({length: this.real_height}, 
      (_, i) => Array.from({length: this.real_width}, 
        (_, j) => {
          if (j === 0 || j === this.real_width - 1 || i === this.real_height - 1 || i === 0)
            return (CelluleType.WALL);
          return (CelluleType.EMPTY);
        }))
  }

  static fromData(data: BoardData): Board {
    return new Board(data);
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

  addPiece(piece: I_Piece, pos: Position): ResultMethod {
    const matrix = piece.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
      const pieceRow = matrix[i]!;
      for (let j = 0; j < pieceRow.length; j++) {
        if (pieceRow[j] !== 1) continue;
        const r = pos.x + i;
        const c = pos.y + j;
        const boardRow = this.board[r];
        if (boardRow === undefined || boardRow[c] === undefined)
          throw new Error(`addPiece: écriture hors mémoire (${r}, ${c})`);
        boardRow[c] = CelluleType.PIECE;
      }
    }
    piece.position = { ...pos };
    return ResultMethod.SUCCESS;
  }

  canAddPiece(piece: I_Piece, pos: Position): { matrix: Matrix<StatePieceCollision>; res: ResultMethod; } {
    let res = ResultMethod.SUCCESS;
    const pieceMatrix = piece.getMatrix();

    const matrix: Matrix<StatePieceCollision> = pieceMatrix.map((pieceRow, i) =>
      pieceRow.map((cell, j) => {
        if (cell !== 1) return StatePieceCollision.NO_COLLISION;

        const r = pos.x + i;
        const c = pos.y + j;
        const boardRow = this.board[r];

        if (boardRow === undefined || boardRow[c] === undefined) {
          res = ResultMethod.ERROR;
          return StatePieceCollision.OUT_BOARD;
        }

        const boardCell = boardRow[c];
        if (boardCell === CelluleType.WALL) {
          if (res !== ResultMethod.ERROR)
            res = ResultMethod.FAIL;

          return r === this.real_height - 1
            ? StatePieceCollision.GROUND_COLLISION
            : StatePieceCollision.SIDE_COLLISION;
        }
        if (boardCell === CelluleType.PIECE) {
          if (res !== ResultMethod.ERROR) res = ResultMethod.FAIL;
          return StatePieceCollision.PIECE_COLLISION;
        }
        return StatePieceCollision.NO_COLLISION;
      })
    );

    return { matrix, res };
  }

  canSpawnPiece(piece: I_Piece): ResultMethod {
    const largeurPiece = piece.getLargeur();
    if (largeurPiece === -1)
    {
      // throw new Error("canSpawnPiece : problème lors de la récupération de la largeur de la pièce");
      return (ResultMethod.ERROR);
    }

    const espaceRestant = this.width - largeurPiece;
    const margeGauche = Math.ceil(espaceRestant / 2);
    const colone_spawn = 1 + margeGauche;

    const res = this.canAddPiece(piece, { x: 1, y: colone_spawn });
    return (res.res);
  }

  delLine(indexLine: number, verif : true | false = true): ResultMethod {
    if (verif)
    {
      if (indexLine <= 0 || indexLine >= this.real_height - 1)
        return (ResultMethod.ERROR);
    }
    const row = this.board[indexLine];
    if (row === undefined)
      return (ResultMethod.ERROR);

    row.forEach((_, indexRow) => {
      if (indexRow === 0 || indexRow === this.real_width - 1) return;

      row[indexRow] = CelluleType.EMPTY;
    })

    return (ResultMethod.SUCCESS);
  }

  delLines(indexLines: number[]): ({ indexLine: number; res: ResultMethod; })[] {
    return indexLines.map(index => {
        const res = this.delLine(index); 
        return { indexLine: index, res };
      });
  }

  stateLine(indexLine: number): StateLine {
    const row = this.board[indexLine];
    if (row === undefined || row[1] == undefined)
      return (StateLine.ERROR);

    const firstCelluleType = row[1];
    for (let index = 1; index < row.length - 2; index++) {
      const element = row[index];
      if (element !== firstCelluleType)
        return (StateLine.PARTIAL);
    }

    return (firstCelluleType === CelluleType.EMPTY ? StateLine.EMPTY : StateLine.FULL);
  }

  // pareil on map mais on y associe l'index pour pas s'y perdre
  stateLines(indexLines: number[]): ({ indexLine: number; state: StateLine; })[] {
    return indexLines.map(index => {
        const res = this.stateLine(index); 
        return { indexLine: index, state: res };
      });
  }

  lineCellRise(): ResultMethod {
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
}