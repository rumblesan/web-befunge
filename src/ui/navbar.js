
import React from 'react';
import ReactDOM from 'react-dom';

import ProgramText from './programText';

export default React.createClass({
  getInitialState: function () {
    return {
      running: this.props.running,
      showtext: false
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

  programtext: function () {
    this.setState({showtext: !this.state.showtext});
  },

  updatetext: function (text) {
    this.setState(
      {showtext: !this.state.showtext},
      () => {
        this.props.updateprogram(text);
      }
    );
  },

  render: function () {
    return (
      <div>
        <div>
            <span className='control-item'>Befunge</span>
            <span onClick={this.toggleRunning} className='control-item'>{this.state.running ? 'Stop' : 'Start'}</span>
            <span onClick={this.reset} className='control-item'>Restart</span>
            <span onClick={this.programtext} className='control-item'>Program Text</span>
        </div>
        {this.state.showtext ? <ProgramText text='foo' close={this.programtext} update={this.updatetext} /> : <div></div>}
      </div>
    );
  }
});