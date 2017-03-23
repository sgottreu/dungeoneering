import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Drawer from 'material-ui/Drawer';

import '../css/EncounterLoadDrawer.css';

class EncounterLoadDrawer extends Component {
	
	constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
		this.handleDungeonChange = this.handleDungeonChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleWithKey = this.toggleWithKey.bind(this);

    this.state = {open: false};

  }

  componentDidMount() {
      window.addEventListener("keyup", this.toggleWithKey);
  }

  toggleWithKey = (e) => {
    if(e.keyCode === 71 && e.altKey){
      this.handleToggle();
    } else {
			if((e.keyCode === 77 || e.keyCode === 71 || e.keyCode === 84) && e.altKey){
			  this.setState({open: false});
      }
		}
  }

	handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	handleChange(event, index, value){
		this.props.onSetEncounter(value);
		// this.setState({open: false});
	}

	handleDungeonChange(event, index, value){
		this.props.onSetDungeon(value);
		this.setState({open: false});
	}
	

	render(){
		let {availableEncounters, selectedEncounter, selectedDungeon, selectedParty, availableParties} = this.props;
		let _encounter = availableEncounters.find(enc => { return enc._id === selectedEncounter});
		let encounterDungeons = (!selectedEncounter) ? [] : _encounter.encounterDungeons; 

		return (
			<div className="EncounterLoadDrawer">
			 <RaisedButton
          label="Find Encounter"
					secondary={true} 
          onTouchTap={this.handleToggle}
					className="button"
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
					<SelectField  floatingLabelText={`Choose Party`} value={selectedParty} onChange={this.props.onHandlePartyChange} >
							{availableParties.map( (party, index) => {
									return (
									<MenuItem 
										key={index} value={party._id} primaryText={`${party.name}`} />
									);
							})}
					</SelectField>
					<br/>
					<SelectField onChange={this.handleChange} value={selectedEncounter} floatingLabelText="Saved Encounters" >
						{availableEncounters.map( (enc, x) => {
							let label = (enc.title) ? enc.title : enc._id;
							return (
								<MenuItem key={enc._id} value={enc._id} primaryText={label} />
							)
						})}
					</SelectField>
					<br/>
					<SelectField onChange={this.handleDungeonChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
						{encounterDungeons.map( (grid, x) => {
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

}

export default EncounterLoadDrawer;

