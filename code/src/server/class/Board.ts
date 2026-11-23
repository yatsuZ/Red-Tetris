import {
	CollisionState,
	CellType,
	DEFAULT_HEIGHT_BOARD,
	DEFAULT_WIDTH_BOARD,
	BoardInitError,
	MethodResult,
	LineState,
} from '../constant/Board.js';
import type { BoardData, IBoard, CellMatrix } from '../interface/IBoard.js';
import type { IPiece, Matrix, Position } from '../interface/IPiece.js';
import { isBoardEmpty, isBoardFull } from '../utils/boardState.js';
import { getRandomInt } from '../utils/rng.js';

export class Board implements IBoard {
	// =====================================================
	// Attributs
	// =====================================================

	readonly realHeight: number;
	readonly realWidth: number;
	readonly height: number;
	readonly width: number;
	highestPoint: number;
	board: CellMatrix;

	// =====================================================
	// Création / accès
	// =====================================================

	private constructor(data: BoardData) {
		this.height = data.height;
		this.width = data.width;
		this.realHeight = data.realHeight;
		this.realWidth = data.realWidth;
		this.highestPoint = data.highestPoint;
		this.board = data.board.map((row) => [...row]);
	}

	static create(height: number = DEFAULT_HEIGHT_BOARD, width: number = DEFAULT_WIDTH_BOARD): Board {
		if (height < 4) throw new Error(BoardInitError.DEFAULT + BoardInitError.HEIGHT_LOW);
		else if (height > 80) throw new Error(BoardInitError.DEFAULT + BoardInitError.HEIGHT_HIGH);
		else if (width < 4) throw new Error(BoardInitError.DEFAULT + BoardInitError.WIDTH_LOW);
		else if (width > 40) throw new Error(BoardInitError.DEFAULT + BoardInitError.WIDTH_HIGH);
		else if (height < width) throw new Error(BoardInitError.DEFAULT + BoardInitError.WIDTH_HEIGHT);

		const realHeight = height + 4;
		const realWidth = width + 2;
		const board = new Board({
			height,
			width,
			realHeight,
			realWidth,
			highestPoint: height,
			board: [],
		});
		board.board = board.initBoard();
		return board;
	}

	static fromData(data: BoardData): Board {
		return new Board(data);
	}

	initBoard(): CellMatrix {
		return Array.from({ length: this.realHeight }, (_, i) =>
			Array.from({ length: this.realWidth }, (_, j) => {
				if (j === 0 || j === this.realWidth - 1 || i === this.realHeight - 1 || i === 0) return CellType.WALL;
				return CellType.EMPTY;
			}),
		);
	}

	clone(): Board {
		return Board.fromData(this.get());
	}

	getMatrix(): CellMatrix {
		return [...this.board];
	}

	get(): BoardData {
		return {
			realHeight: this.realHeight,
			realWidth: this.realWidth,
			height: this.height,
			width: this.width,
			highestPoint: this.highestPoint,
			board: this.getMatrix(),
		};
	}

	// =====================================================
	// Pièces
	// =====================================================

	canSpawnPiece(piece: IPiece): MethodResult {
		const pieceWidth = piece.getWidth();
		if (pieceWidth === -1) {
			// throw new Error("canSpawnPiece : problème lors de la récupération de la largeur de la pièce");
			return MethodResult.ERROR;
		}

		const remainingSpace = this.width - pieceWidth;
		const leftMargin = Math.ceil(remainingSpace / 2);
		const spawnColumn = 1 + leftMargin;

		const res = this.canAddPiece(piece, { x: 1, y: spawnColumn });
		return res.res;
	}

	canAddPiece(piece: IPiece, pos: Position): { matrix: Matrix<CollisionState>; res: MethodResult } {
		let res = MethodResult.SUCCESS;
		const pieceMatrix = piece.getMatrix();

		const matrix: Matrix<CollisionState> = pieceMatrix.map((pieceRow, i) =>
			pieceRow.map((cell, j) => {
				if (cell !== 1) return CollisionState.NO_COLLISION;

				const r = pos.x + i;
				const c = pos.y + j;
				const boardRow = this.board[r];

				if (boardRow === undefined || boardRow[c] === undefined) {
					res = MethodResult.ERROR;
					return CollisionState.OUT_BOARD;
				}

				const boardCell = boardRow[c];
				if (boardCell === CellType.WALL) {
					res = MethodResult.FAIL;

					return r === this.realHeight - 1 ? CollisionState.GROUND_COLLISION : CollisionState.SIDE_COLLISION;
				}
				if (boardCell === CellType.PIECE) {
					res = MethodResult.FAIL;
					return CollisionState.PIECE_COLLISION;
				}
				return CollisionState.NO_COLLISION;
			}),
		);

		return { matrix, res };
	}

