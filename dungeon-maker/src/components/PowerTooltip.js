import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TooltipChip from './TooltipChip';
import uuidV4  from 'uuid/v4';
import {Powers} from '../lib/Powers';
import Avatar from 'material-ui/Avatar';
import '../css/PowerTooltip.css';

import attackIcon from '../img/attack.png';
import defenseIcon from '../img/defense.png';
import damageIcon from '../img/pierced-heart.png';
import weaponModIcon from '../img/weapon_modifier.png';

import {_Icons as EntityIcons} from '../lib/Entity';

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

  let selClassIcon = '';
  let powerClassName = '';
  let hasClass = 'hide';
  if(power.class !== undefined){
    let _ClassIcon = EntityIcons.find(function(val){ return val.label === power.class.name });
    selClassIcon = (_ClassIcon === undefined) ? '' : _ClassIcon.class;
    powerClassName = power.class.name;
    hasClass = '';
console.log(powerType.class.toLowerCase());
  }

	return (
		<div className={className} style={style}>
      <List className="stats">
        <ListItem primaryText={
            <div>
              <div style={{ fontWeight: 'bold', textAlign: 'center'}}>{power.name}</div>
              <div className='power_icons' style={{ display: 'flex'}}>
                <Avatar className={'icon weapon_'+powerType.class.toLowerCase()} />
                <Avatar className={'icon '+selClassIcon+' '+hasClass} />
              </div>
              <div className='addl_power_items' style={{ display: 'flex'}}>
                <div>{`Action: ${Powers.powerAction[power.action]}`}</div>   
                <div>{`Recharge: ${Powers.powerRecharge[power.recharge]}`}</div>   
          
              </div>
            </div>
          } 

        />    
 
        
        <ListItem primaryText={
          <div className="flex-vert"> 
            <TooltipChip key={uuidV4()} text={`${attackLabel}`} opts={{img: attackIcon}} />  
            <TooltipChip key={uuidV4()} text={`${damage}`} opts={{img: damageIcon}} />  
            <TooltipChip key={uuidV4()} text={`${power.weapon_modifier}`} opts={{img: weaponModIcon, show: hasWeaponMod}} />  
            <TooltipChip key={uuidV4()} text={`${power.level}`} opts={{icon: 'fa-area-chart', show: hasLevel}} />            
                      
          </div>
        } />
      </List>
		</div>
	);
}

export default PowerTooltip;