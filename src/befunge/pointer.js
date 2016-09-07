
export const Directions = {
  up:    'up',
  right: 'right',
  down:  'down',
  left:  'left'
};

export const create = () => {

  const pointer = {
    x: 0,
    y: 0,
    direction: Directions.right,
    jump: false
  };

  return pointer;

};

export const reset = (pointer) => {
  pointer.x = 0;
  pointer.y = 0;
  pointer.direction = Directions.right;
};

export const goUp = (pointer) => {
  pointer.direction = Directions.up;
};

export const goRight = (pointer) => {
  pointer.direction = Directions.right;
};

export const goDown = (pointer) => {
  pointer.direction = Directions.down;
};

export const goLeft = (pointer) => {
  pointer.direction = Directions.left;
};

export const jump = (pointer) => {
  pointer.jump = true;
};

export const goRandom = (pointer) => {
  const r = Math.floor(Math.random() * 4);
  switch (r) {
  case 0:
    pointer.direction = Directions.up;
    break;
  case 1:
    pointer.direction = Directions.down;
    break;
  case 2:
    pointer.direction = Directions.left;
    break;
  case 3:
    pointer.direction = Directions.right;
    break;
  }
};

export const move = (pointer, grid) => {
  switch (pointer.direction) {
  case Directions.up:
    pointer.y -= 1;
    if (pointer.y < 0) {
      pointer.y = grid.yCells - 1;
    }
    break;
  case Directions.right:
    pointer.x += 1;
    if (pointer.x >= grid.xCells) {
      pointer.x = 0;
    }
    break;
  case Directions.down:
    pointer.y += 1;
    if (pointer.y >= grid.yCells) {
      pointer.y = 0;
    }
    break;
  case Directions.left:
    pointer.x -= 1;
    if (pointer.x < 0) {
      pointer.x = grid.xCells - 1;
    }
    break;
  default:
    console.log('Should never get to here');
  }
  if (pointer.jump) {
    pointer.jump = false;
    move(pointer, grid);
  }
};
