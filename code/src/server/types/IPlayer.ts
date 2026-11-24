import type { MethodResult } from "../constants/board.js";
import type { PieceMove } from "../constants/player.js";
import type { IBoard } from "./IBoard.js";
import type { IPiece } from "./IPiece.js";

// =====================================================
// Attributs
// =====================================================

export type PlayerData = {
    readonly id : number;
    name: string;// maximum 10 char
    isAlive: boolean;

    board: IBoard;

    readonly seedPiece: number;
    currentPiece: IPiece;
    heldPiece: IPiece | null;
    indexPiece: number;
};

export interface IPlayer extends PlayerData {
	// =====================================================
	// Création / accès
	// =====================================================

	toData(): PlayerData;
	clone(): IPlayer;

	// =====================================================
	// Action jeux
	// =====================================================

    // permet de recuper la piece suivante pour currentPiece
    nextPiece(): MethodResult;
    // switch currentPiece avec heldPiece et si heldPiece est null alors on passe à next piece et heldPiece deviens current
	holdPiece(): MethodResult;
    // Deplace une piece  
    movePiece(action: PieceMove): MethodResult;
    // Tourne une pieces
    rotatePiece(): MethodResult;
}
