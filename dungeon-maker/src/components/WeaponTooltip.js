import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TooltipChip from './TooltipChip';
import uuidV4  from 'uuid/v4';
import '../css/WeaponTooltip.css';

const WeaponTooltip = ({ hoverObj, mouse }) => {

  if(hoverObj === undefined){
    return false;
  }
  if(!hoverObj.obj){
    return false;
  }
  if(hoverObj.obj._type !== 'weapon'){
    return false;
  }
  let weapon = hoverObj.obj;

  let showRange = (weapon.range !== false && weapon.range !== '');
  let showHanded = (weapon.hands !== '' && weapon.hands !== undefined);

  let damage = (weapon.damage.die === undefined) ? weapon.damage : `${weapon.damage.num}${weapon.damage.die}`

  let className = 'WeaponTooltip'+(weapon === false ? ' hide' : '');
console.log(mouse);
  let style = (mouse) ? {left: `${mouse.clientX+40}px`, top: `${mouse.clientY}px` } : {};

	return (
		<div className={className} style={style}>
      <List className="stats">
        <ListItem primaryText={weapon.name} leftIcon={<div className={'tooltip_icon icon weapon_'+weapon.type.toLowerCase()} />}  />        
        {<ListItem primaryText={
          <div className="flex-horiz">
            <TooltipChip key={uuidV4()} text={`${weapon.price}`} opts={{icon: 'fa-usd'}} />  
            <TooltipChip key={uuidV4()} text={`${damage}`} opts={{icon: 'fa-bomb'}} />  
            <TooltipChip key={uuidV4()} text={`${weapon.range.low}/${weapon.range.high}`} opts={{show: showRange, icon: 'fa-area-chart'}} />            
            <TooltipChip key={uuidV4()} text={`${weapon.hands}`} opts={{show: showHanded, icon: 'fa-hand-rock-o'}} />            
          </div>
        } />}
      </List>
		</div>
	);
}

export default WeaponTooltip;