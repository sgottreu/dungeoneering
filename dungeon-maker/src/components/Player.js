import React, { Component } from 'react';

class Player extends Component {

  render() {
  	let {playerActive, onActionChoice, playerPosition} = this.props;
    let className = 'Player ';
    className += (playerActive) ? 'active' : '';

    let style = {};
    if(playerPosition.slot > 0) {
      style = {
      	position: 'absolute',
      	left: playerPosition.x,
      	top: playerPosition.y,
      	backgroundColor: 'transparent'
      };
    }

	  return (
      <div style={style} className={className} onClick={onActionChoice.bind(this, 'playerActive')}></div>
    );
	}
}

export default Player;
