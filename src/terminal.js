
import React from 'react';
import ReactDOM from 'react-dom';

export const ReactTerminal = React.createClass({
  getInitialState: function () {
    return {
      text: ''
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
          <p>
            <msg>{'>> '}</msg>{this.state.text}<br />
          </p>
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
    <ReactTerminal text={''} />,
    element
  );
};

export const print = (terminal, c) => {
  terminal.component.setState({text: terminal.component.state.text + c});
};

export const newline = (terminal) => {
  terminal.component.setState({text: terminal.component.state.text + '<br />'});
};
