
export const create = (grid, gridGfx, cellGfx) => {
  return {
    cells: {},
    grid: grid,
    gridGfx: gridGfx,
    cellGfx: cellGfx
  };
};

export const addCell = (program, x, y, cell) => {
  program.cells[[x, y]] = cell;
};

export const getCell = (program, x, y) => {
  return program.cells[[x, y]];
};
