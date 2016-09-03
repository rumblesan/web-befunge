
export const create = (config) => {

  var grid = {
    xCells: config.xCells,
    yCells: config.yCells,
    cellSize: config.cellSize
  };

  return grid;
};

export const getCoordinates = (grid, scene, xPos, yPos) => {
  const x = xPos - scene.translation.x;
  const y = yPos - scene.translation.y;
  var nearestX = Math.floor(x / grid.cellSize);
  var nearestY = Math.floor(y / grid.cellSize);
  return {
    x: nearestX, y: nearestY, xPos: xPos, yPos: yPos, xGrid: x, yGrid: y
  };
};
