import {
	StatePieceCollision,
	CelluleType,
	DEFAULT_HEIGHT_BOARD,
	DEFAULT_WIDTH_BOARD,
	ErrorInitMsgBoard,
	ResultMethod,
	StateLine,
} from '../constant/Board.js';
import type { BoardData, I_Board, MatrixCellule } from '../interface/I_Board.js';
import type { I_Piece, Matrix, Position } from '../interface/I_Piece.js';
import { BoardIsEmpty, BoardIsFull } from '../utils/allLineAre.js';
import { getRandomInt } from '../utils/rng.js';

export class Board implements I_Board {

	// =====================================================
	// Attribut
	// =====================================================

	readonly real_height: number;
	readonly real_width: number;
	readonly height: number;
	readonly width: number;
	highest_point: number;
	board: MatrixCellule;

	// =====================================================
	// Creation / acces
	// =====================================================

	private constructor(data: BoardData) {
		this.height = data.height;
		this.width = data.width;
		this.real_height = data.real_height;
		this.real_width = data.real_width;
		this.highest_point = data.highest_point;
		this.board = data.board.map((row) => [...row]);
	}

	static create(height: number = DEFAULT_HEIGHT_BOARD, width: number = DEFAULT_WIDTH_BOARD): Board {
		if (height < 4) throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.HEIGHT_LOW);
		else if (height > 80) throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.HEIGHT_HIGH);
		else if (width < 4) throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_LOW);
		else if (width > 40) throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_HIGH);
		else if (height < width) throw new Error(ErrorInitMsgBoard.DEFAULT + ErrorInitMsgBoard.WIDTH_HEIGHT);

		const real_height = height + 4;
		const real_width = width + 2;
		const board = new Board({
			height,
			width,
			real_height,
			real_width,
			highest_point: height,
			board: [],
		});
		board.board = board.initBoard();
		return board;
	}

	static fromData(data: BoardData): Board {
		return new Board(data);
	}

	initBoard(): MatrixCellule {
		return Array.from({ length: this.real_height }, (_, i) =>
			Array.from({ length: this.real_width }, (_, j) => {
				if (j === 0 || j === this.real_width - 1 || i === this.real_height - 1 || i === 0)
					return CelluleType.WALL;
				return CelluleType.EMPTY;
			}),
		);
	}

	clone(): Board {
		return Board.fromData(this.get());
	}

	getMatrix(): MatrixCellule {
		return [...this.board];
	}

	get(): BoardData {
		return {
			real_height: this.real_height,
			real_width: this.real_width,
			height: this.height,
			width: this.width,
			highest_point: this.highest_point,
			board: this.getMatrix(),
		};
	}

	// =====================================================
	// Pieces
	// =====================================================

	canSpawnPiece(piece: I_Piece): ResultMethod {
		const largeurPiece = piece.getLargeur();
		if (largeurPiece === -1) {
			// throw new Error("canSpawnPiece : problème lors de la récupération de la largeur de la pièce");
			return ResultMethod.ERROR;
		}

		const espaceRestant = this.width - largeurPiece;
		const margeGauche = Math.ceil(espaceRestant / 2);
		const colone_spawn = 1 + margeGauche;

		const res = this.canAddPiece(piece, { x: 1, y: colone_spawn });
		return res.res;
	}

	canAddPiece(piece: I_Piece, pos: Position): { matrix: Matrix<StatePieceCollision>; res: ResultMethod } {
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
					res = ResultMethod.FAIL;

					return r === this.real_height - 1
						? StatePieceCollision.GROUND_COLLISION
						: StatePieceCollision.SIDE_COLLISION;
				}
				if (boardCell === CelluleType.PIECE) {
					res = ResultMethod.FAIL;
					return StatePieceCollision.PIECE_COLLISION;
				}
				return StatePieceCollision.NO_COLLISION;
			}),
		);

		return { matrix, res };
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

	// =====================================================
	// Line
	// =====================================================

	delLine(indexLine: number, verif: boolean = true): ResultMethod {
		if (verif) {
			if (indexLine <= 0 || indexLine >= this.real_height - 1) return ResultMethod.ERROR;
		}
		const row = this.board[indexLine];
		if (row === undefined) return ResultMethod.ERROR;

		row.forEach((_, indexRow) => {
			if (indexRow === 0 || indexRow === this.real_width - 1) return;

			row[indexRow] = CelluleType.EMPTY;
		});

		return ResultMethod.SUCCESS;
	}

	delLines(indexLines: number[]): { indexLine: number; res: ResultMethod }[] {
		return indexLines.map((index) => {
			const res = this.delLine(index);
			return { indexLine: index, res };
		});
	}

	stateLine(indexLine: number): StateLine {
		const row = this.board[indexLine];

		// Ne peut pas verifier les murs
		if (indexLine <= 0 || indexLine >= this.real_height - 1 || row === undefined || row[1] == undefined)
			return StateLine.ERROR;

		const firstCelluleType = row[1];
		for (let index = 1; index < row.length - 1; index++) {
			const element = row[index];
			if (element !== firstCelluleType) return StateLine.PARTIAL;
		}

		return firstCelluleType === CelluleType.EMPTY ? StateLine.EMPTY : StateLine.FULL;
	}

	stateLines(indexLines: number[]): { indexLine: number; state: StateLine }[] {
		return indexLines.map((index) => {
			const res = this.stateLine(index);
			return { indexLine: index, state: res };
		});
	}

	createPartialLine(
		indexLine: number,
		indexEmptyColumn: number = getRandomInt(1, this.real_width - 2),
	): ResultMethod {
		if (
			indexEmptyColumn < 1 ||
			indexEmptyColumn >= this.real_width ||
			indexLine < 1 ||
			indexLine >= this.real_height - 1
		)
			return ResultMethod.ERROR;
		const row = this.board[indexLine] as CelluleType[];
		const stateRow = this.stateLine(indexLine);

		if (stateRow === StateLine.EMPTY) {
			for (let i = 1; i < this.real_width - 1; i++) {
				if (i !== indexEmptyColumn) row[i] = CelluleType.PIECE;
			}
		} else return ResultMethod.FAIL;
		return ResultMethod.SUCCESS;
	}

	lineCellRise(): ResultMethod {
		for (let i = 1; i < this.real_height - 1; i++) {
			const row = this.board[i];
			const stateRow = this.stateLine(i);
			const stateRowAbove = this.stateLine(i - 1);
			if (i === 1 && (stateRow === StateLine.FULL || stateRow === StateLine.PARTIAL)) return ResultMethod.FAIL;
			if (
				row &&
				stateRowAbove === StateLine.EMPTY &&
				(stateRow === StateLine.FULL || stateRow === StateLine.PARTIAL)
			) {
				for (let j = 1; j < this.real_width - 1; j++) {
					(this.board[i - 1] as CelluleType[])[j] = row[j] as CelluleType;
					row[j] = CelluleType.EMPTY;
				}
			}
		}
		// faire aparaitre une nouvelle ligne avec un colone vide
		return this.createPartialLine(this.real_height - 2);
	}

	lineCellFall(): ResultMethod {
		let same = true;
		if (BoardIsFull(this) || BoardIsEmpty(this)) return ResultMethod.FAIL;
		for (let i = this.real_height - 3; i > 0; i--) {
			const row = this.board[i];
			const stateRow = this.stateLine(i);
			const stateRowBelow = this.stateLine(i + 1);
			if (
				row &&
				stateRowBelow === StateLine.EMPTY &&
				(stateRow === StateLine.FULL || stateRow === StateLine.PARTIAL)
			) {
				same = false;
				for (let j = 1; j < this.real_width - 1; j++) {
					(this.board[i + 1] as CelluleType[])[j] = row[j] as CelluleType;
					row[j] = CelluleType.EMPTY;
				}
			}
		}
		if (same) return ResultMethod.FAIL;
		return ResultMethod.SUCCESS;
	}

	// =====================================================
	// Column
	// =====================================================

	highestPointColumn(indexColumn: number): number {
		if (indexColumn <= 0 || indexColumn >= this.real_width - 1) return -1;

		for (let index = 0; index < this.real_height - 1; index++) {
			if (this.board[index] === undefined) return -1;
			else if ((this.board[index] as CelluleType[])[indexColumn] === CelluleType.PIECE) return index;
		}
		return this.real_height - 1;
	}

	highestPointsColumns(indexColumns: number[]): { indexColumn: number; highestPoint: number }[] {
		return indexColumns.map((index) => {
			const res = this.highestPointColumn(index);
			return { indexColumn: index, highestPoint: res };
		});
	}
}
