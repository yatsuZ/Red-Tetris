import { describe } from 'vitest';
import { testConstructeur } from './Piece/constructor.js';
import { testRotation } from './Piece/rotate.js';
import { testMatrix } from './Piece/matrix.js';
import { testClone } from './Piece/clone.js';
import { testGetWidthHeight } from './Piece/getWidthHeight.js';

describe('Piece', () => {
	describe('constructor', testConstructeur);
	describe('rotate', testRotation);
	describe('getMatrix', testMatrix);
	describe('clone', testClone);
	describe('getWidthHeight', testGetWidthHeight);
});
