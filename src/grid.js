
export const create = (two, config) => {
  const {xCells, yCells, cellSize, style} = config;
  var gridGfx = two.makeGroup();
  var x, y;
  var width = xCells * cellSize;
  var height = yCells * cellSize;

  var background = two.makeRectangle(width / 2, height / 2, width, height);
  background.fill = style.background;
  gridGfx.add(background);

  var line;
  for (x = 0; x <= xCells; x += 1) {
    line = two.makeLine(x * cellSize, 0, x * cellSize, height);
    line.stroke = style.stroke;
    line.linewidth = style.linewidth;
    gridGfx.add(line);
  }

  for (y = 0; y <= yCells; y += 1) {
    line = two.makeLine(0, y * cellSize,  width, y * cellSize);
    line.stroke = style.stroke;
    line.linewidth = style.linewidth;
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

export const getCoordinates = (grid, xPos, yPos) => {
  var nearestX = Math.floor(xPos / grid.cellSize);
  var nearestY = Math.floor(yPos / grid.cellSize);
  return {
    x: nearestX, y: nearestY, xPos: xPos, yPos: yPos
  };
};
