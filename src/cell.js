/* global Two: false */

export const create = (two, grid, xPos, yPos, instruction) => {
  console.log('inst', instruction);
  var gfx = two.makeGroup();
  const text = new Two.Text(
    instruction.symbol,
    (xPos + 0.5) * grid.cellSize,
    (yPos + 0.5) * grid.cellSize
  );
  const cellGfx = two.makeRectangle(
    (xPos + 0.5) * grid.cellSize,
    (yPos + 0.5) * grid.cellSize,
    grid.cellSize,
    grid.cellSize
  );
  cellGfx.fill = '#FF8000';
  cellGfx.stroke = 'orangered';
  cellGfx.opacity = 0.75;
  cellGfx.linewidth = 5;
  gfx.add(cellGfx, text);
  return {
    instruction: instruction,
    gfx: gfx
  };
};
