import { describe } from 'vitest'
import { test_Constructeur } from './Board/constructeur.js';
import { test_clone } from './Board/clone.js';
import { test_addPiece } from './Board/addPiece.js';
import { test_canAddPiece } from './Board/canAddPiece.js';
import { test_canSpawnPiece } from './Board/canSpawnPiece.js';

describe('Board', () => {
    describe('constructor', test_Constructeur);
    describe('clone', test_clone);
    describe('addPiece', test_addPiece);
    describe('canAddPiece', test_canAddPiece);
    describe('canSpawnPiece', test_canSpawnPiece);
})
