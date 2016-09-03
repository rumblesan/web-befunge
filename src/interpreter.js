
import * as Program from './program';
import * as Pointer from './pointer';

export const create = () => {

  const pointer = Pointer.create();

  const interpreter = {
    timer: null,
    pointer: pointer,
    speed: 500
  };

  return interpreter;
};

export const start = (program, interpreter) => {
  interpreter.timer = setInterval(() => { interpret(interpreter, program); }, interpreter.speed);
};

export const stop = (program, interpreter) => {
  clearInterval(interpreter.timer);
};

const interpret = (interpreter, program) => {
  const {x, y} = interpreter.pointer;
  const cell = Program.getCell(program, x, y);
  evaluate(interpreter, cell);
  Pointer.move(interpreter.pointer, program.grid);
  console.log('tick', interpreter, [interpreter.pointer.x, interpreter.pointer.y]);
};

const evaluate = (interpreter, cell) => {
  if (cell === undefined) {
    return;
  }
  switch (cell.instruction.symbol) {
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
};
