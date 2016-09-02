
export const create = (two, xCells, yCells, cellSize) => {
  var gridGfx = two.makeGroup();
  var x, y;
  var width = xCells * cellSize;
  var height = yCells * cellSize;

  var background = two.makeRectangle(width / 2, height / 2, width, height);
  background.fill = 'white';
  gridGfx.add(background);

  var line;
  for (x = 0; x <= xCells; x += 1) {
    line = two.makeLine(x * cellSize, 0, x * cellSize, height);
    line.stroke = 'black';
    gridGfx.add(line);
  }

  for (y = 0; y <= yCells; y += 1) {
    line = two.makeLine(0, y * cellSize,  width, y * cellSize);
    line.stroke = 'black';
    gridGfx.add(line);
  }

  var grid = {
    gfx: gridGfx,
    width: width,
    height: height,
    xCells: xCells,
    yCells: yCells,
    cellSize: cellSize
  };

  return grid;
};

export const getCoordinate = (grid, xPos, yPos) => {
  var nearestX = Math.floor(xPos / grid.cellSize);
  var nearestY = Math.floor(yPos / grid.cellSize);
  return {
    x: nearestX, y: nearestY
  };
};
