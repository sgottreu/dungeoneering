import React, { Component } from 'react';

class Monster extends Component {

  render() {
  	let {active, onMoveEntity, position} = this.props;
    let className = 'Player ';
    className += (active) ? 'active' : '';

    let style = {};
    if(position !== undefined && position.slot > 0) {
      style = {
      	position: 'absolute',
      	left: position.x,
      	top: position.y,
      	backgroundColor: 'transparent'
      };
    }

	  return (
      <div style={style} className={className} onClick={onMoveEntity.bind(this)}></div>
    );
	}
}

export default Monster;
