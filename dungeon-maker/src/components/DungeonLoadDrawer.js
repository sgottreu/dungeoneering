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
		this.loadSaveMenu = this.loadSaveMenu.bind(this);
    
    this.state = {open: false};

  }

	handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	handleChange(event, index, value){
		this.onChooseDungeon(value);
		this.setState({open: false});
	}

	loadSaveMenu(){
		let {onSaveDungeonGrid, onHandleTitleChange, dungeonTitle} = this.props;
		return(
			<div>

				<br/>
				<TextField hintText="Encounter Name" value={dungeonTitle} onChange={onHandleTitleChange.bind(this)} />
				<RaisedButton label="Save Encounter" primary={true}  onClick={onSaveDungeonGrid.bind(this)} />
			</div>
		)
	}

	render(){
		let {foundDungeonGrids, selectedDungeon, showSave} = this.props;


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
					<SelectField onChange={this.handleChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
						{foundDungeonGrids.map( (grid, x) => {
							let label = (grid.title) ? grid.title : grid._id;
							return (
								<MenuItem key={grid._id} value={grid._id} primaryText={label} />
							)
						})}
					</SelectField>
					{(showSave===true) ? this.loadSaveMenu(selectedDungeon, foundDungeonGrids) : ''}

	      </Drawer>
	    </div>
	  )
	}

}

export default DungeonLoadDrawer;

