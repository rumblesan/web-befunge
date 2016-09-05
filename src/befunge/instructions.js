
const inst = (c) => {
  return {symbol: c, instruction: c, value: c.charCodeAt()};
};
export default {
  check: {
    isValid: /^[0-9a-zA-Z]$/,
    isInt: /^[0-9]$/,
    isChar: /^[a-zA-Z]$/
  },
  charInst: (c) => {
    return {symbol: c, instruction: 'c', value: c.charCodeAt()};
  },
  intInst: (i) => {
    return {symbol: i, instruction: 'i', value: parseInt(i, 10)};
  },
  charInstructions: {
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
  }
};

