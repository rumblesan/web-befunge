/* global Two: false */

import 'babel-polyfill';

import * as Befunge from './befunge';

import * as Grid    from './grid';
import * as GridGFX from './gridGfx';
import * as Cell    from './cell';
import * as Interpreter from './interpreter';
import * as PointerGFX  from './pointerGfx';
import * as Terminal  from './terminal';

import {cellCreationMenu} from './creationMenu';
import {cellModificationMenu} from './modificationMenu';

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
  linewidth: 2
};
const editMenuConfig = {
  buttonWidth: 100,
  buttonHeight: 50,
  lineWidth: 2
};
const cellStyle = {
  fill: '#FF8000',
  stroke: 'orangered',
  linewidth: 5,
  textSize: 50
};
const pointerStyle = {
  noFill: true,
  stroke: 'blue',
  linewidth: 5
};

const displayCellEditMenu = (two, befunge, cell) => {
  return (e) => {
    e.preventDefault();
    const coords = Grid.getCoordinates(befunge.grid, two.scene, e.clientX, e.clientY);
    let menu = cellModificationMenu(
      two, coords, editMenuConfig,
      () => {console.log('edit');},
      () => {Befunge.deleteCell(befunge, cell);}
    );
    menu.svg.translation.set(
        (coords.x + 0.5) * befunge.grid.cellSize,
        (coords.y + 0.5) * befunge.grid.cellSize
    );
    two.update();
  };
};

const displayCellCreationMenu = (two, befunge) => {
  return (e) => {
    e.preventDefault();
    const coords = Grid.getCoordinates(befunge.grid, two.scene, e.clientX, e.clientY);
    let menu = cellCreationMenu(two, coords, cellConstructor(two, befunge), menuConfig);
    menu.svg.translation.set(
        (coords.x + 0.5) * befunge.grid.cellSize,
        (coords.y + 0.5) * befunge.grid.cellSize
    );
    two.update();
  };
};

const addGridInteractivity = (two, befunge) => {
  befunge.gridGfx._renderer.elem.addEventListener('dblclick', displayCellCreationMenu(two, befunge) );

  befunge.gridGfx._renderer.elem.addEventListener('mousedown', function (e) {
    e.preventDefault();

    const sceneOffset = two.scene.translation;
    const xOffset = e.clientX - sceneOffset.x;
    const yOffset = e.clientY - sceneOffset.y;

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
};

const addCellInteractivity = (two, befunge, cell) => {

  cell.gfx._renderer.elem.addEventListener('dblclick', displayCellEditMenu(two, befunge, cell));

  cell.gfx._renderer.elem.addEventListener('mousedown', function (e) {

    e.preventDefault();

    const xOffset = two.scene.translation.x;
    const yOffset = two.scene.translation.y;

    Befunge.startMovingCell(befunge, cell);

    var drag = function (e) {
      e.preventDefault();
      cell.gfx.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    var dragEnd = function (e) {
      e.preventDefault();

      const coords = Grid.getCoordinates(befunge.grid, two.scene, e.clientX, e.clientY);
      const newX = ((coords.x + 0.5) * befunge.grid.cellSize);
      const newY = ((coords.y + 0.5) * befunge.grid.cellSize);

      cell.gfx.translation.set(newX, newY);
      Befunge.finishMovingCell(befunge, coords.x, coords.y, cell);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };

    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });
};

const cellConstructor = (two, befunge) => {
  return (instruction, coords) => {
    console.log('new instruction', instruction);
    const newCell = Cell.create(two, befunge.grid, coords.x, coords.y, instruction, cellStyle);
    Befunge.addCell(befunge, coords.x, coords.y, newCell);
    two.update();
    addCellInteractivity(two, befunge, newCell);
  };
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
  const pointerGfx = PointerGFX.create(two, gridConfig, pointerStyle);


  const terminal = Terminal.create(document.getElementById('terminal-text'));

  const interpreter = Interpreter.create();
  const befunge = Befunge.create(interpreter, grid, gridGfx, cellGfx, pointerGfx, terminal);
  Befunge.start(befunge);

  two.update();

  document.getElementById('toggle').addEventListener('click', () => {
    if (befunge.running) {
      Befunge.stop(befunge);
    } else {
      Befunge.start(befunge);
    }
  });

  document.getElementById('restart').addEventListener('click', () => {
    if (befunge.running) {
      Befunge.stop(befunge);
    }
    Befunge.resetPointer(befunge);
  });

  addGridInteractivity(two, befunge);

})();
