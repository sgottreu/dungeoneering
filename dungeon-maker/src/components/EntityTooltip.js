import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import '../css/EntityTooltip.css';

class EntityTooltip extends Component {

  constructor(props){
    super(props);

    this.loadData = this.loadData.bind(this);
  }

  loadData = (entity) => {
    if(!entity){
      return false;
    }
    let AbilityMap = new Map(Object.entries(entity.abilities));

    return (
      <List>
        <ListItem primaryText={entity.name} leftIcon={<div className={'tooltip_icon icon '+entity.iconClass} />}  />
        <ListItem primaryText={entity.level} leftIcon={<i className="fa fa-line-chart" aria-hidden="true"></i>}  />
        <ListItem primaryText={entity.xp} leftIcon={<i className="fa fa-trophy" aria-hidden="true"></i>}  />
        <ListItem primaryText={entity.hp} leftIcon={<i className="fa fa-heart" aria-hidden="true"></i>}  />
        <ListItem primaryText={<div className="flex">
          {[...AbilityMap.entries()].map((a, i) => {
          return (
            <Chip key={i}>
              <Avatar size={32}>{a[1].score}</Avatar>
              {a[0].slice(0,3).toProperCase()}
            </Chip>
          )
        })}</div>} leftIcon={<div>Abilities</div>}  />
      </List>
    );
  }

	render() {
    let entity = this.props.hoverEntity;
    let mouse = this.props.mouse;
    let className = 'EntityTooltip'+(entity === false ? ' hide' : '');

    let style = (mouse) ? {left: `${mouse.clientX+40}px`, top: `${mouse.clientY-80}px` } : {};
		return (
			<div className={className} style={style}>
				{this.loadData(entity)}
			</div>
		);

	}

}

export default EntityTooltip;