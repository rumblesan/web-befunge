
export const create = (two, grid, style) => {
  const pointerGfx = two.makeRectangle(
    0.5 * grid.cellSize,
    0.5 * grid.cellSize,
    grid.cellSize,
    grid.cellSize
  );
  pointerGfx.noFill();
  pointerGfx.stroke = style.stroke;
  pointerGfx.linewidth = style.linewidth;
  return pointerGfx;
};
