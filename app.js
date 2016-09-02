/* global Two */

(function () {
  var elem = document.getElementById('app');
  var two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(elem);

  var circle = two.makeCircle(72, 100, 50);
  var rect = two.makeRectangle(213, 100, 100, 100);

  circle.fill = '#FF8000';
  circle.stroke = 'orangered';
  circle.linewidth = 5;

  rect.fill = 'rgb(0, 200, 255)';
  rect.opacity = 0.75;
  rect.noStroke();

  var grid = drawGrid(two, 50, 30, 100);

  var shapes = two.makeGroup();
  shapes.add(grid.gfx, circle, rect);

  two.update();

  addInteractivity(grid, circle);
  addInteractivity(grid, rect);

  setToNearestSquare(grid, circle);
  setToNearestSquare(grid, rect);

  addWindowMovement(two, grid);

})();

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
