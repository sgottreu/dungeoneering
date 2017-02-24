import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import {Variables} from './Variables';

class EntityDrawer extends Component {
	
	constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {open: false, availableMonsters: []};

  }

  componentDidMount() {
    let _this = this;
  }

	handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

	render(){
		let {entityType, onSelectEntity, selectedEntity, availableMonsters } = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 400,
        height: 450,
        overflowY: 'auto',
      },
    };

    const iconStyle = {
      width: '50px',
      height: '50px',
      display: 'block'
    };

		return (
			<div className="EntityDrawer">
			 <RaisedButton
          label={'Show '+entityType}
          onTouchTap={this.handleToggle}
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
              let entity_id = (selectedEntity === undefined) ? false : selectedEntity.entity_id;
              let className = '';//(entity_id === m.entity_id ) ? ' active' : '';

              return (
                <Paper key={index} className="EntityPaper" zDepth={(entity_id === m.entity_id ) ? 4 : 1 } >

                  <ListItem 
                    className={className}
                    key={index}
                    onTouchTap={onSelectEntity.bind(this, m.entity_id)}
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