	addPiece(piece: IPiece, pos: Position): MethodResult {
		const matrix = piece.getMatrix();

		for (let i = 0; i < matrix.length; i++) {
			const pieceRow = matrix[i]!;
			for (let j = 0; j < pieceRow.length; j++) {
				if (pieceRow[j] !== 1) continue;
				const r = pos.x + i;
				const c = pos.y + j;
				const boardRow = this.board[r];
				if (boardRow === undefined || boardRow[c] === undefined)
					throw new Error(`addPiece: out of bounds write at (${r}, ${c})`);
				boardRow[c] = CellType.PIECE;
			}
		}
		piece.position = { ...pos };
		return MethodResult.SUCCESS;
	}

	// =====================================================
	// Lignes
	// =====================================================

	delLine(indexLine: number, verif: boolean = true): MethodResult {
		if (verif) {
			if (indexLine <= 0 || indexLine >= this.realHeight - 1) return MethodResult.ERROR;
		}
		const row = this.board[indexLine];
		if (row === undefined) return MethodResult.ERROR;

		row.forEach((_, indexRow) => {
			if (indexRow === 0 || indexRow === this.realWidth - 1) return;

			row[indexRow] = CellType.EMPTY;
		});

		return MethodResult.SUCCESS;
	}

	delLines(indexLines: number[]): { indexLine: number; res: MethodResult }[] {
		return indexLines.map((index) => {
			const res = this.delLine(index);
			return { indexLine: index, res };
		});
	}

	stateLine(indexLine: number): LineState {
		const row = this.board[indexLine];

		// Impossible de vérifier les murs
		if (indexLine <= 0 || indexLine >= this.realHeight - 1 || row === undefined || row[1] == undefined)
			return LineState.ERROR;

		const firstCellType = row[1];
		for (let index = 1; index < row.length - 1; index++) {
			const element = row[index];
			if (element !== firstCellType) return LineState.PARTIAL;
		}

		return firstCellType === CellType.EMPTY ? LineState.EMPTY : LineState.FULL;
	}

	stateLines(indexLines: number[]): { indexLine: number; state: LineState }[] {
		return indexLines.map((index) => {
			const res = this.stateLine(index);
			return { indexLine: index, state: res };
		});
	}

	createPartialLine(indexLine: number, indexEmptyColumn: number = getRandomInt(1, this.realWidth - 2)): MethodResult {
		if (
			indexEmptyColumn < 1 ||
			indexEmptyColumn >= this.realWidth ||
			indexLine < 1 ||
			indexLine >= this.realHeight - 1
		)
			return MethodResult.ERROR;
		const row = this.board[indexLine] as CellType[];
		const stateRow = this.stateLine(indexLine);

		if (stateRow === LineState.EMPTY) {
			for (let i = 1; i < this.realWidth - 1; i++) {
				if (i !== indexEmptyColumn) row[i] = CellType.PIECE;
			}
		} else return MethodResult.FAIL;
		return MethodResult.SUCCESS;
	}

	lineCellRise(): MethodResult {
		for (let i = 1; i < this.realHeight - 1; i++) {
			const row = this.board[i];
			const stateRow = this.stateLine(i);
			const stateRowAbove = this.stateLine(i - 1);
			if (i === 1 && (stateRow === LineState.FULL || stateRow === LineState.PARTIAL)) return MethodResult.FAIL;
			if (
				row &&
				stateRowAbove === LineState.EMPTY &&
				(stateRow === LineState.FULL || stateRow === LineState.PARTIAL)
			) {
				for (let j = 1; j < this.realWidth - 1; j++) {
					(this.board[i - 1] as CellType[])[j] = row[j] as CellType;
					row[j] = CellType.EMPTY;
				}
			}
		}
		// Fait apparaître une nouvelle ligne avec une colonne vide
		return this.createPartialLine(this.realHeight - 2);
	}

	lineCellFall(): MethodResult {
		let same = true;
		if (isBoardFull(this) || isBoardEmpty(this)) return MethodResult.FAIL;
		for (let i = this.realHeight - 3; i > 0; i--) {
			const row = this.board[i];
			const stateRow = this.stateLine(i);
			const stateRowBelow = this.stateLine(i + 1);
			if (
				row &&
				stateRowBelow === LineState.EMPTY &&
				(stateRow === LineState.FULL || stateRow === LineState.PARTIAL)
			) {
				same = false;
				for (let j = 1; j < this.realWidth - 1; j++) {
					(this.board[i + 1] as CellType[])[j] = row[j] as CellType;
					row[j] = CellType.EMPTY;
				}
			}
		}
		if (same) return MethodResult.FAIL;
		return MethodResult.SUCCESS;
	}

	// =====================================================
	// Colonnes
	// =====================================================

	highestPointColumn(indexColumn: number): number {
		if (indexColumn <= 0 || indexColumn >= this.realWidth - 1) return -1;

		for (let index = 0; index < this.realHeight - 1; index++) {
			if (this.board[index] === undefined) return -1;
			else if ((this.board[index] as CellType[])[indexColumn] === CellType.PIECE) return index;
		}
		return this.realHeight - 1;
	}

	highestPointsColumns(indexColumns: number[]): { indexColumn: number; highestPoint: number }[] {
		return indexColumns.map((index) => {
			const res = this.highestPointColumn(index);
			return { indexColumn: index, highestPoint: res };
		});
	}
}
