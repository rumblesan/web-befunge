
import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'underscore';

export const ReactTerminal = React.createClass({
  getInitialState: function () {
    return {
      lines: [],
      activeLine: ''
    };
  },

  render: function () {
    return (
      <div id="terminal-window">

        <div id="terminal-toolbar">
          <div id="terminal-top">

            <div id="terminal-menu"></div>

          </div>
        </div>

        <div id="terminal-body">
          {
            _.map(this.state.lines, (line) => {
              return <p><msg>{'>> '}</msg>{line}<br /></p>;
            })
          }
          {<p><msg>{'>> '}</msg>{this.state.activeLine}<br /></p>}
        </div>

      </div>
    );
  }
});

export const create = (element) => {
  return {
    component: render(element)
  };
};

export const render = (element) => {
  return ReactDOM.render(
    <ReactTerminal />,
    element
  );
};

export const print = (terminal, c) => {
  if (c === '\n') {
    newline(terminal);
  } else {
    const active = terminal.component.state.activeLine;
    terminal.component.setState({activeLine: active + c});
  }
};

export const newline = (terminal) => {
  const lines = terminal.component.state.lines;
  const active = terminal.component.state.activeLine;
  lines.push(active);
  terminal.component.setState({lines: lines, activeLine: ''});
};
