import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Drawer from 'material-ui/Drawer';

import '../css/EncounterLoadDrawer.css';

const EncounterLoadDrawer = ( 
  {
    availableEncounters, 
    selectedEncounter, 
    selectedDungeon, 
    selectedParty, 
    availableParties,
    availableDungeons,
    onHandlePartyChange,
    onSetEncounter,
    onSetDungeon,
    onOpenDrawer,
    open
  } 
) => {

	const handleDungeonChange = (event, index, value) => {
		onSetDungeon(value);
		onOpenDrawer('encounter', false);
	}
	
  
	let _encounter = availableEncounters.find(enc => { return enc._id === selectedEncounter});
	let encounterDungeons = (!selectedEncounter || _encounter === undefined) ? [] : _encounter.dungeons; 

	return (
		<div className="EncounterLoadDrawer">
		 <RaisedButton
        label="Find Encounter"
				secondary={true} 
        onTouchTap={ () => {onOpenDrawer('encounter')} }
				className="button"
      />
      <Drawer
        docked={false}
        width={300}
        open={open}
        onRequestChange={ () => {onOpenDrawer('encounter', false)} }
      >
				<SelectField  floatingLabelText={`Choose Party`} 
					value={ selectedParty._id } onChange={(e,i,v) => { onHandlePartyChange(e,i,v) } } >
						{availableParties.map( (party, index) => {
							return (
								<MenuItem 
								key={index} value={party._id} primaryText={`${party.name}`} />
							);
						})}
				</SelectField>
				<br/>
				<SelectField onChange={(e, i, v) => { onSetEncounter(v); }} value={selectedEncounter} floatingLabelText="Saved Encounters" >
					{availableEncounters.map( (enc, x) => {
						let label = (enc.name) ? enc.name : enc._id;
						return (
							<MenuItem key={enc._id} value={enc._id} primaryText={label} />
						)
					})}
				</SelectField>
				<br/>
				<SelectField onChange={(e,i,v) => {handleDungeonChange(e,i,v) }} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
					{encounterDungeons.map( (_dungeon, x) => {
						let dungeon = availableDungeons.find(d => { return d._id === _dungeon});
						let label = '', dungeon_id = false;
						if(dungeon !== undefined) {
							label = (dungeon.title) ? dungeon.title : dungeon._id;
							dungeon_id =  dungeon._id;
						} 
						return (
							<MenuItem key={x} value={dungeon_id} primaryText={label} />
						)
					})}
				</SelectField>
				
      </Drawer>
    </div>
  )
	

}

export default EncounterLoadDrawer;

