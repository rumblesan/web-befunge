
import React from 'react';
import ReactDOM from 'react-dom';

export const NavBar = React.createClass({
  getInitialState: function () {
    return {
      running: this.props.running
    };
  },

  toggleRunning: function () {
    this.setState({
      running: !this.state.running
    }, this.props.startStop);
  },

  reset: function () {
    this.setState({
      running: false
    }, this.props.reset);
  },

  render: function () {
    return (
      <div>
        <span className='control-item'>Befunge</span>
        <span onClick={this.toggleRunning} className='control-item'>{this.state.running ? 'Stop' : 'Start'}</span>
        <span onClick={this.reset} className='control-item'>Restart</span>
      </div>
    );
  }
});

export const create = (el, startStopCb, resetCb, running) => {
  return {
    component: ReactDOM.render(
      <NavBar startStop={startStopCb} reset={resetCb} running={running} />,
      el
    )
  };
};
