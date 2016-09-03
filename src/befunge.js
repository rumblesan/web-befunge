import * as Interpreter from './interpreter';

export const create = (interpreter, grid, gridGfx, cellGfx) => {
  return {
    interpreter: interpreter,
    grid: grid,
    gridGfx: gridGfx,
    cellGfx: cellGfx
  };
};

export const addCell = (befunge, x, y, cell) => {
  befunge.interpreter.cells[[x, y]] = cell.instruction;
  befunge.cellGfx.add(cell.gfx);
};

export const getCell = (befunge, x, y) => {
  return befunge.interpreter.cells[[x, y]];
};

export const start = (befunge) => {
  befunge.interpreter.timer = setInterval(
    () => { Interpreter.interpret(befunge); },
    befunge.interpreter.speed
  );
};

export const stop = (befunge) => {
  clearInterval(befunge.interpreter.timer);
};