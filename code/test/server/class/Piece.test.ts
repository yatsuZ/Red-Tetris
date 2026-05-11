import { describe, it, expect } from 'vitest'
import { Piece } from '../../../src/server/class/Piece.js';
import { Shapes } from '../../../src/server/constant/Shapes.js';
import type { PieceData } from '../../../src/server/interface/I_Piece.js';
import { test_Constructeur } from './Piece/constructeur.js';
import { test_rotation } from './Piece/rotate.js';
import { test_matrix } from './Piece/matrix.js';
import { test_clone } from './Piece/clone.js';

describe('Piece', () => {
    describe('constructor', test_Constructeur);
    describe('rotate', test_rotation);
    describe('getMatrix', test_matrix);
    describe('clone', test_clone);
    // OSEF on test deja dans constructor
    // describe('get', test_get); 
})
