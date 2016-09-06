/* global describe: false, it: false */

import * as Pointer from '../src/befunge/pointer.js';
import * as Grid from '../src/befunge/grid.js';
import 'babel-polyfill';

import assert from 'assert';

describe('Pointer', () => {

  describe('create()', () => {
    it('should create a new pointer', () => {

      const p = Pointer.create();

      assert.equal(p.x, 0);
      assert.equal(p.y, 0);
      assert.equal(p.direction, Pointer.Directions.right);

    });
  });

  describe('move()', () => {
    it('should move the pointer in the direction', () => {

      const p = Pointer.create();
      const g = Grid.create({xCells: 10, yCells: 10, cellSize: 10});

      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.goDown(p);
      Pointer.move(p, g);
      Pointer.move(p, g);
      assert.equal(p.x, 2);
      assert.equal(p.y, 2);
      assert.equal(p.direction, Pointer.Directions.down);

      Pointer.goLeft(p);
      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.goUp(p);
      Pointer.move(p, g);
      Pointer.move(p, g);
      assert.equal(p.x, 0);
      assert.equal(p.y, 0);
      Pointer.goRight(p);
      assert.equal(p.direction, Pointer.Directions.right);

    });

    it('should wrap the position over the grid', () => {

      const p = Pointer.create();
      const g = Grid.create({xCells: 3, yCells: 3, cellSize: 10});

      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.move(p, g);
      assert.equal(p.x, 1);

      Pointer.goDown(p);
      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.move(p, g);
      Pointer.move(p, g);
      assert.equal(p.y, 1);

    });
  });

});
