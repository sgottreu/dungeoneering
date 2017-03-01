import React, { Component } from 'react';

import '../css/Tile.css';

class Tile extends Component {

  render() {
  	let {id, tile, onSelectTile} = this.props;
  	let className = tile.label+' Tile';
  	let style = {
  		width: (75 * ((tile.size === undefined) ? 1 : tile.size.width)),
  		height: (75 * ((tile.size === undefined) ? 1 : tile.size.height)),
  	}
  	
	  return (
	      <div style={style} className={className} onClick={onSelectTile.bind(this,id)}></div>
	    );
	}
}

export default Tile;
