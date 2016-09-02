/* global Two: false */

import * as Grid from './grid';

import {cellCreationMenu} from './creationMenu';

(function () {
  var two = new Two({
    type: Two.Types['svg'],
    fullscreen: true,
    autostart: true
  }).appendTo(document.getElementById('app'));

  var grid = Grid.create(two, 50, 30, 100);

  var cells = two.makeGroup();

  two.update();

  addGridInteractivity(two, grid, cells);

})();

function addGridInteractivity (two, grid, cells) {

  grid.gfx._renderer.elem.addEventListener('dblclick', function (e) {
    e.preventDefault();
    cellCreationMenu(two, grid, cells, e.clientX, e.clientY);
    two.update();
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
