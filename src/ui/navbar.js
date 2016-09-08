
import React from 'react';
import ReactDOM from 'react-dom';

import ProgramText from './programText';

import * as Befunge from '../befunge';

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

  step: function () {
    this.setState({
      running: false
    }, this.props.step);
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
            <a href="#" className='control-item'>Befunge</a>
            <a href="#" onClick={this.toggleRunning} className='control-item'>{this.state.running ? 'Stop' : 'Start'}</a>
            <a href="#" onClick={this.step} className='control-item'>Step</a>
            <a href="#" onClick={this.reset} className='control-item'>Restart</a>
            <a href="#" onClick={this.programtext} className='control-item'>Program Text</a>
            <a href="#" onClick={this.props.speedUp} className='control-item'>Speed Up</a>
            <a href="#" onClick={this.props.slowDown} className='control-item'>Slow Down</a>
        </div>
        {this.state.showtext ? <ProgramText text={Befunge.getProgram(this.props.befunge)} close={this.programtext} update={this.updatetext} /> : <div></div>}
      </div>
    );
  }
});
