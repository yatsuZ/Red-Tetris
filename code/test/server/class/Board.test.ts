import { describe } from 'vitest'
import { test_Constructeur } from './Board/constructeur.js';
import { test_clone } from './Board/clone.js';
import { test_addPiece } from './Board/addPiece.js';

describe('Board', () => {
    describe('constructor', test_Constructeur);
    describe('clone', test_clone);
    describe('addPiece', test_addPiece);
})
