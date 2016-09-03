
import * as Program from './program';

const Directions = {
  up:    'up',
  right: 'right',
  down:  'down',
  left:  'left'
};

export const create = () => {

  const pointer = {
    x: 0,
    y: 0,
    direction: Directions.right
  };

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
  movePointer(interpreter, program);
  console.log('tick', interpreter, [interpreter.pointer.x, interpreter.pointer.y]);
};

const evaluate = (interpreter, cell) => {
  if (cell === undefined) {
    return;
  }
  switch (cell.instruction.symbol) {
  case '^':
    interpreter.pointer.direction = Directions.up;
    break;
  case '>':
    interpreter.pointer.direction = Directions.right;
    break;
  case 'v':
    interpreter.pointer.direction = Directions.down;
    break;
  case '<':
    interpreter.pointer.direction = Directions.left;
    break;
  default:
    // NOP
  }
};

const movePointer = (interpreter, program) => {
  const pointer = interpreter.pointer;
  switch (pointer.direction) {
  case Directions.up:
    pointer.y -= 1;
    if (pointer.y < 0) {
      pointer.y = program.grid.yCells - 1;
    }
    break;
  case Directions.right:
    pointer.x += 1;
    if (pointer.x >= program.grid.xCells) {
      pointer.x = 0;
    }
    break;
  case Directions.down:
    pointer.y += 1;
    if (pointer.y >= program.grid.yCells) {
      pointer.y = 0;
    }
    break;
  case Directions.left:
    pointer.x -= 1;
    if (pointer.x < 0) {
      pointer.x = program.grid.xCells - 1;
    }
    break;
  default:
    console.log('Should never get to here');
  }
};
