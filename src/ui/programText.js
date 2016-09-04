
import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <div className='program-text'>
        <textarea rows="25" cols="80" ref="programtext" defaultValue={this.props.text}></textarea>
        <button onClick={() => this.props.update(this.refs.programtext.value)}>Update</button>
        <button onClick={this.props.close}>Close</button>
      </div>
    );
  }
});
