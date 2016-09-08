import * as Interpreter from './interpreter';
import * as Pointer from './pointer';

import _ from 'underscore';

import * as Instructions from './instructions';

export const create = (two, interpreter, grid, gridGfx, cellGfx, pointerGfx, terminal) => {
  return {
    two: two,
    interpreter: interpreter,
    grid: grid,
    gridGfx: gridGfx,
    cellGfx: cellGfx,
    pointerGfx: pointerGfx,
    running: false,
    terminal: terminal
  };
};

export const addCell = (befunge, x, y, cell) => {
  Interpreter.addCell(befunge.interpreter, x, y, cell);
  befunge.cellGfx.add(cell.gfx);
};

export const getCell = (befunge, x, y) => {
  return Interpreter.getCell(befunge.interpreter, x, y);
};

export const getCellPosition = (befunge, cell) => {
  return Interpreter.getCellPosition(befunge.interpreter, cell);
};

export const startMovingCell = (befunge, cell) => {
  Interpreter.deleteCell(befunge.interpreter, cell);
};

export const finishMovingCell = (befunge, x, y, cell) => {
  const ec = getCell(befunge, x, y);
  if (ec) {
    deleteCell(befunge, ec);
  }
  Interpreter.addCell(befunge.interpreter, x, y, cell);
};

export const deleteCell = (befunge, cell) => {
  cell.gfx.remove();
  Interpreter.deleteCell(befunge.interpreter, cell);
};

export const clearAll = (befunge) => {
  const cells = Interpreter.getAllCells(befunge.interpreter);
  for (const cell of cells) {
    deleteCell(befunge, cell);
  }
};

export const getProgram = (befunge) => {
  const {grid} = befunge;
  let programtext = '';
  let cell;
  for (let y = 0; y < grid.yCells; y += 1) {
    for (let x = 0; x < grid.xCells; x += 1) {
      cell = getCell(befunge, x, y);
      if (cell) {
        programtext += cell.instruction.symbol;
      } else {
        programtext += ' ';
      }
    }
    programtext += '\n';
  }
  return programtext;
};

export const updateProgram = (befunge, text, cellConstructor) => {
  clearAll(befunge);
  const {grid} = befunge;
  const lines = text.split('\n');
  let instruction, line, c;
  for (let y = 0; y < grid.yCells; y += 1) {
    for (let x = 0; x < grid.xCells; x += 1) {
      line = lines[y];
      if (line === undefined) {
        continue;
      }
      c = line[x];
      if (c === undefined) {
        continue;
      }
      instruction = Instructions.getInstruction(c);
      if (instruction) {
        cellConstructor(instruction, {x: x, y: y});
      }
    }
  }
};

export const start = (befunge) => {
  if (!befunge.running) {
    befunge.running = true;
    Interpreter.start(
      befunge.interpreter,
      () => {
        Interpreter.interpret(befunge);
        updatePointer(befunge);
      }
    );
  }
};

export const stop = (befunge) => {
  if (befunge.running) {
    befunge.running = false;
    Interpreter.stop(befunge.interpreter);
  }
};

export const updatePointer = (befunge) => {
  const {interpreter, pointerGfx, grid} = befunge;
  const pointer = Interpreter.getPointer(interpreter);
  const newX = (pointer.x + 0.5) * grid.cellSize;
  const newY = (pointer.y + 0.5) * grid.cellSize;
  pointerGfx.translation.set(newX, newY);
};

export const resetPointer = (befunge) => {
  const {interpreter, pointerGfx, grid} = befunge;
  const pointer = Interpreter.getPointer(interpreter);
  Pointer.reset(pointer);
  const newX = (pointer.x + 0.5) * grid.cellSize;
  const newY = (pointer.y + 0.5) * grid.cellSize;
  pointerGfx.translation.set(newX, newY);
};
