
import * as Befunge from '../befunge';
import * as Instructions from './instructions';
import * as Grid from './grid';
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
    speeds: [500, 400, 300, 200, 100, 50, 20, 10, 5, 2],
    speed: 0,
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

export const getPointer = (interpreter) => {
  return interpreter.pointer;
};

export const speedUp = (interpreter) => {
  const speed = interpreter.speed;
  if (speed + 1 < interpreter.speeds.length) {
    interpreter.speed += 1;
  }
};

export const slowDown = (interpreter) => {
  const speed = interpreter.speed;
  if (speed - 1 > 0) {
    interpreter.speed -= 1;
  }
};

export const start = (interpreter, cb) => {
  const timer = setTimeout(() => {
    cb();
    start(interpreter, cb);
  }, interpreter.speeds[interpreter.speed]);
  interpreter.timer = timer;
};

export const stop = (interpreter) => {
  clearTimeout(interpreter.timer);
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
  const pointer = getPointer(interpreter);
  const cell = Befunge.getCell(befunge, pointer.x, pointer.y);
  evaluate(befunge, cell);
  Pointer.move(pointer, grid);
};

export const evaluate = (befunge, cell) => {
  const {interpreter, terminal} = befunge;
  const pointer = getPointer(interpreter);
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
  let a, b, x, y, v, c;
  switch (cell.instruction.instruction) {
  case 'i':
    pushStack(interpreter, cell.instruction.value);
    break;

  case '+':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, a + b);
    break;
  case '-':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, b - a);
    break;
  case '*':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, a * b);
    break;
  case '/':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, Math.floor(b / a));
    break;
  case '%':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, Math.floor(b % a));
    break;

  case '!':
    a = popStack(interpreter);
    if (a === 0) {
      pushStack(interpreter, 1);
    } else {
      pushStack(interpreter, 0);
    }
    break;
  case '`':
    a = popStack(interpreter);
    b = popStack(interpreter);
    if (b > a) {
      pushStack(interpreter, 1);
    } else {
      pushStack(interpreter, 0);
    }
    break;

  case '<':
    Pointer.goLeft(pointer);
    break;
  case '>':
    Pointer.goRight(pointer);
    break;
  case '^':
    Pointer.goUp(pointer);
    break;
  case 'v':
    Pointer.goDown(pointer);
    break;
  case '?':
    Pointer.goRandom(pointer);
    break;

  case '_':
    a = popStack(interpreter);
    if (a === 0) {
      Pointer.goRight(pointer);
    } else {
      Pointer.goLeft(pointer);
    }
    break;
  case '|':
    a = popStack(interpreter);
    if (a === 0) {
      Pointer.goDown(pointer);
    } else {
      Pointer.goUp(pointer);
    }
    break;

  case '"':
    if (interpreter.stringMode) {
      interpreter.stringMode = false;
    } else {
      interpreter.stringMode = true;
    }
    break;

  case ':':
    a = popStack(interpreter);
    pushStack(interpreter, a);
    pushStack(interpreter, a);
    break;
  case '\\':
    a = popStack(interpreter);
    b = popStack(interpreter);
    pushStack(interpreter, a);
    pushStack(interpreter, b);
    break;

  case '$':
    popStack(interpreter);
    break;

  case '.':
    a = popStack(interpreter);
    Terminal.print(terminal, `${a} `);
    break;
  case ',':
    a = String.fromCharCode(popStack(interpreter));
    Terminal.print(terminal, `${a}`);
    break;

  case '#':
    Pointer.jump(pointer);
    break;

  case 'p':
    y = popStack(interpreter);
    x = popStack(interpreter);
    v = popStack(interpreter);
    Befunge.newCell(
      befunge,
      Instructions.getInstruction(String.fromCharCode(v)),
      Grid.getCoordsForCell(befunge.grid, x, y)
    );
    break;
  case 'g':
    y = popStack(interpreter);
    x = popStack(interpreter);
    c = getCell(interpreter, x, y);
    console.log(x, y, c);
    pushStack(interpreter, c.instruction.value);
    break;

  case '@':
    clearInterval(interpreter.timer);
    console.log('Terminated');
    break;
  default:
    console.log('Ignoring:', cell.instruction);
  }
};
