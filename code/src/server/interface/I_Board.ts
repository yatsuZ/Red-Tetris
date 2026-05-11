import type { Piece } from "../class/Piece.js";
import type { Matrix } from "./I_Piece.js";
export type CelluleType = 0 | 1 | 2 | 3;

export type BoardData = {
    readonly height: number;
    readonly width: number;
    readonly ceiling_limit: number;
    readonly highest_point: number;
};

export interface I_Board extends BoardData {
// Autre
  clone(): I_Board;

  // Retourne le board avec CelluleType
  getMatrix(): Matrix;

  // Verifie si on peut ajouter une piece retourne une matrix 0 si y a rien 1 si y a une cellule piece normal 2 si il y a une colision vertical 3 si il y a une colision horizontal
  canAddPiece(piece: Piece): Matrix;

  // Suprime une ligne. 0 a reussi a suprimer 1 ne peut pas surpimer
  delLine(indexLine: number): 0 | 1;

  // Suprime plusieur ligne. 0 a reussi a suprimer 1 ne peut pas surpimer
  delLines(indexLines: number[]): (0 | 1)[];

  // verifie leta d'une ligne 0 si elle est vide 1 si il y a des piece sur la ligne 2 si la ligne est remple
  stateLine(indexLine: number): 0 | 1 | 2;
  // pareil que stateLine mais fais avec plusieur ligne 
  stateLines(indexLines: number[]): (0 | 1 | 2)[];

  // Donne le point le plus haut de la colone
  highestPointColumn(indexColumn: number):number
  // Donne les point les plus haut dse  colones
  highestPointsColumns(indexColumns: number[]):number[]

  // Si il y a des ligne vide et qua dessus il y a des ligne non vide alors toute les les lignes non vide dessende du nombre de ligne vide en dessous
  lineCellFall(): 0 | 1;
  // Setter
  // essaye dajoueter une piece dans sont tableaux si tout se passe bien 0 sinon 1 plus envoie une throw error (es bete de faire 2 securité ?)
  addPiece(piece: Piece): 0 | 1;
// Getter d'attribut
  get(): BoardData;
}

//  Question devrais je donner un type pour 0 | 1 | 2 etc ?