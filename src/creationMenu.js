/* global Two: false */

import Instructions from './instructions';
import _ from 'underscore';

export const cellCreationMenu = (two, coords, cellConstructor, menuConfig) => {

  const {buttonColumns, buttonWidth, buttonHeight} = menuConfig;
  const rows = Math.ceil(Instructions.count / buttonColumns);
  const menuWidth = (buttonWidth * buttonColumns);
  const menuHeight = rows * buttonHeight;

  const menu = {
    svg: two.makeGroup(),
    buttons: []
  };

  // Menu background
  menu.svg.add(two.makeRectangle(0, 0, menuWidth, menuHeight));

  const xOffset = (menuWidth - buttonWidth) / 2;
  const yOffset = (menuHeight - buttonHeight) / 2;

  for (let x = 0; x < buttonColumns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      let inst = Instructions[(y * buttonColumns) + x];
      if (inst) {
        let buttonGfx = CellCreateButtonGfx(two, inst.symbol, menuConfig);
        buttonGfx.translation.set(
          (x * buttonWidth) - xOffset,
          (y * buttonHeight) - yOffset
        );
        menu.svg.add(buttonGfx);
        menu.buttons.push({
          svg: buttonGfx,
          click: ()=> cellConstructor(inst, coords)
        });
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


const CellCreateButtonGfx = (two, message, config) => {
  const rect = two.makeRectangle(0, 0, config.buttonWidth, config.buttonHeight);
  rect.linewidth = config.linewidth;
  const svg = two.makeGroup(rect, new Two.Text(message, 0, 0));
  return svg;
};
