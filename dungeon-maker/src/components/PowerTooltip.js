import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TooltipChip from './TooltipChip';
import uuidV4  from 'uuid/v4';
import {Powers} from '../lib/Powers';
import '../css/PowerTooltip.css';

import attackIcon from '../img/attack.png';
import defenseIcon from '../img/defense.png';
import damageIcon from '../img/pierced-heart.png';
import weaponModIcon from '../img/weapon_modifier.png';

const PowerTooltip = ({ hoverObj, mouse, powerField }) => {
  if(hoverObj === undefined){
    return false;
  }
  if(!hoverObj.obj){
    return false;
  }
  if(hoverObj.type !== 'power'){
    return false;
  }
  let power = hoverObj.obj;

  // let showRange = (power.range !== false && power.range !== '');
  // let showHanded = (power.hands !== '' && power.hands !== undefined);

  let damage = (power.damage.die === undefined) ? power.damage : `${power.damage.num}${power.damage.die}`

  let powerType = Powers.powerType.find((p,i) => { return i === power.type});
  let hasLevel = (power.level !== undefined) ? true : false;

  let className = 'PowerTooltip'+(power === false ? ' hide' : '');

  let top = (powerField !== null) ? powerField.offsetTop : 200;
  let left = (powerField !== null) ? powerField.offsetLeft+250 : 0;

  let style = (mouse) ? {left: `${left}px`, top: `${top}px` } : {};

  let attackLabel = power.attack.for.substring(0, 3)+((power.attack.modifier > 0) ? '+'+power.attack.modifier : '')+' vs '+ power.attack.against;
  let hasWeaponMod = (power.weapon_modifier === undefined || power.weapon_modifier === 0) ? false : true;
	return (
		<div className={className} style={style}>
      <List className="stats">
        <ListItem primaryText={power.name} leftIcon={<div className={'tooltip_icon icon power_'+powerType.name.toLowerCase()} />}  />        
        {<ListItem primaryText={
          <div className="flex-horiz"> 
            <TooltipChip key={uuidV4()} text={`${attackLabel}`} opts={{img: attackIcon}} />  
            <TooltipChip key={uuidV4()} text={`${damage}`} opts={{img: damageIcon}} />  
            <TooltipChip key={uuidV4()} text={`${power.weapon_modifier}`} opts={{img: weaponModIcon, show: hasWeaponMod}} />  
            <TooltipChip key={uuidV4()} text={`${power.level}`} opts={{icon: 'fa-area-chart', show: hasLevel}} />            
                      
          </div>
        } />}
      </List>
		</div>
	);
}

export default PowerTooltip;