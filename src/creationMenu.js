/* global Two: false */

import Instructions from './instructions';
import _ from 'underscore';

export const cellCreationMenu = (two, coords, cellConstructor) => {

  const buttonWidth = 50;
  const buttonHeight = 50;
  const menuWidth = 250;
  const menuHeight = 250;

  const menu = {
    svg: two.makeGroup(),
    buttons: []
  };

  // Menu background
  const menubg = two.makeRectangle(coords.xPos, coords.yPos, menuWidth, menuHeight);
  menu.svg.add(menubg);

  const xOffset = menubg.translation.x - 150;
  const yOffset = menubg.translation.y - 150;

  for (let x = 0; x < 5; x += 1) {
    for (let y = 0; y < 5; y += 1) {
      let inst = Instructions[(y * 5) + x];
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
