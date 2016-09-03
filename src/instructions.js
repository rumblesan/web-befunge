
export default {
  count: 11,
  charInst: (c) => {
    return {
      symbol: c,
      instruction: 'c',
      value: c
    };
  },
  intInst: (i) => {
    return {
      symbol: i,
      instruction: 'i',
      value: parseInt(i, 10)
    };
  },
  0: {symbol: '^', instruction: '^'},
  1: {symbol: '>', instruction: '>'},
  2: {symbol: 'v', instruction: 'v'},
  3: {symbol: '<', instruction: '<'},
  4: {symbol: '_', instruction: '_'},
  5: {symbol: '|', instruction: '|'},
  6: {symbol: '@', instruction: '@'},
  7: {symbol: '+', instruction: '+'},
  8: {symbol: '-', instruction: '-'},
  9: {symbol: '*', instruction: '*'},
  10: {symbol: '/', instruction: '/'}
};

