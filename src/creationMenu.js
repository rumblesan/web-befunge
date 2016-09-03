/* global Two: false */

import Instructions from './instructions';
import _ from 'underscore';

export const cellCreationMenu = (two, coords, cellConstructor, menuConfig) => {

  const style = menuConfig.style;
  const buttonWidth = menuConfig.buttonWidth;
  const buttonHeight = menuConfig.buttonHeight;
  const columns = menuConfig.buttonColumns;
  const menuWidth = (buttonWidth * columns) + style.padding;
  const rows = Math.ceil(Instructions.count / columns);
  const menuHeight = rows * buttonHeight + style.padding;

  const menu = {
    svg: two.makeGroup(),
    buttons: []
  };

  // Menu background
  const menubg = two.makeRectangle(0, 0, menuWidth, menuHeight);
  menu.svg.add(menubg);

  const xOffset = (- menuWidth / 2) + ((buttonWidth / 2) + (style.padding / 2));
  const yOffset = (- menuHeight / 2) + ((buttonHeight / 2) + (style.padding / 2));

  for (let x = 0; x < columns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      let inst = Instructions[(y * columns) + x];
      if (inst) {
        let button = CellCreateButton(
          two,
          inst.symbol,
          ()=> cellConstructor(inst, coords),
          xOffset + (x * buttonWidth),
          yOffset + (y * buttonHeight),
          menuConfig
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


const CellCreateButton = (two, message, clickHandler, xPos, yPos, config) => {
  const rect = two.makeRectangle(
    0,
    0,
    config.buttonWidth - config.style.padding,
    config.buttonHeight - config.style.padding
  );
  rect.linewidth = config.style.linewidth;
  const svg = two.makeGroup(rect, new Two.Text(message, 0, 0));
  svg.translation.set(xPos, yPos);
  return {
    click: clickHandler,
    svg: svg
  };
};
