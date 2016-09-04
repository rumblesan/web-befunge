
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
    direction: Directions.right
  };

  return pointer;

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
};
