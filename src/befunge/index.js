import * as Interpreter from './interpreter';

import _ from 'underscore';

import Instructions from './instructions';

export const create = (interpreter, grid, gridGfx, cellGfx, pointerGfx, terminal) => {
  return {
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
  befunge.interpreter.cellPositions[[x, y]] = cell;
  befunge.interpreter.cells.set(cell, [x, y]);
  befunge.cellGfx.add(cell.gfx);
};

export const getCell = (befunge, x, y) => {
  return befunge.interpreter.cellPositions[[x, y]];
};

export const startMovingCell = (befunge, cell) => {
  const coords = befunge.interpreter.cells.get(cell);
  befunge.interpreter.cellPositions[coords] = undefined;
  return cell;
};

export const finishMovingCell = (befunge, x, y, cell) => {
  befunge.interpreter.cells.set(cell, [x, y]);
  befunge.interpreter.cellPositions[[x, y]] = cell;
};

export const deleteCell = (befunge, cell) => {
  cell.gfx.remove();
  const coords = befunge.interpreter.cells.get(cell);
  delete(befunge.interpreter.cellPositions[coords]);
  delete(befunge.interpreter.cells[cell]);
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
  const {grid} = befunge;
  const lines = text.split('\n');
  let instruction, i;
  _.each(lines, (line, y) => {
    _.each(line, (c, x) => {

      i = Instructions.charInstructions[c];
      if (i) {
        instruction = i;
      } else if (Instructions.check.isInt.test(c)) {
        instruction = Instructions.intInst(c);
      } else if (Instructions.check.isChar.test(c)) {
        instruction = Instructions.charInst(c);
      }
      if (instruction && x < grid.xCells && y < grid.yCells) {
        console.log(x, y, c);
        cellConstructor(instruction, {x: x, y: y});
      }
    });
  });
};

export const start = (befunge) => {
  if (befunge.running === false) {
    befunge.running = true;
    befunge.interpreter.timer = setInterval(
      () => {
        Interpreter.interpret(befunge);
        updatePointer(befunge);
      },
      befunge.interpreter.speed
    );
  }
};

export const stop = (befunge) => {
  if (befunge.running) {
    befunge.running = false;
    clearInterval(befunge.interpreter.timer);
  }
};

export const updatePointer = (befunge) => {
  const {interpreter, pointerGfx, grid} = befunge;
  const {pointer} = interpreter;
  const newX = (pointer.x + 0.5) * grid.cellSize;
  const newY = (pointer.y + 0.5) * grid.cellSize;
  pointerGfx.translation.set(newX, newY);
};

export const resetPointer = (befunge) => {
  const {interpreter, pointerGfx, grid} = befunge;
  const {pointer} = interpreter;
  pointer.x = 0;
  pointer.y = 0;
  const newX = (pointer.x + 0.5) * grid.cellSize;
  const newY = (pointer.y + 0.5) * grid.cellSize;
  pointerGfx.translation.set(newX, newY);
};
