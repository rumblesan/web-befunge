
import * as Befunge from '../befunge';
import * as Pointer from './pointer';
import * as Terminal from '../ui/terminal';

export const create = () => {

  const pointer = Pointer.create();

  const interpreter = {
    cellPositions: {},
    stack: [],
    cells: new Map(),
    timer: null,
    pointer: pointer,
    speed: 500,
    stringMode: false
  };

  return interpreter;
};

const push = (interpreter, value) => {
  interpreter.stack.push(value);
};

const pop = (interpreter) => {
  console.log(interpreter.stack);
  return interpreter.stack.pop();
};

export const reset = (interpreter) => {
  interpreter.cellPositions = {};
  interpreter.stack = [];
  interpreter.cells = new Map();
  clearInterval(interpreter.timer);
  interpreter.timer = null;
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

const evaluate = (befunge, cell) => {
  const {interpreter, terminal} = befunge;
  if (cell === undefined) {
    return;
  }
  if (interpreter.stringMode) {
    if (cell.instruction.symbol === '"') {
      interpreter.stringMode = false;
    } else {
      push(interpreter, cell.instruction.value);
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
    v1 = pop(interpreter);
    if (v1 === 0) {
      interpreter.pointer.direction = Pointer.Directions.right;
    } else {
      interpreter.pointer.direction = Pointer.Directions.left;
    }
    break;
  case '|':
    console.log(interpreter.stack);
    v1 = pop(interpreter);
    console.log('v1', v1);
    if (v1 === 0) {
      interpreter.pointer.direction = Pointer.Directions.down;
    } else {
      interpreter.pointer.direction = Pointer.Directions.up;
    }
    break;

  case ':':
    v1 = pop(interpreter);
    push(interpreter, v1);
    push(interpreter, v1);
    break;
  case '\\':
    v1 = pop(interpreter);
    v2 = pop(interpreter);
    push(interpreter, v1);
    push(interpreter, v2);
    break;

  case 'i':
    console.log('i', cell.instruction.value);
    push(interpreter, cell.instruction.value);
    break;
  case '"':
    if (interpreter.stringMode) {
      interpreter.stringMode = false;
    } else {
      interpreter.stringMode = true;
    }
    break;
  case '+':
    v1 = pop(interpreter);
    v2 = pop(interpreter);
    push(interpreter, v2 + v1);
    break;
  case '-':
    v1 = pop(interpreter);
    v2 = pop(interpreter);
    push(interpreter, v2 - v1);
    break;
  case '*':
    v1 = pop(interpreter);
    v2 = pop(interpreter);
    push(interpreter, v2 * v1);
    break;
  case '/':
    v1 = pop(interpreter);
    v2 = pop(interpreter);
    push(interpreter, Math.floor(v2 / v1));
    break;
  case '.':
    v1 = pop(interpreter);
    Terminal.print(terminal, `${v1}`);
    break;
  case ',':
    v1 = String.fromCharCode(pop(interpreter));
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
