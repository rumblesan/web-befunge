/* global Two: false */

export const create = (two, style) => {

  return {
    two: two,
    style: style,
    gfx: two.makeGroup()
  };

};

export const newCellGfx = (cellGfx, instruction, coords) => {
  const {two, style} = cellGfx;
  const gfx = two.makeGroup();
  const text = new Two.Text(instruction.symbol, 0, 0);
  text.size = style.textSize;
  const cellRect = two.makeRectangle(0, 0,
    style.cellSize,
    style.cellSize
  );
  cellRect.fill = style.fill;
  cellRect.stroke = style.stroke;
  cellRect.linewidth = style.linewidth;

  gfx.add(cellRect, text);
  gfx.translation.set(
    (coords.x + 0.5) * style.cellSize,
    (coords.y + 0.5) * style.cellSize
  );
  two.update();
  return gfx;
};
