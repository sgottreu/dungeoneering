import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TooltipChip from './TooltipChip';
import {Variables} from '../lib/Variables';
import uuidV4  from 'uuid/v4';
import '../css/EntityTooltip.css';

const EntityTooltip = ( { hoverObj, mouse } ) => {
  if(hoverObj === undefined){
    return false;
  }
  if(!hoverObj.obj){
    return false;
  }
  if(hoverObj.type !== 'entity'){
    return false;
  }
  let entity = hoverObj.obj;

  let AbilityMap = new Map(Object.entries(entity.abilities));
  let initiative = (entity.initiative.current === undefined) ? 0 : entity.initiative.current;
  let className = 'EntityTooltip'+(entity === false ? ' hide' : '');
  let style = (mouse) ? {left: `${mouse.clientX+40}px`, top: `${mouse.clientY-80}px` } : {};
  let defense = entity.defense;

	return (
		<div className={className} style={style}>
      <List className="stats">
        <ListItem primaryText={entity.name} leftIcon={<div className={'tooltip_icon icon '+entity.iconClass} />}  />
        <ListItem primaryText={
            <div className="flex-horiz">
              <TooltipChip key={uuidV4()} text={entity.level} opts={{icon: 'fa-line-chart'}} />
              <TooltipChip key={uuidV4()} text={entity.xp} opts={{icon: 'fa-trophy'}} />
              <TooltipChip key={uuidV4()} text={entity.hp} opts={{icon: 'fa-heart'}} />
              <TooltipChip key={uuidV4()} text={entity.speed} opts={{icon: 'fa-rocket'}} />
              <TooltipChip key={uuidV4()} text={`${initiative} (${entity.initiative.total})`} opts={{icon: 'fa-bolt'}} />
            </div>
          }   
        />
        
        <ListItem primaryText={<div className="flex-vert">
          {[...AbilityMap.entries()].map((a, i) => {
          return (
            <TooltipChip key={uuidV4()} text={Variables.toProperCase(a[0].slice(0,3))} opts={ {text: a[1].score } } />
          )
        })}</div>} leftIcon={<div>Abilities</div>}  />
        {
              
            }
        <ListItem 
          primaryText={<div className="flex-horiz">
            <TooltipChip key={uuidV4()} text={'AC'} opts={ {text: defense.armorClass.total } } />
          </div>
          }/>
          <ListItem 
          primaryText={<div className="flex-horiz">
            <TooltipChip key={uuidV4()} text={'Fort'} opts={ {text: defense.fortitude.total } } />
            <TooltipChip key={uuidV4()} text='Ref' opts={ {text: defense.reflex.total } } />
            <TooltipChip key={uuidV4()} text='Will' opts={ {text: defense.willpower.total } } />
          </div>
          }/>
      </List>
		</div>
	);
}

export default EntityTooltip;