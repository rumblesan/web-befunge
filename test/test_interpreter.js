/* global describe: false, it: false */

import * as Interpreter from '../src/befunge/interpreter.js';
import 'babel-polyfill';

import assert from 'assert';

describe('Interpreter', function () {

  describe('addCells()', function () {
    it('should add a cell correctly', function () {

      const i = Interpreter.create();
      const c = {name: 'cell'};
      Interpreter.addCell(i, 0, 0, c);

      const retrieved = Interpreter.getCell(i, 0, 0);

      assert.deepEqual(retrieved, c);
    });
  });

  describe('getAllCells()', function () {
    it('should return the position a cell was added to', function () {

      const i = Interpreter.create();
      const c1 = {name: 'cell1'};
      const c2 = {name: 'cell2'};
      const c3 = {name: 'cell3'};
      Interpreter.addCell(i, 0, 0, c1);
      Interpreter.addCell(i, 1, 1, c2);
      Interpreter.addCell(i, 2, 2, c3);

      const cells = Interpreter.getAllCells(i);

      const cellList = [];
      for (const c of cells) {
        cellList.push(c);
      }
      const expected = [];
      expected.push(c1);
      expected.push(c2);
      expected.push(c3);

      assert.deepEqual(expected, cellList);
    });
  });

  describe('getCellPosition()', function () {
    it('should return the position a cell was added to', function () {

      const i = Interpreter.create();
      const c = {name: 'cell'};
      Interpreter.addCell(i, 0, 0, c);

      const retrieved = Interpreter.getCellPosition(i, c);

      assert.deepEqual(retrieved, [0, 0]);
    });
  });

  describe('deleteCell()', function () {
    it('should delete a cell and its position', function () {

      const i = Interpreter.create();
      const c = {name: 'cell'};
      Interpreter.addCell(i, 0, 0, c);

      Interpreter.deleteCell(i, c);

      const retCell = Interpreter.getCell(i, 0, 0);
      const retPos = Interpreter.getCellPosition(i, c);

      assert.deepEqual(retCell, undefined);
      assert.deepEqual(retPos, undefined);
    });
  });

  describe('deleteAllCells()', function () {
    it('should delete all cells', function () {

      const i = Interpreter.create();
      const c1 = {name: 'cell1'};
      const c2 = {name: 'cell2'};
      const c3 = {name: 'cell3'};
      Interpreter.addCell(i, 0, 0, c1);
      Interpreter.addCell(i, 1, 0, c2);
      Interpreter.addCell(i, 3, 3, c3);

      Interpreter.deleteAllCells(i);

      assert.deepEqual(Interpreter.getCell(i, 0, 0), undefined);
      assert.deepEqual(Interpreter.getCell(i, 1, 0), undefined);
      assert.deepEqual(Interpreter.getCell(i, 3, 3), undefined);

      assert.deepEqual(Interpreter.getCellPosition(i, c1), undefined);
      assert.deepEqual(Interpreter.getCellPosition(i, c2), undefined);
      assert.deepEqual(Interpreter.getCellPosition(i, c3), undefined);
    });
  });

  describe('pushStack()', function () {
    it('should push values onto the stack', function () {

      const i = Interpreter.create();

      Interpreter.pushStack(i, 1);
      Interpreter.pushStack(i, 2);
      Interpreter.pushStack(i, 3);

      assert.deepEqual(Interpreter.getStack(i), [1, 2, 3]);
    });
  });

  describe('popStack()', function () {
    it('should pop values off the stack', function () {

      const i = Interpreter.create();

      Interpreter.pushStack(i, 1);
      Interpreter.pushStack(i, 2);
      Interpreter.pushStack(i, 3);

      const v1 = Interpreter.popStack(i);
      const v2 = Interpreter.popStack(i);
      const v3 = Interpreter.popStack(i);

      assert.deepEqual(Interpreter.getStack(i), []);

      assert.equal(v1, 3);
      assert.equal(v2, 2);
      assert.equal(v3, 1);
    });
  });

  describe('clearStack()', function () {
    it('should clear the stack', function () {

      const i = Interpreter.create();

      Interpreter.pushStack(i, 1);
      Interpreter.pushStack(i, 2);
      Interpreter.pushStack(i, 3);

      Interpreter.clearStack(i);

      assert.deepEqual(Interpreter.getStack(i), []);
    });
  });

  describe('timer', function () {
    it('should set and then clear timer', function () {
      const i = Interpreter.create();

      let t = 0;
      Interpreter.start(i, () => { t += 1; });

      assert.ok(i.timer);

      Interpreter.stop(i);

      assert.equal(i.timer, null);
    });
  });

  describe('reset()', function () {
    it('should fully reset the interpreter', function () {
      const i = Interpreter.create();

      const c1 = {name: 'cell1'};
      const c2 = {name: 'cell2'};
      Interpreter.addCell(i, 0, 0, c1);
      Interpreter.addCell(i, 1, 1, c2);

      Interpreter.pushStack(i, 1);
      Interpreter.pushStack(i, 2);

      Interpreter.reset(i);

      assert.equal(i.cells.size, 0);
      assert.equal(i.cellPositions.size, 0);
      assert.equal(i.stringMode, false);
      assert.deepEqual(Interpreter.getStack(i), []);
      assert.equal(i.timer, null);
    });
  });

});
