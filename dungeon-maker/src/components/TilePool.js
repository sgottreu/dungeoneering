import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import Tile from './Tile';
import '../css/TilePool.css';

class TilePool extends Component{
  render() {
    let {tiles, onSelectTile, selectedTile} = this.props;
    return (
        <div className="TilePool">
          {tiles.map((tile, index) => {
            let style = {
              width: (85 * ((tile.size === undefined) ? 1 : tile.size.width)),
              height: (85 * ((tile.size === undefined) ? 1 : tile.size.height)),
            };
            return (
              <Paper key={index} style={style} className={'TilePaper'} zDepth={(selectedTile===tile.id ) ? 3 : 1 } >
                <Tile className="Tile" key={tile.id} id={tile.id} tile={tile} onSelectTile={onSelectTile}/>
              </Paper>
            );
          })}
        </div>
      );
  }
}

export default TilePool;
