import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import TileOptions from './TileOptions';
import TilePool from './TilePool';
import '../css/TileDrawer.css';
class TileDrawer extends Component {
	
	constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleWithKey = this.toggleWithKey.bind(this);
    this.state = {open: false};

  }

  componentDidMount() {
      window.addEventListener("keyup", this.toggleWithKey);
  }

  toggleWithKey = (e) => {
    if(e.keyCode === 84 && e.altKey){
      this.handleToggle();
    } else {
			if((e.keyCode === 77 || e.keyCode === 71 || e.keyCode === 84) && e.altKey){
			  this.setState({open: false});
      }
		}
  }

	handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	render(){
		let {onSelectTile, selectedTile } = this.props;
		return (
			<div className="TileDrawer">
			 <RaisedButton
          label="Show Tiles"
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
					<TilePool tiles={TileOptions} onSelectTile={onSelectTile} selectedTile={selectedTile} />
	      </Drawer>
	    </div>
	  )
	}

}

export default TileDrawer;

