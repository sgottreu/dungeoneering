import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import TileOptions from './TileOptions';
import TilePool from './TilePool';

class TileDrawer extends Component {
	
	constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {open: false};

  }

	handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	render(){
		let {onSelectTile, selectedTile } = this.props;
		return (
			<div className="TileDrawer">
			 <RaisedButton
          label="Show Tiles"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
					<TilePool tiles={TileOptions} onSelectTile={onSelectTile} selectedTile={selectedTile} />
	      </Drawer>
	    </div>
	  )
	}

}

export default TileDrawer;

