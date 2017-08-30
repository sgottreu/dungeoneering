import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Drawer from 'material-ui/Drawer';

import '../css/DungeonLoadDrawer.css';

const DungeonLoadDrawer = ( { 
	onOpenDrawer, 
	open,
	onChooseDungeon,
	availableDungeons, 
	selectedDungeon
}) => {

	return (
		<div className="DungeonLoadDrawer">
		 <RaisedButton
			label="Find Dungeon"
			secondary={true} 
			onTouchTap={() => { onOpenDrawer('dungeon')} }
			className="button"
		/>
    <Drawer
      docked={false}
      width={300}
      open={open}
      onRequestChange={() => { onOpenDrawer('dungeon', false) } }
    >
		<SelectField 
				onChange={(e,i,v) => { 
				    onChooseDungeon(v) 
          } 
        } 
        value={selectedDungeon} 
        floatingLabelText="Saved Dungeon Grids" >
				{availableDungeons.map( (grid, x) => {
					let label = (grid.title) ? grid.title : grid._id;
					return (
						<MenuItem key={grid._id} value={grid._id} primaryText={label} />
					)
				})}
			</SelectField>
				
      </Drawer>
    </div>
  )
	

}

export default DungeonLoadDrawer;

