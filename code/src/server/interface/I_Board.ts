import type { CelluleType, ResultMethod, StateLine, StatePieceCollision } from "../constant/Board.js";
import type { I_Piece, Matrix } from "./I_Piece.js";

export type MatrixCellule = Matrix<CelluleType>

export type BoardData = {
    readonly real_height: number;
    readonly real_width: number;
    readonly height: number;
    readonly width: number;
    highest_point: number;
    board: MatrixCellule;
};

export interface I_Board extends BoardData {
  readonly ceiling_limit: number;

  // Retourne les données du board (height, width, ceiling_limit, highest_point)
  get(): BoardData;

  // Retourne la grille sous forme de matrice de CelluleType
  getMatrix(): MatrixCellule;

  clone(): I_Board;

  initBoard():void;

  // Vérifie si une pièce peut être placée. Retourne une matrice d'états (StatePieceCollision) et le résultat global
  canAddPiece(piece: I_Piece): {matrix : Matrix<StatePieceCollision>, res : ResultMethod};

  // Supprime la ligne à l'index donné. Retourne SUCCESS ou FAIL
  delLine(indexLine: number): ResultMethod;

  // Supprime plusieurs lignes. Retourne le résultat pour chaque index
  delLines(indexLines: number[]): ({indexLine:number, res: ResultMethod})[];

  // Retourne l'état d'une ligne : EMPTY, PARTIAL ou FULL
  stateLine(indexLine: number): StateLine;
  // Idem pour plusieurs lignes
  stateLines(indexLines: number[]): ({indexLine:number, state: StateLine})[];

  // Retourne l'indice de la cellule la plus haute dans une colonne
  highestPointColumn(indexColumn: number):number
  // Retourne l'indice de la cellule la plus haute pour plusieurs colonnes
  highestPointsColumns(indexColumns: number[]):number[]

  // Fait descendre toutes les lignes non vides s'il y a des lignes vides en dessous
  lineCellFall(): ResultMethod;
  // Fait monter une nouvelle ligne depuis le bas, avec une colonne vide aléatoire
  lineCellRise(): ResultMethod;

  // Ajoute une pièce dans la grille. Retourne SUCCESS ou FAIL
  addPiece(piece: I_Piece): ResultMethod;
}