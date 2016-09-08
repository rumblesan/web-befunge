
export const create = (config) => {

  var grid = {
    xCells: config.xCells,
    yCells: config.yCells,
    cellSize: config.cellSize
  };

  return grid;
};

/**
 x, y:       Coordinates of grid cell
 xPos, yPos: Position of original click
 cX, cY:     Central coordinates of cell
 */
export const getCoordinates = (grid, scene, xPos, yPos) => {
  const x = xPos - scene.translation.x;
  const y = yPos - scene.translation.y;
  const nearestX = Math.floor(x / grid.cellSize);
  const nearestY = Math.floor(y / grid.cellSize);
  const cX = (nearestX + 0.5) * grid.cellSize;
  const cY = (nearestY + 0.5) * grid.cellSize;
  return {
    x: nearestX, y: nearestY, xPos: xPos, yPos: yPos, cX: cX, cY: cY
  };
};
