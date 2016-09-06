
import * as Befunge from '../befunge';
import * as Pointer from './pointer';
import * as Terminal from '../ui/terminal';

export const create = () => {

  const pointer = Pointer.create();

  const interpreter = {
    cellPositions: new Map(),
    cells: new Map(),
    stack: [],
    timer: null,
    pointer: pointer,
    speed: 500,
    stringMode: false
  };

  return interpreter;
};

export const addCell = (interpreter, x, y, cell) => {
  interpreter.cells.set(`${x},${y}`, cell);
  interpreter.cellPositions.set(cell, [x, y]);
};

export const getCell = (interpreter, x, y) => {
  return interpreter.cells.get(`${x},${y}`);
};

export const getAllCells = (interpreter) => {
  return interpreter.cells.values();
};

export const getCellPosition = (interpreter, cell) => {
  return interpreter.cellPositions.get(cell);
};

export const deleteCell = (interpreter, cell) => {
  // TODO check that the cell exists first
  const [x, y] = interpreter.cellPositions.get(cell);
  interpreter.cellPositions.delete(cell);
  interpreter.cells.delete(`${x},${y}`);
};

export const deleteAllCells = (interpreter) => {
  interpreter.cellPositions.clear();
  interpreter.cells.clear();
};

export const getStack = (interpreter) => {
  return interpreter.stack;
};

export const pushStack = (interpreter, value) => {
  interpreter.stack.push(value);
};

export const popStack = (interpreter) => {
  return interpreter.stack.pop();
};

export const clearStack = (interpreter) => {
  interpreter.stack = [];
};

export const start = (interpreter, cb) => {
  const timer = setInterval(cb, interpreter.speed);
  interpreter.timer = timer;
};

export const stop = (interpreter) => {
  clearInterval(interpreter.timer);
  interpreter.timer = null;
};

export const reset = (interpreter) => {
  deleteAllCells(interpreter);
  clearStack(interpreter);
  stop(interpreter);
  Pointer.reset(interpreter.pointer);
  interpreter.stringMode = false;
};

export const interpret = (befunge) => {
  const {interpreter, grid} = befunge;
  const {pointer} = interpreter;
  const cell = Befunge.getCell(befunge, pointer.x, pointer.y);
  evaluate(befunge, cell);
  Pointer.move(pointer, grid);
};

export const evaluate = (befunge, cell) => {
  const {interpreter, terminal} = befunge;
  if (cell === undefined) {
    return;
  }
  if (interpreter.stringMode) {
    if (cell.instruction.symbol === '"') {
      interpreter.stringMode = false;
    } else {
      pushStack(interpreter, cell.instruction.value);
    }
    return;
  }
  let v1, v2;
  switch (cell.instruction.instruction) {
  case '^':
    interpreter.pointer.direction = Pointer.Directions.up;
    break;
  case '>':
    interpreter.pointer.direction = Pointer.Directions.right;
    break;
  case 'v':
    interpreter.pointer.direction = Pointer.Directions.down;
    break;
  case '<':
    interpreter.pointer.direction = Pointer.Directions.left;
    break;

  case '_':
    v1 = popStack(interpreter);
    if (v1 === 0) {
      interpreter.pointer.direction = Pointer.Directions.right;
    } else {
      interpreter.pointer.direction = Pointer.Directions.left;
    }
    break;
  case '|':
    console.log(interpreter.stack);
    v1 = popStack(interpreter);
    console.log('v1', v1);
    if (v1 === 0) {
      interpreter.pointer.direction = Pointer.Directions.down;
    } else {
      interpreter.pointer.direction = Pointer.Directions.up;
    }
    break;

  case ':':
    v1 = popStack(interpreter);
    pushStack(interpreter, v1);
    pushStack(interpreter, v1);
    break;
  case '\\':
    v1 = popStack(interpreter);
    v2 = popStack(interpreter);
    pushStack(interpreter, v1);
    pushStack(interpreter, v2);
    break;

  case 'i':
    console.log('i', cell.instruction.value);
    pushStack(interpreter, cell.instruction.value);
    break;
  case '"':
    if (interpreter.stringMode) {
      interpreter.stringMode = false;
    } else {
      interpreter.stringMode = true;
    }
    break;
  case '+':
    v1 = popStack(interpreter);
    v2 = popStack(interpreter);
    pushStack(interpreter, v2 + v1);
    break;
  case '-':
    v1 = popStack(interpreter);
    v2 = popStack(interpreter);
    pushStack(interpreter, v2 - v1);
    break;
  case '*':
    v1 = popStack(interpreter);
    v2 = popStack(interpreter);
    pushStack(interpreter, v2 * v1);
    break;
  case '/':
    v1 = popStack(interpreter);
    v2 = popStack(interpreter);
    pushStack(interpreter, Math.floor(v2 / v1));
    break;
  case '.':
    v1 = popStack(interpreter);
    Terminal.print(terminal, `${v1}`);
    break;
  case ',':
    v1 = String.fromCharCode(popStack(interpreter));
    Terminal.print(terminal, `${v1}`);
    break;
  case '@':
    clearInterval(interpreter.timer);
    console.log('Terminated');
    break;
  default:
    console.log('Ignoring:', cell.instruction);
  }
  console.log('tick', cell.instruction, [interpreter.pointer.x, interpreter.pointer.y]);
};
