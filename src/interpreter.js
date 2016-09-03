
import * as Befunge from './befunge';
import * as Pointer from './pointer';

export const create = () => {

  const pointer = Pointer.create();

  const interpreter = {
    cellPositions: {},
    cells: new Map(),
    timer: null,
    pointer: pointer,
    speed: 500
  };

  return interpreter;
};

export const interpret = (befunge) => {
  const {interpreter, grid} = befunge;
  const {pointer} = interpreter;
  const cell = Befunge.getCell(befunge, pointer.x, pointer.y);
  evaluate(interpreter, cell);
  Pointer.move(pointer, grid);
};

const evaluate = (interpreter, cell) => {
  if (cell === undefined) {
    return;
  }
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
  default:
    // NOP
  }
  console.log('tick', cell.instruction, [interpreter.pointer.x, interpreter.pointer.y]);
};
