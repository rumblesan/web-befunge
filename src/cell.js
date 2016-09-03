/* global Two: false */

export const create = (two, grid, xPos, yPos, instruction, cellStyle) => {
  var gfx = two.makeGroup();
  const text = new Two.Text(instruction.symbol, 0, 0);
  text.size = cellStyle.textSize;
  const cellGfx = two.makeRectangle(0, 0,
    grid.cellSize,
    grid.cellSize
  );
  cellGfx.fill = cellStyle.fill;
  cellGfx.stroke = cellStyle.stroke;
  cellGfx.linewidth = cellStyle.linewidth;

  gfx.add(cellGfx, text);
  gfx.translation.set(
    (xPos + 0.5) * grid.cellSize,
    (yPos + 0.5) * grid.cellSize
  );
  return {
    instruction: instruction,
    gfx: gfx
  };
};
