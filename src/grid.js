
export const create = (config) => {

  var grid = {
    xCells: config.xCells,
    yCells: config.yCells,
    cellSize: config.cellSize
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
