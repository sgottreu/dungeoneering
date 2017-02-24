import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DungeonMakerForm extends Component {
	
	constructor(props){
    super(props);
    this.onChooseDungeon = this.props.onChooseDungeon.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

	handleChange(event, index, value){
		this.onChooseDungeon(value);
	}

	render(){
		let {onSaveDungeonGrid, foundDungeonGrids, selectedDungeon} = this.props;


		return (
			<div className="DungeonMakerForm">

				<TextField hintText="Encounter Name" />
	      <RaisedButton label="Save Encounter" primary={true}  onClick={onSaveDungeonGrid.bind(this)} />

	      <SelectField onChange={this.handleChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
          {foundDungeonGrids.map( (grid, x) => (
          	<MenuItem key={grid.encounter_id} value={grid.encounter_id} primaryText={grid.encounter_id} />
          ))}
        </SelectField>
	    </div>
	  )
	}

}

export default DungeonMakerForm;

