import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Drawer from 'material-ui/Drawer';

import '../css/DungeonLoadDrawer.css';

class DungeonLoadDrawer extends Component {
	
	constructor(props){
    super(props);
    this.onChooseDungeon = this.props.onChooseDungeon.bind(this);
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
		this.onChooseDungeon(value);
		this.setState({open: false});
	}

	

	render(){
		let {foundDungeonGrids, selectedDungeon} = this.props;


		return (
			<div className="DungeonLoadDrawer">
			 <RaisedButton
          label="Find Dungeon"
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
					<SelectField onChange={this.handleChange} value={selectedDungeon} floatingLabelText="Saved Dungeon Grids" >
						{foundDungeonGrids.map( (grid, x) => {
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

export default DungeonLoadDrawer;

