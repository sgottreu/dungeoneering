import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import '../css/EntityDrawer.css';

const EntityDrawer = ( {
  entityType, 
  onSelectEntity, 
  selectedEntity, 
  availableMonsters,
  onOpenDrawer,
  open
}) => {

	return (
		<div className="EntityDrawer">
		 <RaisedButton
        label={'Show '+entityType} 
        secondary={true} 
        onTouchTap={() => { onOpenDrawer('entity')} }
        className="button"
      />
      <Drawer
        docked={false}
        width={400}
        open={open}
        onRequestChange={() => { onOpenDrawer('entity', false)} }
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
                  onTouchTap={ () => { onSelectEntity(m._id)} }
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

export default EntityDrawer;

