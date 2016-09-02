/* global Two */

(function () {
  var elem = document.getElementById('app');
  var two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(elem);

  var grid = drawGrid(two, 50, 30, 100);

  var cells = two.makeGroup();

  two.update();

  addWindowMovement(two, grid);
  addNewCellInteractivity(two, grid, cells);

})();

function addNewCell (two, grid, cells, xPos, yPos) {
  var cell = two.makeRectangle((xPos + 0.5) * grid.cellSize, (yPos + 0.5) * grid.cellSize, grid.cellSize, grid.cellSize);
  cell.fill = '#FF8000';
  cell.stroke = 'orangered';
  cell.opacity = 0.75;
  cell.linewidth = 5;
  cells.add(cell);
  two.update();
  addInteractivity(grid, cell);
}

function drawGrid (two, xCells, yCells, cellSize) {
  var gridGfx = two.makeGroup();
  var x, y;
  var width = xCells * cellSize;
  var height = yCells * cellSize;

  var background = two.makeRectangle(width / 2, height / 2, width, height);
  background.fill = 'white';
  gridGfx.add(background);

  var line;
  for (x = 0; x <= xCells; x += 1) {
    line = two.makeLine(x * cellSize, 0, x * cellSize, height);
    line.stroke = 'black';
    gridGfx.add(line);
  }

  for (y = 0; y <= yCells; y += 1) {
    line = two.makeLine(0, y * cellSize,  width, y * cellSize);
    line.stroke = 'black';
    gridGfx.add(line);
  }

  var grid = {
    gfx: gridGfx,
    width: width,
    height: height,
    xCells: xCells,
    yCells: yCells,
    cellSize: cellSize
  };

  return grid;
}

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

function addNewCellInteractivity (two, grid, cells) {
  grid.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    var initial = two.scene.translation;
    var gridCoords = getGridCoordinate(grid, e.clientX - initial.x, e.clientY - initial.y);
    addNewCell(two, grid, cells, gridCoords.x, gridCoords.y);
  });
}

function addInteractivity (grid, shape) {

  shape._renderer.elem.onmousedown = function (e) {
    e.preventDefault();

    var initial = shape.translation;
    var xOffset = e.clientX - initial.x;
    var yOffset = e.clientY - initial.y;

    var drag = function (e) {
      e.preventDefault();
      shape.translation.set(e.clientX - xOffset, e.clientY - yOffset);
    };

    var dragEnd = function (e) {
      e.preventDefault();
      setToNearestSquare(grid, shape);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);

    };


    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
  };
}

function addWindowMovement (two, grid) {
  grid.gfx._renderer.elem.onmousedown = function (e) {
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
  };

}
