
export const create = (two, config) => {
  const {xCells, yCells, cellSize, style} = config;

  const gridGfx = two.makeGroup();
  const width = xCells * cellSize;
  const height = yCells * cellSize;

  const background = two.makeRectangle(width / 2, height / 2, width, height);
  background.fill = style.background;
  gridGfx.add(background);

  let line;
  for (let x = 0; x <= xCells; x += 1) {
    line = two.makeLine(x * cellSize, 0, x * cellSize, height);
    line.stroke = style.stroke;
    line.linewidth = style.linewidth;
    gridGfx.add(line);
  }

  for (let y = 0; y <= yCells; y += 1) {
    line = two.makeLine(0, y * cellSize,  width, y * cellSize);
    line.stroke = style.stroke;
    line.linewidth = style.linewidth;
    gridGfx.add(line);
  }

  return gridGfx;
};
