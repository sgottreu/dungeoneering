import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import TileOptions from './TileOptions';
import TilePool from './TilePool';
import '../css/TileDrawer.css';

const TileDrawer = ({ onSelectTile, selectedTile, onOpenDrawer, open }) => {

  const toggleWithKey = (e) => {
    if(e.keyCode === 84 && e.altKey){
      onOpenDrawer('tile');
    } else {
			if((e.keyCode === 77 || e.keyCode === 71 || e.keyCode === 84) && e.altKey){
			  onOpenDrawer('tile', false);
      }
		}
  }

  window.addEventListener("keyup", toggleWithKey);

	return (
		<div className="TileDrawer">
		 <RaisedButton
        label="Show Tiles"
        secondary={true} 
        onTouchTap={() => {onOpenDrawer('tile')}}
				className="button"
      />
      <Drawer
        docked={false}
        width={300}
        open={open}
        onRequestChange={(open) => {
          onOpenDrawer('tile', false)
        }}
      >
				<TilePool tiles={TileOptions} onSelectTile={onSelectTile} selectedTile={selectedTile} />
      </Drawer>
    </div>
  )
	

}

export default TileDrawer;

