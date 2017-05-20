import React from 'react';

import '../css/Tile.css';

const Tile = ( { id, tile, onSelectTile } ) => {

	const className = tile.label+' Tile';
	const style = {
		width: (75 * ((tile.size === undefined) ? 1 : tile.size.width)),
		height: (75 * ((tile.size === undefined) ? 1 : tile.size.height)),
	}
	
  return (
    <div style={style} className={className} onClick={onSelectTile.bind(this,id)}></div>
  );
	
};

export default Tile;
