import type { CelluleType, ResultMethod, StateLine, StatePieceCollision } from '../constant/Board.js';
import type { I_Piece, Matrix, Position } from './I_Piece.js';

export type MatrixCellule = Matrix<CelluleType>;

// =====================================================
// Attributs
// =====================================================

export type BoardData = {
	readonly real_height: number;
	readonly real_width: number;
	readonly height: number;
	readonly width: number;
	highest_point: number;
	board: MatrixCellule;
};

export interface I_Board extends BoardData {
	// =====================================================
	// Création / accès
	// =====================================================

	initBoard(): MatrixCellule;
	clone(): I_Board;
	// Retourne la grille sous forme de matrice de CelluleType
	getMatrix(): MatrixCellule;
	// Retourne les données du board (height, width, highest_point)
	get(): BoardData;

	// =====================================================
	// Pièces
	// =====================================================

	// Vérifie si une pièce peut apparaître. Retourne le résultat
	canSpawnPiece(piece: I_Piece): ResultMethod;
	// Vérifie si une pièce peut être placée. Retourne une matrice d'états (StatePieceCollision) et le résultat global
	canAddPiece(piece: I_Piece, pos: Position): { matrix: Matrix<StatePieceCollision>; res: ResultMethod };
	// Ajoute une pièce dans la grille. Retourne SUCCESS, lève une erreur si hors de la grille
	addPiece(piece: I_Piece, pos: Position): ResultMethod;

	// =====================================================
	// Lignes
	// =====================================================

	// Vide la ligne à l'index donné. Retourne SUCCESS ou ERROR
	delLine(indexLine: number, verif?: boolean): ResultMethod;
	// Vide plusieurs lignes. Retourne le résultat pour chaque index
	delLines(indexLines: number[]): { indexLine: number; res: ResultMethod }[];
	// Retourne l'état d'une ligne : EMPTY, PARTIAL ou FULL
	stateLine(indexLine: number): StateLine;
	// Idem pour plusieurs lignes
	stateLines(indexLines: number[]): { indexLine: number; state: StateLine }[];
	// Crée une ligne avec une cellule vide
	createPartialLine(indexLine: number, indexEmptyColumn?: number): ResultMethod;
	// Fait monter une nouvelle ligne depuis le bas, avec une colonne vide aléatoire
	lineCellRise(): ResultMethod;
	// Fait descendre toutes les lignes non vides s'il y a des lignes vides en dessous
	lineCellFall(): ResultMethod;

	// =====================================================
	// Colonnes
	// =====================================================

	// Retourne l'indice de la cellule la plus haute dans une colonne
	highestPointColumn(indexColumn: number): number;
	// Retourne l'indice de la cellule la plus haute pour plusieurs colonnes
	highestPointsColumns(indexColumns: number[]): { indexColumn: number; highestPoint: number }[];
}
