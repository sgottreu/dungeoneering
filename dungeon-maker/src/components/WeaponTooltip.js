import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import '../css/WeaponTooltip.css';

class WeaponTooltip extends Component {

  constructor(props){
    super(props);

    this.loadData = this.loadData.bind(this);
  }

  loadData = (weapon) => {
    if(!weapon){
      return false;
    }
    let damage = (weapon.damage.die === undefined) ? weapon.damage : `${weapon.damage.num}${weapon.damage.die}`
    let _range = (range) => {
          if(range === false || range === ''){ return false; }
           return ( <Chip key="G">
              <Avatar size={32}><i className="fa fa-area-chart" aria-hidden="true"></i></Avatar>
              {`${range.low}/${range.high}`}
            </Chip>)
          };
    let handed = (weapon.hands === '' || weapon.hands === undefined) ? ()=>{} : (hands) => {
          return ( <Chip key="H">
              <Avatar size={32}><i className="fa fa-hand-rock-o" aria-hidden="true"></i></Avatar>
              {`${hands}`}
            </Chip>)
          };
    return (
      <List className="stats">
        <ListItem primaryText={weapon.name} leftIcon={<div className={'tooltip_icon icon weapon_'+weapon.type.toLowerCase()} />}  />
        
        
        {<ListItem primaryText={
          <div className="flex-horiz">
            <Chip key={0}>
              <Avatar size={32}><i className="fa fa-usd" aria-hidden="true"></i></Avatar>
              {weapon.price}
            </Chip>
            <Chip key="B">
              <Avatar size={32}><i className="fa fa-bomb" aria-hidden="true"></i></Avatar>
              {damage}
            </Chip>
            { _range(weapon.range) }
            { handed(weapon.hands) }
          </div>
        } />}
      </List>
    );
  }

	render() {
    let { hoverObj } = this.props;

    if(hoverObj === undefined){
      return false;
    }
    let weapon = hoverObj.obj;
    let mouse = this.props.mouse;
    let className = 'WeaponTooltip'+(weapon === false ? ' hide' : '');

    let style = (mouse) ? {left: `${mouse.clientX+40}px`, top: `${mouse.clientY-80}px` } : {};
		return (
			<div className={className} style={style}>
				{this.loadData(weapon)}
			</div>
		);

	}

}

export default WeaponTooltip;