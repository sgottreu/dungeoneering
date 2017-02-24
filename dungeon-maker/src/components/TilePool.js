import React, { Component } from 'react';
import Tile from './Tile';
import '../css/TilePool.css';

class TilePool extends Component{
  render() {
    let {tiles, onSelectTile, selectedTile} = this.props;
    return (
        <div className="TilePool">
          {tiles.map(tile => (
            <Tile className="Tile" key={tile.id} id={tile.id} label={tile.label} isActive={selectedTile===tile.id} onSelectTile={onSelectTile}/>
          ))}
        </div>
      );
  }
}

export default TilePool;
