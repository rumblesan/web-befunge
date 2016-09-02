/* global Two: false */

import Instructions from './instructions';
import _ from 'underscore';

export const cellCreationMenu = (two, coords, cellConstructor, menuConfig) => {

  const buttonWidth = menuConfig.buttonWidth;
  const buttonHeight = menuConfig.buttonHeight;
  const columns = menuConfig.buttonColumns;
  const menuWidth = buttonWidth * columns;
  const rows = Math.ceil(Instructions.count / columns);
  const menuHeight = rows * buttonHeight;

  const menu = {
    svg: two.makeGroup(),
    buttons: []
  };

  // Menu background
  const menubg = two.makeRectangle(coords.xPos, coords.yPos, menuWidth, menuHeight);
  menu.svg.add(menubg);

  const xOffset = menubg.translation.x - (menuWidth / 2) - (buttonWidth / 2);
  const yOffset = menubg.translation.y - (menuHeight / 2) - (buttonHeight / 2);

  for (let x = 0; x < columns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      let inst = Instructions[(y * columns) + x];
      if (inst) {
        let button = CellCreateButton(
          two,
          inst.symbol,
          ()=> cellConstructor(inst, coords),
          xOffset + ((x + 1) * buttonWidth),
          yOffset + ((y + 1) * buttonHeight)
        );
        menu.svg.add(button.svg);
        menu.buttons.push(button);
      }
    }
  }

  two.update();
  menuInteraction(menu);
  return menu;

};

const menuInteraction = (menu) => {
  const closeMenu = function () {
    menu.svg._renderer.elem.removeEventListener('mouseleave', closeMenu);
    _.each(menu.buttons, (b) => {
      b.svg._renderer.elem.removeEventListener('click', b.action);
    });
    menu.svg.remove();
  };

  _.each(menu.buttons, (b) => {
    b.action = () => {
      b.click();
      closeMenu();
    };
    b.svg._renderer.elem.addEventListener('click', b.action);
  });

  menu.svg._renderer.elem.addEventListener('mouseleave', closeMenu);
};


const CellCreateButton = (two, message, clickHandler, xPos, yPos, size) => {
  const svg = two.makeGroup(
    new Two.Text(message, xPos, yPos),
    two.makeRectangle(xPos, yPos, size, size)
  );
  return {
    click: clickHandler,
    svg: svg
  };
};
