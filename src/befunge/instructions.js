
const inst = (c) => {
  return {symbol: c, instruction: c, value: c.charCodeAt()};
};

export const charInstructions = {
  '^': inst('^'),
  '>': inst('>'),
  'v': inst('v'),
  '<': inst('<'),
  '_': inst('_'),
  '|': inst('|'),
  '@': inst('@'),
  '+': inst('+'),
  '-': inst('-'),
  '*': inst('*'),
  '/': inst('/'),
  ':': inst(':'),
  '\\': inst('\\'),
  '"': inst('"'),
  '.': inst('.'),
  ',': inst(',')
};

const isIntRe = /^[0-9]$/;
const isCharRe = /^[a-zA-Z]$/;

const charInst = (c) => {
  return {symbol: c, instruction: 'c', value: c.charCodeAt()};
};
const intInst = (i) => {
  return {symbol: i, instruction: 'i', value: parseInt(i, 10)};
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

export const getInstruction = (c) => {
  if (charInstructions[c]) {
    return charInstructions[c];
  } else if (isChar(c)) {
    return charInst(c);
  } else if (isInt(c)) {
    return intInst(c);
  }
  return null;
};
