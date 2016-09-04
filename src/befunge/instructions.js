
const inst = (c) => {
  return {symbol: c, instruction: c, value: c.charCodeAt()};
};
export default {
  count: 16,
  charInst: (c) => {
    return {symbol: c, instruction: 'c', value: c.charCodeAt()};
  },
  intInst: (i) => {
    return {symbol: i, instruction: 'i', value: parseInt(i, 10)};
  },
  0: inst('^'),
  1: inst('>'),
  2: inst('v'),
  3: inst('<'),
  4: inst('_'),
  5: inst('|'),
  6: inst('@'),
  7: inst('+'),
  8: inst('-'),
  9: inst('*'),
  10: inst('/'),
  11: inst(':'),
  12: inst('\\'),
  13: inst('"'),
  14: inst('.'),
  15: inst(',')
};

