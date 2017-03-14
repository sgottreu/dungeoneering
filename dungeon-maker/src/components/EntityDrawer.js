import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import '../css/EntityDrawer.css';

class EntityDrawer extends Component {
	
	constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleWithKey = this.toggleWithKey.bind(this);
    this.state = {open: false, availableMonsters: []};

  }

  componentDidMount() {
      window.addEventListener("keyup", this.toggleWithKey);
  }

  toggleWithKey = (e) => {
    if(e.keyCode === 77 && e.altKey){
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
		let {entityType, onSelectEntity, selectedEntity, availableMonsters } = this.props;

		return (
			<div className="EntityDrawer">
			 <RaisedButton
          label={'Show '+entityType} 
          secondary={true} 
          onTouchTap={this.handleToggle}
          className="button"
        />
        <Drawer
          docked={false}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
        <List className="EntityIcons">
            {availableMonsters.map((monster, index) => {
              let m = monster;
              let _id = (selectedEntity === undefined) ? false : selectedEntity._id;
              let className = '';

              return (
                <Paper key={index} className="EntityPaper" zDepth={(_id === m._id ) ? 4 : 1 } >

                  <ListItem 
                    className={className}
                    key={index}
                    onTouchTap={onSelectEntity.bind(this, m._id)}
                    primaryText={m.name}
                    secondaryText={<span>HP: {m.hp}, XP: {m.xp}, Lvl: {m.level}</span>}
                    leftAvatar={<Avatar data-icon={m.iconClass} className={`${m.iconClass} icon`} />}
                  />
                </Paper>
              );
            })}
          </List>
	      </Drawer>
	    </div>
	  )
	}
}

export default EntityDrawer;

