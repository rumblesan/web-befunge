
export const create = (body) => {

  return {
    lines: [{
      chars: []
    }],
    body: body
  };

};

export const print = (terminal, c) => {
  terminal.body.innerHTML += c;
};

export const newline = (terminal) => {
  terminal.body.innerHTML += '<br/>';
};
