
export const Grid = (two, xCells, yCells, cellSize) => {
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

export const Cell = (two, grid, xPos, yPos) => {
  var cell = two.makeRectangle((xPos + 0.5) * grid.cellSize, (yPos + 0.5) * grid.cellSize, grid.cellSize, grid.cellSize);
  cell.fill = '#FF8000';
  cell.stroke = 'orangered';
  cell.opacity = 0.75;
  cell.linewidth = 5;
  return cell;
};
