import * as Grid from './grid';
import * as Cell from './cell';

export const cellCreationMenu = (two, grid, cells, xPos, yPos) => {

  var menuItems = two.makeGroup();

  var menu = two.makeRectangle(xPos, yPos, 250, 250);
  menuItems.add(menu);

  const xOffset = menu.translation.x - 150;
  const yOffset = menu.translation.y - 150;
  let button;
  const buttonSize = 50;
  let x, y;
  for (x = 0; x < 5; x += 1) {
    for (y = 0; y < 5; y += 1) {
      button = two.makeRectangle(xOffset + ((x + 1) * buttonSize), yOffset + ((y + 1) * buttonSize), buttonSize, buttonSize);
      menuItems.add(button);
    }
  }

  two.update();
  menuInteraction(two, grid, menu, menuItems, cells, xPos, yPos);
  return menu;

};

const menuInteraction = (two, grid, menu, menuItems, cells, xPos, yPos) => {
  var initial = two.scene.translation;
  var gridCoords = Grid.getCoordinates(grid, xPos - initial.x, yPos - initial.y);
  const closeMenu = function () {
    menuItems._renderer.elem.removeEventListener('mouseleave', closeMenu);
    menuItems.remove();

    var newCell = Cell.create(two, grid, gridCoords.x, gridCoords.y);
    cells.add(newCell);
    two.update();
    addCellInteractivity(two, grid, newCell);
  };
  menuItems._renderer.elem.addEventListener('mouseleave', closeMenu);
};

function addCellInteractivity (two, grid, cell) {

  cell._renderer.elem.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var initial = cell.translation;
    var xOffset = e.clientX - initial.x;
    var yOffset = e.clientY - initial.y;

    var drag = function (e) {
      e.preventDefault();
      cell.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    var dragEnd = function (e) {
      e.preventDefault();
      snapCellToGrid(grid, cell);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };


    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });

  cell._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();

    cellCreationMenu(two, grid, cell, e.clientX, e.clientY);
    two.update();

  });
}

function snapCellToGrid (grid, cell) {
  var coords = Grid.getCoordinates(grid, cell.translation.x, cell.translation.y);
  cell.translation.set((coords.x + 0.5) * grid.cellSize, (coords.y + 0.5) * grid.cellSize);
}
