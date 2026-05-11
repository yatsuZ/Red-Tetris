import { describe, it, expect } from 'vitest'
import { Piece } from '../../../src/server/class/Piece.js';
import { Shapes } from '../../../src/server/constant/Shapes.js';
import type { PieceData } from '../../../src/server/interface/I_Piece.js';
import { test_Constructeur } from './Piece/constructeur.js';
import { test_rotation } from './Piece/rotate.js';
import { test_matrix } from './Piece/matrix.js';

describe('Piece', () => {
    describe('constructor', test_Constructeur)
    describe('rotate', test_rotation)
    describe('getMatrix', test_matrix)
      /*
    describe('clone', () => { 
      // Arrange
      const piece = new Piece('I', { x: 5, y: 4 });

      // Act — (ici rien, on teste juste l'état initial)
      const clonePiece : Piece = piece.clone();
      // Assert
      expect(piece).toEqual(clonePiece);
      expect(piece.orientation).toEqual(clonePiece.orientation);
      clonePiece.rotate();
      expect(piece.orientation).not.equal(clonePiece.orientation);

     })
    describe('get', () => { 
      // Arrange
      const piece = new Piece('I', { x: 5, y: 4 });
      piece.rotate()
      // Act — (ici rien, on teste juste l'état initial)
      const ref : PieceData = {
        shape: 'I',
        orientation : 1,
        position:{ x: 5, y: 4 }
      }
      // Assert
      expect(piece.get()).toEqual(ref);
     })
     */
})
