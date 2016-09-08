/* global Two: false */

export const create = (two, style) => {

  return {
    two: two,
    style: style,
    gfx: two.makeGroup()
  };

};

export const newCellGfx = (cellGfx, instruction, coords, modified) => {
  const {two, style} = cellGfx;
  const gfx = two.makeGroup();
  const text = new Two.Text(instruction.symbol, 0, 0);
  text.size = style.textSize;
  const cellRect = two.makeRectangle(0, 0,
    style.cellSize,
    style.cellSize
  );
  if (modified) {
    cellRect.fill = style.modified.fill;
    cellRect.stroke = style.modified.stroke;
  } else {
    cellRect.fill = style.normal.fill;
    cellRect.stroke = style.normal.stroke;
  }
  cellRect.linewidth = style.linewidth;

  gfx.add(cellRect, text);
  gfx.translation.set(coords.cX, coords.cY);
  two.update();
  return gfx;
};
