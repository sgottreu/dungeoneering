import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Drawer from 'material-ui/Drawer';

class DungeonLoadDrawer extends Component {
	
	constructor(props){
    super(props);
    this.onChooseDungeon = this.props.onChooseDungeon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {open: false};

  }

	handleToggle = () => this.setState({open: !this.state.open});

  	handleClose = () => this.setState({open: false});

	handleChange(event, index, value){
		this.onChooseDungeon(value);
	}

	render(){
		let {onSaveDungeonGrid, foundDungeonGrids, selectedDungeon, onHandleTitleChange, dungeonTitle} = this.props;


		return (
			<div className="DungeonLoadDrawer">
			 <RaisedButton
          label="Find Dungeon"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
					<TextField hintText="Encounter Name" value={dungeonTitle} onChange={onHandleTitleChange.bind(this)} />
		      <RaisedButton label="Save Encounter" primary={true}  onClick={onSaveDungeonGrid.bind(this)} />

		      <SelectField onChange={this.handleChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
	          {foundDungeonGrids.map( (grid, x) => {
	          	let label = (grid.title) ? grid.title : grid.encounter_id;
	          	return (
	          		<MenuItem key={grid.encounter_id} value={grid.encounter_id} primaryText={label} />
	          	)
	          })}
	        </SelectField>
	      </Drawer>
	    </div>
	  )
	}

}

export default DungeonLoadDrawer;

