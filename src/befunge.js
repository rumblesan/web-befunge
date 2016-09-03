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
