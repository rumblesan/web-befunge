import * as Interpreter from './interpreter';

export const create = (interpreter, grid, gridGfx, cellGfx, pointerGfx) => {
  return {
    interpreter: interpreter,
    grid: grid,
    gridGfx: gridGfx,
    cellGfx: cellGfx,
    pointerGfx: pointerGfx
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
    () => {
      Interpreter.interpret(befunge);
      updatePointer(befunge);
    },
    befunge.interpreter.speed
  );
};

export const stop = (befunge) => {
  clearInterval(befunge.interpreter.timer);
};

export const updatePointer = (befunge) => {
  const {interpreter, pointerGfx, grid} = befunge;
  const {pointer} = interpreter;
  const newX = (pointer.x + 0.5) * grid.cellSize;
  const newY = (pointer.y + 0.5) * grid.cellSize;
  pointerGfx.translation.set(newX, newY);
};
