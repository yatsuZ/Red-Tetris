import { describe } from 'vitest'
import { test_Constructeur } from './Board/constructeur.js';
import { test_clone } from './Board/clone.js';
import { test_addPiece } from './Board/addPiece.js';
import { test_canAddPiece } from './Board/canAddPiece.js';
import { test_canSpawnPiece } from './Board/canSpawnPiece.js';
import { test_delLine } from './Board/delLine.js';
import { test_delLines } from './Board/delLines.js';
import { test_stateLine } from './Board/stateLine.js';
import { test_stateLines } from './Board/stateLines.js';
import { test_createPartialLine } from './Board/createPartialLine.js';
import { test_lineCellRise } from './Board/lineCellRise.js';
import { test_highestPointColumn } from './Board/highestPointColumn.js';
import { test_highestPointsColumns } from './Board/highestPointsColumns.js';
import { test_lineCellFall } from './Board/lineCellFall.js';

describe('Board', () => {
  describe('constructor', test_Constructeur);
  describe('clone', test_clone);
  describe('addPiece', test_addPiece);
  describe('canAddPiece', test_canAddPiece);
  describe('canSpawnPiece', test_canSpawnPiece);
  describe('delLine', test_delLine);
  describe('delLines', test_delLines);
	describe('stateLine', test_stateLine);
	describe('stateLines', test_stateLines);
	describe('createPartialLine', test_createPartialLine);
	describe('lineCellRise', test_lineCellRise);
	describe('highestPointColumn', test_highestPointColumn);
	describe('highestPointsColumns', test_highestPointsColumns);
	describe('lineCellFall', test_lineCellFall);
})
