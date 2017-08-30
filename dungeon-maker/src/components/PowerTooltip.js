import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TooltipChip from './TooltipChip';
import uuidV4  from 'uuid/v4';
import {Powers} from '../lib/Powers';
import '../css/PowerTooltip.css';

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

  let className = 'PowerTooltip'+(power === false ? ' hide' : '');

  let top = (powerField !== null) ? powerField.offsetTop+200 : 200;
  let left = (powerField !== null) ? powerField.offsetLeft+250 : 0;

  let style = (mouse) ? {left: `${left}px`, top: `${top}px` } : {};

	return (
		<div className={className} style={style}>
      <List className="stats">
        <ListItem primaryText={power.name} leftIcon={<div className={'tooltip_icon icon power_'+powerType.name.toLowerCase()} />}  />        
        {<ListItem primaryText={
          <div className="flex-horiz"> 
            <TooltipChip key={uuidV4()} text={`${powerType.name}`} opts={{icon: 'power_'+powerType.name.toLowerCase()}} />  
            <TooltipChip key={uuidV4()} text={`${damage}`} opts={{icon: 'fa-bomb'}} />  
            <TooltipChip key={uuidV4()} text={`${power.level}`} opts={{icon: 'fa-area-chart'}} />            
                      
          </div>
        } />}
      </List>
		</div>
	);
}

export default PowerTooltip;