/* global Two: false */

import * as Befunge from './befunge';

import * as Grid    from './grid';
import * as GridGFX from './gridGfx';
import * as Cell    from './cell';
import * as Interpreter from './interpreter';

import {cellCreationMenu} from './creationMenu';

const gridConfig = {
  xCells: 50,
  yCells: 30,
  cellSize: 70,
  style: {
    stroke: 'black',
    background: 'white',
    linewidth: 2
  }
};
const menuConfig = {
  buttonWidth: 50,
  buttonHeight: 50,
  buttonColumns: 5,
  style: {
    padding: 4,
    linewidth: 2
  }
};
const cellStyle = {
  fill: '#FF8000',
  stroke: 'orangered',
  linewidth: 5,
  textSize: 50
};

(function () {
  const two = new Two({
    type: Two.Types['svg'],
    fullscreen: true,
    autostart: true
  }).appendTo(document.getElementById('app'));

  const grid = Grid.create(gridConfig);
  const gridGfx = GridGFX.create(two, gridConfig);
  const cellGfx = two.makeGroup();

  const interpreter = Interpreter.create();
  const befunge = Befunge.create(interpreter, grid, gridGfx, cellGfx);
  Befunge.start(befunge);

  two.update();

  addGridInteractivity(two, befunge);

})();

function addGridInteractivity (two, befunge) {

  befunge.gridGfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    const initial = two.scene.translation;
    const coords = Grid.getCoordinates(befunge.grid, e.clientX - initial.x, e.clientY - initial.y);
    cellCreationMenu(two, coords, cellConstructor(two, befunge), menuConfig);
    two.update();
  });

  befunge.gridGfx._renderer.elem.addEventListener('mousedown', function (e) {
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

const addCellInteractivity = (two, befunge, cell) => {

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
      snapCellToGrid(befunge.grid, cell);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };


    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });

  cell.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    const initial = two.scene.translation;
    const coords = Grid.getCoordinates(befunge.grid, e.clientX - initial.x, e.clientY - initial.y);
    cellCreationMenu(two, coords, cellConstructor(two, befunge));
    two.update();
  });
};

const snapCellToGrid = (grid, cell) => {
  var coords = Grid.getCoordinates(grid, cell.translation.x, cell.translation.y);
  cell.translation.set((coords.x + 0.5) * grid.cellSize, (coords.y + 0.5) * grid.cellSize);
};

const cellConstructor = (two, befunge) => {
  return (instruction, coords) => {

    const newCell = Cell.create(two, befunge.grid, coords.x, coords.y, instruction, cellStyle);
    Befunge.addCell(befunge, coords.x, coords.y, newCell);
    two.update();
    addCellInteractivity(two, befunge, newCell);
  };
};
