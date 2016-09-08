/* global Two: false */

import _ from 'underscore';

export const cellModificationMenu = (befunge, coords, config, editMenuConstructor, buttonDestructor) => {

  const {two} = befunge;
  const {buttonWidth, buttonHeight} = config;
  const menuWidth = buttonWidth;
  const menuHeight = 2 * buttonHeight;

  const menu = {
    svg: two.makeGroup(),
    buttons: []
  };

  // Menu background
  menu.svg.add(two.makeRectangle(0, 0, menuWidth, menuHeight));

  const yOffset = buttonHeight / 2;

  const editButtonGfx = CellEditButtonGfx(two, 'Edit', config);
  editButtonGfx.translation.set(0, -yOffset);
  menu.svg.add(editButtonGfx);
  menu.buttons.push({
    svg: editButtonGfx,
    click: ()=> editMenuConstructor(coords)
  });

  const deleteButtonGfx = CellEditButtonGfx(two, 'Delete', config);
  deleteButtonGfx.translation.set(0, yOffset);
  menu.svg.add(deleteButtonGfx);
  menu.buttons.push({
    svg: deleteButtonGfx,
    click: ()=> buttonDestructor(coords)
  });

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


const CellEditButtonGfx = (two, message, config) => {
  const rect = two.makeRectangle(0, 0, config.buttonWidth, config.buttonHeight);
  rect.linewidth = config.linewidth;
  const svg = two.makeGroup(rect, new Two.Text(message, 0, 0));
  return svg;
};
