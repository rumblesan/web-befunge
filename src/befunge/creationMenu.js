/* global Two: false */

import * as Befunge from '../befunge';
import * as Instructions from './instructions';
import _ from 'underscore';

export const cellCreationMenu = (befunge, coords, menuConfig) => {

  const {two} = befunge;
  const instructions = _.values(Instructions.charInstructions);
  const {buttonColumns, buttonWidth, buttonHeight} = menuConfig;
  const rows = Math.ceil(instructions.length / buttonColumns);
  const menuWidth = (buttonWidth * buttonColumns);
  // Extra row is for char input
  const menuHeight = (rows + 1) * buttonHeight;

  const menu = {
    svg: two.makeGroup(),
    buttons: [],
    charInput: undefined
  };

  // Menu background
  menu.svg.add(two.makeRectangle(0, 0, menuWidth, menuHeight));

  const xOffset = (menuWidth - buttonWidth) / 2;
  const yOffset = (menuHeight - buttonHeight) / 2;

  for (let x = 0; x < buttonColumns; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      let instruction = instructions[(y * buttonColumns) + x];
      if (instruction) {
        let buttonGfx = CellCreateButtonGfx(two, instruction.symbol, menuConfig);
        buttonGfx.translation.set(
          (x * buttonWidth) - xOffset,
          (y * buttonHeight) - yOffset
        );
        menu.svg.add(buttonGfx);
        menu.buttons.push({
          svg: buttonGfx,
          click: ()=> Befunge.newCell(befunge, instruction, coords)
        });
      }
    }
  }

  const charInput = CharInput(two, menuConfig);
  charInput.svg.translation.set(0, (rows * buttonHeight) - yOffset);
  charInput.click = (c) => {
    const inst = Instructions.getInstruction(c);
    if (inst) {
      Befunge.newCell(befunge, inst, coords);
    }
  };
  menu.svg.add(charInput.svg);
  menu.charInput = charInput;

  two.update();
  menuInteraction(menu);
  return menu;

};

const menuInteraction = (menu) => {

  menu.charInput.action = (e) => {
    e.preventDefault();
    menu.charInput.click(menu.charInput.value);
    closeMenu();
  };
  
  const closeMenu = function () {
    window.removeEventListener('keydown', keyListen);
    menu.charInput.svg._renderer.elem.removeEventListener('click', menu.charInput.action);
    menu.svg._renderer.elem.removeEventListener('mouseleave', closeMenu);
    _.each(menu.buttons, (b) => {
      b.svg._renderer.elem.removeEventListener('click', b.action);
    });
    menu.svg.remove();
  };

  menu.charInput.svg._renderer.elem.addEventListener('click', menu.charInput.action);

  _.each(menu.buttons, (b) => {
    b.action = () => {
      b.click();
      closeMenu();
    };
    b.svg._renderer.elem.addEventListener('click', b.action);
  });

  const keyListen = (e) => {
    e.preventDefault();
    if (Instructions.isValid(e.key)) {
      menu.charInput.textSvg.value = e.key;
      menu.charInput.value = e.key;
    }
  };

  menu.svg._renderer.elem.addEventListener('mouseleave', closeMenu);

  window.addEventListener('keydown', keyListen);
};

const CharInput = (two, config) => {
  const rect = two.makeRectangle(0, 0, config.buttonWidth * 2, config.buttonHeight);
  const textSvg = new Two.Text('', 0, 0);
  const msg = new Two.Text('char:', 0, 0);
  textSvg.translation.set(config.buttonWidth / 2, 0);
  msg.translation.set(-config.buttonWidth / 2, 0);
  rect.linewidth = config.linewidth;

  return {
    textSvg: textSvg,
    value: null,
    svg: two.makeGroup(rect, msg, textSvg)
  };
};

const CellCreateButtonGfx = (two, message, config) => {
  const rect = two.makeRectangle(0, 0, config.buttonWidth, config.buttonHeight);
  rect.linewidth = config.linewidth;
  const svg = two.makeGroup(rect, new Two.Text(message, 0, 0));
  return svg;
};
