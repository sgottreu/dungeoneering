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
		this.setState({open: false});
	}

	

	render(){
		let {availableEncounters, selectedEncounter} = this.props;


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
					<SelectField onChange={this.handleChange} value={selectedEncounter} floatingLabelText="Saved Encounters" >
						{availableEncounters.map( (enc, x) => {
							let label = (enc.title) ? enc.title : enc._id;
							return (
								<MenuItem key={enc._id} value={enc._id} primaryText={label} />
							)
						})}
					</SelectField>
					
	      </Drawer>
	    </div>
	  )
	}

}

export default EncounterLoadDrawer;

