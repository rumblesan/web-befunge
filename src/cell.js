
export const create = (two, grid, xPos, yPos) => {
  var cell = two.makeRectangle((xPos + 0.5) * grid.cellSize, (yPos + 0.5) * grid.cellSize, grid.cellSize, grid.cellSize);
  cell.fill = '#FF8000';
  cell.stroke = 'orangered';
  cell.opacity = 0.75;
  cell.linewidth = 5;
  return cell;
};
