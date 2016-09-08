
const inst = (c) => {
  return {symbol: c, instruction: c, value: c.charCodeAt()};
};

export const charInstructions = {
  '+': inst('+'),
  '-': inst('-'),
  '*': inst('*'),
  '/': inst('/'),
  '%': inst('%'),

  '!': inst('!'),
  '`': inst('`'),
  '_': inst('_'),
  '|': inst('|'),
  '#': inst('#'),

  '>': inst('>'),
  '<': inst('<'),
  '^': inst('^'),
  'v': inst('v'),
  '?': inst('?'),



  ':': inst(':'),
  '\\': inst('\\'),
  '$': inst('$'),
  '.': inst('.'),
  ',': inst(','),

  '"': inst('"'),
  'p': inst('p'),
  'g': inst('g'),
  '&': inst('&'),
  '~': inst('~'),

  '@': inst('@')
};

const isIntRe = /^[0-9]$/;
const isCharRe = /^[a-zA-Z]$/;

const charInst = (c) => {
  return {symbol: c, instruction: 'c', value: c.charCodeAt()};
};
const intInst = (i) => {
  return {symbol: i, instruction: 'i', value: parseInt(i, 10)};
};
const dataInst = (i) => {
  return {symbol: 'D', instruction: i, value: i};
};

export const isValid = (c) => {
  return (charInstructions[c] !== undefined || isCharRe.test(c) || isIntRe.test(c));
};

export const isInt = (c) => {
  return isIntRe.test(c);
};

export const isChar = (c) => {
  return isCharRe.test(c);
};

export const isBlank = (c) => {
  return (c === ' ');
};

export const getInstruction = (c) => {
  if (charInstructions[c]) {
    return charInstructions[c];
  } else if (isChar(c)) {
    return charInst(c);
  } else if (isInt(c)) {
    return intInst(c);
  } else if (isBlank(c)) {
    return null;
  } else {
    return dataInst(c);
  }
  return null;
};
