import React, { Component } from 'react';

class Tile extends Component {

  render() {
  	let {id, label, onSelectTile, isActive} = this.props;
  	let className = label+' Tile';
  	className += isActive ? ' active' : '';
	  return (
	      <div className={className} onClick={onSelectTile.bind(this,id)}></div>
	    );
	}
}

export default Tile;
