/* global Two: false */

import * as Program from './program';

import * as Grid from './grid';
import * as Cell from './cell';

import {cellCreationMenu} from './creationMenu';

(function () {
  const two = new Two({
    type: Two.Types['svg'],
    fullscreen: true,
    autostart: true
  }).appendTo(document.getElementById('app'));

  const grid = Grid.create(two, 50, 30, 100);
  const cellGfx = two.makeGroup();

  const program = Program.create(grid, grid.gfx, cellGfx);

  window.program = program;
  two.update();

  addGridInteractivity(two, program);

})();

function addGridInteractivity (two, program) {

  program.grid.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    const initial = two.scene.translation;
    const coords = Grid.getCoordinates(program.grid, e.clientX - initial.x, e.clientY - initial.y);
    cellCreationMenu(two, coords, cellConstructor(two, program));
    two.update();
  });

  program.grid.gfx._renderer.elem.addEventListener('mousedown', function (e) {
    e.preventDefault();

    const initial = two.scene.translation;
    const xOffset = e.clientX - initial.x;
    const yOffset = e.clientY - initial.y;

    const drag = function (e) {
      e.preventDefault();
      two.scene.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    const dragEnd = function (e) {
      e.preventDefault();
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };

    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });
}

const addCellInteractivity = (two, program, cell) => {

  cell.gfx._renderer.elem.addEventListener('mousedown', function (e) {
    e.preventDefault();

    const initial = cell.translation;
    const xOffset = e.clientX - initial.x;
    const yOffset = e.clientY - initial.y;

    var drag = function (e) {
      e.preventDefault();
      cell.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    var dragEnd = function (e) {
      e.preventDefault();
      snapCellToGrid(program.grid, cell);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };


    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });

  cell.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    const initial = two.scene.translation;
    const coords = Grid.getCoordinates(program.grid, e.clientX - initial.x, e.clientY - initial.y);
    cellCreationMenu(two, coords, cellConstructor(two, program));
    two.update();
  });
};

const snapCellToGrid = (grid, cell) => {
  var coords = Grid.getCoordinates(grid, cell.translation.x, cell.translation.y);
  cell.translation.set((coords.x + 0.5) * grid.cellSize, (coords.y + 0.5) * grid.cellSize);
};

const cellConstructor = (two, program) => {
  return (instruction, coords) => {

    const newCell = Cell.create(two, program.grid, coords.x, coords.y, instruction);
    Program.addCell(program, coords.x, coords.y, newCell);
    two.update();
    addCellInteractivity(two, program, newCell);
  };
};
