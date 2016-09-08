
import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'underscore';

export const ReactTerminal = React.createClass({
  getInitialState: function () {
    return {
      lines: [],
      activeLine: '',
      messages: []
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

        <div id="terminal-stdout">
          {
            _.map(this.state.lines, (line, idx) => {
              return <p key={`line-${idx}`}><msg>{'>> '}</msg>{line}<br /></p>;
            })
          }
          {<p><msg>{'>> '}</msg>{this.state.activeLine}<br /></p>}
        </div>
        <div id="terminal-messages">
          {
            _.map(this.state.messages, (message, idx) => {
              switch (message.type) {
              case 'error':
                return <p key={`msg-${idx}`}><err>{'>> '}</err>{message.text}<br /></p>;
              case 'heading':
                return <p key={`msg-${idx}`}><heading>{'>> '}</heading>{message.text}<br /></p>;
              default:
                return <p key={`msg-${idx}`}><msg>{'>> '}</msg>{message.text}<br /></p>;
              }
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

const msg = (terminal, type, text) => {
  const messages = terminal.component.state.messages;
  const message = {
    type: type, text: text
  };
  messages.push(message);
  terminal.component.setState({messages: messages});
};

export const message = (terminal, text) => {
  msg(terminal, 'message', text);
};

export const error = (terminal, text) => {
  msg(terminal, 'error', text);
};

export const heading = (terminal, text) => {
  msg(terminal, 'heading', text);
};
