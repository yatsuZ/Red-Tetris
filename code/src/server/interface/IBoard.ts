import type { CellType, MethodResult, LineState, CollisionState } from '../constant/Board.js';
import type { IPiece, Matrix, Position } from './IPiece.js';

export type CellMatrix = Matrix<CellType>;

// =====================================================
// Attributs
// =====================================================

export type BoardData = {
	readonly realHeight: number;
	readonly realWidth: number;
	readonly height: number;
	readonly width: number;
	highestPoint: number;
	board: CellMatrix;
};

export interface IBoard extends BoardData {
	// =====================================================
	// Création / accès
	// =====================================================

	initBoard(): CellMatrix;
	clone(): IBoard;
	// Retourne la grille sous forme de matrice de CellType
	getMatrix(): CellMatrix;
	// Retourne les données du board (height, width, highestPoint)
	get(): BoardData;

	// =====================================================
	// Pièces
	// =====================================================

	// Vérifie si une pièce peut apparaître. Retourne le résultat
	canSpawnPiece(piece: IPiece): MethodResult;
	// Vérifie si une pièce peut être placée. Retourne une matrice d'états (CollisionState) et le résultat global
	canAddPiece(piece: IPiece, pos: Position): { matrix: Matrix<CollisionState>; res: MethodResult };
	// Ajoute une pièce dans la grille. Retourne SUCCESS, lève une erreur si hors de la grille
	addPiece(piece: IPiece, pos: Position): MethodResult;

	// =====================================================
	// Lignes
	// =====================================================

	// Vide la ligne à l'index donné. Retourne SUCCESS ou ERROR
	delLine(indexLine: number, verif?: boolean): MethodResult;
	// Vide plusieurs lignes. Retourne le résultat pour chaque index
	delLines(indexLines: number[]): { indexLine: number; res: MethodResult }[];
	// Retourne l'état d'une ligne : EMPTY, PARTIAL ou FULL
	stateLine(indexLine: number): LineState;
	// Idem pour plusieurs lignes
	stateLines(indexLines: number[]): { indexLine: number; state: LineState }[];
	// Crée une ligne avec une cellule vide
	createPartialLine(indexLine: number, indexEmptyColumn?: number): MethodResult;
	// Fait monter une nouvelle ligne depuis le bas, avec une colonne vide aléatoire
	lineCellRise(): MethodResult;
	// Fait descendre toutes les lignes non vides s'il y a des lignes vides en dessous
	lineCellFall(): MethodResult;

	// =====================================================
	// Colonnes
	// =====================================================

	// Retourne l'indice de la cellule la plus haute dans une colonne
	highestPointColumn(indexColumn: number): number;
	// Retourne l'indice de la cellule la plus haute pour plusieurs colonnes
	highestPointsColumns(indexColumns: number[]): { indexColumn: number; highestPoint: number }[];
}
