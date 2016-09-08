/* global Two: false */

import 'babel-polyfill';

import * as Befunge from './befunge';

import * as Grid    from './befunge/grid';
import * as GridGFX from './befunge/gridGfx';
import * as Interpreter from './befunge/interpreter';
import * as PointerGFX  from './befunge/pointerGfx';
import * as Terminal  from './ui/terminal';
import * as CellGfx  from './ui/cellGfx';
import NavBar  from './ui/navbar';

import React from 'react';
import ReactDOM from 'react-dom';

import {cellCreationMenu} from './befunge/creationMenu';

const gridConfig = {
  xCells: 80,
  yCells: 25,
  cellSize: 40,
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
const cellStyle = {
  normal: {
    fill: '#FF8000',
    stroke: 'orangered',
  },
  modified: {
    fill: 'red',
    stroke: 'orangered',
  },
  linewidth: 5,
  textSize: gridConfig.cellSize * 0.7,
  cellSize: gridConfig.cellSize * 0.8
};
const pointerStyle = {
  noFill: true,
  stroke: 'blue',
  linewidth: 5
};

const displayCellCreationMenu = (befunge) => {
  return (e) => {
    e.preventDefault();
    const coords = Grid.getCoordinates(befunge.grid, befunge.two.scene, e.clientX, e.clientY);
    const menu = cellCreationMenu(befunge, coords, menuConfig);
    menu.svg.translation.set(coords.cX, coords.cY);
    befunge.two.update();
  };
};

const addGridInteractivity = (two, befunge) => {
  befunge.gridGfx._renderer.elem.addEventListener('dblclick', displayCellCreationMenu(befunge) );

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

(function () {
  const two = new Two({
    type: Two.Types['svg'],
    fullscreen: true,
    autostart: true
  }).appendTo(document.getElementById('app'));

  const grid = Grid.create(gridConfig);
  const gridGfx = GridGFX.create(two, gridConfig);
  const cellGfx = CellGfx.create(two, cellStyle);
  const pointerGfx = PointerGFX.create(two, gridConfig, pointerStyle);


  const terminal = Terminal.create(
    document.getElementById('console')
  );

  const interpreter = Interpreter.create();
  const befunge = Befunge.create(two, interpreter, grid, gridGfx, cellGfx, pointerGfx, terminal);

  const cellConstructor = (instruction, coords) => {
    Befunge.newCell(befunge, instruction, coords, false);
  };

  ReactDOM.render(
    <NavBar
      startStop={() => {
        befunge.running ? Befunge.stop(befunge) : Befunge.start(befunge);
      }}
      step={() => {
        if (befunge.running) {
          Befunge.stop(befunge);
        }
        Befunge.step(befunge);
      }}
      reset={() => {
        Terminal.message(terminal, 'Resetting');
        Befunge.reset(befunge);
      }}
      updateprogram={(text) => {
        Terminal.message(terminal, 'Loading new program');
        Befunge.updateProgram(befunge, text, cellConstructor);
      }}
      speedUp={() => {
        Terminal.message(terminal, 'Speed up');
        Interpreter.speedUp(interpreter);
      }}
      slowDown={() => {
        Terminal.message(terminal, 'Slow down');
        Interpreter.slowDown(interpreter);
      }}
      befunge={befunge}
      running={befunge.running} />,
    document.getElementById('header'),
  );

  two.update();

  addGridInteractivity(two, befunge);

})();
