/* global Two */

import {Grid, Cell} from './ui';

(function () {
  var elem = document.getElementById('app');
  var two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(elem);

  var grid = Grid(two, 50, 30, 100);

  var cells = two.makeGroup();

  two.update();

  addGridInteractivity(two, grid, cells);

})();

function setToNearestSquare (grid, shape) {
  var nearestX = (Math.round(shape.translation.x / grid.cellSize - 0.5) + 0.5) * grid.cellSize;
  var nearestY = (Math.round(shape.translation.y / grid.cellSize - 0.5) + 0.5) * grid.cellSize;
  shape.translation.set(nearestX, nearestY);
}

function getGridCoordinate (grid, xPos, yPos) {
  var nearestX = Math.round(xPos / grid.cellSize - 0.5);
  var nearestY = Math.round(yPos / grid.cellSize - 0.5);
  return {x: nearestX, y: nearestY};
}

function addGridInteractivity (two, grid, cells) {

  grid.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    var initial = two.scene.translation;
    var gridCoords = getGridCoordinate(grid, e.clientX - initial.x, e.clientY - initial.y);
    var newCell = Cell(two, grid, gridCoords.x, gridCoords.y);
    cells.add(newCell);
    two.update();
    addCellInteractivity(grid, newCell);
  });

  grid.gfx._renderer.elem.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var initial = two.scene.translation;
    var xOffset = e.clientX - initial.x;
    var yOffset = e.clientY - initial.y;

    var drag = function (e) {
      e.preventDefault();
      two.scene.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    var dragEnd = function (e) {
      e.preventDefault();
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };

    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });
}

function addCellInteractivity (grid, cell) {

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
      setToNearestSquare(grid, cell);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };


    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  });
}
