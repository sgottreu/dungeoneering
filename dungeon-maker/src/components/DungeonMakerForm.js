import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const DungeonMakerForm = ({ onChooseDungeon, onSaveDungeonGrid, foundDungeonGrids, selectedDungeon }) => {

	const handleChange = (event, index, value) => {
		onChooseDungeon(value);
	};

	return (
		<div className="DungeonMakerForm">

			<TextField hintText="Encounter Name" />
			<RaisedButton label="Save Encounter" primary={true}  onClick={onSaveDungeonGrid.bind(this)} />

			<SelectField onChange={this.handleChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
				{foundDungeonGrids.map( (grid, x) => (
					<MenuItem key={grid._id} value={grid._id} primaryText={grid._id} />
				))}
			</SelectField>
		</div>
	);
};

export default DungeonMakerForm;

